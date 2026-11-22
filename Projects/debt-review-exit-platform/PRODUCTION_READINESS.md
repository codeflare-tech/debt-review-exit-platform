# Production Readiness — Debt Review Exit Platform

**Status: NOT PRODUCTION READY.** This document records what is implemented, what is verified, and the gates that must be cleared before launch. Do not deploy publicly until every item in §6 and §7 is closed.

---

## 1. What has been built

A database-backed platform for a South African debt-review exit assistance business:

- **Public marketing website** — homepage, how-it-works, packages, eligibility check, about, FAQ, contact, and legal/policy pages.
- **Client portal** — login, registration, dashboard, case progress, document centre, messaging, profile.
- **Admin dashboard** — overview, case management, clients, document review, users/RBAC, package configuration, finance/compliance, reporting, settings.
- **Backend** — Next.js App Router route handlers for auth (register/login/logout/session), eligibility submission and contact.
- **Database** — PostgreSQL with a Prisma schema (30 models), migrations and an idempotent seed script.
- **Design system** — premium fintech UI (Tailwind CSS v3) with reusable primitives.
- **SEO/metadata** — sitemap, robots, Open Graph image, favicon.

## 2. Features implemented

- UI shell for all three areas (public, portal, admin) with responsive navigation.
- Interactive eligibility assessment (client-side multi-step form) with honest, preliminary outcomes.
- Registration/login APIs with bcrypt password hashing, email validation, failed-login lockout, audit logging and signed session cookies.
- Package configuration data (3 packages) in a single source of truth.
- Client-side interactive admin/portal controls (filters, tabs, modals, toasts, document review actions) — **demo state only**, not persisted.
- Compliance copy throughout: no guaranteed outcomes, no NCR/bureau/court/bank affiliation, target durations only.

## 3. Database tables & migrations

- 30 Prisma models / 34 physical tables in the `debtreview` database.
- Migrations under `prisma/migrations/`.
- Seed: `npx tsx prisma/seed.ts` (idempotent — lookups by slug/email/natural keys, explicit UUIDs, RBAC links).
- Verified: `prisma validate` and `prisma generate` exit 0; `psql \dt` shows the tables.

## 4. Tests executed & results

- `npx next build` — **passes** (TypeScript check clean, static pages generated).
- `npx prisma validate` — passes.
- `npx prisma generate` — passes.
- `npx tsx prisma/seed.ts` — passes ("Seed complete.").
- Tailwind CLI CSS generation — passes (utilities scanned from all pages).
- `next dev` serves the homepage at `http://localhost:3000` (HTTP 200).

Manual verification still required: browser walkthrough of every route on desktop and mobile.

## 5. Security measures implemented

- Passwords hashed with bcrypt (cost 12); never stored in plaintext.
- Signed, HTTP-only, SameSite=Lax session cookies (HMAC-SHA256, 30-minute expiry).
- Failed-login counter and timed lockout.
- Zod input validation on all API routes.
- RBAC model (roles, permissions, user-role and role-permission links) seeded.
- Audit logging for registration, login and eligibility submission.
- SQL injection mitigated by Prisma parameterised queries.
- No secrets in source — `.env` is gitignored; `.env.example` is a redacted template.
- Robots.txt disallows `/api/`, `/admin`, `/portal`, `/login`, `/register`.

## 6. External services requiring credentials

These are wired as interfaces but need real credentials / configuration before launch:

| Service | Purpose | Env vars | Status |
|---|---|---|---|
| Email (SMTP/API) | Notifications, contact delivery, verification | `SMTP_*` / provider API key | **Not configured** — contact API explicitly reports `deliveryConfigured: false` |
| SMS/WhatsApp | Progress notifications | provider API key | Not configured |
| Payment gateway | Fee payments (gated — see §7) | provider keys + webhook secret | Not configured / intentionally disabled |
| Object storage | Document file storage | bucket credentials | Not configured — uploads are UI-only |
| SESSION_SECRET / CSRF_SECRET | Cookie signing | set in production secrets manager | Dev placeholder in `.env` |
| PostgreSQL | Database | `DATABASE_URL` | Local dev instance running |

## 7. Outstanding legal & business approvals (hard launch gates)

1. **Legal counsel approval** of the payment workflow. Until approved: no upfront deposits, instalments or subscriptions; fee disclosure + written client acceptance + admin approval before any payment release. The finance page ships with a disabled, gated "Release payment" control.
2. **Terms, Privacy, POPIA, Disclaimer and Payment & Fee Policy** must be reviewed and approved by a qualified legal practitioner; the current copy is a professional draft, not legal advice.
3. **Company registration details** must be inserted (the footer currently shows a placeholder note).
4. **No affiliation claims** — confirm all public copy keeps the "independent, not affiliated with NCR/bureaus/courts/banks" language.
5. **POPIA compliance review** — data retention, consent records and the retention policy field are modelled but need a formal policy and operational sign-off.

## 8. Production deployment instructions

1. Provision PostgreSQL and set `DATABASE_URL` in the production secrets manager.
2. `npm ci` then `npx prisma migrate deploy` then `npx tsx prisma/seed.ts`.
3. Set all secrets from §6; set `APP_ORIGIN` to the public URL; set `NODE_ENV=production`.
4. `npm run build` then `npm start` behind a reverse proxy with TLS.
5. Regenerate Tailwind CSS if page content changes: `node node_modules/tailwindcss/lib/cli.js -c tailwind.config.mjs -i tailwind.input.css -o src/app/tailwind.css`.
6. Confirm the gates in §7 are closed before allowing public registration.

## 9. Remaining blockers

- Portal/admin UI actions operate on **demo state**; wiring them to live Prisma mutations and auth-guarding the routes is pending. Auth APIs (register/login/logout/session), eligibility and contact ARE live against the DB.
- Routes: public site at `/`, client portal at `/portal/*`, admin at `/admin/*`.
- Email/SMS/payment/storage integrations need credentials and implementation.
- Next.js reports a security advisory on 16.4.4 — a `next upgrade --agent=security` is recommended before launch.
- All pages need a browser walkthrough (desktop + mobile) and the legal gates in §7.
