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
  CrmInvoiceRecord,
  CrmLead,
  CrmNotification,
  CrmQuoteRecord,
  CrmTaskRecord,
  LeadPriority,
  LeadStatus,
} from "./api/crm";
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
  quotes?: CrmQuoteRecord[];
  invoices?: CrmInvoiceRecord[];
  tasks?: CrmTaskRecord[];
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
      "Verrouiller l'engagement et envoyer le Devis + RIB KARMA SASU en direct pendant l'appel.",
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
      { day: "J+7", task: "Mise en ligne officielle, SSL, indexation Google & validation virement RIB." },
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

  // ── DIRECTOR TABS ──
  const [directorTab, setDirectorTab] = useState<"leads" | "maquettes" | "billing" | "calendar">("leads");
  const [directorLeadScope, setDirectorLeadScope] = useState<"mine" | "team" | "all">("all");

  // ── CLOSER TABS & ASSISTED CALL MODAL ──
  const [closerTab, setCloserTab] = useState<"missions" | "maquettes" | "commissions" | "calendar">("missions");
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

  const handlePinLogin = async (e?: FormEvent, overridePin?: string, overrideRole?: "director" | "closer" | "student") => {
    if (e) e.preventDefault();
    const code = (overridePin ?? pinCode).trim();
    const role = overrideRole ?? selectedPortalRole;
    if (!code) {
      setErrorMsg("Saisissez votre code d'accès.");
      return;
    }
    const emailForLogin =
      role === "director"
        ? "admin@xragency.fr"
        : role === "student"
          ? "karim@xragency.fr"
          : closerAccountEmail;

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
            detail: "Prestation officielle XR Agency — Contrat & RIB KARMA SASU intégrés",
            priceEur: price,
            period,
            quantity: 1,
          },
        ],
      },
      `📄 Devis officiel & Facture RIB générés pour ${company} !`
    );
    setQuoteCompany("");
    setQuoteEmail("");
  };

  const user = snapshot?.user;
  const leads = snapshot?.leads || [];
  const members = snapshot?.members || [];
  const quotes = snapshot?.quotes || [];
  const invoices = snapshot?.invoices || [];
  const tasks = snapshot?.tasks || [];
  const notifications = snapshot?.notifications || [];

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
  // ÉCRAN DE CONNEXION ULTRA-LUDIQUE : 3 PORTAILS ISOLÉS PAR CODE PIN
  // ══════════════════════════════════════════════════════════════════════════
  if (!snapshot?.authenticated || !user) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#0a0b0e] text-[#f8f6f0]">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 opacity-45"
          style={{
            background:
              "radial-gradient(900px circle at 15% 20%, rgba(197,168,128,0.18), transparent 65%), radial-gradient(800px circle at 85% 80%, rgba(46,125,79,0.14), transparent 65%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#c5a880] hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour au site xragencyai.com
            </Link>
            <span className="rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#e5cba4]">
              XR AGENCY · ACCÈS SÉCURISÉ PAR RÔLE
            </span>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Choisissez votre espace & entrez votre Code PIN
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65">
              Chaque portail est strictement isolé selon votre mission : Direction Générale, Arène Commerciale ou Académie XR School 90 jours.
            </p>
          </div>

          {/* 3 Cartes de Rôle */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Carte 1 : Direction */}
            <button
              type="button"
              onClick={() => {
                setSelectedPortalRole("director");
                setErrorMsg("");
              }}
              className={cn(
                "group relative flex flex-col justify-between rounded-3xl border p-6 text-left transition-all",
                selectedPortalRole === "director"
                  ? "border-[#c5a880] bg-gradient-to-b from-[#231e17] to-[#121317] shadow-[0_0_40px_rgba(197,168,128,0.28)]"
                  : "border-white/10 bg-[#121318]/80 hover:border-white/25"
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c5a880]/20 text-[#e5cba4]">
                    <Crown className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-[#c5a880]/40 bg-[#c5a880]/15 px-3 py-1 font-mono text-[10px] font-bold text-[#e5cba4]">
                    DIRECTION UNIQUEMENT
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">1. QG Direction</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                  Envoi de leads par screenshot ou numéro, validation des maquettes en 1 clic, facturation avec RIB KARMA SASU, déblocage des commissions et calendrier Vie Perso + Pro.
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-semibold text-[#e5cba4]">
                <span>Sélectionner Direction</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </button>

            {/* Carte 2 : Commercial */}
            <button
              type="button"
              onClick={() => {
                setSelectedPortalRole("closer");
                setErrorMsg("");
              }}
              className={cn(
                "group relative flex flex-col justify-between rounded-3xl border p-6 text-left transition-all",
                selectedPortalRole === "closer"
                  ? "border-emerald-400 bg-gradient-to-b from-emerald-950/50 to-[#121317] shadow-[0_0_40px_rgba(16,185,129,0.25)]"
                  : "border-white/10 bg-[#121318]/80 hover:border-white/25"
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                    <Target className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 font-mono text-[10px] font-bold text-emerald-300">
                    ESPACE CLOSER ISOLÉ
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">2. Arène Commerciale</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                  Interface ludique façon jeu vidéo : vos cartes de mission à appeler, demande de maquette en 1 clic, mode appel assisté et coffre-fort de commissions (30% / 20% / 10%).
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-semibold text-emerald-300">
                <span>Sélectionner Commercial</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </button>

            {/* Carte 3 : XR School */}
            <button
              type="button"
              onClick={() => {
                setSelectedPortalRole("student");
                setErrorMsg("");
              }}
              className={cn(
                "group relative flex flex-col justify-between rounded-3xl border p-6 text-left transition-all",
                selectedPortalRole === "student"
                  ? "border-sky-400 bg-gradient-to-b from-sky-950/50 to-[#121317] shadow-[0_0_40px_rgba(56,189,248,0.25)]"
                  : "border-white/10 bg-[#121318]/80 hover:border-white/25"
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-500/20 text-sky-300">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 font-mono text-[10px] font-bold text-sky-300">
                    ÉCOLE + PASSERELLE CRM
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">3. XR School (90j)</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                  Programme intensif 90 jours, scripts par secteur, entraînement aux objections RPG + passerelle directe vers votre CRM Commercial pour closer vos premiers clients.
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-semibold text-sky-300">
                <span>Sélectionner XR School</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Pavé de Connexion par Code PIN */}
          <form
            onSubmit={handlePinLogin}
            className="mx-auto mt-8 max-w-md rounded-3xl border border-white/15 bg-[#12141a]/95 p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <KeyRound className="h-5 w-5 text-[#c5a880]" />
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-white">
                    {selectedPortalRole === "director"
                      ? "Connexion QG Direction"
                      : selectedPortalRole === "closer"
                        ? "Connexion Arène Commerciale"
                        : "Connexion Académie XR School"}
                  </span>
                  <span className="text-[11px] text-white/55">
                    Entrez votre code personnel à chiffres
                  </span>
                </div>
              </div>
              <Lock className="h-4 w-4 text-white/40" />
            </div>

            {selectedPortalRole === "closer" && (
              <div className="mt-4">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/70">
                  Profil Commercial :
                </label>
                <select
                  value={closerAccountEmail}
                  onChange={(e) => setCloserAccountEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 focus:outline-none"
                >
                  <option value="lucas@xragency.fr">Lucas Mercier (Closer Senior)</option>
                  <option value="sarah@xragency.fr">Sarah Benali (Account Executive)</option>
                </select>
              </div>
            )}

            <div className="mt-4">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/70">
                Code PIN d’accès :
              </label>
              <input
                type="password"
                inputMode="numeric"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="••••••"
                className="w-full rounded-2xl border border-white/20 bg-black/60 px-4 py-3.5 text-center font-mono text-2xl font-bold tracking-[0.35em] text-white focus:border-[#c5a880] focus:outline-none"
                autoFocus
              />
            </div>

            {/* Clavier numérique tactile rapide */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => {
                    if (digit === "C") setPinCode("");
                    else if (digit === "⌫") setPinCode((p) => p.slice(0, -1));
                    else setPinCode((p) => (p + digit).slice(0, 8));
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 py-2.5 font-mono text-base font-bold text-white transition hover:border-[#c5a880]/60 hover:bg-white/10 active:scale-95"
                >
                  {digit}
                </button>
              ))}
            </div>

            {errorMsg && (
              <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/15 px-3.5 py-2 text-center text-xs font-medium text-red-200">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#c5a880] px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-[#101114] transition hover:bg-[#d8be98] disabled:opacity-50"
            >
              <Rocket className="h-4 w-4" />
              {busy ? "Ouverture en cours..." : "Déverrouiller mon espace"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const effectivePortal = user.portalType || (user.role === "admin" ? "director" : "closer");

  // ══════════════════════════════════════════════════════════════════════════
  // PORTAIL 3 : ACADÉMIE XR SCHOOL (AVEC PASSERELLE VERS LE CRM COMMERCIAL)
  // ══════════════════════════════════════════════════════════════════════════
  if (effectivePortal === "student" && studentViewMode === "school") {
    const activeBattle =
      SCHOOL_OBJECTION_BATTLES.find((b) => b.id === selectedBattleId) || SCHOOL_OBJECTION_BATTLES[0];

    return (
      <div className="min-h-screen bg-[#0b0d12] text-[#f8f6f0]">
        {/* Topbar XR School */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d12]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-500/20 text-sky-300">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-sky-400">
                    ACADÉMIE XR SCHOOL · PROGRAMME 90 JOURS
                  </span>
                </div>
                <h1 className="text-base font-bold text-white">{user.fullName} — Élève Closer</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* PASSERELLE AUTORISÉE VERS LE CRM COMMERCIAL */}
              <button
                type="button"
                onClick={() => setStudentViewMode("crm_bridge")}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0b0d12] shadow-[0_0_25px_rgba(52,211,153,0.4)] transition hover:bg-emerald-300"
              >
                <Target className="h-4 w-4" />
                Passer sur mon CRM Commercial (Leads & Appels)
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => void apiCall({ action: "logout" })}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white/75 hover:border-white/30 hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
          {/* Bannière d'accueil + Barème officiel à mémoriser */}
          <div className="rounded-3xl border border-sky-400/30 bg-gradient-to-r from-sky-950/60 via-[#121622] to-[#12141b] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-sky-300">
                  <Sparkles className="h-3.5 w-3.5" /> Formation & Pratique Terrain
                </span>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  Apprenez la méthode XR Agency et closez vos premiers clients en direct.
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
                  Votre espace école est connecté par une passerelle directe à votre CRM Commercial : dès que vous maîtrisez un script ci-dessous, cliquez sur le bouton vert en haut pour appeler vos leads attribués.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3.5">
                  <span className="block font-mono text-2xl font-black text-emerald-300">30 %</span>
                  <span className="text-[10px] text-white/80">Sites Internet</span>
                </div>
                <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3.5">
                  <span className="block font-mono text-2xl font-black text-amber-300">20 %</span>
                  <span className="text-[10px] text-white/80">CRM & POS</span>
                </div>
                <div className="rounded-2xl border border-sky-400/30 bg-sky-500/10 p-3.5">
                  <span className="block font-mono text-2xl font-black text-sky-300">10 %</span>
                  <span className="text-[10px] text-white/80">Maps & Mensuel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cursus 90 Jours en 3 Piliers */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <BookOpen className="h-5 w-5 text-sky-400" />
              Votre Parcours 90 Jours Étape par Étape
            </h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {SCHOOL_CURRICULUM_90D.map((block) => (
                <div
                  key={block.phase}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#131620] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-sky-400">
                        {block.phase}
                      </span>
                      <span className="rounded-full bg-sky-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-sky-300">
                        +{block.xp}
                      </span>
                    </div>
                    <h4 className="mt-2 text-base font-bold text-white">{block.title}</h4>
                    <ul className="mt-4 space-y-2.5">
                      {block.modules.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-white/75">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arène RPG : Entraînement aux Objections */}
          <div className="rounded-3xl border border-white/10 bg-[#131620] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Swords className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  Simulateur RPG : Combat d’Objections au Téléphone
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
                        ? "bg-amber-400 text-[#101114]"
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
                CE QUE DIT LE PROSPECT AU TÉLÉPHONE :
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
                  RÉPONSE A (MÉTHODE XR AGENCY) :
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/90">{activeBattle.goodReply}</p>
              </button>

              <button
                type="button"
                onClick={() => setBattleOutcome("retry")}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 text-left transition hover:border-red-400/50"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">
                  RÉPONSE B (RÉACTION CLASSIQUE) :
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/75">{activeBattle.badReply}</p>
              </button>
            </div>

            {battleOutcome === "win" && (
              <div className="mt-4 rounded-2xl border border-emerald-400/50 bg-emerald-500/20 p-4 text-xs font-semibold text-emerald-200">
                🏆 Parfait ! Vous rebondissez sur la rentabilité, la garantie Top 3 ou remboursé et la maquette gratuite sans engagement.
              </div>
            )}
            {battleOutcome === "retry" && (
              <div className="mt-4 rounded-2xl border border-amber-400/50 bg-amber-500/20 p-4 text-xs font-semibold text-amber-200">
                ⚠️ Attention : ne baissez jamais les bras dès la première objection ! Proposez toujours d'envoyer la maquette gratuite sur WhatsApp.
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PORTAIL 2 : ARÈNE COMMERCIALE (OU ÉLÈVE EN MODE PASSERELLE CRM)
  // Ultra-simple façon Jeu Vidéo (« Utilisable par un enfant »)
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
            </div>

            {/* Navigation 4 Onglets Jeu Vidéo */}
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
                onClick={() => void apiCall({ action: "logout" })}
                className="ml-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/70 hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
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

          {/* ONGLET 1 : MES CARTES DE MISSION (1 BOUTON LUMINEUX PAR CARTE) */}
          {closerTab === "missions" && (
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
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Bonjour ${lead.contactName}, c'est ${user.fullName} de l'agence XR Agency (${lead.company}).`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20"
                          >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp 1-Clic
                          </a>
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
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Bonjour ${lead.contactName}, voici comme promis la maquette réalisée sur-mesure pour ${lead.company} par notre studio XR Agency : ${lead.maquetteUrl}`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="shrink-0 rounded-xl bg-emerald-400 px-3 py-1.5 text-[11px] font-bold text-[#0b0d11]"
                            >
                              Envoyer sur WhatsApp
                            </a>
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

                            <div className="grid grid-cols-3 gap-2">
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
                                className="rounded-xl border border-amber-400/40 bg-amber-500/15 px-2.5 py-2 text-[11px] font-bold text-amber-200 hover:bg-amber-500/25 disabled:opacity-50"
                              >
                                🎨 2. Maquette
                              </button>

                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => void handleRequestQuoteAndRib(lead)}
                                className="rounded-xl border border-sky-400/40 bg-sky-500/15 px-2.5 py-2 text-[11px] font-bold text-sky-200 hover:bg-sky-500/25"
                              >
                                📄 3. Devis + RIB
                              </button>

                              <button
                                type="button"
                                disabled={busy}
                                onClick={() =>
                                  void apiCall(
                                    {
                                      action: "convert_lead_to_client",
                                      leadId: lead.id,
                                    },
                                    `🏆 Bravo ! ${lead.company} est marqué Signé !`
                                  )
                                }
                                className="rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-2 text-[11px] font-bold text-emerald-200 hover:bg-emerald-500/35"
                              >
                                🏆 4. Closer !
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-sky-400/35 bg-[#141720] p-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-sky-300">
                    🔒 EN COFFRE (ATTENTE VIREMENT CLIENT SUR RIB XR)
                  </span>
                  <p className="mt-2 text-4xl font-black text-white">
                    {formatMoney(commissionSummary.pendingVaultEur)}
                  </p>
                  <p className="mt-2 text-xs text-white/65">
                    Ces commissions sont réservées dès la signature et se débloquent automatiquement dès que la Direction valide la réception du virement sur le RIB KARMA SASU.
                  </p>
                </div>

                <div className="rounded-3xl border border-emerald-400/45 bg-emerald-950/25 p-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                    💸 COMMISSIONS DÉBLOQUÉES (VIREMENT REÇU ✓)
                  </span>
                  <p className="mt-2 text-4xl font-black text-emerald-300">
                    {formatMoney(commissionSummary.unlockedEur)}
                  </p>
                  <p className="mt-2 text-xs text-white/75">
                    Montant validé et prêt à être versé suite à l'encaissement effectif des factures clients.
                  </p>
                </div>
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
        </main>

        {/* MODALE : MODE APPEL ASSISTÉ (SCRIPT + TARIFS + LOG RAPIDE) */}
        {activeCallLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-emerald-400/40 bg-[#12151e] p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                    📞 MODE APPEL ASSISTÉ EN DIRECT
                  </span>
                  <h3 className="text-xl font-bold">{activeCallLead.company}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCallLead(null)}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 hover:text-white"
                >
                  Fermer ✕
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
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PORTAIL 1 : QG DIRECTION (CODE 071266 / 07266)
  // 1. Mes Leads Perso vs Dispatch Vendeurs (Screenshot / Téléphone / Fiche)
  // 2. Studio Maquettes (Coller le lien ➔ passe en Validée ✓)
  // 3. Facturation, Devis + RIB KARMA SASU & Déblocage Commissions
  // 4. Calendrier Unifié (Vie Perso + Pro + Community Management & Offres)
  // ══════════════════════════════════════════════════════════════════════════
  const filteredDirectorLeads = leads.filter((l) => {
    if (directorLeadScope === "mine") return l.assignedTo === user.id;
    if (directorLeadScope === "team") return l.assignedTo !== user.id;
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
          </div>

          {/* 4 Grands Piliers du QG Direction */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "leads", label: "📸 1. Leads & Dispatch", badge: leads.length },
              {
                id: "maquettes",
                label: "🎨 2. Studio Maquettes",
                badge: pendingMaquettes.length,
                alert: pendingMaquettes.length > 0,
              },
              {
                id: "billing",
                label: "🏦 3. Devis, RIB & Commissions",
                badge: invoices.filter((i) => i.status === "pending_transfer").length,
              },
              { id: "calendar", label: "📅 4. Calendrier Perso, Pro & Offres", badge: tasks.length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDirectorTab(tab.id as typeof directorTab)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition",
                  directorTab === tab.id
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
              onClick={() => void apiCall({ action: "logout" })}
              className="ml-1 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/70 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
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
            ONGLET 1 DIRECTION : AJOUT ULTRA-RAPIDE (SCREENSHOT / TÉL) & DISPATCH
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "leads" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Formulaire d'Ajout Express (Screenshot Ctrl+V, Photo ou Numéro) */}
            <form
              onSubmit={handleQuickAddLead}
              className="rounded-3xl border border-[#c5a880]/40 bg-[#12141b] p-6 shadow-xl lg:col-span-5"
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

            {/* Liste séparée : Mes Leads Perso vs Leads Équipe Commerciale */}
            <div className="space-y-4 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#12141b] p-3">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: `Tous les dossiers (${leads.length})` },
                    {
                      id: "mine",
                      label: `👑 Mes Leads Perso Direction (${leads.filter((l) => l.assignedTo === user.id).length})`,
                    },
                    {
                      id: "team",
                      label: `🎯 Leads Commerciaux (${leads.filter((l) => l.assignedTo !== user.id).length})`,
                    },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setDirectorLeadScope(f.id as typeof directorLeadScope)}
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
                            onClick={() => void handleRequestQuoteAndRib(lead)}
                            className="rounded-xl border border-[#c5a880]/40 bg-[#c5a880]/15 px-3 py-1.5 text-xs font-bold text-[#e5cba4] hover:bg-[#c5a880]/25"
                          >
                            📄 Devis + RIB
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
            ONGLET 3 DIRECTION : DEVIS, FACTURES + RIB OFFICIEL & COMMISSIONS
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "billing" && (
          <div className="space-y-6">
            {/* Générateur de Devis + Facture RIB Uniforme */}
            <div className="rounded-3xl border border-[#c5a880]/40 bg-[#12141b] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#c5a880]">
                    🏦 DESIGN UNIFORME DEVIS / FACTURE + RIB INTÉGRÉ
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Émettre un Devis Officiel avec RIB KARMA SASU (XR Agency)
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 font-mono text-[10px] text-emerald-300">
                  Synchronisé avec contact.xragency@gmail.com
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
                <input
                  type="text"
                  value={quoteCompany}
                  onChange={(e) => setQuoteCompany(e.target.value)}
                  placeholder="Entreprise / Client (ex: Clinique Leman)"
                  className="rounded-xl border border-white/15 bg-black/50 px-3 py-2.5 text-xs text-white"
                />
                <input
                  type="email"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  placeholder="Email du client"
                  className="rounded-xl border border-white/15 bg-black/50 px-3 py-2.5 text-xs text-white"
                />
                <select
                  value={quoteServiceLabel}
                  onChange={(e) => {
                    const val = e.target.value;
                    setQuoteServiceLabel(val);
                    if (val.includes("499")) {
                      setQuotePriceEur(499);
                      setQuotePeriod("once");
                    } else if (val.includes("799")) {
                      setQuotePriceEur(799);
                      setQuotePeriod("once");
                    } else if (val.includes("1 499")) {
                      setQuotePriceEur(1499);
                      setQuotePeriod("once");
                    } else if (val.includes("999")) {
                      setQuotePriceEur(999);
                      setQuotePeriod("year");
                    } else if (val.includes("500")) {
                      setQuotePriceEur(500);
                      setQuotePeriod("year");
                    } else if (val.includes("2 000")) {
                      setQuotePriceEur(2000);
                      setQuotePeriod("once");
                    }
                  }}
                  className="rounded-xl border border-white/15 bg-black/50 px-3 py-2.5 text-xs text-white"
                >
                  <option value="Site Vitrine Pro (499 €)">Site Vitrine Pro (499 €)</option>
                  <option value="Site Business Sur-Mesure (799 €)">Site Business (799 €)</option>
                  <option value="Site E-Commerce (1 499 €)">Site E-Commerce (1 499 €)</option>
                  <option value="Top 3 Google Maps Garanti 1 An (999 €)">Top 3 Google Maps Garanti 1 An (999 €)</option>
                  <option value="Gestion Annuelle Fiche Google Maps (500 €)">Gestion Annuelle Google Maps (500 €)</option>
                  <option value="CRM & Logiciel Sur-Mesure (2 000 €)">CRM & Logiciel Sur-Mesure (2 000 €)</option>
                </select>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleRequestQuoteAndRib()}
                  className="rounded-xl bg-[#c5a880] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#101114] hover:bg-[#d8be98]"
                >
                  Générer Devis + Facture RIB
                </button>
              </div>
            </div>

            {/* Liste des Factures / Devis avec RIB Officiel et Bouton "Virement Reçu sur mon RIB" */}
            <div className="space-y-4">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="rounded-3xl border border-white/15 bg-[#12141b] p-6 shadow-xl"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#c5a880]">{inv.id}</span>
                        <span
                          className={cn(
                            "rounded-full px-3 py-0.5 font-mono text-[10px] font-bold uppercase",
                            inv.status === "paid"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-amber-500/20 text-amber-300"
                          )}
                        >
                          {inv.status === "paid"
                            ? "✅ VIREMENT REÇU SUR RIB · COMMISSION DÉBLOQUÉE"
                            : "⏳ EN ATTENTE DE VIREMENT CLIENT"}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-white">
                        {inv.clientCompany} ({inv.clientName})
                      </h3>
                      <p className="text-xs text-white/60">
                        {inv.clientEmail} · Émis le {formatTime(inv.createdAt)}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase text-white/50">TOTAL TTC</span>
                      <p className="text-2xl font-black text-white">{formatMoney(inv.totalEur)}</p>
                      {inv.status !== "paid" && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            void apiCall(
                              {
                                action: "validate_payment",
                                invoiceId: inv.id,
                              },
                              `💸 Virement validé pour ${inv.clientCompany} ! La commission du vendeur est débloquée.`
                            )
                          }
                          className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-black uppercase text-[#0b0d11] hover:bg-emerald-300"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Valider « Virement reçu sur mon RIB »
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bloc RIB Officiel intégré sur chaque Devis / Facture */}
                  <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl border border-[#c5a880]/30 bg-black/40 p-4 md:grid-cols-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880]">
                        PRESTATIONS INCLUSES :
                      </span>
                      <ul className="mt-2 space-y-1 text-xs text-white/85">
                        {inv.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{item.label}</span>
                            <span className="font-mono font-bold">{formatMoney(item.amountEur)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-white/10 pt-3 md:border-l md:border-t-0 md:pl-4 md:pt-0">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                        🏦 COORDONNÉES BANCAIRES OFFICIELLES (RIB INTÉGRÉ) :
                      </span>
                      <p className="mt-1 text-xs text-white/90">
                        Bénéficiaire : <strong>{inv.bankDetails.beneficiary}</strong>
                      </p>
                      <p className="font-mono text-xs text-[#e5cba4]">
                        IBAN : {inv.bankDetails.ibanMasked} · BIC : {inv.bankDetails.bic}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-white/70">
                        Référence virement : <strong>{inv.paymentReference}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ONGLET 4 DIRECTION : CALENDRIER UNIFIÉ (VIE PERSO + PRO + OFFRES)
        ══════════════════════════════════════════════════════════════════ */}
        {directorTab === "calendar" && (
          <div className="space-y-6">
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

            {/* Calendriers Opérationnels par Offre (Community Management, Google Maps, SEO, Web) */}
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
      </main>
    </div>
  );
}
