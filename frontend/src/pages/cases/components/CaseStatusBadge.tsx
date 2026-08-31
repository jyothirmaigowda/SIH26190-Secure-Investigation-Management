/**
 * Case Status Badge Component
 * Displays case status with semantic styling.
 */

import { type JSX } from 'react'
import type { CaseStatus } from '../types/case'

interface CaseStatusBadgeProps {
  status: CaseStatus
}

export function CaseStatusBadge({ status }: CaseStatusBadgeProps): JSX.Element {
  const statusStyles: Record<CaseStatus, string> = {
    Open: 'bg-sky-950 text-sky-200 border border-sky-700',
    'In Progress': 'bg-amber-950 text-amber-200 border border-amber-700',
    Closed: 'bg-slate-700 text-slate-200 border border-slate-600',
    Suspended: 'bg-red-950 text-red-200 border border-red-700',
    'Under Review': 'bg-purple-950 text-purple-200 border border-purple-700',
  }

  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded ${statusStyles[status]}`}>
      {status}
    </span>
  )
}
