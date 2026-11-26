import { useState, useEffect } from "react";
import {
  Rocket,
  Palette,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Briefcase,
  Plus,
  Trash2,
  Star,
  Link2,
} from "lucide-react";
import {
  DEFAULT_PROVIDERS,
  XR_OFFICIAL_SERVICES,
  computeDealCommissions,
  getLeadTotals,
  type ExternalProvider,
  type Lead,
  type ProjectMilestone,
  type TeamMember,
} from "@/lib/crm/data";
import type { CrmThemeTokens } from "@/lib/crm/theme";

interface ProjectsProvidersHubProps {
  visibleLeads: Lead[];
  members: TeamMember[];
  currentUser: TeamMember;
  theme: CrmThemeTokens;
  onUpdateLead: (updated: Lead) => void;
  onSound?: () => void;
}

const MILESTONES: { id: ProjectMilestone; label: string; pct: number }[] = [
  { id: "cadrage", label: "1. Cadrage", pct: 20 },
  { id: "design", label: "2. Maquette", pct: 45 },
  { id: "dev", label: "3. Dév / Intég.", pct: 70 },
  { id: "recette", label: "4. Recette", pct: 90 },
  { id: "live", label: "5. En Ligne 🚀", pct: 100 },
];

export function ProjectsProvidersHub({
  visibleLeads,
  members,
  currentUser,
  theme,
  onUpdateLead,
  onSound,
}: ProjectsProvidersHubProps) {
  const isDirector = currentUser.roleType === "direction";
  const canEditProduction = isDirector || currentUser.roleType === "studio";

  const [subTab, setSubTab] = useState<"projects" | "providers">("projects");
  const [urlDrafts, setUrlDrafts] = useState<Record<string, string>>({});

  const [providers, setProviders] = useState<ExternalProvider[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("xr_crm_providers_v1");
        if (raw) return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return DEFAULT_PROVIDERS;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_crm_providers_v1", JSON.stringify(providers));
    }
  }, [providers]);

  const [provName, setProvName] = useState("");
  const [provSpec, setProvSpec] = useState("");
  const [provCity, setProvCity] = useState("Da Nang / Remote");
  const [provContact, setProvContact] = useState("");
  const [provRate, setProvRate] = useState(200);

  const productionLeads = visibleLeads.filter(
    (l) => l.stage === "mockup" || l.stage === "won"
  );

  const addProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provName.trim()) return;
    setProviders([
      {
        id: `prov-${Date.now()}`,
        name: provName.trim(),
        specialty: provSpec.trim() || "Production Digitale",
        city: provCity.trim(),
        contact: provContact.trim(),
        avgRateEur: Number(provRate) || 0,
        rating: 5,
      },
      ...providers,
    ]);
    setProvName("");
    setProvSpec("");
    setProvContact("");
    onSound?.();
  };

  return (
    <div className="mt-6 space-y-5">
      {/* Header + Sous-navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className={`inline-flex p-1.5 rounded-2xl border gap-1.5 ${theme.tabBarBg}`}>
          <button
            onClick={() => setSubTab("projects")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              subTab === "projects" ? theme.tabActive : theme.tabIdle
            }`}
          >
            <Rocket className="w-4 h-4" /> Maquettes & Projets en Production ({productionLeads.length})
          </button>
          {isDirector && (
            <button
              onClick={() => setSubTab("providers")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                subTab === "providers" ? theme.tabActive : theme.tabIdle
              }`}
            >
              <Briefcase className="w-4 h-4" /> Prestataires & Marges Agence ({providers.length})
            </button>
          )}
        </div>
      </div>

      {/* VUE 1 : SUIVI MAQUETTES & PROJETS EN 5 JALONS */}
      {subTab === "projects" && (
        <div className="space-y-4">
          {productionLeads.length === 0 ? (
            <div className={`p-10 rounded-3xl border text-center space-y-2 ${theme.card}`}>
              <p className="text-3xl">🎨</p>
              <h3 className={`text-base font-black ${theme.textMain}`}>
                Aucune maquette ou projet en cours de production
              </h3>
              <p className={`text-xs ${theme.textMuted}`}>
                Dès qu'un prospect passe en colonne « Maquette » ou « Gagné », son suivi en 5 jalons et le partage du lien d'aperçu s'activent ici.
              </p>
            </div>
          ) : (
            productionLeads.map((lead) => {
              const svc = XR_OFFICIAL_SERVICES.find((s) => s.id === lead.serviceId);
              const closer = members.find((m) => m.id === lead.closerId);
              const currentMs: ProjectMilestone =
                lead.projectMilestone ||
                (lead.studioStatus === "delivered"
                  ? "live"
                  : lead.mockupReady
                    ? "design"
                    : "cadrage");
              const msObj = MILESTONES.find((m) => m.id === currentMs) || MILESTONES[0];
              const cleanPhone = lead.phone.replace(/[^0-9]/g, "");

              // Calcul marge nette réservé Direction
              const totals = getLeadTotals(lead);
              const comms = computeDealCommissions(lead, members);
              const totalTeamComm =
                comms.setterAmount + comms.closerAmount + comms.managerOverrideAmount;
              const provCost = lead.providerCost || 0;
              const netAgencyMargin = totals.commissionBase - totalTeamComm - provCost;

              const draftUrl =
                urlDrafts[lead.id] !== undefined ? urlDrafts[lead.id] : lead.mockupUrl || "";

              return (
                <div key={lead.id} className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${theme.card}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            lead.stage === "won"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-violet-500/15 text-violet-700 dark:text-violet-300"
                          }`}
                        >
                          {lead.stage === "won" ? "🏆 Projet Client Signé" : "🎨 Maquette Avant-Vente"}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${theme.badgeSoft}`}>
                          {svc?.icon} {svc?.name || lead.serviceId}
                        </span>
                        <span className={`text-xs ${theme.textMuted}`}>
                          Closer : <strong>{closer?.shortName || "Équipe"}</strong>
                        </span>
                      </div>
                      <h3 className={`text-lg font-black mt-1 ${theme.textMain}`}>
                        {lead.name} — <span className="font-semibold text-sm">{lead.planLabel}</span>
                      </h3>
                      {lead.issue && (
                        <p className={`text-xs mt-0.5 ${theme.textMuted}`}>Brief : {lead.issue}</p>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black font-mono text-indigo-600 dark:text-amber-300">
                        Avancement : {msObj.pct}%
                      </span>
                      {lead.mockupReady && (
                        <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-black">
                          <CheckCircle2 className="w-3 h-3" /> Prêt à présenter
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Barre des 5 Jalons Cliquables */}
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${msObj.pct}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {MILESTONES.map((m) => {
                        const active = m.id === currentMs;
                        return (
                          <button
                            key={m.id}
                            disabled={!canEditProduction}
                            onClick={() => {
                              onUpdateLead({
                                ...lead,
                                projectMilestone: m.id,
                                mockupReady: m.pct >= 45 ? true : lead.mockupReady,
                                studioStatus:
                                  m.id === "live"
                                    ? "delivered"
                                    : m.pct >= 45
                                      ? "in_production"
                                      : "pending",
                              });
                              onSound?.();
                            }}
                            className={`py-2 px-2.5 rounded-xl text-[11px] font-extrabold border transition-all ${
                              active
                                ? theme.tabActive
                                : `${theme.subCard} ${theme.textMuted} ${
                                    canEditProduction ? "hover:border-indigo-400" : "opacity-80"
                                  }`
                            }`}
                          >
                            {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lien d'aperçu Maquette / Staging + Envoi WhatsApp Client */}
                  <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 ${theme.subCard}`}>
                    <div className="flex items-center gap-2 flex-1">
                      <Link2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <input
                        type="url"
                        value={draftUrl}
                        onChange={(e) => setUrlDrafts({ ...urlDrafts, [lead.id]: e.target.value })}
                        placeholder="Lien d'aperçu Maquette / Site de démo (https://...)"
                        className={`w-full rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onUpdateLead({
                            ...lead,
                            mockupUrl: draftUrl.trim() || undefined,
                            mockupReady: Boolean(draftUrl.trim()) || lead.mockupReady,
                          });
                          onSound?.();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-extrabold shadow-sm"
                      >
                        Enregistrer Lien
                      </button>

                      {lead.mockupUrl && (
                        <>
                          <a
                            href={lead.mockupUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl border text-xs font-bold ${theme.card} ${theme.textMain}`}
                          >
                            Ouvrir <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Bonjour ${lead.contact.split(" ")[0]} ✨ Notre Studio vient de finaliser l'aperçu sur mesure pour ${lead.name} ! Découvrez-le directement ici : ${lead.mockupUrl} — Dites-moi ce que vous en pensez !`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Envoyer au client
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bloc Marge Nette & Sous-traitance STRICTEMENT RÉSERVÉ DIRECTION */}
                  {isDirector && lead.stage === "won" && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-amber-600 dark:text-amber-300">
                          👑 Sous-traitance & Marge :
                        </span>
                        <select
                          value={lead.providerId || ""}
                          onChange={(e) => {
                            const prov = providers.find((p) => p.id === e.target.value);
                            onUpdateLead({
                              ...lead,
                              providerId: e.target.value || undefined,
                              providerCost: prov ? prov.avgRateEur : lead.providerCost || 0,
                            });
                          }}
                          className={`rounded-xl px-2.5 py-1.5 text-xs border ${theme.inputBg}`}
                        >
                          <option value="">Production Interne (0 € externe)</option>
                          {providers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} (~{p.avgRateEur} €)
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min={0}
                          value={lead.providerCost || 0}
                          onChange={(e) =>
                            onUpdateLead({ ...lead, providerCost: Number(e.target.value) || 0 })
                          }
                          className={`w-24 rounded-xl px-2.5 py-1.5 text-xs font-mono border ${theme.inputBg}`}
                          title="Coût prestataire (€)"
                        />
                        <span className={theme.textMuted}>€ coût prod.</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 font-mono">
                        <span className={theme.textMuted}>
                          Vendu: <strong>{totals.commissionBase} €</strong>
                        </span>
                        <span className={theme.textMuted}>
                          Comm. équipe: <strong>-{totalTeamComm} €</strong>
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black">
                          Marge Nette Agence : {netAgencyMargin.toLocaleString("fr-FR")} €
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VUE 2 : CARNET PRESTATAIRES EXTERNES (RÉSERVÉ DIRECTION) */}
      {isDirector && subTab === "providers" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <form
            onSubmit={addProvider}
            className={`lg:col-span-4 p-5 rounded-3xl border space-y-3 h-fit ${theme.card}`}
          >
            <h3 className={`text-sm font-black flex items-center gap-2 ${theme.textMain}`}>
              <Plus className="w-4 h-4 text-indigo-500" /> Ajouter un Prestataire / Pôle
            </h3>
            <input
              required
              value={provName}
              onChange={(e) => setProvName(e.target.value)}
              placeholder="Nom du prestataire ou studio"
              className={`w-full rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
            />
            <input
              value={provSpec}
              onChange={(e) => setProvSpec(e.target.value)}
              placeholder="Spécialité (ex: Sites Web, SEO, Reels 4K...)"
              className={`w-full rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={provCity}
                onChange={(e) => setProvCity(e.target.value)}
                placeholder="Ville / Fuseau"
                className={`rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
              />
              <input
                type="number"
                value={provRate}
                onChange={(e) => setProvRate(Number(e.target.value))}
                placeholder="Tarif moyen €"
                className={`rounded-xl px-3 py-2 text-xs font-mono border ${theme.inputBg}`}
              />
            </div>
            <input
              value={provContact}
              onChange={(e) => setProvContact(e.target.value)}
              placeholder="Contact WhatsApp / Email"
              className={`w-full rounded-xl px-3 py-2 text-xs border ${theme.inputBg}`}
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold shadow-md"
            >
              Enregistrer le prestataire
            </button>
          </form>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {providers.map((p) => (
              <div key={p.id} className={`p-5 rounded-3xl border space-y-2.5 ${theme.card}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={`text-sm font-black ${theme.textMain}`}>{p.name}</h4>
                    <p className={`text-xs ${theme.textMuted}`}>{p.specialty}</p>
                  </div>
                  <button
                    onClick={() => setProviders(providers.filter((x) => x.id !== p.id))}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-white/10">
                  <span className={theme.textMuted}>📍 {p.city}</span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-300">
                    Forfait moy. {p.avgRateEur} €
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`font-mono ${theme.textMuted}`}>{p.contact}</span>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: p.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
