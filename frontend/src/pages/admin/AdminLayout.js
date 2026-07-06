import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BarChartSVG, BookSVG, UsersSVG, CreditCardSVG, DiamondSVG, LogoutSVG, InboxSVG, GlobeSVG, MessageSVG, StarSVG } from '../../components/Icons';

const C = { navy: '#2C3E50', coral: '#E8835A', navyDark: '#1a2532' };

const navItems = [
  { path: '/admin', label: 'Dashboard', Icon: BarChartSVG, exact: true },
  { path: '/admin/courses', label: 'Courses', Icon: BookSVG },
  { path: '/admin/diamonds', label: 'Diamonds', Icon: DiamondSVG },
  { path: '/admin/leads', label: 'Leads', Icon: InboxSVG },
  { path: '/admin/resources', label: 'Resources', Icon: GlobeSVG },
  { path: '/admin/blog', label: 'Blog', Icon: MessageSVG },
  { path: '/admin/comingsoon', label: 'Coming Soon', Icon: StarSVG },
  { path: '/admin/users', label: 'Students', Icon: UsersSVG },
  { path: '/admin/orders', label: 'Orders', Icon: CreditCardSVG },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? '240px' : '64px', background: C.navyDark, color: 'white', flexShrink: 0, transition: 'width 0.3s ease', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: C.coral, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DiamondSVG size={20} color="white" />
          </div>
          {sidebarOpen && <div><div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '14px' }}>ADA Admin</div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Management Panel</div></div>}
        </div>

        <nav style={{ flex: 1, padding: '16px 8px' }}>
          {navItems.map(({ path, label, Icon, exact }) => (
            <Link key={path} to={path} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', marginBottom: '4px', color: 'white', textDecoration: 'none', background: isActive(path, exact) ? 'rgba(232,131,90,0.2)' : 'transparent', borderLeft: isActive(path, exact) ? `3px solid ${C.coral}` : '3px solid transparent', transition: 'all 0.2s' }}>
              <Icon size={18} color={isActive(path, exact) ? C.coral : 'rgba(255,255,255,0.7)'} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span style={{ fontSize: '14px', fontWeight: isActive(path, exact) ? 600 : 400, color: isActive(path, exact) ? C.coral : 'rgba(255,255,255,0.8)' }}>{label}</span>}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {sidebarOpen && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>Logged in as {user?.name}</div>}
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '8px', borderRadius: '8px', width: '100%' }}>
            <LogoutSVG size={18} color="rgba(255,255,255,0.6)" />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: 'white', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '4px', fontSize: '18px' }}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ color: '#6b7280', fontSize: '13px' }}>← View Site</Link>
            <div style={{ width: '36px', height: '36px', background: C.coral, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}