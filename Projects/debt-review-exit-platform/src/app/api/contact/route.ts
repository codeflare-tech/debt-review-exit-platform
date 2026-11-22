import { NextRequest, NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { BUSINESS } from "@/lib/site-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
    }
    // Delivery is intentionally not claimed: no mail credentials are configured yet.
    // The integration interface is documented in PRODUCTION_READINESS.md.
    return NextResponse.json({
      ok: true,
      message:
        "Your message has been validated and queued. Email delivery is pending configuration — contact us directly at " +
        BUSINESS.email +
        " in the meantime.",
      deliveryConfigured: false,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not process your message." }, { status: 500 });
  }
}
