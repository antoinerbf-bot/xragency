import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { XR_HERO_PHOTO } from "@/lib/photography";

const COPY = {
  fr: {
    kicker: "XR AGENCY · STUDIO DIGITAL INDÉPENDANT",
    locations: "FRANCE · DUBAÏ · ASIE · INTERNATIONAL",
    line1: "Votre présence",
    line2: "digitale mérite",
    line3: "mieux.",
    lead: "Sites web, identité de marque, référencement et acquisition : nous construisons une présence digitale pensée pour attirer, convaincre et faire grandir votre activité.",
    primary: "Recevoir ma maquette gratuite",
    secondary: "Auditer ma visibilité",
    note: "Sans engagement · Une réponse adaptée à votre projet",
    services: ["STRATÉGIE", "DIRECTION ARTISTIQUE", "WEB & E-COMMERCE", "SEO & ACQUISITION"],
    scroll: "DÉCOUVRIR XR AGENCY",
    scene: "UN STUDIO. PLUSIEURS EXPERTISES.",
    stamp: "CONÇU POUR VOUS",
  },
  en: {
    kicker: "XR AGENCY · INDEPENDENT DIGITAL STUDIO",
    locations: "FRANCE · DUBAI · ASIA · INTERNATIONAL",
    line1: "Your digital",
    line2: "presence deserves",
    line3: "better.",
    lead: "Websites, brand identity, search visibility and acquisition: we build a digital presence designed to attract, convince and grow your business.",
    primary: "Get my free mockup",
    secondary: "Audit my visibility",
    note: "No commitment · Tailored to your project",
    services: ["STRATEGY", "ART DIRECTION", "WEB & E-COMMERCE", "SEO & ACQUISITION"],
    scroll: "DISCOVER XR AGENCY",
    scene: "ONE STUDIO. MULTIPLE DISCIPLINES.",
    stamp: "MADE FOR YOU",
  },
  vi: {
    kicker: "XR AGENCY · STUDIO KỸ THUẬT SỐ ĐỘC LẬP",
    locations: "PHÁP · DUBAI · CHÂU Á · QUỐC TẾ",
    line1: "Hiện diện số",
    line2: "của bạn xứng đáng",
    line3: "tốt hơn.",
    lead: "Website, nhận diện thương hiệu, SEO và thu hút khách hàng: chúng tôi xây dựng sự hiện diện số giúp doanh nghiệp thu hút, thuyết phục và phát triển.",
    primary: "Nhận bản mẫu miễn phí",
    secondary: "Kiểm tra khả năng hiển thị",
    note: "Không ràng buộc · Theo sát dự án của bạn",
    services: ["CHIẾN LƯỢC", "ĐỊNH HƯỚNG NGHỆ THUẬT", "WEB & THƯƠNG MẠI ĐIỆN TỬ", "SEO & THU HÚT"],
    scroll: "KHÁM PHÁ XR AGENCY",
    scene: "MỘT STUDIO. NHIỀU CHUYÊN MÔN.",
    stamp: "THIẾT KẾ CHO BẠN",
  },
  ar: {
    kicker: "XR AGENCY · استوديو رقمي مستقل",
    locations: "فرنسا · دبي · آسيا · دولي",
    line1: "حضورك",
    line2: "الرقمي يستحق",
    line3: "الأفضل.",
    lead: "المواقع والهوية البصرية وتحسين الظهور والاستحواذ: نبني حضورًا رقميًا يساعدك على جذب العملاء وإقناعهم وتنمية أعمالك.",
    primary: "احصل على نموذج مجاني",
    secondary: "تدقيق الظهور الرقمي",
    note: "دون التزام · مصمم وفق مشروعك",
    services: ["الاستراتيجية", "التوجيه الفني", "الويب والتجارة الإلكترونية", "الظهور والاستحواذ"],
    scroll: "اكتشف XR AGENCY",
    scene: "استوديو واحد. تخصصات متعددة.",
    stamp: "مصمم لك",
  },
  ru: {
    kicker: "XR AGENCY · НЕЗАВИСИМАЯ DIGITAL-СТУДИЯ",
    locations: "ФРАНЦИЯ · ДУБАЙ · АЗИЯ · МЕЖДУНАРОДНЫЕ ПРОЕКТЫ",
    line1: "Ваше цифровое",
    line2: "присутствие",
    line3: "может больше.",
    lead: "Сайты, айдентика, поисковая видимость и привлечение клиентов: создаём цифровое присутствие, которое помогает привлекать, убеждать и развивать бизнес.",
    primary: "Получить бесплатный макет",
    secondary: "Проверить видимость",
    note: "Без обязательств · Под ваш проект",
    services: ["СТРАТЕГИЯ", "АРТ-ДИРЕКШН", "ВЕБ И E-COMMERCE", "SEO И ПРИВЛЕЧЕНИЕ"],
    scroll: "ОТКРЫТЬ XR AGENCY",
    scene: "ОДНА СТУДИЯ. НЕСКОЛЬКО ЭКСПЕРТИЗ.",
    stamp: "СОЗДАНО ДЛЯ ВАС",
  },
} as const;

export function Hero() {
  const { lang } = useLang();
  const copy = COPY[lang as keyof typeof COPY] ?? COPY.fr;
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setMotionAllowed(!reducedMotion && !saveData);

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image || reducedMotion || saveData) return;

    let frame = 0;
    const updateDepth = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      image.style.transform = `scale(1.07) translate3d(0, ${((progress - 0.5) * -24).toFixed(2)}px, 0)`;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDepth);
    };
    updateDepth();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="xr-hero relative isolate overflow-hidden bg-[#080808] text-white">
      {/* Desktop: one continuous cinematic frame. Mobile: image and copy remain distinct for clarity. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <img ref={imageRef} src={XR_HERO_PHOTO} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" style={{ transform: "scale(1.07)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.96)_0%,rgba(5,5,5,.86)_28%,rgba(5,5,5,.43)_54%,rgba(5,5,5,.05)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,5,.72)_0%,transparent_28%,rgba(5,5,5,.12)_100%)]" />
        <div className="absolute inset-0 opacity-[.10] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:90px_90px] [mask-image:linear-gradient(90deg,black,transparent_78%)]" />
      </div>

      <div className="relative mx-auto min-h-0 max-w-[1800px] md:min-h-[100svh]">
        <div className="relative h-[48svh] min-h-[330px] max-h-[560px] overflow-hidden md:hidden">
          <img src={XR_HERO_PHOTO} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.24)_0%,rgba(0,0,0,.04)_35%,#080808_100%)]" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
            <span className="label-mono max-w-[230px] text-[8px] leading-4 tracking-[.18em] text-white/75">{copy.locations}</span>
            <span className="shrink-0 border border-white/35 px-2.5 py-2 label-mono text-[7px] tracking-[.15em] text-white/90">{copy.stamp}</span>
          </div>
        </div>

        <div className="relative z-10 grid min-h-0 items-center px-5 pb-12 pt-7 sm:px-8 md:min-h-[100svh] md:grid-cols-[minmax(0,1.08fr)_minmax(220px,.92fr)] md:px-10 md:pb-32 md:pt-36 lg:px-16 xl:px-24">
          <div className="max-w-[860px]">
            <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-7">
              <span className="h-px w-9 bg-white/75" />
              <span className="label-mono text-[8px] tracking-[.2em] text-white/75 sm:text-[9px]">{copy.kicker}</span>
            </div>

            <h1 className="max-w-[900px] text-[clamp(3.2rem,7.2vw,7.8rem)] font-medium leading-[.86] tracking-[-.075em] text-white [text-wrap:balance]">
              <span className="block">{copy.line1}</span>
              <span className="mt-1 block font-serif font-normal italic tracking-[-.065em] text-white/80">{copy.line2}</span>
              <span className="mt-1 block">{copy.line3}</span>
            </h1>

            <p className="mt-6 max-w-[600px] text-[14px] leading-6 text-white/75 sm:mt-8 sm:text-base sm:leading-7 lg:text-[17px]">
              {copy.lead}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[.1em] text-[#090909] transition duration-300 hover:-translate-y-1 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-w-[245px]">
                {copy.primary}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#audit" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.1em] text-white/90 transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-w-[190px]">
                {copy.secondary}<Search className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
              </a>
            </div>

            <p className="mt-4 text-[10px] tracking-[.03em] text-white/50">{copy.note}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/20 pt-4 sm:mt-10 sm:gap-x-6 sm:pt-5">
              {copy.services.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-2 label-mono text-[7px] tracking-[.12em] text-white/65 sm:text-[8px]">
                  <span className="text-white/35">0{index + 1}</span>{item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative hidden h-full min-h-[500px] md:block">
            <div className="absolute right-[4%] top-[22%] max-w-[250px] border-l border-white/60 pl-4" style={{ transform: motionAllowed ? "translateY(0)" : undefined }}>
              <span className="label-mono text-[8px] tracking-[.18em] text-white/65">{copy.scene}</span>
              <div className="mt-4 space-y-3">
                {["01", "02", "03"].map((n, i) => (
                  <div key={n} className="flex items-center gap-3 text-white/90">
                    <span className="font-serif text-2xl italic text-white/45">{n}</span>
                    <span className="h-px w-10 bg-white/45" />
                    <span className="text-[10px] uppercase tracking-[.16em]">{copy.services[i + 1] ?? copy.services[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-[14%] right-[5%] flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-white/50">
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </div>
              <span className="max-w-[125px] label-mono text-[7px] leading-4 tracking-[.18em] text-white/70">{copy.scroll}</span>
            </div>
            <div className="absolute bottom-[11%] left-[2%] h-28 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
            <div className="absolute right-[4%] top-[13%] label-mono text-[7px] tracking-[.2em] text-white/55">{copy.locations}</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/15 bg-[#080808] px-5 py-4 sm:px-8 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-black/35 md:px-10 md:py-5 lg:px-16 xl:px-24">
        <span className="label-mono text-[7px] tracking-[.18em] text-white/55 sm:text-[8px]">XR AGENCY / DIGITAL MADE PERSONAL</span>
        <a href="#homepage-services" className="group inline-flex items-center gap-2 label-mono text-[7px] tracking-[.16em] text-white/75 transition hover:text-white sm:text-[8px]">
          {copy.scroll}<ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
