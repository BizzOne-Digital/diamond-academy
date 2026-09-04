import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import api from '../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Forgot Password | American Diamonds Academy</title></Helmet>
      <div style={{ minHeight: '100vh', background: C.light, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '48px', width: '100%', maxWidth: '440px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 400, color: C.navy, marginBottom: '8px' }}>Reset Your Password</h1>
            <p style={{ color: '#6b7280', fontSize: '15px' }}>Enter your email and we'll send you a reset link</p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: '24px' }}>
                If an account exists for <strong>{email}</strong>, a password reset link has been sent. Check your inbox (and spam folder).
              </p>
              <Link to="/login" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', marginBottom: '20px', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                <Link to="/login" style={{ color: C.coral, fontWeight: 600 }}>Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
