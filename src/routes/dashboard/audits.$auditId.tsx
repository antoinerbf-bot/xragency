// ── Audit result page — shows full audit results with score, issues, opportunities ──

import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../../lib/i18n";
import { UI } from "../../lib/copy";
import { ScoreRing, StatusBadge, CategoryBar } from "../../components/saas/DashboardWidgets";
import { useState } from "react";
import { SCORE_CATEGORIES, scoreLabel } from "../../lib/saas/types";
import type { Audit, AuditIssue, AuditOpportunity } from "../../lib/saas/types";

export const Route = createFileRoute("/dashboard/audits/$auditId")({
  component: AuditResult,
});

function AuditResult() {
  const { auditId } = Route.useParams();
  const { lang } = useLang();
  const [audit, setAudit] = useState<Audit | null>(null);
  const [issues, setIssues] = useState<AuditIssue[]>([]);
  const [opportunities, setOpportunities] = useState<AuditOpportunity[]>([]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/dashboard/audits" className="hover:text-foreground transition-colors">
          {UI.dashAudits[lang]}
        </Link>
        <span>/</span>
        <span className="text-foreground">#{auditId.slice(0, 8)}</span>
      </div>

      {!audit ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Audit non trouvé ou Supabase non configuré.
          </p>
          <Link
            to="/dashboard/new"
            className="mt-4 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {UI.dashRunAudit[lang]}
          </Link>
        </div>
      ) : (
        <>
          {/* Score overview */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {audit.website_url}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {new Date(audit.created_at).toLocaleDateString()} · {audit.pages_crawled} pages
                  crawlées
                </p>
              </div>
              <StatusBadge status={audit.status} />
            </div>

            {audit.total_score !== null && (
              <div className="mt-6 flex items-center gap-8">
                <div className="relative">
                  <ScoreRing score={audit.total_score} size={140} />
                </div>
                <div className="flex-1 space-y-3">
                  {SCORE_CATEGORIES.map((cat) => (
                    <CategoryBar
                      key={cat.key}
                      label={cat.label}
                      score={audit[cat.key] ?? 0}
                      maxScore={cat.maxPoints}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Executive summary */}
          {audit.executive_summary && (
            <div className="mt-6 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">
                {UI.dashExecutiveSummary[lang]}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {audit.executive_summary}
              </p>
            </div>
          )}

          {/* Issues */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              {UI.dashIssues[lang]} ({issues.length})
            </h2>
            {issues.length > 0 ? (
              <div className="mt-4 space-y-3">
                {issues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Aucun problème détecté.</p>
            )}
          </div>

          {/* Opportunities */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              {UI.dashOpportunities[lang]} ({opportunities.length})
            </h2>
            {opportunities.length > 0 ? (
              <div className="mt-4 space-y-3">
                {opportunities.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Aucune opportunité détectée.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function IssueCard({ issue }: { issue: AuditIssue }) {
  const severityColors: Record<string, string> = {
    critical: "border-l-red-500",
    high: "border-l-orange-500",
    medium: "border-l-amber-500",
    low: "border-l-blue-500",
    info: "border-l-gray-300",
  };

  return (
    <div
      className={`rounded-lg border border-border border-l-4 ${severityColors[issue.severity] ?? ""} p-4`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{issue.title}</h3>
          {issue.description && (
            <p className="mt-1 text-xs text-muted-foreground">{issue.description}</p>
          )}
        </div>
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {issue.severity}
        </span>
      </div>
      {issue.recommendation && (
        <p className="mt-2 text-xs text-emerald-600">
          <span className="font-medium">Recommandation:</span> {issue.recommendation}
        </p>
      )}
    </div>
  );
}

function OpportunityCard({ opportunity }: { opportunity: AuditOpportunity }) {
  const priorityColors: Record<string, string> = {
    critical: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{opportunity.opportunity_name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{opportunity.description}</p>
          <p className="mt-2 text-xs font-medium text-primary">
            Service: {opportunity.recommended_service}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[opportunity.priority] ?? ""}`}
        >
          {opportunity.priority}
        </span>
      </div>
    </div>
  );
}
