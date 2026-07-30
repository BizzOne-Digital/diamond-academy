import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GraduationSVG, GemSVG, BoltSVG, EmailSVG } from '../components/Icons';
import toast from 'react-hot-toast';
import api from '../utils/api';
import IgiCollabBanner from '../components/IgiCollabBanner';
import ComingSoonSection from '../components/ComingSoonSection';


// Diamond Shapes Carousel Component
function DiamondShapesCarousel({ C }) {
  const [current, setCurrent] = React.useState(0);
  const shapes = [
    {
      name: 'Round Brilliant',
      img: '/slider-2.jpg',
    },
    {
      name: 'Fancy Shapes',
      img: '/slider-3.webp',
    },
    {
      name: 'Diamond Sizes',
      img: '/course-intelligence.png',
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
  const [newsletter, setNewsletter] = useState({ name: '', email: '' });
  const [subscribing, setSubscribing] = useState(false);
  const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

  useEffect(() => {
    api.get('/courses').then(r => setCourses(r.data.courses?.slice(0, 3) || [])).catch(() => {});
  }, []);

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

  return (
    <>
      <Helmet><title>American Diamonds Academy | Online Diamond Grading Courses</title></Helmet>

      {/* HERO — full-width image with academy name overlaid, matching original CDA style.
          No color layover on the image itself — the client asked for the photo to show
          through clean/undulled, so text sits on its own scrim only where needed for
          legibility (a soft bottom gradient), not a flat tint across the whole photo. */}
      <section style={{ position: 'relative', width: '100%', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/hero-diamonds.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 20px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, color: 'white', textShadow: '0 2px 20px rgba(0,0,0,0.55)', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
            American Diamonds<br />Academy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(15px,1.8vw,18px)', maxWidth: '600px', margin: '0 auto 36px', lineHeight: 1.6, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            Online diamond grading education for buyers, sellers, and enthusiasts navigating today&apos;s digital marketplace.
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/education" className="btn btn-primary btn-lg">Explore Courses</Link>
            <Link to="/contact" className="btn btn-outline-white btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* BELOW HERO — "Diamond Learning, Reimagined." + description + Learn More.
          Wider than the standard .container so the paragraph runs closer to the
          full screen width on large monitors, per client feedback. */}
      <section style={{ background: C.light, padding: '110px 20px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px,4.5vw,60px)', fontWeight: 400, color: C.navy, marginBottom: '36px', lineHeight: 1.15 }}>
            Diamond Learning, <em>Reimagined.</em>
          </h2>
          <p style={{ color: '#374151', fontSize: '16px', lineHeight: 1.95, margin: '0 0 40px' }}>
            Diamonds are more than grades, they&apos;re light, structure, and brilliance. As the trade shifts from physical counters to virtual screens, the way we learn must evolve too. The American Diamonds Academy teaches the visual skills and judgment today&apos;s digital marketplace demands, so you can evaluate diamonds confidently, even without holding them in your hand. Whether you&apos;re a buyer, seller, or enthusiast, you&apos;ll gain clarity and a skill that lasts a lifetime.
          </p>
          <Link to="/about" className="btn btn-outline btn-lg">Learn More</Link>
        </div>
      </section>

      <IgiCollabBanner />

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

      {/* ACTIVE COURSES — full-bleed alternating rows (text | image, edge-to-edge, no
          gap), matching the CDA reference site exactly: each course is its own
          half-text/half-photo row that fills the full screen width at any size, not a
          centered card grid with a boxed image thumbnail. */}
      {courses.length > 0 && (
        <section style={{ background: 'white' }}>
          <div style={{ textAlign: 'center', padding: '80px 20px 0' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: C.navy, marginBottom: '16px' }}>Our Programs</h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>Expert-led online courses in diamond grading</p>
          </div>
          {courses.map((course, i) => (
            <div key={course._id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {i % 2 === 0 ? (
                <>
                  <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: C.light }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: C.navy, marginBottom: '16px', lineHeight: 1.15 }}>{course.title}</h3>
                    <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: 1.85, marginBottom: '28px', maxWidth: '480px' }}>{course.shortDescription || course.description?.substring(0, 160)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 600, color: C.navy }}>${course.price}</span>
                      <Link to={`/education/${course.slug}`} className="btn btn-primary btn-lg">View Course</Link>
                    </div>
                  </div>
                  <div style={{ minHeight: '480px', background: `url(${course.image || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'}) center/cover no-repeat` }} />
                </>
              ) : (
                <>
                  <div style={{ minHeight: '480px', background: `url(${course.image || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'}) center/cover no-repeat` }} />
                  <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'white' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: C.navy, marginBottom: '16px', lineHeight: 1.15 }}>{course.title}</h3>
                    <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: 1.85, marginBottom: '28px', maxWidth: '480px' }}>{course.shortDescription || course.description?.substring(0, 160)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 600, color: C.navy }}>${course.price}</span>
                      <Link to={`/education/${course.slug}`} className="btn btn-primary btn-lg">View Course</Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          <div style={{ textAlign: 'center', padding: '48px 20px' }}>
            <Link to="/education" className="btn btn-navy btn-lg">View All Courses</Link>
          </div>
        </section>
      )}

      {/* COMING SOON COURSES — shared full-bleed component, same as Education page */}
      <ComingSoonSection C={C} />

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