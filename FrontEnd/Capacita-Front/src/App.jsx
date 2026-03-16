import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Mentor } from './pages/Mentor';


const estaLogado = () => {
  const token = localStorage.getItem('token');
  
  return token !== null; 
};

const RotaProtegida = ({ children }) => {
  if (!estaLogado()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <RotaProtegida>
            <Home />
          </RotaProtegida>}
        />

        <Route path="/mentor" element={<Mentor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}