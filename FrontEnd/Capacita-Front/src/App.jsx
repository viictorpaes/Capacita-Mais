import { useState, useEffect } from 'react'; // Adicionamos o useEffect aqui!
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import logoImg from './assets/logo.png'; // Importamos a logo para o preloader
import './App.css'; // Garantindo que o CSS global está sendo puxado!

function App() {
  // 1. Estados da nossa aplicação
  const [isLoading, setIsLoading] = useState(true); // O preloader volta!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // 2. Temporizador: tira o preloader da tela após 1.5 segundos
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // 3. Regra 1: Se estiver carregando, mostra a animação do Preloader
  if (isLoading) {
    return (
      <div className="preloader-container">
        <img src={logoImg} alt="Carregando..." className="preloader-logo" />
      </div>
    );
  }

  // 4. Regra 2: Se estiver logado, mostre a Home
  if (isLoggedIn) {
    // Quando a Home pedir para sair, o App muda o estado de login para falso!
    return <Home onLogout={() => setIsLoggedIn(false)} />;
  }

  // 5. Regra 3: Se clicou em cadastrar, mostre o Register
  if (showRegister) {
    return <Register onBackToLogin={() => setShowRegister(false)} />;
  }

  // 6. Regra Padrão: Mostre o Login
  return (
    <Login 
      onLoginSuccess={() => setIsLoggedIn(true)} 
      onGoToRegister={() => setShowRegister(true)} 
    />
  );
}

export default App;