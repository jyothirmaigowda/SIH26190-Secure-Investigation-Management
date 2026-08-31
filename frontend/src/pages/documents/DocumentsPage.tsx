import { useEffect, useMemo, useState } from 'react'

import { documentRecords, documentVersionRecords } from './mockData'
import type { Document, DocumentStatus, DocumentType, DocumentVersion } from './types'

const documentTypeOptions: Array<DocumentType | 'ALL'> = [
  'ALL',
  'CASE_REPORT',
  'STATEMENT',
  'CORRESPONDENCE',
  'PHOTO_LOG',
  'EVIDENCE_SUMMARY',
  'OTHER',
]

const documentStatusOptions: Array<DocumentStatus | 'ALL'> = [
  'ALL',
  'DRAFT',
  'UNDER_REVIEW',
  'APPROVED',
  'ARCHIVED',
]

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

const getStatusLabel = (status: DocumentStatus) => {
  const labels: Record<DocumentStatus, string> = {
    DRAFT: 'Draft',
    UNDER_REVIEW: 'Under review',
    APPROVED: 'Approved',
    ARCHIVED: 'Archived',
  }

  return labels[status]
}

const getStatusClassName = (status: DocumentStatus) => {
  const classes: Record<DocumentStatus, string> = {
    DRAFT: 'border-slate-200 bg-slate-100 text-slate-700',
    UNDER_REVIEW: 'border-amber-200 bg-amber-50 text-amber-800',
    APPROVED: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    ARCHIVED: 'border-slate-200 bg-slate-100 text-slate-600',
  }

  return classes[status]
}

const getDocumentTypeLabel = (type: DocumentType) => {
  const labels: Record<DocumentType, string> = {
    CASE_REPORT: 'Case report',
    STATEMENT: 'Statement',
    CORRESPONDENCE: 'Correspondence',
    PHOTO_LOG: 'Photo log',
    EVIDENCE_SUMMARY: 'Evidence summary',
    OTHER: 'Other',
  }

  return labels[type]
}

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))

const getVersionStatusLabel = (status: DocumentVersion['status']) => {
  const labels: Record<DocumentVersion['status'], string> = {
    DRAFT: 'Draft',
    ACTIVE: 'Active',
    SUPERSEDED: 'Superseded',
  }

  return labels[status]
}

const getVersionStatusClassName = (status: DocumentVersion['status']) => {
  const classes: Record<DocumentVersion['status'], string> = {
    DRAFT: 'border-slate-200 bg-slate-100 text-slate-700',
    ACTIVE: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    SUPERSEDED: 'border-slate-200 bg-slate-100 text-slate-600',
  }

  return classes[status]
}

const LoadingState = () => (
  <div className="rounded-md border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
    Loading documents…
  </div>
)

const ErrorState = () => (
  <div className="rounded-md border border-red-200 bg-red-50 p-10 text-center">
    <p className="text-sm font-medium text-red-700">Document data unavailable</p>
    <p className="mt-2 text-sm text-red-600">
      This is a placeholder UI state for future backend integration.
    </p>
  </div>
)

const EmptyState = () => (
  <div className="rounded-md border border-slate-200 bg-slate-50 p-10 text-center">
    <p className="text-lg font-semibold text-slate-800">No documents found</p>
    <p className="mt-2 text-sm text-slate-600">
      The current search and filter criteria did not return any documents.
    </p>
  </div>
)

const DetailCard = ({
  document,
  selectedVersionId,
  onSelectVersion,
  versions,
}: {
  document: Document
  selectedVersionId: string | null
  onSelectVersion: (versionId: string) => void
  versions: DocumentVersion[]
}) => {
  const currentVersion = versions.find((version) => version.version === document.currentVersion)

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
              Document details
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">{document.title}</h3>
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClassName(
              document.status,
            )}`}
          >
            {getStatusLabel(document.status)}
          </span>
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Document ID</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{document.id}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Case ID</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{document.caseId}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Document type</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              {getDocumentTypeLabel(document.documentType)}
            </dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Current version</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">v{document.currentVersion}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">File name</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{document.fileName}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">File size</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{document.fileSize}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">MIME type</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{document.mimeType}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Uploaded date</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{formatDate(document.uploadedAt)}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700">{document.description}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Last updated</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{formatDate(document.updatedAt)}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
              Version history
            </p>
            <h4 className="mt-2 text-xl font-semibold text-slate-900">Document versions</h4>
          </div>
          {currentVersion && (
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
              Current version: v{currentVersion.version}
            </span>
          )}
        </div>

        {versions.length === 0 ? (
          <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-lg font-semibold text-slate-800">No version history available</p>
            <p className="mt-2 text-sm text-slate-600">
              This document does not have any recorded mock versions available in the current dataset.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {versions.map((version) => {
              const isCurrent = version.version === document.currentVersion
              const isSelected = selectedVersionId === version.id

              return (
                <button
                  key={version.id}
                  type="button"
                  onClick={() => onSelectVersion(version.id)}
                  className={`w-full rounded-md border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-200 ${
                    isSelected
                      ? 'border-sky-300 bg-sky-50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-slate-900">
                          Version {version.version}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-slate-500">
                        Updated: {formatDateTime(version.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getVersionStatusClassName(
                        version.status,
                      )}`}
                    >
                      {getVersionStatusLabel(version.status)}
                    </span>
                  </div>

                  <dl className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                        Created by
                      </dt>
                      <dd className="mt-1 font-medium text-slate-800">{version.createdBy}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                        Change
                      </dt>
                      <dd className="mt-1 font-medium text-slate-800">{version.changeSummary}</dd>
                    </div>
                  </dl>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const DocumentsPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedType, setSelectedType] = useState<DocumentType | 'ALL'>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatus | 'ALL'>('ALL')
  const [selectedCaseId, setSelectedCaseId] = useState('ALL')
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError] = useState(false)

  const caseOptions = useMemo(
    () => ['ALL', ...new Set(documentRecords.map((document) => document.caseId))],
    [],
  )

  const filteredDocuments = useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    return documentRecords.filter((document) => {
      const matchesSearch =
        query.length === 0 ||
        document.title.toLowerCase().includes(query) ||
        document.id.toLowerCase().includes(query) ||
        document.fileName.toLowerCase().includes(query)

      const matchesType = selectedType === 'ALL' || document.documentType === selectedType
      const matchesStatus = selectedStatus === 'ALL' || document.status === selectedStatus
      const matchesCase = selectedCaseId === 'ALL' || document.caseId === selectedCaseId

      return matchesSearch && matchesType && matchesStatus && matchesCase
    })
  }, [searchValue, selectedType, selectedStatus, selectedCaseId])

  const selectedDocument =
    selectedDocumentId === null
      ? null
      : filteredDocuments.find((document) => document.id === selectedDocumentId) ??
        documentRecords.find((document) => document.id === selectedDocumentId) ??
        null

  const documentVersions = useMemo(() => {
    if (!selectedDocument) {
      return []
    }

    return [...documentVersionRecords]
      .filter((version) => version.documentId === selectedDocument.id)
      .sort((a, b) => b.version - a.version)
  }, [selectedDocument])

  useEffect(() => {
    if (!selectedDocument) {
      setSelectedVersionId(null)
      return
    }

    const currentVersion = documentVersions.find(
      (version) => version.version === selectedDocument.currentVersion,
    )

    setSelectedVersionId(currentVersion?.id ?? documentVersions[0]?.id ?? null)
  }, [selectedDocument, documentVersions])

  const hasPanelOpen = selectedDocument !== null

  if (hasError) {
    return <ErrorState />
  }

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Investigation records
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Documents</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            This area contains documents associated with investigation cases and supporting case
            material.
          </p>
        </header>

        {!hasPanelOpen ? (
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-4 border-b border-slate-200 pb-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Search
                </span>
                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search by title, ID or file name"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  aria-label="Search documents"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Document type
                </span>
                <select
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value as DocumentType | 'ALL')}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  aria-label="Filter by document type"
                >
                  {documentTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'ALL' ? 'All types' : getDocumentTypeLabel(option)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Status
                </span>
                <select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value as DocumentStatus | 'ALL')}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  aria-label="Filter by document status"
                >
                  {documentStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'ALL' ? 'All statuses' : getStatusLabel(option)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Case ID
                </span>
                <select
                  value={selectedCaseId}
                  onChange={(event) => setSelectedCaseId(event.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  aria-label="Filter by case ID"
                >
                  {caseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'ALL' ? 'All cases' : option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
              <div className="overflow-x-auto">
                {filteredDocuments.length === 0 ? (
                  <EmptyState />
                ) : (
                  <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Document ID
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Title
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Type
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Case ID
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Version
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Status
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Updated
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          File name
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredDocuments.map((document) => (
                        <tr key={document.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">{document.id}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">{document.title}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            {getDocumentTypeLabel(document.documentType)}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">{document.caseId}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">v{document.currentVersion}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClassName(
                                document.status,
                              )}`}
                            >
                              {getStatusLabel(document.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            {formatDate(document.updatedAt)}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">{document.fileName}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => setSelectedDocumentId(document.id)}
                              className="rounded-md border border-sky-600 bg-sky-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-4">
            <button
              type="button"
              onClick={() => setSelectedDocumentId(null)}
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Back to Documents
            </button>
            {selectedDocument ? (
              <DetailCard
                document={selectedDocument}
                selectedVersionId={selectedVersionId}
                onSelectVersion={setSelectedVersionId}
                versions={documentVersions}
              />
            ) : (
              <EmptyState />
            )}
          </section>
        )}
      </div>
    </main>
  )
}

export default DocumentsPage
