import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  MessageCircle,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_PHONE = "33767566783";

export function AuditExpressSection() {
  const [company, setCompany] = useState("");
  const [citySector, setCitySector] = useState("");
  const [phoneOrWa, setPhoneOrWa] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!company.trim() || !phoneOrWa.trim()) {
      setErrorMsg("Veuillez renseigner le nom de votre entreprise et votre numéro de téléphone.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: `Responsable ${company}`,
          email: `${company.toLowerCase().replace(/[^a-z0-9]/g, "") || "prospect"}@contact-client.fr`,
          company: company.trim(),
          phone: phoneOrWa.trim(),
          city: citySector.trim() || "France",
          service: "Audit 360° Offert (Google Maps & Web)",
          message: `Demande d'Audit 360° Express via le site pour l'entreprise "${company}" (${citySector}). Téléphone : ${phoneOrWa}.`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg("Une erreur est survenue lors de l'envoi. Vous pouvez nous contacter directement sur WhatsApp.");
      }
    } catch {
      setErrorMsg("Erreur réseau. Vous pouvez nous contacter directement sur WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const fastTrackWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Bonjour Antoine, je viens de demander l'audit 360° offert pour "${company || "mon entreprise"}" (${citySector || "ma ville"}). Pouvons-nous faire le point rapidement ?`
  )}`;

  return (
    <section id="diagnostic" className="relative py-20 bg-[#06070b] text-white border-y border-white/10 overflow-hidden scroll-mt-20">
      <div id="audit-express" className="absolute -top-10" />
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,#d4af37_0%,transparent_60%)]"
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="rounded-3xl border border-[#d4af37]/30 bg-gradient-to-b from-[#11131c] via-[#090b10] to-[#040508] p-6 sm:p-12 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-300">
                <FileSearch className="h-3.5 w-3.5 text-amber-400" />
                <span>DIAGNOSTIC STRATÉGIQUE SANS ENGAGEMENT</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Recevez votre Diagnostic 360° <br />
                <span className="font-serif font-light italic text-[#d4af37]">Offert sous 24h.</span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Avant de dépenser le moindre euro, découvrez exactement où vous perdez des clients
                face à vos concurrents locaux sur Google Maps, sur mobile et dans votre secteur.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  "Analyse de votre position réelle sur Google Maps face au Top 3 local",
                  "Vérification de la vitesse d'affichage mobile & des points de friction",
                  "Estimation chiffrée du gain potentiel de clients et d'appels",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 3-Field Express Form */}
            <div className="lg:col-span-5">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 grid place-items-center">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Demande d&apos;Audit Enregistrée !</h3>
                    <p className="mt-1 text-xs text-neutral-300">
                      Notre pôle stratégique analyse actuellement votre visibilité pour « {company} ».
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={fastTrackWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3 px-4 text-xs font-bold text-black transition shadow-lg"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Accélérer sur WhatsApp (Direct)</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/10 bg-[#07090e]/90 p-5 sm:p-6 space-y-4 shadow-xl"
                >
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                      1. Nom de votre entreprise / enseigne *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Poké-N-Ball, Restaurant L'Atelier..."
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                      2. Ville &amp; Secteur d&apos;activité
                    </label>
                    <input
                      type="text"
                      value={citySector}
                      onChange={(e) => setCitySector(e.target.value)}
                      placeholder="Ex: Paris 11e — Restauration, Lyon — BTP"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                      3. Téléphone ou WhatsApp pour l&apos;audit *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneOrWa}
                      onChange={(e) => setPhoneOrWa(e.target.value)}
                      placeholder="Ex: 06 12 34 56 78"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg p-2">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f3e8c8] via-[#d4af37] to-[#8f7422] py-3.5 px-4 text-xs font-black uppercase tracking-wider text-[#050608] transition hover:scale-[1.02] shadow-xl disabled:opacity-50"
                  >
                    <span>{loading ? "Génération..." : "Recevoir mon Audit 360° Offert"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-[9.5px] text-neutral-500 text-center">
                    🔒 Données strictement confidentielles. Aucun démarchage abusif.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
