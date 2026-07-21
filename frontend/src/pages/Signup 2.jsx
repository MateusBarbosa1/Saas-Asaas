import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewSiteWizard from '../components/NewSiteWizard';
import { useSites } from '../context/SitesContext';
import { apiFetch, setToken } from '../lib/api';
import './signup.css';

export default function Signup({ onSignup }) {
  const { addSite } = useSites();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleComplete(sitePayload, account) {
    setError('');
    setSubmitting(true);
    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: account.nome,
          email: account.email,
          password: account.senha,
        }),
      });
      setToken(res.token);
      await addSite(sitePayload);
      onSignup({ id: res.data.id, name: account.nome, email: account.email });
      navigate('/home');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="signup-screen">
      <a href="/" className="signup-logo">
        <img src="/img/transparencia-logo-completo-branco.svg" alt="WA Web Design" />
      </a>
      <div className="eyebrow">Criar conta</div>
      <h1>Conte pra gente o que você precisa</h1>
      <p className="lede">Em poucos passos criamos sua conta e já mandamos seu pedido pra equipe da WA.</p>
      {error && <div className="login-error">{error}</div>}
      <NewSiteWizard mode="signup" onComplete={handleComplete} submitting={submitting} />
    </div>
  );
}
