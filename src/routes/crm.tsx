import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Lock,
  LogOut,
  MessageCircle,
  Phone,
  PhoneCall,
  Plus,
  Search,
  Send,
  Shield,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
  Wrench,
} from "lucide-react";
import type { CrmActivity, CrmLead, LeadPriority, LeadStatus } from "./api/crm";
import { cn } from "@/lib/utils";
import agentXrPortrait from "@/assets/agent-xr-portrait.jpg";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM Équipe Interne — XR Agency" },
      { name: "description", content: "Espace CRM interne XR Agency : suivi des leads, assignation équipe, statistiques closing et demandes de sous-traitance." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CrmWorkspacePage,
});

interface SafeMember {
  id: string;
  email: string;
  fullName: string;
  title: string;
  role: "admin" | "member";
  phoneLine: string;
  commissionPct: number;
  active: boolean;
  createdAt: string;
}

interface MemberPerf extends SafeMember {
  assignedCount: number;
  toCallCount: number;
  signedCount: number;
  revenueEur: number;
  estimatedCommissionEur: number;
  callsCount: number;
  closingRate: number;
}

interface CrmSnapshot {
  authenticated: boolean;
  user?: SafeMember;
  members?: SafeMember[];
  leads?: CrmLead[];
  activities?: CrmActivity[];
  stats?: {
    totalLeads: number;
    toCallCount: number;
    inProgressCount: number;
    signedCount: number;
    outsourcedCount: number;
    revenueEur: number;
    pipelineEur: number;
    totalCalls: number;
    closingRate: number;
  };
  teamBreakdown?: MemberPerf[];
}

const STATUS_META: Record<LeadStatus, { label: string; pill: string }> = {
  to_call: { label: "À appeler", pill: "border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300" },
  in_progress: { label: "En cours", pill: "border-[#b48f5a]/45 bg-[#f2ead9] text-[#7a5a2c]" },
  callback: { label: "Rappel prévu", pill: "border-sky-500/40 bg-sky-500/15 text-sky-800 dark:text-sky-300" },
  proposal_sent: { label: "Devis envoyé", pill: "border-purple-500/35 bg-purple-500/12 text-purple-800 dark:text-purple-300" },
  signed: { label: "Signé ✓", pill: "border-[#2e7d4f]/40 bg-[#2e7d4f]/15 text-[#1f5e39]" },
  outsourced: { label: "Sous-traité XR", pill: "border-[#141312] bg-[#141312] text-[#e8cfa6]" },
  lost: { label: "Classé sans suite", pill: "border-neutral-400/30 bg-neutral-200/70 text-neutral-600" },
};

const PRIORITY_BADGE: Record<LeadPriority, string> = {
  urgent: "bg-red-600 text-white",
  high: "bg-[#b48f5a] text-white",
  normal: "bg-neutral-200 text-neutral-700",
};

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function formatMoney(v: number) {
  return `${Math.round(v).toLocaleString("fr-FR")} €`;
}

function CrmWorkspacePage() {
  const [snapshot, setSnapshot] = useState<CrmSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Navigation & filters
  const [tab, setTab] = useState<"leads" | "stats" | "academy">("leads");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [memberFilter, setMemberFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Admin: Send lead modal/drawer
  const [showSendLead, setShowSendLead] = useState(false);
  const [newLead, setNewLead] = useState({
    company: "",
    contactName: "",
    phone: "",
    email: "",
    city: "Paris",
    sector: "Restauration",
    serviceTarget: "Google Maps Top 3 (159 €/m) + Site",
    budgetEur: "1900",
    priority: "high" as LeadPriority,
    assignedTo: "",
    source: "Envoi Direction",
    nextFollowUp: "Aujourd'hui",
    notes: "",
  });

  // Admin: New team member form
  const [showNewMember, setShowNewMember] = useState(false);
  const [newMember, setNewMember] = useState({
    fullName: "",
    email: "",
    title: "Closer · Partenaire Agence XR",
    phoneLine: "+33 1 86 95 41 35",
    commissionPct: "20",
    password: "EquipeXR2026!",
  });

  // Selected lead actions
  const [callOutcome, setCallOutcome] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editFollowUp, setEditFollowUp] = useState("");
  const [showOutsource, setShowOutsource] = useState(false);
  const [outsourceForm, setOutsourceForm] = useState({
    scope: "",
    budgetAllocated: "",
    deadline: "Sous 7 jours",
    brief: "",
  });

  const refreshCrm = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm", { credentials: "include" });
      const data = (await res.json()) as CrmSnapshot;
      setSnapshot(data);
      if (data.leads?.length && !selectedLeadId) {
        setSelectedLeadId(data.leads[0].id);
      }
      if (data.members?.length) {
        const firstMember = data.members.find((m) => m.role === "member");
        if (firstMember) {
          setNewLead((prev) => ({ ...prev, assignedTo: prev.assignedTo || firstMember.id }));
        }
      }
    } catch {
      setErrorMsg("Impossible de joindre le serveur CRM.");
    } finally {
      setLoading(false);
    }
  }, [selectedLeadId]);

  useEffect(() => {
    void refreshCrm();
  }, []);

  const postAction = async (payload: Record<string, unknown>, feedback?: string) => {
    setBusy(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as CrmSnapshot & { error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || "Erreur opération CRM.");
        return null;
      }
      setSnapshot(data);
      if (feedback) setSuccessMsg(feedback);
      return data;
    } catch {
      setErrorMsg("Erreur réseau lors de l'opération.");
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await postAction({ action: "login", email: loginEmail, password: loginPass });
    if (res?.leads?.length) setSelectedLeadId(res.leads[0].id);
  };

  const quickLogin = async (email: string, password: string) => {
    setLoginEmail(email);
    setLoginPass(password);
    const res = await postAction({ action: "login", email, password });
    if (res?.leads?.length) setSelectedLeadId(res.leads[0].id);
  };

  const handleLogout = async () => {
    await postAction({ action: "logout" });
    setSelectedLeadId(null);
  };

  const handleSendLead = async (e: FormEvent) => {
    e.preventDefault();
    const res = await postAction(
      {
        action: "send_lead",
        ...newLead,
        budgetEur: Number(newLead.budgetEur) || 0,
      },
      `Lead « ${newLead.company} » envoyé à votre collaborateur.`
    );
    if (res?.leads?.length) {
      setSelectedLeadId(res.leads[0].id);
      setShowSendLead(false);
      setNewLead((prev) => ({
        ...prev,
        company: "",
        contactName: "",
        phone: "",
        email: "",
        notes: "",
      }));
    }
  };

  const handleCreateMember = async (e: FormEvent) => {
    e.preventDefault();
    const res = await postAction(
      {
        action: "create_member",
        ...newMember,
        commissionPct: Number(newMember.commissionPct) || 15,
      },
      `Compte créé pour ${newMember.fullName}.`
    );
    if (res) {
      setShowNewMember(false);
      setNewMember({
        fullName: "",
        email: "",
        title: "Closer · Partenaire Agence XR",
        phoneLine: "+33 1 86 95 41 35",
        commissionPct: "20",
        password: "EquipeXR2026!",
      });
    }
  };

  const leads = snapshot?.leads ?? [];
  const members = snapshot?.members ?? [];
  const staffMembers = members.filter((m) => m.role === "member");
  const isAdmin = snapshot?.user?.role === "admin";

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (memberFilter !== "all" && l.assignedTo !== memberFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${l.company} ${l.contactName} ${l.city} ${l.sector} ${l.serviceTarget} ${l.phone}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, statusFilter, memberFilter, searchQuery]);

  const activeLead = leads.find((l) => l.id === selectedLeadId) ?? filteredLeads[0] ?? null;

  useEffect(() => {
    if (activeLead) {
      setEditNotes(activeLead.notes);
      setEditFollowUp(activeLead.nextFollowUp);
      setOutsourceForm({
        scope: activeLead.serviceTarget,
        budgetAllocated: String(Math.round(activeLead.budgetEur * 0.45)),
        deadline: "Sous 7 jours",
        brief: activeLead.notes || "Production déléguée à XR Agency.",
      });
    }
  }, [activeLead?.id]);

  if (loading && !snapshot) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121110] text-[#f7f4ed]">
        <div className="text-center space-y-3">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#c5a880] border-t-transparent" />
          <p className="label-mono text-xs text-[#e8cfa6]">Chargement CRM XR Agency...</p>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────── */
  /* UNAUTHENTICATED LOGIN GATE (Obsidian × Cream Luxury)          */
  /* ────────────────────────────────────────────────────────────── */
  if (!snapshot?.authenticated || !snapshot.user) {
    return (
      <div className="min-h-screen bg-[#121110] text-[#f7f4ed] flex flex-col justify-between p-4 sm:p-8">
        <div className="mx-auto w-full max-w-6xl flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-[#f7f4ed] hover:border-[#c5a880]">
            <ArrowLeft className="h-3.5 w-3.5 text-[#c5a880]" /> Retour au site
          </Link>
          <Link to="/school" className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/15 px-4 py-2 text-xs font-semibold text-[#e8cfa6] hover:bg-[#c5a880]/25">
            <GraduationCap className="h-3.5 w-3.5" /> XR School · Programme 90j
          </Link>
        </div>

        <div className="mx-auto my-8 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#c5a880]/25 bg-[#161411] shadow-[0_32px_90px_-30px_rgba(0,0,0,0.85)] grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
          {/* Left Portrait / Brand Panel */}
          <div className="relative flex flex-col justify-between p-7 sm:p-8 bg-[#121110] overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
            <img
              src={agentXrPortrait}
              alt="Équipe interne XR Agency"
              className="absolute inset-0 h-full w-full object-cover object-top opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/70 to-[#121110]/45" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-black/55 px-3 py-1 label-mono text-[8.5px] text-[#e8cfa6]">
                <Lock className="h-3 w-3" /> ESPACE ÉQUIPE & PARTENAIRES
              </span>
              <h1 className="display-serif mt-5 text-3xl sm:text-4xl text-[#f7f4ed] leading-[1.08]">
                Pilotez vos <em className="italic font-normal text-[#c5a880]">leads</em> & closings en direct.
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-[#d7d1c6] leading-relaxed">
                Réceptionnez les opportunités envoyées par la Direction, suivez chaque appel sur votre ligne pro, déléguez la production ou consultez les modules XR School.
              </p>
            </div>

            <div className="relative z-10 mt-8 space-y-2 text-[11px] text-[#e8cfa6]">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#c5a880]" /> Dispatch leads & suivi pipeline</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#c5a880]" /> Stats closing & commissions en direct</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#c5a880]" /> Sous-traitance technique en 1 clic</div>
            </div>
          </div>

          {/* Right Cream Sheet Login Form */}
          <div className="bg-[#f7f4ed] p-6 sm:p-9 text-[#141312]">
            <p className="label-mono text-[9px] font-bold tracking-[.2em] text-[#9b7b4b] uppercase">
              XRAGENCY WORKSPACE CRM
            </p>
            <h2 className="display-serif mt-1.5 text-2xl text-[#141312]">Connexion interne</h2>

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-300 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#141312] mb-1.5">E-mail collaborateur</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="lucas@xragency.fr"
                  className="w-full rounded-xl border border-[#141312]/15 bg-white px-4 py-3 text-sm text-[#141312] placeholder:text-[#8c8376] focus:border-[#b48f5a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#141312] mb-1.5">Mot de passe</label>
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#141312]/15 bg-white px-4 py-3 text-sm text-[#141312] placeholder:text-[#8c8376] focus:border-[#b48f5a] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#141312] px-6 py-3.5 text-xs font-bold uppercase tracking-[.12em] text-[#f7f4ed] hover:bg-[#2a2621] transition disabled:opacity-50"
              >
                {busy ? "Connexion..." : "Accéder au CRM"}
              </button>
            </form>

            {/* Quick Sandbox Credentials for Immediate Local Verification */}
            <div className="mt-6 rounded-2xl border border-[#b48f5a]/30 bg-white p-4">
              <p className="label-mono text-[8px] font-bold text-[#9b7b4b] uppercase mb-2.5">
                Accès rapide démo (pré-configuré) :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => quickLogin("admin@xragency.fr", "AdminXR2026!")}
                  className="flex flex-col items-start rounded-xl border border-[#141312]/12 bg-[#f7f4ed] p-2.5 text-left transition hover:border-[#b48f5a]"
                >
                  <span className="text-[11px] font-bold text-[#141312]">Direction · Admin</span>
                  <span className="text-[10px] text-[#6f675b]">Envoyer leads & stats globales</span>
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin("lucas@xragency.fr", "EquipeXR2026!")}
                  className="flex flex-col items-start rounded-xl border border-[#141312]/12 bg-[#f7f4ed] p-2.5 text-left transition hover:border-[#b48f5a]"
                >
                  <span className="text-[11px] font-bold text-[#141312]">Closer · Lucas Martin</span>
                  <span className="text-[10px] text-[#6f675b]">Traiter mes leads & appels</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-white/45">
          XR Agency CRM · Paris · Support équipe : +33 7 67 56 67 83
        </p>
      </div>
    );
  }

  const user = snapshot.user;
  const stats = snapshot.stats!;

  /* ────────────────────────────────────────────────────────────── */
  /* AUTHENTICATED INTERNAL TEAM CRM WORKSPACE                     */
  /* ────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#141312]">
      {/* Dark Obsidian Top Bar */}
      <header className="bg-[#121110] text-[#f7f4ed] border-b border-white/10 sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#e7cfa8] to-[#b48f5a] text-xs font-black text-[#141312]">
              XR
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold truncate">{user.fullName}</span>
                <span className={cn(
                  "rounded-full px-2 py-0.5 label-mono text-[7.5px] font-bold uppercase",
                  isAdmin ? "bg-[#c5a880] text-[#141312]" : "bg-white/10 text-[#e8cfa6]"
                )}>
                  {isAdmin ? "Direction Admin" : "Équipe / Closer"}
                </span>
              </div>
              <p className="text-[10px] text-white/60 truncate">
                {user.title} · Ligne : {user.phoneLine}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Tabs */}
            <nav className="flex items-center rounded-full border border-white/12 bg-white/5 p-1">
              {[
                { id: "leads" as const, label: "Leads", icon: Briefcase },
                { id: "stats" as const, label: "Stats & Équipe", icon: BarChart3 },
                { id: "academy" as const, label: "XR School", icon: GraduationCap },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition",
                      tab === item.id ? "bg-[#c5a880] text-[#141312]" : "text-white/75 hover:text-white"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {isAdmin && (
              <button
                type="button"
                onClick={() => { setTab("leads"); setShowSendLead(true); }}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#e8cfa6] px-3.5 py-2 text-[11px] font-bold text-[#141312] hover:bg-[#c5a880] transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Envoyer un lead</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              title="Se déconnecter"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/75 hover:bg-white/15 hover:text-white transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Feedback banners */}
        {errorMsg && (
          <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="rounded-2xl border border-[#2e7d4f]/30 bg-[#2e7d4f]/10 px-4 py-3 text-xs font-semibold text-[#1f5e39] flex items-center justify-between">
            <span>{successMsg}</span>
            <button type="button" onClick={() => setSuccessMsg("")} className="text-[10px] underline">Fermer</button>
          </div>
        )}

        {/* Top KPI Strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Total Leads", val: String(stats.totalLeads), sub: `${stats.toCallCount} à appeler` },
            { label: "Appels passés", val: String(stats.totalCalls), sub: "Suivi téléphone" },
            { label: "Pipeline actif", val: formatMoney(stats.pipelineEur), sub: `${stats.inProgressCount} dossiers` },
            { label: "Signés / Closés", val: String(stats.signedCount), sub: `Taux : ${stats.closingRate}%` },
            { label: "CA généré", val: formatMoney(stats.revenueEur), sub: "Contrats validés", dark: true },
            { label: "Sous-traités XR", val: String(stats.outsourcedCount), sub: "Prod déléguée" },
          ].map((k) => (
            <div
              key={k.label}
              className={cn(
                "rounded-2xl border p-4 shadow-xs",
                k.dark
                  ? "border-[#c5a880] bg-[#141312] text-[#f7f4ed]"
                  : "border-[#141312]/10 bg-white text-[#141312]"
              )}
            >
              <span className={cn("label-mono text-[8px] font-bold uppercase", k.dark ? "text-[#e8cfa6]" : "text-[#9b7b4b]")}>
                {k.label}
              </span>
              <p className="display-serif mt-1.5 text-2xl font-semibold leading-none">{k.val}</p>
              <span className={cn("mt-1.5 block text-[10px]", k.dark ? "text-white/65" : "text-[#6f675b]")}>{k.sub}</span>
            </div>
          ))}
        </div>

        {/* Admin: Inline Send Lead Drawer */}
        {isAdmin && showSendLead && (
          <form onSubmit={handleSendLead} className="rounded-3xl border-2 border-[#b48f5a] bg-white p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#141312]/10 pb-3">
              <div>
                <span className="label-mono text-[8px] font-bold text-[#9b7b4b] uppercase">DISPATCH DIRECTION</span>
                <h2 className="display-serif text-xl text-[#141312]">Envoyer un lead qualifié à un membre</h2>
              </div>
              <button type="button" onClick={() => setShowSendLead(false)} className="text-xs font-semibold text-[#6f675b] hover:text-[#141312]">
                Annuler
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-[11px] font-semibold block mb-1">Assigner à *</label>
                <select
                  required
                  value={newLead.assignedTo}
                  onChange={(e) => setNewLead((p) => ({ ...p, assignedTo: e.target.value }))}
                  className="w-full rounded-xl border border-[#141312]/15 bg-[#f7f4ed] px-3 py-2 text-xs font-medium"
                >
                  {staffMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.fullName} ({m.title})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold block mb-1">Entreprise / Prospect *</label>
                <input
                  required
                  value={newLead.company}
                  onChange={(e) => setNewLead((p) => ({ ...p, company: e.target.value }))}
                  placeholder="Ex: Restaurant L'Orangerie"
                  className="w-full rounded-xl border border-[#141312]/15 bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold block mb-1">Nom du contact</label>
                <input
                  value={newLead.contactName}
                  onChange={(e) => setNewLead((p) => ({ ...p, contactName: e.target.value }))}
                  placeholder="Prénom Nom"
                  className="w-full rounded-xl border border-[#141312]/15 bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold block mb-1">Téléphone / WhatsApp</label>
                <input
                  value={newLead.phone}
                  onChange={(e) => setNewLead((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+33 6 ..."
                  className="w-full rounded-xl border border-[#141312]/15 bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold block mb-1">Offre / Service visé</label>
                <input
                  value={newLead.serviceTarget}
                  onChange={(e) => setNewLead((p) => ({ ...p, serviceTarget: e.target.value }))}
                  className="w-full rounded-xl border border-[#141312]/15 bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold block mb-1">Budget estimé (€)</label>
                <input
                  type="number"
                  value={newLead.budgetEur}
                  onChange={(e) => setNewLead((p) => ({ ...p, budgetEur: e.target.value }))}
                  className="w-full rounded-xl border border-[#141312]/15 bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold block mb-1">Ville / Secteur</label>
                <input
                  value={newLead.city}
                  onChange={(e) => setNewLead((p) => ({ ...p, city: e.target.value }))}
                  className="w-full rounded-xl border border-[#141312]/15 bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold block mb-1">Priorité</label>
                <select
                  value={newLead.priority}
                  onChange={(e) => setNewLead((p) => ({ ...p, priority: e.target.value as LeadPriority }))}
                  className="w-full rounded-xl border border-[#141312]/15 bg-[#f7f4ed] px-3 py-2 text-xs font-medium"
                >
                  <option value="urgent">Urgente (Chaud)</option>
                  <option value="high">Haute</option>
                  <option value="normal">Normale</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold block mb-1">Brief & Consigne pour l'appel</label>
              <textarea
                rows={2}
                value={newLead.notes}
                onChange={(e) => setNewLead((p) => ({ ...p, notes: e.target.value }))}
                placeholder="Ex: Lead chaud suite audit Maps — proposer Pack 159 €/m + Plaque NFC..."
                className="w-full rounded-xl border border-[#141312]/15 bg-white px-3 py-2 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-full bg-[#141312] px-6 py-2.5 text-xs font-bold text-[#f7f4ed] hover:bg-[#2a2621]"
              >
                <Send className="h-3.5 w-3.5 text-[#e8cfa6]" /> Envoyer immédiatement au collaborateur
              </button>
            </div>
          </form>
        )}

        {/* ── TAB 1: LEADS & SUIVI QUOTIDIEN ── */}
        {tab === "leads" && (
          <div className="space-y-4">
            {/* Search & Filters */}
            <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-[#141312]/10 bg-white p-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="h-4 w-4 text-[#8c8376] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un lead, une ville, un numéro..."
                  className="w-full rounded-xl border border-[#141312]/10 bg-[#f7f4ed]/60 pl-9 pr-3 py-2 text-xs focus:border-[#b48f5a] focus:outline-none"
                />
              </div>

              {isAdmin && (
                <select
                  value={memberFilter}
                  onChange={(e) => setMemberFilter(e.target.value)}
                  className="rounded-xl border border-[#141312]/10 bg-[#f7f4ed] px-3 py-2 text-xs font-medium"
                >
                  <option value="all">Toute l&apos;équipe ({staffMembers.length})</option>
                  {staffMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.fullName}</option>
                  ))}
                </select>
              )}

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Tous" },
                  { id: "to_call", label: "À appeler" },
                  { id: "callback", label: "Rappels" },
                  { id: "proposal_sent", label: "Devis" },
                  { id: "signed", label: "Signés" },
                  { id: "outsourced", label: "Sous-traités" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setStatusFilter(f.id)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[10.5px] font-semibold transition",
                      statusFilter === f.id
                        ? "bg-[#141312] text-[#e8cfa6]"
                        : "bg-[#f7f4ed] text-[#5d564c] hover:bg-[#ece4d4]"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Workspace: Leads Queue + Detailed Action Card */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              {/* Left Queue */}
              <div className="space-y-2.5">
                {filteredLeads.length === 0 ? (
                  <div className="rounded-2xl border border-[#141312]/10 bg-white p-8 text-center text-sm text-[#6f675b]">
                    Aucun dossier ne correspond à vos filtres.
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const assignee = members.find((m) => m.id === lead.assignedTo);
                    const meta = STATUS_META[lead.status];
                    const selected = activeLead?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={cn(
                          "cursor-pointer rounded-2xl border p-4 transition-all",
                          selected
                            ? "border-[#b48f5a] bg-white shadow-md ring-2 ring-[#c5a880]/40"
                            : "border-[#141312]/10 bg-white/85 hover:border-[#b48f5a]/50"
                        )}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={cn("rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase", PRIORITY_BADGE[lead.priority])}>
                                {lead.priority === "urgent" ? "CHAUD" : lead.priority === "high" ? "HAUTE" : "NORMAL"}
                              </span>
                              <h3 className="text-sm font-bold text-[#141312] truncate">{lead.company}</h3>
                            </div>
                            <p className="mt-1 text-xs text-[#6f675b]">
                              {lead.contactName} · {lead.city} · <span className="font-medium text-[#141312]">{lead.serviceTarget}</span>
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="display-serif text-lg font-bold text-[#141312]">{formatMoney(lead.budgetEur)}</span>
                            <span className={cn("mt-1 block rounded-full border px-2 py-0.5 text-[9.5px] font-semibold", meta.pill)}>
                              {meta.label}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#141312]/8 pt-2.5 text-[11px] text-[#6f675b]">
                          <span>
                            Suivi : <strong className="text-[#141312]">{assignee?.fullName ?? "Équipe"}</strong> · {lead.callsCount} appel(s)
                          </span>
                          <span className="font-medium text-[#9b7b4b]">{lead.nextFollowUp}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Active Lead Action Sheet */}
              {activeLead && (
                <div className="rounded-3xl border border-[#141312]/12 bg-white p-5 sm:p-6 shadow-md space-y-5 lg:sticky lg:top-20">
                  <div className="flex items-start justify-between gap-3 border-b border-[#141312]/10 pb-4">
                    <div>
                      <span className="label-mono text-[8px] font-bold text-[#9b7b4b] uppercase">
                        {activeLead.source} · {activeLead.sector}
                      </span>
                      <h3 className="display-serif mt-1 text-2xl text-[#141312]">{activeLead.company}</h3>
                      <p className="text-xs text-[#5d564c] mt-0.5">
                        {activeLead.contactName} · {activeLead.city} · {formatMoney(activeLead.budgetEur)}
                      </p>
                    </div>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => postAction({ action: "delete_lead", leadId: activeLead.id }, "Dossier supprimé.")}
                        title="Supprimer ce lead"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Direct Phone & WhatsApp Contact */}
                  <div className="flex flex-wrap gap-2">
                    {activeLead.phone && (
                      <>
                        <a
                          href={`tel:${activeLead.phone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#141312] px-4 py-2 text-xs font-semibold text-[#f7f4ed] hover:bg-[#2a2621]"
                        >
                          <Phone className="h-3.5 w-3.5 text-[#e8cfa6]" /> {activeLead.phone}
                        </a>
                        <a
                          href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#b48f5a]/50 bg-[#f7f4ed] px-4 py-2 text-xs font-semibold text-[#141312] hover:bg-[#f2ead9]"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-[#9b7b4b]" /> WhatsApp
                        </a>
                      </>
                    )}
                  </div>

                  {/* Pipeline Status Switcher + Reassign for Admin */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="label-mono text-[8.5px] font-bold text-[#6f675b] uppercase block mb-1">
                        Statut dossier
                      </label>
                      <select
                        value={activeLead.status}
                        onChange={(e) => postAction({ action: "update_lead", leadId: activeLead.id, status: e.target.value }, "Statut mis à jour.")}
                        className="w-full rounded-xl border border-[#141312]/15 bg-[#f7f4ed] px-3 py-2.5 text-xs font-semibold"
                      >
                        {Object.entries(STATUS_META).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </select>
                    </div>

                    {isAdmin && (
                      <div>
                        <label className="label-mono text-[8.5px] font-bold text-[#6f675b] uppercase block mb-1">
                          Membre assigné
                        </label>
                        <select
                          value={activeLead.assignedTo}
                          onChange={(e) => postAction({ action: "update_lead", leadId: activeLead.id, assignedTo: e.target.value }, "Lead réassigné.")}
                          className="w-full rounded-xl border border-[#141312]/15 bg-[#f7f4ed] px-3 py-2.5 text-xs font-semibold"
                        >
                          {staffMembers.map((m) => (
                            <option key={m.id} value={m.id}>{m.fullName}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Log Call Quick Bar */}
                  <div className="rounded-2xl border border-[#141312]/10 bg-[#faf7f1] p-3.5 space-y-2.5">
                    <p className="text-xs font-bold text-[#141312] flex items-center gap-1.5">
                      <PhoneCall className="h-3.5 w-3.5 text-[#b48f5a]" /> Enregistrer un appel ({activeLead.callsCount} enregistré(s))
                    </p>
                    <div className="flex gap-2">
                      <input
                        value={callOutcome}
                        onChange={(e) => setCallOutcome(e.target.value)}
                        placeholder="Compte-rendu rapide (ex: RDV demain 15h, intéressé)..."
                        className="flex-1 rounded-xl border border-[#141312]/12 bg-white px-3 py-2 text-xs"
                      />
                      <button
                        type="button"
                        disabled={busy}
                        onClick={async () => {
                          await postAction(
                            { action: "log_call", leadId: activeLead.id, outcome: callOutcome || "Appel passé — suivi en cours" },
                            "Appel enregistré dans le suivi."
                          );
                          setCallOutcome("");
                        }}
                        className="rounded-xl bg-[#141312] px-3.5 py-2 text-xs font-semibold text-[#e8cfa6] hover:bg-[#2a2621] shrink-0"
                      >
                        + Appel
                      </button>
                    </div>
                  </div>

                  {/* Notes & Follow-up Save */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <label className="text-xs font-semibold text-[#141312]">Prochaine relance & Notes internes</label>
                      <input
                        value={editFollowUp}
                        onChange={(e) => setEditFollowUp(e.target.value)}
                        placeholder="Ex: Demain 14h"
                        className="rounded-lg border border-[#141312]/12 bg-[#f7f4ed] px-2.5 py-1 text-[11px] font-medium"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className="w-full rounded-xl border border-[#141312]/12 bg-white p-3 text-xs leading-relaxed"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => postAction({ action: "update_lead", leadId: activeLead.id, notes: editNotes, nextFollowUp: editFollowUp }, "Notes sauvegardées.")}
                        className="rounded-full border border-[#141312]/15 bg-[#f7f4ed] px-4 py-2 text-xs font-semibold text-[#141312] hover:border-[#b48f5a]"
                      >
                        Sauvegarder notes
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowOutsource((v) => !v)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#b48f5a]/15 border border-[#b48f5a]/45 px-4 py-2 text-xs font-bold text-[#8c6c3c] hover:bg-[#b48f5a]/25"
                      >
                        <Wrench className="h-3.5 w-3.5" />
                        {activeLead.outsourceRequest ? "Dossier sous-traité XR ✓" : "Sous-traiter à XR Agency"}
                      </button>
                    </div>
                  </div>

                  {/* Outsource Production Form */}
                  {showOutsource && (
                    <div className="rounded-2xl border border-[#b48f5a] bg-[#141312] p-4 text-[#f7f4ed] space-y-3">
                      <p className="label-mono text-[8px] font-bold text-[#e8cfa6] uppercase">
                        DÉLÉGUER LA PRODUCTION À XR AGENCY
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          value={outsourceForm.scope}
                          onChange={(e) => setOutsourceForm((p) => ({ ...p, scope: e.target.value }))}
                          placeholder="Périmètre (Site / Maps / SEO)..."
                          className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50"
                        />
                        <input
                          type="number"
                          value={outsourceForm.budgetAllocated}
                          onChange={(e) => setOutsourceForm((p) => ({ ...p, budgetAllocated: e.target.value }))}
                          placeholder="Budget prod €"
                          className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={outsourceForm.brief}
                        onChange={(e) => setOutsourceForm((p) => ({ ...p, brief: e.target.value }))}
                        placeholder="Brief client, éléments disponibles, délai souhaité..."
                        className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50"
                      />
                      <button
                        type="button"
                        disabled={busy}
                        onClick={async () => {
                          await postAction(
                            { action: "request_outsource", leadId: activeLead.id, ...outsourceForm },
                            "Demande de sous-traitance transmise à la production XR Agency."
                          );
                          setShowOutsource(false);
                        }}
                        className="w-full rounded-full bg-[#c5a880] py-2.5 text-xs font-bold text-[#141312] hover:bg-[#e8cfa6]"
                      >
                        Confirmer la sous-traitance technique
                      </button>
                    </div>
                  )}

                  {activeLead.outsourceRequest && (
                    <div className="rounded-2xl border border-[#b48f5a]/40 bg-[#f2ead9]/60 p-3.5 text-xs space-y-1">
                      <p className="font-bold text-[#141312] flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-[#9b7b4b]" /> Sous-traitance active · {activeLead.outsourceRequest.deadline}
                      </p>
                      <p className="text-[#5d564c]">
                        {activeLead.outsourceRequest.scope} · Part prod : {formatMoney(activeLead.outsourceRequest.budgetAllocated)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: STATS PAR MEMBRE & GESTION ÉQUIPE ── */}
        {tab === "stats" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="display-serif text-2xl text-[#141312]">
                  {isAdmin ? "Performance de chaque membre" : "Mes statistiques de production"}
                </h2>
                <p className="text-xs text-[#6f675b]">Suivi des leads attribués, appels, closings et commissions générées.</p>
              </div>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setShowNewMember((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#141312] px-4 py-2.5 text-xs font-semibold text-[#e8cfa6]"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Ajouter un membre / élève
                </button>
              )}
            </div>

            {isAdmin && showNewMember && (
              <form onSubmit={handleCreateMember} className="rounded-2xl border border-[#b48f5a] bg-white p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input required value={newMember.fullName} onChange={(e) => setNewMember((p) => ({ ...p, fullName: e.target.value }))} placeholder="Nom complet *" className="rounded-xl border border-[#141312]/15 px-3 py-2 text-xs" />
                <input required type="email" value={newMember.email} onChange={(e) => setNewMember((p) => ({ ...p, email: e.target.value }))} placeholder="E-mail connexion *" className="rounded-xl border border-[#141312]/15 px-3 py-2 text-xs" />
                <input value={newMember.title} onChange={(e) => setNewMember((p) => ({ ...p, title: e.target.value }))} placeholder="Rôle (Closer / Élève School)" className="rounded-xl border border-[#141312]/15 px-3 py-2 text-xs" />
                <input value={newMember.phoneLine} onChange={(e) => setNewMember((p) => ({ ...p, phoneLine: e.target.value }))} placeholder="Ligne téléphonique pro" className="rounded-xl border border-[#141312]/15 px-3 py-2 text-xs" />
                <input type="number" value={newMember.commissionPct} onChange={(e) => setNewMember((p) => ({ ...p, commissionPct: e.target.value }))} placeholder="Commission %" className="rounded-xl border border-[#141312]/15 px-3 py-2 text-xs" />
                <div className="flex gap-2">
                  <input value={newMember.password} onChange={(e) => setNewMember((p) => ({ ...p, password: e.target.value }))} placeholder="Mot de passe initial" className="flex-1 rounded-xl border border-[#141312]/15 px-3 py-2 text-xs" />
                  <button type="submit" disabled={busy} className="rounded-xl bg-[#141312] px-4 py-2 text-xs font-bold text-[#e8cfa6]">Créer</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(snapshot.teamBreakdown ?? []).map((m) => (
                <div key={m.id} className="rounded-2xl border border-[#141312]/10 bg-white p-5 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[#141312]">{m.fullName}</h3>
                      <p className="text-xs text-[#6f675b]">{m.title}</p>
                      <p className="mt-1 font-mono text-[10px] text-[#9b7b4b]">{m.phoneLine}</p>
                    </div>
                    <span className="rounded-full bg-[#f2ead9] px-2.5 py-1 label-mono text-[8px] font-bold text-[#8c6c3c]">
                      {m.commissionPct}% COM
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#faf7f1] p-3 text-center">
                    <div>
                      <span className="block text-[9.5px] text-[#6f675b]">Leads</span>
                      <span className="text-sm font-bold">{m.assignedCount}</span>
                    </div>
                    <div>
                      <span className="block text-[9.5px] text-[#6f675b]">Appels</span>
                      <span className="text-sm font-bold">{m.callsCount}</span>
                    </div>
                    <div>
                      <span className="block text-[9.5px] text-[#6f675b]">Signés</span>
                      <span className="text-sm font-bold text-[#2e7d4f]">{m.signedCount}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#6f675b]">Closing : <strong>{m.closingRate}%</strong></span>
                      <span className="font-bold text-[#141312]">{formatMoney(m.revenueEur)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#ece4d4] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#b48f5a] to-[#141312]" style={{ width: `${Math.min(100, m.closingRate)}%` }} />
                    </div>
                    <p className="mt-2 text-[11px] text-[#6f675b]">
                      Commission estimée : <strong className="text-[#9b7b4b]">{formatMoney(m.estimatedCommissionEur)}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Feed */}
            <div className="rounded-2xl border border-[#141312]/10 bg-white p-5 space-y-3">
              <h3 className="text-sm font-bold text-[#141312] flex items-center gap-2">
                <Users className="h-4 w-4 text-[#b48f5a]" /> Historique des actions récentes
              </h3>
              <div className="divide-y divide-[#141312]/8">
                {(snapshot.activities ?? []).slice(0, 12).map((act) => (
                  <div key={act.id} className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <p className="text-[#2c2823]">
                      <strong className="text-[#141312]">{act.memberName}</strong> — {act.message}
                    </p>
                    <span className="font-mono text-[10px] text-[#8c8376] shrink-0">{formatTime(act.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: XR SCHOOL INTERNE (MODULES, SCRIPTS & SOUS-TRAITANCE) ── */}
        {tab === "academy" && (
          <div className="rounded-3xl bg-[#121110] p-6 sm:p-8 text-[#f7f4ed] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="label-mono text-[9px] font-bold text-[#e8cfa6] uppercase">PROGRAMME 90 JOURS · RESSOURCES ÉQUIPE & ÉLÈVES</span>
                <h2 className="display-serif mt-1.5 text-3xl">XR School — Closing, Recrutement & Délégation</h2>
              </div>
              <Link to="/school" className="inline-flex items-center gap-1.5 rounded-full bg-[#c5a880] px-5 py-2.5 text-xs font-bold text-[#141312]">
                Voir la page officielle XR School <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  step: "JOURS 1 – 30",
                  title: "Infrastructure & Marque Clés-en-Main",
                  bullets: [
                    "Votre site vitrine + branding complet livrés",
                    "Votre ligne téléphonique pro activée",
                    "Scripts de prospection & pitch 45 secondes",
                  ],
                },
                {
                  step: "JOURS 31 – 60",
                  title: "Leads Fournis & Closing High-Ticket",
                  bullets: [
                    "Réception des leads qualifiés directement dans ce CRM",
                    "Framework d'appel : Sites, Google Maps 159€/m, Refonte",
                    "Simulation & debrief hebdomadaire sur vos enregistrements",
                  ],
                },
                {
                  step: "JOURS 61 – 90",
                  title: "Autonomie, Recrutement ou Sous-Traitance",
                  bullets: [
                    "Recruter et former vos propres commerciaux dans votre CRM",
                    "Option libre : nous sous-traiter la production technique",
                    "Garantie d'autonomie financière accompagnée jusqu'à rentabilité",
                  ],
                },
              ].map((mod) => (
                <div key={mod.step} className="rounded-2xl border border-white/12 bg-white/5 p-5 space-y-3">
                  <span className="label-mono text-[8.5px] font-bold text-[#e8cfa6]">{mod.step}</span>
                  <h3 className="text-base font-bold text-[#f7f4ed]">{mod.title}</h3>
                  <ul className="space-y-2 text-xs text-[#d7d1c6]">
                    {mod.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

