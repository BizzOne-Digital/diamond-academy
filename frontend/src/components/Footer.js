import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneSVG, InstagramSVG, FacebookSVG, LinkedInSVG } from './Icons';
import toast from 'react-hot-toast';
import api from '../utils/api';

const COLORS = { coral: '#E8835A', navy: '#1B2B4B' };

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await api.post('/leads', { name: 'Newsletter Subscriber', email, subject: 'Diamond Digest Newsletter', message: 'Newsletter subscription request.' });
      toast.success('You are subscribed to Diamond Digest!');
      setEmail('');
    } catch { toast.error('Subscription failed. Please try again.'); }
    finally { setSubscribing(false); }
  };

  return (
    <footer>
      <div style={{ background: COLORS.coral, padding: '64px 0 56px' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 400, color: COLORS.navy, marginBottom: '32px' }}>
            American Diamonds Academy
          </h2>
          <div style={{ borderTop: '1px solid rgba(27,43,75,0.25)', marginBottom: '48px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
            <div>
              <img
                src="/logo.png"
                alt="American Diamonds Academy"
                style={{ height: '56px', width: 'auto', objectFit: 'contain', marginBottom: '14px' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <p style={{ color: 'rgba(27,43,75,0.75)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
                Get diamond education updates, course openings, and important Academy announcements.
              </p>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '30px', padding: '4px 4px 4px 20px', maxWidth: '360px' }}>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 0', fontSize: '15px', color: COLORS.navy }}
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  aria-label="Subscribe"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: COLORS.coral, border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer', flexShrink: 0, opacity: subscribing ? 0.7 : 1 }}
                >
                  →
                </button>
              </form>
            </div>

            <div>
              <h4 style={{ color: COLORS.navy, fontWeight: 600, fontSize: '15px', marginBottom: '18px' }}>Policy Portal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Link to="/privacy-policy" style={{ color: COLORS.navy, fontSize: '15px', textDecoration: 'none' }}>Privacy Policy</Link>
                <Link to="/refund-policy" style={{ color: COLORS.navy, fontSize: '15px', textDecoration: 'none' }}>Refund Policy</Link>
                <Link to="/course-disclaimer" style={{ color: COLORS.navy, fontSize: '15px', textDecoration: 'none' }}>Course Disclaimer</Link>
                <Link to="/terms-of-service" style={{ color: COLORS.navy, fontSize: '15px', textDecoration: 'none' }}>Terms of Service</Link>
              </div>
            </div>

            <div>
              <h4 style={{ color: COLORS.navy, fontWeight: 600, fontSize: '15px', marginBottom: '18px' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Link to="/contact" style={{ color: COLORS.navy, fontSize: '15px', textDecoration: 'none' }}>Contact Us</Link>
                <a href="mailto:jaswani@angeldiamondinc.com" style={{ color: COLORS.navy, fontSize: '15px', textDecoration: 'none' }}>jaswani@angeldiamondinc.com</a>
                <a href="tel:+18889211786" style={{ color: COLORS.navy, fontSize: '15px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PhoneSVG size={15} color={COLORS.navy} /><span>+1-888-921-1786</span>
                </a>
                <Link to="/faq" style={{ color: COLORS.navy, fontSize: '15px', textDecoration: 'none' }}>FAQ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional offices — Headquarters / US Concierge / Registered Corporate Address */}
      <div style={{ background: 'white', padding: '56px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ color: COLORS.navy, fontWeight: 600, fontSize: '15px', marginBottom: '16px' }}>Headquarters (H.O.)</h4>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.9 }}>
              American Diamonds Academy<br />
              55 Queen Street East, Suite 1506<br />
              Downtown Diamond District<br />
              Toronto, ON M5C 1R6<br />
              Canada
            </p>
          </div>
          <div>
            <h4 style={{ color: COLORS.navy, fontWeight: 600, fontSize: '15px', marginBottom: '16px' }}>US Concierge &amp; Fulfillment</h4>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.9 }}>
              American Diamonds Academy<br />
              c/o Angel Diamond Group LLC<br />
              580 5th Avenue, Suite 1001<br />
              Manhattan Diamond District<br />
              New York, NY 10036<br />
              United States
            </p>
          </div>
          <div>
            <h4 style={{ color: COLORS.navy, fontWeight: 600, fontSize: '15px', marginBottom: '16px' }}>Registered Corporate Address</h4>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.9, marginBottom: '16px' }}>
              Angel Diamond Group LLC<br />
              32 N Gould St<br />
              Sheridan, WY 82801<br />
              United States
            </p>
            <a href="tel:+18889211786" style={{ color: COLORS.navy, fontSize: '14px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneSVG size={14} color={COLORS.navy} /><span>Toll-Free Support: +1 (888) 921-1786</span>
            </a>
          </div>
        </div>
      </div>

      <div style={{ background: COLORS.navy, padding: '24px 0' }}>
        <div className="container">
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.8, marginBottom: '16px', maxWidth: '1000px' }}>
            American Diamonds Academy is a specialized educational brand operated by Angel Diamond Inc. (Toronto, Canada). United States operations, merchant logistics, global client invoicing, and payment processing configurations are managed exclusively through its wholly-owned subsidiary, Angel Diamond Group LLC (Wyoming, USA). Statutory legal filings and notices for domestic US operations are catalogued at our registered agent facilities in Sheridan, WY.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>&copy; {new Date().getFullYear()} American Diamonds Academy. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link to="/login" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Student Login</Link>
              <a href="https://www.facebook.com/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookSVG size={18} color="white" /></a>
              <a href="https://www.instagram.com/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramSVG size={18} color="white" /></a>
              <a href="https://www.linkedin.com/company/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInSVG size={18} color="white" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
