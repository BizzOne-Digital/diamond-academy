import React from 'react';
import api from '../utils/api';
import WhopCheckout, { findWhopPlanForComingSoonTitle } from './WhopCheckout';

// Diamond Shape Intelligence has launched — it's a real Course now, not a coming-soon
// card (see CourseDetail.js / WhopCheckout.js WHOP_PLAN_BY_SLUG). Only Diamond
// Precision remains upcoming.
const DEFAULT_ITEMS = [
  { _id: '1', title: 'Diamond Precision', subtitle: 'Applied Diamond Measurement & Valuation', description: 'This masterclass integrates advanced diamond grading knowledge with the quantitative tools used in real-world diamond evaluation and pricing. Building on Cut, Colour, Clarity, and Carat interpretation, the course introduces key analytical frameworks including proportion analysis, carat weight estimation logic, and value impact assessments based on cut performance and light efficiency. You will also explore advanced evaluation models for fancy-cut diamonds, along with an introduction to fancy colour grading considerations and how structure influences perceived value. A core component of the program focuses on how grading outcomes influence market pricing, including value adjustments tied to cut quality, proportion efficiency, and trade benchmarks similar to Rapaport-style pricing structures. Designed as the final stage of the Diamond Intelligence framework, this course moves beyond visual interpretation into structured calculation — connecting how a diamond looks with how it is measured, compared, and valued in the global trade. Pre-requisite: Diamond Intelligence', image: '/course-precision.png' },
];

// Full-bleed, edge-to-edge alternating rows (image | text, no gap or rounded card) —
// matches the CDA reference site. Shared by the Homepage and the Education page so
// both show the same "Upcoming Programs" content and layout.
export default function ComingSoonSection({ C }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    api.get('/comingsoon')
      .then(r => setItems(r.data.items?.length ? r.data.items : DEFAULT_ITEMS))
      .catch(() => setItems(DEFAULT_ITEMS));
  }, []);

  if (!items.length) return null;

  return (
    <div>
      {items.map((item, i) => {
        const whopPlanId = findWhopPlanForComingSoonTitle(item.title);
        return (
          <section key={item._id} style={{ background: i % 2 === 0 ? C.navy : 'white', padding: '0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {i % 2 === 0 ? (
                <>
                  <div style={{ position: 'relative', minHeight: '420px', background: `url(${item.image || '/course-precision.png'}) center/cover no-repeat` }} />
                  <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
                    <div style={{ display: 'inline-block', background: C.coral, color: 'white', padding: '5px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', width: 'fit-content' }}>COMING SOON</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, marginBottom: '8px', lineHeight: 1.15 }}>{item.title}</h2>
                    {item.subtitle && <p style={{ fontWeight: 700, color: C.coral, marginBottom: '20px', fontSize: '15px' }}>{item.subtitle}</p>}
                    <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, fontSize: '15px' }}>{item.description}</p>
                    {whopPlanId && <div style={{ marginTop: '24px' }}><WhopCheckout planId={whopPlanId} label="Join Waitlist" /></div>}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'inline-block', background: C.coral, color: 'white', padding: '5px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', width: 'fit-content' }}>COMING SOON</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: C.navy, marginBottom: '8px', lineHeight: 1.15 }}>{item.title}</h2>
                    {item.subtitle && <p style={{ fontWeight: 700, color: C.coral, marginBottom: '20px', fontSize: '15px' }}>{item.subtitle}</p>}
                    <p style={{ color: '#4b5563', lineHeight: 1.85, fontSize: '15px' }}>{item.description}</p>
                    {whopPlanId && <div style={{ marginTop: '24px' }}><WhopCheckout planId={whopPlanId} label="Join Waitlist" /></div>}
                  </div>
                  <div style={{ position: 'relative', minHeight: '420px', background: `url(${item.image || '/course-fancy-shapes.jpeg'}) center/cover no-repeat` }} />
                </>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
