import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

const SHAPES = ['Round', 'Princess', 'Cushion', 'Oval', 'Pear', 'Emerald', 'Marquise', 'Heart', 'Asscher', 'Radiant'];
const COLOURS = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'Fancy'];
const CLARITIES = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
const GRADES = ['Fair', 'Good', 'Very Good', 'Excellent', 'Ideal'];
const FLUORESCENCE = ['None', 'Faint', 'Medium', 'Strong'];
const LABS = ['GIA', 'IGI', 'AGS', 'Other'];

const emptyForm = {
  shape: 'Round', caratWeight: '', colour: 'E', clarity: 'VS1', cut: 'Excellent',
  polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', measurements: '',
  price: '', currency: 'CAD', certLab: 'IGI', certNumber: '', certUrl: '',
  image: '', embedCode: '', isActive: true, isFeatured: false,
};

export default function AdminDiamondForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isEdit) {
      api.get('/admin/diamonds').then(r => {
        const diamond = r.data.diamonds.find(d => d._id === id);
        if (diamond) setForm({ ...emptyForm, ...diamond });
        else { toast.error('Diamond not found'); navigate('/admin/diamonds'); }
      }).catch(() => navigate('/admin/diamonds'));
    }
  }, [id]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      set('image', data.url);
      toast.success('Image uploaded!');
    } catch { toast.error('Image upload failed'); }
    finally { setImageUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.shape || !form.caratWeight || !form.colour || !form.clarity || !form.cut || !form.price) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    const payload = { ...form, caratWeight: parseFloat(form.caratWeight), price: parseFloat(form.price) };
    try {
      if (isEdit) { await api.put(`/diamonds/${id}`, payload); toast.success('Diamond updated!'); }
      else { await api.post('/diamonds', payload); toast.success('Diamond created!'); }
      navigate('/admin/diamonds');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <button onClick={() => navigate('/admin/diamonds')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '14px', marginBottom: '8px' }}>← Back to Diamonds</button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>{isEdit ? 'Edit Diamond' : 'Add New Diamond'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>The 4Cs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Shape *</label>
              <select value={form.shape} onChange={e => set('shape', e.target.value)}>
                {SHAPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}><label>Carat Weight *</label><input type="number" min="0" step="0.01" placeholder="0.30" value={form.caratWeight} onChange={e => set('caratWeight', e.target.value)} required /></div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Colour *</label>
              <select value={form.colour} onChange={e => set('colour', e.target.value)}>
                {COLOURS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Clarity *</label>
              <select value={form.clarity} onChange={e => set('clarity', e.target.value)}>
                {CLARITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Cut *</label>
              <select value={form.cut} onChange={e => set('cut', e.target.value)}>
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Additional Grading Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Polish</label>
              <select value={form.polish} onChange={e => set('polish', e.target.value)}>
                {GRADES.filter(g => g !== 'Ideal').map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Symmetry</label>
              <select value={form.symmetry} onChange={e => set('symmetry', e.target.value)}>
                {GRADES.filter(g => g !== 'Ideal').map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Fluorescence</label>
              <select value={form.fluorescence} onChange={e => set('fluorescence', e.target.value)}>
                {FLUORESCENCE.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}><label>Measurements</label><input placeholder="e.g. 3.71x3.72x2.28mm" value={form.measurements} onChange={e => set('measurements', e.target.value)} /></div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Certification & Price</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Certifying Lab</label>
              <select value={form.certLab} onChange={e => set('certLab', e.target.value)}>
                {LABS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}><label>Certificate Number</label><input placeholder="e.g. 790617597" value={form.certNumber} onChange={e => set('certNumber', e.target.value)} /></div>
            <div className="form-group" style={{ margin: 0 }}><label>Certificate URL</label><input type="url" placeholder="https://..." value={form.certUrl} onChange={e => set('certUrl', e.target.value)} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}><label>Price *</label><input type="number" min="0" step="0.01" placeholder="179.00" value={form.price} onChange={e => set('price', e.target.value)} required /></div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Currency</label>
              <select value={form.currency} onChange={e => set('currency', e.target.value)}>
                <option value="CAD">CAD</option><option value="USD">USD</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}><input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} />Active (visible to customers)</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}><input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} />Featured</label>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Diamond Photo</h2>
          <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Used as the thumbnail everywhere, and as the fallback on the detail page while the 360° embed (below) is missing.</p>
          {form.image && <img src={form.image} alt="Diamond" style={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px', background: '#f3f4f6' }} />}
          <div className="form-group"><label>Upload Image (max 5MB)</label><input type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} /></div>
          {imageUploading && <p style={{ color: C.coral, fontSize: '14px' }}>Uploading to Cloudinary...</p>}
          <div className="form-group"><label>Or Paste Image URL</label><input type="url" placeholder="https://..." value={form.image} onChange={e => set('image', e.target.value)} /></div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>360° Interactive Embed (optional)</h2>
          <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>
            Paste the full embed code/script for this exact stone from your 360° photography provider (e.g. Sirv 360, Magic360, WebRotate360 — same idea as the GIA 4Cs scripts already used on the Resources page). When set, it replaces the static photo on this diamond's page with the real interactive spinner.
          </p>
          <div className="form-group">
            <label>Embed Code</label>
            <textarea placeholder={'<script src="https://..."></script>\nor an <iframe>/<div> snippet from your provider'} value={form.embedCode} onChange={e => set('embedCode', e.target.value)} style={{ minHeight: '110px', fontFamily: 'monospace', fontSize: '13px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ opacity: loading ? 0.7 : 1 }}>{loading ? 'Saving...' : isEdit ? 'Update Diamond' : 'Create Diamond'}</button>
          <button type="button" onClick={() => navigate('/admin/diamonds')} className="btn btn-outline btn-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
}
