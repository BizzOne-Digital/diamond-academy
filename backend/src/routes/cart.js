const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');

router.use(protect);

// GET /api/cart — current user's cart, populated with course details
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart', 'title slug image price currency shortDescription sessions');
    res.json({ success: true, items: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/cart — add a course to the cart
router.post('/', async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    if (req.user.enrolledCourses.some(c => c.toString() === courseId)) {
      return res.status(400).json({ success: false, message: 'You are already enrolled in this course' });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { cart: courseId } },
      { new: true }
    ).populate('cart', 'title slug image price currency shortDescription sessions');
    res.json({ success: true, items: user.cart });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/cart/:courseId — remove one course from the cart
router.delete('/:courseId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { cart: req.params.courseId } },
      { new: true }
    ).populate('cart', 'title slug image price currency shortDescription sessions');
    res.json({ success: true, items: user.cart });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/cart — clear the whole cart
router.delete('/', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $set: { cart: [] } });
    res.json({ success: true, items: [] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
