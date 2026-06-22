const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const { protect, admin } = require('../middleware/auth');

// GET /api/resources — public (published only)
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find({ isPublished: true }).sort('order -createdAt');
    res.json({ success: true, resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/resources/all — admin (all including unpublished)
router.get('/all', protect, admin, async (req, res) => {
  try {
    const resources = await Resource.find().sort('order -createdAt');
    res.json({ success: true, resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/resources — admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({ success: true, resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/resources/:id — admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/resources/:id — admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;