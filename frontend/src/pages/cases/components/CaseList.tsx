/**
 * Case List Component
 * Displays a table of cases with pagination support.
 */

import { type JSX } from 'react'
import type { Case } from '../types/case'
import { CaseListRow } from './CaseListRow'
import { CaseStateMessage } from './CaseStateMessage'

interface CaseListProps {
  cases: Case[]
  totalCases: number
  selectedCaseId: string | null
  isLoading: boolean
  hasError: boolean
  onSelectCase: (caseId: string) => void
}

export function CaseList({
  cases,
  totalCases,
  selectedCaseId,
  isLoading,
  hasError,
  onSelectCase,
}: CaseListProps): JSX.Element {
  if (isLoading) {
    return <CaseStateMessage type="loading" />
  }

  if (hasError) {
    return <CaseStateMessage type="error" />
  }

  if (cases.length === 0) {
    return (
      <CaseStateMessage
        type="empty"
        message="No cases match the current search or filters. Clear filters to review all cases."
      />
    )
  }

  return (
    <div className="bg-slate-800 rounded border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-700 border-b border-slate-600 sticky top-0">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-200">Case Number</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Title</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Type</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Station</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Status</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Priority</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Officer</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Updated</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <CaseListRow
                key={caseItem.id}
                case={caseItem}
                isSelected={caseItem.id === selectedCaseId}
                onSelect={onSelectCase}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-slate-700 border-t border-slate-600 text-xs text-slate-400">
        Showing {cases.length} of {totalCases} case{totalCases !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
