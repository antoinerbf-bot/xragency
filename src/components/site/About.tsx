import { useState } from "react";
import {
  Sparkles,
  Compass,
  TrendingUp,
  Palette,
  Cpu,
  Bot,
  BarChart3,
  CheckCircle2,
  Users,
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { Parallax, Reveal, EmberButton } from "./primitives";
import { cn } from "@/lib/utils";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=85&w=${w}`;

// Real, authentic, high-end photography of creative direction & workshops
const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=85",
    caption: "Direction Stratégique",
    speed: 0.05,
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85",
    caption: "Atelier Créatif & UX",
    speed: -0.04,
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=85",
    caption: "Conception Éditoriale",
    speed: 0.04,
  },
  {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=85",
    caption: "Ingénierie & Déploiement",
    speed: -0.03,
  },
];

const HUB_PILLARS = [
  {
    id: "strategy",
    num: "01",
    icon: Compass,
    title: {
      fr: "Direction Stratégique & Arbitrage",
      en: "Strategic Direction & Leadership",
      vi: "Định hướng & Chiến lược",
    },
    short: {
      fr: "Vision claire, arbitrage budgétaire et choix des leviers de croissance les plus rentables.",
      en: "Clear vision, budget allocation and targeting the highest ROI growth levers.",
      vi: "Tầm nhìn rõ ràng, tối ưu ngân sách và tập trung vào các đòn bẩy sinh lời cao nhất.",
    },
    deliverables: [
      "Audit d'opportunité de marché",
      "Positionnement de marque haut de gamme",
      "Plan d'acquisition prioritaire",
    ],
    metric: "+3,2x de ROI moyen",
  },
  {
    id: "acquisition",
    num: "02",
    icon: TrendingUp,
    title: {
      fr: "Acquisition & Domination Locale",
      en: "Inbound Acquisition & Local Dominance",
      vi: "Thu hút Khách hàng & Thống trị Địa phương",
    },
    short: {
      fr: "Propulsez votre entreprise en tête de Google Maps (TOP 3) et sur les mots-clés stratégiques.",
      en: "Skyrocket your business to the top of Google Maps (TOP 3) and high-intent SEO queries.",
      vi: "Đưa doanh nghiệp lên top đầu Google Maps (TOP 3) và các từ khóa chiến lược.",
    },
    deliverables: [
      "Google Maps TOP 3 Garanti",
      "SEO Domination System",
      "Captation de prospects intentionnistes",
    ],
    metric: "+340% d'appels entrants",
  },
  {
    id: "design",
    num: "03",
    icon: Palette,
    title: {
      fr: "Haute Couture Digitale & UX",
      en: "Digital Haute Couture & UX",
      vi: "Thiết kế Đẳng cấp & Trải nghiệm UX",
    },
    short: {
      fr: "Des interfaces épurées, sensorielles et mémorables qui imposent votre autorité immédiatement.",
      en: "Refined, sensory and memorable interfaces that immediately establish market authority.",
      vi: "Giao diện tinh tế, sang trọng và ấn tượng giúp khẳng định vị thế thương hiệu ngay lập tức.",
    },
    deliverables: [
      "Direction artistique sur mesure",
      "Typographie & identité de prestige",
      "Expérience mobile ultra-fluide",
    ],
    metric: "PageSpeed 100/100",
  },
  {
    id: "tech",
    num: "04",
    icon: Cpu,
    title: {
      fr: "Ingénierie & Performance Cloud",
      en: "Cloud Engineering & Speed",
      vi: "Kỹ thuật & Hiệu năng Đám mây",
    },
    short: {
      fr: "Architecture React 19, temps de chargement sous 1.5s et sécurité cloud maximale.",
      en: "Modern React 19 stack, sub-1.5s load times and impenetrable cloud infrastructure.",
      vi: "Công nghệ React 19 hiện đại, thời gian tải dưới 1.5s và bảo mật đám mây tuyệt đối.",
    },
    deliverables: [
      "Code propre et évolutif",
      "Temps de chargement < 1.5s",
      "Maintenance & 99.9% uptime",
    ],
    metric: "< 1.5s d'affichage",
  },
  {
    id: "ai",
    num: "05",
    icon: Bot,
    title: {
      fr: "Automatisation & Intelligence IA",
      en: "Automation & 24/7 AI Agents",
      vi: "Tự động hóa & Trợ lý AI 24/7",
    },
    short: {
      fr: "Assistants IA 24/7 formés sur votre activité pour convertir vos prospects sans interruption.",
      en: "24/7 AI assistants trained on your business data to convert prospects without downtime.",
      vi: "Trợ lý AI 24/7 được đào tạo chuyên sâu về doanh nghiệp của bạn để chuyển đổi khách hàng liên tục.",
    },
    deliverables: [
      "Qualification automatique des leads",
      "Disponibilité 24/7 multilingue",
      "Génération instantanée de devis",
    ],
    metric: "Zéro lead perdu",
  },
  {
    id: "data",
    num: "06",
    icon: BarChart3,
    title: {
      fr: "Pilotage & Mesure de Performance",
      en: "Performance Tracking & Reporting",
      vi: "Báo cáo & Đo lường Hiệu quả",
    },
    short: {
      fr: "Transparence absolue avec un suivi rigoureux des positions, des conversions et du chiffre d'affaires généré.",
      en: "Total transparency with rigorous monitoring of rankings, lead flow and revenue generated.",
      vi: "Minh bạch tuyệt đối với việc theo dõi thứ hạng, lượng khách hàng tiềm năng và doanh thu tạo ra.",
    },
    deliverables: [
      "Tableaux de bord en temps réel",
      "Suivi hebdomadaire des positions",
      "Ajustements continus sans friction",
    ],
    metric: "100% transparence",
  },
];

export function About() {
  const { t, lang, price } = useLang();
  const [activePillarId, setActivePillarId] = useState("strategy");

  const activePillar = HUB_PILLARS.find((p) => p.id === activePillarId) ?? HUB_PILLARS[0];
  const ActiveIcon = activePillar.icon;

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      {/* Subtle ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "var(--gradient-halo)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header: The Core Concept */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="label-mono text-xs uppercase tracking-widest">
                  External Agency Intelligence
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="display-serif mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                Votre direction digitale & studio d'élite,{" "}
                <em className="italic text-primary">activés à la demande.</em>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={150}>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Pourquoi recruter et gérer 5 salariés quand vous pouvez brancher instantanément une
                équipe senior complète, coordonnée et disponible au moment où votre entreprise
                accélère ?
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-6 flex items-center gap-4 border-t border-border/70 pt-6">
                <div className="flex -space-x-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary/20 text-xs font-bold text-primary">
                    XR
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-card text-xs font-semibold text-foreground">
                    DA
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-card text-xs font-semibold text-foreground">
                    DEV
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground">
                    IA
                  </div>
                </div>
                <p className="label-mono text-xs text-muted-foreground">
                  Collectif Senior · Paris, Asie & USA
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 1. Dynamic Interactive Hub d'Intelligence Engine */}
        <div className="mt-20">
          <Reveal>
            <div className="surface-plate overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                  <span className="label-mono text-xs uppercase tracking-widest text-primary">
                    Hub Modulaire d'Expertises
                  </span>
                  <h3 className="display-serif mt-2 text-2xl sm:text-3xl text-foreground">
                    Explorez les 6 piliers de frappe de votre agence externe
                  </h3>
                </div>
                <span className="label-mono text-xs text-muted-foreground">
                  Cliquez sur un pôle pour voir son impact
                </span>
              </div>

              {/* Pillars Tabs */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {HUB_PILLARS.map((p) => {
                  const IconComp = p.icon;
                  const isActive = p.id === activePillarId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePillarId(p.id)}
                      className={cn(
                        "group flex flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all duration-300",
                        isActive
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,0,0,0.08)] ring-1 ring-primary"
                          : "border-border bg-card/60 hover:border-primary/50 hover:bg-accent/20",
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="label-mono text-xs text-muted-foreground">{p.num}</span>
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent/40 text-muted-foreground group-hover:text-primary",
                          )}
                        >
                          <IconComp className="h-4 w-4" />
                        </div>
                      </div>
                      <span className="label-mono mt-4 text-xs font-semibold text-foreground line-clamp-2">
                        {t(p.title)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Pillar Detail Card */}
              <div className="mt-8 rounded-3xl border border-primary/40 bg-accent/20 p-6 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="space-y-4 lg:col-span-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <ActiveIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="label-mono text-xs text-primary">
                          Pôle {activePillar.num} · Activé à la demande
                        </span>
                        <h4 className="display-serif text-2xl sm:text-3xl text-foreground">
                          {t(activePillar.title)}
                        </h4>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed text-muted-foreground">
                      {t(activePillar.short)}
                    </p>

                    <div className="mt-6 space-y-2">
                      <span className="label-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Livrables & interventions directes :
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activePillar.deliverables.map((del, i) => (
                          <span
                            key={i}
                            className="label-mono inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs text-foreground"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-lg lg:col-span-5">
                    <div>
                      <span className="label-mono text-xs text-muted-foreground">
                        Impact & Résultat Mesuré
                      </span>
                      <p className="display-serif mt-2 text-3xl font-bold text-primary sm:text-4xl">
                        {activePillar.metric}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        Chaque pôle est déployé avec une obligation de rigueur et un reporting
                        transparent.
                      </p>
                    </div>

                    <div className="mt-6 border-t border-border/60 pt-4">
                      <a
                        href="#intelligence"
                        className="label-mono inline-flex items-center gap-2 text-xs font-semibold text-primary transition-transform hover:translate-x-1"
                      >
                        Tester ce pôle dans le configurateur IA →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 2. Concrete Comparison: Équipe Salariée Interne vs Hub Externe XR Agency */}
        <div className="mt-20">
          <Reveal>
            <div className="rounded-3xl border border-border/80 bg-accent/15 p-6 sm:p-10">
              <div className="text-center">
                <span className="label-mono text-xs uppercase tracking-widest text-primary">
                  Le Choix Stratégique
                </span>
                <h3 className="display-serif mt-3 text-3xl sm:text-4xl text-foreground">
                  Recruter une équipe interne ou brancher XR Agency ?
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                  Comparez la flexibilité, le coût et l'impact direct sur votre trésorerie.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {/* Option Interne */}
                <div className="rounded-3xl border border-border bg-card/60 p-7 opacity-80 transition-opacity hover:opacity-100">
                  <div className="flex items-center justify-between border-b border-border/60 pb-4">
                    <span className="label-mono text-xs text-muted-foreground">
                      Option Traditionnelle
                    </span>
                    <span className="label-mono text-xs text-muted-foreground">En interne</span>
                  </div>
                  <h4 className="display-serif mt-4 text-2xl text-foreground">
                    Recrutement de 4 à 5 salariés
                  </h4>
                  <p className="display-serif mt-3 text-3xl text-muted-foreground/80">
                    ~18 500 € <span className="label-mono text-xs">/mois + charges</span>
                  </p>
                  <ul className="mt-6 space-y-3 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✕</span> 3 à 6 mois de processus de
                      recrutement
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✕</span> Charges patronales,
                      matériel, congés payés
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✕</span> Compétences limitées à
                      chaque profil recruté
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✕</span> Risque financier lourd et
                      rigidité contractuelle
                    </li>
                  </ul>
                </div>

                {/* Option XR Agency */}
                <div className="relative rounded-3xl border-2 border-primary bg-card p-7 shadow-2xl">
                  <span className="label-mono absolute -top-3.5 right-8 rounded-full bg-primary px-3.5 py-1 text-xs text-primary-foreground font-semibold">
                    Recommandé
                  </span>
                  <div className="flex items-center justify-between border-b border-border/60 pb-4">
                    <span className="label-mono text-xs text-primary font-semibold">
                      Formule Hub Externe
                    </span>
                    <span className="label-mono text-xs text-primary">XR Agency 2030</span>
                  </div>
                  <h4 className="display-serif mt-4 text-2xl text-foreground">
                    Votre Direction Digitale & IA Immédiate
                  </h4>
                  <p className="display-serif mt-3 text-3xl text-primary">
                    Dès 499 €{" "}
                    <span className="label-mono text-xs text-muted-foreground">
                      /mois ou au forfait
                    </span>
                  </p>
                  <ul className="mt-6 space-y-3 text-xs text-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Opérationnel en 48
                      heures ouvrées
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Accès à un
                      collectif senior (DA, Dev, SEO, IA)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Zéro charge
                      patronale, zéro engagement contraignant
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Garantie de
                      résultat et suivi continu en direct
                    </li>
                  </ul>
                  <div className="mt-8">
                    <EmberButton href="#intelligence" className="w-full justify-center">
                      Simuler mon accompagnement externe
                    </EmberButton>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3. Authentic Photo Gallery (Real craft, workshops & editorial scenes) */}
        <div className="mt-20 grid grid-cols-2 items-end gap-4 sm:gap-6 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={100 + i * 80}>
              <Parallax speed={g.speed}>
                <div className="group relative overflow-hidden rounded-3xl border border-border bg-card">
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className="h-[14rem] sm:h-[18rem] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-4">
                    <p className="label-mono text-[11px] text-foreground font-medium">
                      {g.caption}
                    </p>
                  </div>
                </div>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
