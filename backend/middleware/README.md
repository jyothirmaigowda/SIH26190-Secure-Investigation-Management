// Middleware documentation for SIMS API

/**
 * errorHandler.ts
 * Central error-handling middleware for all application errors.
 * Must be registered last after all routes and other middleware.
 * Converts exceptions to standardized JSON error responses.
 * Hides stack traces in production for security.
 *
 * errorHandlerMiddleware(err, req, res, next)
 */

/**
 * notFound.ts
 * Catches all requests that don't match any route.
 * Returns JSON 404 error instead of HTML.
 * Must be registered after all routes but before error handler.
 *
 * notFoundMiddleware(req, res)
 */

/**
 * requestId.ts
 * Attaches a unique ID to each request for debugging and log correlation.
 * Generates new UUID if X-Request-ID header is not provided.
 * ID is included in all error responses and available in handlers via req.id.
 *
 * requestIdMiddleware(req, res, next)
 */

/**
 * securityHeaders.ts
 * Adds essential security headers to all HTTP responses.
 * Headers prevent:
 * - MIME type sniffing (X-Content-Type-Options)
 * - Clickjacking attacks (X-Frame-Options)
 * - XSS attacks (X-XSS-Protection, Cache-Control)
 * - Enforces HTTPS in production (Strict-Transport-Security)
 *
 * securityHeadersMiddleware(req, res, next)
 */
