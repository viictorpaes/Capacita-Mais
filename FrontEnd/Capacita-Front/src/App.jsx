// 1. Adicionamos o useEffect aqui no import
import { useState, useEffect } from 'react';
import './App.css';

import logoImg from './assets/logo.png'; 
import appleIcon from './assets/icon-apple.png';
import googleIcon from './assets/icon-google.png';
import facebookIcon from './assets/icon-facebook.png';

function App() {
  // 2. Criamos um estado para controlar se está carregando ou não (começa como 'true')
  const [isLoading, setIsLoading] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. O useEffect cria um timer que muda o isLoading para 'false' após 2.5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2500 milissegundos = 2.5 segundos

    return () => clearTimeout(timer); // Limpeza do timer
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Pronto para enviar para o Back-end:", { email, password });
  };

  // 4. RENDERIZAÇÃO CONDICIONAL: Se isLoading for true, mostra SÓ O PRELOADER
  if (isLoading) {
    return (
      <div className="preloader-container">
        <img src={logoImg} alt="Carregando..." className="preloader-logo" />
      </div>
    );
  }

  // 5. Se isLoading for false, o código passa direto pelo 'if' e mostra o LOGIN NORMAL
  return (
    <div className="login-container">
      {/* HEADER: LOGO */}
      <div className="login-header">
        <div className="logo">
          <img src={logoImg} alt="Logo Capacita Mais" className="logo-img" />
        </div>
      </div>

      {/* FORMULÁRIO */}
      <div className="login-form-section">
        <form className="login-form" onSubmit={handleLogin}>
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="sarah_alencar@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> Manter login
            </label>
            <a href="#" className="forgot-password">Esqueceu a senha?</a>
          </div>

          <button type="submit" className="btn-entrar">Entrar</button>

          <p className="register-link">
            Não possui conta ? <a href="#">Clique aqui</a>
          </p>

          <div className="divider"></div>

          <div className="social-login">
            <button type="button" className="social-btn">
              <img src={appleIcon} alt="Login com Apple" />
            </button>
            <button type="button" className="social-btn">
              <img src={googleIcon} alt="Login com Google" />
            </button>
            <button type="button" className="social-btn">
              <img src={facebookIcon} alt="Login com Facebook" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default App;