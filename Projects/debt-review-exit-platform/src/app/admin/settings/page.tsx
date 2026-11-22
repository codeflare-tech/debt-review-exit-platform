"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/site-config";
import { useToast, Badge, Button, Card, CardContent, Input, Checkbox, Select, Alert } from "@/components/ui";

type Tab = "general" | "notifications" | "security" | "integrations";

const TABS: { id: Tab; label: string }[] = [
  { id: "general", label: "General" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "integrations", label: "Integrations" },
];

interface Integration {
  name: string;
  detail: string;
  status: "Credentials required" | "Gated";
  accent: string;
}

const INTEGRATIONS: Integration[] = [
  { name: "Email (SMTP)", detail: "Transactional mail and case notifications", status: "Credentials required", accent: "bg-royal-50 text-royal" },
  { name: "SMS gateway", detail: "Delivery and reminder messages", status: "Credentials required", accent: "bg-teal-50 text-teal" },
  { name: "Payment provider", detail: "Fee collection and reconciliation", status: "Gated", accent: "bg-yellow-50 text-warning" },
];

export default function AdminSettingsPage() {
  const { pushToast } = useToast();
  const [tab, setTab] = useState<Tab>("general");
  const [name, setName] = useState(BUSINESS.name);
  const [email, setEmail] = useState(BUSINESS.email);
  const [phone, setPhone] = useState(BUSINESS.phone);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [timeout, setTimeoutValue] = useState("30");

  const save = (section: string) => {
    pushToast({
      type: "success",
      title: `${section} settings saved (demo)`,
      description: "Stored in this screen only — no database write occurred.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-text">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Manage console preferences and configuration.</p>
      </div>

      <p className="text-xs text-text-secondary bg-primary-50 border border-divider rounded-lg px-4 py-2.5">
        Demo preview — settings are held in local state for this session and reset on reload. No configuration is
        persisted to a server.
      </p>

      <Card className="overflow-hidden">
        <div className="border-b border-divider px-2 sm:px-4 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-royal text-royal"
                    : "border-transparent text-text-secondary hover:text-text"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <CardContent className="p-5 sm:p-6">
          {tab === "general" && (
            <div className="space-y-5 max-w-2xl">
              <div>
                <h2 className="text-base font-semibold text-text">General</h2>
                <p className="text-xs text-text-secondary mt-1">Public-facing business details used across the site.</p>
              </div>
              <Input label="Business name" value={name} onChange={(e) => setName(e.target.value)} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Contact email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="Contact phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Input label="Support hours" defaultValue={BUSINESS.hours} />
              <div className="flex justify-end pt-2">
                <Button onClick={() => save("General")}>Save general settings</Button>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-5 max-w-2xl">
              <div>
                <h2 className="text-base font-semibold text-text">Notifications</h2>
                <p className="text-xs text-text-secondary mt-1">Choose which events reach staff inboxes and phones.</p>
              </div>
              <div className="space-y-4 rounded-lg border border-divider p-5 bg-background">
                <Checkbox label="Email alerts for new documents" hint="Notify the review team when a client uploads a file." checked={emailAlerts} onChange={setEmailAlerts} />
                <Checkbox label="SMS alerts for urgent cases" hint="Requires an SMS gateway credential (see Integrations)." checked={smsAlerts} onChange={setSmsAlerts} />
                <Checkbox label="Daily activity digest" hint="A single summary email each morning at 08:00 SAST." checked={dailyDigest} onChange={setDailyDigest} />
              </div>
              {smsAlerts && (
                <Alert variant="warning" title="SMS credentials are not configured">
                  SMS alerts are enabled in this preview, but delivery requires a configured SMS provider.
                </Alert>
              )}
              <div className="flex justify-end pt-2">
                <Button onClick={() => save("Notification")}>Save notification settings</Button>
              </div>
            </div>
          )}

          {tab === "security" && (
            <div className="space-y-5 max-w-2xl">
              <div>
                <h2 className="text-base font-semibold text-text">Security</h2>
                <p className="text-xs text-text-secondary mt-1">Session and access preferences for staff accounts.</p>
              </div>
              <div className="w-full sm:w-72">
                <Select
                  label="Session timeout (minutes)"
                  value={timeout}
                  onChange={(e) => setTimeoutValue(e.target.value)}
                  options={[
                    { value: "15", label: "15 minutes" },
                    { value: "30", label: "30 minutes" },
                    { value: "60", label: "60 minutes" },
                  ]}
                />
              </div>
              <div className="rounded-lg border border-divider p-5 bg-background">
                <Checkbox label="Require two-factor authentication for staff" hint="Applies to all admin and case-manager roles once auth is connected." checked={twoFactor} onChange={setTwoFactor} />
              </div>
              <Alert variant="info" title="Authentication is not connected">
                These security preferences are preview-only. Real enforcement depends on the authentication and
                RBAC integration currently being finalised.
              </Alert>
              <div className="flex justify-end pt-2">
                <Button onClick={() => save("Security")}>Save security settings</Button>
              </div>
            </div>
          )}

          {tab === "integrations" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-text">Integrations</h2>
                <p className="text-xs text-text-secondary mt-1">External services and their current connection status.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {INTEGRATIONS.map((i) => (
                  <Card key={i.name} className="p-5">
                    <div className="flex items-start gap-3">
                      <span className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${i.accent}`}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 7h16M4 12h16M4 17h10" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-text">{i.name}</p>
                        <p className="text-xs text-text-secondary mt-1">{i.detail}</p>
                        <div className="mt-3">
                          <Badge variant={i.status === "Gated" ? "warning" : "default"} size="sm">{i.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-divider flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          pushToast({
                            type: "info",
                            title: i.status === "Gated" ? "Payment integration is gated" : "Credentials required",
                            description: `${i.name} cannot be connected in this demo preview.`,
                          })
                        }
                      >
                        {i.status === "Gated" ? "View policy" : "Connect"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Alert variant="warning" title="No live credentials are stored">
                Email, SMS and payment credentials are not configured. The integration cards are illustrative and no
                connection attempt is made in preview mode.
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
