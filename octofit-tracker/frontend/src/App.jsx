import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  ['Resumen', '#summary'],
  ['Actividad', '#activity'],
  ['Equipos', '#teams'],
  ['Clasificación', '#leaderboard'],
  ['Entrenamientos', '#workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#summary" aria-label="OctoFit Tracker, resumen">
          <img src={octofitLogo} alt="" />
          <span>OCTOFIT<span className="brand-subtitle">TRACKER</span></span>
        </a>
        <p className="nav-label">ESPACIO PERSONAL</p>
        <nav aria-label="Navegación principal">
          {navigation.map(([label, href], index) => (
            <a className={index === 0 ? 'nav-link active' : 'nav-link'} href={href} key={href}>
              <span className="nav-marker" aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="connection-dot" />
          <span>OctoFit · vista previa</span>
        </div>
      </aside>

      <main className="main-content" id="summary">
        <header className="topbar">
          <span className="topbar-section">PANEL DE CONTROL</span>
          <span className="setup-status"><span /> Configuración inicial</span>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">OCTOFIT TRACKER</p>
              <h1>Tu movimiento,<br /><span>a tu ritmo.</span></h1>
              <p className="welcome-copy">Tu espacio para actividad, equipos y progreso.</p>
            </div>
            <a className="primary-action" href="#activity">Registrar actividad <span aria-hidden="true">↗</span></a>
          </section>

          <section className="metric-grid" aria-label="Resumen de actividad">
            <article className="metric-panel metric-highlight">
              <div className="metric-topline"><span>ACTIVIDAD</span><span className="metric-accent">01</span></div>
              <p className="metric-value">—</p>
              <p className="metric-caption">minutos registrados hoy</p>
            </article>
            <article className="metric-panel">
              <div className="metric-topline"><span>CONSTANCIA</span><span className="metric-accent coral">02</span></div>
              <p className="metric-value">—</p>
              <p className="metric-caption">días de actividad</p>
            </article>
            <article className="metric-panel">
              <div className="metric-topline"><span>EQUIPO</span><span className="metric-accent blue">03</span></div>
              <p className="metric-value metric-empty">Sin equipo</p>
              <p className="metric-caption">aún no te has unido a uno</p>
            </article>
          </section>

          <div className="section-heading">
            <div>
              <p className="eyebrow">TU ESPACIO</p>
              <h2>Empieza por aquí</h2>
            </div>
            <span className="section-note">Aún no hay datos registrados</span>
          </div>

          <section className="feature-grid">
            <article className="feature-panel activity-panel" id="activity">
              <div className="feature-heading"><span className="feature-index">01 / ACTIVIDAD</span><span className="feature-dot lime" /></div>
              <h3>Actividad reciente</h3>
              <p>Cuando registres una sesión, aparecerá aquí.</p>
              <a href="#summary">Volver al resumen <span aria-hidden="true">↗</span></a>
            </article>
            <article className="feature-panel team-panel" id="teams">
              <div className="feature-heading"><span className="feature-index">02 / COMUNIDAD</span><span className="feature-dot coral-bg" /></div>
              <h3>Entrena en equipo</h3>
              <p>Los equipos y la clasificación estarán aquí.</p>
              <a href="#leaderboard">Ver clasificación <span aria-hidden="true">↗</span></a>
            </article>
            <article className="feature-panel workout-panel" id="workouts">
              <div className="feature-heading"><span className="feature-index">03 / ENTRENAMIENTO</span><span className="feature-dot blue-bg" /></div>
              <h3>Tu próxima sesión</h3>
              <p>Las sugerencias de entrenamiento aparecerán aquí.</p>
              <a href="#activity">Explorar actividad <span aria-hidden="true">↗</span></a>
            </article>
          </section>
          <span className="anchor-target" id="leaderboard" />
        </div>
      </main>
    </div>
  )
}

export default App
