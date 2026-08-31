import { Router } from 'express'
import { createV1Router } from './v1/index.js'

/**
 * Root API router for SIMS.
 * Manages API versioning and routes all requests to the appropriate version handler.
 *
 * Current versions:
 * - v1 - Initial API version with health check and placeholder routes
 *
 * Routing structure:
 * /api/v1/ - All v1 endpoints
 *
 * Future: Add v2 and later versions without breaking existing clients.
 */
export function createApiRouter(): Router {
  const router = Router()

  // API v1 routes
  router.use('/v1', createV1Router())

  // TODO: Future versions
  // router.use('/v2', createV2Router())

  return router
}
