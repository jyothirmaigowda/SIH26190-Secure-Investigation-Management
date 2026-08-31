/**
 * Case State Message Component
 * Displays messages for loading, empty, and error states.
 */

import { type JSX } from 'react'

type CaseStateType = 'loading' | 'empty' | 'error'

interface CaseStateMessageProps {
  type: CaseStateType
  message?: string
}

export function CaseStateMessage({ type, message }: CaseStateMessageProps): JSX.Element {
  const defaultMessages: Record<CaseStateType, string> = {
    loading: 'Loading cases...',
    empty: 'No cases match your search criteria.',
    error: 'An error occurred while loading cases.',
  }

  const displayMessage = message || defaultMessages[type]

  const containerClasses = {
    loading: 'bg-slate-800 border-l-4 border-sky-600',
    empty: 'bg-slate-800 border-l-4 border-slate-600',
    error: 'bg-red-950 border-l-4 border-red-600',
  }

  const textClasses = {
    loading: 'text-slate-300',
    empty: 'text-slate-400',
    error: 'text-red-200',
  }

  return (
    <div className={`px-4 py-3 rounded ${containerClasses[type]}`}>
      <p className={`text-sm ${textClasses[type]}`}>{displayMessage}</p>
    </div>
  )
}
