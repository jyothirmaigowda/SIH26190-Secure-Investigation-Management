import { useState } from 'react'
import type { DemoUser, LoginCredentials } from '../types/auth'

const demoRoleLabel = 'Investigation Officer'

function createDemoUser(credentials: LoginCredentials): DemoUser {
  return {
    displayName: 'Demo Investigation Officer',
    username: credentials.username.trim(),
    roleLabel: demoRoleLabel,
  }
}

export function useMockAuth() {
  const [user, setUser] = useState<DemoUser | null>(null)

  function login(credentials: LoginCredentials) {
    setUser(createDemoUser(credentials))
  }

  function logout() {
    setUser(null)
  }

  return {
    isAuthenticated: Boolean(user),
    login,
    logout,
    user,
  }
}
