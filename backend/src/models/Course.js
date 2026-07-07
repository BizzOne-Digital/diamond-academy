const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  timezone: { type: String, default: 'EST' },
  duration: { type: String, default: '90 minutes' },
  zoomLink: { type: String },
  zoomPassword: { type: String },
  isCompleted: { type: Boolean, default: false },
  recordingUrl: { type: String },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  image: { type: String },
  imagePublicId: { type: String },
  sessions: [sessionSchema],
  totalSessions: { type: Number, default: 0 },
  duration: { type: String },
  whatYouLearn: [{ type: String }],
  requirements: [{ type: String }],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  // Shows "Flexible Payment Plans Available" at checkout — intended for bundle offers only.
  financingAvailable: { type: Boolean, default: false },
  enrollmentCount: { type: Number, default: 0 },
  stripeProductId: { type: String },
  stripePriceId: { type: String },
}, { timestamps: true });

courseSchema.pre('save', function(next) {
  this.totalSessions = this.sessions.length;
  next();
});

module.exports = mongoose.model('Course', courseSchema);
