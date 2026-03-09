import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css'; // Não esqueça de manter o CSS global!

function App() {
  // Nosso estado que simula se o usuário tem o "crachá" (Token) ou não
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* 1. ROTA RAIZ: O Guarda de Trânsito */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />

        {/* 2. ROTA DE LOGIN */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Login onLoginSuccess={(userData) => {
                setIsAuthenticated(true);
                setUser(userData);
              }} />
          } 
        />

        {/* 3. ROTA DE CADASTRO */}
        <Route 
          path="/cadastro" 
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Register />
          } 
        />

        {/* 4. ROTA DA HOME (Protegida) */}
        <Route 
          path="/home" 
          element={
            isAuthenticated ? <Home user={user} onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/login" />
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;