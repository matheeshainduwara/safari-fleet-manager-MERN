const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// GET /api/packages — public (frontend uses this to show packages)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: 1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

// POST /api/packages — admin adds new package
router.post('/', async (req, res) => {
  try {
    const { name, duration, price, badge, description, features, active } = req.body;
    if (!name || !duration || !price || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const pkg = await Package.create({ name, duration, price, badge, description, features, active });
    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create package' });
  }
});

// PUT /api/packages/:id — admin edits package
router.put('/:id', async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update package' });
  }
});

// PATCH /api/packages/:id/toggle — admin toggles active/inactive
router.patch('/:id/toggle', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    pkg.active = !pkg.active;
    await pkg.save();
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle package' });
  }
});

// DELETE /api/packages/:id
router.delete('/:id', async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete package' });
  }
});

module.exports = router;
