import type { Router } from 'express'

export type RouteRegistrar = (router: Router) => void

/**
 * Small registry helper for future API modules.
 * It keeps route registration consistent and avoids hard-coding module wiring in each file.
 */
export function registerRoutes(
  router: Router,
  ...registrars: RouteRegistrar[]
): Router {
  for (const register of registrars) {
    register(router)
  }

  return router
}
