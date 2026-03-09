import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'; 
import logoImg from '../assets/logo.png'; 


function Login({ onLoginSuccess }) {
  
  
  const navigate = useNavigate(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    try {
  
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        }), 
      });

      
      const data = await response.json();

      
      if (response.ok) {
        console.log("Sucesso! O Back-end respondeu:", data);
        
        

        onLoginSuccess(data.user); 
      } else {
        
        alert("Erro no login: " + (data.message || "E-mail ou senha inválidos."));
      }

    } catch (error) {
      
      console.error("Erro de conexão:", error);
      alert("Não foi possível conectar ao servidor. O Back-end está ligado?");
    }
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
              placeholder="••••••••"
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
            Não possui conta? 
            <span onClick={() => navigate('/cadastro')} style={{ color: '#352a5c', cursor: 'pointer', fontWeight: 'bold' }}>
              Clique aqui
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;