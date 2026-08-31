/**
 * Case Detail Component
 * Displays detailed information about a selected case.
 */

import { type JSX } from 'react'
import type { Case } from '../types/case'
import { CaseStatusBadge } from './CaseStatusBadge'
import { CasePriorityBadge } from './CasePriorityBadge'

interface CaseDetailProps {
  case: Case
  onClose: () => void
}

export function CaseDetail({ case: caseItem, onClose }: CaseDetailProps): JSX.Element {
  const registeredDate = new Date(caseItem.registeredDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const lastUpdatedDate = new Date(caseItem.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-slate-800 rounded border border-slate-700 p-6">
      {/* Header with Close Button */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100">{caseItem.title}</h2>
          <p className="text-sm text-slate-400 mt-1">{caseItem.caseNumber}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 rounded px-2 py-1"
          aria-label="Close case details"
        >
          X
        </button>
      </div>

      {/* Status and Priority Row */}
      <div className="flex gap-4 mb-6">
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">Status</p>
          <CaseStatusBadge status={caseItem.status} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">Priority</p>
          <CasePriorityBadge priority={caseItem.priority} />
        </div>
      </div>

      {/* Case Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Case Type</p>
            <p className="text-sm text-slate-200">{caseItem.caseType}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Police Station</p>
            <p className="text-sm text-slate-200">{caseItem.policeStation}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Assigned Officer</p>
            <p className="text-sm text-slate-200">{caseItem.assignedOfficer}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Registered Date</p>
            <p className="text-sm text-slate-200">{registeredDate}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Last Updated</p>
            <p className="text-sm text-slate-200">{lastUpdatedDate}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Assigned Team</p>
            <div className="space-y-1">
              {caseItem.assignedTeam && caseItem.assignedTeam.length > 0 ? (
                caseItem.assignedTeam.map((member) => (
                  <div key={member.id} className="text-sm text-slate-300">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.designation}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No team members assigned</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <p className="text-xs font-medium text-slate-500 mb-2">Investigation Summary</p>
        <p className="text-sm text-slate-300 leading-relaxed">{caseItem.summary}</p>
      </div>

      {/* Readiness Section - Placeholder for future integrations */}
      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Case Readiness</h3>
        <div className="space-y-3">
          <div className="bg-slate-700 rounded border border-slate-600 p-3">
            <p className="text-sm font-medium text-slate-300">Documents</p>
            <p className="text-xs text-slate-500 mt-1">
              Not integrated yet - awaiting Member 3 documents/evidence module implementation.
            </p>
          </div>
          <div className="bg-slate-700 rounded border border-slate-600 p-3">
            <p className="text-sm font-medium text-slate-300">Evidence</p>
            <p className="text-xs text-slate-500 mt-1">
              Not integrated yet - awaiting Member 3 documents/evidence module implementation.
            </p>
          </div>
          <div className="bg-slate-700 rounded border border-slate-600 p-3">
            <p className="text-sm font-medium text-slate-300">Legal Review</p>
            <p className="text-xs text-slate-500 mt-1">
              Not integrated yet - will be available through dedicated legal module.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
