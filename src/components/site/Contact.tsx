import {
  Mail,
  MessageCircle,
  MapPin,
  Instagram,
  Linkedin,
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

export function Contact() {
  const { t } = useLang();
  const [need, setNeed] = useState("");

  const NEED_OPTIONS = [
    UI.contactFormNeedSite,
    UI.contactFormNeedRedesign,
    UI.contactFormNeedSeo,
    UI.contactFormNeedAds,
    UI.contactFormNeedAi,
    UI.contactFormNeedStrategy,
    UI.contactFormNeedOther,
  ];

  return (
    <section id="contact" className="relative py-12 sm:py-18 lg:py-24">
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const subject = encodeURIComponent(
                  fd.get("need")
                    ? `[${fd.get("need")}] ${fd.get("name")} — ${fd.get("company") || "N/A"}`
                    : `${fd.get("name")} — ${fd.get("company") || "N/A"}`,
                );
                const body = encodeURIComponent(
                  `${fd.get("message")}\n\n---\nName: ${fd.get("name")}\nEmail: ${fd.get("email")}\nCompany: ${fd.get("company")}\nWebsite: ${fd.get("website")}\nNeed: ${fd.get("need")}`,
                );
                window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
              }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
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
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {t(UI.contactFormSubmit)}
                </button>
              </div>
            </form>
          </div>
        </Reveal>

        <footer className="mt-10 border-t border-border/40 pt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Logo />
              <p className="label-mono mt-3 text-xs text-muted-foreground/70">{t(UI.footerMade)}</p>
              <p className="label-mono mt-1 text-xs text-muted-foreground/50">
                {t(UI.legalCopyright)}
              </p>
            </div>

            <div>
              <p className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                {t(UI.footerContact)}
              </p>
              <div className="mt-3 space-y-2">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block text-sm text-foreground transition-colors hover:text-primary"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={WA_DIRECT}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-foreground transition-colors hover:text-primary"
                >
                  WhatsApp · {CONTACT.phone}
                </a>
                <p className="text-sm text-muted-foreground">{CONTACT.cities}</p>
              </div>
            </div>

            <div id="legal">
              <p className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                Mentions légales
              </p>
              <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <p><strong className="text-foreground">KARMA SASU</strong> · Société par actions simplifiée unipersonnelle</p>
                <p>SIREN 889 178 141 · SIRET 889 178 141 00012 · RCS Paris</p>
                <p>Siège social : 78 Avenue des Champs-Élysées · Bureau 562 · 75008 Paris, France</p>
                <p>TVA intracommunautaire : FR00889178141 · Président : Antoine REBUFFÉ</p>
                <p>Hébergement : o2switch · Chemin des Pardiaux, 63000 Clermont-Ferrand, France</p>
                <p className="text-[11px] text-muted-foreground/60">Infrastructure en France · cadre RGPD · données traitées selon les finalités indiquées.</p>
                <a href="#legal" className="inline-flex text-xs font-semibold text-primary hover:underline">Mentions légales & RGPD →</a>
                <p>
                  <a href="mailto:contact.xragency@gmail.com" className="transition-colors hover:text-primary">Contact légal : contact.xragency@gmail.com</a>
                </p>
              </div>
            </div>

            <div>
              <p className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                Navigation & Services
              </p>
              <div className="mt-3 space-y-1.5">
                <Link
                  to="/services"
                  className="block text-sm font-semibold text-primary transition-colors hover:underline"
                >
                  Toutes les expertises (7) →
                </Link>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: "seo" }}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Référencement SEO
                </Link>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: "websites" }}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Création de Sites Web
                </Link>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: "maps" }}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Google Maps TOP 3
                </Link>

                <a
                  href="/#pricing"
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(UI.navPricing)}
                </a>
                <a
                  href="/#intelligence"
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(UI.navIntelligence)}
                </a>
              </div>
            </div>

          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="label-mono text-[10px] text-muted-foreground/40">
              {t(UI.ctaReassurance)}
            </p>
            <div className="flex gap-3">
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"><Instagram className="h-4 w-4" /></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"><Linkedin className="h-4 w-4" /></a>
              <span title="Facebook — lien à venir" aria-label="Facebook — lien à venir" className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground/50"><FacebookMark /></span>
              <span title="TikTok — lien à venir" aria-label="TikTok — lien à venir" className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground/50"><TikTokMark /></span>            <a
                href="#top"
                className="flex h-9 items-center gap-2 rounded-full border border-border px-3.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <span className="label-mono text-xs">Top</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
