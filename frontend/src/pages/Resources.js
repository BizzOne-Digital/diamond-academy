import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';
import DiamondBrowser from '../components/DiamondBrowser';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

// GIA's embed.js finds the LAST <script> tag in the whole document and inserts its
// iframe right before it. If multiple tools load in parallel, their scripts can finish
// out of order and grab the wrong <script> tag, so all iframes land in one container.
// This queue forces them to load one at a time so each script is still "the last one"
// on the page at the moment it actually runs.
let giaLoadQueue = Promise.resolve();
function loadGiaTool(container, tool, isActiveRef) {
  giaLoadQueue = giaLoadQueue.then(() => new Promise((resolve) => {
    // If this effect instance was cleaned up (unmounted/re-run) while queued, skip it —
    // otherwise a late-resolving script can still inject into a container no one owns anymore.
    if (!isActiveRef.current) return resolve();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = tool ? `https://4cs.gia.edu/interactive-4cs/js/embed.js?tool=${tool}` : 'https://4cs.gia.edu/interactive-4cs/js/embed.js';
    script.charset = 'UTF-8';
    script.onload = resolve;
    script.onerror = resolve;
    container.appendChild(script);
  }));
  return giaLoadQueue;
}

function Gia4CsTool({ tool, label }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isActiveRef = { current: true };
    container.innerHTML = '';
    loadGiaTool(container, tool, isActiveRef);
    return () => {
      isActiveRef.current = false;
      container.innerHTML = '';
    };
  }, [tool]);

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(27,43,75,0.06)' }}>
      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '14px' }}>{label}</h4>
      <div ref={containerRef} style={{ width: '100%', minHeight: '80px' }} />
    </div>
  );
}

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

function getVimeoId(url) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/resources').then(r => setResources(r.data.resources || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const renderEmbed = (url) => {
    const ytId = getYouTubeId(url);
    if (ytId) return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
        <iframe src={`https://www.youtube.com/embed/${ytId}`} title="Video" frameBorder="0" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      </div>
    );
    const vimeoId = getVimeoId(url);
    if (vimeoId) return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
        <iframe src={`https://player.vimeo.com/video/${vimeoId}`} title="Video" frameBorder="0" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      </div>
    );
    return (
      <div style={{ background: C.navy, height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px 8px 0 0' }}>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Watch Video</a>
      </div>
    );
  };

  return (
    <>
      <Helmet><title>Educational Resources | American Diamond Academy</title></Helmet>
      <div className="page-hero">
        <div className="container">
          <h1>Educational Resources</h1>
          <p>Free videos and resources to expand your diamond knowledge</p>
        </div>
      </div>

      {/* Browse Natural Diamonds */}
      <DiamondBrowser />

      {/* GIA 4Cs Interactive Tools */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,40px)', fontWeight: 400, color: C.navy, marginBottom: '12px' }}>Explore the 4Cs</h2>
            <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '640px', margin: '0 auto' }}>Interactive tools from GIA — drag the sliders to see how Cut, Color, Clarity, and Carat Weight affect a diamond's appearance and value.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'start' }}>
            <Gia4CsTool tool="cut" label="Cut" />
            <Gia4CsTool tool="color" label="Color" />
            <Gia4CsTool tool="clarity" label="Clarity" />
            <Gia4CsTool tool="carat-weight" label="Carat Weight" />
            <Gia4CsTool tool="anatomy" label="Diamond Anatomy" />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: C.light }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : resources.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>🎬</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: C.navy, marginBottom: '12px' }}>Coming Soon</h3>
              <p style={{ color: '#6b7280' }}>Educational resources and videos will be published here soon. Check back shortly.</p>
            </div>
          ) : (
            <div className="grid-3">
              {resources.map(r => (
                <div key={r._id} className="card" style={{ overflow: 'hidden' }}>
                  {renderEmbed(r.videoUrl)}
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: C.coral, textTransform: 'uppercase', letterSpacing: '1px' }}>{r.category || 'Resource'}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, margin: '8px 0' }}>{r.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7 }}>{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}