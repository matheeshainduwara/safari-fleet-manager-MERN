const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['superadmin', 'admin', 'moderator'],
            default: 'admin',
        },
        permissions: {
            type: [String],
            default: ['bookings', 'gallery', 'packages', 'messages'],
        },
        avatar: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
            default: '',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
