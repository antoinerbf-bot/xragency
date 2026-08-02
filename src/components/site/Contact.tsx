import { Mail, MessageCircle, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { EmberButton, Logo, Reveal } from "./primitives";

export function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="surface-plate rounded-4xl px-8 py-16 text-center sm:px-14">
          <Reveal>
            <p className="label-mono text-primary">{t(UI.contactLabel)}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-serif mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              {t(UI.contactTitle1)} <em className="italic text-primary">{t(UI.contactTitle2)}</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t(UI.contactLead)}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <EmberButton href="https://wa.me/84345678910">{t(UI.contactWhatsapp)}</EmberButton>
              <a
                href="mailto:contact@xragency2030.com"
                className="label-mono text-muted-foreground underline-offset-8 transition-colors hover:text-primary hover:underline"
              >
                contact@xragency2030.com
              </a>
            </div>
          </Reveal>
        </div>

        <footer className="mt-24">
          <div className="relative overflow-hidden rounded-4xl border border-border">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "var(--gradient-halo)" }}
            />
            <div className="relative px-8 py-12 sm:px-12">
              <a
                href="mailto:contact@xragency2030.com"
                className="display-serif block text-[clamp(2rem,7vw,4.5rem)] leading-[1.02] transition-colors hover:text-primary"
              >
                contact@xragency2030<span className="text-primary">.</span>com
              </a>

              <div className="mt-12 grid gap-8 border-t border-border/70 pt-8 sm:grid-cols-3">
                <div className="label-mono flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Paris
                    <br />
                    Da Nang
                    <br />
                    Dubai
                  </span>
                </div>
                <a
                  href="https://wa.me/33767566783"
                  className="label-mono flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    WhatsApp 24/7
                    <br />
                    +33 7 67 56 67 83
                  </span>
                </a>
                <a
                  href="mailto:contact@xragency2030.com"
                  className="label-mono flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {t(UI.contactEmail)}
                    <br />
                    FR · EN · VI
                  </span>
                </a>
              </div>

              <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <Logo />
                <p className="label-mono text-muted-foreground/70">{t(UI.footerMade)}</p>
                <p className="label-mono text-muted-foreground/70">
                  © {new Date().getFullYear()} — {t(UI.footerRights)}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}