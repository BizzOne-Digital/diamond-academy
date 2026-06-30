import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionForm, setSessionForm] = useState({ date: '', time: '', timezone: 'EST', duration: '90 minutes', zoomLink: '', zoomPassword: '' });
  const [editSession, setEditSession] = useState(null);
  const [savingSession, setSavingSession] = useState(false);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/admin/courses');
      setCourses(data.courses || []);
    } catch { toast.error('Failed to load courses'); }
    finally { setLoading(false); }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success('Course deleted');
      fetchCourses();
    } catch { toast.error('Failed to delete'); }
  };

  const openSessions = (course) => {
    setSelectedCourse(course);
    setShowSessionModal(true);
    setEditSession(null);
    setSessionForm({ date: '', time: '', timezone: 'EST', duration: '90 minutes', zoomLink: '', zoomPassword: '' });
  };

  const saveSession = async () => {
    if (!sessionForm.date || !sessionForm.time) { toast.error('Date and time are required'); return; }
    setSavingSession(true);
    try {
      if (editSession) {
        await api.put(`/courses/${selectedCourse._id}/sessions/${editSession._id}`, sessionForm);
        toast.success('Session updated!');
      } else {
        await api.post(`/courses/${selectedCourse._id}/sessions`, sessionForm);
        toast.success('Session added!');
      }
      setEditSession(null);
      setSessionForm({ date: '', time: '', timezone: 'EST', duration: '90 minutes', zoomLink: '', zoomPassword: '' });
      const { data } = await api.get('/admin/courses');
      setCourses(data.courses || []);
      setSelectedCourse(data.courses.find(c => c._id === selectedCourse._id));
    } catch { toast.error('Failed to save session'); }
    finally { setSavingSession(false); }
  };

  const deleteSession = async (sessionId) => {
    if (!window.confirm('Delete this session?')) return;
    try {
      await api.delete(`/courses/${selectedCourse._id}/sessions/${sessionId}`);
      toast.success('Session deleted');
      const { data } = await api.get('/admin/courses');
      setCourses(data.courses || []);
      setSelectedCourse(data.courses.find(c => c._id === selectedCourse._id));
    } catch { toast.error('Failed to delete session'); }
  };

  const editSessionFn = (session) => {
    setEditSession(session);
    setSessionForm({ date: session.date?.split('T')[0] || '', time: session.time, timezone: session.timezone, duration: session.duration, zoomLink: session.zoomLink || '', zoomPassword: session.zoomPassword || '' });
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Courses</h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>Manage courses, sessions, and Zoom links</p>
        </div>
        <Link to="/admin/courses/new" className="btn btn-primary">+ Add New Course</Link>
      </div>

      {courses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '12px' }}>
          <p style={{ color: '#9ca3af', fontSize: '18px', marginBottom: '20px' }}>No courses yet.</p>
          <Link to="/admin/courses/new" className="btn btn-primary">Add First Course</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {courses.map(course => (
            <div key={course._id} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              {course.image && <img src={course.image} alt={course.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '4px' }}>{course.title}</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-navy">{course.level}</span>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>${course.price} · {course.sessions?.length || 0} sessions · {course.enrollmentCount} enrolled</span>
                  {!course.isActive && <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}>Inactive</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button onClick={() => openSessions(course)} className="btn btn-primary btn-sm">📅 Sessions ({course.sessions?.length || 0})</button>
                <Link to={`/admin/courses/edit/${course._id}`} className="btn btn-outline btn-sm">Edit</Link>
                <button onClick={() => deleteCourse(course._id)} style={{ padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Session Modal */}
      {showSessionModal && selectedCourse && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '700px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy }}>Sessions — {selectedCourse.title}</h2>
              <button onClick={() => setShowSessionModal(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>

            {/* Add/Edit Session Form */}
            <div style={{ background: C.light, borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontWeight: 600, color: C.navy, marginBottom: '16px', fontSize: '15px' }}>{editSession ? 'Edit Session' : 'Add New Session'}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Date *</label>
                  <input type="date" value={sessionForm.date} onChange={e => setSessionForm({ ...sessionForm, date: e.target.value })} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Time *</label>
                  <input type="text" placeholder="e.g. 7:00 PM" value={sessionForm.time} onChange={e => setSessionForm({ ...sessionForm, time: e.target.value })} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Timezone</label>
                  <select value={sessionForm.timezone} onChange={e => setSessionForm({ ...sessionForm, timezone: e.target.value })}>
                    <option value="EST">EST</option><option value="PST">PST</option><option value="CST">CST</option><option value="MST">MST</option><option value="UTC">UTC</option>
                  </select>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Duration</label>
                  <input type="text" placeholder="90 minutes" value={sessionForm.duration} onChange={e => setSessionForm({ ...sessionForm, duration: e.target.value })} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Zoom Link</label>
                  <input type="url" placeholder="https://zoom.us/j/..." value={sessionForm.zoomLink} onChange={e => setSessionForm({ ...sessionForm, zoomLink: e.target.value })} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Zoom Password</label>
                  <input type="text" placeholder="Optional" value={sessionForm.zoomPassword} onChange={e => setSessionForm({ ...sessionForm, zoomPassword: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button onClick={saveSession} disabled={savingSession} className="btn btn-primary btn-sm" style={{ opacity: savingSession ? 0.7 : 1 }}>
                  {savingSession ? 'Saving...' : editSession ? 'Update Session' : 'Add Session'}
                </button>
                {editSession && <button onClick={() => { setEditSession(null); setSessionForm({ date: '', time: '', timezone: 'EST', duration: '90 minutes', zoomLink: '', zoomPassword: '' }); }} className="btn btn-outline btn-sm">Cancel</button>}
              </div>
            </div>

            {/* Sessions List */}
            {selectedCourse.sessions?.length === 0 ? (
              <p style={{ color: '#9ca3af', textAlign: 'center', padding: '20px' }}>No sessions yet. Add one above.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedCourse.sessions?.sort((a, b) => new Date(a.date) - new Date(b.date)).map((session, i) => (
                  <div key={session._id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', background: session.isCompleted ? '#f9fafb' : 'white' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: C.navy, fontSize: '14px', marginBottom: '2px' }}>
                        Session {i + 1} — {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '12px' }}>{session.time} {session.timezone} · {session.duration}</div>
                      {session.zoomLink && <div style={{ color: C.coral, fontSize: '12px', marginTop: '2px' }}>🔗 Zoom link set</div>}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => editSessionFn(session)} className="btn btn-outline btn-sm" style={{ padding: '6px 12px' }}>Edit</button>
                      <button onClick={() => deleteSession(session._id)} style={{ padding: '6px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
