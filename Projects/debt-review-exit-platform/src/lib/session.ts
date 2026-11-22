// ============================================================
// SESSION & COOKIE HELPERS
// Handles signed session cookies (signed with CSRF_SECRET / SESSION_SECRET),
// auth header extraction, and per-request user identity resolution.
// ============================================================

import { cookies } from "next/headers";
import { prisma } from "./prisma";

export interface SessionData {
  userId: string;
  role: string | null;
  email: string;
  isTwoFactorEnabled: boolean;
  isEmailVerified: boolean;
  isEmailConfirmed: boolean;
  isPhoneVerified: boolean;
  isSuspended: boolean;
  failedLoginCount: number;
}

const COOKIE_NAME = "dre_session";
const COOKIE_SECRET = process.env.COOKIE_SECRET ?? process.env.SESSION_SECRET ?? "dev-only-change-me";

function signSession(data: SessionData): string {
  const payload = JSON.stringify(data);
  const time = Date.now().toString();
  const text = `${payload}.${time}`;
  const hash = Buffer.from(text + COOKIE_SECRET).toString("base64url");
  return `${text}.${hash}`;
}

function verifySession(cookieValue: string): SessionData | null {
  try {
    const parts = cookieValue.split(".");
    if (parts.length !== 3) return null;
    const [payload, time, hash] = parts;
    const text = `${payload}.${time}`;
    const expected = Buffer.from(text + COOKIE_SECRET).toString("base64url");
    if (hash !== expected) return null;
    const age = Date.now() - Number(time);
    if (age > 30 * 60 * 1000) return null; // sessions expire after 30 min inactivity
    return JSON.parse(payload) as SessionData;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value ?? null;
  if (!raw) return null;
  const data = verifySession(raw);
  if (!data) return null;

  // Lightly validate the user still exists and is active
  const user = await prisma.user.findUnique({
    where: { id: data.userId },
    select: {
      id: true,
      isActive: true,
      isSuspended: true,
      failedLoginCount: true,
      lockoutUntil: true,
      isTwoFactorEnabled: true,
      isEmailVerified: true,
      isEmailConfirmed: true,
      isPhoneVerified: true,
    },
  });
  if (!user || !user.isActive || user.isSuspended || (user.lockoutUntil && user.lockoutUntil > new Date())) {
    return null;
  }
  return { ...data, ...user };
}

export function setSessionCookie(value: string, res: Response): Response {
  res.headers.set("Set-Cookie", `${COOKIE_NAME}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${30 * 60}`);
  return res;
}

export function clearSessionCookie(res: Response): Response {
  res.headers.set("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
  return res;
}
