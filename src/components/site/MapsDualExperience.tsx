import { useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Compass,
  FileText,
  Gauge,
  MapPin,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { AddToCartBtn } from "./Cart";
import {
  calculateMapsTop3Estimate,
  MAPS_COMPETITION_LEVELS,
  MAPS_GEO_SCOPES,
  MAPS_GOALS,
  MAPS_KEYWORD_VOLUMES,
  MAPS_MANAGEMENT_TIERS,
  MAPS_POPULATIONS,
  MAPS_PRESENCE_STATES,
  MAPS_SECTORS,
  type MapsCompetitionId,
  type MapsGeoScopeId,
  type MapsGoalId,
  type MapsKeywordVolumeId,
  type MapsPopulationId,
  type MapsPresenceId,
} from "@/lib/maps-pricing";

export function MapsDualExperience({ variant = "homepage" }: { variant?: "homepage" | "servicePage" }) {
  const { lang, price } = useLang();
  const L = (lang in COPY ? lang : "fr") as Lang;
  const c = COPY[L];

  const [path, setPath] = useState<"top3" | "management">("top3");

  // Parcours 1 state (9 parameters)
  const [sectorId, setSectorId] = useState<string>("locksmith");
  const [city, setCity] = useState<string>("Orléans");
  const [postalCode, setPostalCode] = useState<string>("45000");
  const [district, setDistrict] = useState<string>("");
  const [population, setPopulation] = useState<MapsPopulationId>("80k_250k");
  const [competition, setCompetition] = useState<MapsCompetitionId>("moderate");
  const [presence, setPresence] = useState<MapsPresenceId>("rank_4_10");
  const [keywords, setKeywords] = useState<string[]>(["serrurier orléans", "ouverture de porte", "dépannage serrurier"]);
  const [kwInput, setKwInput] = useState<string>("");
  const [keywordVolume, setKeywordVolume] = useState<MapsKeywordVolumeId>("1_3");
  const [geoScope, setGeoScope] = useState<MapsGeoScopeId>("single_city");
  const [goal, setGoal] = useState<MapsGoalId>("reach_top_3");
  const [addPostCare, setAddPostCare] = useState<boolean>(false);
  const [geoGridMode, setGeoGridMode] = useState<"before" | "after">("after");

  // Parcours 2 state (Management monthly tier)
  const [selectedTierId, setSelectedTierId] = useState<"essentiel" | "croissance" | "intensif">("croissance");

  const activeSector = useMemo(
    () => MAPS_SECTORS.find((s) => s.id === sectorId) ?? MAPS_SECTORS[0],
    [sectorId]
  );

  const estimate = useMemo(
    () =>
      calculateMapsTop3Estimate({
        sectorId,
        city,
        postalCode,
        district,
        population,
        competition,
        presence,
        keywords,
        keywordVolume,
        geoScope,
        goal,
      }),
    [sectorId, city, postalCode, district, population, competition, presence, keywords, keywordVolume, geoScope, goal]
  );

  const applyPreset = (preset: "orleans" | "paris") => {
    if (preset === "orleans") {
      setSectorId("locksmith");
      setCity("Orléans");
      setPostalCode("45000");
      setDistrict("");
      setPopulation("80k_250k");
      setCompetition("moderate");
      setPresence("rank_4_10");
      setKeywords(["serrurier orléans", "ouverture de porte", "dépannage serrurier"]);
      setKeywordVolume("1_3");
      setGeoScope("single_city");
      setGoal("reach_top_3");
    } else {
      setSectorId("locksmith");
      setCity("Paris");
      setPostalCode("75008 / 75016");
      setDistrict("Rive Droite · Ouest parisien");
      setPopulation("over_800k");
      setCompetition("extreme");
      setPresence("beyond_20");
      setKeywords([
        "serrurier paris urgence",
        "ouverture de porte paris 8",
        "dépannage serrurier 24/7",
        "changement serrure paris",
        "serrurier agréé paris",
      ]);
      setKeywordVolume("9_15");
      setGeoScope("multi_districts");
      setGoal("reach_top_3");
    }
  };

  const toggleSuggestedKeyword = (kw: string) => {
    const clean = `${kw} ${city.trim()}`.trim();
    const exists = keywords.some((k) => k.toLowerCase() === clean.toLowerCase());
    if (exists) {
      setKeywords((prev) => prev.filter((k) => k.toLowerCase() !== clean.toLowerCase()));
    } else {
      setKeywords((prev) => [...prev, clean]);
    }
  };

  const addCustomKeyword = () => {
    const v = kwInput.trim();
    if (!v) return;
    if (!keywords.some((k) => k.toLowerCase() === v.toLowerCase())) {
      setKeywords((prev) => [...prev, v]);
    }
    setKwInput("");
  };

  const selectedTier = MAPS_MANAGEMENT_TIERS.find((t) => t.id === selectedTierId) ?? MAPS_MANAGEMENT_TIERS[1];

  const top3WaUrl = useMemo(() => {
    const cityStr = [city.trim(), postalCode.trim(), district.trim()].filter(Boolean).join(" · ") || "Non précisée";
    const msg =
      `Bonjour XR Agency, je souhaite recevoir une proposition personnalisée pour le Parcours 1 (Référencement Google Maps Top 3 sur mesure) :\n` +
      `• Secteur : ${activeSector.label[L]}\n` +
      `• Zone : ${cityStr}\n` +
      `• Population : ${MAPS_POPULATIONS.find((p) => p.id === population)?.label[L]}\n` +
      `• Concurrence : ${MAPS_COMPETITION_LEVELS.find((x) => x.id === competition)?.label[L]}\n` +
      `• Position actuelle : ${MAPS_PRESENCE_STATES.find((p) => p.id === presence)?.label[L]}\n` +
      `• Volume & Mots-clés (${keywords.length}) : ${keywords.slice(0, 6).join(", ") || "À définir"}\n` +
      `• Étendue : ${MAPS_GEO_SCOPES.find((g) => g.id === geoScope)?.label[L]}\n` +
      `• Objectif : ${MAPS_GOALS.find((g) => g.id === goal)?.label[L]}\n` +
      `• Estimation indicative affichée : À partir de ${estimate.fromEur} € – ${estimate.maxEur} € (${estimate.difficultyLabel[L]})` +
      (addPostCare ? `\n• Option demandée : Envisager ensuite la gestion mensuelle de fiche.` : "");
    return `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [L, activeSector, addPostCare, city, competition, district, estimate, geoScope, goal, keywords, population, postalCode, presence]);

  const difficultyColor =
    estimate.difficultyLevel === "critical"
      ? "bg-red-50 text-red-700 border-red-200"
      : estimate.difficultyLevel === "very_high"
        ? "bg-amber-50 text-amber-800 border-amber-200"
        : estimate.difficultyLevel === "high"
          ? "bg-[#f6efe2] text-[#d4af37] border-[#c5a880]/45"
          : "bg-emerald-50 text-emerald-700 border-emerald-200";

  const visualZoneBadge =
    presence === "top_3_consolidate"
      ? "Zone Top 1–3"
      : presence === "rank_4_10"
        ? "Position #4–10 → Cible Top 3"
        : presence === "rank_11_20"
          ? "Position #11–20 → Ascension locale"
          : "Hors Top 20 → Décollage local";

  return (
    <section
      id={variant === "homepage" ? "maps" : "maps-paths"}
      dir={L === "ar" ? "rtl" : "ltr"}
      className="relative border-t border-white/10 bg-[#07090f] py-20 sm:py-28 text-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 space-y-10">
        {/* Clean Editorial Header separating the two offers */}
        <div className="pb-8 border-b border-white/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/10 px-3.5 py-1 text-[8.5px] font-mono font-bold tracking-[.24em] text-[#38bdf8] uppercase mb-4">
                <span>● {c.eyebrow}</span>
                <span className="opacity-40">|</span>
                <span>GEO DOMINATION</span>
              </div>
              <h2 className="text-[clamp(2.1rem,4vw,3.9rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-white">
                {c.title}{" "}
                <span className="bg-gradient-to-r from-[#06b6d4] via-[#38bdf8] to-[#67e8f9] bg-clip-text text-transparent">
                  {c.titleAccent}
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#94a3b8]">
                {c.subtitle}
              </p>
            </div>

            {/* Dual Path Clean Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0 lg:w-[460px]">
              <button
                type="button"
                onClick={() => setPath("top3")}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all",
                  path === "top3"
                    ? "border-[#06b6d4] bg-[#06b6d4]/15 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-[#06b6d4]/40"
                    : "border-white/10 bg-[#0c0e17] text-[#94a3b8] hover:border-white/25 hover:text-white"
                )}
              >
                <span className={cn("font-mono text-[7px] font-bold block", path === "top3" ? "text-[#38bdf8]" : "text-[#64748b]")}>
                  {c.path1Badge}
                </span>
                <span className="mt-1 block text-xs sm:text-sm font-bold text-white">
                  {c.path1Title}
                </span>
                <span className={cn("mt-1 block text-[10px]", path === "top3" ? "text-[#cbd5e1]" : "text-[#64748b]")}>
                  {c.path1Sub}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPath("management")}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all",
                  path === "management"
                    ? "border-white/20 bg-[#090b10] text-white shadow-lg"
                    : "border-white/15 bg-[#0c0e18] text-white hover:border-[#d4af37]"
                )}
              >
                <span className={cn("label-mono text-[7px] font-bold block", path === "management" ? "text-emerald-300" : "text-emerald-700")}>
                  {c.path2Badge}
                </span>
                <span className="mt-1 block text-xs sm:text-sm font-bold">
                  {c.path2Title}
                </span>
                <span className={cn("mt-1 block text-[10px]", path === "management" ? "text-[#d7d1c6]" : "text-[#94a3b8]")}>
                  {c.path2Sub}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 border-t border-white/10 pt-4 text-[11px] text-[#94a3b8]">
            <div className="flex items-start gap-2">
              <Compass className="h-4 w-4 shrink-0 text-[#d4af37] mt-0.5" />
              <span><strong className="text-white">{c.path1Title} :</strong> {c.path1Note}</span>
            </div>
            <div className="flex items-start gap-2">
              <Building2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
              <span><strong className="text-white">{c.path2Title} :</strong> {c.path2Note}</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            PARCOURS 1 : RÉFÉRENCEMENT LOCAL TOP 3 SUR MESURE
           ════════════════════════════════════════════════════════════════ */}
        {path === "top3" && (
          <div className="rounded-[2rem] border border-white/10 bg-[#090b10] text-white p-5 sm:p-7 lg:p-8 shadow-sm space-y-6">
            {/* Benchmark Quick Demos: Paris vs Orléans */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0c0e18] p-4">
              <div>
                <p className="label-mono text-[8px] font-bold tracking-[.18em] text-[#d4af37]">
                  {c.presetTitle}
                </p>
                <p className="mt-0.5 text-xs text-[#94a3b8]">{c.presetSub}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={city.toLowerCase().includes("orléans") || city.toLowerCase().includes("orleans")}
                  onClick={() => applyPreset("orleans")}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[11px] font-bold transition",
                    city.toLowerCase().includes("orléans") || city.toLowerCase().includes("orleans")
                      ? "border-white/20 bg-[#090b10] text-[#d4af37] shadow-sm"
                      : "border-white/15 bg-[#090b10] text-white hover:border-[#d4af37]"
                  )}
                >
                  {c.presetOrleans}
                </button>
                <button
                  type="button"
                  aria-pressed={city.toLowerCase().includes("paris")}
                  onClick={() => applyPreset("paris")}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[11px] font-bold transition",
                    city.toLowerCase().includes("paris")
                      ? "border-white/20 bg-[#090b10] text-[#d4af37] shadow-sm"
                      : "border-white/15 bg-[#090b10] text-white hover:border-[#d4af37]"
                  )}
                >
                  {c.presetParis}
                </button>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] items-start">
              {/* Left: 9 Commercial Qualification Inputs */}
              <div className="space-y-5">
                {/* 1 & 2: Sector + Precise Location */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="maps-sector" className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-1.5">
                      01 · {c.fSector}
                    </label>
                    <select
                      id="maps-sector"
                      value={sectorId}
                      onChange={(e) => setSectorId(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-[#090b10] px-3.5 py-2.5 text-xs font-semibold"
                    >
                      {MAPS_SECTORS.map((s) => (
                        <option key={s.id} value={s.id}>{s.label[L]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="maps-city" className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-1.5">
                      02 · {c.fCity}
                    </label>
                    <div className="grid grid-cols-[1fr_92px] gap-2">
                      <input
                        id="maps-city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={c.fCityPlaceholder}
                        className="rounded-xl border border-white/15 bg-[#090b10] px-3.5 py-2.5 text-xs font-medium"
                      />
                      <input
                        id="maps-postal-code"
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        aria-label={c.fCity + " · CP"}
                        placeholder="CP"
                        className="rounded-xl border border-white/15 bg-[#090b10] px-3 py-2.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="maps-district" className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-1.5">
                      {c.fDistrict}
                    </label>
                    <input
                      id="maps-district"
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder={c.fDistrictPlaceholder}
                      className="w-full rounded-xl border border-white/15 bg-[#090b10] px-3.5 py-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="maps-population" className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-1.5">
                      03 · {c.fPopulation}
                    </label>
                    <select
                      id="maps-population"
                      value={population}
                      onChange={(e) => setPopulation(e.target.value as MapsPopulationId)}
                      className="w-full rounded-xl border border-white/15 bg-[#090b10] px-3.5 py-2.5 text-xs font-medium"
                    >
                      {MAPS_POPULATIONS.map((p) => (
                        <option key={p.id} value={p.id}>{p.label[L]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4: Competition */}
                <div>
                  <label className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-2">
                    04 · {c.fCompetition}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {MAPS_COMPETITION_LEVELS.map((lv) => (
                      <button
                        key={lv.id}
                        type="button"
                        aria-pressed={competition === lv.id}
                        onClick={() => setCompetition(lv.id)}
                        className={cn(
                          "rounded-xl border p-2.5 text-left transition",
                          competition === lv.id
                            ? "border-white/20 bg-[#090b10] text-[#f7f4ed]"
                            : "border-white/15 bg-[#090b10] hover:border-[#b48f5a]"
                        )}
                      >
                        <span className="block text-[11px] font-bold">{lv.label[L]}</span>
                        <span className={cn("mt-0.5 block text-[9px] leading-tight", competition === lv.id ? "text-[#d7d1c6]" : "text-[#94a3b8]")}>
                          {lv.detail[L]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5: Current Google Maps Presence (6 exact states) */}
                <div>
                  <label className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-2">
                    05 · {c.fPresence}
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {MAPS_PRESENCE_STATES.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        aria-pressed={presence === st.id}
                        onClick={() => setPresence(st.id)}
                        className={cn(
                          "rounded-xl border p-3 text-left transition",
                          presence === st.id
                            ? "border-[#b48f5a] bg-[#efe7d8] ring-1 ring-[#b48f5a]"
                            : "border-white/15 bg-[#090b10] hover:border-[#b48f5a]/60"
                        )}
                      >
                        <span className="block text-[11px] font-bold text-white">{st.label[L]}</span>
                        <span className="mt-0.5 block text-[9.5px] text-[#94a3b8]">{st.detail[L]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6 & 7: Keywords + Keyword count */}
                <div className="rounded-2xl border border-white/15 bg-[#090b10] p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label htmlFor="maps-keyword-input" className="label-mono text-[8px] font-bold text-[#94a3b8]">
                      06 · {c.fKeywords}
                    </label>
                    <span className="text-[10px] font-semibold text-[#8c6c3c]">
                      {keywords.length} {c.selectedKwCount}
                    </span>
                  </div>

                  {/* Quick Add Chips from Sector */}
                  <div className="flex flex-wrap gap-1.5">
                    {(activeSector.suggestedKeywords[L] ?? activeSector.suggestedKeywords.fr).map((kw) => {
                      const full = `${kw} ${city.trim()}`.trim();
                      const active = keywords.some((x) => x.toLowerCase() === full.toLowerCase());
                      return (
                        <button
                          key={kw}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleSuggestedKeyword(kw)}
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-[10px] font-medium transition",
                            active
                              ? "border-white/20 bg-[#090b10] text-[#d4af37]"
                              : "border-white/15 bg-[#f7f4ed] text-white hover:border-[#b48f5a]"
                          )}
                        >
                          {active ? "✓ " : "+ "}{full}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Keyword Input */}
                  <div className="flex gap-2">
                    <input
                      id="maps-keyword-input"
                      type="text"
                      value={kwInput}
                      onChange={(e) => setKwInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomKeyword();
                        }
                      }}
                      placeholder={c.fKwPlaceholder}
                      className="flex-1 rounded-xl border border-white/15 bg-[#f7f4ed] px-3 py-2 text-xs"
                    />
                    <button
                      type="button"
                      onClick={addCustomKeyword}
                      className="inline-flex items-center gap-1 rounded-xl bg-[#090b10] px-3.5 py-2 text-xs font-bold text-[#f7f4ed]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {c.addBtn}
                    </button>
                  </div>

                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {keywords.map((kw) => (
                        <span
                          key={kw}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#efe7d8] px-2.5 py-1 text-[10px] font-semibold text-white"
                        >
                          {kw}
                          <button
                            type="button"
                            onClick={() => setKeywords((p) => p.filter((x) => x !== kw))}
                            aria-label={`Remove keyword: ${kw}`}
                          >
                            <X className="h-3 w-3 opacity-60 hover:opacity-100" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/10">
                    <label className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-1.5">
                      07 · {c.fKwVolume}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {MAPS_KEYWORD_VOLUMES.map((kv) => (
                        <button
                          key={kv.id}
                          type="button"
                          aria-pressed={keywordVolume === kv.id}
                          onClick={() => setKeywordVolume(kv.id)}
                          className={cn(
                            "rounded-lg border px-2.5 py-2 text-[10px] font-semibold transition",
                            keywordVolume === kv.id
                              ? "border-white/20 bg-[#090b10] text-[#f7f4ed]"
                              : "border-white/15 bg-[#f7f4ed] text-white"
                          )}
                        >
                          {kv.label[L]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 8 & 9: Geo Scope & Goal */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="maps-geo-scope" className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-1.5">
                      08 · {c.fGeoScope}
                    </label>
                    <select
                      id="maps-geo-scope"
                      value={geoScope}
                      onChange={(e) => setGeoScope(e.target.value as MapsGeoScopeId)}
                      className="w-full rounded-xl border border-white/15 bg-[#090b10] px-3.5 py-2.5 text-xs font-semibold"
                    >
                      {MAPS_GEO_SCOPES.map((g) => (
                        <option key={g.id} value={g.id}>{g.label[L]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="maps-goal" className="label-mono text-[8px] font-bold text-[#94a3b8] block mb-1.5">
                      09 · {c.fGoal}
                    </label>
                    <select
                      id="maps-goal"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value as MapsGoalId)}
                      className="w-full rounded-xl border border-white/15 bg-[#090b10] px-3.5 py-2.5 text-xs font-semibold"
                    >
                      {MAPS_GOALS.map((g) => (
                        <option key={g.id} value={g.id}>{g.label[L]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right: Visual Google Maps Radar + Rational Estimate Panel (Luminous Card, No Rank Guarantee) */}
              <div className="sticky top-24 rounded-[1.8rem] border border-white/15 bg-[#0c0e18] p-5 sm:p-6 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                  <div>
                    <span className="label-mono text-[7.5px] font-bold tracking-[.18em] text-[#d4af37]">
                      {c.estEyebrow}
                    </span>
                    <h3 className="display-serif mt-0.5 text-2xl text-white">
                      {c.estHeading}
                    </h3>
                  </div>
                  <span className={cn("rounded-full border px-3 py-1 label-mono text-[7.5px] font-bold", difficultyColor)}>
                    {estimate.difficultyLabel[L]}
                  </span>
                </div>

                {/* Playful Interactive Google Maps Local Pack & GeoGrid Visual Preview */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090b10] p-3.5 shadow-sm space-y-3">
                  {/* GeoGrid Interactive Toggle */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#d4af37]">
                      SIMULATION GÉOLOCALISÉE 5 KM
                    </span>
                    <div className="inline-flex rounded-full bg-[#090b10]/10 p-0.5 text-[9px] font-bold">
                      <button
                        type="button"
                        onClick={() => setGeoGridMode("before")}
                        className={cn(
                          "rounded-full px-2.5 py-1 transition",
                          geoGridMode === "before"
                            ? "bg-red-600 text-white shadow-xs"
                            : "text-[#94a3b8] hover:text-white"
                        )}
                      >
                        Avant XR
                      </button>
                      <button
                        type="button"
                        onClick={() => setGeoGridMode("after")}
                        className={cn(
                          "rounded-full px-2.5 py-1 transition",
                          geoGridMode === "after"
                            ? "bg-emerald-700 text-white shadow-xs"
                            : "text-[#94a3b8] hover:text-white"
                        )}
                      >
                        Objectif XR
                      </button>
                    </div>
                  </div>

                  {/* 3x3 GeoGrid Matrix Radar Display */}
                  <div className="rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-center">
                    <div className="grid grid-cols-3 gap-2">
                      {(geoGridMode === "before"
                        ? [
                            { pin: "#18", bg: "bg-red-500/15 text-red-800 border-red-500/30" },
                            { pin: "#14", bg: "bg-red-500/15 text-red-800 border-red-500/30" },
                            { pin: "#22", bg: "bg-red-500/20 text-red-900 border-red-500/40" },
                            { pin: "#16", bg: "bg-amber-500/15 text-amber-900 border-amber-500/30" },
                            { pin: "#12", bg: "bg-amber-500/20 text-amber-900 border-amber-500/40" },
                            { pin: "#19", bg: "bg-red-500/15 text-red-800 border-red-500/30" },
                            { pin: "#25", bg: "bg-red-500/20 text-red-900 border-red-500/40" },
                            { pin: "#21", bg: "bg-red-500/15 text-red-800 border-red-500/30" },
                            { pin: "#17", bg: "bg-amber-500/15 text-amber-900 border-amber-500/30" },
                          ]
                        : [
                            { pin: "#1", bg: "bg-emerald-500/20 text-emerald-900 border-emerald-500/50 shadow-xs font-black" },
                            { pin: "#2", bg: "bg-emerald-500/15 text-emerald-800 border-emerald-500/40 font-bold" },
                            { pin: "#1", bg: "bg-emerald-500/20 text-emerald-900 border-emerald-500/50 shadow-xs font-black" },
                            { pin: "#3", bg: "bg-emerald-500/15 text-emerald-800 border-emerald-500/40 font-bold" },
                            { pin: "#1", bg: "bg-emerald-500/25 text-emerald-950 border-emerald-500/60 shadow-sm font-black scale-105" },
                            { pin: "#2", bg: "bg-emerald-500/15 text-emerald-800 border-emerald-500/40 font-bold" },
                            { pin: "#1", bg: "bg-emerald-500/20 text-emerald-900 border-emerald-500/50 shadow-xs font-black" },
                            { pin: "#2", bg: "bg-emerald-500/15 text-emerald-800 border-emerald-500/40 font-bold" },
                            { pin: "#1", bg: "bg-emerald-500/20 text-emerald-900 border-emerald-500/50 shadow-xs font-black" },
                          ]
                      ).map((cell, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "flex flex-col items-center justify-center rounded-lg border py-2 text-xs transition-all duration-300",
                            cell.bg
                          )}
                        >
                          <span className="font-mono text-sm leading-none">{cell.pin}</span>
                          <span className="text-[7.5px] mt-0.5 opacity-75">Secteur {idx + 1}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-2.5 text-[10.5px] font-medium leading-snug text-[#4f483f]">
                      {geoGridMode === "before" ? (
                        <span className="text-red-800 font-semibold">
                          Hors du Top 3 : les trois fiches du pack local captent l'essentiel des clics et des appels.
                        </span>
                      ) : (
                        <span className="text-emerald-800 font-semibold">
                          Objectif visé : présence dans le Top 3 sur {city || "votre secteur"}. Simulation illustrative, aucun classement n'est garanti.
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Simulated Local Pack Top 3 Result */}
                  <div className="relative rounded-xl border border-emerald-600/15 bg-[radial-gradient(circle_at_52%_42%,rgba(16,185,129,0.14),rgba(248,244,236,0.9)_65%)] p-2.5">
                    <div className="flex items-center justify-between gap-2 pb-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#090b10] px-2 py-0.5 text-[9.5px] font-bold text-white shadow-sm">
                        <Search className="h-2.5 w-2.5 text-[#d4af37]" />
                        {keywords[0] || `${activeSector.label[L]} ${city || "Ville"}`}
                      </span>
                      <span className="rounded-full bg-emerald-600/12 px-2 py-0.5 text-[8.5px] font-bold text-emerald-700">
                        {visualZoneBadge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {[1, 2, 3].map((slot) => (
                        <div
                          key={slot}
                          className={cn(
                            "flex items-center justify-between rounded-lg border px-2 py-1 text-[9.5px]",
                            slot === 1
                              ? "border-[#d4af37]/40 bg-[#0c0e18] font-semibold"
                              : "border-white/10 bg-[#090b10]/95"
                          )}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={cn(
                                "grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full text-[8.5px] font-black",
                                slot === 1 ? "bg-[#090b10] text-[#d4af37]" : "bg-[#efe9dd] text-[#94a3b8]"
                              )}
                            >
                              #{slot}
                            </span>
                            <span className="truncate text-white">
                              {slot === 1 ? `Votre établissement · ${city || "Zone"}` : `Concurrent local ${slot} · ${city || "Zone"}`}
                            </span>
                          </div>
                          <span className="shrink-0 text-[8.5px] font-bold text-amber-600">★ 4.{10 - slot}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Budget Range ("À partir de") */}
                <div className="rounded-2xl border border-[#d4af37]/35 bg-[#090b10] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="label-mono text-[8px] font-bold text-[#d4af37] uppercase tracking-wider">
                      {c.fromBudgetLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white">
                      <Gauge className="h-3.5 w-3.5 text-[#d4af37]" />
                      {estimate.difficultyScore}/100
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                    <span className="display-serif text-3xl sm:text-4xl font-semibold text-white">
                      {price(estimate.fromEur)}
                    </span>
                    <span className="text-sm font-medium text-[#94a3b8]">
                      – {price(estimate.maxEur)}
                    </span>
                  </div>
                  <div className="mt-2.5 h-2 rounded-full bg-[#e6dfd2] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#c5a880] to-red-500 transition-all duration-500"
                      style={{ width: `${estimate.difficultyScore}%` }}
                    />
                  </div>
                </div>

                {/* Concise Factor Chips + Deliverables */}
                <div className="rounded-2xl border border-white/10 bg-[#090b10] p-4 space-y-3">
                  <div>
                    <span className="label-mono text-[7.5px] font-bold text-[#d4af37] block mb-1.5">
                      {c.factorsTitle}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {estimate.factors.slice(0, 4).map((f, idx) => (
                        <span key={idx} className="rounded-lg border border-white/10 bg-[#0c0e18] px-2.5 py-1 text-[10px] text-white">
                          {f[L]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-2.5">
                    <span className="label-mono text-[7.5px] font-bold text-[#d4af37] block mb-1.5">
                      {c.deliverablesTitle}
                    </span>
                    <ul className="space-y-1 text-[11px] text-[#4e473f]">
                      {estimate.deliverables.slice(0, 3).map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-700 mt-0.5" />
                          <span>{d[L]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-white/10 pt-2.5">
                    <span className="label-mono text-[7px] font-bold text-[#d4af37] block mb-1">
                      {c.objectivesTitle}
                    </span>
                    {estimate.objectives.slice(0, 2).map((o, idx) => (
                      <p key={idx} className="text-[11px] text-[#4e473f] flex items-start gap-1.5 mt-0.5">
                        <Target className="h-3 w-3 shrink-0 text-[#d4af37] mt-0.5" />
                        <span>{o[L]}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Optional bridge to Parcours 2 Monthly Care */}
                <label className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-[#090b10] p-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addPostCare}
                    onChange={(e) => setAddPostCare(e.target.checked)}
                    className="mt-1 accent-[#8b6b3e]"
                  />
                  <span className="text-[11px] leading-snug text-[#4e473f]">
                    <strong className="text-white">{c.postCareOptionTitle}</strong> — {c.postCareOptionDesc}
                  </span>
                </label>

                {/* Non-guarantee & Non-binding notice */}
                <p className="text-[10px] leading-relaxed text-[#94a3b8]">
                  {estimate.disclaimer[L]}
                </p>

                {/* Primary CTAs */}
                <div className="space-y-2">
                  <a
                    href={top3WaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#090b10] py-3.5 px-5 text-xs font-black uppercase tracking-wider text-[#d4af37] shadow-md transition hover:bg-[#2a2520]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {c.requestCustomProposal}
                  </a>
                  <a
                    href="/?service=maps_top3#quote"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-[#090b10] py-3 px-5 text-xs font-bold text-white hover:border-[#d4af37] transition"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#d4af37]" />
                    {c.openInConfigurator}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            PARCOURS 2 : ABONNEMENTS MENSUELS GESTION FICHE EXISTANTE
           ════════════════════════════════════════════════════════════════ */}
        {path === "management" && (
          <div className="rounded-[2rem] border border-white/10 bg-[#090b10] text-white p-5 sm:p-7 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="max-w-2xl">
                <span className="label-mono text-[8px] font-bold tracking-[.18em] text-[#d4af37]">
                  {c.p2Kicker}
                </span>
                <h3 className="display-serif mt-1.5 text-2xl sm:text-4xl text-white">
                  {c.p2Heading}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {c.p2Lead}
                </p>
              </div>
              <span className="rounded-full border border-emerald-600/30 bg-emerald-600/10 px-4 py-1.5 label-mono text-[8px] font-bold text-emerald-700">
                {c.p2RemoteBadge}
              </span>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {MAPS_MANAGEMENT_TIERS.map((tier) => {
                const active = selectedTierId === tier.id;
                const checkoutServiceId =
                  tier.id === "essentiel"
                    ? "maps_essentiel"
                    : tier.id === "croissance"
                      ? "maps_croissance"
                      : "maps_intensif";
                const tierWa = `${CONTACT.whatsapp}?text=${encodeURIComponent(
                  `Bonjour XR Agency, je souhaite confier la gestion mensuelle de ma fiche Google Maps existante avec la formule « ${tier.name[L]} » (${tier.eurMonth} € / mois).`
                )}`;

                return (
                  <article
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={cn(
                      "flex flex-col justify-between rounded-[1.8rem] border p-6 transition-all cursor-pointer relative",
                      tier.popular
                        ? "bg-gradient-to-br from-[#faf5ea] to-white border-[#d4af37] ring-2 ring-[#8b6b3e]/30 shadow-xl"
                        : active
                          ? "bg-[#090b10] border-[#d4af37] ring-1 ring-[#8b6b3e]/40 shadow-md"
                          : "bg-[#0c0e18] border-white/10 hover:border-[#d4af37]/50"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="label-mono text-[7.5px] font-bold uppercase text-[#d4af37]">
                          {tier.badge[L]}
                        </span>
                        {active && (
                          <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
                        )}
                      </div>

                      <h4 className="display-serif mt-3 text-2xl text-white">{tier.name[L]}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-[#94a3b8]">
                        {tier.summary[L]}
                      </p>

                      <div className="mt-5 flex items-baseline gap-1.5 border-y border-white/10 py-4">
                        <span className="display-serif text-4xl font-semibold text-white">
                          {price(tier.eurMonth)}
                        </span>
                        <span className="label-mono text-[9px] text-[#94a3b8]">
                          / mois
                        </span>
                      </div>

                      {/* Quantitative Volume Metrics */}
                      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-xl border border-white/10 bg-[#090b10] p-2">
                          <span className="block text-sm font-black text-white">{tier.postsPerMonth}</span>
                          <span className="block text-[8.5px] text-[#94a3b8]">Posts / m</span>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#090b10] p-2">
                          <span className="block text-sm font-black text-white">{tier.photosPerMonth}</span>
                          <span className="block text-[8.5px] text-[#94a3b8]">Visuels / m</span>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#090b10] p-2">
                          <span className="block text-sm font-black text-white">{tier.reviewsPerMonth}</span>
                          <span className="block text-[8.5px] text-[#94a3b8]">Avis / m</span>
                        </div>
                      </div>

                      <ul className="mt-5 space-y-2 text-xs text-white">
                        {tier.deliverables.map((d, k) => (
                          <li key={k} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-700" />
                            <span>{d[L]}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 rounded-xl border border-white/10 bg-[#090b10] p-3 text-[10px] leading-relaxed text-[#94a3b8]">
                        <strong className="text-white">{c.cadenceLabel} :</strong> {tier.optimizationCadence[L]}
                        <br />
                        <strong className="text-white">{c.limitsLabel} :</strong> {tier.limits[L]}
                      </div>
                    </div>

                    <div className="mt-6 space-y-2 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                      <AddToCartBtn
                        item={{
                          serviceId: checkoutServiceId,
                          serviceName: "Gestion Google Business Profile",
                          planName: tier.name[L],
                          priceEur: tier.eurMonth,
                          period: "month",
                          periodLabel: "/ mois",
                        }}
                        popular={false}
                      />
                      <a
                        href={tierWa}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-[#090b10] py-2.5 text-[10px] font-bold uppercase tracking-wider text-white hover:border-[#d4af37] transition"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-700" />
                        {c.startMgmtWa}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Summary bottom strip for Parcours 2 */}
            <div className="rounded-2xl border border-white/15 bg-[#090b10] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="label-mono text-[8px] font-bold text-[#8c6c3c] block">
                  {selectedTier.name[L]} · {price(selectedTier.eurMonth)} / mois
                </span>
                <p className="mt-1 text-xs text-[#94a3b8]">
                  {selectedTier.reportingLabel[L]}
                </p>
              </div>
              <a
                href="/?service=maps_management#quote"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#090b10] px-6 py-3 text-xs font-bold text-[#f7f4ed] hover:bg-[#2a2520] transition"
              >
                {c.openInConfigurator}
                <ArrowRight className="h-3.5 w-3.5 text-[#d4af37]" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  path1Badge: string;
  path1Title: string;
  path1Sub: string;
  path1Note: string;
  path2Badge: string;
  path2Title: string;
  path2Sub: string;
  path2Note: string;
  presetTitle: string;
  presetSub: string;
  presetOrleans: string;
  presetParis: string;
  fSector: string;
  fCity: string;
  fCityPlaceholder: string;
  fDistrict: string;
  fDistrictPlaceholder: string;
  fPopulation: string;
  fCompetition: string;
  fPresence: string;
  fKeywords: string;
  fKwPlaceholder: string;
  selectedKwCount: string;
  addBtn: string;
  fKwVolume: string;
  fGeoScope: string;
  fGoal: string;
  estEyebrow: string;
  estHeading: string;
  fromBudgetLabel: string;
  difficultyMetricLabel: string;
  factorsTitle: string;
  deliverablesTitle: string;
  objectivesTitle: string;
  postCareOptionTitle: string;
  postCareOptionDesc: string;
  requestCustomProposal: string;
  openInConfigurator: string;
  p2Kicker: string;
  p2Heading: string;
  p2Lead: string;
  p2RemoteBadge: string;
  cadenceLabel: string;
  limitsLabel: string;
  startMgmtWa: string;
}> = {
  fr: {
    eyebrow: "GOOGLE MAPS · DEUX OFFRES CLAIREMENT SÉPARÉES",
    title: "Votre stratégie Google Maps,",
    titleAccent: "sans aucune confusion.",
    subtitle: "Choisissez votre situation : conquérir le Top 3 local sur mesure selon votre marché (Parcours 1) ou déléguer la gestion mensuelle à distance d'une fiche existante (Parcours 2).",
    path1Badge: "PARCOURS 1 · SUR MESURE",
    path1Title: "Développer mon positionnement Top 3",
    path1Sub: "Référencement local dynamique (« À partir de » selon marché)",
    path1Note: "Tarif adapté à votre ville, concurrence et point de départ. Objectif Top 3 sans garantie de rang fixe.",
    path2Badge: "PARCOURS 2 · ABONNEMENT MENSUEL",
    path2Title: "Confier la gestion de ma fiche existante",
    path2Sub: "Gestion continue à distance : 99 € / 169 € / 299 € / mois",
    path2Note: "Posts, réponses aux avis et photos fournies assurés par notre équipe à distance (zéro plaque physique / tournage).",
    presetTitle: "SIMULATEUR TARIFAIRE LOCAL SUR MESURE (EXEMPLES COMPARÉS)",
    presetSub: "Testez l'écart réel entre deux marchés avant de saisir votre propre situation ci-dessous :",
    presetOrleans: "Ex. Serrurier à Orléans",
    presetParis: "Ex. Serrurier à Paris (multi-quartiers)",
    fSector: "Secteur d'activité",
    fCity: "Ville & Code postal",
    fCityPlaceholder: "Ex. Orléans, Lyon, Paris...",
    fDistrict: "Quartier / secteur ciblé (facultatif)",
    fDistrictPlaceholder: "Ex. Centre-ville, Rive Droite, 8e arr...",
    fPopulation: "Population de la zone ciblée",
    fCompetition: "Niveau de concurrence observé sur vos mots-clés",
    fPresence: "Situation actuelle sur Google Maps (6 états)",
    fKeywords: "Mots-clés ciblés (suggestions + saisie libre)",
    fKwPlaceholder: "Saisir une expression stratégique puis Entrée...",
    selectedKwCount: "expression(s) sélectionnée(s)",
    addBtn: "Ajouter",
    fKwVolume: "Volume total de mots-clés stratégiques",
    fGeoScope: "Zone géographique ciblée",
    fGoal: "Objectif prioritaire",
    estEyebrow: "DIAGNOSTIC & ESTIMATION DYNAMIQUE",
    estHeading: "Votre estimation SEO locale",
    fromBudgetLabel: "Tarif estimatif · À partir de",
    difficultyMetricLabel: "Indice de difficulté locale",
    factorsTitle: "FACTEURS CLÉS QUI INFLUENCENT LE TARIF",
    deliverablesTitle: "PRESTATIONS ENVISAGÉES",
    objectivesTitle: "OBJECTIFS DE TRAVAIL",
    postCareOptionTitle: "Option suite de projet",
    postCareOptionDesc: "Ajouter ensuite une formule de gestion mensuelle de fiche (Parcours 2) pour entretenir les positions.",
    requestCustomProposal: "Demander une proposition personnalisée",
    openInConfigurator: "Finaliser dans le Configurateur PDF",
    p2Kicker: "PARCOURS 2 · GESTION OPÉRATIONNELLE MENSUELLE",
    p2Heading: "Confier la gestion de ma fiche Google Business Profile",
    p2Lead: "Des forfaits mensuels calibrés sur la charge réelle de nos équipes. Les visuels publiés proviennent de vos propres photos ou de banques numériques sous licence autorisée.",
    p2RemoteBadge: "100 % RÉALISÉ À DISTANCE · SANS ENGAGEMENT LONG",
    cadenceLabel: "Rythme & suivi",
    limitsLabel: "Périmètre",
    startMgmtWa: "Démarrer sur WhatsApp",
  },
  en: {
    eyebrow: "GOOGLE MAPS · TWO CLEARLY SEPARATED OFFERS",
    title: "Your Google Maps strategy,",
    titleAccent: "zero confusion.",
    subtitle: "Choose what you need: climb into Local Top 3 with bespoke market-calibrated SEO (Path 1) or delegate monthly remote profile management (Path 2).",
    path1Badge: "PATH 1 · BESPOKE PROJECT",
    path1Title: "Grow my Top 3 Map visibility",
    path1Sub: "Dynamic local SEO (« From » estimate based on market)",
    path1Note: "Budget adapts to your city, competition and starting rank. Top 3 objective with no algorithmic guarantee.",
    path2Badge: "PATH 2 · MONTHLY CARE",
    path2Title: "Delegate existing GBP management",
    path2Sub: "Remote monthly care: €99 / €169 / €299 per month",
    path2Note: "Posts, review replies & client/licensed photos handled remotely (zero physical hardware or on-site shoots).",
    presetTitle: "DYNAMIC LOCAL SEO ESTIMATOR (REAL BENCHMARKS)",
    presetSub: "Compare two real market levels before customising your own situation:",
    presetOrleans: "Ex. Locksmith in Orléans",
    presetParis: "Ex. Locksmith in Paris (multi-district)",
    fSector: "Business sector",
    fCity: "City & Postal code",
    fCityPlaceholder: "City name...",
    fDistrict: "Target district / neighborhood (optional)",
    fDistrictPlaceholder: "Downtown, district name...",
    fPopulation: "Approximate zone population",
    fCompetition: "Competition intensity on target keywords",
    fPresence: "Current Google Maps presence (6 stages)",
    fKeywords: "Target keywords (suggestions + custom input)",
    fKwPlaceholder: "Type a target keyword and press Enter...",
    selectedKwCount: "keyword(s) selected",
    addBtn: "Add",
    fKwVolume: "Target keyword count",
    fGeoScope: "Geographic scope",
    fGoal: "Main objective",
    estEyebrow: "DYNAMIC LOCAL DIAGNOSTIC",
    estHeading: "Your custom Local SEO range",
    fromBudgetLabel: "Indicative budget · From",
    difficultyMetricLabel: "Local difficulty index",
    factorsTitle: "MAIN PRICING FACTORS",
    deliverablesTitle: "PLANNED DELIVERABLES",
    objectivesTitle: "WORK OBJECTIVES",
    postCareOptionTitle: "Optional post-project care",
    postCareOptionDesc: "Plan to add monthly GBP management (Path 2) after ranking gains to maintain activity.",
    requestCustomProposal: "Request custom proposal",
    openInConfigurator: "Continue in PDF Quote Configurator",
    p2Kicker: "PATH 2 · MONTHLY REMOTE GBP MANAGEMENT",
    p2Heading: "Delegate management of your existing Google Business Profile",
    p2Lead: "Transparent monthly plans matching real team workload. Visuals use your provided photos or authorised digital libraries.",
    p2RemoteBadge: "100% REMOTE DELIVERY · TRANSPARENT SCOPE",
    cadenceLabel: "Cadence",
    limitsLabel: "Limits",
    startMgmtWa: "Start via WhatsApp",
  },
  vi: {
    eyebrow: "GOOGLE MAPS · HAI GIẢI PHÁP TÁCH BIỆT RÕ RÀNG",
    title: "Chiến lược Google Maps,",
    titleAccent: "minh bạch tuyệt đối.",
    subtitle: "Chọn đúng nhu cầu của bạn: đẩy thứ hạng Top 3 theo thị trường thực tế (Lộ trình 1) hoặc ủy quyền vận hành hồ sơ sẵn có hàng tháng từ xa (Lộ trình 2).",
    path1Badge: "LỘ TRÌNH 1 · SEO TOP 3 RIÊNG",
    path1Title: "Đẩy vị trí Google Maps Top 3",
    path1Sub: "Báo giá động \"Từ\" theo độ khó thị trường",
    path1Note: "Chi phí tùy theo thành phố, cạnh tranh và hiện trạng — không cam kết cứng thứ hạng Google.",
    path2Badge: "LỘ TRÌNH 2 · QUẢN LÝ HÀNG THÁNG",
    path2Title: "Quản trị hồ sơ Google có sẵn",
    path2Sub: "Gói vận hành từ xa: 99 € / 169 € / 299 € / tháng",
    path2Note: "Đăng bài, trả lời đánh giá và ảnh từ khách/nguồn bản quyền — không bảng NFC, không quay chụp tại chỗ.",
    presetTitle: "SO SÁNH BÁO GIÁ ĐỘNG THEO THỊ TRƯỜNG",
    presetSub: "Thử so sánh nhanh giữa thành phố vừa và thủ đô:",
    presetOrleans: "VD: Thợ khóa tại Orléans",
    presetParis: "VD: Thợ khóa tại Paris",
    fSector: "Lĩnh vực hoạt động",
    fCity: "Thành phố & Mã bưu chính",
    fCityPlaceholder: "Nhập tên thành phố...",
    fDistrict: "Quận / khu vực mục tiêu",
    fDistrictPlaceholder: "Trung tâm, quận...",
    fPopulation: "Dân số khu vực mục tiêu",
    fCompetition: "Mức độ cạnh tranh trên từ khóa",
    fPresence: "Hiện trạng trên Google Maps (6 mức)",
    fKeywords: "Từ khóa mục tiêu",
    fKwPlaceholder: "Nhập từ khóa rồi nhấn Enter...",
    selectedKwCount: "từ khóa đã chọn",
    addBtn: "Thêm",
    fKwVolume: "Số lượng từ khóa chiến lược",
    fGeoScope: "Phạm vi địa lý",
    fGoal: "Mục tiêu chính",
    estEyebrow: "PHÂN TÍCH ĐỊA PHƯƠNG ĐỘNG",
    estHeading: "Ước tính ngân sách SEO Maps",
    fromBudgetLabel: "Ngân sách tham khảo · Từ",
    difficultyMetricLabel: "Chỉ số độ khó",
    factorsTitle: "YẾU TỐ ẢNH HƯỞNG CHI PHÍ",
    deliverablesTitle: "HẠNG MỤC TRIỂN KHAI",
    objectivesTitle: "MỤC TIÊU CÔNG VIỆC",
    postCareOptionTitle: "Tùy chọn duy trì sau dự án",
    postCareOptionDesc: "Kết hợp thêm gói quản lý hồ sơ hàng tháng (Lộ trình 2) để giữ vững phong độ.",
    requestCustomProposal: "Yêu cầu đề xuất cá nhân hóa",
    openInConfigurator: "Hoàn thiện trong Báo giá PDF",
    p2Kicker: "LỘ TRÌNH 2 · QUẢN LÝ HỒ SƠ TỪ XA",
    p2Heading: "Ủy thác quản lý hồ sơ Google Business Profile",
    p2Lead: "Các gói minh bạch theo khối lượng công việc thực tế của đội ngũ XR Agency từ xa.",
    p2RemoteBadge: "100% TỪ XA · KHÔNG PHÁT SINH VẬT LÝ",
    cadenceLabel: "Tần suất",
    limitsLabel: "Giới hạn",
    startMgmtWa: "Trao đổi qua WhatsApp",
  },
  ar: {
    eyebrow: "خرائط GOOGLE · مساران منفصلان تماماً",
    title: "استراتيجية خرائط Google،",
    titleAccent: "بكل وضوح وشفافية.",
    subtitle: "اختر احتياجك بدقة: تطوير الترتيب المحلي نحو المراكز الثلاثة الأولى بتسعير مخصص (المسار 1) أو تفويض الإدارة الشهرية عن بُعد لملفك القائم (المسار 2).",
    path1Badge: "المسار 1 · سيو محلي مخصص",
    path1Title: "تطوير ترتيبي نحو Top 3",
    path1Sub: "تقدير ديناميكي «ابتداءً من» حسب المنافسة",
    path1Note: "يختلف السعر حسب المدينة والمنافسة والوضع الحالي دون ضمان ترتيب خوارزمي ثابت.",
    path2Badge: "المسار 2 · اشتراك شهري",
    path2Title: "إدارة ملف Google القائم",
    path2Sub: "باقات عن بُعد: 99 € / 169 € / 299 € شهرياً",
    path2Note: "منشورات وردود على التقييمات وإدارة صور العميل عن بُعد بدون أي معدات مادية أو تصوير ميداني.",
    presetTitle: "أمثلة مقارنة لحساب التكلفة",
    presetSub: "قارن بين مدينة متوسطة وعاصمة قبل إدخال بياناتك:",
    presetOrleans: "مثال: صيانة أقفال في أورليان",
    presetParis: "مثال: صيانة أقفال في باريس",
    fSector: "قطاع النشاط",
    fCity: "المدينة والرمز البريدي",
    fCityPlaceholder: "أدخل المدينة...",
    fDistrict: "الحي / المنطقة",
    fDistrictPlaceholder: "وسط المدينة...",
    fPopulation: "عدد السكان التقريبي",
    fCompetition: "شدة المنافسة المحلية",
    fPresence: "الوضع الحالي على خرائط Google",
    fKeywords: "الكلمات المفتاحية المستهدفة",
    fKwPlaceholder: "أضف كلمة مفتاحية...",
    selectedKwCount: "كلمات مختارة",
    addBtn: "إضافة",
    fKwVolume: "عدد الكلمات المفتاحية",
    fGeoScope: "النطاق الجغرافي",
    fGoal: "الهدف الرئيسي",
    estEyebrow: "تقدير السيو المحلي",
    estHeading: "الميزانية التقديرية",
    fromBudgetLabel: "ابتداءً من",
    difficultyMetricLabel: "مؤشر صعوبة السوق",
    factorsTitle: "العوامل المؤثرة في السعر",
    deliverablesTitle: "المهام المقترحة",
    objectivesTitle: "أهداف العمل",
    postCareOptionTitle: "خيار المتابعة الشهرية لاحقاً",
    postCareOptionDesc: "إضافة باقة إدارة شهرية (المسار 2) بعد المشروع للحفاظ على النشاط.",
    requestCustomProposal: "اطلب عرضاً مخصصاً",
    openInConfigurator: "متابعة في مُكوّن عرض السعر",
    p2Kicker: "المسار 2 · إدارة شهرية عن بُعد",
    p2Heading: "تفويض إدارة ملف Google Business Profile",
    p2Lead: "باقات شهرية متوازنة مع حجم العمل الفعلي عن بُعد باستخدام صور العميل أو المصادر المرخصة.",
    p2RemoteBadge: "تنفيذ 100% عن بُعد",
    cadenceLabel: "الوتيرة",
    limitsLabel: "نطاق الباقة",
    startMgmtWa: "ابدأ عبر واتساب",
  },
  ru: {
    eyebrow: "GOOGLE MAPS · ДВА ЧЁТКО РАЗДЕЛЁННЫХ РЕШЕНИЯ",
    title: "Стратегия в Google Maps",
    titleAccent: "без путаницы и иллюзий.",
    subtitle: "Выберите формат: локальное SEO с индивидуальным расчётом (Путь 1) или удалённое ежемесячное ведение действующей карточки (Путь 2).",
    path1Badge: "ПУТЬ 1 · ИНДИВИДУАЛЬНОЕ SEO",
    path1Title: "Продвижение в Топ-3 на заказ",
    path1Sub: "Динамическая смета «От» под ваш рынок",
    path1Note: "Цена зависит от города, конкуренции и стартовых позиций. Цель — Топ-3 без алгоритмической гарантии.",
    path2Badge: "ПУТЬ 2 · ЕЖЕМЕСЯЧНЫЙ ТАРИФ",
    path2Title: "Ведение действующей карточки",
    path2Sub: "Удалённое ведение: 99 € / 169 € / 299 € в месяц",
    path2Note: "Публикации, ответы на отзывы и работа с фото клиента удалённо (без NFC-стоек и выездных съёмок).",
    presetTitle: "ПРИМЕРЫ СРАВНЕНИЯ РЫНКОВ",
    presetSub: "Сравните расчёт для регионального города и столицы:",
    presetOrleans: "Пример: Мастер замков, Орлеан",
    presetParis: "Пример: Мастер замков, Париж",
    fSector: "Сфера бизнеса",
    fCity: "Город и индекс",
    fCityPlaceholder: "Город...",
    fDistrict: "Район (необязательно)",
    fDistrictPlaceholder: "Центр, округ...",
    fPopulation: "Население зоны охвата",
    fCompetition: "Уровень конкуренции по запросам",
    fPresence: "Текущая позиция в Google Maps (6 вариантов)",
    fKeywords: "Целевые ключевые слова",
    fKwPlaceholder: "Введите запрос и нажмите Enter...",
    selectedKwCount: "запросов выбрано",
    addBtn: "Добавить",
    fKwVolume: "Объём ключевых слов",
    fGeoScope: "Географический охват",
    fGoal: "Приоритетная цель",
    estEyebrow: "ДИНАМИЧЕСКИЙ РАСЧЁТ",
    estHeading: "Оценка локального SEO",
    fromBudgetLabel: "Бюджет · От",
    difficultyMetricLabel: "Индекс сложности рынка",
    factorsTitle: "КЛЮЧЕВЫЕ ФАКТОРЫ СТОИМОСТИ",
    deliverablesTitle: "ПЛАНИРУЕМЫЕ РАБОТЫ",
    objectivesTitle: "ЦЕЛИ РАБОТЫ",
    postCareOptionTitle: "Опция дальнейшего ведения",
    postCareOptionDesc: "Подключить ежемесячное ведение карточки (Путь 2) после завершения кампании.",
    requestCustomProposal: "Запросить персональное предложение",
    openInConfigurator: "Открыть в конфигураторе сметы",
    p2Kicker: "ПУТЬ 2 · ЕЖЕМЕСЯЧНОЕ ВЕДЕНИЕ GBP",
    p2Heading: "Передайте ведение вашей карточки Google нашей команде",
    p2Lead: "Тарифы с чётким объёмом постов, отзывов и обновлений. Используются материалы клиента или лицензионные ресурсы.",
    p2RemoteBadge: "100% УДАЛЁННО · БЕЗ ВЫЕЗДНОЙ СЪЁМКИ",
    cadenceLabel: "Регулярность",
    limitsLabel: "Ограничения",
    startMgmtWa: "Написать в WhatsApp",
  },
};
