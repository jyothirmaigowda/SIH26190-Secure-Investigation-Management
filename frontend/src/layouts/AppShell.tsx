import PlaceholderPage from '../components/PlaceholderPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import type { DemoUser } from '../types/auth'
import type { AppNavigationItem, AppSection } from '../types/navigation'

type AppShellProps = {
  currentSection: AppSection
  demoUser: DemoUser
  onLogout: () => void
  onSectionChange: (section: AppSection) => void
}

const navigationItems: AppNavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Main workspace overview.',
  },
  {
    id: 'cases',
    label: 'Cases',
    description: 'Cases module will be integrated here.',
  },
  {
    id: 'documents',
    label: 'Documents',
    description: 'Documents module will be integrated here.',
  },
  {
    id: 'evidence',
    label: 'Evidence',
    description: 'Evidence module will be integrated here.',
  },
  {
    id: 'audit',
    label: 'Audit',
    description: 'Audit module will be integrated here.',
  },
]

function AppShell({
  currentSection,
  demoUser,
  onLogout,
  onSectionChange,
}: AppShellProps) {
  const currentNavItem =
    navigationItems.find((item) => item.id === currentSection) ??
    navigationItems[0]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="border-b border-slate-800 bg-slate-950 px-5 py-5 md:flex md:w-72 md:flex-col md:border-b-0 md:border-r md:px-6">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-sky-400/40 bg-slate-900 text-base font-bold text-sky-200 shadow-lg shadow-slate-950/30"
            >
              S
            </div>
            <div>
              <p className="text-lg font-semibold text-white">SIMS</p>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Secure Investigation Management System
              </p>
            </div>
          </div>

          <nav aria-label="SIMS sections" className="mt-6">
            <ul className="flex flex-wrap gap-2 md:flex-col">
              {navigationItems.map((item) => {
                const isActive = item.id === currentSection

                return (
                  <li className="shrink-0 md:shrink" key={item.id}>
                    <button
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full rounded-md border px-4 py-3 text-left text-sm font-medium outline-none transition focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                        isActive
                          ? 'border-sky-400/50 bg-sky-500/15 text-sky-100'
                          : 'border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900 hover:text-white'
                      }`}
                      onClick={() => onSectionChange(item.id)}
                      type="button"
                    >
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 p-4 md:mt-auto">
            <p className="text-sm font-semibold text-white">
              {demoUser.displayName}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {demoUser.roleLabel} - Demo display only
            </p>
            <p className="mt-3 break-words text-xs text-slate-500">
              Signed in as {demoUser.username}
            </p>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-800 bg-slate-950/95 px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                  SIMS
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-white">
                  {currentNavItem.label}
                </h1>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="text-sm">
                  <p className="font-semibold text-white">
                    {demoUser.displayName}
                  </p>
                  <p className="text-slate-400">
                    {demoUser.roleLabel} - Demo display only
                  </p>
                </div>
                <button
                  className="rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 outline-none transition hover:bg-slate-800 hover:text-white focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                  onClick={onLogout}
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 px-5 py-6 sm:px-8 lg:py-8">
            {renderSection(currentSection, currentNavItem, onSectionChange)}
          </div>
        </section>
      </div>
    </main>
  )
}

function renderSection(
  section: AppSection,
  navItem: AppNavigationItem,
  onSectionChange: (section: AppSection) => void,
) {
  switch (section) {
    case 'dashboard':
      return <DashboardPage onNavigate={onSectionChange} />
    case 'cases':
      return (
        <PlaceholderPage
          description={
            navItem.description ?? 'Cases module will be integrated here.'
          }
          title="Cases"
        />
      )
    case 'documents':
      return (
        <PlaceholderPage
          description={
            navItem.description ?? 'Documents module will be integrated here.'
          }
          title="Documents"
        />
      )
    case 'evidence':
      return (
        <PlaceholderPage
          description={
            navItem.description ?? 'Evidence module will be integrated here.'
          }
          title="Evidence"
        />
      )
    case 'audit':
      return (
        <PlaceholderPage
          description={
            navItem.description ?? 'Audit module will be integrated here.'
          }
          title="Audit"
        />
      )
  }
}

export default AppShell
