const mongoose = require('mongoose');

const diamondSchema = new mongoose.Schema({
  shape: { type: String, enum: ['Round', 'Princess', 'Cushion', 'Oval', 'Pear', 'Emerald', 'Marquise', 'Heart', 'Asscher', 'Radiant'], required: true },
  caratWeight: { type: Number, required: true, min: 0 },
  colour: { type: String, enum: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'Fancy'], required: true },
  clarity: { type: String, enum: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'], required: true },
  cut: { type: String, enum: ['Fair', 'Good', 'Very Good', 'Excellent', 'Ideal'], required: true },
  polish: { type: String, enum: ['Fair', 'Good', 'Very Good', 'Excellent'], default: 'Excellent' },
  symmetry: { type: String, enum: ['Fair', 'Good', 'Very Good', 'Excellent'], default: 'Excellent' },
  fluorescence: { type: String, enum: ['None', 'Faint', 'Medium', 'Strong'], default: 'None' },
  measurements: { type: String },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'CAD' },
  certLab: { type: String, enum: ['GIA', 'IGI', 'AGS', 'Other'], default: 'IGI' },
  certNumber: { type: String },
  certUrl: { type: String },
  image: { type: String },
  images: [{ type: String }],
  embedCode: { type: String }, // optional 360° viewer embed snippet (script/HTML from a rotation-viewer provider) — replaces the static image on the detail page when set
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Diamond', diamondSchema);
