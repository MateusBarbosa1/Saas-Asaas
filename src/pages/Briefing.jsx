import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react';
import { PAGE_OPTIONS, FEATURE_OPTIONS, COLOR_PRESETS } from '../data/mock';
import { useSites } from '../context/SitesContext';
import './briefing.css';

const STEPS = [
  { id: 'negocio', label: 'Negócio' },
  { id: 'visual', label: 'Identidade visual' },
  { id: 'estrutura', label: 'Páginas' },
  { id: 'funcionalidades', label: 'Funcionalidades' },
  { id: 'conteudo', label: 'Conteúdo' },
  { id: 'revisao', label: 'Revisão' },
];

const initialForm = {
  nicho: '', publico: '', diferenciais: '',
  paleta: COLOR_PRESETS[0].name, temLogo: 'sim', referencias: '',
  paginas: ['Home', 'Sobre', 'Contato'], paginaCustom: '',
  funcionalidades: ['Formulário de contato'],
  conteudoPronto: 'parcial', notasConteudo: '',
  prazo: '', orcamento: '',
};

function toggleItem(list, item) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

export default function Briefing() {
  const { siteId } = useParams();
  const { sites } = useSites();
  const site = sites.find((s) => s.id === siteId);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  if (!site) return <Navigate to="/sites" replace />;

  function next() {
    if (isLast) { setSubmitted(true); return; }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  if (submitted) {
    return (
      <div className="briefing-done card">
        <PartyPopper size={34} color="var(--brass)" strokeWidth={1.6} />
        <h2>Briefing enviado!</h2>
        <p className="lede">
          Recebemos suas respostas sobre <strong>{site.name}</strong>. A equipe da WA vai revisar
          tudo antes de avançar para a próxima etapa do Método WA. Nada aqui foi salvo em
          servidor ainda — isso é só a versão de front-end.
        </p>
        <div className="briefing-done-actions">
          <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setStep(0); }}>
            Revisar respostas
          </button>
          <Link to={`/sites/${site.id}`} className="btn btn-brass">Voltar para o site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="briefing">
      <Link to={`/sites/${site.id}`} className="site-detail-back">← {site.name}</Link>
      <div className="eyebrow">Briefing do site</div>
      <h1>Conte pra gente o que você precisa</h1>
      <p className="lede">Suas respostas alimentam diretamente o estudo de mercado e o design do seu site.</p>

      <div className="briefing-steps">
        {STEPS.map((s, i) => (
          <div key={s.id} className={`briefing-step-pill ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <span className="dot">{i < step ? <Check size={11} strokeWidth={3} /> : i + 1}</span>
            {s.label}
          </div>
        ))}
      </div>

      <div className="card briefing-body">
        {step === 0 && (
          <div className="field-group">
            <div className="field">
              <label>Qual o nicho / segmento do seu negócio?</label>
              <input type="text" value={form.nicho} onChange={(e) => update('nicho', e.target.value)} />
            </div>
            <div className="field">
              <label>Quem é o seu público-alvo?</label>
              <input type="text" value={form.publico} onChange={(e) => update('publico', e.target.value)} />
            </div>
            <div className="field">
              <label>O que diferencia você da concorrência?</label>
              <textarea value={form.diferenciais} onChange={(e) => update('diferenciais', e.target.value)} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="field-group">
            <div className="field">
              <label>Paleta de cores</label>
              <div className="palette-grid">
                {COLOR_PRESETS.map((p) => (
                  <button
                    type="button"
                    key={p.name}
                    className={`palette-option ${form.paleta === p.name ? 'active' : ''}`}
                    onClick={() => update('paleta', p.name)}
                  >
                    <div className="palette-swatches">
                      {p.colors.map((c) => <span key={c} style={{ background: c }} />)}
                    </div>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
              <p className="hint">Não sabe ainda? A equipe também pode sugerir com base no seu negócio.</p>
            </div>

            <div className="field">
              <label>Você já tem uma logo pronta?</label>
              <div className="radio-row">
                {['sim', 'nao', 'preciso-refazer'].map((v) => (
                  <label key={v} className={`radio-pill ${form.temLogo === v ? 'active' : ''}`}>
                    <input type="radio" name="temLogo" checked={form.temLogo === v}
                      onChange={() => update('temLogo', v)} />
                    {v === 'sim' ? 'Sim, já tenho' : v === 'nao' ? 'Não tenho' : 'Tenho, mas quero refazer'}
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Sites que você gosta como referência (opcional)</label>
              <textarea value={form.referencias} onChange={(e) => update('referencias', e.target.value)}
                placeholder="Cole links ou nomes de sites que você admira" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="field-group">
            <div className="field">
              <label>Quais páginas o seu site vai ter?</label>
              <div className="checkbox-grid">
                {PAGE_OPTIONS.map((p) => (
                  <label key={p} className={`checkbox-pill ${form.paginas.includes(p) ? 'active' : ''}`}>
                    <input type="checkbox" checked={form.paginas.includes(p)}
                      onChange={() => update('paginas', toggleItem(form.paginas, p))} />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Outra página que não está na lista?</label>
              <input type="text" value={form.paginaCustom} onChange={(e) => update('paginaCustom', e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="field-group">
            <div className="field">
              <label>Quais funcionalidades o site precisa ter?</label>
              <div className="checkbox-grid">
                {FEATURE_OPTIONS.map((f) => (
                  <label key={f} className={`checkbox-pill ${form.funcionalidades.includes(f) ? 'active' : ''}`}>
                    <input type="checkbox" checked={form.funcionalidades.includes(f)}
                      onChange={() => update('funcionalidades', toggleItem(form.funcionalidades, f))} />
                    {f}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="field-group">
            <div className="field">
              <label>Você já tem textos e fotos prontos?</label>
              <div className="radio-row">
                {['sim', 'parcial', 'nao'].map((v) => (
                  <label key={v} className={`radio-pill ${form.conteudoPronto === v ? 'active' : ''}`}>
                    <input type="radio" name="conteudoPronto" checked={form.conteudoPronto === v}
                      onChange={() => update('conteudoPronto', v)} />
                    {v === 'sim' ? 'Sim, tudo pronto' : v === 'parcial' ? 'Parte sim, parte não' : 'Preciso que a WA produza'}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Alguma observação sobre o conteúdo?</label>
              <textarea value={form.notasConteudo} onChange={(e) => update('notasConteudo', e.target.value)} />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="field-group">
            <div className="field">
              <label>Prazo desejado</label>
              <input type="text" value={form.prazo} onChange={(e) => update('prazo', e.target.value)} />
            </div>
            <div className="field">
              <label>Faixa de orçamento (opcional)</label>
              <input type="text" value={form.orcamento} onChange={(e) => update('orcamento', e.target.value)} />
            </div>

            <div className="review">
              <h3>Resumo do briefing</h3>
              <div className="review-row"><span>Nicho</span><strong>{form.nicho || '—'}</strong></div>
              <div className="review-row"><span>Público-alvo</span><strong>{form.publico || '—'}</strong></div>
              <div className="review-row"><span>Paleta</span><strong>{form.paleta}</strong></div>
              <div className="review-row"><span>Páginas</span><strong>{form.paginas.join(', ') || '—'}</strong></div>
              <div className="review-row"><span>Funcionalidades</span><strong>{form.funcionalidades.join(', ') || '—'}</strong></div>
              <div className="review-row"><span>Conteúdo</span><strong>{form.conteudoPronto}</strong></div>
            </div>
          </div>
        )}

        <div className="briefing-nav">
          <button className="btn btn-ghost" onClick={back} disabled={isFirst}>
            <ChevronLeft size={16} /> Voltar
          </button>
          <button className="btn btn-brass" onClick={next}>
            {isLast ? 'Enviar briefing' : 'Continuar'}
            {!isLast && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
