import { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Phone,
  MessageSquare,
  ExternalLink,
  Plus,
  Target,
  ArrowRight,
  Flame,
  ShieldAlert,
  Download,
  Briefcase,
  Home,
  Layers,
} from "lucide-react";
import type { Lead, TeamMember, ClientMilestone } from "@/lib/crm/data";
import type { CrmThemeTokens } from "@/lib/crm/theme";
import {
  buildLeadFollowUpGoogleUrl,
  buildMilestoneGoogleUrl,
} from "@/lib/crm/googleCalendarSync";

interface CustomReminder {
  id: string;
  date: string;
  time: string;
  title: string;
  memberId: string;
  category?: "pro" | "perso";
}

interface CrmCalendarViewProps {
  leads: Lead[];
  members: TeamMember[];
  currentUser: TeamMember;
  theme: CrmThemeTokens;
  onOpenLead: (lead: Lead) => void;
  onLaunchProduction?: (leadId: string) => void;
  onDeliverMockup?: (leadId: string) => void;
  onRequestMockup?: (lead: Lead) => void;
  onOpenGoogleSync?: () => void;
}

export function CrmCalendarView({
  leads,
  members,
  currentUser,
  theme,
  onOpenLead,
  onLaunchProduction,
  onDeliverMockup,
  onOpenGoogleSync,
}: CrmCalendarViewProps) {
  const isDirector = currentUser.roleType === "direction";
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().slice(0, 10);
  });
  const [scopeFilter, setScopeFilter] = useState<"all" | "pro" | "perso">("all");
  const [customReminders, setCustomReminders] = useState<CustomReminder[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_crm_custom_reminders_v2");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: "rem-1",
        date: new Date().toISOString().slice(0, 10),
        time: "14:00",
        title: "Point Closing d'équipe & Débrief Maquettes",
        memberId: "all",
        category: "pro",
      },
    ];
  });

  const [newReminderTitle, setNewReminderTitle] = useState("");
  const [newReminderTime, setNewReminderTime] = useState("10:00");
  const [newReminderCategory, setNewReminderCategory] = useState<"pro" | "perso">("pro");
  const [showAddReminder, setShowAddReminder] = useState(false);

  // Filtrage des leads visibles pour l'utilisateur
  const myVisibleLeads = useMemo(() => {
    if (isDirector) return leads;
    if (currentUser.roleType === "manager") {
      return leads.filter(
        (l) =>
          l.closerId === currentUser.id ||
          l.setterId === currentUser.id ||
          members.find((m) => m.id === l.closerId)?.recruitedBy === currentUser.id
      );
    }
    return leads.filter((l) => l.closerId === currentUser.id || l.setterId === currentUser.id);
  }, [leads, isDirector, currentUser, members]);

  // Maquettes Studio en attente (< 24h)
  const mockupQueue = useMemo(() => {
    const list = leads.filter((l) => l.stage === "mockup" && l.studioStatus !== "delivered");
    return list.map((l) => {
      const closer = members.find((m) => m.id === l.closerId);
      const setter = members.find((m) => m.id === l.setterId);
      const reqDate = l.mockupRequestedAt ? new Date(l.mockupRequestedAt) : new Date(l.createdAt);
      const deadline = l.mockupDeadline
        ? new Date(l.mockupDeadline)
        : new Date(reqDate.getTime() + 24 * 3600 * 1000);
      const now = new Date();
      const diffMs = deadline.getTime() - now.getTime();
      const hoursRemaining = Math.round(diffMs / (1000 * 60 * 60));
      const isOverdue = diffMs < 0;

      return {
        lead: l,
        closerName: closer?.name || "Commercial",
        setterName: setter?.name || "",
        deadline,
        hoursRemaining,
        isOverdue,
      };
    }).sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
  }, [leads, members]);

  // Événements pour la date sélectionnée (filtrés selon le scope Pro/Perso)
  const eventsForSelectedDate = useMemo(() => {
    const leadFollowUps =
      scopeFilter === "perso"
        ? []
        : myVisibleLeads.filter((l) => l.followUpDate === selectedDate);

    const mockupsDue =
      scopeFilter === "perso"
        ? []
        : mockupQueue.filter(
            (m) => m.deadline.toISOString().slice(0, 10) === selectedDate
          );

    const reminders = customReminders.filter((r) => {
      if (r.date !== selectedDate) return false;
      // Vérification propriétaire (strictement personnel ou tous)
      const isMine = r.memberId === "all" || r.memberId === currentUser.id;
      if (!isMine) return false;

      const cat = r.category || "pro";
      if (scopeFilter === "pro" && cat !== "pro") return false;
      if (scopeFilter === "perso" && cat !== "perso") return false;
      return true;
    });

    const clientMilestones: { lead: Lead; milestone: ClientMilestone }[] = [];
    if (scopeFilter !== "perso") {
      myVisibleLeads.forEach((l) => {
        (l.clientMilestones || []).forEach((m) => {
          if (m.targetDate === selectedDate) {
            clientMilestones.push({ lead: l, milestone: m });
          }
        });
        if (
          l.onboardingDate === selectedDate &&
          !clientMilestones.some((cm) => cm.lead.id === l.id && cm.milestone.type === "onboarding")
        ) {
          clientMilestones.unshift({
            lead: l,
            milestone: {
              id: `ms-auto-${l.id}`,
              targetDate: selectedDate,
              title: `🎉 Date d'Entrée Client : ${l.name}`,
              type: "onboarding",
              status: "done",
              notes: `Acompte 50% reçu. Services : ${l.activeServicesList?.join(", ") || l.planLabel}.`,
            },
          });
        }
      });
    }

    return { leadFollowUps, mockupsDue, reminders, clientMilestones };
  }, [myVisibleLeads, mockupQueue, customReminders, selectedDate, currentUser.id, scopeFilter]);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle.trim()) return;
    const item: CustomReminder = {
      id: `rem-${Date.now()}`,
      date: selectedDate,
      time: newReminderTime,
      title: newReminderTitle.trim(),
      memberId: currentUser.id,
      category: newReminderCategory,
    };
    const updated = [item, ...customReminders];
    setCustomReminders(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_crm_custom_reminders_v2", JSON.stringify(updated));
    }
    setNewReminderTitle("");
    setShowAddReminder(false);
  };

  // Export vers fichier standard iCal (.ics) pour iPhone, Mac et Google Calendar
  const handleExportIcs = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//XR Agency//CRM Calendar//FR\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n";

    // Ajout des relances
    myVisibleLeads.forEach((l) => {
      if (!l.followUpDate) return;
      const cleanDate = l.followUpDate.replace(/-/g, "");
      icsContent += `BEGIN:VEVENT\nSUMMARY:Relance Client - ${l.name} (${l.contact})\nDESCRIPTION:Prospect XR Agency: ${l.phone || ""} - Étape: ${l.stage}\nDTSTART;VALUE=DATE:${cleanDate}\nDTEND;VALUE=DATE:${cleanDate}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });

    // Ajout des maquettes studio
    mockupQueue.forEach((m) => {
      const dStr = m.deadline.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
      icsContent += `BEGIN:VEVENT\nSUMMARY:⚡ Échéance Maquette 24h - ${m.lead.name}\nDESCRIPTION:Demandé par ${m.closerName} - Brief: ${m.lead.mockupNotes || ""}\nDTSTART:${dStr}\nDTEND:${dStr}\nPRIORITY:1\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });

    // Ajout des rappels
    customReminders.filter((r) => r.memberId === "all" || r.memberId === currentUser.id).forEach((r) => {
      const cleanDate = r.date.replace(/-/g, "");
      const cleanTime = (r.time || "10:00").replace(":", "") + "00";
      icsContent += `BEGIN:VEVENT\nSUMMARY:[${r.category === "perso" ? "Perso" : "Pro"}] ${r.title}\nDTSTART:${cleanDate}T${cleanTime}\nDTEND:${cleanDate}T${cleanTime}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `xr-agenda-${currentUser.shortName.toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Génération des 14 prochains jours pour la réglette
  const nextDays = useMemo(() => {
    const days = [];
    const base = new Date();
    for (let i = -2; i < 12; i++) {
      const d = new Date(base.getTime() + i * 24 * 3600 * 1000);
      const iso = d.toISOString().slice(0, 10);
      const dayName = d.toLocaleDateString("fr-FR", { weekday: "short" });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString("fr-FR", { month: "short" });

      const hasFollowUp = myVisibleLeads.some((l) => l.followUpDate === iso);
      const hasMockup = mockupQueue.some((m) => m.deadline.toISOString().slice(0, 10) === iso);
      const hasMilestone = myVisibleLeads.some(
        (l) => l.onboardingDate === iso || (l.clientMilestones || []).some((m) => m.targetDate === iso)
      );

      days.push({ iso, dayName, dayNum, monthName, hasFollowUp, hasMockup, hasMilestone });
    }
    return days;
  }, [myVisibleLeads, mockupQueue]);

  return (
    <div className="mt-5 space-y-6">
      {/* ── BANDEAU CRITIQUE : MAQUETTES SOUS 24H ── */}
      {mockupQueue.length > 0 && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-orange-500/15 border-2 border-amber-500/40 shadow-lg space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
                ⚡
              </span>
              <div>
                <h3 className={`font-black text-sm sm:text-base flex items-center gap-2 ${theme.textMain}`}>
                  Studio XR · {mockupQueue.length} Maquette(s) en Production (&lt; 24h)
                  {mockupQueue.some((m) => m.isOverdue) && (
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                      Retard détecté !
                    </span>
                  )}
                </h3>
                <p className={`text-xs ${theme.textMuted}`}>
                  Engagement d'agence : livraison de la maquette personnalisée en moins de 24h pour closer le prospect.
                </p>
              </div>
            </div>
            {isDirector && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/30">
                👑 Interface Direction &amp; Studio
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 pt-2">
            {mockupQueue.map((item) => (
              <div
                key={item.lead.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.isOverdue
                    ? "bg-rose-500/10 border-rose-500/50 shadow-md"
                    : `${theme.card}`
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={`font-black text-sm ${theme.textMain}`}>{item.lead.name}</h4>
                    <p className={`text-[11px] ${theme.textMuted}`}>
                      Demandé par : <strong className="text-indigo-600 dark:text-amber-300">{item.closerName}</strong>
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full font-mono ${
                      item.isOverdue
                        ? "bg-rose-600 text-white"
                        : item.hoursRemaining <= 6
                        ? "bg-orange-500 text-white"
                        : "bg-amber-500/20 text-amber-800 dark:text-amber-300"
                    }`}
                  >
                    {item.isOverdue ? "DÉPASSÉ" : `${item.hoursRemaining}h restantes`}
                  </span>
                </div>

                {/* Liens clés Google Maps & Réseaux Sociaux */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px]">
                  {item.lead.googleMapsUrl ? (
                    <a
                      href={item.lead.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/25"
                    >
                      📍 Fiche Google Maps <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] italic text-slate-400">Pas de Maps</span>
                  )}
                  {item.lead.socialsUrl && (
                    <a
                      href={item.lead.socialsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-500/25"
                    >
                      📸 Réseaux Sociaux <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                {item.lead.mockupNotes && (
                  <p className="mt-2 text-[11px] italic text-slate-600 dark:text-slate-300 bg-black/5 dark:bg-white/5 p-2 rounded-xl">
                    « {item.lead.mockupNotes} »
                  </p>
                )}

                {/* Actions directes pour Antoine / Studio */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenLead(item.lead)}
                    className="text-xs font-bold text-indigo-600 dark:text-amber-300 hover:underline"
                  >
                    Voir la fiche →
                  </button>
                  {isDirector && (
                    <div className="flex items-center gap-1.5">
                      {item.lead.studioStatus === "pending" && onLaunchProduction && (
                        <button
                          onClick={() => onLaunchProduction(item.lead.id)}
                          className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white text-[10px] font-extrabold hover:bg-indigo-700"
                        >
                          🚀 Lancer Prod
                        </button>
                      )}
                      {onDeliverMockup && (
                        <button
                          onClick={() => onDeliverMockup(item.lead.id)}
                          className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-extrabold hover:bg-emerald-700"
                        >
                          ✅ Prête
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BANDEAU OBJECTIFS DU MOIS & FILTRES PRO / PERSO ── */}
      <div className={`p-5 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${theme.card}`}>
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black shadow-lg shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-base sm:text-lg font-black ${theme.textMain}`}>
              Calendrier Commercial &amp; Vie Pro/Perso 📅
            </h2>
            <p className={`text-xs ${theme.textMuted}`}>
              Synchronisation des relances, rendez-vous qualifiés et livraisons de maquettes.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sélecteur de portée Pro / Perso */}
          <div className="inline-flex items-center p-1 rounded-xl border gap-1 bg-black/5 dark:bg-white/5 border-slate-200 dark:border-white/10 text-xs font-bold">
            <button
              onClick={() => setScopeFilter("all")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                scopeFilter === "all"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : `${theme.textMuted} hover:text-slate-900 dark:hover:text-white`
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setScopeFilter("pro")}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                scopeFilter === "pro"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : `${theme.textMuted} hover:text-slate-900 dark:hover:text-white`
              }`}
            >
              <Briefcase className="w-3 h-3" /> Pro
            </button>
            <button
              onClick={() => setScopeFilter("perso")}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                scopeFilter === "perso"
                  ? "bg-purple-600 text-white shadow-sm"
                  : `${theme.textMuted} hover:text-slate-900 dark:hover:text-white`
              }`}
            >
              <Home className="w-3 h-3" /> Perso
            </button>
          </div>

          {/* Bouton Google Calendar Sync */}
          <button
            onClick={() => {
              if (onOpenGoogleSync) onOpenGoogleSync();
              else handleExportIcs();
            }}
            title="Synchroniser avec Google Calendar & Configurer les Alertes Gmail"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all shadow-sm"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Google Agenda &amp; Gmail</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Bouton Export iCal / Google Calendar */}
          <button
            onClick={handleExportIcs}
            title="Exporter vers Apple Calendar, iPhone ou Google Calendar (.ics)"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all hover:bg-black/5 dark:hover:bg-white/5 ${theme.subCard} ${theme.textMain}`}
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Export</span> iCal
          </button>

          <button
            onClick={() => setShowAddReminder(!showAddReminder)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs shadow-sm hover:scale-[1.02]"
          >
            <Plus className="w-3.5 h-3.5" /> Ajouter un rappel
          </button>
        </div>
      </div>

      {/* Modal / Formulaire d'ajout de rappel */}
      {showAddReminder && (
        <form
          onSubmit={handleAddReminder}
          className={`p-4 rounded-2xl border space-y-3 ${theme.subCard}`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              required
              placeholder="Objet du rappel (ex: Appel client closing, sport, rdv médical)..."
              value={newReminderTitle}
              onChange={(e) => setNewReminderTitle(e.target.value)}
              className={`flex-1 min-w-[240px] px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
            />
            <input
              type="time"
              value={newReminderTime}
              onChange={(e) => setNewReminderTime(e.target.value)}
              className={`px-3 py-2 rounded-xl text-xs border ${theme.inputBg}`}
            />
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setNewReminderCategory("pro")}
                className={`px-2.5 py-1.5 rounded-lg border font-bold text-xs ${
                  newReminderCategory === "pro"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : `${theme.inputBg} ${theme.textMuted}`
                }`}
              >
                💼 Pro
              </button>
              <button
                type="button"
                onClick={() => setNewReminderCategory("perso")}
                className={`px-2.5 py-1.5 rounded-lg border font-bold text-xs ${
                  newReminderCategory === "perso"
                    ? "bg-purple-600 text-white border-purple-600"
                    : `${theme.inputBg} ${theme.textMuted}`
                }`}
              >
                🏠 Perso (Privé)
              </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setShowAddReminder(false)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold ${theme.textMuted}`}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* ── RÉGLETTE CHRONOLOGIQUE DES JOURS ── */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max">
          {nextDays.map((d) => {
            const isSelected = d.iso === selectedDate;
            const isToday = d.iso === new Date().toISOString().slice(0, 10);
            return (
              <button
                key={d.iso}
                onClick={() => setSelectedDate(d.iso)}
                className={`p-3 rounded-2xl border transition-all text-center min-w-[76px] ${
                  isSelected
                    ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md scale-105 border-transparent"
                    : `${theme.card} hover:-translate-y-0.5`
                }`}
              >
                <p className={`text-[10px] uppercase font-bold ${isSelected ? "text-white/80" : theme.textMuted}`}>
                  {isToday ? "Auj." : d.dayName}
                </p>
                <p className={`text-lg font-black my-0.5 ${isSelected ? "text-white" : theme.textMain}`}>
                  {d.dayNum}
                </p>
                <div className="flex items-center justify-center gap-1 h-2">
                  {d.hasMockup && <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
                  {d.hasFollowUp && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DÉTAILS DE LA JOURNÉE SÉLECTIONNÉE ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Colonne 1 : Clients Entrés & Échéances Upsell */}
        <div className={`p-5 rounded-3xl border space-y-3 ${theme.card}`}>
          <h3 className={`font-black text-sm flex items-center gap-2 ${theme.textMain}`}>
            <CalendarIcon className="w-4 h-4 text-indigo-500" />
            Clients &amp; Jalons Upsell ({eventsForSelectedDate.clientMilestones.length})
          </h3>

          {eventsForSelectedDate.clientMilestones.length === 0 ? (
            <p className={`text-xs italic py-6 text-center ${theme.textMuted}`}>
              Aucun client entré ni jalon d'upsell ce jour.
            </p>
          ) : (
            <div className="space-y-2.5">
              {eventsForSelectedDate.clientMilestones.map((item, idx) => {
                const isEntry = item.milestone.type === "onboarding";
                const isUpsell = item.milestone.type === "upsell_check";
                const isDelivery = item.milestone.type === "delivery";
                return (
                  <div
                    key={`${item.lead.id}-${idx}`}
                    onClick={() => onOpenLead(item.lead)}
                    className={`p-3.5 rounded-2xl border cursor-pointer hover:border-indigo-500 transition-all ${theme.subCard}`}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className={`font-black text-xs ${theme.textMain}`}>{item.lead.name}</h4>
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                          isEntry
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                            : isDelivery
                            ? "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                            : isUpsell
                            ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                            : "bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30"
                        }`}
                      >
                        {isEntry ? "🎉 Entrée Client" : isDelivery ? "🚀 Livraison" : isUpsell ? "💡 Upsell J+30" : "📍 Suivi"}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 line-clamp-2 ${theme.textMuted}`}>
                      {item.milestone.title}
                    </p>
                    {item.milestone.notes && (
                      <p className="text-[10px] italic mt-1 text-zinc-500 dark:text-zinc-400">
                        {item.milestone.notes}
                      </p>
                    )}
                    <div className="mt-2 pt-1.5 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[10px]">
                      <span className="text-zinc-400">Échéance jalon</span>
                      <a
                        href={buildMilestoneGoogleUrl(item.lead, item.milestone, members.find((m) => m.id === item.lead.closerId))}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                      >
                        + Google Agenda ↗
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Colonne 2 : Relances Prospects */}
        <div className={`p-5 rounded-3xl border space-y-3 ${theme.card}`}>
          <h3 className={`font-black text-sm flex items-center gap-2 ${theme.textMain}`}>
            <Phone className="w-4 h-4 text-emerald-500" />
            Relances Prévues ({eventsForSelectedDate.leadFollowUps.length})
          </h3>

          {eventsForSelectedDate.leadFollowUps.length === 0 ? (
            <p className={`text-xs italic py-6 text-center ${theme.textMuted}`}>
              Aucune relance programmée pour ce jour.
            </p>
          ) : (
            <div className="space-y-2.5">
              {eventsForSelectedDate.leadFollowUps.map((l) => (
                <div
                  key={l.id}
                  onClick={() => onOpenLead(l)}
                  className={`p-3.5 rounded-2xl border cursor-pointer hover:border-emerald-500 transition-all ${theme.subCard}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className={`font-black text-xs ${theme.textMain}`}>{l.name}</h4>
                      <p className={`text-[11px] ${theme.textMuted}`}>{l.contact} · {l.phone}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                      {l.stage}
                    </span>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-400">Rappel client</span>
                    <a
                      href={buildLeadFollowUpGoogleUrl(l, members.find((m) => m.id === l.closerId))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                    >
                      + Google Agenda ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colonne 3 : Maquettes & Échéances */}
        <div className={`p-5 rounded-3xl border space-y-3 ${theme.card}`}>
          <h3 className={`font-black text-sm flex items-center gap-2 ${theme.textMain}`}>
            <Sparkles className="w-4 h-4 text-amber-500" />
            Échéances Maquettes 24h ({eventsForSelectedDate.mockupsDue.length})
          </h3>

          {eventsForSelectedDate.mockupsDue.length === 0 ? (
            <p className={`text-xs italic py-6 text-center ${theme.textMuted}`}>
              Aucune maquette à livrer ce jour.
            </p>
          ) : (
            <div className="space-y-2.5">
              {eventsForSelectedDate.mockupsDue.map((m) => (
                <div
                  key={m.lead.id}
                  onClick={() => onOpenLead(m.lead)}
                  className={`p-3.5 rounded-2xl border cursor-pointer hover:border-amber-500 transition-all ${theme.subCard}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className={`font-black text-xs ${theme.textMain}`}>{m.lead.name}</h4>
                      <p className={`text-[11px] ${theme.textMuted}`}>Closer : {m.closerName}</p>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300">
                      {m.hoursRemaining}h restantes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colonne 3 : Rappels Personnels & RDVs */}
        <div className={`p-5 rounded-3xl border space-y-3 ${theme.card}`}>
          <h3 className={`font-black text-sm flex items-center gap-2 ${theme.textMain}`}>
            <Clock className="w-4 h-4 text-indigo-500" />
            Rappels &amp; RDVs ({eventsForSelectedDate.reminders.length})
          </h3>

          {eventsForSelectedDate.reminders.length === 0 ? (
            <p className={`text-xs italic py-6 text-center ${theme.textMuted}`}>
              Aucun rappel enregistré pour ce jour.
            </p>
          ) : (
            <div className="space-y-2.5">
              {eventsForSelectedDate.reminders.map((r) => (
                <div
                  key={r.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 ${theme.subCard}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          r.category === "perso"
                            ? "bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30"
                            : "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                        }`}
                      >
                        {r.category === "perso" ? "🏠 Perso" : "💼 Pro"}
                      </span>
                      <h4 className={`font-bold text-xs truncate ${theme.textMain}`}>{r.title}</h4>
                    </div>
                    <p className={`text-[10px] font-mono mt-1 text-indigo-600 dark:text-amber-300`}>
                      ⏰ {r.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        const updated = customReminders.filter((x) => x.id !== r.id);
                        setCustomReminders(updated);
                        if (typeof window !== "undefined") {
                          localStorage.setItem("xr_crm_custom_reminders_v2", JSON.stringify(updated));
                        }
                      }}
                      title="Supprimer ce rappel"
                      className="text-[11px] text-slate-400 hover:text-rose-500 p-1"
                    >
                      ✕
                    </button>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
