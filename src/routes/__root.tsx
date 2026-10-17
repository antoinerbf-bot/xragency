import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import { LanguageProvider } from "../lib/i18n";
import { CartProvider } from "../hooks/useCart";
import { Cart } from "../components/site/Cart";
import { WhatsAppWidget } from "../components/site/WhatsAppWidget";
import { CursorGlow } from "../components/site/CursorGlow";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import appCss from "../styles.css?url";

const ERROR_COPY = {
  fr: { notFound:"Page introuvable", notFoundText:"Cette page n’existe pas ou a été déplacée.", back:"Retour à l’accueil", load:"Cette page n’a pas pu se charger", loadText:"Une erreur est survenue. Vous pouvez réessayer ou revenir à l’accueil.", retry:"Réessayer", home:"Accueil" },
  en: { notFound:"Page not found", notFoundText:"This page does not exist or has been moved.", back:"Back to home", load:"This page could not load", loadText:"Something went wrong. You can try again or return to the home page.", retry:"Try again", home:"Home" },
  vi: { notFound:"Không tìm thấy trang", notFoundText:"Trang này không tồn tại hoặc đã được chuyển đi.", back:"Về trang chủ", load:"Không thể tải trang này", loadText:"Đã xảy ra lỗi. Bạn có thể thử lại hoặc quay về trang chủ.", retry:"Thử lại", home:"Trang chủ" },
  ar: { notFound:"الصفحة غير موجودة", notFoundText:"هذه الصفحة غير موجودة أو تم نقلها.", back:"العودة إلى الرئيسية", load:"تعذّر تحميل الصفحة", loadText:"حدث خطأ. يمكنك المحاولة مجدداً أو العودة إلى الصفحة الرئيسية.", retry:"إعادة المحاولة", home:"الرئيسية" },
  ru: { notFound:"Страница не найдена", notFoundText:"Эта страница не существует или была перемещена.", back:"На главную", load:"Не удалось загрузить страницу", loadText:"Произошла ошибка. Попробуйте ещё раз или вернитесь на главную страницу.", retry:"Повторить", home:"Главная" },
} as const;

function useErrorCopy() {
  const [lang, setLang] = useState<keyof typeof ERROR_COPY>("fr");
  useEffect(() => {
    const stored = window.localStorage.getItem("xr-lang");
    const browser = window.navigator.language.slice(0, 2).toLowerCase();
    const selected = stored && stored in ERROR_COPY ? stored : browser in ERROR_COPY ? browser : "fr";
    setLang(selected as keyof typeof ERROR_COPY);
  }, []);
  return ERROR_COPY[lang];
}

function NotFoundComponent() {
  const c = useErrorCopy();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{c.notFound}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{c.notFoundText}</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">{c.back}</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const c = useErrorCopy();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{c.load}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{c.loadText}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">{c.retry}</button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">{c.home}</a>
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
      { name: "description", content: "XR Agency conçoit des sites web sur mesure, du branding, du SEO, de la visibilité Google Maps, du social media, du WebCare et des solutions IA & robotique." },
      { name: "author", content: "XR Agency" },
      { property: "og:title", content: "XR Agency — Studio digital premium & IA" },
      { property: "og:description", content: "Un écosystème digital complet : Web Design, Branding, SEO, Google Maps, Social Media, WebCare et IA & Robotique." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XR Agency — Studio digital premium & IA" },
      { name: "twitter:description", content: "Un écosystème digital complet : Web Design, Branding, SEO, Google Maps, Social Media, WebCare et IA & Robotique." },
      { property: "og:image", content: "https://xragencyai.com/og-image.svg" },
      { name: "twitter:image", content: "https://xragencyai.com/og-image.svg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo-xr-agency.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "preload", as: "style", href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const currentLang = window.localStorage.getItem("xr-lang");
    if (currentLang === "ar") document.documentElement.dir = "rtl";
    else document.documentElement.dir = "ltr";
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
    description: "Agence digitale : création de sites web sur mesure, branding, SEO, visibilité locale, Google Maps et IA.",
    url: "https://xragencyai.com",
    telephone: "+33 7 67 56 67 83",
    email: "contact.xragency@gmail.com",
    priceRange: "€€€",
    areaServed: ["FR", "AE", "VN", "SG", "TH", "Worldwide"],
    serviceType: ["Web design", "Brand identity", "SEO", "Local SEO", "Google Business Profile", "Social Media", "WebCare", "AI & Robotics"],
    sameAs: ["https://www.instagram.com/xragency_", "https://linkedin.com/company/xragency"],
    knowsAbout: ["Conversion design", "Search engine optimisation", "Local search", "Brand strategy", "Digital experiences"],
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <CursorGlow />
            <Cart />
            <Outlet />
            <WhatsAppWidget />
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
