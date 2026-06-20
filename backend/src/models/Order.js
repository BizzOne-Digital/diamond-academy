const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: { type: String, default: 'stripe' },
  stripePaymentIntentId: { type: String },
  stripeSessionId: { type: String },
  receiptUrl: { type: String },
  paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
