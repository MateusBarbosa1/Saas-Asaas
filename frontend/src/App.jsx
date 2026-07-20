import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import MeusSites from './pages/MeusSites';
import SiteDetail from './pages/SiteDetail';
import AddSite from './pages/AddSite';
import MeuPlano from './pages/MeuPlano';
import Briefing from './pages/Briefing';
import Placeholder from './pages/Placeholder';
import DashboardLayout from './components/DashboardLayout';
import { SitesProvider } from './context/SitesContext';

export default function App() {
  // Sem backend por enquanto: estado de login só em memória.
  const [loggedIn, setLoggedIn] = useState(false);

  function Protected({ children }) {
    if (!loggedIn) return <Navigate to="/" replace />;
    return <DashboardLayout onLogout={() => setLoggedIn(false)}>{children}</DashboardLayout>;
  }

  return (
    <SitesProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={
            loggedIn ? <Navigate to="/home" replace /> : <Login onLogin={() => setLoggedIn(true)} />
          } />
          <Route path="/criar-conta" element={
            loggedIn ? <Navigate to="/home" replace /> : <Signup onSignup={() => setLoggedIn(true)} />
          } />
          <Route path="/home" element={<Protected><Home /></Protected>} />
          <Route path="/sites" element={<Protected><MeusSites /></Protected>} />
          <Route path="/sites/novo" element={<Protected><AddSite /></Protected>} />
          <Route path="/sites/:siteId" element={<Protected><SiteDetail /></Protected>} />
          <Route path="/sites/:siteId/briefing" element={<Protected><Briefing /></Protected>} />
          <Route path="/plano" element={<Protected><MeuPlano /></Protected>} />
          <Route path="/conta" element={
            <Protected><Placeholder title="Minha conta" text="Dados de perfil, senha e preferências de notificação." /></Protected>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </SitesProvider>
  );
}
