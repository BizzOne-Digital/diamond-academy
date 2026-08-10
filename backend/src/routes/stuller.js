const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ToolSku = require('../models/ToolSku');
const ToolRequest = require('../models/ToolRequest');
const { protect, admin, optionalAuth } = require('../middleware/auth');

const STULLER_API_BASE = 'https://api.stuller.com/v2';

// Client-confirmed markup: final price shown to customers is 5x Stuller's cost —
// meant to be all-inclusive (covers shipping, insurance, customs duties, our margin).
const MARKUP_MULTIPLIER = 5;
function applyMarkup(product) {
  if (product?.Price?.Value != null) product.Price.Value = product.Price.Value * MARKUP_MULTIPLIER;
  if (product?.ShowcasePrice?.Value != null) product.ShowcasePrice.Value = product.ShowcasePrice.Value * MARKUP_MULTIPLIER;
  return product;
}

// Server-side only — Stuller credentials must never reach the browser. Set these in
// backend/.env: STULLER_USERNAME, STULLER_PASSWORD — the Developer-role login Stuller's
// e-commerce support team issued specifically for API access (separate from the main
// ANGELDIAMONDINC account login).
function stullerAuthHeader() {
  const { STULLER_USERNAME, STULLER_PASSWORD } = process.env;
  if (!STULLER_USERNAME || !STULLER_PASSWORD) return null;
  const token = Buffer.from(`${STULLER_USERNAME}:${STULLER_PASSWORD}`).toString('base64');
  return `Basic ${token}`;
}

// Real category browsing IS supported — it just requires the exact nested request
// shape Stuller's Web API expects. Flat fields like `ProductType: "Hand Tools"` or
// `Category: "..."` are silently ignored, but this works (confirmed live):
//   { AdvancedProductFilters: [{ Type: "ProductType", Values: [{ Value: "Hand Tools" }] }] }
// Pagination continues by sending back the opaque `NextPage` token Stuller returns,
// as { NextPage: token } — no need to resend the filter on later pages.
//
// Stuller's own e-commerce support team confirmed Category ID 9 is the official
// top-level "Tools & Supplies" category — every /browse request is scoped to it via
// CategoryIds, with ProductType as a sub-filter for the tabs below.
const TOOLS_CATEGORY_ID = 9;
const TOOLS_CATEGORIES = ['Hand Tools', 'Equipment', 'Supplies', 'Jewelry Supplies', 'General Accessories', 'Watch Supplies'];

// GET /api/stuller/browse?category=Hand+Tools&cursor=<opaque token from a previous response>
// Browses a real Stuller category. `Filter: ["Orderable", "OnPriceList"]` (a flat string
// array — different shape from AdvancedProductFilters) tells Stuller to only return
// orderable/in-stock, priced items server-side, confirmed live (10/10 results orderable
// vs. a mix of active/legacy SKUs without it) — so no client-side filtering or
// multi-page accumulation is needed here.
router.get('/browse', async (req, res) => {
  const authHeader = stullerAuthHeader();
  if (!authHeader) {
    return res.status(503).json({ success: false, message: 'Stuller API is not configured. Set STULLER_USERNAME and STULLER_PASSWORD on the server.' });
  }
  const category = req.query.category || TOOLS_CATEGORIES[0];
  if (!TOOLS_CATEGORIES.includes(category)) {
    return res.status(400).json({ success: false, message: `Unknown category. Use one of: ${TOOLS_CATEGORIES.join(', ')}` });
  }

  try {
    const cursor = req.query.cursor || null;
    const body = cursor
      ? { NextPage: cursor }
      : { CategoryIds: [TOOLS_CATEGORY_ID], AdvancedProductFilters: [{ Type: 'ProductType', Values: [{ Value: category }] }], Filter: ['Orderable', 'OnPriceList'], PageSize: 24 };

    const response = await fetch(`${STULLER_API_BASE}/products`, {
      method: 'POST',
      headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return res.status(response.status).json({ success: false, message: `Stuller API error (${response.status})`, details: text.slice(0, 500) });
    }

    const data = await response.json();
    res.json({
      success: true,
      category,
      categories: TOOLS_CATEGORIES,
      products: (data.Products || []).map(applyMarkup),
      nextCursor: data.NextPage || null,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/stuller/tools-and-supplies
// Fetches live price/availability/images for the SKUs an admin has added via
// /admin/tools (ToolSku model) — a curated shortlist, separate from /browse above.
router.get('/tools-and-supplies', async (req, res) => {
  const authHeader = stullerAuthHeader();
  if (!authHeader) {
    return res.status(503).json({ success: false, message: 'Stuller API is not configured. Set STULLER_USERNAME and STULLER_PASSWORD on the server.' });
  }

  const skus = (await ToolSku.find({ isActive: true }).sort('order')).map(t => t.sku);
  if (!skus.length) {
    return res.json({ success: true, products: [], message: 'No tools have been added yet. Add Stuller SKUs from the admin panel (Admin > Tools).' });
  }

  try {
    const params = new URLSearchParams();
    skus.forEach(sku => params.append('sku', sku));
    const response = await fetch(`${STULLER_API_BASE}/products?${params.toString()}`, {
      headers: { Authorization: authHeader },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return res.status(response.status).json({ success: false, message: `Stuller API error (${response.status})`, details: text.slice(0, 500) });
    }

    const data = await response.json();
    res.json({ success: true, products: (data.Products || data.products || []).map(applyMarkup) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/stuller/product/:sku
// Fetches a single product by SKU — used by the Tools detail page (direct link/refresh
// support, since the browse grid already has the full product object in memory on click).
router.get('/product/:sku', async (req, res) => {
  const authHeader = stullerAuthHeader();
  if (!authHeader) {
    return res.status(503).json({ success: false, message: 'Stuller API is not configured. Set STULLER_USERNAME and STULLER_PASSWORD on the server.' });
  }

  try {
    const params = new URLSearchParams();
    params.append('sku', req.params.sku);
    const response = await fetch(`${STULLER_API_BASE}/products?${params.toString()}`, {
      headers: { Authorization: authHeader },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return res.status(response.status).json({ success: false, message: `Stuller API error (${response.status})`, details: text.slice(0, 500) });
    }

    const data = await response.json();
    const product = (data.Products || data.products || [])[0];
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product: applyMarkup(product) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/stuller/checkout — real payment. Customer pays the marked-up price
// (already applied in /browse and /product above) on our own site via Stripe; we never
// touch Stuller's cart. Creates a ToolRequest record that becomes "paid" once the
// webhook confirms payment, so our team can then place the matching order with Stuller.
router.post('/checkout', optionalAuth, async (req, res) => {
  const { name, email, phone, sku, productName, price, currency, qty } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email are required' });
  if (!price || price <= 0) return res.status(400).json({ success: false, message: 'Invalid price' });
  const quantity = Math.max(1, Number(qty) || 1);

  try {
    const toolRequest = await ToolRequest.create({
      name, email, phone, sku, productName, price, currency, qty: quantity,
      amount: price * quantity,
      user: req.user?._id,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [{
        price_data: {
          currency: (currency || 'usd').toLowerCase(),
          product_data: { name: productName || 'Tool' },
          unit_amount: Math.round(price * 100),
        },
        quantity,
      }],
      success_url: `${process.env.FRONTEND_URL}/tools/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/tools/${encodeURIComponent(sku || '')}`,
      metadata: { type: 'tool', toolRequestId: toolRequest._id.toString() },
    });

    toolRequest.stripeSessionId = session.id;
    await toolRequest.save();

    res.json({ success: true, sessionUrl: session.url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/stuller/verify/:sessionId — public confirmation for the payment-success page.
router.get('/verify/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    let request = await ToolRequest.findOne({ stripeSessionId: req.params.sessionId });
    if (request && session.payment_status === 'paid' && request.paymentStatus !== 'paid') {
      request.paymentStatus = 'paid';
      request.paidAt = new Date();
      await request.save();
    }
    res.json({ success: true, status: session.payment_status, request });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/stuller/requests/all — admin list
router.get('/requests/all', protect, admin, async (req, res) => {
  const requests = await ToolRequest.find().sort('-createdAt');
  res.json({ success: true, requests });
});

// PUT /api/stuller/requests/:id — admin update status
router.put('/requests/:id', protect, admin, async (req, res) => {
  const request = await ToolRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
  res.json({ success: true, request });
});

module.exports = router;
