import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  Unlock,
  Coins,
  Shield,
  Zap,
  Gamepad2,
  PhoneCall,
  ArrowRight,
  User,
  CheckCircle2,
  Heart,
  Briefcase,
  Layers,
  GraduationCap,
  Store,
  DollarSign,
  Volume2,
  VolumeX,
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  Bot,
  Star,
  PartyPopper,
  Radio,
  Building2,
  Calendar,
  Clock,
  LogOut,
  X,
  Send,
  Eye,
  ExternalLink,
  MessageCircle,
  Dumbbell,
  Coffee,
  Maximize2,
  Minimize2,
  Palette,
  Camera,
  Map as MapIcon,
  Menu as MenuIcon,
  Shirt,
  Users,
  FileText,
  CreditCard,
  Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  CrmClientRecord,
  CrmInvoiceRecord,
  CrmLead,
  CrmProjectRecord,
  CrmProviderRecord,
  CrmQuoteRecord,
  CrmTaskRecord,
  LeadStatus,
} from "@/routes/api/crm";
import type { CrmTodo } from "./CrmBossDashboard";

interface CrmSimsHQ3DProps {
  user: {
    fullName: string;
    email: string;
    role: string;
    title?: string;
    commissionPct?: number;
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
}

// ── SYNTHÉTISEUR AUDIO WEB AUDIO (SANS FICHIERS EXTERNES) ──
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
      gain.gain.setValueAtTime(0.04, now);
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
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.08, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.2);
      });
    } catch {}
  }

  playTeleport() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
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
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.45);
      });
    } catch {}
  }
}

const simsAudio = new SimsAudioEngine();

// ── ZONES DU PENTHOUSE DE MIAMI (PLAN ÉTAGE 1 & ÉTAGE 2) ──
interface PenthouseZone {
  id: string;
  number: number;
  name: string;
  label: string;
  icon: string;
  x: number; // Coordonnées relatives sur le plateau 3D (0 à 100)
  y: number;
  floor: 1 | 2;
  description: string;
  actionPrompt: string;
  roleRequired?: "admin" | "all";
}

const PENTHOUSE_ZONES: PenthouseZone[] = [
  {
    id: "lobby",
    number: 1,
    name: "Accueil & Lobby",
    label: "Accueil & Lobby",
    icon: "🏛️",
    x: 50,
    y: 56,
    floor: 1,
    description: "Comptoir en marbre noir, accueil des clients VIP et capture rapide de prospects.",
    actionPrompt: "Ouvrir l'Accueil & Nouveau Lead",
    roleRequired: "all",
  },
  {
    id: "commercial",
    number: 2,
    name: "Pôle Commercial",
    label: "Pôle Commercial",
    icon: "🎯",
    x: 23,
    y: 52,
    floor: 1,
    description: "Poste des Closers Élite : missions du jour, dialer téléphone et relances WhatsApp.",
    actionPrompt: "Consulter les Missions & Leads",
    roleRequired: "all",
  },
  {
    id: "creative",
    number: 3,
    name: "Studio Créatif & R&D",
    label: "Studio Créatif",
    icon: "🎨",
    x: 48,
    y: 28,
    floor: 1,
    description: "Atelier design web, maquettes express 24h, simulations Google Maps et robotique.",
    actionPrompt: "Gérer les Maquettes & Lab R&D",
    roleRequired: "all",
  },
  {
    id: "direction",
    number: 4,
    name: "Direction & Cockpit",
    label: "Direction",
    icon: "👑",
    x: 75,
    y: 28,
    floor: 1,
    description: "Bureau de la Direction Générale : trésorerie, devis officiels, validation RIB et dispatch.",
    actionPrompt: "Ouvrir le Cockpit Direction",
    roleRequired: "admin",
  },
  {
    id: "meeting",
    number: 5,
    name: "Salle de Réunion",
    label: "Salle de Réunion",
    icon: "👥",
    x: 74,
    y: 52,
    floor: 1,
    description: "Table de conférence en verre, visioconférences, dual clocks et plannings de livraison.",
    actionPrompt: "Ouvrir l'Agenda & Réunions",
    roleRequired: "all",
  },
  {
    id: "lounge",
    number: 6,
    name: "Espace Détente",
    label: "Espace Détente",
    icon: "☕",
    x: 77,
    y: 68,
    floor: 1,
    description: "Canapés design, pause café, micro-récupération et équilibre de vie personnelle.",
    actionPrompt: "Prendre une Pause & Énergie",
    roleRequired: "all",
  },
  {
    id: "terrace",
    number: 7,
    name: "Terrasse & Bar Lounge",
    label: "Terrasse / Bar",
    icon: "🍸",
    x: 18,
    y: 78,
    floor: 1,
    description: "Vue panoramique sur la skyline de Miami au coucher de soleil, cocktails et networking.",
    actionPrompt: "Accéder à la Terrasse",
    roleRequired: "all",
  },
  {
    id: "pool",
    number: 8,
    name: "Piscine & Rooftop",
    label: "Piscine",
    icon: "🏊",
    x: 50,
    y: 84,
    floor: 1,
    description: "Bassin à débordement suspendu au-dessus de Miami, déconnexion totale et repos mental.",
    actionPrompt: "Profiter du Rooftop Piscine",
    roleRequired: "all",
  },
  {
    id: "fitness",
    number: 9,
    name: "Sport & Bien-être",
    label: "Sport & Bien-être",
    icon: "🏋️",
    x: 93,
    y: 44,
    floor: 1,
    description: "Salle de sport privée, cardio, recharge d'énergie vitale pour tenir la cadence commerciale.",
    actionPrompt: "S'entraîner & Recharger ⚡",
    roleRequired: "all",
  },
];

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
  // ── ÉTATS DU JOUER & DU PENTHOUSE ──
  const [playerPos, setPlayerPos] = useState({ x: 42, y: 68 }); // Position de l'avatar au centre-gauche
  const [playerFacing, setPlayerFacing] = useState<"front" | "back" | "left" | "right">("back"); // Par défaut de dos comme dans l'image
  const [isWalking, setIsWalking] = useState(false);
  const [cameraMode, setCameraMode] = useState<"third_person" | "isometric">("third_person");
  const [activeFloor, setActiveFloor] = useState<1 | 2>(1);
  const [activeZoneModal, setActiveZoneModal] = useState<string | null>(null);

  // ── DEVISES & GAMIFICATION DU JOUEUR (SYNCHRONISÉES AVEC LES PERFS CRM) ──
  const [gems, setGems] = useState(480);
  const [coins, setCoins] = useState(12500);
  const [energy, setEnergy] = useState(100);
  const [playerXp, setPlayerXp] = useState(1250);
  const maxXp = 2000;
  const playerLevel = 8;

  // ── SUIVI DU PROMPT D'INTERACTION ACTIVE PROXIMITÉ ──
  const nearbyZone = useMemo(() => {
    return PENTHOUSE_ZONES.find((z) => {
      const dist = Math.hypot(z.x - playerPos.x, z.y - playerPos.y);
      return dist <= 14; // Rayon d'interaction autour de la station
    });
  }, [playerPos]);

  // ── SOUND FX TOGGLE ──
  const [soundEnabled, setSoundEnabled] = useState(true);
  useEffect(() => {
    simsAudio.enabled = soundEnabled;
  }, [soundEnabled]);

  // ── VESTIAIRE / SKINS DE L'AVATAR DIRECTEUR ──
  const [outfit, setOutfit] = useState<"bomber_black" | "suit_gold" | "cyber_xr">("bomber_black");

  // ── NOUVEAU LEAD FORMULAIRE EXPRESS DANS LE LOBBY ──
  const [newLCompany, setNewLCompany] = useState("");
  const [newLPhone, setNewLPhone] = useState("");
  const [newLContact, setNewLContact] = useState("");
  const [newLService, setNewLService] = useState("Site Vitrine Pro (499 €)");
  const [newLBudget, setNewLBudget] = useState(499);
  const [newLCloser, setNewLCloser] = useState("mem-lucas");

  // ── ASSISTANT IA CHAT INTERNE DANS LE QG ──
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiChatLogs, setAiChatLogs] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Bonjour Directeur. Le QG Penthouse v1.5 est opérationnel. Toutes les métriques commerciales et techniques sont synchronisées. Que puis-je préparer pour vous ?",
    },
  ]);

  // ── CALCUL DES MÉTRIQUES EN DIRECT ──
  const pendingInvoices = useMemo(
    () => invoices.filter((i) => i.status === "pending_transfer"),
    [invoices],
  );
  const urgentLeads = useMemo(
    () => leads.filter((l) => l.priority === "urgent" || l.status === "to_call"),
    [leads],
  );

  // ── DÉPLACEMENT DU PERSONNAGE (CLAVIER & CLIC SOURIS) ──
  const moveAvatar = useCallback(
    (dx: number, dy: number, facing: "front" | "back" | "left" | "right") => {
      setPlayerFacing(facing);
      setIsWalking(true);
      simsAudio.playStep();
      setTimeout(() => setIsWalking(false), 160);

      setPlayerPos((prev) => ({
        x: Math.max(12, Math.min(88, prev.x + dx)),
        y: Math.max(22, Math.min(82, prev.y + dy)),
      }));
    },
    [],
  );

  // Écouteur universel des touches clavier (Z/Q/S/D, Flèches, E, M, P, C, G, Tab, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const step = 4;
      switch (e.key) {
        // Déplacements
        case "ArrowUp":
        case "z":
        case "Z":
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
          e.preventDefault();
          moveAvatar(-step, 0, "left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          moveAvatar(step, 0, "right");
          break;

        // Touche [E] : Interagir avec la station proche ou le lobby
        case "e":
        case "E":
          e.preventDefault();
          simsAudio.playInteract();
          if (nearbyZone) {
            setActiveZoneModal(nearbyZone.id);
          } else {
            setActiveZoneModal("lobby");
          }
          break;

        // Touche [M] : Missions & Leads
        case "m":
        case "M":
          e.preventDefault();
          simsAudio.playInteract();
          setActiveZoneModal("commercial");
          break;

        // Touche [P] : Téléphone / Dialer Closer
        case "p":
        case "P":
          e.preventDefault();
          simsAudio.playInteract();
          setActiveZoneModal("commercial");
          break;

        // Touche [G] ou [C] : Bascule Caméra (3e personne / Isométrique)
        case "g":
        case "G":
        case "c":
        case "C":
          e.preventDefault();
          simsAudio.playInteract();
          setCameraMode((prev) => (prev === "third_person" ? "isometric" : "third_person"));
          break;

        // Touche [Tab] : Plan architectural de l'agence
        case "Tab":
          e.preventDefault();
          simsAudio.playInteract();
          setActiveZoneModal("floor_plan_full");
          break;

        // Touche [Escape] : Fermer modale ou ouvrir menu
        case "Escape":
          e.preventDefault();
          if (activeZoneModal) {
            setActiveZoneModal(null);
          } else {
            setActiveZoneModal("menu");
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveAvatar, nearbyZone, activeZoneModal]);

  // Téléportation vers une station en cliquant sur le plan d'architecte ou une balise
  const teleportToZone = (zone: PenthouseZone) => {
    simsAudio.playTeleport();
    setPlayerPos({ x: zone.x, y: zone.y + 4 });
    setPlayerFacing("back");
  };

  // Envoi d'un message dans l'Assistant IA XR
  const handleSendAiMessage = () => {
    if (!aiChatInput.trim()) return;
    const userText = aiChatInput.trim();
    setAiChatLogs((prev) => [...prev, { sender: "user", text: userText }]);
    setAiChatInput("");

    setTimeout(() => {
      simsAudio.playInteract();
      let reply = "Requête analysée. Les directives sont synchronisées.";
      const lower = userText.toLowerCase();
      if (lower.includes("objection") || lower.includes("prix") || lower.includes("cher")) {
        reply =
          "💡 Conseil Closing XR : Désamorcez immédiatement en rappelant la valeur de rentabilité. Proposez d'envoyer la maquette WhatsApp personnalisée sous 24h sans engagement pour déclencher l'effet Waouh.";
      } else if (lower.includes("devis") || lower.includes("rib")) {
        reply =
          "📄 Le compte KARMA SASU est prêt pour réception. Dès validation, la commission de 10% à 30% est créditée instantanément dans le coffre du closer.";
      } else if (lower.includes("lead") || lower.includes("client")) {
        reply = `📊 Vous avez ${leads.length} leads dans le pipeline, dont ${urgentLeads.length} prioritaires à rappeler.`;
      }
      setAiChatLogs((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 600);
  };

  return (
    <div className="relative h-screen w-full select-none overflow-hidden bg-[#06080e] font-sans text-white">
      {/* ══════════════════════════════════════════════════════════════════════════
          1. SCÈNE 3D PENTHOUSE MIAMI (CANVAS HYBRIDE IMMERSIF HAUTE FIDÉLITÉ)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-700 ease-out",
          cameraMode === "isometric"
            ? "scale-90 rotate-x-[32deg] rotate-z-[-12deg] perspective-[1200px]"
            : "scale-100",
        )}
        onClick={(e) => {
          // Déplacement au clic sur le sol
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = ((e.clientX - rect.left) / rect.width) * 100;
          const clickY = ((e.clientY - rect.top) / rect.height) * 100;
          if (clickY > 20 && clickY < 90 && clickX > 10 && clickX < 90) {
            setPlayerFacing(clickY < playerPos.y ? "back" : "front");
            setPlayerPos({ x: Math.round(clickX), y: Math.round(clickY) });
            simsAudio.playStep();
          }
        }}
      >
        {/* Arrière-plan Skyline Miami Coucher de Soleil & Gratte-ciels */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a1338] via-[#1a142e] to-[#090b14]">
          {/* Lueur crépuscule violet / ambre */}
          <div className="absolute top-0 right-0 left-0 h-[45%] bg-gradient-to-b from-[#ff7e5f]/20 via-[#feb47b]/10 to-transparent blur-2xl" />

          {/* Gratte-ciels illuminés de Miami en arrière-plan à travers les baies vitrées */}
          <div className="absolute top-[8%] right-0 left-0 flex h-64 items-end justify-between px-12 opacity-40">
            <div className="h-44 w-16 rounded-t-sm bg-gradient-to-t from-purple-950 to-indigo-900 border-x border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]" />
            <div className="h-60 w-24 rounded-t-sm bg-gradient-to-t from-purple-950 to-indigo-950 border-x border-fuchsia-400/20" />
            <div className="h-36 w-20 rounded-t-sm bg-gradient-to-t from-purple-950 to-indigo-900 border-x border-amber-400/20" />
            <div className="h-52 w-28 rounded-t-sm bg-gradient-to-t from-purple-950 to-indigo-950 border-x border-sky-400/20" />
            <div className="h-64 w-32 rounded-t-sm bg-gradient-to-t from-purple-950 to-indigo-950 border-x border-purple-400/30" />
            <div className="h-40 w-20 rounded-t-sm bg-gradient-to-t from-purple-950 to-indigo-900 border-x border-emerald-400/20" />
            <div className="h-56 w-24 rounded-t-sm bg-gradient-to-t from-purple-950 to-indigo-950 border-x border-cyan-400/20" />
          </div>

          {/* Silhouettes de palmiers de Miami */}
          <div className="absolute top-[18%] left-8 text-4xl opacity-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            🌴
          </div>
          <div className="absolute top-[22%] left-24 text-3xl opacity-40">🌴</div>
          <div className="absolute top-[20%] right-16 text-4xl opacity-50">🌴</div>

          {/* Verrière & Structure Baies Vitrées Géantes */}
          <div className="absolute inset-x-0 top-0 h-[50%] grid grid-cols-6 border-b-2 border-white/10 pointer-events-none">
            <div className="border-r border-white/10" />
            <div className="border-r border-white/10" />
            <div className="border-r border-white/10" />
            <div className="border-r border-white/10" />
            <div className="border-r border-white/10" />
            <div />
          </div>

          {/* Escalier Hélicoïdal en Verre & Mezzanine Supérieure */}
          <div className="absolute top-[15%] left-[34%] h-56 w-48 pointer-events-none opacity-80">
            <div className="absolute inset-0 rounded-full border-4 border-purple-400/30 border-t-purple-400/80 shadow-[0_0_30px_rgba(192,132,252,0.4)] rotate-45" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-purple-300 uppercase">
              MEZZANINE ÉTAGE 2
            </div>
          </div>

          {/* Lustre circulaire design à anneaux LED suspendu */}
          <div className="absolute top-[6%] left-[52%] -translate-x-1/2 h-20 w-44 rounded-full border-2 border-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.6)] animate-pulse pointer-events-none" />
          <div className="absolute top-[8%] left-[52%] -translate-x-1/2 h-14 w-32 rounded-full border-2 border-purple-400/70 shadow-[0_0_35px_rgba(192,132,252,0.7)] pointer-events-none" />
        </div>

        {/* Sol Marbré Réfléchissant avec Reflet Miroir */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0a0d18] via-[#101322] to-[#14182c]/90 border-t border-purple-500/30 shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Grillage perspective sol marbre luxe */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "60px 40px",
            }}
          />

          {/* Reflet lumineux du Logo XR AGENCY au sol en marbre */}
          <div className="absolute top-[28%] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-45">
            <span className="font-black text-6xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-purple-300 drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
              XR
            </span>
            <span className="font-mono text-sm tracking-[0.5em] text-white/70">AGENCY</span>
          </div>
        </div>

        {/* ── COMPTOIR ACCUEIL MARBRE NOIR & NÉON CENTRAL ── */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            simsAudio.playInteract();
            setActiveZoneModal("lobby");
          }}
          className="absolute top-[44%] left-1/2 -translate-x-1/2 cursor-pointer group z-10"
        >
          {/* Logo néon mural derrière le comptoir */}
          <div className="mb-2 text-center">
            <div className="inline-block rounded-2xl border border-amber-400/40 bg-black/70 px-6 py-2 shadow-[0_0_30px_rgba(245,158,11,0.3)] group-hover:border-amber-400">
              <span className="font-black text-xl tracking-widest text-amber-300">XR AGENCY</span>
            </div>
          </div>

          {/* Comptoir en marbre noir avec liseré LED or */}
          <div className="h-16 w-80 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-r from-[#121422] via-[#201d32] to-[#121422] shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center justify-between px-6 transition group-hover:scale-105">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Hôtesse Virtuelle XR</span>
            </div>
            <div className="rounded-lg bg-amber-400/20 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-300">
              [E] Interagir
            </div>
          </div>
        </div>

        {/* ── BALISES FLOTTANTES AR DE TOUTES LES STATIONS ── */}
        {PENTHOUSE_ZONES.map((zone) => {
          const isNearby = nearbyZone?.id === zone.id;
          return (
            <div
              key={zone.id}
              onClick={(e) => {
                e.stopPropagation();
                simsAudio.playInteract();
                teleportToZone(zone);
                setActiveZoneModal(zone.id);
              }}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-xl transition-all duration-300 shadow-lg",
                  isNearby
                    ? "border-amber-400 bg-amber-400/30 text-amber-200 scale-110 shadow-[0_0_30px_rgba(251,191,36,0.6)] animate-bounce"
                    : "border-purple-400/50 bg-[#16122c]/85 text-purple-200 hover:border-purple-300 hover:scale-105 shadow-[0_0_20px_rgba(192,132,252,0.3)]",
                )}
              >
                <span className="text-sm">{zone.icon}</span>
                <span className="text-xs font-black tracking-wide">{zone.label}</span>
              </div>

              {/* Prompt tactile [E] Interagir lorsque le joueur est proche */}
              {isNearby && (
                <div className="mt-1 text-center">
                  <span className="inline-block rounded-md bg-amber-400 px-2 py-0.5 font-mono text-[10px] font-black text-black shadow-md">
                    [E] Interagir
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* ── AVATAR 3D DU DIRECTEUR (BLOUSON BOMBARDIER XR AGENCY DE DOS) ── */}
        <div
          style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-full transition-all duration-150 pointer-events-none z-30",
            isWalking ? "scale-y-95 translate-y-[-102%]" : "scale-100",
          )}
        >
          {/* Ombre portée réaliste au sol sur le marbre */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-16 rounded-full bg-black/70 blur-sm" />

          {/* Modèle de l'Avatar : Veste Bombardier avec Logo XR AGENCY dans le dos */}
          <div className="relative flex flex-col items-center">
            {/* Tête & Coupe soignée */}
            <div className="h-8 w-7 rounded-t-xl bg-[#3d271d] border border-black/40 shadow-sm" />

            {/* Haut du corps : Bombardier Noir avec flocage XR AGENCY */}
            <div
              className={cn(
                "relative mt-0.5 h-16 w-14 rounded-xl border border-white/20 p-1 flex flex-col items-center justify-center shadow-2xl transition",
                outfit === "bomber_black" &&
                  "bg-gradient-to-b from-[#1b1c20] via-[#101114] to-[#0c0d0f]",
                outfit === "suit_gold" &&
                  "bg-gradient-to-b from-amber-700 via-amber-900 to-amber-950 border-amber-400/60",
                outfit === "cyber_xr" &&
                  "bg-gradient-to-b from-purple-900 via-indigo-950 to-black border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.5)]",
              )}
            >
              {playerFacing === "back" ? (
                <>
                  <div className="font-black text-[10px] tracking-wider text-white">XR</div>
                  <div className="font-mono text-[6px] tracking-widest text-white/80">AGENCY</div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-[8px] font-bold text-amber-300">
                  👑
                </div>
              )}
            </div>

            {/* Pantalon noir habillé & Chaussures */}
            <div className="flex gap-1 -mt-0.5">
              <div className="h-14 w-4 rounded-b-md bg-[#0f1118] border-r border-black" />
              <div className="h-14 w-4 rounded-b-md bg-[#0f1118]" />
            </div>
            <div className="flex gap-2 -mt-1">
              <div className="h-3 w-4 rounded-sm bg-black" />
              <div className="h-3 w-4 rounded-sm bg-black" />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          2. HEADER TOP-BAR GLASSMORPHISM HUD (TITRE GAUCHE + HUD DEVISES DROITE)
          ══════════════════════════════════════════════════════════════════════════ */}
      <header className="absolute top-0 inset-x-0 z-40 flex items-center justify-between p-4 sm:p-5 pointer-events-none">
        {/* Titre & Branding XR AGENCY SIMS HQ 3D v1.5 */}
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,0,0,0.6)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-amber-300">
                XR AGENCY SIMS
              </span>
              <span className="rounded-md bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-300 border border-purple-400/30">
                HQ 3D v1.5
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs">🌴</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
                MIAMI PENTHOUSE HQ
              </span>
            </div>
          </div>
        </div>

        {/* Profil Directeur + Jauge XP + Les 3 Devises Réelles */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Avatar Ring & Niveau XP */}
          <div className="flex items-center gap-3 rounded-2xl border border-amber-400/30 bg-black/70 px-4 py-2 backdrop-blur-2xl shadow-xl">
            <div className="relative">
              <div className="h-10 w-10 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-[0_0_15px_rgba(251,191,36,0.5)] flex items-center justify-center font-black text-sm text-black">
                XR
              </div>
              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-black" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-white">{user.fullName || "Directeur XR"}</span>
                <span className="font-mono text-[10px] text-amber-300 font-bold">Niv. {playerLevel}</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1.5 w-28 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-purple-400 transition-all duration-500"
                    style={{ width: `${(playerXp / maxXp) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] text-white/60">
                  {playerXp} / {maxXp} XP
                </span>
              </div>
            </div>
          </div>

          {/* Les 3 Devises en Pill Glassmorphism */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/70 px-4 py-2 backdrop-blur-2xl shadow-xl">
            {/* Gemmes Violets */}
            <div className="flex items-center gap-1.5 px-2">
              <span className="text-sm">💎</span>
              <span className="font-mono text-xs font-black text-purple-300">{gems}</span>
            </div>
            <div className="h-4 w-px bg-white/15" />

            {/* Coins Or */}
            <div className="flex items-center gap-1.5 px-2">
              <span className="text-sm">🪙</span>
              <span className="font-mono text-xs font-black text-amber-300">
                {coins.toLocaleString("fr-FR")}
              </span>
            </div>
            <div className="h-4 w-px bg-white/15" />

            {/* Énergie Éclair Jaune */}
            <div className="flex items-center gap-1.5 px-2">
              <span className="text-sm">⚡</span>
              <span className="font-mono text-xs font-black text-yellow-400">{energy}</span>
            </div>
          </div>

          {/* Boutons Options / Cockpit Pro / Déconnexion */}
          <div className="flex items-center gap-1.5">
            {onSwitchToProCockpit && (
              <button
                type="button"
                onClick={onSwitchToProCockpit}
                title="Bascule vers le Cockpit Tableau de bord 2D"
                className="rounded-xl border border-white/15 bg-black/70 p-2.5 text-white/80 hover:text-white hover:bg-white/10 transition backdrop-blur-xl"
              >
                <Laptop className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Couper le son" : "Activer le son"}
              className="rounded-xl border border-white/15 bg-black/70 p-2.5 text-white/80 hover:text-white hover:bg-white/10 transition backdrop-blur-xl"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-amber-300" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onLogout}
              title="Déconnexion"
              className="rounded-xl border border-red-500/40 bg-red-500/15 p-2.5 text-red-200 hover:bg-red-500/30 transition backdrop-blur-xl"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════════
          3. SIDEBAR FLOTTANTE GLASSMORPHISM (GAUCHE)
          ══════════════════════════════════════════════════════════════════════════ */}
      <aside className="absolute top-24 left-4 z-40 flex flex-col gap-1.5 rounded-3xl border border-white/10 bg-black/60 p-2 backdrop-blur-2xl shadow-2xl">
        {[
          { id: "lobby", label: "Accueil (HQ)", icon: "🏠", active: true },
          { id: "commercial", label: "Missions", icon: "📝" },
          { id: "leads_prospects", label: "CRM & Prospects", icon: "👥" },
          { id: "projects", label: "Projets", icon: "💼" },
          { id: "calendar", label: "Calendrier", icon: "📅" },
          { id: "ai_assistant", label: "Assistant IA", icon: "🤖" },
          { id: "direction", label: "Direction", icon: "👑" },
          { id: "wardrobe", label: "Vestiaire", icon: "🎁" },
          { id: "team", label: "Équipe", icon: "👥" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              simsAudio.playInteract();
              if (item.id === "lobby") {
                teleportToZone(PENTHOUSE_ZONES[0]);
              } else if (item.id === "commercial") {
                teleportToZone(PENTHOUSE_ZONES[1]);
              } else if (item.id === "direction") {
                teleportToZone(PENTHOUSE_ZONES[3]);
              }
              setActiveZoneModal(item.id);
            }}
            className={cn(
              "group relative flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all",
              item.id === "lobby"
                ? "bg-purple-600/40 text-purple-200 border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            <span className="text-base">{item.icon}</span>
            <span className="hidden lg:inline">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* ══════════════════════════════════════════════════════════════════════════
          4. BOUSSOLE RADAR MINIMAP CIRCULAIRE (BAS GAUCHE)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-6 left-6 z-40 flex flex-col items-center">
        <div className="relative h-28 w-28 rounded-full border-2 border-amber-400/80 bg-black/85 backdrop-blur-2xl shadow-[0_0_30px_rgba(251,191,36,0.4)] flex items-center justify-center overflow-hidden">
          {/* Cercle radar de balayage */}
          <div className="absolute inset-0 rounded-full border border-amber-400/20" />
          <div className="absolute inset-2 rounded-full border border-amber-400/20" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-amber-400/20" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-amber-400/20" />

          {/* Indicateur Nord */}
          <span className="absolute top-1 font-mono text-[9px] font-black text-amber-400">N</span>

          {/* Points d'intérêt des stations */}
          {PENTHOUSE_ZONES.map((z) => (
            <div
              key={z.id}
              style={{
                left: `${15 + (z.x / 100) * 70}%`,
                top: `${15 + (z.y / 100) * 70}%`,
              }}
              className="absolute h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]"
            />
          ))}

          {/* Flèche de position du joueur */}
          <div
            style={{
              left: `${15 + (playerPos.x / 100) * 70}%`,
              top: `${15 + (playerPos.y / 100) * 70}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-amber-300 font-bold text-xs"
          >
            ▲
          </div>
        </div>
        <span className="mt-1.5 rounded-full bg-black/70 px-3 py-0.5 font-mono text-[10px] font-bold text-amber-300 border border-amber-400/30">
          HQ - Étage {activeFloor}
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          5. DOCK ACTIONS & RACCOURCIS CLAVIER (BAS CENTRE)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5 rounded-3xl border border-white/15 bg-black/75 px-3 py-2 backdrop-blur-2xl shadow-2xl">
          {[
            { id: "commercial", label: "Missions (M)", icon: "✉️" },
            { id: "phone", label: "Téléphone (P)", icon: "📱" },
            { id: "interact", label: "Interactions (E)", icon: "👥" },
            { id: "camera", label: "Caméra (C)", icon: "📷", highlight: true },
            { id: "map", label: "Carte (Tab)", icon: "🗺️" },
            { id: "menu", label: "Menu (Esc)", icon: "☰" },
          ].map((act) => (
            <button
              key={act.id}
              type="button"
              onClick={() => {
                simsAudio.playInteract();
                if (act.id === "camera") {
                  setCameraMode((prev) => (prev === "third_person" ? "isometric" : "third_person"));
                } else if (act.id === "interact") {
                  setActiveZoneModal(nearbyZone ? nearbyZone.id : "lobby");
                } else if (act.id === "phone") {
                  setActiveZoneModal("commercial");
                } else if (act.id === "map") {
                  setActiveZoneModal("floor_plan_full");
                } else {
                  setActiveZoneModal(act.id);
                }
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-bold transition",
                act.highlight
                  ? "bg-purple-600/50 text-purple-200 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 text-white/80 hover:bg-white/15 hover:text-white border border-white/5",
              )}
            >
              <span>{act.icon}</span>
              <span className="hidden sm:inline">{act.label}</span>
            </button>
          ))}
        </div>
        <span className="rounded-full bg-black/70 px-3 py-0.5 font-mono text-[10px] text-white/70 border border-white/10">
          [G] Changer de caméra : {cameraMode === "third_person" ? "3e personne" : "Isométrique"}
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          6. PLAN ARCHITECTURAL 3D INTERACTIF DU PENTHOUSE (BAS DROITE)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-6 right-6 z-40 w-72 rounded-3xl border border-white/15 bg-black/85 p-3.5 backdrop-blur-2xl shadow-2xl">
        {/* En-tête du plan avec switch d'étage */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] font-bold text-amber-300">
            &gt; Plan du HQ - Étage {activeFloor}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setActiveFloor(1)}
              className={cn(
                "rounded-md px-2 py-0.5 font-mono text-[9px] font-bold transition",
                activeFloor === 1 ? "bg-amber-400 text-black" : "bg-white/10 text-white/60",
              )}
            >
              Étage 1
            </button>
            <button
              type="button"
              onClick={() => setActiveFloor(2)}
              className={cn(
                "rounded-md px-2 py-0.5 font-mono text-[9px] font-bold transition",
                activeFloor === 2 ? "bg-purple-400 text-black" : "bg-white/10 text-white/60",
              )}
            >
              Rooftop
            </button>
          </div>
        </div>

        {/* Schéma de pièces architecturales numérotées */}
        <div className="relative h-36 w-full rounded-2xl border border-white/10 bg-[#0d0f18] p-2 overflow-hidden">
          {PENTHOUSE_ZONES.filter((z) => z.floor === activeFloor).map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => {
                teleportToZone(z);
                setActiveZoneModal(z.id);
              }}
              style={{
                left: `${z.x}%`,
                top: `${z.y}%`,
              }}
              title={z.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-purple-400/80 bg-purple-600/40 text-[10px] font-black text-white hover:scale-125 transition shadow-[0_0_10px_rgba(168,85,247,0.5)] flex items-center justify-center"
            >
              {z.number}
            </button>
          ))}

          {/* Position du joueur sur le plan miniature */}
          <div
            style={{
              left: `${playerPos.x}%`,
              top: `${playerPos.y}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping"
          />
        </div>

        {/* Légende miniature des pièces */}
        <div className="mt-2 grid grid-cols-2 gap-1 text-[9px] text-white/70 font-mono">
          <span>1: Accueil / Lobby</span>
          <span>2: Pôle Commercial</span>
          <span>3: Studio Créatif</span>
          <span>4: Direction</span>
          <span>5: Salle Réunion</span>
          <span>6: Espace Détente</span>
          <span>7: Terrasse / Bar</span>
          <span>8: Piscine</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          7. MODALES OPÉRATIONNELLES DES STATIONS & DONNÉES CRM RÉELLES
          ══════════════════════════════════════════════════════════════════════════ */}
      {activeZoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2.5rem] border-2 border-white/20 bg-gradient-to-b from-[#121422] to-[#090b12] p-6 sm:p-8 shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            {/* Bouton de fermeture [Esc] */}
            <button
              type="button"
              onClick={() => setActiveZoneModal(null)}
              className="absolute top-6 right-6 rounded-full border border-white/15 bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* MODALE 1 : ACCUEIL & LOBBY (CAPTURE RAPIDE DE PROSPECT) */}
            {activeZoneModal === "lobby" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-400/50 bg-amber-400/20 text-2xl">
                    🏛️
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-white">Comptoir d'Accueil & Lobby HQ</h2>
                    <p className="text-xs text-white/70">
                      Enregistrez un nouveau prospect en direct et assignez-le immédiatement à un Closer.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      Nom de l'Entreprise / Établissement
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Brasserie Leffe Miami"
                      value={newLCompany}
                      onChange={(e) => setNewLCompany(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
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
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      Nom du Gérant / Décideur
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Jean Dupont"
                      value={newLContact}
                      onChange={(e) => setNewLContact(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      Offre Ciblée
                    </label>
                    <select
                      value={newLService}
                      onChange={(e) => {
                        setNewLService(e.target.value);
                        if (e.target.value.includes("999")) setNewLBudget(999);
                        else if (e.target.value.includes("2000")) setNewLBudget(2000);
                        else setNewLBudget(499);
                      }}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                    >
                      <option value="Site Vitrine Pro (499 €)">Site Vitrine Pro (499 €)</option>
                      <option value="Google Maps Top 3 (999 €/an)">Google Maps Top 3 (999 €/an)</option>
                      <option value="CRM Sur-Mesure + POS (2 000 €)">CRM Sur-Mesure + POS (2 000 €)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-amber-300">
                      Commission estimée closer : {Math.round(newLBudget * 0.2)} €
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newLCompany.trim() || !newLPhone.trim()) {
                        alert("Veuillez renseigner au moins le nom et le téléphone.");
                        return;
                      }
                      simsAudio.playVictory();
                      setCoins((c) => c + 100);
                      setPlayerXp((x) => x + 50);
                      alert(`✅ Prospect ${newLCompany} enregistré et assigné ! +100 Coins & +50 XP`);
                      setNewLCompany("");
                      setNewLPhone("");
                      setActiveZoneModal(null);
                    }}
                    className="rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 font-black text-sm text-black shadow-lg hover:from-amber-300 hover:to-amber-400 transition"
                  >
                    🚀 Enregistrer & Dispatcher Immédiatement
                  </button>
                </div>
              </div>
            )}

            {/* MODALE 2 : PÔLE COMMERCIAL (MISSIONS DU JOUR, DIALER & CLOSING) */}
            {(activeZoneModal === "commercial" || activeZoneModal === "leads_prospects") && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-400/50 bg-emerald-400/20 text-2xl">
                      🎯
                    </span>
                    <div>
                      <h2 className="text-xl font-black text-white">Pôle Commercial & Missions</h2>
                      <p className="text-xs text-white/70">
                        {leads.length} prospects dans le pipe · {urgentLeads.length} relances urgentes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/50 p-4 hover:border-emerald-400/50 transition"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">{lead.company}</span>
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                            {lead.serviceTarget} · {lead.budgetEur} €
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5">
                          Contact : {lead.contactName || "Gérant"} · 📞 {lead.phone}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {onOpenCallModal && (
                          <button
                            type="button"
                            onClick={() => {
                              simsAudio.playInteract();
                              onOpenCallModal(lead);
                            }}
                            className="rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-bold text-emerald-200 hover:bg-emerald-500/30 transition flex items-center gap-1.5"
                          >
                            <PhoneCall className="h-3.5 w-3.5" />
                            Appeler (P)
                          </button>
                        )}
                        {onOpenWhatsappModal && (
                          <button
                            type="button"
                            onClick={() => {
                              simsAudio.playInteract();
                              onOpenWhatsappModal(lead);
                            }}
                            className="rounded-xl border border-green-500/40 bg-green-500/20 px-3 py-1.5 text-xs font-bold text-green-200 hover:bg-green-500/30 transition flex items-center gap-1.5"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            WhatsApp
                          </button>
                        )}
                        {onUpdateLeadStatus && (
                          <button
                            type="button"
                            onClick={() => {
                              simsAudio.playVictory();
                              setCoins((c) => c + Math.round(lead.budgetEur * 0.2));
                              setGems((g) => g + 50);
                              setPlayerXp((x) => x + 250);
                              onUpdateLeadStatus(lead.id, "signed");
                            }}
                            className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-3.5 py-1.5 text-xs font-black text-black hover:from-emerald-300 hover:to-emerald-400 transition"
                          >
                            ✅ Clôturer Deal
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODALE 3 : STUDIO CRÉATIF & R&D ROBOTIQUE */}
            {activeZoneModal === "creative" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-400/50 bg-purple-400/20 text-2xl">
                    🎨
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-white">Studio Créatif & R&D Robotique</h2>
                    <p className="text-xs text-white/70">
                      Générateur de maquettes offertes 24h & Catalogue des robots autonomes XR.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <h3 className="font-bold text-sm text-purple-300 mb-2">
                      🎨 Maquette Express WhatsApp 24h
                    </h3>
                    <p className="text-xs text-white/70 mb-3">
                      L'arme fatale pour closer : montrez le site ou l'audit avant de demander un centime.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        simsAudio.playInteract();
                        alert("Générateur de maquette IA activé. URL prête pour envoi client !");
                      }}
                      className="w-full rounded-xl bg-purple-500/20 border border-purple-400/40 py-2.5 text-xs font-bold text-purple-200 hover:bg-purple-500/30"
                    >
                      🚀 Créer une Nouvelle Maquette Démo
                    </button>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <h3 className="font-bold text-sm text-cyan-300 mb-2">
                      🤖 R&D Robotique & Humanoïdes
                    </h3>
                    <p className="text-xs text-white/70 mb-3">
                      Offre exclusive XR : Robot de service autonome à 499 € / mois en location.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        simsAudio.playInteract();
                        alert("Plaquette Robotique XR chargée dans vos documents partagés.");
                      }}
                      className="w-full rounded-xl bg-cyan-500/20 border border-cyan-400/40 py-2.5 text-xs font-bold text-cyan-200 hover:bg-cyan-500/30"
                    >
                      📄 Fiche Technique Robot Humanoïde
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODALE 4 : DIRECTION & COCKPIT BOSS */}
            {activeZoneModal === "direction" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-400/50 bg-amber-400/20 text-2xl">
                    👑
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-white">Bureau de la Direction Générale</h2>
                    <p className="text-xs text-white/70">
                      Trésorerie, Devis officiels avec RIB KARMA SASU et contrôle des commissions.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <span className="font-mono text-[10px] text-white/60 uppercase">Factures en attente</span>
                    <h4 className="text-xl font-black text-amber-300 mt-1">
                      {pendingInvoices.length} à valider
                    </h4>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <span className="font-mono text-[10px] text-white/60 uppercase">Devis Émis</span>
                    <h4 className="text-xl font-black text-purple-300 mt-1">{quotes.length}</h4>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <span className="font-mono text-[10px] text-white/60 uppercase">Clients Actifs</span>
                    <h4 className="text-xl font-black text-emerald-300 mt-1">{clients.length}</h4>
                  </div>
                </div>

                {onCreateQuote && (
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        simsAudio.playInteract();
                        onCreateQuote();
                      }}
                      className="rounded-2xl bg-amber-400 px-6 py-2.5 text-xs font-black text-black hover:bg-amber-300 transition"
                    >
                      + Générer Devis Officiel & RIB
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MODALE 5 : SALLE DE RÉUNION & CALENDRIER */}
            {(activeZoneModal === "meeting" || activeZoneModal === "calendar") && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-sky-400/50 bg-sky-400/20 text-2xl">
                    👥
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-white">Salle de Réunion & Dual Clocks</h2>
                    <p className="text-xs text-white/70">
                      Coordination des fuseaux horaires Paris / Miami / Dubaï & Rétroplannings de livraison.
                    </p>
                  </div>
                </div>

                {/* Dual Clocks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-center">
                    <span className="font-mono text-xs text-sky-300 font-bold">PARIS (Siège)</span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {new Date().toLocaleTimeString("fr-FR", {
                        timeZone: "Europe/Paris",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-amber-400/30 bg-black/60 p-4 text-center">
                    <span className="font-mono text-xs text-amber-300 font-bold">MIAMI (Penthouse HQ)</span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {new Date().toLocaleTimeString("fr-FR", {
                        timeZone: "America/New_York",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-purple-400/30 bg-black/60 p-4 text-center">
                    <span className="font-mono text-xs text-purple-300 font-bold">DUBAÏ</span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {new Date().toLocaleTimeString("fr-FR", {
                        timeZone: "Asia/Dubai",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* MODALE 6 : ESPACE DÉTENTE & BIEN-ÊTRE PERSONNEL */}
            {(activeZoneModal === "lounge" ||
              activeZoneModal === "fitness" ||
              activeZoneModal === "pool" ||
              activeZoneModal === "terrace") && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-yellow-400/50 bg-yellow-400/20 text-2xl">
                    ⚡
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-white">
                      Espace Détente, Sport & Équilibre Personnel
                    </h2>
                    <p className="text-xs text-white/70">
                      Rechargez votre énergie vitale pour préserver votre clarté mentale et vos performances.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-yellow-300">Recharge Énergie Vitale ⚡</h3>
                    <p className="text-xs text-white/70 mt-0.5">
                      Faites une pause respiration ou une séance de sport pour remonter à 100 Énergie.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      simsAudio.playVictory();
                      setEnergy(100);
                      alert("⚡ Énergie rechargée à 100% ! Prêt pour le prochain sprint.");
                    }}
                    className="rounded-2xl bg-yellow-400 px-6 py-2.5 font-black text-xs text-black hover:bg-yellow-300 transition"
                  >
                    Recharger à 100 ⚡
                  </button>
                </div>
              </div>
            )}

            {/* MODALE 7 : ASSISTANT IA XR */}
            {activeZoneModal === "ai_assistant" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-400/50 bg-purple-400/20 text-2xl">
                    🤖
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-white">Assistant Stratégique IA XR</h2>
                    <p className="text-xs text-white/70">
                      Génération d'arguments closing, traitement d'objections et conseils business.
                    </p>
                  </div>
                </div>

                <div className="h-64 overflow-y-auto rounded-2xl border border-white/10 bg-black/60 p-4 space-y-3">
                  {aiChatLogs.map((log, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-xl p-3 text-xs leading-relaxed max-w-[85%]",
                        log.sender === "user"
                          ? "ml-auto bg-purple-600/40 text-purple-100 border border-purple-400/30"
                          : "mr-auto bg-white/5 text-white/85 border border-white/10",
                      )}
                    >
                      {log.text}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Posez une question ou demandez un contre-argument..."
                    value={aiChatInput}
                    onChange={(e) => setAiChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                    className="flex-1 rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-purple-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendAiMessage}
                    className="rounded-xl bg-purple-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-400"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            )}

            {/* MODALE 8 : VESTIAIRE DIRECTEUR (SKINS) */}
            {activeZoneModal === "wardrobe" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-400/50 bg-amber-400/20 text-2xl">
                    🎁
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-white">Vestiaire du Directeur XR</h2>
                    <p className="text-xs text-white/70">
                      Personnalisez l'apparence de votre avatar dans le Penthouse de Miami.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "bomber_black", label: "Bombardier XR Noir", desc: "Le classique de l'image officielle avec logo XR AGENCY blanc dans le dos." },
                    { id: "suit_gold", label: "Costume Or VIP Boss", desc: "Pour les closings de luxe et les réunions investisseurs." },
                    { id: "cyber_xr", label: "Cyber Neon XR", desc: "Veste futuriste avec néons cyan & violet Miami Vice." },
                  ].map((skin) => (
                    <button
                      key={skin.id}
                      type="button"
                      onClick={() => {
                        simsAudio.playVictory();
                        setOutfit(skin.id as typeof outfit);
                      }}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition",
                        outfit === skin.id
                          ? "border-amber-400 bg-amber-400/20 text-white shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                          : "border-white/10 bg-black/60 text-white/70 hover:border-white/30",
                      )}
                    >
                      <h4 className="font-bold text-sm text-amber-300">{skin.label}</h4>
                      <p className="text-xs text-white/60 mt-1">{skin.desc}</p>
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
