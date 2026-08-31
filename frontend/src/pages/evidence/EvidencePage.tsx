import * as React from 'react'
import { useMemo, useState } from 'react'

import { evidenceRecords, evidenceTransferRecords } from './mockData'
import type {
  Evidence,
  EvidenceStatus,
  EvidenceTransfer,
  EvidenceType,
  VerificationStatus,
} from './types'

const evidenceTypeOptions: Array<EvidenceType | 'ALL'> = [
  'ALL',
  'DIGITAL_FILE',
  'PHYSICAL_ITEM',
  'PHOTOGRAPH',
  'VIDEO',
  'AUDIO',
  'DOCUMENT',
]

const evidenceStatusOptions: Array<EvidenceStatus | 'ALL'> = [
  'ALL',
  'COLLECTED',
  'LOGGED',
  'STORED',
  'TRANSFERRED',
  'REVIEWED',
  'RESTRICTED',
]

const verificationStatusOptions: Array<VerificationStatus | 'ALL'> = [
  'ALL',
  'NOT_VERIFIED',
  'PENDING',
  'VERIFIED',
  'VERIFICATION_UNAVAILABLE',
]

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

const getEvidenceTypeLabel = (type: EvidenceType) => {
  const labels: Record<EvidenceType, string> = {
    DIGITAL_FILE: 'Digital file',
    PHYSICAL_ITEM: 'Physical item',
    PHOTOGRAPH: 'Photograph',
    VIDEO: 'Video',
    AUDIO: 'Audio',
    DOCUMENT: 'Document',
  }

  return labels[type]
}

const getEvidenceStatusLabel = (status: EvidenceStatus) => {
  const labels: Record<EvidenceStatus, string> = {
    COLLECTED: 'Collected',
    LOGGED: 'Logged',
    STORED: 'Stored',
    TRANSFERRED: 'Transferred',
    REVIEWED: 'Reviewed',
    RESTRICTED: 'Restricted',
  }

  return labels[status]
}

const getEvidenceStatusClassName = (status: EvidenceStatus) => {
  const classes: Record<EvidenceStatus, string> = {
    COLLECTED: 'border-slate-200 bg-slate-100 text-slate-700',
    LOGGED: 'border-cyan-200 bg-cyan-50 text-cyan-800',
    STORED: 'border-violet-200 bg-violet-50 text-violet-800',
    TRANSFERRED: 'border-amber-200 bg-amber-50 text-amber-800',
    REVIEWED: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    RESTRICTED: 'border-rose-200 bg-rose-50 text-rose-800',
  }

  return classes[status]
}

const getVerificationStatusLabel = (status: VerificationStatus) => {
  const labels: Record<VerificationStatus, string> = {
    NOT_VERIFIED: 'Not verified',
    PENDING: 'Pending',
    VERIFIED: 'Verified',
    VERIFICATION_UNAVAILABLE: 'Verification unavailable',
  }

  return labels[status]
}

const getVerificationStatusClassName = (status: VerificationStatus) => {
  const classes: Record<VerificationStatus, string> = {
    NOT_VERIFIED: 'border-slate-200 bg-slate-100 text-slate-700',
    PENDING: 'border-amber-200 bg-amber-50 text-amber-800',
    VERIFIED: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    VERIFICATION_UNAVAILABLE: 'border-slate-200 bg-slate-100 text-slate-600',
  }

  return classes[status]
}

const getTransferStatusLabel = (status: EvidenceTransfer['status']) => {
  const labels: Record<EvidenceTransfer['status'], string> = {
    PENDING: 'Pending',
    COMPLETED: 'Completed',
    REVIEWED: 'Reviewed',
    REJECTED: 'Rejected',
  }

  return labels[status]
}

const getTransferStatusClassName = (status: EvidenceTransfer['status']) => {
  const classes: Record<EvidenceTransfer['status'], string> = {
    PENDING: 'border-amber-200 bg-amber-50 text-amber-800',
    COMPLETED: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    REVIEWED: 'border-violet-200 bg-violet-50 text-violet-800',
    REJECTED: 'border-rose-200 bg-rose-50 text-rose-800',
  }

  return classes[status]
}

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))

const DEMO_SUPPORTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

const DEMO_SUPPORTED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.xls', '.xlsx']

const DEMO_MAX_FILE_SIZE = 10 * 1024 * 1024

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const isFileTypeSupported = (file: File): boolean => {
  const extension = '.' + file.name.split('.').pop()?.toLowerCase()
  return DEMO_SUPPORTED_EXTENSIONS.includes(extension) || DEMO_SUPPORTED_TYPES.includes(file.type)
}

const LoadingState = () => (
  <div className="rounded-md border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
    Loading evidence records…
  </div>
)

const ErrorState = () => (
  <div className="rounded-md border border-red-200 bg-red-50 p-10 text-center">
    <p className="text-sm font-medium text-red-700">Evidence data unavailable</p>
    <p className="mt-2 text-sm text-red-600">
      This is a placeholder UI state for future backend integration.
    </p>
  </div>
)

const EmptyState = () => (
  <div className="rounded-md border border-slate-200 bg-slate-50 p-10 text-center">
    <p className="text-lg font-semibold text-slate-800">No evidence records found</p>
    <p className="mt-2 text-sm text-slate-600">
      The current search or filters did not match any demo evidence records.
    </p>
  </div>
)

const FileSelectionSection = ({
  selectedFile,
  validationMessage,
  onFileSelect,
  onClearFile,
  onUploadDemo,
}: {
  selectedFile: File | null
  validationMessage: string | null
  onFileSelect: (file: File) => void
  onClearFile: () => void
  onUploadDemo: () => void
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (!file) return

    onFileSelect(file)
  }

  return (
    <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
        Evidence File
      </h4>
      <p className="mt-2 text-sm text-slate-600">
        Select a demonstration file to preview client-side validation.
      </p>

      <div className="mt-4 rounded-md border border-slate-200 bg-white p-4">
        {!selectedFile ? (
          <div className="text-center">
            <p className="text-sm font-medium text-slate-900">No file selected</p>
            <p className="mt-1 text-xs text-slate-600">
              Upload a file to see client-side validation in action.
            </p>
            <label className="mt-3 inline-block">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept={DEMO_SUPPORTED_EXTENSIONS.join(',')}
                className="hidden"
                aria-label="Select evidence file"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                Browse for file
              </button>
            </label>
          </div>
        ) : (
          <div>
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-sm font-medium text-emerald-900">{selectedFile.name}</p>
              <dl className="mt-2 grid gap-2 sm:grid-cols-2 text-xs text-emerald-700">
                <div>
                  <dt className="font-medium">File type:</dt>
                  <dd>{selectedFile.type || 'Unknown'}</dd>
                </div>
                <div>
                  <dt className="font-medium">File size:</dt>
                  <dd>{formatFileSize(selectedFile.size)}</dd>
                </div>
                {selectedFile.lastModified && (
                  <div className="sm:col-span-2">
                    <dt className="font-medium">Last modified:</dt>
                    <dd>
                      {new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(selectedFile.lastModified))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={onUploadDemo}
                className="flex-1 rounded-md border border-sky-600 bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
              >
                Upload Evidence File
              </button>
              <button
                type="button"
                onClick={onClearFile}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                Clear selection
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2 rounded-md border border-slate-200 bg-white p-3">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-600">
          Supported formats (demo validation only)
        </p>
        <p className="text-sm text-slate-700">PDF, JPG, PNG, DOC, DOCX, XLS, XLSX</p>
        <p className="text-sm text-slate-700">Maximum demo file size: 10 MB</p>
        <p className="mt-2 border-t border-slate-200 pt-2 text-xs text-slate-600">
          Client-side validation is for usability only. Server-side validation, authorization, and
          secure storage will be enforced by the backend.
        </p>
      </div>

      {validationMessage && (
        <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
          <p className="text-sm text-amber-800">{validationMessage}</p>
        </div>
      )}
    </section>
  )
}

const ChainOfCustodySection = ({ evidence }: { evidence: Evidence }) => {
  const custodyLoading = false
  const custodyError = false

  const custodyEvents = useMemo(() => {
    return [...evidenceTransferRecords]
      .filter((item) => item.evidenceId === evidence.id)
      .sort((left, right) => new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime())
  }, [evidence.id])

  const latestEvent = custodyEvents[custodyEvents.length - 1] ?? null
  const currentCustodian = latestEvent?.toLabel ?? 'Demo custodian unavailable'

  if (custodyLoading) {
    return (
      <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
          Chain of Custody
        </h4>
        <p className="mt-3 text-sm text-slate-600">Fictional transfer history for demonstration purposes.</p>
        <div className="mt-4 rounded-md border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600">
          Loading custody history...
        </div>
      </section>
    )
  }

  if (custodyError) {
    return (
      <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
          Chain of Custody
        </h4>
        <p className="mt-3 text-sm text-slate-600">Fictional transfer history for demonstration purposes.</p>
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
          Unable to load custody history. Backend integration is not yet connected.
        </div>
      </section>
    )
  }

  if (custodyEvents.length === 0) {
    return (
      <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
          Chain of Custody
        </h4>
        <p className="mt-3 text-sm text-slate-600">Fictional transfer history for demonstration purposes.</p>
        <div className="mt-4 rounded-md border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">No custody history available</p>
          <p className="mt-2 text-slate-600">
            Custody records will appear here when the evidence-management backend is connected.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
            Chain of Custody
          </h4>
          <p className="mt-2 text-sm text-slate-600">
            Fictional transfer history for demonstration purposes.
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-right">
          <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Current Custodian</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{currentCustodian}</p>
        </div>
      </div>

      <div className="relative mt-5 space-y-4 before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
        {custodyEvents.map((event, index) => {
          const isLatest = index === custodyEvents.length - 1

          return (
            <div
              key={event.id}
              className={`relative rounded-md border p-4 pl-12 ${
                isLatest
                  ? 'border-sky-200 bg-sky-50 shadow-sm'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="absolute left-0 top-4 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-semibold text-slate-700">
                {isLatest ? 'L' : index + 1}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-900">{event.action}</p>
                  {isLatest && (
                    <span className="mt-1 inline-flex rounded-full border border-sky-200 bg-sky-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-700">
                      Latest event
                    </span>
                  )}
                </div>
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getTransferStatusClassName(
                    event.status,
                  )}`}
                >
                  {getTransferStatusLabel(event.status)}
                </span>
              </div>

              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Date and time</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{formatDateTime(event.timestamp)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Location</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{evidence.locationLabel}</dd>
                </div>
                {event.fromLabel ? (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">From</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-900">{event.fromLabel}</dd>
                  </div>
                ) : null}
                {event.toLabel ? (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">To</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-900">{event.toLabel}</dd>
                  </div>
                ) : null}
                <div className="sm:col-span-2">
                  <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Transfer type</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{event.action}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Description</dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-700">{event.notes}</dd>
                </div>
              </dl>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const DetailPlaceholder = ({
  evidence,
  verificationNotice,
  onVerifyMock,
}: {
  evidence: Evidence
  verificationNotice: string | null
  onVerifyMock: () => void
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileValidationMessage, setFileValidationMessage] = useState<string | null>(null)
  const [uploadDemoMessage, setUploadDemoMessage] = useState<string | null>(null)

  const verificationDisabled =
    evidence.verificationStatus === 'VERIFIED' || evidence.verificationStatus === 'VERIFICATION_UNAVAILABLE'

  const handleFileSelect = (file: File) => {
    setUploadDemoMessage(null)

    if (!isFileTypeSupported(file)) {
      setFileValidationMessage(
        `Unsupported file type. Accepted formats: ${DEMO_SUPPORTED_EXTENSIONS.join(', ')}`,
      )
      setSelectedFile(null)
      return
    }

    if (file.size > DEMO_MAX_FILE_SIZE) {
      setFileValidationMessage(`File exceeds the 10 MB demo limit.`)
      setSelectedFile(null)
      return
    }

    setFileValidationMessage('File selected for demonstration.')
    setSelectedFile(file)
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    setFileValidationMessage(null)
    setUploadDemoMessage(null)
  }

  const handleUploadDemo = () => {
    setUploadDemoMessage(
      'Demo only — no file was uploaded or stored. Real uploads and storage will be implemented by the backend.',
    )
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Evidence Detail
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{evidence.title}</h3>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getEvidenceStatusClassName(
            evidence.status,
          )}`}
        >
          {getEvidenceStatusLabel(evidence.status)}
        </span>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)]">
        <div className="space-y-6">
          <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
              Evidence information
            </h4>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Evidence ID</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{evidence.id}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Evidence type</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {getEvidenceTypeLabel(evidence.evidenceType)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Status</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {getEvidenceStatusLabel(evidence.status)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Collection date</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {formatDate(evidence.collectedAt)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Description</dt>
                <dd className="mt-1 text-sm leading-6 text-slate-700">{evidence.description}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
              Case association
            </h4>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Case ID</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{evidence.caseId}</dd>
              </div>
            </dl>
          </section>

          <ChainOfCustodySection evidence={evidence} />

          <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
              File information
            </h4>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">File name</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{evidence.fileName}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">File size</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{evidence.fileSize}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-slate-500">MIME type</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{evidence.mimeType}</dd>
              </div>
            </dl>
          </section>

          <FileSelectionSection
            selectedFile={selectedFile}
            validationMessage={fileValidationMessage}
            onFileSelect={handleFileSelect}
            onClearFile={handleClearFile}
            onUploadDemo={handleUploadDemo}
          />
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
              Verification
            </h4>
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getVerificationStatusClassName(
                  evidence.verificationStatus,
                )}`}
              >
                {getVerificationStatusLabel(evidence.verificationStatus)}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Demo only — verification is not performed in the browser.
            </p>

            <button
              type="button"
              onClick={onVerifyMock}
              disabled={verificationDisabled}
              className={`mt-4 inline-flex w-full items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-200 ${
                verificationDisabled
                  ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                  : 'border-sky-600 bg-sky-600 text-white hover:bg-sky-700'
              }`}
            >
              {verificationDisabled ? 'Verification unavailable' : 'Verify Evidence'}
            </button>

            {verificationNotice && (
              <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {verificationNotice}
              </p>
            )}
          </section>

          <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
              Upload Status
            </h4>
            {uploadDemoMessage ? (
              <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
                <p className="text-sm text-amber-800">{uploadDemoMessage}</p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-600">
                Select a file above to preview demo file handling.
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  )
}

const EvidencePage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedType, setSelectedType] = useState<EvidenceType | 'ALL'>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<EvidenceStatus | 'ALL'>('ALL')
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState<
    VerificationStatus | 'ALL'
  >('ALL')
  const [selectedCaseId, setSelectedCaseId] = useState('ALL')
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null)
  const [verificationNotice, setVerificationNotice] = useState<string | null>(null)
  const [isLoading] = useState(false)
  const [hasError] = useState(false)

  const caseOptions = useMemo(
    () => ['ALL', ...new Set(evidenceRecords.map((item) => item.caseId))],
    [],
  )

  const filteredEvidence = useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    return evidenceRecords.filter((item) => {
      const matchesSearch =
        query.length === 0 ||
        item.id.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.caseId.toLowerCase().includes(query) ||
        item.evidenceType.toLowerCase().includes(query) ||
        item.fileName.toLowerCase().includes(query)

      const matchesType = selectedType === 'ALL' || item.evidenceType === selectedType
      const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus
      const matchesVerification =
        selectedVerificationStatus === 'ALL' || item.verificationStatus === selectedVerificationStatus
      const matchesCase = selectedCaseId === 'ALL' || item.caseId === selectedCaseId

      return matchesSearch && matchesType && matchesStatus && matchesVerification && matchesCase
    })
  }, [searchValue, selectedType, selectedStatus, selectedVerificationStatus, selectedCaseId])

  const selectedEvidence =
    selectedEvidenceId === null
      ? null
      : filteredEvidence.find((item) => item.id === selectedEvidenceId) ??
        evidenceRecords.find((item) => item.id === selectedEvidenceId) ??
        null

  const hasPanelOpen = selectedEvidence !== null

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
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span>Investigation records</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-600">
              Demo data — fictional records
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Evidence</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            This area contains evidence records associated with investigation cases and supporting case
            material.
          </p>
        </header>

        {!hasPanelOpen ? (
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-4 border-b border-slate-200 pb-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))]">
              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Search
                </span>
                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search evidence by ID, title, case or file"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  aria-label="Search evidence records"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Evidence type
                </span>
                <select
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value as EvidenceType | 'ALL')}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  aria-label="Filter by evidence type"
                >
                  {evidenceTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'ALL' ? 'All types' : getEvidenceTypeLabel(option)}
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
                  onChange={(event) => setSelectedStatus(event.target.value as EvidenceStatus | 'ALL')}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  aria-label="Filter by evidence status"
                >
                  {evidenceStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'ALL' ? 'All statuses' : getEvidenceStatusLabel(option)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Verification
                </span>
                <select
                  value={selectedVerificationStatus}
                  onChange={(event) =>
                    setSelectedVerificationStatus(event.target.value as VerificationStatus | 'ALL')
                  }
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  aria-label="Filter by verification status"
                >
                  {verificationStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'ALL' ? 'All verification' : getVerificationStatusLabel(option)}
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

            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setSearchValue('')
                  setSelectedType('ALL')
                  setSelectedStatus('ALL')
                  setSelectedVerificationStatus('ALL')
                  setSelectedCaseId('ALL')
                }}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                Reset filters
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
              <div className="overflow-x-auto">
                {filteredEvidence.length === 0 ? (
                  <EmptyState />
                ) : (
                  <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Evidence ID
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
                          Collected
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Status
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                          Verification
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
                      {filteredEvidence.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.id}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">{item.title}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            {getEvidenceTypeLabel(item.evidenceType)}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">{item.caseId}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            {formatDate(item.collectedAt)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getEvidenceStatusClassName(
                                item.status,
                              )}`}
                            >
                              {getEvidenceStatusLabel(item.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getVerificationStatusClassName(
                                item.verificationStatus,
                              )}`}
                            >
                              {getVerificationStatusLabel(item.verificationStatus)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">{item.fileName}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => setSelectedEvidenceId(item.id)}
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
              onClick={() => setSelectedEvidenceId(null)}
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Back to Evidence
            </button>
            {selectedEvidence ? (
              <DetailPlaceholder
                evidence={selectedEvidence}
                verificationNotice={verificationNotice}
                onVerifyMock={() =>
                  setVerificationNotice(
                    'Verification will be available when backend verification services are connected.',
                  )
                }
              />
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="text-xl font-semibold text-slate-900">No evidence selected</p>
                <p className="mt-2 text-sm text-slate-600">
                  Return to the Evidence list to select an evidence record.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedEvidenceId(null)}
                  className="mt-4 inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  Back to Evidence
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

export default EvidencePage
