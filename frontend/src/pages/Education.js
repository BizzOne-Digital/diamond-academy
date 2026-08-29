import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';
import IgiCollabBanner from '../components/IgiCollabBanner';
import ComingSoonSection from '../components/ComingSoonSection';

export default function Education() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses').then(r => setCourses(r.data.courses || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

  return (
    <>
      <Helmet><title>Education | American Diamonds Academy</title></Helmet>

      <div className="page-hero">
        <div className="container">
          <h1>American Diamonds Academy</h1>
          <p>Expert-led online courses in diamond grading</p>
        </div>
      </div>

      {/* Intro — full-width image, no color layover per client feedback */}
      <section style={{ position: 'relative', width: '100%', minHeight: '420px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/education-hero.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 40px', maxWidth: '860px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: 'white', textShadow: '0 2px 16px rgba(0,0,0,0.6)', marginBottom: '20px', lineHeight: 1.2 }}>Learning beyond the 4 Cs</h2>
          <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '17px', lineHeight: 1.9, maxWidth: '640px', marginBottom: '28px', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>Stop relying on certificates alone—learn how diamonds are truly assessed through light, structure, and visual intelligence. We teach you what you were never taught to see.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', background: C.coral, borderRadius: '30px', padding: '16px 28px', maxWidth: '680px', boxShadow: '0 6px 24px rgba(232,131,90,0.5)' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffffff', flexShrink: 0, boxShadow: '0 0 0 4px rgba(255,255,255,0.3)' }} />
            <span style={{ color: 'white', fontSize: '16px', fontWeight: 700, lineHeight: 1.5 }}>Live, gemmologist-led Zoom sessions with real-time interaction, discussions, and Q&amp;A.</span>
          </div>
        </div>
      </section>

      <IgiCollabBanner />

      {/* Courses */}
      {/* Our Programs — full-bleed alternating rows (text | image, edge-to-edge, no
          gap or rounded card), matching the CDA reference site exactly. */}
      <section style={{ background: C.light }}>
        <div style={{ textAlign: 'center', padding: '80px 20px 48px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,40px)', fontWeight: 400, color: C.navy }}>Our Programs</h2>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>Courses coming soon!</p>
            <p>Contact us to learn about upcoming programs.</p>
          </div>
        ) : (
          courses.map((course, i) => (
            <div key={course._id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {i % 2 === 0 ? (
                <>
                  <div style={{ minHeight: '480px', background: `url(${course.image || '/course-fundamentals.png'}) center/cover no-repeat` }} />
                  <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'white' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span className="badge badge-navy">{course.level}</span>
                      {course.totalSessions > 0 && <span className="badge badge-coral">{course.totalSessions} Sessions</span>}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: C.navy, marginBottom: '8px', lineHeight: 1.15 }}>{course.title}</h3>
                    <p style={{ fontSize: '26px', fontWeight: 700, color: C.navy, marginBottom: '20px', fontFamily: "'Playfair Display', serif" }}>${course.price}</p>
                    <p style={{ color: '#4b5563', lineHeight: 1.85, marginBottom: '28px', fontSize: '16px', maxWidth: '480px' }}>{course.shortDescription || course.description?.substring(0, 180)}...</p>
                    <Link to={`/education/${course.slug}`} className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>View More Details</Link>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: C.light }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span className="badge badge-navy">{course.level}</span>
                      {course.totalSessions > 0 && <span className="badge badge-coral">{course.totalSessions} Sessions</span>}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: C.navy, marginBottom: '8px', lineHeight: 1.15 }}>{course.title}</h3>
                    <p style={{ fontSize: '26px', fontWeight: 700, color: C.navy, marginBottom: '20px', fontFamily: "'Playfair Display', serif" }}>${course.price}</p>
                    <p style={{ color: '#4b5563', lineHeight: 1.85, marginBottom: '28px', fontSize: '16px', maxWidth: '480px' }}>{course.shortDescription || course.description?.substring(0, 180)}...</p>
                    <Link to={`/education/${course.slug}`} className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>View More Details</Link>
                  </div>
                  <div style={{ minHeight: '480px', background: `url(${course.image || '/course-fundamentals.png'}) center/cover no-repeat` }} />
                </>
              )}
            </div>
          ))
        )}
      </section>

      {/* Coming Soon Ticker */}
      <section style={{ background: C.coral, padding: '16px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '48px', animation: 'marquee 20s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
          {Array.from({ length: 12 }).map((_, i) => <span key={i} style={{ color: 'white', fontSize: '16px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>Coming Soon</span>)}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </section>

      {/* Coming Soon Courses */}
      <ComingSoonSection C={C} />
    </>
  );
}