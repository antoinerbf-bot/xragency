import { useState, useMemo } from "react";
import {
  Briefcase,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  Sparkles,
  Calendar,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmProjectRecord, ProjectMilestone } from "@/lib/crm-store";

interface CrmProjectsTabProps {
  projects: CrmProjectRecord[];
  isAdmin: boolean;
  onCreateProject: (project: {
    projectName: string;
    clientName: string;
    serviceCategory: string;
    budgetEur: number;
    deliveryDeadline: string;
    notes?: string;
  }) => Promise<void>;
  onUpdateProject: (projectId: string, updates: Partial<CrmProjectRecord>) => Promise<void>;
}

const STAGE_LABELS: Record<CrmProjectRecord["stage"], { label: string; color: string }> = {
  prep: { label: "À préparer", color: "border-blue-400/40 bg-blue-400/10 text-blue-300" },
  waiting: { label: "En attente", color: "border-amber-400/40 bg-amber-400/10 text-amber-300" },
  production: { label: "En production", color: "border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37]" },
  review: { label: "En validation", color: "border-purple-400/40 bg-purple-400/10 text-purple-300" },
  delivered: { label: "Livré", color: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400" },
  suspended: { label: "Suspendu", color: "border-red-400/40 bg-red-400/10 text-red-400" },
};

export function CrmProjectsTab({
  projects,
  isAdmin,
  onCreateProject,
  onUpdateProject,
}: CrmProjectsTabProps) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id || null);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [serviceCategory, setServiceCategory] = useState("Web & SEO");
  const [budgetEur, setBudgetEur] = useState(1499);
  const [deadline, setDeadline] = useState("Sous 7 jours ouvrés");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        !search ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.projectName.toLowerCase().includes(search.toLowerCase()) ||
        p.clientName.toLowerCase().includes(search.toLowerCase());
      const matchStage = stageFilter === "all" || p.stage === stageFilter;
      return matchSearch && matchStage;
    });
  }, [projects, search, stageFilter]);

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) || filteredProjects[0],
    [projects, selectedProjectId, filteredProjects]
  );

  const handleToggleMilestone = async (milestoneId: string) => {
    if (!selectedProject) return;
    const updatedMilestones = selectedProject.milestones.map((m) =>
      m.id === milestoneId ? { ...m, done: !m.done } : m
    );
    const completedCount = updatedMilestones.filter((m) => m.done).length;
    const progressPct = Math.round((completedCount / updatedMilestones.length) * 100);
    const newStage = progressPct === 100 ? "delivered" : selectedProject.stage;

    await onUpdateProject(selectedProject.id, {
      milestones: updatedMilestones,
      progressPct,
      stage: newStage,
    });
  };

  const handleChangeStage = async (stage: CrmProjectRecord["stage"]) => {
    if (!selectedProject) return;
    await onUpdateProject(selectedProject.id, { stage });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !clientName.trim()) return;
    setSaving(true);
    try {
      await onCreateProject({
        projectName: projectName.trim(),
        clientName: clientName.trim(),
        serviceCategory,
        budgetEur: Number(budgetEur) || 1499,
        deliveryDeadline: deadline,
        notes,
      });
      setShowModal(false);
      setProjectName("");
      setClientName("");
      setNotes("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">Projets en Production</span>
          <p className="mt-2 text-3xl font-extrabold text-[#d4af37] font-serif">
            {projects.filter((p) => p.stage === "production" || p.stage === "prep").length}
          </p>
          <span className="mt-1 block font-mono text-[10px] text-[#94a3b8]">En cours de développement</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">Projets Livrés</span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400 font-serif">
            {projects.filter((p) => p.stage === "delivered").length}
          </p>
          <span className="mt-1 block font-mono text-[10px] text-[#94a3b8]">En ligne & opérationnels</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Nouveau Projet</span>
            <p className="mt-1 text-xs text-[#cbd5e1]">Ouvrir un chantier de production</p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-white transition shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Créer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0a0d14]/90 p-3.5 backdrop-blur-xl">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Rechercher par nom de projet, client ou ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-[#64748b] focus:border-[#d4af37] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["all", "production", "prep", "review", "delivered", "waiting"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStageFilter(st)}
              className={cn(
                "rounded-xl px-3 py-1.5 font-mono text-[10px] font-bold uppercase transition shrink-0",
                stageFilter === st
                  ? "bg-[#d4af37] text-black"
                  : "bg-white/5 text-[#94a3b8] hover:bg-white/10 hover:text-white"
              )}
            >
              {st === "all" ? "Tous" : STAGE_LABELS[st as CrmProjectRecord["stage"]]?.label || st}
            </button>
          ))}
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#080a10] p-8 text-center text-[#94a3b8]">
              Aucun projet trouvé.
            </div>
          ) : (
            filteredProjects.map((prj) => {
              const isSelected = selectedProject?.id === prj.id;
              const meta = STAGE_LABELS[prj.stage];
              return (
                <div
                  key={prj.id}
                  onClick={() => setSelectedProjectId(prj.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all backdrop-blur-xl",
                    isSelected
                      ? "border-[#d4af37] bg-white/[0.07] shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                      : "border-white/10 bg-[#080a10]/70 hover:border-white/20 hover:bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#d4af37]">{prj.id}</span>
                        <span className="text-[10px] text-[#94a3b8] font-mono">{prj.serviceCategory}</span>
                      </div>
                      <h4 className="mt-1 font-bold text-sm text-white tracking-tight">{prj.projectName}</h4>
                      <p className="text-[11px] text-[#94a3b8]">{prj.clientName}</p>
                    </div>

                    <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase border", meta.color)}>
                      {meta.label}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-[#94a3b8]">
                      <span>Progression</span>
                      <span className="text-white font-bold">{prj.progressPct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-emerald-400 transition-all duration-300"
                        style={{ width: `${prj.progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Dossier */}
        <div className="lg:col-span-7">
          {selectedProject ? (
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0e14]/90 via-[#07090e]/90 to-[#030406]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#d4af37] tracking-widest block">
                      CHANTIER PRODUCTION · {selectedProject.id}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-serif mt-1">{selectedProject.projectName}</h3>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Client : <span className="text-white font-semibold">{selectedProject.clientName}</span> · Délai : {selectedProject.deliveryDeadline}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedProject.stage}
                    onChange={(e) => handleChangeStage(e.target.value as CrmProjectRecord["stage"])}
                    className="rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-[#d4af37] outline-none hover:border-[#d4af37]"
                  >
                    {Object.entries(STAGE_LABELS).map(([k, meta]) => (
                      <option key={k} value={k} className="text-black">
                        {meta.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-[#94a3b8] uppercase">Avancement Opérationnel</span>
                  <span className="font-bold text-lg text-emerald-400">{selectedProject.progressPct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e8c8] to-emerald-400 transition-all duration-300"
                    style={{ width: `${selectedProject.progressPct}%` }}
                  />
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37] block">
                  Jalons de Livraison (Cliquer pour valider)
                </span>
                <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#080a10]/60 overflow-hidden text-xs">
                  {selectedProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => handleToggleMilestone(m.id)}
                      className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.03] transition"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-5 w-5 rounded-md border flex items-center justify-center transition-all",
                            m.done
                              ? "border-emerald-400 bg-emerald-400 text-black"
                              : "border-white/20 bg-white/5 text-transparent"
                          )}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 fill-current" />
                        </div>
                        <span className={cn("text-xs font-medium", m.done ? "text-white line-through opacity-70" : "text-white")}>
                          {m.title}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#94a3b8]">
                        {m.done ? "Terminé" : "À faire"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3.5 flex items-center justify-between text-xs text-emerald-300 hover:bg-emerald-400/20 transition"
                  >
                    <span>URL Production</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {selectedProject.stagingUrl && (
                  <a
                    href={selectedProject.stagingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/5 p-3.5 flex items-center justify-between text-xs text-[#cbd5e1] hover:bg-white/10 transition"
                  >
                    <span>URL Recette</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              {selectedProject.notes && (
                <div className="space-y-1 border-t border-white/10 pt-3 text-xs text-[#94a3b8]">
                  <span className="font-mono uppercase text-[10px] text-[#d4af37] block">Instructions de production</span>
                  <p className="whitespace-pre-wrap">{selectedProject.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#080a10] p-12 text-center text-[#94a3b8]">
              Sélectionnez un projet pour suivre l'avancement des jalons.
            </div>
          )}
        </div>
      </div>

      {/* Modal Créer Nouveau Projet */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-[#0c0e14] p-6 sm:p-8 shadow-2xl text-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-serif">Nouveau Projet Client</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-[#94a3b8] hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Nom du Projet *</label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="ex. Refonte Digitale & 3D Pok-N Ball"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Client / Entreprise *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Nom du client"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Catégorie</label>
                  <input
                    type="text"
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    placeholder="Web, SEO, Branding, Maps..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Budget Alloué (€)</label>
                  <input
                    type="number"
                    value={budgetEur}
                    onChange={(e) => setBudgetEur(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Délai de Livraison</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="ex. Sous 7 jours ouvrés"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#94a3b8] mb-1 font-mono uppercase text-[10px]">Notes & Spécifications</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Objectifs, attentes graphiques, accès..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#94a3b8] hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#d4af37] px-5 py-2 text-xs font-bold text-black uppercase tracking-wider hover:bg-white transition"
                >
                  {saving ? "Création..." : "Lancer le projet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
