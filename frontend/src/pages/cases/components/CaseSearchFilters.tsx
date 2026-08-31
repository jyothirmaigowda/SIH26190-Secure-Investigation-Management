/**
 * Case Search and Filter Component
 * Provides search and filtering UI for case list.
 */

import { type JSX } from 'react'
import type { CaseFilters, CaseStatus, CasePriority, CaseType } from '../types/case'

interface CaseSearchFiltersProps {
  filters: CaseFilters
  onFiltersChange: (filters: CaseFilters) => void
  policeStations: string[]
}

const statuses: (CaseStatus | 'All')[] = ['All', 'Open', 'In Progress', 'Closed', 'Suspended', 'Under Review']
const priorities: (CasePriority | 'All')[] = ['All', 'Critical', 'High', 'Medium', 'Low']
const caseTypes: (CaseType | 'All')[] = ['All', 'Criminal', 'Civil', 'Administrative', 'Regulatory', 'Fraud']

export function CaseSearchFilters({
  filters,
  onFiltersChange,
  policeStations,
}: CaseSearchFiltersProps): JSX.Element {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value,
    })
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      status: (e.target.value as CaseStatus) || 'All',
    })
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      priority: (e.target.value as CasePriority) || 'All',
    })
  }

  const handleCaseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      caseType: (e.target.value as CaseType) || 'All',
    })
  }

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      policeStation: e.target.value,
    })
  }

  const handleReset = () => {
    onFiltersChange({
      searchQuery: '',
      status: 'All',
      priority: 'All',
      caseType: 'All',
      policeStation: '',
    })
  }

  return (
    <div className="bg-slate-800 rounded border border-slate-700 p-4 mb-6">
      <div className="space-y-4">
        {/* Search Field */}
        <div>
          <label htmlFor="search-cases" className="block text-sm font-medium text-slate-300 mb-2">
            Search by case number, title, station, or officer
          </label>
          <input
            id="search-cases"
            type="text"
            placeholder="e.g., SIMS-DEMO-1001, Financial Records, Central Station, Inspector Kumar"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Filter Row 1: Status, Priority, Case Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="filter-status" className="block text-sm font-medium text-slate-300 mb-2">
              Status
            </label>
            <select
              id="filter-status"
              value={filters.status}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-priority" className="block text-sm font-medium text-slate-300 mb-2">
              Priority
            </label>
            <select
              id="filter-priority"
              value={filters.priority}
              onChange={handlePriorityChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-caseType" className="block text-sm font-medium text-slate-300 mb-2">
              Case Type
            </label>
            <select
              id="filter-caseType"
              value={filters.caseType}
              onChange={handleCaseTypeChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              {caseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Row 2: Police Station and Reset */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="filter-station" className="block text-sm font-medium text-slate-300 mb-2">
              Police Station
            </label>
            <select
              id="filter-station"
              value={filters.policeStation}
              onChange={handleStationChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="">All Stations</option>
              {policeStations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-300 text-sm font-medium hover:bg-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
