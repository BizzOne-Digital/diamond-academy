const express = require('express');
const router = express.Router();
const ToolSku = require('../models/ToolSku');
const ToolRequest = require('../models/ToolRequest');
const { protect, admin, optionalAuth } = require('../middleware/auth');

const STULLER_API_BASE = 'https://api.stuller.com/v2';

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
      products: data.Products || [],
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
    res.json({ success: true, products: data.Products || data.products || [] });
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
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/stuller/requests — public (guest or logged-in) "Request this Item" submission
// from the Tools detail page. Lands in the admin panel; no email/payment automation yet.
router.post('/requests', optionalAuth, async (req, res) => {
  const { name, email, phone, sku, productName, price, currency, qty } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email are required' });
  try {
    const request = await ToolRequest.create({
      name, email, phone, sku, productName, price, currency, qty: qty || 1,
      user: req.user?._id,
    });
    res.status(201).json({ success: true, request });
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
