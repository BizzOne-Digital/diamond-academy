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

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><div className="spinner" /></div>;
  }

  if (posts.length === 0) {
    return (
      <>
        <Helmet><title>Blog | American Diamonds Academy</title></Helmet>
        <div className="page-hero"><div className="container"><h1>Blog</h1><p>Insights, education, and industry perspectives from our gemmologists</p></div></div>
        <div style={{ textAlign: 'center', padding: '80px' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: C.navy, marginBottom: '12px' }}>No posts yet</h3>
          <p style={{ color: '#6b7280' }}>Check back soon for diamond education insights and industry news.</p>
        </div>
      </>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <>
      <Helmet><title>Blog | American Diamonds Academy</title></Helmet>

      {/* FEATURED — full-bleed split: text left, big image right */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', minHeight: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,100px)', background: C.light }}>
          {featured.category && (
            <span style={{ fontSize: '13px', fontWeight: 600, color: C.coral, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>{featured.category}</span>
          )}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5.5vw,68px)', fontWeight: 400, color: C.navy, lineHeight: 1.1, marginBottom: '28px' }}>{featured.title}</h1>
          {featured.excerpt && (
            <p style={{ color: '#4b5563', fontSize: '18px', lineHeight: 1.8, marginBottom: '36px', maxWidth: '560px' }}>{featured.excerpt}</p>
          )}
          <Link to={`/blog/${featured.slug}`} className="btn btn-primary btn-lg" style={{ width: 'fit-content' }}>View This Story</Link>
        </div>
        <div style={{ minHeight: '360px', background: featured.coverImage ? `url(${featured.coverImage}) center/cover no-repeat` : `linear-gradient(135deg, ${C.navy}, ${C.coral})` }} />
      </section>

      {/* GRID — remaining posts, large image cards */}
      {rest.length > 0 && (
        <section className="section" style={{ background: 'white' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px' }}>
              {rest.map(post => (
                <article key={post._id}>
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ aspectRatio: '1 / 1', marginBottom: '20px', background: post.coverImage ? `url(${post.coverImage}) center/cover no-repeat` : `linear-gradient(135deg, ${C.navy}, ${C.coral})` }} />
                    {post.category && (
                      <span style={{ fontSize: '12px', fontWeight: 600, color: C.coral, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>{post.category}</span>
                    )}
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 400, color: C.navy, lineHeight: 1.25, marginBottom: '10px' }}>{post.title}</h2>
                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                      {post.author} {post.publishedAt && `· ${new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
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
      <Helmet><title>{post.title} | American Diamonds Academy</title></Helmet>

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