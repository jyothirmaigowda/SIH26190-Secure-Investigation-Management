// TODO: Services module (future use)
// This module will contain business logic once feature modules are implemented.
//
// Current status: Empty placeholder for future development
//
// Responsibilities:
// - Database queries and operations (via Prisma)
// - Business logic orchestration
// - Data validation and transformation
// - External service integration
// - Complex algorithms and workflows
//
// Services should NOT:
// - Handle HTTP requests directly (that's controllers' job)
// - Return HTTP responses (return data objects instead)
// - Depend on Express or middleware
// - Handle authentication/authorization (use permissions module)
// - Access req/res objects
//
// Usage pattern (when implemented):
// export async function getCaseService(caseId: string) {
//   const caseData = await prisma.case.findUniqueOrThrow({
//     where: { id: caseId }
//   })
//   return caseData
// }
//
// Key principles:
// - Testable (no Express dependencies)
// - Reusable across controllers and scheduled jobs
// - Clear error types (throw AppError for business errors)
// - Async-first design
// - Single responsibility (one service = one domain concept)
