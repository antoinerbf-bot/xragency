import { useState } from "react";
import { ArrowRight, Check, Eye, FileSearch, Sparkles, Wand2, ShieldCheck, Laptop, PhoneCall } from "lucide-react";
import { Reveal, Parallax } from "./primitives";
import { XR_PHOTOS } from "@/lib/photography";
import { CONTACT } from "@/lib/content";

export function OfferShowcase() {
  const [activeTab, setActiveTab] = useState<"mockup" | "audit">("mockup");
  const [siteUrl, setSiteUrl] = useState("");
  const [activity, setActivity] = useState("");

  const waMessage = encodeURIComponent(
    `Bonjour XR Agency, je souhaite réserver mes 400 € d'avantages offerts :\n- Maquette personnalisée (200 €)\n- Audit digital complet (200 €)\nActivité: ${activity || "Non spécifiée"}\nSite: ${siteUrl || "En création / non spécifié"}`
  );

  return (
    <section id="offre-exclusive" className="relative overflow-hidden border-b xr-line bg-gradient-to-b from-[var(--xr-bg)] via-[var(--xr-bg-elev)] to-[var(--xr-bg)] py-20 sm:py-28 lg:py-32">
      {/* Halo subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[800px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--xr-accent) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* Header de section */}
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border xr-line bg-[var(--xr-surface-strong)] px-4 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
              <span className="label-mono text-[8px] font-semibold tracking-[0.25em] xr-accent">
                OFFRE D'ACCÈS IMMÉDIAT · 0 € ENGAGEMENT
              </span>
            </div>

            <h2 className="display-serif mt-5 text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[0.88] tracking-[-0.05em]">
              400 € de valeur offerte.<br />
              <em className="not-italic xr-muted">Voyez le résultat avant d'investir.</em>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 xr-muted sm:text-base">
              Nous ne vous demandons pas de nous croire sur parole. Nous concevons votre maquette sur-mesure et auditons votre présence en amont, gratuitement et sans engagement.
            </p>
          </div>
        </Reveal>

        {/* Tab switchers */}
        <Reveal delay={80}>
          <div className="mt-12 flex justify-center">
            <div className="inline-flex rounded-full border xr-line bg-[var(--xr-surface)] p-1.5 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("mockup")}
                className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 label-mono text-[8px] font-semibold transition-all duration-300 ${
                  activeTab === "mockup"
                    ? "bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-md"
                    : "xr-muted hover:text-[var(--xr-ink)]"
                }`}
              >
                <Laptop className="h-3.5 w-3.5" />
                1. MAQUETTE PERSONNALISÉE (VALEUR 200 €)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("audit")}
                className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 label-mono text-[8px] font-semibold transition-all duration-300 ${
                  activeTab === "audit"
                    ? "bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-md"
                    : "xr-muted hover:text-[var(--xr-ink)]"
                }`}
              >
                <FileSearch className="h-3.5 w-3.5" />
                2. AUDIT DIGITAL & SEO (VALEUR 200 €)
              </button>
            </div>
          </div>
        </Reveal>

        {/* Dynamic Interactive Stage */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* VISUEL GAUCHE (Maquette ou Audit réaliste) */}
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-[var(--xr-surface)] p-4 shadow-2xl sm:p-6">
              {activeTab === "mockup" ? (
                /* ÉCRAN MAQUETTE RÉELLE */
                <div className="relative overflow-hidden rounded-[2rem] border xr-line bg-black">
                  {/* Browser top-bar */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#121212] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="label-mono text-[7px] text-white/50">
                      XR PROPOSITION VISUELLE HAUT DE GAMME
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 label-mono text-[6px] text-emerald-400">
                      SUR MESURE
                    </span>
                  </div>

                  {/* Image immersive de maquette avec badge overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={XR_PHOTOS.websites}
                      alt="Maquette de site internet réalisée par XR Agency"
                      className="h-full w-full object-cover object-top transition duration-700 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Carte flottante design responsive */}
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/75 p-3.5 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="label-mono text-[6px] text-white/60">LIVRABLE OFFERT</p>
                          <p className="text-xs font-semibold text-white">Prototypes Figma + Vue Interactive Mobile & Desktop</p>
                        </div>
                        <span className="label-mono rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[8px] font-bold text-emerald-400">
                          0 € au lieu de 200 €
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ÉCRAN AUDIT RÉEL */
                <div className="relative overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-bg-elev)] p-6">
                  <div className="flex items-center justify-between border-b xr-line pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[var(--xr-ink)]">Rapport de Diagnostic XR</p>
                        <p className="label-mono text-[6px] xr-muted">45 POINTS DE CONTRÔLE SCRUTÉS</p>
                      </div>
                    </div>
                    <span className="label-mono rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[7px] font-bold text-emerald-600 dark:text-emerald-400">
                      OFFERT (VALEUR 200 €)
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Vitesse & WebPerf", score: "A+", desc: "Temps de chargement < 1s" },
                      { label: "SEO Google", score: "96%", desc: "Balisage & métadonnées" },
                      { label: "UX & Mobile", score: "Optimal", desc: "Expérience sans friction" },
                      { label: "Conversion", score: "Élevée", desc: "Architecture des CTA" },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl border xr-line bg-[var(--xr-surface-strong)] p-3 text-center">
                        <span className="block text-lg font-black text-[var(--xr-ink)]">{item.score}</span>
                        <p className="mt-1 text-[9px] font-semibold text-[var(--xr-ink)]">{item.label}</p>
                        <p className="mt-0.5 text-[7px] xr-muted">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-dashed xr-line bg-[var(--xr-surface)] p-4 text-xs leading-relaxed xr-muted">
                    <span className="font-semibold text-[var(--xr-ink)]">Inclus dans votre rapport PDF :</span> liste de vos faiblesses actuelles, opportunités de mots-clés inexploitées sur votre secteur et plan d’action immédiat.
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* DÉTAIL COMMERCIALE & ACTIVATION DIRECTE */}
          <Reveal delay={180}>
            <div className="rounded-[2.5rem] border xr-line bg-[var(--xr-surface)] p-7 sm:p-9">
              <span className="label-mono text-[7px] tracking-[.24em] xr-muted">
                {activeTab === "mockup" ? "ÉTAPE 1 · VOTRE FUTUR SITE EN AVANT-PREMIÈRE" : "ÉTAPE 2 · IDENTIFIER VOS GISEMENTS DE CROISSANCE"}
              </span>

              <h3 className="display-serif mt-3 text-3xl text-[var(--xr-ink)] sm:text-4xl">
                {activeTab === "mockup"
                  ? "Une maquette sur mesure taillée pour convertir."
                  : "Un audit impitoyable de vos performances actuelles."}
              </h3>

              <p className="mt-4 text-sm leading-6 xr-muted">
                {activeTab === "mockup"
                  ? "Nos directeurs artistiques modélisent la page d'accueil de votre futur site web en tenant compte de vos concurrents et de votre positionnement. Vous visualisez le rendu exact avant toute prise d'engagement."
                  : "Nous passons votre site existant (ou votre projet) au crible : SEO, vitesse, attractivité visuelle, crédibilité et taux de conversion. Vous recevez un rapport actionnable clair."}
              </p>

              <ul className="mt-6 space-y-2.5">
                {(activeTab === "mockup"
                  ? [
                      "Direction artistique premium & typographies de caractère",
                      "Adaptation smartphone & ordinateur haute résolution",
                      "Structure de persuasion éprouvée pour déclencher l'achat",
                      "Livraison en 48h sans aucun frais",
                    ]
                  : [
                      "Analyse de votre positionnement sur Google Maps & Moteur de recherche",
                      "Audit des pertes de clients sur votre parcours actuel",
                      "Benchmarking précis de vos 3 principaux concurrents",
                      "Rapport PDF complet téléchargeable & échange direct",
                    ]
                ).map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-[var(--xr-ink)]">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              {/* Formulaire d'obtention rapide */}
              <div className="mt-8 border-t xr-line pt-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Votre activité (ex: Restaurant, Hôtel...)"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full rounded-xl border xr-line bg-[var(--xr-bg)] px-4 py-3 text-xs outline-none focus:border-[var(--xr-ink)]"
                  />
                  <input
                    type="text"
                    placeholder="Votre site actuel (optionnel)"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    className="w-full rounded-xl border xr-line bg-[var(--xr-bg)] px-4 py-3 text-xs outline-none focus:border-[var(--xr-ink)]"
                  />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={`https://wa.me/33767566783?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[var(--xr-ink)] px-6 py-4 label-mono text-[8px] font-bold uppercase tracking-wider text-[var(--xr-bg)] shadow-xl transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                  >
                    Réserver mes 400 € offerts
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>

                  <a
                    href="#audit"
                    className="inline-flex items-center justify-center gap-2 rounded-full border xr-line px-5 py-4 label-mono text-[8px] xr-muted transition hover:bg-[var(--xr-surface-strong)]"
                  >
                    Lancer l'audit en direct
                  </a>
                </div>

                <p className="mt-3 text-center label-mono text-[6px] xr-muted-2">
                  RÉPONSE EN MOINS DE 2H · AUCUN ENGAGEMENT · VALEUR RÉELLE GARANTIE
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
