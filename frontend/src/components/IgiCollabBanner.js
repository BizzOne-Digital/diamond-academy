import React from 'react';

// IGI collaboration banner — shown on the Homepage and Education page. Displayed in
// gold per the client's reference site. Falls back to a text lockup until the actual
// IGI logo file (/igi-collaboration.webp) is placed in /public.
export default function IgiCollabBanner() {
  return (
    <section style={{ background: '#0f1a2e', padding: '32px 0' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>In Collaboration With</span>
        <img
          src="/igi-collaboration.webp"
          alt="IGI Collaboration"
          style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline-block'; }}
        />
        <span style={{ display: 'none', fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#D4AF37', letterSpacing: '1px' }}>IGI</span>
      </div>
    </section>
  );
}
