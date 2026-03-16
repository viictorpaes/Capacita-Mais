import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import './Admin.css';
import logoCapacita from '../assets/logo.png';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

const FORM_USUARIO_VAZIO = { name: '', email: '', password: '', role: 'STUDENT' };
const FORM_CURSO_VAZIO = { title: '', description: '', price: '', isPublished: false };
const FORM_MATRICULA_VAZIO = { userId: '', courseId: '' };

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

  // formulário criar usuário
  const [mostrarFormUsuario, setMostrarFormUsuario] = useState(false);
  const [formUsuario, setFormUsuario] = useState(FORM_USUARIO_VAZIO);
  const [salvandoUsuario, setSalvandoUsuario] = useState(false);

  // formulário criar curso
  const [mostrarFormCurso, setMostrarFormCurso] = useState(false);
  const [formCurso, setFormCurso] = useState(FORM_CURSO_VAZIO);
  const [salvandoCurso, setSalvandoCurso] = useState(false);

  // formulário matrícula
  const [mostrarFormMatricula, setMostrarFormMatricula] = useState(false);
  const [formMatricula, setFormMatricula] = useState(FORM_MATRICULA_VAZIO);
  const [salvandoMatricula, setSalvandoMatricula] = useState(false);

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

  const handleCreateUsuario = async (e) => {
    e.preventDefault();
    if (!formUsuario.name.trim() || !formUsuario.email.trim() || !formUsuario.password.trim()) {
      showError('Preencha todos os campos obrigatórios.');
      return;
    }
    setSalvandoUsuario(true);
    clearToast();
    try {
      const resposta = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formUsuario),
      });
      if (resposta.ok) {
        const novoUsuario = await resposta.json();
        setUsuarios((prev) => [novoUsuario, ...prev]);
        setFormUsuario(FORM_USUARIO_VAZIO);
        setMostrarFormUsuario(false);
        showSuccess('Usuário criado com sucesso.');
      } else {
        const dadosErro = await resposta.json();
        showError(dadosErro.message || 'Não foi possível criar usuário.');
      }
    } catch {
      showError('Erro ao conectar com o servidor.');
    } finally {
      setSalvandoUsuario(false);
    }
  };

  const handleCreateCurso = async (e) => {
    e.preventDefault();
    if (!formCurso.title.trim() || formCurso.price === '') {
      showError('Título e preço são obrigatórios.');
      return;
    }
    setSalvandoCurso(true);
    clearToast();
    try {
      const resposta = await fetch('http://localhost:3000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formCurso, price: Number(formCurso.price) }),
      });
      if (resposta.ok) {
        const novoCurso = await resposta.json();
        setCursos((prev) => [novoCurso, ...prev]);
        setFormCurso(FORM_CURSO_VAZIO);
        setMostrarFormCurso(false);
        showSuccess('Curso criado com sucesso.');
      } else {
        const dadosErro = await resposta.json();
        showError(dadosErro.message || 'Não foi possível criar curso.');
      }
    } catch {
      showError('Erro ao conectar com o servidor.');
    } finally {
      setSalvandoCurso(false);
    }
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    if (!formMatricula.userId || !formMatricula.courseId) {
      showError('Selecione um aluno e um curso.');
      return;
    }
    setSalvandoMatricula(true);
    clearToast();
    try {
      const resposta = await fetch('http://localhost:3000/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formMatricula),
      });
      if (resposta.ok) {
        setFormMatricula(FORM_MATRICULA_VAZIO);
        setMostrarFormMatricula(false);
        showSuccess('Aluno matriculado com sucesso.');
      } else if (resposta.status === 409) {
        showError('Aluno já está matriculado neste curso.');
      } else {
        const dadosErro = await resposta.json();
        showError(dadosErro.message || 'Não foi possível realizar a matrícula.');
      }
    } catch {
      showError('Erro ao conectar com o servidor.');
    } finally {
      setSalvandoMatricula(false);
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
            <div className="admin-header-actions">
              <span>{usuarios.length} registros</span>
              <button
                className="btn-admin-primary"
                onClick={() => { setMostrarFormUsuario((v) => !v); setFormUsuario(FORM_USUARIO_VAZIO); }}
              >
                {mostrarFormUsuario ? 'Cancelar' : '+ Novo usuário'}
              </button>
            </div>
          </div>

          {mostrarFormUsuario && (
            <form className="admin-form" onSubmit={handleCreateUsuario}>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Nome *</label>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={formUsuario.name}
                    onChange={(e) => setFormUsuario((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="admin-form-group">
                  <label>E-mail *</label>
                  <input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formUsuario.email}
                    onChange={(e) => setFormUsuario((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Senha *</label>
                  <input
                    type="password"
                    placeholder="Senha de acesso"
                    value={formUsuario.password}
                    onChange={(e) => setFormUsuario((f) => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Perfil</label>
                  <select
                    value={formUsuario.role}
                    onChange={(e) => setFormUsuario((f) => ({ ...f, role: e.target.value }))}
                  >
                    <option value="STUDENT">Aluno</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-admin-primary" disabled={salvandoUsuario}>
                {salvandoUsuario ? 'Salvando...' : 'Criar usuário'}
              </button>
            </form>
          )}

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
            <div className="admin-header-actions">
              <span>{cursos.length} registros</span>
              <button
                className="btn-admin-primary"
                onClick={() => { setMostrarFormCurso((v) => !v); setFormCurso(FORM_CURSO_VAZIO); }}
              >
                {mostrarFormCurso ? 'Cancelar' : '+ Novo curso'}
              </button>
            </div>
          </div>

          {mostrarFormCurso && (
            <form className="admin-form" onSubmit={handleCreateCurso}>
              <div className="admin-form-row">
                <div className="admin-form-group admin-form-group--wide">
                  <label>Título *</label>
                  <input
                    type="text"
                    placeholder="Título do curso"
                    value={formCurso.title}
                    onChange={(e) => setFormCurso((f) => ({ ...f, title: e.target.value }))}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Preço (R$) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0,00"
                    value={formCurso.price}
                    onChange={(e) => setFormCurso((f) => ({ ...f, price: e.target.value }))}
                  />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group admin-form-group--wide">
                  <label>Descrição</label>
                  <textarea
                    placeholder="Descrição do curso (opcional)"
                    rows={3}
                    value={formCurso.description}
                    onChange={(e) => setFormCurso((f) => ({ ...f, description: e.target.value }))}
                  />
                </div>
                <div className="admin-form-group admin-form-group--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={formCurso.isPublished}
                      onChange={(e) => setFormCurso((f) => ({ ...f, isPublished: e.target.checked }))}
                    />
                    Publicar imediatamente
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-admin-primary" disabled={salvandoCurso}>
                {salvandoCurso ? 'Salvando...' : 'Criar curso'}
              </button>
            </form>
          )}

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

        <section className="section-container admin-panel-card">
          <div className="admin-header-row">
            <h4>Matrículas</h4>
            <div className="admin-header-actions">
              <button
                className="btn-admin-primary"
                onClick={() => { setMostrarFormMatricula((v) => !v); setFormMatricula(FORM_MATRICULA_VAZIO); }}
              >
                {mostrarFormMatricula ? 'Cancelar' : '+ Matricular aluno'}
              </button>
            </div>
          </div>

          {mostrarFormMatricula && (
            <form className="admin-form" onSubmit={handleEnroll}>
              <div className="admin-form-row">
                <div className="admin-form-group admin-form-group--wide">
                  <label>Aluno *</label>
                  <select
                    value={formMatricula.userId}
                    onChange={(e) => setFormMatricula((f) => ({ ...f, userId: e.target.value }))}
                  >
                    <option value="">Selecione um aluno</option>
                    {usuarios
                      .filter((u) => u.role === 'STUDENT')
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} — {u.email}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="admin-form-group admin-form-group--wide">
                  <label>Curso *</label>
                  <select
                    value={formMatricula.courseId}
                    onChange={(e) => setFormMatricula((f) => ({ ...f, courseId: e.target.value }))}
                  >
                    <option value="">Selecione um curso</option>
                    {cursos.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} {c.isPublished ? '' : '(Rascunho)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-admin-primary" disabled={salvandoMatricula}>
                {salvandoMatricula ? 'Matriculando...' : 'Confirmar matrícula'}
              </button>
            </form>
          )}

          {!mostrarFormMatricula && (
            <p className="admin-description">
              Clique em "+ Matricular aluno" para vincular um aluno a um curso.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;
