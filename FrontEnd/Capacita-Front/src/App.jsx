import { useState, useEffect } from 'react';
import './App.css';

// 👇 1. AQUI: Importamos a tela Home que acabamos de criar
import Home from './pages/home'; 

// Importações de imagens do login
import logoImg from './assets/logo.png'; 
import appleIcon from './assets/icon-apple.png';
import googleIcon from './assets/icon-google.png';
import facebookIcon from './assets/icon-facebook.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // 👇 2. AQUI: Criamos a variável que diz se o usuário está logado (começa falso)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Temporizador do Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Função que roda quando clicamos no botão "Entrar"
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Pronto para enviar para o Back-end:", { email, password });
    
    // 👇 3. AQUI: Quando o botão Entrar for clicado, mudamos para VERDADEIRO
    setIsLoggedIn(true); 
  };

  // --- ÁREA DE EXIBIÇÃO DA TELA ---

  // Se estiver carregando, mostra o preloader
  if (isLoading) {
    return (
      <div className="preloader-container">
        <img src={logoImg} alt="Carregando..." className="preloader-logo" />
      </div>
    );
  }

  // 👇 4. AQUI: Se o login for verdadeiro (clicou no botão), mostra a tela HOME e ignora o resto do código!
  if (isLoggedIn) {
    return <Home />;
  }

  // Se o login for falso (padrão), ele chega até aqui e mostra a tela de LOGIN
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