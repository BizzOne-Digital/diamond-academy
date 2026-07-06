const express = require('express');
const router = express.Router();
const Diamond = require('../models/Diamond');
const { protect, admin } = require('../middleware/auth');

const COLOUR_ORDER = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
const CLARITY_ORDER = ['I3', 'I2', 'I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
const CUT_ORDER = ['Fair', 'Good', 'Very Good', 'Excellent', 'Ideal'];

function rangeIn(order, min, max) {
  const lo = min ? order.indexOf(min) : 0;
  const hi = max ? order.indexOf(max) : order.length - 1;
  if (lo === -1 || hi === -1) return null;
  return order.slice(Math.min(lo, hi), Math.max(lo, hi) + 1);
}

// GET /api/diamonds — public, filterable
router.get('/', async (req, res) => {
  try {
    const { shape, minCarat, maxCarat, minColour, maxColour, minClarity, maxClarity, minCut, maxCut, minPrice, maxPrice, polish, symmetry, fluorescence, certLab, sort } = req.query;
    const query = { isActive: true };

    if (shape) query.shape = { $in: shape.split(',') };
    if (minCarat || maxCarat) {
      query.caratWeight = {};
      if (minCarat) query.caratWeight.$gte = Number(minCarat);
      if (maxCarat) query.caratWeight.$lte = Number(maxCarat);
    }
    if (minColour === 'Fancy' || maxColour === 'Fancy') {
      query.colour = 'Fancy';
    } else if (minColour || maxColour) {
      const colours = rangeIn(COLOUR_ORDER, minColour, maxColour);
      if (colours) query.colour = { $in: colours };
    }
    if (minClarity || maxClarity) {
      const clarities = rangeIn(CLARITY_ORDER, minClarity, maxClarity);
      if (clarities) query.clarity = { $in: clarities };
    }
    if (minCut || maxCut) {
      const cuts = rangeIn(CUT_ORDER, minCut, maxCut);
      if (cuts) query.cut = { $in: cuts };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (polish) query.polish = { $in: polish.split(',') };
    if (symmetry) query.symmetry = { $in: symmetry.split(',') };
    if (fluorescence) query.fluorescence = { $in: fluorescence.split(',') };
    if (certLab) query.certLab = { $in: certLab.split(',') };

    let sortBy = '-createdAt';
    if (sort === 'price-asc') sortBy = 'price';
    if (sort === 'price-desc') sortBy = '-price';
    if (sort === 'carat-asc') sortBy = 'caratWeight';
    if (sort === 'carat-desc') sortBy = '-caratWeight';

    const diamonds = await Diamond.find(query).sort(sortBy);
    res.json({ success: true, count: diamonds.length, diamonds });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/diamonds/:id — public
router.get('/:id', async (req, res) => {
  try {
    const diamond = await Diamond.findOne({ _id: req.params.id, isActive: true });
    if (!diamond) return res.status(404).json({ success: false, message: 'Diamond not found' });
    res.json({ success: true, diamond });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/diamonds — admin only
router.post('/', protect, admin, async (req, res) => {
  try {
    const diamond = await Diamond.create(req.body);
    res.status(201).json({ success: true, diamond });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/diamonds/:id — admin only
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const diamond = await Diamond.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!diamond) return res.status(404).json({ success: false, message: 'Diamond not found' });
    res.json({ success: true, diamond });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/diamonds/:id — admin only
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const diamond = await Diamond.findByIdAndDelete(req.params.id);
    if (!diamond) return res.status(404).json({ success: false, message: 'Diamond not found' });
    res.json({ success: true, message: 'Diamond deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
