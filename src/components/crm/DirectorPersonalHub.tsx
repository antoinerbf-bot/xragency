import { useState, useEffect } from "react";
import {
  Crown,
  CheckCircle2,
  Plus,
  Trash2,
  Clock,
  Briefcase,
  Heart,
  ShoppingBag,
  Lock,
  Calendar,
  Flame,
  Download,
  Trophy,
  FileText,
} from "lucide-react";
import { type Lead, computeDealCommissions, getLeadTotals, type TeamMember } from "@/lib/crm/data";
import type { CrmThemeTokens } from "@/lib/crm/theme";

interface PersonalTask {
  id: string;
  text: string;
  category: "pro" | "perso" | "achat";
  done: boolean;
  createdAt: string;
}

interface AgendaSlot {
  id: string;
  time: string;
  title: string;
  kind: "pro" | "perso";
  done: boolean;
}

interface HabitItem {
  id: string;
  label: string;
  doneToday: boolean;
}

interface ActiveProject {
  id: string;
  clientName: string;
  serviceType: string;
  closerName: string;
  progressPct: number;
  deadlineDate: string;
  status: "prep" | "in_dev" | "review" | "delivered";
  notes?: string;
}

interface LoyaltyClient {
  id: string;
  clientName: string;
  contactPerson: string;
  phone: string;
  currentService: string;
  targetRecurringOffer: string; // ex: "WebCare 99€/m", "Maps Top 3 159€/m", "SEO 499€/m"
  monthlyMrrEur: number;
  nextFollowUpDate: string;
  status: "to_contact" | "in_negotiation" | "subscribed";
  notes?: string;
}

interface DirectorPersonalHubProps {
  allLeads: Lead[];
  members: TeamMember[];
  weeklyChallenge: string;
  onUpdateWeeklyChallenge: (text: string) => void;
  onUnlockCommission: (leadId: string) => void;
  theme: CrmThemeTokens;
  onSound?: () => void;
  onOpenQuoteModal?: (lead: Lead) => void;
}

export function DirectorPersonalHub({
  allLeads,
  members,
  weeklyChallenge,
  onUpdateWeeklyChallenge,
  onUnlockCommission,
  theme,
  onSound,
  onOpenQuoteModal,
}: DirectorPersonalHubProps) {
  const [tasks, setTasks] = useState<PersonalTask[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_antoine_private_tasks");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [agenda, setAgenda] = useState<AgendaSlot[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_antoine_agenda");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [habits, setHabits] = useState<HabitItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_antoine_habits");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      { id: "h1", label: "Sport / Mouvement", doneToday: false },
      { id: "h2", label: "Revue KPIs & Équipe (10 min)", doneToday: false },
      { id: "h3", label: "Temps Perso / Déconnexion", doneToday: false },
    ];
  });

  // Projets clients en cours de livraison
  const [projects, setProjects] = useState<ActiveProject[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_antoine_active_projects");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: "proj-1",
        clientName: "Restaurant Le Gabriel Paris",
        serviceType: "Site Web Haute Couture + Caisse POS",
        closerName: "Christelle",
        progressPct: 65,
        deadlineDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        status: "in_dev",
        notes: "Intégration responsive terminée, validation du menu gastronomique",
      },
      {
        id: "proj-2",
        clientName: "Cabinet Architectes Mercier",
        serviceType: "Refonte Vitrine & Visuels Studio",
        closerName: "Pilar",
        progressPct: 40,
        deadlineDate: new Date(Date.now() + 8 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        status: "prep",
        notes: "Maquette livrée en moins de 24h, mise en place des visuels studio",
      },
    ];
  });

  // Fichier Fidélisation & Upsell Client (Abonnements récurrents)
  const [loyaltyClients, setLoyaltyClients] = useState<LoyaltyClient[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_antoine_loyalty_clients");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: "loy-1",
        clientName: "Boutique Joaillerie Vendôme",
        contactPerson: "Mme. De la Tour",
        phone: "+33 6 12 34 56 78",
        currentService: "Site E-Commerce livré",
        targetRecurringOffer: "Abonnement WebCare Élite (149 €/m) + SEO",
        monthlyMrrEur: 149,
        nextFollowUpDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        status: "to_contact",
        notes: "Proposer la garantie sécurité & sauvegardes quotidiennes",
      },
      {
        id: "loy-2",
        clientName: "Clinique Esthétique Marceau",
        contactPerson: "Dr. Benhamou",
        phone: "+33 6 98 76 54 32",
        currentService: "Refonte Site Web",
        targetRecurringOffer: "Pack Google Maps Top 3 (159 €/m)",
        monthlyMrrEur: 159,
        nextFollowUpDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().slice(0, 10),
        status: "in_negotiation",
        notes: "Audit Maps présenté, négociation du contrat annuel",
      },
    ];
  });

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjClient, setNewProjClient] = useState("");
  const [newProjService, setNewProjService] = useState("Site Web & Branding");
  const [newProjCloser, setNewProjCloser] = useState("Christelle");
  const [newProjDeadline, setNewProjDeadline] = useState(() => new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10));

  const [showAddLoyalty, setShowAddLoyalty] = useState(false);
  const [newLoyClient, setNewLoyClient] = useState("");
  const [newLoyContact, setNewLoyContact] = useState("");
  const [newLoyPhone, setNewLoyPhone] = useState("");
  const [newLoyOffer, setNewLoyOffer] = useState("WebCare Maintenance (99 €/m)");
  const [newLoyMrr, setNewLoyMrr] = useState(99);
  const [newLoyFollowUp, setNewLoyFollowUp] = useState(() => new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().slice(0, 10));

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskCat, setNewTaskCat] = useState<PersonalTask["category"]>("pro");
  const [slotTime, setSlotTime] = useState("10:00");
  const [slotTitle, setSlotTitle] = useState("");
  const [slotKind, setSlotKind] = useState<"pro" | "perso">("pro");
  const [challengeInput, setChallengeInput] = useState(weeklyChallenge);
  const [exportMonth, setExportMonth] = useState<string>("all");
  const [now, setNow] = useState(() => new Date());

  const payrollMonths = Array.from(
    new Set(
      allLeads
        .filter((l) => l.stage === "won")
        .map((l) => l.wonMonth || l.wonAt?.slice(0, 7) || new Date().toISOString().slice(0, 7))
    )
  ).sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("xr_antoine_private_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("xr_antoine_agenda", JSON.stringify(agenda));
  }, [agenda]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("xr_antoine_habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  const parisTime = now.toLocaleTimeString("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
  });
  const asiaTime = now.toLocaleTimeString("fr-FR", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  });

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([
      {
        id: `t-${Date.now()}`,
        text: newTaskText.trim(),
        category: newTaskCat,
        done: false,
        createdAt: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      },
      ...tasks,
    ]);
    setNewTaskText("");
    onSound?.();
  };

  const addAgendaSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotTitle.trim()) return;
    const next = [
      ...agenda,
      { id: `ag-${Date.now()}`, time: slotTime, title: slotTitle.trim(), kind: slotKind, done: false },
    ].sort((a, b) => a.time.localeCompare(b.time));
    setAgenda(next);
    setSlotTitle("");
    onSound?.();
  };

  const handleExportPayrollCsv = () => {
    const filteredWon = allLeads.filter((l) => {
      if (l.stage !== "won") return false;
      if (exportMonth === "all") return true;
      const ym = l.wonMonth || l.wonAt?.slice(0, 7) || new Date().toISOString().slice(0, 7);
      return ym === exportMonth;
    });
    const headers = "Periode;Membre;Role;Commissions_Debloquees_EUR;Commissions_En_Attente_EUR;Dont_Override_Manager_EUR\n";
    const rows = members
      .filter((m) => m.roleType !== "studio" && m.roleType !== "direction")
      .map((member) => {
        let unlocked = 0;
        let pending = 0;
        let overrideTotal = 0;
        filteredWon.forEach((deal) => {
          const b = computeDealCommissions(deal, members);
          let earned = 0;
          if (deal.closerId === member.id) earned += b.closerAmount;
          if (deal.setterId === member.id && deal.setterId !== deal.closerId) earned += b.setterAmount;
          if (b.managerId === member.id) {
            earned += b.managerOverrideAmount;
            overrideTotal += b.managerOverrideAmount;
          }
          if (earned > 0) {
            if (deal.commissionStatus === "unlocked") unlocked += earned;
            else pending += earned;
          }
        });
        const labelPeriod = exportMonth === "all" ? "Global" : exportMonth;
        return `"${labelPeriod}";"${member.name}";"${member.roleLabel}";"${unlocked}";"${pending}";"${overrideTotal}"`;
      })
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `XR-AGENCY-PAIE-COMMISSIONS-${exportMonth === "all" ? "GLOBAL" : exportMonth}.csv`;
    link.click();
  };

  const pendingValidations = allLeads.filter(
    (l) => l.stage === "won" && l.commissionStatus !== "unlocked"
  );

  return (
    <div className="mt-6 space-y-5">
      {/* En-tête Privé Direction */}
      <div className={`p-5 rounded-3xl border ${theme.card} flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-lg font-extrabold flex flex-wrap items-center gap-2 ${theme.textMain}`}>
              Mon QG Privé · Vie Pro & Vie Perso
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Privé Antoine
              </span>
            </h2>
            <p className={`text-xs mt-0.5 ${theme.textMuted}`}>
              Agenda Pro/Perso, rituels d'équilibre, défi hebdo du concours, validation des virements et export paie comptable.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className={`px-3.5 py-2 rounded-2xl border flex items-center gap-2 ${theme.subCard}`}>
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <div>
              <p className={`text-[9px] uppercase font-bold ${theme.textSoft}`}>Paris</p>
              <p className={`text-sm font-mono font-extrabold ${theme.textMain}`}>{parisTime}</p>
            </div>
          </div>
          <div className={`px-3.5 py-2 rounded-2xl border flex items-center gap-2 ${theme.subCard}`}>
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <div>
              <p className={`text-[9px] uppercase font-bold ${theme.textSoft}`}>Asie (UTC+7)</p>
              <p className={`text-sm font-mono font-extrabold ${theme.textMain}`}>{asiaTime}</p>
            </div>
          </div>
          <select
            value={exportMonth}
            onChange={(e) => setExportMonth(e.target.value)}
            className={`px-3 py-2.5 rounded-2xl border text-xs font-bold ${theme.inputBg}`}
          >
            <option value="all">📅 Paie : Tous les mois</option>
            {payrollMonths.map((m) => (
              <option key={m} value={m}>
                📅 {m}
              </option>
            ))}
          </select>
          <button
            onClick={handleExportPayrollCsv}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-extrabold shadow-md"
          >
            <Download className="w-3.5 h-3.5" /> Export Paie (CSV)
          </button>
        </div>
      </div>

      {/* Agenda + Rituels + Défi Hebdo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className={`lg:col-span-7 p-5 rounded-3xl border ${theme.card} space-y-3.5`}>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-amber-300 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Mon Agenda du Jour (Pro & Perso)
          </h3>

          <form onSubmit={addAgendaSlot} className="flex flex-wrap gap-2">
            <input
              type="time"
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
              className={`rounded-xl px-2.5 py-2 text-xs font-mono border ${theme.inputBg}`}
            />
            <select
              value={slotKind}
              onChange={(e) => setSlotKind(e.target.value as "pro" | "perso")}
              className={`rounded-xl px-2.5 py-2 text-xs border ${theme.inputBg}`}
            >
              <option value="pro">💼 Pro</option>
              <option value="perso">❤️ Perso</option>
            </select>
            <input
              type="text"
              value={slotTitle}
              onChange={(e) => setSlotTitle(e.target.value)}
              placeholder="Ex: Point Martin, Démo client, Séance sport..."
              className={`flex-1 min-w-[160px] rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs shadow-sm"
            >
              + Ajouter
            </button>
          </form>

          {agenda.length === 0 ? (
            <p className={`text-xs italic py-3 ${theme.textSoft}`}>
              Aucun créneau planifié aujourd'hui. Organisez vos blocs Pro & Perso ici.
            </p>
          ) : (
            <div className="space-y-2">
              {agenda.map((s) => (
                <div
                  key={s.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                    s.done
                      ? `${theme.subCard} opacity-50 line-through`
                      : s.kind === "pro"
                      ? "bg-indigo-500/10 border-indigo-400/30"
                      : "bg-rose-500/10 border-rose-400/30"
                  } ${theme.textMain}`}
                >
                  <button
                    onClick={() => {
                      setAgenda((prev) => prev.map((x) => (x.id === s.id ? { ...x, done: !x.done } : x)));
                      onSound?.();
                    }}
                    className="flex items-center gap-2.5 text-left flex-1"
                  >
                    <span className="font-mono font-extrabold text-indigo-600 dark:text-amber-300">{s.time}</span>
                    <span>{s.kind === "pro" ? "💼" : "❤️"}</span>
                    <span className="font-medium">{s.title}</span>
                  </button>
                  <button
                    onClick={() => setAgenda((prev) => prev.filter((x) => x.id !== s.id))}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className={`p-5 rounded-3xl border ${theme.card} space-y-2.5`}>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Mes Rituels Équilibre du Jour
            </h3>
            <div className="space-y-1.5">
              {habits.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setHabits((prev) => prev.map((x) => (x.id === h.id ? { ...x, doneToday: !x.doneToday } : x)));
                    onSound?.();
                  }}
                  className={`w-full p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all text-left ${
                    h.doneToday
                      ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-700 dark:text-emerald-200 line-through"
                      : `${theme.subCard} ${theme.textMain}`
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${h.doneToday ? "text-emerald-500" : "text-slate-400"}`} />
                  <span className="font-medium">{h.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-emerald-500/15 border border-indigo-400/35 space-y-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-amber-300 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" />
              Note &amp; Priorité Direction
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={challengeInput}
                onChange={(e) => setChallengeInput(e.target.value)}
                placeholder="Ex: Priorité qualité des maquettes & satisfaction client..."
                className={`flex-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              />
              <button
                onClick={() => {
                  onUpdateWeeklyChallenge(challengeInput.trim());
                  onSound?.();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold text-xs shadow-sm shrink-0"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ajout rapide tâche Pro / Perso / Achats */}
      <form onSubmit={addTask} className={`p-4 rounded-2xl border ${theme.card} flex flex-col sm:flex-row gap-2.5`}>
        <select
          value={newTaskCat}
          onChange={(e) => setNewTaskCat(e.target.value as PersonalTask["category"])}
          className={`rounded-xl px-3 py-2.5 text-xs border ${theme.inputBg}`}
        >
          <option value="pro">💼 Direction / Pro</option>
          <option value="perso">❤️ Vie Perso</option>
          <option value="achat">🛍️ Achats / Projets</option>
        </select>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Ajouter une priorité pro, une tâche perso ou un achat..."
          className={`flex-1 rounded-xl px-3.5 py-2.5 text-xs border ${theme.inputBg}`}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </form>

      {/* 3 Colonnes Pro / Perso / Achats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          title="Direction & Pro"
          icon={<Briefcase className="w-4 h-4 text-indigo-500" />}
          tasks={tasks.filter((t) => t.category === "pro")}
          theme={theme}
          onToggle={(id) => {
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
            onSound?.();
          }}
          onRemove={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
        />
        <TaskColumn
          title="Vie Personnelle"
          icon={<Heart className="w-4 h-4 text-rose-500" />}
          tasks={tasks.filter((t) => t.category === "perso")}
          theme={theme}
          onToggle={(id) => {
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
            onSound?.();
          }}
          onRemove={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
        />
        <TaskColumn
          title="Achats & Projets"
          icon={<ShoppingBag className="w-4 h-4 text-emerald-500" />}
          tasks={tasks.filter((t) => t.category === "achat")}
          theme={theme}
          onToggle={(id) => {
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
            onSound?.();
          }}
          onRemove={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
        />
      </div>

      {/* ── PILOTAGE DES PROJETS CLIENTS EN COURS (PRODUCTION STUDIO) ── */}
      <div className={`p-5 rounded-3xl border space-y-4 ${theme.card}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md">
              🚀
            </div>
            <div>
              <h3 className={`font-black text-sm sm:text-base flex items-center gap-2 ${theme.textMain}`}>
                Pilotage des Projets en Cours ({projects.length})
              </h3>
              <p className={`text-xs ${theme.textMuted}`}>
                Suivi de l'avancement technique, validation des livrables et délais de livraison client.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddProject(!showAddProject)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs shadow-sm hover:scale-[1.02]"
          >
            <Plus className="w-3.5 h-3.5" /> Enregistrer un projet
          </button>
        </div>

        {showAddProject && (
          <div className={`p-4 rounded-2xl border space-y-3 ${theme.subCard}`}>
            <h4 className={`text-xs font-bold ${theme.textMain}`}>Nouveau projet client à piloter</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <input
                type="text"
                placeholder="Nom du client (ex: Hôtel Vendôme)"
                value={newProjClient}
                onChange={(e) => setNewProjClient(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
              />
              <input
                type="text"
                placeholder="Prestation (ex: Site Vitrine + 3D)"
                value={newProjService}
                onChange={(e) => setNewProjService(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
              />
              <input
                type="text"
                placeholder="Commercial (ex: Christelle)"
                value={newProjCloser}
                onChange={(e) => setNewProjCloser(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
              />
              <input
                type="date"
                value={newProjDeadline}
                onChange={(e) => setNewProjDeadline(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddProject(false)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${theme.textMuted}`}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newProjClient.trim()) return;
                  const item: ActiveProject = {
                    id: `proj-${Date.now()}`,
                    clientName: newProjClient.trim(),
                    serviceType: newProjService.trim(),
                    closerName: newProjCloser.trim(),
                    progressPct: 20,
                    deadlineDate: newProjDeadline,
                    status: "in_dev",
                  };
                  const updated = [item, ...projects];
                  setProjects(updated);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("xr_antoine_active_projects", JSON.stringify(updated));
                  }
                  setNewProjClient("");
                  setShowAddProject(false);
                  onSound?.();
                }}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs"
              >
                Créer Projet
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {projects.map((p) => (
            <div key={p.id} className={`p-4 rounded-2xl border space-y-3 ${theme.subCard}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className={`font-black text-sm ${theme.textMain}`}>{p.clientName}</h4>
                  <p className={`text-[11px] ${theme.textMuted}`}>{p.serviceType} · Closer : <strong>{p.closerName}</strong></p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  📅 Échéance : {p.deadlineDate}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className={theme.textMuted}>Avancement</span>
                  <span className="text-indigo-600 dark:text-amber-300 font-mono">{p.progressPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                    style={{ width: `${p.progressPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const updated = projects.map((x) =>
                        x.id === p.id ? { ...x, progressPct: Math.min(100, x.progressPct + 20) } : x
                      );
                      setProjects(updated);
                      if (typeof window !== "undefined") {
                        localStorage.setItem("xr_antoine_active_projects", JSON.stringify(updated));
                      }
                      onSound?.();
                    }}
                    className="px-2 py-1 rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-amber-300 font-bold text-[10px]"
                  >
                    +20% Avancement
                  </button>
                  <button
                    onClick={() => {
                      const updated = projects.map((x) =>
                        x.id === p.id ? { ...x, progressPct: 100, status: "delivered" as const } : x
                      );
                      setProjects(updated);
                      if (typeof window !== "undefined") {
                        localStorage.setItem("xr_antoine_active_projects", JSON.stringify(updated));
                      }
                      onSound?.();
                    }}
                    className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px]"
                  >
                    ✓ Livré
                  </button>
                </div>
                <button
                  onClick={() => {
                    const updated = projects.filter((x) => x.id !== p.id);
                    setProjects(updated);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("xr_antoine_active_projects", JSON.stringify(updated));
                    }
                  }}
                  className="text-[10px] text-rose-500 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FIDÉLISATION CLIENT & UPSELL RÉCURRENT (MENSUEL / ANNUEL) ── */}
      <div className={`p-5 rounded-3xl border space-y-4 ${theme.card}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md">
              🔄
            </div>
            <div>
              <h3 className={`font-black text-sm sm:text-base flex items-center gap-2 ${theme.textMain}`}>
                Fidélisation &amp; Moteur MRR (Offres Récurrentes)
              </h3>
              <p className={`text-xs ${theme.textMuted}`}>
                Relances des clients livrés pour souscrire aux abonnements WebCare (99€/m), Maps Top 3 (159€/m) et SEO.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const wonLeads = allLeads.filter((l) => l.stage === "won");
                const existingNames = new Set(loyaltyClients.map((c) => c.clientName.toLowerCase()));
                const toAdd: LoyaltyClient[] = wonLeads
                  .filter((l) => !existingNames.has(l.name.toLowerCase()))
                  .map((l, i) => ({
                    id: `loy-auto-${Date.now()}-${i}`,
                    clientName: l.name,
                    contactPerson: l.contact,
                    phone: l.phone || "+33 6 00 00 00 00",
                    currentService: "Site Web livré",
                    targetRecurringOffer: "WebCare Maintenance Élite (99 €/m)",
                    monthlyMrrEur: 99,
                    nextFollowUpDate: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().slice(0, 10),
                    status: "to_contact" as const,
                    notes: "Import automatique prospect closé - Proposition WebCare à J+14",
                  }));

                if (toAdd.length === 0) {
                  alert("Tous les clients closés sont déjà présents dans votre portefeuille de fidélisation !");
                  return;
                }

                const updated = [...toAdd, ...loyaltyClients];
                setLoyaltyClients(updated);
                if (typeof window !== "undefined") {
                  localStorage.setItem("xr_antoine_loyalty_clients", JSON.stringify(updated));
                }
                onSound?.();
              }}
              title="Importer automatiquement les clients closés pour programmer la relance récurrente à J+14"
              className={`px-3 py-2 rounded-xl border text-xs font-bold transition hover:bg-black/5 dark:hover:bg-white/5 ${theme.subCard} ${theme.textMain}`}
            >
              ⚡ Auto-Import Clients Gagnés (J+14)
            </button>
            <button
              onClick={() => setShowAddLoyalty(!showAddLoyalty)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-sm hover:scale-[1.02]"
            >
              <Plus className="w-3.5 h-3.5" /> Ajouter client à fidéliser
            </button>
          </div>
        </div>

        {/* ── METRICS MRR / ARR REVENUS RÉCURRENTS ── */}
        {(() => {
          const activeSubscribers = loyaltyClients.filter((c) => c.status === "subscribed");
          const totalMrr = activeSubscribers.reduce((acc, c) => acc + (c.monthlyMrrEur || 0), 0);
          const totalArr = totalMrr * 12;
          const pipelineMrr = loyaltyClients
            .filter((c) => c.status !== "subscribed")
            .reduce((acc, c) => acc + (c.monthlyMrrEur || 0), 0);

          return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.textSoft}`}>MRR Actif Sécurisé</p>
                <p className="font-mono font-black text-xl text-emerald-600 dark:text-emerald-400">
                  {totalMrr.toLocaleString("fr-FR")} € <span className="text-xs font-normal text-slate-400">/ mois</span>
                </p>
                <p className={`text-[10px] ${theme.textMuted}`}>{activeSubscribers.length} client(s) sous contrat récurrent</p>
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.textSoft}`}>ARR (Projection Annuelle)</p>
                <p className="font-mono font-black text-xl text-indigo-600 dark:text-amber-300">
                  {totalArr.toLocaleString("fr-FR")} € <span className="text-xs font-normal text-slate-400">/ an</span>
                </p>
                <p className={`text-[10px] ${theme.textMuted}`}>Revenu garanti récurrent</p>
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.textSoft}`}>Potentiel en Négociation</p>
                <p className="font-mono font-black text-xl text-amber-500">
                  +{pipelineMrr.toLocaleString("fr-FR")} € <span className="text-xs font-normal text-slate-400">/ mois</span>
                </p>
                <p className={`text-[10px] ${theme.textMuted}`}>{loyaltyClients.length - activeSubscribers.length} client(s) à convertir</p>
              </div>
            </div>
          );
        })()}

        {showAddLoyalty && (
          <div className={`p-4 rounded-2xl border space-y-3 ${theme.subCard}`}>
            <h4 className={`text-xs font-bold ${theme.textMain}`}>Nouveau client pour relance fidélisation</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <input
                type="text"
                placeholder="Entreprise (ex: Brasserie Haussmann)"
                value={newLoyClient}
                onChange={(e) => setNewLoyClient(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
              />
              <input
                type="text"
                placeholder="Contact & Téléphone"
                value={newLoyContact}
                onChange={(e) => setNewLoyContact(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
              />
              <input
                type="text"
                placeholder="Offre récurrente (ex: WebCare 99€/m)"
                value={newLoyOffer}
                onChange={(e) => setNewLoyOffer(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
              />
              <input
                type="number"
                placeholder="MRR mensuel €"
                value={newLoyMrr}
                onChange={(e) => setNewLoyMrr(Number(e.target.value))}
                className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddLoyalty(false)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${theme.textMuted}`}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newLoyClient.trim()) return;
                  const item: LoyaltyClient = {
                    id: `loy-${Date.now()}`,
                    clientName: newLoyClient.trim(),
                    contactPerson: newLoyContact.trim(),
                    phone: newLoyPhone.trim() || "+33 1 00 00 00 00",
                    currentService: "Site livré",
                    targetRecurringOffer: newLoyOffer.trim(),
                    monthlyMrrEur: newLoyMrr,
                    nextFollowUpDate: newLoyFollowUp,
                    status: "to_contact",
                  };
                  const updated = [item, ...loyaltyClients];
                  setLoyaltyClients(updated);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("xr_antoine_loyalty_clients", JSON.stringify(updated));
                  }
                  setNewLoyClient("");
                  setShowAddLoyalty(false);
                  onSound?.();
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs"
              >
                Enregistrer Client
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {loyaltyClients.map((c) => (
            <div key={c.id} className={`p-4 rounded-2xl border space-y-2.5 ${theme.subCard}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className={`font-black text-sm ${theme.textMain}`}>{c.clientName}</h4>
                  <p className={`text-[11px] ${theme.textMuted}`}>{c.contactPerson} · {c.phone}</p>
                </div>
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    c.status === "subscribed"
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {c.status === "subscribed" ? "Abonné Actif ✓" : "Relance à faire"}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className={`text-[10px] uppercase font-bold ${theme.textSoft}`}>Offre récurrente visée</p>
                  <p className={`font-extrabold ${theme.textMain}`}>{c.targetRecurringOffer}</p>
                </div>
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  +{c.monthlyMrrEur} €/m
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/50 dark:border-white/10">
                <span className={`text-[10px] font-bold ${theme.textMuted}`}>📅 Prochaine relance : {c.nextFollowUpDate}</span>
                <div className="flex items-center gap-2">
                  {c.status !== "subscribed" ? (
                    <button
                      onClick={() => {
                        const updated = loyaltyClients.map((x) =>
                          x.id === c.id ? { ...x, status: "subscribed" as const } : x
                        );
                        setLoyaltyClients(updated);
                        if (typeof window !== "undefined") {
                          localStorage.setItem("xr_antoine_loyalty_clients", JSON.stringify(updated));
                        }
                        onSound?.();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-[10px]"
                    >
                      ✓ Converti en Abonné
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-600">Revenu récurrent sécurisé</span>
                  )}
                  <button
                    onClick={() => {
                      const updated = loyaltyClients.filter((x) => x.id !== c.id);
                      setLoyaltyClients(updated);
                      if (typeof window !== "undefined") {
                        localStorage.setItem("xr_antoine_loyalty_clients", JSON.stringify(updated));
                      }
                    }}
                    className="text-[10px] text-rose-500 hover:underline"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. DEMANDES DE DEVIS DES COMMERCIAUX EN ATTENTE DE VALIDATION D'ANTOINE ── */}
      {(() => {
        const pendingApprovalLeads = allLeads.filter(
          (l) => l.quoteWorkflowStatus === "pending_director_approval"
        );
        return (
          <div className={`p-5 rounded-3xl border-2 ${pendingApprovalLeads.length > 0 ? "border-amber-500/50 bg-amber-500/5" : theme.card} space-y-3`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
                  <FileText className="w-5 h-5" />
                </span>
                <div>
                  <h3 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
                    Demandes de Devis Soumises par les Commerciaux ({pendingApprovalLeads.length})
                    {pendingApprovalLeads.length > 0 && (
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500 text-white animate-pulse">
                        À Valider par Antoine
                      </span>
                    )}
                  </h3>
                  <p className={`text-xs ${theme.textMuted}`}>
                    Les commerciaux configurent l'offre avec les infos du prospect. Vous confirmez le prix, le délai Google Maps et validez le devis officiel.
                  </p>
                </div>
              </div>
            </div>

            {pendingApprovalLeads.length === 0 ? (
              <p className={`text-xs ${theme.textMuted}`}>
                Aucune demande de devis en attente de validation actuellement. Dès qu'un commercial soumet une proposition, elle apparaît ici pour votre accord.
              </p>
            ) : (
              <div className="space-y-2.5">
                {pendingApprovalLeads.map((lead) => {
                  const closer = members.find((m) => m.id === lead.closerId);
                  const totals = getLeadTotals(lead);
                  return (
                    <div
                      key={lead.id}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme.subCard} border-amber-500/30`}
                    >
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-indigo-500 dark:text-indigo-400">
                            {lead.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            Soumis par : <strong>{closer?.name || "Commercial"}</strong>
                          </span>
                        </div>
                        <p className={`text-[11px] ${theme.textMuted}`}>
                          Prestations : <strong>{lead.planLabel}</strong>
                          {lead.extraItems && lead.extraItems.length > 0 && ` + ${lead.extraItems.map((i) => i.planLabel).join(", ")}`}
                          {lead.mapsContract?.enabled && ` · ★ Pack Google Maps Top 3 Garanti (${lead.mapsContract.price} €/an · Délai ${lead.mapsContract.deliveryDelayDays}j)`}
                        </p>
                        <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                          Total proposé : {totals.oneShotTotal.toLocaleString("fr-FR")} € HT {totals.mrrTotal > 0 ? `+ ${totals.mrrTotal} €/mois HT` : ""} · Acompte 50% attendu : {Math.round(totals.oneShotTotal * 0.5).toLocaleString("fr-FR")} €
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {onOpenQuoteModal && (
                          <button
                            onClick={() => onOpenQuoteModal(lead)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
                          >
                            <FileText className="w-4 h-4 text-white" />
                            Examiner, Ajuster & Valider Devis (Antoine)
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* ── 2. NOUVEAUX CLIENTS ENTRÉS & CALENDRIER D'UPSELL ── */}
      {(() => {
        const onboardedClients = allLeads.filter(
          (l) => l.onboardingDate || (l.stage === "won" && l.invoiceStatus === "paid")
        );
        return (
          <div className={`p-5 rounded-3xl border ${theme.card} space-y-3`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-500">
                  <Calendar className="w-5 h-5" />
                </span>
                <div>
                  <h3 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
                    Nouveaux Clients Entrés & Calendrier de Suivi / Upsell ({onboardedClients.length})
                  </h3>
                  <p className={`text-xs ${theme.textMuted}`}>
                    Clients sous contrat actif chez XR Agency avec date d'entrée officielle, prestations actives et jalons d'upsell à proposer.
                  </p>
                </div>
              </div>
            </div>

            {onboardedClients.length === 0 ? (
              <p className={`text-xs ${theme.textMuted}`}>
                Aucun client actif enregistré pour le moment. Dès qu'un acompte de 50% est validé, le client et ses opportunités d'upsell sont synchronisés ici.
              </p>
            ) : (
              <div className="space-y-2.5">
                {onboardedClients.map((client) => {
                  const closer = members.find((m) => m.id === client.closerId);
                  const entryDateStr = client.onboardingDate || client.wonAt?.slice(0, 10) || "Récent";
                  const activeSvcs = client.activeServicesList?.join(" · ") || client.planLabel;

                  // Détection des opportunités d'upsell
                  const missingOffers: string[] = [];
                  const extraIds = (client.extraItems || []).map((i) => i.id);
                  if (!extraIds.some((id) => id.includes("wc"))) missingOffers.push("WebCare Maintenance (dès 29€/m)");
                  if (!client.mapsContract?.enabled) missingOffers.push("Google Maps Top 3 Garanti (dès 999€/an)");
                  if (!extraIds.some((id) => id.includes("social"))) missingOffers.push("Social Media (dès 299€/m)");
                  if (!extraIds.some((id) => id.includes("seo"))) missingOffers.push("SEO Croissance (dès 299€/m)");

                  return (
                    <div
                      key={client.id}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme.subCard}`}
                    >
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                            {client.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                            Entré le : {entryDateStr}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            Closer : <strong>{closer?.shortName || "XR Agency"}</strong>
                          </span>
                        </div>
                        <p className={`text-[11px] ${theme.textMuted}`}>
                          Prestations actives : <span className="font-medium text-zinc-700 dark:text-zinc-200">{activeSvcs}</span>
                        </p>
                        {missingOffers.length > 0 ? (
                          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                            <span>💡 Prochains Upsells recommandés à J+30 :</span>
                            <span className="font-normal text-zinc-600 dark:text-zinc-300">{missingOffers.slice(0, 2).join(" · ")}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            ★ Client Full-Stack XR Agency (Toutes offres souscrites)
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {onOpenQuoteModal && (
                          <button
                            onClick={() => onOpenQuoteModal(client)}
                            className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold flex items-center gap-1"
                            title="Consulter le devis et facturation"
                          >
                            <FileText className="w-3.5 h-3.5 text-zinc-500" />
                            Gérer
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* Devis émis en attente de virement d'acompte (50%) */}
      {(() => {
        const pendingQuotes = allLeads.filter(
          (l) => l.stage === "proposal" || l.invoiceStatus === "deposit_sent"
        );
        return (
          <div className={`p-5 rounded-3xl border ${theme.card} space-y-3`}>
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
                <FileText className="w-4 h-4 text-amber-500" />
                Devis & Contrats en Attente du Virement de l'Acompte 50% ({pendingQuotes.length})
              </h3>
            </div>
            {pendingQuotes.length === 0 ? (
              <p className={`text-xs ${theme.textMuted}`}>
                Aucun devis en attente d'acompte actuellement. Dès qu'un prospect valide sa maquette, configurez son devis interactif pour synchroniser le virement attendu.
              </p>
            ) : (
              <div className="space-y-2">
                {pendingQuotes.map((lead) => {
                  const totals = getLeadTotals(lead);
                  const depositAmount = Math.round(totals.oneShotTotal * 0.5);
                  const closer = members.find((m) => m.id === lead.closerId);
                  return (
                    <div
                      key={lead.id}
                      className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme.subCard}`}
                    >
                      <div className="text-xs space-y-0.5">
                        <p className={`font-extrabold ${theme.textMain}`}>
                          {lead.name} — Total {totals.oneShotTotal.toLocaleString("fr-FR")} € {totals.mrrTotal > 0 ? `+ ${totals.mrrTotal} €/mois` : ""} ({lead.planLabel})
                        </p>
                        <p className={`text-[11px] ${theme.textMuted}`}>
                          Acompte attendu : <strong className="text-amber-500">{depositAmount.toLocaleString("fr-FR")} €</strong> · Commercial : {closer?.shortName || "XR Agency"} · Contact : {lead.phone}
                          {lead.mapsContract?.enabled && " · ★ Pack Maps Top 3 inclus"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {onOpenQuoteModal && (
                          <button
                            onClick={() => onOpenQuoteModal(lead)}
                            className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1 shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-500" />
                            Gérer Devis & Virement
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* Validation des encaissements */}
      <div className={`p-5 rounded-3xl border ${theme.card} space-y-3`}>
        <h3 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Validation des Encaissements & Déblocage des Commissions ({pendingValidations.length})
        </h3>
        {pendingValidations.length === 0 ? (
          <p className={`text-xs ${theme.textMuted}`}>
            Aucun encaissement en attente. Dès qu'un contrat est signé, confirmez le virement ici en 1 clic pour débloquer la commission.
          </p>
        ) : (
          <div className="space-y-2">
            {pendingValidations.map((lead) => {
              const breakdown = computeDealCommissions(lead, members);
              const totals = getLeadTotals(lead);
              const closer = members.find((m) => m.id === lead.closerId);
              const setter = members.find((m) => m.id === lead.setterId);
              return (
                <div
                  key={lead.id}
                  className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme.subCard}`}
                >
                  <div className="text-xs space-y-0.5">
                    <p className={`font-extrabold ${theme.textMain}`}>
                      {lead.name} — {totals.commissionBase.toLocaleString("fr-FR")} € ({lead.planLabel}
                      {lead.extraItems?.length ? ` + ${lead.extraItems.length} pack` : ""})
                      {lead.installments?.plan === "3x" && ` · 3x (${lead.installments.paidCount}/3)`}
                    </p>
                    <p className={`text-[11px] ${theme.textMuted}`}>
                      Closer : {closer?.shortName} ({breakdown.closerAmount} €)
                      {breakdown.setterAmount > 0 && ` · Setter : ${setter?.shortName} (${breakdown.setterAmount} €)`}
                      {breakdown.managerOverrideAmount > 0 && ` · Override Martin : ${breakdown.managerOverrideAmount} €`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {onOpenQuoteModal && (
                      <button
                        onClick={() => onOpenQuoteModal(lead)}
                        className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold"
                        title="Ouvrir le devis & la facture"
                      >
                        <FileText className="w-3.5 h-3.5 text-zinc-500" />
                      </button>
                    )}
                    <button
                      onClick={() => onUnlockCommission(lead.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-sm shrink-0"
                    >
                      ✓ Virement reçu · Débloquer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TaskColumn({
  title,
  icon,
  tasks,
  theme,
  onToggle,
  onRemove,
}: {
  title: string;
  icon: React.ReactNode;
  tasks: PersonalTask[];
  theme: CrmThemeTokens;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className={`p-4 rounded-3xl border ${theme.card} min-h-[200px] flex flex-col`}>
      <h4 className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 mb-3 ${theme.textMain}`}>
        {icon}
        {title}
        <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full border ${theme.subCard} ${theme.textMuted}`}>
          {tasks.filter((t) => !t.done).length}
        </span>
      </h4>

      {tasks.length === 0 ? (
        <div className={`flex-1 flex items-center justify-center text-center text-[11px] italic px-4 ${theme.textSoft}`}>
          Aucune note pour le moment.
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => (
            <div
              key={t.id}
              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${
                t.done
                  ? "bg-emerald-500/10 border-emerald-500/25 opacity-60 line-through"
                  : `${theme.subCard}`
              } ${theme.textMain}`}
            >
              <button onClick={() => onToggle(t.id)} className="flex items-center gap-2 text-left flex-1 min-w-0">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${t.done ? "text-emerald-500" : "text-slate-400"}`} />
                <span className="truncate font-medium">{t.text}</span>
              </button>
              <button onClick={() => onRemove(t.id)} className="text-slate-400 hover:text-rose-500 p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
