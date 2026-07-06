import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function CourseDetail() {
  const { slug } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

  useEffect(() => {
    api.get(`/courses/${slug}`).then(r => setCourse(r.data.course)).catch(() => navigate('/education')).finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (isAuthenticated && course && isEnrolled) {
      api.get(`/courses/${slug}/sessions`).then(r => setSessions(r.data.sessions || [])).catch(() => {});
    }
  }, [isAuthenticated, course]);

  const isEnrolled = user?.enrolledCourses?.some(c => c._id === course?._id || c === course?._id);
  const inCart = isInCart(course?._id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setAddingToCart(true);
    const ok = await addToCart(course._id);
    setAddingToCart(false);
    if (ok) navigate('/cart');
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><div className="spinner" /></div>;
  if (!course) return null;

  return (
    <>
      <Helmet><title>{course.title} | American Diamond Academy</title></Helmet>

      {/* Hero */}
      <section style={{ background: C.navy, padding: '60px 0 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'end' }}>
            <div style={{ paddingBottom: '60px', color: 'white' }}>
              <Link to="/education" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>← Back to Education</Link>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ background: C.coral, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{course.level}</span>
                {course.totalSessions > 0 && <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{course.totalSessions} Sessions</span>}
                <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} /> Live Interactive Zoom Classes
                </span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, marginBottom: '16px', lineHeight: 1.2 }}>{course.title}</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>{course.shortDescription || course.description?.substring(0, 200)}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 600 }}>${course.price.toFixed(2)}</span>
                {isEnrolled ? (
                  <span style={{ background: '#22c55e', color: 'white', padding: '10px 24px', borderRadius: '30px', fontWeight: 600, fontSize: '14px' }}>✓ Enrolled</span>
                ) : inCart ? (
                  <Link to="/cart" className="btn btn-primary btn-lg">View Cart</Link>
                ) : (
                  <button onClick={handleAddToCart} disabled={addingToCart} className="btn btn-primary btn-lg" style={{ opacity: addingToCart ? 0.7 : 1 }}>
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                )}
              </div>
            </div>
            <div style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src={course.image || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          
        </div>
      </section>

      {/* Details */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 400, color: C.navy, marginBottom: '20px' }}>About This Course</h2>
              <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: '16px', marginBottom: '32px' }}>{course.description}</p>

              {/* Live Zoom classes callout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: `linear-gradient(135deg, ${C.navy}, #263a5e)`, borderRadius: '8px', padding: '24px 28px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(232,131,90,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.coral} strokeWidth="1.8"><rect x="2" y="5" width="14" height="14" rx="2" /><path d="M16 9l6-4v14l-6-4" /></svg>
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '2px' }}>Live, Interactive Zoom Classes</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Learn face-to-face with a certified gemologist in real time — ask questions live, not pre-recorded video.</div>
                </div>
              </div>

              {course.whatYouLearn?.length > 0 && (
                <div style={{ background: C.light, borderRadius: '8px', padding: '32px', marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy, marginBottom: '20px' }}>What You&apos;ll Learn</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                    {course.whatYouLearn.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: C.coral, fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>✓</span>
                        <span style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enrolled: show sessions */}
              {isEnrolled && sessions.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy, marginBottom: '20px' }}>Upcoming Sessions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {sessions.map((session, i) => (
                      <div key={session._id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: C.navy, marginBottom: '4px' }}>Session {i + 1} — {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                          <div style={{ color: '#6b7280', fontSize: '14px' }}>{session.time} {session.timezone} · {session.duration}</div>
                        </div>
                        {session.zoomLink && !session.isCompleted && (
                          <a href={session.zoomLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Join Zoom</a>
                        )}
                        {session.isCompleted && session.recordingUrl && (
                          <a href={session.recordingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Watch Recording</a>
                        )}
                        {session.isCompleted && !session.recordingUrl && <span style={{ color: '#9ca3af', fontSize: '13px' }}>Completed</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div style={{ position: 'sticky', top: '90px', background: C.light, borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 600, color: C.navy, marginBottom: '20px' }}>${course.price.toFixed(2)}</p>
                {isEnrolled ? (
                  <div style={{ background: '#dcfce7', color: '#16a34a', padding: '12px 16px', borderRadius: '8px', fontWeight: 600, textAlign: 'center', marginBottom: '16px' }}>✓ You are enrolled!</div>
                ) : inCart ? (
                  <Link to="/cart" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}>View Cart</Link>
                ) : (
                  <button onClick={handleAddToCart} disabled={addingToCart} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '16px', opacity: addingToCart ? 0.7 : 1 }}>
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                )}
                <div style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginBottom: '24px' }}>
                  🔒 Secure payment via Stripe at checkout
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    ['', 'Level', course.level],
                    ['🎯', 'Sessions', course.totalSessions ? `${course.totalSessions} live sessions` : 'TBD'],
                    ['📹', 'Format', 'Live Interactive Zoom Classes'],
                    ['', 'Language', 'English'],
                    ['⏱️', 'Duration', '5 hours'],
                  ].map(([icon, label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                      <span style={{ color: '#6b7280', fontSize: '13px' }}>{icon} {label}</span>
                      <span style={{ color: C.navy, fontSize: '13px', fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}