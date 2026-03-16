import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import './Admin.css';
import logoCapacita from '../assets/logo.png';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

export function Admin() {
  const navigate = useNavigate();
  const { toast, showSuccess, showError, clearToast } = useToast();

  const [usuario, setUsuario] = useState({
    name: localStorage.getItem('userName') || 'Administrador',
  });
  const [usuarios, setUsuarios] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [loadingUserId, setLoadingUserId] = useState('');
  const [loadingCourseId, setLoadingCourseId] = useState('');

  const token = localStorage.getItem('token');

  const buscarDados = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setCarregando(true);

      const [respostaUsuarios, respostaCursos] = await Promise.all([
        fetch('http://localhost:3000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:3000/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!respostaUsuarios.ok || !respostaCursos.ok) {
        showError('Erro ao carregar painel administrativo.');
        return;
      }

      const [dadosUsuarios, dadosCursos] = await Promise.all([
        respostaUsuarios.json(),
        respostaCursos.json(),
      ]);

      setUsuarios(dadosUsuarios || []);
      setCursos(dadosCursos || []);
    } catch (erro) {
      showError('Erro ao conectar com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleDeleteUsuario = async (id, role) => {
    if (role === 'ADMIN') {
      showError('Não é permitido remover usuários admin.');
      return;
    }

    if (!window.confirm('Deseja remover este usuário?')) return;

    setLoadingUserId(id);
    clearToast();

    try {
      const resposta = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resposta.ok) {
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
        showSuccess('Usuário removido com sucesso.');
      } else {
        const dadosErro = await resposta.json();
        showError(dadosErro.message || 'Não foi possível remover usuário.');
      }
    } catch {
      showError('Erro ao conectar com o servidor.');
    } finally {
      setLoadingUserId('');
    }
  };

  const handleDeleteCurso = async (id) => {
    if (!window.confirm('Deseja remover este curso?')) return;

    setLoadingCourseId(id);
    clearToast();

    try {
      const resposta = await fetch(`http://localhost:3000/api/courses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resposta.ok) {
        setCursos((prev) => prev.filter((c) => c.id !== id));
        showSuccess('Curso removido com sucesso.');
      } else {
        const dadosErro = await resposta.json();
        showError(dadosErro.message || 'Não foi possível remover curso.');
      }
    } catch {
      showError('Erro ao conectar com o servidor.');
    } finally {
      setLoadingCourseId('');
    }
  };

  const handleTogglePublicacao = async (curso) => {
    setLoadingCourseId(curso.id);
    clearToast();

    try {
      const resposta = await fetch(`http://localhost:3000/api/courses/${curso.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isPublished: !curso.isPublished,
        }),
      });

      if (resposta.ok) {
        const atualizado = await resposta.json();
        setCursos((prev) => prev.map((item) => (item.id === atualizado.id ? atualizado : item)));
        showSuccess(`Curso ${atualizado.isPublished ? 'publicado' : 'despublicado'} com sucesso.`);
      } else {
        const dadosErro = await resposta.json();
        showError(dadosErro.message || 'Não foi possível atualizar o curso.');
      }
    } catch {
      showError('Erro ao conectar com o servidor.');
    } finally {
      setLoadingCourseId('');
    }
  };

  const primeiroNome = usuario.name.split(' ')[0];

  return (
    <div className="home-container">
      <nav className="navbar">
        <img src={logoCapacita} alt="Capacita+" className="nav-logo" />
        <div className="nav-links">
          <Link to="/">Início</Link>
          <Link to="/cursos">Meus Cursos</Link>
          <Link to="/mentor">Mentor +</Link>
          <Link to="/perfil">Meu Perfil</Link>
          <Link to="/admin" className="active">Admin</Link>
        </div>
        <div className="nav-user">
          <span className="user-greeting">Olá, {primeiroNome}!</span>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </nav>

      <main className="main-content">
        <Toast message={toast.message} type={toast.type} onClose={clearToast} />

        <section className="section-container">
          <h3 className="section-title">Painel Administrativo</h3>
          <p className="admin-description">Gerencie usuários e cursos da plataforma.</p>
        </section>

        <section className="section-container admin-panel-card">
          <div className="admin-header-row">
            <h4>Usuários</h4>
            <span>{usuarios.length} registros</span>
          </div>

          {carregando ? (
            <p>Carregando usuários...</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Perfil</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="btn-admin-danger"
                          disabled={loadingUserId === user.id || user.role === 'ADMIN'}
                          onClick={() => handleDeleteUsuario(user.id, user.role)}
                        >
                          {loadingUserId === user.id ? 'Removendo...' : 'Remover'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="section-container admin-panel-card">
          <div className="admin-header-row">
            <h4>Cursos</h4>
            <span>{cursos.length} registros</span>
          </div>

          {carregando ? (
            <p>Carregando cursos...</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Preço</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map((curso) => (
                    <tr key={curso.id}>
                      <td>{curso.title}</td>
                      <td>R$ {Number(curso.price).toFixed(2).replace('.', ',')}</td>
                      <td>{curso.isPublished ? 'Publicado' : 'Rascunho'}</td>
                      <td className="admin-action-group">
                        <button
                          className="btn-admin-secondary"
                          disabled={loadingCourseId === curso.id}
                          onClick={() => handleTogglePublicacao(curso)}
                        >
                          {loadingCourseId === curso.id ? 'Salvando...' : curso.isPublished ? 'Despublicar' : 'Publicar'}
                        </button>
                        <button
                          className="btn-admin-danger"
                          disabled={loadingCourseId === curso.id}
                          onClick={() => handleDeleteCurso(curso.id)}
                        >
                          {loadingCourseId === curso.id ? 'Removendo...' : 'Excluir'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;
