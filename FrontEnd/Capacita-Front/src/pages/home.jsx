import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import logoCapacita from '../assets/logo.png';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

export function Home() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({ 
    name: localStorage.getItem('userName') || 'Aluno' 
  });
  const [userId, setUserId] = useState('');
  const [cursosMatriculados, setCursosMatriculados] = useState([]);
  const [cursosDisponiveis, setCursosDisponiveis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [cursoMatriculandoId, setCursoMatriculandoId] = useState('');
  const { toast, showSuccess, showError, clearToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const buscarDados = async () => {
      try {
        const respostaCursos = await fetch('http://localhost:3000/api/courses');
        
        if (respostaCursos.ok) {
          const cursosDoBanco = await respostaCursos.json();
          const cursosPublicados = cursosDoBanco
            .filter(curso => curso.isPublished)
            .slice(0, 8);
          setCursosDisponiveis(cursosPublicados);
        }

        if (token) {
          const tokenParts = token.split('.');
          const payloadBase64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
          const payloadDecodificado = JSON.parse(window.atob(payloadBase64));
          const userId = payloadDecodificado.sub; 
          setUserId(userId);

          const respostaUsuario = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (respostaUsuario.ok) {
            const dadosUsuario = await respostaUsuario.json();
            setCursosMatriculados(dadosUsuario.enrollments || []);
          }
        }

      } catch (erro) {
        console.error("Erro fatal ao conectar com o back-end:", erro);
        setCursosDisponiveis([]); 
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const primeiroNome = usuario.name.split(' ')[0];

  const formatarPreco = (valor) => {
    const numero = Number(valor); 
    if (numero === 0) return 'Gratuito';
    return `R$ ${numero.toFixed(2).replace('.', ',')}`;
  };

  const idsCursosMatriculados = new Set(cursosMatriculados.map((m) => m.course.id));

  const handleMatricular = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token || !userId) {
      showError('Faça login novamente para se matricular.');
      return;
    }

    clearToast();
    setCursoMatriculandoId(courseId);

    try {
      const resposta = await fetch('http://localhost:3000/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          courseId,
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setCursosMatriculados((prev) => [dados, ...prev]);
        showSuccess('Matrícula realizada com sucesso.');
      } else {
        showError(dados.message || 'Não foi possível realizar a matrícula.');
      }
    } catch (erro) {
      showError('Erro ao conectar com o servidor.');
    } finally {
      setCursoMatriculandoId('');
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <img src={logoCapacita} alt="Capacita+" className="nav-logo" />
        <div className="nav-links">
          <Link to="/" className="active">Início</Link>
          <Link to="/cursos">Meus Cursos</Link>
          <Link to="/mentor">Mentor +</Link>
          <Link to="/perfil">Meu Perfil</Link>
        </div>
        <div className="nav-user">
          <span className="user-greeting">Olá, {primeiroNome}!</span>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </nav>

      <main className="main-content">
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />

        <section className="promo-banner">
          <div>
            <h2>Seja Premium e libere todos os conteúdos!</h2>
            <p>Acesse Mentorias exclusivas e certificados validados pelo MEC.</p>
          </div>
          <Link to="/premium" className="btn-premium">Conhecer Planos</Link>
        </section>

        <section className="section-container">
          {carregando ? (
            <h3 className="section-title">Buscando informações...</h3>
          ) : (
            <>
              <h3 className="section-title">
                {cursosMatriculados.length > 0 ? 'Continue de onde parou' : 'Cursos que você pode gostar'}
              </h3>
              <div className="cards-grid">
                {cursosMatriculados.length > 0 ? (
                  cursosMatriculados.map((matricula) => (
                    <div className="course-card" key={matricula.id}>
                      <div className="course-image"></div>
                      <div className="course-info">
                        <h4>{matricula.course.title}</h4>
                        {/* Mantido estático em 50% por enquanto, já que não há coluna de progresso no BD */}
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#666' }}>Você ainda não está matriculado em nenhum curso.</p>
                )}
              </div>
            </>
          )}
        </section>
        
        <section className="section-container">
          <h3 className="section-title">Explorar Categorias</h3>
          <div className="categories-grid">
            <div className="category-card">TDAH</div>
            <div className="category-card">TEA</div>
            <div className="category-card">Dislexia</div>
            <div className="category-card">Altas Habilidades / Superdotação</div>
            <div className="category-card">Educação Inclusiva</div>
          </div>
        </section>

        <section className="section-container">
          <h3 className="section-title">Cursos Mais Procurados</h3>
          
          {carregando ? (
             <p style={{ color: '#666' }}>Carregando catálogo...</p>
          ) : (
            <div className="cards-grid">
              {cursosDisponiveis.length > 0 ? (
                cursosDisponiveis.map((curso) => (
                  <div className="course-card" key={curso.id}>
                    <div className="course-image"></div>
                    <div className="course-info">
                      <h4>{curso.title}</h4>
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        {curso.description}
                      </p>
                      <span style={{ 
                        fontSize: '15px', 
                        fontWeight: 'bold', 
                        color: curso.price === 0 ? '#00796b' : '#333',
                        backgroundColor: curso.price === 0 ? '#e0f2f1' : 'transparent',
                        padding: curso.price === 0 ? '4px 8px' : '0',
                        borderRadius: '4px'
                      }}>
                        {formatarPreco(curso.price)}
                      </span>
                      <button
                        className="btn-enroll"
                        onClick={() => handleMatricular(curso.id)}
                        disabled={idsCursosMatriculados.has(curso.id) || cursoMatriculandoId === curso.id}
                      >
                        {idsCursosMatriculados.has(curso.id)
                          ? 'Já matriculado'
                          : cursoMatriculandoId === curso.id
                            ? 'Matriculando...'
                            : 'Cadastrar no curso'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#666', fontStyle: 'italic' }}>
                  Não existem cursos disponíveis no momento.
                </p>
              )}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default Home;