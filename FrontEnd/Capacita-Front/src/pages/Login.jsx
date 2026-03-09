import { useState } from 'react';
import './Login.css'; // Importamos o CSS que já estava pronto
import logoImg from '../assets/logo.png'; 

function Login({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Aqui vai a sua lógica de fetch para o Back-end no futuro.
    // Por enquanto, como o Back-end ainda não tem a rota de login, 
    // vamos apenas simular o sucesso para você conseguir acessar a Home:
    console.log("Tentando logar com:", email, password);
    alert("Como o Back-end ainda não tem login, vamos pular direto para a Home!");
    
    // Avisa o Maestro (App.jsx) que o login deu certo!
    onLoginSuccess(); 
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo">
          <img src={logoImg} alt="Logo Capacita Mais" className="logo-img" />
        </div>
      </div>

      <div className="login-form-section">
        <form className="login-form" onSubmit={handleLogin}>
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="exemplo@gmail.com"
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
            <label className="remember-me">
              <input type="checkbox" /> Manter login
            </label>
            <a href="#" className="forgot-password">Esqueceu a senha?</a>
          </div>

          <button type="submit" className="btn-entrar">Entrar</button>

          <p className="register-link">
            Não possui conta? <span onClick={onGoToRegister} style={{ color: '#352a5c', cursor: 'pointer', fontWeight: 'bold' }}>Clique aqui</span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;