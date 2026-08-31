# API contracts (initial placeholders)

These are initial route contracts only. Request and response shapes, error conventions, authentication details, and pagination are TODOs for team agreement before implementation.

## Authentication
- `POST /api/auth/login`

## Cases
- `GET /api/cases`
- `GET /api/cases/:id`
- `POST /api/cases`
- `PUT /api/cases/:id`

## Documents
- `GET /api/cases/:id/documents`
- `POST /api/documents`
- `GET /api/documents/:id`

## Evidence
- `GET /api/cases/:id/evidence`
- `POST /api/evidence`
- `GET /api/evidence/:id`
- `POST /api/evidence/:id/verify`

## Audit
- `GET /api/cases/:id/audit`

Use consistent plural resource names and route parameters. Any contract change requires team approval.
