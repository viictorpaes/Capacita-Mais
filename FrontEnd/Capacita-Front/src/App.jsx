// src/App.jsx
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';


// 1. Função simulada de autenticação
const estaLogado = () => {
  // Busca a chave 'token' no armazenamento do navegador
  const token = localStorage.getItem('token');
  
  // Retorna true se encontrou alguma coisa, e false se o token for null
  return token !== null; 
};

// 2. Componente de Rota Protegida ("O Segurança")
const RotaProtegida = ({ children }) => {
  if (!estaLogado()) {
    // Se não estiver logado, chuta o usuário para o /login
    return <Navigate to="/login" replace />;
  }
  // Se estiver logado, deixa ele ver a página (children)
  return children;
};

/* >>>>>>>>>>>>>>>>>>>>>>>
// 1. Função real de autenticação com JWT
const estaLogado = () => {
  // O localStorage guarda dados no navegador do usuário mesmo se ele fechar a aba.
  // Aqui estamos checando se existe uma chave chamada 'token' salva.
  const token = localStorage.getItem('token');
  
  // Se o token existir, retorna true. Se for null, retorna false.
  return token !== null; 
}; <<<<<<<<<<<<<<<<<<<<<<<<<
*/ 


export default function App() {
  return (
    // BrowserRouter é o motor que avisa o React quando a URL do navegador muda
    <BrowserRouter>
      {/* Routes é a caixa que guarda todas as suas rotas */}
      <Routes>
        {/* Cada Route liga um caminho (path) a uma tela (element) */}

        <Route path="/" element={
          <RotaProtegida>
            <Home />
          </RotaProtegida>}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}