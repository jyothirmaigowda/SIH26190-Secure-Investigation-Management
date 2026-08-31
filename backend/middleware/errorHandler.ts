import { Request, Response, NextFunction } from 'express'
import { AppError, isAppError } from '../utils/error.js'
import { sendError } from '../utils/response.js'

/**
 * Central error-handling middleware for SIMS API.
 * Catches all errors from routes and converts them to standardized JSON responses.
 * Must be registered last, after all other middleware and route handlers.
 *
 * Behavior:
 * - Known AppError instances are returned with their statusCode and message
 * - Unknown errors are logged and returned as 500 Internal Server Error
 * - Stack traces are only included in development mode
 * - All responses include the request ID from the requestIdMiddleware
 */
export function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const requestId = (_req as any).id || 'unknown'

  // Handle known application errors
  if (isAppError(err)) {
    sendError(res, err.message, err.statusCode, requestId, isDevelopment, err.stack)
    return
  }

  // Handle unknown errors
  console.error('Unhandled error:', err)

  sendError(
    res,
    'Internal server error',
    500,
    requestId,
    isDevelopment,
    isDevelopment ? err.stack : undefined
  )
}
