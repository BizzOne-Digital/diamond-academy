import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';


function ComingSoonSection({ C }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    // Fallback to hardcoded if API not yet set up
    api.get('/comingsoon').then(r => {
      if (r.data.items?.length) setItems(r.data.items);
      else setItems([
        { _id: '1', title: 'Diamond Precision', subtitle: 'Applied Diamond Measurement & Valuation', description: 'This masterclass integrates advanced diamond grading knowledge with the quantitative tools used in real-world diamond evaluation and pricing. Building on Cut, Colour, Clarity, and Carat interpretation, the course introduces key analytical frameworks including proportion analysis, carat weight estimation logic, and value impact assessments based on cut performance and light efficiency.', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80' },
        { _id: '2', title: 'Diamond Fancy Shapes', subtitle: 'Visual Evaluation', description: 'Develop expert visual evaluation skills for fancy-shaped diamonds — from pear and oval to marquise, cushion, and beyond. Learn how to assess cut quality, symmetry, and light performance across the full range of fancy shapes in today’s digital marketplace.', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80' },
      ]);
    }).catch(() => {
      setItems([
        { _id: '1', title: 'Diamond Precision', subtitle: 'Applied Diamond Measurement & Valuation', description: 'This masterclass integrates advanced diamond grading knowledge with the quantitative tools used in real-world diamond evaluation and pricing.', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80' },
        { _id: '2', title: 'Diamond Fancy Shapes', subtitle: 'Visual Evaluation', description: 'Develop expert visual evaluation skills for fancy-shaped diamonds — from pear and oval to marquise, cushion, and beyond.', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80' },
      ]);
    });
  }, []);

  if (!items.length) return null;

  return (
    <div>
      {items.map((item, i) => (
        <section key={item._id} style={{ background: i % 2 === 0 ? C.navy : 'white', padding: '0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {/* Image side - alternates */}
            {i % 2 === 0 ? (
              <>
                <div style={{ position: 'relative', minHeight: '420px', background: `url(${item.image || 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80'}) center/cover no-repeat` }} />
                <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
                  <div style={{ display: 'inline-block', background: C.coral, color: 'white', padding: '5px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', width: 'fit-content' }}>COMING SOON</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, marginBottom: '8px', lineHeight: 1.15 }}>{item.title}</h2>
                  {item.subtitle && <p style={{ fontWeight: 700, color: C.coral, marginBottom: '20px', fontSize: '15px' }}>{item.subtitle}</p>}
                  <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, fontSize: '15px' }}>{item.description}</p>
                </div>
              </>
            ) : (
              <>
                <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'inline-block', background: C.coral, color: 'white', padding: '5px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', width: 'fit-content' }}>COMING SOON</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: C.navy, marginBottom: '8px', lineHeight: 1.15 }}>{item.title}</h2>
                  {item.subtitle && <p style={{ fontWeight: 700, color: C.coral, marginBottom: '20px', fontSize: '15px' }}>{item.subtitle}</p>}
                  <p style={{ color: '#4b5563', lineHeight: 1.85, fontSize: '15px' }}>{item.description}</p>
                </div>
                <div style={{ position: 'relative', minHeight: '420px', background: `url(${item.image || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'}) center/cover no-repeat` }} />
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Education() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses').then(r => setCourses(r.data.courses || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

  return (
    <>
      <Helmet><title>Education | American Diamond Academy</title></Helmet>

      <div className="page-hero">
        <div className="container">
          <h1>American Diamond Academy</h1>
          <p>Expert-led online courses in diamond grading and gemology</p>
        </div>
      </div>

      {/* Intro */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80" alt="Diamond Grading" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: C.navy, marginBottom: '20px', lineHeight: 1.2 }}>Learning beyond the 4 Cs</h2>
              <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: 1.9 }}>Stop relying on certificates alone—learn how diamonds are truly assessed through light, structure, and visual intelligence. We teach you what you were never taught to see.</p>
            </div>
          </div>
          <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr;}}`}</style>
        </div>
      </section>

      {/* Courses */}
      <section className="section" style={{ background: C.light }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,40px)', fontWeight: 400, color: C.navy, marginBottom: '48px', textAlign: 'center' }}>Our Programs</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>Courses coming soon!</p>
              <p>Contact us to learn about upcoming programs.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {courses.map((course, i) => (
                <div key={course._id} className="card" style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    <div style={{ order: i % 2 === 0 ? 1 : 2, minHeight: '320px', background: `url(${course.image || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'}) center/cover no-repeat` }} />
                    <div style={{ order: i % 2 === 0 ? 2 : 1, padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <span className="badge badge-navy">{course.level}</span>
                        {course.totalSessions > 0 && <span className="badge badge-coral">{course.totalSessions} Sessions</span>}
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,2.5vw,34px)', fontWeight: 400, color: C.navy, marginBottom: '8px' }}>{course.title}</h3>
                      <p style={{ fontSize: '26px', fontWeight: 700, color: C.navy, marginBottom: '20px', fontFamily: "'Playfair Display', serif" }}>${course.price.toFixed(2)}</p>
                      <p style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: '32px', fontSize: '15px' }}>{course.shortDescription || course.description?.substring(0, 180)}...</p>
                      <Link to={`/education/${course.slug}`} className="btn btn-primary" style={{ alignSelf: 'flex-start', width: '100%', maxWidth: '320px', justifyContent: 'center' }}>View More Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </section>

      {/* Coming Soon */}
      <section style={{ background: C.coral, padding: '16px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '48px', animation: 'marquee 20s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
          {Array.from({ length: 12 }).map((_, i) => <span key={i} style={{ color: 'white', fontSize: '16px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>Coming Soon</span>)}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </section>
    </>
  );
}