import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GraduationSVG, GemSVG, BoltSVG, EmailSVG } from '../components/Icons';
import toast from 'react-hot-toast';
import api from '../utils/api';


// Diamond Shapes Carousel Component
function DiamondShapesCarousel({ C }) {
  const [current, setCurrent] = React.useState(0);
  const shapes = [
    {
      name: 'Round Brilliant',
      img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
    },
    {
      name: 'Fancy Shapes',
      img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
    },
    {
      name: 'Diamond Sizes',
      img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % shapes.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ position: 'relative', background: C.navy, overflow: 'hidden', height: '420px' }}>
      {shapes.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${s.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: i === current ? 1 : 0,
          transition: 'opacity 1s ease',
        }} />
      ))}
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,43,75,0.45)' }} />
      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 2 }}>
        {shapes.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '28px' : '10px', height: '10px', borderRadius: '5px', background: i === current ? C.coral : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
        ))}
      </div>
      {/* Shape name */}
      <div style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, textAlign: 'center' }}>
        <span style={{ color: 'white', fontSize: '14px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.8 }}>{shapes[current].name}</span>
      </div>
    </section>
  );
}

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [newsletter, setNewsletter] = useState({ name: '', email: '' });
  const [subscribing, setSubscribing] = useState(false);
  const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

  useEffect(() => {
    api.get('/courses').then(r => setCourses(r.data.courses?.slice(0, 3) || [])).catch(() => {});
    api.get('/comingsoon').then(r => setComingSoon(r.data.items || [])).catch(() => {});
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const heroBg = isMobile ? '/bg1.png' : '/bg.png';

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletter.email) { toast.error('Please enter your email'); return; }
    setSubscribing(true);
    try {
      await api.post('/leads', { name: newsletter.name || 'Newsletter Subscriber', email: newsletter.email, subject: 'Diamond Digest Newsletter', message: 'Newsletter subscription request.' });
      toast.success('You are subscribed to Diamond Digest!');
      setNewsletter({ name: '', email: '' });
    } catch { toast.error('Subscription failed. Please try again.'); }
    finally { setSubscribing(false); }
  };

  const features = [
    { Icon: GraduationSVG, title: 'Certified Expertise', desc: 'Certified gemologist translating technical gem knowledge into clear, practical buying insight.' },
    { Icon: GemSVG, title: 'Street-Smart Clarity', desc: 'Learn how professionals read diamonds quickly and spot real value in the market.' },
    { Icon: BoltSVG, title: 'Fast Impact Learning', desc: 'Short, focused training built for immediate real-world application.' },
  ];

  const [comingSoon, setComingSoon] = useState([]);

  return (
    <>
      <Helmet><title>American Diamond Academy | Online Diamond Grading Courses</title></Helmet>

      {/* HERO — full-width image with academy name overlaid, matching original CDA style */}
      <section style={{ position: 'relative', width: '100%', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,43,75,0.55)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 20px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700, color: 'white', lineHeight: 1.1, letterSpacing: '-1px' }}>
            American Diamond<br />Academy
          </h1>
        </div>
      </section>

      {/* BELOW HERO — "Diamond Learning, Reimagined." + description + CTA buttons */}
      <section style={{ background: C.light, padding: '72px 20px' }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,56px)', fontWeight: 400, color: C.navy, marginBottom: '24px', lineHeight: 1.15 }}>
            Diamond Learning, <em>Reimagined.</em>
          </h2>
          <p style={{ color: '#374151', fontSize: '17px', lineHeight: 1.9, marginBottom: '40px', maxWidth: '720px', margin: '0 auto 40px' }}>
            Diamonds are more than grades—they&apos;re light, structure, and brilliance. As the trade shifts from physical counters to virtual screens, the way we learn must evolve too. The American Diamond Academy teaches the visual skills and judgment today&apos;s digital marketplace demands—so you can evaluate diamonds confidently, even without holding them in your hand. Whether you&apos;re a buyer, seller, or enthusiast, you&apos;ll gain clarity and a skill that lasts a lifetime.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/education" className="btn btn-primary btn-lg">Explore Courses</Link>
            <Link to="/about" className="btn btn-outline btn-lg">Learn More</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* REIMAGINED — removed duplicate section per client feedback */}

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

      {/* ACTIVE COURSES */}
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

      {/* COMING SOON COURSES */}
      {comingSoon.length > 0 && (
        <section className="section" style={{ background: C.light }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-block', background: C.coral, color: 'white', padding: '6px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Coming Soon</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: C.navy }}>Upcoming Programs</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
              {comingSoon.map(c => (
                <div key={c._id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', width: 'clamp(280px, calc(50% - 12px), 560px)', flexShrink: 0 }}>
                  {/* Course image */}
                  {c.image ? (
                    <div style={{ height: '220px', background: `url(${c.image}) center/cover no-repeat` }} />
                  ) : (
                    <div style={{ height: '160px', background: `linear-gradient(135deg, ${C.navy}, ${C.coral})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 9L12 22L22 9L12 2Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'inline-block', background: C.coral, color: 'white', padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', marginBottom: '14px' }}>COMING SOON</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,2.5vw,28px)', fontWeight: 400, color: C.navy, marginBottom: '6px' }}>{c.title}</h3>
                    {c.subtitle && <p style={{ color: C.coral, fontSize: '13px', fontWeight: 600, marginBottom: '14px' }}>{c.subtitle}</p>}
                    <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.8, marginBottom: '20px' }}>{c.description}</p>
                    <div style={{ padding: '12px 16px', background: C.light, borderRadius: '8px', fontSize: '13px', color: '#6b7280' }}>
                      Join our newsletter to be notified when this course launches.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* DIAMOND SHAPES CAROUSEL */}
      <DiamondShapesCarousel C={C} />

      {/* NEWSLETTER — DIAMOND DIGEST */}
      <section style={{ background: C.navy, padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,131,90,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <EmailSVG size={26} color={C.coral} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,40px)', fontWeight: 400, color: 'white', marginBottom: '12px' }}>Diamond Digest</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.8, marginBottom: '36px' }}>
            Get diamond education updates, course openings, and important Academy announcements.
          </p>
          <form onSubmit={handleNewsletter} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={newsletter.name}
              onChange={e => setNewsletter({ ...newsletter, name: e.target.value })}
              style={{ padding: '14px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', width: '100%' }}
            />
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Your email address *"
                value={newsletter.email}
                onChange={e => setNewsletter({ ...newsletter, email: e.target.value })}
                required
                style={{ flex: 1, padding: '14px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', minWidth: '200px' }}
              />
              <button type="submit" disabled={subscribing} className="btn btn-primary" style={{ padding: '14px 28px', opacity: subscribing ? 0.7 : 1, whiteSpace: 'nowrap' }}>
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '16px' }}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: C.light, textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: C.navy, marginBottom: '20px' }}>Start Your Diamond Education Today</h2>
          <p style={{ color: '#6b7280', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.8 }}>Join students learning to evaluate diamonds with confidence in today's digital marketplace.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">Enroll Now</Link>
            <Link to="/contact" className="btn btn-navy btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}