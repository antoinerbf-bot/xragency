import { useState, useMemo } from "react";
import {
  Crown,
  Swords,
  GraduationCap,
  Sparkles,
  Gamepad2,
  Lock,
  ArrowRight,
  Shield,
  Coins,
  CheckCircle2,
  Mail,
  Zap,
  Layers,
  Flame,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CrmGameLoginProps {
  onSelectCharacter: (email: string, pass: string, name: string) => void;
  isLoading: boolean;
}

type ProfileType = "boss" | "closer" | "student" | "unknown";

export function CrmGameLogin({ onSelectCharacter, isLoading }: CrmGameLoginProps) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [closerVariant, setCloserVariant] = useState<"lucas" | "sarah">("lucas");

  // Détection dynamique du type de profil selon l'e-mail
  const detectedProfile: ProfileType = useMemo(() => {
    const val = emailInput.trim().toLowerCase();
    if (!val) return "unknown";
    if (val.includes("admin") || val.includes("antoine") || val.includes("direction") || val.includes("boss")) {
      return "boss";
    }
    if (val.includes("lucas") || val.includes("sarah") || val.includes("vendeur") || val.includes("commercial") || val.includes("closer")) {
      return "closer";
    }
    if (val.includes("karim") || val.includes("eleve") || val.includes("student") || val.includes("school") || val.includes("formation")) {
      return "student";
    }
    return "unknown";
  }, [emailInput]);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mail = emailInput.trim().toLowerCase();
    if (!mail) return;

    const displayName = detectedProfile === "boss" ? "Direction" : detectedProfile === "closer" ? "Commercial" : detectedProfile === "student" ? "Élève" : "Membre XR";
    onSelectCharacter(mail, passwordInput, displayName);
  };

  const handlePortalClick = (profile: "boss" | "closer" | "student") => {
    if (profile === "boss") {
      onSelectCharacter(emailInput.trim().toLowerCase(), passwordInput, "Direction");
    } else if (profile === "closer") {
      if (closerVariant === "sarah") {
        onSelectCharacter(emailInput.trim().toLowerCase(), passwordInput, "Sarah");
      } else {
        onSelectCharacter(emailInput.trim().toLowerCase(), passwordInput, "Lucas");
      }
    } else {
      onSelectCharacter(emailInput.trim().toLowerCase(), passwordInput, "Karim");
    }
  };

  return (
    <div className="min-h-screen bg-[#030206] text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none">
      {/* Grille néon holographique & halos lumineux */}
      <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] rounded-full bg-gradient-to-b from-yellow-500/15 via-pink-500/10 to-transparent blur-[160px] pointer-events-none" />

      {/* Top Bar Futuriste */}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#f59e0b] to-[#b45309] text-black shadow-xl shadow-yellow-500/30 border border-yellow-200">
            <Zap className="h-6 w-6 text-black fill-black" />
          </div>
          <div>
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-yellow-400 block">
              XR METAVERSE COMMAND OS · v4.2
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">PORTAIL D&apos;AUTHENTIFICATION SÉCURISÉ</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-mono text-xs font-black text-emerald-300 flex items-center gap-1.5 shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> SERVEUR PRÊT · 3 UNIVERS SÉPARÉS
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-6xl py-6 space-y-8">
        {/* Titre & Sous-titre */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#00f2fe] bg-cyan-950/60 px-3.5 py-1 rounded-full border border-cyan-500/40">
            SYSTÈME DE CONNEXION PAR RÔLE &amp; E-MAIL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Accédez à votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-[#00f2fe] font-serif italic">cockpit sur-mesure</span>.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Entrez votre adresse e-mail ou sélectionnez votre portail d&apos;accès dédié : Directeur, Commercial ou Élève de formation.
          </p>
        </div>

        {/* BARRE DE CONNEXION INTELLIGENTE PAR E-MAIL (CYBER HOLOGRAPHIQUE) */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmitEmail}
            className={cn(
              "rounded-3xl border-2 p-2 sm:p-2.5 backdrop-blur-2xl transition-all duration-300 shadow-2xl flex flex-col sm:flex-row items-center gap-2",
              detectedProfile === "boss"
                ? "border-yellow-400 bg-yellow-950/40 shadow-[0_0_40px_rgba(250,204,21,0.4)]"
                : detectedProfile === "closer"
                ? "border-red-500 bg-red-950/40 shadow-[0_0_40px_rgba(239,68,68,0.4)]"
                : detectedProfile === "student"
                ? "border-[#00f2fe] bg-cyan-950/40 shadow-[0_0_40px_rgba(0,242,254,0.4)]"
                : "border-white/20 bg-black/80 hover:border-white/40"
            )}
          >
            <div className="flex items-center gap-3 px-4 w-full sm:w-auto flex-1 py-2 sm:py-0">
              <Mail className={cn(
                "h-5 w-5 shrink-0 transition",
                detectedProfile === "boss" ? "text-yellow-400" : detectedProfile === "closer" ? "text-red-400" : detectedProfile === "student" ? "text-[#00f2fe]" : "text-neutral-400"
              )} />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Entrez votre e-mail (ex: antoine@xragency.fr, lucas@..., karim@...)"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition active:scale-95 shadow-xl flex items-center justify-center gap-2",
                detectedProfile === "boss"
                  ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:opacity-95"
                  : detectedProfile === "closer"
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-95"
                  : detectedProfile === "student"
                  ? "bg-gradient-to-r from-[#00f2fe] to-cyan-400 text-black hover:opacity-95"
                  : "bg-gradient-to-r from-neutral-200 to-white text-black hover:opacity-90"
              )}
            >
              <span>{isLoading ? "Connexion..." : "Déverrouiller mon Poste"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Détecteur de profil en direct */}
          {detectedProfile !== "unknown" && (
            <div className="mt-2 text-center animate-in fade-in slide-in-from-top-1">
              {detectedProfile === "boss" && (
                <span className="font-mono text-xs font-black text-yellow-300 flex items-center justify-center gap-1.5">
                  <Crown className="h-3.5 w-3.5 text-yellow-400" />
                  ACCÈS DIRECTION RECONNU : Antoine (Boss Suprême · QG &amp; To-Do Secrète)
                </span>
              )}
              {detectedProfile === "closer" && (
                <span className="font-mono text-xs font-black text-red-300 flex items-center justify-center gap-1.5">
                  <Swords className="h-3.5 w-3.5 text-red-400" />
                  ACCÈS COMMERCIAL RECONNU : Arène de Closing &amp; Tirelire de Primes
                </span>
              )}
              {detectedProfile === "student" && (
                <span className="font-mono text-xs font-black text-cyan-300 flex items-center justify-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-[#00f2fe]" />
                  ACCÈS ÉLÈVE XR SCHOOL RECONNU : Dojo 90 Jours &amp; Trames Métiers
                </span>
              )}
            </div>
          )}
        </div>

        {/* SÉPARATEUR FUTURISTE */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="absolute bg-[#030206] px-4 font-mono text-[9px] font-black uppercase tracking-widest text-neutral-500">
            OU ACCÈS DIRECT EN 1 CLIC PAR PORTAIL
          </span>
        </div>

        {/* LES 3 GRANDS PORTAILS D'ACCÈS 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PORTAIL 1 : ANTOINE · DIRECTION GÉNÉRALE */}
          <div
            onClick={() => handlePortalClick("boss")}
            className="rounded-3xl border-2 border-yellow-500/40 bg-gradient-to-b from-yellow-950/30 via-black to-black p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer backdrop-blur-xl group hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(250,204,21,0.3)] relative"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400 uppercase">
                  DIRECTEUR GÉNÉRAL
                </span>
                <span className="rounded-full bg-yellow-400/20 px-2.5 py-0.5 text-[9px] font-black text-yellow-300 font-mono">
                  👑 BOSS SUPRÊME
                </span>
              </div>

              <div className="my-5 flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-yellow-500/10 border-2 border-yellow-400/40 text-5xl shadow-xl group-hover:scale-110 transition duration-300">
                  👑
                </div>
                <h3 className="mt-3 text-2xl font-black text-white group-hover:text-yellow-300 transition">
                  Antoine
                </h3>
                <p className="text-xs text-neutral-300 font-medium">Direction Générale &amp; Fondateur</p>
                <span className="mt-1 font-mono text-[10px] text-yellow-400/80">admin@xragency.fr</span>
              </div>

              <div className="space-y-2 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                  <span>Trésorerie QG &amp; Coffre Agence (48 500 €)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                  <span>To-Do List Secrète Pro &amp; Perso (Strictement Privée)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                  <span>Validation des Maquettes 3D &amp; Envoi de Packs de Leads</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handlePortalClick("boss")}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:opacity-95 shadow-xl transition active:scale-95"
              >
                <span>Entrer en tant que Boss Antoine</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* PORTAIL 2 : COMMERCIAUX & CLOSERS D'ÉLITE */}
          <div
            onClick={() => handlePortalClick("closer")}
            className="rounded-3xl border-2 border-red-500/40 bg-gradient-to-b from-red-950/30 via-black to-black p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer backdrop-blur-xl group hover:border-red-400 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(239,68,68,0.3)] relative"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[9px] font-black tracking-widest text-red-400 uppercase">
                  POSTE COMMERCIAL D&apos;ÉLITE
                </span>
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setCloserVariant("lucas")}
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-[9px] font-black font-mono transition",
                      closerVariant === "lucas" ? "bg-red-500 text-white" : "bg-white/10 text-neutral-400"
                    )}
                  >
                    Lucas (18%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCloserVariant("sarah")}
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-[9px] font-black font-mono transition",
                      closerVariant === "sarah" ? "bg-pink-500 text-white" : "bg-white/10 text-neutral-400"
                    )}
                  >
                    Sarah (20%)
                  </button>
                </div>
              </div>

              <div className="my-5 flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 border-2 border-red-400/40 text-5xl shadow-xl group-hover:scale-110 transition duration-300">
                  {closerVariant === "lucas" ? "🥷" : "🧝‍♀️"}
                </div>
                <h3 className="mt-3 text-2xl font-black text-white group-hover:text-red-300 transition">
                  {closerVariant === "lucas" ? "Lucas Martin" : "Sarah Benali"}
                </h3>
                <p className="text-xs text-neutral-300 font-medium">Vendeur &amp; Closer High-Ticket</p>
                <span className="mt-1 font-mono text-[10px] text-red-400/80">
                  {closerVariant === "lucas" ? "lucas@xragency.fr" : "sarah@xragency.fr"}
                </span>
              </div>

              <div className="space-y-2 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span>Arène d&apos;Appels &amp; Pipeline de Closing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span>Demande de Maquettes en 1 clic (Maps, Insta, FB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span>Tirelire de Commissions &amp; Concours d&apos;Ego 🏆</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-95 shadow-xl transition active:scale-95"
              >
                <span>Entrer dans l&apos;Arène Commerciale</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* PORTAIL 3 : ÉLÈVES XR SCHOOL 90J */}
          <div
            onClick={() => handlePortalClick("student")}
            className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-cyan-950/30 via-black to-black p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer backdrop-blur-xl group hover:border-[#00f2fe] hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,242,254,0.3)] relative"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[9px] font-black tracking-widest text-[#00f2fe] uppercase">
                  PROGRAMME ACCÉLÉRÉ 90J
                </span>
                <span className="rounded-full bg-cyan-400/20 px-2.5 py-0.5 text-[9px] font-black text-cyan-300 font-mono">
                  🥋 DOJO FORMATION
                </span>
              </div>

              <div className="my-5 flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10 border-2 border-cyan-400/40 text-5xl shadow-xl group-hover:scale-110 transition duration-300">
                  🥋
                </div>
                <h3 className="mt-3 text-2xl font-black text-white group-hover:text-[#00f2fe] transition">
                  Karim Diallo
                </h3>
                <p className="text-xs text-neutral-300 font-medium">Élève XR School · Ceinture Marron (J42)</p>
                <span className="mt-1 font-mono text-[10px] text-cyan-400/80">karim@xragency.fr</span>
              </div>

              <div className="space-y-2 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#00f2fe] shrink-0" />
                  <span>Trames par Métier (Restau, BTP, Retail, Luxe, Beauté)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#00f2fe] shrink-0" />
                  <span>Méthode Setting (45s) &amp; Closing (Paiement acompte)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#00f2fe] shrink-0" />
                  <span>Simulateur d&apos;Appel sans stress &amp; validation Sensei</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#00f2fe] to-cyan-400 text-black hover:opacity-95 shadow-xl transition active:scale-95"
              >
                <span>Entrer au Dojo XR School</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 text-xs text-neutral-400">
        <span>XR Agency Metaverse OS · Connexion étanche avec séparation totale des environnements</span>
        <span className="font-mono text-yellow-400">Direction = Contrôle 360° · Commerciaux = Arène · Élèves = Dojo</span>
      </div>
    </div>
  );
}

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]