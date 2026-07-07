const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
}, { _id: false });

const selectedSessionSchema = new mongoose.Schema({
  date: { type: Date },
  time: { type: String },
  timezone: { type: String },
}, { _id: false });

const customerDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  session: { type: selectedSessionSchema },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [orderItemSchema], required: true, validate: v => v.length > 0 },
  customerDetails: { type: customerDetailsSchema },
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
