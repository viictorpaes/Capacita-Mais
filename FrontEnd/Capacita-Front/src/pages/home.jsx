import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import logoCapacita from '../assets/logo.png';

export function Home() {
  const navigate = useNavigate();

  // ############ TESTE ##############
  const usuarioLogado = {
    nomeCompleto: "Maria Silva Santos",
  };

  // Pega apenas a primeira palavra do nome
  const primeiroNome = usuarioLogado.nomeCompleto.split(' ')[0];
  // ############ TESTE ##############

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
          <button onClick={handleLogout} className="btn-logout">Log Out</button>
        </div>
      </nav>

      <main className="main-content">
        
        <section className="promo-banner">
          <div>
            <h2>Seja Premium e libere todos os conteúdos!</h2>
            <p>Acesse Mentorias exclusivas e certificados validados pelo MEC.</p>
          </div>
          <Link to="/premium" className="btn-premium">Conhecer Planos</Link>
        </section>

        <section className="section-container">
          <h3 className="section-title">Continue de onde parou</h3>
          <div className="cards-grid">
            
            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#ffb74d'}}></div>
              <div className="course-info">
                <h4>Comunicação Alternativa no TEA</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Módulo 2: Ferramentas Visuais</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#16a44f'}}></div>
              <div className="course-info">
                <h4>TDAH - Construindo um ambiente de aprendizado</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Atividades e exercícios</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#872b81'}}></div>
              <div className="course-info">
                <h4>Como Construir uma Sala de Aula Inclusiva?</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Módulo 3: Cores, paletas e tipografia</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '83%' }}></div>
                </div>
              </div>
            </div>

          </div>
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
          <div className="cards-grid">
            
            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#64b5f6'}}></div>
              <div className="course-info">
                <h4>Introdução ao TDAH em Sala de Aula</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Por: Dr. João Pedro</p>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#81c784'}}></div>
              <div className="course-info">
                <h4>Estratégias de Regulação Emocional</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Por: Psicóloga Ana Souza</p>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#e57373'}}></div>
              <div className="course-info">
                <h4>Adaptação de Material Didático</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Por: Prof. Carlos Dias</p>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#64b5f6'}}></div>
              <div className="course-info">
                <h4>Introdução ao TDAH em Sala de Aula</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Por: Dr. João Pedro</p>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#81c784'}}></div>
              <div className="course-info">
                <h4>Estratégias de Regulação Emocional</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Por: Psicóloga Ana Souza</p>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#e57373'}}></div>
              <div className="course-info">
                <h4>Adaptação de Material Didático</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Por: Prof. Carlos Dias</p>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#64b5f6'}}></div>
              <div className="course-info">
                <h4>Introdução ao TDAH em Sala de Aula</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Por: Dr. João Pedro</p>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image" style={{backgroundColor: '#81c784'}}></div>
              <div className="course-info">
                <h4>Estratégias de Regulação Emocional</h4>
                <p style={{fontSize: '14px', color: '#666'}}>Por: Psicóloga Ana Souza</p>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}