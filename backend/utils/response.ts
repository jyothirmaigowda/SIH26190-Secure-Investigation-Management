import { Response } from 'express'

/**
 * Standardized success response format for the SIMS API.
 * All successful endpoints should return data wrapped in this format.
 *
 * @param res Express response object
 * @param data The response payload
 * @param statusCode HTTP status code (default: 200)
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200
): Response {
  return res.status(statusCode).json({
    success: true,
    data,
  })
}

/**
 * Standardized error response format for the SIMS API.
 * All errors should return data wrapped in this format.
 * In production, stack traces must never be included.
 *
 * @param res Express response object
 * @param message User-friendly error message
 * @param statusCode HTTP status code (default: 500)
 * @param requestId Request tracking ID for debugging
 * @param isDevelopment Include stack trace only if true
 * @param stack Stack trace (only included if isDevelopment is true)
 */
export function sendError(
  res: Response,
  message: string,
  statusCode: number = 500,
  requestId?: string,
  isDevelopment: boolean = false,
  stack?: string
): Response {
  const errorObject: Record<string, unknown> = {
    message,
    ...(requestId && { requestId }),
  }

  // Only include stack traces in development
  if (isDevelopment && stack) {
    errorObject.stack = stack
  }

  const response = {
    success: false,
    error: errorObject,
  }

  return res.status(statusCode).json(response)
}
