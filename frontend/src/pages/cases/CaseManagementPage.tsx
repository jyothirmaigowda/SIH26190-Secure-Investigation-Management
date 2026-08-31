/**
 * Case Management Page Component
 * Main page for case management functionality.
 *
 * ROUTING INTEGRATION NOTE:
 * This component is designed to be integrated into the main application routing.
 * Member 1 should add this to the routing system at a route such as /cases.
 *
 * Example integration (once routing is established):
 *   import { CaseManagementPage } from './pages/cases/CaseManagementPage'
 *   // Add route: <Route path="/cases" element={<CaseManagementPage />} />
 */

import { useState, useMemo, useCallback, type JSX } from 'react'
import type { Case, CaseFilters } from './types/case'
import { mockCases as initialMockCases } from './mockData'
import { CaseSearchFilters } from './components/CaseSearchFilters'
import { CaseList } from './components/CaseList'
import { CaseDetail } from './components/CaseDetail'
import { CaseForm } from './components/CaseForm'

export function CaseManagementPage(): JSX.Element {
  // Frontend demo-only data source. Replace with the Member 4 API contract when finalized.
  const [cases, setCases] = useState<Case[]>(initialMockCases)

  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [isLoading] = useState(false)
  const [hasError] = useState(false)

  // Form state
  const [formVisible, setFormVisible] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [filters, setFilters] = useState<CaseFilters>({
    searchQuery: '',
    status: 'All',
    priority: 'All',
    caseType: 'All',
    policeStation: '',
  })

  // Extract unique police stations from current cases
  const policeStations = useMemo(() => {
    const stations = new Set(cases.map((c) => c.policeStation))
    return Array.from(stations).sort()
  }, [cases])

  // Frontend filtering is for presentation only.
  // Authorization and case visibility must be enforced by the backend.
  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      // Search query filtering
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.trim().toLowerCase()
        const matchesSearch =
          caseItem.caseNumber.toLowerCase().includes(query) ||
          caseItem.title.toLowerCase().includes(query) ||
          caseItem.policeStation.toLowerCase().includes(query) ||
          caseItem.assignedOfficer.toLowerCase().includes(query)

        if (!matchesSearch) return false
      }

      // Status filtering
      if (filters.status !== 'All' && caseItem.status !== filters.status) {
        return false
      }

      // Priority filtering
      if (filters.priority !== 'All' && caseItem.priority !== filters.priority) {
        return false
      }

      // Case type filtering
      if (filters.caseType !== 'All' && caseItem.caseType !== filters.caseType) {
        return false
      }

      // Police station filtering
      if (filters.policeStation && caseItem.policeStation !== filters.policeStation) {
        return false
      }

      return true
    })
  }, [filters, cases])

  const selectedCase = selectedCaseId ? cases.find((c) => c.id === selectedCaseId) : null

  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId)
  }

  const handleCloseDetail = () => {
    setSelectedCaseId(null)
  }

  // Form handlers
  const handleCreateCaseClick = useCallback(() => {
    setFormMode('create')
    setFormVisible(true)
    setSelectedCaseId(null)
    setSuccessMessage(null)
  }, [])

  const handleEditCaseClick = useCallback(() => {
    if (!selectedCaseId) return
    setFormMode('edit')
    setFormVisible(true)
    setSuccessMessage(null)
  }, [selectedCaseId])

  const handleFormCancel = useCallback(() => {
    setFormVisible(false)
    setSuccessMessage(null)
  }, [])

  const handleFormSave = useCallback(
    (formData: Omit<Case, 'id' | 'assignedTeam'> & { assignedTeam?: Case['assignedTeam'] }) => {
      if (formMode === 'create') {
        // Generate a new case ID
        const newId = `case-${Date.now()}`
        const newCase: Case = {
          id: newId,
          caseNumber: formData.caseNumber,
          title: formData.title,
          caseType: formData.caseType,
          status: formData.status,
          priority: formData.priority,
          policeStation: formData.policeStation,
          assignedOfficer: formData.assignedOfficer,
          assignedTeam: [],
          registeredDate: formData.registeredDate,
          lastUpdated: formData.lastUpdated,
          summary: formData.summary,
          description: formData.description,
        }

        setCases((prevCases) => [newCase, ...prevCases])
        setFilters({
          searchQuery: '',
          status: 'All',
          priority: 'All',
          caseType: 'All',
          policeStation: '',
        })
        setSelectedCaseId(newId)
        setSuccessMessage(`Case ${formData.caseNumber} created successfully.`)
      } else if (formMode === 'edit' && selectedCaseId) {
        // Update existing case
        setCases((prevCases) =>
          prevCases.map((caseItem) =>
            caseItem.id === selectedCaseId
              ? {
                  ...caseItem,
                  caseNumber: formData.caseNumber,
                  title: formData.title,
                  caseType: formData.caseType,
                  status: formData.status,
                  priority: formData.priority,
                  policeStation: formData.policeStation,
                  assignedOfficer: formData.assignedOfficer,
                  registeredDate: formData.registeredDate,
                  lastUpdated: formData.lastUpdated,
                  summary: formData.summary,
                  description: formData.description,
                }
              : caseItem,
          ),
        )
        setSuccessMessage(`Case ${formData.caseNumber} updated successfully.`)
      }

      setFormVisible(false)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    },
    [formMode, selectedCaseId],
  )

  const existingCaseNumbers = cases.map((c) => c.caseNumber)

  return (
    <main className="min-h-screen bg-slate-950 px-4 sm:px-6 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-sky-950 border border-sky-700 rounded p-4 text-sky-200">
            <p className="text-sm font-medium">{successMessage}</p>
          </div>
        )}

        {/* Page Header with Create Button */}
        <div className="mb-8 flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-100">Case Management</h1>
            <p className="mt-2 text-slate-400">
              Search, filter, and manage investigation cases across all police stations.
            </p>
          </div>
          {!formVisible && (
            <button
              onClick={handleCreateCaseClick}
              className="px-4 py-2 bg-sky-700 border border-sky-600 rounded text-slate-100 text-sm font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 whitespace-nowrap transition-colors"
            >
              + Create Case
            </button>
          )}
        </div>

        {/* Form View */}
        {formVisible ? (
          <div className="max-w-2xl">
            <CaseForm
              mode={formMode}
              initialCase={formMode === 'edit' && selectedCase ? selectedCase : undefined}
              onSave={handleFormSave}
              onCancel={handleFormCancel}
              existingCaseNumbers={existingCaseNumbers}
            />
          </div>
        ) : (
          <>
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Search, Filters, and List */}
              <div className="lg:col-span-2">
                {/* Search and Filters */}
                <CaseSearchFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  policeStations={policeStations}
                />

                {/* Case List */}
                <CaseList
                  cases={filteredCases}
                  totalCases={cases.length}
                  selectedCaseId={selectedCaseId}
                  isLoading={isLoading}
                  hasError={hasError}
                  onSelectCase={handleCaseSelect}
                />
              </div>

              {/* Right Column: Case Detail */}
              <div className="lg:col-span-1">
                {selectedCase ? (
                  <div className="space-y-4">
                    <CaseDetail case={selectedCase} onClose={handleCloseDetail} />
                    <button
                      onClick={handleEditCaseClick}
                      className="w-full px-4 py-2 bg-sky-700 border border-sky-600 rounded text-slate-100 text-sm font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                    >
                      Edit Case
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-800 rounded border border-slate-700 p-6 text-center">
                    <p className="text-sm text-slate-400">
                      Select a case from the list to view detailed information.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
