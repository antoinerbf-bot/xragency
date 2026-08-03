import { Mail, MessageCircle, MapPin, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Logo, Reveal } from "./primitives";

export function Contact() {
  const { t } = useLang();

  const rows = [
    { icon: Mail, label: t(UI.contactEmail), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MessageCircle, label: "WhatsApp 24/7", value: CONTACT.phone, href: CONTACT.whatsapp },
    { icon: MapPin, label: "Studios", value: CONTACT.cities, href: undefined },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
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
              <div className="mt-8 flex flex-wrap gap-4">
                <EmberButton href={CONTACT.whatsapp}>{t(UI.contactWhatsapp)}</EmberButton>
                <EmberButton variant="ghost" href={`mailto:${CONTACT.email}`}>
                  Email
                </EmberButton>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 border-t border-border">
          {rows.map((r, i) => {
            const Icon = r.icon;
            const inner = (
              <>
                <span className="label-mono w-40 shrink-0 text-muted-foreground">{r.label}</span>
                <span className="display-serif flex-1 text-xl transition-transform duration-500 group-hover:translate-x-1.5 sm:text-3xl">
                  {r.value}
                </span>
                <Icon className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </>
            );
            return (
              <Reveal key={i} delay={i * 80}>
                {r.href ? (
                  <a
                    href={r.href}
                    className="group flex items-center gap-5 border-b border-border py-7 transition-colors hover:bg-accent/60"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group flex items-center gap-5 border-b border-border py-7">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
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
