import type { AppSection } from '../../types/navigation'

type DashboardPageProps = {
  onNavigate: (section: AppSection) => void
}

type AttentionItem = {
  title: string
  detail: string
  status: string
  actionLabel: string
  target: Exclude<AppSection, 'dashboard'>
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

const attentionItems: AttentionItem[] = [
  {
    title: 'Document awaiting review',
    detail: 'Fictional review queue item prepared for document team handoff.',
    status: 'Review',
    actionLabel: 'Open Documents',
    target: 'documents',
  },
  {
    title: 'Evidence record requires verification',
    detail: 'Demo evidence entry flagged for later backend verification flow.',
    status: 'Verify',
    actionLabel: 'Open Evidence',
    target: 'evidence',
  },
  {
    title: 'Upcoming case review',
    detail: 'Sample case workspace item awaiting Cases module integration.',
    status: 'Upcoming',
    actionLabel: 'View Cases',
    target: 'cases',
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
    value: '5',
    detail: 'Local UI sample data',
  },
  {
    label: 'Evidence Records',
    value: '18',
    detail: 'Demo workspace only',
  },
  {
    label: 'Recent Audit Events',
    value: '7',
    detail: 'Not loaded from backend',
  },
]

const activityItems: ActivityItem[] = [
  {
    title: 'Document review recorded',
    meta: 'Demo status - 10:20',
  },
  {
    title: 'Evidence record updated',
    meta: 'Fictional entry - 09:45',
  },
  {
    title: 'Case information reviewed',
    meta: 'Sample workspace item - Yesterday',
  },
  {
    title: 'Audit entry recorded',
    meta: 'Demo system event - Yesterday',
  },
]

function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="border-b border-slate-800 pb-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-sky-300">
              Demo environment - fictional data only.
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Dashboard
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
              Investigation workspace overview for attention items, current
              workload, recent demo activity, and module access.
            </p>
          </div>
          <p className="text-sm text-slate-500">
            Current view: operational landing
          </p>
        </div>
      </section>

      <section aria-labelledby="attention-heading">
        <div className="mb-3 flex items-center justify-between">
          <h2
            className="text-lg font-semibold text-white"
            id="attention-heading"
          >
            Attention Required
          </h2>
          <p className="text-sm text-slate-500">Fictional UI examples</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {attentionItems.map((item) => (
            <article
              className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"
              key={item.title}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <span className="rounded-sm border border-sky-400/30 bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-200">
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {item.detail}
              </p>
              <button
                className="mt-4 rounded-md border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 outline-none transition hover:border-sky-400/60 hover:bg-slate-800 hover:text-white focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                onClick={() => onNavigate(item.target)}
                type="button"
              >
                {item.actionLabel}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="summary-heading">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-lg font-semibold text-white" id="summary-heading">
            Workload Overview
          </h2>
          <p className="text-sm text-slate-500">Demo data, not backend data</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryItems.map((item) => (
            <article
              className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"
              key={item.label}
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">
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
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Open a module placeholder for teammate integration.
          </p>
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

export default DashboardPage
