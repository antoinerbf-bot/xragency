import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { Reveal } from "./primitives";

/** Full-bleed parallax image divider between sections */
export function ParallaxDivider({
  image,
  overlay,
  caption,
  height = "50vh",
}: {
  image: string;
  overlay?: string;
  caption?: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!visible) return;
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const translate = (progress - 0.5) * 60;
      const img = el.querySelector("img") as HTMLImageElement | null;
      if (img) img.style.transform = `translate3d(0, ${translate.toFixed(1)}px, 0) scale(1.15)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <img
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-[130%] w-full object-cover will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) scale(1.15)" }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            overlay ??
            "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.25) 50%, rgba(10,10,10,0.5) 100%)",
        }}
      />
      {/* Caption */}
      {caption ? (
        <div className="absolute inset-0 flex items-end justify-center pb-8">
          <Reveal>
            <span className="label-mono rounded-full border border-white/20 bg-black/30 px-5 py-2 text-xs tracking-widest text-white/80 backdrop-blur-md">
              {caption}
            </span>
          </Reveal>
        </div>
      ) : null}
    </div>
  );
}

/** Horizontal scrolling text marquee with parallax speed */
export function ParallaxMarquee() {
  const { t } = useLang();
  const segment = t(UI.marqueeServices);
  const repeated = Array(3).fill(segment).join("");

  return (
    <div className="relative overflow-hidden border-y border-border/40 py-4 sm:py-5">
      {/* Subtle edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(90deg, var(--background), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(270deg, var(--background), transparent)" }}
      />
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee-x 40s linear infinite" }}
      >
        <span className="label-mono text-sm tracking-[0.25em] text-muted-foreground/30">
          {repeated}
        </span>
        <span className="label-mono text-sm tracking-[0.25em] text-muted-foreground/30">
          {repeated}
        </span>
      </div>
    </div>
  );
}

/** Large typographic reveal — text fades in word by word on scroll */
export function TextReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            const word = entry.target as HTMLSpanElement;
            word.style.transition = `opacity 0.6s ease ${idx * 80}ms, transform 0.6s ease ${idx * 80}ms`;
            word.style.opacity = "1";
            word.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    words.forEach((w) => obs.observe(w));
    return () => obs.disconnect();
  }, []);

  const words = text.split(/\s+/);

  return (
    <div ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          data-word
          data-idx={i}
          className="inline-block transition-all duration-500"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            marginRight: "0.3em",
          }}
        >
          {w}
        </span>
      ))}
    </div>
  );
}
