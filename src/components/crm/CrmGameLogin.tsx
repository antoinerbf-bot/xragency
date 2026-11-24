import { useState } from "react";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";

interface CrmGameLoginProps {
  onSelectCharacter: (email: string, pass: string, name: string) => void;
  isLoading: boolean;
}

/**
 * Legacy login wrapper kept for backward compatibility.
 * Requires explicit email + password — zero hardcoded secrets.
 */
export function CrmGameLogin({ onSelectCharacter, isLoading }: CrmGameLoginProps) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mail = emailInput.trim().toLowerCase();
    if (!mail || !passwordInput) return;
    onSelectCharacter(mail, passwordInput, mail.split("@")[0] || "Membre XR");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#10100E] p-6 text-[#F7F4EE]">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-[#171613] p-8 shadow-2xl">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
            XR AGENCY · CRM SÉCURISÉ
          </span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-medium">Connexion équipe</h1>
        <p className="mt-2 text-xs text-[#F7F4EE]/65">
          Utilisez vos identifiants professionnels délivrés par la Direction.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F7F4EE]/45" />
            <input
              type="email"
              required
              autoComplete="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="prenom@xragency.fr"
              className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] py-3 pl-10 pr-4 text-sm text-[#F7F4EE] focus:border-white focus:outline-none"
            />
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F7F4EE]/45" />
            <input
              type="password"
              required
              autoComplete="current-password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Mot de passe"
              className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] py-3 pl-10 pr-4 text-sm text-[#F7F4EE] focus:border-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !emailInput.trim() || !passwordInput}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-xs font-semibold uppercase tracking-wider text-[#12110E] transition hover:bg-[#F3F2EE] disabled:opacity-50"
          >
            <span>{isLoading ? "Connexion..." : "Se connecter"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
