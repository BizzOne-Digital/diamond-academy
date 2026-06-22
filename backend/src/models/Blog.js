const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  coverImage: { type: String },
  coverImagePublicId: { type: String },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  author: { type: String, default: 'Archana Jaswani' },
}, { timestamps: true });

blogSchema.pre('save', function(next) {
  if (this.isPublished && !this.publishedAt) this.publishedAt = new Date();
  next();
});

module.exports = mongoose.model('Blog', blogSchema);