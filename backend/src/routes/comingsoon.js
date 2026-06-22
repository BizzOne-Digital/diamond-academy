const express = require('express');
const router = express.Router();
const ComingSoon = require('../models/ComingSoon');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const items = await ComingSoon.find({ isActive: true }).sort('order');
    res.json({ success: true, items });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/all', protect, admin, async (req, res) => {
  try {
    const items = await ComingSoon.find().sort('order');
    res.json({ success: true, items });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const item = await ComingSoon.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const item = await ComingSoon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await ComingSoon.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;