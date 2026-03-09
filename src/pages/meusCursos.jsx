import './MeusCursos.css';

function MeusCursos() {
  const cursos = [
    {
      titulo: 'TEA Nível 1',
      descricao: 'O curso ensina cuidados essenciais para crianças com autismo, incluindo rotinas de higiene, alimentação, estratégias...',
      progresso: 40,
      horasRestantes: 4,
    },
    {
      titulo: 'Síndrome de Tourette',
      descricao: 'Curso que apresenta os fundamentos da Síndrome de Tourette, orienta sobre manejo adequado dos tiques e práticas de suporte...',
      progresso: 60,
      horasRestantes: 2,
    },
  ];

  return (
    <div className="meus-cursos-container">
      {/* Desktop Header */}
      <header className="desktop-header">
        <div className="desktop-logo">Capacita<span>+</span></div>
        <nav className="desktop-nav">
          <button onClick={() => window.location.href = '/home'}>Início</button>
          <button className="active">Meus Cursos</button>
          <button>Mentor+</button>
          <button>Meu Perfil</button>
        </nav>
        <div className="desktop-user">
          <button className="search-btn">🔍</button>
          <div className="user-avatar">👤</div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="mobile-header">
        <h2>Meus Cursos</h2>
        <button className="search-btn">🔍</button>
      </header>

      <main className="main-content">
        {cursos.length === 0 ? (
          <div className="sem-cursos">
            <img src="/path/to/empty-courses-image.png" alt="Sem Cursos" />
            <p className="sem-cursos-title">Sem Cursos</p>
            <p className="sem-cursos-description">Parece que você ainda não se matriculou em nenhum curso.</p>
            <button className="btn-explorar">Explorar cursos</button>
          </div>
        ) : (
          <div className="cursos-lista">
            {cursos.map((curso, index) => (
              <div key={index} className="curso-card">
                <div className="curso-info">
                  <h4>{curso.titulo}</h4>
                  <p>{curso.descricao}</p>
                  <p>{curso.horasRestantes} horas para concluir</p>
                </div>
                <div className="curso-progresso">
                  <div className="progresso-barra">
                    <div
                      className="progresso-preenchido"
                      style={{ width: `${curso.progresso}%` }}
                    ></div>
                  </div>
                  <span className="progresso-text">{curso.progresso}%</span>
                </div>
                <button className="btn-continuar">Continuar</button>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="mobile-footer">
        <button onClick={() => window.location.href = '/home'}>Início</button>
        <button className="active">Meus Cursos</button>
        <button>Mentor+</button>
        <button>Meu Perfil</button>
      </footer>
    </div>
  );
}

export default MeusCursos;