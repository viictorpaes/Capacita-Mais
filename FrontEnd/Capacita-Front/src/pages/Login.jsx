import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './Login.css';
import logoCapacita from '../assets/logo.png';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (evento) => {
    evento.preventDefault();
    setErro('');
    
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
        
        navigate('/');
      } else {
        setErro(dados.message || 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
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

            {erro && <p style={{ color: 'red', textAlign: 'center', backgroundColor: 'transparent', padding: '10px', borderRadius: '5px' }}>{erro}</p>}

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