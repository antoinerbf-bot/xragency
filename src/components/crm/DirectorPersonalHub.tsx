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

const PRIVATE_TASKS_SEED_KEY = "xr_antoine_private_tasks_seeded_v1";

const DEFAULT_AGENCY_TOOL_TASKS: PersonalTask[] = [
  { id: "agency-tool-flyers", text: "Terminer les flyers en cours avant d'ouvrir un chantier serveur.", category: "pro", done: false, createdAt: "2026-11-28" },
  { id: "agency-tool-hermes-local", text: "Après les flyers, tester Hermes avec un modèle local sur le Mac.", category: "pro", done: false, createdAt: "2026-11-28" },
  { id: "agency-tool-cpanel", text: "Garder cPanel/o2switch pour les sites et le CRM ; pas de Docker dessus.", category: "pro", done: false, createdAt: "2026-11-28" },
  { id: "agency-tool-vps", text: "Comparer un VPS root uniquement si le test doit tourner 24 h/24.", category: "achat", done: false, createdAt: "2026-11-28" },
  { id: "agency-tool-automation-later", text: "Reprendre le choix des automatisations après les flyers.", category: "pro", done: false, createdAt: "2026-11-28" },
];
function loadInitialPersonalTasks(): PersonalTask[] {
  if (typeof window === "undefined") return [];

  let saved: PersonalTask[] = [];
  try {
    const raw = localStorage.getItem("xr_antoine_private_tasks");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) saved = parsed;
    }
  } catch {
    // ignore
  }

  if (localStorage.getItem(PRIVATE_TASKS_SEED_KEY) === "1") return saved;

  const savedIds = new Set(saved.map((task) => task.id));
  const seeded = [
    ...DEFAULT_AGENCY_TOOL_TASKS.filter((task) => !savedIds.has(task.id)),
    ...saved,
  ];
  localStorage.setItem(PRIVATE_TASKS_SEED_KEY, "1");
  localStorage.setItem("xr_antoine_private_tasks", JSON.stringify(seeded));
  return seeded;
}

interface DirectorPersonalHubProps {
  allLeads: Lead[];
  members: TeamMember[];
  weeklyChallenge: string;
  onUpdateWeeklyChallenge: (text: string) => void;
  onUnlockCommission: (leadId: string) => void;
  theme: CrmThemeTokens;
  onSound?: () => void;
}

export function DirectorPersonalHub({
  allLeads,
  members,
  weeklyChallenge,
  onUpdateWeeklyChallenge,
  onUnlockCommission,
  theme,
  onSound,
}: DirectorPersonalHubProps) {
  const [tasks, setTasks] = useState<PersonalTask[]>(loadInitialPersonalTasks);

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

          <div className="p-5 rounded-3xl bg-gradient-to-br from-fuchsia-600/15 via-violet-600/10 to-amber-500/15 border border-violet-400/35 space-y-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-violet-700 dark:text-amber-300 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              Piloter le Défi Hebdo du Concours
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={challengeInput}
                onChange={(e) => setChallengeInput(e.target.value)}
                placeholder="Ex: Bonus spécial sur chaque Pack Site + WebCare !"
                className={`flex-1 rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              />
              <button
                onClick={() => {
                  onUpdateWeeklyChallenge(challengeInput.trim());
                  onSound?.();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold text-xs shadow-sm shrink-0"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className={`text-sm font-extrabold ${theme.textMain}`}>Priorités XR Agency</h3>
        <p className={`text-xs mt-1 ${theme.textMuted}`}>On termine les flyers d'abord ; le serveur et l'automatisation viendront ensuite.</p>
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
                  <button
                    onClick={() => onUnlockCommission(lead.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-sm shrink-0"
                  >
                    ✓ Virement reçu · Débloquer
                  </button>
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
