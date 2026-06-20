const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Order = require('../models/Order');
const Lead = require('../models/Lead');
const { protect, admin } = require('../middleware/auth');

// All admin routes require auth + admin role
router.use(protect, admin);

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalOrders, revenueResult, newLeads] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Course.countDocuments({ isActive: true }),
      Order.countDocuments({ status: 'paid' }),
      Order.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Lead.countDocuments({ status: 'new' }),
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;
    const recentOrders = await Order.find({ status: 'paid' }).populate('user', 'name email').populate('course', 'title').sort('-paidAt').limit(10);
    res.json({ success: true, stats: { totalUsers, totalCourses, totalOrders, totalRevenue, newLeads }, recentOrders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('enrolledCourses', 'title').sort('-createdAt');
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/users/:id
router.put('/users/:id', async (req, res) => {
  try {
    const { isActive, role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { isActive, role }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/courses (with full details including zoom)
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort('-createdAt');
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;