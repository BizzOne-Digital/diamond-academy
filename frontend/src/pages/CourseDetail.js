import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function CourseDetail() {
  const { slug } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

  useEffect(() => {
    api.get(`/courses/${slug}`).then(r => setCourse(r.data.course)).catch(() => navigate('/education')).finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (isAuthenticated && course && isEnrolled) {
      api.get(`/courses/${slug}/sessions`).then(r => setSessions(r.data.sessions || [])).catch(() => {});
    }
  }, [isAuthenticated, course]);

  const isEnrolled = user?.enrolledCourses?.some(c => c._id === course?._id || c === course?._id);

  const handleEnroll = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setPaying(true);
    try {
      const { data } = await api.post('/payments/create-checkout-session', { courseId: course._id });
      window.location.href = data.sessionUrl;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment error. Please try again.');
      setPaying(false);
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><div className="spinner" /></div>;
  if (!course) return null;

  return (
    <>
      <Helmet><title>{course.title} | American Diamond Academy</title></Helmet>

      {/* Hero */}
      <section style={{ background: C.navy, padding: '60px 0 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'end' }}>
            <div style={{ paddingBottom: '60px', color: 'white' }}>
              <Link to="/education" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>← Back to Education</Link>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ background: C.coral, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{course.level}</span>
                {course.totalSessions > 0 && <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{course.totalSessions} Sessions</span>}
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, marginBottom: '16px', lineHeight: 1.2 }}>{course.title}</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>{course.shortDescription || course.description?.substring(0, 200)}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 600 }}>${course.price.toFixed(2)}</span>
                {isEnrolled ? (
                  <span style={{ background: '#22c55e', color: 'white', padding: '10px 24px', borderRadius: '30px', fontWeight: 600, fontSize: '14px' }}>✓ Enrolled</span>
                ) : (
                  <button onClick={handleEnroll} disabled={paying} className="btn btn-primary btn-lg" style={{ opacity: paying ? 0.7 : 1 }}>
                    {paying ? 'Redirecting...' : 'Enroll Now — Pay Securely'}
                  </button>
                )}
              </div>
            </div>
            <div style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src={course.image || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr;}}`}</style>
        </div>
      </section>

      {/* Details */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 400, color: C.navy, marginBottom: '20px' }}>About This Course</h2>
              <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: '16px', marginBottom: '32px' }}>{course.description}</p>

              {course.whatYouLearn?.length > 0 && (
                <div style={{ background: C.light, borderRadius: '8px', padding: '32px', marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy, marginBottom: '20px' }}>What You&apos;ll Learn</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                ) : (
                  <button onClick={handleEnroll} disabled={paying} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '16px', opacity: paying ? 0.7 : 1 }}>
                    {paying ? 'Processing...' : 'Enroll Now'}
                  </button>
                )}
                <div style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginBottom: '24px' }}>
                  🔒 Secure payment via Stripe
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    ['📚', 'Level', course.level],
                    ['🎯', 'Sessions', course.totalSessions ? `${course.totalSessions} live sessions` : 'TBD'],
                    ['💻', 'Format', 'Online via Zoom'],
                    ['🌍', 'Language', 'English'],
                    ['⏱️', 'Access', 'Lifetime recordings'],
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
          <style>{`@media(max-width:1024px){div[style*="grid-template-columns: 2fr 1fr"]{grid-template-columns:1fr;}div[style*="position: sticky"]{position:static;}}`}</style>
        </div>
      </section>
    </>
  );
}
