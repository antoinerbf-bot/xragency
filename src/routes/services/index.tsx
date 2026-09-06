import { useState, useLayoutEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES, PERIOD_LABEL, CONTACT } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

/* ── Service high-res editorial photography ── */
const SERVICE_IMAGES: Record<string, string> = {
  websites:
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85",
  branding:
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85",
  seo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1400&q=85",
  maps: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=85",
  social:
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=85",
  maintenance:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85",
  ecommerce:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
  refonte:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
  ads: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1400&q=85",
  strategy:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
};

/* ── Discipline categorization ── */
type CategoryId = "all" | "web" | "growth" | "brand" | "ai";

interface Category {
  id: CategoryId;
  label: { fr: string; en: string; vi: string };
  serviceIds: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "all",
    label: {
      fr: "Toutes les disciplines (11)",
      en: "All disciplines (11)",
      vi: "Tất cả lĩnh vực (11)",
    },
    serviceIds: SERVICES.map((s) => s.id),
  },
  {
    id: "web",
    label: {
      fr: "Sites & E-commerce",
      en: "Websites & E-commerce",
      vi: "Website & TMĐT",
    },
    serviceIds: ["websites", "ecommerce", "refonte"],
  },
  {
    id: "growth",
    label: {
      fr: "SEO & Acquisition",
      en: "SEO & Acquisition",
      vi: "SEO & Tăng trưởng",
    },
    serviceIds: ["seo", "maps", "ads"],
  },
  {
    id: "brand",
    label: {
      fr: "Branding & Social",
      en: "Branding & Social",
      vi: "Thương hiệu & Mạng xã hội",
    },
    serviceIds: ["branding", "social"],
  },
  {
    id: "ai",
    label: {
      fr: "IA, Cloud & Conseil",
      en: "AI, Cloud & Advisory",
      vi: "AI, Cloud & Cố vấn",
    },
    serviceIds: ["ai", "maintenance", "strategy"],
  },
];

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Nos Prestations & Formules — XR Agency Studio" },
      {
        name: "description",
        content:
          "Catalogue officiel des 11 disciplines digitales de XR Agency : Sites web sur mesure, SEO domination, Google Maps TOP 3, branding et assistants IA.",
      },
      { property: "og:title", content: "Nos Prestations & Formules — XR Agency" },
      {
        property: "og:description",
        content:
          "Catalogue officiel des 11 disciplines digitales de XR Agency. Studio digital haut de gamme & IA.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  const { t, price, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  const filteredServices = SERVICES.filter((s) => {
    const matchesCategory = currentCategory.serviceIds.includes(s.id);
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const titleMatch = (s.title[lang] ?? "").toLowerCase().includes(q);
    const shortMatch = (s.short[lang] ?? "").toLowerCase().includes(q);
    const descMatch = (s.description[lang] ?? "").toLowerCase().includes(q);
    return titleMatch || shortMatch || descMatch;
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Background ambient lighting aura */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{ background: "var(--gradient-halo)" }}
      />

      <Nav />

      <main className="relative z-10 pt-28 pb-20">
        {/* ── Page Header / Breadcrumb ── */}
        <div className="mx-auto max-w-7xl px-6 pt-4 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div className="label-mono flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-primary">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Services</span>
            </div>
            <div className="label-mono inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] text-primary">
              <Sparkles className="h-3 w-3" />
              11 expertises certifiées · FR / EN / VI
            </div>
          </div>
        </div>

        {/* ── Hero Section ── */}
        <section className="relative py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <Reveal>
                <p className="label-mono text-xs uppercase tracking-widest text-primary">
                  {t(UI.servicesLabel)} · Catalogue Officiel
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display-serif mt-5 text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.02]">
                  L'excellence digitale,{" "}
                  <em className="text-primary not-italic italic">position par position</em>.
                </h1>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Chaque prestation XR Agency est une pièce d'ingénierie taillée pour générer de
                  l'autorité, capter des intentions d'achat et transformer vos visiteurs en clients.
                  Tarification transparente et sans frais cachés.
                </p>
              </Reveal>
            </div>

            {/* ── Filters & Search Bar ── */}
            <div className="mt-12 flex flex-col gap-5 border-y border-border/60 py-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "label-mono rounded-full px-4 py-2 text-xs transition-all duration-300 cursor-pointer",
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border/80 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {cat.label[lang]}
                  </button>
                ))}
              </div>

              {/* Search filter */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === "fr"
                      ? "Rechercher une prestation..."
                      : lang === "vi"
                        ? "Tìm kiếm dịch vụ..."
                        : "Search service..."
                  }
                  className="w-full rounded-full border border-border bg-card/80 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Grid Showcase ── */}
        <section className="relative py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {filteredServices.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card/50 p-12 text-center">
                <p className="display-serif text-xl text-foreground">
                  Aucune prestation ne correspond à votre recherche.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-xs text-primary underline cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((s, idx) => {
                  const img = SERVICE_IMAGES[s.id] ?? SERVICE_IMAGES.websites;

                  return (
                    <Reveal key={s.id} delay={idx * 60}>
                      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card transition-all duration-300 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-2xl">
                        {/* Service Photography with badge */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-foreground">
                          <img
                            src={img}
                            alt={t(s.title)}
                            loading="lazy"
                            className="h-full w-full object-cover grayscale-[30%] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                          {/* Monogram number */}
                          <span className="label-mono absolute left-4 top-4 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[10px] text-white backdrop-blur-md">
                            {s.num}
                          </span>

                          {/* Starting price badge */}
                          <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
                            <div>
                              <span className="label-mono text-[9px] uppercase tracking-wider text-white/70">
                                {t(UI.from)}
                              </span>
                              <p className="display-serif text-2xl font-bold text-white leading-none">
                                {price(s.fromEur)}{" "}
                                <span className="label-mono text-[10px] font-normal text-white/70">
                                  {t(PERIOD_LABEL[s.fromPeriod])}
                                </span>
                              </p>
                            </div>
                            <span className="label-mono rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[9px] text-white backdrop-blur-sm">
                              {s.plans.length} formules
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="flex flex-1 flex-col p-6 sm:p-7">
                          <Link
                            to="/services/$serviceId"
                            params={{ serviceId: s.id }}
                            className="block"
                          >
                            <h2 className="display-serif text-2xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                              {t(s.title)}
                            </h2>
                            <p className="label-mono mt-1 text-xs text-primary font-medium">
                              {t(s.short)}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                              {t(s.description)}
                            </p>
                          </Link>

                          {/* Highlights pills */}
                          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border/50 pt-4">
                            {s.highlights.slice(0, 3).map((h, k) => (
                              <span
                                key={k}
                                className="label-mono inline-flex items-center gap-1 rounded-full border border-border/60 bg-accent/30 px-2.5 py-0.5 text-[10px] text-foreground"
                              >
                                <Zap className="h-2.5 w-2.5 text-primary" />
                                {t(h)}
                              </span>
                            ))}
                          </div>

                          {/* Action Bar */}
                          <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                            <Link
                              to="/services/$serviceId"
                              params={{ serviceId: s.id }}
                              className="label-mono inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-all hover:translate-x-1"
                            >
                              Explorer la prestation
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>

                            <Link
                              to="/services/$serviceId"
                              params={{ serviceId: s.id }}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                              aria-label={`Voir détails ${t(s.title)}`}
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Strategic Reassurance & Global CTA ── */}
        <section className="relative mt-20 border-t border-border/60 bg-accent/15 py-20">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
            <Reveal>
              <span className="label-mono inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs text-primary">
                <ShieldCheck className="h-4 w-4" />
                Garantie d'exécution & Méthodologie agile
              </span>
              <h2 className="display-serif mt-6 text-3xl sm:text-5xl">
                Besoin d'un accompagnement sur-mesure ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                Que vous ayez besoin d'une seule expertise de pointe ou d'un écosystème digital
                complet, nos directeurs de projet conçoivent une feuille de route adaptée à vos
                ambitions.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                    "Bonjour XR Agency, je souhaite échanger sur mes besoins digitaux et obtenir un conseil sur vos prestations.",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:-translate-y-0.5"
                >
                  Échanger sur WhatsApp
                </a>
                <Link
                  to="/"
                  hash="intelligence"
                  className="rounded-full border border-border bg-card px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5"
                >
                  Lancer l'estimateur stratégique IA
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
