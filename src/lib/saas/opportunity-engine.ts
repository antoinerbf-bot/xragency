// ── Opportunity Engine ──
// Transforms detected issues into commercial opportunities
// mapped to XRAGENCY services.

import type { AuditIssue, AuditOpportunity } from "./types";

// ── Mapping rules: issue patterns → XRAGENCY service ──

interface OpportunityRule {
  // Match conditions (any match triggers the opportunity)
  matchCategories?: string[];
  matchSeverities?: string[];
  matchTitlePatterns?: RegExp[];
  // Output
  name: string;
  description: string;
  service: string;
  priority: "critical" | "high" | "medium" | "low";
}

const RULES: OpportunityRule[] = [
  // ── Website Redesign ──
  {
    matchCategories: ["technical", "ux"],
    matchSeverities: ["critical", "high"],
    matchTitlePatterns: [/https/i, /viewport/i, /contact/i, /call.to.action/i],
    name: "Website Redesign",
    description:
      "The website has fundamental technical and UX issues that require a professional redesign to meet modern standards.",
    service: "websites",
    priority: "critical",
  },
  // ── SEO Domination ──
  {
    matchCategories: ["seo"],
    matchSeverities: ["critical", "high"],
    matchTitlePatterns: [/title/i, /meta description/i, /h1/i, /thin content/i],
    name: "SEO Optimization",
    description:
      "Critical SEO gaps detected (missing titles, meta descriptions, heading structure). A targeted SEO strategy can significantly improve organic visibility.",
    service: "seo",
    priority: "high",
  },
  // ── Local SEO / Google Maps ──
  {
    matchCategories: ["local"],
    matchSeverities: ["critical", "high", "medium"],
    name: "Google Maps TOP 3 + Local SEO",
    description:
      "Local business signals are weak or absent. Optimizing Google Business Profile and local SEO can drive direct calls and visits from nearby customers.",
    service: "maps",
    priority: "high",
  },
  // ── Conversion Optimization ──
  {
    matchCategories: ["ux"],
    matchSeverities: ["high", "medium"],
    matchTitlePatterns: [/cta/i, /testimonial/i, /contact/i, /conversion/i],
    name: "Conversion Rate Optimization",
    description:
      "The website lacks key conversion elements (CTAs, social proof, contact methods). Optimizing these can significantly increase lead generation.",
    service: "websites",
    priority: "high",
  },
  // ── Performance Optimization ──
  {
    matchCategories: ["performance"],
    matchSeverities: ["high", "medium"],
    name: "Website Performance Optimization",
    description:
      "Page speed issues detected. Faster websites rank higher, retain more visitors, and convert better.",
    service: "maintenance",
    priority: "medium",
  },
  // ── Content Strategy ──
  {
    matchCategories: ["seo"],
    matchSeverities: ["high", "medium"],
    matchTitlePatterns: [/thin content/i, /word/i, /content/i],
    name: "Content & SEO Strategy",
    description:
      "Content is too thin or poorly structured. A professional content strategy with targeted keywords can drive sustainable organic traffic.",
    service: "seo",
    priority: "medium",
  },
  // ── Branding ──
  {
    matchCategories: ["seo"],
    matchSeverities: ["low", "medium"],
    matchTitlePatterns: [/open graph/i, /og:/i],
    name: "Brand Identity & Social Presence",
    description:
      "Social sharing metadata is missing. A strong brand identity with proper social media integration improves online presence.",
    service: "branding",
    priority: "low",
  },
  // ── AI Assistant ──
  {
    matchCategories: ["ux"],
    matchSeverities: ["medium", "low"],
    matchTitlePatterns: [/contact/i, /form/i, /booking/i],
    name: "24/7 AI Assistant & Lead Qualification",
    description:
      "Contact and booking capabilities can be enhanced with an AI assistant that qualifies leads and responds instantly, 24/7.",
    service: "ai",
    priority: "medium",
  },
];

// ── Deduplicate opportunities by service ──
function deduplicate(opps: AuditOpportunity[]): AuditOpportunity[] {
  const seen = new Map<string, AuditOpportunity>();
  for (const opp of opps) {
    const key = opp.recommended_service;
    if (!seen.has(key) || priorityWeight(opp.priority) > priorityWeight(seen.get(key)!.priority)) {
      seen.set(key, opp);
    }
  }
  return [...seen.values()];
}

function priorityWeight(p: string): number {
  return { critical: 4, high: 3, medium: 2, low: 1 }[p] ?? 0;
}

// ══════════════════════════════════════════════════════════
// MAIN FUNCTION
// ══════════════════════════════════════════════════════════

export function generateOpportunities(issues: AuditIssue[], auditId: string): AuditOpportunity[] {
  const opps: AuditOpportunity[] = [];

  for (const rule of RULES) {
    // Find matching issues
    const matchingIssues = issues.filter((issue) => {
      // Category match
      if (rule.matchCategories && !rule.matchCategories.includes(issue.category)) return false;
      // Severity match
      if (rule.matchSeverities && !rule.matchSeverities.includes(issue.severity)) return false;
      // Title pattern match (if specified)
      if (rule.matchTitlePatterns) {
        const matchesPattern = rule.matchTitlePatterns.some((p) => p.test(issue.title));
        if (!matchesPattern) return false;
      }
      return true;
    });

    if (matchingIssues.length === 0) continue;

    // Find the most relevant issue to link
    const primaryIssue = matchingIssues.sort(
      (a, b) => priorityWeight(b.severity) - priorityWeight(a.severity),
    )[0];

    opps.push({
      id: crypto.randomUUID(),
      audit_id: auditId,
      issue_id: primaryIssue.id,
      opportunity_name: rule.name,
      description: rule.description,
      recommended_service: rule.service,
      priority: rule.priority,
      estimated_value: null, // No pricing connected yet
      status: "detected",
      created_at: new Date().toISOString(),
    });
  }

  return deduplicate(opps);
}
