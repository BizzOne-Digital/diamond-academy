import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function ToolDetail() {
  const { sku } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) return;
    setLoading(true);
    api.get(`/stuller/product/${encodeURIComponent(sku)}`)
      .then(r => setProduct(r.data.product))
      .catch(err => setError(err.response?.data?.message || 'Could not load this product.'))
      .finally(() => setLoading(false));
  }, [sku, product]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '120px 20px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>;
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, marginBottom: '10px' }}>Product not found</h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>{error}</p>
        <Link to="/tools" className="btn btn-outline">Back to Tools &amp; Supplies</Link>
      </div>
    );
  }

  const name = product.Description || product.ShortDescription || 'Product';
  const image = product.Images?.[0]?.FullUrl || product.FullySetImages?.[0]?.FullUrl || '';
  const price = product.Price?.Value;
  const description = product.LongDescription || product.Description || product.ShortDescription || '';
  const brand = product.Brand?.Name || product.Brand;
  const specs = (product.DescriptiveElementGroup?.DescriptiveElements || [])
    .filter(el => el.DisplayValue && el.DisplayValue !== 'N/A');

  const submitCheckout = async (e) => {
    e.preventDefault();
    if (!checkoutForm.name.trim() || !checkoutForm.email.trim()) {
      toast.error('Name and email are required');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await api.post('/stuller/checkout', {
        ...checkoutForm,
        sku: product.SKU,
        productName: name,
        price: product.Price?.Value,
        currency: product.Price?.CurrencyCode,
        qty,
      });
      window.location.href = data.sessionUrl;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not start checkout');
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet><title>{name} | American Diamonds Academy</title></Helmet>

      <div style={{ background: C.light, padding: '18px 0' }}>
        <div className="container" style={{ fontSize: '13px', color: '#6b7280' }}>
          <Link to="/tools" style={{ color: '#6b7280', textDecoration: 'none' }}>Tools &amp; Supplies</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: C.navy }}>{name}</span>
        </div>
      </div>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'start' }}>
            <div style={{ background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '560px', overflow: 'hidden' }}>
              {image ? (
                <img src={image} alt={name} style={{ width: '100%', height: '100%', maxHeight: '680px', objectFit: 'contain' }} />
              ) : (
                <span style={{ fontSize: '64px', opacity: 0.25 }}>🧰</span>
              )}
            </div>

            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', color: C.navy, marginBottom: '16px' }}>{name}</h1>
              {product.SKU && <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>Item # {product.SKU}</p>}

              {brand && <p style={{ marginBottom: '6px' }}><strong style={{ color: C.navy }}>Brand:</strong> {brand}</p>}
              {specs.map(el => (
                <p key={el.Name} style={{ marginBottom: '6px' }}><strong style={{ color: C.navy }}>{el.Name}:</strong> {el.DisplayValue}</p>
              ))}
              {description && <p style={{ margin: '16px 0 20px' }}><strong style={{ color: C.navy }}>About this Item:</strong><br />{description}</p>}

              {price && (
                <p style={{ fontWeight: 700, color: C.coral, fontSize: '28px', marginBottom: '24px' }}>
                  ${price.toFixed(2)} {product.Price?.CurrencyCode}
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <label style={{ fontSize: '13px', color: '#6b7280' }}>QTY</label>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                  style={{ width: '80px', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px' }}
                onClick={() => setShowCheckoutForm(true)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {showCheckoutForm && (
        <div
          onClick={() => setShowCheckoutForm(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <form
            onSubmit={submitCheckout}
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'white', borderRadius: '12px', maxWidth: '420px', width: '100%', padding: '32px' }}
          >
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, marginBottom: '6px' }}>Checkout</h2>
            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
              {name} — Qty {qty} — ${price != null ? (price * qty).toFixed(2) : ''} {product.Price?.CurrencyCode}
            </p>

            <div className="form-group">
              <label>Name *</label>
              <input value={checkoutForm.name} onChange={e => setCheckoutForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={checkoutForm.email} onChange={e => setCheckoutForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={checkoutForm.phone} onChange={e => setCheckoutForm(f => ({ ...f, phone: e.target.value }))} />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ flex: 1, opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Redirecting...' : 'Pay Now'}
              </button>
              <button type="button" onClick={() => setShowCheckoutForm(false)} className="btn btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
