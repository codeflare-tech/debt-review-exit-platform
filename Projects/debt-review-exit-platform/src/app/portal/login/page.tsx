"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, Button, Checkbox, Input } from "@/components/ui";
import { BUSINESS } from "@/lib/site-config";

interface FieldErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [signedIn, setSignedIn] = useState(false);
  const [showResetInfo, setShowResetInfo] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FieldErrors = {};
    if (!email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!password) {
      next.password = "Please enter your password.";
    } else if (password.length < 6) {
      next.password = "Passwords are at least 6 characters.";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) setSignedIn(true);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Branding panel */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-primary text-white px-12 py-12 xl:px-16">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-royal blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-teal blur-3xl" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <span className="font-heading font-bold text-lg">{BUSINESS.name}</span>
          </div>
        </div>

        <div className="relative max-w-lg">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal" /> Client portal preview
          </span>
          <h2 className="font-heading font-bold text-4xl xl:text-5xl leading-[1.1] tracking-tight mb-5">
            Your exit from debt review, <span className="text-teal">clearly tracked.</span>
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            One calm place for your case progress, documents, messages and next steps — guided by a dedicated case manager.
          </p>
          <ul className="space-y-3">
            {["See exactly where your case stands", "Upload and track required documents", "Message your case team securely"].map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-5 h-5 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#20B99A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/40">Independent assistance. No outcome is guaranteed. Not affiliated with the NCR or any credit bureau.</p>
      </div>

      {/* Auth card */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 lg:hidden mb-8">
            <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-teal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <span className="font-heading font-bold text-primary">{BUSINESS.name}</span>
          </div>

          {signedIn ? (
            <div className="bg-surface rounded-2xl border border-divider shadow-lg p-8 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#20B99A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
              </div>
              <h2 className="font-heading font-bold text-2xl text-primary mb-2">Demo sign-in successful</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                This is a preview only — no account was authenticated and no session was created because the authentication backend is not connected yet.
              </p>
              <Link
                href="/portal/dashboard"
                className="inline-flex items-center justify-center w-full bg-royal text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary transition-colors"
              >
                Continue to dashboard
              </Link>
              <button
                type="button"
                onClick={() => setSignedIn(false)}
                className="mt-4 text-sm font-semibold text-royal hover:underline"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-heading font-bold text-3xl text-primary mb-2">Welcome back</h2>
                <p className="text-sm text-text-secondary">Sign in to continue to your client portal.</p>
              </div>

              <Alert variant="info" title="Preview mode" dismissable>
                Sign-in is a demonstration state only. Live authentication wiring is pending, so any email and password meeting the rules below will open the preview.
              </Alert>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                <Input
                  id="login-email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                <Input
                  id="login-password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  showPasswordToggle
                />
                <div className="flex items-center justify-between gap-4">
                  <Checkbox label="Keep me signed in (demo)" checked={remember} onChange={setRemember} />
                  <button type="button" onClick={() => setShowResetInfo((value) => !value)} className="text-xs font-semibold text-royal hover:underline shrink-0">
                    Forgot password?
                  </button>
                </div>
                {showResetInfo && (
                  <p className="text-xs text-text-secondary bg-primary-50 border border-divider rounded-lg px-3 py-2">
                    Password reset will be available once authentication is connected. For this preview, just choose any password of 6+ characters.
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full" rightIcon={<span aria-hidden>→</span>}>
                  Sign in to portal
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-text-secondary">
                New here?{" "}
                <Link href="/portal/register" className="font-semibold text-royal hover:underline">Create an account</Link>
              </p>
              <p className="mt-6 text-center text-[11px] text-text-secondary/70">
                Protected under POPIA. We never share your details with third parties for marketing.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
