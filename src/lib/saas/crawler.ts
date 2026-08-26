// ── Web Crawler — server-side only ──
// Fetches a website, parses HTML, extracts structured data.
// Uses createServerFn to ensure it NEVER runs in the browser.

import { createServerFn } from "@tanstack/react-start";
import type { CrawledPage, CrawlResult } from "./types";

const MAX_PAGES = 15;
const TIMEOUT_MS = 10_000;
const MAX_BODY_SIZE = 2 * 1024 * 1024; // 2MB

// ── Fetch with timeout ──
async function fetchWithTimeout(url: string, timeout = TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "XRAgency-AuditBot/1.0 (+https://xragency.vercel.app)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// ── Minimal HTML parser (no external deps) ──
function extractTag(html: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function extractMeta(html: string, name: string): string | null {
  const re = new RegExp(
    `<meta[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`,
    "i",
  );
  const m = html.match(re);
  if (m) return m[1];
  // reverse order: content before name
  const re2 = new RegExp(
    `<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`,
    "i",
  );
  const m2 = html.match(re2);
  return m2 ? m2[1] : null;
}

function extractAllHeadings(html: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi");
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    if (text) results.push(text);
  }
  return results;
}

function extractLinks(html: string, baseUrl: string): { internal: string[]; external: string[] } {
  const re = /<a[^>]+href=["']([^"']+)["']/gi;
  const internal: string[] = [];
  const external: string[] = [];
  let m: RegExpExecArray | null;
  const baseHost = new URL(baseUrl).hostname;

  while ((m = re.exec(html)) !== null) {
    try {
      const resolved = new URL(m[1], baseUrl).href;
      const host = new URL(resolved).hostname;
      if (host === baseHost) {
        if (!internal.includes(resolved.split("#")[0])) internal.push(resolved.split("#")[0]);
      } else if (host && !m[1].startsWith("mailto:") && !m[1].startsWith("tel:")) {
        if (!external.includes(resolved)) external.push(resolved);
      }
    } catch {
      // skip invalid URLs
    }
  }
  return { internal, external };
}

function extractImages(html: string, baseUrl: string): { src: string; alt: string | null }[] {
  const re = /<img[^>]+src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?/gi;
  const results: { src: string; alt: string | null }[] = [];
  let m: RegExpExecArray | null;

  while ((m = re.exec(html)) !== null) {
    try {
      const src = new URL(m[1], baseUrl).href;
      // alt might be in different order
      const imgTag = m[0];
      const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
      results.push({ src, alt: altMatch ? altMatch[1] : null });
    } catch {
      // skip
    }
  }
  return results;
}

function extractEmails(html: string): string[] {
  const re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return [...new Set(html.match(re) ?? [])];
}

function extractPhones(html: string): string[] {
  const re = /(?:tel:|phone:|call:)?\+?[\d\s\-().]{8,}/g;
  const matches = html.match(re) ?? [];
  // Filter to likely phone numbers
  return [
    ...new Set(
      matches
        .map((m) => m.trim())
        .filter((m) => m.replace(/\D/g, "").length >= 7 && m.replace(/\D/g, "").length <= 15)
        .slice(0, 5),
    ),
  ];
}

function countWords(html: string): number {
  // Strip tags, count words in body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const text = (bodyMatch?.[1] ?? html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(/\s+/).filter(Boolean).length;
}

function hasPattern(html: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(html));
}

// ── Parse a single page ──
function parsePage(html: string, url: string, loadTime: number | null): CrawledPage {
  const { internal, external } = extractLinks(html, url);
  const images = extractImages(html, url);
  const emails = extractEmails(html);
  const phones = extractPhones(html);

  // Detect address patterns
  const addrPatterns = [
    /\d+\s+[A-Za-z\s]+(?:street|st|avenue|ave|road|rd|boulevard|blvd|lane|drive|dr)\b/gi,
    /\d+\s+[A-Za-zÀ-ÿ\s]+(?:rue|avenue|av|boulevard|bd|chemin|ch)\b/gi,
  ];
  const addresses = addrPatterns.flatMap((p) => html.match(p) ?? []).slice(0, 3);

  // Detect social links
  const socialPatterns = [
    /facebook\.com\/[^"'\s]+/gi,
    /twitter\.com\/[^"'\s]+/gi,
    /x\.com\/[^"'\s]+/gi,
    /linkedin\.com\/[^"'\s]+/gi,
    /instagram\.com\/[^"'\s]+/gi,
    /youtube\.com\/[^"'\s]+/gi,
  ];
  const socialLinks = socialPatterns.flatMap((p) => html.match(p) ?? []).slice(0, 10);

  return {
    url,
    statusCode: 200,
    title: extractMeta(html, "og:title") ?? extractTag(html, "title"),
    metaDescription: extractMeta(html, "description"),
    h1: extractAllHeadings(html, "h1"),
    h2: extractAllHeadings(html, "h2"),
    canonical: extractMeta(html, "canonical") ?? null,
    viewport: extractMeta(html, "viewport"),
    ogTitle: extractMeta(html, "og:title"),
    ogDescription: extractMeta(html, "og:description"),
    images,
    internalLinks: internal,
    externalLinks: external,
    hasContactForm: hasPattern(html, [/<form[^>]*>/i, /type=["']submit["']/i, /contact[-_]?form/i]),
    hasPhone: phones.length > 0 || /tel:/i.test(html),
    hasEmail: emails.length > 0 || /mailto:/i.test(html),
    hasAddress: addresses.length > 0,
    phoneNumbers: phones,
    emails: emails.slice(0, 5),
    addresses,
    socialLinks,
    hasTestimonials: hasPattern(html, [
      /testimonial/i,
      /review/i,
      /avis/i,
      /rating/i,
      /★/,
      /\d[.,]?\d\s*\/\s*5/,
    ]),
    hasBooking: hasPattern(html, [
      /booking/i,
      /reservation/i,
      /schedule/i,
      /calendar/i,
      /rendez[- ]?vous/i,
    ]),
    hasCTA: hasPattern(html, [
      /call[- ]?to[- ]?action/i,
      /get[- ]?(?:started|quote|in[- ]?touch)/i,
      /contact(?:ez|-)?(?:[- ]?nous)?/i,
      /demander/i,
      /commencer/i,
      /<button[^>]*>/i,
    ]),
    wordCount: countWords(html),
    loadTime,
  };
}

// ── Try fetching robots.txt ──
async function fetchRobotsTxt(
  baseUrl: string,
): Promise<{ content: string | null; allowsCrawl: boolean }> {
  try {
    const url = new URL("/robots.txt", baseUrl).href;
    const res = await fetchWithTimeout(url, 5000);
    if (res.ok) {
      const text = await res.text();
      // Check if our bot is disallowed
      const disallows = /User-agent:\s*\*[\s\S]*?Disallow:\s*\//i.test(text);
      return { content: text, allowsCrawl: !disallows };
    }
  } catch {
    // robots.txt not found — crawl is allowed
  }
  return { content: null, allowsCrawl: true };
}

// ── Try fetching sitemap.xml ──
async function fetchSitemap(baseUrl: string): Promise<{ found: boolean; urls: string[] }> {
  try {
    const url = new URL("/sitemap.xml", baseUrl).href;
    const res = await fetchWithTimeout(url, 5000);
    if (res.ok) {
      const xml = await res.text();
      const locs = xml.match(/<loc>([\s\S]*?)<\/loc>/gi) ?? [];
      const urls = locs
        .map((l) => l.replace(/<\/?loc>/gi, "").trim())
        .filter(Boolean)
        .slice(0, 50);
      return { found: true, urls };
    }
  } catch {
    // no sitemap
  }
  return { found: false, urls: [] };
}

// ══════════════════════════════════════════════════════════
// MAIN CRAWL FUNCTION (server-only)
// ══════════════════════════════════════════════════════════

export const crawlWebsite = createServerFn({ method: "POST" })
  .validator((data: { url: string }) => {
    if (!data?.url) throw new Error("URL is required");
    // Validate URL format
    let parsed: URL;
    try {
      parsed = new URL(data.url.startsWith("http") ? data.url : `https://${data.url}`);
    } catch {
      throw new Error("Invalid URL format");
    }
    return { url: parsed.href };
  })
  .handler(async ({ data }) => {
    const targetUrl = data.url;
    const errors: string[] = [];
    const baseHost = new URL(targetUrl).hostname;
    const isHttps = targetUrl.startsWith("https://");

    // 1. Check robots.txt
    const robots = await fetchRobotsTxt(targetUrl);

    // 2. Check sitemap
    const sitemap = await fetchSitemap(targetUrl);

    // 3. Crawl homepage
    const pages: CrawledPage[] = [];
    const visited = new Set<string>();
    const queue: string[] = [targetUrl];

    while (queue.length > 0 && pages.length < MAX_PAGES) {
      const url = queue.shift()!;
      if (visited.has(url)) continue;
      visited.add(url);

      try {
        const start = Date.now();
        const res = await fetchWithTimeout(url);
        const loadTime = Date.now() - start;

        if (!res.ok) {
          errors.push(`${url} returned ${res.status}`);
          continue;
        }

        const contentType = res.headers.get("content-type") ?? "";
        if (!contentType.includes("text/html")) {
          continue; // skip non-HTML
        }

        const raw = await res.text();
        if (raw.length > MAX_BODY_SIZE) {
          errors.push(`${url} too large (${(raw.length / 1024 / 1024).toFixed(1)}MB), skipped`);
          continue;
        }

        const page = parsePage(raw, url, loadTime);
        pages.push(page);

        // Add internal links to queue (only HTML pages, max depth)
        for (const link of page.internalLinks) {
          if (
            !visited.has(link) &&
            new URL(link).hostname === baseHost &&
            queue.length < MAX_PAGES * 3
          ) {
            queue.push(link);
          }
        }
      } catch (err) {
        errors.push(
          `Failed to crawl ${url}: ${err instanceof Error ? err.message : "unknown error"}`,
        );
      }
    }

    const result: CrawlResult = {
      homepageUrl: targetUrl,
      pages,
      robotsTxt: robots.content,
      sitemapFound: sitemap.found,
      sitemapUrls: sitemap.urls,
      https: isHttps,
      totalPages: pages.length,
      errors,
    };

    return result;
  });
