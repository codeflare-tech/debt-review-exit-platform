import { NextRequest, NextResponse } from "next/server";
import { eligibilitySchema, fieldErrors } from "@/lib/validation";
import { generateReference } from "@/lib/auth";
import { createAuditLog } from "@/lib/data";

export const runtime = "nodejs";

// Honest, rule-based preliminary outcome. This is NOT a legal determination.
function preliminaryOutcome(data: Record<string, unknown>): {
  outcome: "Likely eligible" | "Under review" | "Not likely eligible";
  notes: string;
} {
  const blockers: string[] = [];
  if (data.settledAllDebts === true) blockers.push("Debts already settled");
  if (data.hasClearanceCertificate === true) blockers.push("Clearance certificate already held");
  if (data.underDebtReview === false) blockers.push("Not currently under debt review");

  if (blockers.length > 0) {
    return {
      outcome: "Not likely eligible",
      notes: `The following may mean the exit process is not applicable: ${blockers.join(", ")}. A professional review is still required.`,
    };
  }
  if (data.hasCourtOrder === true || data.hasArrears === true || data.moreThanOneCreditor === true) {
    return {
      outcome: "Under review",
      notes: "Your situation has factors that need professional review before eligibility can be confirmed.",
    };
  }
  return {
    outcome: "Likely eligible",
    notes: "Based on your answers, you may be eligible. This is a preliminary indication only and is subject to document review and professional assessment.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = eligibilitySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
    }
    const result = preliminaryOutcome(parsed.data as unknown as Record<string, unknown>);
    const reference = generateReference("EL");

    await createAuditLog({
      actorId: null,
      actorName: String(parsed.data.fullName),
      action: "eligibility.check_submitted",
      targetTable: "EligibilityAssessment",
      targetId: reference,
      applicationId: null,
      ipAddress: req.headers.get("x-forwarded-for") ?? null,
      userAgent: req.headers.get("user-agent") ?? null,
    });

    return NextResponse.json({
      ok: true,
      reference,
      outcome: result.outcome,
      notes: result.notes,
      disclaimer:
        "Preliminary indication only. Not a legal determination. Eligibility is assessed case by case and no outcome is guaranteed.",
    });
  } catch (err) {
    console.error("Eligibility error", err);
    return NextResponse.json({ ok: false, error: "Could not process your assessment." }, { status: 500 });
  }
}
