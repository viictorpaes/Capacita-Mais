import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'; // Importamos o CSS que já estava pronto
import logoImg from '../assets/logo.png'; 

// 2. Olha como a primeira linha mudou: tiramos o onGoToRegister
function Login({ onLoginSuccess }) {
  
  // 3. E aqui nós criamos a variável que vai fazer a troca de URL!
  const navigate = useNavigate(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede a página de recarregar (comportamento padrão do HTML)
    
    try {
      // 1. O Carteiro: Enviando os dados para a porta 3000 (NestJS)
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST', // É um POST porque estamos enviando dados sigilosos
        headers: {
          'Content-Type': 'application/json', // Avisa o Back-end que estamos mandando um JSON
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        }), // Transforma nossas variáveis em texto puro
      });

      // 2. Abrindo a carta de resposta do Back-end
      const data = await response.json();

      // 3. O Back-end disse que a senha está certa? (Status 200 a 299)
      if (response.ok) {
        console.log("Sucesso! O Back-end respondeu:", data);
        
        // Seus colegas provavelmente configuraram para devolver um Token JWT aqui.
        // Se sim, você guarda esse "crachá" no navegador assim:
        // localStorage.setItem('token', data.token);

        onLoginSuccess(data.user); // O Maestro muda o estado e o React Router te joga para /home
      } else {
        // Se o Back-end barrar (Status 401, 404, etc)
        alert("Erro no login: " + (data.message || "E-mail ou senha inválidos."));
      }

    } catch (error) {
      // Cai aqui se o servidor do NestJS estiver desligado ou der erro de rede
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