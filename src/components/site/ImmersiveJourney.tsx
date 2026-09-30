import { ArrowUpRight, BarChart3, Globe2, MapPin, Palette, Share2, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Parallax } from "./primitives";
import { useLang } from "@/lib/i18n";

const cards = [
  { icon: Globe2, code: "01", title: { fr: "Créer", en: "Create", vi: "Tạo", ar: "إنشاء", ru: "Создать" }, text: { fr: "Site web, UX, UI et contenus structurés pour présenter votre activité avec clarté.", en: "Website, UX, UI and structured content to present your business clearly.", vi: "Website, UX, UI và nội dung có cấu trúc để trình bày doanh nghiệp rõ ràng.", ar: "موقع وUX وUI ومحتوى منظم لتقديم نشاطك بوضوح.", ru: "Сайт, UX, UI и структурированный контент для ясной презентации бизнеса." }, label: { fr: "WEB", en: "WEB", vi: "WEB", ar: "WEB", ru: "WEB" } },
  { icon: Palette, code: "02", title: { fr: "Positionner", en: "Position", vi: "Định vị", ar: "تموضع", ru: "Позиционировать" }, text: { fr: "Identité, direction artistique et système de marque cohérents sur tous vos points de contact.", en: "Identity, art direction and a coherent brand system across every touchpoint.", vi: "Nhận diện, định hướng nghệ thuật và hệ thống thương hiệu nhất quán.", ar: "هوية وتوجيه فني ونظام علامة متسق عبر جميع نقاط الاتصال.", ru: "Айдентика, арт-дирекшн и цельная бренд-система во всех точках контакта." }, label: { fr: "BRAND", en: "BRAND", vi: "BRAND", ar: "BRAND", ru: "BRAND" } },
  { icon: BarChart3, code: "03", title: { fr: "Être trouvé", en: "Get found", vi: "Được tìm thấy", ar: "كن مرئيًا", ru: "Быть найденным" }, text: { fr: "SEO et visibilité locale pour capter les recherches qui correspondent réellement à votre offre.", en: "SEO and local visibility to capture searches that actually match your offer.", vi: "SEO và hiển thị địa phương để tiếp cận đúng nhu cầu tìm kiếm.", ar: "SEO وظهور محلي لالتقاط عمليات البحث المرتبطة بعرضك.", ru: "SEO и локальная видимость для целевых поисковых запросов." }, label: { fr: "SEARCH", en: "SEARCH", vi: "SEARCH", ar: "SEARCH", ru: "SEARCH" } },
  { icon: MapPin, code: "04", title: { fr: "Convertir localement", en: "Convert locally", vi: "Chuyển đổi tại địa phương", ar: "تحويل محلي", ru: "Конвертировать локально" }, text: { fr: "Google Business Profile, avis et présence locale structurés autour de votre zone de chalandise.", en: "Google Business Profile, reviews and local presence built around your service area.", vi: "Google Business Profile, đánh giá và hiện diện địa phương theo khu vực phục vụ.", ar: "Google Business Profile والمراجعات والحضور المحلي وفق منطقتك.", ru: "Google Business Profile, отзывы и локальное присутствие вокруг вашей зоны." }, label: { fr: "LOCAL", en: "LOCAL", vi: "LOCAL", ar: "LOCAL", ru: "LOCAL" } },
  { icon: Share2, code: "05", title: { fr: "Amplifier", en: "Amplify", vi: "Khuếch đại", ar: "توسيع", ru: "Усилить" }, text: { fr: "Social media et contenus conçus pour garder votre marque active, lisible et désirable.", en: "Social media and content designed to keep your brand active, clear and desirable.", vi: "Mạng xã hội và nội dung giúp thương hiệu luôn hiện diện và hấp dẫn.", ar: "محتوى وسوشيال ميديا للحفاظ على حضور العلامة ووضوحها وجاذبيتها.", ru: "Соцсети и контент для активного, понятного и привлекательного бренда." }, label: { fr: "SOCIAL", en: "SOCIAL", vi: "SOCIAL", ar: "SOCIAL", ru: "SOCIAL" } },
  { icon: ShieldCheck, code: "06", title: { fr: "Maintenir", en: "Maintain", vi: "Bảo trì", ar: "صيانة", ru: "Поддерживать" }, text: { fr: "Webcare, sécurité, mises à jour et surveillance pour garder votre site propre et opérationnel.", en: "Webcare, security, updates and monitoring to keep your website clean and operational.", vi: "Webcare, bảo mật, cập nhật và giám sát để website luôn ổn định.", ar: "Webcare وأمان وتحديثات ومراقبة للحفاظ على الموقع مستقراً.", ru: "Webcare, безопасность, обновления и мониторинг для стабильной работы сайта." }, label: { fr: "WEBCARE", en: "WEBCARE", vi: "WEBCARE", ar: "WEBCARE", ru: "WEBCARE" } },
];

export function ImmersiveJourney() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-20 sm:py-28 lg:py-36" aria-label="Les expertises XRAGENCY">
      <div aria-hidden className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(20,24,32,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(20,24,32,.045)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <Parallax speed={-0.02}>
            <span className="label-mono text-[9px] tracking-[.3em] text-primary">XRAGENCY · 06 EXPERTISES</span>
            <h2 className="display-serif mt-5 max-w-2xl text-[clamp(3rem,6.5vw,6.5rem)] leading-[.86] tracking-[-.04em] text-foreground">Une architecture digitale<br /><em className="text-primary">pensée pour convertir.</em></h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Six expertises, une seule direction : construire une présence claire, crédible et exploitable commercialement.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/#quote" className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] text-primary-foreground transition hover:-translate-y-1">Demander un devis <ArrowUpRight className="h-4 w-4" /></Link>
              <Link to="/work" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 label-mono text-[8px] tracking-[.16em] text-muted-foreground transition hover:border-primary/40 hover:text-foreground">Voir les réalisations</Link>
            </div>
          </Parallax>
          <div className="grid gap-3 sm:grid-cols-2">
            {cards.map((card, index) => { const Icon = card.icon; return (
              <Parallax key={card.code} speed={index % 2 === 0 ? -0.012 : 0.012}>
                <article className="group relative min-h-[235px] overflow-hidden rounded-[1.6rem] border border-border bg-card p-6 shadow-[0_24px_70px_-55px_rgba(0,0,0,.4)] transition duration-500 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl">
                  <div className="flex items-center justify-between"><span className="label-mono text-[8px] tracking-[.2em] text-muted-foreground">{card.code} · {t(card.label)}</span><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary transition group-hover:scale-110 group-hover:border-primary/40"><Icon className="h-4 w-4" /></span></div>
                  <div className="mt-10"><h3 className="display-serif text-3xl leading-[.95] text-foreground">{t(card.title)}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{t(card.text)}</p></div>
                  <div aria-hidden className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full border border-primary/10 transition duration-700 group-hover:scale-125" />
                </article>
              </Parallax>
            ); })}
          </div>
        </div>
      </div>
    </section>
  );
}
