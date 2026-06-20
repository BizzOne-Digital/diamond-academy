const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');
const Course = require('../models/Course');
const User = require('../models/User');

// POST /api/payments/create-checkout-session
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    // Check already enrolled
    if (req.user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: req.user.email,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: course.title,
            description: course.shortDescription || course.description.substring(0, 200),
            images: course.image ? [course.image] : [],
          },
          unit_amount: Math.round(course.price * 100),
        },
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/courses/${course.slug}`,
      metadata: { courseId: courseId.toString(), userId: req.user._id.toString() },
    });

    // Create pending order
    await Order.create({
      user: req.user._id,
      course: courseId,
      amount: course.price,
      status: 'pending',
      stripeSessionId: session.id,
    });

    res.json({ success: true, sessionUrl: session.url, sessionId: session.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/payments/webhook — Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      const order = await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: 'paid', stripePaymentIntentId: session.payment_intent, paidAt: new Date() },
        { new: true }
      );
      if (order) {
        await User.findByIdAndUpdate(order.user, { $addToSet: { enrolledCourses: order.course } });
        await Course.findByIdAndUpdate(order.course, { $inc: { enrollmentCount: 1 } });
      }
    } catch (err) {
      console.error('Webhook processing error:', err);
    }
  }
  res.json({ received: true });
});

// GET /api/payments/verify/:sessionId
router.get('/verify/:sessionId', protect, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    const order = await Order.findOne({ stripeSessionId: req.params.sessionId }).populate('course', 'title slug');
    res.json({ success: true, status: session.payment_status, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
