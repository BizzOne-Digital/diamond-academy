const express = require('express');
const router = express.Router();
const ToolSku = require('../models/ToolSku');
const { protect, admin } = require('../middleware/auth');

router.get('/all', protect, admin, async (req, res) => {
  try {
    const items = await ToolSku.find().sort('order');
    res.json({ success: true, items });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const item = await ToolSku.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const item = await ToolSku.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await ToolSku.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
