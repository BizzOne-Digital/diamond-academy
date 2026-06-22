import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';

const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

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