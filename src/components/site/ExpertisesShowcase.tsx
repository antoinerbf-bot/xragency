import { ArrowUpRight, Bot, Globe2, MapPin, Monitor, Search, ShieldCheck, Sparkles, Video } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { XR_PHOTOS } from "@/lib/photography";

const EXPERTISES = [
  { id: "websites", title: { fr: "Création de sites web", en: "Website design", vi: "Thiết kế website", ar: "تصميم المواقع", ru: "Разработка сайтов" }, desc: { fr: "Des sites rapides, élégants et conçus autour de vos objectifs.", en: "Fast, considered websites built around your goals.", vi: "Website nhanh, tinh tế và được xây dựng theo mục tiêu của bạn.", ar: "مواقع سريعة وأنيقة مصممة وفق أهدافك.", ru: "Быстрые и продуманные сайты под ваши задачи." }, photo: XR_PHOTOS.websites, icon: Monitor, href: "/services/websites" },
  { id: "branding", title: { fr: "Branding & identité", en: "Branding & identity", vi: "Thương hiệu & nhận diện", ar: "العلامة والهوية", ru: "Брендинг и айдентика" }, desc: { fr: "Une identité cohérente, reconnaissable et adaptée à votre marché.", en: "A coherent, distinctive identity shaped for your market.", vi: "Nhận diện đồng bộ, khác biệt và phù hợp thị trường.", ar: "هوية متناسقة ومميزة تناسب سوقك.", ru: "Целостная и узнаваемая айдентика для вашего рынка." }, photo: XR_PHOTOS.branding, icon: Sparkles, href: "/services/branding" },
  { id: "seo", title: { fr: "Référencement SEO", en: "SEO", vi: "Tối ưu SEO", ar: "تحسين محركات البحث", ru: "SEO-продвижение" }, desc: { fr: "Une visibilité organique construite avec méthode et transparence.", en: "Organic visibility built with method and transparency.", vi: "Tăng khả năng hiển thị tự nhiên một cách bài bản và minh bạch.", ar: "ظهور عضوي يُبنى بمنهجية وشفافية.", ru: "Органическая видимость на основе системной работы." }, photo: XR_PHOTOS.seo, icon: Search, href: "/services/seo" },
  { id: "maps", title: { fr: "Google Maps", en: "Google Maps", vi: "Google Maps", ar: "خرائط Google", ru: "Google Maps" }, desc: { fr: "Travaillez votre présence locale et la qualité de votre fiche.", en: "Strengthen your local presence and business profile.", vi: "Cải thiện sự hiện diện địa phương và hồ sơ doanh nghiệp.", ar: "عزز حضورك المحلي وجودة ملف نشاطك.", ru: "Развивайте локальное присутствие и профиль компании." }, photo: XR_PHOTOS.maps, icon: MapPin, href: "/services/maps" },
  { id: "social", title: { fr: "Social Media", en: "Social media", vi: "Mạng xã hội", ar: "وسائل التواصل", ru: "Социальные сети" }, desc: { fr: "Une présence éditoriale régulière, cohérente et utile à votre marque.", en: "A consistent, purposeful social presence for your brand.", vi: "Hiện diện mạng xã hội nhất quán và có định hướng.", ar: "حضور اجتماعي منتظم ومتناسق يخدم علامتك.", ru: "Последовательное и содержательное присутствие бренда в соцсетях." }, photo: XR_PHOTOS.social, icon: Video, href: "/services/social" },
  { id: "webcare", title: { fr: "WebCare", en: "WebCare", vi: "WebCare", ar: "العناية بالموقع", ru: "WebCare" }, desc: { fr: "Maintenance, mises à jour et suivi pour garder votre site fiable.", en: "Maintenance, updates and care to keep your website reliable.", vi: "Bảo trì, cập nhật và theo dõi để website luôn ổn định.", ar: "صيانة وتحديث ومتابعة للحفاظ على موثوقية موقعك.", ru: "Поддержка, обновления и контроль надёжности сайта." }, photo: XR_PHOTOS.maintenance, icon: ShieldCheck, href: "/services/webcare" },
  { id: "robotics", title: { fr: "IA & robotique", en: "AI & robotics", vi: "AI & robot", ar: "الذكاء الاصطناعي والروبوتات", ru: "ИИ и робототехника" }, desc: { fr: "Automatisez des tâches et explorez des usages concrets de l’IA et de la robotique.", en: "Automate tasks and explore practical AI and robotics use cases.", vi: "Tự động hóa công việc và ứng dụng AI, robot vào thực tế.", ar: "أتمت المهام واستكشف تطبيقات عملية للذكاء الاصطناعي والروبوتات.", ru: "Автоматизируйте задачи и внедряйте практические решения на базе ИИ и робототехники." }, photo: XR_PHOTOS.robotics, icon: Bot, href: "/services/robotique" },
] as const;

const SECTION: Record<Lang, { eyebrow: string; title: string; accent: string; intro: string; all: string }> = {
  fr: { eyebrow: "NOS EXPERTISES", title: "Les bons leviers,", accent: "orchestrés ensemble.", intro: "Une vision globale, des expertises complémentaires et un accompagnement adapté à la réalité de votre entreprise.", all: "Voir toutes les expertises" },
  en: { eyebrow: "OUR EXPERTISE", title: "The right levers,", accent: "working together.", intro: "A broader view, complementary expertise and support shaped around the reality of your business.", all: "Explore all expertise" },
  vi: { eyebrow: "CHUYÊN MÔN", title: "Đúng giải pháp,", accent: "kết hợp đồng bộ.", intro: "Tầm nhìn tổng thể, chuyên môn bổ trợ và sự đồng hành phù hợp với thực tế doanh nghiệp.", all: "Xem tất cả chuyên môn" },
  ar: { eyebrow: "خبراتنا", title: "الأدوات المناسبة،", accent: "ضمن رؤية متكاملة.", intro: "رؤية شاملة وخبرات متكاملة ومرافقة تناسب واقع أعمالك.", all: "اكتشف جميع الخبرات" },
  ru: { eyebrow: "НАШИ КОМПЕТЕНЦИИ", title: "Нужные инструменты,", accent: "в единой системе.", intro: "Целостный взгляд, взаимодополняющая экспертиза и поддержка с учётом задач вашего бизнеса.", all: "Все компетенции" },
};

export function ExpertisesShowcase() {
  const { lang } = useLang();
  const section = SECTION[lang] ?? SECTION.fr;
  const locale = lang as Lang;

  return (
    <section id="services" className="relative bg-[#F7F4EE] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-[#211F1A]/15 pb-9 lg:flex-row lg:items-end lg:justify-between sm:pb-12">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A73]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B7051]">{section.eyebrow}</span>
            </div>
            <h2 className="text-[clamp(2.3rem,5vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#1B1A17] [text-wrap:balance]">
              {section.title} <span className="font-serif italic font-normal text-[#A88A65]">{section.accent}</span>
            </h2>
          </div>
          <div className="flex max-w-md flex-col gap-4">
            <p className="text-sm leading-7 text-[#625E56] sm:text-base">{section.intro}</p>
            <Link to="/services" className="group inline-flex items-center gap-2 self-start border-b border-[#9E805B] pb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#292720] transition hover:text-[#9E805B]">
              {section.all}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3">
          {EXPERTISES.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} to={item.href} className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[1.35rem] border border-[#211F1A]/10 bg-[#EAE5DC] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(34,30,22,.3)] sm:min-h-[390px]">
                <div className="absolute inset-0">
                  <img src={item.photo} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14130F]/90 via-[#14130F]/18 to-transparent" />
                </div>
                <div className="relative z-10 flex flex-1 flex-col justify-between p-6 text-white sm:p-7">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-medium tracking-[0.22em] text-white/75">0{index + 1} / 07</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/45 bg-black/10 backdrop-blur-sm"><Icon className="h-4 w-4" /></span>
                  </div>
                  <div>
                    <h3 className="max-w-sm text-2xl font-medium tracking-[-0.035em] sm:text-[1.8rem]">{item.title[locale] ?? item.title.fr}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">{item.desc[locale] ?? item.desc.fr}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#E5CBA4]">Découvrir <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
