# SIMS — Secure Investigation Management System

Shared foundation for SIH26190: Secure Digital Document Management for Legal & Investigation Documents.

This repository currently contains only the common structure and team contracts. Feature modules and production integrations will be added on their assigned branches.

## Repository layout

- `frontend/` — presentation layer and future client application.
- `backend/` — API, security, and business-logic layer.
- `database/` — database schema, migrations, and seed artifacts.
- `docs/` — shared architecture, API, database, and team documentation.

## Team workflow

Use `development` as the integration branch and work in the assigned feature branches. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/MODULE_OWNERSHIP.md](docs/MODULE_OWNERSHIP.md) before making changes.

## Current status

No application runtime, dependencies, authentication flow, APIs, or database schema have been created yet. This is intentional: the scaffold is designed for independent implementation without conflicting foundations.
