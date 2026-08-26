// ── Dashboard index — main overview page ──

import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../../lib/i18n";
import { UI } from "../../lib/copy";
import { StatCard } from "../../components/saas/DashboardWidgets";
import { useState } from "react";
import { getSupabase, isSupabaseConfigured } from "../../lib/saas/supabase";
import type { Prospect, Audit } from "../../lib/saas/types";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { lang } = useLang();
  const [quickUrl, setQuickUrl] = useState("");

  // Stats (placeholder until Supabase is connected)
  const configured = isSupabaseConfigured();
  const [stats] = useState({ prospects: 0, audits: 0, avgScore: 0, conversion: 0 });

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          {UI.dashTitle[lang]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          XRAGENCY AI Digital Audit —{" "}
          {new Date().toLocaleDateString(
            lang === "fr" ? "fr-FR" : lang === "vi" ? "vi-VN" : "en-US",
          )}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={UI.dashTotalProspects[lang]}
          value={stats.prospects}
          icon={<UsersIcon />}
        />
        <StatCard
          label={UI.dashAuditsCompleted[lang]}
          value={stats.audits}
          icon={<ClipboardIcon />}
        />
        <StatCard
          label={UI.dashAvgScore[lang]}
          value={stats.avgScore > 0 ? `${stats.avgScore}/100` : "—"}
          icon={<ScoreIcon />}
        />
        <StatCard
          label={UI.dashConversionRate[lang]}
          value={stats.conversion > 0 ? `${stats.conversion}%` : "—"}
          icon={<TrendIcon />}
        />
      </div>

      {/* Quick Audit */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">{UI.dashQuickAudit[lang]}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{UI.dashEnterUrl[lang]}</p>
        <div className="mt-4 flex gap-3">
          <input
            type="url"
            value={quickUrl}
            onChange={(e) => setQuickUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Link
            to="/dashboard/new"
            search={{ url: quickUrl || undefined }}
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {UI.dashAnalyze[lang]}
          </Link>
        </div>
      </div>

      {/* Supabase not configured warning */}
      {!configured && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-800">
            Supabase non configuré. Copiez{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">
              .env.example
            </code>{" "}
            vers <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">.env</code>{" "}
            et remplissez les identifiants Supabase.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Inline icons ──
function UsersIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}
function ScoreIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
