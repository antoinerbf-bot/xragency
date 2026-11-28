import { useState, useEffect } from "react";
import {
  GraduationCap,
  Phone,
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  Target,
  Swords,
  Shuffle,
  User,
  Award,
} from "lucide-react";
import { XR_OFFICIAL_SERVICES, type TeamMember } from "@/lib/crm/data";
import {
  BUSINESS_SECTORS,
  XR_SCHOOL_CURRICULUM,
  getSectorServicePlaybook,
} from "@/lib/crm/schoolScripts";
import type { CrmThemeTokens } from "@/lib/crm/theme";

interface SchoolModuleProps {
  currentUser?: TeamMember | null;
  theme: CrmThemeTokens;
  onSound?: () => void;
}

interface QuizQuestion {
  id: string;
  serviceId: string;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    serviceId: "websites",
    question: "Quel est le premier objectif d'un appel à froid pour une refonte de site web ?",
    options: [
      "Réciter toutes les fonctionnalités techniques pendant 5 minutes",
      "Pointer un frein concret sur mobile et obtenir l'accord d'envoyer une maquette visuelle",
      "Envoyer une plaquette PDF générique par email sans rappeler",
    ],
    correctIdx: 1,
    explanation: "On ne vend pas du technique au premier appel : on déclenche l'intérêt avec un constat mobile concret et une maquette sur mesure.",
  },
  {
    id: "q2",
    serviceId: "maps",
    question: "Comment rassure-t-on un gérant sceptique sur Google Maps Top 3 ?",
    options: [
      "On lui promet verbalement la 1ère place dès demain matin",
      "On définit ensemble les requêtes, la zone et le cadre contractuel clair au diagnostic",
      "On lui conseille de supprimer sa fiche actuelle",
    ],
    correctIdx: 1,
    explanation: "La crédibilité repose sur le diagnostic transparent (zone, requêtes ciblées et engagement contractuel clair).",
  },
  {
    id: "q3",
    serviceId: "robotics",
    question: "Comment répondre à un dirigeant qui craint qu'un robot Korben paraisse « froid » ou remplace son équipe ?",
    options: [
      "Le robot remplace effectivement le personnel d'accueil",
      "C'est un assistant qui absorbe les tâches pénibles et répétitives pour que l'équipe soit plus disponible pour les clients",
      "Il vaut mieux éviter d'en parler à son équipe",
    ],
    correctIdx: 1,
    explanation: "Un robot Korben soulage le personnel des trajets répétitifs et crée un effet de modernité immédiat chez les visiteurs.",
  },
  {
    id: "q4",
    serviceId: "social",
    question: "Quelle est la bonne réponse si un prospect demande si les tournages sur site sont inclus en Social Media ?",
    options: [
      "Oui, un caméraman se déplace chaque semaine gratuitement",
      "La stratégie, les visuels, la rédaction et l'animation sont inclus ; un tournage sur site est cadré à part sur demande",
      "Non, on ne fait pas du tout de formats courts",
    ],
    correctIdx: 1,
    explanation: "Transparence totale dès le départ : création digitale et montage inclus, déplacements/tournages cadrés séparément.",
  },
  {
    id: "q5",
    serviceId: "maintenance",
    question: "Quand est-il le plus pertinent de proposer WebCare ?",
    options: [
      "Uniquement lorsque le site est déjà piraté",
      "En complément naturel dès la mise en ligne ou pour tout dirigeant qui veut sécurité et réactivité sur ses mises à jour",
      "Jamais sur les sites vitrines",
    ],
    correctIdx: 1,
    explanation: "WebCare garantit la sérénité technique et la réactivité des mises à jour dès le premier jour.",
  },
];

export function SchoolModule({ currentUser, theme, onSound }: SchoolModuleProps) {
  const [selectedSectorId, setSelectedSectorId] = useState(BUSINESS_SECTORS[0].id);
  const [selectedServiceId, setSelectedServiceId] = useState(XR_OFFICIAL_SERVICES[0].id);
  const [scriptTab, setScriptTab] = useState<"coldcall" | "setting" | "pitch" | "closing" | "objections">("coldcall");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openObjIdx, setOpenObjIdx] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"playbooks" | "dojo" | "quiz" | "curriculum">("playbooks");

  // Variables live
  const [prospectFirstName, setProspectFirstName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [myFirstName, setMyFirstName] = useState(currentUser?.shortName || "");

  // Dojo
  const [dojoIndex, setDojoIndex] = useState(0);
  const [dojoRevealed, setDojoRevealed] = useState(false);
  const [dojoScore, setDojoScore] = useState(0);

  // Quiz Certifiant
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [quizGood, setQuizGood] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

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

  const currentDojoObj = playbook.objections[dojoIndex % playbook.objections.length];

  const handleQuizAnswer = (optIdx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(optIdx);
    if (optIdx === QUIZ_QUESTIONS[quizIdx].correctIdx) {
      setQuizGood((g) => g + 1);
    }
    onSound?.();
  };

  const nextQuizQuestion = () => {
    if (quizIdx + 1 >= QUIZ_QUESTIONS.length) {
      setQuizDone(true);
    } else {
      setQuizIdx((i) => i + 1);
      setSelectedOpt(null);
    }
  };

  return (
    <div className="mt-6 space-y-5">
      {/* Header XR School coloré & ludique */}
      <div className={`p-5 rounded-3xl border ${theme.card} flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4`}>
        <div className="flex items-start gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 flex items-center justify-center text-white shrink-0 shadow-lg shadow-fuchsia-500/25">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-lg font-extrabold flex flex-wrap items-center gap-2 ${theme.textMain}`}>
              XR School · Académie Ludique & Trames
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-300 border border-violet-500/30">
                Formation Pure · 70 Trames (10 Secteurs × 7 Services)
              </span>
            </h2>
            <p className={`text-xs mt-0.5 ${theme.textMuted}`}>
              Maîtrisez nos 7 offres comme un jeu : trames personnalisées en direct, Dojo d'objections, Quiz certifiant et modules pas à pas.
            </p>
          </div>
        </div>

        {/* Navigation interne XR School */}
        <div className={`flex flex-wrap items-center p-1 rounded-2xl border gap-1 ${theme.subCard}`}>
          {[
            { id: "playbooks", label: "🎯 70 Trames" },
            { id: "dojo", label: `⚔️ Dojo (${dojoScore} ⭐)` },
            { id: "quiz", label: "🏅 Quiz Certifiant" },
            { id: "curriculum", label: `📚 Modules (${progressPercent}%)` },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                setViewMode(btn.id as typeof viewMode);
                onSound?.();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === btn.id ? theme.tabActive : theme.tabIdle
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1 : TRAMES SECTORIELLES */}
      {viewMode === "playbooks" && (
        <div className="space-y-4">
          <div className={`p-3.5 rounded-2xl border ${theme.card} grid grid-cols-1 sm:grid-cols-3 gap-2.5`}>
            <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${theme.inputBg}`}>
              <User className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <input
                type="text"
                value={prospectFirstName}
                onChange={(e) => setProspectFirstName(e.target.value)}
                placeholder="Prénom du prospect (remplace [Prénom])"
                className="bg-transparent border-none outline-none text-xs w-full"
              />
            </div>
            <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${theme.inputBg}`}>
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-500 shrink-0" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nom entreprise cible"
                className="bg-transparent border-none outline-none text-xs w-full"
              />
            </div>
            <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${theme.inputBg}`}>
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <input
                type="text"
                value={myFirstName}
                onChange={(e) => setMyFirstName(e.target.value)}
                placeholder="Votre prénom"
                className="bg-transparent border-none outline-none text-xs w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-4 space-y-4">
              <div className={`p-4 rounded-3xl border ${theme.card} space-y-2`}>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-amber-300 flex items-center gap-1.5">
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
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent font-bold shadow-md"
                          : `${theme.subCard} ${theme.textMain} hover:border-indigo-300`
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{svc.icon}</span>
                        <span className="truncate">{svc.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-3xl border ${theme.card} space-y-2`}>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-fuchsia-600 dark:text-violet-300">
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
                          ? "bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white border-transparent font-bold shadow-md"
                          : `${theme.subCard} ${theme.textMain} hover:border-fuchsia-300`
                      }`}
                    >
                      <span>{sec.icon}</span>
                      <span className="truncate">{sec.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className={`p-5 rounded-3xl border ${theme.card} space-y-3`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{playbook.sector.icon}</span>
                    <div>
                      <h3 className={`text-base font-extrabold ${theme.textMain}`}>
                        {playbook.sector.name} × {selectedService.icon} {selectedService.name}
                      </h3>
                      <p className={`text-[11px] ${theme.textMuted}`}>
                        Interlocuteur : <strong>{playbook.sector.targetTitle}</strong> · Enjeu :{" "}
                        <strong className="text-indigo-600 dark:text-amber-300">{playbook.sector.valueMetric}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-400/30 text-xs leading-relaxed">
                  <strong className="text-amber-700 dark:text-amber-300">🎯 Angle d'attaque :</strong>{" "}
                  <span className={theme.textMain}>{playbook.angle}</span>
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
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      scriptTab === t.id ? theme.tabActive : `${theme.card} ${theme.textMuted}`
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {scriptTab === "coldcall" && (
                <div className="space-y-4">
                  <ScriptBox
                    title="1. Accroche 20 secondes"
                    text={personalize(playbook.coldCall.opener)}
                    copied={copiedKey === "opener"}
                    onCopy={() => handleCopy(personalize(playbook.coldCall.opener), "opener")}
                    theme={theme}
                  />
                  <div className={`p-5 rounded-3xl border ${theme.card} space-y-2.5`}>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-blue-300">
                      2. Questions de découverte & qualification
                    </h4>
                    {playbook.coldCall.qualification.map((q, i) => (
                      <div key={i} className={`p-3 rounded-xl border text-xs font-mono leading-relaxed ${theme.subCard} ${theme.textMain}`}>
                        <span className="text-indigo-500 font-extrabold mr-2">Q{i + 1}.</span>
                        {personalize(q)}
                      </div>
                    ))}
                  </div>
                  <ScriptBox
                    title="3. Pont vers le RDV ou WhatsApp"
                    text={personalize(playbook.coldCall.bridge)}
                    copied={copiedKey === "bridge"}
                    onCopy={() => handleCopy(personalize(playbook.coldCall.bridge), "bridge")}
                    theme={theme}
                  />
                </div>
              )}

              {scriptTab === "setting" && (
                <div className="space-y-4">
                  <ScriptBox
                    title="Message 1 · Premier contact (WhatsApp / DM / SMS)"
                    text={personalize(playbook.setting.dm1)}
                    copied={copiedKey === "dm1"}
                    onCopy={() => handleCopy(personalize(playbook.setting.dm1), "dm1")}
                    theme={theme}
                    whatsappText={personalize(playbook.setting.dm1)}
                  />
                  <ScriptBox
                    title="Relance J+2 · Courte et orientée valeur"
                    text={personalize(playbook.setting.followupJ2)}
                    copied={copiedKey === "j2"}
                    onCopy={() => handleCopy(personalize(playbook.setting.followupJ2), "j2")}
                    theme={theme}
                    whatsappText={personalize(playbook.setting.followupJ2)}
                  />
                  <ScriptBox
                    title="Relance J+5 · Clôture courtoise"
                    text={personalize(playbook.setting.followupJ5)}
                    copied={copiedKey === "j5"}
                    onCopy={() => handleCopy(personalize(playbook.setting.followupJ5), "j5")}
                    theme={theme}
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
                    theme={theme}
                  />
                  <div className={`p-4 rounded-2xl border ${theme.card} text-xs space-y-1`}>
                    <p className={`font-bold ${theme.textMain}`}>📦 Ce qui est inclus dans le livrable :</p>
                    <p className={theme.textMuted}>{selectedService.deliverable}</p>
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
                    theme={theme}
                  />
                  <ScriptBox
                    title="Complément de valeur & fidélisation"
                    text={personalize(playbook.closing.upsellLine)}
                    copied={copiedKey === "upsell"}
                    onCopy={() => handleCopy(personalize(playbook.closing.upsellLine), "upsell")}
                    theme={theme}
                  />
                </div>
              )}

              {scriptTab === "objections" && (
                <div className="space-y-3">
                  {playbook.objections.map((obj, idx) => (
                    <div key={idx} className={`rounded-2xl border overflow-hidden ${theme.card}`}>
                      <button
                        onClick={() => setOpenObjIdx(openObjIdx === idx ? null : idx)}
                        className={`w-full flex items-center justify-between p-4 text-left text-xs font-extrabold text-indigo-600 dark:text-amber-300`}
                      >
                        <span>{obj.q}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openObjIdx === idx ? "rotate-180" : ""}`} />
                      </button>
                      {openObjIdx === idx && (
                        <div className="p-4 pt-0 space-y-2.5">
                          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono leading-relaxed text-emerald-800 dark:text-emerald-200">
                            {personalize(obj.a)}
                          </div>
                          <button
                            onClick={() => handleCopy(personalize(obj.a), `obj-${idx}`)}
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${theme.textMuted}`}
                          >
                            {copiedKey === `obj-${idx}` ? <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copié !</> : <><Copy className="w-3.5 h-3.5" /> Copier</>}
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

      {/* MODE 2 : DOJO INTERACTIF */}
      {viewMode === "dojo" && (
        <div className="max-w-3xl mx-auto space-y-4">
          <div className={`p-4 rounded-2xl border ${theme.card} flex flex-wrap items-center justify-between gap-3`}>
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  setDojoRevealed(false);
                }}
                className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              >
                {XR_OFFICIAL_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                ))}
              </select>
              <select
                value={selectedSectorId}
                onChange={(e) => {
                  setSelectedSectorId(e.target.value);
                  setDojoRevealed(false);
                }}
                className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              >
                {BUSINESS_SECTORS.map((sec) => (
                  <option key={sec.id} value={sec.id}>{sec.icon} {sec.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setSelectedServiceId(XR_OFFICIAL_SERVICES[Math.floor(Math.random() * XR_OFFICIAL_SERVICES.length)].id);
                setSelectedSectorId(BUSINESS_SECTORS[Math.floor(Math.random() * BUSINESS_SECTORS.length)].id);
                setDojoIndex((i) => i + 1);
                setDojoRevealed(false);
                onSound?.();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-xs font-bold shadow-md"
            >
              <Shuffle className="w-3.5 h-3.5" /> Combat Aléatoire
            </button>
          </div>

          <div className={`p-7 rounded-3xl border ${theme.card} text-center space-y-5`}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-amber-300 text-xs font-extrabold">
              <Swords className="w-3.5 h-3.5" />
              {playbook.sector.icon} {playbook.sector.name} · {selectedService.icon} {selectedService.shortName}
            </span>
            <h3 className={`text-xl sm:text-2xl font-black ${theme.textMain}`}>{currentDojoObj.q}</h3>

            {!dojoRevealed ? (
              <button
                onClick={() => {
                  setDojoRevealed(true);
                  onSound?.();
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold text-xs shadow-lg"
              >
                Révéler la parade XR Agency
              </button>
            ) : (
              <div className="space-y-4 text-left">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-sm font-mono leading-relaxed text-emerald-800 dark:text-emerald-200">
                  {personalize(currentDojoObj.a)}
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setDojoRevealed(false);
                      setDojoIndex((i) => i + 1);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border ${theme.subCard} ${theme.textMain}`}
                  >
                    À revoir → Suivante
                  </button>
                  <button
                    onClick={() => {
                      setDojoScore((s) => s + 1);
                      setDojoRevealed(false);
                      setDojoIndex((i) => i + 1);
                      onSound?.();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-extrabold shadow-md"
                  >
                    ⭐ Maîtrisé ! (+1 Étoile)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 3 : QUIZ CERTIFIANT PAR SERVICE */}
      {viewMode === "quiz" && (
        <div className={`max-w-2xl mx-auto p-6 rounded-3xl border ${theme.card} space-y-5`}>
          {quizDone ? (
            <div className="text-center space-y-4 py-4">
              <div className="inline-flex h-16 w-16 rounded-3xl bg-gradient-to-br from-amber-400 to-emerald-500 items-center justify-center text-white shadow-xl">
                <Award className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-black ${theme.textMain}`}>
                Score Certification : {quizGood} / {QUIZ_QUESTIONS.length}
              </h3>
              <p className={`text-xs ${theme.textMuted}`}>
                {quizGood >= 4
                  ? "🎉 Bravo ! Vous débloquez le Badge Certifié Méthode XR Agency !"
                  : "Continuez à réviser les trames sectorielles pour atteindre 4/5 !"}
              </p>
              <button
                onClick={() => {
                  setQuizIdx(0);
                  setSelectedOpt(null);
                  setQuizGood(0);
                  setQuizDone(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs"
              >
                Rejouer le Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-indigo-600 dark:text-amber-300">
                  Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-300">
                  Score : {quizGood} pt(s)
                </span>
              </div>
              <h3 className={`text-base font-extrabold ${theme.textMain}`}>
                {QUIZ_QUESTIONS[quizIdx].question}
              </h3>
              <div className="space-y-2.5">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, idx) => {
                  const isCorrect = idx === QUIZ_QUESTIONS[quizIdx].correctIdx;
                  const isPicked = selectedOpt === idx;
                  let style = `${theme.subCard} ${theme.textMain} hover:border-indigo-400`;
                  if (selectedOpt !== null) {
                    if (isCorrect) style = "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-200 font-bold";
                    else if (isPicked) style = "bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-200";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {selectedOpt !== null && (
                <div className="space-y-3 pt-2">
                  <p className={`p-3 rounded-xl text-xs ${theme.subCard} ${theme.textMuted}`}>
                    💡 {QUIZ_QUESTIONS[quizIdx].explanation}
                  </p>
                  <button
                    onClick={nextQuizQuestion}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs"
                  >
                    {quizIdx + 1 >= QUIZ_QUESTIONS.length ? "Voir mon Badge Certification" : "Question suivante →"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* MODE 4 : MODULES DE FORMATION */}
      {viewMode === "curriculum" && (
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border ${theme.card}`}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={`font-extrabold flex items-center gap-1.5 ${theme.textMain}`}>
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Progression Formation XR School
              </span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-300">
                {completedChecks.length} / {totalChecklistItems} compétences ({progressPercent}%)
              </span>
            </div>
            <div className="h-3 w-full bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {XR_SCHOOL_CURRICULUM.map((lesson) => (
              <div key={lesson.id} className={`p-5 rounded-3xl border ${theme.card} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-amber-300">
                    {lesson.phase}
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${theme.subCard} ${theme.textMuted}`}>
                    ⏱️ {lesson.duration}
                  </span>
                </div>
                <h4 className={`text-sm font-extrabold ${theme.textMain}`}>{lesson.title}</h4>
                <p className={`text-xs leading-relaxed ${theme.textMuted}`}>{lesson.summary}</p>
                <div className="pt-2 space-y-2 border-t border-slate-200/50 dark:border-white/10">
                  {lesson.checklist.map((item, idx) => {
                    const key = `${lesson.id}-${idx}`;
                    const done = completedChecks.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleCheck(key)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                          done
                            ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-700 dark:text-emerald-200 line-through"
                            : `${theme.subCard} ${theme.textMain}`
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${done ? "text-emerald-500" : "text-slate-400"}`} />
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
  theme,
  whatsappText,
}: {
  title: string;
  text: string;
  copied: boolean;
  onCopy: () => void;
  theme: CrmThemeTokens;
  whatsappText?: string;
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card} space-y-3`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-amber-300">
          {title}
        </h4>
        <div className="flex items-center gap-1.5">
          {whatsappText && (
            <a
              href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/25"
            >
              <MessageSquare className="w-3 h-3" /> WhatsApp
            </a>
          )}
          <button
            onClick={onCopy}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${theme.subCard} ${theme.textMain}`}
          >
            {copied ? <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copié !</> : <><Copy className="w-3.5 h-3.5" /> Copier</>}
          </button>
        </div>
      </div>
      <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-line ${theme.subCard} ${theme.textMain}`}>
        {text}
      </div>
    </div>
  );
}
