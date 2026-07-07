import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DiamondSVG, PhoneSVG, EmailSVG, WhatsAppSVG, InstagramSVG, FacebookSVG, LinkedInSVG } from './Icons';
import api from '../utils/api';

export default function Footer() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses').then(r => setCourses(r.data.courses || [])).catch(() => {});
  }, []);

  return (
    <footer style={{ background: '#111e35', color: 'white', padding: '60px 0 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>

          {/* Logo + About */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <img
                src="/logo.png"
                alt="American Diamond Academy"
                style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
                <DiamondSVG size={28} color="#E8835A" />
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, letterSpacing: '1px' }}>ADA</div>
                  <div style={{ fontSize: '9px', color: '#E8835A', textTransform: 'uppercase', letterSpacing: '3px' }}>American Diamond Academy</div>
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8 }}>Online diamond grading courses for the modern digital marketplace.</p>
            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="https://www.instagram.com/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(232,131,90,0.3)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                <InstagramSVG size={17} color="rgba(255,255,255,0.7)" />
              </a>
              <a href="https://www.facebook.com/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(232,131,90,0.3)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                <FacebookSVG size={17} color="rgba(255,255,255,0.7)" />
              </a>
              <a href="https://www.linkedin.com/company/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(232,131,90,0.3)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                <LinkedInSVG size={17} color="rgba(255,255,255,0.7)" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[['/', 'Home'], ['/education', 'Education'], ['/resources', 'Resources'], ['/about', 'About'], ['/contact', 'Contact'], ['/faq', 'FAQ']].map(([href, label]) => (
                <Link key={href} to={href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={e => e.target.style.color = '#E8835A'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Courses — dynamic from DB, link to individual pages */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Courses</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {courses.length > 0 ? courses.map(c => (
                <Link key={c._id} to={`/education/${c.slug}`} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none' }}
                  onMouseOver={e => e.target.style.color = '#E8835A'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>{c.title}</Link>
              )) : (
                ['Diamond Grading: Fundamentals', 'Diamond Intelligence', 'Diamond Precision'].map(c => (
                  <Link key={c} to="/education" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none' }}
                    onMouseOver={e => e.target.style.color = '#E8835A'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>{c}</Link>
                ))
              )}
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', fontStyle: 'italic' }}>+ More coming soon</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="tel:+18889211786" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <PhoneSVG size={16} color="#E8835A" /><span>+1-888-921-1786</span>
              </a>
              <a href="tel:+12124701321" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <PhoneSVG size={16} color="#E8835A" /><span>+1-212-470-1321</span>
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

        {/* Bottom bar with legal links */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>&copy; {new Date().getFullYear()} American Diamond Academy. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/privacy-policy" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}
              onMouseOver={e => e.target.style.color = '#E8835A'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}
              onMouseOver={e => e.target.style.color = '#E8835A'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Terms & Conditions</Link>
            <Link to="/refund-policy" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}
              onMouseOver={e => e.target.style.color = '#E8835A'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}