import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Plus } from 'lucide-react';
import { useSites } from '../context/SitesContext';
import './sites.css';

const STATUS_LABEL = {
  'em-desenvolvimento': 'Em desenvolvimento',
  'no-ar': 'No ar',
  'pausado': 'Pausado',
};

export function siteProgress(site) {
  const done = site.pages.filter((p) => p.done).length;
  return Math.round((done / site.pages.length) * 100);
}

export default function MeusSites() {
  const { sites } = useSites();

  return (
    <div className="sites">
      <div className="sites-head">
        <div>
          <div className="eyebrow">Seus projetos</div>
          <h1>Meus sites</h1>
          <p className="lede">Todos os sites que a WA está construindo ou mantendo para você.</p>
        </div>
        <Link to="/sites/novo" className="btn btn-brass">
          <Plus size={16} /> Adicionar site
        </Link>
      </div>

      {sites.length === 0 ? (
        <div className="card sites-empty">
          <p>Você ainda não pediu nenhum site. Clique em "Adicionar site" para começar.</p>
        </div>
      ) : (
        <div className="sites-grid">
          {sites.map((site) => {
            const pct = siteProgress(site);
            return (
              <Link to={`/sites/${site.id}`} key={site.id} className="card site-card">
                <div className="site-card-head">
                  <div className={`site-status site-status-${site.status}`}>{STATUS_LABEL[site.status]}</div>
                  <ArrowRight size={16} />
                </div>
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
      )}
    </div>
  );
}
