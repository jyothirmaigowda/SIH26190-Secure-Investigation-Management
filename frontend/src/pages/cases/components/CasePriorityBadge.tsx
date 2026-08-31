/**
 * Case Priority Badge Component
 * Displays case priority with semantic styling.
 */

import { type JSX } from 'react'
import type { CasePriority } from '../types/case'

interface CasePriorityBadgeProps {
  priority: CasePriority
}

export function CasePriorityBadge({ priority }: CasePriorityBadgeProps): JSX.Element {
  const priorityStyles: Record<CasePriority, string> = {
    Critical: 'bg-red-950 text-red-200 border border-red-700 font-semibold',
    High: 'bg-orange-950 text-orange-200 border border-orange-700',
    Medium: 'bg-yellow-950 text-yellow-200 border border-yellow-700',
    Low: 'bg-slate-700 text-slate-300 border border-slate-600',
  }

  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded ${priorityStyles[priority]}`}>
      {priority}
    </span>
  )
}
