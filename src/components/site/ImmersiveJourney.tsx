import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Parallax, Reveal } from "./primitives";

const HERO_VIDEO = "https://cdn.coverr.co/videos/coverr-aerial-view-of-beautiful-resort-4739/1080p.mp4";
const HERO_POSTER = "https://images.unsplash.com/photo-1782413263988-11f7178cf385?auto=format&fit=crop&q=90&w=2200";

function ConciergeFigure() {
  return (
    <div className="relative h-36 w-28 sm:h-44 sm:w-32" aria-hidden>
      <div className="absolute inset-x-2 bottom-1 h-20 rounded-[48%_48%_22%_22%] border border-white/20 bg-white/[.07] shadow-[0_20px_50px_-20px_rgba(255,255,255,.5)] backdrop-blur-xl" />
      <div className="absolute left-1/2 top-2 h-16 w-16 -translate-x-1/2 rounded-full border border-white/20 bg-[#d7c1ad] shadow-[0_14px_30px_-12px_rgba(0,0,0,.8)]" />
      <div className="absolute left-[29%] top-[27px] h-1 w-1 rounded-full bg-[#171717]" />
      <div className="absolute right-[29%] top-[27px] h-1 w-1 rounded-full bg-[#171717]" />
      <div className="absolute left-1/2 top-[39px] h-1.5 w-4 -translate-x-1/2 rounded-full border-b border-[#171717]/50" />
      <div className="absolute left-1/2 top-0 h-7 w-20 -translate-x-1/2 rounded-[70%_70%_30%_30%] bg-[#171717] shadow-lg" />
      <div className="absolute left-[7px] top-[65px] h-11 w-6 -rotate-[20deg] rounded-full border border-white/15 bg-white/[.06]" />
      <div className="absolute right-[7px] top-[65px] h-11 w-6 rotate-[20deg] rounded-full border border-white/15 bg-white/[.06]" />
      <div className="absolute left-1/2 top-[70px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/.8)]" />
      <div className="absolute -right-4 top-12 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 label-mono text-[7px] tracking-[.15em] text-white/60 backdrop-blur-xl">
        JULIE · XR
      </div>
    </div>
  );
}

export function ImmersiveJourney() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <section ref={sectionRef} className="relative min-h-[190vh] overflow-hidden bg-[#050607] text-white" aria-label="Parcours immersif XR Agency">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <video ref={videoRef} muted playsInline preload="metadata" poster={HERO_POSTER} className="absolute inset-0 h-full w-full object-cover opacity-65">
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(255,255,255,.12),transparent_30%),linear-gradient(90deg,rgba(3,5,6,.96)_0%,rgba(3,5,6,.72)_43%,rgba(3,5,6,.18)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-[#050607]/30" />

        <div className="relative mx-auto flex h-full max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
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

            <Reveal>
              <div onPointerMove={onPointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })} className="mx-auto w-full max-w-[390px] [perspective:1200px]">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/35 p-5 shadow-[0_45px_120px_-45px_rgba(0,0,0,.95)] backdrop-blur-2xl transition-transform duration-500" style={{ transform: "rotateX(" + tilt.y + "deg) rotateY(" + tilt.x + "deg) translateZ(0)" }}>
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
                  <div className="relative flex items-start justify-between border-b border-white/10 pb-4">
                    <div><span className="label-mono text-[7px] tracking-[.22em] text-white/40">XR INTELLIGENCE</span><p className="mt-1 text-sm font-medium">Votre parcours commence ici.</p></div>
                    <Sparkles className="h-4 w-4 text-white/70" />
                  </div>
                  <div className="relative flex min-h-[250px] items-center justify-center">
                    <div className="absolute h-44 w-44 rounded-full border border-white/10 [transform:rotateX(68deg)]" />
                    <div className="absolute h-32 w-32 rounded-full border border-primary/20 [transform:rotateY(68deg)]" />
                    <div className="relative"><ConciergeFigure /></div>
                  </div>
                  <div className="relative grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                    {[["01", "Profil"], ["02", "Stratégie"], ["03", "Devis"]].map(([num, label]) => (
                      <div key={num} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                        <span className="label-mono text-[7px] text-white/35">{num}</span>
                        <span className="mt-1 block text-[10px] text-white/70">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
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
