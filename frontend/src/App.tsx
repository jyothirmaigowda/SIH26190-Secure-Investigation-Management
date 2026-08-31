import { useState } from 'react'
import { useMockAuth } from './hooks/useMockAuth'
import AppShell from './layouts/AppShell'
import LoginPage from './pages/auth/LoginPage'
import type { AppSection } from './types/navigation'

function App() {
  const { isAuthenticated, login, logout, user } = useMockAuth()
  const [currentSection, setCurrentSection] = useState<AppSection>('dashboard')

  function handleLogout() {
    setCurrentSection('dashboard')
    logout()
  }

  if (!isAuthenticated || !user) {
    return <LoginPage onLogin={login} />
  }

  return (
    <AppShell
      currentSection={currentSection}
      demoUser={user}
      onLogout={handleLogout}
      onSectionChange={setCurrentSection}
    />
  )
}

export default App
