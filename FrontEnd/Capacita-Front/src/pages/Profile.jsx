import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import logoCapacita from '../assets/logo.png';

export function Profile() {
  const navigate = useNavigate();

  // =========================================================
  // ESTADOS DO COMPONENTE
  // =========================================================
  const [usuario, setUsuario] = useState(null);
  const [cursosMatriculados, setCursosMatriculados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Estado para o formulário de edição
  const [formDados, setFormDados] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  useEffect(() => {
    const buscarDados = async () => {
      try {
        // =========================================================
        // FUTURAMENTE: Buscar dados reais com token JWT
        // const token = localStorage.getItem('token');
        // const resposta = await fetch('http://localhost:3000/users/me', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const dadosUsuario = await resposta.json();
        // setUsuario(dadosUsuario);
        // =========================================================

        // B. DADOS MOCKADOS: Usuário e Matrículas (Até o JWT ficar pronto)
        const usuarioMockado = {
          id: 'usr-123',
          name: 'Maria Silva',
          email: 'maria.silva@email.com',
          role: 'Educadora Especial',
          plano: 'Gratuito',
          dataCadastro: '2024-03-10T00:00:00.000Z',
          avatar: null,
        };

        setUsuario(usuarioMockado);
        setFormDados({
          nome: usuarioMockado.name,
          email: usuarioMockado.email,
          senha: '',
          confirmarSenha: '',
        });

        setCursosMatriculados([
          {
            id: 'enr-1111',
            progresso: 50,
            course: {
              id: 'crs-aaaa-bbbb',
              title: 'Comunicação Alternativa no TEA',
              corCard: '#ffb74d',
            },
          },
          {
            id: 'enr-2222',
            progresso: 20,
            course: {
              id: 'crs-cccc-dddd',
              title: 'Estratégias para TDAH em Sala de Aula',
              corCard: '#928fc8',
            },
          },
        ]);
      } catch (erro) {
        console.error('Erro fatal ao conectar com o back-end:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  // =========================================================
  // HANDLERS
  // =========================================================
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDados((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvarPerfil = async (evento) => {
    evento.preventDefault();
    setErro('');
    setSucesso('');

    if (formDados.senha && formDados.senha !== formDados.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      // =========================================================
      // FUTURAMENTE: Enviar dados reais com token JWT
      // const token = localStorage.getItem('token');
      // const payload = { name: formDados.nome, email: formDados.email };
      // if (formDados.senha) payload.password = formDados.senha;
      // const resposta = await fetch(`http://localhost:3000/users/${usuario.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(payload),
      // });
      // const dados = await resposta.json();
      // if (!resposta.ok) { setErro(dados.message || 'Erro ao salvar.'); return; }
      // =========================================================

      // Simulação de sucesso enquanto a API não está integrada
      setUsuario((prev) => ({ ...prev, name: formDados.nome, email: formDados.email }));
      setSucesso('Perfil atualizado com sucesso!');
      setModoEdicao(false);

      console.log('Dados prontos para enviar para a API:', {
        name: formDados.nome,
        email: formDados.email,
        ...(formDados.senha && { password: formDados.senha }),
      });
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErro('Erro ao conectar com o servidor.');
    }
  };

  const handleCancelarEdicao = () => {
    setModoEdicao(false);
    setErro('');
    setSucesso('');
    if (usuario) {
      setFormDados({ nome: usuario.name, email: usuario.email, senha: '', confirmarSenha: '' });
    }
  };

  // =========================================================
  // FUNÇÕES UTILITÁRIAS
  // =========================================================
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

  const primeiroNome = usuario?.name?.split(' ')[0] ?? 'Usuário';

  // =========================================================
  // RENDER
  // =========================================================
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
          <span className="user-greeting">Olá, {primeiroNome}</span>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </nav>

      <main className="main-content">
        {carregando ? (
          <p style={{ color: '#666', marginTop: '40px' }}>Carregando perfil...</p>
        ) : (
          <>
            {/* ===== CABEÇALHO DO PERFIL ===== */}
            <section className="profile-header-card">
              <div className="profile-avatar">
                {usuario?.avatar ? (
                  <img src={usuario.avatar} alt="Foto de perfil" className="avatar-img" />
                ) : (
                  <div className="avatar-initials">{getIniciais(usuario?.name)}</div>
                )}
              </div>
              <div className="profile-header-info">
                <h2 className="profile-name">{usuario?.name}</h2>
                <p className="profile-role">{usuario?.role}</p>
                <p className="profile-since">Membro desde {formatarData(usuario?.dataCadastro)}</p>
              </div>
              <div className="profile-plan-badge">
                <span className={`plan-tag ${usuario?.plano === 'Premium' ? 'plan-premium' : 'plan-free'}`}>
                  {usuario?.plano === 'Premium' ? '⭐ Premium' : '🔓 Plano Gratuito'}
                </span>
                {usuario?.plano !== 'Premium' && (
                  <Link to="/premium" className="btn-upgrade">Fazer Upgrade</Link>
                )}
              </div>
            </section>

            {/* ===== ESTATÍSTICAS ===== */}
            <section className="section-container">
              <h3 className="section-title">Minha Jornada</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-number">{cursosMatriculados.length}</span>
                  <span className="stat-label">Cursos Iniciados</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">
                    {cursosMatriculados.filter((m) => m.progresso === 100).length}
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

            {/* ===== CURSOS EM ANDAMENTO ===== */}
            <section className="section-container">
              <h3 className="section-title">Cursos em Andamento</h3>
              {cursosMatriculados.length > 0 ? (
                <div className="cards-grid">
                  {cursosMatriculados.map((matricula) => (
                    <div className="course-card" key={matricula.id}>
                      <div className="course-image" style={{ backgroundColor: matricula.course.corCard }} />
                      <div className="course-info">
                        <h4>{matricula.course.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                          <span style={{ fontSize: '13px', color: '#888' }}>Progresso</span>
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#00796b' }}>
                            {matricula.progresso}%
                          </span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${matricula.progresso}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#666' }}>Você ainda não está matriculado em nenhum curso.</p>
              )}
            </section>

            {/* ===== DADOS DA CONTA ===== */}
            <section className="section-container">
              <div className="profile-form-header">
                <h3 className="section-title" style={{ marginBottom: 0 }}>Dados da Conta</h3>
                {!modoEdicao && (
                  <button className="btn-edit" onClick={() => setModoEdicao(true)}>
                    ✏️ Editar Perfil
                  </button>
                )}
              </div>

              {sucesso && (
                <p className="feedback-sucesso">{sucesso}</p>
              )}

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
                      <label htmlFor="senha">Nova Senha <span style={{ fontWeight: 'normal', color: '#888' }}>(deixe em branco para manter)</span></label>
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

                  {erro && <p className="feedback-erro">{erro}</p>}

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
                    <span className="info-value">{usuario?.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{usuario?.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Plano</span>
                    <span className="info-value">{usuario?.plano}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Membro desde</span>
                    <span className="info-value">{formatarData(usuario?.dataCadastro)}</span>
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