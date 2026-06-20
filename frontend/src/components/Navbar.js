'use client';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
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
    { href: '/faq', label: 'FAQ' },
  ];

  const navBg = scrolled ? 'rgba(44,62,80,0.97)' : '#2C3E50';

  return (
    <nav style={{ background: navBg, position: 'sticky', top: 0, zIndex: 1000, boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.15)' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none', transition: 'all 0.3s ease' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

        {/* LOGO — uses logo.png if exists, falls back to SVG text */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="American Diamond Academy"
            style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
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
                style={{ padding: '8px 14px', fontSize: '14px', color: 'white', opacity: location.pathname === l.href ? 1 : 0.75, fontWeight: location.pathname === l.href ? 600 : 400, borderRadius: '6px', background: location.pathname === l.href ? 'rgba(255,255,255,0.1)' : 'transparent', transition: 'all 0.2s', textDecoration: 'none', whiteSpace: 'nowrap' }}
                onMouseOver={e => { if (location.pathname !== l.href) { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; } }}
                onMouseOut={e => { if (location.pathname !== l.href) { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.background = 'transparent'; } }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        {/* RIGHT SIDE ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Desktop auth buttons */}
          {!isMobile && isAuthenticated && (
            <>
              {isAdmin && (
                <Link to="/admin" style={{ padding: '7px 14px', background: 'rgba(232,131,90,0.2)', color: '#E8835A', borderRadius: '6px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Admin</Link>
              )}
              <Link to="/dashboard" style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '6px', fontSize: '13px', textDecoration: 'none' }}>Dashboard</Link>
              <button onClick={handleLogout} style={{ padding: '7px 16px', background: '#E8835A', color: 'white', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
            </>
          )}
          {!isMobile && !isAuthenticated && (
            <>
              <Link to="/login" style={{ color: 'white', fontSize: '14px', opacity: 0.8, textDecoration: 'none', padding: '7px 10px' }}>Login</Link>
              <Link to="/register" style={{ padding: '8px 18px', background: '#E8835A', color: 'white', borderRadius: '20px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Enroll Now</Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobile && (
        <div style={{ overflow: 'hidden', maxHeight: isOpen ? '600px' : '0', transition: 'max-height 0.3s ease', background: '#1a2532', borderTop: isOpen ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
          <div style={{ padding: '12px 16px 20px' }}>
            {/* Nav links */}
            {navLinks.map(l => (
              <Link
                key={l.href}
                to={l.href}
                style={{ display: 'block', padding: '13px 16px', fontSize: '15px', color: 'white', background: location.pathname === l.href ? 'rgba(232,131,90,0.15)' : 'transparent', borderRadius: '8px', fontWeight: location.pathname === l.href ? 600 : 400, textDecoration: 'none', marginBottom: '2px' }}
              >
                {l.label}
              </Link>
            ))}

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '10px 0' }} />

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {isAdmin && (
                  <Link to="/admin" style={{ display: 'block', padding: '12px 16px', color: '#E8835A', background: 'rgba(232,131,90,0.1)', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>Admin Panel</Link>
                )}
                <Link to="/dashboard" style={{ display: 'block', padding: '12px 16px', color: 'white', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>My Dashboard</Link>
                <button onClick={handleLogout} style={{ padding: '13px 16px', background: '#E8835A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', textAlign: 'center', width: '100%', fontFamily: 'Inter, sans-serif' }}>Logout</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Link to="/login" style={{ display: 'block', padding: '12px 16px', color: 'white', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', textAlign: 'center' }}>Login</Link>
                <Link to="/register" style={{ display: 'block', padding: '13px 16px', background: '#E8835A', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '14px', textAlign: 'center' }}>Enroll Now</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}