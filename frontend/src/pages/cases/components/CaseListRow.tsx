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
  isSelected: boolean
  onSelect: (caseId: string) => void
}

export function CaseListRow({ case: caseItem, isSelected, onSelect }: CaseListRowProps): JSX.Element {
  const handleClick = () => {
    onSelect(caseItem.id)
  }

  const formattedDate = new Date(caseItem.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <tr
      aria-selected={isSelected}
      className={`border-b border-slate-700 transition-colors ${
        isSelected ? 'bg-sky-950/60 outline outline-1 outline-sky-700' : 'hover:bg-slate-700'
      }`}
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
      <td className="px-4 py-3 text-sm">
        <button
          type="button"
          onClick={handleClick}
          aria-current={isSelected ? 'true' : undefined}
          className={`whitespace-nowrap rounded border px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            isSelected
              ? 'border-sky-500 bg-sky-800 text-slate-100'
              : 'border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600'
          }`}
        >
          {isSelected ? 'Viewing' : 'View Case'}
        </button>
      </td>
    </tr>
  )
}
