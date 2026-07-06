import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function AdminDiamonds() {
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDiamonds(); }, []);

  const fetchDiamonds = async () => {
    try {
      const { data } = await api.get('/admin/diamonds');
      setDiamonds(data.diamonds || []);
    } catch { toast.error('Failed to load diamonds'); }
    finally { setLoading(false); }
  };

  const deleteDiamond = async (id) => {
    if (!window.confirm('Delete this diamond?')) return;
    try {
      await api.delete(`/diamonds/${id}`);
      toast.success('Diamond deleted');
      fetchDiamonds();
    } catch { toast.error('Failed to delete'); }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Diamonds</h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>Manage the diamond inventory shown on the public Diamonds page</p>
        </div>
        <Link to="/admin/diamonds/new" className="btn btn-primary">+ Add New Diamond</Link>
      </div>

      {diamonds.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '12px' }}>
          <p style={{ color: '#9ca3af', fontSize: '18px', marginBottom: '20px' }}>No diamonds yet.</p>
          <Link to="/admin/diamonds/new" className="btn btn-primary">Add First Diamond</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {diamonds.map(d => (
            <div key={d._id} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              {d.image && <img src={d.image} alt={d.shape} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, background: '#f3f4f6' }} />}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '4px' }}>{d.caratWeight}ct {d.shape} Natural Diamond</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="badge badge-navy">Colour: {d.colour}</span>
                  <span className="badge badge-navy">Clarity: {d.clarity}</span>
                  <span className="badge badge-coral">Cut: {d.cut}</span>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>${d.price} {d.currency} · {d.certLab} Certified</span>
                  {!d.isActive && <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}>Inactive</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Link to={`/diamonds/${d._id}`} target="_blank" className="btn btn-outline btn-sm">View</Link>
                <Link to={`/admin/diamonds/edit/${d._id}`} className="btn btn-outline btn-sm">Edit</Link>
                <button onClick={() => deleteDiamond(d._id)} style={{ padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
