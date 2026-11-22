# DEBT REVIEW EXIT PLATFORM — IMPLEMENTATION PLAN

## Inspection summary
- Existing project: none directly relevant. Closest stacks:
  - `Documents/digital-wallet`: Next.js 16.4.4 + React 19.3.0 + Tailwind 4 + TypeScript 5 (stub UI, node_modules present). **Reused as the frontend foundation.**
  - `Documents/wallet-platform`: FastAPI + PostgreSQL (docker-compose) backend. Confirms PostgreSQL is a proven DB in this environment.
- No debt-review platform exists. New project: `debt-review-exit-platform`.
- PostgreSQL 18 online on localhost:5433 (`debtreview` DB, `debtuser`/`debtpass`). Docker available.
- Host: 8-core i5-1135G7/Iris Xe, 7.6 GB RAM, ~1.1 GB available. Single Next.js app (no separate API service) to minimise memory.

## Architecture
Single Next.js 16 App-Router app:
- `app/(public)/` — marketing/public pages (home, about, packages, eligibility, FAQ, contact, legal).
- `app/(client)/` — client portal (auth, dashboard, profile, documents, messages, notifications, support, invoices).
- `app/(admin)/` — admin dashboard (overview, clients, applications, documents, staff, packages, reports, settings, messages).
- `app/api/` — route handlers (auth, assessment, application, documents, messages, packages, payments, reports, upload/download).
- `prisma/` — schema, migrations, seed.
- `lib/` — DB, auth (Auth.js), validation (zod), permissions (RBAC), crypto, email/SMS/WhatsApp service interfaces, fee-disclosure logic.

## Design tokens
- Navy #101D35 / Royal blue #315FEA / Teal #20B99A / Background #F6F8FC / White #FFFFFF / Primary text #18243A / Secondary text #6B7280. Inter/Manrope fonts, premium fintech UI.

## Package prices (dynamic, DB-driven)
- Package A Standard: R4,500 (16 weeks)
- Package B Priority: R9,000 (3 weeks)
- Package C Express: R15,000 (up to 7 days)

## Compliance (National Credit Act s126A(3) + NCR Circular 2 of 2025)
- NO upfront/prepaid collection. Fee disclosure + client acceptance + completion verification + admin approval + payment release workflow + audit history.
- Payment provider interfaces only; **payment workflow disabled until legal approval**.
- Legal pages marked as NOT attorney-approved.

## Phases
1. Inspect + plan (done)
2. Architecture + database (schema, migrations, seed)
3. Design system
4. Public website
5. Auth + client portal
6. Admin system
7. Documents + communication + notifications
8. Business workflows (assessment, application lifecycle, payment compliance)
9. Security + tests
10. Production preparation

## Deliverable status gates
- Public site works → client register/login → email verify → applications stored → document upload → admin review → case manager assignment → real progress visible to client → status updates → messaging → notifications → RBAC all paths → reports use real data → package mgmt works → payment compliance enforced → sensitive docs protected → responsive → tests pass → production config documented.
