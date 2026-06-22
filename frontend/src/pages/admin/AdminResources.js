import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', videoUrl: '', category: 'General', isPublished: false, order: 0 });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchResources(); }, []);

  const fetchResources = async () => {
    try {
      const { data } = await api.get('/resources/all');
      setResources(data.resources || []);
    } catch { toast.error('Failed to load resources'); }
    finally { setLoading(false); }
  };

  const resetForm = () => { setForm({ title: '', description: '', videoUrl: '', category: 'General', isPublished: false, order: 0 }); setEditId(null); setShowForm(false); };

  const startEdit = (r) => { setForm({ title: r.title, description: r.description || '', videoUrl: r.videoUrl, category: r.category || 'General', isPublished: r.isPublished, order: r.order || 0 }); setEditId(r._id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.videoUrl) { toast.error('Title and Video URL are required'); return; }
    setSaving(true);
    try {
      if (editId) { await api.put(`/resources/${editId}`, form); toast.success('Resource updated!'); }
      else { await api.post('/resources', form); toast.success('Resource added!'); }
      resetForm();
      fetchResources();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const togglePublish = async (r) => {
    try {
      await api.put(`/resources/${r._id}`, { ...r, isPublished: !r.isPublished });
      setResources(prev => prev.map(x => x._id === r._id ? { ...x, isPublished: !x.isPublished } : x));
      toast.success(r.isPublished ? 'Resource unpublished' : 'Resource published');
    } catch { toast.error('Failed to update'); }
  };

  const deleteResource = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try { await api.delete(`/resources/${id}`); setResources(prev => prev.filter(r => r._id !== id)); toast.success('Deleted'); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div><h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Educational Resources</h1><p style={{ color: '#6b7280', marginTop: '4px' }}>Add YouTube/Vimeo videos. Unpublished = hidden from students.</p></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn btn-primary">+ Add Resource</button>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, marginBottom: '20px' }}>{editId ? 'Edit Resource' : 'Add New Resource'}</h2>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>Title *</label><input placeholder="e.g. Understanding Diamond Cut Quality" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>Video URL * (YouTube or Vimeo)</label><input type="url" placeholder="https://www.youtube.com/watch?v=..." value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} required /></div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>Description</label><textarea placeholder="Brief description of this video..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ minHeight: '80px' }} /></div>
              <div className="form-group"><label>Category</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>General</option><option>Diamond Grading</option><option>Gemology</option><option>Jewelry</option><option>Industry Insights</option></select></div>
              <div className="form-group"><label>Display Order (lower = first)</label><input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} /></div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>
              <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
              Publish now (visible to all visitors)
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : editId ? 'Update' : 'Add Resource'}</button>
              <button type="button" onClick={resetForm} className="btn btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
      : resources.length === 0 ? <div style={{ background: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#9ca3af' }}>No resources yet. Add your first video above.</div>
      : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {resources.map(r => (
            <div key={r._id} style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderLeft: `4px solid ${r.isPublished ? '#22c55e' : '#e5e7eb'}` }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontWeight: 600, color: C.navy, fontSize: '15px', margin: 0 }}>{r.title}</h3>
                  <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, background: r.isPublished ? '#dcfce7' : '#f3f4f6', color: r.isPublished ? '#16a34a' : '#6b7280' }}>{r.isPublished ? 'Published' : 'Draft'}</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>{r.category} · <a href={r.videoUrl} target="_blank" rel="noopener noreferrer" style={{ color: C.coral }}>View Video</a></p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => togglePublish(r)} style={{ padding: '7px 14px', background: r.isPublished ? '#fef3c7' : '#dcfce7', color: r.isPublished ? '#d97706' : '#16a34a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>{r.isPublished ? 'Unpublish' : 'Publish'}</button>
                <button onClick={() => startEdit(r)} className="btn btn-outline btn-sm">Edit</button>
                <button onClick={() => deleteResource(r._id)} style={{ padding: '7px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}