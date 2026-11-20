import React, { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CharacterSelectLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  errorMessage?: string | null;
}

interface HeroClass {
  id: "director" | "closer" | "student" | "hr_manager";
  title: string;
  subtitle: string;
  level: string;
  icon: React.ReactNode;
  auraColor: string;
  borderColor: string;
  badge: string;
  perks: string[];
  powerStat: string;
  placeholderEmail: string;
}

const HERO_CLASSES: HeroClass[] = [
  {
    id: "director",
    title: "Maître de Guilde",
    subtitle: "Direction générale & pilotage de l’agence",
    level: "DIRECTION",
    icon: <Crown className="h-7 w-7 text-[#D8BC94]" />,
    auraColor: "from-[#D8BC94]/15 via-[#9E7F5A]/5 to-transparent",
    borderColor: "border-[#D8BC94]",
    badge: "QG STRATÉGIQUE",
    perks: [
      "Pilotage financier, CA, MRR & facturation",
      "Attribution des leads & suivi projets",
      "Vision Pipeline Global & Espace Client",
    ],
    powerStat: "Contrôle 360° de l’agence",
    placeholderEmail: "admin@xragency.fr",
  },
  {
    id: "hr_manager",
    title: "Manager RH & Closer",
    subtitle: "Recrutement, formation des recrues & commissions 10%",
    level: "RH & CLOSER",
    icon: <Users className="h-7 w-7 text-indigo-400" />,
    auraColor: "from-indigo-600/15 via-purple-600/5 to-transparent",
    borderColor: "border-indigo-400/80",
    badge: "MANAGEMENT RH",
    perks: [
      "Recrutement & gestion de son équipe commerciale",
      "Formation 90j & plannings de ses recrues",
      "10 % d'override managérial sur son équipe (recrues à 20%)",
      "Accès Closer Martin pour ses propres ventes",
    ],
    powerStat: "Override 10% sur recrues",
    placeholderEmail: "martin@xragency.fr",
  },
  {
    id: "closer",
    title: "Apex Closer",
    subtitle: "Pipeline commercial & closing B2B",
    level: "ÉQUIPE",
    icon: <Swords className="h-7 w-7 text-[#D8BC94]" />,
    auraColor: "from-[#9E7F5A]/15 via-[#D8BC94]/5 to-transparent",
    borderColor: "border-[#9E7F5A]",
    badge: "ARÈNE COMMERCIALE",
    perks: [
      "Pipeline prospects, relances & appels",
      "Quêtes, XP, rangs & classement équipe",
      "Suivi commissions selon contrat",
    ],
    powerStat: "Progression RPG & missions",
    placeholderEmail: "prenom@xragency.fr",
  },
  {
    id: "student",
    title: "Apprenti XR School",
    subtitle: "Académie XR School 90 Jours",
    level: "ACADÉMIE",
    icon: <GraduationCap className="h-7 w-7 text-[#D8BC94]" />,
    auraColor: "from-[#D8BC94]/10 via-white/5 to-transparent",
    borderColor: "border-[#D8BC94]/70",
    badge: "ENTRAÎNEMENT",
    perks: [
      "Dojo d’objections & trames sectorielles",
      "Modules progressifs étape par étape",
      "Passerelle vers le CRM commercial",
    ],
    powerStat: "Montée en rang & XP",
    placeholderEmail: "eleve@xragency.fr",
  },
];

export function CharacterSelectLogin({
  onLogin,
  isLoading,
  errorMessage,
}: CharacterSelectLoginProps) {
  const [selectedHero, setSelectedHero] = useState<
    "director" | "closer" | "student" | "hr_manager"
  >("director");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const currentHero = HERO_CLASSES.find((h) => h.id === selectedHero) || HERO_CLASSES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password || isLoading) return;
    await onLogin(email.trim(), password);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-[#10100E] px-4 py-10 text-[#F7F4EE] sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full opacity-20 blur-[140px]"
          style={{
            background: "radial-gradient(circle, #D8BC94 0%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Top bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#F7F4EE]/15 bg-[#1B1915] px-4 py-2 text-xs font-medium text-[#F7F4EE]/80 transition hover:border-[#D8BC94] hover:text-[#F7F4EE]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour au site XR Agency
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-[#D8BC94]/35 bg-[#D8BC94]/10 px-4 py-2 text-xs font-semibold text-[#D8BC94] transition hover:bg-[#D8BC94] hover:text-[#171613]"
          >
            Vous êtes client ? Accéder à l’Espace Client
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D8BC94]/30 bg-[#1B1915] px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#D8BC94]" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D8BC94]">
              XR AGENCY · CRM INTERNE &amp; ARÈNE RPG
            </span>
          </div>

          <h1 className="font-serif text-3xl font-medium tracking-tight text-[#F7F4EE] sm:text-5xl">
            Portail Équipe XR Agency.{" "}
            <span className="block italic font-normal text-[#D8BC94]">
              Authentification sécurisée.
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-xs text-[#F7F4EE]/65 sm:text-sm">
            Sélectionnez votre espace puis connectez-vous avec votre adresse e-mail professionnelle
            et votre mot de passe personnel.
          </p>
        </div>

        {/* 4 Role Cards (visual workspace overview) */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {HERO_CLASSES.map((hero) => {
            const isSelected = selectedHero === hero.id;
            return (
              <button
                key={hero.id}
                type="button"
                onClick={() => setSelectedHero(hero.id)}
                className={cn(
                  "relative flex flex-col justify-between overflow-hidden rounded-3xl border p-5 text-start transition-all duration-300",
                  isSelected
                    ? `${hero.borderColor} bg-gradient-to-b ${hero.auraColor} bg-[#1A1814] shadow-xl`
                    : "border-[#F7F4EE]/12 bg-[#161512] hover:border-[#D8BC94]/40",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-[#F7F4EE]/12 bg-[#10100E] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#D8BC94]">
                    {hero.badge}
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-[#F7F4EE]/60">
                    {hero.level}
                  </span>
                </div>

                <div className="my-5 flex items-center gap-3.5">
                  <div
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border",
                      isSelected
                        ? "border-[#D8BC94]/50 bg-[#D8BC94]/15"
                        : "border-[#F7F4EE]/12 bg-[#1F1D18]",
                    )}
                  >
                    {hero.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#F7F4EE]">{hero.title}</h3>
                    <p className="mt-0.5 text-xs text-[#F7F4EE]/65">{hero.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-1.5 border-t border-[#F7F4EE]/10 pt-3">
                  {hero.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-[#F7F4EE]/75">
                      <Zap className="h-3 w-3 shrink-0 text-[#D8BC94]" />
                      <span className="truncate">{perk}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#F7F4EE]/10 pt-3 text-xs">
                  <span className="font-mono text-[10px] text-[#F7F4EE]/55">{hero.powerStat}</span>
                  {isSelected && (
                    <span className="flex items-center gap-1 font-mono text-[10px] font-semibold text-[#D8BC94]">
                      <CheckCircle2 className="h-3.5 w-3.5" /> ACTIF
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Real Secure Email + Password Form */}
        <div className="mx-auto max-w-md rounded-3xl border border-[#D8BC94]/30 bg-[#171613] p-6 shadow-2xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#F7F4EE]/10 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4.5 w-4.5 text-[#D8BC94]" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D8BC94]">
                  CONNEXION · {currentHero.title.toUpperCase()}
                </span>
              </div>
              <Lock className="h-4 w-4 text-[#F7F4EE]/45" />
            </div>

            <div>
              <label
                htmlFor="crm-email"
                className="mb-1.5 block text-xs font-medium text-[#F7F4EE]/80"
              >
                Adresse e-mail professionnelle
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F7F4EE]/45" />
                <input
                  id="crm-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentHero.placeholderEmail}
                  className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] py-3 pl-10 pr-4 text-sm text-[#F7F4EE] placeholder:text-[#F7F4EE]/35 focus:border-[#D8BC94] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="crm-password"
                className="mb-1.5 block text-xs font-medium text-[#F7F4EE]/80"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F7F4EE]/45" />
                <input
                  id="crm-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] py-3 pl-10 pr-11 text-sm text-[#F7F4EE] placeholder:text-[#F7F4EE]/35 focus:border-[#D8BC94] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Masquer" : "Afficher"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F7F4EE]/55 hover:text-[#D8BC94]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="rounded-xl border border-red-400/35 bg-red-500/15 p-3 text-center text-xs text-red-200"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || !email.trim() || !password}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D8BC94] py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171613] shadow-lg transition hover:bg-[#E7D2B1] disabled:opacity-45"
            >
              <span>{isLoading ? "Authentification..." : "Ouvrir mon espace CRM"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-2 text-center font-mono text-[10px] text-[#F7F4EE]/50">
              <Lock className="h-3 w-3" />
              <span>Session chiffrée HttpOnly · Protection anti-force brute active</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
