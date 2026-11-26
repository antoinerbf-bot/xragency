import { useState, useEffect } from "react";
import { Users, UserPlus, CheckCircle2, Sparkles, ArrowRight, Trash2, GraduationCap } from "lucide-react";
import type { Lead, TeamMember, UserRoleType } from "@/lib/crm/data";
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

interface ManagerFiliereHubProps {
  managerId: string;
  members: TeamMember[];
  visibleLeads: Lead[];
  theme: CrmThemeTokens;
  onPromoteCandidate: (name: string, roleType: UserRoleType, managerId: string) => void;
  onSound?: () => void;
}

export function ManagerFiliereHub({
  managerId,
  members,
  visibleLeads,
  theme,
  onPromoteCandidate,
  onSound,
}: ManagerFiliereHubProps) {
  const storageKey = `xr_rh_candidates_${managerId}`;
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetRole, setTargetRole] = useState<UserRoleType>("student");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(candidates));
    }
  }, [candidates, storageKey]);

  const myTeam = members.filter((m) => m.recruitedBy === managerId);

  const addCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCandidates([
      {
        id: `cand-${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        targetRole,
        stage: "identified",
        notes: notes.trim(),
        createdAt: new Date().toLocaleDateString("fr-FR"),
      },
      ...candidates,
    ]);
    setName("");
    setPhone("");
    setNotes("");
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

  return (
    <div className="mt-6 space-y-5">
      <div className={`p-5 rounded-3xl border ${theme.card} flex items-center gap-3.5`}>
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-lg font-extrabold ${theme.textMain}`}>
            Pôle RH & Coaching · Ma Filière ({myTeam.length} membres actifs)
          </h2>
          <p className={`text-xs mt-0.5 ${theme.textMuted}`}>
            Suivez uniquement les commerciaux que vous avez ramenés, coachez-les et recrutez de nouveaux candidats rattachés à votre override de 10 %.
          </p>
        </div>
      </div>

      {/* Radar Coaching */}
      <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
        <h3 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Radar Coaching · Activité de mes recrues
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {myTeam.map((m) => {
            const memberLeads = visibleLeads.filter((l) => l.closerId === m.id || l.setterId === m.id);
            const activeCount = memberLeads.filter((l) => l.stage !== "won").length;
            const mockupCount = memberLeads.filter((l) => l.stage === "mockup").length;
            const wonCount = memberLeads.filter((l) => l.stage === "won").length;
            const needsCoaching = activeCount === 0 && wonCount === 0;

            return (
              <div key={m.id} className={`p-4 rounded-2xl border space-y-2.5 ${theme.subCard}`}>
                <div className="flex items-center gap-2.5">
                  <div
                    className={`h-9 w-9 rounded-xl bg-gradient-to-br ${m.avatarBg} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                  >
                    {m.shortName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-extrabold truncate ${theme.textMain}`}>{m.name}</p>
                    <p className={`text-[10px] truncate ${theme.textMuted}`}>{m.badge}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center pt-1">
                  <div className={`p-1.5 rounded-lg border ${theme.card}`}>
                    <p className={`text-[9px] ${theme.textSoft}`}>Actifs</p>
                    <p className={`text-xs font-black font-mono ${theme.textMain}`}>{activeCount}</p>
                  </div>
                  <div className={`p-1.5 rounded-lg border ${theme.card}`}>
                    <p className={`text-[9px] ${theme.textSoft}`}>Maq.</p>
                    <p className="text-xs font-black text-amber-500 font-mono">{mockupCount}</p>
                  </div>
                  <div className={`p-1.5 rounded-lg border ${theme.card}`}>
                    <p className={`text-[9px] ${theme.textSoft}`}>Ventes</p>
                    <p className="text-xs font-black text-emerald-500 font-mono">{wonCount}</p>
                  </div>
                </div>

                <div className="pt-1">
                  {needsCoaching ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      <GraduationCap className="w-3 h-3" /> À coacher / lancer
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> En dynamique 🔥
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pipeline Recrutement */}
      <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
        <h3 className={`text-sm font-extrabold flex items-center gap-2 ${theme.textMain}`}>
          <UserPlus className="w-4 h-4 text-amber-500" />
          Pipeline Recrutement Candidats
        </h3>

        <form onSubmit={addCandidate} className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du candidat *"
            className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Téléphone"
            className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
          />
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value as UserRoleType)}
            className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
          >
            <option value="student">🎓 Élève XR School</option>
            <option value="setter">📞 Setter B2B</option>
            <option value="closer">🎯 Closer B2B</option>
            <option value="full_cycle">⚡ Full-Cycle</option>
          </select>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes entretien..."
            className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs rounded-xl px-4 py-2 shadow-sm"
          >
            + Ajouter
          </button>
        </form>

        {candidates.length === 0 ? (
          <p className={`text-xs italic py-4 text-center ${theme.textSoft}`}>
            Aucun candidat en cours. Ajoutez vos futurs commerciaux ici pour suivre leur intégration jusqu'à l'activation en 1 clic.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {(
              [
                { key: "identified", label: "1. Identifié" },
                { key: "interview", label: "2. Entretien" },
                { key: "training", label: "3. Formation School" },
                { key: "active", label: "4. Intégré CRM ✓" },
              ] as const
            ).map((col) => (
              <div key={col.key} className={`p-3 rounded-2xl border space-y-2 min-h-[150px] ${theme.subCard}`}>
                <p className={`text-[11px] font-extrabold ${theme.textMain}`}>{col.label}</p>
                {candidates
                  .filter((c) => c.stage === col.key)
                  .map((c) => (
                    <div key={c.id} className={`p-2.5 rounded-xl border space-y-1.5 ${theme.card}`}>
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
                          className="w-full mt-1 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-bold flex items-center justify-center gap-1"
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
  );
}
