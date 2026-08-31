import { useState } from 'react'
import type { DemoUser } from '../../types/auth'

type DashboardPageProps = {
  demoUser: DemoUser
  onLogout: () => void
}

type SectionId = 'dashboard' | 'cases' | 'documents' | 'evidence' | 'audit'

type NavItem = {
  id: SectionId
  label: string
  ownerNote: string
}

type AttentionItem = {
  title: string
  detail: string
}

type SummaryItem = {
  label: string
  value: string
  detail: string
}

type ActivityItem = {
  title: string
  meta: string
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    ownerNote: 'Main workspace overview.',
  },
  {
    id: 'cases',
    label: 'Cases',
    ownerNote: 'Integration pending from the Cases team.',
  },
  {
    id: 'documents',
    label: 'Documents',
    ownerNote: 'Integration pending from the Documents team.',
  },
  {
    id: 'evidence',
    label: 'Evidence',
    ownerNote: 'Integration pending from the Evidence team.',
  },
  {
    id: 'audit',
    label: 'Audit',
    ownerNote: 'Integration pending from the Audit team.',
  },
]

const attentionItems: AttentionItem[] = [
  {
    title: 'Documents awaiting review',
    detail: 'Three demo records are marked for officer review.',
  },
  {
    title: 'Evidence items requiring verification',
    detail: 'Two fictional entries need chain-of-custody review.',
  },
  {
    title: 'Cases with upcoming review dates',
    detail: 'One demo case has a scheduled supervisor check-in.',
  },
]

const summaryItems: SummaryItem[] = [
  {
    label: 'Active Cases',
    value: '12',
    detail: 'Fictional demo count',
  },
  {
    label: 'Pending Documents',
    value: '8',
    detail: 'Local UI sample data',
  },
  {
    label: 'Evidence Items',
    value: '24',
    detail: 'Demo workspace only',
  },
  {
    label: 'Recent Audit Events',
    value: '17',
    detail: 'Not loaded from backend',
  },
]

const activityItems: ActivityItem[] = [
  {
    title: 'Document review completed',
    meta: 'Demo file summary - 10:20',
  },
  {
    title: 'Evidence record updated',
    meta: 'Fictional evidence entry - 09:45',
  },
  {
    title: 'Case note added',
    meta: 'Sample investigation note - Yesterday',
  },
  {
    title: 'Audit entry recorded',
    meta: 'Demo system event - Yesterday',
  },
]

function DashboardPage({ demoUser, onLogout }: DashboardPageProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('dashboard')
  const currentSection =
    navigationItems.find((item) => item.id === activeSection) ??
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
            <ul className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
              {navigationItems.map((item) => {
                const isActive = item.id === activeSection

                return (
                  <li className="shrink-0 md:shrink" key={item.id}>
                    <button
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full rounded-md border px-4 py-3 text-left text-sm font-medium outline-none transition focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                        isActive
                          ? 'border-sky-400/50 bg-sky-500/15 text-sky-100'
                          : 'border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900 hover:text-white'
                      }`}
                      onClick={() => setActiveSection(item.id)}
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
                  {currentSection.label}
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
            {activeSection === 'dashboard' ? (
              <DashboardHome onNavigate={setActiveSection} />
            ) : (
              <ModulePlaceholder item={currentSection} />
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

type DashboardHomeProps = {
  onNavigate: (section: SectionId) => void
}

function DashboardHome({ onNavigate }: DashboardHomeProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
        <p className="text-sm font-medium text-sky-300">
          Demo environment - fictional data only.
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Good morning, Demo Officer
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
          Investigation workspace overview for demo case activity, document
          review queues, evidence follow-up, and audit visibility.
        </p>
      </section>

      <section aria-labelledby="attention-heading">
        <div className="mb-3 flex items-center justify-between">
          <h2
            className="text-lg font-semibold text-white"
            id="attention-heading"
          >
            Attention Required
          </h2>
          <p className="text-sm text-slate-500">Local demo items</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {attentionItems.map((item) => (
            <article
              className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"
              key={item.title}
            >
              <h3 className="text-sm font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="summary-heading">
        <h2 className="mb-3 text-lg font-semibold text-white" id="summary-heading">
          Operational Summary
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryItems.map((item) => (
            <article
              className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"
              key={item.label}
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {item.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-500">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section
          aria-labelledby="activity-heading"
          className="rounded-lg border border-slate-800 bg-slate-900/70 p-5"
        >
          <h2 className="text-lg font-semibold text-white" id="activity-heading">
            Recent Activity
          </h2>
          <ul className="mt-4 divide-y divide-slate-800">
            {activityItems.map((item) => (
              <li className="py-3 first:pt-0 last:pb-0" key={item.title}>
                <p className="text-sm font-medium text-slate-100">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">{item.meta}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="quick-nav-heading"
          className="rounded-lg border border-slate-800 bg-slate-900/70 p-5"
        >
          <h2
            className="text-lg font-semibold text-white"
            id="quick-nav-heading"
          >
            Quick Navigation
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <QuickNavButton
              label="View Cases"
              onClick={() => onNavigate('cases')}
            />
            <QuickNavButton
              label="Review Documents"
              onClick={() => onNavigate('documents')}
            />
            <QuickNavButton
              label="View Evidence"
              onClick={() => onNavigate('evidence')}
            />
            <QuickNavButton
              label="Open Audit"
              onClick={() => onNavigate('audit')}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

type QuickNavButtonProps = {
  label: string
  onClick: () => void
}

function QuickNavButton({ label, onClick }: QuickNavButtonProps) {
  return (
    <button
      className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-left text-sm font-medium text-slate-200 outline-none transition hover:border-sky-400/60 hover:bg-slate-900 hover:text-white focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

type ModulePlaceholderProps = {
  item: NavItem
}

function ModulePlaceholder({ item }: ModulePlaceholderProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
        <p className="text-sm font-medium text-sky-300">Placeholder module</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          {item.label} module
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
          {item.ownerNote}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
          This shell only provides navigation and layout for the demo frontend.
          No {item.label.toLowerCase()} functionality, backend calls, or
          authorization behavior has been implemented here.
        </p>
      </section>
    </div>
  )
}

export default DashboardPage
