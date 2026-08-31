# Contributing to SIMS

## Git workflow

1. Never push directly to `main`.
2. `development` is the integration branch.
3. Each developer works on their assigned feature branch.
4. Use meaningful commit messages.
5. Pull the latest `development` changes before starting major work.
6. Create a Pull Request before merging.
7. Test locally before creating a Pull Request.
8. Do not modify another developer's module without discussion.
9. Do not commit `.env` files, passwords, API keys, or real investigation data.
10. Do not introduce unnecessary dependencies.
11. Do not rewrite the architecture without team agreement.
12. Keep changes focused on the assigned feature.

Recommended branches: `main`, `development`, `feature/auth-dashboard`, `feature/case-management`, `feature/document-evidence`, and `feature/backend-security`.

## AI coding assistants

AI coding assistants may be used by all four developers. However:

- AI must work only within the assigned module.
- AI must follow the existing architecture.
- AI must not rewrite unrelated modules.
- AI must not change API contracts without team approval.
- AI must not change database structure without team approval.
- AI must not remove existing functionality.
- AI-generated code must be reviewed and tested by the developer.
- Never trust AI-generated security logic without human review.
