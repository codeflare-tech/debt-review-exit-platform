"use client";

import { useState } from "react";
import { Badge, Card, CardContent, CardHeader, CardTitle, Alert, Checkbox, Input } from "@/components/ui";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    fullName: "Thandi Mokoena",
    email: "thandi.mokoena@example.co.za",
    phone: "+27 82 123 4567",
    idNumber: "900101 5000 081",
    dateOfBirth: "1990-01-01",
  });
  const [notif, setNotif] = useState({ email: true, sms: true, whatsapp: false });
  const [consents, setConsents] = useState({ processing: true, marketing: false, share: false });

  function save(e: React.FormEvent) {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Profile & settings</h1>
          <p className="text-sm mt-1">Manage your personal details, preferences and consents.</p>
        </div>
        <Badge variant="teal" size="sm">Identity verified</Badge>
      </div>

      <Alert variant="info" title="Demo preview">
        Changes here are held in browser state only. Profile persistence is pending backend wiring.
      </Alert>

      {saved && <Alert variant="success" title="Saved">Your changes have been noted in this preview.</Alert>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal details</CardTitle>
                {!editing && (
                  <button onClick={() => setEditing(true)} className="text-sm font-semibold text-royal hover:underline">Edit</button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editing ? (
                <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                  <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <Input label="ID number" value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />
                  <Input label="Date of birth" type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
                  <div className="sm:col-span-2 flex gap-3 pt-2">
                    <button type="submit" className="bg-royal text-white text-sm font-semibold px-5 py-2.5 rounded-lg">Save changes</button>
                    <button type="button" onClick={() => setEditing(false)} className="border border-divider text-sm font-semibold px-5 py-2.5 rounded-lg">Cancel</button>
                  </div>
                </form>
              ) : (
                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    ["Full name", form.fullName], ["Email", form.email], ["Phone", form.phone], ["ID number", "•••• •••• 5081"], ["Date of birth", form.dateOfBirth],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-text-secondary uppercase tracking-wide">{label}</dt>
                      <dd className="text-sm font-semibold mt-1">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notification preferences</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Checkbox label="Email notifications" hint="Case updates and document review results" checked={notif.email} onChange={(v) => setNotif({ ...notif, email: v })} />
                <Checkbox label="SMS notifications" hint="Important milestones and reminders" checked={notif.sms} onChange={(v) => setNotif({ ...notif, sms: v })} />
                <Checkbox label="WhatsApp notifications" hint="Coming soon — requires integration" checked={notif.whatsapp} onChange={(v) => setNotif({ ...notif, whatsapp: v })} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Consent records</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Checkbox label="Processing personal information" hint="Required to provide the service (POPIA)" checked={consents.processing} onChange={(v) => setConsents({ ...consents, processing: v })} />
                <Checkbox label="Marketing communications" hint="Optional — you may withdraw at any time" checked={consents.marketing} onChange={(v) => setConsents({ ...consents, marketing: v })} />
                <Checkbox label="Sharing with professional partners" hint="Only where necessary for your case" checked={consents.share} onChange={(v) => setConsents({ ...consents, share: v })} />
              </div>
              <p className="text-xs text-text-secondary mt-5">Consent changes are recorded in this preview only. Formal POPIA records will be stored on the platform.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Security</CardTitle></CardHeader>
            <CardContent>
              <button className="w-full text-left text-sm font-semibold text-royal hover:underline">Change password →</button>
              <p className="text-xs text-text-secondary mt-3">Password changes will be available once authentication is fully wired.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
