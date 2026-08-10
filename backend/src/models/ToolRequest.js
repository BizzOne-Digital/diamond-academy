const mongoose = require('mongoose');

// A "Request this Item" submission from the Tools & Supplies product page — reviewed
// in the admin panel, then followed up with the customer manually (email/phone) since
// there's no automated Stuller ordering/payment flow yet.
const toolRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  sku: { type: String, trim: true },
  productName: { type: String, trim: true },
  price: { type: Number },
  currency: { type: String },
  qty: { type: Number, default: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending', 'Contacted', 'Fulfilled'], default: 'Pending' },
  amount: { type: Number },
  stripeSessionId: { type: String },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('ToolRequest', toolRequestSchema);
