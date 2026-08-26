// ── Analyzer — detects issues from crawl data ──
// Runs server-side. Takes a CrawlResult and produces AuditIssue[].

import type { CrawlResult, CrawledPage, AuditIssue, IssueCategory, IssueSeverity } from "./types";

interface IssueInput {
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  whyItMatters: string;
  businessImpact: string;
  recommendation: string;
  scoreImpact: number;
  pageUrl?: string;
}

function issue(input: IssueInput): AuditIssue {
  return {
    id: crypto.randomUUID(),
    audit_id: "", // filled by caller
    category: input.category,
    severity: input.severity,
    title: input.title,
    description: input.description,
    why_it_matters: input.whyItMatters,
    business_impact: input.businessImpact,
    recommendation: input.recommendation,
    score_impact: input.scoreImpact,
    detected: true,
    page_url: input.pageUrl ?? null,
    created_at: new Date().toISOString(),
  };
}

// ══════════════════════════════════════════════════════════
// ANALYSIS RULES
// ══════════════════════════════════════════════════════════

function analyzeTechnical(crawl: CrawlResult): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const home = crawl.pages[0];

  // HTTPS
  if (!crawl.https) {
    issues.push(issue({
      category: "technical",
      severity: "critical",
      title: "HTTPS Not Enabled",
      description: "The website is served over HTTP instead of HTTPS. Data transmitted between visitors and the site is not encrypted.",
      whyItMatters: "Modern browsers flag HTTP sites as 'Not Secure', and Google uses HTTPS as a ranking signal.",
      businessImpact: "Visitors see security warnings, reducing trust and increasing bounce rates. Search rankings may drop.",
      recommendation: "Install an SSL certificate and redirect all HTTP traffic to HTTPS.",
      scoreImpact: -8,
    }));
  }

  // robots.txt
  if (!crawl.robotsTxt) {
    issues.push(issue({
      category: "technical",
      severity: "medium",
      title: "Missing robots.txt",
      description: "No robots.txt file was found at the root of the website.",
      whyItMatters: "Search engine crawlers use robots.txt to understand which pages to crawl.",
      businessImpact: "Without guidance, crawlers may index low-value pages or waste crawl budget.",
      recommendation: "Create a robots.txt file at the site root with appropriate directives.",
      scoreImpact: -2,
    }));
  }

  // sitemap
  if (!crawl.sitemapFound) {
    issues.push(issue({
      category: "technical",
      severity: "medium",
      title: "Missing XML Sitemap",
      description: "No sitemap.xml was found at the root of the website.",
      whyItMatters: "Sitemaps help search engines discover and index all important pages.",
      businessImpact: "Pages may remain unindexed, reducing organic visibility.",
      recommendation: "Generate and submit an XML sitemap to Google Search Console.",
      scoreImpact: -3,
    }));
  }

  if (home) {
    // Viewport
    if (!home.viewport) {
      issues.push(issue({
        category: "technical",
        severity: "high",
        title: "Missing Viewport Meta Tag",
        description: "The page does not define a viewport meta tag for responsive rendering.",
        whyItMatters: "Without a viewport tag, mobile browsers render the page at desktop width, making it unreadable.",
        businessImpact: "Mobile visitors (often 50%+ of traffic) will have a poor experience and leave.",
        recommendation: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> to the <head>.",
        scoreImpact: -5,
        pageUrl: home.url,
      }));
    }

    // Canonical
    if (!home.canonical) {
      issues.push(issue({
        category: "technical",
        severity: "low",
        title: "Missing Canonical URL",
        description: "No canonical link element was found on the homepage.",
        whyItMatters: "Canonical tags prevent duplicate content issues by telling search engines the preferred URL.",
        businessImpact: "Duplicate content can dilute search rankings across multiple URL variations.",
        recommendation: "Add a <link rel=\"canonical\"> tag pointing to the preferred homepage URL.",
        scoreImpact: -1,
        pageUrl: home.url,
      }));
    }

    // Images without alt
    const imagesWithoutAlt = home.images.filter((img) => !img.alt || img.alt.trim() === "");
    if (imagesWithoutAlt.length > 0) {
      issues.push(issue({
        category: "technical",
        severity: imagesWithoutAlt.length > 5 ? "high" : "medium",
        title: `${imagesWithoutAlt.length} Image(s) Missing Alt Text`,
        description: `${imagesWithoutAlt.length} out of ${home.images.length} images have no alt attribute.`,
        whyItMatters: "Alt text is essential for accessibility (screen readers) and image SEO.",
        businessImpact: "Visually impaired users cannot understand image content. Image search traffic is lost.",
        recommendation: "Add descriptive alt text to every image, including relevant keywords where appropriate.",
        scoreImpact: -Math.min(imagesWithoutAlt.length, 5),
        pageUrl: home.url,
      }));
    }
  }

  return issues;
}

function analyzeSEO(crawl: CrawlResult): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const home = crawl.pages[0];

  if (home) {
    // Title
    if (!home.title) {
      issues.push(issue({
        category: "seo",
        severity: "critical",
        title: "Missing Page Title",
        description: "The homepage has no <title> tag or it is empty.",
        whyItMatters: "The title tag is the #1 on-page SEO factor. It appears in search results and browser tabs.",
        businessImpact: "Without a title, search engines struggle to understand the page topic. CTR drops dramatically.",
        recommendation: "Create a unique, keyword-rich title (50-60 characters) for the homepage.",
        scoreImpact: -8,
        pageUrl: home.url,
      }));
    }

    // Meta description
    if (!home.metaDescription) {
      issues.push(issue({
        category: "seo",
        severity: "high",
        title: "Missing Meta Description",
        description: "The homepage has no meta description tag.",
        whyItMatters: "Search engines generate their own snippets when no meta description exists, often poorly.",
        businessImpact: "Lower click-through rates from search results. Potential customers skip your listing.",
        recommendation: "Write a compelling meta description (150-160 chars) with a clear value proposition and call to action.",
        scoreImpact: -4,
        pageUrl: home.url,
      }));
    }

    // H1
    if (home.h1.length === 0) {
      issues.push(issue({
        category: "seo",
        severity: "high",
        title: "Missing H1 Heading",
        description: "The homepage has no H1 heading tag.",
        whyItMatters: "H1 is the primary heading signal for search engines to understand page content.",
        businessImpact: "Search engines may misinterpret the page topic, reducing relevant traffic.",
        recommendation: "Add exactly one H1 tag with a clear, keyword-focused heading.",
        scoreImpact: -4,
        pageUrl: home.url,
      }));
    } else if (home.h1.length > 1) {
      issues.push(issue({
        category: "seo",
        severity: "medium",
        title: `Multiple H1 Tags (${home.h1.length})`,
        description: `The homepage has ${home.h1.length} H1 tags. Best practice is one H1 per page.`,
        whyItMatters: "Multiple H1s dilute the heading signal and confuse search engines about the main topic.",
        businessImpact: "Weaker SEO signal may reduce rankings for target keywords.",
        recommendation: "Consolidate to a single H1 and use H2/H3 for subheadings.",
        scoreImpact: -2,
        pageUrl: home.url,
      }));
    }

    // Word count
    if (home.wordCount < 300) {
      issues.push(issue({
        category: "seo",
        severity: "high",
        title: "Thin Content",
        description: `The homepage has only ${home.wordCount} words. Quality pages typically have 600+ words.`,
        whyItMatters: "Search engines favor comprehensive content that thoroughly covers a topic.",
        businessImpact: "Thin content ranks poorly, losing organic traffic to competitors with richer pages.",
        recommendation: "Expand content with detailed service descriptions, value propositions, and relevant keywords.",
        scoreImpact: -5,
        pageUrl: home.url,
      }));
    }
  }

  // OG tags
  if (home && (!home.ogTitle || !home.ogDescription)) {
    issues.push(issue({
      category: "seo",
      severity: "low",
      title: "Missing Open Graph Tags",
      description: "The homepage is missing og:title and/or og:description meta tags.",
      whyItMatters: "Open Graph tags control how links appear when shared on social media and messaging apps.",
      businessImpact: "Poor social media previews reduce click-through rates from shared links.",
      recommendation: "Add og:title, og:description, og:image, and og:url meta tags.",
      scoreImpact: -1,
      pageUrl: home.url,
    }));
  }

  return issues;
}

function analyzeUX(crawl: CrawlResult): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const home = crawl.pages[0];

  if (home) {
    // CTA
    if (!home.hasCTA) {
      issues.push(issue({
        category: "ux",
        severity: "high",
        title: "No Clear Call-to-Action",
        description: "No prominent CTA button, form, or action-oriented link was detected on the homepage.",
        whyItMatters: "Visitors need clear guidance on what to do next. Without a CTA, they leave without converting.",
        businessImpact: "Lost conversions. Visitors leave the site without contacting, buying, or booking.",
        recommendation: "Add a prominent, compelling CTA above the fold (e.g., 'Get a Free Quote', 'Book a Consultation').",
        scoreImpact: -6,
        pageUrl: home.url,
      }));
    }

    // Contact form
    if (!home.hasContactForm && !home.hasPhone && !home.hasEmail) {
      issues.push(issue({
        category: "ux",
        severity: "critical",
        title: "No Contact Method Detected",
        description: "The homepage has no contact form, phone number, or email address.",
        whyItMatters: "Visitors who want to reach you have no way to do so. This is a conversion killer.",
        businessImpact: "Every visitor who wants to contact you but can't is lost revenue.",
        recommendation: "Add a contact form, phone number, and email address prominently on the homepage.",
        scoreImpact: -8,
        pageUrl: home.url,
      }));
    }

    // Testimonials / social proof
    if (!home.hasTestimonials) {
      issues.push(issue({
        category: "ux",
        severity: "medium",
        title: "No Testimonials or Reviews",
        description: "No customer testimonials, reviews, or star ratings were detected.",
        whyItMatters: "Social proof is one of the strongest conversion drivers. Visitors trust other customers' experiences.",
        businessImpact: "Without social proof, visitors have no reason to trust your business over competitors.",
        recommendation: "Add customer testimonials, Google reviews, or case study snippets to the homepage.",
        scoreImpact: -3,
        pageUrl: home.url,
      }));
    }
  }

  return issues;
}

function analyzeLocal(crawl: CrawlResult): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const home = crawl.pages[0];

  if (home) {
    // NAP (Name, Address, Phone)
    if (!home.hasAddress && !home.hasPhone) {
      issues.push(issue({
        category: "local",
        severity: "high",
        title: "No Local Business Information",
        description: "No physical address or phone number was detected on the website.",
        whyItMatters: "Local businesses need NAP (Name, Address, Phone) for Google Maps ranking and local trust.",
        businessImpact: "Google may not rank you in local searches. Nearby customers find competitors instead.",
        recommendation: "Add your full business address and phone number to the homepage and contact page.",
        scoreImpact: -5,
        pageUrl: home.url,
      }));
    }

    if (!home.hasAddress) {
      issues.push(issue({
        category: "local",
        severity: "medium",
        title: "No Physical Address",
        description: "No street address was found on the homepage.",
        whyItMatters: "A physical address is a strong local SEO signal and builds trust with local customers.",
        businessImpact: "Lower Google Maps ranking. Customers may perceive the business as less legitimate.",
        recommendation: "Add your business address in the footer and contact page.",
        scoreImpact: -3,
        pageUrl: home.url,
      }));
    }

    // Google Business / Maps link
    const hasGoogleMaps = crawl.pages.some(
      (p) => p.socialLinks.some((l) => /maps\.google|google\.com\/maps/i.test(l)) ||
        p.externalLinks.some((l) => /google\.com\/maps/i.test(l)),
    );
    if (!hasGoogleMaps) {
      issues.push(issue({
        category: "local",
        severity: "medium",
        title: "No Google Maps / Business Profile Link",
        description: "No link to a Google Maps listing or Google Business Profile was detected.",
        whyItMatters: "Linking to your Google Business Profile strengthens local SEO signals.",
        businessImpact: "Missed opportunity to drive local traffic and improve Maps ranking.",
        recommendation: "Add a link to your Google Business Profile in the footer or contact section.",
        scoreImpact: -2,
        pageUrl: home.url,
      }));
    }
  }

  return issues;
}

function analyzePerformance(crawl: CrawlResult): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const home = crawl.pages[0];

  if (home) {
    // Page load time (from our crawl)
    if (home.loadTime && home.loadTime > 3000) {
      issues.push(issue({
        category: "performance",
        severity: "high",
        title: `Slow Page Load (${(home.loadTime / 1000).toFixed(1)}s)`,
        description: `The homepage took ${(home.loadTime / 1000).toFixed(1)} seconds to load.`,
        whyItMatters: "Google recommends pages load in under 2.5 seconds. Slow sites lose visitors and rankings.",
        businessImpact: "53% of mobile users abandon sites that take more than 3 seconds to load.",
        recommendation: "Optimize images, enable compression, minimize CSS/JS, and use a CDN.",
        scoreImpact: -5,
        pageUrl: home.url,
      }));
    }

    // Too many images
    if (home.images.length > 30) {
      issues.push(issue({
        category: "performance",
        severity: "medium",
        title: `Excessive Images (${home.images.length})`,
        description: `The homepage contains ${home.images.length} images, which may slow down the page.`,
        whyItMatters: "Each image adds download time. Unoptimized images are the #1 cause of slow pages.",
        businessImpact: "Slow pages increase bounce rate and decrease conversions.",
        recommendation: "Compress images, use WebP format, implement lazy loading, and remove unnecessary images.",
        scoreImpact: -3,
        pageUrl: home.url,
      }));
    }

    // External links (too many can slow rendering)
    if (home.externalLinks.length > 20) {
      issues.push(issue({
        category: "performance",
        severity: "low",
        title: `Many External Links (${home.externalLinks.length})`,
        description: `The homepage has ${home.externalLinks.length} external links.`,
        whyItMatters: "Excessive external links can leak page authority and slow down rendering.",
        businessImpact: "SEO authority is diluted. Some links may lead to low-quality sites.",
        recommendation: "Review external links and add rel=\"nofollow\" where appropriate. Remove unnecessary ones.",
        scoreImpact: -1,
        pageUrl: home.url,
      }));
    }
  }

  return issues;
}

// ══════════════════════════════════════════════════════════
// MAIN ANALYZE FUNCTION
// ══════════════════════════════════════════════════════════

export function analyzeCrawl(crawl: CrawlResult, auditId: string): AuditIssue[] {
  const allIssues = [
    ...analyzeTechnical(crawl),
    ...analyzeSEO(crawl),
    ...analyzeUX(crawl),
    ...analyzeLocal(crawl),
    ...analyzePerformance(crawl),
  ];

  // Assign audit_id
  for (const i of allIssues) {
    i.audit_id = auditId;
  }

  return allIssues;
}
