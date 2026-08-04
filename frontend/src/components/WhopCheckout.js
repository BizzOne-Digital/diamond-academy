import React from 'react';

// Maps our course slugs to the Whop plan IDs the client provided. The Whop loader
// script (public/index.html) scans the page for elements with this data attribute and
// auto-renders either a payment form or a waitlist signup form, based on the plan's
// release_method on Whop's side — no conditional logic needed here.
export const WHOP_PLAN_BY_SLUG = {
  'diamond-grading-fundamentals': 'plan_K7nCfkBwyTUxJ', // Diamond Fundamentals — buy now, $399 CAD
  'diamond-grading-intelligence': 'plan_kdJ73RPsAkYEs', // Diamond Intelligence — buy now, $599 CAD
  'diamond-shape-intelligence': 'plan_lb3ce50TTZ3hy',   // now a live Course, not coming-soon — $599 CAD
};

// Diamond Precision isn't a purchasable Course record yet (it's the ComingSoonSection
// marketing card on the Education/Home pages) — matched by title there instead of by
// slug. See frontend/src/components/ComingSoonSection.js.
export const WHOP_PLAN_BY_COMING_SOON_TITLE = {
  'Diamond Precision': 'plan_FoZTxWKKryBxA', // waitlist, $599 CAD
};

export const findWhopPlanForComingSoonTitle = (title = '') => {
  const key = Object.keys(WHOP_PLAN_BY_COMING_SOON_TITLE).find(k => title.startsWith(k));
  return key ? WHOP_PLAN_BY_COMING_SOON_TITLE[key] : null;
};

// Renders a plain "Get Started" button that links straight to Whop's hosted checkout
// page for the plan — the same pattern used on bizzonedigital.com's own pricing page.
// This replaces the embedded <div data-whop-checkout-plan-id> widget: that widget
// renders a full inline payment form (card fields, billing address, etc.), which broke
// card layouts wherever it was dropped next to other content. A button that opens
// Whop's own checkout page has no layout footprint here at all.
//
// Same link works for both buy-now and waitlist plans — Whop decides which form to show
// based on the plan's release_method on their side. So when a "coming soon" plan is later
// switched from waitlist to on-sale, this exact link automatically becomes a real payment
// checkout — no code change needed here.
export default function WhopCheckout({ planId, label = 'Get Started', className = 'btn btn-primary btn-lg', style }) {
  if (!planId) return null;
  return (
    <a
      href={`https://whop.com/checkout/${planId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {label} →
    </a>
  );
}
