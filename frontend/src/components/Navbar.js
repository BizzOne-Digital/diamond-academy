'use client';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { InstagramSVG, FacebookSVG, LinkedInSVG } from './Icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { count: cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/education', label: 'Education' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resources', label: 'Resources' },
    { href: '/tools', label: 'Tools' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
  ];

  const navBg = '#ffffff';

  return (
    <nav style={{ background: navBg, position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 18px rgba(27,43,75,0.08)', transition: 'all 0.3s ease' }}>

      {/* TOP UTILITY BAR — phone numbers + social media */}
      <div style={{ background: '#1B2B4B', color: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '20px', flexWrap: 'wrap' }}>
            <a href="tel:+18889211786" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +1-888-921-1786
            </a>
            {!isMobile && (
              <a href="tel:+12124701321" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>+1-212-470-1321</a>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a href="https://www.instagram.com/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <InstagramSVG size={12} color="#ffffff" />
            </a>
            <a href="https://www.facebook.com/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FacebookSVG size={12} color="#ffffff" />
            </a>
            <a href="https://www.linkedin.com/company/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LinkedInSVG size={12} color="#ffffff" />
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '108px' }}>

        {/* LOGO — uses logo.png if exists, falls back to SVG text */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="American Diamond Academy"
            style={{ height: '96px', width: 'auto', objectFit: 'contain' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback SVG logo shown if logo.png not found */}
          <div style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 9L12 22L22 9L12 2Z" stroke="#E8835A" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M2 9H22M8 9L12 2M16 9L12 2" stroke="#E8835A" strokeWidth="1.5"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '1px' }}>ADA</span>
              <span style={{ fontSize: '9px', color: '#E8835A', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>Academy</span>
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV — hidden on mobile */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {navLinks.map(l => (
              <Link
                key={l.href}
                to={l.href}
                style={{ padding: '8px 14px', fontSize: '14px', color: '#1B2B4B', opacity: location.pathname === l.href ? 1 : 0.8, fontWeight: location.pathname === l.href ? 600 : 400, borderRadius: '6px', background: location.pathname === l.href ? 'rgba(27,43,75,0.08)' : 'transparent', transition: 'all 0.2s', textDecoration: 'none', whiteSpace: 'nowrap' }}
                onMouseOver={e => { if (location.pathname !== l.href) { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(27,43,75,0.08)'; } }}
                onMouseOut={e => { if (location.pathname !== l.href) { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.background = 'transparent'; } }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        {/* RIGHT SIDE ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Cart icon — desktop */}
          {!isMobile && isAuthenticated && (
            <Link to="/cart" aria-label="Cart" style={{ position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B2B4B' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#E8835A', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
              )}
            </Link>
          )}
          {/* Desktop auth buttons */}
          {!isMobile && isAuthenticated && (
            <>
              {isAdmin && (
                <Link to="/admin" style={{ padding: '7px 14px', background: 'rgba(232,131,90,0.12)', color: '#E8835A', borderRadius: '6px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Admin</Link>
              )}
              <Link to="/dashboard" style={{ padding: '7px 14px', background: 'rgba(27,43,75,0.08)', color: '#1B2B4B', borderRadius: '6px', fontSize: '13px', textDecoration: 'none' }}>Dashboard</Link>
              <button onClick={handleLogout} style={{ padding: '7px 16px', background: '#E8835A', color: 'white', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
            </>
          )}
          {!isMobile && !isAuthenticated && (
            <>
              <Link to="/login" style={{ color: '#1B2B4B', fontSize: '14px', opacity: 0.85, textDecoration: 'none', padding: '7px 10px' }}>Login</Link>
              <Link to="/register" style={{ padding: '8px 18px', background: '#E8835A', color: 'white', borderRadius: '20px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Enroll Now</Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B2B4B' }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#1B2B4B" strokeWidth="2" strokeLinecap="round"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12H21M3 6H21M3 18H21" stroke="#1B2B4B" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobile && (
        <div style={{ overflow: 'hidden', maxHeight: isOpen ? '600px' : '0', transition: 'max-height 0.3s ease', background: '#ffffff', borderTop: isOpen ? '1px solid rgba(27,43,75,0.08)' : 'none' }}>
          <div style={{ padding: '12px 16px 20px' }}>
            {/* Nav links */}
            {navLinks.map(l => (
              <Link
                key={l.href}
                to={l.href}
                style={{ display: 'block', padding: '13px 16px', fontSize: '15px', color: '#1B2B4B', background: location.pathname === l.href ? 'rgba(232,131,90,0.12)' : 'transparent', borderRadius: '8px', fontWeight: location.pathname === l.href ? 600 : 400, textDecoration: 'none', marginBottom: '2px' }}
              >
                {l.label}
              </Link>
            ))}

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(27,43,75,0.08)', margin: '10px 0' }} />

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {isAdmin && (
                  <Link to="/admin" style={{ display: 'block', padding: '12px 16px', color: '#E8835A', background: 'rgba(232,131,90,0.12)', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>Admin Panel</Link>
                )}
                <Link to="/dashboard" style={{ display: 'block', padding: '12px 16px', color: '#1B2B4B', background: 'rgba(27,43,75,0.06)', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>My Dashboard</Link>
                <Link to="/cart" style={{ display: 'block', padding: '12px 16px', color: '#1B2B4B', background: 'rgba(27,43,75,0.06)', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>Cart {cartCount > 0 ? `(${cartCount})` : ''}</Link>
                <button onClick={handleLogout} style={{ padding: '13px 16px', background: '#E8835A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', textAlign: 'center', width: '100%', fontFamily: 'Inter, sans-serif' }}>Logout</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Link to="/login" style={{ display: 'block', padding: '12px 16px', color: '#1B2B4B', background: 'rgba(27,43,75,0.06)', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', textAlign: 'center' }}>Login</Link>
                <Link to="/register" style={{ display: 'block', padding: '13px 16px', background: '#E8835A', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '14px', textAlign: 'center' }}>Enroll Now</Link>
              </div>
            )}

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
              <a href="https://www.instagram.com/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(27,43,75,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InstagramSVG size={16} color="#1B2B4B" />
              </a>
              <a href="https://www.facebook.com/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(27,43,75,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FacebookSVG size={16} color="#1B2B4B" />
              </a>
              <a href="https://www.linkedin.com/company/americandiamondacademy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(27,43,75,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LinkedInSVG size={16} color="#1B2B4B" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}