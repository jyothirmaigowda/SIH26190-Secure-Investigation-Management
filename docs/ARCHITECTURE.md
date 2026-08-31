# Architecture

```text
Frontend
  ↓
Backend APIs
  ↓
Authorization
  ↓
Database / File Storage / AI services
```

- The frontend is responsible for presentation and user interaction.
- The backend is responsible for business logic and security enforcement.
- The database stores structured application data.
- File storage handles uploaded documents and evidence.
- AI provides assistance and suggestions, not autonomous legal decisions.
- Backend authorization must be enforced server-side.
- Hiding a page or button in the frontend must never be treated as security.
- Passwords must eventually be hashed with bcrypt; they must never be stored in plain text.
- Secrets must remain in ignored environment files and must never be committed.
- Development uses fictional demo data only—never real police, legal, or investigation data.

Technology choices, detailed data flows, and integrations are TODOs for team agreement before implementation.
