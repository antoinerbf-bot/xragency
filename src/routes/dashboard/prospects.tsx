// ── Prospects list page ──

import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../../lib/i18n";
import { UI } from "../../lib/copy";
import { StatusBadge } from "../../components/saas/DashboardWidgets";
import { useState } from "react";
import { isSupabaseConfigured, getSupabase } from "../../lib/saas/supabase";
import type { Prospect } from "../../lib/saas/types";

export const Route = createFileRoute("/dashboard/prospects")({
  component: ProspectsPage,
});

function ProspectsPage() {
  const { lang } = useLang();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();

  // In a real implementation, this would fetch from Supabase
  // For now, show empty state

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            {UI.dashProspects[lang]}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {prospects.length} {UI.dashProspects[lang].toLowerCase()}
          </p>
        </div>
        <Link
          to="/dashboard/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {UI.dashAddProspect[lang]}
        </Link>
      </div>

      {/* Table */}
      {prospects.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashBusinessName[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashWebsite[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashIndustry[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashLocation[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashStatus[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashScore[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashActions[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{p.business_name || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.website_url}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.industry || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{[p.city, p.country].filter(Boolean).join(", ") || "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 font-semibold text-foreground">{p.latest_score ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Link
                      to="/dashboard/prospects/$prospectId"
                      params={{ prospectId: p.id }}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Voir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">{UI.dashNoProspects[lang]}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {UI.dashAddProspect[lang]}
          </p>
        </div>
      )}

      {!configured && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-800">
            Configurez Supabase pour gérer vos prospects.
          </p>
        </div>
      )}
    </div>
  );
}
