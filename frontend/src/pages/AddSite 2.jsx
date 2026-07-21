import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewSiteWizard from '../components/NewSiteWizard';
import { useSites } from '../context/SitesContext';
import './addSite.css';

export default function AddSite() {
  const { addSite } = useSites();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleComplete(sitePayload) {
    setError('');
    setSubmitting(true);
    try {
      const site = await addSite(sitePayload);
      navigate(`/sites/${site.id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="add-site">
      <div className="eyebrow">Novo pedido</div>
      <h1>Adicionar site</h1>
      <p className="lede">Conte pra gente o que você precisa — a equipe da WA revisa e dá início ao estudo de mercado.</p>
      {error && <div className="login-error">{error}</div>}
      <NewSiteWizard mode="add-site" onComplete={handleComplete} submitting={submitting} />
    </div>
  );
}
