const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Gallery = require('../models/Gallery');

const initialSampleImages = [
  { title: 'Sri Lankan Leopard', tag: 'Leopard', desc: 'Yala Block 1, Sri Lanka', imageUrl: '/images/gallery_1.jpg', publicId: '' },
  { title: 'Elephant Bathing', tag: 'Elephants', desc: 'Menik River, Yala', imageUrl: '/images/gallery_2.jpg', publicId: '' },
  { title: 'Peacock Display', tag: 'Birds', desc: 'Yala National Park', imageUrl: '/images/gallery_3.jpg', publicId: '' },
  { title: 'Sloth Bear & Cubs', tag: 'Sloth Bear', desc: 'Yala Block 1', imageUrl: '/images/gallery_4.jpg', publicId: '' },
  { title: 'Jeep Safari Encounter', tag: 'On Safari', desc: 'Yala National Park', imageUrl: '/images/gallery_5.jpg', publicId: '' },
];

// GET /api/gallery — fetch all images (newest first)
router.get('/', async (req, res) => {
  try {
    let images = await Gallery.find().sort({ createdAt: -1 });

    // Auto-populate default sample gallery if database is empty
    if (images.length === 0) {
      await Gallery.insertMany(initialSampleImages);
      images = await Gallery.find().sort({ createdAt: -1 });
    }

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// GET /api/gallery/count — exact image count
router.get('/count', async (req, res) => {
  try {
    let count = await Gallery.countDocuments();
    if (count === 0) {
      await Gallery.insertMany(initialSampleImages);
      count = await Gallery.countDocuments();
    }
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count gallery images' });
  }
});

// GET /api/gallery/hero — fetch 3 featured hero slideshow images
router.get('/hero', async (req, res) => {
  try {
    let heroImages = await Gallery.find({ featuredInHero: true }).sort({ updatedAt: -1 }).limit(3);

    // If fewer than 3 are explicitly marked, backfill with latest images
    if (heroImages.length < 3) {
      const existingIds = heroImages.map((img) => img._id);
      const extraImages = await Gallery.find({ _id: { $nin: existingIds } })
        .sort({ createdAt: -1 })
        .limit(3 - heroImages.length);
      heroImages = [...heroImages, ...extraImages];
    }

    // If DB is completely empty, insert initial sample images
    if (heroImages.length === 0) {
      await Gallery.insertMany(initialSampleImages);
      heroImages = await Gallery.find({ featuredInHero: true }).limit(3);
    }

    res.json(heroImages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero images' });
  }
});

// PATCH /api/gallery/:id/toggle-hero — toggle hero selection (max 3 allowed)
router.patch('/:id/toggle-hero', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const willBeFeatured = !image.featuredInHero;

    if (willBeFeatured) {
      const currentHeroCount = await Gallery.countDocuments({ featuredInHero: true });
      if (currentHeroCount >= 3) {
        return res.status(400).json({
          error: 'Maximum 3 photos can be selected for the Hero slideshow. Please uncheck one first.',
        });
      }
    }

    image.featuredInHero = willBeFeatured;
    await image.save();

    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to toggle hero status' });
  }
});

// POST /api/gallery — save a new image
router.post('/', async (req, res) => {
  try {
    const { title, tag, desc, imageUrl, publicId } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ error: 'Title and image are required' });
    }

    const image = await Gallery.create({
      title: title.trim(),
      tag: tag || 'Other',
      desc: desc ? desc.trim() : '',
      imageUrl: imageUrl.trim(),
      publicId: publicId || '',
    });

    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to save image' });
  }
});

// DELETE /api/gallery/:id — delete from MongoDB and Cloudinary
router.delete('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    // Remove from Cloudinary if configured
    if (image.publicId && process.env.CLOUDINARY_API_SECRET && process.env.CLOUDINARY_API_SECRET !== 'your-api-secret-here') {
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch (cloudErr) {
        console.warn('Cloudinary deletion skipped or error:', cloudErr.message);
      }
    }

    // Remove from MongoDB
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete image' });
  }
});

module.exports = router;

