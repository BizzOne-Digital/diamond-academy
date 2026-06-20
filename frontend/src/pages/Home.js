import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GraduationSVG, DiamondSVG, BoltSVG } from '../components/Icons';
import api from '../utils/api';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

  useEffect(() => {
    api.get('/courses').then(r => setCourses(r.data.courses?.slice(0, 3) || [])).catch(() => {});
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const features = [
    { Icon: GraduationSVG, title: 'Certified Expertise', desc: 'Certified gemologist translating technical gem knowledge into clear, practical buying insight.' },
    { Icon: DiamondSVG, title: 'Street-Smart Clarity', desc: 'Learn how professionals read diamonds quickly and spot real value in the market.' },
    { Icon: BoltSVG, title: 'Fast Impact Learning', desc: 'Short, focused training built for immediate real-world application.' },
  ];

  // Desktop = bg.png, Mobile = bg1.png
  const heroBg = isMobile ? '/bg1.png' : '/bg.png';

  return (
    <>
      <Helmet><title>American Diamond Academy | Online Diamond Grading Courses</title></Helmet>

    {/* HERO */}
<section
  style={{
    position: 'relative',
    background: C.navy,
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  }}
>
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.2,
    }}
  />

  <div
    className="container"
    style={{
      position: 'relative',
      zIndex: 1,
      padding: '80px 20px',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        maxWidth: '720px',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            height: '1px',
            width: '40px',
            background: C.coral,
          }}
        />

        <span
          style={{
            color: C.coral,
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '3px',
          }}
        >
          American Diamond Academy
        </span>

        <div
          style={{
            height: '1px',
            width: '40px',
            background: C.coral,
          }}
        />
      </div>

      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(40px, 6vw, 68px)',
          fontWeight: 400,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Diamond Learning,
        <br />
        <em>Reimagined.</em>
      </h1>

      <p
        style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '18px',
          lineHeight: 1.8,
          marginBottom: '40px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Diamonds are more than grades they&apos;re light, structure, and
        brilliance. Learn to evaluate diamonds confidently, even without
        holding them in your hand.
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/education" className="btn btn-primary btn-lg">
          Explore Courses
        </Link>

        <Link to="/about" className="btn btn-outline-white btn-lg">
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* REIMAGINED */}
      <section style={{ background: C.light, padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: C.navy, marginBottom: '24px' }}>Diamond Learning, Reimagined.</h2>
          <p style={{ color: '#4b5563', fontSize: '17px', lineHeight: 1.9 }}>Diamonds are more than grades—they&apos;re light, structure, and brilliance. As the trade shifts from physical counters to virtual screens, the way we learn must evolve too. The American Diamond Academy teaches the visual skills and judgment today&apos;s digital marketplace demands.</p>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: C.navy, padding: '80px 0' }}>
        <div className="container">
          <div className="grid-3">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center', color: 'white', padding: '32px 24px' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(232,131,90,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Icon size={28} color={C.coral} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 400, marginBottom: '16px' }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      {courses.length > 0 && (
        <section className="section" style={{ background: 'white' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: C.navy, marginBottom: '16px' }}>Our Programs</h2>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>Expert-led online courses in diamond grading</p>
            </div>
            <div className="grid-3">
              {courses.map(course => (
                <div key={course._id} className="card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: '200px', background: `url(${course.image || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80'}) center/cover no-repeat`, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}><span className="badge badge-coral">{course.level}</span></div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 500, color: C.navy, marginBottom: '8px' }}>{course.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>{course.shortDescription || course.description?.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: C.navy }}>${course.price}</span>
                      <Link to={`/education/${course.slug}`} className="btn btn-primary btn-sm">View Course</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Link to="/education" className="btn btn-navy btn-lg">View All Courses</Link>
            </div>
          </div>
        </section>
      )}

      {/* PRECISION */}
      <section style={{ background: C.navy }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: C.coral, padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ color: 'white', fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>Master the science behind diamond measurement, cut efficiency, and valuation logic that determines a diamond&apos;s true market value.</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,4vw,64px)', fontWeight: 400, color: C.navy, lineHeight: 1.1 }}>Diamond<br />Precision</h2>
          </div>
          <div style={{ background: `url(https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80) center/cover no-repeat`, minHeight: '400px' }} />
        </div>
        <style>{`@media(max-width:768px){section div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr;}}`}</style>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: C.light, textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: C.navy, marginBottom: '20px' }}>Start Your Diamond Education Today</h2>
          <p style={{ color: '#6b7280', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.8 }}>Join students learning to evaluate diamonds with confidence in today&apos;s digital marketplace.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">Enroll Now</Link>
            <Link to="/contact" className="btn btn-navy btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}