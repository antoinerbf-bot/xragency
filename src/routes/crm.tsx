import { useState, useMemo, useEffect } from "react";
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
  RotateCcw
} from "lucide-react";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM XR Agency — Espace Commercial & Direction" },
      { name: "description", content: "Plateforme de gestion commerciale, pipeline et closing XR Agency." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ModernCrmPage,
});

interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  sector: string;
  sectorIcon: string;
  value: number;
  stage: "new" | "mockup" | "negociation" | "won";
  closer: string;
  issue: string;
  notes: string;
  date: string;
}

const DEFAULT_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Bistrot Le Marais",
    contact: "Stéphane Laurent",
    phone: "+33 6 12 34 56 78",
    sector: "Restauration",
    sectorIcon: "🍽️",
    value: 1499,
    stage: "new",
    closer: "Lucas",
    issue: "Site web lent (8s), absence de menu interactif et pas de réservation en ligne.",
    notes: "Appelé lundi, intéressé par la démo WhatsApp.",
    date: "Aujourd'hui, 11:20",
  },
  {
    id: "lead-2",
    name: "Dr. Sophie Martin (Dentiste)",
    contact: "Sophie Martin",
    phone: "+33 6 98 76 54 32",
    sector: "Santé",
    sectorIcon: "🦷",
    value: 1899,
    stage: "mockup",
    closer: "Christel",
    issue: "Fiche Google Maps mal positionnée, aucun formulaire d'urgence patient.",
    notes: "Maquette mobile envoyée sur son WhatsApp pro hier après-midi.",
    date: "Hier, 16:45",
  },
  {
    id: "lead-3",
    name: "Apex Rénovation BTP",
    contact: "Marc Vasseur",
    phone: "+33 6 45 11 22 33",
    sector: "BTP / Artisanat",
    sectorIcon: "🔨",
    value: 2499,
    stage: "negociation",
    closer: "Lucas",
    issue: "Ancien site non responsive, perte de leads sur mobile face aux concurrents locaux.",
    notes: "Hésite sur l'étalement en 3x. À relancer à 14h.",
    date: "Hier, 14:10",
  },
  {
    id: "lead-4",
    name: "Riviera Yachting Charter",
    contact: "Alexandre Dupuis",
    phone: "+33 6 55 44 33 22",
    sector: "Luxe & Nautisme",
    sectorIcon: "🛥️",
    value: 3800,
    stage: "won",
    closer: "Martin",
    issue: "Catalogue de bateaux non optimisé pour conversion rapide.",
    notes: "Acompte de 50% reçu par virement ce matin !",
    date: "Aujourd'hui, 09:30",
  },
  {
    id: "lead-5",
    name: "Cabinet Lemaire & Associés",
    contact: "Maître Vincent Lemaire",
    phone: "+33 6 77 88 99 00",
    sector: "Droit & Conseil",
    sectorIcon: "⚖️",
    value: 2200,
    stage: "won",
    closer: "Christel",
    issue: "Image de marque vieillissante, besoin d'un portail de prise de RDV sécurisé.",
    notes: "Devis signé électroniquement. Envoi au studio créatif.",
    date: "Ce matin, 10:15",
  },
  {
    id: "lead-6",
    name: "Institut Éclat Beauté",
    contact: "Nathalie Caron",
    phone: "+33 6 33 22 11 00",
    sector: "Beauté & Spa",
    sectorIcon: "✨",
    value: 1499,
    stage: "new",
    closer: "Lucas",
    issue: "Réservations gérées manuellement sur carnet papier.",
    notes: "Prospect très chaud trouvé sur Instagram.",
    date: "Ce matin, 08:50",
  },
];

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

export function ModernCrmPage() {
  const [activeTab, setActiveTab] = useState<"kanban" | "cockpit" | "finances" | "school">("kanban");
  const [selectedRole, setSelectedRole] = useState<"directeur" | "martin" | "lucas" | "christel">("directeur");
  const [leads, setLeads] = useState<Lead[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("xr_crm_leads_v2");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_LEADS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeLeadForCockpit, setActiveLeadForCockpit] = useState<Lead>(leads[0] || DEFAULT_LEADS[0]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastWonLead, setLastWonLead] = useState<Lead | null>(null);
  const [openObjection, setOpenObjection] = useState<string | null>("obj-1");
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // Persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("xr_crm_leads_v2", JSON.stringify(leads));
    }
  }, [leads]);

  // New lead form state
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadContact, setNewLeadContact] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadSector, setNewLeadSector] = useState("Restauration");
  const [newLeadValue, setNewLeadValue] = useState(1499);
  const [newLeadIssue, setNewLeadIssue] = useState("");

  // Statistics
  const stats = useMemo(() => {
    const totalWon = leads
      .filter((l) => l.stage === "won")
      .reduce((sum, l) => sum + l.value, 0);
    const totalPipeline = leads
      .filter((l) => l.stage !== "won")
      .reduce((sum, l) => sum + l.value, 0);
    const monthlyTarget = 15000;
    const progressPercent = Math.min(100, Math.round((totalWon / monthlyTarget) * 100));

    // Closer commissions
    const lucasWon = leads.filter((l) => l.stage === "won" && l.closer === "Lucas").reduce((s, l) => s + l.value, 0);
    const christelWon = leads.filter((l) => l.stage === "won" && l.closer === "Christel").reduce((s, l) => s + l.value, 0);
    const martinWon = leads.filter((l) => l.stage === "won" && l.closer === "Martin").reduce((s, l) => s + l.value, 0);

    return {
      totalWon,
      totalPipeline,
      monthlyTarget,
      progressPercent,
      lucasCommission: Math.round(lucasWon * 0.3),
      christelCommission: Math.round(christelWon * 0.2),
      martinCommission: Math.round(martinWon * 0.2 + (lucasWon + christelWon) * 0.1),
    };
  }, [leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.sector.toLowerCase().includes(searchQuery.toLowerCase());
      if (selectedRole === "directeur") return matchesSearch;
      if (selectedRole === "martin") return matchesSearch;
      if (selectedRole === "lucas") return matchesSearch && l.closer === "Lucas";
      if (selectedRole === "christel") return matchesSearch && l.closer === "Christel";
      return matchesSearch;
    });
  }, [leads, searchQuery, selectedRole]);

  // Move lead stage
  const moveStage = (leadId: string, newStage: Lead["stage"]) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          if (newStage === "won" && l.stage !== "won") {
            setLastWonLead(l);
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 4500);
          }
          return { ...l, stage: newStage };
        }
        return l;
      })
    );
  };

  // Add new lead
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadName,
      contact: newLeadContact || "Directeur",
      phone: newLeadPhone || "+33 6 00 00 00 00",
      sector: newLeadSector,
      sectorIcon:
        newLeadSector === "Restauration"
          ? "🍽️"
          : newLeadSector === "Santé"
          ? "🦷"
          : newLeadSector === "BTP"
          ? "🔨"
          : newLeadSector === "Immobilier"
          ? "🏡"
          : "✨",
      value: Number(newLeadValue) || 1499,
      stage: "new",
      closer: selectedRole === "christel" ? "Christel" : selectedRole === "lucas" ? "Lucas" : "Lucas",
      issue: newLeadIssue || "Optimisation de conversion web & visibilité",
      notes: "Créé via Ajout Express",
      date: "À l'instant",
    };

    setLeads([newLead, ...leads]);
    setNewLeadName("");
    setNewLeadContact("");
    setNewLeadPhone("");
    setNewLeadIssue("");
    setShowNewLeadModal(false);
  };

  // Reset demo data
  const handleResetDemoData = () => {
    if (confirm("Réinitialiser les prospects avec les données de démonstration ?")) {
      setLeads(DEFAULT_LEADS);
      localStorage.removeItem("xr_crm_leads_v2");
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = "ID;Entreprise;Contact;Telephone;Secteur;Valeur;Statut;Closer;Date\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}";"${l.name}";"${l.contact}";"${l.phone}";"${l.sector}";"${l.value}";"${l.stage}";"${l.closer}";"${l.date}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `XR-AGENCY-LEADS-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Generate PDF Quote 1-Click
  const generatePdfQuote = (lead: Lead) => {
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

    // Header Logo & Brand
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("XR AGENCY", M, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(217, 180, 100);
    doc.text("STUDIO DIGITAL HAUTE PERFORMANCE & IA", M, 24);

    // Right Header Quote Number & Date
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("PROPOSITION COMMERCIALE", R, 15, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(200, 205, 215);
    doc.text(`N° ${quoteNum}`, R, 22, { align: "right" });
    doc.text(`Date : ${dateStr}`, R, 28, { align: "right" });

    let y = 48;

    // Client Box
    doc.setFillColor(...soft);
    doc.roundedRect(M, y, W - 2 * M, 24, 2, 2, "F");
    doc.setDrawColor(...line);
    doc.roundedRect(M, y, W - 2 * M, 24, 2, 2, "S");

    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("DESTINATAIRE / CLIENT", M + 5, y + 6);

    doc.setFontSize(11);
    doc.text(lead.name, M + 5, y + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(`À l'attention de : ${lead.contact}  |  Tél : ${lead.phone}`, M + 5, y + 19);

    y += 34;

    // Table Header
    doc.setFillColor(...ink);
    doc.roundedRect(M, y, W - 2 * M, 9, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("DESCRIPTION DE LA PRESTATION", M + 5, y + 6);
    doc.text("DÉLAI", 145, y + 6);
    doc.text("MONTANT HT", R - 5, y + 6, { align: "right" });

    y += 15;

    // Table Row 1
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(`Solution Digitale & Refonte Clé-en-main (${lead.sector})`, M + 5, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text("Livraison 5j", 145, y);

    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(`${lead.value.toLocaleString("fr-FR")} €`, R - 5, y, { align: "right" });

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    const descLines = [
      "• Design immersif 2026 responsive ultra-rapide sur mobile & desktop",
      "• Optimisation de conversion : formulaire d'urgence / réservation directe en ligne",
      `• Résolution ciblée : ${lead.issue}`,
      "• Référencement local Google Maps TOP 3 & fiche entreprise vérifiée",
      "• Intégration WhatsApp Business & bouton d'appel direct en 1 clic",
      "• Hébergement haute performance, certificat SSL & nom de domaine inclus 1 an",
    ];
    descLines.forEach((lineText) => {
      doc.text(lineText, M + 5, y);
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
    doc.text("TVA (Autoliquidation / Franchise) :", 125, y + 14);
    doc.setTextColor(...ink);
    doc.text("0,00 €", R - 5, y + 14, { align: "right" });

    doc.setTextColor(...gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("NET À PAYER :", 125, y + 23);
    doc.text(`${lead.value.toLocaleString("fr-FR")} €`, R - 5, y + 23, { align: "right" });

    // Payment Conditions Left Box
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("CONDITIONS DE RÈGLEMENT", M, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text("• Acompte de démarrage : 50% à la commande (" + Math.round(lead.value * 0.5) + " €)", M, y + 14);
    doc.text("• Solde à la livraison après validation finale (" + Math.round(lead.value * 0.5) + " €)", M, y + 20);
    doc.text("• Option éligible : étalement en 3x sans frais sur demande", M, y + 26);

    y += 45;

    // Signature Block
    doc.setDrawColor(...line);
    doc.roundedRect(M, y, 80, 28, 2, 2, "S");
    doc.roundedRect(W - M - 80, y, 80, 28, 2, 2, "S");

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("POUR XR AGENCY", M + 4, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("Bon pour accord et lancement immédiat", M + 4, y + 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("POUR LE CLIENT", W - M - 76, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("Date et signature précédées de 'Bon pour accord' :", W - M - 76, y + 12);

    // Footer Legal
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

    // Download
    doc.save(`DEVIS-XRAGENCY-${lead.name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f1f3f7] font-sans selection:bg-amber-400/30 selection:text-amber-200">
      {/* Top Floating Celebration Banner when a deal is closed */}
      {showCelebration && lastWonLead && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-600 text-white shadow-2xl shadow-emerald-500/30 border border-white/20">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-bold text-base tracking-wide uppercase">
                CLOSING RÉUSSI ! +{lastWonLead.value.toLocaleString("fr-FR")} € SIGNÉ
              </p>
              <p className="text-xs text-white/90">
                {lastWonLead.name} ({lastWonLead.contact}) passe en contrat validé !
              </p>
            </div>
            <span className="text-2xl font-black bg-white/20 px-3 py-1 rounded-xl">
              +{Math.round(lastWonLead.value * 0.25)} € Cash
            </span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 py-6">
        {/* Navigation & Header */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-500/20 text-lg">
              XR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  XR AGENCY CRM
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Directeur & Closers
                  </span>
                </h1>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Espace opérationnel sans friction · Focus 100% closing & conversion
              </p>
            </div>
          </div>

          {/* Quick Target Bar */}
          <div className="flex-1 max-w-md w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-3 px-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/60 flex items-center gap-1.5 font-medium">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                Objectif Mensuel Équipe
              </span>
              <span className="font-bold text-amber-300">
                {stats.totalWon.toLocaleString("fr-FR")} €{" "}
                <span className="text-white/40 font-normal">/ {stats.monthlyTarget.toLocaleString("fr-FR")} €</span>
              </span>
            </div>
            <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${stats.progressPercent}%` }}
              />
            </div>
          </div>

          {/* User Role Switcher & New Lead Button */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
              {(
                [
                  { id: "directeur", label: "👑 Antoine", sub: "Direction" },
                  { id: "martin", label: "👥 Martin", sub: "Manager RH" },
                  { id: "lucas", label: "⚡ Lucas", sub: "Closer 30%" },
                  { id: "christel", label: "⚡ Christel", sub: "Closer 20%" },
                ] as const
              ).map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedRole === role.id
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowNewLeadModal(true)}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Nouveau Lead (5s)
            </button>
          </div>
        </header>

        {/* Tab Selection & Utilities */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.08] mt-6 pb-2 gap-3">
          <nav className="flex gap-2">
            {[
              { id: "kanban", label: "🎯 Pipeline & Closing", count: leads.length },
              { id: "cockpit", label: "📞 Cockpit Appel & Objections", count: null },
              { id: "finances", label: "💰 Trésorerie & Commissions", count: null },
              { id: "school", label: "🎓 XR School (Méthode 3 Min)", count: null },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

          {/* Quick Actions & Search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleExportCsv}
              title="Exporter tous les prospects en CSV"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/[0.08] text-xs transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleResetDemoData}
              title="Réinitialiser les leads"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/40 hover:text-white border border-white/[0.08] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="flex-1 sm:w-64 flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-white/70 focus-within:border-amber-400/50">
              <Search className="w-3.5 h-3.5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un prospect, ville..."
                className="bg-transparent border-none outline-none text-white text-xs placeholder:text-white/30 w-full"
              />
            </div>
          </div>
        </div>

        {/* TAB 1: KANBAN PIPELINE */}
        {activeTab === "kanban" && (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Column 1: À contacter */}
              <KanbanColumn
                title="1. Nouveaux Prospects"
                subtitle="À appeler en priorité"
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
                      nextLabel="Envoyer Maquette →"
                      onWin={() => moveStage(lead.id, "won")}
                      onPdf={() => generatePdfQuote(lead)}
                    />
                  ))}
              </KanbanColumn>

              {/* Column 2: Maquette Envoyée */}
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
                      nextLabel="Négocier / Objections →"
                      onWin={() => moveStage(lead.id, "won")}
                      onPdf={() => generatePdfQuote(lead)}
                    />
                  ))}
              </KanbanColumn>

              {/* Column 3: Négociation & Réfractaires */}
              <KanbanColumn
                title="3. Chaud & Objections"
                subtitle="Phase de closing décisive"
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

              {/* Column 4: Gagné / Signé */}
              <KanbanColumn
                title="4. Contrats Signés 🎉"
                subtitle="Encaissé & En production"
                color="border-emerald-500/30 bg-emerald-500/5"
                dotColor="bg-emerald-400"
                count={filteredLeads.filter((l) => l.stage === "won").length}
              >
                {filteredLeads
                  .filter((l) => l.stage === "won")
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-emerald-500/30 hover:border-emerald-400/50 transition-all shadow-md group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none" />
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-base">{lead.sectorIcon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {lead.value.toLocaleString("fr-FR")} € Validé
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{lead.name}</h4>
                      <p className="text-xs text-white/50">{lead.contact}</p>

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
                          Com. {Math.round(lead.value * 0.25)} €
                        </span>
                      </div>
                    </div>
                  ))}
              </KanbanColumn>
            </div>
          </div>
        )}

        {/* TAB 2: COCKPIT D'APPEL ET SCRIPT ANTI-OBJECTIONS */}
        {activeTab === "cockpit" && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 4 cols: Lead Selector */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4">
                <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  Prospect à Appeler Maintenant
                </h3>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {leads.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setActiveLeadForCockpit(l)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        activeLeadForCockpit.id === l.id
                          ? "bg-amber-400/10 border-amber-400/40 shadow-sm"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>{l.sectorIcon}</span>
                          {l.name}
                        </span>
                        <span className="text-[11px] font-semibold text-amber-300">
                          {l.value} €
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50 mt-1 truncate">{l.contact} · {l.phone}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 8 cols: Live Script and Objection Solver */}
            <div className="lg:col-span-8 space-y-6">
              {/* Active Lead Header Bar */}
              <div className="bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/[0.1] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeLeadForCockpit.sectorIcon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-white">{activeLeadForCockpit.name}</h2>
                      <p className="text-xs text-white/60">
                        Contact : <strong className="text-white">{activeLeadForCockpit.contact}</strong> · Tél :{" "}
                        <span className="text-amber-300 font-mono font-medium">{activeLeadForCockpit.phone}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-xs border border-amber-500/20">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Faille détectée : {activeLeadForCockpit.issue}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${activeLeadForCockpit.phone.replace(/\s+/g, "")}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Lancer Appel
                  </a>
                  <a
                    href={`https://wa.me/${activeLeadForCockpit.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Bonjour ${activeLeadForCockpit.contact}, c'est l'équipe XR Agency. Comme convenu, voici le lien de la maquette personnalisée préparée pour ${activeLeadForCockpit.name} : https://xragencyai.com/realisations`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] text-white font-medium text-xs px-4 py-2.5 rounded-xl border border-white/10 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    WhatsApp
                  </a>
                  <button
                    onClick={() => generatePdfQuote(activeLeadForCockpit)}
                    className="inline-flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.12] text-white font-medium text-xs px-4 py-2.5 rounded-xl border border-white/10 transition-all"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    Devis PDF
                  </button>
                  <button
                    onClick={() => moveStage(activeLeadForCockpit.id, "won")}
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
                    Script d'Accroche 30 Secondes (Sans Résistance)
                  </h3>
                  <span className="text-[11px] text-white/40">À lire avec enthousiasme et calme</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs sm:text-sm text-white/90 leading-relaxed font-mono">
                  « Bonjour <strong className="text-amber-300">{activeLeadForCockpit.contact}</strong>, c'est [Votre Prénom] de XR Agency à Paris. Je vous appelle très rapidement car nous venons d'auditer les commerces de votre secteur sur votre ville. <br /><br />
                  J'ai remarqué un point critique sur le site de <strong className="text-amber-300">{activeLeadForCockpit.name}</strong> : <span className="text-amber-200">{activeLeadForCockpit.issue}</span>. <br /><br />
                  Plutôt que de vous faire un long discours, notre studio a déjà modélisé une maquette 2026 interactive prête à l'emploi. Je peux vous l'envoyer directement en 15 secondes sur votre WhatsApp pour que vous jetiez un œil ? »
                </div>
              </div>

              {/* Objection Solver Cards */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Bouclier Anti-Objections (La Réplique Immédiate)
                </h3>
                <div className="space-y-3">
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
          </div>
        )}

        {/* TAB 3: FINANCES & COMMISSIONS */}
        {activeTab === "finances" && (
          <div className="mt-6 space-y-6">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Chiffre d'Affaires Encaissé</p>
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
                  {stats.totalWon.toLocaleString("fr-FR")} €
                </h3>
                <p className="text-[11px] text-white/40 mt-1">Sur 30 jours glissants</p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Pipeline Actif en Cours</p>
                <h3 className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
                  {stats.totalPipeline.toLocaleString("fr-FR")} €
                </h3>
                <p className="text-[11px] text-white/40 mt-1">Deals chauds & maquettes envoyées</p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Commissions d'Équipe</p>
                <h3 className="text-2xl sm:text-3xl font-black text-violet-400 mt-2">
                  {(stats.lucasCommission + stats.christelCommission + stats.martinCommission).toLocaleString("fr-FR")} €
                </h3>
                <p className="text-[11px] text-white/40 mt-1">Prêtes à être débloquées</p>
              </div>
            </div>

            {/* Closers Breakdown */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                Tableau des Rémunérations & Closers
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-semibold">Membre / Rôle</th>
                      <th className="pb-3 font-semibold">Règle de Commission</th>
                      <th className="pb-3 font-semibold">CA Signé Ce Mois</th>
                      <th className="pb-3 font-semibold">Gains Validés</th>
                      <th className="pb-3 font-semibold text-right">Statut Paiement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    <tr>
                      <td className="py-3.5 font-bold text-white flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">L</span>
                        Lucas Mercier
                      </td>
                      <td className="py-3.5 text-white/60">Closer B2B (30% net sur vente directe)</td>
                      <td className="py-3.5 text-white font-mono">2 800 €</td>
                      <td className="py-3.5 font-bold text-emerald-400 font-mono">{stats.lucasCommission} €</td>
                      <td className="py-3.5 text-right">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold text-[10px] border border-emerald-500/20">
                          Prêt à virement
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-bold text-white flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center text-[10px]">C</span>
                        Christel Thirion
                      </td>
                      <td className="py-3.5 text-white/60">Closer B2B (20% net + bonus)</td>
                      <td className="py-3.5 text-white font-mono">2 650 €</td>
                      <td className="py-3.5 font-bold text-emerald-400 font-mono">{stats.christelCommission} €</td>
                      <td className="py-3.5 text-right">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold text-[10px] border border-emerald-500/20">
                          Prêt à virement
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-bold text-white flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px]">M</span>
                        Martin (Manager RH)
                      </td>
                      <td className="py-3.5 text-white/60">10% sur recrues + 20% closing direct</td>
                      <td className="py-3.5 text-white font-mono">3 800 €</td>
                      <td className="py-3.5 font-bold text-emerald-400 font-mono">{stats.martinCommission} €</td>
                      <td className="py-3.5 text-right">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold text-[10px] border border-emerald-500/20">
                          Prêt à virement
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: XR SCHOOL (MÉTHODE EXPRESS) */}
        {activeTab === "school" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Règle N°1
              </span>
              <h4 className="text-base font-bold text-white">Le Diagnostic Flash (2 Minutes Chrono)</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Ne proposez jamais un "site web". Les clients reçoivent 10 appels par jour pour ça. Proposez-lui de résoudre son <strong>problème de fuite de clients</strong> : absence de réservation en ligne, lenteur sur smartphone ou fiche Google Maps introuvable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Règle N°2
              </span>
              <h4 className="text-base font-bold text-white">L'Effet Démo WhatsApp</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Au lieu de débattre au téléphone, envoyez immédiatement le lien de la maquette par WhatsApp. Quand le gérant voit son propre logo et son commerce modélisé avec un design 2026, l'effet de surprise fait 80% du travail de closing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                Règle N°3
              </span>
              <h4 className="text-base font-bold text-white">L'Offre 3x Sans Frais</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                90% des refus sur le tarif disparaissent dès que vous proposez le 3x sans frais (ex: 499 € / mois pendant 3 mois). Pour un commerce, 499 € est absorbé dès le premier week-end.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Règle N°4
              </span>
              <h4 className="text-base font-bold text-white">Le Closing Sans Pression</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Ne forcez jamais la main. Concluez toujours avec une question binaire rassurante : <em>« Si la démo vous plaît, nous vous livrons la clé en main d'ici vendredi. On valide ensemble ? »</em>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MODAL EXPRESS: NOUVEAU PROSPECT FLASH (5s) */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#10141d] border border-white/[0.12] rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Ajout Express de Prospect (5s)
              </h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-white/60 uppercase">Nom de l'Entreprise</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Brasserie Saint-Germain"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Contact</label>
                  <input
                    type="text"
                    placeholder="Ex: Jean Dupont"
                    value={newLeadContact}
                    onChange={(e) => setNewLeadContact(e.target.value)}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Téléphone</label>
                  <input
                    type="text"
                    placeholder="06 12 34 56 78"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Secteur</label>
                  <select
                    value={newLeadSector}
                    onChange={(e) => setNewLeadSector(e.target.value)}
                    className="w-full mt-1 bg-[#151923] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Restauration">Restauration</option>
                    <option value="Santé">Santé / Dentiste</option>
                    <option value="BTP">BTP / Artisan</option>
                    <option value="Immobilier">Immobilier</option>
                    <option value="Luxe">Luxe / Nautisme</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Valeur Deal (€)</label>
                  <input
                    type="number"
                    value={newLeadValue}
                    onChange={(e) => setNewLeadValue(Number(e.target.value))}
                    className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 uppercase">Problème à régler</label>
                <input
                  type="text"
                  placeholder="Ex: Site lent, pas adapté aux smartphones"
                  value={newLeadIssue}
                  onChange={(e) => setNewLeadIssue(e.target.value)}
                  className="w-full mt-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 flex gap-2">
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
                  Enregistrer Prospect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Kanban Column Component
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

// Individual Lead Card Component
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
  return (
    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all shadow-sm group">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-base">{lead.sectorIcon}</span>
        <span className="text-xs font-bold text-amber-300 font-mono">
          {lead.value.toLocaleString("fr-FR")} €
        </span>
      </div>

      <h4 className="font-bold text-xs text-white group-hover:text-amber-200 transition-colors">
        {lead.name}
      </h4>
      <p className="text-[11px] text-white/60">{lead.contact} · {lead.phone}</p>

      <div className="mt-2.5 p-2 rounded-lg bg-black/30 border border-white/[0.04] text-[10px] text-white/70 leading-relaxed">
        {lead.issue}
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
