const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  subject: { type: String, trim: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'enrolled', 'closed'], default: 'new' },
  adminNote: { type: String },
  source: { type: String, default: 'contact-form' },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);