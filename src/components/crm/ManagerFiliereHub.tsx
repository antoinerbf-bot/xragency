import { useState, useEffect, useMemo } from "react";
import {
  Users,
  UserPlus,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Trash2,
  GraduationCap,
  Calendar,
  Flame,
  Trophy,
  Target,
  TrendingUp,
  Instagram,
  Share2,
  Clock,
  DollarSign,
  Megaphone,
  Zap,
  BarChart3,
  Plus,
  ExternalLink,
  Lock,
  AlertTriangle,
  Play,
} from "lucide-react";
import type { Lead, TeamMember, UserRoleType } from "@/lib/crm/data";
import { computeDealCommissions, getLeadTotals, formatPricePeriod } from "@/lib/crm/data";
import type { CrmThemeTokens } from "@/lib/crm/theme";

interface Candidate {
  id: string;
  name: string;
  phone: string;
  targetRole: UserRoleType;
  stage: "identified" | "interview" | "training" | "active";
  notes: string;
  createdAt: string;
}

interface SocialPost {
  id: string;
  title: string;
  platform: "instagram" | "tiktok" | "linkedin" | "youtube" | "x";
  format: "reel" | "carousel" | "story" | "post" | "case_study";
  scheduledDate: string; // YYYY-MM-DD
  status: "idea" | "in_production" | "ready" | "published";
  hookOrNotes?: string;
  leadsGenerated?: number;
}

interface ManagerFiliereHubProps {
  managerId: string;
  members: TeamMember[];
  visibleLeads: Lead[];
  allLeads?: Lead[];
  theme: CrmThemeTokens;
  onPromoteCandidate: (name: string, roleType: UserRoleType, managerId: string) => void;
  onSound?: () => void;
}

type TabType = "dashboard" | "social" | "team" | "recruitment";

export function ManagerFiliereHub({
  managerId,
  members,
  visibleLeads,
  allLeads = [],
  theme,
  onPromoteCandidate,
  onSound,
}: ManagerFiliereHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // ── 1. Pipeline Recrutement Candidats ──
  const candidateStorageKey = `xr_rh_candidates_${managerId}`;
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(candidateStorageKey);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [candName, setCandName] = useState("");
  const [candPhone, setCandPhone] = useState("");
  const [candTargetRole, setCandTargetRole] = useState<UserRoleType>("student");
  const [candNotes, setCandNotes] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(candidateStorageKey, JSON.stringify(candidates));
    }
  }, [candidates, candidateStorageKey]);

  // ── 2. Calendrier Éditorial Réseaux Sociaux ──
  const socialStorageKey = `xr_martin_social_posts_${managerId}`;
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(socialStorageKey);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: "post-1",
        title: "Démonstration du Robot Korben en restaurant de luxe",
        platform: "instagram",
        format: "reel",
        scheduledDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10),
        status: "ready",
        hookOrNotes: "Hook : 'Ce restaurateur parisien a remplacé ses allers-retours en salle par un robot autonome...'",
        leadsGenerated: 2,
      },
      {
        id: "post-2",
        title: "Avant / Après refonte Site Web & Google Maps Top 3",
        platform: "tiktok",
        format: "reel",
        scheduledDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        status: "in_production",
        hookOrNotes: "Comparaison visuelle du site lent vs site XR Agency livré en 24h chrono.",
        leadsGenerated: 1,
      },
      {
        id: "post-3",
        title: "Pourquoi 87% des commerces locaux perdent des clients sur Google Maps",
        platform: "linkedin",
        format: "carousel",
        scheduledDate: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        status: "idea",
        hookOrNotes: "Carrousel B2B 5 slides avec checklist d'optimisation fiche GBP.",
        leadsGenerated: 0,
      },
    ];
  });

  const [showAddPost, setShowAddPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostPlatform, setNewPostPlatform] = useState<SocialPost["platform"]>("instagram");
  const [newPostFormat, setNewPostFormat] = useState<SocialPost["format"]>("reel");
  const [newPostDate, setNewPostDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [newPostNotes, setNewPostNotes] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(socialStorageKey, JSON.stringify(socialPosts));
    }
  }, [socialPosts, socialStorageKey]);

  // ── 3. Simulateur de Gains Interactif ──
  const [simDirectSales, setSimDirectSales] = useState(6000);
  const [simTeamOneShotSales, setSimTeamOneShotSales] = useState(12000);
  const [simTeamMonthlySales, setSimTeamMonthlySales] = useState(6000);
  const [simTeamAnnualSales, setSimTeamAnnualSales] = useState(3000);
  const [simSocialSales, setSimSocialSales] = useState(4000);

  // ── Données Équipe & Ventes Réelles ──
  const myTeam = members.filter((m) => m.recruitedBy === managerId);
  const leadsPool = allLeads.length > 0 ? allLeads : visibleLeads;

  // A. Ventes Directes de Martin (Closer = Martin)
  const myDirectWonDeals = useMemo(
    () => leadsPool.filter((l) => l.stage === "won" && l.closerId === managerId),
    [leadsPool, managerId]
  );
  const myDirectRevenue = useMemo(
    () => myDirectWonDeals.reduce((sum, l) => sum + getLeadTotals(l).commissionBase, 0),
    [myDirectWonDeals]
  );
  // Martin prend 30% sur ses ventes directes
  const myDirectCommissions = Math.round(myDirectRevenue * 0.30);

  // B. Défi Personnel : 20 000 € avant le 01 Mars 2027 (maintien du statut commercial)
  const TARGET_DIRECT_SALES = 20000;
  const DIRECT_DEADLINE_DATE = new Date("2027-03-01T00:00:00");
  const now = new Date();
  const daysLeftUntilDirectDeadline = Math.max(0, Math.ceil((DIRECT_DEADLINE_DATE.getTime() - now.getTime()) / (1000 * 3600 * 24)));
  const directSalesProgressPct = Math.min(100, Math.round((myDirectRevenue / TARGET_DIRECT_SALES) * 100));

  // C. Ventes de l'Équipe Commerciale (Override)
  const teamWonDeals = useMemo(
    () => leadsPool.filter((l) => l.stage === "won" && myTeam.some((m) => m.id === l.closerId || m.id === l.setterId)),
    [leadsPool, myTeam]
  );

  // Découpage de l'équipe : Sites One-Shot vs Abonnements Mensuels vs Annuels
  const teamOneShotDeals = useMemo(
    () => teamWonDeals.filter((l) => l.billing === "once" || l.serviceId === "websites"),
    [teamWonDeals]
  );
  const teamMonthlyDeals = useMemo(
    () => teamWonDeals.filter((l) => l.billing === "month"),
    [teamWonDeals]
  );
  const teamAnnualDeals = useMemo(
    () => teamWonDeals.filter((l) => l.billing === "year"),
    [teamWonDeals]
  );

  const teamOneShotRevenue = useMemo(
    () => teamOneShotDeals.reduce((sum, l) => sum + getLeadTotals(l).commissionBase, 0),
    [teamOneShotDeals]
  );
  const teamMonthlyRevenue = useMemo(
    () => teamMonthlyDeals.reduce((sum, l) => sum + getLeadTotals(l).commissionBase, 0),
    [teamMonthlyDeals]
  );
  const teamAnnualRevenue = useMemo(
    () => teamAnnualDeals.reduce((sum, l) => sum + getLeadTotals(l).commissionBase, 0),
    [teamAnnualDeals]
  );
  const teamRevenue = teamOneShotRevenue + teamMonthlyRevenue + teamAnnualRevenue;

  // D. Défi Booster Équipe : 20 000 € de CA d'équipe avant le 01 Février 2027
  // Si atteint : Martin passe de 5% à 10% sur TOUS les abonnements mensuels de son équipe !
  const TARGET_TEAM_SALES = 20000;
  const TEAM_DEADLINE_DATE = new Date("2027-02-01T00:00:00");
  const daysLeftUntilTeamDeadline = Math.max(0, Math.ceil((TEAM_DEADLINE_DATE.getTime() - now.getTime()) / (1000 * 3600 * 24)));
  const teamSalesProgressPct = Math.min(100, Math.round((teamRevenue / TARGET_TEAM_SALES) * 100));
  const isTeamBoostUnlocked = teamRevenue >= TARGET_TEAM_SALES;

  // Taux de commissions de Martin sur son équipe :
  // - Sites one-shot : 10% systématique
  // - Abonnements mensuels : 5% de base ➔ 10% si équipe >= 20k€ avant le 01/02/2027
  // - Abonnements annuels : 5%
  const currentTeamMonthlyRate = isTeamBoostUnlocked ? 0.10 : 0.05;
  const teamOneShotCommissions = Math.round(teamOneShotRevenue * 0.10);
  const teamMonthlyCommissions = Math.round(teamMonthlyRevenue * currentTeamMonthlyRate);
  const teamAnnualCommissions = Math.round(teamAnnualRevenue * 0.05);
  const teamOverrideCommissions = teamOneShotCommissions + teamMonthlyCommissions + teamAnnualCommissions;

  // E. Attribution Réseaux Sociaux (10% sur tout deal closé venant des réseaux)
  const socialWonDeals = useMemo(
    () =>
      leadsPool.filter((l) => {
        if (l.stage !== "won") return false;
        const src = (l.source || "").toLowerCase();
        return (
          src.includes("social") ||
          src.includes("réseau") ||
          src.includes("instagram") ||
          src.includes("tiktok") ||
          src.includes("linkedin") ||
          src.includes("youtube")
        );
      }),
    [leadsPool]
  );
  const socialRevenue = useMemo(
    () => socialWonDeals.reduce((sum, l) => sum + getLeadTotals(l).commissionBase, 0),
    [socialWonDeals]
  );
  // Martin prend 10% sur tous les deals réseaux sociaux
  const socialCommissions = Math.round(socialRevenue * 0.10);

  // Grand Total Réel des Gains de Martin
  const grandTotalCommissions = myDirectCommissions + teamOverrideCommissions + socialCommissions;

  // Calcul du simulateur interactif
  const simTeamTotalSales = simTeamOneShotSales + simTeamMonthlySales + simTeamAnnualSales;
  const simIsTeamBoostUnlocked = simTeamTotalSales >= TARGET_TEAM_SALES;
  const simTeamMonthlyRate = simIsTeamBoostUnlocked ? 0.10 : 0.05;

  const simDirectEarned = Math.round(simDirectSales * 0.30);
  const simTeamOneShotEarned = Math.round(simTeamOneShotSales * 0.10);
  const simTeamMonthlyEarned = Math.round(simTeamMonthlySales * simTeamMonthlyRate);
  const simTeamAnnualEarned = Math.round(simTeamAnnualSales * 0.05);
  const simTeamEarned = simTeamOneShotEarned + simTeamMonthlyEarned + simTeamAnnualEarned;
  const simSocialEarned = Math.round(simSocialSales * 0.10);
  const simTotalMonthly = simDirectEarned + simTeamEarned + simSocialEarned;

  // Handlers Recrutement
  const addCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName.trim()) return;
    setCandidates([
      {
        id: `cand-${Date.now()}`,
        name: candName.trim(),
        phone: candPhone.trim(),
        targetRole: candTargetRole,
        stage: "identified",
        notes: candNotes.trim(),
        createdAt: new Date().toLocaleDateString("fr-FR"),
      },
      ...candidates,
    ]);
    setCandName("");
    setCandPhone("");
    setCandNotes("");
    onSound?.();
  };

  const advanceCandidate = (c: Candidate) => {
    const order: Candidate["stage"][] = ["identified", "interview", "training", "active"];
    const nextIdx = Math.min(order.length - 1, order.indexOf(c.stage) + 1);
    const nextStage = order[nextIdx];
    setCandidates((prev) => prev.map((x) => (x.id === c.id ? { ...x, stage: nextStage } : x)));
    if (nextStage === "active") {
      onPromoteCandidate(c.name, c.targetRole, managerId);
    }
    onSound?.();
  };

  // Handlers Réseaux Sociaux
  const addSocialPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;
    setSocialPosts([
      {
        id: `post-${Date.now()}`,
        title: newPostTitle.trim(),
        platform: newPostPlatform,
        format: newPostFormat,
        scheduledDate: newPostDate,
        status: "ready",
        hookOrNotes: newPostNotes.trim(),
        leadsGenerated: 0,
      },
      ...socialPosts,
    ]);
    setNewPostTitle("");
    setNewPostNotes("");
    setShowAddPost(false);
    onSound?.();
  };

  const cyclePostStatus = (postId: string) => {
    const statuses: SocialPost["status"][] = ["idea", "in_production", "ready", "published"];
    setSocialPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const curIdx = statuses.indexOf(p.status);
        const nextStatus = statuses[(curIdx + 1) % statuses.length];
        return { ...p, status: nextStatus };
      })
    );
  };

  return (
    <div className="mt-6 space-y-6 text-left">
      {/* ── EN-TÊTE PRESTIGE MANAGER & HEAD OF SOCIAL ── */}
      <div className={`p-6 rounded-3xl border ${theme.card} flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-lg`}>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25 shrink-0 text-2xl">
            👔
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className={`text-xl font-extrabold tracking-tight ${theme.textMain}`}>
                QG Martin · Manager RH, Commercial & Head of Social
              </h2>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm">
                3 Piliers de Gains
              </span>
            </div>
            <p className={`text-xs mt-1 ${theme.textMuted}`}>
              Ventes Directes (30%), Override Équipe Commerciale (5% ➔ 10% booster) & Attribution Réseaux Sociaux (10% par deal).
            </p>
          </div>
        </div>

        {/* Total Commissions Cumulées */}
        <div className="flex flex-wrap items-center gap-3">
          <div className={`px-4 py-2.5 rounded-2xl border ${theme.subCard} text-right`}>
            <p className="text-[10px] font-extrabold uppercase text-indigo-500 dark:text-indigo-400">Total Commissions Générées</p>
            <p className="text-xl font-black font-mono text-emerald-500">
              {grandTotalCommissions.toLocaleString("fr-FR")} €
            </p>
          </div>
        </div>
      </div>

      {/* ── BANNIÈRES GAMIFIÉES : LES 2 DÉFIS MAJEURS DE MARTIN (PERSO & ÉQUIPE) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Défi 1 : Ventes Directes Perso (Deadline 01/03/2027) */}
        <div className="relative overflow-hidden p-5 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-zinc-900 shadow-xl flex flex-col justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-black font-black text-[10px] flex items-center gap-1 shadow-sm">
                <Target className="w-3.5 h-3.5" /> DÉFI PERSO DIRECT
              </span>
              <span className="text-[11px] font-mono font-bold text-amber-400">
                Deadline : 01 Mars 2027
              </span>
            </div>
            <h3 className={`text-sm sm:text-base font-black ${theme.textMain}`}>
              Objectif Perso : 20 000 € de CA Direct (30 % ➔ 20 %)
            </h3>
            <p className={`text-[11px] leading-relaxed ${theme.textMuted}`}>
              Vous profitez de <strong>30 % direct</strong> sur vos ventes personnelles. Atteignez <strong>20 000 € de CA personnel</strong> avant le 1er mars 2027 pour rester dans l'équipe commerciale à 20% pérenne. Sinon, vous basculerez exclusivement sur vos fonctions RH & Réseaux Sociaux.
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-zinc-800">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-emerald-400">
                {myDirectRevenue.toLocaleString("fr-FR")} € faits ({myDirectCommissions.toLocaleString("fr-FR")} € à 30%)
              </span>
              <span className="text-amber-400">{daysLeftUntilDirectDeadline}j restants · {directSalesProgressPct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden p-0.5 border border-zinc-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${directSalesProgressPct}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Défi 2 : Booster Équipe Mensuelle (Deadline 01/02/2027) */}
        <div className={`relative overflow-hidden p-5 rounded-3xl border shadow-xl flex flex-col justify-between gap-3 ${
          isTeamBoostUnlocked
            ? "border-emerald-500/50 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-zinc-900"
            : "border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-zinc-900"
        }`}>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className={`px-2.5 py-1 rounded-xl text-white font-black text-[10px] flex items-center gap-1 shadow-sm ${
                isTeamBoostUnlocked ? "bg-emerald-500" : "bg-indigo-600"
              }`}>
                <Flame className="w-3.5 h-3.5" /> DÉFI BOOSTER ÉQUIPE
              </span>
              <span className="text-[11px] font-mono font-bold text-indigo-400">
                Deadline : 01 Février 2027
              </span>
            </div>
            <h3 className={`text-sm sm:text-base font-black ${theme.textMain}`}>
              Défi Équipe 20 000 € : Débloquez 10 % sur le Mensuel Récurrent !
            </h3>
            <p className={`text-[11px] leading-relaxed ${theme.textMuted}`}>
              Sur les sites de votre équipe, vous prenez <strong>10 % direct</strong>. Sur le récurrent (WebCare, SEO, Social), vous prenez <strong>5 %</strong>. Si votre équipe génère <strong>20 000 € de CA avant le 01/02/2027</strong>, votre commission mensuelle <strong>double à 10 %</strong> !
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-zinc-800">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className={isTeamBoostUnlocked ? "text-emerald-400 font-black" : "text-indigo-400"}>
                {teamRevenue.toLocaleString("fr-FR")} € / 20 000 € {isTeamBoostUnlocked ? "🔥 DÉBLOQUÉ (10% ACTIF)" : "(Taux 5%)"}
              </span>
              <span className="text-zinc-400">{daysLeftUntilTeamDeadline}j restants · {teamSalesProgressPct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden p-0.5 border border-zinc-700">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isTeamBoostUnlocked
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/50"
                    : "bg-gradient-to-r from-indigo-500 to-blue-500"
                }`}
                style={{ width: `${teamSalesProgressPct}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION PAR ONGLETS DU HUB MARTIN ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === "dashboard"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : `${theme.subCard} ${theme.textMuted} hover:text-indigo-500`
          }`}
        >
          <BarChart3 className="w-4 h-4" /> 1. Commissions & Simulateur
        </button>

        <button
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === "social"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : `${theme.subCard} ${theme.textMuted} hover:text-indigo-500`
          }`}
        >
          <Instagram className="w-4 h-4 text-pink-500" /> 2. Calendrier Réseaux Sociaux & Leads (10%)
          {socialWonDeals.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-500 text-white font-black">
              {socialWonDeals.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("team")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === "team"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : `${theme.subCard} ${theme.textMuted} hover:text-indigo-500`
          }`}
        >
          <Users className="w-4 h-4" /> 3. Équipe Commerciale ({myTeam.length}) & Override
        </button>

        <button
          onClick={() => setActiveTab("recruitment")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === "recruitment"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : `${theme.subCard} ${theme.textMuted} hover:text-indigo-500`
          }`}
        >
          <UserPlus className="w-4 h-4" /> 4. Recrutement Candidats RH ({candidates.length})
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          ONGLET 1 : COMMISSIONS, 3 PILIERS & SIMULATEUR DE GAINS
      ═══════════════════════════════════════════════════════════ */}
      {activeTab === "dashboard" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Les 3 Piliers de Gains */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pilier 1 : Ventes Directes */}
            <div className={`p-5 rounded-3xl border ${theme.card} space-y-3 relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  <Zap className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  30 % Direct
                </span>
              </div>
              <div>
                <h4 className={`text-xs font-extrabold uppercase tracking-wider ${theme.textSoft}`}>
                  Pilier 1 : Ventes Directes Perso
                </h4>
                <p className="text-2xl font-black font-mono text-amber-500 mt-1">
                  {myDirectCommissions.toLocaleString("fr-FR")} €
                </p>
                <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>
                  Sur {myDirectRevenue.toLocaleString("fr-FR")} € de CA closé par vous-même ({myDirectWonDeals.length} signature{myDirectWonDeals.length > 1 ? "s" : ""}).
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400">
                Passe à 20% pérenne dès que le palier 20k€ est franchi avant le 01/03/2027.
              </div>
            </div>

            {/* Pilier 2 : Override Équipe Commerciale */}
            <div className={`p-5 rounded-3xl border ${theme.card} space-y-3 relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
                  <Users className="w-5 h-5" />
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                    isTeamBoostUnlocked
                      ? "bg-emerald-500 text-white border-emerald-400 animate-pulse"
                      : "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30"
                  }`}
                >
                  {isTeamBoostUnlocked ? "🔥 10 % MENSUEL BOOSTÉ" : "Sites 10% · Mensuel 5%"}
                </span>
              </div>
              <div>
                <h4 className={`text-xs font-extrabold uppercase tracking-wider ${theme.textSoft}`}>
                  Pilier 2 : Override Équipe Commerciale
                </h4>
                <p className="text-2xl font-black font-mono text-indigo-500 mt-1">
                  {teamOverrideCommissions.toLocaleString("fr-FR")} €
                </p>
                <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>
                  Sur {teamRevenue.toLocaleString("fr-FR")} € de CA total généré par vos {myTeam.length} commerciaux.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px] space-y-1 text-zinc-400">
                <div className="flex justify-between">
                  <span>Sites & One-Shot (10%) :</span>
                  <strong className="text-indigo-400 font-mono">+{teamOneShotCommissions} €</strong>
                </div>
                <div className="flex justify-between">
                  <span>Abonnements Mensuels ({currentTeamMonthlyRate * 100}%) :</span>
                  <strong className="text-emerald-400 font-mono">+{teamMonthlyCommissions} €</strong>
                </div>
                <div className="flex justify-between">
                  <span>Forfaits Annuels (5%) :</span>
                  <strong className="text-amber-400 font-mono">+{teamAnnualCommissions} €</strong>
                </div>
              </div>
            </div>

            {/* Pilier 3 : Attribution Réseaux Sociaux */}
            <div className={`p-5 rounded-3xl border ${theme.card} space-y-3 relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-pink-500/15 text-pink-500 border border-pink-500/30">
                  <Instagram className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-pink-500/20 text-pink-600 dark:text-pink-400 border border-pink-500/30">
                  10 % par deal Social
                </span>
              </div>
              <div>
                <h4 className={`text-xs font-extrabold uppercase tracking-wider ${theme.textSoft}`}>
                  Pilier 3 : Gestion Réseaux Sociaux
                </h4>
                <p className="text-2xl font-black font-mono text-pink-500 mt-1">
                  {socialCommissions.toLocaleString("fr-FR")} €
                </p>
                <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>
                  Sur {socialRevenue.toLocaleString("fr-FR")} € de CA issu de vos réseaux ({socialWonDeals.length} deal{socialWonDeals.length > 1 ? "s" : ""}).
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400">
                Vous touchez 10% sur chaque deal closé issu des réseaux, peu importe le closer !
              </div>
            </div>
          </div>

          {/* Grille de Cohérence Économique : Sites vs Mensuels vs Annuels */}
          <div className={`p-6 rounded-3xl border ${theme.card} space-y-4`}>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/15 text-indigo-500">
                <BarChart3 className="w-5 h-5" />
              </span>
              <div>
                <h3 className={`text-sm font-extrabold ${theme.textMain}`}>
                  Barème Officiel & Répartition des Marges (Commerciaux vs Martin vs Agence)
                </h3>
                <p className={`text-xs ${theme.textMuted}`}>
                  Structure validée par Antoine Rebuffé-Rousseau garantissant une marge saine pour l'agence et une motivation maximale pour Martin.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
              <div className={`p-4 rounded-2xl border ${theme.subCard} space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-500">🌐 Sites Web & One-Shot</span>
                  <span className="text-[10px] font-bold text-zinc-400">Ex: 499 € à 2 000 €+</span>
                </div>
                <ul className="text-xs space-y-1.5 text-zinc-600 dark:text-zinc-300">
                  <li className="flex justify-between">
                    <span>Commercial (Closer) :</span>
                    <strong className="text-emerald-500 font-mono">20 %</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Martin (Override Manager) :</span>
                    <strong className="text-indigo-500 font-mono">10 % direct</strong>
                  </li>
                  <li className="flex justify-between border-t pt-1 border-zinc-200 dark:border-zinc-700">
                    <span>Agence KARMA SASU :</span>
                    <strong className="text-zinc-400 font-mono">70 % marge</strong>
                  </li>
                </ul>
              </div>

              <div className={`p-4 rounded-2xl border ${theme.subCard} space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-500">🛡️ Mensuels MRR (WebCare, SEO, Social)</span>
                  <span className="text-[10px] font-bold text-zinc-400">Ex: 29 € à 699 €/m</span>
                </div>
                <ul className="text-xs space-y-1.5 text-zinc-600 dark:text-zinc-300">
                  <li className="flex justify-between">
                    <span>Commercial (Closer) :</span>
                    <strong className="text-emerald-500 font-mono">10 % / mois</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Martin (Override Mensuel) :</span>
                    <strong className="text-indigo-500 font-mono">
                      {isTeamBoostUnlocked ? "🔥 10 % (Boost Actif)" : "5 % ➔ 10 % Boost"}
                    </strong>
                  </li>
                  <li className="flex justify-between border-t pt-1 border-zinc-200 dark:border-zinc-700">
                    <span>Agence KARMA SASU :</span>
                    <strong className="text-zinc-400 font-mono">80 % à 85 % marge</strong>
                  </li>
                </ul>
                <p className="text-[10px] text-zinc-400 pt-1">
                  ⚡ Si l'équipe dépasse 20 000 € de CA avant le 01/02/2027, Martin passe à 10% sur le mensuel !
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${theme.subCard} space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-500">📍 Google Maps Top 3 (Annuel)</span>
                  <span className="text-[10px] font-bold text-zinc-400">Dès 999 € / an</span>
                </div>
                <ul className="text-xs space-y-1.5 text-zinc-600 dark:text-zinc-300">
                  <li className="flex justify-between">
                    <span>Commercial (Closer) :</span>
                    <strong className="text-emerald-500 font-mono">10 % annuel</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Martin (Override Manager) :</span>
                    <strong className="text-indigo-500 font-mono">5 % annuel</strong>
                  </li>
                  <li className="flex justify-between border-t pt-1 border-zinc-200 dark:border-zinc-700">
                    <span>Agence KARMA SASU :</span>
                    <strong className="text-zinc-400 font-mono">85 % marge</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* SIMULATEUR DE GAINS INTERACTIF POUR MARTIN */}
          <div className={`p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-zinc-900 space-y-5 shadow-xl`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-500 text-white">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className={`text-base font-extrabold ${theme.textMain}`}>
                    Simulateur de Revenus Mensuels pour Martin
                  </h3>
                  <p className={`text-xs ${theme.textMuted}`}>
                    Ajustez vos volumes prévisionnels pour visualiser vos gains mensuels cumulés.
                  </p>
                </div>
              </div>

              <div className="text-right bg-black/40 p-3.5 rounded-2xl border border-indigo-500/30">
                <p className="text-[10px] font-bold uppercase text-zinc-400">Revenu Mensuel Estimé</p>
                <p className="text-2xl font-black font-mono text-emerald-400">
                  {simTotalMonthly.toLocaleString("fr-FR")} € / mois
                </p>
                <div className="text-[10px] font-mono mt-0.5">
                  {simIsTeamBoostUnlocked ? (
                    <span className="text-emerald-400 font-bold">🔥 Boost Équipe 20k€ Actif (Mensuel à 10%)</span>
                  ) : (
                    <span className="text-amber-400 font-bold">
                      ⚡ Équipe : {simTeamTotalSales.toLocaleString("fr-FR")} € / 20k€ (Mensuel à 5%)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* Curseur 1 : Ventes Directes */}
              <div className="space-y-1.5 p-3 rounded-2xl border border-zinc-800 bg-zinc-900/60">
                <div className="flex justify-between text-xs font-bold">
                  <span>Ventes Directes (30%) :</span>
                  <span className="font-mono text-amber-500">{simDirectSales.toLocaleString("fr-FR")} €</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={25000}
                  step={500}
                  value={simDirectSales}
                  onChange={(e) => setSimDirectSales(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <p className="text-[10px] text-zinc-400">Gain direct : <strong>+{simDirectEarned} €</strong></p>
              </div>

              {/* Curseur 2 : Sites One-Shot Équipe */}
              <div className="space-y-1.5 p-3 rounded-2xl border border-zinc-800 bg-zinc-900/60">
                <div className="flex justify-between text-xs font-bold">
                  <span>Sites Équipe (10%) :</span>
                  <span className="font-mono text-indigo-400">{simTeamOneShotSales.toLocaleString("fr-FR")} €</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30000}
                  step={500}
                  value={simTeamOneShotSales}
                  onChange={(e) => setSimTeamOneShotSales(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <p className="text-[10px] text-zinc-400">Override 10% : <strong>+{simTeamOneShotEarned} €</strong></p>
              </div>

              {/* Curseur 3 : Abonnements Mensuels Équipe */}
              <div className="space-y-1.5 p-3 rounded-2xl border border-zinc-800 bg-zinc-900/60">
                <div className="flex justify-between text-xs font-bold">
                  <span>Mensuel MRR Équipe ({simTeamMonthlyRate * 100}%) :</span>
                  <span className="font-mono text-emerald-400">{simTeamMonthlySales.toLocaleString("fr-FR")} €</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20000}
                  step={500}
                  value={simTeamMonthlySales}
                  onChange={(e) => setSimTeamMonthlySales(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <p className="text-[10px] text-zinc-400">
                  Rente {simTeamMonthlyRate * 100}% : <strong>+{simTeamMonthlyEarned} €/m</strong>
                </p>
              </div>

              {/* Curseur 4 : Deals Réseaux Sociaux */}
              <div className="space-y-1.5 p-3 rounded-2xl border border-zinc-800 bg-zinc-900/60">
                <div className="flex justify-between text-xs font-bold">
                  <span>Réseaux Sociaux (10%) :</span>
                  <span className="font-mono text-pink-500">{simSocialSales.toLocaleString("fr-FR")} €</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15000}
                  step={500}
                  value={simSocialSales}
                  onChange={(e) => setSimSocialSales(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
                <p className="text-[10px] text-zinc-400">Gain Social : <strong>+{simSocialEarned} €</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          ONGLET 2 : CALENDRIER RÉSEAUX SOCIAUX & LEADS ORGANICS
      ═══════════════════════════════════════════════════════════ */}
      {activeTab === "social" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Social Media */}
          <div className={`p-6 rounded-3xl border ${theme.card} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-pink-500/15 text-pink-500">
                  <Instagram className="w-5 h-5" />
                </span>
                <h3 className={`text-base font-extrabold ${theme.textMain}`}>
                  Gestionnaire Réseaux Sociaux XR Agency (Instagram, TikTok, LinkedIn, YouTube)
                </h3>
              </div>
              <p className={`text-xs mt-1 ${theme.textMuted}`}>
                Planifiez le calendrier éditorial. Vous touchez <strong>10 % de commission sur le CA</strong> de chaque prospect entrant converti !
              </p>
            </div>

            <button
              onClick={() => setShowAddPost(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/25 shrink-0"
            >
              <Plus className="w-4 h-4" /> Programmer un Post
            </button>
          </div>

          {/* Formulaire d'ajout de post */}
          {showAddPost && (
            <form onSubmit={addSocialPost} className={`p-5 rounded-3xl border space-y-4 ${theme.subCard}`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider ${theme.textMain}`}>Nouveau Post à Programmer</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Titre / Sujet du post *"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg} sm:col-span-2`}
                />
                <select
                  value={newPostPlatform}
                  onChange={(e) => setNewPostPlatform(e.target.value as SocialPost["platform"])}
                  className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
                >
                  <option value="instagram">📸 Instagram</option>
                  <option value="tiktok">🎵 TikTok</option>
                  <option value="linkedin">💼 LinkedIn</option>
                  <option value="youtube">▶️ YouTube Shorts</option>
                  <option value="x">🐦 X (Twitter)</option>
                </select>
                <select
                  value={newPostFormat}
                  onChange={(e) => setNewPostFormat(e.target.value as SocialPost["format"])}
                  className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
                >
                  <option value="reel">🎬 Reel / Vidéo courte</option>
                  <option value="carousel">📊 Carrousel éducatif</option>
                  <option value="story">📱 Story coulisses</option>
                  <option value="post">📝 Post éditorial</option>
                  <option value="case_study">🏆 Étude de cas client</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="date"
                  value={newPostDate}
                  onChange={(e) => setNewPostDate(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
                />
                <input
                  type="text"
                  placeholder="Accroche / Hook ou notes..."
                  value={newPostNotes}
                  onChange={(e) => setNewPostNotes(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddPost(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold ${theme.textMuted}`}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs shadow-md"
                >
                  Ajouter au calendrier
                </button>
              </div>
            </form>
          )}

          {/* Liste des publications programmées */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialPosts.map((post) => {
              const statusBadges = {
                idea: { label: "💡 Idée", cls: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30" },
                in_production: { label: "🎬 En tournage", cls: "bg-amber-500/15 text-amber-500 border-amber-500/30" },
                ready: { label: "✨ Prêt / Programmé", cls: "bg-blue-500/15 text-blue-500 border-blue-500/30" },
                published: { label: "🚀 Publié en ligne", cls: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" },
              };
              const platformIcons = {
                instagram: "📸 Instagram",
                tiktok: "🎵 TikTok",
                linkedin: "💼 LinkedIn",
                youtube: "▶️ YouTube",
                x: "🐦 X",
              };

              return (
                <div key={post.id} className={`p-4 rounded-3xl border ${theme.card} space-y-3 shadow-sm`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/25">
                      {platformIcons[post.platform]}
                    </span>
                    <button
                      onClick={() => cyclePostStatus(post.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${statusBadges[post.status].cls}`}
                      title="Cliquer pour changer d'état"
                    >
                      {statusBadges[post.status].label}
                    </button>
                  </div>

                  <div>
                    <h4 className={`text-xs font-extrabold leading-snug ${theme.textMain}`}>{post.title}</h4>
                    {post.hookOrNotes && (
                      <p className={`text-[10px] mt-1 line-clamp-2 italic ${theme.textMuted}`}>
                        "{post.hookOrNotes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px]">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="w-3 h-3" /> {post.scheduledDate}
                    </span>
                    <span className="font-bold text-emerald-500 font-mono">
                      {post.leadsGenerated || 0} lead(s) obtenu(s)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deals closés issus des réseaux sociaux */}
          <div className={`p-6 rounded-3xl border ${theme.card} space-y-3`}>
            <h4 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
              <DollarSign className="w-4 h-4 text-emerald-500" />
              Deals Closés issus des Réseaux Sociaux (10% reversés à Martin)
            </h4>
            {socialWonDeals.length === 0 ? (
              <p className={`text-xs ${theme.textMuted}`}>
                Aucun deal social closé pour l'instant. Dès qu'un prospect ayant pour source "Instagram", "TikTok", "LinkedIn" ou "Réseaux Sociaux" est marqué gagné, votre commission de 10% apparaît ici en direct !
              </p>
            ) : (
              <div className="space-y-2">
                {socialWonDeals.map((lead) => {
                  const totals = getLeadTotals(lead);
                  const commissionMartin = Math.round(totals.commissionBase * 0.10);
                  const closer = members.find((m) => m.id === lead.closerId);
                  return (
                    <div
                      key={lead.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${theme.subCard}`}
                    >
                      <div>
                        <p className={`text-xs font-extrabold ${theme.textMain}`}>
                          {lead.name} — CA : {totals.commissionBase.toLocaleString("fr-FR")} € ({lead.planLabel})
                        </p>
                        <p className={`text-[10px] ${theme.textMuted}`}>
                          Source : <strong className="text-pink-500">{lead.source || "Réseaux Sociaux"}</strong> · Closer : {closer?.shortName || "XR Agency"}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/30 text-xs font-mono font-black shrink-0">
                        +{commissionMartin.toLocaleString("fr-FR")} € (10%)
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          ONGLET 3 : ÉQUIPE COMMERCIALE & OVERRIDE
      ═══════════════════════════════════════════════════════════ */}
      {activeTab === "team" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 rounded-3xl border ${theme.card} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
            <div>
              <h3 className={`text-base font-extrabold ${theme.textMain}`}>
                Radar Coaching & Activité de l'Équipe ({myTeam.length} commerciaux rattachés)
              </h3>
              <p className={`text-xs mt-1 ${theme.textMuted}`}>
                Barème d'override : <strong>10 % sur les sites & one-shot</strong>, <strong>{currentTeamMonthlyRate * 100} % sur les abonnements mensuels</strong>, et <strong>5 % sur les forfaits annuels</strong>.
                {isTeamBoostUnlocked ? (
                  <span className="text-emerald-500 font-bold ml-1">🔥 Défi 20k€ équipe atteint : Mensuel doublé à 10% !</span>
                ) : (
                  <span className="text-indigo-500 font-bold ml-1">Défi équipe 20k€ avant le 01/02/2027 pour doubler le mensuel à 10% !</span>
                )}
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-right">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">Total Override Équipe</span>
              <p className="text-xl font-black font-mono text-indigo-500">{teamOverrideCommissions.toLocaleString("fr-FR")} €</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {myTeam.map((m) => {
              const memberLeads = leadsPool.filter((l) => l.closerId === m.id || l.setterId === m.id);
              const activeCount = memberLeads.filter((l) => l.stage !== "won").length;
              const mockupCount = memberLeads.filter((l) => l.stage === "mockup").length;
              const wonCount = memberLeads.filter((l) => l.stage === "won").length;
              const wonTotal = memberLeads
                .filter((l) => l.stage === "won")
                .reduce((s, l) => s + getLeadTotals(l).commissionBase, 0);
              const overrideFromMember = memberLeads
                .filter((l) => l.stage === "won")
                .reduce((s, l) => {
                  const base = getLeadTotals(l).commissionBase;
                  const isOneShot = l.billing === "once" || l.serviceId === "websites";
                  const isMonthly = l.billing === "month";
                  const rate = isOneShot ? 0.10 : isMonthly ? currentTeamMonthlyRate : 0.05;
                  return s + Math.round(base * rate);
                }, 0);
              const needsCoaching = activeCount === 0 && wonCount === 0;

              return (
                <div key={m.id} className={`p-4 rounded-3xl border space-y-3 ${theme.subCard} shadow-sm`}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${m.avatarBg} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md`}
                    >
                      {m.avatarChar || m.shortName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-extrabold truncate ${theme.textMain}`}>{m.name}</p>
                      <p className={`text-[10px] truncate ${theme.textMuted}`}>{m.roleLabel}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className={`p-1.5 rounded-xl border ${theme.card}`}>
                      <p className={`text-[9px] ${theme.textSoft}`}>Actifs</p>
                      <p className={`text-xs font-black font-mono ${theme.textMain}`}>{activeCount}</p>
                    </div>
                    <div className={`p-1.5 rounded-xl border ${theme.card}`}>
                      <p className={`text-[9px] ${theme.textSoft}`}>Maquettes</p>
                      <p className="text-xs font-black text-amber-500 font-mono">{mockupCount}</p>
                    </div>
                    <div className={`p-1.5 rounded-xl border ${theme.card}`}>
                      <p className={`text-[9px] ${theme.textSoft}`}>Ventes</p>
                      <p className="text-xs font-black text-emerald-500 font-mono">{wonCount}</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-zinc-400">Override rapporté :</span>
                    <strong className="text-indigo-500 font-mono">+{overrideFromMember} €</strong>
                  </div>

                  <div className="pt-1">
                    {needsCoaching ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 w-full justify-center">
                        <GraduationCap className="w-3 h-3" /> À relancer / coacher
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 w-full justify-center">
                        <CheckCircle2 className="w-3 h-3" /> En dynamique 🔥
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          ONGLET 4 : PIPELINE RECRUTEMENT CANDIDATS RH
      ═══════════════════════════════════════════════════════════ */}
      {activeTab === "recruitment" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 rounded-3xl border ${theme.card} space-y-4`}>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/15 text-amber-500">
                <UserPlus className="w-5 h-5" />
              </span>
              <div>
                <h3 className={`text-base font-extrabold ${theme.textMain}`}>
                  Pipeline Recrutement & Intégration RH
                </h3>
                <p className={`text-xs ${theme.textMuted}`}>
                  Ajoutez vos candidats, suivez leur parcours de formation XR School et activez-les en 1 clic dans votre filière.
                </p>
              </div>
            </div>

            <form onSubmit={addCandidate} className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              <input
                type="text"
                required
                value={candName}
                onChange={(e) => setCandName(e.target.value)}
                placeholder="Nom du candidat *"
                className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              />
              <input
                type="text"
                value={candPhone}
                onChange={(e) => setCandPhone(e.target.value)}
                placeholder="Téléphone"
                className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              />
              <select
                value={candTargetRole}
                onChange={(e) => setCandTargetRole(e.target.value as UserRoleType)}
                className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              >
                <option value="student">🎓 Élève XR School</option>
                <option value="setter">📞 Setter B2B</option>
                <option value="closer">🎯 Closer B2B</option>
                <option value="full_cycle">⚡ Commercial Full-Cycle</option>
              </select>
              <input
                type="text"
                value={candNotes}
                onChange={(e) => setCandNotes(e.target.value)}
                placeholder="Notes entretien..."
                className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs rounded-xl px-4 py-2 shadow-sm"
              >
                + Ajouter Candidat
              </button>
            </form>

            {candidates.length === 0 ? (
              <p className={`text-xs italic py-6 text-center ${theme.textSoft}`}>
                Aucun candidat en cours. Ajoutez vos futurs commerciaux ici pour suivre leur intégration jusqu'à l'activation en 1 clic.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {(
                  [
                    { key: "identified", label: "1. Identifié" },
                    { key: "interview", label: "2. Entretien" },
                    { key: "training", label: "3. Formation School" },
                    { key: "active", label: "4. Intégré CRM ✓" },
                  ] as const
                ).map((col) => (
                  <div key={col.key} className={`p-3.5 rounded-2xl border space-y-2.5 min-h-[160px] ${theme.subCard}`}>
                    <p className={`text-xs font-extrabold ${theme.textMain}`}>{col.label}</p>
                    {candidates
                      .filter((c) => c.stage === col.key)
                      .map((c) => (
                        <div key={c.id} className={`p-3 rounded-2xl border space-y-2 ${theme.card} shadow-sm`}>
                          <div className="flex items-center justify-between gap-1">
                            <p className={`text-xs font-extrabold truncate ${theme.textMain}`}>{c.name}</p>
                            <button
                              onClick={() => setCandidates((prev) => prev.filter((x) => x.id !== c.id))}
                              className="text-slate-400 hover:text-rose-500"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          {c.phone && <p className={`text-[10px] ${theme.textMuted}`}>{c.phone}</p>}
                          {c.notes && <p className={`text-[10px] ${theme.textMuted}`}>{c.notes}</p>}
                          {c.stage !== "active" && (
                            <button
                              onClick={() => advanceCandidate(c)}
                              className="w-full mt-1 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm"
                            >
                              {c.stage === "training" ? "Activer dans ma filière ✓" : "Étape suivante"}
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
