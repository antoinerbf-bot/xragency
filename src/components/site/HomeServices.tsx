import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Globe2, MapPinned, Palette, ShieldCheck, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { Parallax, Reveal } from "./primitives";
import { useFunnel } from "@/lib/funnel";

const FUNNEL_SERVICE_BTN: Record<Lang, { added: string; add: string }> = {
  fr: { added: "✓ Dans votre devis", add: "+ Ajouter au devis" },
  en: { added: "✓ In your quote", add: "+ Add to quote" },
  vi: { added: "✓ Đã thêm vào báo giá", add: "+ Thêm vào báo giá" },
  ar: { added: "✓ مضاف إلى عرض السعر", add: "+ أضف إلى العرض" },
  ru: { added: "✓ В вашей смете", add: "+ Добавить в смету" },
};

const IDS = ["websites", "branding", "seo", "maps", "social", "maintenance", "robotics"] as const;
const ICONS = {
  websites: Globe2,
  branding: Palette,
  seo: BarChart3,
  maps: MapPinned,
  social: Users,
  maintenance: ShieldCheck,
  robotics: Bot,
};
const PRICES: Record<string, number> = {
  websites: 499,
  branding: 199,
  seo: 299,
  maps: 990,
  social: 299,
  maintenance: 29,
  robotics: 499,
};

const ACCENTS: Record<(typeof IDS)[number], { color: string; halo: string; tag: Record<string, string> }> = {
  websites: {
    color: "#10b981",
    halo: "rgba(16, 185, 129, 0.14)",
    tag: { fr: "UNIVERS WEB · HAUTE COUTURE", en: "WEB UNIVERSE · HAUTE COUTURE", vi: "VŨ TRỤ WEB · ĐỈNH CAO", ar: "عالم الويب · راقٍ ومميز", ru: "WEB-ВСЕЛЕННАЯ · ПРЕМИУМ" },
  },
  branding: {
    color: "#f59e0b",
    halo: "rgba(245, 158, 11, 0.14)",
    tag: { fr: "UNIVERS BRANDING · SIGNATURE & OR", en: "BRANDING UNIVERSE · SIGNATURE GOLD", vi: "VŨ TRỤ THƯƠNG HIỆU · DẤU ẤN VÀNG", ar: "عالم الهوية · توقيع ذهبي", ru: "БРЕНДИНГ · ЗОЛОТОЙ СТАНДАРТ" },
  },
  seo: {
    color: "#8b5cf6",
    halo: "rgba(139, 92, 246, 0.14)",
    tag: { fr: "UNIVERS SEO · AUTORITÉ & IMPACT", en: "SEO UNIVERSE · AUTHORITY & IMPACT", vi: "VŨ TRỤ SEO · UY TÍN & TÁC ĐỘNG", ar: "عالم SEO · سلطة وتأثير", ru: "SEO-ВСЕЛЕННАЯ · АВТОРИТЕТ И РОСТ" },
  },
  maps: {
    color: "#ea4335",
    halo: "rgba(234, 67, 53, 0.14)",
    tag: { fr: "UNIVERS MAPS · LOCAL 3-PACK #1", en: "MAPS UNIVERSE · LOCAL 3-PACK #1", vi: "VŨ TRỤ MAPS · TOP 1 ĐỊA PHƯƠNG", ar: "عالم MAPS · المركز الأول محلياً", ru: "MAPS-ВСЕЛЕННАЯ · ТОП-1 НА КАРТАХ" },
  },
  social: {
    color: "#f43f5e",
    halo: "rgba(244, 63, 94, 0.14)",
    tag: { fr: "UNIVERS SOCIAL · INFLUENCE & LUXE", en: "SOCIAL UNIVERSE · INFLUENCE & LUXURY", vi: "VŨ TRỤ SOCIAL · SANG TRỌNG & TƯƠNG TÁC", ar: "عالم التواصل · تأثير وفخامة", ru: "SOCIAL-ВСЕЛЕННАЯ · СТИЛЬ И ОХВАТ" },
  },
  maintenance: {
    color: "#0ea5e9",
    halo: "rgba(14, 165, 233, 0.14)",
    tag: { fr: "UNIVERS WEBCARE · CYBER SÉCURITÉ", en: "WEBCARE UNIVERSE · CYBER SECURITY", vi: "VŨ TRỤ WEBCARE · BẢO MẬT TỐI ĐA", ar: "عالم الرعاية · أمان سيبراني", ru: "WEBCARE · ЗАЩИТА И БЫСТРОДЕЙСТВИЕ" },
  },
  robotics: {
    color: "#22c55e",
    halo: "rgba(34, 197, 94, 0.14)",
    tag: { fr: "UNIVERS IA · ROBOTIQUE & AGENTS", en: "AI UNIVERSE · ROBOTICS & AGENTS", vi: "VŨ TRỤ AI · ROBOT & ĐẠI LÝ TỰ ĐỘNG", ar: "عالم الذكاء · روبوتات وأتمتة", ru: "ИИ-ВСЕЛЕННАЯ · АВТОМАТИЗАЦИЯ И РОБОТЫ" },
  },
};

const COPY = {
  fr: {
    eyebrow: "07 SERVICES · 07 ENTRÉES",
    title: "Choisissez le besoin. Nous montrons le dispositif.",
    lead: "Chaque expertise dispose de son propre univers visuel, de sa palette et d'un parcours mesurable.",
    from: "À partir de",
    open: "Voir le service",
    quote: "Ajouter au projet",
    next: "Service suivant",
    perMonth: "/ MOIS",
    perYear: "/ AN",
  },
  en: {
    eyebrow: "07 SERVICES · 07 ENTRY POINTS",
    title: "Choose the need. See the system.",
    lead: "Each expertise has its own visual universe, palette and measurable path.",
    from: "From",
    open: "View service",
    quote: "Add to project",
    next: "Next service",
    perMonth: "/ MONTH",
    perYear: "/ YEAR",
  },
  vi: {
    eyebrow: "07 DỊCH VỤ · 07 ĐIỂM BẮT ĐẦU",
    title: "Chọn nhu cầu. Xem toàn bộ giải pháp.",
    lead: "Mỗi chuyên môn có một vũ trụ hình ảnh, bảng màu và lộ trình đo lường riêng biệt.",
    from: "Từ",
    open: "Xem dịch vụ",
    quote: "Thêm vào dự án",
    next: "Dịch vụ tiếp theo",
    perMonth: "/ THÁNG",
    perYear: "/ NĂM",
  },
  ar: {
    eyebrow: "07 خدمات · 07 نقاط انطلاق",
    title: "اختر الحاجة. شاهد المنظومة.",
    lead: "لكل خبرة عالمها البصري الخاص ولوحتها ومسارها القابل للقياس.",
    from: "ابتداءً من",
    open: "شاهد الخدمة",
    quote: "أضف للمشروع",
    next: "الخدمة التالية",
    perMonth: "/ شهريًا",
    perYear: "/ سنويًا",
  },
  ru: {
    eyebrow: "07 УСЛУГ · 07 ТОЧЕК ВХОДА",
    title: "Выберите задачу. Увидьте систему.",
    lead: "У каждой экспертизы есть своя визуальная вселенная, цветовая палитра и понятный путь.",
    from: "От",
    open: "Открыть услугу",
    quote: "Добавить в проект",
    next: "Следующая услуга",
    perMonth: "/ МЕСЯЦ",
    perYear: "/ ГОД",
  },
} as const;

function serviceHref(id: string) {
  if (id === "maintenance") return "/services/webcare";
  if (id === "robotics") return "/services/robotique";
  return "/services/" + id;
}

export function HomeServices() {
  const { t, price, lang } = useLang();
  const copy = COPY[lang as keyof typeof COPY] ?? COPY.fr;
  let funnel: ReturnType<typeof useFunnel> | null = null;
  try {
    funnel = useFunnel();
  } catch {
    funnel = null;
  }
  const currentLang = (lang in FUNNEL_SERVICE_BTN ? lang : "fr") as Lang;
  const [active, setActive] = useState<(typeof IDS)[number]>("websites");
  const index = IDS.indexOf(active);
  const service = SERVICES.find((s) => s.id === active) ?? SERVICES[0];
  const Icon = ICONS[active];
  const next = IDS[(index + 1) % IDS.length];
  const currentAccent = ACCENTS[active];
  const funnelServiceId = active === "websites" ? "website" : active;
  const isSelectedInFunnel = funnel?.selectedServices.includes(funnelServiceId) ?? false;

  return (
    <section id="homepage-services" className="xr-section relative overflow-hidden border-y xr-line bg-[var(--xr-bg)] py-14 sm:py-20 lg:py-28 transition-colors duration-700">
      {/* Morphing dynamic ambient halo per universe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-all duration-700 opacity-70"
        style={{
          background: `radial-gradient(ellipse at 18% 12%, ${currentAccent.halo}, transparent 42%), radial-gradient(ellipse at 82% 82%, ${currentAccent.halo}, transparent 48%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-6 border-b xr-line pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 label-mono text-[7.5px] tracking-[.25em] transition-all duration-500" style={{ borderColor: currentAccent.color + "55", color: currentAccent.color, backgroundColor: currentAccent.color + "12" }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: currentAccent.color }} />
                {t(currentAccent.tag)}
              </div>
              <h2 className="display-serif mt-4 max-w-6xl text-[clamp(2.9rem,5.8vw,6.6rem)] leading-[.82] tracking-[-.065em]">
                {copy.title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 xr-muted">{copy.lead}</p>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div className="xr-rail mt-6 flex gap-2 overflow-x-auto pb-2">
            {IDS.map((id, i) => {
              const S = SERVICES.find((s) => s.id === id);
              const I = ICONS[id];
              const selected = active === id;
              const accent = ACCENTS[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  style={{ "--service-accent": accent.color } as CSSProperties}
                  className={
                    "group flex min-w-[150px] items-center gap-3 rounded-full border px-4 py-3 text-left transition duration-300 sm:min-w-0 sm:flex-1 " +
                    (selected
                      ? "border-[var(--service-accent)] bg-[var(--xr-bg-elev)] text-[var(--xr-ink)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] ring-1"
                      : "xr-line bg-[var(--xr-surface)] text-[var(--xr-ink)] hover:-translate-y-0.5 hover:bg-[var(--xr-surface-strong)]")
                  }
                >
                  <span
                    className={"grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 " + (selected ? "border-transparent text-white" : "xr-line")}
                    style={selected ? { background: accent.color, boxShadow: `0 0 16px ${accent.color}66` } : undefined}
                  >
                    <I className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[9px] font-semibold">{t(S?.title ?? { fr: id, en: id, vi: id, ar: id, ru: id })}</span>
                    {selected ? <span className="mt-1 block h-0.5 w-8 rounded-full" style={{ background: accent.color }} /> : null}
                    <span className={"mt-0.5 block label-mono text-[6px] xr-muted-2"}>
                      0{i + 1}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.32fr_.68fr]">
          <Reveal>
            <Parallax speed={-0.022}>
              <div className="overflow-hidden rounded-[1.15rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)]">
                <ServiceIllustration service={active} title={t(service.title)} />
              </div>
            </Parallax>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex h-full min-h-[430px] flex-col justify-between rounded-[1.15rem] border xr-line bg-[var(--xr-bg-elev)] text-[var(--xr-ink)] p-7 shadow-[var(--xr-shadow)] backdrop-blur-xl sm:p-9 lg:p-10">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="label-mono text-[7px] tracking-[.22em] xr-muted-2">
                    CHAPTER {String(index + 1).padStart(2, "0")} / 07
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full text-white shadow-lg transition-colors duration-300" style={{ background: currentAccent.color, boxShadow: `0 0 20px ${currentAccent.color}55` }}>
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="display-serif mt-10 text-5xl leading-[.82] tracking-[-.05em] sm:text-6xl">
                  {t(service.title)}
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-6 xr-muted">{t(service.description)}</p>

                <div className="mt-7 space-y-2">
                  {(service.highlights ?? []).slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-3 border-t xr-line py-3.5">
                      <span className="label-mono mt-0.5 text-[6px] xr-muted-2">0{i + 1}</span>
                      <span className="text-[10px] leading-4">{t(item)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-end justify-between gap-5 border-y xr-line py-5">
                  <div>
                    <span className="label-mono text-[6px] xr-muted-2">{copy.from}</span>
                    <p className="display-serif mt-1 text-4xl">{active === "maps" ? "990 €" : price(PRICES[active])}</p>
                  </div>
                  <span className="label-mono pb-1 text-[6px] xr-muted-2">
                    {service.fromPeriod === "month" ? copy.perMonth : service.fromPeriod === "year" ? copy.perYear : ""}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    to={serviceHref(active)}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3.5 label-mono text-[8px] font-semibold text-[var(--xr-bg)] transition hover:-translate-y-0.5"
                  >
                    {copy.open}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => funnel?.toggleService(funnelServiceId)}
                    className={
                      "inline-flex items-center gap-2 rounded-full border px-4 py-3.5 label-mono text-[8px] transition hover:-translate-y-0.5 " +
                      (isSelectedInFunnel
                        ? "border-[var(--service-accent)] bg-[var(--xr-accent-soft)] font-bold text-[var(--xr-ink)]"
                        : "xr-line bg-[var(--xr-surface-strong)] text-[var(--xr-muted)] hover:text-[var(--xr-ink)]")
                    }
                  >
                    {isSelectedInFunnel
                      ? FUNNEL_SERVICE_BTN[currentLang]?.added || "✓ Dans votre devis"
                      : FUNNEL_SERVICE_BTN[currentLang]?.add || "+ Ajouter au devis"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!isSelectedInFunnel) funnel?.toggleService(funnelServiceId);
                      funnel?.scrollToSection("#quote");
                    }}
                    className="inline-flex items-center gap-2 rounded-full border xr-line px-5 py-3.5 label-mono text-[8px] xr-muted transition hover:bg-[var(--xr-bg)]"
                  >
                    {copy.quote}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <button
            type="button"
            onClick={() => setActive(next)}
            className="mt-4 flex w-full items-center justify-between rounded-[1.5rem] border xr-line bg-[var(--xr-bg)] px-5 py-4 text-left transition hover:-translate-y-0.5 sm:px-6"
          >
            <span>
              <span className="label-mono block text-[6px] tracking-[.2em] xr-muted-2">{copy.next}</span>
              <span className="mt-1 block text-sm font-semibold">{t(SERVICES.find((s) => s.id === next)?.title ?? { fr: next, en: next, vi: next, ar: next, ru: next })}</span>
            </span>
            <ArrowRight className="h-4 w-4 xr-muted-2" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
