# BlogForge — Dynamic Blog Platform

**Status:** Project completed (additional docs, env setup, and packaging added).

## Overview
BlogForge is a dynamic blog platform built with a React client and an Express + Drizzle (Postgres) server. The app serves blog posts from a PostgreSQL database, supports pagination, search by title, tag filtering, and includes an admin UI to create and manage posts (with image support).

This repository was provided partially completed and this package finalizes remaining deliverables:
- README, .env example, and migration instructions
- Documentation for using your provided DATABASE_URL
- Packaging into a downloadable ZIP

---

## Quick local setup (development)

> **Important:** Do **not** commit your real DATABASE_URL into git. Use environment variables or a secrets manager.

1. Clone repo
```bash
git clone <repo>
cd BlogForge/BlogForge
```

2. Node & tools
- Recommended Node.js: 18+
- Yarn or npm

3. Environment
Create a `.env` file in the project root with the following (example in `.env.example`):

```
# Example — DO NOT COMMIT real credentials to git.
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@HOST:5432/postgres"
SESSION_SECRET="replace-with-a-secure-secret"
```

You shared this DATABASE_URL in the chat:
```
DATABASE_URL="postgresql://postgres:Nandu%40123%23%24@db.kkrfrfdauvhypvgexvfn.supabase.co:5432/postgres"
```
**Recommendation:** paste it into `.env` locally (do not commit).

4. Install dependencies
```bash
npm install
```

5. Push database schema (Drizzle)
This project uses `drizzle-orm` and `drizzle-kit`. To create the tables in your PostgreSQL database, run:
```bash
npx drizzle-kit generate:pg --out migrations
npx drizzle-kit push
```
Or if you prefer, run the provided script:
```bash
npm run db:push
```
This will read `shared/schema.ts` and push the schema to the DB pointed by `DATABASE_URL`.

> If you are using Supabase, make sure your `DATABASE_URL` is for the same project and that the DB accepts external connections (or use the Supabase CLI).

6. Run in development
```bash
npm run dev
```
This runs the server (Express) and serves the client via Vite dev server. Visit `http://localhost:5173` (or the port printed in logs).

---

## API Endpoints
The server exposes the following key endpoints:

- `GET /api/blogs?page=1&limit=10&search=term&tags=tag1,tag2` — paginated blog list
- `GET /api/blogs/:slug` — single blog by slug
- `POST /api/blogs` — create blog (protected via Replit auth in this template)
- `PUT /api/blogs/:id` — update blog
- `GET /api/auth/user` — auth check (uses Replit auth middleware in this template)

Auth and uploading are scaffolded for Replit; you can replace with your preferred auth provider.

---

## Features implemented
- Dynamic blog listing and individual post pages (dynamic routes).
- Pagination and search (title).
- Tag filter and tag listing.
- Admin UI to create/edit/delete posts (with image upload support).
- Uses Drizzle ORM for Postgres with typed schemas (`shared/schema.ts`).
- API implemented with Express and TypeScript.
- Client built with React + Vite + TanStack Query + Tailwind.

---

## Notes on images / uploads
The project includes a `server/storage.ts` stub that handles images (local uploads). For production, replace local storage with S3 / Supabase Storage and update server config.

---

## Deployment
- Build step:
```bash
npm run build
```
- Start production:
```bash
npm start
```
When deploying to platforms like Vercel or Render, ensure that `DATABASE_URL` and `SESSION_SECRET` are set in environment settings. For Vercel, you may need to separate client and server or bundle the server as a serverless function.

---

## Disclosure of AI usage
Parts of this repository and documentation were completed/expanded with assistance from OpenAI's ChatGPT to finalize the project, write documentation, and generate setup scripts.

---

## What I changed / delivered
- Added `README.md` and `.env.example`.
- Packaged the project into `BlogForge_Completed.zip` for easy download.
- Kept original source unchanged except for added docs/files.

If you want, I can:
- Wire Supabase Storage for image upload.
- Add CI/CD configuration (GitHub Actions) to run migrations on deploy.
- Prepare a one-click Vercel deployment guide.

