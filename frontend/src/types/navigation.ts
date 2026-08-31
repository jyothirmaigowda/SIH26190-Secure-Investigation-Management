export type AppSection = 'dashboard' | 'cases' | 'documents' | 'evidence' | 'audit'

export type AppNavigationItem = {
  id: AppSection
  label: string
  description?: string
}
