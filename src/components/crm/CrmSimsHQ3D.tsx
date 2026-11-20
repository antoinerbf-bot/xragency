import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Crown,
  Trophy,
  Swords,
  Target,
  Sparkles,
  Flame,
  Check,
  Plus,
  Trash2,
  Lock,
  Coins,
  Zap,
  Gamepad2,
  PhoneCall,
  CheckCircle2,
  Briefcase,
  Volume2,
  VolumeX,
  LogOut,
  X,
  MessageCircle,
  Camera,
  Users,
  FileText,
  Laptop,
  ShoppingBag,
  Calendar,
  Upload,
  Monitor,
  Armchair,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  CrmClientRecord,
  CrmInvoiceRecord,
  CrmLead,
  CrmProjectRecord,
  CrmQuoteRecord,
  CrmTaskRecord,
  LeadStatus,
} from "@/routes/api/crm";
import type { CrmTodo } from "./CrmBossDashboard";
import {
  type SimsAvatarConfig,
  loadSavedAvatarConfig,
  saveAvatarConfig,
} from "./CharacterSelectLogin";
import { CrmHrDashboard } from "./CrmHrDashboard";

interface CrmSimsHQ3DProps {
  user: {
    id?: string;
    fullName: string;
    email: string;
    role: string;
    portalType?: string;
    title?: string;
    commissionPct?: number;
    recruitedBy?: string;
  };
  leads?: CrmLead[];
  clients?: CrmClientRecord[];
  quotes?: CrmQuoteRecord[];
  invoices?: CrmInvoiceRecord[];
  projects?: CrmProjectRecord[];
  tasks?: CrmTaskRecord[];
  todos?: CrmTodo[];
  members?: { id: string; fullName: string; email: string; title: string; role: string }[];
  onToggleTodo?: (id: string) => void;
  onAddTodo?: (todo: Omit<CrmTodo, "id" | "createdAt">) => void;
  onDeleteTodo?: (id: string) => void;
  onDispatchLead?: (leadId: string, memberIdOrEmail: string) => void;
  onUpdateLeadStatus?: (leadId: string, status: LeadStatus) => void;
  onOpenCallModal?: (lead: CrmLead) => void;
  onOpenWhatsappModal?: (lead: CrmLead) => void;
  onCreateQuote?: (lead?: CrmLead) => void;
  onValidatePayment?: (invoiceId: string) => void;
  onLogout: () => void;
  onSwitchToProCockpit?: () => void;
  onOpenHrSupervision?: () => void;
}

// ── SYNTHÉTISEUR AUDIO WEB AUDIO ──
class SimsAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
  }

  playStep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(140 + Math.random() * 30, now);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  playInteract() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [440, 659.25, 880].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.07, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.18);
      });
    } catch {}
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.11, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.38);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.42);
      });
    } catch {}
  }
}

const simsAudio = new SimsAudioEngine();

// ── COORDONNÉES EXACTES CALÉES SUR L'IMAGE 3D DU PENTHOUSE MIAMI ──
interface PenthouseZone {
  id: string;
  number: number;
  name: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  floor: 1 | 2;
  description: string;
  computerTitle: string;
  roleAccess?: "admin" | "hr" | "all";
}

const PENTHOUSE_ZONES: PenthouseZone[] = [
  {
    id: "lobby",
    number: 1,
    name: "Accueil & Lobby",
    label: "Accueil & Lobby",
    icon: "🛡️",
    x: 57,
    y: 48,
    floor: 1,
    description: "Comptoir central en marbre noir XR AGENCY · Capture express de prospects & dispatch.",
    computerTitle: "TERMINAL D'ACCUEIL & DISPATCH PROSPECTS",
    roleAccess: "all",
  },
  {
    id: "commercial",
    number: 2,
    name: "Pôle Commercial",
    label: "Pôle Commercial",
    icon: "🎯",
    x: 23,
    y: 38,
    floor: 1,
    description: "Bureaux des Closers face à la baie de Miami · Appels, WhatsApp 1-clic & Coffre privé.",
    computerTitle: "ORDINATEUR DE BUREAU CLOSER · PIPELINE & COFFRE",
    roleAccess: "all",
  },
  {
    id: "creative",
    number: 3,
    name: "Studio Créatif",
    label: "Studio Créatif",
    icon: "🎨",
    x: 49,
    y: 15,
    floor: 1,
    description: "Mezzanine Design & Lab R&D · Maquettes 24h, Audits Google Maps & Robotique.",
    computerTitle: "STATION STUDIO CRÉATIF · MAQUETTES 24H & R&D",
    roleAccess: "all",
  },
  {
    id: "direction",
    number: 4,
    name: "Direction",
    label: "Direction",
    icon: "👑",
    x: 75,
    y: 16,
    floor: 1,
    description: "Bureau Présidentiel d'Antoine · To-Do Perso & Achats, Planning Pro/Perso, Devis & RIB.",
    computerTitle: "ORDINATEUR DU DIRECTEUR · VIE PRO, TO-DO PERSO & ACHATS",
    roleAccess: "admin",
  },
  {
    id: "hr_martin",
    number: 5,
    name: "Bureau RH Martin",
    label: "Bureau RH (Martin)",
    icon: "👥",
    x: 35,
    y: 23,
    floor: 1,
    description: "Bureau exclusif de Martin · Recrutements, Formation 90j, Plannings & 10% sur le CA des recrues.",
    computerTitle: "ORDINATEUR RH MARTIN · RECRUTEMENT, FORMATION & 10% CA",
    roleAccess: "hr",
  },
  {
    id: "meeting",
    number: 6,
    name: "Salle de Réunion",
    label: "Salle de Réunion",
    icon: "📅",
    x: 75,
    y: 35,
    floor: 1,
    description: "Salle de conférence vitrée · Planning global, Dual Clocks (Paris / Miami / Dubaï).",
    computerTitle: "ÉCRAN SALLE DE RÉUNION · PLANNINGS & FUSEAUX HORAIRES",
    roleAccess: "all",
  },
  {
    id: "lounge",
    number: 7,
    name: "Espace Détente",
    label: "Espace Détente",
    icon: "💬",
    x: 77,
    y: 47,
    floor: 1,
    description: "Canapés lounge & pause café · Récupération mentale et cohésion d'équipe.",
    computerTitle: "ESPACE DÉTENTE & PAUSE ÉNERGIE",
    roleAccess: "all",
  },
  {
    id: "fitness",
    number: 8,
    name: "Sport & Bien-être",
    label: "Sport & Bien-être",
    icon: "🏋️",
    x: 94,
    y: 36,
    floor: 1,
    description: "Salle de sport privée · Recharge d'énergie vitale à 100 ⚡ pour tenir la cadence.",
    computerTitle: "STATION SPORT & BIEN-ÊTRE DU DIRIGEANT",
    roleAccess: "all",
  },
];

interface PersonalItem {
  id: string;
  type: "todo_perso" | "achat" | "planning_pro" | "planning_perso";
  title: string;
  detail: string;
  done: boolean;
}

export function CrmSimsHQ3D({
  user,
  leads = [],
  clients = [],
  quotes = [],
  invoices = [],
  projects = [],
  tasks = [],
  todos = [],
  members = [],
  onToggleTodo,
  onAddTodo,
  onDeleteTodo,
  onDispatchLead,
  onUpdateLeadStatus,
  onOpenCallModal,
  onOpenWhatsappModal,
  onCreateQuote,
  onValidatePayment,
  onLogout,
  onSwitchToProCockpit,
}: CrmSimsHQ3DProps) {
  const isDirector = user.role === "admin" || user.portalType === "director";
  const isMartin =
    user.id === "mem-martin" ||
    user.portalType === "hr_manager" ||
    user.email.toLowerCase() === "martin.leclipteur@gmail.com" ||
    user.email.toLowerCase() === "martin@xragency.fr";
  const isChristel =
    user.id === "mem-christel" || user.email.toLowerCase() === "christelthirion@msn.com";

  // ── AVATAR PERSONNALISÉ À L'EFFIGIE DE L'UTILISATEUR ──
  const [avatarConfig, setAvatarConfig] = useState<SimsAvatarConfig>(() => loadSavedAvatarConfig());

  // Position de départ de l'avatar sur le sol en marbre (exactement comme sur l'image)
  const [playerPos, setPlayerPos] = useState({ x: 39, y: 74 });
  const [playerFacing, setPlayerFacing] = useState<"front" | "back" | "left" | "right">("back");
  const [isWalking, setIsWalking] = useState(false);
  const [isSittingAtDesk, setIsSittingAtDesk] = useState(false);
  const [cameraMode, setCameraMode] = useState<"third_person" | "isometric">("third_person");
  const [activeFloor, setActiveFloor] = useState<1 | 2>(1);
  const [activeZoneModal, setActiveZoneModal] = useState<string | null>(null);

  // ── ONGLET INTERNE DE L'ORDINATEUR DU DIRECTEUR ──
  const [directorComputerTab, setDirectorComputerTab] = useState<
    "perso_achats" | "pro_dispatch" | "hr_martin"
  >("perso_achats");

  // ── LISTE PERSONNELLE DU DIRECTEUR (TO-DO PERSO, CHOSES À ACHETER, PLANNING PRO & PERSO) ──
  const [personalItems, setPersonalItems] = useState<PersonalItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("xr_director_personal_organizer_v15");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        id: "p1",
        type: "todo_perso",
        title: "Séance sport & cardio 18h30",
        detail: "Priorité santé & énergie quotidienne",
        done: false,
      },
      {
        id: "p2",
        type: "achat",
        title: "Acheter nouvel écran incurvé 4K + équipements studio",
        detail: "Liste d'achats personnels & bureau",
        done: false,
      },
      {
        id: "p3",
        type: "achat",
        title: "Réserver billets & hôtel déplacement Miami / Dubaï",
        detail: "Achats & voyages",
        done: false,
      },
      {
        id: "p4",
        type: "planning_pro",
        title: "10h00 : Point RH avec Martin (Suivi Christel & Camille)",
        detail: "Planning Professionnel",
        done: false,
      },
      {
        id: "p5",
        type: "planning_pro",
        title: "14h30 : Validation des maquettes 24h & virements RIB",
        detail: "Planning Professionnel",
        done: false,
      },
      {
        id: "p6",
        type: "planning_perso",
        title: "20h30 : Dîner & soirée déconnexion totale",
        detail: "Planning Personnel",
        done: false,
      },
    ];
  });

  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemType, setNewItemType] = useState<PersonalItem["type"]>("todo_perso");
  const [newItemDetail, setNewItemDetail] = useState("");

  const savePersonalItems = (next: PersonalItem[]) => {
    setPersonalItems(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("xr_director_personal_organizer_v15", JSON.stringify(next));
      } catch {}
    }
  };

  const handleAddPersonalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    const item: PersonalItem = {
      id: `pi-${Date.now()}`,
      type: newItemType,
      title: newItemTitle.trim(),
      detail:
        newItemDetail.trim() ||
        (newItemType === "achat"
          ? "À acheter"
          : newItemType === "todo_perso"
            ? "To-Do Perso"
            : "Planning"),
      done: false,
    };
    savePersonalItems([item, ...personalItems]);
    setNewItemTitle("");
    setNewItemDetail("");
    simsAudio.playVictory();
  };

  // ── DEVISES & GAMIFICATION ──
  const [gems, setGems] = useState(480);
  const [coins, setCoins] = useState(12500);
  const [energy, setEnergy] = useState(100);
  const [playerXp, setPlayerXp] = useState(1250);
  const maxXp = 2000;
  const playerLevel = 8;

  // Bureau principal attitré selon la personne connectée
  const myAssignedOffice = useMemo(() => {
    if (isDirector) return PENTHOUSE_ZONES.find((z) => z.id === "direction")!;
    if (isMartin) return PENTHOUSE_ZONES.find((z) => z.id === "hr_martin")!;
    return PENTHOUSE_ZONES.find((z) => z.id === "commercial")!;
  }, [isDirector, isMartin]);

  // Station la plus proche de l'avatar
  const nearbyZone = useMemo(() => {
    return PENTHOUSE_ZONES.find((z) => {
      const dist = Math.hypot(z.x - playerPos.x, z.y - playerPos.y);
      return dist <= 16;
    });
  }, [playerPos]);

  const [soundEnabled, setSoundEnabled] = useState(true);
  useEffect(() => {
    simsAudio.enabled = soundEnabled;
  }, [soundEnabled]);

  // ── FORMULAIRE NOUVEAU LEAD EXPRESS DANS LE LOBBY ──
  const [newLCompany, setNewLCompany] = useState("");
  const [newLPhone, setNewLPhone] = useState("");
  const [newLContact, setNewLContact] = useState("");
  const [newLService, setNewLService] = useState("Site Vitrine Pro (499 €)");
  const [newLBudget, setNewLBudget] = useState(499);

  // ── ASSISTANT IA ──
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiChatLogs, setAiChatLogs] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: `Bonjour ${user.fullName}. Votre avatar est prêt dans le Penthouse 3D. Dirigez-vous vers votre bureau (${myAssignedOffice.name}) et appuyez sur [E] pour vous asseoir devant votre ordinateur de travail.`,
    },
  ]);

  const pendingInvoices = useMemo(
    () => invoices.filter((i) => i.status === "pending_transfer"),
    [invoices],
  );
  const urgentLeads = useMemo(
    () => leads.filter((l) => l.priority === "urgent" || l.status === "to_call"),
    [leads],
  );

  // Calcul de la commission d'un lead selon la personne connectée
  const computeMyCommissionForLead = useCallback(
    (lead: CrmLead) => {
      const s = (lead.serviceTarget || "").toLowerCase();
      const isWebsite =
        (s.includes("site") ||
          s.includes("vitrine") ||
          s.includes("e-commerce") ||
          s.includes("ecommerce") ||
          s.includes("refonte") ||
          s.includes("web")) &&
        !s.includes("webcare");

      if (isChristel) {
        const rate = isWebsite ? 20 : 10;
        return {
          rate,
          amount: Math.round(((lead.budgetEur || 0) * rate) / 100),
          label: isWebsite ? "20% Site (Christel)" : "10% Maps/CRM/Mensuel (Christel)",
        };
      }
      if (user.recruitedBy === "mem-martin" || isMartin) {
        return {
          rate: 20,
          amount: Math.round(((lead.budgetEur || 0) * 20) / 100),
          label: "20% (Filière Martin)",
        };
      }
      const rate = isWebsite ? 30 : s.includes("crm") || s.includes("pos") ? 20 : 10;
      return {
        rate,
        amount: Math.round(((lead.budgetEur || 0) * rate) / 100),
        label: `${rate}% (Barème Classique)`,
      };
    },
    [isChristel, isMartin, user.recruitedBy],
  );

  // Vérification des droits d'accès à un bureau avant de s'asseoir devant l'ordinateur
  const openOfficeComputer = useCallback(
    (zoneId: string) => {
      if (zoneId === "direction" && !isDirector) {
        alert("🔒 Accès refusé : Seul le Directeur Général (Antoine) peut accéder au Bureau Direction.");
        return;
      }
      if (zoneId === "hr_martin" && !isDirector && !isMartin) {
        alert(
          "🔒 Accès refusé : Le Bureau RH est strictement réservé à Martin et à la Direction Générale.",
        );
        return;
      }
      simsAudio.playInteract();
      setIsSittingAtDesk(true);
      setActiveZoneModal(zoneId);
    },
    [isDirector, isMartin],
  );

  // Déplacement de l'avatar dans le Penthouse
  const moveAvatar = useCallback(
    (dx: number, dy: number, facing: "front" | "back" | "left" | "right") => {
      setIsSittingAtDesk(false);
      setPlayerFacing(facing);
      setIsWalking(true);
      simsAudio.playStep();
      setTimeout(() => setIsWalking(false), 160);

      setPlayerPos((prev) => ({
        x: Math.max(10, Math.min(92, prev.x + dx)),
        y: Math.max(16, Math.min(86, prev.y + dy)),
      }));
    },
    [],
  );

  // Marcher vers un bureau et s'asseoir devant l'ordinateur
  const walkToOfficeAndSit = useCallback(
    (zone: PenthouseZone) => {
      simsAudio.playStep();
      setPlayerFacing(zone.y < playerPos.y ? "back" : "front");
      setIsWalking(true);
      setPlayerPos({ x: zone.x, y: Math.min(84, zone.y + 8) });
      setTimeout(() => {
        setIsWalking(false);
        openOfficeComputer(zone.id);
      }, 280);
    },
    [openOfficeComputer, playerPos.y],
  );

  // Raccourcis clavier (Z/Q/S/D, Flèches, E pour s'asseoir à l'ordi, M, P, C, G, Tab, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const step = 4;
      switch (e.key) {
        case "ArrowUp":
        case "z":
        case "Z":
        case "w":
        case "W":
          e.preventDefault();
          moveAvatar(0, -step, "back");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          moveAvatar(0, step, "front");
          break;
        case "ArrowLeft":
        case "q":
        case "Q":
        case "a":
        case "A":
          e.preventDefault();
          moveAvatar(-step, 0, "left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          moveAvatar(step, 0, "right");
          break;
        case "e":
        case "E":
          e.preventDefault();
          if (nearbyZone) {
            openOfficeComputer(nearbyZone.id);
          } else {
            walkToOfficeAndSit(myAssignedOffice);
          }
          break;
        case "m":
        case "M":
        case "p":
        case "P":
          e.preventDefault();
          openOfficeComputer("commercial");
          break;
        case "g":
        case "G":
        case "c":
        case "C":
          e.preventDefault();
          simsAudio.playInteract();
          setCameraMode((prev) => (prev === "third_person" ? "isometric" : "third_person"));
          break;
        case "Escape":
          e.preventDefault();
          setIsSittingAtDesk(false);
          setActiveZoneModal(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveAvatar, nearbyZone, openOfficeComputer, walkToOfficeAndSit, myAssignedOffice]);

  // Upload photo de visage dans le vestiaire
  const handleAvatarPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const updated = { ...avatarConfig, customFacePhotoUrl: reader.result };
        setAvatarConfig(updated);
        saveAvatarConfig(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative h-screen w-full select-none overflow-hidden bg-[#06050c] font-sans text-white">
      {/* ══════════════════════════════════════════════════════════════════════════
          1. SCÈNE 3D PHOTORÉALISTE DU PENTHOUSE MIAMI (VOTRE RENDU GRAPHIQUE EXACT)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-700 ease-out cursor-pointer",
          cameraMode === "isometric" ? "scale-[0.92] brightness-105" : "scale-100",
        )}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = ((e.clientX - rect.left) / rect.width) * 100;
          const clickY = ((e.clientY - rect.top) / rect.height) * 100;
          if (clickY > 15 && clickY < 90 && clickX > 6 && clickX < 94) {
            setIsSittingAtDesk(false);
            setPlayerFacing(clickY < playerPos.y ? "back" : "front");
            setIsWalking(true);
            setPlayerPos({ x: Math.round(clickX), y: Math.round(clickY) });
            simsAudio.playStep();
            setTimeout(() => setIsWalking(false), 220);
          }
        }}
      >
        {/* Image 3D Haute Définition du Penthouse de Miami */}
        <img
          src="/images/xr-sims-hq-3d.jpg"
          alt="XR Agency Sims HQ 3D v1.5 Miami Penthouse"
          className="h-full w-full object-cover object-center pointer-events-none select-none"
        />

        {/* Effet d'éclairage ambiant néon dynamique */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25 pointer-events-none" />

        {/* ── BALISES INTERACTIVES 3D DES BUREAUX (CLIQUEZ POUR MARCHER & S'ASSEOIR À L'ORDI) ── */}
        {PENTHOUSE_ZONES.map((zone) => {
          // Masquer le bureau RH pour les personnes qui ne sont ni Martin ni Directeur
          if (zone.id === "hr_martin" && !isDirector && !isMartin) return null;

          const isNearby = nearbyZone?.id === zone.id;
          const isMyDesk = myAssignedOffice.id === zone.id;

          return (
            <div
              key={zone.id}
              onClick={(e) => {
                e.stopPropagation();
                walkToOfficeAndSit(zone);
              }}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group flex flex-col items-center"
            >
              {/* Icône ronde violette lumineuse style Sims 3D */}
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border-2 backdrop-blur-xl transition-all duration-300",
                  isNearby
                    ? "border-amber-300 bg-purple-600/90 scale-115 shadow-[0_0_30px_rgba(251,191,36,0.9)] animate-bounce"
                    : isMyDesk
                      ? "border-emerald-400 bg-purple-700/85 shadow-[0_0_25px_rgba(52,211,153,0.7)] hover:scale-110"
                      : "border-purple-400/80 bg-[#24134a]/80 hover:border-white hover:scale-110 shadow-[0_0_20px_rgba(168,85,247,0.65)]",
                )}
              >
                <span className="text-lg">{zone.icon}</span>
              </div>

              {/* Nom du bureau */}
              <span className="mt-1 rounded-full bg-black/75 border border-white/15 px-3 py-0.5 text-xs font-black tracking-wide text-white shadow-lg backdrop-blur-md whitespace-nowrap">
                {zone.label}
                {isMyDesk && (
                  <span className="ml-1.5 text-[9px] font-mono text-emerald-300 uppercase">
                    (Mon Bureau)
                  </span>
                )}
              </span>

              {/* Bouton [E] S'asseoir devant l'ordinateur */}
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 rounded-full border px-2.5 py-0.5 backdrop-blur-md transition",
                  isNearby
                    ? "border-amber-400 bg-amber-400 text-black font-black shadow-[0_0_15px_#fbbf24]"
                    : "border-white/20 bg-black/70 text-white/90 group-hover:border-purple-400",
                )}
              >
                <span className="rounded bg-white/20 px-1 font-mono text-[9px] font-black">E</span>
                <span className="text-[10px] font-bold">
                  {isNearby ? "S'asseoir à l'Ordi" : "Interagir"}
                </span>
              </div>
            </div>
          );
        })}

        {/* ── AVATAR 3D PERSONNALISÉ À L'EFFIGIE DE L'UTILISATEUR (SE DÉPLACE DANS LES BUREAUX) ── */}
        <div
          style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-full transition-all duration-300 pointer-events-none z-30",
            isWalking ? "scale-105 -translate-y-[104%]" : "scale-100",
          )}
        >
          {/* Badge de nom au-dessus de l'avatar */}
          <div className="mb-1.5 flex flex-col items-center">
            <div className="rounded-full border border-amber-400/70 bg-black/85 px-3 py-0.5 text-[11px] font-black text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)] whitespace-nowrap flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{avatarConfig.displayName || user.fullName}</span>
            </div>
          </div>

          {/* Ombre portée sur le marbre */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-black/75 blur-sm" />

          {/* Corps 3D de l'avatar avec son effigie et son blouson XR AGENCY */}
          <div className="relative flex flex-col items-center">
            {avatarConfig.accessory === "neon_aura" && (
              <div className="absolute -inset-3 rounded-full bg-purple-500/35 blur-xl animate-pulse" />
            )}

            {/* Tête / Effigie Photo ou Visage 3D */}
            <div
              className="relative h-12 w-11 rounded-2xl border-2 border-amber-300/80 shadow-lg overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: avatarConfig.skinTone }}
            >
              {avatarConfig.customFacePhotoUrl ? (
                <img
                  src={avatarConfig.customFacePhotoUrl}
                  alt="Effigie"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center w-full h-full">
                  <div
                    className={cn(
                      "w-full h-4",
                      avatarConfig.hairStyle === "blonde_exec"
                        ? "bg-amber-300"
                        : avatarConfig.hairStyle === "xr_cap"
                          ? "bg-purple-700"
                          : "bg-[#1a1310]",
                    )}
                  />
                  {playerFacing !== "back" && (
                    <div className="mt-1.5 flex gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Blouson Bombardier Cuir Noir XR AGENCY / Costume */}
            <div
              className={cn(
                "relative -mt-0.5 h-16 w-16 rounded-2xl border flex flex-col items-center justify-center shadow-2xl",
                avatarConfig.outfit === "bomber_xr" &&
                  "bg-gradient-to-b from-[#1e2026] via-[#111217] to-[#08090c] border-white/30",
                avatarConfig.outfit === "suit_gold" &&
                  "bg-gradient-to-b from-amber-600 via-amber-800 to-black border-amber-300",
                avatarConfig.outfit === "blazer_miami" &&
                  "bg-gradient-to-b from-slate-100 to-slate-300 border-amber-400 text-black",
                avatarConfig.outfit === "cyber_neon" &&
                  "bg-gradient-to-b from-purple-700 via-indigo-950 to-black border-cyan-400",
              )}
            >
              <span
                className={cn(
                  "font-black text-sm tracking-wider leading-none",
                  avatarConfig.outfit === "blazer_miami" ? "text-black" : "text-white",
                )}
              >
                XR
              </span>
              <span
                className={cn(
                  "font-mono text-[6px] tracking-[0.22em] mt-0.5",
                  avatarConfig.outfit === "blazer_miami" ? "text-black/80" : "text-white/85",
                )}
              >
                AGENCY
              </span>
            </div>

            {/* Jambes */}
            <div className="flex gap-1.5 -mt-0.5">
              <div
                className={cn(
                  "h-11 w-4 rounded-b-md bg-[#0d0f16] border-x border-white/10 transition-transform",
                  isWalking && "translate-y-1",
                )}
              />
              <div
                className={cn(
                  "h-11 w-4 rounded-b-md bg-[#0d0f16] border-x border-white/10 transition-transform",
                  isWalking && "-translate-y-1",
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          2. TOP-BAR HUD : IDENTIQUE À VOTRE IMAGE DE RÉFÉRENCE
          ══════════════════════════════════════════════════════════════════════════ */}
      <header className="absolute top-0 inset-x-0 z-40 flex flex-wrap items-center justify-between gap-3 p-4 pointer-events-none">
        {/* Coin Haut Gauche : XR AGENCY SIMS HQ 3D v1.5 */}
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/15 bg-black/65 px-4 py-2.5 backdrop-blur-2xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-black text-2xl tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                XR AGENCY SIMS
              </span>
              <span className="font-mono text-sm font-black text-purple-300">HQ 3D v1.5</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs">🌴</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-300">
                MIAMI PENTHOUSE HQ
              </span>
            </div>
          </div>

          {/* Bouton direct : S'asseoir à mon bureau devant mon ordi */}
          <button
            type="button"
            onClick={() => walkToOfficeAndSit(myAssignedOffice)}
            className="ml-2 inline-flex items-center gap-2 rounded-xl border border-emerald-400/60 bg-emerald-500/25 px-3.5 py-2 text-xs font-black text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.4)] transition hover:bg-emerald-400 hover:text-black"
          >
            <Monitor className="h-4 w-4" />
            <span>💻 S'asseoir à mon Bureau ({myAssignedOffice.label})</span>
          </button>
        </div>

        {/* Coin Haut Droit : Avatar Directeur + Jauge XP + 💎 480 + 🪙 12 500 + ⚡ 100 */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-3 rounded-2xl border border-amber-400/40 bg-black/75 px-4 py-2 backdrop-blur-2xl shadow-xl">
            <div
              onClick={() => setActiveZoneModal("wardrobe")}
              title="Personnaliser mon Avatar"
              className="cursor-pointer relative h-10 w-10 rounded-full border-2 border-amber-400 overflow-hidden bg-amber-500/20 flex items-center justify-center font-black text-xs text-amber-200"
            >
              {avatarConfig.customFacePhotoUrl ? (
                <img
                  src={avatarConfig.customFacePhotoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                "XR"
              )}
            </div>
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black text-white">{user.fullName}</span>
                <span className="font-mono text-[10px] font-bold text-white/75">
                  {playerXp.toLocaleString("fr-FR")} / {maxXp.toLocaleString("fr-FR")} XP
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-amber-300">
                  Niv. {playerLevel}
                </span>
                <div className="h-2 w-28 rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300"
                    style={{ width: `${(playerXp / maxXp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Les 3 Devises : 💎 480 · 🪙 12 500 · ⚡ 100 */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-black/75 px-3.5 py-2 backdrop-blur-2xl shadow-xl">
            <div className="flex items-center gap-1.5 px-1.5">
              <span>💎</span>
              <span className="font-mono text-xs font-black text-purple-200">{gems}</span>
            </div>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-1.5 px-1.5">
              <span>🪙</span>
              <span className="font-mono text-xs font-black text-amber-300">
                {coins.toLocaleString("fr-FR")}
              </span>
            </div>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-1.5 px-1.5">
              <span>⚡</span>
              <span className="font-mono text-xs font-black text-yellow-300">{energy}</span>
            </div>
          </div>

          {/* Boutons Cockpit 2D / Son / Déconnexion */}
          <div className="flex items-center gap-1.5">
            {onSwitchToProCockpit && (
              <button
                type="button"
                onClick={onSwitchToProCockpit}
                title="Ouvrir le Cockpit Plein Écran 10 Piliers"
                className="rounded-xl border border-amber-400/50 bg-black/75 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-400 hover:text-black transition backdrop-blur-xl flex items-center gap-1.5"
              >
                <Laptop className="h-4 w-4" />
                <span className="hidden xl:inline">Cockpit Plein Écran</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="rounded-xl border border-white/15 bg-black/75 p-2.5 text-white/80 hover:text-white transition backdrop-blur-xl"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-amber-300" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={onLogout}
              title="Déconnexion"
              className="rounded-xl border border-red-500/40 bg-red-500/20 p-2.5 text-red-200 hover:bg-red-500/40 transition backdrop-blur-xl"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════════
          3. SIDEBAR GAUCHE GLASSMORPHISM (9 MENU ITEMS COMME SUR L'IMAGE)
          ══════════════════════════════════════════════════════════════════════════ */}
      <aside className="absolute top-24 left-4 z-40 flex flex-col gap-1 rounded-3xl border border-white/15 bg-black/65 p-2 backdrop-blur-2xl shadow-2xl">
        {[
          { id: "lobby", label: "Accueil (HQ)", icon: "🏠", zoneIdx: 0 },
          { id: "commercial", label: "Missions", icon: "📝", zoneIdx: 1 },
          { id: "commercial", label: "CRM & Prospects", icon: "👥", zoneIdx: 1 },
          { id: "creative", label: "Projets & Studio", icon: "💼", zoneIdx: 2 },
          { id: "meeting", label: "Calendrier", icon: "📅", zoneIdx: 5 },
          { id: "ai_assistant", label: "Assistant IA", icon: "🤖" },
          ...(isDirector
            ? [{ id: "direction", label: "Direction & Perso", icon: "👑", zoneIdx: 3 }]
            : []),
          ...(isDirector || isMartin
            ? [{ id: "hr_martin", label: "Bureau RH Martin", icon: "👥", zoneIdx: 4 }]
            : []),
          { id: "wardrobe", label: "Vestiaire Avatar", icon: "🎁" },
        ].map((item, idx) => (
          <button
            key={`${item.id}-${idx}`}
            type="button"
            onClick={() => {
              if (item.zoneIdx !== undefined) {
                walkToOfficeAndSit(PENTHOUSE_ZONES[item.zoneIdx]);
              } else {
                simsAudio.playInteract();
                setActiveZoneModal(item.id);
              }
            }}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all",
              idx === 0
                ? "bg-purple-600/50 text-white border border-purple-400/70 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                : "text-white/80 hover:bg-white/15 hover:text-white",
            )}
          >
            <span className="text-base">{item.icon}</span>
            <span className="hidden lg:inline">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* ══════════════════════════════════════════════════════════════════════════
          4. RADAR CIRCULAIRE BAS GAUCHE (HQ - ÉTAGE 1)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-5 left-5 z-40 flex flex-col items-center">
        <div className="relative h-28 w-28 rounded-full border-2 border-purple-400/70 bg-black/80 backdrop-blur-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-2 rounded-full border border-white/15" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/15" />
          <span className="absolute top-1 font-mono text-[9px] font-black text-white">N</span>

          {PENTHOUSE_ZONES.map((z) => (
            <div
              key={z.id}
              style={{
                left: `${15 + (z.x / 100) * 70}%`,
                top: `${15 + (z.y / 100) * 70}%`,
              }}
              className="absolute h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"
            />
          ))}

          <div
            style={{
              left: `${15 + (playerPos.x / 100) * 70}%`,
              top: `${15 + (playerPos.y / 100) * 70}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-purple-300 font-black text-xs drop-shadow-[0_0_6px_#fff]"
          >
            ▲
          </div>
        </div>
        <span className="mt-1.5 rounded-full bg-black/80 px-3 py-0.5 font-mono text-[10px] font-bold text-white border border-white/15">
          HQ – Étage {activeFloor}
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          5. DOCK D'ACTIONS BAS CENTRE (COMME SUR L'IMAGE)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5 rounded-3xl border border-white/20 bg-black/75 px-3 py-2 backdrop-blur-2xl shadow-2xl">
          {[
            {
              id: "missions",
              label: "Missions (M)",
              icon: "📦",
              action: () => walkToOfficeAndSit(PENTHOUSE_ZONES[1]),
            },
            {
              id: "phone",
              label: "Téléphone (P)",
              icon: "📱",
              action: () => walkToOfficeAndSit(PENTHOUSE_ZONES[1]),
            },
            {
              id: "sit_desk",
              label: "Mon Ordi (E)",
              icon: "💻",
              action: () => walkToOfficeAndSit(myAssignedOffice),
            },
            {
              id: "camera",
              label: "Caméra (C)",
              icon: "📷",
              highlight: true,
              action: () =>
                setCameraMode((prev) => (prev === "third_person" ? "isometric" : "third_person")),
            },
            {
              id: "wardrobe",
              label: "Avatar",
              icon: "🧑",
              action: () => setActiveZoneModal("wardrobe"),
            },
          ].map((act) => (
            <button
              key={act.id}
              type="button"
              onClick={act.action}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-bold transition",
                act.highlight
                  ? "bg-purple-600/60 text-white border border-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.5)]"
                  : "bg-white/5 text-white/85 hover:bg-white/15 hover:text-white border border-white/10",
              )}
            >
              <span>{act.icon}</span>
              <span className="hidden sm:inline">{act.label}</span>
            </button>
          ))}
        </div>
        <span className="rounded-full bg-black/75 px-3.5 py-0.5 font-mono text-[10px] text-white/80 border border-white/15">
          [G] Changer de caméra : {cameraMode === "third_person" ? "3e personne" : "Isométrique"} · Cliquez sur un bureau pour vous asseoir à l'ordinateur
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          6. PLAN ARCHITECTURAL 3D BAS DROITE (CLIQUEZ SUR 1 À 8 POUR Y ALLER)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-5 right-5 z-40 w-72 rounded-3xl border border-white/20 bg-black/85 p-3 backdrop-blur-2xl shadow-2xl hidden md:block">
        <div className="relative h-36 w-full rounded-2xl border border-white/15 bg-[#12131f] overflow-hidden">
          <img
            src="/images/xr-sims-hq-3d.jpg"
            alt="Minimap Plan 3D"
            className="h-full w-full object-cover opacity-35"
          />
          {PENTHOUSE_ZONES.map((z) => {
            if (z.id === "hr_martin" && !isDirector && !isMartin) return null;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => walkToOfficeAndSit(z)}
                style={{ left: `${z.x}%`, top: `${z.y}%` }}
                title={`Aller au bureau : ${z.name}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-white bg-purple-600 text-[10px] font-black text-white hover:scale-125 transition shadow-[0_0_10px_#a855f7] flex items-center justify-center"
              >
                {z.number}
              </button>
            );
          })}

          <div
            style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24] animate-ping"
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold text-white/90">
            &gt; Plan du HQ – Étage {activeFloor}
          </span>
          <button
            type="button"
            onClick={() => setActiveFloor((f) => (f === 1 ? 2 : 1))}
            className="rounded-lg border border-purple-400/50 bg-purple-600/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-purple-200 hover:bg-purple-600/50"
          >
            Étage 2 / Rooftop
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          7. ÉCRAN D'ORDINATEUR DE BUREAU LORSQUE L'AVATAR S'ASSOIT À SON POSTE
          ══════════════════════════════════════════════════════════════════════════ */}
      {activeZoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md">
          {/* Cadre Écran d'Ordinateur Incurvé 3D */}
          <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-purple-400/50 bg-gradient-to-b from-[#111322] via-[#0c0e18] to-[#080910] p-5 sm:p-7 shadow-[0_0_90px_rgba(168,85,247,0.35)]">
            {/* Barre système supérieure de l'ordinateur du bureau */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/50 bg-emerald-500/20 text-emerald-300">
                  <Monitor className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest text-emerald-300">
                      ASSIS DEVANT L'ORDINATEUR · SESSION DE {user.fullName.toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    {PENTHOUSE_ZONES.find((z) => z.id === activeZoneModal)?.computerTitle ||
                      "POSTE DE TRAVAIL XR AGENCY"}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isDirector && onSwitchToProCockpit && (
                  <button
                    type="button"
                    onClick={onSwitchToProCockpit}
                    className="rounded-xl border border-amber-400/60 bg-amber-400/20 px-3.5 py-2 text-xs font-black text-amber-200 hover:bg-amber-400 hover:text-black transition"
                  >
                    👑 Basculer sur les 10 Piliers Complets (Plein Écran)
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsSittingAtDesk(false);
                    setActiveZoneModal(null);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white hover:bg-red-500/30 hover:border-red-400 transition"
                >
                  <Armchair className="h-4 w-4" />
                  <span>Se lever du bureau (Esc)</span>
                </button>
              </div>
            </div>

            {/* ── CAS 1 : BUREAU DU DIRECTEUR (VIE PRO + TO-DO PERSO + ACHATS + PLANNING + SUPERVISION RH) ── */}
            {activeZoneModal === "direction" && isDirector && (
              <div className="space-y-6">
                {/* Sous-onglets de l'ordinateur du Directeur */}
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      id: "perso_achats",
                      label: "📝 Ma To-Do Perso, Choses à Acheter & Mon Planning Pro/Perso",
                    },
                    {
                      id: "pro_dispatch",
                      label: "👑 Pilotage Pro : Chiffre d'Affaires, Leads, Devis & RIB",
                    },
                    {
                      id: "hr_martin",
                      label: "👥 Supervision Pôle RH Martin (Christel, Camille & 10% CA)",
                    },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() =>
                        setDirectorComputerTab(t.id as typeof directorComputerTab)
                      }
                      className={cn(
                        "rounded-xl px-4 py-2.5 text-xs font-black transition",
                        directorComputerTab === t.id
                          ? "bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                          : "border border-white/15 bg-white/5 text-white/75 hover:bg-white/10",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* SOUS-ONGLET 1 : TO-DO PERSO, ACHATS & PLANNING COMPLET PRO / PERSO */}
                {directorComputerTab === "perso_achats" && (
                  <div className="space-y-6">
                    <form
                      onSubmit={handleAddPersonalItem}
                      className="rounded-2xl border border-amber-400/35 bg-black/50 p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
                    >
                      <div className="sm:col-span-3">
                        <label className="block font-mono text-[10px] uppercase text-amber-300 mb-1">
                          Catégorie
                        </label>
                        <select
                          value={newItemType}
                          onChange={(e) =>
                            setNewItemType(e.target.value as PersonalItem["type"])
                          }
                          className="w-full rounded-xl border border-white/15 bg-black/80 px-3 py-2.5 text-xs font-bold text-white outline-none focus:border-amber-400"
                        >
                          <option value="todo_perso">✅ Chose à faire (Perso)</option>
                          <option value="achat">🛍️ Chose à acheter</option>
                          <option value="planning_pro">💼 Planning Pro</option>
                          <option value="planning_perso">🌴 Planning Perso</option>
                        </select>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block font-mono text-[10px] uppercase text-white/70 mb-1">
                          Titre (Tâche, Achat, RDV...)
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Acheter montre / Point 14h / Sport..."
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full rounded-xl border border-white/15 bg-black/80 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block font-mono text-[10px] uppercase text-white/70 mb-1">
                          Horaire / Détail / Budget
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Aujourd'hui 18h / Urgent"
                          value={newItemDetail}
                          onChange={(e) => setNewItemDetail(e.target.value)}
                          className="w-full rounded-xl border border-white/15 bg-black/80 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-amber-400 py-2.5 px-4 text-xs font-black text-black hover:bg-amber-300 transition"
                        >
                          + Ajouter
                        </button>
                      </div>
                    </form>

                    {/* 3 Colonnes : To-Do Perso & Achats | Planning Pro | Planning Perso */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Colonne A : To-Do Perso & Choses à acheter */}
                      <div className="rounded-2xl border border-purple-400/30 bg-black/45 p-4 space-y-3">
                        <h3 className="text-sm font-black text-purple-300 flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4" />
                          <span>Ma To-Do Perso &amp; Choses à Acheter</span>
                        </h3>
                        <div className="space-y-2">
                          {personalItems
                            .filter((i) => i.type === "todo_perso" || i.type === "achat")
                            .map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    savePersonalItems(
                                      personalItems.map((p) =>
                                        p.id === item.id ? { ...p, done: !p.done } : p,
                                      ),
                                    )
                                  }
                                  className="flex items-start gap-2 text-left"
                                >
                                  <span
                                    className={cn(
                                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                                      item.done
                                        ? "border-emerald-400 bg-emerald-400 text-black"
                                        : "border-white/40",
                                    )}
                                  >
                                    {item.done && <Check className="h-3 w-3" />}
                                  </span>
                                  <div>
                                    <span
                                      className={cn(
                                        "text-xs font-bold block",
                                        item.done ? "line-through text-white/40" : "text-white",
                                      )}
                                    >
                                      {item.type === "achat" ? "🛍️ " : "✅ "}
                                      {item.title}
                                    </span>
                                    <span className="text-[10px] text-white/50">{item.detail}</span>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    savePersonalItems(
                                      personalItems.filter((p) => p.id !== item.id),
                                    )
                                  }
                                  className="text-white/40 hover:text-red-400"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Colonne B : Mon Planning Professionnel */}
                      <div className="rounded-2xl border border-amber-400/30 bg-black/45 p-4 space-y-3">
                        <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>Mon Planning Professionnel</span>
                        </h3>
                        <div className="space-y-2">
                          {personalItems
                            .filter((i) => i.type === "planning_pro")
                            .map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    savePersonalItems(
                                      personalItems.map((p) =>
                                        p.id === item.id ? { ...p, done: !p.done } : p,
                                      ),
                                    )
                                  }
                                  className="flex items-start gap-2 text-left"
                                >
                                  <span
                                    className={cn(
                                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                                      item.done
                                        ? "border-emerald-400 bg-emerald-400 text-black"
                                        : "border-white/40",
                                    )}
                                  >
                                    {item.done && <Check className="h-3 w-3" />}
                                  </span>
                                  <div>
                                    <span
                                      className={cn(
                                        "text-xs font-bold block",
                                        item.done ? "line-through text-white/40" : "text-white",
                                      )}
                                    >
                                      💼 {item.title}
                                    </span>
                                    <span className="text-[10px] text-amber-200/70">
                                      {item.detail}
                                    </span>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    savePersonalItems(
                                      personalItems.filter((p) => p.id !== item.id),
                                    )
                                  }
                                  className="text-white/40 hover:text-red-400"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Colonne C : Mon Planning Personnel & Vie Privée */}
                      <div className="rounded-2xl border border-emerald-400/30 bg-black/45 p-4 space-y-3">
                        <h3 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Mon Planning Personnel &amp; Santé</span>
                        </h3>
                        <div className="space-y-2">
                          {personalItems
                            .filter((i) => i.type === "planning_perso")
                            .map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    savePersonalItems(
                                      personalItems.map((p) =>
                                        p.id === item.id ? { ...p, done: !p.done } : p,
                                      ),
                                    )
                                  }
                                  className="flex items-start gap-2 text-left"
                                >
                                  <span
                                    className={cn(
                                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                                      item.done
                                        ? "border-emerald-400 bg-emerald-400 text-black"
                                        : "border-white/40",
                                    )}
                                  >
                                    {item.done && <Check className="h-3 w-3" />}
                                  </span>
                                  <div>
                                    <span
                                      className={cn(
                                        "text-xs font-bold block",
                                        item.done ? "line-through text-white/40" : "text-white",
                                      )}
                                    >
                                      🌴 {item.title}
                                    </span>
                                    <span className="text-[10px] text-emerald-200/70">
                                      {item.detail}
                                    </span>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    savePersonalItems(
                                      personalItems.filter((p) => p.id !== item.id),
                                    )
                                  }
                                  className="text-white/40 hover:text-red-400"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SOUS-ONGLET 2 : PILOTAGE PRO (CA, DEVIS, FACTURES, LEADS) */}
                {directorComputerTab === "pro_dispatch" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                        <span className="font-mono text-[10px] text-white/60 uppercase">
                          Leads Totaux
                        </span>
                        <h4 className="text-2xl font-black text-white mt-1">{leads.length}</h4>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                        <span className="font-mono text-[10px] text-white/60 uppercase">
                          Factures en attente RIB
                        </span>
                        <h4 className="text-2xl font-black text-amber-300 mt-1">
                          {pendingInvoices.length}
                        </h4>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                        <span className="font-mono text-[10px] text-white/60 uppercase">
                          Devis Officiels
                        </span>
                        <h4 className="text-2xl font-black text-purple-300 mt-1">
                          {quotes.length}
                        </h4>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                        <span className="font-mono text-[10px] text-white/60 uppercase">
                          Clients Actifs
                        </span>
                        <h4 className="text-2xl font-black text-emerald-300 mt-1">
                          {clients.length}
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {onCreateQuote && (
                        <button
                          type="button"
                          onClick={() => onCreateQuote()}
                          className="rounded-2xl bg-amber-400 px-5 py-3 text-xs font-black text-black hover:bg-amber-300 transition"
                        >
                          📄 + Générer un Devis Officiel avec RIB
                        </button>
                      )}
                      {onSwitchToProCockpit && (
                        <button
                          type="button"
                          onClick={onSwitchToProCockpit}
                          className="rounded-2xl border border-purple-400 bg-purple-600/30 px-5 py-3 text-xs font-black text-white hover:bg-purple-600/50 transition"
                        >
                          🚀 Ouvrir les 10 Piliers Direction (Tableau Complet)
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* SOUS-ONGLET 3 : SUPERVISION DU PÔLE RH DE MARTIN DIRECTEMENT SUR L'ORDI DU DIRECTEUR */}
                {directorComputerTab === "hr_martin" && (
                  <div className="rounded-2xl border border-indigo-400/40 overflow-hidden">
                    <CrmHrDashboard
                      currentUser={{
                        id: user.id || "mem-admin",
                        fullName: `${user.fullName} (Supervision Direction)`,
                        email: user.email,
                        role: "admin",
                      }}
                      leads={leads}
                      onLogout={onLogout}
                    />
                  </div>
                )}
              </div>
            )}

            {/* ── CAS 2 : BUREAU RH EXCLUSIF DE MARTIN (INTERDIT AUX AUTRES COMMERCIAUX) ── */}
            {activeZoneModal === "hr_martin" && (isDirector || isMartin) && (
              <div className="rounded-2xl border border-indigo-400/30 overflow-hidden">
                <CrmHrDashboard
                  currentUser={{
                    id: user.id || "mem-martin",
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                  }}
                  leads={leads}
                  onLogout={onLogout}
                  onSwitchToCloserMode={() => setActiveZoneModal("commercial")}
                />
              </div>
            )}

            {/* ── CAS 3 : ORDINATEUR DU PÔLE COMMERCIAL (CHRISTEL, CAMILLE, MARTIN CLOSER, LUCAS, SARAH) ── */}
            {activeZoneModal === "commercial" && (
              <div className="space-y-6">
                {/* Bandeau personnalisé selon le barème de la personne assise devant l'ordinateur */}
                <div className="rounded-2xl border border-emerald-400/40 bg-gradient-to-r from-emerald-950/60 via-black to-purple-950/40 p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] font-black uppercase text-emerald-300">
                      SESSION COMMERCIALE PRIVÉE &amp; CONFIDENTIELLE · {user.fullName}
                    </span>
                    <h3 className="text-base font-black text-white mt-0.5">
                      {isChristel
                        ? "Barème Christel Thirion : 20 % sur les Sites Internet · 10 % sur Google Maps, CRM & Mensualités"
                        : isMartin
                          ? "Mode Closer Personnel de Martin (20 % sur vos ventes + 10 % sur le CA de vos recrues)"
                          : user.recruitedBy === "mem-martin"
                            ? "Barème Filière Martin : 20 % de commission sur tout ce que vous générez"
                            : "Barème Commercial Classique : 30 % sur les Sites Internet"}
                    </h3>
                    <p className="text-xs text-white/65 mt-0.5">
                      🔒 Vos gains en euros sont strictement confidentiels. Personne d'autre dans l'équipe ne peut voir votre coffre.
                    </p>
                  </div>
                  {isMartin && (
                    <button
                      type="button"
                      onClick={() => setActiveZoneModal("hr_martin")}
                      className="rounded-xl border border-indigo-400 bg-indigo-500/25 px-4 py-2 text-xs font-black text-indigo-200 hover:bg-indigo-500/40"
                    >
                      👥 Basculer sur mon Ordinateur RH (Recrutements &amp; 10% CA)
                    </button>
                  )}
                </div>

                {/* Liste des prospects à closer */}
                <div className="space-y-2.5 max-h-[55vh] overflow-y-auto pr-1">
                  {leads.map((lead) => {
                    const myComm = computeMyCommissionForLead(lead);
                    return (
                      <div
                        key={lead.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/55 p-4 hover:border-emerald-400/50 transition"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-sm text-white">{lead.company}</span>
                            <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white/90">
                              CA : {lead.budgetEur} € · {lead.serviceTarget}
                            </span>
                            <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 font-mono text-[10px] font-black text-emerald-300">
                              Ma Comm privée : +{myComm.amount} € ({myComm.label})
                            </span>
                          </div>
                          <p className="text-xs text-white/65 mt-1">
                            Décideur : {lead.contactName || "Gérant"} · 📞 {lead.phone} · 📍{" "}
                            {lead.city}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {onOpenCallModal && (
                            <button
                              type="button"
                              onClick={() => onOpenCallModal(lead)}
                              className="rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-3.5 py-2 text-xs font-bold text-emerald-200 hover:bg-emerald-500/35 flex items-center gap-1.5"
                            >
                              <PhoneCall className="h-3.5 w-3.5" />
                              Appeler
                            </button>
                          )}
                          {onOpenWhatsappModal && (
                            <button
                              type="button"
                              onClick={() => onOpenWhatsappModal(lead)}
                              className="rounded-xl border border-green-400/50 bg-green-500/20 px-3.5 py-2 text-xs font-bold text-green-200 hover:bg-green-500/35 flex items-center gap-1.5"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              WhatsApp 24h
                            </button>
                          )}
                          {onUpdateLeadStatus && (
                            <button
                              type="button"
                              onClick={() => {
                                simsAudio.playVictory();
                                setCoins((c) => c + myComm.amount);
                                setPlayerXp((x) => x + 250);
                                onUpdateLeadStatus(lead.id, "signed");
                              }}
                              className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-2 text-xs font-black text-black hover:brightness-110"
                            >
                              ✅ Signer (+{myComm.amount} €)
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── CAS 4 : COMPTOIR D'ACCUEIL & LOBBY ── */}
            {activeZoneModal === "lobby" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      Nom de l'Entreprise
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Restaurant Le Miami"
                      value={newLCompany}
                      onChange={(e) => setNewLCompany(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      Téléphone Direct
                    </label>
                    <input
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={newLPhone}
                      onChange={(e) => setNewLPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      Gérant / Contact
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Marc Delacroix"
                      value={newLContact}
                      onChange={(e) => setNewLContact(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      Prestation Ciblée
                    </label>
                    <select
                      value={newLService}
                      onChange={(e) => {
                        setNewLService(e.target.value);
                        if (e.target.value.includes("999")) setNewLBudget(999);
                        else if (e.target.value.includes("2 000")) setNewLBudget(2000);
                        else setNewLBudget(499);
                      }}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                    >
                      <option value="Site Vitrine Pro (499 €)">Site Vitrine Pro (499 €)</option>
                      <option value="Visibilité Google Maps (999 €/an)">
                        Visibilité Google Maps (999 €/an)
                      </option>
                      <option value="CRM Sur-Mesure & POS (2 000 €)">
                        CRM Sur-Mesure &amp; POS (2 000 €)
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!newLCompany.trim() || !newLPhone.trim()) return;
                      simsAudio.playVictory();
                      setCoins((c) => c + 100);
                      setNewLCompany("");
                      setNewLPhone("");
                      setActiveZoneModal(null);
                    }}
                    className="rounded-2xl bg-amber-400 px-6 py-3 text-xs font-black text-black hover:bg-amber-300"
                  >
                    🚀 Enregistrer au Lobby
                  </button>
                </div>
              </div>
            )}

            {/* ── CAS 5 : STUDIO CRÉATIF, SALLE DE RÉUNION, DÉTENTE, SPORT, IA ── */}
            {activeZoneModal === "creative" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-purple-400/30 bg-black/60 p-5 space-y-3">
                  <h3 className="text-base font-black text-purple-300">
                    🎨 Studio Maquettes 24h WhatsApp
                  </h3>
                  <p className="text-xs text-white/70">
                    Préparez et validez les maquettes envoyées en 24h aux prospects pour déclencher le closing.
                  </p>
                  {onSwitchToProCockpit && (
                    <button
                      type="button"
                      onClick={onSwitchToProCockpit}
                      className="rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-black text-white hover:bg-purple-500"
                    >
                      Ouvrir le Studio Maquettes Complet →
                    </button>
                  )}
                </div>
                <div className="rounded-2xl border border-cyan-400/30 bg-black/60 p-5 space-y-3">
                  <h3 className="text-base font-black text-cyan-300">
                    🤖 R&amp;D Robotique &amp; Automatisation IA
                  </h3>
                  <p className="text-xs text-white/70">
                    Catalogue R&amp;D : Robots autonomes de service (499 €/mois) et CRM IA sur-mesure (2 000 €+).
                  </p>
                </div>
              </div>
            )}

            {activeZoneModal === "meeting" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { city: "PARIS (Siège)", tz: "Europe/Paris", color: "text-sky-300" },
                  { city: "MIAMI (Penthouse HQ)", tz: "America/New_York", color: "text-amber-300" },
                  { city: "DUBAÏ", tz: "Asia/Dubai", color: "text-purple-300" },
                ].map((clock) => (
                  <div
                    key={clock.city}
                    className="rounded-2xl border border-white/10 bg-black/60 p-5 text-center"
                  >
                    <span className={cn("font-mono text-xs font-bold", clock.color)}>
                      {clock.city}
                    </span>
                    <div className="text-3xl font-black text-white mt-2">
                      {new Date().toLocaleTimeString("fr-FR", {
                        timeZone: clock.tz,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(activeZoneModal === "lounge" || activeZoneModal === "fitness") && (
              <div className="rounded-2xl border border-yellow-400/30 bg-black/60 p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-yellow-300">
                    ⚡ Recharge Énergie &amp; Bien-être
                  </h3>
                  <p className="text-xs text-white/70 mt-1">
                    Prenez une pause récupération pour remonter votre jauge d'énergie à 100 ⚡.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    simsAudio.playVictory();
                    setEnergy(100);
                  }}
                  className="rounded-2xl bg-yellow-400 px-6 py-3 text-xs font-black text-black hover:bg-yellow-300"
                >
                  Recharger à 100 ⚡
                </button>
              </div>
            )}

            {activeZoneModal === "ai_assistant" && (
              <div className="space-y-4">
                <div className="h-56 overflow-y-auto rounded-2xl border border-white/10 bg-black/60 p-4 space-y-2.5">
                  {aiChatLogs.map((log, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-xl p-3 text-xs max-w-[85%]",
                        log.sender === "user"
                          ? "ml-auto bg-purple-600/40 text-white"
                          : "mr-auto bg-white/10 text-white/90",
                      )}
                    >
                      {log.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiChatInput}
                    onChange={(e) => setAiChatInput(e.target.value)}
                    placeholder="Demandez un script de closing ou une réponse à une objection..."
                    className="flex-1 rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!aiChatInput.trim()) return;
                      const q = aiChatInput;
                      setAiChatInput("");
                      setAiChatLogs((prev) => [
                        ...prev,
                        { sender: "user", text: q },
                        {
                          sender: "ai",
                          text: "💡 Argument XR : Proposez immédiatement la maquette gratuite sous 24h sur WhatsApp pour montrer le rendu réel avant toute discussion de budget.",
                        },
                      ]);
                    }}
                    className="rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-black text-white"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            )}

            {/* ── CAS 6 : VESTIAIRE & PERSONNALISATION D'AVATAR À SON EFFIGIE ── */}
            {activeZoneModal === "wardrobe" && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-white">
                      🎁 Studio Avatar 3D à votre Effigie
                    </h3>
                    <p className="text-xs text-white/65">
                      Modifiez votre photo de visage, votre blouson XR AGENCY et votre nom.
                    </p>
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-black hover:bg-amber-300">
                    <Upload className="h-4 w-4" />
                    <span>Importer ma Photo de Visage</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { id: "bomber_xr", label: "🖤 Bombardier Cuir Noir XR AGENCY" },
                    { id: "suit_gold", label: "👑 Costume Noir & Or VIP Directeur" },
                    { id: "blazer_miami", label: "🌴 Blazer Exécutif Miami White" },
                    { id: "cyber_neon", label: "⚡ Veste Cyberpunk Neon XR" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => {
                        const next = {
                          ...avatarConfig,
                          outfit: o.id as SimsAvatarConfig["outfit"],
                        };
                        setAvatarConfig(next);
                        saveAvatarConfig(next);
                        simsAudio.playVictory();
                      }}
                      className={cn(
                        "rounded-2xl border p-4 text-left text-xs font-bold transition",
                        avatarConfig.outfit === o.id
                          ? "border-amber-400 bg-amber-400/20 text-amber-200"
                          : "border-white/10 bg-black/60 text-white/75 hover:border-white/30",
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
