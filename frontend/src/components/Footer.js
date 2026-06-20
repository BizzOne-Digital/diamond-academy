import React from 'react';
import { Link } from 'react-router-dom';
import { DiamondSVG, PhoneSVG, EmailSVG, WhatsAppSVG } from './Icons';

export default function Footer() {
  return (
    <footer style={{ background: '#1a2532', color: 'white', padding: '60px 0 24px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          <div>
            {/* Logo — uses logo.png, falls back to SVG */}
            <div style={{ marginBottom: '16px' }}>
              <img
                src="/logo.png"
                alt="American Diamond Academy"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback */}
              <div style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
                <DiamondSVG size={28} color="#E8835A" />
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, letterSpacing: '1px' }}>ADA</div>
                  <div style={{ fontSize: '9px', color: '#E8835A', textTransform: 'uppercase', letterSpacing: '3px' }}>American Diamond Academy</div>
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8 }}>Online diamond grading & gemology courses for the modern digital marketplace.</p>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[['/', 'Home'], ['/education', 'Education'], ['/about', 'About'], ['/contact', 'Contact'], ['/faq', 'FAQ']].map(([href, label]) => (
                <Link key={href} to={href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={e => e.target.style.color = '#E8835A'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Courses</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Diamond Grading: Fundamentals', 'Diamond Intelligence', 'Diamond Precision'].map(c => (
                <Link key={c} to="/education" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none' }}
                  onMouseOver={e => e.target.style.color = '#E8835A'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>{c}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="tel:+14372697007" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <PhoneSVG size={16} color="#E8835A" /><span>+1 (437) 269-7007</span>
              </a>
              <a href="mailto:jaswani@angeldiamondinc.com" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <EmailSVG size={16} color="#E8835A" /><span>jaswani@angeldiamondinc.com</span>
              </a>
              <a href="https://wa.me/14372697007" target="_blank" rel="noopener noreferrer" style={{ color: '#E8835A', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <WhatsAppSVG size={16} color="#E8835A" /><span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>&copy; {new Date().getFullYear()} American Diamond Academy. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/faq" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/faq" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}