import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Crown,
  Swords,
  GraduationCap,
  Lock,
  KeyRound,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  Users,
  Camera,
  Shirt,
  User,
  Upload,
  Delete,
  Shield,
  Gamepad2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SimsAvatarConfig {
  displayName: string;
  gender: "male" | "female";
  skinTone: string;
  hairStyle: "boss_beard" | "fade_modern" | "brunette_long" | "blonde_exec" | "afro_fade" | "xr_cap";
  outfit: "bomber_xr" | "suit_gold" | "blazer_miami" | "cyber_neon";
  accessory: "gold_watch" | "ar_glasses" | "closer_headset" | "neon_aura";
  customFacePhotoUrl?: string;
}

export const DEFAULT_AVATAR_CONFIG: SimsAvatarConfig = {
  displayName: "Directeur XR",
  gender: "male",
  skinTone: "#d6a37e",
  hairStyle: "boss_beard",
  outfit: "bomber_xr",
  accessory: "gold_watch",
};

export function loadSavedAvatarConfig(): SimsAvatarConfig {
  if (typeof window === "undefined") return DEFAULT_AVATAR_CONFIG;
  try {
    const raw = window.localStorage.getItem("xr_sims_avatar_config_v15");
    if (raw) {
      return { ...DEFAULT_AVATAR_CONFIG, ...JSON.parse(raw) };
    }
  } catch {}
  return DEFAULT_AVATAR_CONFIG;
}

export function saveAvatarConfig(cfg: SimsAvatarConfig) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("xr_sims_avatar_config_v15", JSON.stringify(cfg));
  } catch {}
}

interface CharacterSelectLoginProps {
  onLogin?: (email: string, password: string, portal?: string) => Promise<void>;
  onLoginWithPin?: (
    portal: "director" | "closer" | "student" | "hr_manager",
    pin: string,
    email?: string,
  ) => Promise<void>;
  isLoading: boolean;
  errorMessage?: string | null;
}

interface RosterProfile {
  id: string;
  portal: "director" | "hr_manager" | "closer" | "student";
  name: string;
  roleBadge: string;
  email: string;
  officeTarget: string;
  defaultPinHint: string;
  commissionDesc: string;
  accentColor: string;
  defaultGender: "male" | "female";
  defaultHair: SimsAvatarConfig["hairStyle"];
  defaultOutfit: SimsAvatarConfig["outfit"];
}

const ROSTER_PROFILES: RosterProfile[] = [
  {
    id: "director",
    portal: "director",
    name: "Directeur XR (Antoine)",
    roleBadge: "👑 DIRECTION GÉNÉRALE",
    email: "admin@xragency.fr",
    officeTarget: "Bureau Direction & Cockpit Pro / Perso",
    defaultPinHint: "Code Directeur : 071266",
    commissionDesc: "Contrôle 360° · Pro, To-Do Perso, Achats, Planning & Supervision RH",
    accentColor: "from-amber-400 to-purple-500",
    defaultGender: "male",
    defaultHair: "boss_beard",
    defaultOutfit: "bomber_xr",
  },
  {
    id: "martin",
    portal: "hr_manager",
    name: "Martin (Manager RH & Closer)",
    roleBadge: "👥 PÔLE RH & RECRUTEMENT",
    email: "martin.leclipteur@gmail.com",
    officeTarget: "Bureau RH Exclusif & Bureau Closer Martin",
    defaultPinHint: "Code Équipe : 2026 (ou 071266)",
    commissionDesc: "10 % sur le CA de chaque recrutement (Christel, Camille...) + Closer 20%",
    accentColor: "from-indigo-400 to-purple-500",
    defaultGender: "male",
    defaultHair: "fade_modern",
    defaultOutfit: "suit_gold",
  },
  {
    id: "christel",
    portal: "closer",
    name: "Christel Thirion",
    roleBadge: "⚔️ CLOSER B2B (FILIÈRE MARTIN)",
    email: "christelthirion@msn.com",
    officeTarget: "Pôle Commercial · Poste Closer Christel",
    defaultPinHint: "Code Équipe : 2026",
    commissionDesc: "20 % sur les Sites Internet · 10 % sur Google Maps, CRM & Mensualités",
    accentColor: "from-emerald-400 to-teal-500",
    defaultGender: "female",
    defaultHair: "blonde_exec",
    defaultOutfit: "blazer_miami",
  },
  {
    id: "camille",
    portal: "closer",
    name: "Camille Bernard",
    roleBadge: "⚔️ CLOSER B2B (FILIÈRE MARTIN)",
    email: "camille.b@outlook.fr",
    officeTarget: "Pôle Commercial · Poste Closer Camille",
    defaultPinHint: "Code Équipe : 2026",
    commissionDesc: "20 % de commission sur ses ventes · Recrutée et formée par Martin",
    accentColor: "from-pink-400 to-purple-500",
    defaultGender: "female",
    defaultHair: "brunette_long",
    defaultOutfit: "blazer_miami",
  },
  {
    id: "lucas",
    portal: "closer",
    name: "Lucas Mercier",
    roleBadge: "⚔️ CLOSER CLASSIQUE (30%)",
    email: "lucas@xragency.fr",
    officeTarget: "Pôle Commercial · Poste Closer Senior",
    defaultPinHint: "Code Équipe : 2026",
    commissionDesc: "Commercial classique direct · 30 % sur les Sites Internet",
    accentColor: "from-cyan-400 to-blue-500",
    defaultGender: "male",
    defaultHair: "fade_modern",
    defaultOutfit: "bomber_xr",
  },
  {
    id: "sarah",
    portal: "closer",
    name: "Sarah Benali",
    roleBadge: "⚔️ CLOSER CLASSIQUE (30%)",
    email: "sarah@xragency.fr",
    officeTarget: "Pôle Commercial · Poste Closer Senior",
    defaultPinHint: "Code Équipe : 2026",
    commissionDesc: "Commerciale classique directe · 30 % sur les Sites Internet",
    accentColor: "from-amber-300 to-emerald-400",
    defaultGender: "female",
    defaultHair: "brunette_long",
    defaultOutfit: "blazer_miami",
  },
  {
    id: "school",
    portal: "student",
    name: "Karim & Emma (Académie 90J)",
    roleBadge: "🎓 XR SCHOOL 90 JOURS",
    email: "karim@xragency.fr",
    officeTarget: "Salle de Formation & Dojo Objections",
    defaultPinHint: "Code Élève : 2026",
    commissionDesc: "Formation intensive 90 jours + Passerelle Arène Commerciale",
    accentColor: "from-sky-400 to-indigo-500",
    defaultGender: "male",
    defaultHair: "afro_fade",
    defaultOutfit: "cyber_neon",
  },
];

export function CharacterSelectLogin({
  onLogin,
  onLoginWithPin,
  isLoading,
  errorMessage,
}: CharacterSelectLoginProps) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>("director");
  const currentProfile =
    ROSTER_PROFILES.find((p) => p.id === selectedProfileId) || ROSTER_PROFILES[0];

  const [email, setEmail] = useState<string>(ROSTER_PROFILES[0].email);
  const [pinCode, setPinCode] = useState<string>("");
  const [showPin, setShowPin] = useState<boolean>(false);

  // ── ÉTAT DU CRÉATEUR D'AVATAR 3D À SON EFFIGIE ──
  const [avatarConfig, setAvatarConfig] = useState<SimsAvatarConfig>(() => loadSavedAvatarConfig());

  // Synchronise le profil sélectionné avec l'email et l'avatar
  const handleSelectProfile = (profile: RosterProfile) => {
    setSelectedProfileId(profile.id);
    setEmail(profile.email);
    const updated: SimsAvatarConfig = {
      ...avatarConfig,
      displayName: profile.name.split(" (")[0],
      gender: profile.defaultGender,
      hairStyle: profile.defaultHair,
      outfit: profile.defaultOutfit,
    };
    setAvatarConfig(updated);
    saveAvatarConfig(updated);
  };

  const updateAvatarField = <K extends keyof SimsAvatarConfig>(
    key: K,
    value: SimsAvatarConfig[K],
  ) => {
    const updated = { ...avatarConfig, [key]: value };
    setAvatarConfig(updated);
    saveAvatarConfig(updated);
  };

  // Upload de sa vraie photo de visage pour l'effigie de l'avatar
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateAvatarField("customFacePhotoUrl", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const submitAuthentication = async (overridePin?: string) => {
    const codeToUse = (overridePin ?? pinCode).trim();
    if (!codeToUse || isLoading) return;
    saveAvatarConfig(avatarConfig);

    // Si le code est 071266 ou 07266, c'est le code maître Directeur
    const targetEmail =
      codeToUse === "071266" || codeToUse === "07266"
        ? selectedProfileId === "director"
          ? "admin@xragency.fr"
          : email.trim() || "admin@xragency.fr"
        : email.trim() || currentProfile.email;

    if (onLogin) {
      await onLogin(targetEmail, codeToUse, currentProfile.portal);
    } else if (onLoginWithPin) {
      await onLoginWithPin(currentProfile.portal, codeToUse, targetEmail);
    }
  };

  const handleDigitPress = (digit: string) => {
    if (pinCode.length >= 12) return;
    const next = pinCode + digit;
    setPinCode(next);
    // Connexion automatique instantanée dès que 071266 est tapé !
    if (next === "071266") {
      void submitAuthentication("071266");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#070510] text-white select-none font-sans">
      {/* ══════════════════════════════════════════════════════════════════════════
          ARRIÈRE-PLAN 3D PHOTORÉALISTE DU PENTHOUSE MIAMI (VOTRE IMAGE EXACTE)
          ══════════════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/xr-sims-hq-3d.jpg"
          alt="XR Agency Sims HQ 3D v1.5 Miami Penthouse"
          className="h-full w-full object-cover object-center scale-105 filter brightness-[0.82] contrast-[1.08]"
        />
        {/* Voile glassmorphism dégradé subtil pour faire ressortir les néons */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05040a]/90 via-[#0a0618]/45 to-[#06040e]/75" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          TOP-BAR HUD : BRANDING XR AGENCY SIMS HQ 3D v1.5
          ══════════════════════════════════════════════════════════════════════════ */}
      <header className="relative z-20 mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 pt-4 sm:px-8">
        <div className="flex items-center gap-4 rounded-2xl border border-purple-400/40 bg-black/65 px-5 py-2.5 backdrop-blur-2xl shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                XR
              </span>
              <div>
                <div className="font-black text-sm sm:text-base tracking-wide text-white leading-none">
                  AGENCY SIMS
                </div>
                <div className="font-mono text-xs font-bold text-purple-300">HQ 3D v1.5</div>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-xs">🌴</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                MIAMI PENTHOUSE HQ
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-4 py-2 text-xs font-bold text-white/85 backdrop-blur-xl transition hover:border-purple-400 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour au site
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-4 py-2 text-xs font-bold text-amber-300 backdrop-blur-xl transition hover:bg-amber-400 hover:text-black"
          >
            Espace Client
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════════
          COCKPIT CENTRAL 3 COLONNES :
          1. CHOIX DU MEMBRE & BUREAU
          2. CRÉATEUR D'AVATAR 3D À VOTRE EFFIGIE
          3. CLAVIER CODE PIN (071266) & ENTRÉE DANS LES BUREAUX 3D
          ══════════════════════════════════════════════════════════════════════════ */}
      <main className="relative z-20 mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          {/* ── COLONNE 1 (4 cols) : SÉLECTION DU MEMBRE & DE SON BUREAU ── */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-[2rem] border border-purple-400/35 bg-black/70 p-5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-purple-300">
                    ÉTAPE 1 · VOTRE POSTE
                  </span>
                  <h2 className="text-lg font-black text-white">Choisissez votre Bureau</h2>
                </div>
                <span className="rounded-full bg-purple-500/20 border border-purple-400/40 px-2.5 py-1 font-mono text-[10px] font-bold text-purple-200">
                  {ROSTER_PROFILES.length} Bureaux
                </span>
              </div>

              <div className="space-y-2.5 max-h-[470px] overflow-y-auto pr-1">
                {ROSTER_PROFILES.map((prof) => {
                  const isSelected = prof.id === selectedProfileId;
                  return (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => handleSelectProfile(prof)}
                      className={cn(
                        "w-full text-left rounded-2xl border p-3.5 transition-all duration-200 relative overflow-hidden",
                        isSelected
                          ? "border-amber-400 bg-gradient-to-r from-purple-900/60 via-indigo-950/60 to-amber-900/40 shadow-[0_0_25px_rgba(251,191,36,0.3)] scale-[1.01]"
                          : "border-white/10 bg-white/5 hover:border-purple-400/50 hover:bg-white/10",
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] font-black uppercase tracking-wider text-amber-300">
                          {prof.roleBadge}
                        </span>
                        {isSelected && (
                          <span className="rounded-full bg-emerald-400/20 border border-emerald-400/50 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                            SÉLECTIONNÉ
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-black text-white mt-1">{prof.name}</h3>
                      <p className="text-[11px] text-purple-200/80 font-medium mt-0.5">
                        📍 {prof.officeTarget}
                      </p>
                      <p className="text-[10px] text-white/55 mt-1">{prof.commissionDesc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-[11px] text-white/70">
              💡 Une fois connecté, votre avatar apparaît dans le <strong>Lobby 3D</strong> et vous marchez jusqu'à votre bureau pour vous asseoir devant votre ordinateur.
            </div>
          </div>

          {/* ── COLONNE 2 (4 cols) : STUDIO DE CRÉATION D'AVATAR 3D À VOTRE EFFIGIE ── */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-[2rem] border border-amber-400/40 bg-black/70 p-5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-amber-300">
                    ÉTAPE 2 · VOTRE EFFIGIE 3D
                  </span>
                  <h2 className="text-lg font-black text-white">Construisez votre Avatar</h2>
                </div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-amber-400/50 bg-amber-400/20 px-3 py-1.5 text-[11px] font-black text-amber-200 hover:bg-amber-400 hover:text-black transition">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Photo Visage</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Podium 3D de Prévisualisation de l'Avatar en Direct */}
              <div className="relative h-64 w-full rounded-3xl border border-purple-400/30 bg-gradient-to-b from-purple-950/50 via-[#120e24]/80 to-[#090812] flex flex-col items-center justify-center overflow-hidden shadow-inner">
                {/* Halo lumineux au sol */}
                <div className="absolute bottom-3 h-7 w-40 rounded-full bg-purple-500/30 blur-md border border-purple-300/40" />
                <div className="absolute top-3 left-3 rounded-full bg-black/60 border border-white/15 px-3 py-1 font-mono text-[10px] font-bold text-amber-300">
                  ✨ {avatarConfig.displayName}
                </div>
                {avatarConfig.customFacePhotoUrl && (
                  <button
                    type="button"
                    onClick={() => updateAvatarField("customFacePhotoUrl", undefined)}
                    className="absolute top-3 right-3 rounded-full bg-red-500/20 border border-red-400/40 px-2.5 py-0.5 text-[10px] font-bold text-red-200 hover:bg-red-500/40"
                  >
                    Réinitialiser photo
                  </button>
                )}

                {/* Rendu 3D de l'Avatar Personnalisé */}
                <div className="relative flex flex-col items-center z-10 mt-2">
                  {/* Aura Néon si activée */}
                  {avatarConfig.accessory === "neon_aura" && (
                    <div className="absolute -inset-4 rounded-full bg-purple-500/30 blur-xl animate-pulse" />
                  )}

                  {/* Tête / Visage à son effigie */}
                  <div
                    className="relative h-14 w-13 rounded-2xl border-2 border-amber-300/70 shadow-[0_0_20px_rgba(251,191,36,0.35)] overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: avatarConfig.skinTone }}
                  >
                    {avatarConfig.customFacePhotoUrl ? (
                      <img
                        src={avatarConfig.customFacePhotoUrl}
                        alt="Effigie Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        {/* Coiffure */}
                        <div
                          className={cn(
                            "w-14 h-4 -mt-2 rounded-t-xl",
                            avatarConfig.hairStyle === "blonde_exec"
                              ? "bg-amber-300"
                              : avatarConfig.hairStyle === "xr_cap"
                                ? "bg-purple-700 border-b-2 border-amber-400"
                                : "bg-[#1e1612]",
                          )}
                        />
                        {/* Yeux / Lunettes AR */}
                        {avatarConfig.accessory === "ar_glasses" ? (
                          <div className="mt-1.5 h-2.5 w-10 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] border border-white" />
                        ) : (
                          <div className="mt-1.5 flex gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-black" />
                            <span className="h-1.5 w-1.5 rounded-full bg-black" />
                          </div>
                        )}
                        {/* Barbe Boss ou Sourire */}
                        {avatarConfig.hairStyle === "boss_beard" ? (
                          <div className="mt-1.5 h-3 w-9 rounded-b-lg bg-[#1e1612]" />
                        ) : (
                          <div className="mt-2 h-1 w-4 rounded-full bg-black/50" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Veste / Bombardier XR AGENCY 3D */}
                  <div
                    className={cn(
                      "relative -mt-1 h-20 w-20 rounded-2xl border flex flex-col items-center justify-center shadow-2xl px-2",
                      avatarConfig.outfit === "bomber_xr" &&
                        "bg-gradient-to-b from-[#1f2026] via-[#121318] to-[#0a0b0e] border-white/25",
                      avatarConfig.outfit === "suit_gold" &&
                        "bg-gradient-to-b from-amber-600 via-amber-800 to-black border-amber-300",
                      avatarConfig.outfit === "blazer_miami" &&
                        "bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 border-amber-400 text-black",
                      avatarConfig.outfit === "cyber_neon" &&
                        "bg-gradient-to-b from-purple-700 via-indigo-900 to-black border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]",
                    )}
                  >
                    <span
                      className={cn(
                        "font-black text-base tracking-wider leading-none",
                        avatarConfig.outfit === "blazer_miami" ? "text-black" : "text-white",
                      )}
                    >
                      XR
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[7px] tracking-[0.25em] mt-0.5",
                        avatarConfig.outfit === "blazer_miami" ? "text-black/75" : "text-amber-300",
                      )}
                    >
                      AGENCY
                    </span>
                  </div>

                  {/* Pantalon & Chaussures */}
                  <div className="flex gap-1.5 -mt-0.5">
                    <div className="h-10 w-5 rounded-b-lg bg-[#11131a] border-x border-white/10" />
                    <div className="h-10 w-5 rounded-b-lg bg-[#11131a] border-x border-white/10" />
                  </div>
                </div>
              </div>

              {/* Contrôles de personnalisation de l'avatar */}
              <div className="mt-4 space-y-3">
                {/* Nom sur l'avatar */}
                <div>
                  <label className="block font-mono text-[10px] uppercase text-white/60 mb-1">
                    Nom affiché au-dessus de votre Avatar 3D
                  </label>
                  <input
                    type="text"
                    value={avatarConfig.displayName}
                    onChange={(e) => updateAvatarField("displayName", e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs font-bold text-white outline-none focus:border-amber-400"
                  />
                </div>

                {/* Choix de la Tenue */}
                <div>
                  <label className="block font-mono text-[10px] uppercase text-white/60 mb-1">
                    Tenue &amp; Veste Officielle
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "bomber_xr", label: "🖤 Bombardier XR" },
                      { id: "suit_gold", label: "👑 Costume Or VIP" },
                      { id: "blazer_miami", label: "🌴 Blazer Miami" },
                      { id: "cyber_neon", label: "⚡ Cyber Neon XR" },
                    ].map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() =>
                          updateAvatarField("outfit", o.id as SimsAvatarConfig["outfit"])
                        }
                        className={cn(
                          "rounded-xl border px-2.5 py-1.5 text-[11px] font-bold transition",
                          avatarConfig.outfit === o.id
                            ? "border-amber-400 bg-amber-400/20 text-amber-200"
                            : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coiffure & Style + Teint */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-white/60 mb-1">
                      Style &amp; Visage
                    </label>
                    <select
                      value={avatarConfig.hairStyle}
                      onChange={(e) =>
                        updateAvatarField(
                          "hairStyle",
                          e.target.value as SimsAvatarConfig["hairStyle"],
                        )
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/80 px-2.5 py-2 text-xs text-white outline-none focus:border-amber-400"
                    >
                      <option value="boss_beard">Coupe Boss + Barbe</option>
                      <option value="fade_modern">Dégradé Moderne</option>
                      <option value="brunette_long">Cheveux Longs Bruns</option>
                      <option value="blonde_exec">Blonde Executive</option>
                      <option value="afro_fade">Coupe Afro / Locks</option>
                      <option value="xr_cap">Casquette XR Agency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-white/60 mb-1">
                      Accessoire
                    </label>
                    <select
                      value={avatarConfig.accessory}
                      onChange={(e) =>
                        updateAvatarField(
                          "accessory",
                          e.target.value as SimsAvatarConfig["accessory"],
                        )
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/80 px-2.5 py-2 text-xs text-white outline-none focus:border-amber-400"
                    >
                      <option value="gold_watch">⌚ Montre Or Rose</option>
                      <option value="ar_glasses">🕶️ Lunettes AR Cyan</option>
                      <option value="closer_headset">🎧 Casque Closer</option>
                      <option value="neon_aura">✨ Aura Néon Boss</option>
                    </select>
                  </div>
                </div>

                {/* Nuancier Teint */}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[10px] uppercase text-white/60">Teint :</span>
                  <div className="flex gap-2">
                    {["#f3d2b8", "#e0b18c", "#d6a37e", "#a9714b", "#6b4128"].map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => updateAvatarField("skinTone", tone)}
                        style={{ backgroundColor: tone }}
                        className={cn(
                          "h-6 w-6 rounded-full border-2 transition",
                          avatarConfig.skinTone === tone
                            ? "border-amber-400 scale-110 shadow-[0_0_10px_#fbbf24]"
                            : "border-white/20",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── COLONNE 3 (4 cols) : PAVÉ TACTILE CODE PIN (071266) & CONNEXION 3D ── */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-[2rem] border border-purple-400/40 bg-black/75 p-5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)]">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-emerald-300">
                    ÉTAPE 3 · ACCÈS SÉCURISÉ
                  </span>
                  <h2 className="text-lg font-black text-white">Entrez dans le Penthouse 3D</h2>
                </div>
                <KeyRound className="h-5 w-5 text-amber-300" />
              </div>

              {/* Rappel du profil sélectionné */}
              <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-transparent p-3.5 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-amber-300">
                    {currentProfile.roleBadge}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-300 font-bold">
                    {currentProfile.defaultPinHint}
                  </span>
                </div>
                <div className="text-sm font-black text-white mt-0.5">{currentProfile.name}</div>
                <div className="mt-2">
                  <label className="block font-mono text-[9px] uppercase text-white/55 mb-1">
                    E-mail du compte sélectionné
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Écran d'affichage du Code PIN */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase text-white/70 font-bold">
                    Code PIN d'accès (ex: 071266)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="text-[10px] font-mono text-purple-300 hover:text-white flex items-center gap-1"
                  >
                    {showPin ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {showPin ? "Masquer" : "Afficher"}
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPin ? "text" : "password"}
                    value={pinCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPinCode(val);
                      if (val === "071266") {
                        void submitAuthentication("071266");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void submitAuthentication();
                      }
                    }}
                    placeholder="Tapez 071266 (Directeur) ou 2026"
                    className="w-full rounded-2xl border-2 border-purple-400/50 bg-black/80 px-4 py-3 text-center font-mono text-lg font-black tracking-[0.25em] text-amber-300 outline-none focus:border-amber-400 shadow-inner"
                  />
                  {pinCode && (
                    <button
                      type="button"
                      onClick={() => setPinCode("")}
                      className="absolute right-3 rounded-lg bg-white/10 px-2 py-1 text-[10px] font-mono text-white/70 hover:bg-white/20"
                    >
                      Effacer
                    </button>
                  )}
                </div>
              </div>

              {/* Pavé Numérique Tactile Arcade */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleDigitPress(digit)}
                    className="h-12 rounded-2xl border border-white/15 bg-white/5 font-mono text-base font-black text-white shadow-md transition active:scale-95 hover:border-amber-400/60 hover:bg-purple-500/20 hover:text-amber-300"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPinCode("")}
                  className="h-12 rounded-2xl border border-red-500/30 bg-red-500/10 font-mono text-xs font-bold text-red-300 transition hover:bg-red-500/25"
                >
                  CLR
                </button>
                <button
                  type="button"
                  onClick={() => handleDigitPress("0")}
                  className="h-12 rounded-2xl border border-white/15 bg-white/5 font-mono text-base font-black text-white shadow-md transition active:scale-95 hover:border-amber-400/60 hover:bg-purple-500/20 hover:text-amber-300"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => setPinCode((p) => p.slice(0, -1))}
                  className="h-12 rounded-2xl border border-white/15 bg-white/5 font-mono text-xs font-bold text-white/80 transition hover:bg-white/15 flex items-center justify-center"
                >
                  <Delete className="h-4 w-4" />
                </button>
              </div>

              {errorMessage && (
                <div className="mb-3 rounded-xl border border-red-500/50 bg-red-500/20 px-3 py-2 text-xs font-bold text-red-200 text-center">
                  {errorMessage}
                </div>
              )}

              {/* Bouton Principal d'Entrée dans le Penthouse 3D */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => void submitAuthentication()}
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-purple-600 py-3.5 px-5 font-black text-sm uppercase tracking-wider text-black shadow-[0_0_30px_rgba(251,191,36,0.5)] transition hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Gamepad2 className="h-5 w-5" />
                <span>
                  {isLoading
                    ? "Chargement du Penthouse 3D..."
                    : "Entrer dans le Penthouse 3D →"}
                </span>
              </button>
            </div>

            {/* Raccourci Connexion Instantanée Directeur 071266 */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  handleSelectProfile(ROSTER_PROFILES[0]);
                  setPinCode("071266");
                  void submitAuthentication("071266");
                }}
                className="w-full rounded-xl border border-amber-400/40 bg-amber-400/15 py-2 px-3 font-mono text-[11px] font-bold text-amber-300 hover:bg-amber-400 hover:text-black transition text-center"
              >
                ⚡ Accès Direct Directeur (Code 071266)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
