import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Crown,
  ExternalLink,
  FileText,
  Flame,
  GraduationCap,
  Image as ImageIcon,
  KeyRound,
  LayoutGrid,
  Lock,
  LogOut,
  MessageCircle,
  Palette,
  Phone,
  PhoneCall,
  Plus,
  Rocket,
  Search,
  Send,
  Shield,
  Sparkles,
  Swords,
  Target,
  Trash2,
  Trophy,
  UserPlus,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import type {
  CrmActivity,
  CrmClientRecord,
  CrmInvoiceRecord,
  CrmLead,
  CrmNotification,
  CrmProjectRecord,
  CrmProviderRecord,
  CrmQuoteRecord,
  CrmTaskRecord,
  LeadPriority,
  LeadStatus,
  QuoteItem,
} from "./api/crm";
import { CrmClientsTab } from "@/components/crm/CrmClientsTab";
import { CrmQuotesTab } from "@/components/crm/CrmQuotesTab";
import { CrmInvoicesTab } from "@/components/crm/CrmInvoicesTab";
import { CrmProjectsTab } from "@/components/crm/CrmProjectsTab";
import { CrmProvidersTab } from "@/components/crm/CrmProvidersTab";
import { CrmCalendarTab } from "@/components/crm/CrmCalendarTab";
import { CrmEgoLeaderboard } from "@/components/crm/CrmEgoLeaderboard";
import { OfficialQuoteGenerator } from "@/components/crm/OfficialQuoteGenerator";
import { CrmBossDashboard, type CrmTodo } from "@/components/crm/CrmBossDashboard";
import { CrmGameWorld } from "@/components/crm/CrmGameWorld";
import { CrmCloserDashboard } from "@/components/crm/CrmCloserDashboard";
import { CrmUltraLudiqueArena } from "@/components/crm/CrmUltraLudiqueArena";
import { CharacterSelectLogin } from "@/components/crm/CharacterSelectLogin";
import { CrmSchoolDashboard } from "@/components/crm/CrmSchoolDashboard";
import { XR_ADVISORS } from "@/lib/xr-advisors";
import { playXpChime, generateLovableArchitecturePrompt } from "@/lib/rpg-engine";
import { cn } from "@/lib/utils";
import agentXrPortrait from "@/assets/agent-xr-portrait.jpg";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM & Académie Interne — XR Agency" },
      {
        name: "description",
        content:
          "Portail officiel XR Agency : QG Direction, Arène Commerciale et Académie XR School 90 jours.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CrmWorkspacePage,
});

interface SafeMember {
  id: string;
  email: string;
  fullName: string;
  title: string;
  role: "admin" | "member";
  portalType?: "director" | "closer" | "student";
  phoneLine: string;
  commissionPct: number;
  active: boolean;
  createdAt: string;
}

interface MemberPerf extends SafeMember {
  assignedCount: number;
  toCallCount: number;
  signedCount: number;
  revenueEur: number;
  estimatedCommissionEur: number;
  callsCount: number;
  closingRate: number;
}

interface CrmSnapshot {
  authenticated: boolean;
  user?: SafeMember;
  members?: SafeMember[];
  leads?: CrmLead[];
  clients?: CrmClientRecord[];
  quotes?: CrmQuoteRecord[];
  invoices?: CrmInvoiceRecord[];
  projects?: CrmProjectRecord[];
  tasks?: CrmTaskRecord[];
  providers?: CrmProviderRecord[];
  notifications?: CrmNotification[];
  activities?: CrmActivity[];
  stats?: {
    totalLeads: number;
    toCallCount: number;
    inProgressCount: number;
    signedCount: number;
    outsourcedCount: number;
    revenueEur: number;
    pipelineEur: number;
    totalCalls: number;
    closingRate: number;
    activeProjectsCount?: number;
    pendingInvoicesEur?: number;
  };
  teamBreakdown?: MemberPerf[];
}

// ── RÈGLE DE COMMISSION OFFICIELLE XR AGENCY ──
function getOfficialCommission(serviceTarget: string, budgetEur: number) {
  const s = (serviceTarget || "").toLowerCase();
  let ratePct = 10;
  let ruleLabel = "10 % (Google Maps / Abonnement)";
  if (s.includes("crm") || s.includes("pos") || s.includes("caisse")) {
    ratePct = 20;
    ruleLabel = "20 % (CRM & Système POS)";
  } else if (
    (s.includes("site") ||
      s.includes("vitrine") ||
      s.includes("e-commerce") ||
      s.includes("ecommerce") ||
      s.includes("web")) &&
    !s.includes("webcare")
  ) {
    ratePct = 30;
    ruleLabel = "30 % (Site Internet)";
  }
  const amountEur = Math.round(((Number(budgetEur) || 0) * ratePct) / 100);
  return { ratePct, ruleLabel, amountEur };
}

// ── EFFET SONORE & VICTOIRE CLOSING (WEB AUDIO SYNTHÉTISEUR SANS DÉPENDANCE) ──
function playVictorySound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    // Chime d'accord majeur ascendant brillant : Do5 -> Mi5 -> Sol5 -> Do6 -> Mi6
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.6);
    });
  } catch {
    // Audio fallback silencieux
  }
}

// ── TEMPLATES DE MESSAGES WHATSAPP STRATÉGIQUES 1-CLIC ──
function getWhatsappMessageText(
  templateKey: "maquette" | "relance" | "devis" | "contact",
  lead: CrmLead,
  senderName: string
) {
  const contact = lead.contactName || "Bonjour";
  const company = lead.company || "votre établissement";
  const maquetteUrl = lead.maquetteUrl || "https://xragencyai.com";

  if (templateKey === "maquette") {
    return `Bonjour ${contact}, c'est ${senderName} de l'agence XR Agency. Suite à notre échange, notre studio créatif a finalisé la maquette sur-mesure pour ${company} : ${maquetteUrl} . Prenez 2 minutes pour la consulter sur votre smartphone et dites-moi ce que vous en pensez !`;
  }
  if (templateKey === "relance") {
    return `Bonjour ${contact}, avez-vous pu jeter un œil à la proposition pour ${company} ? Vos concurrents renforcent actuellement leur visibilité sur Google Maps. Si vous souhaitez bloquer votre créneau de mise en ligne cette semaine, confirmez-moi et on valide !`;
  }
  if (templateKey === "devis") {
    return `Bonjour ${contact}, voici les éléments pour valider votre commande pour ${company} (${lead.serviceTarget} à ${lead.budgetEur} €). Les coordonnées bancaires officielles vous seront transmises sur le devis validé par la Direction. Nous lançons la production après validation du règlement !`;
  }
  return `Bonjour ${contact}, c'est ${senderName} de XR Agency à propos de la visibilité digitale de ${company}. Avez-vous 2 minutes pour échanger par message ?`;
}

const OFFICIAL_CATALOG = [
  {
    category: "Sites Internet (30 % Commission)",
    rate: "30 %",
    offers: [
      { label: "Site Vitrine Pro (Clé en main 7j)", price: 499, period: "once" as const },
      { label: "Site Business Sur-Mesure + SEO", price: 799, period: "once" as const },
      { label: "Site E-Commerce / Sur-Mesure Avancé", price: 1499, period: "once" as const },
    ],
  },
  {
    category: "Google Maps Top 3 & Gestion (10 % Commission)",
    rate: "10 %",
    offers: [
      { label: "Google Maps Top 3 Garanti 24/7 (1 An ou Remboursé)", price: 999, period: "year" as const },
      { label: "Gestion Annuelle Fiche Google Maps (12 mois)", price: 500, period: "year" as const },
    ],
  },
  {
    category: "CRM, Logiciels & Systèmes POS (20 % Commission)",
    rate: "20 %",
    offers: [
      { label: "CRM / Logiciel Métier Sur-Mesure + Automatisation IA", price: 2000, period: "once" as const },
      { label: "Système Caisse POS & Borne Connectée", price: 2490, period: "once" as const },
    ],
  },
  {
    category: "Abonnements Récurrents SEO, Social & WebCare (10 % / mois)",
    rate: "10 % / mois",
    offers: [
      { label: "SEO Starter / Growth", price: 299, period: "month" as const },
      { label: "Community Management & Réseaux Sociaux", price: 349, period: "month" as const },
      { label: "WebCare Maintenance & Sécurité", price: 49, period: "month" as const },
      { label: "Location Robot Autonome / Humanoïde", price: 499, period: "month" as const },
    ],
  },
];

const SCHOOL_CURRICULUM_90D = [
  {
    phase: "MOIS 1 (Jours 1 à 30)",
    title: "Fondations du Closing & Maîtrise des Offres XR",
    xp: "1 500 XP",
    modules: [
      "Connaître par cœur les 4 piliers : Sites (499€–1499€), Google Maps Top 3 (dès 999€/an + Gestion 500€/an), CRM/POS (2000€+) et Récurrents.",
      "Psychologie des dirigeants 30–60 ans (artisans, restaurateurs, cliniques, PME) : parler chiffre d'affaires et rentabilité.",
      "La règle d'or de la Maquette Gratuite : ne pas vendre du vent, proposer d'envoyer une maquette concrète en 24h.",
      "Appel d'ouverture en 45 secondes : passer le barrage secrétaire et obtenir le décideur.",
    ],
  },
  {
    phase: "MOIS 2 (Jours 31 à 60)",
    title: "Domination Google Maps, Suivi Maquettes & Traitement d'Objections",
    xp: "3 000 XP",
    modules: [
      "Pitcher le Top 3 Google Maps garanti 24h/24, 7j/7 pendant 1 an ou remboursé + l'offre Gestion Annuelle à 500 €/an.",
      "Présenter la maquette validée par la Direction sur WhatsApp pour déclencher l'effet 'Waouh'.",
      "Désamorcer les 5 objections fatales ('C'est trop cher', 'J'ai déjà un site', 'Je dois réfléchir', 'Mon neveu s'en occupe').",
      "Verrouiller l'engagement et envoyer le Devis + coordonnées bancaires officielles en direct pendant l'appel.",
    ],
  },
  {
    phase: "MOIS 3 (Jours 61 à 90)",
    title: "Closing Haut-Ticket (CRM 2 000 €+, Robotique) & Récurrence",
    xp: "5 000 XP",
    modules: [
      "Identifier les besoins en logiciels sur-mesure, CRM et caisses POS (20 % de commission directe).",
      "Proposer les robots de service et humanoïdes aux restaurants, hôtels et supermarchés.",
      "Transformer chaque client signé en ambassadeur (Upsell SEO / Social Media à J+30 + 10 %/mois).",
      "Certification Closer Élite XR Agency & gestion autonome d'un portefeuille grands comptes.",
    ],
  },
];

const SCHOOL_OBJECTION_BATTLES = [
  {
    id: "obj-price",
    prospectSay: "« J'ai pas le budget en ce moment, 999 € pour Google Maps ou 499 € pour un site c'est trop cher. »",
    goodReply:
      "« Justement : aujourd'hui, vos concurrents qui sont dans le Top 3 Google Maps récupèrent 70 % des appels de votre ville gratuitement. Un seul nouveau client vous rembourse l'année entière, et en plus c'est garanti Top 3 pendant 1 an ou remboursé. On commence par regarder la maquette gratuite ensemble ? »",
    badReply: "« D'accord je comprends, je vous rappelle dans 6 mois quand vous aurez de la trésorerie. »",
  },
  {
    id: "obj-already",
    prospectSay: "« J'ai déjà un site internet et une fiche Google Maps, j'ai besoin de rien. »",
    goodReply:
      "« Super ! Mais quand un client tape votre métier + votre ville sur son téléphone, êtes-vous dans les 3 premiers résultats 24h/24 ? Si vous êtes en 2e page, 92 % des clients cliquent chez les 3 premiers. Je vous prépare un audit visuel et une maquette moderne sans engagement pour comparer ? »",
    badReply: "« Ah mince, tant pis alors, bonne journée ! »",
  },
  {
    id: "obj-think",
    prospectSay: "« Envoyez-moi un mail, je vais réfléchir avec mon associé. »",
    goodReply:
      "« Avec plaisir ! Plutôt qu'un simple mail abstrait, mon directeur artistique prépare une vraie maquette personnalisée à votre enseigne d'ici demain. Comme ça, avec votre associé, vous voyez le rendu réel sur téléphone. Quel est votre numéro WhatsApp pour vous envoyer le lien privé ? »",
    badReply: "« Ok je vous envoie notre plaquette PDF générale par mail. »",
  },
];

const OPERATIONAL_CALENDAR_PLAYBOOKS = [
  {
    id: "cm",
    title: "📱 Planning Community Management (Réseaux Sociaux)",
    badge: "349 € à 899 € / mois · Comm 10%/m",
    steps: [
      { day: "Lundi", task: "Validation du calendrier éditorial de la semaine + script des Reels / TikTok." },
      { day: "Mardi & Jeudi", task: "Publication Carrousel / Post HD aux heures d'audience maximale (12h15 / 18h30)." },
      { day: "Mercredi & Vendredi", task: "Mise en ligne Reel 4K dynamique + Stories interactives (sondages, coulisses)." },
      { day: "Samedi", task: "Modération des commentaires, réponses aux DM et rapport d'engagement hebdo." },
    ],
  },
  {
    id: "maps",
    title: "📍 Suivi Google Maps Top 3 & Gestion Annuelle",
    badge: "Dès 999 € / an ou Gestion 500 € / an · Comm 10%",
    steps: [
      { day: "Semaine 1", task: "Validation analystes XR, audit mots-clés + ville, création ou refonte intégrale GBP." },
      { day: "Hebdomadaire", task: "Ajout de photos géolocalisées, Google Posts optimisés et citations NAP locales." },
      { day: "Continu 24/7", task: "Surveillance de la position Top 3, réponses aux avis 5★ et protection anti-modifications." },
      { day: "Bilan Mensuel", task: "Envoi du rapport d'appels générés, clics site web et demandes d'itinéraires." },
    ],
  },
  {
    id: "seo",
    title: "🔍 Roadmap SEO & Référencement Naturel",
    badge: "299 € à 499 € / mois · Comm 10%/m",
    steps: [
      { day: "Semaine 1", task: "Audit technique, vitesse mobile, balisage Schema.org et ciblage des requêtes d'achat." },
      { day: "Semaine 2 & 3", task: "Rédaction et publication des pages piliers et articles SEO optimisés." },
      { day: "Semaine 4", task: "Campagne de netlinking (backlinks d'autorité) et suivi des positions Google." },
    ],
  },
  {
    id: "web",
    title: "💻 Rétroplanning Livraison Site Web 7 Jours + Upsell J+30",
    badge: "499 € / 799 € / 1 499 € · Comm 30%",
    steps: [
      { day: "J+1", task: "Création de la maquette par la Direction ➔ Lien validé et envoyé au client." },
      { day: "J+2 à J+5", task: "Intégration responsive mobile/PC, copywriting persuasif et formulaires connectés." },
      { day: "J+7", task: "Mise en ligne officielle, SSL, indexation Google & validation du règlement." },
      { day: "J+30", task: "Appel suivi satisfaction + proposition Upsell Google Maps Top 3 / WebCare / Parrainage." },
    ],
  },
];

function formatMoney(v: number) {
  return `${Math.round(v || 0).toLocaleString("fr-FR")} €`;
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function isLeadUrgent48h(lead: CrmLead) {
  if (lead.status !== "to_call" && lead.status !== "new") return false;
  const created = new Date(lead.createdAt).getTime();
  if (Number.isNaN(created)) return false;
  return Date.now() - created > 24 * 3600 * 1000;
}

function CrmWorkspacePage() {
  const [snapshot, setSnapshot] = useState<CrmSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ── AUTHENTICATION STATE (3 PORTAILS PAR CODE PIN) ──
  const [selectedPortalRole, setSelectedPortalRole] = useState<"director" | "closer" | "student">("director");
  const [pinCode, setPinCode] = useState("");
  const [closerAccountEmail, setCloserAccountEmail] = useState("lucas@xragency.fr");

  // ── DIRECTOR TABS & MODES D'AFFICHAGE (COCKPIT PRO vs BOSS ARCADE vs MONDE METAVERSE vs ARÈNE CLOSER) ──
  const [directorDisplayMode, setDirectorDisplayMode] = useState<"cockpit" | "boss_arcade" | "game_world" | "closer_arena">("cockpit");
  const [closerDisplayMode, setCloserDisplayMode] = useState<"missions" | "combat_hub">("combat_hub");
  const [directorTab, setDirectorTab] = useState<
    | "overview"
    | "leads"
    | "clients"
    | "quotes"
    | "invoices"
    | "projects"
    | "providers"
    | "calendar"
    | "maquettes"
    | "leaderboard"
  >("overview");
  const [showOfficialQuoteModal, setShowOfficialQuoteModal] = useState(false);
  const [directorLeadScope, setDirectorLeadScope] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── CLOSER TABS & ASSISTED CALL MODAL ──
  const [closerTab, setCloserTab] = useState<
    "missions" | "maquettes" | "commissions" | "calendar" | "rpg_training" | "leaderboard"
  >("missions");
  const [closerQuestMode, setCloserQuestMode] = useState<"quest_deck" | "grid">("quest_deck");
  const [closerQuestIndex, setCloserQuestIndex] = useState(0);
  const [activeCallLead, setActiveCallLead] = useState<CrmLead | null>(null);
  const [callNotesInput, setCallNotesInput] = useState("");
  const [callFollowUpInput, setCallFollowUpInput] = useState("Demain 10h00");

  // ── STUDENT (XR SCHOOL) STATE + PASSERELLE CRM COMMERCIAL ──
  const [studentViewMode, setStudentViewMode] = useState<"school" | "crm_bridge">("school");
  const [selectedBattleId, setSelectedBattleId] = useState<string>(SCHOOL_OBJECTION_BATTLES[0].id);
  const [battleOutcome, setBattleOutcome] = useState<"none" | "win" | "retry">("none");

  // ── FORMULAIRE RAPIDE D'AJOUT DE LEAD (SCREENSHOT / TÉLÉPHONE / FICHE) ──
  const [leadTargetMode, setLeadTargetMode] = useState<"mine" | "closer">("closer");
  const [leadAssignedCloser, setLeadAssignedCloser] = useState("mem-lucas");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadContactName, setLeadContactName] = useState("");
  const [leadCity, setLeadCity] = useState("");
  const [leadServiceTarget, setLeadServiceTarget] = useState("Site Vitrine Pro (499 €)");
  const [leadBudgetEur, setLeadBudgetEur] = useState(499);
  const [leadNotes, setLeadNotes] = useState("");
  const [leadScreenshotDataUrl, setLeadScreenshotDataUrl] = useState<string>("");

  // ── STUDIO MAQUETTES (LIEN 1-CLIC DIRECTION) ──
  const [maquetteLinkInputs, setMaquetteLinkInputs] = useState<Record<string, string>>({});

  // ── CRÉATION RAPIDE DE DEVIS OFFICIEL + RIB ──
  const [quoteCompany, setQuoteCompany] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteServiceLabel, setQuoteServiceLabel] = useState("Site Vitrine Pro (Clé en main 7j)");
  const [quotePriceEur, setQuotePriceEur] = useState(499);
  const [quotePeriod, setQuotePeriod] = useState<"once" | "year" | "month">("once");

  // ── TÂCHES / CALENDRIER VIE PERSO & PRO ──
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<"pro" | "perso">("pro");
  const [newTaskDueDate, setNewTaskDueDate] = useState("Aujourd'hui");

  // ── GAMIFICATION & EFFETS LUDIQUES (KA-CHING, COFFRE, CONFETTIS) ──
  const [showCelebration, setShowCelebration] = useState<{
    active: boolean;
    title: string;
    subtitle: string;
    amount?: number;
  }>({
    active: false,
    title: "",
    subtitle: "",
  });

  const triggerCelebration = (title: string, subtitle: string, amount?: number) => {
    playVictorySound();
    setShowCelebration({ active: true, title, subtitle, amount });
    setTimeout(() => {
      setShowCelebration((prev) => ({ ...prev, active: false }));
    }, 4500);
  };

  // ── CHRONOMÈTRE APPEL ASSISTÉ CLOSER ──
  const [callTimerSeconds, setCallTimerSeconds] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (activeCallLead) {
      setCallTimerSeconds(0);
      timer = setInterval(() => {
        setCallTimerSeconds((s) => s + 1);
      }, 1000);
    } else {
      setCallTimerSeconds(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeCallLead]);

  // ── MODE D'AJOUT DIRECTION (FLASH 5S vs DÉTAILLÉ) ──
  const [directionAddMode, setDirectionAddMode] = useState<"flash" | "detailed">("flash");
  const [flashLeadText, setFlashLeadText] = useState("");
  const [flashCloserTarget, setFlashCloserTarget] = useState("mem-lucas");
  const [flashServiceTarget, setFlashServiceTarget] = useState("Site Vitrine Pro (499 €)");

  // ── MODALE MESSAGES WHATSAPP PRÉ-RÉDIGÉS 1-CLIC ──
  const [whatsappModalLead, setWhatsappModalLead] = useState<CrmLead | null>(null);
  const [showAccessManager, setShowAccessManager] = useState(false);
  const [resetMemberId, setResetMemberId] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [whatsappTemplateKey, setWhatsappTemplateKey] = useState<"maquette" | "relance" | "devis" | "contact">("maquette");

  // ── SIMULATEUR DE COMMISSION EN DIRECT (COFFRE CLOSER) ──
  const [simulatedPriceEur, setSimulatedPriceEur] = useState(999);
  const [simulatedServiceLabel, setSimulatedServiceLabel] = useState("Google Maps Top 3 Garanti 24/7 (999 €/an)");

  const flashSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const fetchSnapshot = useCallback(async () => {
    try {
      const res = await fetch("/api/crm", { credentials: "include" });
      const data = (await res.json()) as CrmSnapshot;
      setSnapshot(data);
    } catch {
      setErrorMsg("Impossible de charger le CRM.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSnapshot();
  }, [fetchSnapshot]);

  const apiCall = async (payload: Record<string, unknown>, okMessage?: string) => {
    setBusy(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as CrmSnapshot & { error?: string };
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Une erreur est survenue.");
        return null;
      }
      setSnapshot(data);
      if (okMessage) flashSuccess(okMessage);
      return data;
    } catch {
      setErrorMsg("Erreur réseau lors de l'opération.");
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    try {
      await apiCall({ action: "logout" }, "Déconnexion réussie !");
    } catch {
      // ignore
    } finally {
      setSnapshot({ authenticated: false });
      setBusy(false);
    }
  };

  // Support Ctrl+V image paste for instant screenshot leads
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!snapshot?.authenticated) return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (!file) continue;
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              setLeadScreenshotDataUrl(reader.result);
              flashSuccess("📸 Capture d'écran collée ! Cliquez sur Ajouter le Lead.");
            }
          };
          reader.readAsDataURL(file);
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [snapshot?.authenticated]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLeadScreenshotDataUrl(reader.result);
        flashSuccess("📸 Photo / Capture prête à être envoyée !");
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePinLogin = async (e?: FormEvent, overridePin?: string, overrideRole?: "director" | "closer" | "student", overrideEmail?: string) => {
    if (e) e.preventDefault();
    const code = (overridePin ?? pinCode).trim();
    const role = overrideRole ?? selectedPortalRole;
    if (!code) {
      setErrorMsg("Saisissez votre code d'accès.");
      return;
    }
    const emailForLogin = overrideEmail || (role === "director" ? "admin@xragency.fr" : role === "student" ? "karim@xragency.fr" : closerAccountEmail);

    await apiCall(
      {
        action: "login",
        pin: code,
        password: code,
        email: emailForLogin,
      },
      "Connexion réussie !"
    );
    setPinCode("");
  };

  const handleQuickAddLead = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim() && !leadCompany.trim() && !leadScreenshotDataUrl) {
      setErrorMsg("Mettez au moins un numéro de téléphone, un nom ou une capture d'écran !");
      return;
    }
    const assignedTo =
      user?.portalType === "director"
        ? leadTargetMode === "mine"
          ? user.id
          : leadAssignedCloser
        : user?.id || "mem-lucas";

    const res = await apiCall(
      {
        action: "send_lead",
        company: leadCompany.trim(),
        contactName: leadContactName.trim(),
        phone: leadPhone.trim(),
        city: leadCity.trim() || "France",
        serviceTarget: leadServiceTarget,
        budgetEur: leadBudgetEur,
        notes: leadNotes.trim(),
        screenshotUrl: leadScreenshotDataUrl || undefined,
        assignedTo,
      },
      leadTargetMode === "mine" && user?.portalType === "director"
        ? "✅ Lead enregistré dans vos Leads Direction !"
        : "🚀 Lead envoyé instantanément au commercial !"
    );
    if (res) {
      setLeadPhone("");
      setLeadCompany("");
      setLeadContactName("");
      setLeadNotes("");
      setLeadScreenshotDataUrl("");
    }
  };

  const handleFlashAddLead = async (e: FormEvent) => {
    e.preventDefault();
    const raw = flashLeadText.trim();
    if (!raw) {
      setErrorMsg("Veuillez saisir un numéro ou un nom d'entreprise !");
      return;
    }

    const phoneMatch = raw.match(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/);
    const extractedPhone = phoneMatch ? phoneMatch[0] : "";
    let extractedCompany = raw.replace(extractedPhone, "").replace(/[-—,;:]/g, " ").trim();
    if (!extractedCompany) {
      extractedCompany = extractedPhone ? `Prospect ${extractedPhone}` : "Nouveau Prospect Direct";
    }
    const finalPhone = extractedPhone || raw;

    let budget = 499;
    if (flashServiceTarget.includes("999")) budget = 999;
    else if (flashServiceTarget.includes("1499")) budget = 1499;
    else if (flashServiceTarget.includes("2000")) budget = 2000;
    else if (flashServiceTarget.includes("2490")) budget = 2490;

    const res = await apiCall(
      {
        action: "send_lead",
        company: extractedCompany,
        contactName: "Gérant / Décideur",
        phone: finalPhone,
        city: "France / Métropole",
        serviceTarget: flashServiceTarget,
        budgetEur: budget,
        assignedTo: flashCloserTarget,
        notes: "Lead injecté en Mode Flash (5s) par la Direction",
      },
      "⚡ Lead flash créé et dispatché instantanément !"
    );

    if (res) {
      setFlashLeadText("");
      triggerCelebration("LEAD DISPATCHÉ ! ⚡", `Mission envoyée au closer pour ${extractedCompany}`);
    }
  };

  const handleRequestQuoteAndRib = async (lead?: CrmLead) => {
    const company = lead ? lead.company : quoteCompany.trim();
    const email = lead ? lead.email || "client@entreprise.fr" : quoteEmail.trim() || "client@entreprise.fr";
    const label = lead ? lead.serviceTarget : quoteServiceLabel;
    const price = lead ? lead.budgetEur : quotePriceEur;
    const period: "once" | "year" | "month" = lead
      ? lead.serviceTarget.toLowerCase().includes("maps")
        ? "year"
        : lead.serviceTarget.toLowerCase().includes("mois") || lead.serviceTarget.toLowerCase().includes("seo")
          ? "month"
          : "once"
      : quotePeriod;

    if (!company) {
      setErrorMsg("Indiquez le nom du client ou de l'entreprise.");
      return;
    }

    await apiCall(
      {
        action: "create_quote",
        leadId: lead?.id,
        clientName: lead?.contactName || company,
        clientCompany: company,
        clientEmail: email,
        items: [
          {
            label,
            detail: "Prestation XR Agency — coordonnées bancaires transmises après validation",
            priceEur: price,
            period,
            quantity: 1,
          },
        ],
      },
      `📄 Devis et proforma générés pour ${company} — coordonnées bancaires à confirmer.`
    );
    setQuoteCompany("");
    setQuoteEmail("");
  };

  const user = snapshot?.user;
  const leads = snapshot?.leads || [];
  const members = snapshot?.members || [];
  const clients = snapshot?.clients || [];
  const quotes = snapshot?.quotes || [];
  const invoices = snapshot?.invoices || [];
  const projects = snapshot?.projects || [];
  const tasks = snapshot?.tasks || [];
  const providers = snapshot?.providers || [];
  const notifications = snapshot?.notifications || [];

  const crmTodos: CrmTodo[] = useMemo(() => {
    return tasks.map((t) => ({
      id: t.id,
      category: (t.category === "perso" ? "perso" : "pro") as "pro" | "perso",
      title: t.title,
      priority: (t.priority || "high") as "urgent" | "high" | "normal",
      deadline: t.dueDate || "Aujourd'hui",
      tag: t.tag || (t.category === "perso" ? "Perso" : "Stratégie Pro"),
      done: t.status === "done",
      createdAt: t.createdAt,
    }));
  }, [tasks]);

  const handleCreateClient = async (clientData: {
    company: string;
    contactName: string;
    email: string;
    phone: string;
    website?: string;
    city: string;
    sector: string;
    servicesPurchased: string[];
    totalRevenueEur: number;
    internalNotes?: string;
  }) => {
    await apiCall(
      {
        action: "create_client",
        ...clientData,
      },
      `Client ${clientData.company} créé avec succès !`
    );
  };

  const handleCreateQuote = async (quoteData: {
    clientCompany: string;
    clientName: string;
    clientEmail: string;
    items: QuoteItem[];
    paymentTerms?: string;
    notes?: string;
  }) => {
    await apiCall(
      {
        action: "create_quote",
        ...quoteData,
      },
      `Devis créé pour ${quoteData.clientCompany} !`
    );
  };

  const handleUpdateQuoteStatus = async (quoteId: string, status: CrmQuoteRecord["status"]) => {
    await apiCall(
      {
        action: "update_quote_status",
        quoteId,
        status,
      },
      `Statut du devis ${quoteId} mis à jour : ${status}`
    );
  };

  const handleValidatePayment = async (invoiceId: string) => {
    triggerCelebration(
      "VIREMENT REÇU & CONFIRMÉ ! 💸",
      `Fonds reçus sur le compte bancaire de l’entité contractante. Les commissions ont été débloquées dans le coffre du closer !`
    );
    await apiCall(
      {
        action: "validate_payment",
        invoiceId,
      },
      `Virement validé pour ${invoiceId} ! Commissions débloquées dans le coffre du closer.`
    );
  };

  const handleCreateProject = async (projectData: {
    projectName: string;
    clientName: string;
    serviceCategory: string;
    budgetEur: number;
    deliveryDeadline: string;
    notes?: string;
  }) => {
    await apiCall(
      {
        action: "create_project",
        ...projectData,
      },
      `Projet "${projectData.projectName}" créé avec succès !`
    );
  };

  const handleUpdateProject = async (projectId: string, updates: Partial<CrmProjectRecord>) => {
    await apiCall(
      {
        action: "update_project",
        projectId,
        updates,
      },
      `Projet ${projectId} mis à jour !`
    );
  };

  const handleCreateProvider = async (providerData: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    specialties: string[];
    hourlyRateEur: number;
    notes?: string;
  }) => {
    await apiCall(
      {
        action: "create_provider",
        ...providerData,
      },
      `Prestataire ${providerData.name} enregistré !`
    );
  };

  const handleResetMemberPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!resetMemberId || resetPassword.length < 12) return;
    const result = await apiCall({ action: "reset_member_password", memberId: resetMemberId, newPassword: resetPassword }, "Mot de passe réinitialisé. Transmettez-le au membre par un canal privé.");
    if (result) {
      setResetPassword("");
      setShowAccessManager(false);
    }
  };

  const closersList = useMemo(
    () => members.filter((m) => m.role !== "admin" && m.portalType !== "student"),
    [members]
  );

  // Calcul du Coffre-Fort des Commissions (En attente virement vs Débloqué par virement reçu)
  const commissionSummary = useMemo(() => {
    const signedLeads = leads.filter((l) => l.status === "signed" || l.status === "outsourced");
    const paidCompanies = new Set(
      invoices.filter((i) => i.status === "paid").map((i) => i.clientCompany.toLowerCase())
    );

    let unlockedEur = 0;
    let pendingVaultEur = 0;

    for (const l of signedLeads) {
      const { amountEur } = getOfficialCommission(l.serviceTarget, l.budgetEur);
      if (paidCompanies.has(l.company.toLowerCase())) {
        unlockedEur += amountEur;
      } else {
        pendingVaultEur += amountEur;
      }
    }
    return { unlockedEur, pendingVaultEur, totalSignedEur: unlockedEur + pendingVaultEur };
  }, [leads, invoices]);

  const pendingMaquettes = useMemo(
    () => leads.filter((l) => l.maquetteStatus === "pending"),
    [leads]
  );
  const validatedMaquettes = useMemo(
    () => leads.filter((l) => l.maquetteStatus === "validated"),
    [leads]
  );

  const urgentLeads48h = useMemo(() => {
    return leads.filter((l) => isLeadUrgent48h(l));
  }, [leads]);

  const activeBattle = SCHOOL_OBJECTION_BATTLES.find((battle) => battle.id === selectedBattleId) || SCHOOL_OBJECTION_BATTLES[0];

  const openCallModal = (lead: CrmLead) => {
    setCallNotesInput("");
    setCallFollowUpInput("Demain 10h00");
    setActiveCallLead(lead);
  };

  const openWhatsappModal = (lead: CrmLead) => {
    setWhatsappTemplateKey("maquette");
    setWhatsappModalLead(lead);
  };

  const updateLeadStatus = async (leadId: string, status: LeadStatus) => {
    const result = await apiCall({ action: "update_lead", leadId, status }, "Statut du prospect mis à jour.");
    if (result && status === "signed") {
      const lead = leads.find((item) => item.id === leadId);
      if (lead) triggerCelebration("DEAL SIGNÉ !", `${lead.company} a été marqué comme signé.`, getOfficialCommission(lead.serviceTarget, lead.budgetEur).amountEur);
    }
    return result;
  };

  const handleCopyLovable = (lead: CrmLead) => {
    const p = {
      id: lead.id,
      business_name: lead.company,
      contact_name: lead.contactName,
      phone: lead.phone,
      website_url: lead.website || "",
      status: lead.status,
      notes: lead.notes,
      created_at: lead.createdAt,
    };
    const prompt = generateLovableArchitecturePrompt(p as any);
    navigator.clipboard.writeText(prompt);
    flashSuccess(`⚡ Prompt Lovable 24h pour ${lead.company} copié dans le presse-papier !`);
    playXpChime();
  };

  // ── COMPOSANTS MODALES PARTAGÉES (WHATSAPP 1-CLIC & CÉLÉBRATION VICTOIRE) ──
  const renderCelebrationBanner = () => {
    if (!showCelebration.active) return null;
    return (
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
        <div className="animate-bounce rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-[#1c1811] via-[#12141a] to-black p-8 text-center text-white shadow-[0_0_80px_rgba(251,191,36,0.5)]">
          <span className="text-6xl animate-pulse inline-block">🏆🪙</span>
          <h3 className="mt-4 text-2xl font-black uppercase tracking-wider text-amber-300">
            {showCelebration.title}
          </h3>
          <p className="mt-2 text-sm text-white/90">{showCelebration.subtitle}</p>
          {showCelebration.amount && (
            <p className="mt-3 font-mono text-3xl font-black text-emerald-400">
              +{formatMoney(showCelebration.amount)} DÉBLOQUÉS !
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderAccessManagerModal = () => {
    if (!showAccessManager || user?.role !== "admin") return null;
    const resettableMembers = members.filter((member) => member.active && member.id !== user.id);
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
        <form onSubmit={handleResetMemberPassword} className="w-full max-w-md space-y-4 rounded-3xl border border-[#D4AF37]/40 bg-[#10131b] p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">Sécurité des comptes</p>
              <h3 className="mt-1 text-xl font-bold">Réinitialiser un accès</h3>
            </div>
            <button type="button" onClick={() => { setShowAccessManager(false); setResetPassword(""); }} className="rounded-full border border-white/20 px-3 py-1 text-xs">Fermer</button>
          </div>
          <label className="block space-y-1 text-xs text-white/70">
            <span>Membre</span>
            <select required value={resetMemberId} onChange={(e) => setResetMemberId(e.target.value)} className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-3 text-sm text-white">
              <option value="">Choisir un compte</option>
              {resettableMembers.map((member) => <option key={member.id} value={member.id}>{member.fullName} · {member.email}</option>)}
            </select>
          </label>
          <label className="block space-y-1 text-xs text-white/70">
            <span>Nouveau mot de passe (12 caractères minimum)</span>
            <input type="password" autoComplete="new-password" minLength={12} maxLength={256} required value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-3 text-sm text-white" />
          </label>
          <p className="text-[11px] leading-5 text-white/50">Le nouveau mot de passe remplace immédiatement l'ancien. Transmettez-le au membre par un canal privé, jamais dans un groupe public.</p>
          <button type="submit" disabled={busy || !resetMemberId || resetPassword.length < 12} className="w-full rounded-xl bg-[#D4AF37] px-4 py-3 text-xs font-black uppercase tracking-wider text-black disabled:opacity-40">Enregistrer le nouvel accès</button>
        </form>
      </div>
    );
  };

  const renderWhatsappModal = () => {
    if (!whatsappModalLead) return null;
    const messageText = getWhatsappMessageText(whatsappTemplateKey, whatsappModalLead, user?.fullName || "Équipe XR");
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
        <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-emerald-400/40 bg-[#0f1118] p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-bold">WhatsApp 1-Clic · {whatsappModalLead.company}</h3>
            </div>
            <button
              type="button"
              onClick={() => setWhatsappModalLead(null)}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 hover:text-white"
            >
              Fermer ✕
            </button>
          </div>

          <p className="mt-3 text-xs text-white/60">
            Sélectionnez un modèle calibré pour maximiser le taux de réponse :
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { key: "maquette", label: "🎨 Maquette Offerte" },
              { key: "relance", label: "🔥 Relance J+2" },
              { key: "devis", label: "📝 Devis & coordonnées bancaires" },
              { key: "contact", label: "🤝 Prise de Contact" },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setWhatsappTemplateKey(t.key as typeof whatsappTemplateKey)}
                className={cn(
                  "rounded-xl border p-2.5 text-xs font-bold transition",
                  whatsappTemplateKey === t.key
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/15 bg-black/60 p-4 font-sans text-xs leading-relaxed text-white/90">
            <span className="mb-2 block font-mono text-[9px] font-bold uppercase text-emerald-300">
              Aperçu du message :
            </span>
            {messageText}
          </div>

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  void navigator.clipboard.writeText(messageText);
                  flashSuccess("Texte copié dans le presse-papier !");
                }
              }}
              className="flex-1 rounded-xl border border-white/20 bg-white/5 py-3 text-xs font-bold text-white hover:bg-white/10"
            >
              Copier le texte
            </button>
            <a
              href={`https://wa.me/${whatsappModalLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                messageText
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setWhatsappModalLead(null)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 text-xs font-black uppercase text-[#0b0d11] shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:bg-emerald-300"
            >
              <MessageCircle className="h-4 w-4" />
              Ouvrir WhatsApp 🚀
            </a>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0b0c0f] text-[#f8f6f0]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c5a880] border-t-transparent" />
          <p className="font-mono text-xs uppercase tracking-widest text-[#c5a880]">
            Chargement du portail XR Agency...
          </p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ÉCRAN DE CONNEXION ULTRA-LUDIQUE : SÉLECTION DE HÉROS & CLAVIER TACTILE ARCADE
  // ══════════════════════════════════════════════════════════════════════════
  if (!snapshot?.authenticated || !user) {
    return (
      <CharacterSelectLogin
        onLoginWithPin={async (portal, password, email) => {
          setSelectedPortalRole(portal);
          setPinCode(password);
          await handlePinLogin(undefined, password, portal, email);
        }}
        isLoading={busy}
        errorMessage={errorMsg}
      />
    );
  }

  const effectivePortal = user.portalType || (user.role === "admin" ? "director" : "closer");

  // ══════════════════════════════════════════════════════════════════════════
  // PORTAIL 3 : ACADÉMIE XR SCHOOL (AVEC PASSERELLE VERS LE CRM COMMERCIAL)
  // ══════════════════════════════════════════════════════════════════════════
  if (effectivePortal === "student" && studentViewMode === "school") {
    return (
      <div className="relative min-h-screen bg-[#07090e]">
        {/* Passerelle Supérieure vers le CRM Commercial */}
        <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-sky-400/30 bg-[#07090e]/95 px-4 py-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-sky-300">
              ACADÉMIE XR SCHOOL · 90 JOURS
            </span>
            <span className="text-xs font-bold text-white">{user.fullName}</span>
          </div>

          <div className="flex items-center gap-2">
            {user?.role === "admin" && (
              <button type="button" onClick={() => { setResetMemberId(closersList[0]?.id || ""); setShowAccessManager(true); }} className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1.5 text-xs font-bold text-[#E2D5BC] hover:bg-[#D4AF37]/20">
                <KeyRound className="h-3.5 w-3.5" />
                <span>Gérer les accès</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-3.5 py-1.5 text-xs font-bold text-red-200 transition hover:bg-red-500/25"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Déconnexion</span>
            </button>
            <button
              type="button"
              onClick={() => setStudentViewMode("crm_bridge")}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#0b0d12] shadow-[0_0_25px_rgba(52,211,153,0.4)] transition hover:bg-emerald-300"
            >
              <Target className="h-4 w-4" />
              Ouvrir Mon Arène Commerciale (Leads Réels)
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <CrmSchoolDashboard
          user={{ fullName: user.fullName, email: user.email }}
          onLogout={handleLogout}
        />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PORTAIL 2 : ARÈNE COMMERCIALE (OU ÉLÈVE EN MODE PASSERELLE CRM)
  // MODE A : ARÈNE COMMERCIALE 200% LUDIQUE & INTUITIVE (BATTLE PASS & TARGET DECK)
  // ══════════════════════════════════════════════════════════════════════════
  if (
    (effectivePortal === "closer" || (effectivePortal === "student" && studentViewMode === "crm_bridge")) &&
    closerDisplayMode === "combat_hub"
  ) {
    return (
      <div className="relative min-h-screen bg-[#07090e]">
        <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/30 bg-black/90 px-4 py-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 font-mono text-xs font-black text-emerald-300">
              ⚔️ ARÈNE COMMERCIALE LUDIQUE XR
            </span>
            {effectivePortal === "student" && (
              <button
                type="button"
                onClick={() => setStudentViewMode("school")}
                className="rounded-full border border-sky-400/50 bg-sky-500/20 px-2.5 py-0.5 font-mono text-[9px] font-bold text-sky-300 hover:bg-sky-500/30"
              >
                ← Retour École XR
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-3.5 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500/25"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Déconnexion</span>
            </button>
            <button
              type="button"
              onClick={() => setCloserDisplayMode("missions")}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-neutral-300 hover:text-white hover:bg-white/20"
            >
              📋 Vue Tableau Classique
            </button>
          </div>
        </div>

        <CrmUltraLudiqueArena
          user={{
            fullName: user.fullName,
            email: user.email,
            commissionPct: user.commissionPct,
          }}
          leads={leads}
          onLogout={handleLogout}
          onOpenCallModal={openCallModal}
          onOpenWhatsappModal={openWhatsappModal}
          onSignDeal={(leadId) => updateLeadStatus(leadId, "signed")}
        />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MODE B : ARÈNE COMMERCIALE MISSIONS JEU VIDÉO
  // ══════════════════════════════════════════════════════════════════════════
  if (effectivePortal === "closer" || (effectivePortal === "student" && studentViewMode === "crm_bridge")) {
    return (
      <div className="min-h-screen bg-[#0b0d11] text-[#f8f6f0]">
        {/* Topbar Commerciale Ludique */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d11]/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <img
                src={agentXrPortrait}
                alt=""
                className="h-10 w-10 rounded-2xl border border-emerald-400/50 object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-300">
                    ARÈNE COMMERCIALE XR
                  </span>
                  {effectivePortal === "student" && (
                    <button
                      type="button"
                      onClick={() => setStudentViewMode("school")}
                      className="rounded-full border border-sky-400/50 bg-sky-500/20 px-2.5 py-0.5 font-mono text-[9px] font-bold text-sky-300 hover:bg-sky-500/30"
                    >
                      ← Retourner aux cours XR School
                    </button>
                  )}
                </div>
                <h1 className="text-base font-bold text-white">{user.fullName}</h1>
              </div>

              {/* Bouton pour basculer vers le Hub de Combat Closer RPG */}
              <button
                type="button"
                onClick={() => setCloserDisplayMode("combat_hub")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              >
                ⚔️ Hub RPG Jeu Vidéo
              </button>
            </div>

            {/* Navigation Onglets Arène Commerciale */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "missions", label: "🎯 Mes Missions (Leads)", count: leads.length },
                {
                  id: "maquettes",
                  label: "🎨 Mes Maquettes",
                  count: leads.filter((l) => l.maquetteStatus && l.maquetteStatus !== "none").length,
                },
                { id: "commissions", label: "💰 Mon Coffre & Barème" },
                { id: "calendar", label: "📅 Relances & Quêtes" },
                { id: "rpg_training", label: "⚔️ Combat Objections RPG" },
                { id: "leaderboard", label: "🏆 Classement Équipe" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCloserTab(t.id as typeof closerTab)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition",
                    closerTab === t.id
                      ? "bg-emerald-400 text-[#0b0d11] shadow-[0_0_20px_rgba(52,211,153,0.35)]"
                      : "border border-white/10 bg-white/5 text-white/75 hover:text-white"
                  )}
                >
                  <span>{t.label}</span>
                  {t.count !== undefined && (
                    <span className="rounded-full bg-black/25 px-1.5 py-0.5 font-mono text-[10px]">
                      {t.count}
                    </span>
                  )}
                </button>
              ))}

              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-3.5 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/25"
                title="Se déconnecter et revenir à l'écran de code PIN"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-6 px-4 pt-6 pb-24 sm:py-6 sm:px-6">
          {successMsg && (
            <div className="rounded-2xl border border-emerald-400/50 bg-emerald-500/20 px-4 py-3 text-xs font-bold text-emerald-200">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="rounded-2xl border border-red-500/50 bg-red-500/20 px-4 py-3 text-xs font-bold text-red-200">
              {errorMsg}
            </div>
          )}

          {/* Bandeau Alerte Rouge 48h de Closing */}
          {urgentLeads48h.length > 0 && (
            <div className="rounded-2xl border border-red-500/80 bg-gradient-to-r from-red-950/80 via-red-900/40 to-[#12141a] p-4 text-white shadow-[0_0_30px_rgba(239,68,68,0.35)] animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-500/30 text-red-400">
                  <Flame className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-red-400 tracking-wider">
                    ⚠️ ALERTE ROUGE CLOSING 48H · {urgentLeads48h.length} PROSPECT(S) EN DANGER
                  </h4>
                  <p className="text-xs text-white/80">
                    {urgentLeads48h[0].company} ({urgentLeads48h[0].phone}) dépasse le délai SLA. Relancez immédiatement pour éviter la perte du dossier !
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/${urgentLeads48h[0].phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Bonjour ${urgentLeads48h[0].contactName || ""}, je reviens vers vous concernant votre projet de visibilité avec XR Agency.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-xs font-black uppercase text-white shadow-lg shadow-red-500/40 hover:bg-red-400 shrink-0"
              >
                <MessageCircle className="h-4 w-4" />
                Relance WhatsApp 1-Clic
              </a>
            </div>
          )}

          {/* Compteurs Héroïques en haut */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300">
                📞 À APPELER MAINTENANT
              </span>
              <p className="mt-1 text-2xl font-black text-white">
                {leads.filter((l) => l.status === "to_call" || l.status === "new").length}
              </p>
            </div>
            <div className="rounded-2xl border border-purple-400/30 bg-purple-500/10 p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300">
                🎨 MAQUETTES VALIDÉES
              </span>
              <p className="mt-1 text-2xl font-black text-white">
                {leads.filter((l) => l.maquetteStatus === "validated").length}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-400/30 bg-sky-500/10 p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-sky-300">
                🔒 COMMISSIONS EN COFFRE
              </span>
              <p className="mt-1 text-2xl font-black text-white">
                {formatMoney(commissionSummary.pendingVaultEur)}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/15 p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                💸 VIRÉES & DÉBLOQUÉES
              </span>
              <p className="mt-1 text-2xl font-black text-emerald-300">
                {formatMoney(commissionSummary.unlockedEur)}
              </p>
            </div>
          </div>

          {/* ONGLET 1 : MES CARTES DE MISSION (MODE QUÊTE RPG OU GRILLE) */}
          {closerTab === "missions" && (
            <div className="space-y-6">
              
              {/* Sélecteur de Mode : Quête Pas-à-Pas (Débutant) vs Grille Complète */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-[#0F172A]/80 p-3 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Arène Commerciale · Mode de Jeu
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Parcours pas-à-pas pour les nouveaux closers ou vision globale
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playXpChime();
                      setCloserQuestMode("quest_deck");
                    }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition",
                      closerQuestMode === "quest_deck"
                        ? "bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                        : "border border-white/10 bg-white/5 text-neutral-300 hover:text-white"
                    )}
                  >
                    <Swords className="h-3.5 w-3.5" />
                    <span>🎮 Quête Guidée (1 Cible)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCloserQuestMode("grid")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition",
                      closerQuestMode === "grid"
                        ? "bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                        : "border border-white/10 bg-white/5 text-neutral-300 hover:text-white"
                    )}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    <span>📋 Grille Complète ({leads.length})</span>
                  </button>
                </div>
              </div>

              {/* ── MODE 1 : QUÊTE GUIDÉE PAS À PAS (ULTRA LUDIQUE POUR NOUVEAUX COMMERCIAUX) ── */}
              {closerQuestMode === "quest_deck" && leads.length > 0 && (() => {
                const safeIndex = Math.abs(closerQuestIndex) % leads.length;
                const lead = leads[safeIndex];
                const comm = getOfficialCommission(lead.serviceTarget, lead.budgetEur);
                const urgent48h = isLeadUrgent48h(lead);

                return (
                  <div className="space-y-6">
                    {/* Battle Pass Journalier du Closer */}
                    <div className="rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#0F172A] via-[#1E293B]/70 to-[#0F172A] p-5 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2.5">
                          <Trophy className="h-5 w-5 text-[#D4AF37] animate-bounce" />
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#E2D5BC]">
                            BATTLE PASS DU JOUR · OBJECTIFS DE PRIMES
                          </h4>
                        </div>
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                          +400 XP & 150 € DÈS LE 1ER CLOSING
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-300">📞 3 Appels passés</span>
                            <span className="font-mono font-bold text-amber-400">1/3</span>
                          </div>
                          <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-amber-400" style={{ width: "33%" }} />
                          </div>
                          <span className="mt-1.5 block font-mono text-[9px] text-neutral-400">+50 XP</span>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-300">🎨 1 Maquette offerte</span>
                            <span className="font-mono font-bold text-purple-400">
                              {leads.some((l) => l.maquetteStatus === "validated") ? "1/1 ✓" : "0/1"}
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-purple-400"
                              style={{ width: leads.some((l) => l.maquetteStatus === "validated") ? "100%" : "20%" }}
                            />
                          </div>
                          <span className="mt-1.5 block font-mono text-[9px] text-neutral-400">+100 XP</span>
                        </div>

                        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#E2D5BC]">👑 1 Deal closé</span>
                            <span className="font-mono font-bold text-[#D4AF37]">
                              {leads.some((l) => l.status === "signed") ? "1/1 ✓" : "0/1"}
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-[#D4AF37]"
                              style={{ width: leads.some((l) => l.status === "signed") ? "100%" : "10%" }}
                            />
                          </div>
                          <span className="mt-1.5 block font-mono text-[9px] text-emerald-400">
                            +250 XP & Prime Immédiate
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Carte de Cible Unique — Format Grand Écran / Deck de Cartes */}
                    <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-400/50 bg-[#10141E] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                      
                      {/* Contrôles Précédent / Suivant en haut */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
                            CIBLE {safeIndex + 1} SUR {leads.length}
                          </span>
                          {urgent48h && (
                            <span className="rounded-full bg-red-500/20 border border-red-500/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-red-300 animate-pulse">
                              🔥 URGENT 48H
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              playXpChime();
                              setCloserQuestIndex((prev) => (prev > 0 ? prev - 1 : leads.length - 1));
                            }}
                            className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/10"
                          >
                            ⬅️ Cible Précédente
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              playXpChime();
                              setCloserQuestIndex((prev) => prev + 1);
                            }}
                            className="rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30"
                          >
                            Cible Suivante ➡️
                          </button>
                        </div>
                      </div>

                      {/* Contenu de la Cible */}
                      <div className="mt-6 grid lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-7">
                          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-black text-emerald-300">
                            💰 PRIME CASH DIRECT : +{formatMoney(comm.amountEur)} ({comm.ratePct} %)
                          </div>

                          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                            {lead.company}
                          </h2>
                          <p className="mt-1 text-sm text-neutral-300">
                            {lead.contactName || "Dirigeant"} · {lead.city || "France"} · Offre ciblée :{" "}
                            <strong className="text-[#D4AF37]">{lead.serviceTarget}</strong> ({formatMoney(lead.budgetEur)})
                          </p>

                          {/* Le Pitch Téléphone sous les yeux (Script Mot-à-Mot) */}
                          <div className="mt-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-4">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                              🗣️ TON PITCH D'OUVERTURE (À LIRE AU TÉLÉPHONE) :
                            </span>
                            <p className="mt-2 text-xs sm:text-sm italic text-neutral-200 leading-relaxed">
                              « Bonjour {lead.contactName || "Monsieur"} ! Je suis {user?.fullName?.split(" ")[0] || "Lucas"} de XR Agency. On a analysé la visibilité de {lead.company} et on a créé une maquette sur-mesure pour vous montrer comment doubler vos demandes locales. Est-ce que vous avez 2 minutes ou un numéro WhatsApp pour que je vous l'envoie ? »
                            </p>
                          </div>
                        </div>

                        {/* Les 3 Boutons d'Action Géants */}
                        <div className="lg:col-span-5 flex flex-col gap-3">
                          <button
                            type="button"
                            onClick={() => openCallModal(lead)}
                            className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 px-6 text-sm font-black uppercase text-black shadow-[0_10px_30px_rgba(16,185,129,0.4)] transition hover:scale-[1.02] active:scale-95"
                          >
                            <PhoneCall className="h-5 w-5" />
                            <span>1. Lancer l'Appel Gagnant</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => openWhatsappModal(lead)}
                            className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/50 bg-[#0F172A] py-3.5 px-6 text-xs font-bold text-emerald-300 transition hover:bg-emerald-500/10 active:scale-95"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>2. Envoyer Maquette WhatsApp</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              playVictorySound();
                              updateLeadStatus(lead.id, "signed");
                            }}
                            className="flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/60 bg-[#D4AF37]/15 py-3.5 px-6 text-xs font-bold text-[#E2D5BC] transition hover:bg-[#D4AF37] hover:text-black active:scale-95"
                          >
                            <Crown className="h-4 w-4" />
                            <span>3. C'est Signé ! (Encaisser le Cash)</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}

              {/* ── MODE 2 : GRILLE DE LEADS CLASSIQUE ── */}
              {closerQuestMode === "grid" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-bold text-white">
                      Vos Cartes de Mission — Cliquez sur le bouton lumineux de chaque prospect
                    </h2>
                    <span className="text-xs text-white/60">
                      Barème auto : 30 % Sites Web · 20 % CRM/POS · 10 % Google Maps & Abonnements
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {leads.map((lead) => {
                      const comm = getOfficialCommission(lead.serviceTarget, lead.budgetEur);
                      const urgent48h = isLeadUrgent48h(lead);

                      return (
                        <div
                          key={lead.id}
                          className={cn(
                            "flex flex-col justify-between rounded-3xl border p-5 transition-all",
                            lead.status === "signed"
                              ? "border-emerald-500/40 bg-emerald-950/20"
                              : urgent48h
                                ? "border-red-500/60 bg-gradient-to-b from-red-950/30 to-[#141720]"
                                : "border-white/15 bg-[#141720]"
                          )}
                        >
                      <div>
                        {/* En-tête de la carte : Gain potentiel en vert + Statut Maquette */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 font-mono text-xs font-black text-emerald-300">
                            💰 +{formatMoney(comm.amountEur)} pour toi ({comm.ratePct} %)
                          </span>

                          {urgent48h && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white animate-pulse">
                              <Flame className="h-3 w-3" /> URGENT 48H
                            </span>
                          )}

                          {lead.maquetteStatus === "pending" && (
                            <span className="rounded-full border border-amber-400/40 bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                              🎨 Maquette : En demande...
                            </span>
                          )}
                          {lead.maquetteStatus === "validated" && (
                            <span className="rounded-full border border-emerald-400/50 bg-emerald-500/25 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-200">
                              ✅ Maquette Validée !
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-white">{lead.company}</h3>
                        <p className="text-xs text-white/65">
                          {lead.contactName} · {lead.city} · Offre :{" "}
                          <strong className="text-[#e5cba4]">{lead.serviceTarget}</strong> (
                          {formatMoney(lead.budgetEur)})
                        </p>

                        {/* Téléphone en gros cliquable */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 font-mono text-sm font-bold text-white hover:border-emerald-400"
                          >
                            <Phone className="h-4 w-4 text-emerald-400" />
                            {lead.phone}
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setWhatsappTemplateKey("contact");
                              setWhatsappModalLead(lead);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/15 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 active:scale-95"
                          >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp 1-Clic
                          </button>
                        </div>

                        {/* Si le directeur a envoyé un screenshot */}
                        {lead.screenshotUrl && (
                          <div className="mt-3 overflow-hidden rounded-2xl border border-white/15 bg-black/50 p-2">
                            <span className="mb-1 block font-mono text-[9px] uppercase text-white/50">
                              📸 Capture envoyée par la Direction :
                            </span>
                            <img
                              src={lead.screenshotUrl}
                              alt="Capture prospect"
                              className="max-h-40 w-full rounded-xl object-contain"
                            />
                          </div>
                        )}

                        {/* Si la maquette est validée, afficher le lien direct */}
                        {lead.maquetteStatus === "validated" && lead.maquetteUrl && (
                          <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 p-3">
                            <div className="min-w-0">
                              <span className="block font-mono text-[9px] font-bold uppercase text-emerald-300">
                                LIEN MAQUETTE PRÊT POUR LE CLIENT :
                              </span>
                              <a
                                href={lead.maquetteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block truncate text-xs font-bold text-white underline"
                              >
                                {lead.maquetteUrl}
                              </a>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setWhatsappTemplateKey("maquette");
                                setWhatsappModalLead(lead);
                              }}
                              className="shrink-0 rounded-xl bg-emerald-400 px-3 py-1.5 text-[11px] font-bold text-[#0b0d11] transition hover:bg-emerald-300 active:scale-95"
                            >
                              Envoyer sur WhatsApp 🚀
                            </button>
                          </div>
                        )}

                        {lead.notes && (
                          <p className="mt-3 rounded-xl bg-black/30 p-2.5 text-xs text-white/70">
                            📝 {lead.notes}
                          </p>
                        )}
                      </div>

                      {/* BARRE D'ACTION JEU VIDÉO : 1 GROS BOUTON LUMINEUX PRINCIPAL + RACCOURCIS */}
                      <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                        {lead.status === "signed" ? (
                          <div className="rounded-2xl bg-emerald-500/20 py-3 text-center text-xs font-black uppercase tracking-wider text-emerald-300">
                            🏆 DEAL SIGNÉ · COMMISSION {formatMoney(comm.amountEur)} ENREGISTRÉE
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveCallLead(lead);
                                setCallNotesInput(lead.notes || "");
                              }}
                              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-xs font-black uppercase tracking-wider text-[#0b0d11] shadow-[0_0_25px_rgba(52,211,153,0.3)] transition hover:bg-emerald-300"
                            >
                              <PhoneCall className="h-4 w-4" />
                              1. Lancer l’Appel Assisté (Script + Tarifs)
                            </button>

                            <div className="grid grid-cols-4 gap-2">
                              <button
                                type="button"
                                disabled={busy || lead.maquetteStatus === "pending"}
                                onClick={() =>
                                  void apiCall(
                                    {
                                      action: "request_maquette",
                                      leadId: lead.id,
                                      brief: `Maquette demandée par ${user.fullName} pour ${lead.company}`,
                                    },
                                    "🎨 Demande de maquette envoyée à la Direction !"
                                  )
                                }
                                className="rounded-xl border border-amber-400/40 bg-amber-500/15 px-2 py-2 text-[10.5px] font-bold text-amber-200 hover:bg-amber-500/25 disabled:opacity-50"
                              >
                                🎨 Maquette
                              </button>

                              <button
                                type="button"
                                onClick={() => handleCopyLovable(lead)}
                                className="rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-2 py-2 text-[10.5px] font-bold text-[#E2D5BC] hover:bg-[#D4AF37]/25"
                                title="Copier le prompt d'architecture Lovable en 1 clic"
                              >
                                ⚡ Lovable
                              </button>

                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => {
                                  setQuoteCompany(lead.company);
                                  setQuoteEmail(lead.email || "");
                                  setShowOfficialQuoteModal(true);
                                }}
                                className="rounded-xl border border-sky-400/40 bg-sky-500/15 px-2 py-2 text-[10.5px] font-bold text-sky-200 hover:bg-sky-500/25"
                              >
                                📄 Devis
                              </button>

                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => {
                                  playXpChime();
                                  triggerCelebration(
                                    "DEAL SIGNÉ ! 🏆",
                                    `${lead.company} est désormais client officiel XR Agency !`,
                                    comm.amountEur
                                  );
                                  void apiCall(
                                    {
                                      action: "convert_lead_to_client",
                                      leadId: lead.id,
                                    },
                                    `🏆 Bravo ! ${lead.company} est marqué Signé ! (+1000 XP)`
                                  );
                                }}
                                className="rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-2 py-2 text-[10.5px] font-bold text-emerald-200 hover:bg-emerald-500/35 active:scale-95"
                              >
                                🏆 Closer
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

          {/* ONGLET 2 : SUIVI DES MAQUETTES DU COMMERCIAL */}
          {closerTab === "maquettes" && (
            <div className="rounded-3xl border border-white/10 bg-[#141720] p-6">
              <h2 className="text-xl font-bold text-white">
                🎨 Suivi de vos Maquettes (« En demande » ➔ « Validée ✓ »)
              </h2>
              <p className="mt-1 text-xs text-white/65">
                Dès que le Directeur colle le lien de la maquette, elle passe automatiquement en Validée et vous pouvez l'envoyer en 1 clic au client.
              </p>

              <div className="mt-5 space-y-3">
                {leads.filter((l) => l.maquetteStatus && l.maquetteStatus !== "none").length === 0 ? (
                  <p className="rounded-2xl border border-white/10 bg-black/30 p-6 text-center text-xs text-white/60">
                    Aucune maquette en cours. Cliquez sur « 🎨 2. Maquette » sur l'une de vos cartes de mission !
                  </p>
                ) : (
                  leads
                    .filter((l) => l.maquetteStatus && l.maquetteStatus !== "none")
                    .map((lead) => (
                      <div
                        key={lead.id}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/35 p-4"
                      >
                        <div>
                          <span
                            className={cn(
                              "inline-block rounded-full px-3 py-0.5 font-mono text-[10px] font-bold uppercase",
                              lead.maquetteStatus === "validated"
                                ? "bg-emerald-500/25 text-emerald-300"
                                : "bg-amber-500/25 text-amber-300"
                            )}
                          >
                            {lead.maquetteStatus === "validated" ? "✅ VALIDÉE PAR LA DIRECTION" : "⏳ EN DEMANDE"}
                          </span>
                          <h3 className="mt-1.5 text-base font-bold text-white">{lead.company}</h3>
                          <p className="text-xs text-white/60">{lead.serviceTarget}</p>
                        </div>

                        {lead.maquetteStatus === "validated" && lead.maquetteUrl ? (
                          <div className="flex items-center gap-2">
                            <a
                              href={lead.maquetteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold text-white hover:bg-white/20"
                            >
                              Ouvrir la maquette <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Bonjour ${lead.contactName}, voici votre maquette sur-mesure réalisée par XR Agency : ${lead.maquetteUrl}`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-400 px-3.5 py-2 text-xs font-bold text-[#0b0d11]"
                            >
                              Envoyer WhatsApp
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs italic text-amber-300">
                            Le QG Direction prépare le lien...
                          </span>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {/* ONGLET 3 : COFFRE-FORT DES COMMISSIONS & BARÈME OFFICIEL */}
          {closerTab === "commissions" && (
            <div className="space-y-6">
              {/* BANDEAU GAMIFICATION DU COFFRE : RANG APEX + STREAK DE FEU */}
              <div className="rounded-3xl border border-amber-400/50 bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-[#12141a] p-6 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-400/60 bg-amber-400/20 text-2xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                      🪙
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-amber-400/25 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          RANG ACTUEL : NIVEAU 4 · APEX CLOSER
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/25 px-2.5 py-0.5 font-mono text-[10px] font-bold text-red-300 animate-pulse">
                          🔥 SÉRIE 5 JOURS ACTIFS
                        </span>
                      </div>
                      <h3 className="mt-1 text-xl font-black text-white">Le Coffre-fort de {user.fullName}</h3>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-right">
                    <span className="font-mono text-[10px] uppercase text-white/50">PROCHAIN BONUS DE PALIER</span>
                    <p className="font-mono text-sm font-bold text-amber-300">+250 € cash dès 3 000 € de CA</p>
                  </div>
                </div>

                {/* Barre de progression XP du Closer */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-white/70">Progression vers Rang 5 (Légende XR) : 4 250 / 5 000 XP</span>
                    <span className="font-mono font-bold text-amber-400">85 %</span>
                  </div>
                  <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-black/60 p-0.5 border border-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>

              {/* Les 2 Compartiments du Coffre (Verrouillé vs Débloqué) */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-sky-400/35 bg-[#141720] p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-sky-300">
                      🔒 EN COFFRE (ATTENTE DU VIREMENT CLIENT)
                    </span>
                    <span className="text-xl">⏳</span>
                  </div>
                  <p className="mt-3 text-4xl font-black text-white">
                    {formatMoney(commissionSummary.pendingVaultEur)}
                  </p>
                  <p className="mt-2 text-xs text-white/65">
                    Commissions verrouillées dès la signature du devis. Elles sont débloquées immédiatement dès que la Direction valide la réception des fonds sur le compte de l’entité contractante.
                  </p>
                </div>

                <div className="rounded-3xl border border-emerald-400/45 bg-emerald-950/25 p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                      💸 COMMISSIONS DÉBLOQUÉES (ENCAISSÉES ✓)
                    </span>
                    <span className="text-xl">✅</span>
                  </div>
                  <p className="mt-3 text-4xl font-black text-emerald-300">
                    {formatMoney(commissionSummary.unlockedEur)}
                  </p>
                  <p className="mt-2 text-xs text-white/75">
                    Montant net prêt pour votre virement suite au paiement effectif des clients closés.
                  </p>
                </div>
              </div>

              {/* SIMULATEUR DE GAIN CASH DIRECT EN TEMPS RÉEL */}
              <div className="rounded-3xl border border-[#c5a880]/40 bg-[#141720] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#c5a880]">
                      🧮 SIMULATEUR DE GAIN EN DIRECT
                    </span>
                    <h3 className="text-lg font-bold text-white">Calculez votre commission sur votre prochain deal</h3>
                  </div>
                  <span className="text-2xl">💰</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { label: "Site Vitrine Pro", price: 499, srv: "site" },
                    { label: "Site Business Sur-Mesure", price: 799, srv: "site" },
                    { label: "Google Maps Top 3 Garanti", price: 999, srv: "maps" },
                    { label: "Caisse POS & CRM Métier", price: 2490, srv: "pos" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setSimulatedPriceEur(item.price);
                        setSimulatedServiceLabel(item.label);
                      }}
                      className={cn(
                        "rounded-2xl border p-3 text-left transition",
                        simulatedPriceEur === item.price
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                          : "border-white/10 bg-black/40 text-white/70 hover:bg-white/5"
                      )}
                    >
                      <span className="block font-mono text-sm font-black text-white">{formatMoney(item.price)}</span>
                      <span className="text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Résultat du calcul de commission */}
                {(() => {
                  const comm = getOfficialCommission(simulatedServiceLabel, simulatedPriceEur);
                  return (
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-emerald-400/50 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-black p-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-emerald-300">
                          SUR CE DEAL ({simulatedServiceLabel} à {formatMoney(simulatedPriceEur)}) :
                        </span>
                        <p className="text-xs text-white/80">
                          Taux officiel appliqué : <strong className="text-emerald-400">{comm.ruleLabel}</strong>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-[10px] text-white/50 block">VOUS TOUCHEZ EN CASH DIRECT :</span>
                        <span className="font-mono text-2xl font-black text-emerald-300">
                          +{formatMoney(comm.amountEur)}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#141720] p-6">
                <h3 className="text-lg font-bold text-white">
                  📊 Barème Officiel des Commissions XR Agency
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {OFFICIAL_CATALOG.map((cat) => (
                    <div
                      key={cat.category}
                      className="rounded-2xl border border-white/10 bg-black/35 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{cat.category}</span>
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-xs font-black text-emerald-300">
                          {cat.rate}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-xs text-white/75">
                        {cat.offers.map((o) => (
                          <li key={o.label} className="flex items-center justify-between">
                            <span>{o.label}</span>
                            <span className="font-mono font-bold text-[#e5cba4]">
                              {formatMoney(o.price)}
                              {o.period === "year" ? "/an" : o.period === "month" ? "/m" : ""}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ONGLET 4 : CALENDRIER DE RELANCES & QUÊTES DU JOUR */}
          {closerTab === "calendar" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#141720] p-6">
                <h3 className="text-lg font-bold text-white">📅 Vos Rappels & Relances Programmées</h3>
                <div className="mt-4 space-y-3">
                  {leads.map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-3.5"
                    >
                      <div>
                        <p className="text-sm font-bold text-white">{l.company}</p>
                        <p className="text-xs text-white/60">
                          {l.contactName} · {l.phone}
                        </p>
                      </div>
                      <span className="rounded-full bg-amber-500/20 px-3 py-1 font-mono text-xs font-bold text-amber-300">
                        ⏰ {l.nextFollowUp || "Aujourd'hui"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#141720] p-6">
                <h3 className="text-lg font-bold text-white">✅ Vos Quêtes Commerciales du Jour</h3>
                <div className="mt-4 space-y-2.5">
                  {tasks.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => void apiCall({ action: "toggle_task", taskId: task.id })}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition",
                        task.status === "done"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-white/50 line-through"
                          : "border-white/10 bg-black/30 text-white"
                      )}
                    >
                      <span className="text-xs font-semibold">{task.title}</span>
                      <span className="font-mono text-[10px] text-emerald-300">
                        {task.status === "done" ? "Fait ✓" : task.dueDate}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ONGLET 5 : COMBAT D'OBJECTIONS RPG */}
          {closerTab === "rpg_training" && (
            <div className="rounded-3xl border border-emerald-500/30 bg-[#131620] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Swords className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">
                    Simulateur RPG : Objections Terrain & Répliques Gagnantes
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SCHOOL_OBJECTION_BATTLES.map((b, idx) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setSelectedBattleId(b.id);
                        setBattleOutcome("none");
                      }}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
                        selectedBattleId === b.id
                          ? "bg-emerald-400 text-[#101114]"
                          : "border border-white/15 bg-white/5 text-white/75 hover:text-white"
                      )}
                    >
                      Objection #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-red-300">
                  L'OBJECTION DU PROSPECT :
                </span>
                <p className="mt-1 text-base font-semibold text-white">{activeBattle.prospectSay}</p>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setBattleOutcome("win")}
                  className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-4 text-left transition hover:border-emerald-400"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    OPTION A (MÉTHODE XR AGENCY) :
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-white/90">{activeBattle.goodReply}</p>
                </button>

                <button
                  type="button"
                  onClick={() => setBattleOutcome("retry")}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4 text-left transition hover:border-red-400/50"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">
                    OPTION B (RÉACTION CLASSIQUE) :
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">{activeBattle.badReply}</p>
                </button>
              </div>

              {battleOutcome === "win" && (
                <div className="mt-4 rounded-2xl border border-emerald-400/50 bg-emerald-500/20 p-4 text-xs font-semibold text-emerald-200">
                  🏆 Réplique validée ! Vous recadrez sur la garantie et la maquette WhatsApp sans engagement.
                </div>
              )}
              {battleOutcome === "retry" && (
                <div className="mt-4 rounded-2xl border border-amber-400/50 bg-amber-500/20 p-4 text-xs font-semibold text-amber-200">
                  ⚠️ Ne débattez pas ! Proposez immédiatement la maquette gratuite sur WhatsApp pour désamorcer.
                </div>
              )}
            </div>
          )}

          {/* ONGLET 6 : CLASSEMENT ET CONCOURS D'EGO */}
          {closerTab === "leaderboard" && (
            <div className="rounded-3xl border border-white/10 bg-[#12141a] p-6">
              <CrmEgoLeaderboard currentUserName={user.fullName} />
            </div>
          )}
        </main>

        {/* MODALE : MODE APPEL ASSISTÉ (SCRIPT + TARIFS + LOG RAPIDE) */}
        {activeCallLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-emerald-400/40 bg-[#12151e] p-6 text-white shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                      📞 MODE APPEL ASSISTÉ EN DIRECT
                    </span>
                    <h3 className="text-xl font-bold">{activeCallLead.company}</h3>
                  </div>

                  {/* Chronomètre Appel Assisté */}
                  <div
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold border",
                      callTimerSeconds < 180
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                        : callTimerSeconds < 300
                          ? "border-amber-500/50 bg-amber-500/20 text-amber-200 animate-pulse"
                          : "border-red-500/60 bg-red-500/25 text-red-200 animate-pulse"
                    )}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {String(Math.floor(callTimerSeconds / 60)).padStart(2, "0")}:
                      {String(callTimerSeconds % 60).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-white/50">
                      {callTimerSeconds < 180 ? "(Rythme idéal)" : callTimerSeconds < 300 ? "(Conclure)" : "(Trop long > 5m)"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCallLead(null)}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 hover:text-white"
                >
                  Fermer ✕
                </button>
              </div>

              {/* 4 Boutons de Qualification Flash en 1-Tap */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => {
                    setCallNotesInput("Prospect très réceptif. Demande la maquette personnalisée.");
                    void apiCall(
                      {
                        action: "request_maquette",
                        leadId: activeCallLead.id,
                        brief: `Maquette demandée suite à appel pour ${activeCallLead.company}`,
                      },
                      "🎨 Demande de maquette transmise !"
                    );
                    triggerCelebration("MAQUETTE DEMANDÉE ! 🎨", `En attente de validation Direction pour ${activeCallLead.company}`);
                  }}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-amber-400/50 bg-amber-500/15 p-2.5 text-center transition hover:bg-amber-500/25 active:scale-95"
                >
                  <span className="text-lg">🎨</span>
                  <span className="text-xs font-bold text-amber-300">Veut la maquette</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCallFollowUpInput("Demain 10h00");
                    setCallNotesInput("Rappel calé pour décision avec le gérant.");
                    flashSuccess("📅 Rappel pré-configuré pour demain 10h !");
                  }}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-sky-400/50 bg-sky-500/15 p-2.5 text-center transition hover:bg-sky-500/25 active:scale-95"
                >
                  <span className="text-lg">📅</span>
                  <span className="text-xs font-bold text-sky-300">Rappel Demain 10h</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setQuoteCompany(activeCallLead.company);
                    setQuoteEmail(activeCallLead.email || "");
                    setShowOfficialQuoteModal(true);
                  }}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-emerald-400/50 bg-emerald-500/15 p-2.5 text-center transition hover:bg-emerald-500/25 active:scale-95"
                >
                  <span className="text-lg">📝</span>
                  <span className="text-xs font-bold text-emerald-300">Générer Devis</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    void apiCall(
                      {
                        action: "log_call",
                        leadId: activeCallLead.id,
                        outcome: "Refus poli / Barrage secrétaire",
                        summary: "Non intéressé pour le moment.",
                        followUpDate: "Dans 1 mois",
                      },
                      "Noté comme non intéressé."
                    );
                    setActiveCallLead(null);
                  }}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-red-500/40 bg-red-500/15 p-2.5 text-center transition hover:bg-red-500/25 active:scale-95"
                >
                  <span className="text-lg">❌</span>
                  <span className="text-xs font-bold text-red-300">Pas intéressé</span>
                </button>
              </div>

              <div className="mt-4 rounded-2xl border border-[#c5a880]/35 bg-[#c5a880]/10 p-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#e5cba4]">
                  SCRIPT D’ACCRoche RECOMMANDÉ :
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-white/90">
                  « Bonjour <strong>{activeCallLead.contactName}</strong>, c'est {user.fullName} de l'agence{" "}
                  <strong>XR Agency</strong>. J'ai regardé la visibilité de{" "}
                  <strong>{activeCallLead.company}</strong> sur{" "}
                  <strong>{activeCallLead.city}</strong>. Nous accompagnons les dirigeants avec une offre{" "}
                  <strong>{activeCallLead.serviceTarget}</strong> (Sites dès 499 €, ou Top 3 Google Maps garanti 24h/24 pendant 1 an dès 999 €/an ou remboursé). Mon directeur artistique peut vous préparer une maquette gratuite d'ici demain sur WhatsApp pour que vous voyiez le rendu concret : je vous l'envoie sur ce numéro ? »
                </p>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-white/70">
                    Notes de l'appel :
                  </label>
                  <textarea
                    rows={3}
                    value={callNotesInput}
                    onChange={(e) => setCallNotesInput(e.target.value)}
                    placeholder="Ex: Décideur très intéressé par la maquette et le Top 3 Maps..."
                    className="w-full rounded-xl border border-white/15 bg-black/50 p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-white/70">
                    Date du prochain rappel :
                  </label>
                  <input
                    type="text"
                    value={callFollowUpInput}
                    onChange={(e) => setCallFollowUpInput(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/50 p-2.5 text-xs text-white"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        void apiCall(
                          {
                            action: "log_call",
                            leadId: activeCallLead.id,
                            outcome: "Appel effectué — Maquette proposée",
                            summary: callNotesInput,
                            followUpDate: callFollowUpInput,
                          },
                          "📞 Appel enregistré !"
                        );
                        setActiveCallLead(null);
                      }}
                      className="flex-1 rounded-xl bg-emerald-400 py-2.5 text-xs font-bold text-[#0b0d11]"
                    >
                      Valider l'appel ✓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BARRE DE NAVIGATION INFÉRIEURE MOBILE ULTRA-TACTILE (CLOSER) */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-white/10 bg-[#0b0d11]/95 px-2 py-2 backdrop-blur-xl sm:hidden">
          <button
            type="button"
            onClick={() => setCloserTab("missions")}
            className={cn(
              "flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95",
              closerTab === "missions" ? "text-emerald-400 font-bold" : "text-white/60"
            )}
          >
            <span className="text-lg">🎯</span>
            <span className="text-[10px]">Missions</span>
          </button>
          <button
            type="button"
            onClick={() => setCloserTab("maquettes")}
            className={cn(
              "flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95",
              closerTab === "maquettes" ? "text-emerald-400 font-bold" : "text-white/60"
            )}
          >
            <span className="text-lg">🎨</span>
            <span className="text-[10px]">Maquettes</span>
          </button>
          <button
            type="button"
            onClick={() => setCloserTab("commissions")}
            className={cn(
              "flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95",
              closerTab === "commissions" ? "text-emerald-400 font-bold" : "text-white/60"
            )}
          >
            <span className="text-lg">💰</span>
            <span className="text-[10px]">Coffre</span>
          </button>
          <button
            type="button"
            onClick={() => setCloserTab("rpg_training")}
            className={cn(
              "flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95",
              closerTab === "rpg_training" ? "text-emerald-400 font-bold" : "text-white/60"
            )}
          >
            <span className="text-lg">⚔️</span>
            <span className="text-[10px]">RPG</span>
          </button>
          <button
            type="button"
            onClick={() => setCloserTab("leaderboard")}
            className={cn(
              "flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95",
              closerTab === "leaderboard" ? "text-emerald-400 font-bold" : "text-white/60"
            )}
          >
            <span className="text-lg">🏆</span>
            <span className="text-[10px]">Classement</span>
          </button>
        </div>

        {renderWhatsappModal()}
        {renderCelebrationBanner()}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PORTAIL 1 : QG DIRECTION GÉNÉRALE
  // CADRE UNIFIÉ PERMANENT : 10 PILIERS + MODES LUDIQUES INTÉGRÉS
  // ══════════════════════════════════════════════════════════════════════════
  if (directorDisplayMode === "closer_arena") {
    return (
      <div className="relative min-h-screen bg-[#07090e]">
        <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30 bg-black/90 px-4 py-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 font-mono text-xs font-black text-amber-300">
              👑 DIRECTION · APERÇU DE L'ARÈNE LUDIQUE COMMERCIALE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDirectorDisplayMode("cockpit")}
              className="rounded-full border border-amber-400 bg-amber-400/20 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-200 hover:bg-amber-400/30"
            >
              ← Revenir au QG Direction
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-3.5 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500/25"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        <CrmUltraLudiqueArena
          user={{
            fullName: `${user.fullName} (Direction)`,
            email: user.email,
            commissionPct: 15,
          }}
          leads={leads}
          onLogout={handleLogout}
          onOpenCallModal={openCallModal}
          onOpenWhatsappModal={openWhatsappModal}
          onSignDeal={(leadId) => updateLeadStatus(leadId, "signed")}
        />
      </div>
    );
  }

  const filteredDirectorLeads = leads.filter((l) => {
    if (directorLeadScope === "mine") return l.assignedTo === user.id;
    if (directorLeadScope === "team") return l.assignedTo !== user.id;
    if (directorLeadScope.startsWith("mem-")) return l.assignedTo === directorLeadScope;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#f8f6f0]">
      {/* Topbar QG Direction */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0b0e]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[#c5a880]/50 bg-[#c5a880]/20 text-[#e5cba4]">
              <Crown className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#c5a880]">
                  QG DIRECTION · XR AGENCY
                </span>
                <Link
                  to="/"
                  className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] text-white/70 hover:text-white"
                >
                  Voir le site ↗
                </Link>
              </div>
              <h1 className="text-base font-bold text-white">{user.fullName}</h1>
            </div>

            {/* Bouton Arène Commerciale Ludique pour la Direction */}
            <button
              type="button"
              onClick={() => setDirectorDisplayMode("closer_arena")}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] transition hover:bg-emerald-400 hover:text-black"
            >
              <Swords className="h-3.5 w-3.5" />
              <span>Arène Commerciale Ludique ⚔️</span>
            </button>

            {/* Badge War Room Direction */}
            <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-[#c5a880]/35 bg-black/60 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#e5cba4]">
                WAR ROOM DIRECTION · STATUT OPÉRATIONNEL
              </span>
            </div>
          </div>

          {/* Les 10 Piliers Complets du QG Direction */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "overview", label: "👑 Vue Générale" },
              { id: "leads", label: "📸 Leads & Dispatch", badge: leads.length },
              { id: "clients", label: "👥 Clients", badge: clients.length },
              { id: "quotes", label: "📝 Devis", badge: quotes.length },
              {
                id: "invoices",
                label: "💳 Factures & paiements",
                badge: invoices.filter((i) => i.status === "pending_transfer").length,
                alert: invoices.filter((i) => i.status === "pending_transfer").length > 0,
              },
              { id: "projects", label: "💼 Projets", badge: projects.length },
              { id: "providers", label: "🛠️ Prestataires", badge: providers.length },
              { id: "calendar", label: "🕒 Calendrier & Dual Clocks", badge: tasks.length },
              {
                id: "maquettes",
                label: "🎨 Maquettes",
                badge: pendingMaquettes.length,
                alert: pendingMaquettes.length > 0,
              },
              { id: "leaderboard", label: "🏆 Leaderboard" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setDirectorTab(tab.id as typeof directorTab);
                  setDirectorDisplayMode("cockpit");
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition",
                  directorDisplayMode === "cockpit" && directorTab === tab.id
                    ? "bg-[#c5a880] text-[#101114] shadow-[0_0_25px_rgba(197,168,128,0.35)]"
                    : "border border-white/10 bg-white/5 text-white/75 hover:text-white"
                )}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 font-mono text-[10px]",
                      tab.alert ? "bg-red-500 text-white animate-pulse" : "bg-black/30"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-3.5 py-1.5 text-xs font-bold text-red-300 shadow-sm transition hover:bg-red-500/25 hover:border-red-400"
              title="Se déconnecter et retourner à l'accueil du CRM"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 pt-6 pb-24 sm:py-6 sm:px-6">
        {successMsg && (
          <div className="rounded-2xl border border-emerald-400/50 bg-emerald-500/20 px-4 py-3 text-xs font-bold text-emerald-200">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="rounded-2xl border border-red-500/50 bg-red-500/20 px-4 py-3 text-xs font-bold text-red-200">
            {errorMsg}
          </div>
        )}

        {/* Alerte Rouge 48h QG Direction */}
        {urgentLeads48h.length > 0 && (
          <div className="rounded-2xl border border-red-500/80 bg-gradient-to-r from-red-950/80 via-red-900/40 to-[#12141a] p-4 text-white shadow-[0_0_30px_rgba(239,68,68,0.35)] animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-500/30 text-red-400">
                <Flame className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-mono text-xs uppercase font-bold text-red-400 tracking-wider">
                  ⚠️ ALERTE DIRECTION : {urgentLeads48h.length} PROSPECT(S) SANS SUIVI &gt; 48H
                </h4>
                <p className="text-xs text-white/80">
                  {urgentLeads48h[0].company} ({urgentLeads48h[0].phone}) — Assignez ou relancez le prospect pour sécuriser le closing.
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${urgentLeads48h[0].phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Bonjour ${urgentLeads48h[0].contactName || ""}, c'est ${user.fullName} de la Direction XR Agency.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-xs font-black uppercase text-white shadow-lg shadow-red-500/40 hover:bg-red-400 shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Direction
            </a>
          </div>
        )}

        {/* QG DIRECTION UNIFIÉ · 10 PILIERS SANS DISPERSION */}
        {/* KPI Globaux Direction */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <div className="rounded-2xl border border-white/10 bg-[#12141b] p-4">
                <span className="font-mono text-[10px] uppercase text-white/55">CA SIGNÉ TOTAL</span>
                <p className="mt-1 text-xl font-black text-emerald-400">
                  {formatMoney(snapshot.stats?.revenueEur || 0)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#12141b] p-4">
                <span className="font-mono text-[10px] uppercase text-white/55">PIPELINE EN COURS</span>
                <p className="mt-1 text-xl font-black text-[#e5cba4]">
                  {formatMoney(snapshot.stats?.pipelineEur || 0)}
                </p>
              </div>
              <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
                <span className="font-mono text-[10px] uppercase text-amber-300">MAQUETTES À LIVRER</span>
                <p className="mt-1 text-xl font-black text-white">{pendingMaquettes.length}</p>
              </div>
              <div className="rounded-2xl border border-sky-400/30 bg-sky-500/10 p-4">
                <span className="font-mono text-[10px] uppercase text-sky-300">VIREMENTS EN ATTENTE</span>
                <p className="mt-1 text-xl font-black text-white">
                  {formatMoney(snapshot.stats?.pendingInvoicesEur || 0)}
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                <span className="font-mono text-[10px] uppercase text-emerald-300">COMMISSIONS DÉBLOQUÉES</span>
                <p className="mt-1 text-xl font-black text-emerald-300">
                  {formatMoney(commissionSummary.unlockedEur)}
                </p>
              </div>
            </div>

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 0 DIRECTION : VUE GÉNÉRALE & QG
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "overview" && (
          <div className="space-y-6">
            {/* Bannière Actions Immédiates */}
            <div className="rounded-3xl border border-[#c5a880]/40 bg-gradient-to-r from-[#211a12] via-[#151720] to-[#0f1118] p-6 shadow-2xl">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5a880]/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#e5cba4]">
                    <Crown className="h-3.5 w-3.5" /> Centre de Commandement Général
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    Bienvenue au QG XR Agency, {user.fullName}.
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
                    Gérez vos leads par capture d'écran ou téléphone, validez les maquettes en 1 clic pour vos commerciaux, émettez vos devis et factures officiels avec coordonnées bancaires officielles, et pilotez vos projets en direct.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDirectorDisplayMode("closer_arena")}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-emerald-500/25 transition hover:brightness-110"
                  >
                    <Swords className="h-4 w-4" />
                    Arène Commerciale Ludique ⚔️
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirectorTab("leads")}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#c5a880] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#101114] shadow-lg hover:bg-[#d8be98]"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter un Lead
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOfficialQuoteModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20"
                  >
                    <FileText className="h-4 w-4 text-[#e5cba4]" />
                    Générateur Devis & Contrat
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirectorTab("maquettes")}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
                  >
                    <Palette className="h-4 w-4" />
                    Maquettes ({pendingMaquettes.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Grille Synthétique : Tâches Urgentes + Maquettes + Alertes Virement */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Colonne 1 : Tâches & Priorités du Jour */}
              <div className="rounded-3xl border border-white/10 bg-[#12141b] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Tâches du Jour ({tasks.filter((t) => t.status !== "done").length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setDirectorTab("calendar")}
                    className="text-[11px] text-[#e5cba4] hover:underline"
                  >
                    Voir tout →
                  </button>
                </div>
                <div className="mt-4 space-y-2.5">
                  {tasks.slice(0, 5).map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => void apiCall({ action: "toggle_task", taskId: task.id })}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl border p-3 text-left transition",
                        task.status === "done"
                          ? "border-emerald-500/20 bg-emerald-500/5 text-white/40 line-through"
                          : "border-white/10 bg-black/30 text-white hover:border-white/20"
                      )}
                    >
                      <span className="text-xs font-medium">{task.title}</span>
                      <span className="font-mono text-[10px] text-white/50">{task.dueDate}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colonne 2 : Maquettes en attente de validation */}
              <div className="rounded-3xl border border-amber-400/30 bg-[#12141b] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                    <Palette className="h-4 w-4 text-amber-300" />
                    Maquettes Studio ({pendingMaquettes.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setDirectorTab("maquettes")}
                    className="text-[11px] text-amber-300 hover:underline"
                  >
                    Valider →
                  </button>
                </div>
                <div className="mt-4 space-y-2.5">
                  {pendingMaquettes.length === 0 ? (
                    <p className="py-6 text-center text-xs text-white/50">
                      Toutes les maquettes sont validées.
                    </p>
                  ) : (
                    pendingMaquettes.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        className="rounded-2xl border border-amber-400/30 bg-amber-500/5 p-3 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{m.company}</span>
                          <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                            En attente
                          </span>
                        </div>
                        <p className="mt-1 text-white/60">{m.serviceTarget}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Colonne 3 : Factures en Attente de Virement sur coordonnées bancaires */}
              <div className="rounded-3xl border border-sky-400/30 bg-[#12141b] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                    <CreditCard className="h-4 w-4 text-sky-300" />
                    Virements en Attente ({invoices.filter((i) => i.status === "pending_transfer").length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setDirectorTab("invoices")}
                    className="text-[11px] text-sky-300 hover:underline"
                  >
                    Gérer →
                  </button>
                </div>
                <div className="mt-4 space-y-2.5">
                  {invoices
                    .filter((i) => i.status === "pending_transfer")
                    .slice(0, 4)
                    .map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-3"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{inv.clientCompany}</p>
                          <p className="font-mono text-[10px] text-white/50">{inv.paymentReference}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-emerald-300">
                            {formatMoney(inv.totalEur)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Raccourcis d'Accès Direct aux Modules */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button
                type="button"
                onClick={() => setDirectorTab("clients")}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12141b] p-4 text-left transition hover:border-[#c5a880]"
              >
                <div className="flex items-center justify-between">
                  <Users className="h-5 w-5 text-[#c5a880]" />
                  <span className="font-mono text-xs text-white/50">{clients.length}</span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#e5cba4]">Annuaire Clients</h4>
                  <p className="text-[11px] text-white/60">Comptes, VIP, CA généré</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDirectorTab("quotes")}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12141b] p-4 text-left transition hover:border-[#c5a880]"
              >
                <div className="flex items-center justify-between">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <span className="font-mono text-xs text-white/50">{quotes.length}</span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300">Devis Officiels</h4>
                  <p className="text-[11px] text-white/60">Génération & cycle de vente</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDirectorTab("projects")}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12141b] p-4 text-left transition hover:border-[#c5a880]"
              >
                <div className="flex items-center justify-between">
                  <Briefcase className="h-5 w-5 text-sky-400" />
                  <span className="font-mono text-xs text-white/50">{projects.length}</span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300">Projets en cours</h4>
                  <p className="text-[11px] text-white/60">Étapes & jalons de livraison</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDirectorTab("providers")}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12141b] p-4 text-left transition hover:border-[#c5a880]"
              >
                <div className="flex items-center justify-between">
                  <Building2 className="h-5 w-5 text-purple-400" />
                  <span className="font-mono text-xs text-white/50">{providers.length}</span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300">Prestataires</h4>
                  <p className="text-[11px] text-white/60">Développeurs & sous-traitance</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 1 DIRECTION : AJOUT ULTRA-RAPIDE (SCREENSHOT / TÉL) & DISPATCH
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "leads" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              {/* SÉLECTEUR DE MODE : FLASH 5s vs FORMULAIRE DÉTAILLÉ */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-1.5">
                <button
                  type="button"
                  onClick={() => setDirectionAddMode("flash")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-black uppercase tracking-wider transition",
                    directionAddMode === "flash"
                      ? "bg-amber-400 text-[#0b0d11] shadow-[0_0_20px_rgba(251,191,36,0.35)]"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  <Zap className="h-3.5 w-3.5" />
                  ⚡ Ajout Flash (5s)
                </button>
                <button
                  type="button"
                  onClick={() => setDirectionAddMode("detailed")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-black uppercase tracking-wider transition",
                    directionAddMode === "detailed"
                      ? "bg-[#c5a880] text-[#0b0d11] shadow-[0_0_20px_rgba(197,168,128,0.35)]"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  <Camera className="h-3.5 w-3.5" />
                  📋 Formulaire & Capture
                </button>
              </div>

              {directionAddMode === "flash" ? (
                /* FORMULAIRE FLASH 5 SECONDES */
                <form
                  onSubmit={handleFlashAddLead}
                  className="rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-950/20 via-[#12141b] to-black p-6 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-300">
                        ⚡ DISPATCH FLASH EN 5 SECONDES
                      </span>
                      <h3 className="text-base font-bold text-white">1 Champ · Extraction Automatique</h3>
                    </div>
                    <span className="text-2xl">⚡</span>
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-semibold text-white/70">
                      Téléphone ou Nom de l'entreprise :
                    </label>
                    <input
                      type="text"
                      value={flashLeadText}
                      onChange={(e) => setFlashLeadText(e.target.value)}
                      placeholder="Ex: 06 22 33 44 55 - Brasserie de la Mer"
                      className="w-full rounded-2xl border border-amber-400/50 bg-black/60 p-3.5 text-sm font-bold text-white placeholder-white/40 focus:border-amber-400 focus:outline-none"
                    />
                    <p className="mt-1 text-[11px] text-white/50">
                      Collez le numéro ou le nom, l'algorithme sépare les infos tout seul.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase text-white/70">
                      Assigner directement à :
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {closersList.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setFlashCloserTarget(c.id)}
                          className={cn(
                            "rounded-xl border py-2 text-xs font-bold transition",
                            flashCloserTarget === c.id
                              ? "border-amber-400 bg-amber-400/20 text-amber-200"
                              : "border-white/10 bg-black/40 text-white/60 hover:text-white"
                          )}
                        >
                          {c.fullName.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase text-white/70">
                      Offre ciblée :
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Site Vitrine Pro (499 €)",
                        "Google Maps Top 3 (999 €)",
                        "Site E-Commerce (1499 €)",
                        "Système POS & CRM (2490 €)",
                      ].map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setFlashServiceTarget(srv)}
                          className={cn(
                            "rounded-xl border p-2 text-left text-[11px] font-semibold transition",
                            flashServiceTarget === srv
                              ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                              : "border-white/10 bg-black/40 text-white/60 hover:text-white"
                          )}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={busy || !flashLeadText.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3.5 text-xs font-black uppercase tracking-wider text-[#0b0d11] shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-300 disabled:opacity-50 active:scale-95"
                  >
                    <Zap className="h-4 w-4" />
                    ⚡ Dispatcher au Vendeur en 1 Clic
                  </button>
                </form>
              ) : (
                /* Formulaire d'Ajout Express (Screenshot Ctrl+V, Photo ou Numéro) */
                <form
                  onSubmit={handleQuickAddLead}
                  className="rounded-3xl border border-[#c5a880]/40 bg-[#12141b] p-6 shadow-xl"
                >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#c5a880]">
                    ⚡ AJOUT & DISPATCH EXPRESS
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    Nouveau Lead (Screenshot, Numéro ou Fiche)
                  </h2>
                </div>
                <Camera className="h-5 w-5 text-[#c5a880]" />
              </div>

              {/* Choix : Garder pour moi (Direction) vs Envoyer à un commercial */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-black/40 p-1.5">
                <button
                  type="button"
                  onClick={() => setLeadTargetMode("mine")}
                  className={cn(
                    "rounded-xl py-2.5 text-xs font-bold transition",
                    leadTargetMode === "mine"
                      ? "bg-[#c5a880] text-[#101114]"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  👑 Garder dans Mes Leads
                </button>
                <button
                  type="button"
                  onClick={() => setLeadTargetMode("closer")}
                  className={cn(
                    "rounded-xl py-2.5 text-xs font-bold transition",
                    leadTargetMode === "closer"
                      ? "bg-emerald-400 text-[#101114]"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  🚀 Envoyer à un Vendeur
                </button>
              </div>

              {leadTargetMode === "closer" && (
                <div className="mt-3">
                  <label className="mb-1 block text-[11px] font-semibold text-white/70">
                    Choisir le commercial qui reçoit la mission :
                  </label>
                  <select
                    value={leadAssignedCloser}
                    onChange={(e) => setLeadAssignedCloser(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2.5 text-xs font-bold text-white"
                  >
                    {closersList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.fullName} ({c.title})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Zone Screenshot / Photo (Ctrl+V ou Upload) */}
              <div className="mt-4 rounded-2xl border border-dashed border-[#c5a880]/50 bg-black/30 p-3.5 text-center">
                <label className="cursor-pointer block">
                  <span className="block text-xs font-bold text-[#e5cba4]">
                    📸 Collez un Screenshot (Ctrl+V / Cmd+V) ou cliquez pour joindre une photo
                  </span>
                  <span className="mt-0.5 block text-[10px] text-white/55">
                    Idéal pour envoyer une capture Google Maps, Instagram ou carte de visite
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {leadScreenshotDataUrl && (
                  <div className="mt-3 relative">
                    <img
                      src={leadScreenshotDataUrl}
                      alt="Aperçu capture"
                      className="mx-auto max-h-36 rounded-xl border border-white/20 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setLeadScreenshotDataUrl("")}
                      className="mt-1.5 text-[10px] text-red-300 underline"
                    >
                      Retirer l'image
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] text-white/70">
                    📞 Téléphone (suffit à lui seul) :
                  </label>
                  <input
                    type="text"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="Ex: 06 12 34 56 78"
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-white/70">
                    🏢 Nom Entreprise (optionnel) :
                  </label>
                  <input
                    type="text"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="Ex: Serrurerie Royale Paris"
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] text-white/70">Offre cible :</label>
                  <select
                    value={leadServiceTarget}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLeadServiceTarget(val);
                      if (val.includes("499")) setLeadBudgetEur(499);
                      else if (val.includes("799")) setLeadBudgetEur(799);
                      else if (val.includes("1 499")) setLeadBudgetEur(1499);
                      else if (val.includes("999")) setLeadBudgetEur(999);
                      else if (val.includes("500")) setLeadBudgetEur(500);
                      else if (val.includes("2 000")) setLeadBudgetEur(2000);
                    }}
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
                  >
                    <option value="Site Vitrine Pro (499 €)">Site Vitrine Pro (499 €) — Comm 30%</option>
                    <option value="Site Business Sur-Mesure (799 €)">Site Business (799 €) — Comm 30%</option>
                    <option value="Site E-Commerce (1 499 €)">Site E-Commerce (1 499 €) — Comm 30%</option>
                    <option value="Google Maps Top 3 Garanti 1 An (999 €)">Google Maps Top 3 (dès 999 €/an) — Comm 10%</option>
                    <option value="Gestion Annuelle Google Maps (500 €)">Gestion Annuelle Maps (500 €/an) — Comm 10%</option>
                    <option value="CRM & Système POS Sur-Mesure (2 000 €)">CRM / POS Sur-Mesure (2 000 €+) — Comm 20%</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-white/70">Budget estimé (€) :</label>
                  <input
                    type="number"
                    value={leadBudgetEur}
                    onChange={(e) => setLeadBudgetEur(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-[11px] text-white/70">Consigne / Note rapide :</label>
                <input
                  type="text"
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Ex: Pas de site web, 2e page Google Maps, appeler avant 18h"
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#c5a880] py-3 text-xs font-black uppercase tracking-wider text-[#101114] transition hover:bg-[#d8be98]"
              >
                <Send className="h-4 w-4" />
                {leadTargetMode === "mine"
                  ? "Ajouter à Mes Leads Perso (Direction)"
                  : "Envoyer la Carte de Mission au Commercial"}
              </button>
            </form>
          )}
        </div>

            {/* Liste séparée : Mes Leads Perso vs Leads Équipe Commerciale */}
            <div className="space-y-4 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#12141b] p-3">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: `Tous les dossiers (${leads.length})` },
                    {
                      id: "mine",
                      label: `👑 Mes Leads Perso (${leads.filter((l) => l.assignedTo === user.id).length})`,
                    },
                    ...members
                      .filter((m) => m.role !== "admin")
                      .map((m) => ({
                        id: m.id,
                        label: `👤 ${m.fullName} (${leads.filter((l) => l.assignedTo === m.id).length})`,
                      })),
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setDirectorLeadScope(f.id)}
                      className={cn(
                        "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                        directorLeadScope === f.id
                          ? "bg-[#c5a880] text-[#101114]"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredDirectorLeads.map((lead) => {
                  const comm = getOfficialCommission(lead.serviceTarget, lead.budgetEur);
                  const owner = members.find((m) => m.id === lead.assignedTo);
                  return (
                    <div
                      key={lead.id}
                      className="rounded-3xl border border-white/10 bg-[#12141b] p-5 transition hover:border-white/20"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#e5cba4]">
                              {lead.assignedTo === user.id
                                ? "👑 LEAD PERSO DIRECTION"
                                : `🎯 Assigné à : ${owner?.fullName || "Commercial"}`}
                            </span>
                            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                              Comm. {comm.ruleLabel} : {formatMoney(comm.amountEur)}
                            </span>
                            {lead.maquetteStatus === "pending" && (
                              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                                🎨 Maquette en demande
                              </span>
                            )}
                            {lead.maquetteStatus === "validated" && (
                              <span className="rounded-full bg-emerald-500/25 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-200">
                                ✅ Maquette Validée
                              </span>
                            )}
                          </div>
                          <h3 className="mt-2 text-base font-bold text-white">{lead.company}</h3>
                          <p className="text-xs text-white/65">
                            📞 {lead.phone} · {lead.serviceTarget} ({formatMoney(lead.budgetEur)})
                          </p>
                        </div>

                        {/* Réassignation en 1 clic entre Toi (Direction) et n'importe quel vendeur */}
                        <div className="flex items-center gap-2">
                          <select
                            value={lead.assignedTo}
                            onChange={(e) =>
                              void apiCall(
                                {
                                  action: "update_lead",
                                  leadId: lead.id,
                                  assignedTo: e.target.value,
                                },
                                "🔄 Attribution mise à jour !"
                              )
                            }
                            className="rounded-xl border border-white/15 bg-black/50 px-2.5 py-1.5 text-xs text-white"
                          >
                            <option value={user.id}>👑 Garder pour Moi (Direction)</option>
                            {closersList.map((c) => (
                              <option key={c.id} value={c.id}>
                                🎯 {c.fullName}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => handleCopyLovable(lead)}
                            className="rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-3 py-1.5 text-xs font-bold text-[#E2D5BC] hover:bg-[#D4AF37]/25"
                            title="Copier le prompt d'architecture Lovable en 1 clic"
                          >
                            ⚡ Lovable
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setQuoteCompany(lead.company);
                              setQuoteEmail(lead.email || "");
                              setShowOfficialQuoteModal(true);
                            }}
                            className="rounded-xl border border-[#c5a880]/40 bg-[#c5a880]/15 px-3 py-1.5 text-xs font-bold text-[#e5cba4] hover:bg-[#c5a880]/25"
                          >
                            📄 Devis Officiel
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setWhatsappTemplateKey("contact");
                              setWhatsappModalLead(lead);
                            }}
                            className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 active:scale-95"
                          >
                            <MessageCircle className="h-3.5 w-3.5 inline mr-1" />
                            WhatsApp 1-Clic
                          </button>
                        </div>
                      </div>

                      {lead.screenshotUrl && (
                        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-2">
                          <img
                            src={lead.screenshotUrl}
                            alt="Capture"
                            className="max-h-36 rounded-xl object-contain"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 2 DIRECTION : STUDIO MAQUETTES (COLLER LE LIEN = VALIDÉE ✓)
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "maquettes" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-amber-400/40 bg-[#12141b] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    🎨 DEMANDES DE MAQUETTES DES COMMERCIAUX
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Collez simplement le lien de la maquette pour la passer en « Validée ✓ »
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {pendingMaquettes.length === 0 ? (
                  <p className="rounded-2xl border border-white/10 bg-black/30 p-6 text-center text-xs text-white/60">
                    Aucune maquette en attente de création pour le moment.
                  </p>
                ) : (
                  pendingMaquettes.map((lead) => {
                    const closer = members.find((m) => m.id === lead.assignedTo);
                    return (
                      <div
                        key={lead.id}
                        className="rounded-2xl border border-amber-400/35 bg-black/40 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                              ⏳ EN DEMANDE · Par {closer?.fullName || "Commercial"}
                            </span>
                            <h3 className="mt-1.5 text-lg font-bold text-white">
                              {lead.company} ({lead.city})
                            </h3>
                            <p className="text-xs text-white/65">
                              Offre : {lead.serviceTarget} · Tél : {lead.phone}
                            </p>
                            {lead.maquetteBrief && (
                              <p className="mt-1 text-xs text-[#e5cba4]">Brief : {lead.maquetteBrief}</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                          <input
                            type="url"
                            value={maquetteLinkInputs[lead.id] || ""}
                            onChange={(e) =>
                              setMaquetteLinkInputs((prev) => ({
                                ...prev,
                                [lead.id]: e.target.value,
                              }))
                            }
                            placeholder="Collez ici le lien de la maquette (ex: https://...)"
                            className="flex-1 rounded-xl border border-white/20 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
                          />
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => {
                              const url = (maquetteLinkInputs[lead.id] || "").trim();
                              if (!url) {
                                setErrorMsg("Collez le lien URL de la maquette avant de valider.");
                                return;
                              }
                              void apiCall(
                                {
                                  action: "validate_maquette",
                                  leadId: lead.id,
                                  maquetteUrl: url,
                                },
                                `✅ Maquette validée et envoyée à ${closer?.fullName || "votre commercial"} !`
                              );
                            }}
                            className="rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#0b0d11] hover:bg-emerald-300"
                          >
                            Valider & Envoyer au Vendeur ✓
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Historique des maquettes déjà validées */}
            <div className="rounded-3xl border border-white/10 bg-[#12141b] p-6">
              <h3 className="text-base font-bold text-white">
                ✅ Maquettes déjà validées et livrées ({validatedMaquettes.length})
              </h3>
              <div className="mt-4 space-y-2.5">
                {validatedMaquettes.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-950/15 p-3.5"
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{lead.company}</p>
                      <a
                        href={lead.maquetteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-emerald-300 underline"
                      >
                        {lead.maquetteUrl}
                      </a>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 font-mono text-[10px] font-bold text-emerald-300">
                      Validée ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 3 DIRECTION : ANNUAIRE CLIENTS (COMPTES, VIP, CA)
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "clients" && (
          <div className="space-y-6">
            <CrmClientsTab
              clients={clients}
              isAdmin={true}
              onCreateClient={handleCreateClient}
              onOpenNewQuoteForClient={(c) => {
                setQuoteCompany(c.company);
                setQuoteEmail(c.email);
                setDirectorTab("quotes");
              }}
              onOpenNewProjectForClient={() => {
                setDirectorTab("projects");
              }}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 4 DIRECTION : DEVIS OFFICIELS & CATALOGUE
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "quotes" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#c5a880]/40 bg-[#12141b] p-5">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#c5a880]">
                  GÉNÉRATEUR OFFICIEL DE DEVIS & CONTRAT
                </span>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Édition avec Mentions Légales, Acompte & coordonnées bancaires officielles
                </h3>
                <p className="text-xs text-white/60">
                  Générez un contrat PDF prêt à signer ou ajoutez une ligne devis directement au catalogue.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowOfficialQuoteModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#c5a880] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#101114] shadow-lg hover:bg-[#d8be98]"
              >
                <Sparkles className="h-4 w-4" />
                Ouvrir le Générateur PDF / Contrat
              </button>
            </div>

            <CrmQuotesTab
              quotes={quotes}
              isAdmin={true}
              onCreateQuote={handleCreateQuote}
              onUpdateQuoteStatus={handleUpdateQuoteStatus}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 5 DIRECTION : FACTURATION, coordonnées bancaires officielles & COMMISSIONS
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "invoices" && (
          <div className="space-y-6">
            {/* Bannière Coordonnées Bancaires Officielles */}
            <div className="rounded-3xl border border-emerald-400/40 bg-gradient-to-r from-emerald-950/40 via-[#12141b] to-[#12141b] p-6 shadow-xl">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    🏦 COMPTE BANCAIRE OFFICIEL XR AGENCY
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-white">XR Agency — Coordonnées bancaires</h3>
                  <p className="mt-1 font-mono text-xs text-[#e5cba4]">
                    Coordonnées bancaires : à configurer dans les paramètres sécurisés de production.
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-mono text-[10px] uppercase text-white/60">VIREMENTS EN ATTENTE</span>
                  <p className="font-mono text-2xl font-black text-white">
                    {formatMoney(snapshot.stats?.pendingInvoicesEur || 0)}
                  </p>
                  <p className="text-[11px] text-emerald-300">
                    Débloque instantanément la commission du closer au clic.
                  </p>
                </div>
              </div>
            </div>

            <CrmInvoicesTab
              invoices={invoices}
              isAdmin={true}
              onValidatePayment={handleValidatePayment}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 6 DIRECTION : PROJETS EN COURS & LIVRAISON
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "projects" && (
          <div className="space-y-6">
            <CrmProjectsTab
              projects={projects}
              isAdmin={true}
              onCreateProject={handleCreateProject}
              onUpdateProject={handleUpdateProject}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 7 DIRECTION : PRESTATAIRES & SOUS-TRAITANTS
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "providers" && (
          <div className="space-y-6">
            <CrmProvidersTab
              providers={providers}
              isAdmin={true}
              onCreateProvider={handleCreateProvider}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 8 DIRECTION : CALENDRIER UNIFIÉ & DUAL CLOCKS PARIS / VIETNAM
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "calendar" && (
          <div className="space-y-6">
            <CrmCalendarTab leads={leads} tasks={tasks} projects={projects} />

            {/* Formulaire d'ajout de tâche Perso ou Pro */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTaskTitle.trim()) return;
                void apiCall(
                  {
                    action: "create_task",
                    title: newTaskTitle.trim(),
                    category: newTaskCategory,
                    dueDate: newTaskDueDate,
                    priority: "high",
                  },
                  "📅 Tâche ajoutée à votre calendrier !"
                );
                setNewTaskTitle("");
              }}
              className="flex flex-col gap-3 rounded-3xl border border-white/15 bg-[#12141b] p-5 sm:flex-row"
            >
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value as "pro" | "perso")}
                className="rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs font-bold text-white"
              >
                <option value="pro">🏢 Stratégie Pro & Agence</option>
                <option value="perso">🧘‍♂️ Vie Perso & Routine</option>
              </select>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Ajouter une étape, un rendez-vous ou un objectif..."
                className="flex-1 rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs text-white"
              />
              <input
                type="text"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                placeholder="Échéance (ex: Aujourd'hui 14h)"
                className="rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs text-white sm:w-44"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#c5a880] px-5 py-2.5 text-xs font-black uppercase text-[#101114]"
              >
                + Ajouter
              </button>
            </form>

            {/* 2 Colonnes : To-Do Vie Perso vs Stratégie Pro & Appels */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-sky-400/30 bg-[#12141b] p-6">
                <h3 className="text-lg font-bold text-white">🧘‍♂️ Quêtes & To-Do Vie Perso</h3>
                <div className="mt-4 space-y-2.5">
                  {tasks
                    .filter((t) => t.category === "perso")
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-3.5"
                      >
                        <button
                          type="button"
                          onClick={() => void apiCall({ action: "toggle_task", taskId: task.id })}
                          className={cn(
                            "flex items-center gap-2.5 text-left text-xs font-semibold",
                            task.status === "done" ? "text-white/40 line-through" : "text-white"
                          )}
                        >
                          <CheckCircle2
                            className={cn(
                              "h-4 w-4",
                              task.status === "done" ? "text-emerald-400" : "text-white/30"
                            )}
                          />
                          <span>{task.title}</span>
                        </button>
                        <span className="font-mono text-[10px] text-sky-300">{task.dueDate}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#c5a880]/35 bg-[#12141b] p-6">
                <h3 className="text-lg font-bold text-white">
                  🏢 Stratégie Pro, Relances d’Appels & Rendez-vous
                </h3>
                <div className="mt-4 space-y-2.5">
                  {tasks
                    .filter((t) => t.category !== "perso")
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-3.5"
                      >
                        <button
                          type="button"
                          onClick={() => void apiCall({ action: "toggle_task", taskId: task.id })}
                          className={cn(
                            "flex items-center gap-2.5 text-left text-xs font-semibold",
                            task.status === "done" ? "text-white/40 line-through" : "text-white"
                          )}
                        >
                          <CheckCircle2
                            className={cn(
                              "h-4 w-4",
                              task.status === "done" ? "text-emerald-400" : "text-white/30"
                            )}
                          />
                          <span>{task.title}</span>
                        </button>
                        <span className="font-mono text-[10px] text-[#e5cba4]">{task.dueDate}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Calendriers Opérationnels par Offre */}
            <div className="rounded-3xl border border-white/10 bg-[#12141b] p-6">
              <h3 className="text-lg font-bold text-white">
                📋 Calendriers d’Exécution par Offre (Community Management, Google Maps, SEO & Web)
              </h3>
              <p className="mt-1 text-xs text-white/60">
                Chaque prestation vendue suit un calendrier opérationnel précis étape par étape :
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {OPERATIONAL_CALENDAR_PLAYBOOKS.map((play) => (
                  <div
                    key={play.id}
                    className="rounded-2xl border border-white/10 bg-black/40 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <h4 className="text-sm font-bold text-white">{play.title}</h4>
                      <span className="rounded-full bg-[#c5a880]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#e5cba4]">
                        {play.badge}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {play.steps.map((s) => (
                        <li key={s.day} className="text-xs text-white/80">
                          <strong className="font-mono text-[#e5cba4]">{s.day} :</strong> {s.task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 9 DIRECTION : LEADERBOARD ÉQUIPE & EGO
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "leaderboard" && (
          <div className="rounded-3xl border border-white/10 bg-[#12141a] p-6">
            <CrmEgoLeaderboard currentUserName={user.fullName} />
          </div>
        )}
      </main>

      {/* BARRE DE NAVIGATION INFÉRIEURE MOBILE ULTRA-TACTILE (DIRECTION) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-white/10 bg-[#0f1118]/95 px-2 py-2 backdrop-blur-xl sm:hidden">
        <button
          type="button"
          onClick={() => setDirectorTab("overview")}
          className={cn(
            "flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition active:scale-95",
            directorTab === "overview" ? "text-[#c5a880] font-bold" : "text-white/60"
          )}
        >
          <span className="text-lg">👑</span>
          <span className="text-[10px]">QG</span>
        </button>
        <button
          type="button"
          onClick={() => setDirectorTab("leads")}
          className={cn(
            "flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition active:scale-95",
            directorTab === "leads" ? "text-[#c5a880] font-bold" : "text-white/60"
          )}
        >
          <span className="text-lg">📸</span>
          <span className="text-[10px]">Leads</span>
        </button>
        <button
          type="button"
          onClick={() => setDirectorTab("maquettes")}
          className={cn(
            "flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition active:scale-95",
            directorTab === "maquettes" ? "text-[#c5a880] font-bold" : "text-white/60"
          )}
        >
          <span className="text-lg">🎨</span>
          <span className="text-[10px]">Maquettes</span>
        </button>
        <button
          type="button"
          onClick={() => setDirectorTab("quotes")}
          className={cn(
            "flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition active:scale-95",
            directorTab === "quotes" ? "text-[#c5a880] font-bold" : "text-white/60"
          )}
        >
          <span className="text-lg">📝</span>
          <span className="text-[10px]">Devis</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className={cn(
            "flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition active:scale-95",
            ["clients", "invoices", "projects", "providers", "calendar", "leaderboard"].includes(directorTab)
              ? "text-[#c5a880] font-bold"
              : "text-white/60"
          )}
        >
          <span className="text-lg">⋯</span>
          <span className="text-[10px]">Plus</span>
        </button>
      </div>

      {/* DRAWER / MODALE PLUS SUR MOBILE POUR DIRECTION */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm sm:hidden">
          <div className="w-full rounded-t-3xl border-t border-white/10 bg-[#12141c] p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                Autres Sections Direction
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-white/10 p-1.5 text-xs text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5 py-4">
              {[
                { id: "clients", label: "Clients", icon: "👥" },
                { id: "invoices", label: "Factures", icon: "💳" },
                { id: "projects", label: "Projets", icon: "💼" },
                { id: "providers", label: "Prestataires", icon: "🛠️" },
                { id: "calendar", label: "Calendrier", icon: "📅" },
                { id: "leaderboard", label: "Classement Ego", icon: "🏆" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setDirectorTab(item.id as typeof directorTab);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-bold transition",
                    directorTab === item.id
                      ? "border-[#c5a880] bg-[#c5a880]/15 text-[#e5cba4]"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/15 py-3 text-xs font-bold text-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Se Déconnecter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE DU GÉNÉRATEUR OFFICIEL DE DEVIS */}
      {showOfficialQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-[#c5a880]/40 bg-[#0f1118] p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#c5a880]">
                  XR AGENCY · STUDIO DEVIS OFFICIEL & CONTRAT
                </span>
                <h3 className="text-xl font-bold">Générateur Officiel avec coordonnées bancaires officielles</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowOfficialQuoteModal(false)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 hover:text-white"
              >
                Fermer ✕
              </button>
            </div>
            <OfficialQuoteGenerator
              initialClientName={quoteCompany || "Client Entreprise"}
              initialClientEmail={quoteEmail || "contact@client.fr"}
              onQuoteSigned={() => {
                flashSuccess("Devis officiel généré avec succès !");
                setShowOfficialQuoteModal(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Modales Globales Direction (WhatsApp 1-Clic & Célébration Victoire) */}
      {renderWhatsappModal()}
      {renderAccessManagerModal()}
      {renderCelebrationBanner()}

      {/* Bouton Flottant Déconnexion Toujours Accessible en Bas à Droite (Desktop) */}
      <button
        type="button"
        onClick={handleLogout}
        className="fixed bottom-5 right-5 z-30 hidden sm:flex items-center gap-2 rounded-full border border-red-500/50 bg-[#0f1118]/90 px-4 py-2.5 text-xs font-bold text-red-300 shadow-[0_10px_35px_rgba(239,68,68,0.25)] backdrop-blur-md transition hover:border-red-400 hover:bg-red-500/20 active:scale-95"
        title="Se déconnecter et retourner au choix du portail et code PIN"
      >
        <LogOut className="h-4 w-4 text-red-400" />
        <span>Déconnexion / Changer de portail</span>
      </button>
    </div>
  );
}

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]