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
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrmLead } from "@/routes/api/crm";

interface CrmTodo {
  id: string;
  category: "pro" | "perso";
  title: string;
  priority: "urgent" | "high" | "normal";
  deadline: string;
  tag: string;
  done: boolean;
  createdAt: string;
}

interface CrmGameWorldProps {
  currentUser: {
    id: string;
    email: string;
    fullName: string;
    role: "admin" | "member";
    title: string;
    commissionPct: number;
  };
  leads?: CrmLead[];
  onSelectLead?: (leadId: string) => void;
  todos: CrmTodo[];
  onToggleTodo: (todoId: string) => void;
  onAddTodo: (todo: Omit<CrmTodo, "id" | "createdAt">) => void;
  onDeleteTodo: (todoId: string) => void;
  switchUserRole: (email: string) => void;
  membersList?: { email: string; fullName: string; role: string; title: string }[];
}

// Moteur Audio Synthétiseur Web Audio API (0 fichier externe, son 8-bit rétro)
class RetroAudioSynth {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
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

  playCoin() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      /* Audio or storage fallback: keep the interface usable. */
    }
  }

  playHit() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      /* Audio or storage fallback: keep the interface usable. */
    }
  }

  playVictory() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = this.ctx!.currentTime + idx * 0.09;
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {
      /* Audio or storage fallback: keep the interface usable. */
    }
  }

  playStep() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(140, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      /* Audio or storage fallback: keep the interface usable. */
    }
  }
}

const audioSynth = new RetroAudioSynth();

interface FloatingCoin {
  id: string;
  x: number;
  y: number;
  value: number;
  type: "coin" | "diamond";
}

interface RoomZone {
  id: "boss_office" | "closing_arena" | "school_dojo" | "production_lab";
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  bgGrad: string;
  borderGlow: string;
  icon: typeof Crown;
  roleRequired?: "admin" | "member" | "all";
  desc: string;
}

const ROOMS: RoomZone[] = [
  {
    id: "boss_office",
    name: "Bureau du Boss (Antoine)",
    x: 40,
    y: 40,
    w: 320,
    h: 240,
    color: "#d4af37",
    bgGrad: "from-[#2a2108] via-[#151206] to-[#0c0d16]",
    borderGlow: "shadow-[0_0_35px_rgba(212,175,55,0.35)] border-[#d4af37]",
    icon: Crown,
    roleRequired: "admin",
    desc: "Trône en or, coffre de trésorerie, to-do list secrète pro & perso.",
  },
  {
    id: "closing_arena",
    name: "Arène de Closing (Commerciaux)",
    x: 420,
    y: 40,
    w: 360,
    h: 240,
    color: "#ef4444",
    bgGrad: "from-[#2e090d] via-[#170608] to-[#0c0d16]",
    borderGlow: "shadow-[0_0_35px_rgba(239,68,68,0.35)] border-red-500",
    icon: Swords,
    roleRequired: "all",
    desc: "Cercle de feu, combats d'objections RPG et chasse aux primes en or.",
  },
  {
    id: "school_dojo",
    name: "Dojo XR School 90j",
    x: 40,
    y: 320,
    w: 320,
    h: 240,
    color: "#00f2fe",
    bgGrad: "from-[#082229] via-[#051117] to-[#0a0c16]",
    borderGlow: "shadow-[0_0_35px_rgba(0,242,254,0.35)] border-[#00f2fe]",
    icon: GraduationCap,
    roleRequired: "all",
    desc: "Tatami d'entraînement, ceintures, scripts certifiés et cours vidéo.",
  },
  {
    id: "production_lab",
    name: "Atelier Caisse POS & 3D",
    x: 420,
    y: 320,
    w: 360,
    h: 240,
    color: "#a855f7",
    bgGrad: "from-[#220d33] via-[#12071a] to-[#0c0d16]",
    borderGlow: "shadow-[0_0_35px_rgba(168,85,247,0.35)] border-purple-500",
    icon: Store,
    roleRequired: "all",
    desc: "Engrenages en rotation, logiciels caisse livrés et robots Korben.",
  },
];

export function CrmGameWorld({
  currentUser,
  leads = [],
  onSelectLead,
  todos,
  onToggleTodo,
  onAddTodo,
  onDeleteTodo,
  switchUserRole,
  membersList = [],
}: CrmGameWorldProps) {
  const isAdmin = currentUser.role === "admin";
  const [activeRoom, setActiveRoom] = useState<RoomZone["id"] | null>(
    isAdmin ? "boss_office" : "closing_arena",
  );

  // Personnage position & orientation
  const [charPos, setCharPos] = useState<{ x: number; y: number }>({
    x: isAdmin ? 200 : 600,
    y: isAdmin ? 160 : 160,
  });
  const [charDirection, setCharDirection] = useState<"down" | "up" | "left" | "right">("down");
  const [isWalking, setIsWalking] = useState(false);
  const [avatarHat, setAvatarHat] = useState<"crown" | "glasses" | "ninja" | "headset">("crown");
  const [audioMuted, setAudioMuted] = useState(false);

  // Score et pièces collectées
  const [playerGold, setPlayerGold] = useState<number>(isAdmin ? 48500 : 1240);
  const [playerXp, setPlayerXp] = useState<number>(850);
  const [floatingTexts, setFloatingTexts] = useState<
    { id: string; text: string; x: number; y: number }[]
  >([]);

  // Pièces à ramasser sur la carte
  const [coins, setCoins] = useState<FloatingCoin[]>([
    { id: "c1", x: 220, y: 190, value: 50, type: "coin" },
    { id: "c2", x: 550, y: 180, value: 100, type: "diamond" },
    { id: "c3", x: 180, y: 440, value: 50, type: "coin" },
    { id: "c4", x: 600, y: 440, value: 100, type: "diamond" },
  ]);

  // État du mini-jeu d'arène
  const [battleMonster, setBattleMonster] = useState<{
    leadName: string;
    objection: string;
    hp: number;
    maxHp: number;
    reward: number;
  } | null>(null);
  const [battleMessage, setBattleMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Formulaire to-do express
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoCat, setNewTodoCat] = useState<"pro" | "perso">("pro");
  const [newTodoPriority, setNewTodoPriority] = useState<"urgent" | "high" | "normal">("urgent");

  // Déplacement du personnage
  const moveCharacter = useCallback(
    (dx: number, dy: number, dir: "down" | "up" | "left" | "right") => {
      setCharDirection(dir);
      setIsWalking(true);
      audioSynth.playStep();
      setTimeout(() => setIsWalking(false), 200);

      const newX = Math.max(50, Math.min(740, charPos.x + dx));
      const newY = Math.max(50, Math.min(520, charPos.y + dy));
      setCharPos({ x: newX, y: newY });

      // Vérifier ramassage de pièces
      setCoins((prev) => {
        const remaining: FloatingCoin[] = [];
        prev.forEach((coin) => {
          const dist = Math.hypot(coin.x - newX, coin.y - newY);
          if (dist < 40) {
            // Ramassé !
            audioSynth.playCoin();
            const bonus = coin.type === "diamond" ? 100 : 50;
            setPlayerGold((g) => g + bonus);
            setPlayerXp((x) => x + 25);

            const floatId = `fl-${Date.now()}`;
            setFloatingTexts((ft) => [
              ...ft,
              { id: floatId, text: `+${bonus} € 🪙`, x: coin.x, y: coin.y },
            ]);
            setTimeout(() => {
              setFloatingTexts((ft) => ft.filter((f) => f.id !== floatId));
            }, 1200);
          } else {
            remaining.push(coin);
          }
        });
        return remaining;
      });

      // Détection de la salle
      const detected = ROOMS.find(
        (r) => newX >= r.x && newX <= r.x + r.w && newY >= r.y && newY <= r.y + r.h,
      );
      if (detected) {
        if (detected.roleRequired === "admin" && !isAdmin) return;
        setActiveRoom(detected.id);
      }
    },
    [charPos, isAdmin],
  );

  // Écouteur clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) return;
      const step = 25;
      if (e.key === "ArrowUp" || e.key === "z" || e.key === "Z") moveCharacter(0, -step, "up");
      else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S")
        moveCharacter(0, step, "down");
      else if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q")
        moveCharacter(-step, 0, "left");
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        moveCharacter(step, 0, "right");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [charPos, isAdmin, moveCharacter]);

  const teleportToRoom = (room: RoomZone) => {
    if (room.roleRequired === "admin" && !isAdmin) {
      alert(
        "⛔ Bureau privé du Patron (Antoine) ! Choisissez le personnage Boss pour déverrouiller cette porte.",
      );
      return;
    }
    audioSynth.playCoin();
    setCharPos({ x: room.x + room.w / 2, y: room.y + room.h / 2 });
    setActiveRoom(room.id);
  };

  const startBattle = (lead: CrmLead) => {
    audioSynth.playHit();
    setBattleMonster({
      leadName: lead.company,
      objection: "« 2 000 €, c'est trop cher ! On est déjà sur Uber Eats et ça nous suffit ! »",
      hp: 100,
      maxHp: 100,
      reward: Math.round(lead.budgetEur * 0.2) || 400,
    });
    setBattleMessage("Un prospect sauvage résiste ! Choisissez votre attaque commerciale !");
  };

  const executeAttack = (power: number, moveName: string) => {
    if (!battleMonster) return;
    audioSynth.playHit();
    const newHp = Math.max(0, battleMonster.hp - power);
    setBattleMonster({ ...battleMonster, hp: newHp });

    if (newHp === 0) {
      audioSynth.playVictory();
      setShowConfetti(true);
      setPlayerGold((g) => g + battleMonster.reward);
      setPlayerXp((x) => x + 250);
      setBattleMessage(
        `🎉 VICTOIRE ÉPIQUE avec [${moveName}] ! CONTRAT SIGNÉ ! +${battleMonster.reward} € dans votre cagnotte et +250 XP ! 🏆`,
      );
      setTimeout(() => {
        setBattleMonster(null);
        setBattleMessage(null);
        setShowConfetti(false);
      }, 3500);
    } else {
      setBattleMessage(
        `💥 [${moveName}] inflige -${power} HP ! La résistance du client baisse à ${newHp}%.`,
      );
    }
  };

  const hotLeads = leads.filter((l) => l.priority === "urgent" || l.status === "to_call");
  const proTodos = todos.filter((t) => t.category === "pro");
  const persoTodos = todos.filter((t) => t.category === "perso");

  return (
    <div className="space-y-6 select-none">
      {/* ── BANDEAU ARCADE RPG ── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#d4af37]/40 bg-gradient-to-r from-[#0e101d] via-[#16182c] to-[#0a0c16] p-5 sm:p-6 shadow-[0_0_50px_rgba(212,175,55,0.18)]">
        {/* Effet néon pulsing */}
        <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#f59e0b] to-[#b45309] text-black shadow-lg shadow-[#d4af37]/30 border border-yellow-200">
              <Gamepad2 className="h-8 w-8 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#d4af37]">
                  XR AGENCY METAVERSE HQ · ARCADE EDITION
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                {currentUser.fullName}
                {isAdmin ? (
                  <span className="rounded-full bg-[#d4af37] px-3 py-0.5 text-[10px] font-black text-black shadow-sm">
                    👑 BOSS ULTIME
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black text-black shadow-sm">
                    ⚔️ CLOSER GUILDE
                  </span>
                )}
              </h2>
            </div>
          </div>

          {/* Outils & Options Audio */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Bouton Mute Audio 8-bit */}
            <button
              type="button"
              onClick={() => {
                const next = !audioMuted;
                setAudioMuted(next);
                audioSynth.enabled = !next;
                if (!next) audioSynth.playCoin();
              }}
              className={cn(
                "flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-bold transition",
                audioMuted
                  ? "border-red-500/40 bg-red-500/10 text-red-300"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-sm",
              )}
            >
              {audioMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4 animate-pulse" />
              )}
              <span>{audioMuted ? "Son : Muet" : "Sons 8-Bit : ON"}</span>
            </button>

            {/* Sélecteur de chapeau / skin avatar */}
            <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-black/60 p-1 text-xs">
              <span className="text-[10px] text-neutral-400 pl-2 pr-1 font-bold">Skin :</span>
              {[
                { id: "crown" as const, label: "👑" },
                { id: "glasses" as const, label: "😎" },
                { id: "ninja" as const, label: "🥋" },
                { id: "headset" as const, label: "🎧" },
              ].map((hat) => (
                <button
                  key={hat.id}
                  type="button"
                  onClick={() => {
                    setAvatarHat(hat.id);
                    audioSynth.playCoin();
                  }}
                  className={cn(
                    "rounded-xl px-2 py-1 text-sm transition",
                    avatarHat === hat.id
                      ? "bg-[#d4af37] text-black scale-110 shadow-sm"
                      : "hover:bg-white/10",
                  )}
                >
                  {hat.label}
                </button>
              ))}
            </div>

            {/* Sélecteur de personnage instantané */}
            <div className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 p-1">
              <span className="text-[10px] font-bold text-neutral-400 pl-2">Joueur :</span>
              <select
                aria-label="Changer d'avatar"
                value={currentUser.email}
                onChange={(e) => switchUserRole(e.target.value)}
                className="rounded-xl border border-white/10 bg-black px-3 py-1.5 text-xs font-black text-[#d4af37] outline-none cursor-pointer"
              >
                <option value="admin@xragency.fr">👑 Antoine (Boss)</option>
                <option value="lucas@xragency.fr">⚔️ Lucas (Closer Senior)</option>
                <option value="sarah@xragency.fr">🎯 Sarah (Closing School)</option>
                <option value="karim@xragency.fr">🎓 Karim (Élève J42)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jauges d'état style jeu vidéo */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 pt-4 text-xs font-mono">
          <div className="rounded-2xl bg-black/50 border border-white/10 p-3 flex items-center gap-3">
            <Coins className="h-6 w-6 text-[#d4af37] animate-spin" />
            <div>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">
                Cagnotte Or
              </span>
              <span className="text-base font-black text-[#d4af37]">
                {playerGold.toLocaleString("fr-FR")} €
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-black/50 border border-white/10 p-3 flex items-center gap-3">
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            <div>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">
                Points XP
              </span>
              <span className="text-base font-black text-yellow-300">{playerXp} XP (Niv. 14)</span>
            </div>
          </div>

          <div className="rounded-2xl bg-black/50 border border-white/10 p-3 flex items-center gap-3">
            <Flame className="h-6 w-6 text-red-500 animate-pulse" />
            <div>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">
                Quêtes Chaudes
              </span>
              <span className="text-base font-black text-red-400">
                {hotLeads.length} leads à closer
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-black/50 border border-white/10 p-3 flex items-center gap-3">
            <Target className="h-6 w-6 text-[#00f2fe]" />
            <div>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">
                Missions To-Do
              </span>
              <span className="text-base font-black text-[#00f2fe]">
                {todos.filter((t) => !t.done).length} en attente
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── LE MONDE INTERACTIF (QG 2D AVEC AVATAR + D-PAD RETRO) ── */}
      <div className="relative rounded-[2.5rem] border-2 border-white/15 bg-[#05060c] p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[500px]">
        {/* Grille néon cyberpunk au sol */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Pièces d'or flottantes à ramasser */}
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="absolute z-20 transition-all duration-300 flex items-center justify-center animate-bounce cursor-pointer"
            style={{
              left: `${Math.min(88, Math.max(8, (coin.x / 800) * 100))}%`,
              top: `${Math.min(85, Math.max(10, (coin.y / 600) * 100))}%`,
            }}
            onClick={() => {
              setCharPos({ x: coin.x, y: coin.y });
              moveCharacter(0, 0, "down");
            }}
            title="Marchez dessus pour ramasser !"
          >
            <span className="text-2xl drop-shadow-[0_0_12px_#d4af37]">
              {coin.type === "diamond" ? "💎" : "🪙"}
            </span>
          </div>
        ))}

        {/* Textes flottants d'or ramassé */}
        {floatingTexts.map((ft) => (
          <div
            key={ft.id}
            className="absolute z-30 font-black font-mono text-sm text-yellow-300 animate-out fade-out slide-out-to-top duration-1000 pointer-events-none drop-shadow-md"
            style={{
              left: `${(ft.x / 800) * 100}%`,
              top: `${(ft.y / 600) * 100}%`,
            }}
          >
            {ft.text}
          </div>
        ))}

        {/* Les 4 Salles de l'agence */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
          {ROOMS.map((room) => {
            const Icon = room.icon;
            const isSelected = activeRoom === room.id;
            const isLocked = room.roleRequired === "admin" && !isAdmin;

            return (
              <div
                key={room.id}
                onClick={() => teleportToRoom(room)}
                className={cn(
                  "relative rounded-3xl border-2 p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between backdrop-blur-md min-h-[210px] group",
                  isSelected
                    ? cn("scale-[1.02]", room.borderGlow, `bg-gradient-to-br ${room.bgGrad}`)
                    : "border-white/10 bg-black/50 hover:border-white/30 hover:bg-white/5",
                  isLocked && "opacity-50 border-dashed border-red-500/50",
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-black font-black shadow-lg"
                      style={{ backgroundColor: room.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white group-hover:text-[#d4af37] transition flex items-center gap-2">
                        {room.name}
                      </h3>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Zone de mission · Cliquez pour entrer
                      </span>
                    </div>
                  </div>

                  {isLocked ? (
                    <span className="flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/40 px-2.5 py-1 text-[9px] font-bold text-red-300">
                      <Lock className="h-3 w-3" /> Clé Boss Requise
                    </span>
                  ) : isSelected ? (
                    <span className="rounded-full bg-emerald-400 px-3 py-0.5 text-[9px] font-black text-black animate-pulse shadow-md">
                      VOUS ÊTES ICI
                    </span>
                  ) : null}
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed my-3 font-medium">
                  {room.desc}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                  {room.id === "boss_office" && (
                    <span className="text-[#d4af37] font-bold font-mono">
                      👑 {todos.filter((t) => !t.done).length} missions restantes
                    </span>
                  )}
                  {room.id === "closing_arena" && (
                    <span className="text-red-400 font-bold font-mono">
                      🔥 {hotLeads.length} monstres d&apos;objections
                    </span>
                  )}
                  {room.id === "school_dojo" && (
                    <span className="text-[#00f2fe] font-bold font-mono">🥋 Dojo 90j actif</span>
                  )}
                  {room.id === "production_lab" && (
                    <span className="text-purple-400 font-bold font-mono">
                      ⚙️ Logiciels Caisse &amp; 3D
                    </span>
                  )}
                  <span className="text-neutral-400 group-hover:translate-x-1.5 transition font-black text-xs text-[#d4af37]">
                    Ouvrir la salle →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* AVATAR DU JOUEUR SUR LA CARTE (AVEC SKIN & ANIMATION) */}
        <div
          className="pointer-events-none absolute z-40 transition-all duration-300 ease-out flex flex-col items-center"
          style={{
            left: `${Math.min(85, Math.max(12, (charPos.x / 800) * 100))}%`,
            top: `${Math.min(82, Math.max(15, (charPos.y / 600) * 100))}%`,
          }}
        >
          {/* Bulle de nom flottante */}
          <div className="mb-1 rounded-full border border-yellow-400/80 bg-black/95 px-3 py-0.5 text-[10px] font-black text-yellow-300 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
            <span>
              {avatarHat === "crown" && "👑"}
              {avatarHat === "glasses" && "😎"}
              {avatarHat === "ninja" && "🥋"}
              {avatarHat === "headset" && "🎧"}
            </span>
            <span>{currentUser.fullName}</span>
          </div>

          {/* Sprite animé du joueur */}
          <div
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-2xl shadow-[0_0_30px_#d4af37] transition-transform duration-200 border-2 border-white",
              isAdmin
                ? "bg-gradient-to-tr from-[#d4af37] via-[#fef08a] to-[#ca8a04] text-black"
                : "bg-gradient-to-tr from-cyan-400 via-emerald-300 to-blue-500 text-black",
              isWalking && "scale-125 -translate-y-2 animate-bounce",
            )}
          >
            <User className="h-7 w-7" />
          </div>
        </div>

        {/* ── D-PAD VIRTUEL ARCADE EN BAS À GAUCHE (POUR JOUER À LA SOURIS / DOIGT) ── */}
        <div className="absolute bottom-5 left-5 z-30 flex flex-col items-center gap-1 bg-black/80 p-2 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl">
          <button
            type="button"
            onClick={() => moveCharacter(0, -30, "up")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black transition active:scale-90 font-bold"
            title="Haut (Z)"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => moveCharacter(-30, 0, "left")}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black transition active:scale-90 font-bold"
              title="Gauche (Q)"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => moveCharacter(0, 30, "down")}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black transition active:scale-90 font-bold"
              title="Bas (S)"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => moveCharacter(30, 0, "right")}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black transition active:scale-90 font-bold"
              title="Droite (D)"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── SALLES INTERACTIVES DÉTAILLÉES ── */}

      {/* 1. BUREAU DU BOSS : TO-DO PRIVÉE D'ANTOINE PRO & PERSO */}
      {activeRoom === "boss_office" && isAdmin && (
        <div className="rounded-[2.5rem] border-2 border-[#d4af37]/50 bg-gradient-to-b from-[#181308] via-[#0d0e18] to-[#07080f] p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#d4af37] uppercase tracking-wider">
                <Crown className="h-5 w-5" /> SANCTUAIRE DU PATRON (ANTOINE)
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                To-Do List Secrète Pro &amp; Perso
              </h3>
            </div>
            <div className="rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 font-mono text-xs font-bold text-[#d4af37]">
              Trésorerie agence · données à synchroniser
            </div>
          </div>

          {/* Formulaire ajout express de mission */}
          <div className="rounded-2xl border border-white/15 bg-black/60 p-4 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              + Ajouter une nouvelle mission dans votre to-do
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Ex: Valider virement 50% ou séance sport 45 min..."
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className="flex-1 rounded-xl border border-white/15 bg-white/5 p-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#d4af37] outline-none"
              />
              <select
                aria-label="Catégorie de la tâche"
                value={newTodoCat}
                onChange={(e) => setNewTodoCat(e.target.value as "pro" | "perso")}
                className="rounded-xl border border-white/15 bg-black px-3 py-2 text-xs font-bold text-white outline-none cursor-pointer"
              >
                <option value="pro">💼 Mission Pro Agence</option>
                <option value="perso">🧘 Défi Perso / Énergie</option>
              </select>
              <select
                aria-label="Priorité de la tâche"
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value as "urgent" | "high" | "normal")}
                className="rounded-xl border border-white/15 bg-black px-3 py-2 text-xs font-bold text-[#d4af37] outline-none cursor-pointer"
              >
                <option value="urgent">🔴 Urgent</option>
                <option value="high">🟡 Important</option>
                <option value="normal">🟢 Normal</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  if (!newTodoTitle.trim()) return;
                  audioSynth.playCoin();
                  onAddTodo({
                    category: newTodoCat,
                    title: newTodoTitle.trim(),
                    priority: newTodoPriority,
                    deadline: "Aujourd'hui",
                    tag: newTodoCat === "pro" ? "Direction" : "Santé",
                    done: false,
                  });
                  setNewTodoTitle("");
                }}
                className="rounded-xl bg-[#d4af37] px-6 py-3 text-xs font-black text-black hover:bg-yellow-400 transition active:scale-95 shadow-md"
              >
                Ajouter
              </button>
            </div>
          </div>

          {/* Grille To-Do Pro & Perso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Missions Pro */}
            <div className="rounded-2xl border border-[#d4af37]/30 bg-black/50 p-5 space-y-3">
              <span className="text-xs font-black text-[#d4af37] uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
                <Briefcase className="h-4 w-4" /> Missions Pro (
                {proTodos.filter((t) => !t.done).length} en attente)
              </span>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {proTodos.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "flex items-center justify-between rounded-xl border p-3.5 transition",
                      t.done
                        ? "border-white/5 bg-white/5 opacity-50 line-through"
                        : "border-white/10 bg-white/5 hover:border-[#d4af37]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          audioSynth.playCoin();
                          onToggleTodo(t.id);
                        }}
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-lg border transition",
                          t.done
                            ? "border-emerald-500 bg-emerald-500 text-black"
                            : "border-white/30 hover:border-white",
                        )}
                      >
                        {t.done && <Check className="h-4 w-4" />}
                      </button>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{t.title}</p>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {t.deadline} · {t.tag}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteTodo(t.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Objectifs Personnels */}
            <div className="rounded-2xl border border-purple-500/30 bg-black/50 p-5 space-y-3">
              <span className="text-xs font-black text-purple-300 uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
                <Heart className="h-4 w-4 text-red-400" /> Routine Perso &amp; Énergie (
                {persoTodos.filter((t) => !t.done).length} en attente)
              </span>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {persoTodos.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "flex items-center justify-between rounded-xl border p-3.5 transition",
                      t.done
                        ? "border-white/5 bg-white/5 opacity-50 line-through"
                        : "border-white/10 bg-white/5 hover:border-purple-400",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          audioSynth.playCoin();
                          onToggleTodo(t.id);
                        }}
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-lg border transition",
                          t.done
                            ? "border-emerald-500 bg-emerald-500 text-black"
                            : "border-white/30 hover:border-white",
                        )}
                      >
                        {t.done && <Check className="h-4 w-4" />}
                      </button>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{t.title}</p>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {t.deadline} · {t.tag}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteTodo(t.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ARÈNE DE CLOSING RPG (COMBATS D'OBJECTIONS LUDIQUES) */}
      {activeRoom === "closing_arena" && (
        <div className="rounded-[2.5rem] border-2 border-red-500/50 bg-gradient-to-b from-[#200a0d] via-[#100709] to-[#07080f] p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
          {showConfetti && (
            <div className="absolute inset-0 bg-yellow-500/10 z-50 flex items-center justify-center pointer-events-none animate-ping">
              <span className="text-7xl">🎉</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-500/30 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-wider">
                <Swords className="h-5 w-5" /> ARÈNE DES GLADIATEURS DU CLOSING
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Battez les Objections &amp; Raflez les Primes
              </h3>
            </div>
            <span className="rounded-full bg-red-500/20 border border-red-500/50 px-4 py-1.5 font-mono text-xs font-black text-red-300">
              ⚔️ {hotLeads.length} prospects en attente
            </span>
          </div>

          {battleMonster ? (
            <div className="rounded-3xl border-2 border-red-500 bg-black/90 p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black text-red-400 uppercase font-mono flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500 animate-bounce" /> PROSPECT :{" "}
                  {battleMonster.leadName}
                </span>
                <span className="text-sm font-mono font-black text-yellow-300">
                  Prime : +{battleMonster.reward} € 🪙
                </span>
              </div>

              {/* Barre HP */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-neutral-300">
                  <span>Défense psychologique du client :</span>
                  <span className="text-red-400 font-mono font-black">
                    {battleMonster.hp} / {battleMonster.maxHp} HP
                  </span>
                </div>
                <div className="h-4 w-full rounded-full bg-white/10 overflow-hidden border border-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-300 shadow-md"
                    style={{ width: `${battleMonster.hp}%` }}
                  />
                </div>
              </div>

              {/* Bulle d'objection du monstre */}
              <div className="rounded-2xl border-2 border-yellow-500/30 bg-yellow-500/10 p-5 text-sm sm:text-base text-yellow-200 font-bold italic shadow-inner">
                {battleMonster.objection}
              </div>

              {battleMessage && (
                <div className="rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 p-3 text-center text-xs font-black text-[#00f2fe] font-mono animate-pulse">
                  {battleMessage}
                </div>
              )}

              {/* Cartes d'attaques */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => executeAttack(40, "Calcul ROI Uber 20 Jours")}
                  className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 p-4 text-xs font-bold text-white hover:scale-105 transition active:scale-95 text-left shadow-lg border border-orange-400"
                >
                  <p className="font-black text-sm">⚔️ Attaque ROI 20 Jours (-40 HP)</p>
                  <p className="text-[11px] text-white/80 mt-1">
                    « Vous donnez 3 000 €/mois à Uber, votre CRM est rentabilisé en 20 jours. »
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => executeAttack(50, "Caisse Tactile + 0% Commission")}
                  className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 p-4 text-xs font-bold text-black hover:scale-105 transition active:scale-95 text-left shadow-lg border border-yellow-300"
                >
                  <p className="font-black text-sm">🛡️ Attaque Zéro Com (-50 HP)</p>
                  <p className="text-[11px] text-black/80 mt-1">
                    « Vrais tickets, stocks au gramme, écran cuisine et 0% prélevé à vie. »
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => executeAttack(100, "Coup Fatal Jumeau 3D GTA")}
                  className="rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-4 text-xs font-bold text-white hover:scale-105 transition active:scale-95 text-left shadow-lg border border-purple-400"
                >
                  <p className="font-black text-sm">✨ Jumeau 3D GTA (-100 HP · KO)</p>
                  <p className="text-[11px] text-white/80 mt-1">
                    « Jumeau 3D digne d'un jeu vidéo pour impressionner vos investisseurs. »
                  </p>
                </button>
              </div>

              <div className="text-right pt-2">
                <button
                  type="button"
                  onClick={() => setBattleMonster(null)}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Fuir le combat
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads.slice(0, 6).map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-3xl border border-white/10 bg-black/60 p-5 space-y-3 flex flex-col justify-between hover:border-red-500 transition group hover:scale-[1.02]"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black uppercase text-[#d4af37] font-mono">
                        {lead.sector || "Restauration / Retail"}
                      </span>
                      <span className="rounded-full bg-red-500/20 text-red-300 px-2.5 py-0.5 text-[9px] font-black">
                        Budget {lead.budgetEur} €
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white mt-1 group-hover:text-red-400 transition">
                      {lead.company}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {lead.contactName} · {lead.city}
                    </p>
                  </div>

                  <div className="border-t border-white/8 pt-3 flex items-center justify-between">
                    <span className="text-xs text-neutral-300">
                      Prime :{" "}
                      <strong className="text-yellow-300 font-mono">
                        +{Math.round(lead.budgetEur * 0.2)} € 🪙
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => startBattle(lead)}
                      className="rounded-xl bg-red-500 px-4 py-2 text-xs font-black text-white hover:bg-red-600 transition flex items-center gap-1.5 active:scale-95 shadow-md"
                    >
                      <Swords className="h-4 w-4" />
                      <span>Closer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. DOJO XR SCHOOL 90J */}
      {activeRoom === "school_dojo" && (
        <div className="rounded-[2.5rem] border-2 border-[#00f2fe]/40 bg-gradient-to-b from-[#081a20] via-[#051117] to-[#07080f] p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#00f2fe]/30 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#00f2fe] uppercase tracking-wider">
                <GraduationCap className="h-5 w-5" /> DOJO DE COMBAT XR SCHOOL 90J
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Entraînement des Élèves &amp; Maîtrise des Scripts
              </h3>
            </div>
            <span className="rounded-full bg-[#00f2fe]/20 border border-[#00f2fe]/50 px-4 py-1.5 font-mono text-xs font-black text-[#00f2fe]">
              🥋 Ceinture Noire du Closing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "LEÇON 01",
                title: "Pitch 45s Anti-Uber",
                desc: "Faites comprendre en 45 secondes au restaurateur qu'il jette 36 000 €/an par la fenêtre.",
                reward: "+150 XP 🪙",
              },
              {
                step: "LEÇON 02",
                title: "Démo Caisse en Live",
                desc: "Tapez sur l'écran tactile et sortez le ticket thermique sous ses yeux ébahis.",
                reward: "+300 XP 🪙",
              },
              {
                step: "LEÇON 03",
                title: "Délégation Studio XR",
                desc: "Encaissez l'acompte et transmettez le projet à notre atelier technique sans stress.",
                reward: "+500 XP 💎",
              },
            ].map((m, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-black/60 p-6 space-y-3 hover:border-[#00f2fe] transition"
              >
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#00f2fe] font-mono">{m.step}</span>
                  <span className="rounded-full bg-[#00f2fe]/10 text-[#00f2fe] px-2.5 py-0.5 text-[10px] font-black">
                    {m.reward}
                  </span>
                </div>
                <h4 className="text-base font-black text-white">{m.title}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">{m.desc}</p>
                <button
                  type="button"
                  onClick={() => {
                    audioSynth.playCoin();
                    alert(`Lancement de la simulation vidéo : ${m.title}`);
                  }}
                  className="w-full rounded-xl bg-white/10 p-2.5 text-xs font-bold text-white hover:bg-[#00f2fe] hover:text-black transition"
                >
                  Lancer l&apos;exercice
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ATELIER PRODUCTION & LIVRAISON */}
      {activeRoom === "production_lab" && (
        <div className="rounded-[2.5rem] border-2 border-purple-500/40 bg-gradient-to-b from-[#190924] via-[#0d0713] to-[#07080f] p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/30 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black text-purple-400 uppercase tracking-wider">
                <Store className="h-5 w-5" /> ATELIER DES INVENTEURS &amp; PRODUCTION
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Fabrication des Logiciels Caisse &amp; Jumeaux 3D
              </h3>
            </div>
            <span className="rounded-full bg-purple-500/20 border border-purple-500/50 px-4 py-1.5 font-mono text-xs font-black text-purple-300">
              ⚙️ Usine en pleine activité
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                client: "Poké Bowl Fresh Paris",
                type: "Pack Pro 2 000 €",
                progress: 85,
                status: "Imprimantes thermiques connectées",
              },
              {
                client: "Burger Lounge Bruxelles",
                type: "Pack Digital Twin 3D 5 000 €",
                progress: 60,
                status: "Modélisation 3D GTA de la salle",
              },
              {
                client: "Trattoria Milano Lyon",
                type: "Pack Pro 2 000 €",
                progress: 95,
                status: "Tests livreurs GPS validés",
              },
              {
                client: "Concept Store Saint-Honoré",
                type: "Pack Pro 2 000 €",
                progress: 45,
                status: "Catalogue & fiches stocks",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-black/60 p-5 space-y-3"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black text-white text-sm">{p.client}</span>
                  <span className="font-mono text-[#d4af37] font-bold">{p.type}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-neutral-400 font-mono">
                    <span>{p.status}</span>
                    <span className="font-bold text-white">{p.progress}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-[#d4af37] rounded-full transition-all duration-500"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
