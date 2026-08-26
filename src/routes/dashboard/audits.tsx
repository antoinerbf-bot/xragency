// ── Audits list page ──

import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../../lib/i18n";
import { UI } from "../../lib/copy";
import { StatusBadge } from "../../components/saas/DashboardWidgets";
import { useState } from "react";
import { isSupabaseConfigured } from "../../lib/saas/supabase";
import type { Audit } from "../../lib/saas/types";

export const Route = createFileRoute("/dashboard/audits")({
  component: AuditsPage,
});

function AuditsPage() {
  const { lang } = useLang();
  const [audits, setAudits] = useState<Audit[]>([]);
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            {UI.dashAudits[lang]}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {audits.length} {UI.dashAudits[lang].toLowerCase()}
          </p>
        </div>
        <Link
          to="/dashboard/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {UI.dashRunAudit[lang]}
        </Link>
      </div>

      {/* Table */}
      {audits.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashWebsite[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashStatus[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashScore[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashDate[lang]}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{UI.dashActions[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{a.website_url}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3 font-semibold text-foreground">{a.total_score ?? "—"}/100</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link
                      to="/dashboard/audits/$auditId"
                      params={{ auditId: a.id }}
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
              <rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">{UI.dashNoAudits[lang]}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{UI.dashRunAudit[lang]}</p>
        </div>
      )}
    </div>
  );
}
