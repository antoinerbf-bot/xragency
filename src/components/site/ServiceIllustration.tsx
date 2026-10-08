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
    <Stage accent="rgba(248,113,113,.18)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-red-500" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">GOOGLE MAPS LOCAL PACK</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">TOP 3 LOCAL</span>
            <Label>04 / GOOGLE MAPS</Label>
          </div>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-lg group">
            <img
              src={XR_PHOTOS.maps}
              alt="Boutique et localisation Google Maps Top 1 à Paris"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90">LOCAL PACK GOOGLE MAPS #1</span>
                <p className="text-[10px] font-semibold text-white">5.0 ★★★★★ · 420 avis clients vérifiés</p>
              </div>
              <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[7px] text-red-200 backdrop-blur-md">Zone prioritaire</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[8px] font-black text-white">1</span>
                <span className="text-xs font-bold text-[var(--xr-ink)]">Votre Entreprise — Emplacement N°1</span>
              </div>
              <p className="mt-1 text-[8.5px] leading-relaxed xr-muted">
                Fiche Google Business Profile 100% optimisée, géoréférencement et afflux d'appels clients en continu.
              </p>
              <div className="mt-2.5 flex items-center justify-between border-t xr-line pt-2 text-[8px]">
                <span className="xr-muted">Impact local direct :</span>
                <span className="label-mono font-bold text-emerald-500">+320% D'APPELS</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px]">
              <span className="xr-muted">Abonnement annuel clé en main</span>
              <span className="label-mono text-[7px] font-bold xr-accent">Dès 990 €/an</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">GÉOLOCALISATION · GESTION D'AVIS · CITATIONS LOCALES</span>
          <span className="label-mono text-[7px] xr-accent font-semibold">À PARTIR DE 990 €/AN</span>
        </div>
      </div>
    </Stage>
  );
}

function SocialVisual() {
  return (
    <Stage accent="rgba(52,211,153,.18)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">SOCIAL CONTENT & ENGAGEMENT</span>
          </div>
          <Label>05 / SOCIAL MEDIA</Label>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-lg group">
            <img
              src={XR_PHOTOS.social}
              alt="Tournage et production de contenus vidéo de marque à Paris"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90">TOURNAGE & EDITORIAL LUXE</span>
                <p className="text-[10px] font-semibold text-white">Reels & TikTok cinéma · 4K 60fps</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[7px] text-emerald-300 backdrop-blur-md">Engagement ×3</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[var(--xr-ink)]">Direction Artistique & Réseaux</span>
                <span className="label-mono text-[6px] text-emerald-500 font-bold">RÉGULARITÉ</span>
              </div>
              <p className="mt-1 text-[8.5px] leading-relaxed xr-muted">
                Scripts sur mesure, captation pro, étalonnage soigné et diffusion planifiée pour captiver votre audience.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px]">
              <span className="xr-muted">Accompagnement mensuel créatif</span>
              <span className="label-mono text-[7px] font-bold xr-accent">Dès 299 €/m</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">INSTAGRAM · TIKTOK · LINKEDIN · FACEBOOK</span>
          <span className="label-mono text-[7px] xr-accent font-semibold">IMAGE IRRÉPROCHABLE</span>
        </div>
      </div>
    </Stage>
  );
}

function WebcareVisual() {
  return (
    <Stage accent="rgba(129,140,248,.18)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">SITE MONITORING & HEALTH CHECK</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">99.98% UPTIME</span>
            <Label>06 / WEBCARE</Label>
          </div>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-lg group">
            <img
              src={XR_PHOTOS.maintenance}
              alt="Supervision serveurs et infrastructure cloud haute disponibilité"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90">INFRASTRUCTURE REDONDANTE</span>
                <p className="text-[10px] font-semibold text-white">SSL TLS 1.3 · Sauvegardes cloud 24/7</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[7px] text-emerald-300 backdrop-blur-md">&lt; 180ms</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <span className="label-mono text-[6px] xr-muted-2">MAINTENANCE ET SÉRÉNITÉ</span>
              <p className="mt-1 text-[10px] font-semibold text-[var(--xr-ink)]">Protection anti-panne & mises à jour</p>
              <p className="mt-0.5 text-[8px] leading-relaxed xr-muted">
                Restaurations d'urgence en 1h, modifications incluses et monitoring continu.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px]">
              <span className="xr-muted">Abonnement maintenance préventive</span>
              <span className="label-mono text-[7px] font-bold xr-accent">Dès 29 €/m</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">MAINTENANCE PRÉVENTIVE · SUPPORT DÉDIÉ</span>
          <span className="label-mono text-[7px] xr-accent font-semibold">À PARTIR DE 29 €/MOIS</span>
        </div>
      </div>
    </Stage>
  );
}

function RoboticsVisual() {
  return (
    <Stage accent="rgba(203,213,225,.18)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <Bot className="h-3.5 w-3.5 text-neutral-400" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">ROBOTS DE SERVICE & RESTAURATION</span>
          </div>
          <Label>07 / ROBOTIQUE DE TERRAIN</Label>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-lg group">
            <img
              src={XR_PHOTOS.robotics}
              alt="Robot de service de luxe dans un hôtel 5 étoiles à Paris"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90">NAVIGATION LIDAR 3D ET SERVICE</span>
                <p className="text-[10px] font-semibold text-white">Autonomie 12h · Déploiement sur site</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[7px] text-emerald-300 backdrop-blur-md">Prêt à l'emploi</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <span className="label-mono text-[6px] xr-muted-2">APPLICATIONS OPÉRATIONNELLES</span>
              <p className="mt-1 text-[10px] font-semibold text-[var(--xr-ink)]">Hôtellerie, Restauration & Salons</p>
              <p className="mt-0.5 text-[8px] leading-relaxed xr-muted">
                Service en salle, port de plateaux et accueil client pour décharger vos équipes.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px]">
              <span className="xr-muted">Location & Vente avec installation</span>
              <span className="label-mono text-[7px] font-bold xr-accent">Dès 499 €</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">HÔTELLERIE · RESTAURATION · COMMERCE · ÉVÉNEMENTIEL</span>
          <span className="label-mono text-[7px] xr-accent font-semibold">À PARTIR DE 499 €</span>
        </div>
      </div>
    </Stage>
  );
}

function RefonteVisual() {
  return (
    <Stage accent="#94a3b8">
      <Photo src={XR_PHOTOS.refonte} position="50% 46%" className="scale-[1.04] opacity-[.86]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>08 / REFONTE</Label>
        <Label>REBUILD THE EXPERIENCE</Label>
      </div>
      <Parallax speed={0.018} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <Label>REFONTE</Label>
          <h3 className="display-serif mt-2 max-w-xl text-3xl text-white sm:text-4xl">On ne repeint pas. On reconstruit.</h3>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function AdsVisual() {
  return (
    <Stage accent="#38bdf8">
      <Photo src={XR_PHOTOS.ads} position="50% 48%" className="scale-[1.04] opacity-[.84]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>09 / GOOGLE ADS</Label>
        <Label>PAID ACQUISITION</Label>
      </div>
      <Parallax speed={0.02} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Megaphone className="h-4 w-4 text-white/75" />
            <Label>GOOGLE ADS</Label>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[["CTR", "↑"], ["CPA", "↓"], ["ROAS", "×"]].map(([a, b]) => (
              <div key={a} className="rounded-xl border border-white/12 bg-white/6 p-3 text-white">
                <span className="label-mono text-[5px] text-white/45">{a}</span>
                <span className="mt-2 block text-lg font-semibold">{b}</span>
              </div>
            ))}
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function StrategyVisual() {
  return (
    <Stage accent="#818cf8">
      <Photo src={XR_PHOTOS.strategy} position="50% 42%" className="scale-[1.04] opacity-[.8]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/6 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>10 / STRATÉGIE</Label>
        <Label>DIRECTION</Label>
      </div>
      <Parallax speed={-0.02} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Gauge className="h-4 w-4 text-white/75" />
            <div>
              <Label>STRATEGY</Label>
              <p className="mt-1 text-xs font-semibold text-white sm:text-sm">Positionnement → parcours → priorités.</p>
            </div>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function AiVisual() {
  return (
    <Stage accent="#c084fc">
      <Photo src={XR_PHOTOS.ai} position="50% 50%" className="scale-[1.04] opacity-[.84]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>11 / IA</Label>
        <Label>AUTOMATION</Label>
      </div>
      <Parallax speed={0.02} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-white/75" />
            <div>
              <Label>AI SYSTEM</Label>
              <p className="mt-1 text-xs font-semibold text-white sm:text-sm">Données → IA → action.</p>
            </div>
          </div>
        </Glass>
      </Parallax>
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
