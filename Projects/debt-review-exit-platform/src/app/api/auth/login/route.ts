import { NextRequest, NextResponse } from "next/server";
import { loginSchema, fieldErrors } from "@/lib/validation";
import { verifyPassword, createSessionToken } from "@/lib/auth";
import { findUserByEmail, createAuditLog } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
    }

    const { email, password } = parsed.data as { email: string; password: string };
    const user = await findUserByEmail(email);
    if (!user || !user.passwordHash) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    if (user.isSuspended || !user.isActive) {
      return NextResponse.json({ ok: false, error: "This account is not active." }, { status: 403 });
    }

    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      return NextResponse.json({ ok: false, error: "Account temporarily locked. Try again later." }, { status: 429 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      const count = (user.failedLoginCount ?? 0) + 1;
      const updateData: { failedLoginCount: number; lockoutUntil?: Date } = { failedLoginCount: count };
      if (count >= 5) updateData.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000);
      await prisma.user.update({ where: { id: user.id }, data: updateData });
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginCount: 0, lockoutUntil: null, lastLoginAt: new Date() },
    });

    await createAuditLog({
      actorId: user.id,
      actorName: user.fullName,
      action: "user.login",
      targetTable: "User",
      targetId: user.id,
      applicationId: null,
      ipAddress: req.headers.get("x-forwarded-for") ?? null,
      userAgent: req.headers.get("user-agent") ?? null,
    });

    const token = createSessionToken({ userId: user.id, role: user.roleId, email: user.email });
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.roleId } });
    res.cookies.set("dre_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60,
    });
    return res;
  } catch (err) {
    console.error("Login error", err);
    return NextResponse.json({ ok: false, error: "Login could not be completed." }, { status: 500 });
  }
}
