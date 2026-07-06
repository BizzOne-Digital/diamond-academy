import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import api from '../utils/api';
import ScriptEmbed from '../components/ScriptEmbed';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

const CUT_SHORT = { Fair: 'F', Good: 'G', 'Very Good': 'VG', Excellent: 'EX', Ideal: 'ID' };

// No real 360° rotation frames/video exist yet for any diamond — this simulates motion by
// continuously auto-rotating/tilting the single static photo (plus a moving light sweep),
// and lets the cursor take over the tilt while hovering.
function TiltImage({ src, alt }) {
  const wrapRef = useRef(null);
  const hoverRef = useRef(false);
  const rafRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 6, ry: 0, mx: 50, my: 50 });

  useEffect(() => {
    const start = performance.now();
    const loop = (now) => {
      if (!hoverRef.current) {
        const t = (now - start) / 1000;
        setTilt({
          rx: Math.sin(t * 0.5) * 8,
          ry: Math.sin(t * 0.7) * 20,
          mx: 50 + Math.sin(t * 0.7) * 35,
          my: 50 + Math.cos(t * 0.5) * 25,
        });
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMove = (e) => {
    hoverRef.current = true;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 22, ry: (px - 0.5) * 22, mx: px * 100, my: py * 100 });
  };
  const handleLeave = () => { hoverRef.current = false; };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ background: '#e9edf2', borderRadius: '8px', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', perspective: '900px', cursor: 'grab' }}
    >
      <img
        src={src} alt={alt}
        style={{
          maxWidth: '80%', maxHeight: '80%', objectFit: 'contain',
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          willChange: 'transform',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'overlay',
        background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.9), transparent 45%)`,
      }} />
      <span style={{ position: 'absolute', bottom: '12px', right: '14px', fontSize: '11px', color: '#9ca3af', letterSpacing: '0.5px' }}>Move cursor to explore</span>
    </div>
  );
}

// Renders a real 360° viewer when the admin has pasted an embed script/snippet for this diamond.
// GIA's own scripts (and some 3rd-party embeds) come as a whole page with extra text below the
// diamond graphic — since that's a cross-origin iframe we can't reach inside to delete just the
// text, so instead the wrapper is a fixed-height window with overflow hidden that crops the view
// down to just the top (the diamond + hotspots), clipping everything else off.
function EmbedSpinner({ html }) {
  return (
    <div style={{ background: '#e9edf2', borderRadius: '8px', height: '380px', overflow: 'hidden', position: 'relative' }}>
      <ScriptEmbed html={html} style={{ width: '100%' }} />
      <span style={{ position: 'absolute', bottom: '12px', right: '14px', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: C.navy }}>360</span>
    </div>
  );
}

export default function DiamondDetail() {
  const { id } = useParams();
  const [diamond, setDiamond] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(true);

  useEffect(() => {
    api.get(`/diamonds/${id}`).then(r => setDiamond(r.data.diamond)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => toast.success('Added to inquiry cart — our team will confirm availability and follow up.');

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url }); } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><div className="spinner" /></div>;
  if (!diamond) return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, marginBottom: '12px' }}>Diamond not found</h2>
      <Link to="/resources" className="btn btn-primary">Back to Browse</Link>
    </div>
  );

  const details = [
    ['Type', 'Natural Diamond'],
    ['Shape', diamond.shape],
    ['Carat', diamond.caratWeight],
    ['Colour', diamond.colour],
    ['Clarity', diamond.clarity],
    ['Cut', diamond.cut],
    ['Polish', diamond.polish],
    ['Symmetry', diamond.symmetry],
    ['Fluorescence', diamond.fluorescence],
    ['Measurements', diamond.measurements || '—'],
  ];

  return (
    <>
      <Helmet><title>{`${diamond.caratWeight}ct ${diamond.shape} Natural Diamond | American Diamond Academy`}</title></Helmet>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <Link to="/resources" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>← Back to browse</Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px' }}>

            {/* Image — renders a real 360° embed if one was set for this diamond, otherwise simulates motion with an auto-rotating tilt */}
            <div>
              {diamond.embedCode ? (
                <EmbedSpinner html={diamond.embedCode} />
              ) : (
                <TiltImage src={diamond.image || '/course-fundamentals.png'} alt={`${diamond.shape} diamond`} />
              )}
            </div>

            {/* Info */}
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,2.5vw,30px)', color: C.navy, marginBottom: '10px', textTransform: 'uppercase', lineHeight: 1.3 }}>
                {diamond.caratWeight}ct {diamond.shape} Natural Diamond
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px', marginBottom: '18px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="1.4"><path d="M6 9l6-6 6 6-6 12z" /></svg>
                <span>Color <strong style={{ color: C.navy }}>{diamond.colour}</strong> · Clarity <strong style={{ color: C.navy }}>{diamond.clarity}</strong> · Cut <strong style={{ color: C.navy }}>{CUT_SHORT[diamond.cut] || diamond.cut}</strong></span>
              </div>
              <button onClick={handleShare} className="btn btn-outline btn-sm" style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v13M8 6l4-4 4 4M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" /></svg>
                Share
              </button>

              {/* Certification block */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '18px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: `2px solid ${C.coral}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: C.coral, fontSize: '13px' }}>{diamond.certLab}</div>
                <div>
                  <div style={{ fontWeight: 700, color: C.navy, fontSize: '15px' }}>{diamond.certLab} Certified</div>
                  {diamond.certNumber && (
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      Certificate Number: {diamond.certUrl ? <a href={diamond.certUrl} target="_blank" rel="noopener noreferrer" style={{ color: C.coral, textDecoration: 'underline' }}>{diamond.certNumber}</a> : diamond.certNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Price + CTA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: C.navy, fontSize: '16px' }}>Price</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: C.navy }}>${diamond.price} {diamond.currency}</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '18px' }}>Price only for diamond</p>
              <button onClick={addToCart} className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '32px' }}>Add to Cart</button>

              {/* Details table — collapsible */}
              <button onClick={() => setDetailsOpen(v => !v)} style={{ background: 'none', border: 'none', padding: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: detailsOpen ? '16px' : 0 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy }}>Diamond Details</h3>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>{detailsOpen ? '▲' : '▼'}</span>
              </button>
              {detailsOpen && (
                <div>
                  {details.map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px' }}>
                      <span style={{ color: '#9ca3af' }}>{label}</span>
                      <span style={{ color: C.navy, fontWeight: 600 }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
