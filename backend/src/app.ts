import express from 'express'
import { requestIdMiddleware } from '../middleware/requestId.js'
import { securityHeadersMiddleware } from '../middleware/securityHeaders.js'
import { createApiRouter } from '../routes/index.js'
import { notFoundMiddleware } from '../middleware/notFound.js'
import { errorHandlerMiddleware } from '../middleware/errorHandler.js'
import { sendSuccess } from '../utils/response.js'

/**
 * Express application factory for SIMS API.
 *
 * Middleware pipeline (in order):
 * 1. requestIdMiddleware - Attach unique ID to each request
 * 2. express.json() - Parse JSON request bodies
 * 3. securityHeadersMiddleware - Add security headers to responses
 * 4. API routes - Handle all /api/* requests
 * 5. notFoundMiddleware - Catch unmatched routes with JSON 404
 * 6. errorHandlerMiddleware - Centralized error handling (must be last)
 */
const app = express()

// Disable X-Powered-By header for security (avoid revealing technology stack)
app.disable('x-powered-by')

// Attach unique request ID for debugging and correlation
app.use(requestIdMiddleware)

// Parse incoming JSON request bodies
app.use(express.json())

// Add security headers to all responses
app.use(securityHeadersMiddleware)

// Mount all API routes under /api
app.use('/api', createApiRouter())

// Preserve original /api/health endpoint (backward compatibility)
app.get('/api/health', (_request, response) => {
  sendSuccess(response, {
    status: 'ok',
    service: 'SIMS API',
    timestamp: new Date().toISOString(),
  })
})

// Catch 404 errors and return JSON (must come after all routes)
app.use(notFoundMiddleware)

// Central error handling (must be last middleware)
app.use(errorHandlerMiddleware)

export default app
