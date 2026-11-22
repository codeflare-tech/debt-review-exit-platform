"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { BUSINESS, COMPLIANCE_DISCLAIMER } from "@/lib/site-config";
import { Button, Input, Textarea, Select, Alert, Card, Badge } from "@/components/ui";

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactField = keyof ContactFormState;

const initialForm: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const subjectOptions = [
  { value: "general", label: "General enquiry" },
  { value: "eligibility", label: "Eligibility question" },
  { value: "packages", label: "Packages & fees" },
  { value: "existing", label: "Existing client support" },
  { value: "other", label: "Something else" },
];

function validate(values: ContactFormState): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject) {
    errors.subject = "Please choose a subject so we can route your enquiry.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }

  return errors;
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-royal blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[380px] h-[380px] rounded-full bg-teal blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal" /> Get in touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-6">
            Let&apos;s <span className="text-teal">talk it through.</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Have a question about eligibility, packages or the process? Send us a note and we will
            get back to you. We are available {BUSINESS.hours}.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactDetails() {
  const details = [
    {
      label: "Email",
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
      icon: (
        <path d="M3 6l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
      ),
    },
    {
      label: "Telephone",
      value: BUSINESS.phone,
      href: `tel:${BUSINESS.phone.replace(/[^+\d]/g, "")}`,
      icon: (
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.58 2.81.7A2 2 0 0122 16.92z" />
      ),
    },
    {
      label: "Hours",
      value: BUSINESS.hours,
      icon: <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2" />,
    },
    {
      label: "Location",
      value: BUSINESS.address,
      icon: <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0zM12 10a3 3 0 100-6 3 3 0 000 6z" />,
    },
  ];
  return (
    <Card>
      <div className="p-6 sm:p-8">
        <h2 className="text-xl font-heading font-bold text-primary">Our details</h2>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          Prefer to reach us directly? Use the details below.
        </p>
        <ul className="mt-6 space-y-5">
          {details.map((d) => (
            <li key={d.label} className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-royal shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {d.icon}
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {d.label}
                </p>
                {d.href ? (
                  <a className="text-sm font-medium text-royal hover:underline" href={d.href}>
                    {d.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-text">{d.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-lg bg-primary-50 border border-divider p-4 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Please note:</strong> do not send sensitive documents by
          ordinary email. Our team will advise on a secure way to share documents when needed.
        </div>
      </div>
    </Card>
  );
}

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: ContactField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  function handleReset() {
    setValues(initialForm);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6 sm:p-8">
                {!submitted ? (
                  <>
                    <div className="mb-7">
                      <h2 className="text-2xl font-heading font-bold text-primary">Send us a message</h2>
                      <p className="mt-2 text-sm text-text-secondary">
                        Fill in the form below. Fields marked with an asterisk are required.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label="Full name *"
                          placeholder="Your name"
                          value={values.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          error={errors.name}
                          autoComplete="name"
                        />
                        <Input
                          label="Email address *"
                          type="email"
                          placeholder="you@example.co.za"
                          value={values.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          error={errors.email}
                          autoComplete="email"
                        />
                      </div>

                      <div className="mt-5">
                        <Select
                          label="Subject *"
                          options={subjectOptions}
                          placeholder="Select a subject"
                          value={values.subject}
                          onChange={(e) => handleChange("subject", e.target.value)}
                          error={errors.subject}
                        />
                      </div>

                      <div className="mt-5">
                        <Textarea
                          label="Message *"
                          placeholder="Tell us a little about what you need help with..."
                          value={values.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          error={errors.message}
                          rows={7}
                        />
                      </div>

                      <div className="mt-6">
                        <Alert variant="info" title="How this form works">
                          This form validates your details locally in your browser. No message is
                          transmitted to a server at this stage — automated delivery will be
                          enabled once our mail service is configured.
                        </Alert>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-4">
                        <Button type="submit" rightIcon={<span aria-hidden>→</span>}>
                          Prepare my message
                        </Button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
                        >
                          Clear form
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <span className="mx-auto w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-teal">
                      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <div className="mt-5 flex justify-center">
                      <Badge variant="success">Message prepared</Badge>
                    </div>
                    <h2 className="mt-4 text-2xl font-heading font-bold text-primary">
                      Thanks, {values.name.trim().split(" ")[0]}.
                    </h2>
                    <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
                      Your message has been prepared on this device. It has <strong>not</strong>{" "}
                      been sent — automated delivery will be available once our mail service is
                      configured. In the meantime, please send the details below directly to us and
                      we will respond as soon as we can.
                    </p>
                    <div className="mt-6 rounded-lg border border-divider bg-background p-5 text-left text-sm text-text-secondary space-y-1.5">
                      <p><strong className="text-text">To:</strong> {BUSINESS.email}</p>
                      <p><strong className="text-text">Subject:</strong> {subjectOptions.find((s) => s.value === values.subject)?.label}</p>
                      <p><strong className="text-text">From:</strong> {values.name} &lt;{values.email}&gt;</p>
                      <p className="whitespace-pre-wrap"><strong className="text-text">Message:</strong> {values.message}</p>
                    </div>
                    <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(
                          subjectOptions.find((s) => s.value === values.subject)?.label ?? "Enquiry"
                        )}&body=${encodeURIComponent(values.message)}`}
                        className="inline-flex items-center justify-center font-semibold text-sm px-5 py-3 rounded-lg bg-royal text-white hover:bg-primary transition-colors"
                      >
                        Open in your email app
                      </a>
                      <Button type="button" variant="outline" onClick={handleReset}>
                        Write another message
                      </Button>
                    </div>
                    <p className="mt-5 text-xs text-text-secondary">
                      You can also start a{" "}
                      <Link href="/eligibility" className="text-royal hover:underline">
                        no-obligation eligibility check
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <ContactDetails />
            <div className="rounded-xl border border-divider bg-surface p-6 shadow-sm">
              <h3 className="font-heading font-semibold text-primary">Looking for something else?</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-royal hover:underline">
                    Browse frequently asked questions →
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-royal hover:underline">
                    See how the process works →
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className="text-royal hover:underline">
                    Compare packages and fees →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-primary-50 border border-divider rounded-lg p-5 text-xs text-text-secondary leading-relaxed">
          <strong className="text-primary">Important notice.</strong> {COMPLIANCE_DISCLAIMER}
        </div>
      </section>
    </>
  );
}
