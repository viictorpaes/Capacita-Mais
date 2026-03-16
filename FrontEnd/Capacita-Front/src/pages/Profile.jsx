import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import logoCapacita from '../assets/logo.png';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

export function Profile() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    name: localStorage.getItem('userName') || 'Aluno',
  });
  const [cursosMatriculados, setCursosMatriculados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const { toast, showSuccess, showError, clearToast } = useToast();

  const [formDados, setFormDados] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          
          const tokenParts = token.split('.');
          const payloadBase64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
          const payloadDecodificado = JSON.parse(window.atob(payloadBase64));
          const userId = payloadDecodificado.sub;

          
          const respostaUsuario = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (respostaUsuario.ok) {
            const dadosUsuario = await respostaUsuario.json();

            setUsuario(dadosUsuario);
            setCursosMatriculados(dadosUsuario.enrollments || []);

         
            setFormDados({
              nome: dadosUsuario.name || '',
              email: dadosUsuario.email || '',
              senha: '',
              confirmarSenha: '',
            });
          } else {
            console.error('Erro ao buscar dados do usuário.');
          }
        }

      } catch (erro) {
        console.error('Erro fatal ao conectar com o back-end:', erro);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDados((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvarPerfil = async (evento) => {
    evento.preventDefault();
    clearToast();

    if (formDados.senha && formDados.senha !== formDados.confirmarSenha) {
      showError('As senhas não coincidem.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      // Decodifica o JWT para pegar o userId — mesmo padrão do home.jsx
      const tokenParts = token.split('.');
      const payloadBase64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payloadDecodificado = JSON.parse(window.atob(payloadBase64));
      const userId = payloadDecodificado.sub;

      const payload = {
        name: formDados.nome,
        email: formDados.email,
      };
      if (formDados.senha) payload.password = formDados.senha;

      // Atualiza o usuário: PUT /api/users/:id — mesmo padrão do Register.jsx
      const resposta = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (resposta.ok) {
        const dadosAtualizados = await resposta.json();

       
        localStorage.setItem('userName', dadosAtualizados.name);

        setUsuario(dadosAtualizados);
        showSuccess('Perfil atualizado com sucesso!');
        setModoEdicao(false);
        setFormDados((prev) => ({ ...prev, senha: '', confirmarSenha: '' }));
      } else {
        const dadosErro = await resposta.json();
        showError(dadosErro.message || 'Erro ao salvar alterações.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      showError('Erro ao conectar com o servidor.');
    }
  };

  const handleCancelarEdicao = () => {
    setModoEdicao(false);
    clearToast();
    setFormDados({
      nome: usuario.name || '',
      email: usuario.email || '',
      senha: '',
      confirmarSenha: '',
    });
  };

  
  const getIniciais = (nome) => {
    if (!nome) return '?';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return '—';
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const primeiroNome = usuario.name?.split(' ')[0] ?? 'Aluno';


  return (
    <div className="home-container">
      {/* NAVBAR — idêntica ao home.jsx */}
      <nav className="navbar">
        <img src={logoCapacita} alt="Capacita+" className="nav-logo" />
        <div className="nav-links">
          <Link to="/">Início</Link>
          <Link to="/cursos">Meus Cursos</Link>
          <Link to="/mentor">Mentor +</Link>
          <Link to="/perfil" className="active">Meu Perfil</Link>
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

        {carregando ? (
          <p style={{ color: '#666', marginTop: '40px' }}>Carregando perfil...</p>
        ) : (
          <>
    
            <section className="profile-header-card">
              <div className="profile-avatar">
                <div className="avatar-initials">{getIniciais(usuario.name)}</div>
              </div>
              <div className="profile-header-info">
                <h2 className="profile-name">{usuario.name}</h2>
                <p className="profile-role">{usuario.role || 'Estudante'}</p>
                <p className="profile-since">Membro desde {formatarData(usuario.createdAt)}</p>
              </div>
              <div className="profile-plan-badge">
                <span className={`plan-tag ${usuario.isPremium ? 'plan-premium' : 'plan-free'}`}>
                  {usuario.isPremium ? '⭐ Premium' : '🔓 Plano Gratuito'}
                </span>
                {!usuario.isPremium && (
                  <Link to="/premium" className="btn-upgrade">Fazer Upgrade</Link>
                )}
              </div>
            </section>

          
            <section className="section-container">
              <h3 className="section-title">Minha Jornada</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-number">{cursosMatriculados.length}</span>
                  <span className="stat-label">Cursos Iniciados</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">
                    {cursosMatriculados.filter((m) => m.progress === 100).length}
                  </span>
                  <span className="stat-label">Cursos Concluídos</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Certificados</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Horas Assistidas</span>
                </div>
              </div>
            </section>

         
            <section className="section-container">
              <h3 className="section-title">Cursos em Andamento</h3>
              {cursosMatriculados.length > 0 ? (
                <div className="cards-grid">
                  {cursosMatriculados.map((matricula) => (
                    <div className="course-card" key={matricula.id}>
                      <div className="course-image" />
                      <div className="course-info">
                        <h4>{matricula.course.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                          <span style={{ fontSize: '13px', color: '#888' }}>Progresso</span>
                         
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#00796b' }}>50%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: '50%' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#666' }}>Você ainda não está matriculado em nenhum curso.</p>
              )}
            </section>

      
            <section className="section-container">
              <div className="profile-form-header">
                <h3 className="section-title" style={{ marginBottom: 0 }}>Dados da Conta</h3>
                {!modoEdicao && (
                  <button className="btn-edit" onClick={() => setModoEdicao(true)}>
                    ✏️ Editar Perfil
                  </button>
                )}
              </div>

              {modoEdicao ? (
                <form className="profile-form" onSubmit={handleSalvarPerfil}>
                  <div className="profile-form-grid">
                    <div className="input-group">
                      <label htmlFor="nome">Nome Completo</label>
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={formDados.nome}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formDados.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="senha">
                        Nova Senha{' '}
                        <span style={{ fontWeight: 'normal', color: '#888' }}>(deixe em branco para manter)</span>
                      </label>
                      <input
                        id="senha"
                        name="senha"
                        type="password"
                        value={formDados.senha}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                      <input
                        id="confirmarSenha"
                        name="confirmarSenha"
                        type="password"
                        value={formDados.confirmarSenha}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-salvar">Salvar Alterações</button>
                    <button type="button" className="btn-cancelar" onClick={handleCancelarEdicao}>
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info-display">
                  <div className="info-row">
                    <span className="info-label">Nome</span>
                    <span className="info-value">{usuario.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{usuario.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Plano</span>
                    <span className="info-value">{usuario.isPremium ? 'Premium' : 'Gratuito'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Membro desde</span>
                    <span className="info-value">{formatarData(usuario.createdAt)}</span>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;