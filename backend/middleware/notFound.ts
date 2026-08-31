import { Request, Response } from 'express'
import { sendError } from '../utils/response.js'

/**
 * 404 Not Found middleware for the SIMS API.
 * Catches all requests that did not match any route and returns a JSON error.
 * Must be registered after all other routes.
 *
 * Returns:
 * - 404 status code
 * - JSON error response (not HTML)
 * - Request ID from requestIdMiddleware
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  const requestId = (req as any).id || 'unknown'
  sendError(
    res,
    `Route not found: ${req.method} ${req.originalUrl}`,
    404,
    requestId,
    false
  )
}
