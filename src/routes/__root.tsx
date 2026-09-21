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
import { CartProvider } from "../hooks/useCart";
import { Cart } from "../components/site/Cart";
import { WhatsAppWidget } from "../components/site/WhatsAppWidget";
import { CursorGlow } from "../components/site/CursorGlow";
import { ThemeSwitcher } from "../components/theme/ThemeSwitcher";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import "../lib/more-showcase";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Try again</button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">Go home</a>
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
      { title: "XR Agency — Studio digital premium & IA" },
      { name: "description", content: "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI." },
      { name: "author", content: "XR Agency" },
      { property: "og:title", content: "XR Agency — Studio digital premium & IA" },
      { property: "og:description", content: "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XR Agency — Studio digital premium & IA" },
      { name: "twitter:description", content: "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI." },
      { property: "og:image", content: "https://xragency.vercel.app/x-favicon.svg" },
      { name: "twitter:image", content: "https://xragency.vercel.app/x-favicon.svg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/x-favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "preload", as: "style", href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" },
      { rel: "canonical", href: "https://xragency.vercel.app" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.history.scrollRestoration = "manual";
      window.history.replaceState(null, "", "/");
      const reset = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      reset();
      requestAnimationFrame(reset);
      setTimeout(reset, 80);
      return () => { window.history.scrollRestoration = "auto"; };
    }
  }, []);

  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "XR Agency",
    alternateName: "KARMA SASU",
    description: "Studio digital & IA de prestige : création de sites web sur-mesure, branding, SEO domination, Google Maps TOP 3 et assistants IA.",
    url: "https://xragency.vercel.app",
    telephone: "+33 7 67 56 67 83",
    email: "contact.xragency@gmail.com",
    address: { "@type": "PostalAddress", streetAddress: "78 Avenue des Champs-Élysées, Bureau 562", addressLocality: "Paris", postalCode: "75008", addressCountry: "FR" },
    priceRange: "€€€",
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <CursorGlow />
            <Cart />
            <ThemeSwitcher />
            <Outlet />
            <WhatsAppWidget />
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
