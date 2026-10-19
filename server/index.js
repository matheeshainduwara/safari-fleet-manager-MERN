require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Cloudinary Config (uses API Secret safely on server) ────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const path = require('path');

// ─── Middleware ───────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback allow in dev
    }
  },
  credentials: true,
}));

// Allow up to 50MB for image base64 payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static images directly from public/images
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/auth', require('./routes/auth'));

// Root & Health check
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Safari Portal API is running 🚀', endpoints: ['/api/gallery', '/api/bookings', '/api/packages', '/api/messages', '/api/auth', '/api/health'] }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Safari Portal API running' }));


// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

