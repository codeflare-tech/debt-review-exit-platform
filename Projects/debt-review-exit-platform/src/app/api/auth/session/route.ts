import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("dre_session")?.value;
  if (!token) return NextResponse.json({ authenticated: false });
  const payload = verifySessionToken(token);
  if (!payload) return NextResponse.json({ authenticated: false });
  return NextResponse.json({
    authenticated: true,
    user: { id: payload.userId, email: payload.email, role: payload.role },
  });
}
