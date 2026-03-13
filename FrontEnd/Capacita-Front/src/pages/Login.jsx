import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './Login.css';
import logoCapacita from '../assets/logo.png';

export function Login() {
  // Criamos duas "memórias" (estados) para o componente: email e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(''); // Estado novo para mostrar erros na tela
  const navigate = useNavigate(); // Ferramenta para mudar de tela via JavaScript 

  // Função que roda quando o usuário clica em "Entrar"
  const handleLogin =  async (evento) => {
    evento.preventDefault(); // Evita que a página recarregue (padrão do HTML)
    setErro(''); // Limpa erros anteriores 

    try {
      // Substitua esta URL pelo endpoint real da sua API (ex: http://localhost:8000/api/login)
      const resposta = await fetch('URL_DA_SUA_API_AQUI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        // 1. Salva o token que veio da API no navegador
        // Assumindo que a sua API devolve algo como { "token": "eyJhbGci..." }
        localStorage.setItem('token', dados.token); 
        
        // 2. Redireciona o usuário para a Home ("/")
        navigate('/');
      } else {
        // Se a API retornar erro (ex: 401 Unauthorized), mostramos na tela
        setErro(dados.message || 'Email ou senha incorretos.');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro('Erro ao conectar com o servidor.');
    }

    
    console.log("Dados prontos para enviar para a API:", { email, password });
    
    // Aqui entrará o seu fetch() ou axios.post() chamando a sua API de autenticação
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