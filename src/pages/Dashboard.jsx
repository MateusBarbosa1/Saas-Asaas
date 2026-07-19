import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import ProgressTracker from '../components/ProgressTracker';
import { MOCK_PROJECT, METHOD_STAGES } from '../data/mock';
import './dashboard.css';

export default function Dashboard() {
  const stage = METHOD_STAGES.find((s) => s.id === MOCK_PROJECT.currentStage);
  const pct = Math.round((MOCK_PROJECT.currentStage - 1) / (METHOD_STAGES.length - 1) * 100);

  return (
    <div className="dash">
      <div className="dash-head">
        <div className="eyebrow">Seu projeto</div>
        <h1>{MOCK_PROJECT.name}</h1>
        <p className="lede">
          Etapa atual: <strong>{stage.label}</strong> — entrega estimada em{' '}
          {new Date(MOCK_PROJECT.estimatedDelivery + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}.
        </p>
      </div>

      <div className="dash-grid">
        <div className="card dash-progress-card">
          <div className="dash-progress-head">
            <h3>Progresso do desenvolvimento</h3>
            <span className="dash-pct">{pct}%</span>
          </div>
          <div className="dash-progress-bar">
            <div className="dash-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <ProgressTracker currentStage={MOCK_PROJECT.currentStage} />
        </div>

        <div className="dash-side">
          <div className="card dash-panel">
            <h3>Últimas atualizações</h3>
            <ul className="dash-updates">
              {MOCK_PROJECT.updates.map((u, i) => (
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
              {MOCK_PROJECT.files.map((f, i) => (
                <li key={i}>
                  <FileText size={16} strokeWidth={1.8} />
                  <span>{f.name}</span>
                  <span className="dash-file-size">{f.size}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/briefing" className="card dash-cta">
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
