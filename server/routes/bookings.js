const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET /api/bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// POST /api/bookings — called from frontend Booking form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, package: pkg, date, guests, hotel, message } = req.body;
    if (!name || !email || !pkg || !date || !guests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const booking = await Booking.create({ name, email, phone, package: pkg, date, guests, hotel, message });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// PATCH /api/bookings/:id/status — admin confirms or cancels
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
