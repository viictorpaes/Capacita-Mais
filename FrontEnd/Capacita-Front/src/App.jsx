import { useState } from 'react';
import './App.css';

// 1. IMPORTANDO AS IMAGENS DA PASTA ASSETS
import logoImg from './assets/logo.png'; 
import appleIcon from './assets/icon-apple.png';
import googleIcon from './assets/icon-google.png';
import facebookIcon from './assets/icon-facebook.png';
// (Se você salvou como .png, basta mudar a extensão acima)

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Pronto para enviar para o Back-end:", { email, password });
  };

  return (
    <div className="login-container">
      {/* HEADER: LOGO */}
      <div className="login-header">
        <div className="logo">
          {/* 2. USANDO A IMAGEM DA LOGO AQUI */}
          <img src={logoImg} alt="Logo Capacita Mais" className="logo-img" />
          {/* Se a sua imagem exportada já tiver o texto "Capacita+", 
              você pode apagar a tag <h1> abaixo. Se for só o símbolo, mantenha. */}
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

          {/* 3. USANDO OS ÍCONES SOCIAIS AQUI */}
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