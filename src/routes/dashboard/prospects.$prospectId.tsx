// ── Prospect detail page ──

import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../../lib/i18n";
import { UI } from "../../lib/copy";
import { StatusBadge, CategoryBar } from "../../components/saas/DashboardWidgets";
import { useState } from "react";
import type { Prospect, Audit } from "../../lib/saas/types";

export const Route = createFileRoute("/dashboard/prospects/$prospectId")({
  component: ProspectDetail,
});

function ProspectDetail() {
  const { prospectId } = Route.useParams();
  const { lang } = useLang();
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [audits, setAudits] = useState<Audit[]>([]);

  // Placeholder — would fetch from Supabase
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/dashboard/prospects" className="hover:text-foreground transition-colors">
          {UI.dashProspects[lang]}
        </Link>
        <span>/</span>
        <span className="text-foreground">#{prospectId.slice(0, 8)}</span>
      </div>

      {/* Prospect info */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {prospect?.business_name || "Prospect"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {prospect?.website_url || "—"}
            </p>
          </div>
          {prospect && <StatusBadge status={prospect.status} />}
        </div>

        {prospect && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoField label={UI.dashIndustry[lang]} value={prospect.industry} />
            <InfoField label={UI.dashLocation[lang]} value={[prospect.city, prospect.country].filter(Boolean).join(", ")} />
            <InfoField label={UI.dashContact[lang]} value={prospect.contact_name || prospect.contact_email || "—"} />
          </div>
        )}
      </div>

      {/* Audits for this prospect */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">{UI.dashAudits[lang]}</h2>
        {audits.length > 0 ? (
          <div className="mt-4 space-y-3">
            {audits.map((audit) => (
              <Link
                key={audit.id}
                to="/dashboard/audits/$auditId"
                params={{ auditId: audit.id }}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{audit.website_url}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(audit.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-foreground">{audit.total_score ?? "—"}/100</span>
                  <StatusBadge status={audit.status} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">{UI.dashNoAudits[lang]}</p>
        )}
      </div>

      {!prospect && (
        <div className="mt-8 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-sm text-muted-foreground">Prospect non trouvé ou Supabase non configuré.</p>
        </div>
      )}
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value || "—"}</p>
    </div>
  );
}
