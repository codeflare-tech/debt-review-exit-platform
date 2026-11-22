"use client";

import { useState } from "react";
import { PACKAGES } from "@/lib/site-config";
import { useToast, Badge, Button, Card, CardContent, Input, Textarea, Alert } from "@/components/ui";

interface EditablePackage {
  code: "A" | "B" | "C";
  slug: string;
  name: string;
  tier: string;
  description: string;
  price: number;
  durationLabel: string;
  featuresText: string;
  featured?: boolean;
}

function toEditable(): EditablePackage[] {
  return PACKAGES.map((p) => ({
    code: p.code,
    slug: p.slug,
    name: p.name,
    tier: p.tier,
    description: p.description,
    price: p.price,
    durationLabel: p.durationLabel,
    featuresText: p.features.join("\n"),
    featured: p.featured,
  }));
}

export default function AdminPackagesPage() {
  const { pushToast } = useToast();
  const [draft, setDraft] = useState<EditablePackage[]>(toEditable);
  const [saved, setSaved] = useState(false);

  const updateField = <K extends keyof EditablePackage>(code: string, field: K, value: EditablePackage[K]) => {
    setDraft((prev) => prev.map((p) => (p.code === code ? { ...p, [field]: value } : p)));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    pushToast({
      type: "success",
      title: "Package changes saved (demo)",
      description: "Values live in this screen only — no database write occurred.",
    });
  };

  const handleReset = () => {
    setDraft(toEditable());
    setSaved(false);
    pushToast({ type: "info", title: "Restored configured defaults" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text">Packages</h1>
          <p className="text-sm text-text-secondary mt-1">
            Configure the three packages published by the public site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>Reset to defaults</Button>
          <Button size="sm" onClick={handleSave}>Save changes</Button>
        </div>
      </div>

      <Alert variant="warning" title="Demo preview">
        These fields are prefilled from the shared <span className="font-mono">site-config</span> and are editable
        for preview only. Saving updates local state — it does not persist to the database or change public
        pricing. No payment, deposit or subscription is enabled.
      </Alert>

      {saved && (
        <p className="text-xs font-semibold text-success bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
          Changes saved locally just now. They will reset when this page is reloaded.
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {draft.map((p) => (
          <Card key={p.code} className={`overflow-hidden ${p.featured ? "border-royal shadow-md ring-2 ring-royal/10" : ""}`}>
            <div className="px-5 py-4 border-b border-divider flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-teal">Package {p.code}</p>
                <p className="text-sm font-semibold text-text mt-0.5">{p.tier}</p>
              </div>
              {p.featured ? <Badge variant="royal" size="sm">Most popular</Badge> : <Badge variant="default" size="sm">Standard</Badge>}
            </div>

            <CardContent className="space-y-4 p-5">
              <Input
                label="Package name"
                value={p.name}
                onChange={(e) => updateField(p.code, "name", e.target.value)}
                aria-label={`Package ${p.code} name`}
              />

              <p className="text-xs text-text-secondary leading-relaxed">{p.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5" htmlFor={`price-${p.code}`}>
                    Price (ZAR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-secondary">R</span>
                    <input
                      id={`price-${p.code}`}
                      type="number"
                      min={0}
                      value={p.price}
                      onChange={(e) => updateField(p.code, "price", Number(e.target.value))}
                      className="w-full bg-surface border border-divider rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5" htmlFor={`dur-${p.code}`}>
                    Duration
                  </label>
                  <input
                    id={`dur-${p.code}`}
                    type="text"
                    value={p.durationLabel}
                    onChange={(e) => updateField(p.code, "durationLabel", e.target.value)}
                    className="w-full bg-surface border border-divider rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                  />
                </div>
              </div>

              <Textarea
                label="Features (one per line)"
                value={p.featuresText}
                onChange={(e) => updateField(p.code, "featuresText", e.target.value)}
                rows={7}
                aria-label={`Package ${p.code} features`}
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-text-secondary">
                  {p.featuresText.split("\n").filter((f) => f.trim()).length} features
                </span>
                <span className="text-sm font-heading font-bold text-primary">
                  R{p.price.toLocaleString("en-ZA")} <span className="text-xs font-normal text-text-secondary">/ {p.durationLabel}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save changes</Button>
      </div>

      <p className="text-xs text-text-secondary text-center pb-2">
        Fees are disclosed and accepted in writing before any work begins. No upfront deposit, instalment plan or
        subscription is offered or collected in this preview.
      </p>
    </div>
  );
}
