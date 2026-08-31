# Database foundation

Prisma's schema is intentionally located at `schema/schema.prisma`, matching the shared `database/schema/` structure. Use the package scripts in this directory so Prisma is always given that explicit schema path.

Before migrations or client generation, copy the root `.env.example` to an ignored local `.env` file and set a PostgreSQL `DATABASE_URL`. The final models, migrations, and seed data are team decisions and have not been created.

Never use real investigation data in development.
