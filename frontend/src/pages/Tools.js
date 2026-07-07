import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function Tools() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/stuller/tools-and-supplies')
      .then(r => setProducts(Array.isArray(r.data.products) ? r.data.products : []))
      .catch(err => setError(err.response?.data?.message || 'Could not load tools right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet><title>Tools &amp; Supplies | American Diamond Academy</title></Helmet>
      <div className="page-hero">
        <div className="container">
          <h1>Tools &amp; Supplies</h1>
          <p>Grading loupes, gauges, and equipment to practice what you learn</p>
        </div>
      </div>

      <section className="section" style={{ background: C.light }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>🧰</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy, marginBottom: '10px' }}>Tools catalog coming soon</h3>
              <p style={{ color: '#6b7280' }}>{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '12px' }}>
              <p style={{ color: '#6b7280' }}>No tools available right now. Check back soon.</p>
            </div>
          ) : (
            <div className="grid-3">
              {products.map((p, i) => (
                <div key={p.Id || p.SKU || i} className="card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: '200px', background: `url(${p.ImageUrl || p.ImagePath || ''}) center/cover no-repeat`, backgroundColor: '#f3f4f6' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', color: C.navy, marginBottom: '6px' }}>{p.Description || p.Title || 'Product'}</h3>
                    {p.SKU && <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>SKU: {p.SKU}</p>}
                    {(p.Price || p.YourPrice) && <p style={{ fontWeight: 700, color: C.coral, fontSize: '16px' }}>${p.Price || p.YourPrice}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
