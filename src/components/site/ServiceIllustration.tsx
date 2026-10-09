import { ArrowUpRight, Bot, Gauge, Globe2, MapPin, Megaphone, Palette, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { XR_PHOTOS } from "@/lib/photography";
import { Parallax } from "./primitives";

type Props = { service: string; title?: string };
type Meta = { number: string; label: string; photo?: keyof typeof XR_PHOTOS; position?: string };

const META: Record<string, Meta> = {
  websites: { number: "01", label: "WEB DESIGN", photo: "websites", position: "50% 42%" },
  branding: { number: "02", label: "BRANDING", photo: "branding", position: "50% 50%" },
  seo: { number: "03", label: "SEO", photo: "seo", position: "50% 45%" },
  maps: { number: "04", label: "GOOGLE MAPS", photo: "maps", position: "50% 18%" },
  social: { number: "05", label: "SOCIAL MEDIA", photo: "social", position: "50% 45%" },
  maintenance: { number: "06", label: "WEBCARE", photo: "maintenance", position: "50% 50%" },
  robotics: { number: "07", label: "ROBOTIQUE", photo: "robotics", position: "50% 50%" },
  refonte: { number: "08", label: "REFONTE", photo: "refonte", position: "50% 46%" },
  ads: { number: "09", label: "GOOGLE ADS", photo: "ads", position: "50% 48%" },
  strategy: { number: "10", label: "STRATÉGIE", photo: "strategy", position: "50% 42%" },
  ai: { number: "11", label: "IA", photo: "ai", position: "50% 50%" },
};

function Stage({ children, className = "", accent = "rgba(255,255,255,.08)" }: { children: ReactNode; className?: string; accent?: string }) {
  return (
    <div
      className={
        "xr-depth relative min-h-[360px] overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-bg-elev)] sm:min-h-[430px] " +
        className
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 z-[1] h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: accent }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,.08)_46%,transparent_62%)]" />
      <div className="relative z-[2] h-full">{children}</div>
    </div>
  );
}

function Photo({
  src,
  position = "50% 50%",
  className = "",
}: {
  src: string;
  position?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      style={{ objectPosition: position }}
      className={"absolute inset-0 h-full w-full object-cover " + className}
    />
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="label-mono text-[7px] tracking-[.2em] text-white/55">{children}</span>;
}

function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-[1.35rem] border border-white/15 bg-black/58 shadow-[0_30px_90px_-45px_rgba(0,0,0,.85)] backdrop-blur-xl " +
        className
      }
    >
      {children}
    </div>
  );
}

function WebVisual() {
  return (
    <Stage accent="rgba(148,163,184,.15)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-3 label-mono text-[7px] tracking-[.18em] xr-muted">HTTPS://XRAGENCYAI.COM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">100/100 PERF</span>
            <Label>01 / WEB DESIGN</Label>
          </div>
        </div>

        <div className="my-auto py-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line bg-black/60 shadow-xl">
            <img
              src={XR_PHOTOS.websites}
              alt="Site web vitrine et e-commerce"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="label-mono text-[7px] text-white/90">SUR-MESURE · MOBILE-FIRST</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[7px] text-white">499 € - 1499 €</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="rounded-xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6px] xr-muted-2">LIVRABLE</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="mt-1 text-[11px] font-semibold text-[var(--xr-ink)]">Vitrine, Business & E-commerce</p>
              <p className="mt-0.5 text-[8px] xr-muted">Design sur-mesure, CMS intuitif, paiement Stripe/Apple Pay</p>
            </div>
            <div className="rounded-xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6px] xr-muted-2">AUDIT TECHNIQUE</span>
                <span className="label-mono text-[7px] text-emerald-500 font-bold">A+</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-1 text-[8px]">
                <span className="rounded bg-black/5 dark:bg-white/10 px-2 py-1">SEO 100</span>
                <span className="rounded bg-black/5 dark:bg-white/10 px-2 py-1">Vitesse 0.4s</span>
                <span className="rounded bg-black/5 dark:bg-white/10 px-2 py-1">RGPD Ok</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">REACT · TANSTACK · TAILWIND · NEXT GEN</span>
          <span className="label-mono text-[7px] xr-accent font-semibold">LIVRÉ CLÉ EN MAIN</span>
        </div>
      </div>
    </Stage>
  );
}

function BrandingVisual() {
  return (
    <Stage accent="rgba(199,181,223,.18)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <Palette className="h-3.5 w-3.5 xr-muted" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">BRAND GUIDELINES & CHARTE</span>
          </div>
          <Label>02 / BRANDING</Label>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-lg group">
            <img
              src={XR_PHOTOS.branding}
              alt="Atelier Branding & Charte graphique de prestige"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90">ATELIER DIRECTION ARTISTIQUE</span>
                <p className="text-[10px] font-semibold text-white">Papeterie, Dorure à chaud & Typographie</p>
              </div>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[7px] text-white backdrop-blur-md">Dès 179 €</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <span className="label-mono text-[6px] xr-muted-2">PALETTE CHROMATIQUE & ÉLÉGANCE</span>
              <div className="mt-2 flex gap-2">
                {[
                  { hex: "#090A0D", label: "Obsidian" },
                  { hex: "#F8F6F0", label: "Warm White" },
                  { hex: "#4B5563", label: "Titanium" },
                  { hex: "#10B981", label: "Emerald" },
                ].map((c) => (
                  <div key={c.hex} className="flex-1 text-center">
                    <div
                      className="h-9 w-full rounded-lg border border-black/10 dark:border-white/20 shadow-sm"
                      style={{ background: c.hex }}
                    />
                    <span className="mt-1 block text-[7px] font-mono font-medium xr-muted truncate">{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px]">
              <span className="xr-muted">Logo vectoriel + Favicon + Brand Book</span>
              <span className="label-mono text-[7px] font-bold xr-accent">Livré vectoriel HD</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">SVG · PNG · PDF PRINT · GUIDES SOCIAUX</span>
          <span className="label-mono text-[7px] xr-accent font-semibold">IDENTITÉ UNIQUE</span>
        </div>
      </div>
    </Stage>
  );
}

function SeoVisual() {
  return (
    <Stage accent="rgba(56,189,248,.18)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-sky-500" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">GOOGLE SERP PREVIEW</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">+184% TRAFIC</span>
            <Label>03 / SEO NATUREL</Label>
          </div>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-lg group">
            <img
              src={XR_PHOTOS.seo}
              alt="Dashboard SEO & Positionnement Google Top 1"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90">PILOTAGE ACQUISITION ORGANIQUE</span>
                <p className="text-[10px] font-semibold text-white">Top 1 Google · Croissance +184%</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[7px] text-emerald-300 backdrop-blur-md">Certifié A+</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[8px] xr-muted">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-neutral-900 text-[6px] font-black text-white">XR</span>
                <span>https://xragencyai.com</span>
                <span className="label-mono text-[6px] text-emerald-500 font-bold ml-auto">POSITION #1</span>
              </div>
              <h4 className="mt-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                XR Agency | Agence Web & Performance Digitale
              </h4>
              <p className="mt-1 text-[8.5px] leading-relaxed xr-muted line-clamp-2">
                Création de sites internet haut de gamme, branding & acquisition locale.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px]">
              <span className="xr-muted">Audit sémantique + Cocon SEO + Backlinks</span>
              <span className="label-mono text-[7px] font-bold xr-accent">Dès 299 €/m</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">NETLINKING · COCON SÉMANTIQUE · CORE WEB VITALS</span>
          <span className="label-mono text-[7px] xr-accent font-semibold">À PARTIR DE 299 €/MOIS</span>
        </div>
      </div>
    </Stage>
  );
}

function MapsVisual() {
  return (
    <Stage accent="rgba(239,68,68,.12)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-red-500/10 text-red-500">
              <MapPin className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">GOOGLE SEARCH · LOCAL PACK TOP 3</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">1ÈRE POSITION</span>
            <Label>04 / GOOGLE MAPS</Label>
          </div>
        </div>

        {/* Real Google Maps Top 3 Local Pack Component */}
        <div className="my-auto py-3 space-y-2.5">
          {/* Top 1 result - Highlighted as Client */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-[var(--xr-surface-strong)] p-3.5 shadow-lg backdrop-blur-md ring-1 ring-emerald-500/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-500 text-[10px] font-black text-white shadow-sm">
                  1
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[var(--xr-ink)]">Votre Établissement (Leader Local)</h4>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[6.5px] font-bold text-emerald-400">
                      TOP 1 GARANTI
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[8.5px]">
                    <span className="font-bold text-amber-400">5.0 ★★★★★</span>
                    <span className="xr-muted">(428 avis vérifiés)</span>
                    <span className="xr-muted-2">· Restaurant & Bar Gastronomique</span>
                  </div>
                  <p className="mt-1 text-[8px] xr-muted">
                    📍 12 Rue de Rivoli, Paris · Ouvert · <span className="text-emerald-500 font-medium">Recommandé par 98% des clients</span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-center label-mono text-[6.5px] font-bold text-emerald-400">
                  ITINÉRAIRE
                </span>
                <span className="rounded-lg border xr-line bg-[var(--xr-bg)] px-2 py-1 text-center label-mono text-[6.5px] text-[var(--xr-ink)]">
                  APPELER
                </span>
              </div>
            </div>
          </div>

          {/* Top 2 result - Competitor */}
          <div className="rounded-xl border xr-line bg-[var(--xr-surface)]/60 p-3 opacity-75 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-neutral-500/20 text-[9px] font-bold text-neutral-400">
                  2
                </span>
                <div>
                  <h5 className="text-[11px] font-medium text-[var(--xr-ink)]">Concurrent Direct B</h5>
                  <div className="mt-0.5 flex items-center gap-2 text-[8px] xr-muted">
                    <span className="text-amber-400">4.3 ★★★★☆</span>
                    <span>(112 avis)</span>
                    <span>· 0.4 km</span>
                  </div>
                </div>
              </div>
              <span className="label-mono text-[6.5px] xr-muted-2">POSITION #2</span>
            </div>
          </div>

          {/* Top 3 result - Competitor */}
          <div className="rounded-xl border xr-line bg-[var(--xr-surface)]/40 p-3 opacity-55 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-neutral-500/20 text-[9px] font-bold text-neutral-400">
                  3
                </span>
                <div>
                  <h5 className="text-[11px] font-medium text-[var(--xr-ink)]">Concurrent Local C</h5>
                  <div className="mt-0.5 flex items-center gap-2 text-[8px] xr-muted">
                    <span className="text-amber-400">4.0 ★★★★☆</span>
                    <span>(64 avis)</span>
                    <span>· 0.8 km</span>
                  </div>
                </div>
              </div>
              <span className="label-mono text-[6.5px] xr-muted-2">POSITION #3</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">GÉOLOCALISATION · GESTION D'AVIS · CONTRAT DE RÉSULTAT</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">« TOP 3 OU REMBOURSÉ »</span>
        </div>
      </div>
    </Stage>
  );
}

function SocialVisual() {
  return (
    <Stage accent="rgba(52,211,153,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">RÉSEAUX SOCIAUX · GESTION MULTI-CANAL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">COMMUNAUTÉ ACTIVE</span>
            <Label>05 / SOCIAL MEDIA</Label>
          </div>
        </div>

        {/* Social channels preview */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            {/* Instagram Card */}
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-pink-500">INSTAGRAM</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="mt-2 text-[11px] font-bold text-[var(--xr-ink)]">Feed & Reels 4K</p>
              <div className="mt-2 flex items-baseline justify-between text-[8px] xr-muted">
                <span>Engagement</span>
                <span className="label-mono font-bold text-emerald-500">+14.2%</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
              </div>
            </div>

            {/* TikTok Card */}
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-cyan-500">TIKTOK</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="mt-2 text-[11px] font-bold text-[var(--xr-ink)]">Formats Verticaux</p>
              <div className="mt-2 flex items-baseline justify-between text-[8px] xr-muted">
                <span>Vues mensuelles</span>
                <span className="label-mono font-bold text-emerald-500">185K+</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              </div>
            </div>

            {/* LinkedIn / Facebook Card */}
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-blue-500">LINKEDIN / FB</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="mt-2 text-[11px] font-bold text-[var(--xr-ink)]">B2B & Local</p>
              <div className="mt-2 flex items-baseline justify-between text-[8px] xr-muted">
                <span>Portée qualifiée</span>
                <span className="label-mono font-bold text-emerald-500">×2.8</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div className="h-full w-[65%] rounded-full bg-blue-500" />
              </div>
            </div>
          </div>

          {/* Social Editorial Workflow preview */}
          <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-[9px]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-[var(--xr-ink)]">Planning éditorial automatisé :</span>
              <span className="xr-muted">Prises de vue, rédaction, hashtags & publication programmée</span>
            </div>
            <span className="label-mono text-[7px] text-emerald-400 font-bold shrink-0">100% DÉLÉGUÉ</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">INSTAGRAM · TIKTOK · LINKEDIN · FACEBOOK</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">GESTION CLÉ EN MAIN DÈS 299 €/MOIS</span>
        </div>
      </div>
    </Stage>
  );
}

function WebcareVisual() {
  return (
    <Stage accent="rgba(99,102,241,.12)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">CLOUD INFRASTRUCTURE · HEALTH & SECURITY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="label-mono text-[7px] text-emerald-500 font-bold">100% OPÉRATIONNEL</span>
            <Label>06 / WEBCARE</Label>
          </div>
        </div>

        {/* Live System Status Dashboard */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">TEMPS DE RÉPONSE</span>
              <p className="mt-1 text-base font-bold text-emerald-500">142 ms</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">Ultra-rapide</span>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">DISPONIBILITÉ</span>
              <p className="mt-1 text-base font-bold text-[var(--xr-ink)]">99.99%</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">SLA Respecté</span>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">SÉCURITÉ SSL</span>
              <p className="mt-1 text-base font-bold text-emerald-500">TLS 1.3</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">Chiffrement A+</span>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/25 bg-[var(--xr-surface-strong)] p-3.5 backdrop-blur-md ring-1 ring-emerald-500/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-[var(--xr-ink)]">Supervision & Sauvegardes Proactives</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 label-mono text-[6.5px] font-bold text-emerald-400">
                24/7 DÉDIÉ
              </span>
            </div>
            <p className="mt-1.5 text-[8.5px] leading-relaxed xr-muted">
              Sauvegardes journalières redondantes, correctifs de failles en temps réel, modifications de contenu intégrées et assistance d'urgence sans surcoût.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">SAUVEGARDES AUTOMATIQUES · MISES À JOUR · RESTAURATION 1H</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">SÉRÉNITÉ TOTALE DÈS 29 €/MOIS</span>
        </div>
      </div>
    </Stage>
  );
}

function RoboticsVisual() {
  return (
    <Stage accent="rgba(148,163,184,.15)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-500/10 text-neutral-400">
              <Bot className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">ROBOTS DE SERVICE · ÉLÉGANCE OPÉRATIONNELLE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">DISPONIBLE DÉMO</span>
            <Label>07 / ROBOTIQUE</Label>
          </div>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.2fr_.8fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-xl group">
            <img
              src={XR_PHOTOS.robotics}
              alt="Robot de service autonome de luxe en hôtel 5 étoiles"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90">NAVIGATION LIDAR 3D DYNAMIQUE</span>
                <p className="text-[10px] font-semibold text-white">Évitement d'obstacles en temps réel</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[7px] font-bold text-emerald-300 backdrop-blur-md">Prêt à l'emploi</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[var(--xr-ink)]">Capacités de Terrain</span>
                <span className="label-mono text-[6px] text-emerald-500 font-bold">12H AUTONOMIE</span>
              </div>
              <p className="mt-1 text-[8.5px] leading-relaxed xr-muted">
                Service en salle, port de plateaux lourds (jusqu'à 40 kg), accueil VIP et guidage interactif des clients.
              </p>
              <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-center text-[7.5px]">
                <div className="rounded-lg border xr-line bg-[var(--xr-bg)] p-1.5">
                  <span className="block font-bold text-[var(--xr-ink)]">0 Bruit</span>
                  <span className="xr-muted-2">Moteurs silencieux</span>
                </div>
                <div className="rounded-lg border xr-line bg-[var(--xr-bg)] p-1.5">
                  <span className="block font-bold text-[var(--xr-ink)]">100% Sûr</span>
                  <span className="xr-muted-2">Capteurs 360°</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-[9px]">
              <span className="xr-muted">Location événementielle ou vente</span>
              <span className="label-mono text-[7px] font-bold text-emerald-400">Dès 499 €</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">HÔTELLERIE · RESTAURATION · ÉVÉNEMENTS VIP · SALONS</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">ESSAI GRATUIT SUR SITE POSSIBLE</span>
        </div>
      </div>
    </Stage>
  );
}

function RefonteVisual() {
  return (
    <Stage accent="rgba(148,163,184,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-500/10 text-neutral-300">
              <Globe2 className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">AUDIT & TRANSFORMATION DIGITALE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">REBUILD A+</span>
            <Label>08 / REFONTE</Label>
          </div>
        </div>

        {/* Before / After comparison matrix */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-red-400">AVANT REFONTE</span>
                <span className="text-[10px] text-red-400">✕</span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-[var(--xr-ink)]">Site Obsolète</p>
              <div className="mt-2 space-y-1 text-[8px] xr-muted">
                <p>• Temps de chargement : 4.8s</p>
                <p>• Mobile non optimisé</p>
                <p>• Taux de conversion : 0.8%</p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 backdrop-blur-md ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-emerald-400">APRÈS XR REFONTE</span>
                <span className="text-[10px] text-emerald-400 font-bold">✓</span>
              </div>
              <p className="mt-1.5 text-xs font-bold text-[var(--xr-ink)]">Architecture Next-Gen</p>
              <div className="mt-2 space-y-1 text-[8px] font-medium text-emerald-300">
                <p>• Temps de chargement : 0.3s</p>
                <p>• 100% Mobile-First & Fluide</p>
                <p>• Taux de conversion : 4.6% (×5.7)</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px] flex items-center justify-between">
            <span className="xr-muted">Migration sans perte de trafic ni de SEO existant</span>
            <span className="label-mono text-[7px] text-emerald-400 font-bold">ZÉRO REGRESSION</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">AUDIT UX · REFONTE CODE · CONVERSIONS BOOSTÉES</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">ON RECONSTRUIT POUR GAGNER</span>
        </div>
      </div>
    </Stage>
  );
}

function AdsVisual() {
  return (
    <Stage accent="rgba(56,189,248,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500/10 text-sky-400">
              <Megaphone className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">GOOGLE ADS & META ADS CAMPAIGNS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">ROAS 4.8×</span>
            <Label>09 / ADS</Label>
          </div>
        </div>

        {/* Paid acquisition metrics console */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">CTR MOYEN</span>
              <p className="mt-1 text-base font-bold text-sky-400">8.4%</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">+140% vs marché</span>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">COÛT PAR LEAD</span>
              <p className="mt-1 text-base font-bold text-[var(--xr-ink)]">12.50 €</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">-42% CPA</span>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">RETOUR / INVEST.</span>
              <p className="mt-1 text-base font-bold text-emerald-500">4.8× ROAS</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">Rentabilité nette</span>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-[var(--xr-surface-strong)] p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--xr-ink)]">Campagnes Précises & Mots-Clés Intentionnistes</span>
              <span className="label-mono text-[6.5px] font-bold text-sky-400">TRACKING SERVER-SIDE</span>
            </div>
            <p className="mt-1 text-[8.5px] leading-relaxed xr-muted">
              Ciblage ultra-qualifié à fort pouvoir d'achat, A/B testing continu des accroches et landing pages dédiées à forte conversion.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">SEARCH · SHOPPING · REMARKETING · SCALING</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">ACQUISITION RENTABLE & MESURABLE</span>
        </div>
      </div>
    </Stage>
  );
}

function StrategyVisual() {
  return (
    <Stage accent="rgba(129,140,248,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
              <Gauge className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">STRATÉGIE DIGITALE & EXPANSION</span>
          </div>
          <Label>10 / STRATÉGIE</Label>
        </div>

        {/* Strategy Roadmap */}
        <div className="my-auto py-3 space-y-2.5">
          {[
            { phase: "PHASE 1", label: "Diagnostic d'Opportunité & Concurrence", status: "Terminé", color: "text-emerald-400" },
            { phase: "PHASE 2", label: "Positionnement de Prestige & Offre Irrésistible", status: "En cours", color: "text-indigo-400" },
            { phase: "PHASE 3", label: "Tunnel de Vente & Canaux d'Acquisition Directe", status: "Prévu", color: "xr-muted" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="label-mono text-[6.5px] font-bold text-indigo-300">{item.phase}</span>
                <span className="text-[11px] font-semibold text-[var(--xr-ink)]">{item.label}</span>
              </div>
              <span className={`label-mono text-[6.5px] font-bold ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">PLAN D'ACTION CONCRET · KPIS CHIFFRÉS · ROADMAP 90J</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">DIRECTION STRATÉGIQUE CLAIRE</span>
        </div>
      </div>
    </Stage>
  );
}

function AiVisual() {
  return (
    <Stage accent="rgba(192,132,252,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500/10 text-purple-400">
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">INTELLIGENCE ARTIFICIELLE & AUTOMATISATION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">IA ACTIVE</span>
            <Label>11 / IA</Label>
          </div>
        </div>

        {/* AI Workflow Agents */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold">AGENT 01</span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]">Capture & Triage</p>
              <p className="mt-1 text-[7.5px] xr-muted">Qualification automatique des leads entrants 24/7</p>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold">AGENT 02</span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]">RAG & Connaissance</p>
              <p className="mt-1 text-[7.5px] xr-muted">Réponses ultra-précises basées sur vos documents</p>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold">AGENT 03</span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]">Workflows Métier</p>
              <p className="mt-1 text-[7.5px] xr-muted">Génération automatique de devis et synchronisation</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 text-[9px]">
            <span className="font-semibold text-[var(--xr-ink)]">Gain de productivité constaté : <span className="text-emerald-400 font-bold">15 à 25h / semaine</span> par collaborateur</span>
            <span className="label-mono text-[7px] text-purple-300 font-bold shrink-0">100% INTÉGRÉ</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">LLMS SUR-MESURE · EMBEDDINGS · AUTOMATION N8N/MAKE</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">TRANSFORMATION IA IMMÉDIATE</span>
        </div>
      </div>
    </Stage>
  );
}

function GenericVisual({ info }: { info: Meta }) {
  const src = info.photo ? XR_PHOTOS[info.photo] : undefined;
  return (
    <Stage>
      {src ? <Photo src={src} position={info.position} className="opacity-[.9]" /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/6 to-transparent" />
      <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
        <Label>{info.number} / {info.label}</Label>
      </div>
    </Stage>
  );
}

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const visual =
    service === "websites" ? <WebVisual /> :
    service === "branding" ? <BrandingVisual /> :
    service === "seo" ? <SeoVisual /> :
    service === "maps" ? <MapsVisual /> :
    service === "social" ? <SocialVisual /> :
    service === "maintenance" ? <WebcareVisual /> :
    service === "robotics" ? <RoboticsVisual /> :
    service === "refonte" ? <RefonteVisual /> :
    service === "ads" ? <AdsVisual /> :
    service === "strategy" ? <StrategyVisual /> :
    service === "ai" ? <AiVisual /> :
    <GenericVisual info={info} />;

  return (
    <figure className="group relative w-full overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)]">
      {visual}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-[5%] top-[5%] h-8 w-8 rounded-tl-xl border-l border-t border-white/20" />
        <div className="absolute bottom-[5%] right-[5%] h-8 w-8 rounded-br-xl border-b border-r border-white/20" />
      </div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
