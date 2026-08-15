import {
  Mail,
  MessageCircle,
  MapPin,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Clock,
  Globe2,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Logo, Parallax, Reveal } from "./primitives";

export function Contact() {
  const { t } = useLang();

  const chips = [
    {
      icon: Clock,
      text: t({
        fr: "Réponse en moins de 2 h",
        en: "Reply in under 2 hours",
        vi: "Phản hồi dưới 2 giờ",
      }),
    },
    { icon: Globe2, text: t({ fr: "FR · EN · VI", en: "FR · EN · VI", vi: "FR · EN · VI" }) },
    { icon: MapPin, text: CONTACT.cities },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Parallax speed={-0.04} className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label-mono text-primary">{t(UI.contactLabel)}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-serif mt-6 text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]">
                {t(UI.contactTitle1)} <em className="italic text-primary">{t(UI.contactTitle2)}</em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={150}>
              <p className="text-base leading-relaxed text-muted-foreground">{t(UI.contactLead)}</p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-3">
                {chips.map(({ icon: Icon, text }, i) => (
                  <span
                    key={i}
                    className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {text}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Parallax>

        <Reveal delay={120}>
          <a
            href={`mailto:${CONTACT.email}`}
            className="group mt-14 block border-y border-border py-10 transition-colors hover:bg-accent/50"
          >
            <span className="label-mono text-muted-foreground">{t(UI.contactEmail)}</span>
            <span className="display-serif mt-4 flex items-center gap-4 text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none transition-transform duration-500 group-hover:translate-x-2">
              {CONTACT.email}
              <ArrowUpRight className="h-8 w-8 shrink-0 text-primary transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </a>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between gap-8 rounded-3xl bg-primary p-8 text-primary-foreground transition-transform duration-500 hover:-translate-y-1"
            >
              <MessageCircle className="h-7 w-7" />
              <div>
                <p className="label-mono opacity-80">WhatsApp · 24/7</p>
                <p className="display-serif mt-2 text-3xl">{CONTACT.phone}</p>
                <p className="label-mono mt-4 inline-flex items-center gap-2 opacity-90">
                  {t(UI.contactWhatsapp)}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </p>
              </div>
            </a>
          </Reveal>
          <Reveal delay={90}>
            <div className="surface-plate flex h-full flex-col justify-between gap-8 rounded-3xl p-8">
              <Mail className="h-7 w-7 text-primary" />
              <div>
                <p className="label-mono text-muted-foreground">
                  {t({
                    fr: "Brief, devis ou audit",
                    en: "Brief, quote or audit",
                    vi: "Brief, báo giá hoặc audit",
                  })}
                </p>
                <p className="display-serif mt-2 text-3xl">
                  {t({
                    fr: "Parlons de votre projet",
                    en: "Let's talk about your project",
                    vi: "Cùng bàn về dự án của bạn",
                  })}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <EmberButton href="#intelligence">{t(UI.ctaAnalysis)}</EmberButton>
                  <EmberButton variant="ghost" href={`mailto:${CONTACT.email}`}>
                    Email
                  </EmberButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <footer className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo />
            <p className="label-mono mt-4 text-muted-foreground/70">{t(UI.footerMade)}</p>
            <p className="label-mono mt-1 text-muted-foreground/70">{t(UI.footerRights)}</p>
          </div>
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href="#top"
              className="flex h-11 items-center gap-2 rounded-full border border-border px-5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <span className="label-mono">Top</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
