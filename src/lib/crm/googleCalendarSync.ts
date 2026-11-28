import type { Lead, TeamMember, ClientMilestone } from "./data";

export interface GoogleCalendarEventPayload {
  title: string;
  description: string;
  location?: string;
  startIso: string; // YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
  endIso?: string;
  allDay?: boolean;
}

export interface GoogleWorkspaceMemberConfig {
  memberId: string;
  email: string;
  connected: boolean;
  connectedAt?: string;
  syncFollowUps: boolean;
  syncMockups: boolean;
  syncOnboardings: boolean;
  syncUpsells: boolean;
  emailAlertsEnabled: boolean;
  dailyBriefingEnabled: boolean;
  alertOnQuoteApproval: boolean;
  alertOnDepositReceived: boolean;
}

const DEFAULT_CONFIGS: Record<string, Partial<GoogleWorkspaceMemberConfig>> = {
  antoine: {
    email: "antoinerbf@gmail.com",
    connected: true,
  },
  martin: {
    email: "martin.xragency@gmail.com",
    connected: true,
  },
  christel: {
    email: "christelle.xragency@gmail.com",
    connected: true,
  },
  sarah: {
    email: "sarah.xragency@gmail.com",
    connected: true,
  },
  romain: {
    email: "romain.xragency@gmail.com",
    connected: true,
  },
  camille: {
    email: "camille.xragency@gmail.com",
    connected: true,
  },
  marilyn: {
    email: "marilyn.xragency@gmail.com",
    connected: true,
  },
  emma: {
    email: "emma.xragency@gmail.com",
    connected: true,
  },
};

export function getMemberGoogleConfig(memberId: string): GoogleWorkspaceMemberConfig {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(`xr_google_config_${memberId}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
  }

  const def = DEFAULT_CONFIGS[memberId] || {};
  return {
    memberId,
    email: def.email || (memberId === "antoine" ? "antoinerbf@gmail.com" : `${memberId}.xragency@gmail.com`),
    connected: true,
    connectedAt: new Date().toISOString(),
    syncFollowUps: true,
    syncMockups: true,
    syncOnboardings: true,
    syncUpsells: true,
    emailAlertsEnabled: true,
    dailyBriefingEnabled: true,
    alertOnQuoteApproval: true,
    alertOnDepositReceived: true,
  };
}

export function saveMemberGoogleConfig(config: GoogleWorkspaceMemberConfig): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`xr_google_config_${config.memberId}`, JSON.stringify(config));
    } catch {
      // ignore
    }
  }
}

/**
 * Formats a Date into Google Calendar URL format (YYYYMMDDTHHmmssZ or YYYYMMDD)
 */
function formatGoogleCalendarDate(date: Date, allDay = false): string {
  if (allDay) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}${m}${d}`;
  }
  return date.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
}

/**
 * Generates an instant, direct 1-click Google Calendar add link
 */
export function generateGoogleCalendarUrl({
  title,
  description,
  location,
  startIso,
  endIso,
  allDay = false,
}: GoogleCalendarEventPayload): string {
  const startDate = new Date(startIso);
  const endDate = endIso ? new Date(endIso) : new Date(startDate.getTime() + (allDay ? 24 * 3600 * 1000 : 3600 * 1000));

  const startFormatted = formatGoogleCalendarDate(startDate, allDay);
  const endFormatted = formatGoogleCalendarDate(endDate, allDay);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${startFormatted}/${endFormatted}`,
    details: description,
  });

  if (location) {
    params.set("location", location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Helper to build Google Calendar URL for a Lead follow-up
 */
export function buildLeadFollowUpGoogleUrl(lead: Lead, closer?: TeamMember): string {
  const dateStr = lead.followUpDate || new Date().toISOString().slice(0, 10);
  const startDate = new Date(`${dateStr}T10:00:00`);
  const endDate = new Date(`${dateStr}T10:45:00`);

  const desc = `Prospect : ${lead.name} (${lead.contact})
Téléphone : ${lead.phone}
Email : ${lead.email || "Non renseigné"}
Prestation : ${lead.planLabel} (${lead.value} €)
Closer assigné : ${closer?.name || "XR Agency"}
Dernières notes : ${lead.notes || "Pas de notes"}
Accès CRM : https://xragencyai.com/crm`;

  return generateGoogleCalendarUrl({
    title: `📞 Relance Client XR Agency · ${lead.name}`,
    description: desc,
    location: lead.city || "Téléphone / WhatsApp",
    startIso: startDate.toISOString(),
    endIso: endDate.toISOString(),
  });
}

/**
 * Helper to build Google Calendar URL for a Client Milestone (Onboarding, Delivery, Upsell J+30)
 */
export function buildMilestoneGoogleUrl(lead: Lead, milestone: ClientMilestone, closer?: TeamMember): string {
  const startDate = new Date(`${milestone.targetDate}T11:00:00`);
  const endDate = new Date(`${milestone.targetDate}T11:45:00`);

  const desc = `Client : ${lead.name} (${lead.contact})
Type de Jalon : ${milestone.type.toUpperCase()}
Détail : ${milestone.notes || milestone.title}
Téléphone : ${lead.phone}
Closer référent : ${closer?.name || "XR Agency"}
Accès CRM : https://xragencyai.com/crm`;

  return generateGoogleCalendarUrl({
    title: `XR Agency · ${milestone.title}`,
    description: desc,
    location: lead.city || "En ligne / Visioconférence",
    startIso: startDate.toISOString(),
    endIso: endDate.toISOString(),
  });
}

/**
 * Helper to build Google Calendar URL for a Studio 24h mockup
 */
export function buildMockupDeadlineGoogleUrl(lead: Lead, closer?: TeamMember): string {
  const deadline = lead.mockupDeadline
    ? new Date(lead.mockupDeadline)
    : new Date(Date.now() + 24 * 3600 * 1000);
  const start = new Date(deadline.getTime() - 3600 * 1000);

  const desc = `Client : ${lead.name}
Brief Studio : ${lead.mockupNotes || "Maquette haute conversion"}
Closer : ${closer?.name || "Commercial"}
Fiche Maps : ${lead.googleMapsUrl || "Non renseignée"}
Réseaux : ${lead.socialsUrl || "Non renseigné"}
Accès CRM : https://xragencyai.com/crm`;

  return generateGoogleCalendarUrl({
    title: `⚡ Échéance Maquette Studio 24h · ${lead.name}`,
    description: desc,
    location: "Studio XR Agency",
    startIso: start.toISOString(),
    endIso: deadline.toISOString(),
  });
}

/**
 * Generates a complete iCal (RFC 5545) agenda export for Google Calendar import
 */
export function generateGoogleCalendarIcsFile(
  myLeads: Lead[],
  currentUser: TeamMember,
  members: TeamMember[]
): { filename: string; blob: Blob } {
  let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//XR Agency//CRM Google Calendar Sync//FR\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n";

  // 1. Relances
  myLeads.forEach((l) => {
    if (!l.followUpDate) return;
    const cleanDate = l.followUpDate.replace(/-/g, "");
    ics += `BEGIN:VEVENT\nSUMMARY:📞 Relance Client : ${l.name} (${l.contact})\nDESCRIPTION:Prospect XR Agency: ${l.phone || ""} - Prestation: ${l.planLabel} (${l.value} €)\\nNotes: ${l.notes || ""}\\nCRM: https://xragencyai.com/crm\nDTSTART;VALUE=DATE:${cleanDate}\nDTEND;VALUE=DATE:${cleanDate}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
  });

  // 2. Jalons d'Onboarding & Upsell
  myLeads.forEach((l) => {
    (l.clientMilestones || []).forEach((m) => {
      const cleanDate = m.targetDate.replace(/-/g, "");
      ics += `BEGIN:VEVENT\nSUMMARY:${m.title}\nDESCRIPTION:Client: ${l.name} - ${m.notes || ""}\\nCRM: https://xragencyai.com/crm\nDTSTART;VALUE=DATE:${cleanDate}\nDTEND;VALUE=DATE:${cleanDate}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
  });

  // 3. Maquettes Studio (< 24h)
  myLeads
    .filter((l) => l.stage === "mockup" && l.studioStatus !== "delivered")
    .forEach((l) => {
      const deadline = l.mockupDeadline ? new Date(l.mockupDeadline) : new Date(Date.now() + 24 * 3600 * 1000);
      const dStr = deadline.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
      ics += `BEGIN:VEVENT\nSUMMARY:⚡ Échéance Maquette 24h : ${l.name}\nDESCRIPTION:Brief: ${l.mockupNotes || ""}\\nCRM: https://xragencyai.com/crm\nDTSTART:${dStr}\nDTEND:${dStr}\nPRIORITY:1\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });

  ics += "END:VCALENDAR";

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  return {
    filename: `xr-agenda-${currentUser.shortName.toLowerCase()}-google.ics`,
    blob,
  };
}
