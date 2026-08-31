/**
 * Custom application error type for SIMS API.
 * Extends Error to provide HTTP status codes and clear error categorization.
 *
 * Usage:
 *   throw new AppError('Case not found', 404)
 *   throw new AppError('Unauthorized', 401)
 *   throw new AppError('Internal server error', 500)
 */
export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'AppError'

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

/**
 * Type guard to check if an error is an AppError instance
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}
