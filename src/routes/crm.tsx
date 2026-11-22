import { useState, useMemo, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { jsPDF } from "jspdf";
import {
  Phone,
  MessageSquare,
  Sparkles,
  Trophy,
  CheckCircle2,
  Plus,
  Search,
  ChevronDown,
  ShieldCheck,
  FileText,
  AlertCircle,
  Download,
  Volume2,
  VolumeX,
  LogOut,
  Palette,
  Flame,
  Lock,
  GraduationCap,
  ArrowLeft,
  KeyRound,
  Wallet,
  Calendar,
  Pencil,
  Trash2,
  UserPlus,
  Globe,
  Zap,
  CreditCard,
  Activity,
  Database,
  Command,
} from "lucide-react";

import {
  DEFAULT_TEAM_MEMBERS,
  XR_OFFICIAL_SERVICES,
  canViewLead,
  canViewMemberFinances,
  computeDealCommissions,
  formatPricePeriod,
  type Lead,
  type LeadStage,
  type TeamMember,
  type UserRoleType,
} from "@/lib/crm/data";
import { CRM_THEMES, type CrmThemeId } from "@/lib/crm/theme";
import {
  checkSupabaseStatus,
  fetchLeadsFromSupabase,
  upsertLeadToSupabase,
  deleteLeadFromSupabase,
  upsertMemberToSupabase,
  subscribeCrmRealtime,
} from "@/lib/crm/supabaseSync";
import { BUSINESS_SECTORS, getSectorServicePlaybook } from "@/lib/crm/schoolScripts";
import { SchoolModule } from "@/components/crm/SchoolModule";
import { ContestLeaderboard } from "@/components/crm/ContestLeaderboard";
import { DirectorPersonalHub } from "@/components/crm/DirectorPersonalHub";
import { ManagerFiliereHub } from "@/components/crm/ManagerFiliereHub";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM XR Agency — Espace Commercial, Direction & XR School" },
      { name: "description", content: "Système d'exploitation commercial ludique, XR School et production XR Agency." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: XrAgencyCrmApp,
});

// ── Synthétiseur audio natif léger (Web Audio API) ──

function playTone(freq: number, type: OscillatorType, duration: number, delay = 0) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0.11, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch {
    // audio indisponible
  }
}

function playDing() {
  playTone(587.33, "sine", 0.2);
  playTone(880, "sine", 0.32, 0.06);
}

function playFanfare() {
  playTone(523.25, "triangle", 0.14, 0);
  playTone(659.25, "triangle", 0.14, 0.11);
  playTone(783.99, "triangle", 0.18, 0.22);
  playTone(1046.5, "triangle", 0.48, 0.34);
}

type CrmTab = "kanban" | "cockpit" | "contest" | "school" | "finances" | "studio" | "rh" | "qg";

interface QuickAuditResult {
  score: number;
  url: string;
  title?: string;
  recommendations?: { service: string; reason: string }[];
  error?: string;
}

function XrAgencyCrmApp() {
  // ── Thème coloré ludique (🌈 Pop Coloré par défaut !) ──
  const [themeId, setThemeId] = useState<CrmThemeId>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("xr_crm_theme_v4") as CrmThemeId | null;
      if (saved && CRM_THEMES[saved]) return saved;
    }
    return "pop";
  });
  const theme = CRM_THEMES[themeId];

  // ── Équipe dynamique persistée ──
  const [members, setMembers] = useState<TeamMember[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_crm_members_v4");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return DEFAULT_TEAM_MEMBERS;
  });

  // ── Session utilisateur & Accès XR School (1234) ──
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    if (typeof window !== "undefined") return localStorage.getItem("xr_crm_user_v3") || null;
    return null;
  });

  const currentUser = useMemo(
    () => members.find((m) => m.id === currentUserId) || null,
    [members, currentUserId]
  );

  const [schoolGuestMode, setSchoolGuestMode] = useState(false);
  const [pendingMember, setPendingMember] = useState<TeamMember | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [schoolPinModal, setSchoolPinModal] = useState(false);
  const [schoolPinInput, setSchoolPinInput] = useState("");
  const [schoolPinError, setSchoolPinError] = useState("");

  // ── Données CRM (Zéro client fictif par défaut !) + Supabase Realtime ──
  const [leads, setLeads] = useState<Lead[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_crm_leads_v3");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [weeklyChallenge, setWeeklyChallenge] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("xr_weekly_challenge") || "Objectif Semaine : +50 XP bonus sur chaque Pack Site + WebCare !";
    }
    return "Objectif Semaine : +50 XP bonus sur chaque Pack Site + WebCare !";
  });

  const syncStatus = checkSupabaseStatus();

  const [activeTab, setActiveTab] = useState<CrmTab>("kanban");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLeadForCockpit, setActiveLeadForCockpit] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [openObjIdx, setOpenObjIdx] = useState<number | null>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastWonLead, setLastWonLead] = useState<Lead | null>(null);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<LeadStage | null>(null);

  // Command Palette Ctrl+K
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");

  // Audit Express dans le Cockpit (/api/audit)
  const [auditUrlInput, setAuditUrlInput] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<QuickAuditResult | null>(null);

  // Paiement Stripe Checkout (/api/create-checkout)
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  // Mode Sprint 25m & Quête Appels
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintSeconds, setSprintSeconds] = useState(25 * 60);
  const [dailyCalls, setDailyCalls] = useState(() => {
    if (typeof window !== "undefined") return Number(localStorage.getItem("xr_daily_calls_v3") || "0");
    return 0;
  });

  // Modal Ajout Express Prospect (5s) + Anti-Doublon
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState("");
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formWebsite, setFormWebsite] = useState("");
  const [formFollowUp, setFormFollowUp] = useState("");
  const [formSectorId, setFormSectorId] = useState(BUSINESS_SECTORS[0].id);
  const [formServiceId, setFormServiceId] = useState(XR_OFFICIAL_SERVICES[0].id);
  const [formPlanId, setFormPlanId] = useState(
    XR_OFFICIAL_SERVICES[0].plans[1]?.id || XR_OFFICIAL_SERVICES[0].plans[0].id
  );
  const [formValue, setFormValue] = useState(XR_OFFICIAL_SERVICES[0].defaultPrice);
  const [formSetterId, setFormSetterId] = useState("");
  const [formCloserId, setFormCloserId] = useState("");
  const [formIssue, setFormIssue] = useState("");

  // Modal Ajout Membre
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<UserRoleType>("closer");
  const [newMemberSettingPct, setNewMemberSettingPct] = useState(10);
  const [newMemberClosingPct, setNewMemberClosingPct] = useState(20);
  const [newMemberFullPct, setNewMemberFullPct] = useState(20);
  const [newMemberPin, setNewMemberPin] = useState("1234");
  const [newMemberRecruitedBy, setNewMemberRecruitedBy] = useState("");

  // Modal Changement Mot de Passe personnel
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [newPinValue, setNewPinValue] = useState("");
  const [confirmPinValue, setConfirmPinValue] = useState("");
  const [changePinError, setChangePinError] = useState("");

  // ── Persistance & Supabase Realtime ──
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("xr_crm_theme_v4", themeId);
  }, [themeId]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("xr_crm_leads_v3", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("xr_crm_members_v4", JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentUserId) localStorage.setItem("xr_crm_user_v3", currentUserId);
      else localStorage.removeItem("xr_crm_user_v3");
    }
  }, [currentUserId]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("xr_weekly_challenge", weeklyChallenge);
  }, [weeklyChallenge]);

  // Synchronisation initiale & temps réel Supabase si configuré
  useEffect(() => {
    let active = true;
    fetchLeadsFromSupabase().then((remote) => {
      if (active && remote && remote.length > 0) setLeads(remote);
    });
    const unsub = subscribeCrmRealtime(() => {
      fetchLeadsFromSupabase().then((remote) => {
        if (active && remote) setLeads(remote);
      });
    });
    return () => {
      active = false;
      unsub?.();
    };
  }, []);

  // Raccourci Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCmdPalette((prev) => !prev);
        setCmdQuery("");
      }
      if (e.key === "Escape") setShowCmdPalette(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.roleType === "studio") setActiveTab("studio");
    else if (currentUser.roleType === "student") setActiveTab("school");
    else setActiveTab("kanban");
  }, [currentUser?.id]);

  useEffect(() => {
    if (!sprintActive || sprintSeconds <= 0) return;
    const id = setInterval(() => {
      setSprintSeconds((prev) => {
        if (prev <= 1) {
          setSprintActive(false);
          if (soundEnabled) playFanfare();
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [sprintActive, sprintSeconds, soundEnabled]);

  // ── Filtrage RBAC strict ──
  const myVisibleLeads = useMemo(() => {
    if (!currentUser) return [];
    return leads.filter((l) => canViewLead(currentUser, l, members));
  }, [leads, currentUser, members]);

  const filteredLeads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return myVisibleLeads;
    return myVisibleLeads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.contact.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q)
    );
  }, [myVisibleLeads, searchQuery]);

  const todayIso = new Date().toISOString().slice(0, 10);
  const dueFollowUpsCount = useMemo(
    () =>
      myVisibleLeads.filter(
        (l) => l.stage !== "won" && l.followUpDate && l.followUpDate <= todayIso
      ).length,
    [myVisibleLeads, todayIso]
  );

  // ── Calcul Gamification / XP / Niveau personnel adapté au rôle ──
  const gameHud = useMemo(() => {
    if (!currentUser) return { xp: 0, level: 1, progress: 0, questLabel: "", energyPct: 100 };
    const myWon = myVisibleLeads.filter((l) => l.stage === "won").length;
    const myMockups = myVisibleLeads.filter((l) => l.stage === "mockup").length;
    const myRdv = myVisibleLeads.filter((l) => l.stage === "rdv" || l.stage === "negociation").length;
    const xp = myWon * 100 + myMockups * 25 + myRdv * 15 + dailyCalls * 5;
    const level = Math.floor(xp / 150) + 1;
    const progress = Math.round(((xp % 150) / 150) * 100);
    const energyPct = Math.min(100, Math.round((dailyCalls / 10) * 100));

    const questLabel =
      currentUser.roleType === "setter"
        ? `Quête Setter : ${dailyCalls}/10 appels · ${myRdv} RDV posé(s)`
        : currentUser.roleType === "closer"
        ? `Quête Closer : ${myMockups} maquette(s) · ${myWon} signature(s)`
        : currentUser.roleType === "student"
        ? `Quête Académie : ${dailyCalls}/5 appels · Entraînez-vous au Dojo`
        : currentUser.roleType === "manager"
        ? `Quête Manager : Piloter votre filière · ${myWon} vente(s) suivie(s)`
        : `Quête Direction : ${myMockups} maquette(s) · ${myWon} vente(s) conclue(s)`;

    return { xp, level, progress, questLabel, energyPct };
  }, [currentUser, myVisibleLeads, dailyCalls]);

  // ── Calcul Finances & Commissions RBAC ──
  const financeView = useMemo(() => {
    if (!currentUser) {
      return {
        cashWon: 0,
        mrrWon: 0,
        pipelineValue: 0,
        myCommissionUnlocked: 0,
        myCommissionPending: 0,
        visibleMemberRows: [],
      };
    }

    const wonVisible = myVisibleLeads.filter((l) => l.stage === "won");
    const cashWon = wonVisible.filter((l) => l.billing !== "month").reduce((s, l) => s + l.value, 0);
    const mrrWon = wonVisible.filter((l) => l.billing === "month").reduce((s, l) => s + l.value, 0);
    const pipelineValue = myVisibleLeads.filter((l) => l.stage !== "won").reduce((s, l) => s + l.value, 0);

    const visibleMembers = members.filter(
      (m) => m.roleType !== "studio" && canViewMemberFinances(currentUser, m)
    );

    const visibleMemberRows = visibleMembers.map((member) => {
      let ownSalesOneShot = 0;
      let ownSalesMrr = 0;
      let unlockedCom = 0;
      let pendingCom = 0;

      leads
        .filter((l) => l.stage === "won")
        .forEach((deal) => {
          const b = computeDealCommissions(deal, members);
          let earnedOnDeal = 0;
          if (deal.closerId === member.id) {
            earnedOnDeal += b.closerAmount;
            if (deal.billing === "month") ownSalesMrr += deal.value;
            else ownSalesOneShot += deal.value;
          }
          if (deal.setterId === member.id && deal.setterId !== deal.closerId) {
            earnedOnDeal += b.setterAmount;
          }
          if (b.managerId === member.id) {
            earnedOnDeal += b.managerOverrideAmount;
          }
          if (earnedOnDeal > 0) {
            if (deal.commissionStatus === "unlocked") unlockedCom += earnedOnDeal;
            else pendingCom += earnedOnDeal;
          }
        });

      return { member, ownSalesOneShot, ownSalesMrr, unlockedCom, pendingCom };
    });

    const myRow = visibleMemberRows.find((r) => r.member.id === currentUser.id);
    return {
      cashWon,
      mrrWon,
      pipelineValue,
      myCommissionUnlocked: myRow?.unlockedCom ?? 0,
      myCommissionPending: myRow?.pendingCom ?? 0,
      visibleMemberRows,
    };
  }, [currentUser, leads, myVisibleLeads, members]);

  // ── Actions ──

  const appendTimeline = (leadId: string, text: string) => {
    const entry = {
      id: `tl-${Date.now()}`,
      date: new Date().toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }),
      text,
    };
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l;
        const updated = { ...l, timeline: [entry, ...(l.timeline || [])] };
        void upsertLeadToSupabase(updated);
        return updated;
      })
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingMember) return;
    if (pinInput.trim() === pendingMember.pin) {
      setCurrentUserId(pendingMember.id);
      setPendingMember(null);
      setPinInput("");
      setPinError("");
      if (soundEnabled) playDing();
    } else {
      setPinError("Code incorrect. Veuillez réessayer.");
    }
  };

  const handleSchoolPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolPinInput.trim() === "1234") {
      setSchoolGuestMode(true);
      setSchoolPinModal(false);
      setSchoolPinInput("");
      setSchoolPinError("");
      if (soundEnabled) playDing();
    } else {
      setSchoolPinError("Mot de passe XR School incorrect (Code : 1234).");
    }
  };

  const moveStage = (leadId: string, newStage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId || l.stage === newStage) return l;
        const entry = {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          text: `Déplacé vers l'étape : ${newStage}`,
        };
        if (newStage === "won") {
          setLastWonLead(l);
          setShowCelebration(true);
          if (soundEnabled) playFanfare();
          setTimeout(() => setShowCelebration(false), 5000);
          const updated: Lead = {
            ...l,
            stage: newStage,
            commissionStatus: "pending_payment",
            studioStatus: "pending",
            timeline: [entry, ...(l.timeline || [])],
          };
          void upsertLeadToSupabase(updated);
          return updated;
        }
        if (soundEnabled) playDing();
        const updated: Lead = { ...l, stage: newStage, timeline: [entry, ...(l.timeline || [])] };
        void upsertLeadToSupabase(updated);
        return updated;
      })
    );
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !currentUser) return;

    // Anti-doublon inter-commerciaux (sur téléphone normalisé)
    const normalizedPhone = formPhone.replace(/[^0-9]/g, "");
    if (normalizedPhone.length >= 8) {
      const exists = leads.some((l) => l.phone.replace(/[^0-9]/g, "") === normalizedPhone);
      if (exists) {
        setDuplicateWarning("⚠️ Ce numéro est déjà suivi en interne par un membre de l'équipe (anti-doublon activé).");
        return;
      }
    }

    const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === formServiceId) || XR_OFFICIAL_SERVICES[0];
    const plan = svc.plans.find((p) => p.id === formPlanId) || svc.plans[0];

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: formName.trim(),
      contact: formContact.trim() || "Direction",
      phone: formPhone.trim(),
      websiteUrl: formWebsite.trim() || undefined,
      followUpDate: formFollowUp || undefined,
      sectorId: formSectorId,
      serviceId: svc.id,
      planLabel: plan.label,
      billing: plan.period,
      value: Number(formValue) || plan.price,
      stage: "new",
      setterId: formSetterId || currentUser.id,
      closerId: formCloserId || currentUser.id,
      issue: formIssue.trim() || "Diagnostic & modernisation digitale XR Agency",
      notes: "",
      createdAt: new Date().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      commissionStatus: "estimated",
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          text: `Prospect créé par ${currentUser.shortName}`,
        },
      ],
    };

    setLeads([newLead, ...leads]);
    void upsertLeadToSupabase(newLead);
    if (soundEnabled) playDing();
    setDuplicateWarning("");
    setFormName("");
    setFormContact("");
    setFormPhone("");
    setFormWebsite("");
    setFormFollowUp("");
    setFormIssue("");
    setShowNewLeadModal(false);
  };

  // Audit Express dans le Cockpit (connecté au vrai POST /api/audit)
  const handleRunExpressAudit = async (targetLead: Lead) => {
    const rawUrl = (auditUrlInput || targetLead.websiteUrl || "").trim();
    if (!rawUrl) return;
    setAuditLoading(true);
    setAuditResult(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: rawUrl,
          types: ["design", "seo", "conversion", "security", "technical"],
          sector: targetLead.sectorId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuditResult({ score: 0, url: rawUrl, error: data.error || "Impossible d'auditer ce site." });
      } else {
        setAuditResult({
          score: data.score ?? 65,
          url: rawUrl,
          title: data.title,
          recommendations: data.recommendations || [],
        });
        appendTimeline(targetLead.id, `Audit Express effectué (${rawUrl}) : Score ${data.score}/100`);
        if (soundEnabled) playDing();
      }
    } catch {
      setAuditResult({ score: 0, url: rawUrl, error: "Erreur réseau lors de l'audit." });
    } finally {
      setAuditLoading(false);
    }
  };

  // Lien Paiement Stripe Acompte 50% (/api/create-checkout)
  const handleGenerateStripeLink = async (lead: Lead) => {
    setCheckoutLoading(true);
    setCheckoutMessage(null);
    try {
      const depositEur = lead.billing === "month" ? lead.value : Math.round(lead.value * 0.5);
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: `${lead.planLabel} — ${lead.name}`,
          amountEur: depositEur,
          customerEmail: lead.email || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        await navigator.clipboard.writeText(data.url);
        setCheckoutMessage(`✅ Lien Stripe (${depositEur} €) copié dans le presse-papiers !`);
        appendTimeline(lead.id, `Lien de paiement Stripe généré (${depositEur} €)`);
        if (soundEnabled) playDing();
      } else {
        setCheckoutMessage(`ℹ️ Stripe non configuré en local (${data.error || "clé Stripe requise sur serveur"}). Utilisez le Devis PDF.`);
      }
    } catch {
      setCheckoutMessage("ℹ️ Lien Stripe disponible dès que la clé Stripe est active en production.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleSaveEditedLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    setLeads((prev) => prev.map((l) => (l.id === editingLead.id ? editingLead : l)));
    void upsertLeadToSupabase(editingLead);
    if (activeLeadForCockpit?.id === editingLead.id) setActiveLeadForCockpit(editingLead);
    setEditingLead(null);
    if (soundEnabled) playDing();
  };

  const handleDeleteLead = (leadId: string) => {
    if (!confirm("Supprimer définitivement ce prospect ?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    void deleteLeadFromSupabase(leadId);
    if (editingLead?.id === leadId) setEditingLead(null);
    if (activeLeadForCockpit?.id === leadId) setActiveLeadForCockpit(null);
  };

  const handleUnlockCommission = (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l;
        const updated: Lead = { ...l, commissionStatus: "unlocked" };
        void upsertLeadToSupabase(updated);
        return updated;
      })
    );
    if (soundEnabled) playFanfare();
  };

  const handlePromoteCandidate = (candName: string, roleType: UserRoleType, managerId: string) => {
    const short = candName.trim().split(" ")[0];
    const id = `${short.toLowerCase().replace(/[^a-z0-9]/g, "")}-${Date.now().toString().slice(-3)}`;
    const newMem: TeamMember = {
      id,
      name: candName.trim(),
      shortName: short,
      roleLabel: roleType === "student" ? "Élève XR School · Commercial" : "Commercial B2B",
      roleType,
      recruitedBy: managerId,
      settingRate: 0.1,
      closingRate: 0.15,
      fullCycleRate: 0.2,
      avatarBg: "from-violet-500 to-fuchsia-600",
      badge: roleType === "student" ? "🎓 Élève XR School" : "🎯 Commercial",
      pin: String(Math.floor(1000 + Math.random() * 9000)),
    };
    setMembers((prev) => [...prev, newMem]);
    void upsertMemberToSupabase(newMem);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !currentUser) return;
    const short = newMemberName.trim().split(" ")[0];
    const id = `${short.toLowerCase().replace(/[^a-z0-9]/g, "")}-${Date.now().toString().slice(-3)}`;
    const roleMeta: Record<UserRoleType, { label: string; badge: string; bg: string }> = {
      setter: { label: "Setter B2B", badge: "📞 Setter", bg: "from-cyan-500 to-blue-600" },
      closer: { label: "Closer B2B", badge: "🎯 Closer", bg: "from-purple-500 to-violet-600" },
      full_cycle: { label: "Commercial Full-Cycle", badge: "⚡ Full-Cycle", bg: "from-emerald-500 to-teal-600" },
      student: { label: "Élève XR School · Commercial", badge: "🎓 Élève XR School", bg: "from-amber-500 to-orange-600" },
      manager: { label: "Manager Équipe", badge: "👥 Manager", bg: "from-blue-500 to-indigo-600" },
      studio: { label: "Studio Production", badge: "🎨 Studio", bg: "from-zinc-600 to-zinc-900" },
      direction: { label: "Direction", badge: "👑 Direction", bg: "from-amber-400 to-orange-600" },
    };
    const meta = roleMeta[newMemberRole];
    const created: TeamMember = {
      id,
      name: newMemberName.trim(),
      shortName: short,
      roleLabel: meta.label,
      roleType: newMemberRole,
      recruitedBy: currentUser.roleType === "manager" ? currentUser.id : newMemberRecruitedBy || undefined,
      settingRate: Math.max(0, Math.min(100, newMemberSettingPct)) / 100,
      closingRate: Math.max(0, Math.min(100, newMemberClosingPct)) / 100,
      fullCycleRate: Math.max(0, Math.min(100, newMemberFullPct)) / 100,
      avatarBg: meta.bg,
      badge: meta.badge,
      pin: newMemberPin.trim() || "1234",
    };
    setMembers([...members, created]);
    void upsertMemberToSupabase(created);
    setNewMemberName("");
    setShowAddMemberModal(false);
    if (soundEnabled) playDing();
  };

  const handleUpdateMemberRates = (
    memberId: string,
    field: "settingRate" | "closingRate" | "fullCycleRate",
    percentVal: number
  ) => {
    const clean = Math.max(0, Math.min(100, Number(percentVal) || 0)) / 100;
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;
        const updated = { ...m, [field]: clean };
        void upsertMemberToSupabase(updated);
        return updated;
      })
    );
  };

  const handleSaveOwnPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const clean = newPinValue.trim();
    if (clean.length < 4) {
      setChangePinError("Choisissez un code d'au moins 4 caractères.");
      return;
    }
    if (clean !== confirmPinValue.trim()) {
      setChangePinError("Les deux codes ne correspondent pas.");
      return;
    }
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== currentUser.id) return m;
        const updated = { ...m, pin: clean, customPinSet: true };
        void upsertMemberToSupabase(updated);
        return updated;
      })
    );
    setNewPinValue("");
    setConfirmPinValue("");
    setChangePinError("");
    setShowChangePinModal(false);
    if (soundEnabled) playDing();
  };

  const handleIncrementCall = () => {
    const next = dailyCalls + 1;
    setDailyCalls(next);
    if (typeof window !== "undefined") localStorage.setItem("xr_daily_calls_v3", String(next));
    if (soundEnabled) playDing();
  };

  const handleExportCsv = () => {
    const headers = "Entreprise;Contact;Telephone;Service;Formule;Valeur;Facturation;Etape;Relance;Date\n";
    const rows = myVisibleLeads
      .map(
        (l) =>
          `"${l.name}";"${l.contact}";"${l.phone}";"${l.serviceId}";"${l.planLabel}";"${l.value}";"${l.billing}";"${l.stage}";"${l.followUpDate || ""}";"${l.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `XR-AGENCY-MES-PROSPECTS-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const generatePdfQuote = (lead: Lead) => {
    const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === lead.serviceId) || XR_OFFICIAL_SERVICES[0];
    const closer = members.find((m) => m.id === lead.closerId);
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, M = 16, R = 194;
    const ink = [18, 22, 29] as const;
    const gold = [217, 153, 30] as const;
    const muted = [90, 98, 110] as const;
    const soft = [245, 246, 248] as const;
    const line = [225, 228, 233] as const;

    const dateStr = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const quoteNum = `XR-DEVIS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    doc.setFillColor(...ink);
    doc.rect(0, 0, W, 36, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("XR AGENCY", M, 16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(217, 180, 100);
    doc.text("STUDIO DIGITAL PREMIUM, IA & ROBOTIQUE", M, 24);

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("DEVIS OFFICIEL", R, 15, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(200, 205, 215);
    doc.text(`Réf : ${quoteNum}`, R, 22, { align: "right" });
    doc.text(`Date : ${dateStr} · Conseiller : ${closer?.shortName || "XR Agency"}`, R, 28, { align: "right" });

    let y = 48;
    doc.setFillColor(...soft);
    doc.roundedRect(M, y, W - 2 * M, 24, 2, 2, "F");
    doc.setDrawColor(...line);
    doc.roundedRect(M, y, W - 2 * M, 24, 2, 2, "S");
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("CLIENT", M + 5, y + 6);
    doc.setFontSize(11);
    doc.text(lead.name, M + 5, y + 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(`Contact : ${lead.contact} · Tél : ${lead.phone}`, M + 5, y + 19);

    y += 34;
    doc.setFillColor(...ink);
    doc.roundedRect(M, y, W - 2 * M, 9, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("PRESTATION", M + 5, y + 6);
    doc.text("FORMULE", 122, y + 6);
    doc.text("MONTANT", R - 5, y + 6, { align: "right" });

    y += 15;
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(svc.name, M + 5, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(lead.planLabel.slice(0, 28), 122, y);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(formatPricePeriod(lead.value, lead.billing), R - 5, y, { align: "right" });

    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    [`• Livrable : ${svc.deliverable}`, `• Besoin ciblé : ${lead.issue}`].forEach((txt) => {
      const split = doc.splitTextToSize(txt, W - 2 * M - 10);
      doc.text(split, M + 5, y);
      y += split.length * 4.5 + 1.5;
    });

    y += 12;
    doc.setDrawColor(...line);
    doc.line(M, y, R, y);
    y += 8;

    doc.setFillColor(...soft);
    doc.roundedRect(120, y, R - 120, 24, 2, 2, "F");
    doc.setTextColor(...gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("TOTAL NET :", 125, y + 14);
    doc.text(formatPricePeriod(lead.value, lead.billing), R - 5, y + 14, { align: "right" });

    doc.setDrawColor(...line);
    doc.line(M, 282, R, 282);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.text("KARMA SASU · XR AGENCY", M, 287);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · 78 Avenue des Champs-Élysées · 75008 Paris", M, 291);
    doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com", M, 295);

    doc.save(`DEVIS-XRAGENCY-${lead.name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
    appendTimeline(lead.id, "Devis PDF officiel téléchargé");
  };

  // Sélecteur de thème coloré réutilisable
  const ThemeSwitcherBar = (
    <div className={`inline-flex items-center p-1 rounded-2xl border gap-1 ${theme.tabBarBg}`}>
      {(Object.values(CRM_THEMES) as typeof CRM_THEMES[CrmThemeId][]).map((t) => (
        <button
          key={t.id}
          onClick={() => {
            setThemeId(t.id);
            if (soundEnabled) playDing();
          }}
          title={t.label}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
            themeId === t.id ? theme.tabActive : theme.tabIdle
          }`}
        >
          {t.emoji} <span className="hidden md:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // MODE ACCÈS LIBRE XR SCHOOL (1234 · FORMATION PURE)
  // ═══════════════════════════════════════════════════════════
  if (schoolGuestMode && !currentUser) {
    return (
      <div className={`min-h-screen font-sans transition-colors duration-300 ${theme.pageBg}`}>
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 py-5">
          <header className={`flex flex-wrap items-center justify-between gap-3 pb-5 border-b ${theme.border}`}>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 flex items-center justify-center font-black text-white text-base shadow-lg">
                XR
              </div>
              <div>
                <h1 className={`text-base font-extrabold ${theme.textMain}`}>XR SCHOOL · ESPACE FORMATION</h1>
                <p className={`text-[11px] ${theme.textMuted}`}>Formation pure · 70 Trames, Dojo & Quiz certifiant</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              {ThemeSwitcherBar}
              <button
                onClick={() => setSchoolGuestMode(false)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold ${theme.card} ${theme.textMain}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Connexion
              </button>
            </div>
          </header>

          <SchoolModule currentUser={null} theme={theme} onSound={() => soundEnabled && playDing()} />
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // ÉCRAN DE CONNEXION COLORÉ, LUDIQUE & CHARMANT
  // ═══════════════════════════════════════════════════════════
  if (!currentUser) {
    return (
      <div className={`min-h-screen flex flex-col justify-center items-center px-4 py-10 relative overflow-hidden transition-colors duration-300 ${theme.pageBg}`}>
        {/* Sélecteur de thème flottant en haut à droite */}
        <div className="fixed top-4 right-4 z-20">{ThemeSwitcherBar}</div>

        <div className="max-w-4xl w-full relative z-10 space-y-7">
          <div className="text-center space-y-3">
            <div className="inline-flex h-16 w-16 rounded-3xl bg-gradient-to-tr from-indigo-600 via-fuchsia-500 to-amber-400 items-center justify-center font-black text-white shadow-xl shadow-indigo-500/25 text-2xl">
              XR
            </div>
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${theme.textMain}`}>
              Bienvenue sur XR Agency Studio 🚀
            </h1>
            <p className={`text-sm max-w-lg mx-auto ${theme.textMuted}`}>
              Votre espace commercial gamifié, simple et coloré. Cliquez sur votre profil pour entrer, ou démarrez la formation XR School.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                setSchoolPinModal(true);
                setSchoolPinInput("");
                setSchoolPinError("");
              }}
              className="inline-flex flex-wrap items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:brightness-110 text-xs sm:text-sm font-extrabold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02]"
            >
              <GraduationCap className="w-5 h-5 text-amber-300" />
              Entrer dans XR School (Formation Pure · 70 Trames & Dojo)
              <span className="font-mono text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-black/30 text-amber-200 border border-white/20">
                Code : 1234
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => {
              const isAntoine = member.id === "antoine";
              const showPublicCode = !isAntoine && !member.customPinSet;
              return (
                <button
                  key={member.id}
                  onClick={() => {
                    setPendingMember(member);
                    setPinInput("");
                    setPinError("");
                  }}
                  className={`group p-4 rounded-3xl border transition-all hover:-translate-y-0.5 active:scale-[0.98] flex items-center gap-3.5 text-left ${theme.card} ${theme.cardHover}`}
                >
                  <div
                    className={`h-13 w-13 p-3.5 rounded-2xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white font-black text-lg shadow-md shrink-0`}
                  >
                    {member.shortName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-extrabold text-sm truncate group-hover:text-indigo-600 dark:group-hover:text-amber-300 transition-colors ${theme.textMain}`}>
                      {member.name}
                    </h3>
                    <p className={`text-[11px] truncate ${theme.textMuted}`}>{member.roleLabel}</p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.badgeSoft}`}>
                        {member.badge}
                      </span>
                      {showPublicCode ? (
                        <span className="inline-block text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          Code : {member.pin}
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.subCard} ${theme.textMuted}`}>
                          <Lock className="w-2.5 h-2.5" />
                          {isAntoine ? "Privé" : "Personnalisé"}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className={`text-center text-[11px] ${theme.textMuted}`}>
            Astuce : une fois connecté, cliquez sur l'icône 🔑 en haut à droite pour définir votre propre mot de passe confidentiel.
          </p>
        </div>

        {/* Modal PIN Profil Membre */}
        {pendingMember && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`border rounded-3xl p-6 max-w-sm w-full space-y-5 ${theme.modalBg}`}>
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${pendingMember.avatarBg} flex items-center justify-center text-white font-black text-lg shadow-md`}>
                  {pendingMember.shortName.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-extrabold text-base ${theme.textMain}`}>{pendingMember.name}</h3>
                  <p className={`text-xs ${theme.textMuted}`}>{pendingMember.roleLabel}</p>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className={`text-[11px] font-bold uppercase flex items-center gap-1.5 ${theme.textMuted}`}>
                      <KeyRound className="w-3.5 h-3.5 text-indigo-500" />
                      Code / Mot de passe
                    </label>
                    {pendingMember.id !== "antoine" && !pendingMember.customPinSet && (
                      <span className="text-[11px] font-mono font-extrabold text-emerald-600 dark:text-emerald-300">
                        Code : {pendingMember.pin}
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    autoFocus
                    maxLength={20}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError("");
                    }}
                    placeholder="••••••"
                    className={`w-full mt-2 rounded-2xl px-4 py-3 text-center text-xl tracking-[0.35em] font-mono border focus:outline-none focus:border-indigo-500 ${theme.inputBg}`}
                  />
                  {pinError && <p className="text-xs text-rose-500 font-bold mt-2 text-center">{pinError}</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPendingMember(null)}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMuted}`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold shadow-md"
                  >
                    Entrer 🚀
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal XR School (1234) */}
        {schoolPinModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`border rounded-3xl p-6 max-w-sm w-full space-y-5 ${theme.modalBg}`}>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-extrabold text-base ${theme.textMain}`}>Accès XR School</h3>
                  <p className={`text-xs ${theme.textMuted}`}>Formation pure · Code : 1234</p>
                </div>
              </div>

              <form onSubmit={handleSchoolPinSubmit} className="space-y-4">
                <input
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  maxLength={6}
                  value={schoolPinInput}
                  onChange={(e) => {
                    setSchoolPinInput(e.target.value);
                    setSchoolPinError("");
                  }}
                  placeholder="1234"
                  className={`w-full rounded-2xl px-4 py-3 text-center text-xl tracking-[0.5em] font-mono border focus:outline-none focus:border-indigo-500 ${theme.inputBg}`}
                />
                {schoolPinError && <p className="text-xs text-rose-500 font-bold text-center">{schoolPinError}</p>}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSchoolPinModal(false)}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMuted}`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-xs font-extrabold shadow-md"
                  >
                    Ouvrir l'École 🎓
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // INTERFACE PRINCIPALE CONNECTÉE — LUDIQUE, COLORÉE & RAPIDE
  // ═══════════════════════════════════════════════════════════
  const isDirector = currentUser.roleType === "direction";
  const isStudio = currentUser.roleType === "studio";
  const isManager = currentUser.roleType === "manager";

  const studioMockupCount = leads.filter((l) => l.stage === "mockup" && !l.mockupReady).length;
  const studioWonCount = leads.filter((l) => l.stage === "won" && l.studioStatus !== "delivered").length;

  const allowedTabs: { id: CrmTab; label: string; count: number | null }[] = isStudio
    ? [
        { id: "studio", label: "🎨 Studio (Maquettes & Projets)", count: studioMockupCount + studioWonCount },
        { id: "school", label: "🎓 XR School", count: null },
      ]
    : [
        { id: "kanban", label: "🎯 Mon Pipeline", count: myVisibleLeads.length },
        { id: "cockpit", label: "📞 Cockpit & Audit", count: null },
        { id: "contest", label: "🏆 Concours Arena", count: null },
        { id: "school", label: "🎓 XR School", count: null },
        ...(isManager || isDirector
          ? [{ id: "rh" as CrmTab, label: "👥 Filière RH", count: members.filter((m) => m.recruitedBy === "martin").length }]
          : []),
        {
          id: "finances",
          label: isDirector ? "💰 Finances & Équipe" : isManager ? "💰 Gains & Filière" : "💰 Mes Commissions",
          count: null,
        },
        ...(isDirector
          ? [
              { id: "studio" as CrmTab, label: "🎨 Studio", count: studioMockupCount + studioWonCount },
              { id: "qg" as CrmTab, label: "👑 Mon QG Privé", count: null },
            ]
          : []),
      ];

  const selectedModalService =
    XR_OFFICIAL_SERVICES.find((s) => s.id === formServiceId) || XR_OFFICIAL_SERVICES[0];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme.pageBg}`}>
      {/* Bandeau célébration closing */}
      {showCelebration && lastWonLead && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-500 text-white shadow-2xl border-2 border-white/40">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-black text-base tracking-wide uppercase">
                LEVEL UP ! VENTE SIGNÉE : {lastWonLead.name}
              </p>
              <p className="text-xs text-white/95 font-semibold">
                +100 XP au concours · Brief envoyé au Studio !
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 py-5">
        {/* HEADER LUDIQUE & COLORÉ */}
        <header className={`p-4 sm:p-5 rounded-3xl border flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 ${theme.card}`}>
          {/* Profil + Niveau XP */}
          <div className="flex items-center gap-3.5">
            <div
              className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${currentUser.avatarBg} flex items-center justify-center font-black text-white shadow-lg text-lg relative`}
            >
              {currentUser.shortName.charAt(0)}
              {!isStudio && (
                <span className="absolute -bottom-1.5 -right-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-indigo-600 text-white border-2 border-white dark:border-[#171336] shadow-sm">
                  N{gameHud.level}
                </span>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className={`text-base sm:text-lg font-black tracking-tight ${theme.textMain}`}>
                  Salut {currentUser.shortName} 👋
                </h1>
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${theme.badgeSoft}`}>
                  {currentUser.badge}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    syncStatus === "supabase_live"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-sky-500/15 text-sky-700 dark:text-sky-300"
                  }`}
                >
                  <Database className="w-2.5 h-2.5" />
                  {syncStatus === "supabase_live" ? "Supabase Live" : "Local · Prêt Supabase"}
                </span>
                {dueFollowUpsCount > 0 && !isStudio && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-sm">
                    🔔 {dueFollowUpsCount} relance(s)
                  </span>
                )}
              </div>
              {!isStudio ? (
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="w-28 h-2 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${gameHud.progress}%` }}
                    />
                  </div>
                  <span className={`text-[11px] font-bold ${theme.textMuted}`}>
                    {gameHud.xp} XP · {gameHud.questLabel}
                  </span>
                </div>
              ) : (
                <p className={`text-xs ${theme.textMuted}`}>Pôle Studio · Maquettes demandées & Projets signés</p>
              )}
            </div>
          </div>

          {/* Barre Actions & HUD Jeu Vidéo */}
          <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto justify-between xl:justify-end">
            {ThemeSwitcherBar}

            {!isStudio && (
              <div className={`hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border text-xs ${theme.subCard}`}>
                <span className="font-bold text-indigo-600 dark:text-amber-300">⚡ {dailyCalls}/10</span>
                <button
                  onClick={handleIncrementCall}
                  className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold shadow-sm"
                >
                  +1 Appel
                </button>
                <span className="opacity-25">|</span>
                <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-300">
                  {financeView.myCommissionUnlocked.toLocaleString("fr-FR")} €
                </span>
              </div>
            )}

            <button
              onClick={() => {
                setShowCmdPalette(true);
                setCmdQuery("");
              }}
              title="Recherche rapide (Ctrl+K)"
              className={`p-2 rounded-xl border text-xs font-bold inline-flex items-center gap-1 ${theme.subCard} ${theme.textMuted}`}
            >
              <Command className="w-3.5 h-3.5" /> <span className="hidden md:inline">Ctrl+K</span>
            </button>

            {!isStudio && (
              <button
                onClick={() => {
                  setSprintActive(!sprintActive);
                  if (soundEnabled) playDing();
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                  sprintActive
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white border-transparent animate-pulse shadow-md"
                    : `${theme.subCard} ${theme.textMain}`
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${sprintActive ? "text-white" : "text-orange-500"}`} />
                {sprintActive
                  ? `${Math.floor(sprintSeconds / 60)}:${(sprintSeconds % 60).toString().padStart(2, "0")}`
                  : "Sprint 25m"}
              </button>
            )}

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border ${theme.subCard} ${theme.textMuted}`}
              title={soundEnabled ? "Sons activés" : "Sons coupés"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-500" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {!isStudio && (
              <button
                onClick={() => {
                  setFormSetterId(currentUser.id);
                  setFormCloserId(currentUser.id);
                  setDuplicateWarning("");
                  setShowNewLeadModal(true);
                  if (soundEnabled) playDing();
                }}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:brightness-110 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4" />
                Nouveau Prospect
              </button>
            )}

            <button
              onClick={() => {
                setNewPinValue("");
                setConfirmPinValue("");
                setChangePinError("");
                setShowChangePinModal(true);
              }}
              title="Mon mot de passe"
              className={`p-2 rounded-xl border ${theme.subCard} ${theme.textMuted} hover:text-indigo-500`}
            >
              <KeyRound className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentUserId(null);
                setActiveLeadForCockpit(null);
              }}
              title="Déconnexion"
              className={`p-2 rounded-xl border ${theme.subCard} text-rose-500 hover:bg-rose-500/10`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* NAVIGATION ONGLETS COLORÉE */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
          <nav className={`flex flex-wrap gap-1.5 p-1.5 rounded-2xl border ${theme.tabBarBg}`}>
            {allowedTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (soundEnabled) playDing();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === tab.id ? theme.tabActive : theme.tabIdle
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      activeTab === tab.id ? "bg-white/25 text-white" : "bg-indigo-500/15 text-indigo-600 dark:text-amber-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {activeTab === "kanban" && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {myVisibleLeads.length > 0 && (
                <button
                  onClick={handleExportCsv}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold ${theme.card} ${theme.textMain}`}
                >
                  <Download className="w-3.5 h-3.5 text-indigo-500" /> CSV
                </button>
              )}
              <div className={`flex-1 sm:w-60 flex items-center gap-2 rounded-xl px-3 py-2 text-xs border ${theme.card}`}>
                <Search className={`w-3.5 h-3.5 ${theme.textSoft}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un prospect..."
                  className={`bg-transparent border-none outline-none text-xs w-full ${theme.textMain}`}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── VUE 1 : KANBAN DRAG & DROP COLORÉ (ZÉRO CLIENT FICTIF) ── */}
        {activeTab === "kanban" && !isStudio && (
          <div className="mt-5">
            {myVisibleLeads.length === 0 ? (
              <div className={`text-center py-16 px-6 rounded-3xl border max-w-xl mx-auto space-y-4 ${theme.card}`}>
                <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-3xl mx-auto shadow-lg text-white">
                  🚀
                </div>
                <h3 className={`text-xl font-black ${theme.textMain}`}>Votre terrain de jeu est prêt !</h3>
                <p className={`text-xs leading-relaxed ${theme.textMuted}`}>
                  Zéro faux client ici. Ajoutez votre premier vrai prospect en 5 secondes, glissez-déposez vos cartes de colonne en colonne et débloquez vos premiers 100 XP !
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setFormSetterId(currentUser.id);
                      setFormCloserId(currentUser.id);
                      setShowNewLeadModal(true);
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg"
                  >
                    <Plus className="w-4 h-4" /> Ajouter mon premier prospect
                  </button>
                  <button
                    onClick={() => setActiveTab("school")}
                    className={`inline-flex items-center gap-2 font-bold text-xs px-4 py-3 rounded-2xl border ${theme.subCard} ${theme.textMain}`}
                  >
                    <GraduationCap className="w-4 h-4 text-indigo-500" /> Ouvrir XR School
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3.5">
                {(
                  [
                    { stage: "new", title: "1. Nouveaux", sub: "Glissez-déposez ✨", lightBg: "bg-sky-50/90 border-sky-200", darkBg: "bg-sky-500/10 border-sky-400/25", dot: "bg-sky-500", next: "rdv", nextLabel: "RDV →" },
                    { stage: "rdv", title: "2. RDV / Qualifié", sub: "Setter → Closer", lightBg: "bg-teal-50/90 border-teal-200", darkBg: "bg-teal-500/10 border-teal-400/25", dot: "bg-teal-500", next: "mockup", nextLabel: "Maquette →" },
                    { stage: "mockup", title: "3. Maquette", sub: "Studio + Concours", lightBg: "bg-amber-50/90 border-amber-200", darkBg: "bg-amber-500/10 border-amber-400/25", dot: "bg-amber-500", next: "negociation", nextLabel: "Négo →" },
                    { stage: "negociation", title: "4. Négociation", sub: "Closing décisif", lightBg: "bg-violet-50/90 border-violet-200", darkBg: "bg-violet-500/10 border-violet-400/25", dot: "bg-violet-500", next: "won", nextLabel: "Signer 🎉" },
                    { stage: "won", title: "5. Signés 🎉", sub: "Bravo · Studio OK", lightBg: "bg-emerald-50/90 border-emerald-200", darkBg: "bg-emerald-500/10 border-emerald-400/25", dot: "bg-emerald-500", next: null, nextLabel: "" },
                  ] as const
                ).map((col) => {
                  const colLeads = filteredLeads.filter((l) => l.stage === col.stage);
                  const isDropTarget = dragOverStage === col.stage;
                  return (
                    <div
                      key={col.stage}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverStage(col.stage);
                      }}
                      onDragLeave={() => setDragOverStage(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverStage(null);
                        if (draggedLeadId) moveStage(draggedLeadId, col.stage);
                        setDraggedLeadId(null);
                      }}
                      className={`p-3.5 rounded-3xl border-2 flex flex-col min-h-[470px] transition-all ${
                        theme.isDark ? col.darkBg : col.lightBg
                      } ${isDropTarget ? "ring-4 ring-indigo-500/40 scale-[1.01]" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className={`font-extrabold text-xs flex items-center gap-2 ${theme.textMain}`}>
                          <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                          {col.title}
                        </h3>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${theme.card} ${theme.textMain}`}>
                          {colLeads.length}
                        </span>
                      </div>
                      <p className={`text-[10px] mb-3 ${theme.textMuted}`}>{col.sub}</p>

                      <div className="space-y-2.5 flex-1">
                        {colLeads.map((lead) => (
                          <LeadCard
                            key={lead.id}
                            lead={lead}
                            members={members}
                            todayIso={todayIso}
                            theme={theme}
                            onDragStart={() => setDraggedLeadId(lead.id)}
                            onEdit={() => setEditingLead(lead)}
                            onCall={() => {
                              setActiveLeadForCockpit(lead);
                              setAuditUrlInput(lead.websiteUrl || "");
                              setAuditResult(null);
                              setCheckoutMessage(null);
                              setActiveTab("cockpit");
                            }}
                            onNext={col.next ? () => moveStage(lead.id, col.next) : undefined}
                            nextLabel={col.nextLabel}
                            onWin={col.stage !== "won" ? () => moveStage(lead.id, "won") : undefined}
                            onPdf={() => generatePdfQuote(lead)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── VUE 2 : COCKPIT D'APPEL + AUDIT EXPRESS + STRIPE + TIMELINE ── */}
        {activeTab === "cockpit" && !isStudio && (
          <div className="mt-5">
            {myVisibleLeads.length === 0 ? (
              <div className={`text-center py-12 px-4 rounded-3xl border max-w-lg mx-auto space-y-3 ${theme.card}`}>
                <p className={`text-sm ${theme.textMuted}`}>
                  Ajoutez un prospect pour activer son Cockpit d'Appel, l'Audit Express et les relances WhatsApp.
                </p>
                <button
                  onClick={() => setShowNewLeadModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold"
                >
                  + Ajouter un prospect
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className={`lg:col-span-4 rounded-3xl border p-4 space-y-2 max-h-[680px] overflow-y-auto ${theme.card}`}>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-amber-300 mb-2">
                    Mes Prospects ({myVisibleLeads.length})
                  </h3>
                  {myVisibleLeads.map((l) => {
                    const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === l.serviceId);
                    const selected = (activeLeadForCockpit?.id || myVisibleLeads[0].id) === l.id;
                    return (
                      <button
                        key={l.id}
                        onClick={() => {
                          setActiveLeadForCockpit(l);
                          setAuditUrlInput(l.websiteUrl || "");
                          setAuditResult(null);
                          setCheckoutMessage(null);
                        }}
                        className={`w-full text-left p-3 rounded-2xl border transition-all ${
                          selected
                            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-md"
                            : `${theme.subCard} ${theme.textMain}`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs truncate">
                            {svc?.icon} {l.name}
                          </span>
                          <span className={`text-[11px] font-mono font-bold shrink-0 ml-2 ${selected ? "text-amber-200" : "text-indigo-600 dark:text-amber-300"}`}>
                            {formatPricePeriod(l.value, l.billing)}
                          </span>
                        </div>
                        <p className={`text-[11px] truncate mt-0.5 ${selected ? "text-white/80" : theme.textMuted}`}>
                          {l.contact} · {l.phone}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const target = activeLeadForCockpit || myVisibleLeads[0];
                  const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === target.serviceId) || XR_OFFICIAL_SERVICES[0];
                  const playbook = getSectorServicePlaybook(target.sectorId, target.serviceId);

                  const fillVars = (s: string) =>
                    s
                      .replace(/\[Prénom\]/g, target.contact)
                      .replace(/\[Mon Prénom\]/g, currentUser.shortName)
                      .replace(/\[Nom Entreprise\]/g, target.name);

                  return (
                    <div className="lg:col-span-8 space-y-4">
                      {/* Carte Fiche Prospect & Boutons d'action */}
                      <div className={`p-5 rounded-3xl border space-y-4 ${theme.card}`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <h2 className={`text-lg font-black flex items-center gap-2 ${theme.textMain}`}>
                              <span>{svc.icon}</span>
                              {target.name}
                            </h2>
                            <p className={`text-xs mt-0.5 ${theme.textMuted}`}>
                              Contact : <strong>{target.contact}</strong> ·{" "}
                              <span className="font-mono font-bold text-indigo-600 dark:text-amber-300">{target.phone}</span> ·{" "}
                              <span>{playbook.sector.icon} {playbook.sector.name}</span>
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <a
                              href={`tel:${target.phone.replace(/\s+/g, "")}`}
                              onClick={() => {
                                handleIncrementCall();
                                appendTimeline(target.id, "Appel téléphonique lancé");
                              }}
                              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl shadow-md"
                            >
                              <Phone className="w-3.5 h-3.5" /> Appeler
                            </a>
                            <a
                              href={`https://wa.me/${target.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(fillVars(playbook.setting.dm1))}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => appendTimeline(target.id, "Message WhatsApp (J0) envoyé")}
                              className="inline-flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs px-3.5 py-2.5 rounded-xl"
                            >
                              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                            <button
                              onClick={() => generatePdfQuote(target)}
                              className={`inline-flex items-center gap-1.5 font-bold text-xs px-3.5 py-2.5 rounded-xl border ${theme.subCard} ${theme.textMain}`}
                            >
                              <Download className="w-3.5 h-3.5 text-indigo-500" /> Devis PDF
                            </button>
                            <button
                              onClick={() => handleGenerateStripeLink(target)}
                              disabled={checkoutLoading}
                              className="inline-flex items-center gap-1.5 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-200 border border-indigo-400/30 font-bold text-xs px-3.5 py-2.5 rounded-xl"
                            >
                              <CreditCard className="w-3.5 h-3.5" /> {checkoutLoading ? "..." : "Lien Acompte"}
                            </button>
                            <button
                              onClick={() => moveStage(target.id, "won")}
                              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl shadow-md"
                            >
                              <Trophy className="w-3.5 h-3.5" /> Signé !
                            </button>
                          </div>
                        </div>

                        {checkoutMessage && (
                          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/30 text-xs font-semibold text-indigo-700 dark:text-indigo-200">
                            {checkoutMessage}
                          </div>
                        )}

                        {/* Relances Express J+2 & J+5 */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-white/10 text-xs">
                          <span className={`font-bold ${theme.textMuted}`}>Relances express :</span>
                          <a
                            href={`https://wa.me/${target.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(fillVars(playbook.setting.followupJ2))}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => appendTimeline(target.id, "Relance WhatsApp J+2 envoyée")}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold text-[11px]"
                          >
                            ⚡ Envoyer Relance J+2
                          </a>
                          <a
                            href={`https://wa.me/${target.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(fillVars(playbook.setting.followupJ5))}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => appendTimeline(target.id, "Relance WhatsApp J+5 envoyée")}
                            className="px-2.5 py-1 rounded-lg bg-violet-500/15 text-violet-700 dark:text-violet-300 font-bold text-[11px]"
                          >
                            🎯 Envoyer Relance J+5
                          </a>
                        </div>
                      </div>

                      {/* AUDIT EXPRESS 1-CLIC (/api/audit) */}
                      <div className={`p-5 rounded-3xl border space-y-3 ${theme.card}`}>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-amber-300 flex items-center gap-1.5">
                          <Zap className="w-4 h-4" /> Audit Express du site prospect (Live /api/audit)
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <input
                            type="text"
                            value={auditUrlInput}
                            onChange={(e) => setAuditUrlInput(e.target.value)}
                            placeholder="https://site-du-prospect.fr"
                            className={`flex-1 min-w-[200px] rounded-xl px-3.5 py-2 text-xs border ${theme.inputBg}`}
                          />
                          <button
                            onClick={() => handleRunExpressAudit(target)}
                            disabled={auditLoading}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-extrabold text-xs shadow-md disabled:opacity-50"
                          >
                            {auditLoading ? "Analyse en cours..." : "⚡ Auditer en 5s"}
                          </button>
                        </div>

                        {auditResult && (
                          <div className={`p-3.5 rounded-2xl border space-y-2 ${theme.subCard}`}>
                            {auditResult.error ? (
                              <p className="text-xs text-rose-500 font-bold">{auditResult.error}</p>
                            ) : (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs font-extrabold ${theme.textMain}`}>
                                    Score détecté :{" "}
                                    <span className={auditResult.score >= 75 ? "text-emerald-500" : "text-orange-500"}>
                                      {auditResult.score}/100
                                    </span>
                                  </span>
                                  <button
                                    onClick={() => {
                                      const summary = `Audit live (${auditResult.score}/100) : ${auditResult.recommendations?.[0]?.reason || "Optimisation mobile & conversion recommandée"}`;
                                      setLeads((prev) =>
                                        prev.map((l) => (l.id === target.id ? { ...l, issue: summary, websiteUrl: auditResult.url } : l))
                                      );
                                      setActiveLeadForCockpit({ ...target, issue: summary, websiteUrl: auditResult.url });
                                      if (soundEnabled) playDing();
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-extrabold"
                                  >
                                    ✓ Injecter dans l'accroche
                                  </button>
                                </div>
                                {auditResult.recommendations?.slice(0, 2).map((rec, i) => (
                                  <p key={i} className={`text-[11px] ${theme.textMuted}`}>
                                    • <strong>{rec.service}</strong> : {rec.reason}
                                  </p>
                                ))}
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Accroche personnalisée + Objections */}
                      <div className={`p-5 rounded-3xl border space-y-2.5 ${theme.card}`}>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                          Accroche adaptée ({playbook.sector.name} × {svc.shortName})
                        </h3>
                        <p className={`p-4 rounded-2xl border text-xs font-mono leading-relaxed ${theme.subCard} ${theme.textMain}`}>
                          {fillVars(playbook.coldCall.opener)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-5 rounded-3xl border space-y-2.5 ${theme.card}`}>
                          <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-300 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4" /> Répliques Objections
                          </h3>
                          {playbook.objections.map((obj, idx) => (
                            <div key={idx} className={`rounded-xl border overflow-hidden ${theme.subCard}`}>
                              <button
                                onClick={() => setOpenObjIdx(openObjIdx === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-3 text-left text-xs font-bold text-indigo-600 dark:text-amber-300"
                              >
                                <span>{obj.q}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${openObjIdx === idx ? "rotate-180" : ""}`} />
                              </button>
                              {openObjIdx === idx && (
                                <div className="px-3 pb-3 text-xs font-mono leading-relaxed text-emerald-700 dark:text-emerald-200">
                                  {fillVars(obj.a)}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Timeline Historique Prospect */}
                        <div className={`p-5 rounded-3xl border space-y-2.5 ${theme.card}`}>
                          <h3 className="text-xs font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-300 flex items-center gap-1.5">
                            <Activity className="w-4 h-4" /> Historique Prospect
                          </h3>
                          {(target.timeline || []).length === 0 ? (
                            <p className={`text-xs italic ${theme.textSoft}`}>Aucune action enregistrée encore.</p>
                          ) : (
                            <div className="space-y-2 max-h-[220px] overflow-y-auto">
                              {(target.timeline || []).map((ev) => (
                                <div key={ev.id} className={`p-2.5 rounded-xl border text-[11px] flex items-center justify-between gap-2 ${theme.subCard}`}>
                                  <span className={theme.textMain}>{ev.text}</span>
                                  <span className={`font-mono text-[10px] shrink-0 ${theme.textSoft}`}>{ev.date}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ── VUE 3 : CONCOURS ARENA ── */}
        {activeTab === "contest" && !isStudio && (
          <ContestLeaderboard
            allLeads={leads}
            members={members}
            currentUser={currentUser}
            weeklyChallenge={weeklyChallenge}
            theme={theme}
          />
        )}

        {/* ── VUE 4 : XR SCHOOL ── */}
        {activeTab === "school" && (
          <SchoolModule currentUser={currentUser} theme={theme} onSound={() => soundEnabled && playDing()} />
        )}

        {/* ── VUE 5 : FILIÈRE RH MARTIN ── */}
        {activeTab === "rh" && (isManager || isDirector) && (
          <ManagerFiliereHub
            managerId="martin"
            members={members}
            visibleLeads={myVisibleLeads}
            theme={theme}
            onPromoteCandidate={handlePromoteCandidate}
            onSound={() => soundEnabled && playDing()}
          />
        )}

        {/* ── VUE 6 : FINANCES & COMMISSIONS CLOISONNÉES ── */}
        {activeTab === "finances" && !isStudio && (
          <div className="mt-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-5 rounded-3xl border ${theme.card}`}>
                <p className={`text-[11px] uppercase font-bold ${theme.textMuted}`}>
                  {isDirector ? "CA One-Shot Agence" : "Mon CA One-Shot"}
                </p>
                <p className="text-2xl font-black text-emerald-500 mt-1.5 font-mono">
                  {financeView.cashWon.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div className={`p-5 rounded-3xl border ${theme.card}`}>
                <p className={`text-[11px] uppercase font-bold ${theme.textMuted}`}>
                  {isDirector ? "MRR Mensuel Agence" : "Mon MRR Mensuel"}
                </p>
                <p className="text-2xl font-black text-sky-500 mt-1.5 font-mono">
                  {financeView.mrrWon.toLocaleString("fr-FR")} €/m
                </p>
              </div>
              <div className={`p-5 rounded-3xl border ${theme.card}`}>
                <p className={`text-[11px] uppercase font-bold ${theme.textMuted}`}>Commissions Débloquées</p>
                <p className="text-2xl font-black text-amber-500 mt-1.5 font-mono">
                  {financeView.myCommissionUnlocked.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div className={`p-5 rounded-3xl border ${theme.card}`}>
                <p className={`text-[11px] uppercase font-bold ${theme.textMuted}`}>En Attente Virement</p>
                <p className="text-2xl font-black text-violet-500 mt-1.5 font-mono">
                  {financeView.myCommissionPending.toLocaleString("fr-FR")} €
                </p>
              </div>
            </div>

            <div className={`rounded-3xl border p-6 space-y-4 ${theme.card}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
                    <Lock className="w-4 h-4 text-indigo-500" />
                    {isDirector
                      ? "Barèmes & Commissions — Toute l'équipe"
                      : isManager
                      ? "Vos commissions & candidats de votre filière"
                      : "Mes commissions personnelles (Confidentiel)"}
                  </h3>
                  <p className={`text-[11px] mt-0.5 ${theme.textMuted}`}>
                    Cloisonnement strict : aucun commercial ne voit les barèmes ni les gains d'un autre.
                  </p>
                </div>

                {(isDirector || isManager) && (
                  <button
                    onClick={() => {
                      setNewMemberRecruitedBy(isManager ? currentUser.id : "");
                      setShowAddMemberModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    {isManager ? "Ajouter un candidat" : "Ajouter un membre"}
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b uppercase text-[10px] ${theme.border} ${theme.textSoft}`}>
                      <th className="pb-3">Membre</th>
                      <th className="pb-3">Barème (Setting / Closing / Full)</th>
                      <th className="pb-3">One-Shot</th>
                      <th className="pb-3">MRR</th>
                      <th className="pb-3">En attente</th>
                      <th className="pb-3 text-right">Débloqué</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-white/10">
                    {financeView.visibleMemberRows.map((row) => (
                      <tr key={row.member.id}>
                        <td className={`py-3 font-extrabold ${theme.textMain}`}>
                          <div>{row.member.name}</div>
                          <div className={`text-[10px] font-normal ${theme.textMuted}`}>
                            {row.member.badge}
                            {row.member.recruitedBy === "martin" ? " · Filière Martin" : ""}
                          </div>
                        </td>
                        <td className={`py-3 text-[11px] ${theme.textMuted}`}>
                          {row.member.roleType === "direction" ? (
                            "Direction Générale"
                          ) : isDirector ? (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <label className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border ${theme.subCard}`}>
                                <span className="text-[10px]">Set</span>
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={Math.round(row.member.settingRate * 100)}
                                  onChange={(e) => handleUpdateMemberRates(row.member.id, "settingRate", Number(e.target.value))}
                                  className="w-9 bg-transparent font-mono font-bold text-indigo-600 dark:text-amber-300 text-right outline-none"
                                />
                                %
                              </label>
                              <label className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border ${theme.subCard}`}>
                                <span className="text-[10px]">Close</span>
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={Math.round(row.member.closingRate * 100)}
                                  onChange={(e) => handleUpdateMemberRates(row.member.id, "closingRate", Number(e.target.value))}
                                  className="w-9 bg-transparent font-mono font-bold text-indigo-600 dark:text-amber-300 text-right outline-none"
                                />
                                %
                              </label>
                              <label className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border ${theme.subCard}`}>
                                <span className="text-[10px]">Full</span>
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={Math.round(row.member.fullCycleRate * 100)}
                                  onChange={(e) => handleUpdateMemberRates(row.member.id, "fullCycleRate", Number(e.target.value))}
                                  className="w-9 bg-transparent font-mono font-bold text-emerald-600 dark:text-emerald-300 text-right outline-none"
                                />
                                %
                              </label>
                            </div>
                          ) : row.member.roleType === "manager" ? (
                            "20% Closing · 10% Setting · +10% Override recrues"
                          ) : (
                            `Setting ${Math.round(row.member.settingRate * 100)}% · Closing ${Math.round(row.member.closingRate * 100)}% · Full ${Math.round(row.member.fullCycleRate * 100)}%`
                          )}
                        </td>
                        <td className={`py-3 font-mono font-bold ${theme.textMain}`}>{row.ownSalesOneShot.toLocaleString("fr-FR")} €</td>
                        <td className="py-3 font-mono font-bold text-sky-500">{row.ownSalesMrr.toLocaleString("fr-FR")} €/m</td>
                        <td className="py-3 font-mono font-bold text-amber-500">{row.pendingCom.toLocaleString("fr-FR")} €</td>
                        <td className="py-3 text-right font-mono font-black text-emerald-500">{row.unlockedCom.toLocaleString("fr-FR")} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── VUE 7 : STUDIO (MAQUETTES + SIGNÉS · ZÉRO FINANCE) ── */}
        {activeTab === "studio" && (isDirector || isStudio) && (
          <div className="mt-5 space-y-5">
            <div className={`p-5 rounded-3xl border space-y-3 ${theme.card}`}>
              <h2 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
                <Palette className="w-4 h-4 text-amber-500" />
                1. Maquettes demandées ({leads.filter((l) => l.stage === "mockup").length})
              </h2>
              {leads.filter((l) => l.stage === "mockup").length === 0 ? (
                <p className={`text-xs italic ${theme.textSoft}`}>Aucune maquette en attente.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {leads
                    .filter((l) => l.stage === "mockup")
                    .map((item) => {
                      const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === item.serviceId);
                      const closer = members.find((m) => m.id === item.closerId);
                      return (
                        <div key={item.id} className={`p-4 rounded-2xl border space-y-2 ${theme.subCard}`}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-indigo-600 dark:text-amber-300">{svc?.icon} {svc?.shortName}</span>
                            <span className={`text-[10px] ${theme.textMuted}`}>Par {closer?.shortName}</span>
                          </div>
                          <h4 className={`font-extrabold text-sm ${theme.textMain}`}>{item.name}</h4>
                          {item.websiteUrl && (
                            <a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-indigo-500 hover:underline">
                              <Globe className="w-3 h-3" /> {item.websiteUrl}
                            </a>
                          )}
                          <p className={`text-xs ${theme.textMuted}`}>{item.issue}</p>
                          <button
                            onClick={() => {
                              setLeads((prev) => prev.map((l) => (l.id === item.id ? { ...l, mockupReady: !l.mockupReady } : l)));
                              if (soundEnabled) playDing();
                            }}
                            className={`w-full py-2 rounded-xl text-xs font-extrabold ${
                              item.mockupReady
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                                : "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                            }`}
                          >
                            {item.mockupReady ? "✓ Maquette prête" : "Marquer maquette prête"}
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <div className={`p-5 rounded-3xl border space-y-3 ${theme.card}`}>
              <h2 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                2. Projets Signés à Produire & Livrer ({leads.filter((l) => l.stage === "won").length})
              </h2>
              {leads.filter((l) => l.stage === "won").length === 0 ? (
                <p className={`text-xs italic ${theme.textSoft}`}>Aucun projet signé en file de production.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {leads
                    .filter((l) => l.stage === "won")
                    .map((deal) => {
                      const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === deal.serviceId);
                      return (
                        <div key={deal.id} className={`p-4 rounded-2xl border space-y-2.5 ${theme.subCard}`}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-indigo-600 dark:text-amber-300">{svc?.icon} {svc?.shortName}</span>
                            <select
                              value={deal.studioStatus || "pending"}
                              onChange={(e) => {
                                setLeads((prev) =>
                                  prev.map((l) =>
                                    l.id === deal.id ? { ...l, studioStatus: e.target.value as "pending" | "in_production" | "delivered" } : l
                                  )
                                );
                                if (soundEnabled) playDing();
                              }}
                              className={`rounded-lg px-2 py-1 text-[10px] font-bold border ${theme.inputBg}`}
                            >
                              <option value="pending">⏳ À démarrer</option>
                              <option value="in_production">⚙️ En production</option>
                              <option value="delivered">✅ Livré client</option>
                            </select>
                          </div>
                          <h4 className={`font-extrabold text-sm ${theme.textMain}`}>{deal.name}</h4>
                          <p className={`text-xs ${theme.textMuted}`}>{deal.planLabel} · {deal.contact} ({deal.phone})</p>
                          <p className={`text-xs ${theme.textMuted}`}>{deal.issue}</p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── VUE 8 : QG PRIVÉ ANTOINE ── */}
        {activeTab === "qg" && isDirector && (
          <DirectorPersonalHub
            allLeads={leads}
            members={members}
            weeklyChallenge={weeklyChallenge}
            onUpdateWeeklyChallenge={setWeeklyChallenge}
            onUnlockCommission={handleUnlockCommission}
            theme={theme}
            onSound={() => soundEnabled && playDing()}
          />
        )}
      </div>

      {/* ── PALETTE RAPIDE CTRL+K ── */}
      {showCmdPalette && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-start justify-center pt-20 p-4" onClick={() => setShowCmdPalette(false)}>
          <div className={`border rounded-3xl p-4 max-w-lg w-full space-y-3 ${theme.modalBg}`} onClick={(e) => e.stopPropagation()}>
            <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border ${theme.inputBg}`}>
              <Search className="w-4 h-4 text-indigo-500" />
              <input
                type="text"
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Rechercher un prospect ou sauter vers un onglet..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {allowedTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id);
                    setShowCmdPalette(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-indigo-500/15 ${theme.textMain}`}
                >
                  Aller vers : {t.label}
                </button>
              ))}
              {myVisibleLeads
                .filter((l) => l.name.toLowerCase().includes(cmdQuery.toLowerCase()))
                .slice(0, 5)
                .map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setActiveLeadForCockpit(l);
                      setActiveTab("cockpit");
                      setShowCmdPalette(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-indigo-500/15 flex justify-between ${theme.textMain}`}
                  >
                    <span className="font-bold">📞 {l.name}</span>
                    <span className={theme.textMuted}>{l.contact}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL NOUVEAU PROSPECT (AVEC ANTI-DOUBLON) ── */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[92vh] overflow-y-auto ${theme.modalBg}`}>
            <div className={`flex items-center justify-between pb-3 border-b ${theme.border}`}>
              <h3 className={`font-extrabold text-base flex items-center gap-2 ${theme.textMain}`}>
                <Plus className="w-4 h-4 text-orange-500" /> Nouveau Prospect Flash
              </h3>
              <button onClick={() => setShowNewLeadModal(false)} className={theme.textSoft}>✕</button>
            </div>

            {duplicateWarning && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-bold text-rose-600 dark:text-rose-300">
                {duplicateWarning}
              </div>
            )}

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Entreprise / Commerce *</label>
                <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Nom de l'établissement" className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Contact</label>
                  <input type="text" value={formContact} onChange={(e) => setFormContact(e.target.value)} placeholder="Prénom & Nom" className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
                </div>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Téléphone *</label>
                  <input type="text" required value={formPhone} onChange={(e) => { setFormPhone(e.target.value); setDuplicateWarning(""); }} placeholder="+33 6 ..." className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Site web (pour Audit Express)</label>
                  <input type="text" value={formWebsite} onChange={(e) => setFormWebsite(e.target.value)} placeholder="ex: monclient.fr" className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
                </div>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Relance prévue</label>
                  <input type="date" value={formFollowUp} onChange={(e) => setFormFollowUp(e.target.value)} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Secteur</label>
                  <select value={formSectorId} onChange={(e) => setFormSectorId(e.target.value)} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}>
                    {BUSINESS_SECTORS.map((sec) => <option key={sec.id} value={sec.id}>{sec.icon} {sec.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Service XR Agency</label>
                  <select
                    value={formServiceId}
                    onChange={(e) => {
                      const nextId = e.target.value;
                      setFormServiceId(nextId);
                      const s = XR_OFFICIAL_SERVICES.find((x) => x.id === nextId);
                      if (s) {
                        setFormPlanId(s.plans[0].id);
                        setFormValue(s.plans[0].price);
                      }
                    }}
                    className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
                  >
                    {XR_OFFICIAL_SERVICES.map((s) => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Formule</label>
                  <select
                    value={formPlanId}
                    onChange={(e) => {
                      setFormPlanId(e.target.value);
                      const p = selectedModalService.plans.find((x) => x.id === e.target.value);
                      if (p) setFormValue(p.price);
                    }}
                    className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
                  >
                    {selectedModalService.plans.map((p) => <option key={p.id} value={p.id}>{p.label} ({p.price} €)</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Montant (€)</label>
                  <input type="number" value={formValue} onChange={(e) => setFormValue(Number(e.target.value))} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs font-mono border ${theme.inputBg}`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Setter</label>
                  <select value={formSetterId || currentUser.id} onChange={(e) => setFormSetterId(e.target.value)} disabled={!isDirector && !isManager} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border disabled:opacity-60 ${theme.inputBg}`}>
                    {members.filter((m) => m.roleType !== "studio").map((m) => <option key={m.id} value={m.id}>{m.shortName} · {m.badge}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Closer</label>
                  <select value={formCloserId || currentUser.id} onChange={(e) => setFormCloserId(e.target.value)} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}>
                    {members.filter((m) => m.roleType !== "studio").map((m) => <option key={m.id} value={m.id}>{m.shortName} · {m.badge}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Besoin / Faille</label>
                <input type="text" value={formIssue} onChange={(e) => setFormIssue(e.target.value)} placeholder="Ex: Absent du Top 3 Maps, site lent..." className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
              </div>

              <div className="pt-2 flex gap-2">
                <button type="button" onClick={() => setShowNewLeadModal(false)} className={`flex-1 py-2.5 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMuted}`}>Annuler</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold shadow-md">Enregistrer 🚀</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL ÉDITION PROSPECT ── */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-lg w-full space-y-4 ${theme.modalBg}`}>
            <div className={`flex items-center justify-between pb-3 border-b ${theme.border}`}>
              <h3 className={`font-extrabold text-base ${theme.textMain}`}>Modifier : {editingLead.name}</h3>
              <button onClick={() => setEditingLead(null)} className={theme.textSoft}>✕</button>
            </div>
            <form onSubmit={handleSaveEditedLead} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Étape</label>
                  <select value={editingLead.stage} onChange={(e) => setEditingLead({ ...editingLead, stage: e.target.value as LeadStage })} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}>
                    <option value="new">1. Nouveau</option>
                    <option value="rdv">2. RDV / Qualifié</option>
                    <option value="mockup">3. Maquette</option>
                    <option value="negociation">4. Négociation</option>
                    <option value="won">5. Signé 🎉</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Relance</label>
                  <input type="date" value={editingLead.followUpDate || ""} onChange={(e) => setEditingLead({ ...editingLead, followUpDate: e.target.value })} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Montant (€)</label>
                  <input type="number" value={editingLead.value} onChange={(e) => setEditingLead({ ...editingLead, value: Number(e.target.value) })} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs font-mono border ${theme.inputBg}`} />
                </div>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Téléphone</label>
                  <input type="text" value={editingLead.phone} onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
                </div>
              </div>
              <div>
                <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Notes privées</label>
                <textarea rows={3} value={editingLead.notes} onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
              </div>
              <div className="pt-2 flex items-center justify-between gap-2">
                <button type="button" onClick={() => handleDeleteLead(editingLead.id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-500/15 text-rose-500 text-xs font-bold">
                  <Trash2 className="w-3.5 h-3.5" /> Supprimer
                </button>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditingLead(null)} className={`px-4 py-2 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMuted}`}>Annuler</button>
                  <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold">Enregistrer</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL AJOUT MEMBRE ── */}
      {showAddMemberModal && (isDirector || isManager) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-md w-full space-y-4 ${theme.modalBg}`}>
            <div className={`flex items-center justify-between pb-3 border-b ${theme.border}`}>
              <h3 className={`font-extrabold text-base flex items-center gap-2 ${theme.textMain}`}>
                <UserPlus className="w-4 h-4 text-indigo-500" />
                {isManager ? "Nouveau candidat (ma filière)" : "Ajouter un membre"}
              </h3>
              <button onClick={() => setShowAddMemberModal(false)} className={theme.textSoft}>✕</button>
            </div>
            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Prénom & Nom *</label>
                <input type="text" required value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Rôle</label>
                  <select value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value as UserRoleType)} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}>
                    <option value="setter">📞 Setter</option>
                    <option value="closer">🎯 Closer</option>
                    <option value="full_cycle">⚡ Full-Cycle</option>
                    <option value="student">🎓 Élève XR School</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Code initial</label>
                  <input type="text" maxLength={8} value={newMemberPin} onChange={(e) => setNewMemberPin(e.target.value)} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs font-mono border ${theme.inputBg}`} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={`text-[10px] font-bold uppercase ${theme.textMuted}`}>Set %</label>
                  <input type="number" value={newMemberSettingPct} onChange={(e) => setNewMemberSettingPct(Number(e.target.value))} className={`w-full mt-1 rounded-xl px-2 py-2 text-xs font-mono border ${theme.inputBg}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold uppercase ${theme.textMuted}`}>Close %</label>
                  <input type="number" value={newMemberClosingPct} onChange={(e) => setNewMemberClosingPct(Number(e.target.value))} className={`w-full mt-1 rounded-xl px-2 py-2 text-xs font-mono border ${theme.inputBg}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold uppercase ${theme.textMuted}`}>Full %</label>
                  <input type="number" value={newMemberFullPct} onChange={(e) => setNewMemberFullPct(Number(e.target.value))} className={`w-full mt-1 rounded-xl px-2 py-2 text-xs font-mono border ${theme.inputBg}`} />
                </div>
              </div>
              {isDirector && (
                <div>
                  <label className={`text-[11px] font-bold uppercase ${theme.textMuted}`}>Filière</label>
                  <select value={newMemberRecruitedBy} onChange={(e) => setNewMemberRecruitedBy(e.target.value)} className={`w-full mt-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}>
                    <option value="">Direct Agence (Antoine)</option>
                    <option value="martin">Filière Martin (Override 10%)</option>
                  </select>
                </div>
              )}
              <div className="pt-2 flex gap-2">
                <button type="button" onClick={() => setShowAddMemberModal(false)} className={`flex-1 py-2.5 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMuted}`}>Annuler</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL CHANGER MON MOT DE PASSE ── */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-sm w-full space-y-4 ${theme.modalBg}`}>
            <div className={`flex items-center justify-between pb-3 border-b ${theme.border}`}>
              <h3 className={`font-extrabold text-base flex items-center gap-2 ${theme.textMain}`}>
                <KeyRound className="w-4 h-4 text-indigo-500" /> Mon mot de passe
              </h3>
              <button onClick={() => setShowChangePinModal(false)} className={theme.textSoft}>✕</button>
            </div>
            <p className={`text-xs ${theme.textMuted}`}>
              Dès que vous créez votre mot de passe personnel, il est masqué automatiquement sur l'écran de connexion.
            </p>
            <form onSubmit={handleSaveOwnPin} className="space-y-3">
              <input type="password" required minLength={4} maxLength={20} value={newPinValue} onChange={(e) => { setNewPinValue(e.target.value); setChangePinError(""); }} placeholder="Nouveau mot de passe (min. 4 car.)" className={`w-full rounded-xl px-3.5 py-2.5 text-sm font-mono border ${theme.inputBg}`} />
              <input type="password" required minLength={4} maxLength={20} value={confirmPinValue} onChange={(e) => { setConfirmPinValue(e.target.value); setChangePinError(""); }} placeholder="Confirmer le mot de passe" className={`w-full rounded-xl px-3.5 py-2.5 text-sm font-mono border ${theme.inputBg}`} />
              {changePinError && <p className="text-xs text-rose-500 font-bold text-center">{changePinError}</p>}
              <div className="pt-1 flex gap-2">
                <button type="button" onClick={() => setShowChangePinModal(false)} className={`flex-1 py-2.5 rounded-xl border text-xs font-bold ${theme.subCard} ${theme.textMuted}`}>Annuler</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function LeadCard({
  lead,
  members,
  todayIso,
  theme,
  onDragStart,
  onEdit,
  onCall,
  onNext,
  nextLabel,
  onWin,
  onPdf,
}: {
  lead: Lead;
  members: TeamMember[];
  todayIso: string;
  theme: typeof CRM_THEMES[CrmThemeId];
  onDragStart: () => void;
  onEdit: () => void;
  onCall: () => void;
  onNext?: () => void;
  nextLabel: string;
  onWin?: () => void;
  onPdf: () => void;
}) {
  const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === lead.serviceId);
  const closer = members.find((m) => m.id === lead.closerId);
  const setter = members.find((m) => m.id === lead.setterId);
  const isDue = lead.followUpDate && lead.followUpDate <= todayIso;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`p-3.5 rounded-2xl border cursor-grab active:cursor-grabbing transition-all hover:-translate-y-0.5 space-y-2 ${theme.card} ${theme.cardHover}`}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-base">{svc?.icon || "🌐"}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-black text-indigo-600 dark:text-amber-300 font-mono">
            {formatPricePeriod(lead.value, lead.billing)}
          </span>
          <button onClick={onEdit} className={`${theme.textSoft} hover:text-indigo-500`} title="Modifier">
            <Pencil className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div>
        <h4 className={`font-extrabold text-xs ${theme.textMain}`}>{lead.name}</h4>
        <p className={`text-[10px] truncate ${theme.textMuted}`}>
          {lead.contact} · {lead.phone}
        </p>
      </div>

      <p className={`text-[10px] p-2 rounded-xl border leading-snug ${theme.subCard} ${theme.textMuted}`}>
        {lead.issue}
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        {lead.stage === "mockup" && lead.mockupReady && (
          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
            ✓ Maquette prête
          </span>
        )}
        {lead.followUpDate && (
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 ${
              isDue
                ? "bg-rose-500 text-white"
                : `${theme.subCard} ${theme.textMuted}`
            }`}
          >
            <Calendar className="w-2.5 h-2.5" /> {lead.followUpDate}
          </span>
        )}
        {lead.setterId !== lead.closerId && (
          <span className="text-[9px] font-bold text-indigo-500">
            {setter?.shortName} → {closer?.shortName}
          </span>
        )}
      </div>

      <div className={`pt-2 border-t flex items-center justify-between gap-1 ${theme.border}`}>
        <button onClick={onCall} className="text-[10px] font-extrabold text-indigo-600 dark:text-amber-300 flex items-center gap-1">
          <Phone className="w-3 h-3" /> Appel
        </button>
        <button onClick={onPdf} className={`text-[10px] font-bold flex items-center gap-0.5 ${theme.textMuted}`}>
          <FileText className="w-3 h-3 text-amber-500" /> PDF
        </button>
        <div className="flex items-center gap-1">
          {onNext && (
            <button
              onClick={onNext}
              className="text-[10px] font-bold px-2 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-200"
            >
              {nextLabel}
            </button>
          )}
          {onWin && (
            <button
              onClick={onWin}
              title="Marquer signé"
              className="p-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-300"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
