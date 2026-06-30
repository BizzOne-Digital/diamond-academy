import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UsersSVG, BookSVG, CreditCardSVG, DollarSVG, PlusSVG, InboxSVG } from '../../components/Icons';
import api from '../../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard').then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner" /></div>;

  const stats = data?.stats || {};
  const statCards = [
    { label: 'Total Students', value: stats.totalUsers || 0, Icon: UsersSVG, color: C.navy },
    { label: 'Active Courses', value: stats.totalCourses || 0, Icon: BookSVG, color: '#7c3aed' },
    { label: 'Paid Orders', value: stats.totalOrders || 0, Icon: CreditCardSVG, color: '#059669' },
    { label: 'Total Revenue', value: `$${(stats.totalRevenue || 0).toFixed(2)}`, Icon: DollarSVG, color: C.coral },
  ];

  const quickActions = [
    { to: '/admin/courses/new', label: 'Add New Course', Icon: PlusSVG, color: C.coral },
    { to: '/admin/courses', label: 'Manage Courses', Icon: BookSVG, color: C.navy },
    { to: '/admin/leads', label: 'View Leads', Icon: InboxSVG, color: '#7c3aed' },
    { to: '/admin/orders', label: 'View Orders', Icon: CreditCardSVG, color: '#059669' },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy, marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Welcome back! Here&apos;s what&apos;s happening.</p>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {statCards.map(({ label, value, Icon, color }) => (
          <div key={label} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: `4px solid ${color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', background: C.light, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={color} />
              </div>
              <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>{label}</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: C.navy }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recent Orders */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, marginBottom: '20px' }}>Recent Orders</h2>
          {!data?.recentOrders?.length ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '20px' }}>No orders yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.recentOrders.map(order => (
                <div key={order._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: C.navy, fontSize: '14px' }}>{order.user?.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '12px' }}>{order.course?.title} · {new Date(order.paidAt).toLocaleDateString()}</div>
                  </div>
                  <span style={{ fontWeight: 700, color: '#059669', fontSize: '15px' }}>${order.amount}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, marginBottom: '4px' }}>Quick Actions</h2>
          {quickActions.map(({ to, label, Icon, color }) => (
            <Link key={to} to={to} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', textDecoration: 'none', borderLeft: `4px solid ${color}`, transition: 'transform 0.2s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}>
              <Icon size={20} color={color} />
              <span style={{ color: C.navy, fontWeight: 500, fontSize: '14px' }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="grid-template-columns: 2fr 1fr"]{grid-template-columns:1fr;}}`}</style>
    </div>
  );
}