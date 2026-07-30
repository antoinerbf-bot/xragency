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
              {t(UI.contactText)}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <EmberButton href="https://wa.me/84345678910">{t(UI.ctaWhatsapp)}</EmberButton>
              <a
                href="mailto:contact@xragency2030.com"
                className="label-mono text-muted-foreground underline-offset-8 transition-colors hover:text-primary hover:underline"
              >
                contact@xragency2030.com
              </a>
            </div>
          </Reveal>
        </div>

        <footer className="mt-20 border-t border-border pt-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t(UI.footerTag)}</p>
            </div>
            <div className="label-mono space-y-3 text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Da Nang — Ho Chi Minh — Paris
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> contact@xragency2030.com
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp 24/7
              </p>
            </div>
          </div>
          <p className="label-mono mt-12 text-muted-foreground/70">
            © {new Date().getFullYear()} XR Agency 2030. {t(UI.footerRights)}
          </p>
        </footer>
      </div>
    </section>
  );
}