import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Trophy,
  Flame,
  Sparkles,
  PhoneCall,
  FileSearch,
  CalendarCheck,
  Crown,
  AlertTriangle,
  MessageSquare,
  Code2,
  FileText,
  BarChart3,
  Kanban,
  Plus,
  Check,
  Copy,
  ExternalLink,
  TrendingUp,
  ShieldAlert,
  Users,
  Database,
  ArrowUpRight,
} from "lucide-react";
import { XR_ADVISORS, type XRAdvisor } from "../../lib/xr-advisors";
import {
  RPG_XP_REWARDS,
  RPG_RANKS,
  DAILY_QUEST_POOL,
  INITIAL_SUPABASE_PROSPECTS,
  INITIAL_SUPABASE_AUDITS,
  getRankForXp,
  getNextRank,
  getStreakMultiplier,
  playXpChime,
  playVictoryFanfare,
  triggerVictoryConfetti,
  isLeadInactive48h,
  getInactiveHours,
  buildOneClickWhatsAppRelance,
  generateLovableArchitecturePrompt,
  type DailyQuest,
} from "../../lib/rpg-engine";
import type { Prospect, ProspectStatus, Audit } from "../../lib/saas/types";
import { getSupabase, isSupabaseConfigured } from "../../lib/saas/supabase";
import { OfficialQuoteGenerator } from "./OfficialQuoteGenerator";
import { JarvisCommandHUD } from "../jarvis/JarvisCommandHUD";

const KANBAN_COLUMNS: {
  status: ProspectStatus;
  title: string;
  badgeColor: string;
  xpAction?: "call" | "audit" | "meeting" | "deal_closed";
}[] = [
  {
    status: "new",
    title: "1. Nouveaux Leads",
    badgeColor: "border-slate-500/40 text-slate-300",
  },
  {
    status: "audited",
    title: "2. Audités (+150 XP)",
    badgeColor: "border-sky-500/40 text-sky-300",
    xpAction: "audit",
  },
  {
    status: "contacted",
    title: "3. Appelés / Relancés (+50 XP)",
    badgeColor: "border-amber-500/40 text-amber-300",
    xpAction: "call",
  },
  {
    status: "qualified",
    title: "4. RDV Qualifié (+300 XP)",
    badgeColor: "border-purple-500/40 text-purple-300",
    xpAction: "meeting",
  },
  {
    status: "client",
    title: "5. Signé / Gagné (+1000 XP)",
    badgeColor: "border-[#10B981] text-[#10B981]",
    xpAction: "deal_closed",
  },
];

export function RpgDashboardCommandCenter() {
  const [activeTab, setActiveTab] = useState<
    "PIPELINE_RPG" | "QUOTE_STUDIO" | "DIRECTION_BOARD" | "SUPABASE_SCHEMA"
  >("PIPELINE_RPG");

  // Active closer profile (defaults to Martin, switchable across all 7 advisors)
  const [activeAdvisorId, setActiveAdvisorId] = useState<string>("romain");
  const [advisorXpMap, setAdvisorXpMap] = useState<Record<string, number>>(() =>
    Object.fromEntries(XR_ADVISORS.map((a) => [a.id, a.xp])),
  );
  const [streakDays, setStreakDays] = useState<number>(7);
  const [quests, setQuests] = useState<DailyQuest[]>(DAILY_QUEST_POOL);
  const [xpToast, setXpToast] = useState<string | null>(null);

  // Supabase-compatible 'prospects' & 'audits' state
  const [prospects, setProspects] = useState<Prospect[]>(
    INITIAL_SUPABASE_PROSPECTS,
  );
  const [audits, setAudits] = useState<Audit[]>(INITIAL_SUPABASE_AUDITS);
  const [draggedProspectId, setDraggedProspectId] = useState<string | null>(
    null,
  );

  // Modals & selected prospect for Lovable Prompt / Quote Studio
  const [lovableModalProspect, setLovableModalProspect] =
    useState<Prospect | null>(null);
  const [copiedLovable, setCopiedLovable] = useState(false);
  const [quoteTargetProspect, setQuoteTargetProspect] =
    useState<Prospect | null>(INITIAL_SUPABASE_PROSPECTS[0]);

  // New prospect quick creation form (100% compatible with Supabase 'prospects' schema)
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    business_name: "",
    contact_name: "",
    phone: "",
    website_url: "",
    owner_id: "romain",
  });

  // Sync from Supabase if configured, while keeping rich initial dataset
  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    (async () => {
      try {
        const supabase = getSupabase();
        const { data: pData } = await supabase
          .from("prospects")
          .select("*")
          .order("created_at", { ascending: false });
        if (pData && pData.length > 0) {
          setProspects((prev) => {
            const existingIds = new Set(pData.map((d: any) => d.id));
            return [
              ...(pData as Prospect[]),
              ...prev.filter((p) => !existingIds.has(p.id)),
            ];
          });
        }
        const { data: aData } = await supabase
          .from("audits")
          .select("*")
          .order("created_at", { ascending: false });
        if (aData && aData.length > 0) {
          setAudits((prev) => [
            ...(aData as Audit[]),
            ...prev.filter((a) => !aData.some((d: any) => d.id === a.id)),
          ]);
        }
      } catch {
        // Fallback to local state silently
      }
    })();
  }, []);

  const currentAdvisor: XRAdvisor =
    XR_ADVISORS.find((a) => a.id === activeAdvisorId) || XR_ADVISORS[1];
  const currentXp = advisorXpMap[activeAdvisorId] ?? currentAdvisor.xp;
  const currentRank = getRankForXp(currentXp);
  const nextRank = getNextRank(currentXp);
  const streakInfo = getStreakMultiplier(streakDays);

  const awardXp = (
    actionType: "call" | "audit" | "meeting" | "deal_closed",
    customLabel?: string,
  ) => {
    const basePoints = RPG_XP_REWARDS[actionType];
    const finalPoints = Math.round(basePoints * streakInfo.multiplier);

    setAdvisorXpMap((prev) => ({
      ...prev,
      [activeAdvisorId]: (prev[activeAdvisorId] || 0) + finalPoints,
    }));

    // Progress matching daily quest
    setQuests((prev) =>
      prev.map((q) => {
        if (q.actionType !== actionType || q.completed) return q;
        const nextProgress = Math.min(q.targetCount, q.currentCount + 1);
        return {
          ...q,
          currentCount: nextProgress,
          completed: nextProgress >= q.targetCount,
        };
      }),
    );

    if (actionType === "deal_closed") {
      playVictoryFanfare();
      triggerVictoryConfetti();
      setXpToast(
        `🏆 DEAL SIGNÉ ! +${finalPoints} XP (${streakInfo.label}) attribués à ${currentAdvisor.firstName} !`,
      );
    } else {
      playXpChime();
      setXpToast(
        `⚡ +${finalPoints} XP (${customLabel || actionType.toUpperCase()}) • Multiplicateur ${streakInfo.label}`,
      );
    }

    setTimeout(() => setXpToast(null), 4200);
  };

  const updateProspectStatus = async (
    prospectId: string,
    newStatus: ProspectStatus,
  ) => {
    const target = prospects.find((p) => p.id === prospectId);
    if (!target || target.status === newStatus) return;

    const updatedTimestamp = new Date().toISOString();
    setProspects((prev) =>
      prev.map((p) =>
        p.id === prospectId
          ? { ...p, status: newStatus, updated_at: updatedTimestamp }
          : p,
      ),
    );

    const col = KANBAN_COLUMNS.find((c) => c.status === newStatus);
    if (col?.xpAction) {
      awardXp(col.xpAction, `${target.business_name} → ${col.title}`);
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabase();
        await supabase
          .from("prospects")
          .update({ status: newStatus, updated_at: updatedTimestamp })
          .eq("id", prospectId);
      } catch {
        // ignore offline
      }
    }
  };

  const handleAddSupabaseProspect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.business_name.trim()) return;
    const now = new Date().toISOString();
    const created: Prospect = {
      id: `prospect-${Date.now()}`,
      owner_id: newLeadForm.owner_id,
      business_name: newLeadForm.business_name.trim(),
      contact_name: newLeadForm.contact_name.trim() || "Dirigeant",
      phone: newLeadForm.phone.trim() || "+33 6 00 00 00 00",
      website_url: newLeadForm.website_url.trim() || "https://exemple.fr",
      status: "new",
      notes: "Lead créé dans le CRM RPG XR Agency.",
      created_at: now,
      updated_at: now,
    };

    setProspects((prev) => [created, ...prev]);
    setShowAddLead(false);
    setNewLeadForm({
      business_name: "",
      contact_name: "",
      phone: "",
      website_url: "",
      owner_id: activeAdvisorId,
    });
    awardXp("audit", `Nouveau prospect : ${created.business_name}`);

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabase();
        await supabase.from("prospects").insert([created]);
      } catch {
        // ignore
      }
    }
  };

  const getLatestAuditForProspect = (prospectId: string): Audit | undefined =>
    audits.find((a) => a.prospect_id === prospectId);

  // Direction KPIs
  const inactiveLeads = prospects.filter((p) =>
    isLeadInactive48h(p.updated_at, p.status),
  );
  const totalMonthlyCa = XR_ADVISORS.reduce(
    (sum, a) => sum + a.monthlyRevenueGenerated,
    0,
  );
  const totalRecurringMrr = XR_ADVISORS.reduce(
    (sum, a) => sum + a.mrrManaged,
    0,
  );

  const sortedLeaderboard = [...XR_ADVISORS].sort(
    (a, b) => (advisorXpMap[b.id] ?? b.xp) - (advisorXpMap[a.id] ?? a.xp),
  );

  return (
    <div
      className="min-h-screen bg-[#080B10] text-[#F8FAFC] pb-28 font-sans"
      data-testid="rpg-crm-command-center"
    >
      {/* TOP BAR: BRANDING + RPG PLAYER HUD + QUICK XP TRIGGERS */}
      <header className="sticky top-0 z-30 bg-[#080B10]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: XR Agency CRM Identity & Advisor Switcher */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] font-serif font-bold text-sm hover:bg-[#D4AF37] hover:text-[#080B10] transition"
                title="Retour au site public xragencyai.com"
              >
                XR
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                    XR AGENCY • APEX RPG CRM
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    SUPABASE SYNC READY
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-bold text-white">
                  Command Center & Générateur Officiel de Devis
                </h1>
              </div>
            </div>

            {/* Active Closer Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Closer actif :
              </span>
              <select
                value={activeAdvisorId}
                onChange={(e) => setActiveAdvisorId(e.target.value)}
                data-testid="rpg-advisor-select"
                className="px-3 py-1.5 rounded-xl bg-[#0F172A] border border-[#D4AF37]/40 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {XR_ADVISORS.map((adv) => (
                  <option key={adv.id} value={adv.id}>
                    {adv.firstName} ({adv.rpgRank})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center/Right: RPG Rank Progress, Streak Multiplier & Fast XP Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Rank & XP Bar */}
            <div
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#0F172A] border border-white/10"
              data-testid="rpg-rank-badge"
            >
              <Crown
                className="w-5 h-5 shrink-0"
                style={{ color: currentRank.badgeColor }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {currentRank.title}
                  </span>
                  <span
                    className="text-xs font-mono font-bold text-[#D4AF37]"
                    data-testid="rpg-current-xp"
                  >
                    {currentXp.toLocaleString("fr-FR")} XP
                  </span>
                </div>
                <div className="w-36 h-1.5 rounded-full bg-[#080B10] overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#10B981] transition-all duration-500"
                    style={{
                      width: nextRank
                        ? `${Math.min(
                            100,
                            Math.round(
                              ((currentXp - currentRank.minXp) /
                                (nextRank.minXp - currentRank.minXp)) *
                                100,
                            ),
                          )}%`
                        : "100%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Streak Badge */}
            <button
              type="button"
              onClick={() => setStreakDays((d) => (d >= 14 ? 3 : d + 3))}
              className="px-3 py-2 rounded-xl bg-[#0F172A] border border-amber-500/30 flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:border-amber-400 transition"
              title="Cliquer pour simuler l'évolution de la série (Streak)"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{streakInfo.label}</span>
            </button>

            {/* Instant RPG Action Triggers (+50 / +150 / +300 / +1000 XP) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => awardXp("call", "Appel qualifié")}
                data-testid="xp-btn-call"
                className="px-2.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-200 flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
                +50 XP Appel
              </button>
              <button
                type="button"
                onClick={() => awardXp("audit", "Audit 5 Piliers")}
                data-testid="xp-btn-audit"
                className="px-2.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-200 flex items-center gap-1"
              >
                <FileSearch className="w-3 h-3 text-sky-400" />
                +150 XP Audit
              </button>
              <button
                type="button"
                onClick={() => awardXp("meeting", "RDV Découverte")}
                data-testid="xp-btn-meeting"
                className="px-2.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-200 flex items-center gap-1"
              >
                <CalendarCheck className="w-3 h-3 text-purple-400" />
                +300 XP RDV
              </button>
              <button
                type="button"
                onClick={() => awardXp("deal_closed", "Deal Closé !")}
                data-testid="xp-btn-deal-closed"
                className="px-3 py-1.5 rounded-lg bg-[#10B981] text-[#080B10] font-mono font-bold text-[11px] flex items-center gap-1 hover:bg-[#14d496] shadow-[0_0_20px_rgba(16,185,129,0.35)]"
              >
                <Trophy className="w-3.5 h-3.5" />
                +1000 XP Deal Signé
              </button>
            </div>
          </div>
        </div>

        {/* XP Toast Notification */}
        {xpToast && (
          <div
            className="bg-gradient-to-r from-[#D4AF37]/20 via-[#10B981]/25 to-[#D4AF37]/20 border-t border-[#10B981]/40 px-6 py-2 text-center text-xs font-mono font-bold text-[#10B981]"
            data-testid="rpg-xp-toast"
          >
            {xpToast}
          </div>
        )}
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* PRIORITY 48H INACTIVE LEADS BLINKING RED ALERT BANNER */}
        {inactiveLeads.length > 0 && (
          <div
            className="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-500/80 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_35px_rgba(244,63,94,0.25)]"
            data-testid="crm-48h-alert-banner"
          >
            <div className="flex items-start sm:items-center gap-3">
              <span className="relative flex h-4 w-4 shrink-0 mt-1 sm:mt-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
                    ALERTE SLA CRITIQUE &gt; 48 HEURES D'INACTIVITÉ
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500 text-white font-bold">
                    {inactiveLeads.length} DOSSIERS EN DANGER
                  </span>
                </div>
                <p className="text-xs text-slate-200 mt-0.5">
                  Les prospects suivants n'ont reçu aucune action depuis plus de 48h :{" "}
                  <strong>
                    {inactiveLeads.map((l) => l.business_name).join(" • ")}
                  </strong>
                  . Déclenchez une relance WhatsApp en 1 clic immédiatement.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              {inactiveLeads.slice(0, 2).map((lead) => {
                const audit = getLatestAuditForProspect(lead.id);
                const waUrl = buildOneClickWhatsAppRelance(
                  lead,
                  currentAdvisor.firstName,
                  audit?.overall_score,
                );
                return (
                  <a
                    key={lead.id}
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => awardXp("call", `Relance SLA 48h ${lead.business_name}`)}
                    className="px-3 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Relancer {lead.business_name.slice(0, 18)}…
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN CRM TABS */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("PIPELINE_RPG")}
              data-testid="tab-pipeline-rpg"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === "PIPELINE_RPG"
                  ? "bg-[#D4AF37] text-[#080B10] shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                  : "bg-[#0F172A] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              <Kanban className="w-4 h-4" />
              Pipeline Kanban RPG & Closing ({prospects.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("QUOTE_STUDIO")}
              data-testid="tab-quote-studio"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === "QUOTE_STUDIO"
                  ? "bg-[#D4AF37] text-[#080B10] shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                  : "bg-[#0F172A] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              <FileText className="w-4 h-4" />
              Générateur Officiel de Devis & Signature
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("DIRECTION_BOARD")}
              data-testid="tab-direction-board"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === "DIRECTION_BOARD"
                  ? "bg-[#D4AF37] text-[#080B10] shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                  : "bg-[#0F172A] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Pilotage Direction (CA, MRR & Leaderboard)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("SUPABASE_SCHEMA")}
              data-testid="tab-supabase-schema"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === "SUPABASE_SCHEMA"
                  ? "bg-[#D4AF37] text-[#080B10]"
                  : "bg-[#0F172A] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              <Database className="w-4 h-4" />
              Base Supabase (prospects & audits)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAddLead((v) => !v)}
            className="px-4 py-2.5 rounded-xl bg-[#10B981] text-[#080B10] font-bold text-xs flex items-center gap-1.5 hover:bg-[#14d496] transition"
          >
            <Plus className="w-4 h-4" />
            Nouveau Prospect Supabase
          </button>
        </div>

        {/* QUICK ADD SUPABASE PROSPECT DRAWER */}
        {showAddLead && (
          <form
            onSubmit={handleAddSupabaseProspect}
            className="p-5 rounded-2xl bg-[#0F172A] border border-[#D4AF37]/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end"
          >
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                business_name *
              </label>
              <input
                type="text"
                required
                value={newLeadForm.business_name}
                onChange={(e) =>
                  setNewLeadForm({ ...newLeadForm, business_name: e.target.value })
                }
                placeholder="Ex: Clinique Champs-Élysées"
                className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                contact_name
              </label>
              <input
                type="text"
                value={newLeadForm.contact_name}
                onChange={(e) =>
                  setNewLeadForm({ ...newLeadForm, contact_name: e.target.value })
                }
                placeholder="Ex: Dr. Marc Lévy"
                className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                phone
              </label>
              <input
                type="text"
                value={newLeadForm.phone}
                onChange={(e) =>
                  setNewLeadForm({ ...newLeadForm, phone: e.target.value })
                }
                placeholder="+33 6 12 34 56 78"
                className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                website_url
              </label>
              <input
                type="text"
                value={newLeadForm.website_url}
                onChange={(e) =>
                  setNewLeadForm({ ...newLeadForm, website_url: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                owner_id (Commercial)
              </label>
              <select
                value={newLeadForm.owner_id}
                onChange={(e) =>
                  setNewLeadForm({ ...newLeadForm, owner_id: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-xs text-white"
              >
                {XR_ADVISORS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.firstName} ({a.specialtyShort})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="py-2 px-4 rounded-xl bg-[#D4AF37] text-[#080B10] font-bold text-xs hover:bg-[#e3be42]"
            >
              Insérer dans `prospects`
            </button>
          </form>
        )}

        {/* TAB 1: RPG KANBAN PIPELINE + DAILY QUESTS + 1-CLICK CLOSING TOOLS */}
        {activeTab === "PIPELINE_RPG" && (
          <div className="space-y-6">
            {/* Daily Quests & Ranks Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Quêtes Quotidiennes */}
              <div className="lg:col-span-7 p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Quêtes Quotidiennes Aléatoires (Bonus XP)
                  </span>
                  <span className="text-[11px] font-mono text-[#10B981]">
                    Multiplicateur actif : {streakInfo.label}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {quests.map((q) => (
                    <div
                      key={q.id}
                      className={`p-3 rounded-xl border ${
                        q.completed
                          ? "bg-[#10B981]/10 border-[#10B981]/50"
                          : "bg-[#080B10] border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>{q.title}</span>
                        <span className="text-[10px] font-mono text-[#D4AF37]">
                          +{q.bonusXp} XP
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {q.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-300">
                          Progression : {q.currentCount}/{q.targetCount}
                        </span>
                        {q.completed && (
                          <span className="text-[#10B981] font-bold">
                            COMPLÉTÉ ✓
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 RPG Ranks Ladder */}
              <div className="lg:col-span-5 p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                  Échelle Officielle des 5 Rangs RPG XR Agency
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {RPG_RANKS.map((r) => {
                    const isCurrent = r.title === currentRank.title;
                    return (
                      <div
                        key={r.level}
                        className={`p-2 rounded-xl border text-center ${
                          isCurrent
                            ? "bg-[#D4AF37]/15 border-[#D4AF37]"
                            : "bg-[#080B10] border-white/10 opacity-75"
                        }`}
                      >
                        <div
                          className="text-[10px] font-mono font-bold"
                          style={{ color: r.badgeColor }}
                        >
                          RANG {r.level}
                        </div>
                        <div className="text-[11px] font-bold text-white mt-0.5 leading-tight">
                          {r.title}
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 mt-1">
                          {r.minXp}+ XP
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* KANBAN BOARD WITH DRAG & DROP TO "SIGNÉ / GAGNÉ" */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {KANBAN_COLUMNS.map((col) => {
                const colProspects = prospects.filter(
                  (p) => p.status === col.status,
                );
                return (
                  <div
                    key={col.status}
                    data-testid={`kanban-col-${col.status}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (draggedProspectId) {
                        updateProspectStatus(draggedProspectId, col.status);
                        setDraggedProspectId(null);
                      }
                    }}
                    className={`rounded-2xl bg-[#0F172A] border p-3.5 space-y-3 min-h-[480px] transition ${
                      col.status === "client"
                        ? "border-[#10B981]/50 bg-gradient-to-b from-[#0F172A] to-[#10B981]/10"
                        : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${col.badgeColor}`}
                      >
                        {col.title}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {colProspects.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {colProspects.map((prospect) => {
                        const inactive48h = isLeadInactive48h(
                          prospect.updated_at,
                          prospect.status,
                        );
                        const inactiveHours = getInactiveHours(
                          prospect.updated_at,
                        );
                        const ownerAdvisor =
                          XR_ADVISORS.find((a) => a.id === prospect.owner_id) ||
                          currentAdvisor;
                        const audit = getLatestAuditForProspect(prospect.id);
                        const waLink = buildOneClickWhatsAppRelance(
                          prospect,
                          ownerAdvisor.firstName,
                          audit?.overall_score,
                        );

                        return (
                          <div
                            key={prospect.id}
                            draggable
                            onDragStart={() => setDraggedProspectId(prospect.id)}
                            data-testid={`prospect-card-${prospect.id}`}
                            className={`p-3.5 rounded-xl bg-[#080B10] border transition cursor-grab active:cursor-grabbing space-y-2.5 ${
                              inactive48h
                                ? "border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                                : "border-white/10 hover:border-[#D4AF37]/50"
                            }`}
                          >
                            {/* Top Row: SLA 48h Blinking Badge or Owner */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#D4AF37] border border-white/10">
                                Référent : {ownerAdvisor.firstName}
                              </span>
                              {inactive48h && (
                                <span
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500 animate-pulse"
                                  data-testid={`badge-48h-${prospect.id}`}
                                >
                                  <AlertTriangle className="w-3 h-3" />
                                  INACTIF {inactiveHours}H
                                </span>
                              )}
                            </div>

                            {/* Business & Contact Details */}
                            <div>
                              <h4 className="text-sm font-bold text-white leading-snug">
                                {prospect.business_name}
                              </h4>
                              <p className="text-xs text-slate-400">
                                {prospect.contact_name} • {prospect.phone}
                              </p>
                              {prospect.website_url && (
                                <a
                                  href={prospect.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-mono text-[#D4AF37] hover:underline inline-flex items-center gap-1 mt-0.5"
                                >
                                  {prospect.website_url.replace(
                                    /^https?:\/\//,
                                    "",
                                  )}
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>

                            {/* Audit Score Pill if audited */}
                            {audit && (
                              <div className="p-2 rounded-lg bg-[#0F172A] border border-white/5 flex items-center justify-between text-[11px]">
                                <span className="text-slate-400">
                                  Score Audit 5 Piliers :
                                </span>
                                <span
                                  className={`font-mono font-bold ${
                                    audit.overall_score < 50
                                      ? "text-rose-400"
                                      : "text-[#10B981]"
                                  }`}
                                >
                                  {audit.overall_score}/100
                                </span>
                              </div>
                            )}

                            {/* CLOSING POWER TOOLS: 1-CLICK WHATSAPP, 1-CLICK LOVABLE PROMPT, DEVIS */}
                            <div className="grid grid-cols-3 gap-1.5 pt-1">
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  awardXp(
                                    "call",
                                    `Relance WhatsApp ${prospect.business_name}`,
                                  )
                                }
                                data-testid={`wa-relance-${prospect.id}`}
                                className="py-1.5 px-2 rounded-lg bg-[#10B981]/15 hover:bg-[#10B981] text-[#10B981] hover:text-[#080B10] border border-[#10B981]/40 text-[10px] font-bold flex items-center justify-center gap-1 transition"
                                title="Relance WhatsApp en 1 clic avec script personnalisé"
                              >
                                <MessageSquare className="w-3 h-3" />
                                WhatsApp
                              </a>

                              <button
                                type="button"
                                onClick={() => {
                                  setLovableModalProspect(prospect);
                                  playXpChime();
                                }}
                                data-testid={`lovable-prompt-btn-${prospect.id}`}
                                className="py-1.5 px-2 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#080B10] border border-[#D4AF37]/40 text-[10px] font-bold flex items-center justify-center gap-1 transition"
                                title="Générer le prompt d'architecture Lovable en 1 clic"
                              >
                                <Code2 className="w-3 h-3" />
                                Lovable
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setQuoteTargetProspect(prospect);
                                  setActiveTab("QUOTE_STUDIO");
                                }}
                                className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 text-[10px] font-bold flex items-center justify-center gap-1 transition"
                                title="Éditer un devis officiel standardisé"
                              >
                                <FileText className="w-3 h-3" />
                                Devis
                              </button>
                            </div>

                            {/* Status Selector / Instant Move to "Signé / Gagné" */}
                            <div className="pt-1 border-t border-white/5 flex items-center justify-between gap-1.5">
                              <select
                                value={prospect.status}
                                onChange={(e) =>
                                  updateProspectStatus(
                                    prospect.id,
                                    e.target.value as ProspectStatus,
                                  )
                                }
                                aria-label={`Statut de ${prospect.business_name}`}
                                className="flex-1 px-2 py-1 rounded bg-[#0F172A] border border-white/10 text-[10px] text-slate-300"
                              >
                                {KANBAN_COLUMNS.map((c) => (
                                  <option key={c.status} value={c.status}>
                                    {c.title}
                                  </option>
                                ))}
                              </select>

                              {prospect.status !== "client" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateProspectStatus(prospect.id, "client")
                                  }
                                  data-testid={`win-deal-btn-${prospect.id}`}
                                  className="px-2 py-1 rounded bg-[#10B981] text-[#080B10] font-mono font-bold text-[10px] hover:bg-[#14d496] transition"
                                  title="Passer en Signé / Gagné (Confettis Or & Émeraude + Son Triomphal + 1000 XP)"
                                >
                                  🏆 Gagner
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: OFFICIAL STANDARDIZED QUOTE GENERATOR */}
        {activeTab === "QUOTE_STUDIO" && (
          <OfficialQuoteGenerator
            initialClientName={
              quoteTargetProspect?.business_name || "Clinique Esthétique Vendôme"
            }
            initialContactName={
              quoteTargetProspect?.contact_name || "Dr. Laurent Moreau"
            }
            initialAdvisorId={quoteTargetProspect?.owner_id || activeAdvisorId}
            onQuoteSigned={() => {
              if (quoteTargetProspect) {
                updateProspectStatus(quoteTargetProspect.id, "client");
              } else {
                awardXp("deal_closed", "Signature électronique Devis Officiel");
              }
            }}
          />
        )}

        {/* TAB 3: DIRECTION DASHBOARD (MONTHLY CA, MRR, 7-ADVISOR LEADERBOARD & ALERTS) */}
        {activeTab === "DIRECTION_BOARD" && (
          <div
            className="space-y-6"
            data-testid="direction-dashboard-view"
          >
            {/* Top Executive Financial Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#D4AF37]/40">
                <div className="text-xs font-mono uppercase text-[#D4AF37]">
                  CA Mensuel Signé (7 Commerciaux)
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-2">
                  {totalMonthlyCa.toLocaleString("fr-FR")} € HT
                </div>
                <div className="text-xs text-[#10B981] flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +28.4% vs mois précédent
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#10B981]/40">
                <div className="text-xs font-mono uppercase text-[#10B981]">
                  MRR Récurrent Actif (WebCare & SEO)
                </div>
                <div className="text-3xl font-mono font-bold text-[#10B981] mt-2">
                  {totalRecurringMrr.toLocaleString("fr-FR")} € /mois
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Piloté par Julie (WebCare) & Hugo (SEO)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/10">
                <div className="text-xs font-mono uppercase text-slate-400">
                  Taux de Closing Global
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-2">
                  41.8 %
                </div>
                <div className="text-xs text-[#D4AF37] mt-1">
                  Délai moyen de signature : 4,2 jours
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F172A] border border-rose-500/40">
                <div className="text-xs font-mono uppercase text-rose-400">
                  Alertes Prioritaires SLA &gt; 48h
                </div>
                <div className="text-3xl font-mono font-bold text-rose-400 mt-2">
                  {inactiveLeads.length} Dossiers
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Relance WhatsApp requise aujourd'hui
                </div>
              </div>
            </div>

            {/* Leaderboard of the 7 Advisors */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                    CLASSEMENT OFFICIEL DE L'ÉQUIPE COMMERCIALE
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Leaderboard RPG des 7 Commerciaux XR Agency
                  </h3>
                </div>
                <Users className="w-6 h-6 text-[#D4AF37]" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono uppercase">
                      <th className="py-3 px-3">#</th>
                      <th className="py-3 px-3">Commercial</th>
                      <th className="py-3 px-3">Spécialité & Attribution</th>
                      <th className="py-3 px-3">Rang RPG</th>
                      <th className="py-3 px-3">XP Cumulés</th>
                      <th className="py-3 px-3">CA Mensuel</th>
                      <th className="py-3 px-3">MRR Géré</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sortedLeaderboard.map((adv, index) => {
                      const xp = advisorXpMap[adv.id] ?? adv.xp;
                      const rank = getRankForXp(xp);
                      return (
                        <tr
                          key={adv.id}
                          className="hover:bg-white/5 transition"
                        >
                          <td className="py-3.5 px-3 font-mono font-bold text-[#D4AF37]">
                            #{index + 1}
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={adv.portraitUrl}
                                alt={adv.fullName}
                                className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]/50"
                                style={{ filter: adv.studioFilter }}
                              />
                              <div>
                                <div className="font-bold text-white text-sm">
                                  {adv.firstName}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {adv.role}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-slate-300">
                            {adv.specialtyShort}
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#080B10] border"
                              style={{
                                color: rank.badgeColor,
                                borderColor: rank.badgeColor,
                              }}
                            >
                              {rank.title}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-mono font-bold text-[#D4AF37]">
                            {xp.toLocaleString("fr-FR")} XP
                          </td>
                          <td className="py-3.5 px-3 font-mono font-bold text-white">
                            {adv.monthlyRevenueGenerated.toLocaleString("fr-FR")}{" "}
                            €
                          </td>
                          <td className="py-3.5 px-3 font-mono font-bold text-[#10B981]">
                            {adv.mrrManaged > 0
                              ? `${adv.mrrManaged.toLocaleString("fr-FR")} €/m`
                              : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUPABASE BACKWARD-COMPATIBILITY INSPECTOR ('prospects' & 'audits') */}
        {activeTab === "SUPABASE_SCHEMA" && (
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#10B981]">
                  RÉTROCOMPATIBILITÉ ABSOLUE SUPABASE
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Tables `prospects` (`owner_id`, `website_url`, `business_name`, `contact_name`, `phone`, `status`) & `audits`
                </h3>
              </div>
              <Link
                to="/dashboard/prospects"
                className="px-3 py-2 rounded-xl bg-[#080B10] border border-white/15 text-xs text-[#D4AF37] hover:border-[#D4AF37] flex items-center gap-1.5"
              >
                Vue tabulaire classique <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[#D4AF37]">
                    <th className="py-2.5 px-3">owner_id</th>
                    <th className="py-2.5 px-3">business_name</th>
                    <th className="py-2.5 px-3">contact_name</th>
                    <th className="py-2.5 px-3">phone</th>
                    <th className="py-2.5 px-3">website_url</th>
                    <th className="py-2.5 px-3">status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {prospects.map((p) => (
                    <tr key={p.id}>
                      <td className="py-2.5 px-3 text-[#D4AF37]">{p.owner_id}</td>
                      <td className="py-2.5 px-3 font-bold text-white">
                        {p.business_name}
                      </td>
                      <td className="py-2.5 px-3">{p.contact_name}</td>
                      <td className="py-2.5 px-3">{p.phone}</td>
                      <td className="py-2.5 px-3 text-sky-400">
                        {p.website_url}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[#10B981]">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 1-CLICK LOVABLE PROMPT GENERATOR MODAL */}
      {lovableModalProspect && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          data-testid="lovable-prompt-modal"
        >
          <div className="max-w-2xl w-full rounded-2xl bg-[#0F172A] border-2 border-[#D4AF37] p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                  GÉNÉRATEUR DE PROMPT LOVABLE EN 1 CLIC
                </span>
                <h3 className="text-lg font-bold text-white">
                  Architecture & Maquette pour {lovableModalProspect.business_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLovableModalProspect(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Fermer ✕
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#080B10] border border-white/10 text-xs font-mono text-slate-200 whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed">
              {generateLovableArchitecturePrompt(
                lovableModalProspect,
                getLatestAuditForProspect(lovableModalProspect.id),
              )}
            </pre>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const promptText = generateLovableArchitecturePrompt(
                    lovableModalProspect,
                    getLatestAuditForProspect(lovableModalProspect.id),
                  );
                  navigator.clipboard?.writeText(promptText);
                  setCopiedLovable(true);
                  awardXp(
                    "audit",
                    `Prompt Lovable généré (${lovableModalProspect.business_name})`,
                  );
                  setTimeout(() => setCopiedLovable(false), 2500);
                }}
                data-testid="copy-lovable-prompt-btn"
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#080B10] font-bold text-xs flex items-center gap-2 hover:bg-[#e3be42]"
              >
                {copiedLovable ? (
                  <>
                    <Check className="w-4 h-4" /> Prompt Copié (+150 XP) !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copier le Prompt Lovable
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 3: FLOATING JARVIS VOICE & COMMAND CENTER HUD */}
      <JarvisCommandHUD
        prospects={prospects}
        onGenerateLovable={(p) => setLovableModalProspect(p)}
      />
    </div>
  );
}
export default RpgDashboardCommandCenter;
