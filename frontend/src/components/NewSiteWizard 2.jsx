import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, LayoutGrid, FileText } from 'lucide-react';
import { PAGE_OPTIONS, LANDING_SECTIONS, FEATURE_OPTIONS, COLOR_PRESETS } from '../data/mock';
import '../pages/briefing.css';
import './newSiteWizard.css';

const STEP_LABELS = {
  tipo: 'Tipo de projeto',
  conta: 'Sua conta',
  negocio: 'Negócio',
  visual: 'Identidade visual',
  estrutura: 'Estrutura',
  funcionalidades: 'Funcionalidades',
  conteudo: 'Conteúdo',
  revisao: 'Revisão',
};

function toggleItem(list, item) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

const initialForm = {
  tipoProjeto: '',
  nomeConta: '', empresa: '', emailConta: '', senha: '',
  nicho: '', publico: '', diferenciais: '',
  paleta: COLOR_PRESETS[0].name, temLogo: 'sim', referencias: '',
  paginas: ['Home', 'Sobre', 'Contato'],
  secoesLanding: ['Hero de abertura', 'Formulário de contato / CTA final'],
  itemCustom: '',
  funcionalidades: ['Formulário de contato'],
  conteudoPronto: 'parcial', notasConteudo: '',
  prazo: '', orcamento: '',
};

export default function NewSiteWizard({ mode = 'add-site', onComplete, submitting = false }) {
  const steps = mode === 'signup'
    ? ['tipo', 'conta', 'negocio', 'visual', 'estrutura', 'funcionalidades', 'conteudo', 'revisao']
    : ['tipo', 'negocio', 'visual', 'estrutura', 'funcionalidades', 'conteudo', 'revisao'];

  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(initialForm);

  const stepId = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;
  const isLanding = form.tipoProjeto === 'landing';
  const canAdvance = stepId !== 'tipo' || form.tipoProjeto !== '';

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function next() {
    if (!canAdvance) return;
    if (isLast) { submit(); return; }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function back() { setStepIndex((i) => Math.max(i - 1, 0)); }

  function submit() {
    const estrutura = isLanding ? form.secoesLanding : form.paginas;
    const baseName = mode === 'signup' ? (form.empresa || form.nomeConta) : form.nicho;
    const label = baseName || 'Novo projeto';

    const sitePayload = {
      name: isLanding ? `Landing page — ${label}` : `Site institucional — ${label}`,
      type: isLanding ? 'landing' : 'site',
      pages: estrutura,
    };

    const account = mode === 'signup'
      ? { nome: form.nomeConta, empresa: form.empresa, email: form.emailConta, senha: form.senha }
      : null;

    onComplete(sitePayload, account);
  }

  return (
    <>
      <div className="briefing-steps">
        {steps.map((id, i) => (
          <div key={id} className={`briefing-step-pill ${i === stepIndex ? 'active' : ''} ${i < stepIndex ? 'done' : ''}`}>
            <span className="dot">{i < stepIndex ? <Check size={11} strokeWidth={3} /> : i + 1}</span>
            {STEP_LABELS[id]}
          </div>
        ))}
      </div>

      <div className="card briefing-body">
        {stepId === 'tipo' && (
          <div className="field-group">
            <label className="wizard-question">O que você quer criar?</label>
            <div className="tipo-grid">
              <button type="button" className={`tipo-option ${form.tipoProjeto === 'site' ? 'active' : ''}`}
                onClick={() => update('tipoProjeto', 'site')}>
                <LayoutGrid size={22} strokeWidth={1.6} />
                <strong>Site completo</strong>
                <span>Várias páginas — home, sobre, serviços, contato...</span>
              </button>
              <button type="button" className={`tipo-option ${form.tipoProjeto === 'landing' ? 'active' : ''}`}
                onClick={() => update('tipoProjeto', 'landing')}>
                <FileText size={22} strokeWidth={1.6} />
                <strong>Landing page</strong>
                <span>Uma página única, focada em converter</span>
              </button>
            </div>
          </div>
        )}

        {stepId === 'conta' && (
          <div className="field-group">
            <div className="field">
              <label htmlFor="nomeConta">Seu nome</label>
              <input id="nomeConta" type="text" value={form.nomeConta}
                onChange={(e) => update('nomeConta', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="empresa">Nome da empresa</label>
              <input id="empresa" type="text" value={form.empresa}
                onChange={(e) => update('empresa', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="emailConta">E-mail</label>
              <input id="emailConta" type="email" value={form.emailConta}
                onChange={(e) => update('emailConta', e.target.value)} placeholder="voce@empresa.com.br" autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="senha">Senha</label>
              <input id="senha" type="password" value={form.senha}
                onChange={(e) => update('senha', e.target.value)} placeholder="••••••••" autoComplete="new-password" />
              <p className="hint">Sem backend ainda: isso fica só nesta sessão.</p>
            </div>
          </div>
        )}

        {stepId === 'negocio' && (
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

        {stepId === 'visual' && (
          <div className="field-group">
            <div className="field">
              <label>Paleta de cores</label>
              <div className="palette-grid">
                {COLOR_PRESETS.map((p) => (
                  <button type="button" key={p.name} className={`palette-option ${form.paleta === p.name ? 'active' : ''}`}
                    onClick={() => update('paleta', p.name)}>
                    <div className="palette-swatches">{p.colors.map((c) => <span key={c} style={{ background: c }} />)}</div>
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
                    <input type="radio" name="temLogo" checked={form.temLogo === v} onChange={() => update('temLogo', v)} />
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

        {stepId === 'estrutura' && (
          <div className="field-group">
            {isLanding ? (
              <div className="field">
                <label>Quais seções a sua landing page vai ter?</label>
                <div className="checkbox-grid">
                  {LANDING_SECTIONS.map((s) => (
                    <label key={s} className={`checkbox-pill ${form.secoesLanding.includes(s) ? 'active' : ''}`}>
                      <input type="checkbox" checked={form.secoesLanding.includes(s)}
                        onChange={() => update('secoesLanding', toggleItem(form.secoesLanding, s))} />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
            ) : (
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
            )}
            <div className="field">
              <label>{isLanding ? 'Outra seção que não está na lista?' : 'Outra página que não está na lista?'}</label>
              <input type="text" value={form.itemCustom} onChange={(e) => update('itemCustom', e.target.value)} />
            </div>
          </div>
        )}

        {stepId === 'funcionalidades' && (
          <div className="field-group">
            <div className="field">
              <label>Quais funcionalidades o {isLanding ? 'projeto' : 'site'} precisa ter?</label>
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

        {stepId === 'conteudo' && (
          <div className="field-group">
            <div className="field">
              <label>Você já tem textos e fotos prontos?</label>
              <div className="radio-row">
                {['sim', 'parcial', 'nao'].map((v) => (
                  <label key={v} className={`radio-pill ${form.conteudoPronto === v ? 'active' : ''}`}>
                    <input type="radio" name="conteudoPronto" checked={form.conteudoPronto === v} onChange={() => update('conteudoPronto', v)} />
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

        {stepId === 'revisao' && (
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
              <h3>Resumo do pedido</h3>
              {mode === 'signup' && (
                <div className="review-row"><span>Conta</span><strong>{form.nomeConta || '—'} · {form.empresa || '—'}</strong></div>
              )}
              <div className="review-row"><span>Tipo</span><strong>{isLanding ? 'Landing page' : 'Site completo'}</strong></div>
              <div className="review-row"><span>Nicho</span><strong>{form.nicho || '—'}</strong></div>
              <div className="review-row"><span>Público-alvo</span><strong>{form.publico || '—'}</strong></div>
              <div className="review-row"><span>Paleta</span><strong>{form.paleta}</strong></div>
              <div className="review-row"><span>{isLanding ? 'Seções' : 'Páginas'}</span><strong>{(isLanding ? form.secoesLanding : form.paginas).join(', ') || '—'}</strong></div>
              <div className="review-row"><span>Funcionalidades</span><strong>{form.funcionalidades.join(', ') || '—'}</strong></div>
              <div className="review-row"><span>Conteúdo</span><strong>{form.conteudoPronto}</strong></div>
            </div>
          </div>
        )}

        <div className="briefing-nav">
          <button className="btn btn-ghost" onClick={back} disabled={isFirst || submitting}>
            <ChevronLeft size={16} /> Voltar
          </button>
          <button className="btn btn-brass" onClick={next} disabled={!canAdvance || submitting}>
            {isLast
              ? (submitting ? 'Enviando...' : (mode === 'signup' ? 'Criar minha conta' : 'Enviar pedido de novo site'))
              : 'Continuar'}
            {!isLast && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </>
  );
}
