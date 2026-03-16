import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import './meusCursos.css';
import logoCapacita from '../assets/logo.png';
import semCursoImg from '../assets/semcurso.jpeg';

function MeusCursos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    name: localStorage.getItem('userName') || 'Aluno',
  });
  const [cursosMatriculados, setCursosMatriculados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarCursos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setCursosMatriculados([]);
          return;
        }

        const tokenParts = token.split('.');
        const payloadBase64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
        const payloadDecodificado = JSON.parse(window.atob(payloadBase64));
        const userId = payloadDecodificado.sub;

        const respostaUsuario = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (respostaUsuario.ok) {
          const dadosUsuario = await respostaUsuario.json();
          setUsuario({ name: dadosUsuario.name || localStorage.getItem('userName') || 'Aluno' });
          setCursosMatriculados(dadosUsuario.enrollments || []);
        } else {
          setCursosMatriculados([]);
        }
      } catch (erro) {
        console.error('Erro ao buscar cursos do usuario:', erro);
        setCursosMatriculados([]);
      } finally {
        setCarregando(false);
      }
    };

    buscarCursos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const primeiroNome = usuario.name.split(' ')[0];

  return (
    <div className="home-container">
      <nav className="navbar">
        <img src={logoCapacita} alt="Capacita+" className="nav-logo" />
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/cursos" className="active">Meus Cursos</Link>
          <Link to="/mentor">Mentor +</Link>
          <Link to="/perfil">Meu Perfil</Link>
        </div>
        <div className="nav-user">
          <span className="user-greeting">Ola, {primeiroNome}!</span>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </nav>

      <main className="main-content">
        <section className="section-container">
          <h3 className="section-title">Meus Cursos</h3>

          {carregando ? (
            <p className="my-courses-info">Carregando seus cursos...</p>
          ) : cursosMatriculados.length === 0 ? (
            <div className="my-courses-empty">
              <img src={semCursoImg} alt="Sem cursos" />
              <p className="my-courses-empty-title">Sem cursos matriculados</p>
              <p className="my-courses-empty-description">Voce ainda nao iniciou nenhum curso.</p>
              <button className="btn-explorar" onClick={() => navigate('/')}>Explorar cursos</button>
            </div>
          ) : (
            <div className="cards-grid">
              {cursosMatriculados.map((matricula) => (
                <div className="course-card" key={matricula.id}>
                  <div className="course-image" />
                  <div className="course-info">
                    <h4>{matricula.course.title}</h4>
                    <p className="my-courses-card-description">
                      {matricula.course.description || 'Curso de capacitacao em educacao inclusiva.'}
                    </p>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: '50%' }} />
                    </div>
                    <p className="my-courses-progress-label">50% concluido</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MeusCursos;