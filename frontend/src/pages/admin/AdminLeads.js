import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PhoneSVG, EmailSVG, WhatsAppSVG } from '../../components/Icons';
import api from '../../utils/api';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

const STATUS_COLORS = {
  new: { bg: '#dbeafe', text: '#1d4ed8' },
  contacted: { bg: '#fef3c7', text: '#d97706' },
  enrolled: { bg: '#dcfce7', text: '#16a34a' },
  closed: { bg: '#f3f4f6', text: '#6b7280' },
};

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('new');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchLeads(); }, [filter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/leads?status=${filter}`);
      setLeads(data.leads || []);
    } catch { toast.error('Failed to load leads'); }
    finally { setLoading(false); }
  };

  const openLead = (lead) => {
    setSelectedLead(lead);
    setNote(lead.adminNote || '');
    setStatus(lead.status);
  };

  const saveLead = async () => {
    setSaving(true);
    try {
      const { data } = await api.put(`/leads/${selectedLead._id}`, { status, adminNote: note });
      setLeads(prev => prev.map(l => l._id === data.lead._id ? data.lead : l));
      setSelectedLead(data.lead);
      toast.success('Lead updated');
    } catch { toast.error('Failed to update'); }
    finally { setSaving(false); }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      setLeads(prev => prev.filter(l => l._id !== id));
      if (selectedLead?._id === id) setSelectedLead(null);
      toast.success('Lead deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const newCount = leads.filter(l => l.status === 'new').length;

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: C.navy }}>Leads</h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>Contact form submissions from potential students</p>
        </div>
        {newCount > 0 && (
          <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '8px 16px', borderRadius: '20px', fontWeight: 600, fontSize: '14px' }}>
            {newCount} new {newCount === 1 ? 'lead' : 'leads'}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', 'new', 'contacted', 'enrolled', 'closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: 'Inter, sans-serif', background: filter === f ? C.navy : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.2s' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedLead ? '1fr 1.2fr' : '1fr', gap: '24px', alignItems: 'start' }}>
        {/* Leads List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : leads.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#9ca3af' }}>
              <p style={{ fontSize: '16px' }}>No leads found.</p>
            </div>
          ) : leads.map(lead => (
            <div key={lead._id} onClick={() => openLead(lead)}
              style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: 'pointer', border: selectedLead?._id === lead._id ? `2px solid ${C.coral}` : '2px solid transparent', transition: 'all 0.2s', borderLeft: lead.status === 'new' ? `4px solid #1d4ed8` : `4px solid #e5e7eb` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontWeight: 700, color: C.navy, fontSize: '15px', margin: 0 }}>{lead.name}</h3>
                    <span style={{ padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, background: STATUS_COLORS[lead.status]?.bg, color: STATUS_COLORS[lead.status]?.text, flexShrink: 0 }}>
                      {lead.status.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 6px' }}>{lead.email}</p>
                  {lead.subject && <p style={{ color: C.coral, fontSize: '13px', fontWeight: 500, margin: '0 0 6px' }}>{lead.subject}</p>}
                  <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.6, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.message}</p>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 8px' }}>{new Date(lead.createdAt).toLocaleDateString()}</p>
                  <button onClick={(e) => { e.stopPropagation(); deleteLead(lead._id); }} style={{ padding: '4px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Detail Panel */}
        {selectedLead && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', position: 'sticky', top: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, margin: 0 }}>Lead Details</h2>
              <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '20px' }}>✕</button>
            </div>

            {/* Contact info */}
            <div style={{ marginBottom: '24px', padding: '20px', background: C.light, borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 700, color: C.navy, fontSize: '16px', marginBottom: '12px' }}>{selectedLead.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href={`mailto:${selectedLead.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: C.navy, fontSize: '14px', textDecoration: 'none' }}>
                  <EmailSVG size={16} color={C.coral} />{selectedLead.email}
                </a>
                {selectedLead.phone && (
                  <>
                    <a href={`tel:${selectedLead.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: C.navy, fontSize: '14px', textDecoration: 'none' }}>
                      <PhoneSVG size={16} color={C.coral} />{selectedLead.phone}
                    </a>
                    <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: C.coral, fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>
                      <WhatsAppSVG size={16} color={C.coral} />WhatsApp
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Subject + Message */}
            {selectedLead.subject && <div style={{ marginBottom: '12px' }}><label style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject</label><p style={{ color: C.coral, fontWeight: 600, marginTop: '4px' }}>{selectedLead.subject}</p></div>}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message</label>
              <p style={{ color: '#374151', lineHeight: 1.7, marginTop: '8px', padding: '16px', background: '#f9fafb', borderRadius: '8px', fontSize: '14px' }}>{selectedLead.message}</p>
            </div>

            {/* Update Status */}
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="enrolled">Enrolled</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Admin Note</label>
              <textarea placeholder="Add internal notes about this lead..." value={note} onChange={e => setNote(e.target.value)} style={{ minHeight: '80px' }} />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={saveLead} disabled={saving} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <a href={`mailto:${selectedLead.email}?subject=Re: ${selectedLead.subject || 'Your inquiry'}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                Reply by Email
              </a>
            </div>

            <p style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center', marginTop: '12px' }}>
              Submitted {new Date(selectedLead.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <style>{`@media(max-width:1024px){div[style*="grid-template-columns: 1fr 1.2fr"]{grid-template-columns:1fr;}}`}</style>
    </div>
  );
}