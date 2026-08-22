import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { LanguageProvider } from "../lib/i18n";
import { WhatsAppWidget } from "../components/site/WhatsAppWidget";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "XR Agency 2030 — Studio digital premium & IA" },
      {
        name: "description",
        content:
          "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI.",
      },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "XR Agency 2030 — Studio digital premium & IA" },
      {
        property: "og:description",
        content:
          "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "XR Agency 2030 — Studio digital premium & IA" },
      {
        name: "twitter:description",
        content:
          "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/598abd61-8cc7-4f7d-81d3-3cb16b65c5e5/id-preview-6d4a4fa1--18d903fa-c8c0-4cc8-8ba4-d9c21f212aaa.lovable.app-1785400682426.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/598abd61-8cc7-4f7d-81d3-3cb16b65c5e5/id-preview-6d4a4fa1--18d903fa-c8c0-4cc8-8ba4-d9c21f212aaa.lovable.app-1785400682426.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "XR Agency 2030",
    description:
      "Studio digital & IA de prestige : création de sites web sur-mesure, branding, SEO domination, Google Maps TOP 3 et assistants IA.",
    telephone: "+33 7 67 56 67 83",
    email: "contact.xragency@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    priceRange: "€€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "48",
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <WhatsAppWidget />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
