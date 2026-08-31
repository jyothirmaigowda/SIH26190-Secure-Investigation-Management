import { Request, Response, NextFunction } from 'express'
import { randomUUID } from 'crypto'

/**
 * Request ID middleware for SIMS API.
 * Generates or extracts a unique request ID and attaches it to the request and response.
 * This ID should be included in all error responses for debugging and log correlation.
 *
 * The request ID is stored in:
 * - req.id (accessible in route handlers)
 * - X-Request-ID response header
 * - Error responses (included in JSON error object)
 */
export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Use X-Request-ID header if provided, otherwise generate a new UUID
  const requestId =
    (req.get('X-Request-ID') as string) || randomUUID()

  // Attach to request for use in handlers and error middleware
  ;(req as any).id = requestId

  // Set response header for client to use in follow-up requests
  res.setHeader('X-Request-ID', requestId)

  next()
}

/**
 * Augment Express Request type to include the id property.
 * Add this to your type definitions or use with (req as any).id
 */
declare global {
  namespace Express {
    interface Request {
      id: string
    }
  }
}
