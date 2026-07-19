import { useNavigate } from 'react-router-dom';
import NewSiteWizard from '../components/NewSiteWizard';
import { useSites } from '../context/SitesContext';
import './signup.css';

export default function Signup({ onSignup }) {
  const { addSite } = useSites();
  const navigate = useNavigate();

  function handleComplete(site, account) {
    addSite(site);
    onSignup(account);
    navigate('/home');
  }

  return (
    <div className="signup-screen">
      <a href="/" className="signup-logo">
        <img src="/img/transparencia-logo-completo-branco.svg" alt="WA Web Design" />
      </a>
      <div className="eyebrow">Criar conta</div>
      <h1>Conte pra gente o que você precisa</h1>
      <p className="lede">Em poucos passos criamos sua conta e já mandamos seu pedido pra equipe da WA.</p>
      <NewSiteWizard mode="signup" onComplete={handleComplete} />
    </div>
  );
}
