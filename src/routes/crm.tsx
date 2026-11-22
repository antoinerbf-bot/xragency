import { useState, useMemo, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { jsPDF } from "jspdf";
import {
  Phone,
  MessageSquare,
  Sparkles,
  Trophy,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  Search,
  DollarSign,
  ChevronRight,
  ChevronDown,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  Users,
  Target,
  FileText,
  AlertCircle,
  HelpCircle,
  Award,
  Download,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  LogOut,
  Palette,
  Check,
  Layers,
  Send,
  Flame,
  UserCheck,
  Building2,
  Settings,
  Briefcase
} from "lucide-react";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM XR Agency — Espace Commercial & Direction" },
      { name: "description", content: "Plateforme de gestion commerciale, closing et livrables XR Agency." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: UnifiedModernCrmPage,
});

// ─────────────────────────────────────────────────────────────
// TEAM & SERVICES DEFINITIONS (Organisation Interne XR Agency)
// ─────────────────────────────────────────────────────────────

interface TeamMember {
  id: string;
  name: string;
  shortName: string;
  role: string;
  department: "direction" | "rh" | "closer" | "junior" | "studio";
  commissionRate: number; // Ex: 0.30 pour 30%
  avatarBg: string;
  tag: string;
  bio: string;
  pin: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "antoine",
    name: "Antoine Rousseau",
    shortName: "Antoine",
    role: "Directeur Général & Fondateur",
    department: "direction",
    commissionRate: 1.0,
    avatarBg: "from-amber-500 to-amber-700",
    tag: "👑 Direction Générale",
    bio: "Supervision 360°, validation des contrats, finances & stratégie globale.",
    pin: "0712",
  },
  {
    id: "martin",
    name: "Martin",
    shortName: "Martin",
    role: "Manager RH & Closer Senior",
    department: "rh",
    commissionRate: 0.20,
    avatarBg: "from-blue-500 to-indigo-600",
    tag: "👥 Manager RH & Ventes",
    bio: "Supervision de la force de vente (10% override) + closing grands comptes.",
    pin: "2026",
  },
  {
    id: "lucas",
    name: "Lucas Mercier",
    shortName: "Lucas",
    role: "Closer B2B Senior",
    department: "closer",
    commissionRate: 0.30,
    avatarBg: "from-emerald-500 to-teal-700",
    tag: "⚡ Closer 30%",
    bio: "Prospection directe, appels à froid & closing immédiat.",
    pin: "1234",
  },
  {
    id: "sarah",
    name: "Sarah Benali",
    shortName: "Sarah",
    role: "Closer B2B Senior",
    department: "closer",
    commissionRate: 0.30,
    avatarBg: "from-pink-500 to-rose-700",
    tag: "⚡ Closer 30%",
    bio: "Spécialiste commerces de proximité, franchises & restauration.",
    pin: "1234",
  },
  {
    id: "christel",
    name: "Christel Thirion",
    shortName: "Christel",
    role: "Closer B2B (Filière Martin)",
    department: "closer",
    commissionRate: 0.20,
    avatarBg: "from-purple-500 to-violet-700",
    tag: "⚡ Closer 20%",
    bio: "Prospection ciblée professions libérales, santé, droit & luxe.",
    pin: "1234",
  },
  {
    id: "camille",
    name: "Camille Bernard",
    shortName: "Camille",
    role: "Closer B2B (Filière Martin)",
    department: "closer",
    commissionRate: 0.20,
    avatarBg: "from-cyan-500 to-blue-700",
    tag: "⚡ Closer 20%",
    bio: "Négociation & relances sur maquettes interactives WhatsApp.",
    pin: "1234",
  },
  {
    id: "karim",
    name: "Karim",
    shortName: "Karim",
    role: "Closer Junior (Académie 90J)",
    department: "junior",
    commissionRate: 0.15,
    avatarBg: "from-amber-600 to-orange-700",
    tag: "🎓 Académie 90J",
    bio: "Formation intensive prospection, qualification & détection de failles.",
    pin: "1234",
  },
  {
    id: "emma",
    name: "Emma",
    shortName: "Emma",
    role: "Closer Junior (Académie 90J)",
    department: "junior",
    commissionRate: 0.15,
    avatarBg: "from-fuchsia-500 to-purple-700",
    tag: "🎓 Académie 90J",
    bio: "Qualification de prospects & relances stratégiques.",
    pin: "1234",
  },
  {
    id: "studio",
    name: "Studio Créatif & Dév",
    shortName: "Studio",
    role: "Pôle Production & Livrables",
    department: "studio",
    commissionRate: 0,
    avatarBg: "from-zinc-600 to-zinc-900",
    tag: "🎨 Design & Tech",
    bio: "Modélisation des maquettes, codage des sites, intégrations IA & livraison en 5j.",
    pin: "0000",
  },
];

interface XrService {
  id: string;
  name: string;
  category: string;
  defaultPrice: number;
  icon: string;
  deliverable: string;
}

const XR_SERVICES: XrService[] = [
  {
    id: "website",
    name: "Refonte & Création de Site 2026",
    category: "Web & Conversion",
    defaultPrice: 1499,
    icon: "🌐",
    deliverable: "Site web ultra-rapide mobile, système de réservation/commande & nom de domaine inclus.",
  },
  {
    id: "seo",
    name: "Google Maps TOP 3 & Référencement",
    category: "Visibilité Locale",
    defaultPrice: 890,
    icon: "📍",
    deliverable: "Optimisation de la fiche Google Business, avis clients et ranking dans le top local.",
  },
  {
    id: "ia",
    name: "Agent IA & Standard Téléphonique",
    category: "Automatisation IA",
    defaultPrice: 1200,
    icon: "🤖",
    deliverable: "Standardiste IA 24/7 sur WhatsApp et téléphone, prise de rendez-vous automatique.",
  },
  {
    id: "webcare",
    name: "Pack Webcare & Maintenance VIP",
    category: "Abonnement Sécurité",
    defaultPrice: 149,
    icon: "🛡️",
    deliverable: "Sauvegardes journalières, sécurité anti-piratage et modifications mensuelles illimitées.",
  },
  {
    id: "social",
    name: "Social Media & Vidéos Reels / TikTok",
    category: "Acquisition Sociale",
    defaultPrice: 990,
    icon: "📱",
    deliverable: "12 vidéos courtes montées, calendrier éditorial et gestion des réseaux.",
  },
  {
    id: "branding",
    name: "Identité Visuelle & Pack Print",
    category: "Branding",
    defaultPrice: 750,
    icon: "✨",
    deliverable: "Logo vectoriel moderne, charte graphique complète, cartes de visite et flyers.",
  },
];

// ─────────────────────────────────────────────────────────────
// PROSPECT / LEAD DATA MODEL
// ─────────────────────────────────────────────────────────────

interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email?: string;
  serviceId: string;
  value: number;
  stage: "new" | "mockup" | "negociation" | "won";
  closerId: string;
  issue: string;
  notes: string;
  createdAt: string;
  studioStatus?: "pending" | "in_production" | "delivered";
}

const OBJECTIONS = [
  {
    id: "obj-1",
    question: "« Je n'ai pas le budget / C'est trop cher pour le moment »",
    response:
      "« Je comprends totalement. L'idée ici n'est pas de faire une dépense mais de boucher la fuite : aujourd'hui, vous perdez environ 5 à 10 clients par semaine au profit de vos concurrents. À 150 € le panier moyen, la refonte est remboursée en 15 jours. Si nous étalons le règlement en 3 fois sans frais, on lance la production dès cette semaine ? »",
  },
  {
    id: "obj-2",
    question: "« J'ai déjà un site internet en ligne »",
    response:
      "« Oui tout à fait, je l'ai justement analysé avant de vous appeler ! Mais avez-vous testé l'affichage sur smartphone ? Le bouton d'appel ne déclenche pas le numéro et la page met 6 secondes à charger. Je vous ai préparé un aperçu 2026 en vidéo directe sur WhatsApp pour que vous puissiez juger par vous-même sans engagement. »",
  },
  {
    id: "obj-3",
    question: "« Envoyez-moi un email avec vos tarifs »",
    response:
      "« Avec plaisir ! Mais les emails finissent souvent oubliés ou dans les spams. Je vous envoie le visuel directement sur votre WhatsApp pro avec le lien démo. Ça vous prend 20 secondes à regarder entre deux clients. C'est bien sur ce 06 ? »",
  },
  {
    id: "obj-4",
    question: "« Je n'ai pas le temps, rappelez-moi dans 2 mois »",
    response:
      "« Je sais à quel point vous êtes sollicité. C'est justement la force de notre méthode : vous n'avez RIEN à rédiger ni à faire. Notre studio livre la solution clé-en-main en 5 jours. Dès que vous validez sur WhatsApp, nous gérons tout. »",
  },
];

// ─────────────────────────────────────────────────────────────
// NATIVE AUDIO SYNTHESIZER (Gratifiant & Léger, sans MP3)
// ─────────────────────────────────────────────────────────────

function playTone(freq: number, type: OscillatorType, duration: number, delay = 0) {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch {
    // Audio non supporté ou bloqué
  }
}

function playDing() {
  playTone(587.33, "sine", 0.25);
  playTone(880, "sine", 0.4, 0.08);
}

function playFanfare() {
  playTone(523.25, "triangle", 0.15, 0);
  playTone(659.25, "triangle", 0.15, 0.12);
  playTone(783.99, "triangle", 0.2, 0.24);
  playTone(1046.5, "triangle", 0.5, 0.38);
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────

export function UnifiedModernCrmPage() {
  // Session / Authentication state
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("xr_crm_logged_user");
      if (savedUser) {
        return TEAM_MEMBERS.find((m) => m.id === savedUser) || null;
      }
    }
    return null;
  });

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Leads state (aucun client fictif par défaut !)
  const [leads, setLeads] = useState<Lead[]>(() => {
    if (typeof window !== "undefined") {
      const savedLeads = localStorage.getItem("xr_crm_real_leads");
      if (savedLeads) {
        try {
          return JSON.parse(savedLeads);
        } catch {
          // ignore
        }
      }
    }
    return []; // Démarrage 100% propre sans faux clients
  });

  // Active view tab
  const [activeTab, setActiveTab] = useState<"kanban" | "cockpit" | "studio" | "finances" | "school">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLeadForCockpit, setActiveLeadForCockpit] = useState<Lead | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastWonLead, setLastWonLead] = useState<Lead | null>(null);
  const [openObjection, setOpenObjection] = useState<string | null>("obj-1");

  // Daily sprint Pomodoro timer state
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintSeconds, setSprintSeconds] = useState(25 * 60);
  const [dailyCallsCount, setDailyCallsCount] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("xr_daily_calls") || "0");
    }
    return 0;
  });

  // Modal create lead
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formServiceId, setFormServiceId] = useState("website");
  const [formValue, setFormValue] = useState(1499);
  const [formIssue, setFormIssue] = useState("");
  const [formCloserId, setFormCloserId] = useState("");

  // Persist leads
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_crm_real_leads", JSON.stringify(leads));
    }
  }, [leads]);

  // Persist user
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentUser) {
        localStorage.setItem("xr_crm_logged_user", currentUser.id);
      } else {
        localStorage.removeItem("xr_crm_logged_user");
      }
    }
  }, [currentUser]);

  // Sprint timer interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sprintActive && sprintSeconds > 0) {
      timer = setInterval(() => {
        setSprintSeconds((prev) => prev - 1);
      }, 1000);
    } else if (sprintSeconds === 0 && sprintActive) {
      setSprintActive(false);
      if (soundEnabled) playFanfare();
      alert("⏱️ Sprint de closing de 25 minutes terminé ! Bravo pour l'énergie.");
    }
    return () => clearInterval(timer);
  }, [sprintActive, sprintSeconds, soundEnabled]);

  // Stats calculation
  const stats = useMemo(() => {
    const totalWon = leads.filter((l) => l.stage === "won").reduce((sum, l) => sum + l.value, 0);
    const totalPipeline = leads.filter((l) => l.stage !== "won").reduce((sum, l) => sum + l.value, 0);
    const monthlyTarget = 15000;
    const progressPercent = Math.min(100, Math.round((totalWon / monthlyTarget) * 100));

    // Per member stats
    const memberSales = TEAM_MEMBERS.map((m) => {
      const wonLeads = leads.filter((l) => l.stage === "won" && l.closerId === m.id);
      const wonAmount = wonLeads.reduce((s, l) => s + l.value, 0);
      let commission = Math.round(wonAmount * m.commissionRate);
      if (m.id === "martin") {
        // Martin gets 20% on own sales + 10% override on recruits (Lucas, Sarah, Christel, Camille)
        const recruitsWon = leads
          .filter((l) => l.stage === "won" && ["lucas", "sarah", "christel", "camille"].includes(l.closerId))
          .reduce((s, l) => s + l.value, 0);
        commission += Math.round(recruitsWon * 0.1);
      }
      return {
        ...m,
        wonAmount,
        commission,
        dealsCount: wonLeads.length,
      };
    });

    return {
      totalWon,
      totalPipeline,
      monthlyTarget,
      progressPercent,
      memberSales,
    };
  }, [leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.includes(searchQuery);

      if (!currentUser) return matchesSearch;
      if (currentUser.department === "direction" || currentUser.department === "rh" || currentUser.department === "studio") {
        return matchesSearch; // Direction & RH ont la vue d'ensemble
      }
      return matchesSearch && l.closerId === currentUser.id;
    });
  }, [leads, searchQuery, currentUser]);

  // Move stage
  const moveStage = (leadId: string, newStage: Lead["stage"]) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          if (newStage === "won" && l.stage !== "won") {
            setLastWonLead(l);
            setShowCelebration(true);
            if (soundEnabled) playFanfare();
            setTimeout(() => setShowCelebration(false), 5000);
            return { ...l, stage: newStage, studioStatus: "pending" };
          }
          if (soundEnabled) playDing();
          return { ...l, stage: newStage };
        }
        return l;
      })
    );
  };

  // Create lead handler
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const chosenService = XR_SERVICES.find((s) => s.id === formServiceId) || XR_SERVICES[0];
    const assignedCloser = formCloserId || (currentUser ? currentUser.id : "antoine");

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: formName,
      contact: formContact || "Direction",
      phone: formPhone || "+33 6 00 00 00 00",
      serviceId: chosenService.id,
      value: Number(formValue) || chosenService.defaultPrice,
      stage: "new",
      closerId: assignedCloser,
      issue: formIssue || "Besoin de modernisation & acquisition de clients",
      notes: "Ajouté directement au CRM",
      createdAt: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }),
    };

    setLeads([newLead, ...leads]);
    if (soundEnabled) playDing();
    setFormName("");
    setFormContact("");
    setFormPhone("");
    setFormIssue("");
    setShowNewLeadModal(false);
  };

  // Add 1 call in daily sprint
  const handleIncrementCall = () => {
    const nextVal = dailyCallsCount + 1;
    setDailyCallsCount(nextVal);
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_daily_calls", String(nextVal));
    }
    if (soundEnabled) playDing();
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = "ID;Entreprise;Contact;Telephone;Service;Valeur;Statut;Closer;Date\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}";"${l.name}";"${l.contact}";"${l.phone}";"${l.serviceId}";"${l.value}";"${l.stage}";"${l.closerId}";"${l.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `XR-AGENCY-LEADS-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Generate PDF Quote
  const generatePdfQuote = (lead: Lead) => {
    const service = XR_SERVICES.find((s) => s.id === lead.serviceId) || XR_SERVICES[0];
    const closer = TEAM_MEMBERS.find((m) => m.id === lead.closerId) || TEAM_MEMBERS[0];

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, M = 16, R = 194;
    const ink = [18, 22, 29] as const;
    const gold = [217, 153, 30] as const;
    const muted = [90, 98, 110] as const;
    const soft = [245, 246, 248] as const;
    const line = [225, 228, 233] as const;

    const dateStr = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const quoteNum = `XR-DEVIS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Header Background
    doc.setFillColor(...ink);
    doc.rect(0, 0, W, 36, "F");

    // Header Brand
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("XR AGENCY", M, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(217, 180, 100);
    doc.text("STUDIO DIGITAL HAUTE PERFORMANCE & IA", M, 24);

    // Right Quote Ref
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("PROPOSITION COMMERCIALE", R, 15, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(200, 205, 215);
    doc.text(`Réf : ${quoteNum}`, R, 22, { align: "right" });
    doc.text(`Date : ${dateStr}  |  Conseiller : ${closer.shortName}`, R, 28, { align: "right" });

    let y = 48;

    // Client Card Box
    doc.setFillColor(...soft);
    doc.roundedRect(M, y, W - 2 * M, 24, 2, 2, "F");
    doc.setDrawColor(...line);
    doc.roundedRect(M, y, W - 2 * M, 24, 2, 2, "S");

    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("CLIENT DESTINATAIRE", M + 5, y + 6);

    doc.setFontSize(11);
    doc.text(lead.name, M + 5, y + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(`Contact : ${lead.contact}   ·   Téléphone : ${lead.phone}`, M + 5, y + 19);

    y += 34;

    // Table Header
    doc.setFillColor(...ink);
    doc.roundedRect(M, y, W - 2 * M, 9, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("PRESTATION RÉALISÉE PAR XR AGENCY", M + 5, y + 6);
    doc.text("DÉLAI", 145, y + 6);
    doc.text("TOTAL HT", R - 5, y + 6, { align: "right" });

    y += 15;

    // Service Row
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(`${service.name}`, M + 5, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text("5 Jours", 145, y);

    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(`${lead.value.toLocaleString("fr-FR")} €`, R - 5, y, { align: "right" });

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    const bullets = [
      `• Livrable principal : ${service.deliverable}`,
      `• Solution personnalisée : ${lead.issue}`,
      "• Expérience utilisateur 2026 responsive ultra-rapide sur mobile & ordinateur",
      "• Intégration de contact direct WhatsApp & bouton d'appel 1-clic",
      "• Garantie d'assistance, support & suivi d'optimisation inclus",
    ];
    bullets.forEach((b) => {
      doc.text(b, M + 5, y);
      y += 5;
    });

    y += 10;
    doc.setDrawColor(...line);
    doc.line(M, y, R, y);
    y += 8;

    // Totals Box
    doc.setFillColor(...soft);
    doc.roundedRect(120, y, R - 120, 32, 2, 2, "F");

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Total HT :", 125, y + 7);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.text(`${lead.value.toLocaleString("fr-FR")} €`, R - 5, y + 7, { align: "right" });

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "normal");
    doc.text("TVA (Franchise / Autoliquidation) :", 125, y + 14);
    doc.setTextColor(...ink);
    doc.text("0,00 €", R - 5, y + 14, { align: "right" });

    doc.setTextColor(...gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("NET À RÉGLER :", 125, y + 23);
    doc.text(`${lead.value.toLocaleString("fr-FR")} €`, R - 5, y + 23, { align: "right" });

    // Payment Terms Box
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("MODALITÉS DE PAIEMENT", M, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text(`• Acompte de 50% au lancement : ${Math.round(lead.value * 0.5)} €`, M, y + 14);
    doc.text(`• Solde de 50% à la livraison clé-en-main : ${Math.round(lead.value * 0.5)} €`, M, y + 20);
    doc.text("• Option éligible : étalement en 3x mensualités sans frais", M, y + 26);

    y += 45;

    // Signatures
    doc.setDrawColor(...line);
    doc.roundedRect(M, y, 80, 28, 2, 2, "S");
    doc.roundedRect(W - M - 80, y, 80, 28, 2, 2, "S");

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("POUR XR AGENCY", M + 4, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("Validation de projet & engagement de production", M + 4, y + 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("POUR LE CLIENT", W - M - 76, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("Mention manuscrite 'Bon pour accord' et signature :", W - M - 76, y + 12);

    // Legal Footer
    doc.setDrawColor(...line);
    doc.line(M, 282, R, 282);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.text("KARMA SASU · XR AGENCY", M, 287);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · 78 Avenue des Champs-Élysées · 75008 Paris", M, 291);
    doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com", M, 295);

    doc.save(`DEVIS-XRAGENCY-${lead.name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
  };

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 1 : CONNEXION ÉPURÉE & ÉLÉGANTE (Si non connecté)
  // ─────────────────────────────────────────────────────────
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-amber-400/30 selection:text-amber-200">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-violet-600/10 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-4xl w-full relative z-10 text-center space-y-8">
          {/* Logo & Header */}
          <div className="space-y-3">
            <div className="inline-flex h-16 w-16 rounded-3xl bg-gradient-to-tr from-amber-500 via-amber-400 to-violet-600 items-center justify-center font-black text-black shadow-2xl shadow-amber-500/20 text-2xl mx-auto">
              XR
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              PORTAIL OPÉRATIONNEL XR AGENCY
            </h1>
            <p className="text-sm text-white/50 max-w-md mx-auto">
              Accès immédiat et sans friction. Sélectionnez votre profil pour ouvrir votre espace de travail.
            </p>
          </div>

          {/* Member Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
            {TEAM_MEMBERS.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setCurrentUser(member);
                  if (soundEnabled) playDing();
                }}
                className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-amber-400/40 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-start gap-3.5 relative overflow-hidden"
              >
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white font-bold text-base shadow-lg shrink-0`}
                >
                  {member.shortName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                      {member.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-white/50 truncate">{member.role}</p>
                  <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.06] text-amber-300/90 border border-white/[0.06]">
                    {member.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Direct Access */}
          <div className="pt-4 flex items-center justify-center gap-4 text-xs text-white/40">
            <span>Sécurisé · Chiffrement local</span>
            <span>·</span>
            <button
              onClick={() => {
                setCurrentUser(TEAM_MEMBERS[0]);
                if (soundEnabled) playFanfare();
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
            >
              ⚡ Connexion Directe Directeur (Antoine)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 2 : CRM OPÉRATIONNEL & LUDIQUE (Connecté)
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] font-sans selection:bg-amber-400/30 selection:text-amber-200">
      {/* Top Floating Victory Banner */}
      {showCelebration && lastWonLead && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-600 text-white shadow-2xl shadow-emerald-500/30 border border-white/20">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-bold text-base tracking-wide uppercase">
                CLOSING CONCLU ! +{lastWonLead.value.toLocaleString("fr-FR")} €
              </p>
              <p className="text-xs text-white/90">
                {lastWonLead.name} ({lastWonLead.contact}) passe en contrat signé & envoyé au Studio !
              </p>
            </div>
            <span className="text-2xl font-black bg-white/20 px-3 py-1 rounded-xl">
              +{Math.round(lastWonLead.value * (currentUser?.commissionRate || 0.25))} € Cash
            </span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-5">
        {/* HEADER BAR */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-500/20 text-lg">
              XR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  XR AGENCY CRM
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {currentUser.tag}
                  </span>
                </h1>
              </div>
              <p className="text-xs text-white/50">
                Session active : <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
              </p>
            </div>
          </div>

          {/* Quick Target Progress & Daily Quest */}
          <div className="flex-1 max-w-lg w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-3 px-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/60 flex items-center gap-1.5 font-medium">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                Objectif Mensuel Équipe
              </span>
              <span className="font-bold text-amber-300">
                {stats.totalWon.toLocaleString("fr-FR")} €{" "}
                <span className="text-white/40 font-normal">/ {stats.monthlyTarget.toLocaleString("fr-FR")} € ({stats.progressPercent}%)</span>
              </span>
            </div>
            <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${stats.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Right Action Icons: Sprint, Sound, Add, Logout */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end">
            {/* Daily Sprint Mode Button */}
            <button
              onClick={() => {
                setSprintActive(!sprintActive);
                if (soundEnabled) playDing();
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                sprintActive
                  ? "bg-amber-400/20 border-amber-400/40 text-amber-300 animate-pulse"
                  : "bg-white/[0.04] border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {sprintActive
                  ? `${Math.floor(sprintSeconds / 60)}:${(sprintSeconds % 60).toString().padStart(2, "0")}`
                  : "Sprint 25m"}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Sons activés" : "Sons désactivés"}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white transition-all"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>

            {/* + Add Lead Button */}
            <button
              onClick={() => {
                setShowNewLeadModal(true);
                if (soundEnabled) playDing();
              }}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Nouveau Lead (5s)
            </button>

            {/* Logout / Switch User */}
            <button
              onClick={() => {
                setCurrentUser(null);
                if (soundEnabled) playDing();
              }}
              title="Changer de profil ou se déconnecter"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-red-400 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* LUDIQUE MINI BAR: DÉFI DU JOUR & QUÊTES RAPIDES */}
        <div className="mt-4 p-3 px-4 rounded-2xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-6">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Quête du Jour :
            </span>
            <div className="flex items-center gap-2">
              <span className="text-white/60">📞 Appels passés :</span>
              <span className="font-mono font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                {dailyCallsCount} / 10
              </span>
              <button
                onClick={handleIncrementCall}
                className="px-2 py-0.5 rounded-md bg-white/[0.08] hover:bg-white/[0.15] text-[10px] font-bold text-white"
              >
                +1 Appel
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-white/60">🏆 Closings réussis :</span>
              <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                {leads.filter((l) => l.stage === "won").length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/50 text-[11px]">
            <span>🔥 Objectif Sprint : 10 appels = 1 vente assurée</span>
          </div>
        </div>

        {/* NAVIGATION DES VUES */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.08] mt-5 pb-2 gap-3">
          <nav className="flex flex-wrap gap-2">
            {[
              { id: "kanban", label: "🎯 Pipeline & Closing", count: leads.length },
              { id: "cockpit", label: "📞 Cockpit Appel & Objections", count: null },
              { id: "studio", label: "🎨 Pôle Studio & Livrables (5j)", count: leads.filter((l) => l.stage === "won").length },
              { id: "finances", label: "💰 Trésorerie & Commissions", count: null },
              { id: "school", label: "🎓 XR School (Méthode 3 Min)", count: null },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  if (soundEnabled) playDing();
                }}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-white/[0.08] text-white border border-white/[0.12] shadow-sm"
                    : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      activeTab === tab.id ? "bg-amber-400/20 text-amber-300" : "bg-white/[0.06] text-white/50"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Search & CSV Export */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleExportCsv}
              title="Exporter tous les prospects en CSV"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/[0.08] text-xs transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <div className="flex-1 sm:w-64 flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-white/70 focus-within:border-amber-400/50">
              <Search className="w-3.5 h-3.5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher prospect, tel..."
                className="bg-transparent border-none outline-none text-white text-xs placeholder:text-white/30 w-full"
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────── */}
        {/* VUE 1 : KANBAN PIPELINE */}
        {/* ─────────────────────────────────────────────────── */}
        {activeTab === "kanban" && (
          <div className="mt-6">
            {leads.length === 0 ? (
              /* ÉTAT INITIAL VIDE SANS FAUX CLIENTS */
              <div className="text-center py-16 px-4 bg-white/[0.02] border border-white/[0.08] rounded-3xl max-w-xl mx-auto space-y-4">
                <div className="h-16 w-16 rounded-3xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 text-3xl mx-auto">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-white">Votre Pipeline est Prêt</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Aucun prospect enregistré pour le moment. Cliquez sur le bouton ci-dessous pour ajouter votre premier vrai prospect en 5 secondes.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setShowNewLeadModal(true)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter Mon Premier Prospect
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Colonne 1 : Nouveaux Prospects */}
                <KanbanColumn
                  title="1. Nouveaux Prospects"
                  subtitle="À contacter en priorité"
                  color="border-blue-500/30 bg-blue-500/5"
                  dotColor="bg-blue-400"
                  count={filteredLeads.filter((l) => l.stage === "new").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "new")
                    .map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onCall={() => {
                          setActiveLeadForCockpit(lead);
                          setActiveTab("cockpit");
                        }}
                        onNext={() => moveStage(lead.id, "mockup")}
                        nextLabel="Maquette Prête →"
                        onWin={() => moveStage(lead.id, "won")}
                        onPdf={() => generatePdfQuote(lead)}
                      />
                    ))}
                </KanbanColumn>

                {/* Colonne 2 : Maquette Envoyée */}
                <KanbanColumn
                  title="2. Maquette Envoyée"
                  subtitle="En attente retour WhatsApp"
                  color="border-amber-500/30 bg-amber-500/5"
                  dotColor="bg-amber-400"
                  count={filteredLeads.filter((l) => l.stage === "mockup").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "mockup")
                    .map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onCall={() => {
                          setActiveLeadForCockpit(lead);
                          setActiveTab("cockpit");
                        }}
                        onNext={() => moveStage(lead.id, "negociation")}
                        nextLabel="Négocier →"
                        onWin={() => moveStage(lead.id, "won")}
                        onPdf={() => generatePdfQuote(lead)}
                      />
                    ))}
                </KanbanColumn>

                {/* Colonne 3 : Chaud & Objections */}
                <KanbanColumn
                  title="3. Chaud & Objections"
                  subtitle="Phase décisive de closing"
                  color="border-violet-500/30 bg-violet-500/5"
                  dotColor="bg-violet-400"
                  count={filteredLeads.filter((l) => l.stage === "negociation").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "negociation")
                    .map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onCall={() => {
                          setActiveLeadForCockpit(lead);
                          setActiveTab("cockpit");
                        }}
                        onNext={() => moveStage(lead.id, "won")}
                        nextLabel="Valider Contrat 🎉"
                        onWin={() => moveStage(lead.id, "won")}
                        onPdf={() => generatePdfQuote(lead)}
                      />
                    ))}
                </KanbanColumn>

                {/* Colonne 4 : Gagné / Signé */}
                <KanbanColumn
                  title="4. Contrats Signés 🎉"
                  subtitle="Encaissé & Livré au Studio"
                  color="border-emerald-500/30 bg-emerald-500/5"
                  dotColor="bg-emerald-400"
                  count={filteredLeads.filter((l) => l.stage === "won").length}
                >
                  {filteredLeads
                    .filter((l) => l.stage === "won")
                    .map((lead) => {
                      const closer = TEAM_MEMBERS.find((m) => m.id === lead.closerId);
                      return (
                        <div
                          key={lead.id}
                          className="p-4 rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-emerald-500/30 hover:border-emerald-400/50 transition-all shadow-md group relative overflow-hidden"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-base">
                              {XR_SERVICES.find((s) => s.id === lead.serviceId)?.icon || "🌐"}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              {lead.value.toLocaleString("fr-FR")} € Validé
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-white">{lead.name}</h4>
                          <p className="text-xs text-white/50">{lead.contact} · {lead.phone}</p>

                          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                            <button
                              onClick={() => generatePdfQuote(lead)}
                              className="inline-flex items-center gap-1 text-[11px] text-white/60 hover:text-white transition-colors"
                            >
                              <FileText className="w-3 h-3 text-amber-400" />
                              Devis PDF
                            </button>
                            <span className="text-emerald-300 font-semibold text-xs flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              {closer?.shortName} : +{Math.round(lead.value * (closer?.commissionRate || 0.25))} €
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </KanbanColumn>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────── */}
        {/* VUE 2 : COCKPIT D'APPEL & BOUCLIER ANTI-OBJECTIONS */}
        {/* ─────────────────────────────────────────────────── */}
        {activeTab === "cockpit" && (
          <div className="mt-6">
            {leads.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white/[0.02] border border-white/[0.08] rounded-3xl max-w-lg mx-auto space-y-3">
                <p className="text-sm text-white/60">Ajoutez d'abord un prospect pour activer le cockpit d'appel.</p>
                <button
                  onClick={() => setShowNewLeadModal(true)}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold"
                >
                  + Ajouter un prospect
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 4 cols: Leads Selector */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4">
                    <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-400" />
                      Prospects à Traiter ({leads.length})
                    </h3>
                    <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
                      {leads.map((l) => {
                        const service = XR_SERVICES.find((s) => s.id === l.serviceId);
                        const isSelected = (activeLeadForCockpit?.id || leads[0].id) === l.id;
                        return (
                          <button
                            key={l.id}
                            onClick={() => {
                              setActiveLeadForCockpit(l);
                              if (soundEnabled) playDing();
                            }}
                            className={`w-full text-left p-3 rounded-xl border transition-all ${
                              isSelected
                                ? "bg-amber-400/10 border-amber-400/40 shadow-sm"
                                : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white flex items-center gap-1.5">
                                <span>{service?.icon || "🌐"}</span>
                                {l.name}
                              </span>
                              <span className="text-[11px] font-semibold text-amber-300">
                                {l.value} €
                              </span>
                            </div>
                            <p className="text-[11px] text-white/50 mt-1 truncate">
                              {l.contact} · {l.phone}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right 8 cols: Live Script and Objection Solver */}
                {(() => {
                  const targetLead = activeLeadForCockpit || leads[0];
                  const service = XR_SERVICES.find((s) => s.id === targetLead.serviceId) || XR_SERVICES[0];

                  return (
                    <div className="lg:col-span-8 space-y-5">
                      {/* Active Lead Header Bar */}
                      <div className="bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/[0.1] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{service.icon}</span>
                            <div>
                              <h2 className="text-xl font-bold text-white">{targetLead.name}</h2>
                              <p className="text-xs text-white/60">
                                Contact : <strong className="text-white">{targetLead.contact}</strong> · Tél :{" "}
                                <span className="text-amber-300 font-mono font-medium">{targetLead.phone}</span>
                              </p>
                            </div>
                          </div>
                          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-xs border border-amber-500/20">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Opportunité : {targetLead.issue}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <a
                            href={`tel:${targetLead.phone.replace(/\s+/g, "")}`}
                            onClick={handleIncrementCall}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                          >
                            <Phone className="w-4 h-4" />
                            Lancer Appel
                          </a>
                          <a
                            href={`https://wa.me/${targetLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Bonjour ${targetLead.contact}, c'est ${currentUser.shortName} de XR Agency. Suite à notre échange, voici la démo interactive préparée pour ${targetLead.name} : https://xragencyai.com/realisations`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] text-white font-medium text-xs px-4 py-2.5 rounded-xl border border-white/10 transition-all"
                          >
                            <MessageSquare className="w-4 h-4 text-emerald-400" />
                            WhatsApp
                          </a>
                          <button
                            onClick={() => generatePdfQuote(targetLead)}
                            className="inline-flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.12] text-white font-medium text-xs px-4 py-2.5 rounded-xl border border-white/10 transition-all"
                          >
                            <Download className="w-4 h-4 text-amber-400" />
                            Devis PDF
                          </button>
                          <button
                            onClick={() => moveStage(targetLead.id, "won")}
                            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
                          >
                            <Trophy className="w-4 h-4" />
                            C'est Signé !
                          </button>
                        </div>
                      </div>

                      {/* 30-Second Opening Pitch */}
                      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-sm text-white flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            Script d'Accroche 30s ({service.name})
                          </h3>
                          <span className="text-[11px] text-white/40">Direct, courtois & sans résistance</span>
                        </div>
                        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs sm:text-sm text-white/90 leading-relaxed font-mono">
                          « Bonjour <strong className="text-amber-300">{targetLead.contact}</strong>, c'est{" "}
                          <strong className="text-white">{currentUser.shortName}</strong> de XR Agency à Paris. Je vous appelle très rapidement car nous venons de finaliser l'audit des acteurs de votre secteur sur votre ville. <br /><br />
                          J'ai identifié un point critique sur le dispositif de <strong className="text-amber-300">{targetLead.name}</strong> : <span className="text-amber-200">{targetLead.issue}</span>. <br /><br />
                          Plutôt que de vous faire un long discours, notre studio a déjà modélisé une version interactive prête à l'emploi. Je peux vous l'envoyer en 15 secondes sur votre WhatsApp pour que vous jugiez par vous-même ? »
                        </div>
                      </div>

                      {/* Objection Solver Cards */}
                      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                        <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          Bouclier Anti-Objections (La Réplique Immédiate)
                        </h3>
                        <div className="space-y-2.5">
                          {OBJECTIONS.map((obj) => (
                            <div
                              key={obj.id}
                              className="border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.02]"
                            >
                              <button
                                onClick={() => setOpenObjection(openObjection === obj.id ? null : obj.id)}
                                className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-white/90 hover:bg-white/[0.04] transition-all"
                              >
                                <span className="text-amber-300 font-medium">{obj.question}</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-white/40 transition-transform ${
                                    openObjection === obj.id ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              {openObjection === obj.id && (
                                <div className="p-3.5 pt-0 text-xs text-white/70 bg-black/20 border-t border-white/[0.04] leading-relaxed">
                                  <p className="text-emerald-300/90 font-medium bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                                    {obj.response}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────── */}
        {/* VUE 3 : PÔLE STUDIO & LIVRABLES (Organisation Interne) */}
        {/* ─────────────────────────────────────────────────── */}
        {activeTab === "studio" && (
          <div className="mt-6 space-y-6">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-400" />
                  File de Production du Studio XR Agency (Livrables 5j)
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Tous les contrats signés par les closers sont synchronisés ici pour le pôle créatif & développement.
                </p>
              </div>
            </div>

            {leads.filter((l) => l.stage === "won").length === 0 ? (
              <div className="text-center py-12 px-4 bg-white/[0.02] border border-white/[0.08] rounded-3xl max-w-md mx-auto space-y-2">
                <p className="text-sm text-white/60">Aucun contrat signé en attente de production pour le moment.</p>
                <p className="text-xs text-white/40">Dès qu'un closer valide un deal, il apparaîtra ici avec son brief.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leads
                  .filter((l) => l.stage === "won")
                  .map((wonLead) => {
                    const service = XR_SERVICES.find((s) => s.id === wonLead.serviceId);
                    const closer = TEAM_MEMBERS.find((m) => m.id === wonLead.closerId);

                    return (
                      <div
                        key={wonLead.id}
                        className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-amber-300 flex items-center gap-1.5">
                            <span>{service?.icon}</span>
                            {service?.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Livrable 5 jours
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-base text-white">{wonLead.name}</h4>
                          <p className="text-xs text-white/60">Contact client : {wonLead.contact} ({wonLead.phone})</p>
                          <p className="text-[11px] text-white/40 mt-1">Closer référent : <strong>{closer?.name}</strong></p>
                        </div>

                        <div className="p-3 rounded-xl bg-black/30 border border-white/[0.04] text-xs text-white/70">
                          <p className="font-semibold text-white/80 text-[11px]">Cahier des charges :</p>
                          <p className="text-[11px] mt-0.5">{wonLead.issue}</p>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] text-xs">
                          <span className="font-mono text-white font-bold">{wonLead.value.toLocaleString("fr-FR")} € HT</span>
                          <button
                            onClick={() => generatePdfQuote(wonLead)}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-[11px] font-semibold flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                            Voir Bon de Commande
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────── */}
        {/* VUE 4 : TRÉSORERIE & COMMISSIONS DE TOUTE L'ÉQUIPE */}
        {/* ─────────────────────────────────────────────────── */}
        {activeTab === "finances" && (
          <div className="mt-6 space-y-6">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Chiffre d'Affaires Encaissé</p>
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
                  {stats.totalWon.toLocaleString("fr-FR")} €
                </h3>
                <p className="text-[11px] text-white/40 mt-1">{leads.filter((l) => l.stage === "won").length} contrat(s) signé(s)</p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Pipeline Actif en Cours</p>
                <h3 className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
                  {stats.totalPipeline.toLocaleString("fr-FR")} €
                </h3>
                <p className="text-[11px] text-white/40 mt-1">{leads.filter((l) => l.stage !== "won").length} opportunité(s) en négo</p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Commissions Commerciales</p>
                <h3 className="text-2xl sm:text-3xl font-black text-violet-400 mt-2">
                  {stats.memberSales.reduce((s, m) => s + m.commission, 0).toLocaleString("fr-FR")} €
                </h3>
                <p className="text-[11px] text-white/40 mt-1">Calculées selon barème de chaque closer</p>
              </div>
            </div>

            {/* Complete Team Breakdown Table */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                Rémunération de Toute l'Équipe XR Agency ({TEAM_MEMBERS.length} Membres)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-semibold">Membre</th>
                      <th className="pb-3 font-semibold">Rôle & Pôle</th>
                      <th className="pb-3 font-semibold">Règle de Commission</th>
                      <th className="pb-3 font-semibold">CA Signé Ce Mois</th>
                      <th className="pb-3 font-semibold">Gains Validés</th>
                      <th className="pb-3 font-semibold text-right">Statut Virement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {stats.memberSales.map((m) => (
                      <tr key={m.id} className="hover:bg-white/[0.02]">
                        <td className="py-3.5 font-bold text-white flex items-center gap-2.5">
                          <span
                            className={`h-7 w-7 rounded-xl bg-gradient-to-br ${m.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                          >
                            {m.shortName.charAt(0)}
                          </span>
                          <span>{m.name}</span>
                        </td>
                        <td className="py-3.5 text-white/60">{m.role}</td>
                        <td className="py-3.5 text-white/50 font-mono">
                          {m.department === "direction"
                            ? "Direction Générale"
                            : m.id === "martin"
                            ? "20% direct + 10% override recrues"
                            : `${Math.round(m.commissionRate * 100)}% net sur ventes`}
                        </td>
                        <td className="py-3.5 text-white font-mono font-bold">
                          {m.wonAmount.toLocaleString("fr-FR")} €
                        </td>
                        <td className="py-3.5 font-bold text-emerald-400 font-mono">
                          {m.commission.toLocaleString("fr-FR")} €
                        </td>
                        <td className="py-3.5 text-right">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold text-[10px] border border-emerald-500/20">
                            {m.commission > 0 ? "Prêt à valider" : "En cours"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────── */}
        {/* VUE 5 : XR SCHOOL (MÉTHODE EXPRESS 3 MIN) */}
        {/* ─────────────────────────────────────────────────── */}
        {activeTab === "school" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Règle Fondamentale N°1
              </span>
              <h4 className="text-base font-bold text-white">Le Diagnostic Flash (2 Minutes Chrono)</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Ne proposez jamais un « site web » banal. Les gérants reçoivent 10 appels par jour pour ça. Proposez-lui de résoudre son <strong>problème concret de fuite de chiffre d'affaires</strong> : absence de réservation en ligne sur smartphone ou fiche Google Maps introuvable face à son voisin d'en face.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Règle Fondamentale N°2
              </span>
              <h4 className="text-base font-bold text-white">L'Effet Démo WhatsApp</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Au lieu de débattre au téléphone, envoyez immédiatement le lien de la maquette par WhatsApp. Quand le gérant voit son propre logo et son commerce modélisé avec un design 2026, l'effet de surprise fait 80% du travail de closing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                Règle Fondamentale N°3
              </span>
              <h4 className="text-base font-bold text-white">L'Offre 3x Sans Frais</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                90% des refus sur le tarif disparaissent dès que vous proposez le 3x sans frais (ex: 499 € / mois pendant 3 mois). Pour un commerce, 499 € est absorbé dès le premier week-end.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Règle Fondamentale N°4
              </span>
              <h4 className="text-base font-bold text-white">Le Closing Sans Pression</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Ne forcez jamais la main. Concluez toujours avec une question binaire rassurante : <em>« Si la démo vous plaît, nous vous livrons la clé en main d'ici vendredi. On valide ensemble ? »</em>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────── */}
      {/* MODAL EXPRESS : NOUVEAU PROSPECT FLASH (5s) */}
      {/* ─────────────────────────────────────────────────── */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f121a] border border-white/[0.12] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Nouveau Prospect Flash (5s)
              </h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-white/60 uppercase">Nom de l'Entreprise / Commerce *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Hôtel Splendid Paris, Bistro 85..."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Nom du Gérant / Contact</label>
                  <input
                    type="text"
                    placeholder="Ex: Alexandre Moreau"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Téléphone Portable *</label>
                  <input
                    type="text"
                    required
                    placeholder="06 12 34 56 78"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Prestation Visée</label>
                  <select
                    value={formServiceId}
                    onChange={(e) => {
                      const sId = e.target.value;
                      setFormServiceId(sId);
                      const svc = XR_SERVICES.find((s) => s.id === sId);
                      if (svc) setFormValue(svc.defaultPrice);
                    }}
                    className="w-full mt-1 bg-[#141822] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {XR_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.icon} {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Valeur Deal (€ HT)</label>
                  <input
                    type="number"
                    value={formValue}
                    onChange={(e) => setFormValue(Number(e.target.value))}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 uppercase">Closer Assigné</label>
                <select
                  value={formCloserId || currentUser.id}
                  onChange={(e) => setFormCloserId(e.target.value)}
                  className="w-full mt-1 bg-[#141822] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {TEAM_MEMBERS.filter((m) => m.department !== "studio").map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.tag})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 uppercase">Problème à régler / Défaillance détectée</label>
                <input
                  type="text"
                  placeholder="Ex: Site lent (7s), pas adapté aux mobiles, Google Maps invisible"
                  value={formIssue}
                  onChange={(e) => setFormIssue(e.target.value)}
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white/70"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold shadow-lg shadow-amber-400/20"
                >
                  Ajouter au Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SOUS-COMPOSANTS KANBAN
// ─────────────────────────────────────────────────────────────

function KanbanColumn({
  title,
  subtitle,
  color,
  dotColor,
  count,
  children,
}: {
  title: string;
  subtitle: string;
  color: string;
  dotColor: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className={`p-4 rounded-2xl border ${color} flex flex-col min-h-[500px]`}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          {title}
        </h3>
        <span className="text-[11px] font-bold text-white/60 bg-white/[0.08] px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <p className="text-[11px] text-white/40 mb-4">{subtitle}</p>

      <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">{children}</div>
    </div>
  );
}

function LeadCard({
  lead,
  onCall,
  onNext,
  nextLabel,
  onWin,
  onPdf,
}: {
  lead: Lead;
  onCall: () => void;
  onNext: () => void;
  nextLabel: string;
  onWin: () => void;
  onPdf: () => void;
}) {
  const service = XR_SERVICES.find((s) => s.id === lead.serviceId);
  const closer = TEAM_MEMBERS.find((m) => m.id === lead.closerId);

  return (
    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all shadow-sm group">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-base">{service?.icon || "🌐"}</span>
        <span className="text-xs font-bold text-amber-300 font-mono">
          {lead.value.toLocaleString("fr-FR")} €
        </span>
      </div>

      <h4 className="font-bold text-xs text-white group-hover:text-amber-200 transition-colors">
        {lead.name}
      </h4>
      <p className="text-[11px] text-white/60">
        {lead.contact} · {lead.phone}
      </p>

      <div className="mt-2 p-2 rounded-lg bg-black/30 border border-white/[0.04] text-[10px] text-white/70 leading-relaxed">
        {lead.issue}
      </div>

      <div className="mt-2 text-[10px] text-white/40">
        Closer : <strong className="text-white/60">{closer?.shortName || "Antoine"}</strong>
      </div>

      <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-1">
        <button
          onClick={onCall}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 transition-colors"
        >
          <Phone className="w-3 h-3" />
          Appel
        </button>

        <button
          onClick={onPdf}
          title="Générer Devis PDF"
          className="p-1 px-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white transition-all text-[10px] flex items-center gap-1"
        >
          <FileText className="w-3 h-3 text-amber-400" />
          PDF
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={onNext}
            className="text-[10px] font-semibold px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-white transition-all"
          >
            {nextLabel}
          </button>
          <button
            onClick={onWin}
            title="Marquer comme Signé"
            className="p-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all"
          >
            <CheckCircle2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
