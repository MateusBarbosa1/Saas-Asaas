import { useNavigate } from 'react-router-dom';
import NewSiteWizard from '../components/NewSiteWizard';
import { useSites } from '../context/SitesContext';
import './addSite.css';

export default function AddSite() {
  const { addSite } = useSites();
  const navigate = useNavigate();

  function handleComplete(site) {
    addSite(site);
    navigate(`/sites/${site.id}`);
  }

  return (
    <div className="add-site">
      <div className="eyebrow">Novo pedido</div>
      <h1>Adicionar site</h1>
      <p className="lede">Conte pra gente o que você precisa — a equipe da WA revisa e dá início ao estudo de mercado.</p>
      <NewSiteWizard mode="add-site" onComplete={handleComplete} />
    </div>
  );
}
