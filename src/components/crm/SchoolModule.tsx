import { useState, useEffect } from "react";
import {
  GraduationCap,
  Phone,
  MessageSquare,
  Sparkles,
  Trophy,
  ShieldCheck,
  Copy,
  Check,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  Target,
  Swords,
  Shuffle,
  User,
} from "lucide-react";
import { XR_OFFICIAL_SERVICES, type TeamMember } from "@/lib/crm/data";
import {
  BUSINESS_SECTORS,
  XR_SCHOOL_CURRICULUM,
  getSectorServicePlaybook,
} from "@/lib/crm/schoolScripts";

interface SchoolModuleProps {
  currentUser?: TeamMember | null;
  onSound?: () => void;
}

export function SchoolModule({ currentUser, onSound }: SchoolModuleProps) {
  const [selectedSectorId, setSelectedSectorId] = useState(BUSINESS_SECTORS[0].id);
  const [selectedServiceId, setSelectedServiceId] = useState(XR_OFFICIAL_SERVICES[0].id);
  const [scriptTab, setScriptTab] = useState<"coldcall" | "setting" | "pitch" | "closing" | "objections">("coldcall");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openObjIdx, setOpenObjIdx] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"playbooks" | "dojo" | "curriculum">("playbooks");

  // Personnalisation en direct des variables de trame
  const [prospectFirstName, setProspectFirstName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [myFirstName, setMyFirstName] = useState(currentUser?.shortName || "");

  // Dojo Simulateur d'Objections ludique
  const [dojoIndex, setDojoIndex] = useState(0);
  const [dojoRevealed, setDojoRevealed] = useState(false);
  const [dojoScore, setDojoScore] = useState(0);

  const storageKey = `xr_school_progress_${currentUser?.id || "guest"}`;
  const [completedChecks, setCompletedChecks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(completedChecks));
    }
  }, [completedChecks, storageKey]);

  const playbook = getSectorServicePlaybook(selectedSectorId, selectedServiceId);
  const selectedService = XR_OFFICIAL_SERVICES.find((s) => s.id === selectedServiceId) || XR_OFFICIAL_SERVICES[0];

  const personalize = (raw: string) =>
    raw
      .replace(/\[Prénom\]/g, prospectFirstName.trim() || "[Prénom]")
      .replace(/\[Nom Entreprise\]/g, companyName.trim() || "[Nom Entreprise]")
      .replace(/\[Mon Prénom\]/g, myFirstName.trim() || "[Mon Prénom]");

  const totalChecklistItems = XR_SCHOOL_CURRICULUM.reduce((s, m) => s + m.checklist.length, 0);
  const progressPercent = Math.round((completedChecks.length / totalChecklistItems) * 100);

  const toggleCheck = (key: string) => {
    setCompletedChecks((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    onSound?.();
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onSound?.();
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Objections combinées pour le Dojo interactif
  const currentDojoObj = playbook.objections[dojoIndex % playbook.objections.length];

  const nextDojoChallenge = (mastered: boolean) => {
    if (mastered) setDojoScore((s) => s + 1);
    setDojoRevealed(false);
    setDojoIndex((i) => i + 1);
    onSound?.();
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Header XR School — Formation Pure (Zéro Argent) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-violet-500/10 to-transparent border border-white/[0.1] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-violet-600 flex items-center justify-center text-black shrink-0 shadow-lg shadow-amber-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex flex-wrap items-center gap-2">
              XR School · Académie & Trames Commerciales
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Formation Pure · 70 Trames (10 Secteurs × 7 Services)
              </span>
            </h2>
            <p className="text-xs text-white/60 mt-0.5">
              Espace 100 % pédagogique : choisissez un service et un secteur, personnalisez en direct et entraînez-vous au Dojo objections.
            </p>
          </div>
        </div>

        {/* Navigation interne XR School */}
        <div className="flex flex-wrap items-center bg-black/40 p-1 rounded-xl border border-white/[0.08] gap-1">
          <button
            onClick={() => setViewMode("playbooks")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "playbooks"
                ? "bg-amber-400 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            🎯 Trames Sectorielles
          </button>
          <button
            onClick={() => setViewMode("dojo")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === "dojo"
                ? "bg-amber-400 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            Dojo Objections ({dojoScore} ⭐)
          </button>
          <button
            onClick={() => setViewMode("curriculum")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === "curriculum"
                ? "bg-amber-400 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Modules ({progressPercent}%)
          </button>
        </div>
      </div>

      {/* MODE 1 : TRAMES SECTORIELLES × SERVICES */}
      {viewMode === "playbooks" && (
        <div className="space-y-4">
          {/* Barre de personnalisation en direct */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="flex items-center gap-2 bg-black/30 border border-white/[0.08] rounded-xl px-3 py-2">
              <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <input
                type="text"
                value={prospectFirstName}
                onChange={(e) => setProspectFirstName(e.target.value)}
                placeholder="Prénom du prospect (optionnel)"
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/35 w-full"
              />
            </div>
            <div className="flex items-center gap-2 bg-black/30 border border-white/[0.08] rounded-xl px-3 py-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nom de l'entreprise cible (optionnel)"
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/35 w-full"
              />
            </div>
            <div className="flex items-center gap-2 bg-black/30 border border-white/[0.08] rounded-xl px-3 py-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={myFirstName}
                onChange={(e) => setMyFirstName(e.target.value)}
                placeholder="Votre prénom (pour personnaliser)"
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/35 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Colonne gauche (4 cols) : Service + Secteur */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  1. Choisir le Service XR Agency
                </h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {XR_OFFICIAL_SERVICES.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => {
                        setSelectedServiceId(svc.id);
                        onSound?.();
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        selectedServiceId === svc.id
                          ? "bg-amber-400/15 border-amber-400/50 text-white font-bold shadow-sm"
                          : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{svc.icon}</span>
                        <span className="truncate">{svc.name}</span>
                      </span>
                      <span className="text-[10px] text-white/40 shrink-0 ml-2">{svc.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300">
                  2. Choisir le Secteur d'Activité
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
                  {BUSINESS_SECTORS.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setSelectedSectorId(sec.id);
                        onSound?.();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition-all flex items-center gap-2 ${
                        selectedSectorId === sec.id
                          ? "bg-violet-500/20 border-violet-400/50 text-white font-bold"
                          : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span>{sec.icon}</span>
                      <span className="truncate">{sec.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite (8 cols) : Trame Personnalisée Complète */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.1] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{playbook.sector.icon}</span>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {playbook.sector.name} × {selectedService.icon} {selectedService.name}
                      </h3>
                      <p className="text-[11px] text-white/50">
                        Interlocuteur : <strong className="text-white/80">{playbook.sector.targetTitle}</strong> · Enjeu clé :{" "}
                        <strong className="text-amber-300">{playbook.sector.valueMetric}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedService.plans.map((p) => (
                      <span
                        key={p.id}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-black/40 border border-white/[0.08] text-white/80"
                      >
                        {p.label.split("(")[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-100 leading-relaxed">
                  <strong className="text-amber-300">🎯 Angle d'attaque :</strong> {playbook.angle}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "coldcall", label: "📞 Prospection à froid" },
                  { id: "setting", label: "💬 Setting DM / WhatsApp" },
                  { id: "pitch", label: "🎨 Pitch Maquette / Démo" },
                  { id: "closing", label: "🏆 Closing & Fidélisation" },
                  { id: "objections", label: "🛡️ Objections (3)" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setScriptTab(t.id as typeof scriptTab)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      scriptTab === t.id
                        ? "bg-white/[0.12] text-white border border-white/[0.16]"
                        : "bg-white/[0.03] text-white/50 hover:text-white border border-white/[0.06]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {scriptTab === "coldcall" && (
                <div className="space-y-4">
                  <ScriptBox
                    title="1. Accroche 20 secondes (Casser la glace naturellement)"
                    text={personalize(playbook.coldCall.opener)}
                    copied={copiedKey === "opener"}
                    onCopy={() => handleCopy(personalize(playbook.coldCall.opener), "opener")}
                    accent="amber"
                  />

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                      2. Questions de découverte & qualification
                    </h4>
                    <ul className="space-y-2">
                      {playbook.coldCall.qualification.map((q, i) => (
                        <li
                          key={i}
                          className="p-3 rounded-xl bg-black/30 border border-white/[0.05] text-xs text-white/90 font-mono leading-relaxed"
                        >
                          <span className="text-blue-400 font-bold mr-2">Q{i + 1}.</span>
                          {personalize(q)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ScriptBox
                    title="3. Pont vers le RDV ou l'envoi WhatsApp"
                    text={personalize(playbook.coldCall.bridge)}
                    copied={copiedKey === "bridge"}
                    onCopy={() => handleCopy(personalize(playbook.coldCall.bridge), "bridge")}
                    accent="emerald"
                  />
                </div>
              )}

              {scriptTab === "setting" && (
                <div className="space-y-4">
                  <ScriptBox
                    title="Message 1 · Premier contact (WhatsApp / Instagram DM / LinkedIn / SMS)"
                    text={personalize(playbook.setting.dm1)}
                    copied={copiedKey === "dm1"}
                    onCopy={() => handleCopy(personalize(playbook.setting.dm1), "dm1")}
                    accent="emerald"
                    whatsappText={personalize(playbook.setting.dm1)}
                  />
                  <ScriptBox
                    title="Relance J+2 · Courte et orientée valeur"
                    text={personalize(playbook.setting.followupJ2)}
                    copied={copiedKey === "j2"}
                    onCopy={() => handleCopy(personalize(playbook.setting.followupJ2), "j2")}
                    accent="amber"
                    whatsappText={personalize(playbook.setting.followupJ2)}
                  />
                  <ScriptBox
                    title="Relance J+5 · Clôture courtoise"
                    text={personalize(playbook.setting.followupJ5)}
                    copied={copiedKey === "j5"}
                    onCopy={() => handleCopy(personalize(playbook.setting.followupJ5), "j5")}
                    accent="violet"
                    whatsappText={personalize(playbook.setting.followupJ5)}
                  />
                </div>
              )}

              {scriptTab === "pitch" && (
                <div className="space-y-4">
                  <ScriptBox
                    title="Trame de présentation Maquette / Audit / Démonstration"
                    text={personalize(playbook.pitchDemo)}
                    copied={copiedKey === "pitch"}
                    onCopy={() => handleCopy(personalize(playbook.pitchDemo), "pitch")}
                    accent="amber"
                  />
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-white/70 space-y-1.5">
                    <p className="font-bold text-white">📦 Contenu concret du livrable XR Agency :</p>
                    <p>{selectedService.deliverable}</p>
                  </div>
                </div>
              )}

              {scriptTab === "closing" && (
                <div className="space-y-4">
                  <ScriptBox
                    title="Conclusion naturelle (Question binaire sans pression)"
                    text={personalize(playbook.closing.mainClose)}
                    copied={copiedKey === "close"}
                    onCopy={() => handleCopy(personalize(playbook.closing.mainClose), "close")}
                    accent="emerald"
                  />
                  <ScriptBox
                    title="Complément de valeur & fidélisation client"
                    text={personalize(playbook.closing.upsellLine)}
                    copied={copiedKey === "upsell"}
                    onCopy={() => handleCopy(personalize(playbook.closing.upsellLine), "upsell")}
                    accent="violet"
                  />
                </div>
              )}

              {scriptTab === "objections" && (
                <div className="space-y-3">
                  {playbook.objections.map((obj, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenObjIdx(openObjIdx === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left text-xs font-bold text-amber-300 hover:bg-white/[0.04]"
                      >
                        <span>{obj.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-white/50 transition-transform ${
                            openObjIdx === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openObjIdx === idx && (
                        <div className="p-4 pt-0 space-y-3">
                          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed font-mono">
                            {personalize(obj.a)}
                          </div>
                          <button
                            onClick={() => handleCopy(personalize(obj.a), `obj-${idx}`)}
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/60 hover:text-white"
                          >
                            {copiedKey === `obj-${idx}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copié !
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Copier la réplique
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2 : DOJO INTERACTIF D'ENTRAÎNEMENT AUX OBJECTIONS */}
      {viewMode === "dojo" && (
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  setDojoRevealed(false);
                }}
                className="bg-[#121620] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
              >
                {XR_OFFICIAL_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedSectorId}
                onChange={(e) => {
                  setSelectedSectorId(e.target.value);
                  setDojoRevealed(false);
                }}
                className="bg-[#121620] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
              >
                {BUSINESS_SECTORS.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.icon} {sec.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                const randSvc = XR_OFFICIAL_SERVICES[Math.floor(Math.random() * XR_OFFICIAL_SERVICES.length)];
                const randSec = BUSINESS_SECTORS[Math.floor(Math.random() * BUSINESS_SECTORS.length)];
                setSelectedServiceId(randSvc.id);
                setSelectedSectorId(randSec.id);
                setDojoIndex((i) => i + 1);
                setDojoRevealed(false);
                onSound?.();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/30 text-xs font-bold text-violet-200"
            >
              <Shuffle className="w-3.5 h-3.5" /> Scénario Aléatoire
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.1] space-y-5 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold border border-amber-400/30">
              {playbook.sector.icon} {playbook.sector.name} · {selectedService.icon} {selectedService.shortName}
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">
                Le prospect ({playbook.sector.targetTitle}) vous répond :
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentDojoObj.q}
              </h3>
            </div>

            {!dojoRevealed ? (
              <div className="pt-2 space-y-3">
                <p className="text-xs text-white/50">
                  Formulez votre réponse à voix haute (calme, empathique, orientée résultat), puis vérifiez !
                </p>
                <button
                  onClick={() => {
                    setDojoRevealed(true);
                    onSound?.();
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shadow-lg"
                >
                  Révéler la réponse idéale XR Agency
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-sm text-emerald-200 font-mono leading-relaxed">
                  {personalize(currentDojoObj.a)}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => nextDojoChallenge(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white/75"
                  >
                    À retravailler → Suivante
                  </button>
                  <button
                    onClick={() => nextDojoChallenge(true)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shadow-lg"
                  >
                    ⭐ Maîtrisé ! (+1 étoile)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 3 : PARCOURS DE FORMATION PURE */}
      {viewMode === "curriculum" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-white">
                Progression Formation XR School {currentUser ? `— ${currentUser.name}` : ""}
              </span>
              <span className="font-bold text-emerald-400">
                {completedChecks.length} / {totalChecklistItems} compétences validées ({progressPercent}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {XR_SCHOOL_CURRICULUM.map((lesson) => (
              <div
                key={lesson.id}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {lesson.phase}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/60">
                    ⏱️ {lesson.duration}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{lesson.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{lesson.summary}</p>
                <div className="pt-2 space-y-2 border-t border-white/[0.06]">
                  {lesson.checklist.map((item, idx) => {
                    const key = `${lesson.id}-${idx}`;
                    const done = completedChecks.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleCheck(key)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                          done
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200 line-through decoration-emerald-400/60"
                            : "bg-black/20 border-white/[0.06] text-white/80 hover:bg-white/[0.05]"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            done ? "text-emerald-400" : "text-white/25"
                          }`}
                        />
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScriptBox({
  title,
  text,
  copied,
  onCopy,
  accent,
  whatsappText,
}: {
  title: string;
  text: string;
  copied: boolean;
  onCopy: () => void;
  accent: "amber" | "emerald" | "violet";
  whatsappText?: string;
}) {
  const accentColor =
    accent === "emerald"
      ? "text-emerald-300"
      : accent === "violet"
      ? "text-violet-300"
      : "text-amber-300";

  return (
    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${accentColor}`}>{title}</h4>
        <div className="flex items-center gap-1.5">
          {whatsappText && (
            <a
              href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-[11px] font-semibold text-emerald-300 border border-emerald-500/20"
            >
              <MessageSquare className="w-3 h-3" /> WhatsApp
            </a>
          )}
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[11px] font-semibold text-white/80 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copié !
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copier
              </>
            )}
          </button>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs sm:text-sm text-white/90 font-mono leading-relaxed whitespace-pre-line">
        {text}
      </div>
    </div>
  );
}
