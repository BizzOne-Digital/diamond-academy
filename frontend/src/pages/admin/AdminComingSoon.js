import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

export default function AdminComingSoon() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '', description: '', image: '', isActive: true, order: 0 });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/comingsoon/all');
      setItems(data.items || []);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const reset = () => { setForm({ title: '', subtitle: '', description: '', image: '', isActive: true, order: 0 }); setEditId(null); setShowForm(false); };

  const startEdit = (item) => { setForm({ ...item }); setEditId(item._id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const { data } = await api.post('/upload/image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm(f => ({ ...f, image: data.url }));
      toast.success('Image uploaded!');
    } catch { toast.error('Upload failed'); }
    finally { setImageUploading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title) { toast.error('Title is required'); return; }
    setSaving(true);
    try {
      if (editId) { await api.put(`/comingsoon/${editId}`, form); toast.success('Updated!'); }
      else { await api.post('/comingsoon', form); toast.success('Added!'); }
      reset(); fetchItems();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const toggleActive = async (item) => {
    try {
      await api.put(`/comingsoon/${item._id}`, { ...item, isActive: !item.isActive });
      setItems(prev => prev.map(x => x._id === item._id ? { ...x, isActive: !x.isActive } : x));
      toast.success(item.isActive ? 'Hidden' : 'Visible');
    } catch { toast.error('Failed'); }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this coming soon course?')) return;
    try { await api.delete(`/comingsoon/${id}`); setItems(prev => prev.filter(x => x._id !== id)); toast.success('Deleted'); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Coming Soon Courses</h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>Manage courses shown in the Coming Soon section on the Education page</p>
        </div>
        <button onClick={() => { reset(); setShowForm(true); }} className="btn btn-primary">+ Add Course</button>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, marginBottom: '20px' }}>{editId ? 'Edit Course' : 'Add Coming Soon Course'}</h2>
          <form onSubmit={handleSave}>
            <div className="form-group"><label>Course Title *</label><input placeholder="e.g. Diamond Precision" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required /></div>
            <div className="form-group"><label>Subtitle</label><input placeholder="e.g. Applied Diamond Measurement & Valuation" value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} /></div>
            <div className="form-group"><label>Description</label><textarea placeholder="Course description..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ minHeight: '100px' }} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}><label>Upload Image</label><input type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} /></div>
              <div className="form-group" style={{ margin: 0 }}><label>Or Image URL</label><input type="url" placeholder="https://..." value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
            </div>
            {imageUploading && <p style={{ color: C.coral, fontSize: '13px', marginTop: '8px' }}>Uploading...</p>}
            {form.image && <img src={form.image} alt="" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginTop: '12px' }} />}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}><label>Display Order (lower = first)</label><input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} /></div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', marginTop: '16px', marginBottom: '20px' }}>
              <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
              Show on website
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : editId ? 'Update' : 'Add'}</button>
              <button type="button" onClick={reset} className="btn btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
      : items.length === 0 ? <div style={{ background: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#9ca3af' }}>No coming soon courses yet. Add one above.</div>
      : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(item => (
            <div key={item._id} style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', borderLeft: `4px solid ${item.isActive ? C.coral : '#e5e7eb'}` }}>
              {item.image && <img src={item.image} alt="" style={{ width: '72px', height: '52px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontWeight: 600, color: C.navy, fontSize: '15px', margin: 0 }}>{item.title}</h3>
                  <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, background: item.isActive ? '#fef3c7' : '#f3f4f6', color: item.isActive ? '#d97706' : '#6b7280' }}>{item.isActive ? 'Visible' : 'Hidden'}</span>
                </div>
                {item.subtitle && <p style={{ color: C.coral, fontSize: '13px', margin: 0, fontWeight: 500 }}>{item.subtitle}</p>}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => toggleActive(item)} style={{ padding: '7px 14px', background: item.isActive ? '#f3f4f6' : '#fef3c7', color: item.isActive ? '#6b7280' : '#d97706', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>{item.isActive ? 'Hide' : 'Show'}</button>
                <button onClick={() => startEdit(item)} className="btn btn-outline btn-sm">Edit</button>
                <button onClick={() => deleteItem(item._id)} style={{ padding: '7px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}