/**
 * Case List Row Component
 * Displays a single case in the list view.
 */

import { type JSX } from 'react'
import type { Case } from '../types/case'
import { CaseStatusBadge } from './CaseStatusBadge'
import { CasePriorityBadge } from './CasePriorityBadge'

interface CaseListRowProps {
  case: Case
  onSelect: (caseId: string) => void
}

export function CaseListRow({ case: caseItem, onSelect }: CaseListRowProps): JSX.Element {
  const handleClick = () => {
    onSelect(caseItem.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const formattedDate = new Date(caseItem.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <tr
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="border-b border-slate-700 hover:bg-slate-700 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-inset"
    >
      <td className="px-4 py-3 text-sm text-slate-100 font-medium">{caseItem.caseNumber}</td>
      <td className="px-4 py-3 text-sm text-slate-300 truncate max-w-xs">{caseItem.title}</td>
      <td className="px-4 py-3 text-sm text-slate-400">{caseItem.caseType}</td>
      <td className="px-4 py-3 text-sm text-slate-400">{caseItem.policeStation}</td>
      <td className="px-4 py-3 text-sm">
        <CaseStatusBadge status={caseItem.status} />
      </td>
      <td className="px-4 py-3 text-sm">
        <CasePriorityBadge priority={caseItem.priority} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-400">{caseItem.assignedOfficer}</td>
      <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">{formattedDate}</td>
    </tr>
  )
}
