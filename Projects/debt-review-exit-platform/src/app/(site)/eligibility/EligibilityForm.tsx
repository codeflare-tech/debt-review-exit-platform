// Interactive eligibility form — "use client".
// Holds all form state, multi-step logic and the result screen. The server
// page (page.tsx) renders this plus the hero and marketing sections.
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  RadioGroup,
  Button,
  Alert,
  Badge,
  Card,
  CardContent,
  ProgressTrack,
} from "@/components/ui";

type Answer = "" | "yes" | "no" | "not-sure";

interface Answers {
  underDebtReview: Answer;
  courtOrder: Answer;
  settledDebts: Answer;
  homeLoan: Answer;
  arrears: Answer;
  clearanceCertificate: Answer;
}

type Outcome = "likely" | "under-review" | "not-likely";

const initialAnswers: Answers = {
  underDebtReview: "",
  courtOrder: "",
  settledDebts: "",
  homeLoan: "",
  arrears: "",
  clearanceCertificate: "",
};

// Each question carries its own hint so the UI labels can be descriptive.
const stepFields: Record<number, { key: keyof Answers; label: string; hint: string; options: { value: Answer; label: string }[] }[]> = {
  1: [
    {
      key: "underDebtReview",
      label: "Are you currently under debt review?",
      hint: "Debt review is a legal process where a debt counsellor restructures your unsecured debts so you can pay them off affordably.",
      options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
    },
    {
      key: "courtOrder",
      label: "Is there a court order relating to your debts?",
      hint: "Any judgment, summons, emoluments attachment order or garnishee order naming your debts.",
      options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
    },
    {
      key: "settledDebts",
      label: "Have you already settled all your debts?",
      hint: "Have every creditor been paid in full? If unsure, leave as No and we will verify.",
      options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
    },
  ],
  2: [
    {
      key: "homeLoan",
      label: "Do you have a home loan or bonded property?",
      hint: "A bond or home loan is common in debt-review cases and does not disqualify you.",
      options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
    },
    {
      key: "arrears",
      label: "Are you currently in arrears on any account?",
      hint: "Overdue amounts on any credit account, including store accounts, credit cards or a home loan.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
  ],
  3: [
    {
      key: "clearanceCertificate",
      label: "Do you have a clearance certificate from your debt counsellor?",
      hint: "A certificate confirming all your debt is settled and your record is clear. It is fine if you do not have one yet — we will explain what applies to you.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
  ],
};

const progressStages = [
  { label: "Your situation" },
  { label: "Assets & arrears" },
  { label: "Documentation" },
];

const outcomeInfo: Record<
  Outcome,
  { badge: string; variant: "success" | "warning" | "error"; icon: string; heading: string; body: string; box: string; accent: string }
> = {
  likely: {
    badge: "Likely eligible",
    variant: "success",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    heading: "Your circumstances look like a good fit",
    body: "Based on your answers, your situation appears to align with the kind of cases we can assist with. This is still an indicative result — a final, case-by-case assessment is required before any service begins.",
    box: "border-teal/40 bg-teal-50/60",
    accent: "text-teal",
  },
  "under-review": {
    badge: "Under review",
    variant: "warning",
    icon: "M12 8v4m0 4h.01M20.39 18.39A10.04 10.04 0 018.61 3.61 10.04 10.04 0 1017.39 21 10.04 10.04 0 0020.39 18.39z",
    heading: "Your case needs a closer look",
    body: "Your answers suggest a mixed picture. We would need to review the detail of your situation and your documents before confirming whether we can help. This is not a decision either way.",
    box: "border-warning/40 bg-yellow-50/60",
    accent: "text-amber-600",
  },
  "not-likely": {
    badge: "Not likely eligible",
    variant: "error",
    icon: "M12 9v4m0 4h.01M20.39 18.39A10.04 10.04 0 018.61 3.61 10.04 10.04 0 1017.39 21 10.04 10.04 0 0020.39 18.39z",
    heading: "This may not be the right fit",
    body: "Based on your answers, our debt-review exit assistance may not be appropriate for your circumstances. This is an indicative self-check — if you believe it is inaccurate, please contact us and we will gladly discuss it with you.",
    box: "border-red-400 bg-red-50/60",
    accent: "text-red-500",
  },
};

const STEP_TITLES = ["Current situation", "Assets & arrears", "Documentation"];

function Icon({ path, size = 20 }: { path: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

function StepIntro({ step, subtitle }: { step: number; subtitle?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex-1 min-w-[48px]">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal">Step {step} of 3</p>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-primary">{STEP_TITLES[step - 1]}</h2>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{subtitle ?? "A few quick questions about your circumstances."}</p>
    </div>
  );
}

function ProgressPills({ current }: { current: number }) {
  const pills = progressStages.map((_s, i) => {
    const n = i + 1;
    const active = n === current;
    return (
      <div
        key={n}
        className={`flex items-center gap-2 rounded-full border px-3.5 py-2 transition-all ${
          active
            ? "border-royal bg-royal-50 text-royal font-semibold"
            : current > n
            ? "border-divider bg-surface text-text-secondary"
            : "border-divider bg-surface/60 text-text-secondary/60"
        }`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            active ? "bg-royal scale-125" : current > n ? "bg-teal" : "bg-text-secondary/40"
          }`}
        />
        <span>{progressStages[i].label}</span>
      </div>
    );
  });
  return (
    <div className="flex flex-wrap items-center gap-2">
      {pills}
      <span className="text-xs text-text-secondary ml-1">{current <= 3 ? `Step ${current} of 3` : "Result"}</span>
    </div>
  );
}

function ExplanationStrip() {
  return (
    <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
      <span className="inline-flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-royal" />
        How it works
      </span>
      <span className="text-text-secondary/60">→</span>
      <span className="text-text-secondary">You answer a few questions</span>
      <span className="text-text-secondary/60">→</span>
      <span className="text-text-secondary">We show an indicative result</span>
      <span className="text-text-secondary/60">→</span>
      <span className="text-text-secondary">Next steps, chosen by you</span>
    </div>
  );
}

export function EligibilityForm() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ outcome: Outcome; reasons: string[] } | null>(null);

  useEffect(() => {
    setStep(1);
    setSubmitted(false);
    setResult(null);
    setError("");
    setAnswers(initialAnswers);
  }, []);

  const currentStepQuestions = stepFields[step];

  const completedCount = useMemo(() => {
    return Object.values(answers).filter((a) => a !== "").length;
  }, [answers]);

  function handleChange(key: keyof Answers, value: Answer) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  }

  function validateStep(): boolean {
    return currentStepQuestions.every((q) => answers[q.key] !== "");
  }

  async function handleNext() {
    if (!validateStep()) {
      setError("Please answer every question on this step before continuing.");
      return;
    }
    setError("");
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          underDebtReview: answers.underDebtReview,
          courtOrder: answers.courtOrder,
          settledDebts: answers.settledDebts,
          homeLoan: answers.homeLoan,
          arrears: answers.arrears,
          clearanceCertificate: answers.clearanceCertificate,
        }),
      });
      const data = await res.json();
      if (data && data.ok) {
        setResult({ outcome: data.outcome || "under-review", reasons: data.notes ? [String(data.notes)] : [] });
        setSubmitting(false);
        return;
      }
    } catch {
      // API not reachable — fall through to the indicative self-check result.
    }
    setResult(evaluate(answers));
    setSubmitted(true);
    setSubmitting(false);
  }

  function handleRestart() {
    setAnswers(initialAnswers);
    setStep(1);
    setError("");
    setSubmitting(false);
    setSubmitted(false);
    setResult(null);
  }

  function evaluate(a: Answers): { outcome: Outcome; reasons: string[] } {
    if (a.underDebtReview === "no") {
      return {
        outcome: "not-likely",
        reasons: [
          "Our exit assistance is designed for consumers who are currently under debt review. Based on your answer, this service may not apply to you.",
        ],
      };
    }

    const reasons: string[] = [];
    let score = 0;

    if (a.clearanceCertificate === "yes") {
      score += 2;
      reasons.push("You already have a clearance certificate, which usually supports an exit application.");
    } else if (a.clearanceCertificate === "not-sure") {
      reasons.push("You are unsure whether a clearance certificate exists — we would confirm this during document review.");
    } else {
      reasons.push("No clearance certificate yet. This can be addressed through the lawful process and reviewed with you.");
    }

    if (a.courtOrder === "no") {
      score += 1;
      reasons.push("No court order is currently in place, which generally keeps the process simpler.");
    } else {
      reasons.push("A court order exists. This requires careful professional review before any exit step is considered.");
    }

    if (a.arrears === "no") {
      score += 1;
      reasons.push("You are not currently in arrears, which is a positive indicator.");
    } else if (a.arrears === "yes") {
      reasons.push("Current arrears will need to be addressed as part of any proper assessment.");
    } else {
      reasons.push("You are unsure about arrears — we would verify this against your statements.");
    }

    if (a.settledDebts === "yes") {
      score += 1;
      reasons.push("You have settled your debts, which may support a completion-based exit.");
    } else {
      reasons.push("You still have outstanding obligations, which is common for cases under debt review.");
    }

    if (a.homeLoan === "yes") {
      reasons.push("You have a home loan — we would consider how any exit affects your bond.");
    } else {
      reasons.push("No home loan noted. If that changes, let your case manager know during review.");
    }

    let outcome: Outcome;
    if (score >= 3) outcome = "likely";
    else if (score <= 0) outcome = "not-likely";
    else outcome = "under-review";
    return { outcome, reasons };
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <ProgressPills current={submitted ? 4 : step} />
        <ExplanationStrip />
      </div>

      <div className="mb-6">
        <ProgressTrack stages={progressStages} currentStage={submitted ? 4 : step} />
      </div>

      {!submitted ? (
        <Card>
          <CardContent className="p-6 sm:p-8">
            <StepIntro step={step} subtitle={currentStepQuestions[0]?.hint} />

            {error && (
              <div className="mt-5">
                <Alert variant="error" title="Almost there">{error}</Alert>
              </div>
            )}

            <div className="space-y-6">
              {currentStepQuestions.map((q) => {
                const answered = answers[q.key] !== "";
                return (
                  <div
                    key={q.key}
                    className={`rounded-xl border transition-all ${
                      answered ? "border-divider bg-surface/40" : "border-divider/40 bg-surface/20"
                    }`}
                  >
                    <RadioGroup
                      label={q.label}
                      options={q.options}
                      value={answers[q.key]}
                      onChange={(v) => handleChange(q.key, v as Answer)}
                      direction="col"
                      hint={q.hint}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-divider pt-6">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))}>
                  <Icon path="M19 12H5M11 18l-6-6 6-6" />
                  Previous
                </Button>
              ) : (
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors">
                  <Icon path="M19 12H5M11 18l-6-6 6-6" />
                  Back to home
                </Link>
              )}

              <Button type="button" onClick={handleNext} disabled={submitting} className="min-w-[160px]">
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Checking…
                  </>
                ) : (
                  <>
                    {step === 3 ? "See my result" : "Continue"} <span aria-hidden="true">→</span>
                  </>
                )}
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-secondary">
              <span className="inline-flex items-center gap-1.5 text-text-secondary/70">
                <span className="w-1.5 h-1.5 rounded-full bg-royal" />
                {step === 3 ? "This" : "This"} step is quick — select one answer per question.
              </span>
              {step < 3 && <span className="text-text-secondary/60">·</span>}
              {step === 1 && (
                <span className="text-text-secondary/70">Some questions may have more than one true answer — pick the closest fit.</span>
              )}
            </div>
          </CardContent>
        </Card>
      ) : result && (
        <div className="space-y-6">
          <div
            className={`rounded-2xl border p-6 sm:p-8 ${outcomeInfo[result.outcome].box}`}
            role="region"
            aria-label={`Indicative result: ${outcomeInfo[result.outcome].badge}`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={outcomeInfo[result.outcome].variant} className="flex items-center gap-2">
                <Icon path={outcomeInfo[result.outcome].icon} />
                {outcomeInfo[result.outcome].badge}
              </Badge>
              <span className="text-xs text-text-secondary">Indicative self-check result</span>
            </div>
            <h2 className={`mt-4 text-2xl sm:text-3xl font-heading font-bold ${outcomeInfo[result.outcome].accent}`}>
              {outcomeInfo[result.outcome].heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{outcomeInfo[result.outcome].body}</p>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-heading font-semibold text-primary text-lg mb-4">Why we said that</h3>
              <ul className="space-y-3">
                {result.reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-royal shrink-0" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-semibold text-primary text-lg mt-8 mb-4">Your answers</h3>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {(
                  [
                    ["Currently under debt review", answers.underDebtReview],
                    ["Court order relating to debts", answers.courtOrder],
                    ["All debts already settled", answers.settledDebts],
                    ["Home loan / bonded property", answers.homeLoan],
                    ["Currently in arrears", answers.arrears],
                    ["Clearance certificate", answers.clearanceCertificate],
                  ] as [string, Answer][]
                ).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-divider py-2 last:border-0">
                    <dt className="text-text-secondary">{label}</dt>
                    <dd
                      className={`font-medium truncate px-2 py-0.5 rounded-full ${
                        value === "yes"
                          ? "bg-teal-100 text-teal-800"
                          : value === "no"
                          ? "bg-red-100 text-red-800"
                          : value === "not-sure"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-primary-100 text-primary-800"
                      }`}
                    >
                      {value === "not-sure" ? "Not sure" : value.replace(/-/g, " ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-heading font-semibold text-primary text-lg mb-2">What you can do next</h3>
              <p className="text-sm text-text-secondary mb-5">
                If you would like us to look at your case properly, create an account or sign in to
                continue. You can also ask us a question first — no obligation.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="/portal/register"
                  className="inline-flex items-center justify-center font-semibold px-4 py-2.5 rounded-lg bg-royal text-white hover:bg-primary transition-all shadow-md shadow-royal-500/25"
                >
                  <Icon path="M15 5v14l-7-4-7 4-7-4M9 5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H9z" />
                  Create an account
                </Link>
                <Link
                  href="/portal/login"
                  className="inline-flex items-center justify-center font-semibold px-4 py-2.5 rounded-lg border border-divider text-text hover:border-royal hover:text-royal transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                    <path d="M10 17a2 2 0 002 2h4a2 2 0 002-2V9a2 2 0 00-2-2h-4" />
                    <path d="M9 5a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9z" />
                  </svg>
                  I already have an account
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-semibold px-4 py-2.5 rounded-lg text-royal hover:underline"
                >
                  Ask us a question
                </Link>
              </div>
              <div className="mt-5">
                <Button type="button" variant="ghost" onClick={handleRestart}>
                  Start the check again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-8">
        <Alert variant="warning" title="An honest caveat">
          This check is a general guide, not a decision or a promise. We are an independent company and do
          not guarantee removal from debt review or any outcome. All service periods are targets only,
          subject to eligibility, document completeness, professional review and third-party processing.
        </Alert>
      </div>
    </>
  );
}
