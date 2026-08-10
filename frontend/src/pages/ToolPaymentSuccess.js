import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A' };

export default function ToolPaymentSuccess() {
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('requestId');
  const [status, setStatus] = useState('loading');
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (!requestId) { setStatus('error'); return; }
    api.get(`/stuller/verify/${requestId}`)
      .then(r => { setStatus(r.data.status); setRequest(r.data.request); })
      .catch(() => setStatus('error'));
  }, [requestId]);

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', padding: '120px 20px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>;
  }

  if (status !== 'paid') {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, marginBottom: '10px' }}>We couldn't confirm this payment</h2>
        <Link to="/tools" className="btn btn-outline">Back to Tools &amp; Supplies</Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '120px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, marginBottom: '10px' }}>Payment Successful</h2>
      <p style={{ color: '#6b7280', marginBottom: '4px' }}>{request?.productName} — Qty {request?.qty}</p>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>Our team will process your order and be in touch at {request?.email}.</p>
      <Link to="/tools" className="btn btn-primary" style={{ background: C.coral, borderColor: C.coral }}>Continue Shopping</Link>
    </div>
  );
}
