import { useMemo, useState } from "react";
import {
  Flame,
  Phone,
  MessageSquare,
  Sparkles,
  Trophy,
  SkipForward,
  CheckCircle2,
  Palette,
  Copy,
  Check,
  Zap,
  Target,
  Clock,
  Plus,
  ExternalLink,
} from "lucide-react";
import {
  XR_OFFICIAL_SERVICES,
  formatPricePeriod,
  getLeadTotals,
  type Lead,
  type LeadStage,
  type TeamMember,
} from "@/lib/crm/data";
import { BUSINESS_SECTORS, getSectorServicePlaybook } from "@/lib/crm/schoolScripts";
import type { CrmThemeTokens } from "@/lib/crm/theme";

interface QuestFocusArenaProps {
  visibleLeads: Lead[];
  currentUser: TeamMember;
  dailyCalls: number;
  theme: CrmThemeTokens;
  onLogCallOutcome: (
    lead: Lead,
    outcome: "voicemail" | "rdv" | "mockup" | "won",
    noteText: string
  ) => void;
  onOpenCockpit: (lead: Lead) => void;
  onOpenNewLead: () => void;
}

export function QuestFocusArena({
  visibleLeads,
  currentUser,
  dailyCalls,
  theme,
  onLogCallOutcome,
  onOpenCockpit,
  onOpenNewLead,
}: QuestFocusArenaProps) {
  const [cursor, setCursor] = useState(0);
  const [quickNote, setQuickNote] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const todayIso = new Date().toISOString().slice(0, 10);

  // Prospects actifs triés intelligemment : relances échues > urgent > rdv/maquette > nouveaux
  const queue = useMemo(() => {
    const active = visibleLeads.filter((l) => l.stage !== "won");
    const prioRank = (p?: Lead["priority"]) => (p === "urgent" ? 0 : p === "high" ? 1 : 2);
    return [...active].sort((a, b) => {
      const aDue = a.followUpDate && a.followUpDate <= todayIso ? 0 : 1;
      const bDue = b.followUpDate && b.followUpDate <= todayIso ? 0 : 1;
      if (aDue !== bDue) return aDue - bDue;
      const pr = prioRank(a.priority) - prioRank(b.priority);
      if (pr !== 0) return pr;
      const stageOrder: Record<LeadStage, number> = {
        negociation: 0,
        mockup: 1,
        rdv: 2,
        new: 3,
        won: 4,
      };
      return stageOrder[a.stage] - stageOrder[b.stage];
    });
  }, [visibleLeads, todayIso]);

  const myRdvOrMockupCount = visibleLeads.filter(
    (l) => l.stage === "rdv" || l.stage === "mockup" || l.stage === "negociation"
  ).length;
  const myWonCount = visibleLeads.filter((l) => l.stage === "won").length;

  const chests = [
    {
      id: "bronze",
      tier: "🥉 Coffre Bronze",
      goal: "Passer 3 appels",
      xp: "+30 XP",
      progress: Math.min(100, Math.round((dailyCalls / 3) * 100)),
      unlocked: dailyCalls >= 3,
      gradient: "from-amber-600 to-orange-500",
    },
    {
      id: "silver",
      tier: "🥈 Coffre Argent",
      goal: "1 RDV ou Maquette active",
      xp: "+60 XP",
      progress: myRdvOrMockupCount >= 1 ? 100 : 0,
      unlocked: myRdvOrMockupCount >= 1,
      gradient: "from-slate-400 to-indigo-500",
    },
    {
      id: "gold",
      tier: "🥇 Coffre Or",
      goal: "Objectif 10 appels / jour",
      xp: "+120 XP",
      progress: Math.min(100, Math.round((dailyCalls / 10) * 100)),
      unlocked: dailyCalls >= 10,
      gradient: "from-amber-400 to-yellow-500",
    },
    {
      id: "diamond",
      tier: "💎 Coffre Légendaire",
      goal: "1 Vente Signée",
      xp: "+250 XP",
      progress: myWonCount >= 1 ? 100 : 0,
      unlocked: myWonCount >= 1,
      gradient: "from-fuchsia-500 via-violet-600 to-cyan-400",
    },
  ];

  const targetLead = queue.length > 0 ? queue[cursor % queue.length] : null;
  const sector = targetLead
    ? BUSINESS_SECTORS.find((s) => s.id === targetLead.sectorId) || BUSINESS_SECTORS[0]
    : BUSINESS_SECTORS[0];
  const service = targetLead
    ? XR_OFFICIAL_SERVICES.find((s) => s.id === targetLead.serviceId) || XR_OFFICIAL_SERVICES[0]
    : XR_OFFICIAL_SERVICES[0];
  const playbook = targetLead
    ? getSectorServicePlaybook(targetLead.sectorId, targetLead.serviceId)
    : null;

  const injectVars = (raw: string) => {
    if (!targetLead) return raw;
    const firstName = targetLead.contact.split(" ")[0] || targetLead.contact || "Bonjour";
    return raw
      .replace(/\[Prénom\]/g, firstName)
      .replace(/\[Mon Prénom\]/g, currentUser.shortName)
      .replace(/\[Nom Entreprise\]/g, targetLead.name);
  };

  const copyText = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const buildStudioMockupPrompt = (lead: Lead) => {
    return [
      `🎨 BRIEF & PROMPT MAQUETTE EXPRESS — XRAGENCY STUDIO`,
      `Enseigne : ${lead.name} (${sector.name})${lead.city ? ` — Ville : ${lead.city}` : ""}`,
      `Interlocuteur : ${lead.contact} · Tél : ${lead.phone}`,
      lead.websiteUrl ? `Site actuel à auditer/refondre : ${lead.websiteUrl}` : `Pas de site moderne détecté.`,
      `Prestation visée : ${service.name} — ${lead.planLabel} (${formatPricePeriod(lead.value, lead.billing)})`,
      `Angle commercial prioritaire : ${lead.issue || sector.painDigital}`,
      ``,
      `DIRECTIVE DESIGN LOVABLE / STUDIO :`,
      `Créer une page d'accueil Haute Couture ultra-lumineuse, mobile-first (80% trafic smartphone), typographie éditoriale raffinée, section Hero immersive avec preuve sociale (avis 4.9★), présentation claire des prestations de ${lead.name}, module d'appel/réservation directe sans commission en 1 clic et bouton WhatsApp.`,
    ].join("\n");
  };

  const cleanPhone = targetLead ? targetLead.phone.replace(/[^0-9+]/g, "") : "";
  const waText = targetLead && playbook ? encodeURIComponent(injectVars(playbook.setting.dm1)) : "";

  return (
    <div className="mt-6 space-y-5">
      {/* 1. BATTLE PASS QUOTIDIEN */}
      <div className={`p-5 rounded-3xl border ${theme.card}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <h2 className={`text-base font-black ${theme.textMain}`}>
                Battle Pass Quotidien · Mode Focus Appel ⚡
              </h2>
              <p className={`text-xs ${theme.textMuted}`}>
                Enchaînez vos appels sans friction : script auto-rempli, WhatsApp 1-clic et récompenses XP instantanées.
              </p>
            </div>
          </div>
          <span className={`px-3.5 py-1.5 rounded-2xl border text-xs font-extrabold ${theme.badgeSoft}`}>
            🔥 {chests.filter((c) => c.unlocked).length} / {chests.length} Coffres débloqués aujourd'hui
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {chests.map((chest) => (
            <div
              key={chest.id}
              className={`p-4 rounded-2xl border transition-all relative overflow-hidden ${
                chest.unlocked
                  ? "border-emerald-400/70 bg-emerald-500/10 shadow-sm"
                  : theme.subCard
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-black ${theme.textMain}`}>{chest.tier}</span>
                <span
                  className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${chest.gradient} text-white`}
                >
                  {chest.unlocked ? `✓ ${chest.xp}` : chest.xp}
                </span>
              </div>
              <p className={`text-xs mt-1.5 font-semibold ${theme.textMuted}`}>{chest.goal}</p>
              <div className="mt-3 h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${chest.gradient} transition-all duration-500`}
                  style={{ width: `${chest.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SPEED-DIALER CIBLE SUIVANTE */}
      {!targetLead ? (
        <div className={`p-10 rounded-3xl border text-center space-y-4 ${theme.card}`}>
          <div className="mx-auto h-16 w-16 rounded-3xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 text-white flex items-center justify-center text-2xl shadow-lg">
            🎯
          </div>
          <h3 className={`text-xl font-black ${theme.textMain}`}>
            Aucune cible en attente d'appel dans votre file !
          </h3>
          <p className={`text-sm max-w-md mx-auto ${theme.textMuted}`}>
            Ajoutez un nouveau prospect en 5 secondes pour lancer votre session Speed-Dialer avec script sur mesure.
          </p>
          <button
            onClick={onOpenNewLead}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white text-xs font-extrabold shadow-lg hover:scale-[1.02] transition-all"
          >
            <Plus className="w-4 h-4" /> Ajouter mon prochain prospect
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Carte Cible Principale */}
          <div className={`lg:col-span-7 p-6 rounded-3xl border space-y-5 ${theme.card}`}>
            <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-4 border-slate-200/60 dark:border-white/10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-rose-500 to-orange-500 text-white">
                    🎯 Cible #{(cursor % queue.length) + 1}/{queue.length}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${theme.badgeSoft}`}>
                    {sector.icon} {sector.name}
                  </span>
                  {targetLead.followUpDate && targetLead.followUpDate <= todayIso && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-400/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Relance du jour !
                    </span>
                  )}
                </div>
                <h3 className={`text-2xl font-black mt-1 ${theme.textMain}`}>{targetLead.name}</h3>
                <p className={`text-xs font-semibold ${theme.textMuted}`}>
                  👤 {targetLead.contact} · 📞{" "}
                  <span className="font-mono font-bold">{targetLead.phone}</span>
                  {targetLead.city ? ` · 📍 ${targetLead.city}` : ""}
                  {typeof targetLead.callsCount === "number" && targetLead.callsCount > 0
                    ? ` · ☎️ ${targetLead.callsCount} appel(s)`
                    : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenCockpit(targetLead)}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMain}`}
                >
                  Cockpit complet
                </button>
                {queue.length > 1 && (
                  <button
                    onClick={() => setCursor((c) => (c + 1) % queue.length)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-extrabold shadow-sm hover:brightness-110"
                  >
                    Suivant <SkipForward className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Offre & Valeur */}
            <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${theme.subCard}`}>
              <div>
                <p className={`text-[10px] font-extrabold uppercase ${theme.textSoft}`}>
                  Offre & Angle d'attaque
                </p>
                <p className={`text-sm font-black mt-0.5 ${theme.textMain}`}>
                  {service.icon} {service.name} · {targetLead.planLabel}
                </p>
                <p className={`text-xs mt-0.5 ${theme.textMuted}`}>
                  💡 {targetLead.issue || sector.painDigital}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-300">
                  {formatPricePeriod(getLeadTotals(targetLead).commissionBase, targetLead.billing)}
                </p>
                {targetLead.websiteUrl && (
                  <a
                    href={
                      targetLead.websiteUrl.startsWith("http")
                        ? targetLead.websiteUrl
                        : `https://${targetLead.websiteUrl}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-amber-300 hover:underline mt-0.5"
                  >
                    Voir le site actuel <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Boutons Appel Direct + WhatsApp Pré-rempli */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all"
              >
                <Phone className="w-4 h-4" /> Appeler {targetLead.contact.split(" ")[0]} ({targetLead.phone})
              </a>
              <a
                href={`https://wa.me/${cleanPhone.replace(/^\+/, "")}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-sm shadow-lg shadow-indigo-500/20 hover:brightness-110 transition-all"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Personnalisé 1-Clic
              </a>
            </div>

            {/* Note Rapide + 4 Résultats d'Appel Gamifiés */}
            <div className="space-y-3 pt-1">
              <input
                type="text"
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder="Note rapide pendant l'appel (ex: Gérant sympa, rappeler jeudi 14h, veut voir démo POS...)"
                className={`w-full rounded-2xl px-4 py-2.5 text-xs border focus:outline-none focus:border-indigo-500 ${theme.inputBg}`}
              />

              <p className={`text-[10px] font-extrabold uppercase tracking-wider ${theme.textSoft}`}>
                Valider le résultat de l'appel en 1 clic (passe automatiquement au suivant) :
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => {
                    onLogCallOutcome(targetLead, "voicemail", quickNote);
                    setQuickNote("");
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all hover:-translate-y-0.5 ${theme.subCard} ${theme.cardHover}`}
                >
                  <span className="text-base">📵</span>
                  <p className={`text-xs font-extrabold mt-1 ${theme.textMain}`}>Messagerie / Rappel</p>
                  <p className={`text-[10px] ${theme.textMuted}`}>+5 XP · Relance J+1</p>
                </button>

                <button
                  onClick={() => {
                    onLogCallOutcome(targetLead, "rdv", quickNote);
                    setQuickNote("");
                  }}
                  className="p-3 rounded-2xl border border-sky-400/40 bg-sky-500/10 hover:bg-sky-500/20 text-left transition-all hover:-translate-y-0.5"
                >
                  <span className="text-base">📅</span>
                  <p className="text-xs font-extrabold mt-1 text-sky-700 dark:text-sky-300">RDV Posé !</p>
                  <p className="text-[10px] text-sky-600/80 dark:text-sky-200/70">+15 XP · Colonne RDV</p>
                </button>

                <button
                  onClick={() => {
                    onLogCallOutcome(targetLead, "mockup", quickNote);
                    setQuickNote("");
                  }}
                  className="p-3 rounded-2xl border border-violet-400/40 bg-violet-500/10 hover:bg-violet-500/20 text-left transition-all hover:-translate-y-0.5"
                >
                  <span className="text-base">🎨</span>
                  <p className="text-xs font-extrabold mt-1 text-violet-700 dark:text-violet-300">
                    Maquette Studio !
                  </p>
                  <p className="text-[10px] text-violet-600/80 dark:text-violet-200/70">
                    +25 XP · Envoi Studio
                  </p>
                </button>

                <button
                  onClick={() => {
                    onLogCallOutcome(targetLead, "won", quickNote);
                    setQuickNote("");
                  }}
                  className="p-3 rounded-2xl border border-emerald-400/50 bg-emerald-500/15 hover:bg-emerald-500/25 text-left transition-all hover:-translate-y-0.5"
                >
                  <span className="text-base">🏆</span>
                  <p className="text-xs font-extrabold mt-1 text-emerald-700 dark:text-emerald-300">
                    Vente Signée !
                  </p>
                  <p className="text-[10px] text-emerald-600/80 dark:text-emerald-200/70">
                    +100 XP · Jackpot !
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Script Auto-Personnalisé + Prompt Maquette Lovable/Studio */}
          <div className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between gap-2">
              <h4 className={`text-sm font-black flex items-center gap-2 ${theme.textMain}`}>
                <Target className="w-4 h-4 text-indigo-500" />
                Script Téléphonique Prêt-à-Lire
              </h4>
              {playbook && (
                <button
                  onClick={() => copyText("opener", injectVars(playbook.coldCall.opener))}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border text-[11px] font-bold ${theme.subCard} ${theme.textMain}`}
                >
                  {copiedKey === "opener" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" /> Copié
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copier
                    </>
                  )}
                </button>
              )}
            </div>

            {playbook && (
              <div className="space-y-3">
                <div className={`p-3.5 rounded-2xl border ${theme.subCard}`}>
                  <p className="text-[10px] font-extrabold uppercase text-indigo-600 dark:text-amber-300 mb-1">
                    1. Accroche (15 secondes)
                  </p>
                  <p className={`text-xs leading-relaxed font-medium ${theme.textMain}`}>
                    {injectVars(playbook.coldCall.opener)}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border ${theme.subCard}`}>
                  <p className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-300 mb-1">
                    2. Questions de Qualification
                  </p>
                  <ul className={`text-xs space-y-1.5 ${theme.textMuted}`}>
                    {playbook.coldCall.qualification.map((q, idx) => (
                      <li key={idx}>• {injectVars(q)}</li>
                    ))}
                  </ul>
                </div>

                <div className={`p-3.5 rounded-2xl border ${theme.subCard}`}>
                  <p className="text-[10px] font-extrabold uppercase text-fuchsia-600 dark:text-pink-300 mb-1">
                    3. Transition RDV / Maquette
                  </p>
                  <p className={`text-xs leading-relaxed font-medium ${theme.textMain}`}>
                    {injectVars(playbook.coldCall.bridge)}
                  </p>
                </div>
              </div>
            )}

            {/* Générateur Brief / Prompt Maquette en 1 clic */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-xs font-extrabold flex items-center gap-1.5 ${theme.textMain}`}>
                  <Palette className="w-4 h-4 text-violet-500" />
                  Générateur Brief Maquette Studio / Lovable
                </span>
                <button
                  onClick={() => copyText("prompt", buildStudioMockupPrompt(targetLead))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] font-extrabold shadow-sm"
                >
                  {copiedKey === "prompt" ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Prompt copié !
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> Copier le Prompt Maquette
                    </>
                  )}
                </button>
              </div>
              <p className={`text-[11px] ${theme.textMuted}`}>
                Copie en 1 clic le cahier des charges complet de <strong>{targetLead.name}</strong> pour générer sa maquette ou briefer le Studio instantanément.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
