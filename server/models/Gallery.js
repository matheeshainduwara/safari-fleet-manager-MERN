const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  tag:       { type: String, required: true, default: 'Other' },
  desc:      { type: String, default: '' },
  imageUrl:  { type: String, required: true },   // Cloudinary secure_url or image link
  publicId:  { type: String, default: '' },       // Cloudinary public_id (optional if not on Cloudinary)
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);

