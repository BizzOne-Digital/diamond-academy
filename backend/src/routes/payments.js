const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect, optionalAuth } = require('../middleware/auth');
const Order = require('../models/Order');
const Course = require('../models/Course');
const User = require('../models/User');

// POST /api/payments/create-checkout-session
// Body: { courseIds: [id, ...] } — if omitted, checks out the user's current cart.
// Login is optional — guests can buy first and create their login credentials after payment.
router.post('/create-checkout-session', optionalAuth, async (req, res) => {
  try {
    let courseIds = req.body.courseIds;
    if (!courseIds || !courseIds.length) {
      courseIds = req.user ? req.user.cart.map(id => id.toString()) : [];
    }
    if (!courseIds.length) return res.status(400).json({ success: false, message: 'Your cart is empty' });

    const { name, email, phone, sessionIndex } = req.body.customerDetails || {};
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide your name, email, and phone number before checkout' });
    }

    const courses = await Course.find({ _id: { $in: courseIds } });
    if (courses.length !== courseIds.length) return res.status(404).json({ success: false, message: 'One or more courses were not found' });

    // Resolve which account this order belongs to: the logged-in user, an existing
    // account matching this email, or a brand-new guest account that gets a
    // "create your password" prompt after payment succeeds.
    let buyer = req.user;
    let isNewGuestAccount = false;
    if (!buyer) {
      buyer = await User.findOne({ email: email.toLowerCase().trim() });
      if (!buyer) {
        buyer = await User.create({
          name, email, phone,
          password: crypto.randomBytes(24).toString('hex'),
          needsPasswordSetup: true,
        });
        isNewGuestAccount = true;
      }
    }

    const alreadyEnrolled = courses.filter(c => buyer.enrolledCourses.some(id => id.toString() === c._id.toString()));
    if (alreadyEnrolled.length) {
      return res.status(400).json({ success: false, message: `Already enrolled in: ${alreadyEnrolled.map(c => c.title).join(', ')}` });
    }

    // When checking out a single course that offers multiple session slots (e.g. different
    // timezones), the customer must pick one before paying.
    let selectedSession;
    if (courses.length === 1 && courses[0].sessions && courses[0].sessions.length > 0) {
      const idx = Number(sessionIndex);
      const session = courses[0].sessions[idx];
      if (!session) return res.status(400).json({ success: false, message: 'Please select a session' });
      selectedSession = { date: session.date, time: session.time, timezone: session.timezone };
    }

    const line_items = courses.map(course => ({
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
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items,
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: { courseIds: courseIds.join(','), userId: buyer._id.toString(), customerName: name, customerPhone: phone },
    });

    // Create pending order with one line item per course
    await Order.create({
      user: buyer._id,
      items: courses.map(c => ({ course: c._id, title: c.title, price: c.price })),
      amount: courses.reduce((sum, c) => sum + c.price, 0),
      status: 'pending',
      stripeSessionId: session.id,
      customerDetails: { name, email, phone, session: selectedSession },
    });

    res.json({ success: true, sessionUrl: session.url, sessionId: session.id, isNewGuestAccount });
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
        const courseIds = order.items.map(item => item.course);
        await User.findByIdAndUpdate(order.user, {
          $addToSet: { enrolledCourses: { $each: courseIds } },
          $pull: { cart: { $in: courseIds } },
        });
        await Course.updateMany({ _id: { $in: courseIds } }, { $inc: { enrollmentCount: 1 } });
      }
    } catch (err) {
      console.error('Webhook processing error:', err);
    }
  }
  res.json({ received: true });
});

// GET /api/payments/verify/:sessionId
// Public: the Stripe session id itself is the capability handed back on the success
// redirect, so a logged-out guest can use it to confirm payment and, if they bought
// as a guest, receive a one-time token to set their account password.
router.get('/verify/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    const order = await Order.findOne({ stripeSessionId: req.params.sessionId }).populate('items.course', 'title slug');
    let passwordSetupToken;
    if (order && session.payment_status === 'paid') {
      const buyer = await User.findById(order.user);
      if (buyer && buyer.needsPasswordSetup) {
        passwordSetupToken = crypto.randomBytes(32).toString('hex');
        buyer.resetPasswordToken = crypto.createHash('sha256').update(passwordSetupToken).digest('hex');
        buyer.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000;
        await buyer.save();
      }
    }
    res.json({ success: true, status: session.payment_status, order, passwordSetupToken });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
