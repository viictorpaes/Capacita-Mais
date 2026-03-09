import { useState, useEffect } from 'react';
import './Home.css';
import MeusCursos from './meusCursos';

function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (isLoading) {
    return (
      <div className="preloader-container">
        <img src="/path/to/logo.png" alt="Carregando..." className="preloader-logo" />
      </div>
    );
  }

  if (isLoggedIn) {
    return <MeusCursos />;
  }

  return (
    <div className="home-container">
      
      {/* 💻 HEADER EXCLUSIVO PARA DESKTOP (Substitui o menu inferior) */}
      <header className="desktop-header">
        <div className="desktop-logo">Capacita<span>+</span></div>
        <nav className="desktop-nav">
          <button className="active">Início</button>
          <button className='botoes' onClick={handleLogin}>Meus Cursos</button>
          <button>Mentor+</button>
          <button>Meu Perfil</button>
        </nav>
        <div className="desktop-user">
          <button className="search-btn">🔍</button>
          <div className="user-avatar">👤</div>
        </div>
      </header>

      {/* 📱 HEADER EXCLUSIVO PARA MOBILE (Igual ao protótipo) */}
      <header className="mobile-header">
        <h2>Olá Sarah</h2>
        <button className="search-btn">🔍</button>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        
        {/* BANNER PLANO PREMIUM */}
        <section className="banner">
          <div className="banner-info">
            <h3>Plano Premium</h3>
            <p>Desbloqueie ferramentas para maior produtividade</p>
            <button className="btn-conheca">Conheça agora</button>
          </div>
          <div className="banner-illustration">☁️🛡️</div>
          <div className="banner-dots">
            <span className="dot active"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="section">
          <h3 className="section-title">Categorias</h3>
          <div className="cards-wrapper">
            <div className="card category-card">
              <div className="cat-info">
                <h4>TEA</h4><p>5 Cursos</p>
              </div>
              <div className="cat-icon">🧩</div>
            </div>
            <div className="card category-card">
              <div className="cat-info">
                <h4>TDAH</h4><p>15 Cursos</p>
              </div>
              <div className="cat-icon">🧠</div>
            </div>
            <div className="card category-card">
              <div className="cat-info">
                <h4>Dislexia</h4><p>13 Cursos</p>
              </div>
              <div className="cat-icon">📚</div>
            </div>
          </div>
        </section>

        {/* CURSOS MAIS PROCURADOS */}
        <section className="section">
          <h3 className="section-title">Cursos Mais Procurados</h3>
          <div className="cards-wrapper">
            <div className="card course-card">
              <div className="course-img">🎀</div>
              <div className="course-info">
                <h4>TEA Nível 1</h4>
                <p>4.5 ★ <span className="students">10.5k Estudantes</span></p>
              </div>
            </div>
            <div className="card course-card">
              <div className="course-img">🎀</div>
              <div className="course-info">
                <h4>TEA Nível 2</h4>
                <p>4.5 ★ <span className="students">10.5k Estudantes</span></p>
              </div>
            </div>
            <div className="card course-card">
              <div className="course-img">🧩</div>
              <div className="course-info">
                <h4>Inclusão Escolar</h4>
                <p>4.8 ★ <span className="students">8.2k Estudantes</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* FERRAMENTAS MAIS UTILIZADAS */}
        <section className="section">
          <h3 className="section-title">Ferramentas Mais Utilizadas</h3>
          <div className="cards-wrapper">
            <div className="card tool-card">
              <div className="tool-icon">📋</div>
              <div className="tool-info">
                <h4>SENSORISCAN</h4>
                <p>Ferramenta prática para avaliar...</p>
              </div>
            </div>
            <div className="card tool-card">
              <div className="tool-icon">💬</div>
              <div className="tool-info">
                <h4>COMUNICAVISUAL</h4>
                <p>Edição de rotinas visuais...</p>
              </div>
            </div>
            <div className="card tool-card">
              <div className="tool-icon">📅</div>
              <div className="tool-info">
                <h4>ROTINAPLUS</h4>
                <p>Organização de horários...</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 📱 MENU INFERIOR EXCLUSIVO PARA MOBILE (Igual ao protótipo) */}
      <nav className="mobile-bottom-nav">
        <button className="nav-btn active"><span className="icon">🏠</span><span>Início</span></button>
        <button className="nav-btn"><span className="icon">▶️</span><span>Meus Cursos</span></button>
        <button className="nav-btn"><span className="icon">📖</span><span>Mentor+</span></button>
        <button className="nav-btn"><span className="icon">👤</span><span>Meu Perfil</span></button>
      </nav>

    </div>
  );
}

export default Home;