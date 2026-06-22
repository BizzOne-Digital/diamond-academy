const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  category: { type: String, default: 'General' },
  isPublished: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);