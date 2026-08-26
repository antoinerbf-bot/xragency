import { useState, useMemo } from "react";
import {
  MapPinned,
  Search,
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  Plus,
  X,
  MessageCircle,
  BarChart3,
  Award,
  Layers,
  Gauge,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

const CITIES_LIST = [
  "Paris",
  "Lyon",
  "Marseille",
  "Bordeaux",
  "Toulouse",
  "Nice",
  "Nantes",
  "Strasbourg",
  "Genève",
  "Bruxelles",
  "New York",
  "Da Nang",
];

const SECTORS_LIST = [
  {
    id: "resto",
    label: "Restaurant / Bar / Café",
    keywords: ["restaurant", "brasserie", "terrasse"],
  },
  {
    id: "hotel",
    label: "Hôtel / Spa / Hébergement",
    keywords: ["hotel de charme", "spa de luxe", "residence"],
  },
  {
    id: "sante",
    label: "Santé / Médecin / Dentiste",
    keywords: ["dentiste", "centre medical", "clinique"],
  },
  {
    id: "juridique",
    label: "Avocat / Notaire / Conseil",
    keywords: ["avocat", "cabinet conseil", "gestion de patrimoine"],
  },
  {
    id: "immo",
    label: "Immobilier / Architecture",
    keywords: ["agence immobiliere", "architecte interieur", "estimation"],
  },
  {
    id: "artisan",
    label: "Artisan / Rénovation / BTP",
    keywords: ["plombier", "renovation", "electricien"],
  },
  {
    id: "beaute",
    label: "Beauté / Coiffure / Esthétique",
    keywords: ["salon de coiffure", "institut beaute", "soins"],
  },
  { id: "autre", label: "Autre commerce / Service", keywords: ["boutique", "service pro"] },
];

const PHASES_PROCESS = [
  {
    num: "01",
    name: "Analyse Initiale",
    title: "Diagnostic de présence",
    desc: "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.",
  },
  {
    num: "02",
    name: "Audit Concurrentiel",
    title: "Décryptage du TOP 3",
    desc: "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.",
  },
  {
    num: "03",
    name: "Stratégie Ciblée",
    title: "Mots-clés & Zones",
    desc: "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.",
  },
  {
    num: "04",
    name: "Optimisation GBP",
    title: "Restructuration Pro",
    desc: "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.",
  },
  {
    num: "05",
    name: "Autorité Locale",
    title: "Signaux & Citations NAP",
    desc: "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.",
  },
  {
    num: "06",
    name: "Pilotage Actif",
    title: "Veille & Ajustements",
    desc: "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.",
  },
  {
    num: "07",
    name: "Résultats & ROI",
    title: "Mesure transparente",
    desc: "Tableau de bord de suivi hebdomadaire des positions, hausse mesurée des appels téléphoniques et des itinéraires.",
  },
];

export function MapsSimulator() {
  const { lang, price } = useLang();

  // Interactive Form State
  const [selectedCity, setSelectedCity] = useState("Paris");
  const [customCity, setCustomCity] = useState("");
  const [selectedSector, setSelectedSector] = useState(SECTORS_LIST[0]);
  const [keywords, setKeywords] = useState<string[]>([
    "restaurant gastronomique",
    "brasserie centre-ville",
  ]);
  const [newKeyword, setNewKeyword] = useState("");
  const [currentRank, setCurrentRank] = useState<"none" | "below10" | "top5_10" | "top3">(
    "below10",
  );

  const city = customCity.trim() ? customCity.trim() : selectedCity;

  // Add keyword
  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim()) && keywords.length < 5) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  // Dynamic simulation score calculations
  const simulationResults = useMemo(() => {
    const isLargeCity = ["Paris", "Lyon", "Marseille", "New York", "Bruxelles", "Genève"].includes(
      city,
    );
    const difficultyScore = isLargeCity ? 85 : 65;
    const competitionLevel = isLargeCity ? "Élevée (Grande Métropole)" : "Modérée";
    const estimatedCallsGain = isLargeCity ? "+280% à +380%" : "+180% à +260%";
    const estimatedMonthlySearches = keywords.length * (isLargeCity ? 1200 : 450);

    return {
      difficultyScore,
      competitionLevel,
      estimatedCallsGain,
      estimatedMonthlySearches,
    };
  }, [city, keywords]);

  const waPrefill = encodeURIComponent(
    `Bonjour XR Agency, j'ai réalisé la simulation Google Maps TOP 3 pour mon activité "${selectedSector.label}" à "${city}" sur les mots-clés : ${keywords.join(
      ", ",
    )}. Position actuelle : ${
      currentRank === "none"
        ? "Inexistant"
        : currentRank === "below10"
          ? "Au-delà du top 10"
          : currentRank === "top5_10"
            ? "Top 5-10"
            : "Top 3"
    }. Pouvons-nous lancer l'audit personnalisé ?`,
  );

  return (
    <section id="maps" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{ background: "var(--gradient-halo)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 space-y-20 sm:space-y-28">
        {/* 1. Interactive Simulation Studio */}
        <div className="surface-plate relative overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
                <Gauge className="h-5 w-5" />
              </div>
              <div>
                <h3 className="display-serif text-2xl text-foreground">
                  Simulateur de Visibilité Google Maps TOP 3
                </h3>
                <p className="label-mono text-xs text-muted-foreground">
                  Évaluez le potentiel d'acquisition locale et d'appels entrants de votre
                  établissement
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Garantie Annuelle TOP 3</span>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left Column: Interactive Settings */}
            <div className="space-y-6 lg:col-span-7">
              {/* Step 1: City Selection */}
              <div>
                <label className="label-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Étape 1 · Votre Ville / Zone d'implantation
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CITIES_LIST.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCity(c);
                        setCustomCity("");
                      }}
                      className={cn(
                        "label-mono rounded-full px-3.5 py-1.5 text-xs transition-all",
                        selectedCity === c && !customCity
                          ? "bg-primary text-primary-foreground font-semibold shadow-md"
                          : "border border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder="Ou entrez une autre ville..."
                    className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Step 2: Sector Selection */}
              <div>
                <label className="label-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Étape 2 · Votre Métier / Secteur
                </label>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {SECTORS_LIST.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedSector(s);
                        setKeywords(s.keywords);
                      }}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all text-xs",
                        selectedSector.id === s.id
                          ? "border-primary bg-primary/10 text-foreground font-medium ring-1 ring-primary"
                          : "border-border bg-card/60 text-muted-foreground hover:border-primary/50",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Targeted Keywords */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="label-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Étape 3 · Requêtes & Mots-clés cibles ({keywords.length}/5)
                  </label>
                  <span className="label-mono text-[10px] text-muted-foreground">
                    Ce que tapent vos clients
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="label-mono inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-foreground"
                    >
                      <Search className="h-3 w-3 text-primary" />
                      {kw}
                      <button
                        onClick={() => removeKeyword(i)}
                        className="ml-1 text-muted-foreground hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    placeholder="Ajouter un mot-clé (ex: avocat droit des affaires)..."
                    className="flex-1 rounded-xl border border-border bg-background/80 px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={addKeyword}
                    disabled={!newKeyword.trim() || keywords.length >= 5}
                    className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Step 4: Current Positioning */}
              <div>
                <label className="label-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Étape 4 · Votre visibilité actuelle sur Google Maps
                </label>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { id: "none", label: "Pas de fiche" },
                    { id: "below10", label: "Au-delà du Top 10" },
                    { id: "top5_10", label: "Dans le Top 5-10" },
                    { id: "top3", label: "Déjà Top 3" },
                  ].map((pos) => (
                    <button
                      key={pos.id}
                      onClick={() =>
                        setCurrentRank(pos.id as "none" | "below10" | "top5_10" | "top3")
                      }
                      className={cn(
                        "rounded-xl border p-2.5 text-center text-xs transition-all",
                        currentRank === pos.id
                          ? "border-primary bg-primary/10 text-foreground font-semibold ring-1 ring-primary"
                          : "border-border bg-card/60 text-muted-foreground hover:border-primary/40",
                      )}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Simulation Report & Guarantee */}
            <div className="flex flex-col justify-between rounded-3xl border border-primary/30 bg-accent/25 p-6 sm:p-8 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <span className="label-mono text-xs uppercase tracking-widest text-primary">
                    Diagnostic en Direct
                  </span>
                  <span className="label-mono text-xs text-muted-foreground">
                    {city} · {keywords.length} mots-clés
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 p-4">
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs text-muted-foreground">Hausse estimée d'appels</span>
                    </div>
                    <span className="display-serif text-lg font-bold text-emerald-400">
                      {simulationResults.estimatedCallsGain}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 p-4">
                    <div className="flex items-center gap-2.5">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Niveau de concurrence</span>
                    </div>
                    <span className="label-mono text-xs font-semibold text-foreground">
                      {simulationResults.competitionLevel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 p-4">
                    <div className="flex items-center gap-2.5">
                      <Search className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        Recherches locales cibles
                      </span>
                    </div>
                    <span className="label-mono text-xs font-bold text-foreground">
                      ~{simulationResults.estimatedMonthlySearches.toLocaleString()} /mois
                    </span>
                  </div>
                </div>

                {/* Price & Guarantee box */}
                <div className="mt-6 rounded-2xl border border-primary/40 bg-card p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="label-mono text-xs text-muted-foreground">
                      Pack Annuel Garanti
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="display-serif text-2xl font-bold text-primary">
                        {price(999)}
                      </span>
                      <span className="label-mono text-xs text-muted-foreground">/an</span>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    * Objectif TOP 3 sur vos mots-clés prioritaires sur 12 mois.
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3 text-xs text-emerald-400">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span className="font-medium">
                      Garantie TOP 3 contractuelle · Satisfait ou remboursé
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={`${CONTACT.whatsapp}?text=${waPrefill}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg transition-all hover:bg-primary/90 min-h-[44px]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Lancer mon audit Google Maps sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. The 7-Phase Methodology (Simple & Visual) */}
        <div>
          <Reveal>
            <div className="text-center">
              <span className="label-mono text-xs uppercase tracking-widest text-primary">
                Méthodologie en 7 Phases
              </span>
              <h3 className="display-serif mt-3 text-3xl sm:text-4xl text-foreground">
                Comment nous propulsons votre établissement dans le TOP 3
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                Un processus transparent et chirurgical pour dominer les résultats de recherche
                locale de manière durable.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 sm:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PHASES_PROCESS.map((phase, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="surface-plate relative flex h-full flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:border-primary hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="label-mono inline-flex h-8 w-8 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-xs font-bold text-primary">
                        {phase.num}
                      </span>
                      <span className="label-mono text-[10px] text-muted-foreground uppercase">
                        {phase.name}
                      </span>
                    </div>

                    <h4 className="display-serif mt-5 text-lg text-foreground">{phase.title}</h4>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/50 pt-3">
                    <span className="label-mono text-[10px] text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Phase {phase.num} validée
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
