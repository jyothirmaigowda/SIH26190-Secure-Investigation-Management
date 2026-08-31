import { Router } from 'express'
import { createHealthRouter } from './health.js'
import { registerRoutes } from '../register.js'

/**
 * API v1 router for SIMS.
 * This router aggregates all v1 endpoints.
 *
 * Current endpoints:
 * - GET /api/health - Health check
 *
 * TODO: Add versioned API endpoints as features are implemented:
 * - Authentication endpoints (auth module)
 * - Case management endpoints (cases module)
 * - Document endpoints (documents module)
 * - Evidence endpoints (evidence module)
 * - Audit endpoints (audit module)
 *
 * TODO (team approval required before implementation):
 * - authentication/login design and provider boundary
 * - password hashing strategy and secret-management rules
 * - JWT/session strategy, token lifetime, refresh, and revocation
 * - role-based authorization model for Investigating Officer, Supervisor, and Court/Legal Team
 * - officer/supervisor/legal-team permissions matrix and escalation rules
 * - database schema and Prisma model boundaries
 * - case assignment relationships and ownership rules
 * - document/evidence relationships and metadata retention
 * - file upload/storage, encryption, and retention policy
 * - audit-log persistence and tamper-evident storage
 * - chain-of-custody integrity and evidence validation
 * - AI integration scope, provider selection, and retrieval boundaries
 * - AI safety boundaries: AI may assist with document organization, summarization, extraction, search, or similar approved assistance only; AI must never independently make legal decisions, determine guilt, change case status, approve evidence, alter chain of custody, or authorize access.
 */
export function createV1Router(): Router {
  const router = Router()

  registerRoutes(
    router,
    (v1Router) => {
      v1Router.use('/health', createHealthRouter())
    }
    // TODO: Authentication routes (Member 1)
    // (v1Router) => v1Router.use('/auth', createAuthRouter())
    // TODO: Case management routes (Member 2)
    // (v1Router) => v1Router.use('/cases', createCasesRouter())
    // TODO: Document routes (Member 3)
    // (v1Router) => v1Router.use('/documents', createDocumentsRouter())
    // TODO: Evidence routes (Member 3)
    // (v1Router) => v1Router.use('/evidence', createEvidenceRouter())
    // TODO: Audit routes (Member 4)
    // (v1Router) => v1Router.use('/audit', createAuditRouter())
  )

  return router
}
