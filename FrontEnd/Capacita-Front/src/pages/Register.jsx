import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'; 
import logoImg from '../assets/logo.png'; 

function Register({ onBackToLogin }) {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
        navigate('/login');
      } else {
        alert(data.message || 'Erro ao realizar cadastro.');
      }
      
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Não foi possível conectar ao servidor. O NestJS está rodando?');
    }
  };

  return (
    <div className="login-container">
      {/* HEADER: LOGO */}
      <div className="login-header">
        <div className="logo">
          <img src={logoImg} alt="Logo Capacita Mais" className="logo-img" />
        </div>
      </div>

      {/* FORMULÁRIO DE CADASTRO */}
      <div className="login-form-section">
        <form className="login-form" onSubmit={handleRegister}>
          
          <div className="input-group">
            <label>Nome Completo</label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="btn-entrar">Cadastrar</button>

          <p className="register-link" style={{ marginTop: '20px' }}>
            Já possui uma conta? 
            <span onClick={() => navigate('/login')} style={{ color: '#352a5c', cursor: 'pointer', fontWeight: 'bold' }}>
              Faça Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;