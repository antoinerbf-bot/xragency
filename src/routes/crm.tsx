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
import { BUSINESS_SECTORS, getSectorServicePlaybook } from "@/lib/crm/schoolScripts";
import { SchoolModule } from "@/components/crm/SchoolModule";
import { ContestLeaderboard } from "@/components/crm/ContestLeaderboard";
import { DirectorPersonalHub } from "@/components/crm/DirectorPersonalHub";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM XR Agency — Espace Commercial, Direction & XR School" },
      { name: "description", content: "Système d'exploitation commercial, formation XR School et production XR Agency." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: XrAgencyCrmApp,
});

// ── Synthétiseur audio natif léger (Web Audio API · zéro dépendance externe) ──

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
  playTone(587.33, "sine", 0.22);
  playTone(880, "sine", 0.35, 0.07);
}

function playFanfare() {
  playTone(523.25, "triangle", 0.14, 0);
  playTone(659.25, "triangle", 0.14, 0.11);
  playTone(783.99, "triangle", 0.18, 0.22);
  playTone(1046.5, "triangle", 0.45, 0.34);
}

type CrmTab = "kanban" | "cockpit" | "contest" | "school" | "finances" | "studio" | "qg";

export function XrAgencyCrmApp() {
  // ── Équipe dynamique persistée (Antoine & Martin peuvent ajouter/ajuster les barèmes) ──
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

  // ── Session utilisateur & Accès libre XR School (PIN 1234) ──
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("xr_crm_user_v3") || null;
    }
    return null;
  });

  const currentUser = useMemo(
    () => members.find((m) => m.id === currentUserId) || null,
    [members, currentUserId]
  );

  const [schoolGuestMode, setSchoolGuestMode] = useState(false);

  // État écran de connexion simplifié
  const [pendingMember, setPendingMember] = useState<TeamMember | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [schoolPinModal, setSchoolPinModal] = useState(false);
  const [schoolPinInput, setSchoolPinInput] = useState("");
  const [schoolPinError, setSchoolPinError] = useState("");

  // ── Données CRM (Zéro client fictif par défaut !) ──
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

  const [activeTab, setActiveTab] = useState<CrmTab>("kanban");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLeadForCockpit, setActiveLeadForCockpit] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [openObjIdx, setOpenObjIdx] = useState<number | null>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastWonLead, setLastWonLead] = useState<Lead | null>(null);

  // Mode Sprint Focus 25 min & Quête Appels du jour
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintSeconds, setSprintSeconds] = useState(25 * 60);
  const [dailyCalls, setDailyCalls] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("xr_daily_calls_v3") || "0");
    }
    return 0;
  });

  // Modal Ajout Express Prospect (5s)
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
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

  // Modal Ajout Recrue / Membre (Antoine & Martin)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<UserRoleType>("closer");
  const [newMemberSettingPct, setNewMemberSettingPct] = useState(10);
  const [newMemberClosingPct, setNewMemberClosingPct] = useState(20);
  const [newMemberFullPct, setNewMemberFullPct] = useState(20);
  const [newMemberPin, setNewMemberPin] = useState("1234");
  const [newMemberRecruitedBy, setNewMemberRecruitedBy] = useState<string>("");

  // Modal Modification Mot de Passe personnel (pour chaque utilisateur)
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [newPinValue, setNewPinValue] = useState("");
  const [confirmPinValue, setConfirmPinValue] = useState("");
  const [changePinError, setChangePinError] = useState("");

  // Persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_crm_leads_v3", JSON.stringify(leads));
    }
  }, [leads]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_crm_members_v4", JSON.stringify(members));
    }
  }, [members]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentUserId) localStorage.setItem("xr_crm_user_v3", currentUserId);
      else localStorage.removeItem("xr_crm_user_v3");
    }
  }, [currentUserId]);

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

  // ── Filtrage RBAC strict des leads visibles par l'utilisateur connecté ──
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

  // Relances urgentes aujourd'hui
  const todayIso = new Date().toISOString().slice(0, 10);
  const dueFollowUpsCount = useMemo(
    () =>
      myVisibleLeads.filter(
        (l) => l.stage !== "won" && l.followUpDate && l.followUpDate <= todayIso
      ).length,
    [myVisibleLeads, todayIso]
  );

  // ── Calcul financier & commissions STRICTEMENT filtré par droits RBAC ──
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
    const cashWon = wonVisible
      .filter((l) => l.billing !== "month")
      .reduce((s, l) => s + l.value, 0);
    const mrrWon = wonVisible
      .filter((l) => l.billing === "month")
      .reduce((s, l) => s + l.value, 0);
    const pipelineValue = myVisibleLeads
      .filter((l) => l.stage !== "won")
      .reduce((s, l) => s + l.value, 0);

    const visibleMembers = members.filter(
      (m) => m.roleType !== "studio" && canViewMemberFinances(currentUser, m)
    );

    const visibleMemberRows = visibleMembers.map((member) => {
      let ownSalesOneShot = 0;
      let ownSalesMrr = 0;
      let unlockedCom = 0;
      let pendingCom = 0;
      let overrideCom = 0;

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
            overrideCom += b.managerOverrideAmount;
            earnedOnDeal += b.managerOverrideAmount;
          }

          if (earnedOnDeal > 0) {
            if (deal.commissionStatus === "unlocked") unlockedCom += earnedOnDeal;
            else pendingCom += earnedOnDeal;
          }
        });

      return {
        member,
        ownSalesOneShot,
        ownSalesMrr,
        overrideCom,
        unlockedCom,
        pendingCom,
      };
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
      setPinError("Code PIN incorrect. Veuillez réessayer.");
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
      setSchoolPinError("Mot de passe XR School incorrect.");
    }
  };

  const moveStage = (leadId: string, newStage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l;
        if (newStage === "won" && l.stage !== "won") {
          setLastWonLead(l);
          setShowCelebration(true);
          if (soundEnabled) playFanfare();
          setTimeout(() => setShowCelebration(false), 5000);
          return {
            ...l,
            stage: newStage,
            commissionStatus: "pending_payment",
            studioStatus: "pending",
          };
        }
        if (soundEnabled) playDing();
        return { ...l, stage: newStage };
      })
    );
  };

  const handleSaveEditedLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    setLeads((prev) => prev.map((l) => (l.id === editingLead.id ? editingLead : l)));
    if (activeLeadForCockpit?.id === editingLead.id) setActiveLeadForCockpit(editingLead);
    setEditingLead(null);
    if (soundEnabled) playDing();
  };

  const handleDeleteLead = (leadId: string) => {
    if (!confirm("Supprimer définitivement ce prospect ?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    if (editingLead?.id === leadId) setEditingLead(null);
    if (activeLeadForCockpit?.id === leadId) setActiveLeadForCockpit(null);
  };

  const handleUnlockCommission = (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, commissionStatus: "unlocked" } : l))
    );
    if (soundEnabled) playFanfare();
  };

  const handleUpdateStudioStatus = (leadId: string, status: "pending" | "in_production" | "delivered") => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, studioStatus: status } : l))
    );
    if (soundEnabled) playDing();
  };

  const handleToggleMockupReady = (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, mockupReady: !l.mockupReady } : l))
    );
    if (soundEnabled) playDing();
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !currentUser) return;

    const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === formServiceId) || XR_OFFICIAL_SERVICES[0];
    const plan = svc.plans.find((p) => p.id === formPlanId) || svc.plans[0];

    const setterId = formSetterId || currentUser.id;
    const closerId = formCloserId || currentUser.id;

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
      setterId,
      closerId,
      issue: formIssue.trim() || "Diagnostic & modernisation digitale XR Agency",
      notes: "",
      createdAt: new Date().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      commissionStatus: "estimated",
    };

    setLeads([newLead, ...leads]);
    if (soundEnabled) playDing();
    setFormName("");
    setFormContact("");
    setFormPhone("");
    setFormWebsite("");
    setFormFollowUp("");
    setFormIssue("");
    setShowNewLeadModal(false);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !currentUser) return;

    const short = newMemberName.trim().split(" ")[0];
    const id = `${short.toLowerCase().replace(/[^a-z0-9]/g, "")}-${Date.now().toString().slice(-3)}`;

    const roleMeta: Record<UserRoleType, { label: string; badge: string; bg: string }> = {
      setter: { label: "Setter B2B", badge: "📞 Setter", bg: "from-cyan-500 to-blue-700" },
      closer: { label: "Closer B2B", badge: "🎯 Closer", bg: "from-purple-500 to-violet-700" },
      full_cycle: { label: "Commercial Full-Cycle", badge: "⚡ Full-Cycle", bg: "from-emerald-500 to-teal-700" },
      student: { label: "Élève XR School · Commercial", badge: "🎓 Élève XR School", bg: "from-amber-600 to-orange-700" },
      manager: { label: "Manager Équipe", badge: "👥 Manager", bg: "from-blue-500 to-indigo-600" },
      studio: { label: "Studio Production", badge: "🎨 Studio", bg: "from-zinc-600 to-zinc-900" },
      direction: { label: "Direction", badge: "👑 Direction", bg: "from-amber-400 to-orange-600" },
    };

    const meta = roleMeta[newMemberRole];
    const recruitedBy =
      currentUser.roleType === "manager"
        ? currentUser.id
        : newMemberRecruitedBy || undefined;

    const created: TeamMember = {
      id,
      name: newMemberName.trim(),
      shortName: short,
      roleLabel: meta.label,
      roleType: newMemberRole,
      recruitedBy,
      settingRate: Math.max(0, Math.min(100, newMemberSettingPct)) / 100,
      closingRate: Math.max(0, Math.min(100, newMemberClosingPct)) / 100,
      fullCycleRate: Math.max(0, Math.min(100, newMemberFullPct)) / 100,
      avatarBg: meta.bg,
      badge: meta.badge,
      pin: newMemberPin.trim() || "1234",
    };

    setMembers([...members, created]);
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
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, [field]: clean } : m)));
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
      prev.map((m) =>
        m.id === currentUser.id ? { ...m, pin: clean, customPinSet: true } : m
      )
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
    const lines = [
      `• Livrable : ${svc.deliverable}`,
      `• Besoin ciblé : ${lead.issue}`,
      "• Accompagnement dédié XR Agency jusqu'à la mise en service",
    ];
    lines.forEach((txt) => {
      const split = doc.splitTextToSize(txt, W - 2 * M - 10);
      doc.text(split, M + 5, y);
      y += split.length * 4.5 + 1.5;
    });

    y += 10;
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

    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("CONDITIONS DE RÈGLEMENT", M, y + 7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    if (lead.billing === "month") {
      doc.text("• Abonnement mensuel sans frais cachés", M, y + 14);
      doc.text("• Premier règlement au démarrage de la mission", M, y + 20);
    } else {
      doc.text(`• Acompte 50 % au lancement : ${Math.round(lead.value * 0.5)} €`, M, y + 14);
      doc.text(`• Solde 50 % à la livraison : ${Math.round(lead.value * 0.5)} €`, M, y + 20);
    }

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
  };

  // ═══════════════════════════════════════════════════════════
  // MODE ACCÈS LIBRE XR SCHOOL (MOT DE PASSE 1234 · FORMATION PURE)
  // ═══════════════════════════════════════════════════════════
  if (schoolGuestMode && !currentUser) {
    return (
      <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] font-sans">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 py-5">
          <header className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-violet-600 flex items-center justify-center font-black text-black text-base">
                XR
              </div>
              <div>
                <h1 className="text-base font-bold text-white">XR SCHOOL · ESPACE FORMATION</h1>
                <p className="text-[11px] text-white/50">Formation pure · Trames sectorielles, Dojo objections & Modules</p>
              </div>
            </div>
            <button
              onClick={() => setSchoolGuestMode(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white border border-white/[0.08]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour à la connexion
            </button>
          </header>

          <SchoolModule currentUser={null} onSound={() => soundEnabled && playDing()} />
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // ÉCRAN DE CONNEXION ULTRA-ÉPURÉ, CHARMANT & SÉCURISÉ
  // ═══════════════════════════════════════════════════════════
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col justify-center items-center px-4 py-10 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] bg-gradient-to-tr from-amber-500/12 via-violet-600/10 to-transparent blur-[130px] pointer-events-none" />

        <div className="max-w-4xl w-full relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex h-16 w-16 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-violet-600 items-center justify-center font-black text-black shadow-2xl shadow-amber-500/20 text-2xl">
              XR
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              XR AGENCY · ESPACE ÉQUIPE
            </h1>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Interface privée et cloisonnée par profil. Sélectionnez votre carte pour ouvrir votre espace, ou accédez à XR School.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                setSchoolPinModal(true);
                setSchoolPinInput("");
                setSchoolPinError("");
              }}
              className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600/25 via-amber-500/15 to-violet-600/25 hover:from-violet-600/35 hover:to-amber-500/25 border border-amber-400/30 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
            >
              <GraduationCap className="w-5 h-5 text-amber-300" />
              Accéder à XR School (Formation Pure · Trames & Dojo)
              <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-black/50 text-amber-300 border border-amber-400/30">
                Code : 1234
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
                  className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-amber-400/40 transition-all shadow-md hover:scale-[1.015] active:scale-[0.98] flex items-center gap-3.5 text-left"
                >
                  <div
                    className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white font-bold text-base shadow-lg shrink-0`}
                  >
                    {member.shortName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                      {member.name}
                    </h3>
                    <p className="text-[11px] text-white/50 truncate">{member.roleLabel}</p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.06] text-amber-300/90 border border-white/[0.06]">
                        {member.badge}
                      </span>
                      {showPublicCode ? (
                        <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                          Code : {member.pin}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.05] text-white/45 border border-white/[0.06]">
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

          <p className="text-center text-[11px] text-white/40">
            Une fois connecté, chaque membre peut créer son propre mot de passe confidentiel (il sera alors masqué automatiquement).
          </p>
        </div>

        {/* Modal PIN Profil Membre */}
        {pendingMember && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0f131d] border border-white/[0.12] rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${pendingMember.avatarBg} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {pendingMember.shortName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{pendingMember.name}</h3>
                  <p className="text-xs text-white/50">{pendingMember.roleLabel}</p>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold uppercase text-white/60 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                      Code / Mot de passe
                    </label>
                    {pendingMember.id !== "antoine" && !pendingMember.customPinSet && (
                      <span className="text-[11px] font-mono font-bold text-emerald-300">
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
                    className="w-full mt-2 bg-black/40 border border-white/[0.12] rounded-xl px-4 py-3 text-center text-xl tracking-[0.35em] font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                  {pinError && <p className="text-xs text-red-400 mt-2 text-center">{pinError}</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPendingMember(null)}
                    className="flex-1 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white/70"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold shadow-lg shadow-amber-400/20"
                  >
                    Ouvrir mon espace
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Mot de Passe XR School (1234) */}
        {schoolPinModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0f131d] border border-amber-400/25 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-violet-600 flex items-center justify-center text-black">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Accès XR School</h3>
                  <p className="text-xs text-white/50">Espace formation pure · Ouvert à toute l'équipe</p>
                </div>
              </div>

              <form onSubmit={handleSchoolPinSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    Mot de passe de l'école
                  </label>
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
                    placeholder="••••"
                    className="w-full mt-2 bg-black/40 border border-white/[0.12] rounded-xl px-4 py-3 text-center text-xl tracking-[0.5em] font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                  {schoolPinError && (
                    <p className="text-xs text-red-400 mt-2 text-center">{schoolPinError}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSchoolPinModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white/70"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold shadow-lg"
                  >
                    Entrer dans XR School
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
  // INTERFACE PRINCIPALE CONNECTÉE (CLOISONNÉE PAR RÔLE)
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
        { id: "cockpit", label: "📞 Cockpit Appel", count: null },
        { id: "contest", label: "🏆 Concours Équipe", count: null },
        { id: "school", label: "🎓 XR School", count: null },
        {
          id: "finances",
          label: isDirector ? "💰 Finances & Équipe" : isManager ? "💰 Mes Gains & Filière" : "💰 Mes Commissions",
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
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] font-sans selection:bg-amber-400/30 selection:text-amber-200">
      {/* Bandeau célébration closing */}
      {showCelebration && lastWonLead && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-600 text-white shadow-2xl shadow-emerald-500/30 border border-white/20">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-bold text-base tracking-wide uppercase">
                VENTE VALIDÉE ! {lastWonLead.name}
              </p>
              <p className="text-xs text-white/90">
                +100 points au concours d'équipe · Brief transmis au Studio !
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-5">
        {/* HEADER ÉPURÉ */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div
              className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${currentUser.avatarBg} flex items-center justify-center font-bold text-white shadow-lg text-base`}
            >
              {currentUser.shortName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">{currentUser.name}</h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  {currentUser.badge}
                </span>
                {dueFollowUpsCount > 0 && !isStudio && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                    🔔 {dueFollowUpsCount} relance(s) due(s)
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50">
                {isDirector
                  ? "Direction Générale · Vue globale, gestion équipe & QG privé"
                  : isManager
                  ? "Accès Manager · Vos ventes + candidats de votre filière uniquement"
                  : isStudio
                  ? "Pôle Production · Maquettes demandées & projets signés à livrer"
                  : "Espace confidentiel · Uniquement vos prospects et vos propres commissions"}
              </p>
            </div>
          </div>

          {/* Barre motivation personnelle */}
          {!isStudio && (
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-4 py-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-white/50">📞 Appels du jour :</span>
                <span className="font-mono font-bold text-amber-300">{dailyCalls} / 10</span>
                <button
                  onClick={handleIncrementCall}
                  className="px-2 py-0.5 rounded-md bg-white/[0.08] hover:bg-white/[0.16] text-[10px] font-bold text-white"
                >
                  +1
                </button>
              </div>
              <span className="text-white/15">|</span>
              <div className="flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white/50">Mes gains validés :</span>
                <span className="font-mono font-bold text-emerald-400">
                  {financeView.myCommissionUnlocked.toLocaleString("fr-FR")} €
                </span>
              </div>
            </div>
          )}

          {/* Actions rapides Header */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
            {!isStudio && (
              <button
                onClick={() => {
                  setSprintActive(!sprintActive);
                  if (soundEnabled) playDing();
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  sprintActive
                    ? "bg-amber-400/20 border-amber-400/40 text-amber-300 animate-pulse"
                    : "bg-white/[0.04] border-white/[0.08] text-white/70 hover:text-white"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {sprintActive
                  ? `${Math.floor(sprintSeconds / 60)}:${(sprintSeconds % 60).toString().padStart(2, "0")}`
                  : "Sprint 25m"}
              </button>
            )}

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Sons activés" : "Sons coupés"}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>

            {!isStudio && (
              <button
                onClick={() => {
                  setFormSetterId(currentUser.id);
                  setFormCloserId(currentUser.id);
                  setShowNewLeadModal(true);
                  if (soundEnabled) playDing();
                }}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Nouveau Prospect (5s)
              </button>
            )}

            <button
              onClick={() => {
                setNewPinValue("");
                setConfirmPinValue("");
                setChangePinError("");
                setShowChangePinModal(true);
              }}
              title="Créer ou modifier mon mot de passe personnel"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-amber-300 transition-all"
            >
              <KeyRound className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentUserId(null);
                setActiveLeadForCockpit(null);
              }}
              title="Déconnexion"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-red-500/15 border border-white/[0.08] text-white/60 hover:text-red-400 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* NAVIGATION ONGLETS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.08] mt-5 pb-2 gap-3">
          <nav className="flex flex-wrap gap-1.5">
            {allowedTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (soundEnabled) playDing();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-white/[0.1] text-white border border-white/[0.14] shadow-sm"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      activeTab === tab.id ? "bg-amber-400/20 text-amber-300" : "bg-white/[0.06] text-white/50"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 border border-white/[0.08] text-xs"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  CSV
                </button>
              )}
              <div className="flex-1 sm:w-60 flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs">
                <Search className="w-3.5 h-3.5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un prospect..."
                  className="bg-transparent border-none outline-none text-white text-xs placeholder:text-white/30 w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── VUE 1 : PIPELINE KANBAN (5 ÉTAPES · ZÉRO CLIENT FICTIF) ── */}
        {activeTab === "kanban" && !isStudio && (
          <div className="mt-6">
            {myVisibleLeads.length === 0 ? (
              <div className="text-center py-16 px-6 bg-white/[0.02] border border-white/[0.08] rounded-3xl max-w-xl mx-auto space-y-4">
                <div className="h-16 w-16 rounded-3xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-3xl mx-auto">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-white">Votre espace commercial est prêt</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Aucun client fictif ici. Ajoutez votre premier vrai prospect en 5 secondes pour lancer votre pipeline et grimper au concours d'équipe.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setFormSetterId(currentUser.id);
                      setFormCloserId(currentUser.id);
                      setShowNewLeadModal(true);
                    }}
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs px-5 py-3 rounded-xl shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter mon premier prospect
                  </button>
                  <button
                    onClick={() => setActiveTab("school")}
                    className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold text-xs px-4 py-3 rounded-xl border border-white/[0.08]"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                    Ouvrir XR School
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3.5">
                <KanbanCol
                  title="1. Nouveaux"
                  subtitle="Prospection / Cold call"
                  color="border-blue-500/25 bg-blue-500/[0.04]"
                  dot="bg-blue-400"
                  count={filteredLeads.filter((l) => l.stage === "new").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "new")
                    .map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        members={members}
                        todayIso={todayIso}
                        onEdit={() => setEditingLead(lead)}
                        onCall={() => {
                          setActiveLeadForCockpit(lead);
                          setActiveTab("cockpit");
                        }}
                        onNext={() => moveStage(lead.id, "rdv")}
                        nextLabel="RDV Posé →"
                        onWin={() => moveStage(lead.id, "won")}
                        onPdf={() => generatePdfQuote(lead)}
                      />
                    ))}
                </KanbanCol>

                <KanbanCol
                  title="2. RDV / Qualifié"
                  subtitle="Passation Setter → Closer"
                  color="border-cyan-500/25 bg-cyan-500/[0.04]"
                  dot="bg-cyan-400"
                  count={filteredLeads.filter((l) => l.stage === "rdv").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "rdv")
                    .map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        members={members}
                        todayIso={todayIso}
                        onEdit={() => setEditingLead(lead)}
                        onCall={() => {
                          setActiveLeadForCockpit(lead);
                          setActiveTab("cockpit");
                        }}
                        onNext={() => moveStage(lead.id, "mockup")}
                        nextLabel="Maquette →"
                        onWin={() => moveStage(lead.id, "won")}
                        onPdf={() => generatePdfQuote(lead)}
                      />
                    ))}
                </KanbanCol>

                <KanbanCol
                  title="3. Maquette en cours"
                  subtitle="Transmis au Studio + Concours"
                  color="border-amber-500/25 bg-amber-500/[0.04]"
                  dot="bg-amber-400"
                  count={filteredLeads.filter((l) => l.stage === "mockup").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "mockup")
                    .map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        members={members}
                        todayIso={todayIso}
                        onEdit={() => setEditingLead(lead)}
                        onCall={() => {
                          setActiveLeadForCockpit(lead);
                          setActiveTab("cockpit");
                        }}
                        onNext={() => moveStage(lead.id, "negociation")}
                        nextLabel="Négocier →"
                        onWin={() => moveStage(lead.id, "won")}
                        onPdf={() => generatePdfQuote(lead)}
                      />
                    ))}
                </KanbanCol>

                <KanbanCol
                  title="4. Négociation"
                  subtitle="Closing décisif"
                  color="border-violet-500/25 bg-violet-500/[0.04]"
                  dot="bg-violet-400"
                  count={filteredLeads.filter((l) => l.stage === "negociation").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "negociation")
                    .map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        members={members}
                        todayIso={todayIso}
                        onEdit={() => setEditingLead(lead)}
                        onCall={() => {
                          setActiveLeadForCockpit(lead);
                          setActiveTab("cockpit");
                        }}
                        onNext={() => moveStage(lead.id, "won")}
                        nextLabel="Signer 🎉"
                        onWin={() => moveStage(lead.id, "won")}
                        onPdf={() => generatePdfQuote(lead)}
                      />
                    ))}
                </KanbanCol>

                <KanbanCol
                  title="5. Signés 🎉"
                  subtitle="Transmis au Studio"
                  color="border-emerald-500/25 bg-emerald-500/[0.04]"
                  dot="bg-emerald-400"
                  count={filteredLeads.filter((l) => l.stage === "won").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "won")
                    .map((lead) => {
                      const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === lead.serviceId);
                      return (
                        <div
                          key={lead.id}
                          className="p-3.5 rounded-xl bg-white/[0.05] border border-emerald-500/30 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span>{svc?.icon || "🏆"}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                                {formatPricePeriod(lead.value, lead.billing)}
                              </span>
                              <button
                                onClick={() => setEditingLead(lead)}
                                className="text-white/40 hover:text-white"
                                title="Modifier"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <h4 className="font-bold text-xs text-white">{lead.name}</h4>
                          <p className="text-[11px] text-white/50">{lead.planLabel}</p>
                          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px]">
                            <button
                              onClick={() => generatePdfQuote(lead)}
                              className="inline-flex items-center gap-1 text-white/70 hover:text-white"
                            >
                              <FileText className="w-3 h-3 text-amber-400" />
                              Devis PDF
                            </button>
                            <span
                              className={
                                lead.commissionStatus === "unlocked"
                                  ? "text-emerald-400 font-bold"
                                  : "text-amber-300"
                              }
                            >
                              {lead.commissionStatus === "unlocked" ? "✓ Payé" : "⏳ Attente virement"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </KanbanCol>
              </div>
            )}
          </div>
        )}

        {/* ── VUE 2 : COCKPIT D'APPEL CONNECTÉ AUX TRAMES SECTORIELLES ── */}
        {activeTab === "cockpit" && !isStudio && (
          <div className="mt-6">
            {myVisibleLeads.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white/[0.02] border border-white/[0.08] rounded-3xl max-w-lg mx-auto space-y-3">
                <p className="text-sm text-white/60">
                  Ajoutez un prospect dans votre pipeline pour ouvrir son cockpit d'appel personnalisé.
                </p>
                <button
                  onClick={() => setShowNewLeadModal(true)}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold"
                >
                  + Ajouter un prospect
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 space-y-2 max-h-[640px] overflow-y-auto">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                    Mes Prospects ({myVisibleLeads.length})
                  </h3>
                  {myVisibleLeads.map((l) => {
                    const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === l.serviceId);
                    const selected = (activeLeadForCockpit?.id || myVisibleLeads[0].id) === l.id;
                    return (
                      <button
                        key={l.id}
                        onClick={() => setActiveLeadForCockpit(l)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          selected
                            ? "bg-amber-400/15 border-amber-400/40"
                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white truncate">
                            {svc?.icon} {l.name}
                          </span>
                          <span className="text-[11px] font-mono text-amber-300 shrink-0 ml-2">
                            {formatPricePeriod(l.value, l.billing)}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50 truncate mt-0.5">
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

                  return (
                    <div className="lg:col-span-8 space-y-4">
                      <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>{svc.icon}</span>
                            {target.name}
                          </h2>
                          <p className="text-xs text-white/60 mt-0.5">
                            Contact : <strong className="text-white">{target.contact}</strong> ·{" "}
                            <span className="text-amber-300 font-mono">{target.phone}</span> ·{" "}
                            <span>{playbook.sector.icon} {playbook.sector.name}</span>
                          </p>
                          <p className="text-xs text-amber-200/90 mt-2">
                            <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                            {target.issue}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`tel:${target.phone.replace(/\s+/g, "")}`}
                            onClick={handleIncrementCall}
                            className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-3.5 py-2.5 rounded-xl"
                          >
                            <Phone className="w-3.5 h-3.5" /> Appeler
                          </a>
                          <a
                            href={`https://wa.me/${target.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              playbook.setting.dm1
                                .replace(/\[Prénom\]/g, target.contact)
                                .replace(/\[Nom Entreprise\]/g, target.name)
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-white/10"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp
                          </a>
                          <button
                            onClick={() => generatePdfQuote(target)}
                            className="inline-flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-white/10"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-400" /> Devis PDF
                          </button>
                          <button
                            onClick={() => moveStage(target.id, "won")}
                            className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs px-3.5 py-2.5 rounded-xl"
                          >
                            <Trophy className="w-3.5 h-3.5" /> Signé !
                          </button>
                        </div>
                      </div>

                      {svc.upsellHint && (
                        <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-400/25 text-xs text-violet-200 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-violet-300 shrink-0" />
                          <span>
                            <strong>Astuce Upsell :</strong> {svc.upsellHint}
                          </span>
                        </div>
                      )}

                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                          Accroche adaptée ({playbook.sector.name} × {svc.shortName})
                        </h3>
                        <p className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-white/90 leading-relaxed">
                          {playbook.coldCall.opener
                            .replace(/\[Prénom\]/g, target.contact)
                            .replace(/\[Mon Prénom\]/g, currentUser.shortName)
                            .replace(/\[Nom Entreprise\]/g, target.name)}
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4" /> Répliques Objections ({svc.shortName})
                        </h3>
                        {playbook.objections.map((obj, idx) => (
                          <div key={idx} className="rounded-xl border border-white/[0.08] bg-black/25 overflow-hidden">
                            <button
                              onClick={() => setOpenObjIdx(openObjIdx === idx ? null : idx)}
                              className="w-full flex items-center justify-between p-3 text-left text-xs font-semibold text-amber-300"
                            >
                              <span>{obj.q}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${openObjIdx === idx ? "rotate-180" : ""}`} />
                            </button>
                            {openObjIdx === idx && (
                              <div className="px-3 pb-3 text-xs text-emerald-200 font-mono leading-relaxed">
                                {obj.a}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ── VUE 3 : CONCOURS D'ÉQUIPE PARTAGÉ (MAQUETTES & SERVICES VENDUS) ── */}
        {activeTab === "contest" && !isStudio && (
          <ContestLeaderboard allLeads={leads} members={members} currentUser={currentUser} />
        )}

        {/* ── VUE 4 : XR SCHOOL (FORMATION PURE · 70 TRAMES + DOJO) ── */}
        {activeTab === "school" && (
          <SchoolModule currentUser={currentUser} onSound={() => soundEnabled && playDing()} />
        )}

        {/* ── VUE 5 : FINANCES & COMMISSIONS (STRICTEMENT CLOISONNÉES PAR RÔLE) ── */}
        {activeTab === "finances" && !isStudio && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-[11px] text-white/50 uppercase font-semibold">
                  {isDirector ? "CA One-Shot Agence" : "Mon CA One-Shot"}
                </p>
                <p className="text-2xl font-black text-emerald-400 mt-1.5 font-mono">
                  {financeView.cashWon.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-[11px] text-white/50 uppercase font-semibold">
                  {isDirector ? "MRR Mensuel Agence" : "Mon MRR Mensuel"}
                </p>
                <p className="text-2xl font-black text-blue-400 mt-1.5 font-mono">
                  {financeView.mrrWon.toLocaleString("fr-FR")} €/m
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-[11px] text-white/50 uppercase font-semibold">Commissions Débloquées</p>
                <p className="text-2xl font-black text-amber-300 mt-1.5 font-mono">
                  {financeView.myCommissionUnlocked.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-[11px] text-white/50 uppercase font-semibold">En Attente Virement</p>
                <p className="text-2xl font-black text-violet-300 mt-1.5 font-mono">
                  {financeView.myCommissionPending.toLocaleString("fr-FR")} €
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    {isDirector
                      ? "Gestion des barèmes & commissions — Toute l'équipe"
                      : isManager
                      ? "Vos commissions & candidats de votre filière (Override 10%)"
                      : "Mes commissions personnelles (Confidentiel)"}
                  </h3>
                  <p className="text-[11px] text-white/40 mt-0.5">
                    Cloisonnement strict : personne ne peut consulter les taux ni les gains d'un autre commercial.
                  </p>
                </div>

                {(isDirector || isManager) && (
                  <button
                    onClick={() => {
                      setNewMemberRecruitedBy(isManager ? currentUser.id : "");
                      setShowAddMemberModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    {isManager ? "Ajouter un candidat (ma filière)" : "Ajouter un membre"}
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-white/40 uppercase text-[10px]">
                      <th className="pb-3">Membre</th>
                      <th className="pb-3">Barème (Setting / Closing / Full)</th>
                      <th className="pb-3">One-Shot</th>
                      <th className="pb-3">MRR</th>
                      <th className="pb-3">En attente</th>
                      <th className="pb-3 text-right">Débloqué</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {financeView.visibleMemberRows.map((row) => (
                      <tr key={row.member.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 font-bold text-white">
                          <div>{row.member.name}</div>
                          <div className="text-[10px] font-normal text-white/40">
                            {row.member.badge}
                            {row.member.recruitedBy === "martin" ? " · Filière Martin" : ""}
                          </div>
                        </td>
                        <td className="py-3 text-white/70 text-[11px]">
                          {row.member.roleType === "direction" ? (
                            "Direction Générale"
                          ) : isDirector ? (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <label className="inline-flex items-center gap-1 bg-black/30 px-2 py-1 rounded-lg border border-white/[0.08]">
                                <span className="text-[10px] text-white/40">Set</span>
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={Math.round(row.member.settingRate * 100)}
                                  onChange={(e) =>
                                    handleUpdateMemberRates(row.member.id, "settingRate", Number(e.target.value))
                                  }
                                  className="w-10 bg-transparent text-amber-300 font-mono text-right outline-none"
                                />
                                %
                              </label>
                              <label className="inline-flex items-center gap-1 bg-black/30 px-2 py-1 rounded-lg border border-white/[0.08]">
                                <span className="text-[10px] text-white/40">Close</span>
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={Math.round(row.member.closingRate * 100)}
                                  onChange={(e) =>
                                    handleUpdateMemberRates(row.member.id, "closingRate", Number(e.target.value))
                                  }
                                  className="w-10 bg-transparent text-amber-300 font-mono text-right outline-none"
                                />
                                %
                              </label>
                              <label className="inline-flex items-center gap-1 bg-black/30 px-2 py-1 rounded-lg border border-white/[0.08]">
                                <span className="text-[10px] text-white/40">Full</span>
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={Math.round(row.member.fullCycleRate * 100)}
                                  onChange={(e) =>
                                    handleUpdateMemberRates(row.member.id, "fullCycleRate", Number(e.target.value))
                                  }
                                  className="w-10 bg-transparent text-emerald-300 font-mono text-right outline-none"
                                />
                                %
                              </label>
                            </div>
                          ) : row.member.roleType === "manager" ? (
                            "20% Closing · 10% Setting · +10% Override recrues"
                          ) : (
                            `Setting ${Math.round(row.member.settingRate * 100)}% · Closing ${Math.round(
                              row.member.closingRate * 100
                            )}% · Full ${Math.round(row.member.fullCycleRate * 100)}%`
                          )}
                        </td>
                        <td className="py-3 font-mono text-white">
                          {row.ownSalesOneShot.toLocaleString("fr-FR")} €
                        </td>
                        <td className="py-3 font-mono text-blue-300">
                          {row.ownSalesMrr.toLocaleString("fr-FR")} €/m
                        </td>
                        <td className="py-3 font-mono text-amber-300">
                          {row.pendingCom.toLocaleString("fr-FR")} €
                        </td>
                        <td className="py-3 text-right font-mono font-bold text-emerald-400">
                          {row.unlockedCom.toLocaleString("fr-FR")} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── VUE 6 : STUDIO PRODUCTION (MAQUETTES DEMANDÉES + PROJETS SIGNÉS · ZÉRO FINANCE) ── */}
        {activeTab === "studio" && (isDirector || isStudio) && (
          <div className="mt-6 space-y-6">
            {/* Queue 1 : Maquettes demandées par les commerciaux */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-amber-400" />
                    1. Maquettes demandées par les commerciaux ({leads.filter((l) => l.stage === "mockup").length})
                  </h2>
                  <p className="text-xs text-white/55 mt-0.5">
                    Cochez « Maquette prête » dès que le visuel est envoyé : le commercial voit le feu vert immédiatement dans son pipeline.
                  </p>
                </div>
              </div>

              {leads.filter((l) => l.stage === "mockup").length === 0 ? (
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center text-xs text-white/40">
                  Aucune maquette en attente de création pour le moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leads
                    .filter((l) => l.stage === "mockup")
                    .map((item) => {
                      const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === item.serviceId);
                      const closer = members.find((m) => m.id === item.closerId);
                      return (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-amber-300">
                              {svc?.icon} {svc?.shortName}
                            </span>
                            <span className="text-[10px] text-white/50">Demandé par {closer?.shortName}</span>
                          </div>
                          <h4 className="font-bold text-sm text-white">{item.name}</h4>
                          {item.websiteUrl && (
                            <a
                              href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-blue-300 hover:underline"
                            >
                              <Globe className="w-3 h-3" /> {item.websiteUrl}
                            </a>
                          )}
                          <p className="p-2.5 rounded-xl bg-black/30 text-xs text-white/75">{item.issue}</p>
                          <button
                            onClick={() => handleToggleMockupReady(item.id)}
                            className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                              item.mockupReady
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-amber-400 hover:bg-amber-300 text-black"
                            }`}
                          >
                            {item.mockupReady ? "✓ Maquette prête & transmise" : "Marquer la maquette prête"}
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Queue 2 : Contrats Signés à produire et livrer */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  2. Projets Signés à Produire & Livrer ({leads.filter((l) => l.stage === "won").length})
                </h2>
              </div>

              {leads.filter((l) => l.stage === "won").length === 0 ? (
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center text-xs text-white/40">
                  Aucun projet signé en file de production pour l'instant.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leads
                    .filter((l) => l.stage === "won")
                    .map((deal) => {
                      const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === deal.serviceId);
                      return (
                        <div key={deal.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-amber-300">
                              {svc?.icon} {svc?.shortName}
                            </span>
                            <select
                              value={deal.studioStatus || "pending"}
                              onChange={(e) =>
                                handleUpdateStudioStatus(
                                  deal.id,
                                  e.target.value as "pending" | "in_production" | "delivered"
                                )
                              }
                              className="bg-[#121620] border border-white/[0.1] rounded-lg px-2 py-1 text-[10px] font-bold text-white"
                            >
                              <option value="pending">⏳ À démarrer</option>
                              <option value="in_production">⚙️ En production</option>
                              <option value="delivered">✅ Livré client</option>
                            </select>
                          </div>
                          <h4 className="font-bold text-sm text-white">{deal.name}</h4>
                          <p className="text-xs text-white/50">
                            {deal.planLabel} · Contact : {deal.contact} ({deal.phone})
                          </p>
                          <div className="p-3 rounded-xl bg-black/30 border border-white/[0.05] text-xs text-white/75">
                            {deal.issue}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── VUE 7 : QG PRIVÉ ANTOINE (VIE PRO + VIE PERSO · DIRECTION UNIQUEMENT) ── */}
        {activeTab === "qg" && isDirector && (
          <DirectorPersonalHub
            allLeads={leads}
            members={members}
            onUnlockCommission={handleUnlockCommission}
            onSound={() => soundEnabled && playDing()}
          />
        )}
      </div>

      {/* ── MODAL EXPRESS : AJOUT PROSPECT EN 5 SECONDES ── */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f131d] border border-white/[0.12] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Nouveau Prospect (5 secondes)
              </h3>
              <button onClick={() => setShowNewLeadModal(false)} className="text-white/40 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold uppercase text-white/60">Entreprise / Commerce *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nom de l'établissement"
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Contact</label>
                  <input
                    type="text"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    placeholder="Prénom & Nom"
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Téléphone *</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+33 6 ..."
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Site actuel (optionnel)</label>
                  <input
                    type="text"
                    value={formWebsite}
                    onChange={(e) => setFormWebsite(e.target.value)}
                    placeholder="ex: restaurant-exemple.fr"
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Date de relance</label>
                  <input
                    type="date"
                    value={formFollowUp}
                    onChange={(e) => setFormFollowUp(e.target.value)}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Secteur d'activité</label>
                  <select
                    value={formSectorId}
                    onChange={(e) => setFormSectorId(e.target.value)}
                    className="w-full mt-1 bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {BUSINESS_SECTORS.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.icon} {sec.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Service XR Agency</label>
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
                    className="w-full mt-1 bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {XR_OFFICIAL_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.icon} {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Formule</label>
                  <select
                    value={formPlanId}
                    onChange={(e) => {
                      setFormPlanId(e.target.value);
                      const p = selectedModalService.plans.find((x) => x.id === e.target.value);
                      if (p) setFormValue(p.price);
                    }}
                    className="w-full mt-1 bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {selectedModalService.plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} ({p.price} €)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Montant (€)</label>
                  <input
                    type="number"
                    value={formValue}
                    onChange={(e) => setFormValue(Number(e.target.value))}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Split Setter / Closer (sans jamais afficher de % des autres !) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Setter (Origine)</label>
                  <select
                    value={formSetterId || currentUser.id}
                    onChange={(e) => setFormSetterId(e.target.value)}
                    disabled={!isDirector && !isManager}
                    className="w-full mt-1 bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white disabled:opacity-60"
                  >
                    {members
                      .filter((m) => m.roleType !== "studio")
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.shortName} · {m.badge}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Closer attribué</label>
                  <select
                    value={formCloserId || currentUser.id}
                    onChange={(e) => setFormCloserId(e.target.value)}
                    className="w-full mt-1 bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {members
                      .filter((m) => m.roleType !== "studio")
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.shortName} · {m.badge}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-white/60">Besoin / Faille identifiée</label>
                <input
                  type="text"
                  value={formIssue}
                  onChange={(e) => setFormIssue(e.target.value)}
                  placeholder="Ex: Pas dans le Top 3 Maps, site lent sur mobile, besoin robot accueil..."
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.06] text-xs font-semibold text-white/70"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold shadow-lg"
                >
                  Enregistrer le prospect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL ÉDITION FICHE PROSPECT (NOTES, RELANCE, ÉTAPE, SUPPRESSION) ── */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f131d] border border-white/[0.12] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-base text-white">Modifier : {editingLead.name}</h3>
              <button onClick={() => setEditingLead(null)} className="text-white/40 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditedLead} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Étape pipeline</label>
                  <select
                    value={editingLead.stage}
                    onChange={(e) =>
                      setEditingLead({ ...editingLead, stage: e.target.value as LeadStage })
                    }
                    className="w-full mt-1 bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="new">1. Nouveau</option>
                    <option value="rdv">2. RDV / Qualifié</option>
                    <option value="mockup">3. Maquette en cours</option>
                    <option value="negociation">4. Négociation</option>
                    <option value="won">5. Signé 🎉</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Date de relance</label>
                  <input
                    type="date"
                    value={editingLead.followUpDate || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, followUpDate: e.target.value })}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Montant (€)</label>
                  <input
                    type="number"
                    value={editingLead.value}
                    onChange={(e) => setEditingLead({ ...editingLead, value: Number(e.target.value) })}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Téléphone</label>
                  <input
                    type="text"
                    value={editingLead.phone}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-white/60">Besoin / Faille</label>
                <input
                  type="text"
                  value={editingLead.issue}
                  onChange={(e) => setEditingLead({ ...editingLead, issue: e.target.value })}
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-white/60">Notes privées d'appel</label>
                <textarea
                  rows={3}
                  value={editingLead.notes}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  placeholder="Résumé de l'échange, objections, timing..."
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteLead(editingLead.id)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Supprimer
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingLead(null)}
                    className="px-4 py-2 rounded-xl bg-white/[0.06] text-xs font-semibold text-white/70"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL AJOUT MEMBRE / CANDIDAT (ANTOINE & MARTIN) ── */}
      {showAddMemberModal && (isDirector || isManager) && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f131d] border border-white/[0.12] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-amber-400" />
                {isManager ? "Ajouter un candidat à ma filière" : "Ajouter un membre à l'équipe"}
              </h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-white/40 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold uppercase text-white/60">Prénom & Nom *</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Ex: Julie Moreau"
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Rôle</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as UserRoleType)}
                    className="w-full mt-1 bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="setter">📞 Setter seul</option>
                    <option value="closer">🎯 Closer pur</option>
                    <option value="full_cycle">⚡ Full-Cycle</option>
                    <option value="student">🎓 Élève XR School</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Code PIN perso</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={newMemberPin}
                    onChange={(e) => setNewMemberPin(e.target.value)}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-semibold uppercase text-white/50">Setting %</label>
                  <input
                    type="number"
                    value={newMemberSettingPct}
                    onChange={(e) => setNewMemberSettingPct(Number(e.target.value))}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-2.5 py-2 text-xs font-mono text-amber-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase text-white/50">Closing %</label>
                  <input
                    type="number"
                    value={newMemberClosingPct}
                    onChange={(e) => setNewMemberClosingPct(Number(e.target.value))}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-2.5 py-2 text-xs font-mono text-amber-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase text-white/50">Full-Cycle %</label>
                  <input
                    type="number"
                    value={newMemberFullPct}
                    onChange={(e) => setNewMemberFullPct(Number(e.target.value))}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-2.5 py-2 text-xs font-mono text-emerald-300"
                  />
                </div>
              </div>

              {isDirector && (
                <div>
                  <label className="text-[11px] font-semibold uppercase text-white/60">Filière / Rattaché à</label>
                  <select
                    value={newMemberRecruitedBy}
                    onChange={(e) => setNewMemberRecruitedBy(e.target.value)}
                    className="w-full mt-1 bg-[#141824] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="">Direct Agence (Antoine)</option>
                    <option value="martin">Filière Martin (Override 10% auto)</option>
                  </select>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.06] text-xs font-semibold text-white/70"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold"
                >
                  Créer le profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL CRÉATION / MODIFICATION MOT DE PASSE PERSONNEL ── */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f131d] border border-white/[0.12] rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                Mon mot de passe personnel
              </h3>
              <button onClick={() => setShowChangePinModal(false)} className="text-white/40 hover:text-white">
                ✕
              </button>
            </div>

            <p className="text-xs text-white/55">
              Définissez votre propre code ou mot de passe confidentiel. Dès qu'il est enregistré, il est automatiquement masqué sur l'écran de connexion.
            </p>

            <form onSubmit={handleSaveOwnPin} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold uppercase text-white/60">Nouveau code / mot de passe</label>
                <input
                  type="password"
                  required
                  minLength={4}
                  maxLength={20}
                  value={newPinValue}
                  onChange={(e) => {
                    setNewPinValue(e.target.value);
                    setChangePinError("");
                  }}
                  placeholder="Min. 4 caractères"
                  className="w-full mt-1 bg-black/40 border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-white/60">Confirmer</label>
                <input
                  type="password"
                  required
                  minLength={4}
                  maxLength={20}
                  value={confirmPinValue}
                  onChange={(e) => {
                    setConfirmPinValue(e.target.value);
                    setChangePinError("");
                  }}
                  placeholder="Répétez votre code"
                  className="w-full mt-1 bg-black/40 border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {changePinError && <p className="text-xs text-red-400 text-center">{changePinError}</p>}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowChangePinModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.06] text-xs font-semibold text-white/70"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function KanbanCol({
  title,
  subtitle,
  color,
  dot,
  count,
  children,
}: {
  title: string;
  subtitle: string;
  color: string;
  dot: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className={`p-3.5 rounded-2xl border ${color} flex flex-col min-h-[460px]`}>
      <div className="flex items-center justify-between mb-0.5">
        <h3 className="font-bold text-xs text-white flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          {title}
        </h3>
        <span className="text-[10px] font-bold text-white/60 bg-white/[0.08] px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <p className="text-[10px] text-white/40 mb-3">{subtitle}</p>
      <div className="space-y-2.5 flex-1">{children}</div>
    </div>
  );
}

function LeadCard({
  lead,
  members,
  todayIso,
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
  onEdit: () => void;
  onCall: () => void;
  onNext: () => void;
  nextLabel: string;
  onWin: () => void;
  onPdf: () => void;
}) {
  const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === lead.serviceId);
  const closer = members.find((m) => m.id === lead.closerId);
  const setter = members.find((m) => m.id === lead.setterId);
  const isDue = lead.followUpDate && lead.followUpDate <= todayIso;

  return (
    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] transition-all space-y-2">
      <div className="flex items-center justify-between gap-1">
        <span className="text-sm">{svc?.icon || "🌐"}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-amber-300 font-mono">
            {formatPricePeriod(lead.value, lead.billing)}
          </span>
          <button onClick={onEdit} className="text-white/35 hover:text-white" title="Modifier la fiche">
            <Pencil className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-xs text-white">{lead.name}</h4>
        <p className="text-[10px] text-white/55 truncate">
          {lead.contact} · {lead.phone}
        </p>
      </div>

      <p className="text-[10px] text-white/65 bg-black/30 p-2 rounded-lg border border-white/[0.04] leading-snug">
        {lead.issue}
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        {lead.stage === "mockup" && lead.mockupReady && (
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
            ✓ Maquette prête
          </span>
        )}
        {lead.followUpDate && (
          <span
            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md flex items-center gap-1 ${
              isDue
                ? "bg-red-500/15 text-red-300 border border-red-500/30"
                : "bg-white/[0.05] text-white/50"
            }`}
          >
            <Calendar className="w-2.5 h-2.5" /> {lead.followUpDate}
          </span>
        )}
        {lead.setterId !== lead.closerId && (
          <span className="text-[9px] text-cyan-300/80">
            {setter?.shortName} → {closer?.shortName}
          </span>
        )}
      </div>

      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-1">
        <button onClick={onCall} className="text-[10px] font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1">
          <Phone className="w-3 h-3" /> Appel
        </button>
        <button onClick={onPdf} className="text-[10px] text-white/60 hover:text-white flex items-center gap-0.5">
          <FileText className="w-3 h-3 text-amber-400" /> PDF
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={onNext}
            className="text-[10px] font-semibold px-2 py-1 rounded-md bg-white/[0.07] hover:bg-white/[0.14] text-white"
          >
            {nextLabel}
          </button>
          <button
            onClick={onWin}
            title="Marquer signé"
            className="p-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400"
          >
            <CheckCircle2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
