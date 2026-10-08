import {
  Mail,
  MessageCircle,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  ArrowUpRight,
  Clock,
  Send,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Logo, Reveal } from "./primitives";

const WA_DIRECT = `https://wa.me/33767566783`;

function FacebookMark() { return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2V10H7.3v3h2.8v8h3.4Z"/></svg>; }
function TikTokMark() { return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M15.2 3h3.1c.2 1.5 1.1 2.8 2.7 3.6v3.1c-1.4-.1-2.7-.6-3.8-1.4v6.1c0 3.8-2.7 5.8-5.8 5.8-3.1 0-5.2-2-5.2-4.8 0-2.9 2.3-5 5.4-5 .4 0 .8 0 1.2.1v3.1c-.3-.1-.6-.1-.9-.1-1.2 0-2.2.7-2.2 1.9 0 1.1.8 1.8 1.9 1.8 1.2 0 2-.8 2-2.3V3Z"/></svg>; }

export function Contact({ showFooter = true }: { showFooter?: boolean }) {
  const { t } = useLang();
  const [need, setNeed] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const NEED_OPTIONS = [
    UI.contactFormNeedSite,
    UI.contactFormNeedRedesign,
    UI.contactFormNeedSeo,
    UI.contactFormNeedAds,
    UI.contactFormNeedAi,
    UI.contactFormNeedStrategy,
    UI.contactFormNeedOther,
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      company: fd.get("company") as string,
      website: fd.get("website") as string,
      need: fd.get("need") as string,
      message: fd.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Une erreur est survenue.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Erreur de transmission.");
    }
  };

  return (
    <section id="contact" className="xr-section relative py-20 sm:py-28 lg:py-32">
      {/* Warm ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.75 0.06 60 / 0.08), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* ── WhatsApp Direct CTA — Section principale warmth ── */}
        <Reveal>
          <div className="rounded-3xl border border-border/60 bg-accent/10 px-6 py-8 text-center sm:px-10 sm:py-10">
            <p className="label-mono text-xs text-primary">{t(UI.contactLabel)}</p>
            <h2 className="display-serif mt-4 text-[clamp(2rem,5vw,4rem)] leading-[0.96]">
              {t(UI.contactHeading)}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
              {t({
                fr: "La façon la plus directe et la plus rapide de nous parler. Réponse rapide.",
                en: "The most direct and fastest way to talk to us. Fast response.",
                vi: "Cách trực tiếp và nhanh nhất để liên hệ với chúng tôi. Phản hồi trong 2 giờ.",
              })}
            </p>

            {/* Main WhatsApp button — warm + pulse */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={WA_DIRECT}
                target="_blank"
                rel="noreferrer"
                id="contact-whatsapp-btn"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl wa-pulse"
                style={{ minWidth: "260px", justifyContent: "center" }}
              >
                <MessageCircle className="h-5 w-5 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                Réserver ma consultation WhatsApp
                <Phone className="h-4 w-4 opacity-60" />
              </a>
              <p className="label-mono text-[10px] text-muted-foreground/50">
                +33 7 67 56 67 83 · Sans engagement · Réponse rapide
              </p>
            </div>

            {/* Contact chips — compact */}
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <a
                href={`mailto:${CONTACT.email}`}
                className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                {CONTACT.email}
              </a>
              <span className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {CONTACT.cities}
              </span>
              <span className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {t({ fr: "Réponse rapide", en: "Fast response", vi: "Phản hồi nhanh" })}
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── Contact Form — secondary ── */}
        <Reveal delay={140}>
          <div className="mt-12">
            <p className="label-mono text-xs text-muted-foreground/60 mb-6 text-center">
              {t({ fr: "Ou envoyez-nous un message détaillé", en: "Or send us a detailed message", vi: "Hoặc gửi tin nhắn chi tiết" })}
            </p>
            {status === "success" ? (
              <div className="mx-auto max-w-xl rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center shadow-lg">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-lg mb-3">✓</span>
                <h3 className="display-serif text-2xl text-foreground">Message envoyé avec succès</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Merci pour votre confiance. Notre équipe étudie votre demande et vous répond dans un délai garanti de moins de 2 heures.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <a
                    href={WA_DIRECT}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Échanger directement sur WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {status === "error" && (
                  <div className="sm:col-span-2 lg:col-span-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-center text-xs text-destructive">
                    {errorMessage || "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous écrire sur WhatsApp."}
                  </div>
                )}
                <div>
                  <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    {t(UI.contactFormName)}
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    {t(UI.contactFormEmail)}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    {t(UI.contactFormCompany)}
                  </label>
                  <input
                    name="company"
                    className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                    placeholder="Company Inc."
                  />
                </div>
                <div>
                  <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    {t(UI.contactFormWebsite)}
                  </label>
                  <input
                    name="website"
                    className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                    placeholder="https://..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    {t(UI.contactFormNeed)}
                  </label>
                  <select
                    name="need"
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="">—</option>
                    {NEED_OPTIONS.map((key, i) => (
                      <option key={i} value={t(key)}>
                        {t(key)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    {t(UI.contactFormMessage)}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                    placeholder="Décrivez votre projet..."
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    {status === "loading" ? "Envoi en cours..." : t(UI.contactFormSubmit)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {showFooter ? <footer className="mt-14 border-t border-border/50 pt-8 sm:mt-16 sm:pt-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Studio digital premium pour les marques, entreprises et projets qui veulent transformer leur présence digitale en actif commercial.</p>
              <div className="mt-5 flex flex-wrap gap-2">{["FR","EN","VI","AR","RU"].map((lang)=><span key={lang} className="rounded-full border border-border/60 px-2.5 py-1 font-mono text-[9px] tracking-wider text-muted-foreground">{lang}</span>)}</div>
            </div>
            <div>
              <p className="label-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground/50">Navigation</p>
              <div className="mt-4 grid gap-2.5 text-sm">
                <Link to="/services" className="text-muted-foreground hover:text-foreground">Services</Link>
                <Link to="/realisations" className="text-muted-foreground hover:text-foreground">Réalisations</Link>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link>
                <a href="/#quote" className="text-muted-foreground hover:text-foreground">Devis sur mesure</a>
                <a href="/#audit" className="text-muted-foreground hover:text-foreground">Audit gratuit</a>
              </div>
            </div>
            <div>
              <p className="label-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground/50">07 Expertises</p>
              <div className="mt-4 grid gap-2.5 text-sm">
                <Link to="/services/$serviceId" params={{ serviceId: "websites" }} className="text-muted-foreground hover:text-foreground">01 · Sites web (dès 499 €)</Link>
                <Link to="/services/$serviceId" params={{ serviceId: "branding" }} className="text-muted-foreground hover:text-foreground">02 · Branding (dès 179 €)</Link>
                <Link to="/services/$serviceId" params={{ serviceId: "seo" }} className="text-muted-foreground hover:text-foreground">03 · SEO (dès 299 €/m)</Link>
                <Link to="/services/$serviceId" params={{ serviceId: "maps" }} className="text-muted-foreground hover:text-foreground">04 · Google Maps (dès 990 €/an)</Link>
                <Link to="/services/$serviceId" params={{ serviceId: "social" }} className="text-muted-foreground hover:text-foreground">05 · Social Media (dès 299 €/m)</Link>
                <Link to="/services/webcare" className="text-muted-foreground hover:text-foreground">06 · WebCare (dès 29 €/m)</Link>
                <Link to="/services/robotique" className="text-muted-foreground hover:text-foreground">07 · Robotique (dès 499 €)</Link>
              </div>
            </div>
            <div>
              <p className="label-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground/50">KARMA SASU</p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <a href="mailto:contact.xragency@gmail.com" className="block text-foreground hover:text-primary">contact.xragency@gmail.com</a>
                <a href={WA_DIRECT} target="_blank" rel="noreferrer" className="block hover:text-foreground">WhatsApp · +33 7 67 56 67 83</a>
                <p>SIREN 889 178 141 · SIRET 889 178 141 00012</p>
                <p>78 Avenue des Champs-Élysées · Bureau 562<br/>75008 Paris · France</p>
                <Link to="/mentions-legales" className="inline-flex pt-1 text-xs font-semibold text-primary hover:underline">Mentions légales & RGPD →</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-border/40 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div><p>KARMA SASU · XRAGENCY · © {new Date().getFullYear()} Tous droits réservés.</p><p className="mt-1 text-[10px] text-muted-foreground/50">Hébergement : o2switch · France · cadre RGPD</p></div>
            <div className="flex items-center gap-2">
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"><Instagram className="h-4 w-4"/></a>
              <a href="https://facebook.com/xragency" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"><Facebook className="h-4 w-4"/></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"><Linkedin className="h-4 w-4"/></a>
              <a href="mailto:contact.xragency@gmail.com" aria-label="Email" className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"><Send className="h-4 w-4"/></a>
              <a href="#top" className="flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-muted-foreground hover:border-primary hover:text-primary"><span className="label-mono text-[9px]">TOP</span><ArrowUpRight className="h-3 w-3"/></a>
            </div>
          </div>
        </footer> : null}
      </div>
    </section>
  );
}
