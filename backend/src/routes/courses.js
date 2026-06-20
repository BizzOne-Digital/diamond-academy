const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect, admin } = require('../middleware/auth');

// GET /api/courses — public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).select('-sessions.zoomLink -sessions.zoomPassword');
    res.json({ success: true, count: courses.length, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/courses/:slug — public (no zoom links)
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, isActive: true }).select('-sessions.zoomLink -sessions.zoomPassword');
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/courses/:slug/sessions — protected (enrolled students get zoom links)
router.get('/:slug/sessions', protect, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    const enrolled = req.user.enrolledCourses.some(c => c.toString() === course._id.toString());
    if (!enrolled && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Not enrolled in this course' });
    res.json({ success: true, sessions: course.sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/courses — admin only
router.post('/', protect, admin, async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/courses/:id — admin only
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// POST /api/courses/:id/sessions — admin: add session
router.post('/:id/sessions', protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    course.sessions.push(req.body);
    await course.save();
    res.json({ success: true, course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/courses/:id/sessions/:sessionId — admin: update session
router.put('/:id/sessions/:sessionId', protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    const session = course.sessions.id(req.params.sessionId);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    Object.assign(session, req.body);
    await course.save();
    res.json({ success: true, course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/courses/:id/sessions/:sessionId — admin
router.delete('/:id/sessions/:sessionId', protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    course.sessions.pull(req.params.sessionId);
    await course.save();
    res.json({ success: true, message: 'Session deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/courses/:id — admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
