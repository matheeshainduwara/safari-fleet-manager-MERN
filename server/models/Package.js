const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  duration:    { type: String, required: true },
  price:       { type: String, required: true },
  badge:       { type: String, default: '' },
  description: { type: String, required: true },
  features:    [{ type: String }],
  active:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);
