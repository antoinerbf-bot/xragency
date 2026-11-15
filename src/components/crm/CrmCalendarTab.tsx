import { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Globe2,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmLead, CrmTaskRecord, CrmProjectRecord } from "@/lib/crm-store";

interface CrmCalendarTabProps {
  leads: CrmLead[];
  tasks: CrmTaskRecord[];
  projects: CrmProjectRecord[];
}

interface CalendarEvent {
  id: string;
  type: "call" | "followup" | "deadline" | "task";
  title: string;
  subtitle: string;
  dateStr: string;
  timeStr: string;
  priority?: "urgent" | "high" | "normal";
  status?: string;
}

export function CrmCalendarTab({ leads, tasks, projects }: CrmCalendarTabProps) {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [nowDate, setNowDate] = useState(new Date());

  // Dual live clocks
  useEffect(() => {
    const timer = setInterval(() => setNowDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parisTime = useMemo(() => {
    return new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Europe/Paris",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(nowDate);
  }, [nowDate]);

  const vietnamTime = useMemo(() => {
    return new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(nowDate);
  }, [nowDate]);

  // Aggregate events from Leads, Tasks and Projects
  const allEvents: CalendarEvent[] = useMemo(() => {
    const list: CalendarEvent[] = [];

    // 1. Leads follow-ups & scheduled calls
    leads.forEach((l) => {
      if (l.nextFollowUp && l.status !== "signed" && l.status !== "lost") {
        list.push({
          id: `ev-lead-${l.id}`,
          type: "followup",
          title: `Relance : ${l.company}`,
          subtitle: `${l.contactName} · ${l.serviceTarget}`,
          dateStr: l.nextFollowUp.includes("Aujourd'hui") ? "Aujourd'hui" : l.nextFollowUp.slice(0, 10),
          timeStr: l.nextFollowUp.includes("·") ? l.nextFollowUp.split("·")[1].trim() : "14h00",
          priority: l.priority,
          status: l.status,
        });
      }
    });

    // 2. Tasks
    tasks.forEach((t) => {
      if (t.status !== "done") {
        list.push({
          id: `ev-task-${t.id}`,
          type: "task",
          title: t.title,
          subtitle: t.description || `Tag : ${t.tag}`,
          dateStr: t.dueDate.includes("Aujourd'hui") ? "Aujourd'hui" : t.dueDate.slice(0, 10),
          timeStr: t.dueDate.includes("·") ? t.dueDate.split("·")[1].trim() : "11h00",
          priority: t.priority,
          status: t.status,
        });
      }
    });

    // 3. Project Deadlines
    projects.forEach((p) => {
      if (p.stage !== "delivered") {
        list.push({
          id: `ev-prj-${p.id}`,
          type: "deadline",
          title: `Livraison : ${p.projectName}`,
          subtitle: `Client : ${p.clientName} · ${p.serviceCategory}`,
          dateStr: p.deliveryDeadline.includes("Sous") ? "Sous 7 jours" : p.deliveryDeadline.slice(0, 10),
          timeStr: "18h00",
          priority: "high",
          status: p.stage,
        });
      }
    });

    return list;
  }, [leads, tasks, projects]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((e) => typeFilter === "all" || e.type === typeFilter);
  }, [allEvents, typeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Dual Timezone Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Paris Clock */}
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/90 p-5 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8] block">
                FUSEAU FRANCE · EUROPE/PARIS (UTC+1)
              </span>
              <p className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">{parisTime}</p>
            </div>
          </div>
          <span className="rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-mono font-bold px-2.5 py-1">
            Siège Paris 8e
          </span>
        </div>

        {/* Vietnam Clock */}
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/90 p-5 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8] block">
                FUSEAU ASIE · ASIA/HO_CHI_MINH (UTC+7)
              </span>
              <p className="text-xl sm:text-2xl font-black text-[#d4af37] font-mono mt-0.5">{vietnamTime}</p>
            </div>
          </div>
          <span className="rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[9px] font-mono font-bold px-2.5 py-1">
            Hub Đà Nẵng / Saïgon
          </span>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0a0d14]/90 p-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          {(["all", "followup", "task", "deadline"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setTypeFilter(filter)}
              className={cn(
                "rounded-xl px-3 py-1.5 font-mono text-[10px] font-bold uppercase transition",
                typeFilter === filter
                  ? "bg-[#d4af37] text-black"
                  : "bg-white/5 text-[#94a3b8] hover:bg-white/10 hover:text-white"
              )}
            >
              {filter === "all"
                ? "Tous les événements"
                : filter === "followup"
                  ? "Relances & Appels"
                  : filter === "task"
                    ? "Tâches Agence"
                    : "Échéances Projets"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-1">
          {(["day", "week", "month"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={cn(
                "rounded-lg px-3 py-1 font-mono text-[10px] font-bold uppercase transition",
                viewMode === mode ? "bg-white/20 text-white" : "text-[#94a3b8] hover:text-white"
              )}
            >
              {mode === "day" ? "Jour" : mode === "week" ? "Semaine" : "Mois"}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Agenda Cards */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0e14]/90 via-[#07090e]/90 to-[#030406]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#d4af37] block">
              AGENDA OPÉRATIONNEL XR AGENCY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mt-0.5">
              Planning des actions & livraisons
            </h3>
          </div>
          <span className="font-mono text-xs text-[#94a3b8]">
            {filteredEvents.length} action(s) planifiée(s)
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-[#94a3b8]">
            Aucun événement ou relance planifié pour cette sélection.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((ev) => {
              const isUrgent = ev.priority === "urgent";
              return (
                <div
                  key={ev.id}
                  className={cn(
                    "rounded-2xl border p-4.5 transition-all backdrop-blur-xl space-y-2",
                    isUrgent
                      ? "border-red-400/40 bg-red-500/[0.04]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase border",
                        ev.type === "followup"
                          ? "border-blue-400/30 bg-blue-400/10 text-blue-300"
                          : ev.type === "deadline"
                            ? "border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37]"
                            : "border-purple-400/30 bg-purple-400/10 text-purple-300"
                      )}
                    >
                      {ev.type === "followup" ? "Relance Prospect" : ev.type === "deadline" ? "Livraison Projet" : "Tâche"}
                    </span>

                    <div className="flex items-center gap-1.5 font-mono text-xs text-white">
                      <Clock className="h-3.5 w-3.5 text-[#d4af37]" />
                      <span>{ev.dateStr} · {ev.timeStr}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white tracking-tight">{ev.title}</h4>
                    <p className="text-xs text-[#94a3b8] mt-0.5">{ev.subtitle}</p>
                  </div>

                  {isUrgent && (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-red-400 font-bold uppercase">
                      <AlertCircle className="h-3 w-3" />
                      Priorité Haute · Action immédiate requise
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
