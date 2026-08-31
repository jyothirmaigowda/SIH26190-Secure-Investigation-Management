/**
 * SIMS Case Management TypeScript Definitions
 *
 * IMPORTANT: FRONTEND DEMO ONLY.
 * These type definitions are temporary frontend structures for UI development.
 * They are not the final database schema or backend API contract.
 * Final Case entity fields, status values, priority values, case type values,
 * officer relationships, team relationships, and police station representation
 * must be agreed with Member 4/team before backend API integration.
 *
 * The backend database schema is not yet finalized.
 */

// Temporary frontend demo values. Final enum values require backend/team agreement.
export type CaseStatus = 'Open' | 'In Progress' | 'Closed' | 'Suspended' | 'Under Review'

// Temporary frontend demo values. Final enum values require backend/team agreement.
export type CasePriority = 'Critical' | 'High' | 'Medium' | 'Low'

// Temporary frontend demo values. Final enum values require backend/team agreement.
export type CaseType = 'Criminal' | 'Civil' | 'Administrative' | 'Regulatory' | 'Fraud'

export interface CaseTeamMember {
  id: string
  name: string
  designation: string
}

/**
 * Case entity for frontend display and filtering.
 * These fields are MOCK DATA pending backend/database finalization.
 * Police station is a searchable case context field for demo workflows only;
 * this does not model officer transfer history or permanent station relationships.
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
 * Filters for case list presentation.
 * Frontend filtering is for usability only; backend authorization and case visibility
 * must be enforced by the future API.
 */
export interface CaseFilters {
  searchQuery: string
  status: CaseStatus | 'All'
  priority: CasePriority | 'All'
  caseType: CaseType | 'All'
  policeStation: string
}
