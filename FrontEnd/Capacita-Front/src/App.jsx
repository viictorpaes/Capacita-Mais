import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css'; 

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        
     
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />

    
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Login onLoginSuccess={(userData) => {
                setIsAuthenticated(true);
                setUser(userData);
              }} />
          } 
        />

       
        <Route 
          path="/cadastro" 
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Register />
          } 
        />

        
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