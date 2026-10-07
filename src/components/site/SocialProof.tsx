import { useEffect, useRef, useState } from "react";
import { Reveal } from "./primitives";

/* ── Count-up hook (SSR-safe) ── */
function useCountUp(target: number, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const timeout = window.setTimeout(() => {
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

/* ── Animated stat ── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayed = useCountUp(visible ? value : 0, 1200, delay);

  return (
    <div ref={ref} className="text-center">
      <p className="display-serif text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-.05em]">
        {displayed}
        {suffix}
      </p>
      <p className="label-mono mt-3 text-[7px] tracking-[.22em] xr-muted-2">{label}</p>
    </div>
  );
}

/* ── Client sector marquee ── */
const SECTORS = [
  "Hôtellerie & Resorts",
  "Architecture d'intérieur",
  "Restaurants premium",
  "Mode & Accessoires",
  "Joaillerie & Horlogerie",
  "Immobilier de luxe",
  "Chirurgie esthétique",
  "Startups tech",
  "Avocats & Conseils",
  "E-commerce",
  "Beauté & Bien-être",
  "Finance & Patrimoine",
  "Tourisme & Expériences",
  "Automobile premium",
];

function SectorMarquee() {
  const items = [...SECTORS, ...SECTORS]; // double pour loop infini
  return (
    <div className="relative overflow-hidden py-4">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--xr-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--xr-bg)] to-transparent" />
      <div
        className="flex gap-3"
        style={{ animation: "marquee-scroll 32s linear infinite" }}
      >
        {items.map((s, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border xr-line bg-[var(--xr-surface)] px-4 py-2 label-mono text-[7px] tracking-[.16em] xr-muted whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--xr-accent)] opacity-40" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Testimonials ── */
const TESTIMONIALS = [
  {
    quote:
      "XR a complètement transformé notre présence digitale. Notre site génère maintenant 3× plus de réservations qu'avant.",
    author: "Directeur Général",
    company: "Boutique-Hôtel Paris 8e",
    sector: "Hôtellerie",
  },
  {
    quote:
      "En 6 semaines, nous sommes passés de la 4e à la 1ère position sur Google Maps. Le ROI est immédiat.",
    author: "Propriétaire",
    company: "Restaurant Gastronomique",
    sector: "Restauration",
  },
  {
    quote:
      "Le branding qu'ils ont créé est exactement ce que je voulais : premium, reconnaissable, différent. Rien de générique.",
    author: "Fondatrice",
    company: "Maison de joaillerie",
    sector: "Joaillerie",
  },
];

/* ── Main export ── */
export function SocialProof() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section className="xr-section-elevated relative overflow-hidden border-y xr-line py-16 sm:py-20 lg:py-28">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">

        {/* ── Stats ── */}
        <Reveal>
          <div className="mb-16 grid grid-cols-3 gap-8 border-b xr-line pb-16 sm:gap-12">
            <AnimatedStat value={500} suffix="+" label="PROJETS LIVRÉS" delay={0} />
            <AnimatedStat value={98} suffix="%" label="CLIENTS SATISFAITS" delay={120} />
            <AnimatedStat value={8} suffix="+" label="ANNÉES D'EXPÉRIENCE" delay={240} />
          </div>
        </Reveal>

        {/* ── Testimonial ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:items-center">
          <Reveal>
            <div>
              <span className="label-mono text-[8px] tracking-[.28em] xr-accent">
                CE QUE DIS NOS CLIENTS
              </span>
              <h2 className="display-serif mt-5 text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[.87] tracking-[-.055em]">
                Des résultats,<br />
                <em className="not-italic xr-muted">pas des promesses.</em>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 xr-muted">
                Chaque projet XR est conçu autour d'un objectif commercial précis. Pas simplement
                un site. Un levier de croissance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative min-h-[220px]">
              {/* Testimonial card */}
              <div
                key={active}
                className="rounded-[1.8rem] border xr-line bg-[var(--xr-surface)] p-7 shadow-[var(--xr-shadow)] backdrop-blur-xl sm:p-9"
                style={{ animation: "ember-rise 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                {/* Quote mark */}
                <div
                  aria-hidden
                  className="display-serif mb-4 text-5xl leading-none xr-muted-2 opacity-30 select-none"
                >
                  "
                </div>
                <blockquote className="text-base leading-7 font-medium sm:text-lg">
                  {t.quote}
                </blockquote>
                <footer className="mt-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border xr-line bg-[var(--xr-bg)] label-mono text-[7px] xr-muted-2">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold">{t.author}</p>
                    <p className="label-mono mt-0.5 text-[6px] tracking-[.16em] xr-muted-2">
                      {t.company} · {t.sector}
                    </p>
                  </div>
                </footer>
              </div>

              {/* Dots */}
              <div className="mt-4 flex items-center gap-2 justify-center">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Témoignage ${i + 1}`}
                    className={
                      "h-1.5 rounded-full transition-all duration-300 " +
                      (i === active
                        ? "w-6 bg-[var(--xr-accent)]"
                        : "w-1.5 bg-[var(--xr-line)] hover:bg-[var(--xr-muted)]")
                    }
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Sector marquee ── */}
        <Reveal delay={80}>
          <div className="mt-16 border-t xr-line pt-8">
            <p className="label-mono mb-4 text-center text-[7px] tracking-[.24em] xr-muted-2">
              SECTEURS ACCOMPAGNÉS
            </p>
            <SectorMarquee />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
