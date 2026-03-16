import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './Login.css';
import logoCapacita from '../assets/logo.png';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast, showError, clearToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (evento) => {
    evento.preventDefault();
    clearToast();
    
    try {
      const resposta = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem('token', dados.access_token); 
        localStorage.setItem('userName', dados.user.name);
        localStorage.setItem('userRole', dados.user.role || 'STUDENT');

        if (dados.user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        showError(dados.message || 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      showError('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="left-panel">
          <img 
            src={logoCapacita} 
            alt="Logo Capacita+" 
            className="brand-logo" 
          />
        </div>
        
        <div className="right-panel">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={clearToast}
          />

          <form className="login-form" onSubmit={handleLogin}>
            
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="exemplo@email.com"
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input 
                id="senha"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="form-extras">
                <label className="keep-logged-in">
                    <input type="checkbox" />
                    Manter login
                </label>
                <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>

            <button className="btn-primary" type="submit">Entrar</button>
          </form>
          
          <div className="register-link">
            <p>Não possui conta?<Link to="/registro">Clique aqui</Link></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;