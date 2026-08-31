import { Request, Response, NextFunction } from 'express'

/**
 * Security headers middleware for SIMS API.
 * Adds essential security headers to all responses without requiring external packages.
 *
 * Headers set:
 * - X-Content-Type-Options: Prevents MIME type sniffing
 * - X-Frame-Options: Prevents clickjacking
 * - X-XSS-Protection: Legacy browser XSS protection
 * - Strict-Transport-Security: Enforces HTTPS (only in production)
 * - Cache-Control: Prevents sensitive data caching
 */
export function securityHeadersMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  // Prevent MIME type sniffing attacks
  res.setHeader('X-Content-Type-Options', 'nosniff')

  // Prevent clickjacking attacks
  res.setHeader('X-Frame-Options', 'DENY')

  // Legacy XSS protection (modern browsers use CSP)
  res.setHeader('X-XSS-Protection', '1; mode=block')

  // Prevent caching of sensitive responses
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
  )

  // Enforce HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  next()
}
