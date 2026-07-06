import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/admin/users').then(r => setUsers(r.data.users || [])).catch(() => toast.error('Failed to load users')).finally(() => setLoading(false));
  }, []);

  const toggleActive = async (user) => {
    try {
      await api.put(`/admin/users/${user._id}`, { isActive: !user.isActive });
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, isActive: !u.isActive } : u));
      toast.success(`User ${!user.isActive ? 'activated' : 'deactivated'}`);
    } catch { toast.error('Failed to update user'); }
  };

  const filtered = users.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Students</h1>
        <p style={{ color: '#6b7280', marginTop: '4px' }}>{users.length} total students</p>
      </div>
      <input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }} />
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: C.light }}>
              {['Student', 'Email', 'Country', 'Enrolled', 'Joined', 'Status', 'Action'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: C.navy }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr key={user._id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                <td style={{ padding: '14px 16px', fontWeight: 500, color: C.navy, fontSize: '14px' }}>{user.name}</td>
                <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '13px' }}>{user.email}</td>
                <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '13px' }}>{user.country || '—'}</td>
                <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '13px' }}>{user.enrolledCourses?.length || 0} courses</td>
                <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '13px' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, background: user.isActive ? '#dcfce7' : '#fee2e2', color: user.isActive ? '#16a34a' : '#dc2626' }}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <button onClick={() => toggleActive(user)} style={{ padding: '6px 12px', background: user.isActive ? '#fee2e2' : '#dcfce7', color: user.isActive ? '#dc2626' : '#16a34a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No students found.</div>}
      </div>
    </div>
  );
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/orders').then(r => setOrders(r.data.orders || [])).catch(() => toast.error('Failed to load orders')).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const revenue = orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Orders</h1>
        <p style={{ color: '#6b7280', marginTop: '4px' }}>Total Revenue: <strong style={{ color: '#059669' }}>${revenue.toFixed(2)}</strong></p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['all', 'paid', 'pending', 'failed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: filter === f ? C.navy : '#f3f4f6', color: filter === f ? 'white' : '#6b7280' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: C.light }}>
              {['Student', 'Course', 'Amount', 'Status', 'Date'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: C.navy }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => (
              <tr key={order._id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                <td style={{ padding: '14px 16px' }}><div style={{ fontWeight: 500, fontSize: '14px', color: C.navy }}>{order.user?.name}</div><div style={{ color: '#9ca3af', fontSize: '12px' }}>{order.user?.email}</div></td>
                <td style={{ padding: '14px 16px', color: '#4b5563', fontSize: '14px' }}>{order.items?.map(i => i.course?.title || i.title).join(', ')}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: C.navy, fontSize: '15px' }}>${order.amount}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, background: order.status === 'paid' ? '#dcfce7' : order.status === 'pending' ? '#fef3c7' : '#fee2e2', color: order.status === 'paid' ? '#16a34a' : order.status === 'pending' ? '#d97706' : '#dc2626' }}>{order.status}</span>
                </td>
                <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '13px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No orders found.</div>}
      </div>
    </div>
  );
}
