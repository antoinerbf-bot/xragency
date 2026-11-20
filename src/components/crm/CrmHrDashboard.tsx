import React, { useState, useMemo } from "react";
import {
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Plus,
  Phone,
  Mail,
  UserCheck,
  Shield,
  Briefcase,
  Sparkles,
  ArrowRight,
  LogOut,
  Target,
  Search,
  Filter,
  Check,
  X,
  Swords,
  ChevronRight,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmLead } from "@/routes/api/crm";

export interface RecruitedCloser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  joinedDate: string;
  trainingDay: number; // 1 to 90
  trainingPhase: "Mois 1 - Fondations" | "Mois 2 - Objections" | "Mois 3 - Haut-Ticket";
  status: "in_training" | "active_closer" | "on_probation";
  generatedRevenueEur: number;
  signedDealsCount: number;
  callsCount: number;
  weeklySchedule: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  };
}

export interface CandidateApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  experienceLevel: "Débutant motivé" | "Intermédiaire B2B" | "Closer Confirmé";
  status: "nouveau" | "entretien_planifie" | "entretien_valide" | "rejete" | "integre";
  interviewDate?: string;
  notes: string;
  appliedDate: string;
}

interface CrmHrDashboardProps {
  currentUser: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
  leads?: CrmLead[];
  onLogout: () => void;
  onSwitchToCloserMode?: () => void;
}

export function CrmHrDashboard({
  currentUser,
  leads = [],
  onLogout,
  onSwitchToCloserMode,
}: CrmHrDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "recruits" | "candidates" | "training" | "schedules" | "commissions" | "inbox"
  >("recruits");
  const [martinForwardEmail, setMartinForwardEmail] = useState("contact.xragency@gmail.com");
  const [forwardSaved, setForwardSaved] = useState(false);

  // ── COMMERCIAUX RECRUTÉS PAR MARTIN (COMMISSION 20% POUR EUX, 10% OVERRIDE POUR MARTIN) ──
  const [recruits, setRecruits] = useState<RecruitedCloser[]>([
    {
      id: "mem-karim",
      fullName: "Karim Diallo",
      email: "karim@xragency.fr",
      phone: "+33 6 45 78 12 34",
      joinedDate: "12 Octobre 2026",
      trainingDay: 42,
      trainingPhase: "Mois 2 - Objections",
      status: "active_closer",
      generatedRevenueEur: 8400,
      signedDealsCount: 5,
      callsCount: 142,
      weeklySchedule: {
        monday: "09h - 13h (Phoning Maps)",
        tuesday: "14h - 18h (Relances Maquettes)",
        wednesday: "09h - 13h (Closing)",
        thursday: "14h - 18h (Phoning Sites)",
        friday: "10h - 12h (Bilan RH avec Martin)",
      },
    },
    {
      id: "mem-emma",
      fullName: "Emma Laurent",
      email: "emma@xragency.fr",
      phone: "+33 6 77 88 99 00",
      joinedDate: "02 Novembre 2026",
      trainingDay: 19,
      trainingPhase: "Mois 1 - Fondations",
      status: "in_training",
      generatedRevenueEur: 2997,
      signedDealsCount: 2,
      callsCount: 68,
      weeklySchedule: {
        monday: "14h - 18h (Formation École)",
        tuesday: "09h - 13h (Écoute double avec Martin)",
        wednesday: "14h - 18h (Premiers appels)",
        thursday: "09h - 13h (Phoning)",
        friday: "14h - 16h (Débriefing hebdos)",
      },
    },
    {
      id: "mem-thomas",
      fullName: "Thomas Vasseur",
      email: "thomas@xragency.fr",
      phone: "+33 6 12 34 88 99",
      joinedDate: "18 Novembre 2026",
      trainingDay: 3,
      trainingPhase: "Mois 1 - Fondations",
      status: "in_training",
      generatedRevenueEur: 0,
      signedDealsCount: 0,
      callsCount: 12,
      weeklySchedule: {
        monday: "09h - 12h (Maîtrise du catalogue XR)",
        tuesday: "09h - 12h (Scripts WhatsApp 24h)",
        wednesday: "14h - 17h (Simulations d'objections)",
        thursday: "09h - 12h (Observation closing)",
        friday: "10h - 12h (Passage test dojo)",
      },
    },
  ]);

  // ── PIPELINE DES CANDIDATS AU RECRUTEMENT ──
  const [candidates, setCandidates] = useState<CandidateApplication[]>([
    {
      id: "cand-1",
      fullName: "Alexandre Morel",
      phone: "+33 6 99 11 22 33",
      email: "alex.morel@gmail.com",
      city: "Lyon",
      experienceLevel: "Closer Confirmé",
      status: "entretien_planifie",
      interviewDate: "Demain à 14h30",
      notes: "Ancien commercial B2B logiciel caisse. Très bonne élocution, cherche un cadre structuré.",
      appliedDate: "Il y a 2 jours",
    },
    {
      id: "cand-2",
      fullName: "Camille Bernard",
      phone: "+33 6 55 44 33 22",
      email: "camille.b@outlook.fr",
      city: "Bordeaux",
      experienceLevel: "Intermédiaire B2B",
      status: "entretien_valide",
      interviewDate: "Validé le 19 Nov",
      notes: "Motivation 10/10. Prête à démarrer la formation 90 jours lundi prochain.",
      appliedDate: "Il y a 4 jours",
    },
    {
      id: "cand-3",
      fullName: "Yanis Mansouri",
      phone: "+33 6 22 33 44 55",
      email: "yanis.m@yahoo.fr",
      city: "Marseille",
      experienceLevel: "Débutant motivé",
      status: "nouveau",
      notes: "Candidature reçue via le formulaire de recrutement XR Agency.",
      appliedDate: "Aujourd'hui 10h15",
    },
  ]);

  // Formulaire d'ajout express de candidat
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [newCandName, setNewCandName] = useState("");
  const [newCandPhone, setNewCandPhone] = useState("");
  const [newCandEmail, setNewCandEmail] = useState("");
  const [newCandCity, setNewCandCity] = useState("");
  const [newCandLevel, setNewCandLevel] = useState<CandidateApplication["experienceLevel"]>("Intermédiaire B2B");
  const [newCandNotes, setNewCandNotes] = useState("");

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandName.trim() || !newCandPhone.trim()) return;

    const newEntry: CandidateApplication = {
      id: `cand-${Date.now()}`,
      fullName: newCandName.trim(),
      phone: newCandPhone.trim(),
      email: newCandEmail.trim() || "candidat@email.com",
      city: newCandCity.trim() || "France",
      experienceLevel: newCandLevel,
      status: "nouveau",
      notes: newCandNotes.trim() || "Candidat ajouté manuellement par Martin.",
      appliedDate: "À l'instant",
    };

    setCandidates([newEntry, ...candidates]);
    setNewCandName("");
    setNewCandPhone("");
    setNewCandEmail("");
    setNewCandCity("");
    setNewCandNotes("");
    setShowAddCandidateModal(false);
  };

  const handleIntegrateCandidate = (cand: CandidateApplication) => {
    const newCloser: RecruitedCloser = {
      id: `mem-${Date.now()}`,
      fullName: cand.fullName,
      email: cand.email,
      phone: cand.phone,
      joinedDate: "Aujourd'hui",
      trainingDay: 1,
      trainingPhase: "Mois 1 - Fondations",
      status: "in_training",
      generatedRevenueEur: 0,
      signedDealsCount: 0,
      callsCount: 0,
      weeklySchedule: {
        monday: "09h - 12h (Intégration & Brief RH)",
        tuesday: "09h - 12h (Académie 90J)",
        wednesday: "14h - 18h (Scripts)",
        thursday: "09h - 12h (Dojo Objections)",
        friday: "10h - 12h (Bilan Semaine 1)",
      },
    };

    setRecruits([...recruits, newCloser]);
    setCandidates(candidates.map((c) => (c.id === cand.id ? { ...c, status: "integre" } : c)));
    alert(`🎉 ${cand.fullName} a été intégré dans l'équipe de Martin avec succès !`);
  };

  // ── CALCULS FINANCIERS OVERRIDE RH MARTIN ──
  const totalTeamGeneratedEur = useMemo(() => {
    return recruits.reduce((acc, r) => acc + r.generatedRevenueEur, 0);
  }, [recruits]);

  // Martin touche 10 % sur le CA de ses recrues
  const martinOverrideCommissionEur = useMemo(() => {
    return Math.round(totalTeamGeneratedEur * 0.1);
  }, [totalTeamGeneratedEur]);

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f7f5ef] font-sans">
      {/* ── TOPBAR RH SPÉCIFIQUE & SÉCURISÉE ── */}
      <header className="sticky top-0 z-40 border-b border-indigo-500/20 bg-[#0d0f17]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/40 bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/25 px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest text-indigo-300 border border-indigo-400/30">
                  ESPACE RH &amp; MANAGEMENT · PRIVÉ
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                  OVERRIDE 10% ACTIF
                </span>
              </div>
              <h1 className="text-base font-bold text-white">
                {currentUser.fullName} <span className="text-xs text-white/60 font-normal">(Manager RH &amp; Recrutement)</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bascule vers le mode Commercial personnel de Martin */}
            {onSwitchToCloserMode && (
              <button
                type="button"
                onClick={onSwitchToCloserMode}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-3.5 py-2 text-xs font-bold text-emerald-200 transition hover:bg-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              >
                <Swords className="h-4 w-4" />
                <span>Mon Espace Closer (Martin)</span>
              </button>
            )}

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/15 px-3 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/25"
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── BANDEAU RÉCAPITULATIF PERFORMANCES RH ── */}
      <section className="border-b border-white/10 bg-gradient-to-r from-indigo-950/40 via-[#101322] to-[#090b10] py-6 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-indigo-500/30 bg-black/50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-indigo-300">Mon Équipe Recrutée</span>
              <Users className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="mt-2 text-2xl font-black text-white">{recruits.length} Commerciaux</p>
            <span className="text-[11px] text-white/60">Recrutés &amp; formés par Martin</span>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-black/50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-cyan-300">CA Généré par l'Équipe</span>
              <TrendingUp className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="mt-2 text-2xl font-black text-white">{totalTeamGeneratedEur.toLocaleString("fr-FR")} €</p>
            <span className="text-[11px] text-emerald-400 font-bold">Chiffre d'affaires encaissé</span>
          </div>

          <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-b from-amber-950/40 to-black/60 p-4 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-300">Ma Commission Override (10%)</span>
              <Award className="h-4 w-4 text-amber-400" />
            </div>
            <p className="mt-2 text-2xl font-black text-amber-300">+{martinOverrideCommissionEur.toLocaleString("fr-FR")} €</p>
            <span className="text-[11px] text-amber-200/70 font-semibold">10% sur tout ce que son équipe génère</span>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-black/50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-300">Commissions Équipe (20%)</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-2 text-2xl font-black text-emerald-300">
              +{Math.round(totalTeamGeneratedEur * 0.2).toLocaleString("fr-FR")} €
            </p>
            <span className="text-[11px] text-white/60">20% répartis pour chaque recrue</span>
          </div>
        </div>
      </section>

      {/* ── ONGLETS DE GESTION RH ── */}
      <nav className="border-b border-white/10 bg-[#0d0f17]/90 px-4 py-2 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-2">
          {[
            { id: "recruits", label: "👥 Mon Équipe de Commerciaux", count: recruits.length },
            { id: "candidates", label: "📋 Pipeline Recrutement", count: candidates.filter(c => c.status !== "integre").length },
            { id: "inbox", label: "📬 Boîte Mail RH & Redirection", count: candidates.length },
            { id: "training", label: "🎓 Formation Académie (90j)" },
            { id: "schedules", label: "📅 Plannings & Shifts d'Appels" },
            { id: "commissions", label: "💰 Barème & Règle des 10% / 20%" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition",
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5",
              )}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="rounded-full bg-black/30 px-1.5 py-0.2 font-mono text-[10px]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ── CONTENU DES ONGLETS ── */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 space-y-6">

        {/* ── ONGLET 1 : MON ÉQUIPE DE COMMERCIAUX RECRUTÉS ── */}
        {activeTab === "recruits" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-white">Commerciaux Recrutés par Martin (Filière 20%)</h3>
                <p className="text-xs text-white/60">
                  Chacun prend 20 % de commission sur tout ce qu'il génère. Martin prend 10 % d'override managérial.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("candidates")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md transition"
              >
                <Plus className="h-4 w-4" />
                <span>Recruter un Nouveau Commercial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recruits.map((recruit) => (
                <div
                  key={recruit.id}
                  className="rounded-3xl border border-white/10 bg-[#121420] p-5 space-y-4 shadow-xl hover:border-indigo-400/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-white">{recruit.fullName}</h4>
                      <p className="text-xs text-white/60">{recruit.email}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase",
                        recruit.status === "active_closer"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-400/30",
                      )}
                    >
                      {recruit.status === "active_closer" ? "Closer Actif" : "En Formation"}
                    </span>
                  </div>

                  <div className="space-y-1.5 border-y border-white/10 py-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Avancement Académie :</span>
                      <span className="font-bold text-indigo-300">Jour {recruit.trainingDay} / 90</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${(recruit.trainingDay / 90) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-white/50 block italic">{recruit.trainingPhase}</span>
                  </div>

                  {/* Performances financières de la recrue */}
                  <div className="grid grid-cols-2 gap-2 bg-black/40 rounded-2xl p-3">
                    <div>
                      <span className="text-[10px] text-white/60 uppercase font-mono block">CA Généré</span>
                      <span className="text-sm font-black text-white">
                        {recruit.generatedRevenueEur.toLocaleString("fr-FR")} €
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 uppercase font-mono block">Sa Comm (20%)</span>
                      <span className="text-sm font-black text-emerald-300">
                        {Math.round(recruit.generatedRevenueEur * 0.2).toLocaleString("fr-FR")} €
                      </span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-white/10 flex justify-between items-center">
                      <span className="text-[10px] text-amber-300 font-mono">Commission Martin (10%) :</span>
                      <span className="text-xs font-black text-amber-300">
                        +{Math.round(recruit.generatedRevenueEur * 0.1).toLocaleString("fr-FR")} €
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>📞 {recruit.callsCount} appels passés</span>
                    <span>✅ {recruit.signedDealsCount} contrats signés</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ONGLET 2 : PIPELINE DE RECRUTEMENT ── */}
        {activeTab === "candidates" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-white">Candidats &amp; Entretiens d'Embauche</h3>
                <p className="text-xs text-white/60">
                  Gérez les candidatures entrantes, planifiez les entretiens et intégrez les meilleurs profils.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCandidateModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md transition"
              >
                <Plus className="h-4 w-4" />
                <span>+ Ajouter une Candidature</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121420] shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-black/40 font-mono text-[10px] text-white/60 uppercase">
                  <tr>
                    <th className="p-4">Candidat</th>
                    <th className="p-4">Profil &amp; Expérience</th>
                    <th className="p-4">Statut Entretien</th>
                    <th className="p-4">Remarques Martin</th>
                    <th className="p-4 text-right">Action RH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {candidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-white/5 transition">
                      <td className="p-4">
                        <div className="font-bold text-white">{cand.fullName}</div>
                        <div className="text-[11px] text-white/60">📞 {cand.phone} · 📍 {cand.city}</div>
                      </td>
                      <td className="p-4">
                        <span className="rounded-lg bg-white/10 px-2 py-1 font-mono text-[10px] text-white/80">
                          {cand.experienceLevel}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase",
                            cand.status === "integre" && "bg-emerald-500/20 text-emerald-300",
                            cand.status === "entretien_valide" && "bg-cyan-500/20 text-cyan-300",
                            cand.status === "entretien_planifie" && "bg-amber-500/20 text-amber-300",
                            cand.status === "nouveau" && "bg-purple-500/20 text-purple-300",
                          )}
                        >
                          {cand.status.replace("_", " ")}
                        </span>
                        {cand.interviewDate && (
                          <div className="text-[10px] text-white/50 mt-0.5">{cand.interviewDate}</div>
                        )}
                      </td>
                      <td className="p-4 text-white/70 max-w-xs">{cand.notes}</td>
                      <td className="p-4 text-right">
                        {cand.status !== "integre" ? (
                          <button
                            type="button"
                            onClick={() => handleIntegrateCandidate(cand)}
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Intégrer en Formation 90j</span>
                          </button>
                        ) : (
                          <span className="font-mono text-[11px] text-emerald-400 font-bold">
                            ✅ Intégré dans l'équipe
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ONGLET 3 : FORMATION ACADÉMIE 90 JOURS ── */}
        {activeTab === "training" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white">Programme de Formation XR School 90 Jours</h3>
              <p className="text-xs text-white/60">
                Suivi pédagogique strict des recrues géré par Martin pour les amener au niveau Closer Élite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-3xl border border-indigo-400/30 bg-[#121420] p-5 space-y-3">
                <span className="font-mono text-[10px] font-black text-indigo-300 uppercase bg-indigo-500/20 px-2 py-0.5 rounded-md">
                  MOIS 1 (J1 à J30)
                </span>
                <h4 className="text-base font-bold text-white">Fondations &amp; Offres XR</h4>
                <ul className="text-xs text-white/70 space-y-2 list-disc pl-4">
                  <li>Maîtrise intégrale des 4 piliers (Sites, Maps, CRM/POS, Récurrents).</li>
                  <li>La méthode de la Maquette Gratuite sous 24h sur WhatsApp.</li>
                  <li>Passer le barrage secrétaire en 45 secondes chrono.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-cyan-400/30 bg-[#121420] p-5 space-y-3">
                <span className="font-mono text-[10px] font-black text-cyan-300 uppercase bg-cyan-500/20 px-2 py-0.5 rounded-md">
                  MOIS 2 (J31 à J60)
                </span>
                <h4 className="text-base font-bold text-white">Objections &amp; Suivi Maquettes</h4>
                <ul className="text-xs text-white/70 space-y-2 list-disc pl-4">
                  <li>Désamorcer « C'est trop cher », « J'ai déjà un site », « Envoyez un mail ».</li>
                  <li>Déclencher l'effet waouh avec la maquette sur smartphone.</li>
                  <li>Verrouiller l'engagement et faire virer l'acompte sur le RIB KARMA.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-amber-400/30 bg-[#121420] p-5 space-y-3">
                <span className="font-mono text-[10px] font-black text-amber-300 uppercase bg-amber-500/20 px-2 py-0.5 rounded-md">
                  MOIS 3 (J61 à J90)
                </span>
                <h4 className="text-base font-bold text-white">Haut-Ticket &amp; Autonomie</h4>
                <ul className="text-xs text-white/70 space-y-2 list-disc pl-4">
                  <li>Closing CRM sur-mesure (2 000 €+) &amp; Bornes POS.</li>
                  <li>Location de robots humanoïdes à 499 €/mois.</li>
                  <li>Gestion autonome d'un portefeuille de clients et upsells à J+30.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── ONGLET 4 : PLANNINGS HEBDOMADAIRES DES RECRUES ── */}
        {activeTab === "schedules" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">Organisation des Plannings &amp; Shifts d'Appels</h3>
              <p className="text-xs text-white/60">
                Planification hebdomadaire des créneaux de phoning et des points de debrief avec Martin.
              </p>
            </div>

            <div className="space-y-4">
              {recruits.map((r) => (
                <div key={r.id} className="rounded-3xl border border-white/10 bg-[#121420] p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-black text-sm text-white">{r.fullName}</span>
                    <span className="font-mono text-xs text-indigo-300">Planning Hebdo Standard</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                    <div className="rounded-2xl bg-black/40 p-2.5">
                      <span className="font-mono text-[10px] text-white/50 uppercase block font-bold">Lundi</span>
                      <span className="text-white/80">{r.weeklySchedule.monday}</span>
                    </div>
                    <div className="rounded-2xl bg-black/40 p-2.5">
                      <span className="font-mono text-[10px] text-white/50 uppercase block font-bold">Mardi</span>
                      <span className="text-white/80">{r.weeklySchedule.tuesday}</span>
                    </div>
                    <div className="rounded-2xl bg-black/40 p-2.5">
                      <span className="font-mono text-[10px] text-white/50 uppercase block font-bold">Mercredi</span>
                      <span className="text-white/80">{r.weeklySchedule.wednesday}</span>
                    </div>
                    <div className="rounded-2xl bg-black/40 p-2.5">
                      <span className="font-mono text-[10px] text-white/50 uppercase block font-bold">Jeudi</span>
                      <span className="text-white/80">{r.weeklySchedule.thursday}</span>
                    </div>
                    <div className="rounded-2xl bg-black/40 p-2.5 border border-indigo-400/30">
                      <span className="font-mono text-[10px] text-indigo-300 uppercase block font-bold">Vendredi</span>
                      <span className="text-indigo-200">{r.weeklySchedule.friday}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ONGLET 5 : RÈGLES DE COMMISSIONS & ÉTANCHÉITÉ ── */}
        {activeTab === "commissions" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white">Architecture Officielle des Commissions XR Agency</h3>
              <p className="text-xs text-white/60">
                Règles de rémunération, étanchéité des cagnottes et confidentialité stricte des gains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Filière Martin */}
              <div className="rounded-3xl border-2 border-indigo-500/50 bg-[#121422] p-5 space-y-3">
                <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-300">
                  FILIÈRE MARTIN (RECRUTEMENT RH)
                </span>
                <h4 className="text-base font-bold text-white">Commerciaux Recrutés par Martin</h4>
                <div className="space-y-2 text-xs text-white/80">
                  <p>• <strong>20 % de commission directe</strong> sur tout le chiffre d'affaires qu'ils génèrent.</p>
                  <p>• <strong>10 % de commission managériale pour Martin</strong> sur le chiffre d'affaires de chacun.</p>
                </div>
              </div>

              {/* Filière Classique Direction */}
              <div className="rounded-3xl border-2 border-amber-500/50 bg-[#121422] p-5 space-y-3">
                <span className="rounded-md bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                  FILIÈRE DIRECTION (CLASSIQUE)
                </span>
                <h4 className="text-base font-bold text-white">Commerciaux Directs (Lucas, Sarah...)</h4>
                <div className="space-y-2 text-xs text-white/80">
                  <p>• <strong>30 % de commission directe</strong> (Sites internet) ou barème classique officiel.</p>
                  <p>• Indépendants de la filière Martin : Martin ne touche aucun override sur eux.</p>
                </div>
              </div>

              {/* Règle de Confidentialité Absolue */}
              <div className="rounded-3xl border-2 border-red-500/50 bg-[#181116] p-5 space-y-3">
                <span className="rounded-md bg-red-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-red-300 flex items-center gap-1 w-fit">
                  <Lock className="h-3 w-3" />
                  CONFIDENTIALITÉ ABSOLUE
                </span>
                <h4 className="text-base font-bold text-white">Règle de Secret des Gains</h4>
                <div className="space-y-2 text-xs text-white/80">
                  <p>• <strong>Personne ne peut voir ce que les autres gagnent</strong> en euros nets dans leur coffre.</p>
                  <p>• Les équipes voient uniquement le <strong>volume généré</strong> (CA brut &amp; nombre de deals signés) pour le classement de closing.</p>
                  <p>• Seul le <strong>Directeur Général</strong> a une vue consolidée sur l'ensemble des cagnottes de l'agence.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ONGLET 6 : BOÎTE MAIL INTERNE RH & REDIRECTION E-MAIL ── */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white">
                📬 Boîte de Réception Interne RH &amp; Configuration de Redirection
              </h3>
              <p className="text-xs text-white/60">
                L'identifiant <strong className="text-indigo-300">martin@xragency.fr</strong> sert d'identifiant de connexion CRM et de boîte de réception centralisée dans cet onglet.
              </p>
            </div>

            {/* Configuration de la vraie boîte mail externe de redirection */}
            <div className="rounded-3xl border border-indigo-400/40 bg-[#121422] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-indigo-300">
                    REDIRECTION E-MAIL TEMPS RÉEL (RESEND)
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    Où recevoir les e-mails externes &amp; candidatures du site ?
                  </h4>
                  <p className="text-xs text-white/65 mt-1">
                    Par défaut, tous les formulaires de recrutement (<code className="text-indigo-300">/recrutement</code>) arrivent instantanément ici dans le CRM <strong>ET</strong> sont envoyés par e-mail sur la boîte principale de Direction (<strong className="text-emerald-300">contact.xragency@gmail.com</strong>). Vous pouvez ajouter ci-dessous l'adresse e-mail personnelle réelle de Martin pour qu'il reçoive une copie directe sur son téléphone :
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <input
                  type="email"
                  value={martinForwardEmail}
                  onChange={(e) => {
                    setMartinForwardEmail(e.target.value);
                    setForwardSaved(false);
                  }}
                  placeholder="Ex: martin.recrutement@gmail.com"
                  className="flex-1 rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => setForwardSaved(true)}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-black text-white hover:bg-indigo-500 transition"
                >
                  {forwardSaved ? "✅ Redirection Enregistrée" : "Enregistrer l'E-mail de Réception"}
                </button>
              </div>
            </div>

            {/* Liste des messages et candidatures reçus dans la boîte interne */}
            <div className="rounded-3xl border border-white/10 bg-[#121420] p-5 space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>Messages &amp; Candidatures Reçus sur le Portail RH ({candidates.length})</span>
              </h4>

              <div className="divide-y divide-white/10">
                {candidates.map((cand) => (
                  <div key={cand.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-300">
                          CANDIDATURE WEB
                        </span>
                        <span className="font-bold text-sm text-white">{cand.fullName}</span>
                        <span className="text-xs text-white/50">&lt;{cand.email}&gt;</span>
                      </div>
                      <p className="text-xs text-white/75">{cand.notes}</p>
                      <span className="font-mono text-[10px] text-white/50 block">
                        📞 {cand.phone} · 📍 {cand.city} · Reçu : {cand.appliedDate}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("candidates")}
                      className="rounded-xl border border-indigo-400/40 bg-indigo-500/15 px-3 py-1.5 text-xs font-bold text-indigo-200 hover:bg-indigo-500/30"
                    >
                      Ouvrir la fiche candidat →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── MODALE D'AJOUT DE CANDIDAT ── */}
      {showAddCandidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#121422] p-6 shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setShowAddCandidateModal(false)}
              className="absolute top-4 right-4 rounded-full border border-white/10 p-1.5 text-white/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-black text-white">Ajouter une Nouvelle Candidature RH</h3>

            <form onSubmit={handleAddCandidate} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/70 font-bold mb-1">Nom et Prénom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maxime Girard"
                  value={newCandName}
                  onChange={(e) => setNewCandName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white/70 font-bold mb-1">Téléphone</label>
                  <input
                    type="tel"
                    required
                    placeholder="06 12 34 56 78"
                    value={newCandPhone}
                    onChange={(e) => setNewCandPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">Ville</label>
                  <input
                    type="text"
                    placeholder="Ex: Paris"
                    value={newCandCity}
                    onChange={(e) => setNewCandCity(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Niveau Commercial</label>
                <select
                  value={newCandLevel}
                  onChange={(e) => setNewCandLevel(e.target.value as CandidateApplication["experienceLevel"])}
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white outline-none focus:border-indigo-400"
                >
                  <option value="Débutant motivé">Débutant motivé (École 90j requise)</option>
                  <option value="Intermédiaire B2B">Intermédiaire B2B (Déjà vendu par téléphone)</option>
                  <option value="Closer Confirmé">Closer Confirmé (Top performer)</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Remarques ou Profil</label>
                <textarea
                  rows={2}
                  placeholder="Points forts du candidat..."
                  value={newCandNotes}
                  onChange={(e) => setNewCandNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCandidateModal(false)}
                  className="rounded-xl border border-white/15 px-4 py-2 font-bold text-white/70 hover:bg-white/10"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2 font-black text-white hover:bg-indigo-500 shadow-md"
                >
                  Enregistrer Candidat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
