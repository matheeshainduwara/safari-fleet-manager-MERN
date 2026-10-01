const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Gallery = require('../models/Gallery');

// GET /api/gallery — fetch all images (newest first)
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// POST /api/gallery — save a new image after Cloudinary upload
router.post('/', async (req, res) => {
  try {
    const { title, tag, desc, imageUrl, publicId } = req.body;
    if (!title || !imageUrl || !publicId) {
      return res.status(400).json({ error: 'title, imageUrl and publicId are required' });
    }
    const image = await Gallery.create({ title, tag, desc, imageUrl, publicId });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save image' });
  }
});

// DELETE /api/gallery/:id — delete from MongoDB AND Cloudinary
router.delete('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    // Remove from Cloudinary using the API secret (safe — runs on server only)
    await cloudinary.uploader.destroy(image.publicId);

    // Remove from MongoDB
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;
