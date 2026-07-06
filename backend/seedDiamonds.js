require('dotenv').config();
const mongoose = require('mongoose');
const Diamond = require('./src/models/Diamond');

// No real 360° viewer embed exists yet for any of these — `embedCode` is left blank on purpose.
// (GIA's 4Cs tool scripts don't work here: they're full educational widgets with their own
// text/scales/attribution baked in, not compact product images — embedding one in this photo
// slot renders that whole card, not a clean rotating diamond.) Add a real 360° vendor embed
// per diamond via Admin → Diamonds → Edit once available; it'll replace the static image below.
const diamonds = [
  {
    shape: 'Round', caratWeight: 0.19, colour: 'E', clarity: 'I1', cut: 'Excellent',
    polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', measurements: '3.71x3.72x2.28mm',
    price: 179, currency: 'CAD', certLab: 'IGI', certNumber: '790617597',
    image: '/course-fundamentals.png', embedCode: '', isActive: true, isFeatured: true,
  },
  {
    shape: 'Princess', caratWeight: 0.45, colour: 'G', clarity: 'VS2', cut: 'Very Good',
    polish: 'Very Good', symmetry: 'Excellent', fluorescence: 'Faint', measurements: '4.20x4.18x3.10mm',
    price: 620, currency: 'CAD', certLab: 'GIA', certNumber: '2201938475',
    image: '/course-intelligence.png', embedCode: '', isActive: true, isFeatured: false,
  },
  {
    shape: 'Oval', caratWeight: 0.82, colour: 'F', clarity: 'VVS1', cut: 'Excellent',
    polish: 'Excellent', symmetry: 'Very Good', fluorescence: 'None', measurements: '6.90x4.85x3.02mm',
    price: 1450, currency: 'CAD', certLab: 'IGI', certNumber: '661029384',
    image: '/course-precision.png', embedCode: '', isActive: true, isFeatured: true,
  },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Diamond.deleteMany({ certNumber: { $in: diamonds.map(d => d.certNumber) } });
  const created = await Diamond.insertMany(diamonds);
  console.log(`Seeded ${created.length} diamonds.`);
  await mongoose.disconnect();
})().catch(err => { console.error(err); process.exit(1); });
