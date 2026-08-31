/**
 * SIMS Case Management TypeScript Definitions
 *
 * IMPORTANT: These type definitions are temporary frontend structures for UI development.
 * Final Case entity fields, status values, and relationships must be agreed with Member 4
 * before backend API integration.
 *
 * The backend database schema is not yet finalized.
 */

export type CaseStatus = 'Open' | 'In Progress' | 'Closed' | 'Suspended' | 'Under Review'

export type CasePriority = 'Critical' | 'High' | 'Medium' | 'Low'

export type CaseType = 'Criminal' | 'Civil' | 'Administrative' | 'Regulatory' | 'Fraud'

export interface CaseTeamMember {
  id: string
  name: string
  designation: string
}

/**
 * Case entity for frontend display and filtering.
 * These fields are MOCK DATA pending backend/database finalization.
 */
export interface Case {
  id: string
  caseNumber: string
  title: string
  caseType: CaseType
  status: CaseStatus
  priority: CasePriority
  policeStation: string
  assignedOfficer: string
  assignedTeam: CaseTeamMember[]
  registeredDate: string // ISO 8601 date string
  lastUpdated: string // ISO 8601 date string
  summary: string
  description?: string
}

/**
 * Filters for case list search.
 */
export interface CaseFilters {
  searchQuery: string
  status: CaseStatus | 'All'
  priority: CasePriority | 'All'
  caseType: CaseType | 'All'
  policeStation: string
}
