import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookSVG, CheckCircleSVG, DiamondSVG } from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my').then(r => setOrders(r.data.orders || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Enrolled Courses', value: user?.enrolledCourses?.length || 0, Icon: BookSVG },
    { label: 'Completed Orders', value: orders.filter(o => o.status === 'paid').length, Icon: CheckCircleSVG },
  ];

  return (
    <>
      <Helmet><title>My Dashboard | American Diamond Academy</title></Helmet>
      <div style={{ minHeight: '80vh', background: C.light }}>
        <div style={{ background: C.navy, padding: '40px 0', color: 'white' }}>
          <div className="container">
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400 }}>Welcome, {user?.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>Your learning dashboard</p>
          </div>
        </div>

        <div className="container" style={{ padding: '40px 20px' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {stats.map(({ label, value, Icon }) => (
              <div key={label} style={{ background: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <div style={{ width: '48px', height: '48px', background: C.light, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Icon size={22} color={C.coral} />
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: C.navy }}>{value}</div>
                <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* My Courses */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy, marginBottom: '20px' }}>My Courses</h2>
            {!user?.enrolledCourses?.length ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                <DiamondSVG size={40} color="#d1d5db" style={{ margin: '0 auto 16px', display: 'block' }} />
                <p style={{ marginBottom: '16px' }}>You haven&apos;t enrolled in any courses yet.</p>
                <Link to="/education" className="btn btn-primary">Browse Courses</Link>
              </div>
            ) : (
              <div className="grid-2">
                {user?.enrolledCourses?.map(course => (
                  <div key={course._id || course} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: C.light, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <DiamondSVG size={22} color={C.coral} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: C.navy, marginBottom: '4px' }}>{course.title || 'Course'}</div>
                      {course.slug && <Link to={`/education/${course.slug}`} style={{ color: C.coral, fontSize: '13px', fontWeight: 500 }}>View Sessions →</Link>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order History */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy, marginBottom: '20px' }}>Order History</h2>
            {loading ? <div className="spinner" style={{ margin: '20px auto' }} /> : !orders.length ? (
              <p style={{ color: '#9ca3af', textAlign: 'center' }}>No orders yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {orders.map(order => (
                  <div key={order._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: C.navy }}>{order.items?.map(i => i.course?.title || i.title).join(', ')}</div>
                      <div style={{ color: '#6b7280', fontSize: '13px' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontWeight: 700, color: C.navy }}>${order.amount}</span>
                      <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: order.status === 'paid' ? '#dcfce7' : '#fef3c7', color: order.status === 'paid' ? '#16a34a' : '#d97706' }}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}