import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Briefing from './pages/Briefing';
import Placeholder from './pages/Placeholder';
import DashboardLayout from './components/DashboardLayout';

export default function App() {
  // Sem backend por enquanto: estado de login só em memória.
  const [loggedIn, setLoggedIn] = useState(false);

  function Protected({ children }) {
    if (!loggedIn) return <Navigate to="/" replace />;
    return <DashboardLayout onLogout={() => setLoggedIn(false)}>{children}</DashboardLayout>;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          loggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => setLoggedIn(true)} />
        } />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/briefing" element={<Protected><Briefing /></Protected>} />
        <Route path="/arquivos" element={
          <Protected><Placeholder title="Arquivos" text="Upload e organização de arquivos do projeto — entra quando o backend for conectado." /></Protected>
        } />
        <Route path="/configuracoes" element={
          <Protected><Placeholder title="Configurações" text="Dados da conta e preferências de notificação." /></Protected>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
