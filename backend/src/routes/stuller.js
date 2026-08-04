const express = require('express');
const router = express.Router();
const ToolSku = require('../models/ToolSku');

const STULLER_API_BASE = 'https://api.stuller.com/v2';

// Server-side only — Stuller credentials must never reach the browser. Set these in
// backend/.env: STULLER_USERNAME, STULLER_PASSWORD (the Developer/Administrator login
// for the ANGELDIAMONDINC Stuller account).
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
const TOOLS_CATEGORIES = ['Hand Tools', 'Equipment', 'Supplies', 'Jewelry Supplies', 'General Accessories', 'Watch Supplies'];

// GET /api/stuller/browse?category=Hand+Tools&cursor=<opaque token from a previous response>
// Browses a real Stuller category, filtered to orderable/in-stock items only (most of
// the catalog is legacy/inactive placeholder data). Accumulates across several Stuller
// pages server-side so the frontend gets a useful page of real results per request.
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
    const collected = [];
    let cursor = req.query.cursor || null;
    let iterations = 0;
    const MAX_ITERATIONS = 6; // safety cap — most catalog pages are mostly inactive SKUs

    while (collected.length < 24 && iterations < MAX_ITERATIONS) {
      const body = cursor
        ? { NextPage: cursor }
        : { AdvancedProductFilters: [{ Type: 'ProductType', Values: [{ Value: category }] }], PageSize: 100 };

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
      collected.push(...(data.Products || []).filter(p => p.Orderable));
      cursor = data.NextPage || null;
      iterations += 1;
      if (!cursor) break; // no more pages
    }

    res.json({
      success: true,
      category,
      categories: TOOLS_CATEGORIES,
      products: collected.slice(0, 24),
      nextCursor: cursor,
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

module.exports = router;
