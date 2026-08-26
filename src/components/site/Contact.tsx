import {
  Mail,
  MessageCircle,
  MapPin,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Clock,
  Globe2,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Logo, Reveal } from "./primitives";

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
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* ── Impactful heading ── */}
        <Reveal>
          <p className="label-mono text-primary">{t(UI.contactLabel)}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-serif mt-6 text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]">
            {t(UI.contactHeading)}
          </h2>
        </Reveal>

        {/* ── Compact contact chips ── */}
        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5 text-primary" />
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5 text-primary" />
              WhatsApp · {CONTACT.phone}
            </a>
            <span className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {CONTACT.cities}
            </span>
            <span className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {t({ fr: "Réponse < 2 h", en: "Reply < 2h", vi: "Phản hồi < 2h" })}
            </span>
          </div>
        </Reveal>

        {/* ── Simplified form ── */}
        <Reveal delay={200}>
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
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div>
              <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                {t(UI.contactFormName)}
              </label>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
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
                className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                {t(UI.contactFormCompany)}
              </label>
              <input
                name="company"
                className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                placeholder="Company Inc."
              />
            </div>
            <div>
              <label className="label-mono mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground/60">
                {t(UI.contactFormWebsite)}
              </label>
              <input
                name="website"
                className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
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
                className="w-full appearance-none rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
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
                className="w-full resize-none rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                placeholder="Tell us about your project..."
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
              >
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                {t(UI.contactFormSubmit)}
              </button>
            </div>
          </form>
        </Reveal>

        {/* ── Mentions légales ── */}
        <div className="mt-16 border-t border-border/60 pt-10">
          <Reveal>
            <p className="label-mono text-xs text-primary">{t(UI.legalTitle)}</p>
          </Reveal>
          <div className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={40}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalCompany)}
                </span>
                <p className="mt-0.5 text-foreground">
                  KARMA <span className="text-muted-foreground">(XR Agency 2030)</span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalForm)}
                </span>
                <p className="mt-0.5 text-foreground">
                  SASU — Société par actions simplifiée unipersonnelle
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalCapital)}
                </span>
                <p className="mt-0.5 text-foreground">100,00 €</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalSiren)}
                </span>
                <p className="mt-0.5 text-foreground">889 178 141</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalSiret)}
                </span>
                <p className="mt-0.5 text-foreground">889 178 141 00012</p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalRcs)}
                </span>
                <p className="mt-0.5 text-foreground">RCS Paris</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalTva)}
                </span>
                <p className="mt-0.5 text-foreground">FR00 889 178 141</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalDirector)}
                </span>
                <p className="mt-0.5 text-foreground">M. Antoine Rebuffé</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalAddress)}
                </span>
                <p className="mt-0.5 text-foreground">
                  78 Avenue des Champs-Élysées, Bureau 562 — 75008 Paris
                </p>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div>
                <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {t(UI.legalHosting)}
                </span>
                <p className="mt-0.5 text-muted-foreground">{t(UI.legalHostingProvider)}</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Politique de confidentialité ── */}
        <div className="mt-10 border-t border-border/40 pt-8">
          <Reveal>
            <p className="label-mono text-[10px] uppercase tracking-wider text-primary">
              {t(UI.legalPrivacy)}
            </p>
            <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground/70">
              {t(UI.legalPrivacyText)}
            </p>
          </Reveal>
        </div>

        <footer className="mt-12 border-t border-border/40 pt-10">
          {/* Footer main grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Logo />
              <p className="label-mono mt-4 text-xs text-muted-foreground/70">{t(UI.footerMade)}</p>
              <p className="label-mono mt-1 text-xs text-muted-foreground/50">
                {t(UI.legalCopyright)}
              </p>
            </div>

            {/* Contact */}
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
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-foreground transition-colors hover:text-primary"
                >
                  WhatsApp · {CONTACT.phone}
                </a>
                <p className="text-sm text-muted-foreground">{CONTACT.cities}</p>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                Navigation
              </p>
              <div className="mt-3 space-y-2">
                <a
                  href="/#services"
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(UI.navServices)}
                </a>
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
                <a
                  href="/#faq"
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(UI.navFaq)}
                </a>
              </div>
            </div>

            {/* Légal */}
            <div>
              <p className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                {t(UI.footerLegal)}
              </p>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground">KARMA SASU</p>
                <p className="text-sm text-muted-foreground">SIREN 889 178 141 · RCS Paris</p>
                <p className="text-sm text-muted-foreground">
                  78 Av. des Champs-Élysées, 75008 Paris
                </p>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="label-mono text-[10px] text-muted-foreground/40">
              {t(UI.ctaReassurance)}
            </p>
            <div className="flex gap-3">
              {[
                { href: CONTACT.instagram, Icon: Instagram },
                { href: CONTACT.linkedin, Icon: Linkedin },
              ].map(({ href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <a
                href="#top"
                className="flex h-10 items-center gap-2 rounded-full border border-border px-4 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
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
