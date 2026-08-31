import { Router, Request, Response } from 'express'
import { sendSuccess } from '../../utils/response.js'

/**
 * Health check endpoint for SIMS API.
 * This endpoint must continue working as a basic health indicator.
 *
 * GET /api/health
 * Response: { success: true, data: { status: 'ok', service: 'SIMS API' } }
 */
export function createHealthRouter(): Router {
  const router = Router()

  router.get('/', (_req: Request, res: Response) => {
    sendSuccess(res, {
      status: 'ok',
      service: 'SIMS API',
      timestamp: new Date().toISOString(),
    })
  })

  return router
}
