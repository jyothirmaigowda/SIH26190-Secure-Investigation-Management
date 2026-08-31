import { useMockAuth } from './hooks/useMockAuth'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'

function App() {
  const { isAuthenticated, login, logout, user } = useMockAuth()

  if (!isAuthenticated || !user) {
    return <LoginPage onLogin={login} />
  }

  return <DashboardPage demoUser={user} onLogout={logout} />
}

export default App
