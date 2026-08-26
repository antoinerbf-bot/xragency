// ── XRAGENCY AI DIGITAL AUDIT — Type definitions ──

export type Role = "agency" | "client";

export type ProspectStatus = "new" | "audited" | "contacted" | "qualified" | "client";

export type AuditStatus = "pending" | "crawling" | "analyzing" | "completed" | "failed";

export type IssueCategory = "technical" | "seo" | "ux" | "local" | "performance";

export type IssueSeverity = "critical" | "high" | "medium" | "low" | "info";

export type OpportunityPriority = "critical" | "high" | "medium" | "low";

export type OpportunityStatus = "detected" | "proposed" | "accepted" | "rejected";

export type LogLevel = "info" | "warn" | "error";

// ── Database row types ──

export interface Profile {
  id: string;
  role: Role;
  full_name: string | null;
  company: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Prospect {
  id: string;
  owner_id: string;
  business_name: string | null;
  website_url: string;
  industry: string | null;
  country: string | null;
  city: string | null;
  contact_name: string | null;
  contact_email: string | null;
  phone: string | null;
  notes: string | null;
  status: ProspectStatus;
  latest_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface Audit {
  id: string;
  prospect_id: string;
  owner_id: string;
  website_url: string;
  status: AuditStatus;
  total_score: number | null;
  score_tech: number | null;
  score_seo: number | null;
  score_ux: number | null;
  score_local: number | null;
  score_perf: number | null;
  pages_crawled: number;
  page_count: number;
  executive_summary: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface AuditIssue {
  id: string;
  audit_id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string | null;
  why_it_matters: string | null;
  business_impact: string | null;
  recommendation: string | null;
  score_impact: number;
  detected: boolean;
  page_url: string | null;
  created_at: string;
}

export interface AuditOpportunity {
  id: string;
  audit_id: string;
  issue_id: string | null;
  opportunity_name: string;
  description: string | null;
  recommended_service: string;
  priority: OpportunityPriority;
  estimated_value: number | null;
  status: OpportunityStatus;
  created_at: string;
}

export interface AuditLog {
  id: string;
  audit_id: string;
  level: LogLevel;
  message: string;
  created_at: string;
}

// ── Score interpretation ──

export function scoreLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Excellent", color: "text-emerald-500" };
  if (score >= 75) return { label: "Strong", color: "text-green-500" };
  if (score >= 60) return { label: "Needs Improvement", color: "text-amber-500" };
  if (score >= 40) return { label: "Weak", color: "text-orange-500" };
  return { label: "Critical", color: "text-red-500" };
}

// ── Score category weights (each 0-20, total 0-100) ──

export const SCORE_CATEGORIES = [
  { key: "score_tech" as const, label: "Technical SEO", maxPoints: 20 },
  { key: "score_seo" as const, label: "SEO & Content", maxPoints: 20 },
  { key: "score_ux" as const, label: "UX & Conversion", maxPoints: 20 },
  { key: "score_local" as const, label: "Local Presence", maxPoints: 20 },
  { key: "score_perf" as const, label: "Performance", maxPoints: 20 },
] as const;

// ── Crawl result (intermediate) ──

export interface CrawledPage {
  url: string;
  statusCode: number;
  title: string | null;
  metaDescription: string | null;
  h1: string[];
  h2: string[];
  canonical: string | null;
  viewport: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  images: { src: string; alt: string | null }[];
  internalLinks: string[];
  externalLinks: string[];
  hasContactForm: boolean;
  hasPhone: boolean;
  hasEmail: boolean;
  hasAddress: boolean;
  phoneNumbers: string[];
  emails: string[];
  addresses: string[];
  socialLinks: string[];
  hasTestimonials: boolean;
  hasBooking: boolean;
  hasCTA: boolean;
  wordCount: number;
  loadTime: number | null;
}

export interface CrawlResult {
  homepageUrl: string;
  pages: CrawledPage[];
  robotsTxt: string | null;
  sitemapFound: boolean;
  sitemapUrls: string[];
  https: boolean;
  totalPages: number;
  errors: string[];
}

// ── New Audit form input ──

export interface NewAuditInput {
  websiteUrl: string;
  businessName?: string;
  industry?: string;
  country?: string;
  city?: string;
  contactName?: string;
  contactEmail?: string;
  phone?: string;
  notes?: string;
}
