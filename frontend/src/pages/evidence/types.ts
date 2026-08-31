export type EvidenceStatus =
  | 'COLLECTED'
  | 'LOGGED'
  | 'STORED'
  | 'TRANSFERRED'
  | 'REVIEWED'
  | 'RESTRICTED'

export type EvidenceType =
  | 'DIGITAL_FILE'
  | 'PHYSICAL_ITEM'
  | 'PHOTOGRAPH'
  | 'VIDEO'
  | 'AUDIO'
  | 'DOCUMENT'

export type VerificationStatus =
  | 'NOT_VERIFIED'
  | 'PENDING'
  | 'VERIFIED'
  | 'VERIFICATION_UNAVAILABLE'

export interface Evidence {
  id: string
  caseId: string
  title: string
  evidenceType: EvidenceType
  status: EvidenceStatus
  collectedAt: string
  locationLabel: string
  description: string
  fileName: string
  fileSize: string
  mimeType: string
  verificationStatus: VerificationStatus
}

export type EvidenceTransferAction =
  | 'Collected'
  | 'Logged'
  | 'Transferred'
  | 'Received'
  | 'Reviewed'

export type EvidenceTransferStatus = 'PENDING' | 'COMPLETED' | 'REVIEWED' | 'REJECTED'

export interface EvidenceTransfer {
  id: string
  evidenceId: string
  timestamp: string
  fromLabel: string
  toLabel: string
  action: EvidenceTransferAction
  notes: string
  status: EvidenceTransferStatus
}
