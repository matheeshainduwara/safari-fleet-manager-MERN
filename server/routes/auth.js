const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'safari_jwt_secret_key_123';

// 1. REGISTER (Public User / Tourist)
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ error: 'This email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email: normalizedEmail,
            phone,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. USER LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. ADMIN LOGIN (Dedicated admin authentication)
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const admin = await Admin.findOne({ email: normalizedEmail });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid administrator credentials' });
        }

        if (!admin.isActive) {
            return res.status(403).json({ error: 'This administrator account has been deactivated' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid administrator credentials' });
        }

        // Record last login timestamp
        admin.lastLogin = new Date();
        await admin.save();

        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role, permissions: admin.permissions },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Admin login successful',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                permissions: admin.permissions,
                lastLogin: admin.lastLogin,
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. ADMIN VERIFY / PROFILE
router.get('/admin/me', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No authorization token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin || !admin.isActive) {
            return res.status(404).json({ error: 'Admin account not found or deactivated' });
        }

        res.json({ admin });
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired administrator token' });
    }
});

module.exports = router;

