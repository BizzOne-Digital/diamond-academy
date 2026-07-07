import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function AdminCourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', description: '', shortDescription: '',
    level: 'Beginner', price: '', currency: 'USD', duration: '',
    image: '', imagePublicId: '', isActive: true, isFeatured: false, financingAvailable: false,
    whatYouLearn: [''], requirements: [''],
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/admin/courses`).then(r => {
        const course = r.data.courses.find(c => c._id === id);
        if (course) setForm({ ...course, whatYouLearn: course.whatYouLearn?.length ? course.whatYouLearn : [''], requirements: course.requirements?.length ? course.requirements : [''] });
        else { toast.error('Course not found'); navigate('/admin/courses'); }
      }).catch(() => navigate('/admin/courses'));
    }
  }, [id]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const autoSlug = (title) => {
    set('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const addItem = (field) => setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  const removeItem = (field, i) => setForm(prev => ({ ...prev, [field]: prev[field].filter((_, idx) => idx !== i) }));
  const updateItem = (field, i, val) => setForm(prev => ({ ...prev, [field]: prev[field].map((item, idx) => idx === i ? val : item) }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      set('image', data.url);
      set('imagePublicId', data.publicId);
      toast.success('Image uploaded!');
    } catch { toast.error('Image upload failed'); }
    finally { setImageUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.description || !form.price || !form.level) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    const payload = { ...form, price: parseFloat(form.price), whatYouLearn: form.whatYouLearn.filter(Boolean), requirements: form.requirements.filter(Boolean) };
    try {
      if (isEdit) { await api.put(`/courses/${id}`, payload); toast.success('Course updated!'); }
      else { await api.post('/courses', payload); toast.success('Course created!'); }
      navigate('/admin/courses');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <button onClick={() => navigate('/admin/courses')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '14px', marginBottom: '8px' }}>← Back to Courses</button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>{isEdit ? 'Edit Course' : 'Add New Course'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Basic Info</h2>
          <div className="form-group"><label>Course Title *</label><input placeholder="e.g. Diamond Grading: Fundamentals" value={form.title} onChange={e => { set('title', e.target.value); if (!isEdit) autoSlug(e.target.value); }} required /></div>
          <div className="form-group"><label>URL Slug *</label><input placeholder="diamond-grading-fundamentals" value={form.slug} onChange={e => set('slug', e.target.value)} required /></div>
          <div className="form-group"><label>Short Description</label><input placeholder="One line summary shown on cards" value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} /></div>
          <div className="form-group"><label>Full Description *</label><textarea placeholder="Detailed course description..." value={form.description} onChange={e => set('description', e.target.value)} style={{ minHeight: '120px' }} required /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Level *</label>
              <select value={form.level} onChange={e => set('level', e.target.value)}>
                <option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}><label>Price (USD) *</label><input type="number" min="0" step="0.01" placeholder="399.00" value={form.price} onChange={e => set('price', e.target.value)} required /></div>
            <div className="form-group" style={{ margin: 0 }}><label>Duration</label><input placeholder="e.g. 12 weeks" value={form.duration} onChange={e => set('duration', e.target.value)} /></div>
          </div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}><input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} />Active (visible to students)</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}><input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} />Featured on homepage</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}><input type="checkbox" checked={form.financingAvailable} onChange={e => set('financingAvailable', e.target.checked)} />Financing available (bundle offers — shows "Flexible Payment Plans" at checkout)</label>
          </div>
        </div>

        {/* Image Upload */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Course Image</h2>
          {form.image && <img src={form.image} alt="Course" style={{ width: '200px', height: '130px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />}
          <div className="form-group"><label>Upload Image (max 5MB)</label><input type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} /></div>
          {imageUploading && <p style={{ color: C.coral, fontSize: '14px' }}>Uploading to Cloudinary...</p>}
          <div className="form-group"><label>Or Paste Image URL</label><input type="url" placeholder="https://..." value={form.image} onChange={e => set('image', e.target.value)} /></div>
        </div>

        {/* What You'll Learn */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>What Students Will Learn</h2>
          {form.whatYouLearn.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input placeholder={`Learning point ${i + 1}`} value={item} onChange={e => updateItem('whatYouLearn', i, e.target.value)} style={{ flex: 1, padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }} />
              {form.whatYouLearn.length > 1 && <button type="button" onClick={() => removeItem('whatYouLearn', i)} style={{ padding: '8px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>✕</button>}
            </div>
          ))}
          <button type="button" onClick={() => addItem('whatYouLearn')} style={{ background: 'none', border: `1px dashed ${C.coral}`, color: C.coral, padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', marginTop: '4px' }}>+ Add Point</button>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ opacity: loading ? 0.7 : 1 }}>{loading ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}</button>
          <button type="button" onClick={() => navigate('/admin/courses')} className="btn btn-outline btn-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
}
