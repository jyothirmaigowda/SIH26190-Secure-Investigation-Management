import { Router } from 'express'
import { createHealthRouter } from './health.js'

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
 */
export function createV1Router(): Router {
  const router = Router()

  // Health check endpoint
  router.use('/health', createHealthRouter())

  // TODO: Authentication routes (Member 1)
  // router.use('/auth', createAuthRouter())

  // TODO: Case management routes (Member 2)
  // router.use('/cases', createCasesRouter())

  // TODO: Document routes (Member 3)
  // router.use('/documents', createDocumentsRouter())

  // TODO: Evidence routes (Member 3)
  // router.use('/evidence', createEvidenceRouter())

  // TODO: Audit routes (Member 4)
  // router.use('/audit', createAuditRouter())

  return router
}
