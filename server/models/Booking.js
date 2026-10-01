const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, trim: true, lowercase: true },
  phone:    { type: String, default: '' },
  package:  { type: String, required: true },
  date:     { type: String, required: true },
  guests:   { type: Number, required: true, min: 1 },
  hotel:    { type: String, default: '' },
  message:  { type: String, default: '' },
  status:   { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
