import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar.');
      return;
    }
    // Sem backend ainda: qualquer combinação válida "loga".
    setError('');
    onLogin();
    navigate('/dashboard');
  }

  return (
    <div className="login-screen">
      <div className="login-side">
        <img
          src="/img/transparencia-logo-simples-cinza.png"
          alt=""
          aria-hidden="true"
          className="login-watermark"
        />

        <a href="/" className="login-logo">
          <img src="/img/transparencia-logo-completo-branco.png" alt="WA Web Design" />
        </a>
        <h1>Acompanhe o seu site do início ao ar.</h1>
        <p className="lede">
          Aqui você acompanha cada etapa do Método WA em tempo real, envia
          arquivos e conta pra gente exatamente o que precisa no seu site.
        </p>
        <ul className="login-points">
          <li>Progresso das 6 etapas do desenvolvimento</li>
          <li>Formulário de briefing guiado</li>
          <li>Histórico de atualizações do projeto</li>
        </ul>
      </div>

      <div className="login-form-wrap">
        <form className="login-form card" onSubmit={handleSubmit}>
          <div className="eyebrow">Área do cliente</div>
          <h2>Entrar na sua conta</h2>
          <p className="lede small">Use o e-mail cadastrado no seu contrato com a WA.</p>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="voce@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="btn btn-brass btn-block">Entrar</button>

          <div className="login-foot">
            <a href="#">Esqueci minha senha</a>
            <span>·</span>
            <a href="#">Falar com a equipe</a>
          </div>
        </form>
      </div>
    </div>
  );
}
