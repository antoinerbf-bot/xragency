import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Parallax } from "./primitives";

const HERO_VIDEO = "https://cdn.coverr.co/videos/coverr-aerial-view-of-beautiful-resort-4739/1080p.mp4";
const HERO_POSTER = "https://images.unsplash.com/photo-1782413263988-11f7178cf385?auto=format&fit=crop&q=90&w=2200";

export function ImmersiveJourney() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    let raf = 0;
    const syncVideo = () => {
      raf = 0;
      if (!video.duration || !Number.isFinite(video.duration)) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      video.currentTime = progress * video.duration;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(syncVideo); };
    video.addEventListener("loadedmetadata", syncVideo);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      video.removeEventListener("loadedmetadata", syncVideo);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[190vh] overflow-hidden bg-[#050607] text-white" aria-label="Parcours immersif XR Agency">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <video ref={videoRef} muted playsInline preload="metadata" poster={HERO_POSTER} className="absolute inset-0 h-full w-full object-cover opacity-65">
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(255,255,255,.12),transparent_30%),linear-gradient(90deg,rgba(3,5,6,.96)_0%,rgba(3,5,6,.72)_43%,rgba(3,5,6,.18)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-[#050607]/30" />

        <div className="relative mx-auto flex h-full max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
          <div className="grid w-full gap-10 lg:grid-cols-1 lg:items-center">
            <Parallax speed={-0.05}>
              <div className="max-w-3xl">
                <span className="label-mono text-[9px] tracking-[.34em] text-white/45">XR AGENCY · THE DIGITAL JOURNEY</span>
                <h2 className="display-serif mt-5 text-[clamp(3.2rem,8vw,7.8rem)] leading-[.82] tracking-[-.04em]">
                  Entrez dans<br /><em className="text-white/55">l’expérience.</em>
                </h2>
                <p className="mt-7 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
                  Ici, vous ne consultez pas une agence. Vous traversez un parcours :
                  votre activité, vos objectifs, vos leviers — puis une recommandation construite autour de vous.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/#quote" className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] text-black transition hover:-translate-y-1">
                    Commencer l’aventure <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-3 label-mono text-[8px] tracking-[.16em] text-white/50 backdrop-blur-xl">
                    <ArrowDown className="h-3 w-3" /> Faites défiler
                  </span>
                </div>
              </div>
            </Parallax>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
          <span className="label-mono text-[8px] tracking-[.28em] text-white/30">SCROLL TO BUILD YOUR DIGITAL SYSTEM</span>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
