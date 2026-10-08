import { NavLink, Outlet, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Resumen', to: '/', end: true },
  { label: 'Actividad', to: '/activities' },
  { label: 'Equipos', to: '/teams' },
  { label: 'Clasificación', to: '/leaderboard' },
  { label: 'Usuarios', to: '/users' },
  { label: 'Entrenamientos', to: '/workouts' },
]

function Dashboard() {
  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1>Tu movimiento,<br /><span>a tu ritmo.</span></h1>
          <p className="welcome-copy">Tu espacio para actividad, equipos y progreso.</p>
        </div>
        <NavLink className="primary-action" to="/activities">
          Ver actividad <span aria-hidden="true">↗</span>
        </NavLink>
      </section>

      <section className="metric-grid" aria-label="Recursos de OctoFit">
        {[
          ['ACTIVIDAD', '/activities', 'Sesiones y progreso'],
          ['COMUNIDAD', '/teams', 'Equipos y clasificación'],
          ['ENTRENAMIENTO', '/workouts', 'Ideas para tu próxima sesión'],
        ].map(([label, to, description], index) => (
          <article className="metric-panel" key={to}>
            <div className="metric-topline">
              <span>{label}</span>
              <span className="metric-accent">0{index + 1}</span>
            </div>
            <p className="metric-caption">{description}</p>
            <NavLink className="dashboard-link" to={to}>Explorar <span aria-hidden="true">↗</span></NavLink>
          </article>
        ))}
      </section>
    </>
  )
}

function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="OctoFit Tracker, resumen">
          <img src={octofitLogo} alt="" />
          <span>OCTOFIT<span className="brand-subtitle">TRACKER</span></span>
        </NavLink>
        <p className="nav-label">ESPACIO PERSONAL</p>
        <nav aria-label="Navegación principal">
          {navigation.map(({ label, to, end }) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={end}
              key={to}
              to={to}
            >
              <span className="nav-marker" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="connection-dot" />
          <span>OctoFit · conectado</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span className="topbar-section">PANEL DE CONTROL</span>
          <span className="setup-status"><span /> Datos de la aplicación</span>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<Dashboard />} index />
        <Route element={<Activities />} path="activities" />
        <Route element={<Leaderboard />} path="leaderboard" />
        <Route element={<Teams />} path="teams" />
        <Route element={<Users />} path="users" />
        <Route element={<Workouts />} path="workouts" />
        <Route element={<Dashboard />} path="*" />
      </Route>
    </Routes>
  )
}

export default App
