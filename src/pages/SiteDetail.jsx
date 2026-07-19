import { useParams, Link, Navigate } from 'react-router-dom';
import { FileText, Globe, ClipboardList, ArrowRight } from 'lucide-react';
import { useSites } from '../context/SitesContext';
import { siteProgress } from './MeusSites';
import ProgressTracker from '../components/ProgressTracker';
import './shared.css';
import './siteDetail.css';

const STATUS_LABEL = {
  'em-desenvolvimento': 'Em desenvolvimento',
  'no-ar': 'No ar',
  'pausado': 'Pausado',
};

export default function SiteDetail() {
  const { siteId } = useParams();
  const { sites } = useSites();
  const site = sites.find((s) => s.id === siteId);
  if (!site) return <Navigate to="/sites" replace />;

  const pct = siteProgress(site);

  return (
    <div className="site-detail">
      <Link to="/sites" className="site-detail-back">← Meus sites</Link>

      <div className="site-detail-head">
        <div>
          <div className={`site-status site-status-${site.status}`}>{STATUS_LABEL[site.status]}</div>
          <h1>{site.name}</h1>
          <div className="site-detail-url"><Globe size={14} strokeWidth={1.8} /> {site.url}</div>
        </div>
        <Link to={`/sites/${site.id}/briefing`} className="btn btn-ghost">
          <ClipboardList size={16} /> Editar briefing
        </Link>
      </div>

      <div className="dash-grid">
        <div className="card dash-progress-card">
          <div className="dash-progress-head">
            <h3>Progresso do site</h3>
            <span className="dash-pct">{pct}%</span>
          </div>
          <div className="dash-progress-bar">
            <div className="dash-progress-fill" style={{ width: `${pct}%` }} />
          </div>

          <div className="site-checklist">
            {site.pages.map((p) => (
              <label key={p.name} className={`site-checklist-item ${p.done ? 'done' : ''}`}>
                <input type="checkbox" checked={p.done} readOnly />
                {p.name}
              </label>
            ))}
          </div>

          <div className="site-detail-stagehead">Fase do Método WA</div>
          <ProgressTracker currentStage={site.currentStage} />
        </div>

        <div className="dash-side">
          <div className="card dash-panel">
            <h3>Últimas atualizações</h3>
            <ul className="dash-updates">
              {site.updates.map((u, i) => (
                <li key={i}>
                  <span className="dash-update-date">{u.date}</span>
                  <span>{u.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card dash-panel">
            <h3>Arquivos enviados</h3>
            <ul className="dash-files">
              {site.files.map((f, i) => (
                <li key={i}>
                  <FileText size={16} strokeWidth={1.8} />
                  <span>{f.name}</span>
                  <span className="dash-file-size">{f.size}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to={`/sites/${site.id}/briefing`} className="card dash-cta">
            <div>
              <strong>Revisar briefing do site</strong>
              <span>Ajuste paleta, funcionalidades e páginas.</span>
            </div>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
