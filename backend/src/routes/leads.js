const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect, admin } = require('../middleware/auth');

// POST /api/leads — public (contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    const lead = await Lead.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Your message has been sent! We will contact you shortly.', leadId: lead._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/leads — admin: all leads
router.get('/', protect, admin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'all' ? { status } : {};
    const leads = await Lead.find(filter).sort('-createdAt');
    res.json({ success: true, count: leads.length, leads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/leads/:id — admin: update status + note
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status, adminNote }, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/leads/:id — admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;