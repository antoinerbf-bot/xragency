import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { Parallax, Reveal } from "./primitives";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=85&w=${w}`;

const GALLERY = [
  { src: u("1497366754035-f200968a6e72"), h: "h-[16rem] sm:h-[21rem]", speed: 0.06 },
  { src: u("1522071820081-009f0129c71c"), h: "h-[13rem] sm:h-[17rem]", speed: -0.05 },
  { src: u("1542744173-8e7e53415bb0"), h: "h-[15rem] sm:h-[19rem]", speed: 0.045 },
  { src: u("1521737711867-e3b97375f902"), h: "h-[12rem] sm:h-[15rem]", speed: -0.035 },
];

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
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
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={150}>
              <p className="text-base leading-relaxed text-muted-foreground">{t(UI.aboutText)}</p>
            </Reveal>
            <Reveal delay={220}>
              <p className="display-serif mt-8 border-t border-border pt-8 text-2xl sm:text-3xl">
                {t(UI.equation)}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 items-end gap-4 sm:gap-6 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={100 + i * 90}>
              <Parallax speed={g.speed}>
                <img
                  src={g.src}
                  alt={t(UI.aboutLabel)}
                  loading="lazy"
                  className={`w-full rounded-3xl border border-border object-cover grayscale transition-all duration-700 hover:scale-[1.02] hover:grayscale-0 ${g.h}`}
                />
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
