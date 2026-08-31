export type DocumentStatus =
  | 'DRAFT'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'ARCHIVED'

export type DocumentType =
  | 'CASE_REPORT'
  | 'STATEMENT'
  | 'CORRESPONDENCE'
  | 'PHOTO_LOG'
  | 'EVIDENCE_SUMMARY'
  | 'OTHER'

export interface Document {
  id: string
  caseId: string
  title: string
  documentType: DocumentType
  status: DocumentStatus
  uploadedAt: string
  updatedAt: string
  currentVersion: number
  fileName: string
  fileSize: string
  mimeType: string
  description: string
}

export type DocumentVersionStatus = 'DRAFT' | 'ACTIVE' | 'SUPERSEDED'

export interface DocumentVersion {
  id: string
  documentId: string
  version: number
  createdAt: string
  createdBy: string
  changeSummary: string
  status: DocumentVersionStatus
}
