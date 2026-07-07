const mongoose = require('mongoose');

// A curated Stuller SKU the admin wants to sell on the Tools & Supplies page.
// Live price/availability/image for each SKU is fetched from Stuller's API on demand —
// see routes/stuller.js. We don't cache Stuller's product data here, just which SKUs
// to look up, so admins can add/remove tools without touching code.
const toolSkuSchema = new mongoose.Schema({
  sku: { type: String, required: true, trim: true, unique: true },
  label: { type: String, trim: true }, // optional friendly name for the admin list
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ToolSku', toolSkuSchema);
