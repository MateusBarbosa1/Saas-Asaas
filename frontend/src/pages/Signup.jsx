import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch, setToken } from '../lib/api';
import './signup.css';

export default function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Preencha todos os campos para continuar.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      setToken(res.token);
      onSignup({ id: res.data.id, name, email });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-screen">
      <a href="/" className="signup-logo">
        <img src="/img/transparencia-logo-completo-branco.svg" alt="WA Web Design" />
      </a>
      <div className="eyebrow">Criar conta</div>
      <h1>Crie sua conta</h1>
      <p className="lede">Assim que entrar, você pede seu primeiro site direto pelo painel.</p>

      <form className="card signup-form" onSubmit={handleSubmit}>
        {error && <div className="login-error">{error}</div>}
        <div className="field">
          <label htmlFor="name">Nome</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <button type="submit" className="btn btn-brass btn-block" disabled={loading}>
          {loading ? 'Criando...' : 'Criar conta'}
        </button>
      </form>

      <div className="signup-foot">
        Já tem conta? <a href="#/">Entrar</a>
      </div>
    </div>
  );
}
