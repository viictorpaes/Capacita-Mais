import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logoCapacita from '../assets/logo.png';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

export function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast, showError, clearToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (evento) => {
    evento.preventDefault();
    clearToast();

    if (nome !== '' && email !== '' && password !== '') {
      
      try {
        const resposta = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: nome,
            email: email, 
            password: password 
          }),
        });

        if (resposta.ok) {
          alert('Conta criada com sucesso! Agora você já pode fazer o Login.');
          navigate('/login');
        } else {
          const dadosErro = await resposta.json();
          showError(dadosErro.message || 'Erro ao criar conta. Verifique os dados.');
        }
      } catch (error) {
        showError('Erro ao conectar com o servidor. O back-end está rodando?');
      }

    } else {
      showError('Preencha todos os campos.');
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

          <form className="login-form" onSubmit={handleRegister}>
            
            <div className="input-group">
              <label htmlFor="nome">Nome Completo</label>
              <input 
                id="nome"
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                placeholder="Digite seu nome completo"
                autoFocus
                required
              />
            </div>

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
                autoComplete='off'
                required
              />
            </div>

            <button className="btn-primary" type="submit" style={{ marginTop: '10px' }}>
              Cadastrar
            </button>
          </form>
          
          <div className="register-link">
            <p>Já possui conta?<Link to="/login">Clique aqui</Link></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;