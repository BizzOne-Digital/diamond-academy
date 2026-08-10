import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

const STATUS_COLORS = {
  Pending: { bg: '#fef3c7', text: '#d97706' },
  Contacted: { bg: '#dbeafe', text: '#2563eb' },
  Fulfilled: { bg: '#dcfce7', text: '#16a34a' },
};

export default function AdminToolRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await api.get('/stuller/requests/all');
      setRequests(data.requests || []);
    } catch { toast.error('Failed to load requests'); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/stuller/requests/${id}`, { status });
      setRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      toast.success('Updated');
    } catch { toast.error('Failed to update'); }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Tool Requests</h1>
        <p style={{ color: '#6b7280', marginTop: '4px' }}>
          "Request this Item" submissions from the Tools &amp; Supplies page. Contact the customer directly by email/phone, then update the status here.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
      ) : requests.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#9ca3af' }}>No requests yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {requests.map(r => (
            <div key={r._id} style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontWeight: 600, color: C.navy, fontSize: '15px', margin: 0 }}>{r.productName || r.sku}</h3>
                  <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, background: STATUS_COLORS[r.status]?.bg, color: STATUS_COLORS[r.status]?.text }}>{r.status}</span>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>
                  {r.name} &middot; {r.email}{r.phone ? ` · ${r.phone}` : ''} &middot; SKU: {r.sku} &middot; Qty: {r.qty}
                  {r.price != null && ` · $${r.price.toFixed(2)} ${r.currency || ''}`}
                </p>
                <p style={{ color: '#c1c7d0', fontSize: '12px', margin: '4px 0 0' }}>{new Date(r.createdAt).toLocaleString()}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                {['Pending', 'Contacted', 'Fulfilled'].map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(r._id, s)}
                    disabled={r.status === s}
                    style={{
                      padding: '7px 14px', border: 'none', borderRadius: '6px', cursor: r.status === s ? 'default' : 'pointer',
                      fontSize: '12px', fontWeight: 600,
                      background: r.status === s ? '#f3f4f6' : STATUS_COLORS[s].bg,
                      color: r.status === s ? '#9ca3af' : STATUS_COLORS[s].text,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
