import studio from "@/assets/studio.jpg";
import craft from "@/assets/craft.jpg";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { Reveal } from "./primitives";

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
              src={studio}
              alt={t(UI.aboutLabel)}
              loading="lazy"
              width={1200}
              height={1504}
              className="h-full w-full rounded-3xl border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={200} className="col-span-2 self-end">
            <img
              src={craft}
              alt="XR Agency craft"
              loading="lazy"
              width={1200}
              height={912}
              className="w-full rounded-3xl border border-border object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}