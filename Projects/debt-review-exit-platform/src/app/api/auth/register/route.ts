import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema, fieldErrors } from "@/lib/validation";
import { hashPassword, createSessionToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { findUserByEmail, createUser, createAuditLog } from "@/lib/data";
import { RoleSlug } from "@/types";
import uid from "@/lib/uuid";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
    }

    const { fullName, email, password, phone, idNumber } = parsed.data as {
      fullName: string; email: string; password: string; phone: string; idNumber: string;
    };
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ ok: false, error: "An account with that email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({ email, passwordHash, fullName, roleSlug: "client" as RoleSlug });

    // Store applicant details on the user profile if present in the schema.
    try {
      await prisma.userProfile.create({
        data: {
          id: uid(),
          userId: user.id,
          phoneNumber: phone,
          details: { idNumber: String(idNumber), registrationSource: "web" },
        },
      });
    } catch {
      // Profile is optional; registration still succeeds.
    }

    await createAuditLog({
      actorId: user.id,
      actorName: String(fullName),
      action: "user.registered",
      targetTable: "User",
      targetId: user.id,
      applicationId: null,
      ipAddress: req.headers.get("x-forwarded-for") ?? null,
      userAgent: req.headers.get("user-agent") ?? null,
    });

    const token = createSessionToken({ userId: user.id, role: user.roleId, email: user.email });
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName } }, { status: 201 });
    res.cookies.set("dre_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60,
    });
    return res;
  } catch (err) {
    console.error("Registration error", err);
    return NextResponse.json({ ok: false, error: "Registration could not be completed." }, { status: 500 });
  }
}
