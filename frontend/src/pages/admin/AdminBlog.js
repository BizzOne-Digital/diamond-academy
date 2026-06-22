import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

// ─── BLOG LIST ────────────────────────────────────────────────────────────────
export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/blogs/admin/all');
      setPosts(data.blogs || []);
    } catch { toast.error('Failed to load posts'); }
    finally { setLoading(false); }
  };

  const togglePublish = async (post) => {
    try {
      await api.put(`/blogs/${post._id}`, { isPublished: !post.isPublished });
      setPosts(prev => prev.map(p => p._id === post._id ? { ...p, isPublished: !p.isPublished } : p));
      toast.success(post.isPublished ? 'Post unpublished' : 'Post published');
    } catch { toast.error('Failed to update'); }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setPosts(prev => prev.filter(p => p._id !== id));
      toast.success('Post deleted');
    } catch { toast.error('Failed to delete'); }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Blog Posts</h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>Create and manage blog posts</p>
        </div>
        <button onClick={() => navigate('/admin/blog/new')} className="btn btn-primary">+ New Post</button>
      </div>

      {posts.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#9ca3af' }}>
          <p style={{ marginBottom: '20px', fontSize: '16px' }}>No blog posts yet.</p>
          <button onClick={() => navigate('/admin/blog/new')} className="btn btn-primary">Write First Post</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map(post => (
            <div key={post._id} style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', borderLeft: `4px solid ${post.isPublished ? '#22c55e' : '#e5e7eb'}` }}>
              {post.coverImage && <img src={post.coverImage} alt="" style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontWeight: 600, color: C.navy, fontSize: '15px', margin: 0 }}>{post.title}</h3>
                  <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, background: post.isPublished ? '#dcfce7' : '#f3f4f6', color: post.isPublished ? '#16a34a' : '#6b7280' }}>{post.isPublished ? 'Published' : 'Draft'}</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>{post.category} · {post.author} · {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => togglePublish(post)} style={{ padding: '7px 14px', background: post.isPublished ? '#fef3c7' : '#dcfce7', color: post.isPublished ? '#d97706' : '#16a34a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>{post.isPublished ? 'Unpublish' : 'Publish'}</button>
                <button onClick={() => navigate(`/admin/blog/edit/${post._id}`)} className="btn btn-outline btn-sm">Edit</button>
                <button onClick={() => deletePost(post._id)} style={{ padding: '7px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BLOG FORM ────────────────────────────────────────────────────────────────
export function AdminBlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', coverImage: '',
    coverImagePublicId: '', category: 'Diamond Education', tags: '', isPublished: false, author: 'Archana Jaswani',
  });

  useEffect(() => {
    if (isEdit) {
      api.get('/blogs/admin/all').then(r => {
        const post = r.data.blogs.find(b => b._id === id);
        if (post) setForm({ ...post, tags: post.tags?.join(', ') || '' });
        else { toast.error('Post not found'); navigate('/admin/blog'); }
      }).catch(() => navigate('/admin/blog'));
    }
  }, [id]);

  const autoSlug = (title) => {
    const s = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(f => ({ ...f, slug: s }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm(f => ({ ...f, coverImage: data.url, coverImagePublicId: data.publicId }));
      toast.success('Image uploaded!');
    } catch { toast.error('Upload failed'); }
    finally { setImageUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) { toast.error('Title, slug and content are required'); return; }
    setLoading(true);
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    try {
      if (isEdit) { await api.put(`/blogs/${id}`, payload); toast.success('Post updated!'); }
      else { await api.post('/blogs', payload); toast.success('Post created!'); }
      navigate('/admin/blog');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <button onClick={() => navigate('/admin/blog')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '14px', marginBottom: '8px' }}>← Back to Blog</button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>{isEdit ? 'Edit Post' : 'New Blog Post'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Post Details</h2>
          <div className="form-group"><label>Title *</label><input placeholder="Post title" value={form.title} onChange={e => { setForm(f => ({ ...f, title: e.target.value })); if (!isEdit) autoSlug(e.target.value); }} required /></div>
          <div className="form-group"><label>URL Slug *</label><input placeholder="post-url-slug" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required /></div>
          <div className="form-group"><label>Excerpt (short summary shown on blog list)</label><textarea placeholder="Brief description..." value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} style={{ minHeight: '80px' }} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                <option>Diamond Education</option>
                <option>Industry Insights</option>
                <option>Grading Tips</option>
                <option>Gemology</option>
                <option>News</option>
                <option>General</option>
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}><label>Author</label><input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} /></div>
          </div>
          <div className="form-group" style={{ marginTop: '16px' }}><label>Tags (comma separated)</label><input placeholder="diamonds, grading, tips" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} /></div>
        </div>

        {/* Cover Image */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Cover Image</h2>
          {form.coverImage && <img src={form.coverImage} alt="Cover" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />}
          <div className="form-group"><label>Upload Image</label><input type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} /></div>
          {imageUploading && <p style={{ color: C.coral, fontSize: '14px' }}>Uploading...</p>}
          <div className="form-group"><label>Or Paste Image URL</label><input type="url" placeholder="https://..." value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))} /></div>
        </div>

        {/* Content */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '8px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Content *</h2>
          <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>You can use basic HTML tags: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;</p>
          <textarea
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            placeholder="<p>Write your blog post content here...</p>"
            required
            style={{ width: '100%', minHeight: '400px', padding: '16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontFamily: 'monospace', lineHeight: 1.6, resize: 'vertical' }}
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>
          <input type="checkbox" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} />
          Publish immediately (visible to all visitors)
        </label>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ opacity: loading ? 0.7 : 1 }}>{loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}</button>
          <button type="button" onClick={() => navigate('/admin/blog')} className="btn btn-outline btn-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
}