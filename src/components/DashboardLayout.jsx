import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, FolderOpen, Settings, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { MOCK_USER } from '../data/mock';
import './dashboardLayout.css';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { to: '/briefing', label: 'Briefing do site', icon: ClipboardList },
  { to: '/arquivos', label: 'Arquivos', icon: FolderOpen },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
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
          <img src="/img/transparencia-logo-simples-cinza.png" alt="WA Web Design" />
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

        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={17} strokeWidth={1.8} />
          Sair
        </button>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>
          <img src="/img/transparencia-logo-simples-cinza.png" alt="WA Web Design" className="topbar-logo" />
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
