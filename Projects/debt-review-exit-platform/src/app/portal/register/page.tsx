"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, Button, Checkbox, Input } from "@/components/ui";
import { BUSINESS } from "@/lib/site-config";

interface RegisterFields {
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  password: string;
  confirmPassword: string;
}

type FieldErrors = Partial<Record<keyof RegisterFields | "terms", string>>;

const EMPTY_FORM: RegisterFields = {
  fullName: "",
  email: "",
  phone: "",
  idNumber: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [registered, setRegistered] = useState(false);

  function update(field: keyof RegisterFields, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FieldErrors = {};

    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    else if (form.fullName.trim().split(/\s+/).length < 2) next.fullName = "Please enter your first and last name.";

    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email address.";

    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    else if (digits.length < 9 || digits.length > 12) next.phone = "Enter a valid South African phone number.";

    if (!form.idNumber.trim()) next.idNumber = "Please enter your ID number.";
    else if (!/^\d{13}$/.test(form.idNumber.trim())) next.idNumber = "SA ID numbers contain 13 digits.";

    if (!form.password) next.password = "Please create a password.";
    else if (form.password.length < 8) next.password = "Use at least 8 characters.";

    if (!form.confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match.";

    if (!acceptedTerms) next.terms = "Please accept the terms and POPIA notice to continue.";

    setErrors(next);
    if (Object.keys(next).length === 0) setRegistered(true);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Branding panel */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-royal to-primary text-white px-12 py-12 xl:px-16">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute -bottom-24 -left-24 w-[460px] h-[460px] rounded-full bg-teal blur-3xl" />
          <div className="absolute top-0 right-0 w-[340px] h-[340px] rounded-full bg-white/40 blur-3xl" />
        </div>
        <div className="relative flex items-center gap-3">
          <span className="w-10 h-10 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <span className="font-heading font-bold text-lg">{BUSINESS.name}</span>
        </div>

        <div className="relative max-w-lg">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal" /> Start your journey
          </span>
          <h2 className="font-heading font-bold text-4xl xl:text-5xl leading-[1.1] tracking-tight mb-5">
            A structured path <span className="text-teal">out of debt review.</span>
          </h2>
          <p className="text-white/75 leading-relaxed">
            Register your details to get started. Your information is handled with care and used only to assess and guide your case.
          </p>
        </div>

        <p className="relative text-xs text-white/50">POPIA-conscious handling · Independent service · No outcome guaranteed</p>
      </div>

      {/* Auth card */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-2 lg:hidden mb-8">
            <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-teal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <span className="font-heading font-bold text-primary">{BUSINESS.name}</span>
          </div>

          {registered ? (
            <div className="bg-surface rounded-2xl border border-divider shadow-lg p-8 text-center max-w-lg mx-auto">
              <div className="mx-auto w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#20B99A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
              </div>
              <h2 className="font-heading font-bold text-2xl text-primary mb-2">Registration preview complete</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                This is a demonstration state only — no account was created and nothing was saved, because database and authentication wiring is still pending.
              </p>
              <Link
                href="/portal/login"
                className="inline-flex items-center justify-center w-full bg-royal text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary transition-colors"
              >
                Go to sign in
              </Link>
              <button
                type="button"
                onClick={() => { setRegistered(false); setForm(EMPTY_FORM); setAcceptedTerms(false); setErrors({}); }}
                className="mt-4 text-sm font-semibold text-royal hover:underline"
              >
                Edit my details again
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-heading font-bold text-3xl text-primary mb-2">Create your account</h2>
                <p className="text-sm text-text-secondary">Tell us a little about yourself to begin.</p>
              </div>

              <Alert variant="info" title="Preview mode" dismissable>
                This form validates your input and shows a confirmation state. No data is transmitted or stored — live persistence is pending.
              </Alert>

              <form onSubmit={handleSubmit} className="mt-6 bg-surface rounded-2xl border border-divider shadow-sm p-6 sm:p-8" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <Input
                      id="reg-name"
                      label="Full name"
                      autoComplete="name"
                      placeholder="Thandi Mokoena"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      error={errors.fullName}
                    />
                  </div>
                  <Input
                    id="reg-email"
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    error={errors.email}
                  />
                  <Input
                    id="reg-phone"
                    label="Mobile number"
                    type="tel"
                    autoComplete="tel"
                    placeholder="082 123 4567"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    error={errors.phone}
                  />
                  <Input
                    id="reg-id"
                    label="South African ID number"
                    inputMode="numeric"
                    maxLength={13}
                    placeholder="13-digit ID number"
                    value={form.idNumber}
                    onChange={(e) => update("idNumber", e.target.value.replace(/\D/g, ""))}
                    error={errors.idNumber}
                    hint="Required for identity verification. Stored securely once live."
                  />
                  <Input
                    id="reg-password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    error={errors.password}
                    showPasswordToggle
                  />
                  <div className="sm:col-span-2">
                    <Input
                      id="reg-confirm"
                      label="Confirm password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Repeat your password"
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      error={errors.confirmPassword}
                      showPasswordToggle
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <Checkbox
                    label="I accept the Terms of Service and POPIA notice"
                    checked={acceptedTerms}
                    onChange={setAcceptedTerms}
                    hint="Consent records will be captured when the backend is connected."
                  />
                  {errors.terms && <p className="mt-1.5 text-xs text-error">{errors.terms}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full mt-6" rightIcon={<span aria-hidden>→</span>}>
                  Create account
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-text-secondary">
                Already registered? <Link href="/portal/login" className="font-semibold text-royal hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
