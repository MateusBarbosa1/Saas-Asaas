import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { getUser } from '../lib/api';
import { useSites } from '../context/SitesContext';
import { siteProgress } from './MeusSites';
import './shared.css';
import './sites.css';
import './home.css';

const STATUS_LABEL = {
  'em-desenvolvimento': 'Em desenvolvimento',
  'no-ar': 'No ar',
  'pausado': 'Pausado',
};

export default function Home() {
  const { sites } = useSites();
  const user = getUser() || { name: 'Cliente' };
  const active = sites.filter((s) => s.status === 'em-desenvolvimento').length;
  const live = sites.filter((s) => s.status === 'no-ar').length;
  const allUpdates = sites
    .flatMap((s) => s.updates.map((u) => ({ ...u, site: s.name, siteId: s.id })))
    .slice(0, 5);

  return (
    <div className="home">
      <div className="eyebrow">Visão geral</div>
      <h1>Olá, {user.name.split(' ')[0]}</h1>
      <p className="lede">{sites.length} site{sites.length !== 1 ? 's' : ''} na sua conta — {active} em desenvolvimento, {live} no ar.</p>

      <div className="home-grid">
        {sites.map((site) => {
          const pct = siteProgress(site);
          return (
            <Link to={`/sites/${site.id}`} key={site.id} className="card home-site-card">
              <div className={`site-status site-status-${site.status}`}>{STATUS_LABEL[site.status]}</div>
              <h3>{site.name}</h3>
              <div className="site-card-url"><Globe size={13} strokeWidth={1.8} /> {site.url}</div>
              <div className="site-card-bar">
                <div className="site-card-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="site-card-pct">{pct}% concluído</div>
            </Link>
          );
        })}
      </div>

      <div className="card dash-panel home-updates">
        <h3>Últimas atualizações</h3>
        <ul className="dash-updates">
          {allUpdates.map((u, i) => (
            <li key={i}>
              <span className="dash-update-date">{u.date}</span>
              <span><strong>{u.site}:</strong> {u.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/sites" className="card dash-cta home-cta">
        <div>
          <strong>Ver todos os seus sites</strong>
          <span>Progresso, briefing e arquivos de cada projeto.</span>
        </div>
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
