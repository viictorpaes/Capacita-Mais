import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Mentor.css';
import logoCapacita from '../assets/logo.png';

export function Mentor() {
  const navigate = useNavigate();
  const [usuario] = useState({ 
    name: localStorage.getItem('userName') || 'Aluno(a)' 
  });
  

  const [etapa, setEtapa] = useState('formulario'); 
  const [formulario, setFormulario] = useState({
    faixaEtaria: '',
    neurodivergencia: '',
    localAtuacao: '',
    formato: '',
    tempoDisponivel: ''
  });
  const [trilhaGerada, setTrilhaGerada] = useState([]);

  const primeiroNome = usuario.name.split(' ')[0];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const gerarTrilha = (e) => {
    e.preventDefault();
    setEtapa('carregando');

    // Simula o tempo de resposta e processamento de uma IA (3 segundos)
    setTimeout(() => {
      // Aqui você futuramente conectará com o backend/OpenAI/Gemini
      // Por enquanto, geramos um mock dinâmico com base no input
      const mockTrilha = [
        {
          id: 1,
          titulo: `Fundamentos: ${formulario.neurodivergencia || 'Neurodiversidade'}`,
          descricao: `Entenda as bases teóricas aplicadas para a faixa etária de ${formulario.faixaEtaria || 'seus alunos'}.`,
          tempo: formulario.tempoDisponivel === '15min' ? '2 aulas de 5min' : 'Módulo de 1h'
        },
        {
          id: 2,
          titulo: `Estratégias para ${formulario.localAtuacao || 'o seu contexto'}`,
          descricao: `Aplicações práticas e adaptações de materiais no formato de ${formulario.formato || 'conteúdo misto'}.`,
          tempo: formulario.tempoDisponivel === '15min' ? '3 aulas de 5min' : 'Módulo de 2h'
        },
        {
          id: 3,
          titulo: 'Ferramentas de Avaliação Inclusiva',
          descricao: 'Como medir o progresso respeitando o tempo e as particularidades do aluno.',
          tempo: formulario.tempoDisponivel === '15min' ? '1 aula de 10min' : 'Módulo de 45min'
        }
      ];
      
      setTrilhaGerada(mockTrilha);
      setEtapa('resultado');
    }, 3000);
  };

  return (
    <div className="home-container">
      {/* Navbar mantida igual à Home para consistência */}
      <nav className="navbar">
        <img src={logoCapacita} alt="Capacita+" className="nav-logo" />
        <div className="nav-links">
          <Link to="/">Início</Link>
          <Link to="/cursos">Meus Cursos</Link>
          <Link to="/mentor" className="active">Mentor +</Link>
          <Link to="/perfil">Meu Perfil</Link>
        </div>
        <div className="nav-user">
          <span className="user-greeting">Olá, {primeiroNome}!</span>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="mentor-header">
          <h2>Mentor IA 🧠✨</h2>
          <p>Monte uma trilha de capacitação sob medida para a sua realidade em sala de aula.</p>
        </div>

        {etapa === 'formulario' && (
          <section className="mentor-card">
            <form onSubmit={gerarTrilha} className="mentor-form">
              <div className="form-group">
                <label>Faixa Etária dos Alunos</label>
                <select name="faixaEtaria" required value={formulario.faixaEtaria} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="Educação Infantil">Educação Infantil (0 a 5 anos)</option>
                  <option value="Ensino Fundamental I">Ensino Fundamental I (6 a 10 anos)</option>
                  <option value="Ensino Fundamental II">Ensino Fundamental II (11 a 14 anos)</option>
                  <option value="Ensino Médio">Ensino Médio</option>
                  <option value="EJA">EJA (Jovens e Adultos)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Foco Principal (Neurodivergência)</label>
                <select name="neurodivergencia" required value={formulario.neurodivergencia} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="TEA">Transtorno do Espectro Autista (TEA)</option>
                  <option value="TDAH">TDAH</option>
                  <option value="Dislexia">Dislexia</option>
                  <option value="Altas Habilidades">Altas Habilidades / Superdotação</option>
                  <option value="Visão Geral">Múltiplos / Visão Geral</option>
                </select>
              </div>

              <div className="form-group">
                <label>Local de Atuação</label>
                <select name="localAtuacao" required value={formulario.localAtuacao} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="Sala de Aula Regular">Sala de Aula Regular</option>
                  <option value="Sala de Recursos (AEE)">Sala de Recursos (AEE)</option>
                  <option value="Clínica / Atendimento Particular">Clínica / Particular</option>
                  <option value="Gestão Escolar">Gestão Escolar</option>
                </select>
              </div>

              <div className="form-group">
                <label>Formato Preferido</label>
                <select name="formato" required value={formulario.formato} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="Vídeos curtos">Vídeos curtos</option>
                  <option value="Artigos e Textos">Artigos e Textos em PDF</option>
                  <option value="Podcasts/Áudio">Podcasts / Áudio</option>
                  <option value="Misto">Misto (Um pouco de tudo)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tempo Disponível para Estudo</label>
                <select name="tempoDisponivel" required value={formulario.tempoDisponivel} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="15min">15 a 30 min por dia</option>
                  <option value="1h_semana">1 a 2 horas por semana</option>
                  <option value="Finais de semana">Apenas finais de semana</option>
                </select>
              </div>

              <button type="submit" className="btn-gerar-ia">
                Gerar Trilha com IA
              </button>
            </form>
          </section>
        )}

        {etapa === 'carregando' && (
          <div className="loading-ia">
            <div className="brain-spinner">🧠</div>
            <h3>A IA está analisando seu perfil...</h3>
            <p>Cruzando dados de pedagogia inclusiva com seu contexto de {formulario.localAtuacao.toLowerCase()}.</p>
          </div>
        )}

        {etapa === 'resultado' && (
          <section className="resultado-ia">
            <div className="resultado-header">
              <h3>Sua Trilha Personalizada está pronta!</h3>
              <button className="btn-refazer" onClick={() => setEtapa('formulario')}>Nova Análise</button>
            </div>
            
            <div className="timeline">
              {trilhaGerada.map((item, index) => (
                <div className="timeline-item" key={item.id}>
                  <div className="timeline-badge">{index + 1}</div>
                  <div className="timeline-content">
                    <h4>{item.titulo}</h4>
                    <p>{item.descricao}</p>
                    <span className="badge-tempo">⏱ {item.tempo}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="call-to-action-trilha">
              <button className="btn-iniciar-trilha">Começar Primeiro Módulo</button>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default Mentor;