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

// GET /api/stuller/tools-and-supplies
// Fetches live price/availability/images for the SKUs an admin has added via
// /admin/tools (ToolSku model), so the frontend never needs Stuller credentials
// directly and non-developers can manage the list themselves.
//
// IMPORTANT: Stuller's v2/products endpoint has no category or keyword browse mode —
// confirmed by testing ProductType, Category, MerchandisingArea, and keyword/search
// filters against the live API with real credentials: every one was silently ignored
// and returned the same unrelated default product page. Only exact SKU lookup
// (?sku=X&sku=Y, repeated) actually filters results — hence the curated-SKU approach.
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
