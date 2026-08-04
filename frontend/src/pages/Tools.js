import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function Tools() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('Hand Tools');
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback((cat, cursor) => {
    const setter = cursor ? setLoadingMore : setLoading;
    setter(true);
    setError('');
    const params = { category: cat };
    if (cursor) params.cursor = cursor;
    api.get('/stuller/browse', { params })
      .then(r => {
        setCategories(r.data.categories || []);
        setProducts(prev => cursor ? [...prev, ...(r.data.products || [])] : (r.data.products || []));
        setNextCursor(r.data.nextCursor || null);
      })
      .catch(err => setError(err.response?.data?.message || 'Could not load tools right now.'))
      .finally(() => setter(false));
  }, []);

  useEffect(() => { load(category, null); }, [category, load]);

  return (
    <>
      <Helmet><title>Tools &amp; Supplies | American Diamonds Academy</title></Helmet>
      <div className="page-hero">
        <div className="container">
          <h1>Tools &amp; Supplies</h1>
          <p>Grading loupes, gauges, and equipment to practice what you learn</p>
        </div>
      </div>

      <section className="section" style={{ background: C.light }}>
        <div className="container">
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '10px 20px', borderRadius: '20px', border: `1px solid ${cat === category ? C.coral : '#e5e7eb'}`,
                    background: cat === category ? C.coral : 'white', color: cat === category ? 'white' : C.navy,
                    fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

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
              <p style={{ color: '#6b7280' }}>No tools available right now in this category. Check back soon.</p>
            </div>
          ) : (
            <>
              <div className="grid-3">
                {products.map((p, i) => {
                  const name = p.Description || p.ShortDescription || 'Product';
                  const image = p.Images?.[0]?.FullUrl || p.FullySetImages?.[0]?.FullUrl || '';
                  const price = p.Price?.Value;
                  return (
                    <div key={p.Id || p.SKU || i} className="card" style={{ overflow: 'hidden' }}>
                      {image ? (
                        <div style={{ height: '200px', background: `url(${image}) center/cover no-repeat`, backgroundColor: '#f3f4f6' }} />
                      ) : (
                        <div style={{ height: '200px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '36px', opacity: 0.25 }}>🧰</span>
                        </div>
                      )}
                      <div style={{ padding: '20px' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', color: C.navy, marginBottom: '6px' }}>{name}</h3>
                        {p.SKU && <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>SKU: {p.SKU}</p>}
                        {price && <p style={{ fontWeight: 700, color: C.coral, fontSize: '16px' }}>${price.toFixed(2)} {p.Price?.CurrencyCode}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
              {nextCursor && (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <button
                    onClick={() => load(category, nextCursor)}
                    disabled={loadingMore}
                    className="btn btn-outline"
                    style={{ opacity: loadingMore ? 0.6 : 1 }}
                  >
                    {loadingMore ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
