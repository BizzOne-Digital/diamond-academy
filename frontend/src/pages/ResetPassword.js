import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [pw, setPw] = useState({ password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pw.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (pw.password !== pw.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/reset-password', { token, password: pw.password });
      setSession(data.token, data.user);
      toast.success('Password reset! You are now logged in.');
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'This link is invalid or has expired');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Reset Password | American Diamonds Academy</title></Helmet>
      <div style={{ minHeight: '100vh', background: C.light, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '48px', width: '100%', maxWidth: '440px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 400, color: C.navy, marginBottom: '8px' }}>Set a New Password</h1>
            <p style={{ color: '#6b7280', fontSize: '15px' }}>Choose a new password for your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="At least 6 characters" value={pw.password} onChange={e => setPw(p => ({ ...p, password: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Repeat your password" value={pw.confirm} onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))} required />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', marginBottom: '20px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            <Link to="/login" style={{ color: C.coral, fontWeight: 600 }}>Back to Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
