// ============================================================
// AUTH HELPERS — password hashing, verification, session tokens
// ============================================================

import bcrypt from "bcryptjs";
import crypto from "crypto";

const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-only-change-me";

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}

// Stateless signed session token: base64url(payload).base64url(hmac)
export interface SessionPayload {
  userId: string;
  role: string | null;
  email: string;
  issuedAt: number;
}

export function createSessionToken(payload: Omit<SessionPayload, "issuedAt">): string {
  const full: SessionPayload = { ...payload, issuedAt: Date.now() };
  const body = Buffer.from(JSON.stringify(full)).toString("base64url");
  const sig = crypto.createHmac("sha256", SESSION_SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return null;
    const expected = crypto.createHmac("sha256", SESSION_SECRET).update(body).digest("base64url");
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (Date.now() - payload.issuedAt > 30 * 60 * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export function generateReference(prefix = "DR"): string {
  const n = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `${prefix}-${n}`;
}
