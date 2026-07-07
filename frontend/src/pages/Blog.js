import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

// ─── BLOG LIST ────────────────────────────────────────────────────────────────
export function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blogs').then(r => setPosts(r.data.blogs || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet><title>Blog | American Diamond Academy</title></Helmet>
      <div className="page-hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Insights, education, and industry perspectives from our gemmologists</p>
        </div>
      </div>

      <section className="section" style={{ background: C.light }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '12px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: C.navy, marginBottom: '12px' }}>No posts yet</h3>
              <p style={{ color: '#6b7280' }}>Check back soon for diamond education insights and industry news.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
              {posts.map(post => (
                <article key={post._id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {post.coverImage && (
                    <div style={{ height: '200px', background: `url(${post.coverImage}) center/cover no-repeat` }} />
                  )}
                  {!post.coverImage && (
                    <div style={{ height: '160px', background: `linear-gradient(135deg, ${C.navy}, ${C.coral})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 9L12 22L22 9L12 2Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {post.category && (
                      <span style={{ fontSize: '12px', fontWeight: 600, color: C.coral, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>{post.category}</span>
                    )}
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 500, color: C.navy, marginBottom: '12px', lineHeight: 1.3 }}>{post.title}</h2>
                    {post.excerpt && (
                      <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px', flex: 1 }}>{post.excerpt}</p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                        {post.author} · {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                      </span>
                      <Link to={`/blog/${post.slug}`} style={{ color: C.coral, fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Read More →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── SINGLE POST ──────────────────────────────────────────────────────────────
export function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blogs/${slug}`).then(r => setPost(r.data.blog)).catch(() => navigate('/blog')).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><div className="spinner" /></div>;
  if (!post) return null;

  return (
    <>
      <Helmet><title>{post.title} | American Diamond Academy</title></Helmet>

      {/* Hero */}
      <section style={{ background: C.navy, padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <Link to="/blog" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Back to Blog</Link>
          {post.category && <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: C.coral, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{post.category}</span>}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>{post.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>
            By {post.author} {post.publishedAt && `· ${new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
          </p>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div style={{ width: '100%', maxHeight: '480px', overflow: 'hidden' }}>
          <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {/* Content */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div
            className="blog-article-content"
            style={{ fontSize: '16px', lineHeight: 1.9, color: '#374151' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.tags?.length > 0 && (
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ padding: '4px 12px', background: C.light, color: C.navy, borderRadius: '20px', fontSize: '13px' }}>{tag}</span>
              ))}
            </div>
          )}
          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #f3f4f6' }}>
            <Link to="/blog" className="btn btn-navy">← Back to Blog</Link>
          </div>
        </div>
      </section>
    </>
  );
}