import { NavLink, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Globe, Wallet, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { MOCK_USER } from '../data/mock';
import './dashboardLayout.css';

const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/sites', label: 'Meus sites', icon: Globe },
  { to: '/plano', label: 'Meu plano', icon: Wallet },
];

export default function DashboardLayout({ children, onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/');
  }

  return (
    <div className="shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <a href="/" className="sidebar-logo">
          <img src="/img/transparencia-logo-simples-cinza.svg" alt="" aria-hidden="true" />
          <span className="sidebar-logo-text">WA<span>Web Design</span></span>
        </a>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-foot">
          <NavLink
            to="/conta"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            <User size={18} strokeWidth={1.8} />
            Minha conta
          </NavLink>
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={17} strokeWidth={1.8} />
            Sair
          </button>
        </div>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>
          <img src="/img/transparencia-logo-simples-cinza.svg" alt="WA Web Design" className="topbar-logo" />
          <div className="topbar-spacer" />
          <div className="topbar-user">
            <div className="avatar">{MOCK_USER.name.charAt(0)}</div>
            <div className="topbar-user-text">
              <strong>{MOCK_USER.name}</strong>
              <span>{MOCK_USER.company}</span>
            </div>
          </div>
        </header>

        <main className="shell-content">{children}</main>
      </div>
    </div>
  );
}
