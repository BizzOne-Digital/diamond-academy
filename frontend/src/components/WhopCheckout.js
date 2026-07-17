import React from 'react';

// Maps our course slugs to the Whop plan IDs the client provided. The Whop loader
// script (public/index.html) scans the page for elements with this data attribute and
// auto-renders either a payment form or a waitlist signup form, based on the plan's
// release_method on Whop's side — no conditional logic needed here.
export const WHOP_PLAN_BY_SLUG = {
  'diamond-grading-fundamentals': 'plan_K7nCfkBwyTUxJ', // Diamond Fundamentals — buy now, $399 CAD
  'diamond-grading-intelligence': 'plan_kdJ73RPsAkYEs', // Diamond Intelligence — buy now, $599 CAD
};

// Diamond Shape Intelligence and Diamond Precision aren't purchasable Course records yet
// (they're the ComingSoonSection marketing cards on the Education page) — matched by title
// there instead of by slug. See frontend/src/pages/Education.js.
export const WHOP_PLAN_BY_COMING_SOON_TITLE = {
  'Diamond Shape Intelligence': 'plan_lb3ce50TTZ3hy', // waitlist, $599 CAD
  'Diamond Precision': 'plan_FoZTxWKKryBxA',           // waitlist, $599 CAD
};

export default function WhopCheckout({ planId, style }) {
  if (!planId) return null;
  // key forces a remount if planId ever changes on the same page, so Whop's loader
  // re-scans and re-renders the widget for the new plan instead of leaving stale markup.
  return <div key={planId} data-whop-checkout-plan-id={planId} style={{ width: '100%', ...style }} />;
}
