import { Request, Response, NextFunction } from 'express'

/**
 * Wraps async route handlers to automatically catch and forward errors to the error handler.
 * Eliminates the need for try-catch blocks in every async route.
 *
 * Usage:
 *   router.get('/cases', asyncHandler(async (req, res) => {
 *     const cases = await fetchCases() // If throws, error is caught and forwarded
 *     sendSuccess(res, cases)
 *   }))
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
