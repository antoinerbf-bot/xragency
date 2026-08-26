// ── New audit page — create a new prospect + launch audit ──

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLang } from "../../lib/i18n";
import { UI } from "../../lib/copy";
import { useState } from "react";
import { isSupabaseConfigured, getSupabase } from "../../lib/saas/supabase";
import type { NewAuditInput } from "../../lib/saas/types";

export const Route = createFileRoute("/dashboard/new")({
  component: NewAuditPage,
  validateSearch: (search: Record<string, unknown>) => ({
    url: (search.url as string) ?? "",
  }),
});

function NewAuditPage() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const configured = isSupabaseConfigured();

  const [form, setForm] = useState<NewAuditInput>({
    websiteUrl: search.url || "",
    businessName: "",
    industry: "",
    country: "",
    city: "",
    contactName: "",
    contactEmail: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof NewAuditInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.websiteUrl) return;
    if (!configured) {
      setError("Configurez Supabase d'abord.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      // Create prospect
      const { data: prospect, error: pErr } = await supabase
        .from("prospects")
        .insert({
          owner_id: user.id,
          website_url: form.websiteUrl,
          business_name: form.businessName || null,
          industry: form.industry || null,
          country: form.country || null,
          city: form.city || null,
          contact_name: form.contactName || null,
          contact_email: form.contactEmail || null,
          phone: form.phone || null,
          notes: form.notes || null,
          status: "new",
        })
        .select()
        .single();

      if (pErr) throw pErr;

      // Create audit
      const { data: audit, error: aErr } = await supabase
        .from("audits")
        .insert({
          prospect_id: prospect.id,
          owner_id: user.id,
          website_url: form.websiteUrl,
          status: "pending",
          pages_crawled: 0,
          page_count: 0,
        })
        .select()
        .single();

      if (aErr) throw aErr;

      // Navigate to audit result page (will trigger crawl/analyze)
      navigate({ to: "/dashboard/audits/$auditId", params: { auditId: audit.id } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
        {UI.dashNewAudit[lang]}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Entrez l'URL du site à analyser et les informations du prospect.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Website URL */}
        <div>
          <label className="text-sm font-medium text-foreground">{UI.dashWebsite[lang]} *</label>
          <input
            type="url"
            required
            value={form.websiteUrl}
            onChange={(e) => update("websiteUrl", e.target.value)}
            placeholder="https://example.com"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Business info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground">
              {UI.dashBusinessName[lang]}
            </label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">{UI.dashIndustry[lang]}</label>
            <input
              type="text"
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
              placeholder="Restaurant, Clinique, etc."
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground">Pays</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              placeholder="France"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Ville</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="Paris"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground">Nom du contact</label>
            <input
              type="text"
              value={form.contactName}
              onChange={(e) => update("contactName", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-foreground">Téléphone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium text-foreground">{UI.dashNotes[lang]}</label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Création..." : UI.dashAnalyze[lang]}
        </button>
      </form>
    </div>
  );
}
