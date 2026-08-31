// Utilities documentation for SIMS API

/**
 * asyncHandler.ts
 * Wrapper function for async route handlers.
 * Automatically catches promise rejections and forwards to error middleware.
 * Eliminates need for try-catch in every async route.
 *
 * Usage:
 * router.get('/cases', asyncHandler(async (req, res) => {
 *   const cases = await getCases()
 *   sendSuccess(res, cases)
 * }))
 *
 * Without asyncHandler, unhandled promise rejections would bypass the error handler.
 */

/**
 * error.ts
 * Custom AppError class for application errors.
 * Extends Error to include HTTP status codes.
 *
 * Usage:
 * throw new AppError('Case not found', 404)
 * throw new AppError('Unauthorized', 401)
 *
 * The error handler middleware catches AppError and returns appropriate HTTP responses.
 */

/**
 * response.ts
 * Standardized response formatting utilities.
 *
 * sendSuccess(res, data, statusCode)
 * Returns: { success: true, data: {...} }
 *
 * sendError(res, message, statusCode, requestId, isDevelopment, stack)
 * Returns: { success: false, error: { message, requestId, stack (dev only) } }
 *
 * All endpoints should use these functions for consistent response format.
 */
