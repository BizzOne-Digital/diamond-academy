import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function Cart() {
  const { items, loading, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [checkingOut, setCheckingOut] = useState(false);

  const total = items.reduce((sum, c) => sum + (c.price || 0), 0);

  const handleCheckout = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setCheckingOut(true);
    try {
      const { data } = await api.post('/payments/create-checkout-session', {});
      window.location.href = data.sessionUrl;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout error. Please try again.');
      setCheckingOut(false);
    }
  };

  return (
    <>
      <Helmet><title>Your Cart | American Diamond Academy</title></Helmet>
      <div className="page-hero">
        <div className="container">
          <h1>Your Cart</h1>
          <p>Review your selected courses before checkout</p>
        </div>
      </div>

      <section className="section" style={{ background: C.light }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>🛒</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy, marginBottom: '10px' }}>Your cart is empty</h3>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>Browse our courses and add one to get started.</p>
              <Link to="/education" className="btn btn-primary">Browse Courses</Link>
            </div>
          ) : (
            <>
              <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
                {items.map((course, i) => (
                  <div key={course._id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px', borderTop: i === 0 ? 'none' : '1px solid #f3f4f6', flexWrap: 'wrap' }}>
                    {course.image && <img src={course.image} alt={course.title} style={{ width: '90px', height: '68px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />}
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', color: C.navy, marginBottom: '4px' }}>{course.title}</h3>
                      {course.shortDescription && <p style={{ color: '#9ca3af', fontSize: '13px' }}>{course.shortDescription}</p>}
                    </div>
                    <span style={{ fontWeight: 700, color: C.navy, fontSize: '17px' }}>${course.price} {course.currency || 'USD'}</span>
                    <button onClick={() => removeFromCart(course._id)} style={{ padding: '8px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Remove</button>
                  </div>
                ))}
              </div>

              <div style={{ background: 'white', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: C.navy }}>Subtotal</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: C.navy }}>${total} USD</span>
                </div>
                <button onClick={handleCheckout} disabled={checkingOut} className="btn btn-primary btn-lg" style={{ width: '100%', opacity: checkingOut ? 0.7 : 1 }}>
                  {checkingOut ? 'Redirecting to payment...' : 'Proceed to Checkout'}
                </button>
                <Link to="/education" style={{ display: 'block', textAlign: 'center', marginTop: '14px', color: '#6b7280', fontSize: '14px' }}>← Continue browsing courses</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
