import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { Reveal } from "./primitives";

const STUDIO =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400";
const CRAFT =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
        <div>
          <Reveal>
            <p className="label-mono text-primary">{t(UI.aboutLabel)}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-serif mt-6 text-4xl sm:text-5xl lg:text-6xl">
              {t(UI.aboutTitle1)}
              <br />
              <em className="italic text-primary">{t(UI.aboutTitle2)}</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              {t(UI.aboutText)}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="display-serif mt-10 text-2xl text-muted-foreground sm:text-3xl">
              {t(UI.equation)}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <Reveal delay={100} className="col-span-3">
            <img
              src={STUDIO}
              alt={t(UI.aboutLabel)}
              loading="lazy"
              className="h-full w-full rounded-3xl border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={200} className="col-span-2 self-end">
            <img
              src={CRAFT}
              alt="XR Agency craft"
              loading="lazy"
              className="aspect-3/4 w-full rounded-3xl border border-border object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}