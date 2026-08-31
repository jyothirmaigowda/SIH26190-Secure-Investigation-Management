// Routes documentation for SIMS API

/**
 * File structure:
 *
 * routes/
 *   ├── index.ts          - API versioning and root router
 *   └── v1/
 *       ├── index.ts      - V1 endpoint aggregator
 *       ├── health.ts     - Health check endpoint
 *       ├── auth.ts       - (TODO) Authentication endpoints
 *       ├── cases.ts      - (TODO) Case management endpoints
 *       ├── documents.ts  - (TODO) Document management endpoints
 *       ├── evidence.ts   - (TODO) Evidence management endpoints
 *       └── audit.ts      - (TODO) Audit log endpoints
 */

/**
 * API versioning strategy:
 * - All routes are namespaced under /api/v1, /api/v2, etc.
 * - This allows multiple API versions to coexist without breaking clients
 * - Each version is implemented in its own directory (v1/, v2/, etc.)
 * - Future: Add v2, v3, etc. without removing v1
 *
 * Example URLs:
 * - GET  /api/v1/health
 * - GET  /api/v1/cases
 * - POST /api/v1/cases
 * - GET  /api/v1/cases/:id
 * - POST /api/v1/auth/login
 */

/**
 * Router creation pattern:
 *
 * export function createV1Router(): Router {
 *   const router = Router()
 *   router.use('/health', createHealthRouter())
 *   router.use('/cases', createCasesRouter())
 *   // ... more routes
 *   return router
 * }
 *
 * Benefits:
 * - Each route module is independently testable
 * - Clear separation of concerns
 * - Easy to add/remove entire route groups
 * - Routes can be conditionally loaded based on features or environments
 */
