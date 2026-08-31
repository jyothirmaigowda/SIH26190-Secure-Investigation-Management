/**
 * Case Form Component
 *
 * Handles both Create and Edit case workflows.
 * Uses local mock state only - no backend API calls.
 *
 * TEMPORARY FRONTEND STRUCTURE:
 * These form fields match the temporary Case interface pending team API/database agreement.
 * Final fields, validation rules, and relationships must be decided with Member 4.
 *
 * FUTURE API INTEGRATION:
 * Replace local state mutations with:
 *   POST /api/cases (for create)
 *   PUT /api/cases/:id (for edit)
 * Once Member 4 finalizes the API contract.
 */

import { useState, type JSX } from 'react'
import type { Case, CaseType, CaseStatus, CasePriority } from '../types/case'

interface CaseFormProps {
  mode: 'create' | 'edit'
  initialCase?: Case
  onSave: (caseData: Omit<Case, 'id' | 'assignedTeam'> & { assignedTeam?: Case['assignedTeam'] }) => void
  onCancel: () => void
  existingCaseNumbers?: string[]
}

interface FormErrors {
  [key: string]: string
}

const caseTypes: CaseType[] = ['Criminal', 'Civil', 'Administrative', 'Regulatory', 'Fraud']
const statuses: CaseStatus[] = ['Open', 'In Progress', 'Closed', 'Suspended', 'Under Review']
const priorities: CasePriority[] = ['Critical', 'High', 'Medium', 'Low']
const policeStations = [
  'Central Station',
  'Tech Crimes Division',
  'Financial Crimes Unit',
  'District Court Liaison',
  'Cyber Fraud Division',
  'Evidence Management Unit',
  'Human Resources',
  'Compliance Division',
  'Cyber Security Unit',
]

export function CaseForm({
  mode,
  initialCase,
  onSave,
  onCancel,
  existingCaseNumbers = [],
}: CaseFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    caseNumber: initialCase?.caseNumber || '',
    title: initialCase?.title || '',
    caseType: (initialCase?.caseType || 'Criminal') as CaseType,
    policeStation: initialCase?.policeStation || '',
    status: (initialCase?.status || 'Open') as CaseStatus,
    priority: (initialCase?.priority || 'Medium') as CasePriority,
    assignedOfficer: initialCase?.assignedOfficer || '',
    registeredDate: initialCase?.registeredDate || '',
    summary: initialCase?.summary || '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const normalizedCaseNumber = formData.caseNumber.trim().toLowerCase()
    const normalizedExistingCaseNumbers = existingCaseNumbers.map((caseNumber) =>
      caseNumber.trim().toLowerCase(),
    )

    // Case Number validation
    if (!normalizedCaseNumber) {
      newErrors.caseNumber = 'Case Number is required'
    } else if (mode === 'create' && normalizedExistingCaseNumbers.includes(normalizedCaseNumber)) {
      newErrors.caseNumber = 'Case Number already exists'
    }

    // Case Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Case Title is required'
    }

    // Case Type validation
    if (!formData.caseType) {
      newErrors.caseType = 'Case Type is required'
    }

    // Police Station validation
    if (!formData.policeStation.trim()) {
      newErrors.policeStation = 'Police Station is required'
    }

    // Status validation
    if (!formData.status) {
      newErrors.status = 'Status is required'
    }

    // Priority validation
    if (!formData.priority) {
      newErrors.priority = 'Priority is required'
    }

    // Assigned Officer validation
    if (!formData.assignedOfficer.trim()) {
      newErrors.assignedOfficer = 'Assigned Officer is required'
    }

    // Registration Date validation
    if (!formData.registeredDate) {
      newErrors.registeredDate = 'Registration Date is required'
    }

    // Summary validation
    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required'
    } else if (formData.summary.trim().length < 10) {
      newErrors.summary = 'Summary must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      onSave({
        caseNumber: formData.caseNumber.trim(),
        title: formData.title.trim(),
        caseType: formData.caseType,
        policeStation: formData.policeStation.trim(),
        status: formData.status,
        priority: formData.priority,
        assignedOfficer: formData.assignedOfficer.trim(),
        registeredDate: formData.registeredDate,
        summary: formData.summary.trim(),
        description: initialCase?.description,
        lastUpdated: new Date().toISOString().split('T')[0],
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-800 rounded border border-slate-700 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-100">
          {mode === 'create' ? 'Create New Case' : 'Edit Case'}
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          {mode === 'create'
            ? 'Register a new investigation case in the system.'
            : 'Update the case information. Note: This is a frontend-only form pending API integration.'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Case Number */}
        <div>
          <label htmlFor="caseNumber" className="block text-sm font-medium text-slate-300 mb-1">
            Case Number <span className="text-red-400">*</span>
          </label>
          <input
            id="caseNumber"
            type="text"
            name="caseNumber"
            value={formData.caseNumber}
            onChange={handleInputChange}
            disabled={mode === 'edit'}
            placeholder="e.g., SIMS-DEMO-1001"
            className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 ${
              errors.caseNumber
                ? 'border-red-600 focus:ring-red-600'
                : 'border-slate-600 focus:border-sky-500'
            } ${mode === 'edit' ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-invalid={Boolean(errors.caseNumber)}
            aria-describedby={errors.caseNumber ? 'error-caseNumber' : undefined}
          />
          {errors.caseNumber && (
            <p id="error-caseNumber" className="text-sm text-red-400 mt-1">
              {errors.caseNumber}
            </p>
          )}
        </div>

        {/* Case Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
            Case Title <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Brief title for the case"
            className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 ${
              errors.title ? 'border-red-600 focus:ring-red-600' : 'border-slate-600 focus:border-sky-500'
            }`}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'error-title' : undefined}
          />
          {errors.title && (
            <p id="error-title" className="text-sm text-red-400 mt-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* Case Type and Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="caseType" className="block text-sm font-medium text-slate-300 mb-1">
              Case Type <span className="text-red-400">*</span>
            </label>
            <select
              id="caseType"
              name="caseType"
              value={formData.caseType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-600 ${
                errors.caseType
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-slate-600 focus:border-sky-500'
              }`}
              aria-invalid={Boolean(errors.caseType)}
              aria-describedby={errors.caseType ? 'error-caseType' : undefined}
            >
              {caseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.caseType && (
              <p id="error-caseType" className="text-sm text-red-400 mt-1">
                {errors.caseType}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-1">
              Status <span className="text-red-400">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-600 ${
                errors.status
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-slate-600 focus:border-sky-500'
              }`}
              aria-invalid={Boolean(errors.status)}
              aria-describedby={errors.status ? 'error-status' : undefined}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p id="error-status" className="text-sm text-red-400 mt-1">
                {errors.status}
              </p>
            )}
          </div>
        </div>

        {/* Police Station and Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="policeStation" className="block text-sm font-medium text-slate-300 mb-1">
              Police Station <span className="text-red-400">*</span>
            </label>
            <select
              id="policeStation"
              name="policeStation"
              value={formData.policeStation}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-600 ${
                errors.policeStation
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-slate-600 focus:border-sky-500'
              }`}
              aria-invalid={Boolean(errors.policeStation)}
              aria-describedby={errors.policeStation ? 'error-policeStation' : undefined}
            >
              <option value="">Select a station...</option>
              {policeStations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
            {errors.policeStation && (
              <p id="error-policeStation" className="text-sm text-red-400 mt-1">
                {errors.policeStation}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-1">
              Priority <span className="text-red-400">*</span>
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-600 ${
                errors.priority
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-slate-600 focus:border-sky-500'
              }`}
              aria-invalid={Boolean(errors.priority)}
              aria-describedby={errors.priority ? 'error-priority' : undefined}
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p id="error-priority" className="text-sm text-red-400 mt-1">
                {errors.priority}
              </p>
            )}
          </div>
        </div>

        {/* Assigned Officer */}
        <div>
          <label htmlFor="assignedOfficer" className="block text-sm font-medium text-slate-300 mb-1">
            Assigned Investigating Officer <span className="text-red-400">*</span>
          </label>
          <input
            id="assignedOfficer"
            type="text"
            name="assignedOfficer"
            value={formData.assignedOfficer}
            onChange={handleInputChange}
            placeholder="Officer name or ID"
            className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 ${
              errors.assignedOfficer
                ? 'border-red-600 focus:ring-red-600'
                : 'border-slate-600 focus:border-sky-500'
            }`}
            aria-invalid={Boolean(errors.assignedOfficer)}
            aria-describedby={errors.assignedOfficer ? 'error-assignedOfficer' : undefined}
          />
          {errors.assignedOfficer && (
            <p id="error-assignedOfficer" className="text-sm text-red-400 mt-1">
              {errors.assignedOfficer}
            </p>
          )}
        </div>

        {/* Registration Date */}
        <div>
          <label htmlFor="registeredDate" className="block text-sm font-medium text-slate-300 mb-1">
            Registration Date <span className="text-red-400">*</span>
          </label>
          <input
            id="registeredDate"
            type="date"
            name="registeredDate"
            value={formData.registeredDate}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-600 ${
              errors.registeredDate
                ? 'border-red-600 focus:ring-red-600'
                : 'border-slate-600 focus:border-sky-500'
            }`}
            aria-invalid={Boolean(errors.registeredDate)}
            aria-describedby={errors.registeredDate ? 'error-registeredDate' : undefined}
          />
          {errors.registeredDate && (
            <p id="error-registeredDate" className="text-sm text-red-400 mt-1">
              {errors.registeredDate}
            </p>
          )}
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-slate-300 mb-1">
            Investigation Summary <span className="text-red-400">*</span>
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            placeholder="Describe the investigation details and context"
            rows={4}
            className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 resize-none ${
              errors.summary
                ? 'border-red-600 focus:ring-red-600'
                : 'border-slate-600 focus:border-sky-500'
            }`}
            aria-invalid={Boolean(errors.summary)}
            aria-describedby={errors.summary ? 'error-summary' : undefined}
          />
          {errors.summary && (
            <p id="error-summary" className="text-sm text-red-400 mt-1">
              {errors.summary}
            </p>
          )}
        </div>

        {/* Form Footer Note */}
        <div className="bg-slate-700 border border-slate-600 rounded p-3 mt-6">
          <p className="text-xs text-slate-400">
            <span className="font-medium text-slate-300">Note:</span> This is a frontend-only form using
            local mock data. Final field definitions and validation rules will be determined after API contract
            finalization with the backend team.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-300 text-sm font-medium hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-sky-700 border border-sky-600 rounded text-slate-100 text-sm font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Case' : 'Update Case'}
          </button>
        </div>
      </form>
    </div>
  )
}
