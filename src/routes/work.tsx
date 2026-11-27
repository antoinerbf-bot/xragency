import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search, ChevronDown, ExternalLink, X } from "lucide-react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/primitives";
import { Contact } from "@/components/site/Contact";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";
import { SERVICES } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/work")({
  beforeLoad: () => {
    throw redirect({
      to: "/realisations",
      statusCode: 301,
    });
  },
  component: WorkPage,
});

const copy = {
  fr: {
    kicker:"XR AGENCY · RÉFÉRENCES VISUELLES", title:"Des univers digitaux", accent:"pour nourrir la création.", intro:"Une sélection de sites externes qui servent de références visuelles et d’inspiration. Ils ne sont pas présentés comme des réalisations ou des clients XR Agency.", search:"Rechercher…", all:"Toutes les prestations", industries:"Tous les secteurs", open:"Ouvrir le site", close:"Fermer", reset:"Réinitialiser", catalogue:"Références visuelles", index:"sites sélectionnés", reel:"REEL HOMEPAGES", showcase:"Voir les univers en situation", reference:"Référence", agency:"XR Agency", homepage:"HOMEPAGE", visit:"VISITER",
    catHeading:"Chaque inspiration,", catAccent:"en contexte.", catDesc:"Ces sites externes sont présentés pour leur structure, leur rythme, leur direction artistique et leur expérience. Ils ne constituent pas des références clients XR Agency.",
    moreBtn:"AFFICHER 18 RÉFÉRENCES DE PLUS", remaining:"RESTANTES", empty:"Aucune référence ne correspond à ces filtres.", modalNote:"Capture visuelle de la homepage publique. Le bouton ouvre le site réel dans un nouvel onglet."
  },
  en: {
    kicker:"XR AGENCY · VISUAL REFERENCES", title:"Digital worlds", accent:"to inspire the craft.", intro:"A selection of external websites used as visual references and inspiration. They are not presented as XR Agency work or clients.", search:"Search…", all:"All services", industries:"All industries", open:"Open website", close:"Close", reset:"Reset", catalogue:"Visual references", index:"selected websites", reel:"HOMEPAGE REEL", showcase:"See the work in context", reference:"Reference", agency:"XR Agency", homepage:"HOMEPAGE", visit:"VISIT",
    catHeading:"Every inspiration,", catAccent:"in context.", catDesc:"These external websites are shown for their structure, rhythm, art direction and experience. They are not XR Agency client work.",
    moreBtn:"SHOW 18 MORE REFERENCES", remaining:"REMAINING", empty:"No references match these filters.", modalNote:"Visual capture of the public homepage. The button opens the live website in a new tab."
  },
  vi: {
    kicker:"XR AGENCY · THAM KHẢO HÌNH ẢNH", title:"Những thế giới số", accent:"khơi nguồn sáng tạo.", intro:"Tuyển chọn website bên ngoài dùng làm tư liệu tham khảo và cảm hứng thiết kế. Đây không phải dự án hay khách hàng của XR Agency.", search:"Tìm kiếm…", all:"Tất cả dịch vụ", industries:"Tất cả lĩnh vực", open:"Mở website", close:"Đóng", reset:"Đặt lại", catalogue:"Tư liệu tham khảo", index:"website được chọn", reel:"REEL HOMEPAGE", showcase:"Xem các universes thực tế", reference:"Tham khảo", agency:"XR Agency", homepage:"HOMEPAGE", visit:"MỞ",
    catHeading:"Từng nguồn cảm hứng,", catAccent:"trong bối cảnh.", catDesc:"Các website bên ngoài được giới thiệu để tham khảo cấu trúc, nhịp điệu, định hướng nghệ thuật và trải nghiệm. Đây không phải dự án khách hàng của XR Agency.",
    moreBtn:"HIỂN THỊ THÊM 18 DỰ ÁN", remaining:"CÒN LẠI", empty:"Không có dự án nào phù hợp với bộ lọc này.", modalNote:"Bản chụp giao diện homepage thực tế. Nút bấm sẽ mở website trực tiếp trong tab mới."
  },
  ar: {
    kicker:"XR AGENCY · مراجع بصرية", title:"عوالم رقمية", accent:"تلهم الإبداع.", intro:"مجموعة مختارة من مواقع خارجية تُستخدم كمراجع وإلهام بصري. لا تمثل هذه المواقع أعمالاً أو عملاء لـ XR Agency.", search:"بحث…", all:"جميع الخدمات", industries:"جميع القطاعات", open:"فتح الموقع", close:"إغلاق", reset:"إعادة ضبط", catalogue:"مراجع بصرية", index:"مواقع مختارة", reel:"REEL HOMEPAGES", showcase:"شاهد العمل في سياقه", reference:"مرجع", agency:"XR Agency", homepage:"HOMEPAGE", visit:"زيارة",
    catHeading:"كل مرجع،", catAccent:"في صور.", catDesc:"يتم عرض المراجع مع صفحتها الرئيسية كأول مادة بصرية: الهيكل، الإيقاع، التوجيه الفني والتجربة.",
    moreBtn:"عرض 18 مرجعاً إضافياً", remaining:"متبقية", empty:"لا توجد مراجع تطابق هذه الفلاتر.", modalNote:"لقطة بصرية للصفحة الرئيسية العامة. الزر يفتح الموقع الفعلي في نافذة جديدة."
  },
  ru: {
    kicker:"XR AGENCY · ВИЗУАЛЬНЫЕ РЕФЕРЕНСЫ", title:"Цифровые миры", accent:"для творческого вдохновения.", intro:"Подборка внешних сайтов для визуальных референсов и вдохновения. Они не представлены как проекты или клиенты XR Agency.", search:"Поиск…", all:"Все услуги", industries:"Все отрасли", open:"Открыть сайт", close:"Закрыть", reset:"Сбросить", catalogue:"Визуальные референсы", index:"выбранных сайтов", reel:"REEL HOMEPAGES", showcase:"Смотреть проекты в контексте", reference:"Референс", agency:"XR Agency", homepage:"HOMEPAGE", visit:"ОТКРЫТЬ",
    catHeading:"Каждый источник вдохновения,", catAccent:"в контексте.", catDesc:"Эти внешние сайты представлены как ориентиры по структуре, ритму, арт-дирекшну и опыту. Это не проекты клиентов XR Agency.",
    moreBtn:"ПОКАЗАТЬ ЕЩЁ 18 ПРОЕКТОВ", remaining:"ОСТАЛОСЬ", empty:"Нет проектов, соответствующих этим фильтрам.", modalNote:"Визуальный снимок публичной главной страницы. Кнопка открывает реальный сайт в новой вкладке."
  },
} as const;

const sectorLabels: Record<string, Record<string,string>> = {
  luxe:{fr:"Luxe",en:"Luxury",vi:"Cao cấp",ar:"فاخر",ru:"Люкс"}, hotel:{fr:"Hôtellerie",en:"Hospitality",vi:"Khách sạn",ar:"ضيافة",ru:"Отели"},
  restaurant:{fr:"Restauration",en:"Restaurant",vi:"Nhà hàng",ar:"مطاعم",ru:"Рестораны"}, immobilier:{fr:"Immobilier",en:"Real Estate",vi:"Bất động sản",ar:"عقارات",ru:"Недвижимость"},
  auto:{fr:"Automobile",en:"Automotive",vi:"Ô tô",ar:"سيارات",ru:"Авто"}, architecture:{fr:"Architecture",en:"Architecture",vi:"Kiến trúc",ar:"عمارة",ru:"Архитектура"},
  mode:{fr:"Mode",en:"Fashion",vi:"Thời trang",ar:"أزياء",ru:"Мода"}, beaute:{fr:"Beauté",en:"Beauty",vi:"Làm đẹp",ar:"جمال",ru:"Красота"},
  sante:{fr:"Santé",en:"Health",vi:"Sức khỏe",ar:"صحة",ru:"Здоровье"}, droit:{fr:"Droit",en:"Legal",vi:"Pháp lý",ar:"قانون",ru:"Право"},
  finance:{fr:"Finance",en:"Finance",vi:"Tài chính",ar:"مالية",ru:"Финансы"}, tech:{fr:"Tech / SaaS",en:"Tech / SaaS",vi:"Công nghệ / SaaS",ar:"تقنية / SaaS",ru:"Tech / SaaS"},
  education:{fr:"Éducation",en:"Education",vi:"Giáo dục",ar:"تعليم",ru:"Образование"}, sport:{fr:"Sport",en:"Sports",vi:"Thể thao",ar:"رياضة",ru:"Спорт"},
  voyage:{fr:"Voyage",en:"Travel",vi:"Du lịch",ar:"سفر",ru:"Путешествия"}, maison:{fr:"Maison / Design",en:"Home / Design",vi:"Nhà / Thiết kế",ar:"منزل / تصميم",ru:"Дом / Дизайн"},
  joaillerie:{fr:"Joaillerie",en:"Jewellery",vi:"Trang sức",ar:"مجوهرات",ru:"Ювелирные изделия"}, food:{fr:"Food",en:"Food",vi:"Ẩm thực",ar:"أغذية",ru:"Food"},
  spa:{fr:"Spa / Wellness",en:"Spa / Wellness",vi:"Spa / Wellness",ar:"سبا / عافية",ru:"Spa / Wellness"}, construction:{fr:"Construction",en:"Construction",vi:"Xây dựng",ar:"إنشاءات",ru:"Строительство"},
};

const FEATURED_NAMES = ["Pok-N Ball", "Le Gramme", "AYANA", "Raycast", "Audo Copenhagen", "Typology"] as const;


type PortfolioItem = (typeof PORTFOLIO_REFERENCES)[number];

const ALWAYS_FALLBACK_HOSTS = new Set([
  "completedworks.com",
  "www.completedworks.com",
  "ayana.com",
  "www.ayana.com",
  "dior.com",
  "www.dior.com",
  "chanel.com",
  "www.chanel.com",
  "cartier.com",
  "www.cartier.com",
  "vancleefarpels.com",
  "www.vancleefarpels.com",
  "tiffany.com",
  "www.tiffany.com",
  "bulgari.com",
  "www.bulgari.com",
  "messika.com",
  "www.messika.com",
  "repossi.com",
  "www.repossi.com",
  "bottegaveneta.com",
  "www.bottegaveneta.com",
  "loewe.com",
  "www.loewe.com",
  "jacquemus.com",
  "www.jacquemus.com",
  "toteme-studio.com",
  "www.toteme-studio.com",
  "prada.com",
  "www.prada.com",
  "ysl.com",
  "www.ysl.com",
  "moncler.com",
  "www.moncler.com",
  "rimowa.com",
  "www.rimowa.com",
  "porsche.com",
  "www.porsche.com",
  "ferrari.com",
  "www.ferrari.com",
  "lamborghini.com",
  "www.lamborghini.com",
  "astonmartin.com",
  "www.astonmartin.com",
  "mclaren.com",
  "www.mclaren.com",
  "nike.com",
  "www.nike.com",
  "arcteryx.com",
  "www.arcteryx.com",
  "patagonia.com",
  "www.patagonia.com",
  "webflow.com",
  "www.webflow.com",
  "notion.so",
  "www.notion.so",
  "stripe.com",
  "stripe.com",
  "spotify.com",
  "www.spotify.com",
  "revolut.com",
  "www.revolut.com",
  "wise.com",
  "www.wise.com",
  "monzo.com",
  "monzo.com",
  "polestar.com",
  "www.polestar.com",
]);

const shouldUseReferenceFallback = (url: string) => {
  try {
    return ALWAYS_FALLBACK_HOSTS.has(new URL(url).hostname.toLowerCase());
  } catch {
    return false;
  }
};

function ReferencePreview({
  item,
  alt,
  loading,
  className = "",
}: {
  item?: PortfolioItem | null;
  alt?: string;
  loading?: "eager" | "lazy";
  className?: string;
}) {
  const [hasImgError, setHasImgError] = useState(false);

  if (!item) {
    return <div aria-hidden className={`relative h-full w-full overflow-hidden bg-[#0b0e12] ${className}`} />;
  }

  const hostname = item.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const initial = item.name.trim().charAt(0).toUpperCase();

  // If screenshot image fails or is in fallback mode, show an authentic, high-end digital interface mockup
  if (hasImgError) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden bg-[#24231F] text-white flex flex-col justify-between p-6 sm:p-7 select-none ${className}`}
        aria-label={alt ?? item.name}
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,138,101,.14),transparent_40%),linear-gradient(135deg,#0d1117,#07090c_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,.05)_50%,transparent_65%)]" />

        {/* Browser header mockup */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="ml-2 font-mono text-[7px] text-white/40 tracking-wider truncate max-w-[150px]">
              {hostname}
            </span>
          </div>
          <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[6.5px] uppercase tracking-wider text-white/80">
            {item.type}
          </span>
        </div>

        {/* Body visual mockup */}
        <div className="relative z-10 my-auto py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/5 text-xl font-bold font-serif text-white shadow-inner">
              {initial}
            </span>
            <div>
              <p className="label-mono text-[7px] uppercase tracking-[.2em] text-white/45">{item.sector}</p>
              <h3 className="display-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">{item.name}</h3>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 label-mono text-[6.5px] text-white/60">
              RÉFÉRENCE VISUELLE
            </span>
            <span className="rounded-md border border-[#A67C40]/40 bg-[#A67C40]/15 px-2 py-1 label-mono text-[6.5px] text-[#E5C696]">
              SITE EXTERNE
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="label-mono text-[6.5px] text-white/40">EXPLORER L'UNIVERS DIGITAL</span>
          <span className="inline-flex items-center gap-1 label-mono text-[7px] font-bold text-white">
            SITE OFFICIEL ↗
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={item.image}
      alt={alt ?? item.name + " homepage"}
      loading={loading}
      onError={() => setHasImgError(true)}
      className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`}
    />
  );
}

export function WorkPage() {
  const { lang } = useLang();
  const tx = copy[lang] ?? copy.fr;
  const [query,setQuery]=useState("");
  const [sector,setSector]=useState("all");
  const [service,setService]=useState("all");
  const [active,setActive]=useState<(typeof PORTFOLIO_REFERENCES)[number] | null>(null);
  const featured = useMemo(() => FEATURED_NAMES.map(name => PORTFOLIO_REFERENCES.find(item => item.name === name)).filter(Boolean) as (typeof PORTFOLIO_REFERENCES[number])[], []);
  const [reelIndex,setReelIndex]=useState(0);

  useEffect(() => {
    if (!featured.length) return;
    const timer = window.setInterval(() => setReelIndex(i => (i + 1) % featured.length), 4200);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  const reelItem = featured[reelIndex] ?? featured[0];

  const serviceOptions=[{id:"all",label:tx.all},...SERVICES.filter(x=>x.id!=="ecommerce").map(x=>({id:x.id,label:x.title[lang] ?? x.title.en ?? x.title.fr}))];
  const filtered=useMemo(()=>PORTFOLIO_REFERENCES.filter(item=>{
    const q=query.toLowerCase().trim();
    return (!q || [item.name,item.sector,item.type].join(" ").toLowerCase().includes(q))
      && (sector==="all" || item.sector===sector)
      && (service==="all" || item.services.includes(service));
  }),[query,sector,service]);

  // Keep the large reference catalogue lightweight: only mount a small window
  // of cards initially; more cards are revealed as the visitor scrolls.
  const [visibleCount,setVisibleCount]=useState(18);
  useEffect(() => { setVisibleCount(18); }, [query,sector,service]);

  const quickFilters = [
    { id: "all", kind: "reset" as const, label: { fr: "Tous", en: "All", vi: "Tất cả", ar: "الكل", ru: "Все" }[lang] ?? "Tous" },
    { id: "hotel", kind: "sector" as const, label: { fr: "Hôtellerie", en: "Hospitality", vi: "Khách sạn", ar: "الفنادق", ru: "Отели" }[lang] ?? "Hôtellerie" },
    { id: "restaurant", kind: "sector" as const, label: { fr: "Restauration", en: "Restaurants", vi: "Nhà hàng", ar: "المطاعم", ru: "Рестораны" }[lang] ?? "Restauration" },
    { id: "immobilier", kind: "sector" as const, label: { fr: "Immobilier", en: "Real Estate", vi: "Bất động sản", ar: "العقارات", ru: "Недвижимость" }[lang] ?? "Immobilier" },
    { id: "websites", kind: "service" as const, label: { fr: "Sites web", en: "Websites", vi: "Website", ar: "المواقع", ru: "Сайты" }[lang] ?? "Sites web" },
    { id: "seo", kind: "service" as const, label: "SEO" },
    { id: "social", kind: "service" as const, label: "Social Media" },
    { id: "branding", kind: "service" as const, label: "Branding" },
  ];

  const pokeCase = {
    badge: {
      fr: "ÉTUDE DE CAS RÉELLE · XR AGENCY",
      en: "REAL CASE STUDY · XR AGENCY",
      vi: "DỰ ÁN THỰC TẾ · XR AGENCY",
      ar: "دراسة حالة حقيقية · XR AGENCY",
      ru: "РЕАЛЬНЫЙ КЕЙС · XR AGENCY",
    }[lang] ?? "ÉTUDE DE CAS RÉELLE · XR AGENCY",
    desc: {
      fr: "Conception et mise en ligne du site web de Pok-N Ball : univers de marque frais et moderne, présentation claire de la carte, expérience mobile-first et accès rapide à la découverte du restaurant.",
      en: "Website design and launch for Pok-N Ball: fresh brand atmosphere, structured menu showcase, mobile-first browsing and effortless restaurant discovery.",
      vi: "Thiết kế và ra mắt website cho Pok-N Ball: hình ảnh thương hiệu tươi mới, trình bày thực đơn rõ ràng và trải nghiệm tối ưu cho di động.",
      ar: "تصميم وإطلاق موقع Pok-N Ball بهوية عصرية وقائمة طعام واضحة وتجربة سلسة على الهواتف الذكية.",
      ru: "Разработка и запуск сайта Pok-N Ball: свежая айдентика, наглядное меню и быстрый mobile-first интерфейс.",
    }[lang] ?? "",
    cta: {
      fr: "Visiter pokebowlfresh.vercel.app",
      en: "Visit pokebowlfresh.vercel.app",
      vi: "Xem pokebowlfresh.vercel.app",
      ar: "زيارة pokebowlfresh.vercel.app",
      ru: "Открыть pokebowlfresh.vercel.app",
    }[lang] ?? "Visiter pokebowlfresh.vercel.app",
    quoteCta: {
      fr: "Lancer un projet similaire",
      en: "Start a similar project",
      vi: "Triển khai dự án tương tự",
      ar: "ابدأ مشروعاً مشابهاً",
      ru: "Заказать похожий проект",
    }[lang] ?? "Lancer un projet similaire",
  };

  return <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-x-hidden bg-[#F7F4EE] text-[#171613]">
    <Nav/>
    <main className="pt-20 sm:pt-24">
      <section className="relative min-h-[68vh] overflow-hidden bg-[#171613] text-[#F7F4EE]">
        <div className="absolute inset-0 bg-[#171613]"><ReferencePreview item={reelItem} alt="" loading="eager" className="absolute inset-0 opacity-45 contrast-[1.02] brightness-[.55] transition-opacity duration-1000" /><div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(23,22,19,.92),rgba(23,22,19,.52)_54%,rgba(23,22,19,.82))]" /></div>
        <div className="relative mx-auto flex min-h-[68vh] max-w-[1500px] flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.26em] text-white/70">{tx.kicker}</p>
          <h1 className="display-serif mt-4 max-w-5xl text-[clamp(3rem,7.5vw,6.8rem)] leading-[.9] tracking-[-0.04em]">{tx.title}<br/><em className="italic font-normal text-white">{tx.accent}</em></h1>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-[#F7F4EE]/75 sm:text-base">{tx.intro}</p>
          {reelItem && <div className="mt-6 flex flex-wrap items-center gap-3"><div className="rounded-full border border-[#F7F4EE]/15 bg-white/[.05] px-4 py-2 backdrop-blur-xl"><span className="font-mono text-[10px] tracking-[.16em] text-white/80">{tx.reel} · {String(reelIndex + 1).padStart(2,"0")}/{String(featured.length).padStart(2,"0")}</span></div><div className="rounded-full border border-[#F7F4EE]/15 bg-black/45 px-4 py-2 backdrop-blur-xl"><span className="text-xs text-[#F7F4EE]">{reelItem.name}</span><span className="ms-2 text-[10px] text-[#F7F4EE]/55">{sectorLabels[reelItem.sector]?.[lang] ?? reelItem.sector}</span></div></div>}
          <div className="mt-10 grid gap-2 rounded-[1.6rem] border border-white/12 bg-black/45 p-2 backdrop-blur-2xl lg:grid-cols-[1fr_.28fr_.28fr_auto]">
            <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={tx.search} className="w-full rounded-xl border border-white/12 bg-white/[.05] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-white"/></div>
            <label className="relative"><select value={sector} onChange={e=>setSector(e.target.value)} className="w-full appearance-none rounded-xl border border-white/12 bg-white/[.05] px-4 py-3.5 pr-9 text-xs text-white outline-none"><option value="all" className="text-black">{tx.industries}</option>{PORTFOLIO_SECTORS.map(([id,label])=><option key={id} value={id} className="text-black">{sectorLabels[id]?.[lang] ?? label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/45"/></label>
            <label className="relative"><select value={service} onChange={e=>setService(e.target.value)} className="w-full appearance-none rounded-xl border border-white/12 bg-white/[.05] px-4 py-3.5 pr-9 text-xs text-white outline-none"><option value="all" className="text-black">{tx.all}</option>{serviceOptions.slice(1).map(x=><option key={x.id} value={x.id} className="text-black">{x.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/45"/></label>
            <div className="flex items-center justify-center rounded-xl border border-white/12 bg-white/[.05] px-4 py-3 font-mono text-[10px] text-white/90">{filtered.length} {tx.index}</div>
          </div>
        </div>
      </section>

      {/* Dedicated Verified Case Study: Pok-N Ball */}
      <section className="border-b border-[#171613]/10 bg-[#EEE9E0] py-14 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-3xl border border-[#171613]/12 bg-white shadow-[0_20px_50px_rgba(23,22,19,0.06)]">
            <div className="grid items-center lg:grid-cols-12">
              <div className="relative aspect-[16/10] bg-[#171613] lg:col-span-6 lg:aspect-auto lg:h-full">
                <img
                  src="/showcase/pokenball_showcase.jpg"
                  alt="Pok-N Ball (pokenball.be) — Réalisation XRAGENCY Belgique"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-6 sm:p-10 lg:col-span-6">
                <span className="inline-flex items-center rounded-full border border-[#9E7F5A]/35 bg-[#9E7F5A]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7D6445]">
                  {pokeCase.badge}
                </span>
                <h2 className="mt-4 font-serif text-3xl font-medium text-[#171613] sm:text-5xl">
                  Pok-N Ball
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#57534B] sm:text-base">
                  {pokeCase.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Site web", "Restauration", "Mobile-first", "Branding"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#171613]/12 bg-[#FAF8F4] px-3 py-1 font-mono text-[10px] font-medium text-[#45413A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://pokebowlfresh.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#171613] px-6 py-3 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823]"
                  >
                    {pokeCase.cta}
                    <ExternalLink className="h-3.5 w-3.5 text-white" />
                  </a>
                  <a
                    href="/#quote"
                    className="inline-flex items-center gap-2 rounded-full border border-[#171613]/20 bg-white px-6 py-3 text-xs font-semibold text-[#171613] transition hover:border-[#9E7F5A]"
                  >
                    {pokeCase.quoteCta}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick One-Click Editorial Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {quickFilters.map((qf) => {
              const isActive =
                (qf.kind === "reset" && sector === "all" && service === "all") ||
                (qf.kind === "sector" && sector === qf.id) ||
                (qf.kind === "service" && service === qf.id);
              return (
                <button
                  key={qf.id}
                  type="button"
                  onClick={() => {
                    if (qf.kind === "reset") {
                      setSector("all");
                      setService("all");
                    } else if (qf.kind === "sector") {
                      setSector(qf.id);
                      setService("all");
                    } else {
                      setService(qf.id);
                      setSector("all");
                    }
                  }}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "border-[#171613] bg-[#171613] text-[#F7F4EE]"
                      : "border-[#171613]/15 bg-white text-[#45413A] hover:border-[#9E7F5A]"
                  }`}
                >
                  {qf.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-[#080b0f] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div><p className="label-mono text-[9px] tracking-[.28em] text-white/45">{tx.reel}</p><h2 className="display-serif mt-3 max-w-4xl text-4xl leading-[.9] sm:text-6xl">{tx.showcase}</h2></div>
            <div className="hidden items-center gap-1 sm:flex">{featured.slice(0,6).map((item,i)=><button key={item.url} type="button" onClick={()=>setReelIndex(i)} className={"h-1.5 rounded-full transition-all duration-500 "+(i===reelIndex?"w-10 bg-white":"w-3 bg-white/20 hover:bg-white/40")} aria-label={item.name}/>)}</div>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
            <button type="button" onClick={()=>reelItem && setActive(reelItem)} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black text-left">
              <div className="aspect-[16/9] overflow-hidden bg-[#0d1116]">
                <ReferencePreview item={reelItem} alt={reelItem?.name+" homepage"} loading="eager" className="transition duration-[1600ms] group-hover:scale-[1.025]"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-black/3"/>
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between"><span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-white/55 backdrop-blur-xl">{tx.homepage} / {String(reelIndex+1).padStart(2,"0")}</span><span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 label-mono text-[7px] text-white/55 backdrop-blur-xl">{reelItem?.origin === "XR Agency" ? tx.agency : tx.reference}</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"><p className="label-mono text-[8px] tracking-[.18em] text-white/38">{sectorLabels[reelItem?.sector ?? ""]?.[lang] ?? reelItem?.sector} · {reelItem?.type}</p><div className="mt-2 flex items-end justify-between gap-4"><h3 className="display-serif text-5xl leading-[.86] sm:text-7xl">{reelItem?.name}</h3><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition group-hover:bg-white group-hover:text-black"><ArrowUpRight className="h-4 w-4"/></span></div></div>
              </div>
            </button>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {featured.slice(1,4).map((item,i)=><button key={item.url} type="button" onClick={()=>{setReelIndex(i+1);setActive(item)}} className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.025] text-left">
                <div className="aspect-[16/9] overflow-hidden bg-[#0d1116] sm:aspect-[16/7] lg:aspect-[16/7]"><ReferencePreview item={item} alt={item.name+" homepage"} loading="lazy" className="opacity-75 transition duration-[1200ms] group-hover:scale-[1.04] group-hover:opacity-100"/><div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-transparent"/><div className="absolute inset-y-0 left-4 flex items-center"><div><p className="label-mono text-[7px] tracking-[.18em] text-white/35">{item.origin === "XR Agency" ? tx.agency : tx.reference} · {tx.homepage}</p><h3 className="display-serif mt-1 text-2xl">{item.name}</h3></div></div></div>
              </button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-border bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-mono text-[9px] tracking-[.28em] text-primary">01 / {tx.catalogue}</p>
              <h2 className="display-serif mt-3 max-w-5xl text-4xl leading-[.86] sm:text-6xl">{tx.catHeading} <em className="not-italic text-muted-foreground">{tx.catAccent}</em></h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{tx.catDesc}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full border border-border px-3 py-2 label-mono text-[8px] text-muted-foreground">{filtered.length} {tx.index}</span>
              <button type="button" onClick={()=>{setQuery("");setSector("all");setService("all")}} className="rounded-full border border-border px-4 py-2 label-mono text-[8px] text-muted-foreground transition hover:border-primary/40 hover:text-foreground">{tx.reset}</button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.slice(0,visibleCount).map((item,index)=>(
              <Reveal key={item.name+item.url} delay={Math.min(index,12)*25}>
                <button
                  type="button"
                  onClick={()=>setActive(item)}
                  className="group block w-full overflow-hidden rounded-[1.8rem] border border-border bg-card text-left transition duration-700 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#080b0f]">
                    <ReferencePreview
                      item={item}
                      alt={item.name+" homepage"}
                      loading={index<9?"eager":"lazy"}
                      className="object-top transition duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-white/60 backdrop-blur-xl">{tx.homepage} / {String(index+1).padStart(2,"0")}</span>
                      <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 label-mono text-[7px] tracking-[.12em] text-white/55 backdrop-blur-xl">{item.origin === "XR Agency" ? tx.agency : tx.reference}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p className="label-mono text-[7px] tracking-[.18em] text-white/42">{sectorLabels[item.sector]?.[lang] ?? item.sector} · {item.type}</p>
                      <div className="mt-2 flex items-end justify-between gap-4 text-white">
                        <h3 className="display-serif text-4xl leading-[.86] sm:text-5xl">{item.name}</h3>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition duration-500 group-hover:bg-white group-hover:text-black">
                          <ArrowUpRight className="h-4 w-4"/>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex min-h-[62px] items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-xs text-muted-foreground">{item.services.map(s=>s==="ecommerce"?"E-commerce":s).join(" · ")}</p>
                      <p className="mt-1 label-mono text-[7px] tracking-[.15em] text-muted-foreground/50">{item.url.replace(/^https?:\/\//,"").replace(/\/$/,"")}</p>
                    </div>
                    <span className="shrink-0 label-mono text-[8px] text-primary opacity-70 transition group-hover:opacity-100">{tx.visit} →</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={()=>setVisibleCount(count=>Math.min(count+18,filtered.length))}
                className="rounded-full border border-border bg-card px-6 py-3 label-mono text-[8px] tracking-[.16em] text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                {tx.moreBtn} · {filtered.length-visibleCount} {tx.remaining}
              </button>
            </div>
          )}

          {!filtered.length && (
            <div className="rounded-[1.8rem] border border-dashed border-border px-6 py-16 text-center">
              <p className="display-serif text-3xl">{tx.empty}</p>
              <button type="button" onClick={()=>{setQuery("");setSector("all");setService("all")}} className="mt-5 rounded-full border border-border px-4 py-2 label-mono text-[8px] text-muted-foreground hover:border-primary/40">{tx.reset}</button>
            </div>
          )}
        </div>
      </section>
    </main>
    {active && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-auto rounded-[2rem] border border-white/15 bg-background shadow-2xl">
        <button type="button" onClick={()=>setActive(null)} aria-label={tx.close} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/65 text-white"><X className="h-4 w-4"/></button>
        <div className="grid lg:grid-cols-[1.4fr_.6fr]"><div className="min-h-[420px] bg-[#080b0f]"><div className="relative h-full min-h-[420px] overflow-hidden"><ReferencePreview item={active} alt={active.name+" homepage"} loading="eager" className="min-h-[420px] object-top"/><div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-white/55 backdrop-blur-xl">{tx.homepage}</div></div></div><div className="p-7 sm:p-10"><span className="label-mono text-[8px] tracking-[.24em] text-primary">{sectorLabels[active.sector]?.[lang] ?? active.sector} · {active.type}</span><h2 className="display-serif mt-4 text-5xl leading-[.86]">{active.name}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">{tx.modalNote}</p><div className="mt-6 flex flex-wrap gap-2">{active.services.map(s=><span key={s} className="rounded-full border border-border px-3 py-1.5 text-[9px] text-muted-foreground">{s==="ecommerce"?"E-commerce":s}</span>)}</div><a href={active.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-semibold text-background">{tx.open}<ExternalLink className="h-3.5 w-3.5"/></a></div></div>
      </div>
    </div>}
    <Contact/>
  </div>;
}
