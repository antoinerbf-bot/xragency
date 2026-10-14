import { useState, useMemo, useRef, useEffect } from "react";
import {
  MapPinned,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Award,
  Zap,
  Users,
  BarChart3,
  Gauge,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

/* ── Sector options ── */
const SECTORS = [
  { id: "resto", icon: "🍽️", label: "Restaurant / Bar" },
  { id: "hotel", icon: "🏨", label: "Hôtel / Spa" },
  { id: "sante", icon: "⚕️", label: "Santé / Médecin" },
  { id: "juridique", icon: "⚖️", label: "Avocat / Notaire" },
  { id: "immo", icon: "🏠", label: "Immobilier" },
  { id: "artisan", icon: "🔨", label: "Artisan / BTP" },
  { id: "beaute", icon: "💆", label: "Beauté / Bien-être" },
  { id: "autre", icon: "💼", label: "Autre commerce" },
];

/* ── City size options ── */
const CITY_SIZES = [
  { id: "small", label: "Petite ville", sub: "< 50 000 hab.", multiplier: 1.0 },
  { id: "medium", label: "Ville moyenne", sub: "50 000 – 150 000", multiplier: 1.3 },
  { id: "large", label: "Grande ville", sub: "150 000 – 500 000", multiplier: 1.6 },
  { id: "metro", label: "Métropole", sub: "500 000+", multiplier: 2.1 },
];

/* ── Keywords volume options ── */
const KEYWORD_RANGES = [
  { id: "k1", label: "1 à 3", sub: "mots-clés principaux", factor: 1.0 },
  { id: "k2", label: "4 à 6", sub: "mots-clés principaux", factor: 1.25 },
  { id: "k3", label: "7 à 10", sub: "mots-clés principaux", factor: 1.55 },
];

/* ── Current ranking options ── */
const CURRENT_RANKS = [
  { id: "absent", label: "Absent de Maps", sub: "Fiche non créée ou invisible", penalty: 1.15 },
  { id: "below20", label: "Hors Top 20", sub: "Très peu visible", penalty: 1.08 },
  { id: "4to10", label: "Position 4 – 10", sub: "Visible mais pas dans le Pack", penalty: 1.0 },
];

/* ── 7-Phase methodology ── */
const PHASES = [
  { num: "01", name: "Analyse Initiale", title: "Diagnostic de présence", desc: "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles." },
  { num: "02", name: "Audit Concurrentiel", title: "Décryptage du TOP 3", desc: "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité." },
  { num: "03", name: "Stratégie Ciblée", title: "Mots-clés & Zones", desc: "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires." },
  { num: "04", name: "Optimisation GBP", title: "Restructuration Pro", desc: "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services." },
  { num: "05", name: "Autorité Locale", title: "Signaux & Citations NAP", desc: "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale." },
  { num: "06", name: "Pilotage Actif", title: "Veille & Ajustements", desc: "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients." },
  { num: "07", name: "Résultats & ROI", title: "Mesure transparente", desc: "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire." },
];

/* ── Animated price counter ── */
function useAnimatedPrice(target: number, duration = 500) {
  const [val, setVal] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    prevRef.current = target;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return val;
}

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

/* ── Selector Button ── */
function SelectorBtn({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-center text-xs transition-all duration-200",
        selected
          ? "border-primary bg-[var(--xr-accent-soft)] text-[var(--xr-ink)] shadow-sm ring-1 ring-[var(--xr-ink)]/15"
          : "border-border bg-card/60 text-muted-foreground hover:border-[var(--xr-ink)]/40 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function MapsSimulator() {
  const { price: formatPrice } = useLang();

  const [sector, setSector] = useState(SECTORS[0].id);
  const [citySize, setCitySize] = useState(CITY_SIZES[0].id);
  const [keywords, setKeywords] = useState(KEYWORD_RANGES[0].id);
  const [rank, setRank] = useState(CURRENT_RANKS[0].id);

  /* ── Dynamic price calculation ── */
  const { priceMin, priceMax } = useMemo(() => {
    const base = 990;
    const sizeMul = CITY_SIZES.find((c) => c.id === citySize)?.multiplier ?? 1;
    const kwFactor = KEYWORD_RANGES.find((k) => k.id === keywords)?.factor ?? 1;
    const rankPenalty = CURRENT_RANKS.find((r) => r.id === rank)?.penalty ?? 1;
    const raw = base * sizeMul * kwFactor * rankPenalty;
    return {
      priceMin: Math.round(raw / 100) * 100,
      priceMax: Math.round((raw * 1.45) / 100) * 100,
    };
  }, [citySize, keywords, rank]);

  const animMin = useAnimatedPrice(priceMin);
  const animMax = useAnimatedPrice(priceMax);

  const selectedSector = SECTORS.find((s) => s.id === sector);

  const waPrefill = encodeURIComponent(
    `Bonjour XR Agency, je souhaite une étude Google Maps Top 3 sur mesure.\n\n` +
    `• Secteur : ${selectedSector?.label}\n` +
    `• Taille de ville : ${CITY_SIZES.find((c) => c.id === citySize)?.label}\n` +
    `• Mots-clés : ${KEYWORD_RANGES.find((k) => k.id === keywords)?.label}\n` +
    `• Position actuelle : ${CURRENT_RANKS.find((r) => r.id === rank)?.label}\n\n` +
    `Référence de départ : à partir de 990 € / an · devis sur mesure\n\n` +
    `Pouvons-nous lancer l'audit personnalisé ?`
  );

  return (
    <section id="maps" className="xr-section-elevated relative border-y xr-line py-20 sm:py-28 lg:py-32">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: "var(--gradient-halo)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 space-y-16 sm:space-y-20">

        {/* ── Section Header ── */}
        <div>
          <SectionHeading
            label={{ fr: "GOOGLE BUSINESS PROFILE · LOCAL SEO", en: "GOOGLE BUSINESS PROFILE · LOCAL SEO", vi: "GOOGLE BUSINESS PROFILE · LOCAL SEO" }}
            line1={{ fr: "Construisons votre visibilité", en: "Build your local visibility", vi: "Xây dựng khả năng hiển thị địa phương" }}
            line2={{
              fr: "sur Google Maps, sur mesure.",
              en: "on Google Maps, built around you.",
              vi: "trên Google Maps, theo nhu cầu của bạn.",
            }}
            lead={{
              fr: "À partir de 990 € / an. Audit, optimisation Google Business Profile, stratégie locale et suivi adaptés à votre zone, votre concurrence et vos requêtes.",
              en: "From €990 / year. Audit, Google Business Profile optimisation, local strategy and monitoring adapted to your area, competition and target searches.",
              vi: "Từ 990 € / năm. Kiểm toán, tối ưu Google Business Profile, chiến lược địa phương và theo dõi theo khu vực, đối thủ và truy vấn mục tiêu.",
            }}
          />

          {/* ── Exclusivity Badge — very visible ── */}
          <Reveal delay={80}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-5 py-3.5 shadow-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-black shadow-sm"><svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google" role="img"><path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.23a4.47 4.47 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z"/><path fill="#34A853" d="M12 21.55c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.74 9.74 0 0 0 12 21.55Z"/><path fill="#FBBC05" d="M6.53 13.64A5.84 5.84 0 0 1 6.23 12c0-.57.1-1.12.3-1.64V7.84H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.16l3.25-2.52Z"/><path fill="#EA4335" d="M12 6.33c1.43 0 2.7.49 3.71 1.45l2.78-2.78C16.84 3.42 14.63 2.45 12 2.45a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52c.77-2.31 2.93-4.03 5.47-4.03Z"/></svg></span>
              <Zap className="h-5 w-5 shrink-0 text-[var(--xr-bg)]" />
              <p className="text-sm font-semibold text-foreground leading-snug">
                Google Maps · à partir de 990 € / an · objectif Top 3 sans garantie de position
              </p>
              <Award className="h-5 w-5 shrink-0 text-[var(--xr-ink)]" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={40}>
          <div className="overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] text-[var(--xr-ink)] shadow-[var(--xr-shadow)]">
            <div className="flex items-center justify-between border-b xr-line bg-[var(--xr-surface)] px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--xr-accent-soft)]"><MapPinned className="h-4 w-4 text-[var(--xr-ink)]"/></span>
                <div>
                  <span className="label-mono text-[6px] tracking-[.18em] xr-muted-2">SIMULATION EN DIRECT</span>
                  <p className="mt-0.5 text-sm font-semibold text-[var(--xr-ink)]">{selectedSector?.label} · {CITY_SIZES.find(c=>c.id===citySize)?.label}</p>
                </div>
              </div>
              <span className="rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-1.5 label-mono text-[6px] xr-muted">LOCAL PACK</span>
            </div>
            <div className="xr-maps-stage relative h-[330px] overflow-hidden bg-[#efeee9] sm:h-[390px]">
              <div aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(76,78,72,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(76,78,72,.10)_1px,transparent_1px)] [background-size:30px_30px]"/>
              <svg aria-hidden="true" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
                <g fill="none" stroke="#d9d6ce" strokeWidth="34" strokeLinecap="round">
                  <path d="M-80 110 C180 65 250 205 470 175 S780 45 1280 130"/>
                  <path d="M-40 410 C170 330 270 420 430 360 S790 300 1260 440"/>
                  <path d="M250 -60 C300 100 250 230 330 590"/>
                  <path d="M650 -40 C590 120 710 210 660 570"/>
                  <path d="M990 -40 C900 90 1020 230 930 570"/>
                  <path d="M-40 255 C220 220 350 275 530 250 S880 205 1260 260"/>
                </g>
                <g fill="none" stroke="#fff" strokeWidth="23" strokeLinecap="round">
                  <path d="M-80 110 C180 65 250 205 470 175 S780 45 1280 130"/>
                  <path d="M-40 410 C170 330 270 420 430 360 S790 300 1260 440"/>
                  <path d="M250 -60 C300 100 250 230 330 590"/>
                  <path d="M650 -40 C590 120 710 210 660 570"/>
                  <path d="M990 -40 C900 90 1020 230 930 570"/>
                  <path d="M-40 255 C220 220 350 275 530 250 S880 205 1260 260"/>
                </g>
                <g fill="#d8e0d6" stroke="#fff" strokeWidth="3">
                  <rect x="65" y="155" width="115" height="58" rx="9"/>
                  <rect x="410" y="35" width="125" height="65" rx="9"/>
                  <rect x="765" y="175" width="125" height="62" rx="9"/>
                  <rect x="400" y="410" width="150" height="55" rx="9"/>
                  <rect x="1035" y="300" width="110" height="65" rx="9"/>
                </g>
              </svg>
              {[["34%","34%","#252525","01"],["51%","48%","#686761","02"],["67%","30%","#a3a198","03"]].map(([left,top,bg,num])=>
                <div key={num} className="absolute" style={{left,top}}>
                  <div className="grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[var(--pin)] shadow-[0_14px_32px_-10px_rgba(18,19,22,.55)] ring-1 ring-black/10" style={{ left: 0, top: 0, background: bg }}>
                    <span className="text-[8px] font-black text-white">{num}</span>
                  </div>
                </div>
              )}
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-6 sm:right-6">
                <div className="rounded-xl border border-white/60 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-xl">
                  <span className="label-mono text-[5px] tracking-[.16em] text-[#17181a]/40">RECHERCHE CIBLE</span>
                  <p className="mt-1 text-[10px] font-semibold text-[#17181a]">{selectedSector?.label} · {KEYWORD_RANGES.find(k=>k.id===keywords)?.label} mots-clés</p>
                </div>
                <div className="hidden rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-right shadow-lg backdrop-blur-xl sm:block">
                  <span className="label-mono text-[5px] tracking-[.16em] text-[#17181a]/40">POSITION ACTUELLE</span>
                  <p className="mt-1 text-[10px] font-semibold text-[#17181a]">{CURRENT_RANKS.find(r=>r.id===rank)?.label}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/90 px-3 py-2 label-mono text-[5px] tracking-[.14em] text-[#17181a]/48 shadow-lg backdrop-blur-xl sm:left-6">
                {rank === "absent" ? "VISIBILITÉ À CONSTRUIRE" : rank === "below20" ? "SIGNAL À RENFORCER" : "POSITIONNEMENT À DÉVELOPPER"}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Intelligent Configurator ── */}
        <Reveal delay={60}>
          <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
            {/* Configurator header */}
            <div className="border-b border-border/60 bg-accent/20 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--xr-ink)] text-[var(--xr-bg)]">
                  <Gauge className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="label-mono text-xs text-[var(--xr-ink)]">Configurateur de projet</p>
                  <p className="display-serif text-lg text-foreground mt-0.5">
                    Estimez votre investissement Google Maps
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Step 1 — Sector */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">1</span>
                  Votre secteur d'activité
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {SECTORS.map((s) => (
                    <SelectorBtn
                      key={s.id}
                      selected={sector === s.id}
                      onClick={() => setSector(s.id)}
                    >
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-[11px] leading-tight">{s.label}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 2 — City Size */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">2</span>
                  Taille de votre ville
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CITY_SIZES.map((c) => (
                    <SelectorBtn
                      key={c.id}
                      selected={citySize === c.id}
                      onClick={() => setCitySize(c.id)}
                    >
                      <Building2 className="h-4 w-4" />
                      <span className="font-semibold text-[12px]">{c.label}</span>
                      <span className="text-[10px] opacity-60">{c.sub}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 3 — Keywords */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">3</span>
                  Nombre de mots-clés principaux
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {KEYWORD_RANGES.map((k) => (
                    <SelectorBtn
                      key={k.id}
                      selected={keywords === k.id}
                      onClick={() => setKeywords(k.id)}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="font-bold text-base">{k.label}</span>
                      <span className="text-[10px] opacity-60">{k.sub}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 4 — Current Ranking */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">4</span>
                  Votre positionnement actuel sur Google Maps
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {CURRENT_RANKS.map((r) => (
                    <SelectorBtn
                      key={r.id}
                      selected={rank === r.id}
                      onClick={() => setRank(r.id)}
                    >
                      <MapPinned className="h-4 w-4" />
                      <span className="font-semibold text-[12px] leading-tight">{r.label}</span>
                      <span className="text-[10px] opacity-60 leading-tight">{r.sub}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* ── Dynamic Price Result ── */}
              <div className="rounded-2xl border-2 border-primary/30 bg-[var(--xr-ink)]/5 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="label-mono text-xs text-muted-foreground">Budget indicatif · à partir de 990 € / an</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span
                        key={animMin}
                        className="display-serif text-3xl font-bold text-[var(--xr-ink)] sm:text-4xl animate-price-reveal"
                      >
                        {formatEur(animMin)}
                      </span>
                      <span className="display-serif text-xl text-[var(--xr-ink)]/60">–</span>
                      <span
                        key={animMax}
                        className="display-serif text-3xl font-bold text-[var(--xr-ink)] sm:text-4xl animate-price-reveal"
                      >
                        {formatEur(animMax)}
                      </span>
                      <span className="label-mono text-xs text-muted-foreground">/ an</span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground/70">
                      Estimation indicative · tarif exact après audit personnalisé
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    {/* Guarantee badge */}
                    <div className="flex items-center gap-2 rounded-xl border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-3 py-2">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--xr-ink)]" />
                      <span className="label-mono text-[10px] font-bold text-[var(--xr-ink)]">
                        Objectif Top 3 · étude locale sur mesure
                      </span>
                    </div>
                    <a
                      href={`${CONTACT.whatsapp}?text=${waPrefill}`}
                      target="_blank"
                      rel="noreferrer"
                      className="label-mono inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-2.5 text-xs font-semibold text-[var(--xr-bg)] transition-all duration-200 hover:bg-[var(--xr-ink)]/90 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                      Lancer mon audit gratuit
                    </a>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-4 flex flex-wrap gap-3 border-t border-primary/20 pt-4">
                  {[
                    { icon: CheckCircle2, text: "Audit initial offert" },
                    { icon: CheckCircle2, text: "Périmètre contractuel clair" },
                    { icon: CheckCircle2, text: "Rapport mensuel inclus" },
                    { icon: CheckCircle2, text: "Sans engagement minimum" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--xr-ink)]" />
                      <span className="label-mono text-[10px] text-muted-foreground">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 7-Phase Methodology ── */}
        <Reveal delay={80}>
          <div>
            <div className="mb-8 text-center">
              <p className="label-mono text-xs text-[var(--xr-ink)]">Méthodologie exclusive</p>
              <h3 className="display-serif mt-2 text-2xl sm:text-3xl text-foreground">
                Le processus en 7 phases
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PHASES.slice(0, 4).map((ph) => (
                <div
                  key={ph.num}
                  className="rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
                >
                  <p className="label-mono text-xs text-[var(--xr-ink)]">{ph.num} · {ph.name}</p>
                  <p className="display-serif mt-1.5 text-base text-foreground">{ph.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ph.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {PHASES.slice(4).map((ph) => (
                <div
                  key={ph.num}
                  className="rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
                >
                  <p className="label-mono text-xs text-[var(--xr-ink)]">{ph.num} · {ph.name}</p>
                  <p className="display-serif mt-1.5 text-base text-foreground">{ph.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
