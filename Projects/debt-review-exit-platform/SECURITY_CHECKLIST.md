# SECURITY CHECKLIST

- [x] HTTPS enforcement (production; HSTS header)
- [x] Secure/HTTP-only/SameSite cookies
- [x] CSRF protection (SameSite + CSRF token for state-changing forms)
- [x] XSS protection (output encoding; dangerouslySetInnerHTML avoided)
- [x] SQL injection protection (Prisma parameterized queries)
- [x] Input validation (zod schemas on all inputs)
- [x] Output encoding
- [x] Rate limiting (login, reset, upload)
- [x] Server-side authorisation (role + row-level)
- [x] Secure file storage (private bucket; no public URLs)
- [x] File validation (magic bytes + extension allowlist; no executables)
- [x] Malware scan interface (file hosted with scanner)
- [x] Encryption at rest (PostgreSQL at-rest + app-level password hashing)
- [x] Secrets management (.env, no committed secrets)
- [x] Audit logging (all sensitive admin ops)
- [x] Session expiration + secure rotation
- [x] Account lockout + login attempt rate limiting
- [x] No sensitive data in URLs/logs (IDs should be UUIDs; no IDs in logs)
- [x] Dependency vulnerability checks
- [x] Security headers (CSP, X-Frame, etc.)
- [x] Prisma schema audit (no credit card storage; no PII exposure)
- [x] POPIA: consent records, retention, access logs, privacy notice

## Validation rules
- Never trust frontend role checks. Enforce on every server route + middleware.
- Every status change requires a reason + actor.
- Never show internal notes to the client.
- Signed download links: 15-minute TTL, single-use, UUID-scoped.
