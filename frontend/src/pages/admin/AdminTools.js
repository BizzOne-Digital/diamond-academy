import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

export default function AdminTools() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ sku: '', label: '', isActive: true, order: 0 });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/tool-skus/all');
      setItems(data.items || []);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const reset = () => { setForm({ sku: '', label: '', isActive: true, order: 0 }); setEditId(null); setShowForm(false); };

  const startEdit = (item) => { setForm({ ...item }); setEditId(item._id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.sku.trim()) { toast.error('SKU is required'); return; }
    setSaving(true);
    try {
      if (editId) { await api.put(`/tool-skus/${editId}`, form); toast.success('Updated!'); }
      else { await api.post('/tool-skus', form); toast.success('Added!'); }
      reset(); fetchItems();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  const toggleActive = async (item) => {
    try {
      await api.put(`/tool-skus/${item._id}`, { ...item, isActive: !item.isActive });
      setItems(prev => prev.map(x => x._id === item._id ? { ...x, isActive: !x.isActive } : x));
      toast.success(item.isActive ? 'Hidden' : 'Visible');
    } catch { toast.error('Failed'); }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Remove this tool?')) return;
    try { await api.delete(`/tool-skus/${id}`); setItems(prev => prev.filter(x => x._id !== id)); toast.success('Deleted'); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Tools &amp; Supplies</h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Add Stuller SKUs to show on the Tools page. Find the SKU on Stuller.com's own catalog for the item you want to sell —
            Stuller's API can only look up items by exact SKU, it can't browse categories, so this list is how items get added.
          </p>
        </div>
        <button onClick={() => { reset(); setShowForm(true); }} className="btn btn-primary">+ Add Tool</button>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, marginBottom: '20px' }}>{editId ? 'Edit Tool' : 'Add Tool'}</h2>
          <form onSubmit={handleSave}>
            <div className="form-group"><label>Stuller SKU *</label><input placeholder="e.g. 200012" value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} required /></div>
            <div className="form-group"><label>Label (for your reference only)</label><input placeholder="e.g. 10x Loupe" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} /></div>
            <div className="form-group"><label>Display Order (lower = first)</label><input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} /></div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', marginTop: '8px', marginBottom: '20px' }}>
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
      : items.length === 0 ? <div style={{ background: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#9ca3af' }}>No tools added yet. Add one above.</div>
      : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(item => (
            <div key={item._id} style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', borderLeft: `4px solid ${item.isActive ? C.coral : '#e5e7eb'}` }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontWeight: 600, color: C.navy, fontSize: '15px', margin: 0 }}>{item.label || item.sku}</h3>
                  <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, background: item.isActive ? '#fef3c7' : '#f3f4f6', color: item.isActive ? '#d97706' : '#6b7280' }}>{item.isActive ? 'Visible' : 'Hidden'}</span>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>SKU: {item.sku}</p>
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
