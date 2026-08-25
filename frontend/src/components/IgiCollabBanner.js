import React from 'react';

// IGI authorization banner — exact style/copy pattern from the CDA reference site:
// solid gold/bronze full-width band with two centered white paragraphs. Shown on the
// Homepage (right after "Diamond Learning, Reimagined") and the Education page.
export default function IgiCollabBanner() {
  return (
    <section style={{ background: '#96702C', padding: '48px 32px', textAlign: 'center' }}>
      <p style={{ color: 'white', fontWeight: 700, fontSize: '17px', lineHeight: 1.7, marginBottom: '20px' }}>
        * American Diamonds Academy is honoured to have received authorization from the International Gemological Institute (IGI) to reference selected IGI educational resources (with appropriate attribution to IGI) within its diamond education programs.
      </p>
      <p style={{ color: 'white', fontWeight: 700, fontSize: '17px', lineHeight: 1.7 }}>
        This recognition reflects a shared commitment to advancing diamond education by recognizing IGI&rsquo;s internationally recognized gemological expertise while continuing to develop ADA&rsquo;s practical approach to visual diamond evaluation, light performance, and real-world application.
      </p>
    </section>
  );
}
