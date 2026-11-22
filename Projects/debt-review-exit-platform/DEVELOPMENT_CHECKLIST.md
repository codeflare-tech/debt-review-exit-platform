# DEVELOPMENT CHECKLIST

## Foundation — complete
- [x] Environment scan (Node, npm, PG, Docker)
- [x] PostgreSQL 18 cluster healthy (debtreview DB, debtuser/debtpass)
- [x] Reused `digital-wallet` Next.js 16 + React 19 stack; Tailwind downgraded to v3 for stable builds
- [x] `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore` in place
- [x] Prisma schema authored (30 models, roles, permissions, relations)
- [x] Prisma Client generated (`@prisma/client`)
- [x] `prisma migrate dev` applied; DB in sync (34 tables)
- [x] `.env` + `.env.example` written (secrets redacted)
- [x] Idempotent seed script with RBAC links (`npx tsx prisma/seed.ts`)
- [x] Prisma client singleton + typed data-access layer
- [x] Design system: tokens, Tailwind config, reusable UI primitives

## Backend — complete (interfaces)
- [x] Session + auth helpers (bcrypt, HMAC session tokens, lockout)
- [x] Zod validation schemas
- [x] Auth API routes: register, login, logout, session
- [x] Eligibility API (honest preliminary outcome)
- [x] Contact API (validates; email delivery pending config)
- [x] Audit logging on auth + eligibility events
- [x] robots.ts + sitemap.ts + metadataBase

## Frontend
- [x] Public layout (header/footer) + flagship homepage + 404
- [x] Favicon + Open Graph image
- [x] Public pages: how-it-works, packages, eligibility, about, FAQ, contact, legal
- [x] Client portal: auth, dashboard, case, documents, messages, profile (at /portal/*)
- [x] Admin dashboard: overview, cases, clients, docs, users, packages, finance, reports, settings (at /admin/*)

## Verification
- [x] `npx next build` passes (38 static pages; 6 API routes)
- [x] Auth APIs verified end-to-end against real DB (register → login → 409 duplicate)
- [x] `npx prisma validate` / `generate` pass; seed runs clean
- [ ] Full browser walkthrough (desktop + mobile) of all routes
- [ ] Wire portal/admin demo controls to live DB mutations
- [ ] RBAC enforced on every protected route + API
- [ ] Automated tests: auth, client flow, admin, security, business workflow
- [ ] Legal/business approval gates (see PRODUCTION_READINESS.md §7)

## Rollback discipline
- After each phase, confirm `npx next build` still passes before proceeding.
- Tailwind CSS is generated via CLI into `src/app/tailwind.css` — regenerate after any page/JSX change:
  `node node_modules/tailwindcss/lib/cli.js -c tailwind.config.mjs -i tailwind.input.css -o src/app/tailwind.css`
- The portal/admin pages are labelled demo previews until live auth + DB wiring is complete.
