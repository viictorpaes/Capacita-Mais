import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logoCapacita from '../assets/logo.png';

export function Register() {
  // Criamos os estados para cada campo do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRegister = (evento) => {
    evento.preventDefault();
    setErro('');

    // Validação básica para teste visual
    if (nome !== '' && email !== '' && password !== '') {
      const novoUsuario = { nome, email, password };
      console.log("Pronto para enviar para a API:", novoUsuario);
      
      // Simula um cadastro com sucesso e manda pro login
      alert('Cadastro realizado com sucesso! (Simulação)');
      navigate('/login');
    } else {
      setErro('Preencha todos os campos.');
    }
    
    // Este é o payload exato que será enviado. 
    // Quando construíres o teu endpoint de criação de utilizador num backend com Django REST Framework ou NestJS, 
    // é esta a estrutura JSON que ele vai receber no "body" da requisição HTTP POST.
    const novoUtilizador = {
      nome,
      email,
      password,
    };

    console.log("Dados prontos para criar o utilizador na API:", novoUtilizador);
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

            {erro && <p style={{ color: 'red', textAlign: 'center', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>{erro}</p>}

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