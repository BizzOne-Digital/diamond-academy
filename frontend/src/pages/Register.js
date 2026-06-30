import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Login | American Diamond Academy</title></Helmet>
      <div style={{ minHeight: '100vh', background: C.light, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '48px', width: '100%', maxWidth: '440px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, color: C.navy, marginBottom: '8px' }}>Welcome Back</h1>
            <p style={{ color: '#6b7280', fontSize: '15px' }}>Sign in to your academy account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', marginBottom: '20px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            Don&apos;t have an account? <Link to="/register" style={{ color: C.coral, fontWeight: 600 }}>Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', country: 'USA' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const data = await register(form.name, form.email, form.password, form.phone, form.country);
      toast.success(`Welcome, ${data.user.name}! Account created.`);
      navigate('/education');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Register | American Diamond Academy</title></Helmet>
      <div style={{ minHeight: '100vh', background: C.light, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '48px', width: '100%', maxWidth: '480px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, color: C.navy, marginBottom: '8px' }}>Create Account</h1>
            <p style={{ color: '#6b7280', fontSize: '15px' }}>Join American Diamond Academy</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label>Full Name</label><input placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="form-group"><label>Email Address</label><input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
            <div className="form-group"><label>Password</label><input type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></div>
            <div className="form-group"><label>Phone (optional)</label><input placeholder="+1 (xxx) xxx-xxxx" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="form-group">
              <label>Country</label>
              <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
                <option value="USA">USA</option><option value="Canada">Canada</option><option value="UK">UK</option><option value="India">India</option><option value="UAE">UAE</option><option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', marginBottom: '20px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            Already have an account? <Link to="/login" style={{ color: C.coral, fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
