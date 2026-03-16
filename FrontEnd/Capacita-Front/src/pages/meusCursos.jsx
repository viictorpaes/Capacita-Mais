import './meusCursos.css';
import semCursoImg from '../assets/semcurso.jpeg'; 

// 1. Definimos um valor padrão [] para courses para evitar erros se estiver vazio
function MeusCursos({ onNavigate, courses = [] }) {

  return (
    <div className="meus-cursos-container">
      
      {/* 💻 HEADER DESKTOP (Mantendo seu padrão) */}
      <header className="desktop-header">
        <div className="desktop-logo">Capacita<span>+</span></div>
        <nav className="desktop-nav">
          <button onClick={onNavigate}>Início</button> 
          <button className="active">Meus Cursos</button>
          <button>Mentor+</button>
          <button>Meu Perfil</button>
        </nav>
        <div className="desktop-user">
          <button className="search-btn">🔍</button>
          <div className="user-avatar">👤</div>
        </div>
      </header>

      {/* 📱 HEADER MOBILE */}
      <header className="mobile-header">
        <h2>Meus Cursos</h2>
        <button className="search-btn">🔍</button>
      </header>

      <main className="main-content">
        {/* 2. Usamos a lista 'courses' que vem do App.jsx */}
        {courses.length === 0 ? (
          <div className="sem-cursos">
            <img src={semCursoImg} alt="Sem Cursos" />
            <p className="sem-cursos-title">Sem Cursos</p>
            <p className="sem-cursos-description">Você ainda não selecionou nenhum curso.</p>
            <button className="btn-explorar" onClick={onNavigate}>Explorar cursos</button>
          </div>
        ) : (
          <div className="cursos-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card-premium">
                <div className="card-top">
                  {/* Adicionei a imagem do curso no card para ficar completo */}
                  <img src={course.image} alt={course.title} className="card-mini-img" />
                  
                  <div className="card-info">
                    <h4>{course.title}</h4>
                    <p className="card-desc">{course.desc}</p>
                    <p className="card-time">🕒 {course.duration} restantes</p>
                  </div>

                  <div className="card-progress-circle">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <text x="18" y="20.35" className="percentage">60%</text>
                    </svg>
                  </div>
                </div>
                <div className="card-divider"></div>
                <button className="btn-continuar-premium">Continuar</button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 📱 MENU INFERIOR MOBILE (Ajustado para bater com o CSS do Home) */}
      <nav className="mobile-bottom-nav">
        <button className="nav-btn" onClick={onNavigate}>
          <span className="icon">🏠</span><span>Início</span>
        </button>
        <button className="nav-btn active">
          <span className="icon">▶️</span><span>Meus Cursos</span>
        </button>
        <button className="nav-btn"><span className="icon">📖</span><span>Mentor+</span></button>
        <button className="nav-btn"><span className="icon">👤</span><span>Meu Perfil</span></button>
      </nav>

    </div>
  );
}

export default MeusCursos;