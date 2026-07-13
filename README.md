# PNGcheckr — click-through demo (formerly Attestli)

A demo web app for **PNGcheckr**, a PNG employment-verification pitch product. Built for a
boss-meeting walkthrough: every candidate, check result, and email is fictional and fully
scripted (nothing is computed or randomized), but the stack underneath is real — an Express
API backed by a real Postgres database via Drizzle ORM, not a static mock file.

## Stack

- Frontend: React 18 + TypeScript + Vite + Tailwind (v3) + react-router-dom
- Backend: Express 5 + Drizzle ORM + `pg` (Postgres driver), served from the same process as
  the built frontend (`server/index.ts` serves `dist/` and the `/api/*` routes)
- Shared UI primitives (`button`, `card`, `input`, `label`, `badge`) copied from Preventli's
  shadcn setup and re-themed to PNGcheckr's palette (navy / teal / gold / coral)

## Local setup

1. `npm install`
2. Get a Postgres instance running and set `DATABASE_URL` — see `.env.example` for both a
   Docker option and a native-Postgres option. Copy it to `.env`.
3. `npm run db:push` — pushes the schema (Drizzle) to your database.
4. `npm run db:seed` — inserts the 3 fictional candidates and their scripted outcomes.
5. `npm run dev` — runs Vite (port 5173) and the API (port 3001) together; Vite proxies
   `/api/*` to the API in dev.

## Routes

- `/` — landing page, pipeline explainer, roadmap banner
- `/employer` — request + full result view (checks, evidence, email timeline)
- `/candidate` — verdict-only badge lookup by name or reference code
- `/verify/:code` — same verdict-only view, reached via direct link (simulates a QR scan)

## Production

`npm run build` builds the frontend into `dist/`. `npm run start` runs the Express server,
which serves both the API and the built frontend from one process — this is what Render (see
`render.yaml`) runs in production.

## Fictional entities used throughout

Talasi Bridge Recruitment (recruiter), Marowa Resources Ltd (employer client), Bureau of Civil
Records & Clearance / BCRC (police-clearance stand-in), Companies & Credentials Registry / CCR
(credential registry stand-in), Andrea Reyes (signatory). No real PNG organizations are
referenced anywhere in this repo.
