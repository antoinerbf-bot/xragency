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
} from "lucide-react";
import { type Lead, computeDealCommissions, type TeamMember } from "@/lib/crm/data";

interface PersonalTask {
  id: string;
  text: string;
  category: "pro" | "perso" | "achat";
  done: boolean;
  createdAt: string;
}

interface DirectorPersonalHubProps {
  allLeads: Lead[];
  members: TeamMember[];
  onUnlockCommission: (leadId: string) => void;
  onSound?: () => void;
}

export function DirectorPersonalHub({
  allLeads,
  members,
  onUnlockCommission,
  onSound,
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

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskCat, setNewTaskCat] = useState<PersonalTask["category"]>("pro");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_antoine_private_tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

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

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    onSound?.();
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const pendingValidations = allLeads.filter(
    (l) => l.stage === "won" && l.commissionStatus !== "unlocked"
  );

  return (
    <div className="mt-6 space-y-6">
      {/* En-tête Privé Direction + Double Horloge */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-white/[0.03] to-transparent border border-amber-400/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black shadow-lg">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Mon QG Privé · Vie Pro & Vie Perso
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Visible uniquement par Antoine
              </span>
            </h2>
            <p className="text-xs text-white/60 mt-0.5">
              Centralisez votre organisation personnelle, vos achats et vos décisions de direction sans jamais mélanger avec les dossiers commerciaux.
            </p>
          </div>
        </div>

        {/* Double Horloge Live */}
        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/[0.08] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <p className="text-[9px] uppercase text-white/40 font-semibold">Paris</p>
              <p className="text-sm font-mono font-bold text-white">{parisTime}</p>
            </div>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/[0.08] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <div>
              <p className="text-[9px] uppercase text-white/40 font-semibold">Asie (UTC+7)</p>
              <p className="text-sm font-mono font-bold text-white">{asiaTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ajout rapide de tâche pro / perso / achat */}
      <form
        onSubmit={addTask}
        className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row gap-2.5"
      >
        <select
          value={newTaskCat}
          onChange={(e) => setNewTaskCat(e.target.value as PersonalTask["category"])}
          className="bg-[#121620] border border-white/[0.1] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
        >
          <option value="pro">💼 Direction / Pro</option>
          <option value="perso">❤️ Vie Perso</option>
          <option value="achat">🛍️ Achats / Projets</option>
        </select>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Ajouter une priorité pro, une tâche perso ou un achat à ne pas oublier..."
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </form>

      {/* 3 Colonnes propres : Pro · Perso · Achats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          title="Direction & Pro"
          icon={<Briefcase className="w-4 h-4 text-amber-400" />}
          tasks={tasks.filter((t) => t.category === "pro")}
          onToggle={toggleTask}
          onRemove={removeTask}
        />
        <TaskColumn
          title="Vie Personnelle"
          icon={<Heart className="w-4 h-4 text-pink-400" />}
          tasks={tasks.filter((t) => t.category === "perso")}
          onToggle={toggleTask}
          onRemove={removeTask}
        />
        <TaskColumn
          title="Achats & Projets"
          icon={<ShoppingBag className="w-4 h-4 text-emerald-400" />}
          tasks={tasks.filter((t) => t.category === "achat")}
          onToggle={toggleTask}
          onRemove={removeTask}
        />
      </div>

      {/* Validation des virements & déblocage commissions en 1 clic */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Validation des Encaissements & Déblocage des Commissions ({pendingValidations.length})
        </h3>
        {pendingValidations.length === 0 ? (
          <p className="text-xs text-white/40">
            Aucun encaissement en attente de validation. Dès qu'un deal est signé, vous pourrez confirmer le virement client ici en 1 clic pour débloquer la commission du commercial.
          </p>
        ) : (
          <div className="space-y-2">
            {pendingValidations.map((lead) => {
              const breakdown = computeDealCommissions(lead, members);
              const closer = members.find((m) => m.id === lead.closerId);
              const setter = members.find((m) => m.id === lead.setterId);
              return (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-white">
                      {lead.name} — {lead.value.toLocaleString("fr-FR")} € ({lead.planLabel})
                    </p>
                    <p className="text-white/50 text-[11px]">
                      Closer : {closer?.shortName} ({breakdown.closerAmount} €)
                      {breakdown.setterAmount > 0 && ` · Setter : ${setter?.shortName} (${breakdown.setterAmount} €)`}
                      {breakdown.managerOverrideAmount > 0 && ` · Override Martin : ${breakdown.managerOverrideAmount} €`}
                    </p>
                  </div>
                  <button
                    onClick={() => onUnlockCommission(lead.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shrink-0"
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
  onToggle,
  onRemove,
}: {
  title: string;
  icon: React.ReactNode;
  tasks: PersonalTask[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] min-h-[220px] flex flex-col">
      <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 flex items-center gap-2 mb-3">
        {icon}
        {title}
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50">
          {tasks.filter((t) => !t.done).length}
        </span>
      </h4>

      {tasks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center text-[11px] text-white/30 italic px-4">
          Aucune note pour le moment.
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => (
            <div
              key={t.id}
              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${
                t.done
                  ? "bg-emerald-500/5 border-emerald-500/20 text-white/40 line-through"
                  : "bg-black/30 border-white/[0.06] text-white/90"
              }`}
            >
              <button
                onClick={() => onToggle(t.id)}
                className="flex items-center gap-2 text-left flex-1 min-w-0"
              >
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${t.done ? "text-emerald-400" : "text-white/25"}`}
                />
                <span className="truncate">{t.text}</span>
              </button>
              <button
                onClick={() => onRemove(t.id)}
                className="text-white/25 hover:text-red-400 p-1"
                title="Supprimer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
