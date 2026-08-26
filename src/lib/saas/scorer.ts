// ── Scorer — computes Digital Score from issues ──
// Each category starts at 20 points. Issues deduct points.
// Total = sum of 5 categories (0-100).

import type { AuditIssue, CrawlResult } from "./types";

export interface ScoreResult {
  total: number;
  tech: number;
  seo: number;
  ux: number;
  local: number;
  perf: number;
}

const MAX_PER_CATEGORY = 20;

function computeCategory(
  issues: AuditIssue[],
  category: string,
): number {
  const catIssues = issues.filter((i) => i.category === category);
  let deduction = 0;
  for (const issue of catIssues) {
    deduction += Math.abs(issue.score_impact);
  }
  return Math.max(0, Math.min(MAX_PER_CATEGORY, MAX_PER_CATEGORY - deduction));
}

export function computeScore(issues: AuditIssue[], _crawl: CrawlResult): ScoreResult {
  const tech = computeCategory(issues, "technical");
  const seo = computeCategory(issues, "seo");
  const ux = computeCategory(issues, "ux");
  const local = computeCategory(issues, "local");
  const perf = computeCategory(issues, "performance");

  const total = tech + seo + ux + local + perf;

  return { total, tech, seo, ux, local, perf };
}

// ── Generate executive summary from score + issues ──
export function generateSummary(
  score: ScoreResult,
  issues: AuditIssue[],
  websiteUrl: string,
): string {
  const criticals = issues.filter((i) => i.severity === "critical").length;
  const highs = issues.filter((i) => i.severity === "high").length;
  const total = issues.length;

  let rating: string;
  if (score.total >= 90) rating = "excellent";
  else if (score.total >= 75) rating = "strong";
  else if (score.total >= 60) rating = "needs improvement";
  else if (score.total >= 40) rating = "weak";
  else rating = "critical";

  const weakest = [
    { name: "Technical SEO", score: score.tech },
    { name: "SEO & Content", score: score.seo },
    { name: "UX & Conversion", score: score.ux },
    { name: "Local Presence", score: score.local },
    { name: "Performance", score: score.perf },
  ].sort((a, b) => a.score - b.score);

  return [
    `Audit of ${websiteUrl}`,
    `Digital Score: ${score.total}/100 (${rating}).`,
    `${total} issues detected: ${criticals} critical, ${highs} high priority.`,
    `Weakest area: ${weakest[0].name} (${weakest[0].score}/20).`,
    `Strongest area: ${weakest[weakest.length - 1].name} (${weakest[weakest.length - 1].score}/20).`,
  ].join(" ");
}
