import { CreditCard } from 'lucide-react';
import { useSites } from '../context/SitesContext';
import './meuPlano.css';

export default function MeuPlano() {
  const { sites } = useSites();

  return (
    <div className="plano">
      <div className="eyebrow">Contrato e cobrança</div>
      <h1>Meu plano</h1>
      <p className="lede">O que está incluído e quando cai a próxima cobrança de cada site.</p>

      <div className="plano-list">
        {sites.map((site) => (
          <div className="card plano-card" key={site.id}>
            <div className="plano-card-head">
              <div>
                <div className="eyebrow">{site.name}</div>
                <h3>{site.plan.name}</h3>
              </div>
              <div className="plano-price">{site.plan.price}</div>
            </div>

            <div className="plano-includes">
              {site.plan.includes.map((item) => (
                <span key={item} className="plano-chip">{item}</span>
              ))}
            </div>

            <div className="plano-billing">
              <CreditCard size={16} strokeWidth={1.8} />
              <span>{site.plan.cycle} — próxima cobrança em <strong>{site.plan.nextPayment}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
