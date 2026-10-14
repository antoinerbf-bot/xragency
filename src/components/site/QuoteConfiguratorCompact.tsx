import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Bot, Check, ChevronRight, MessageCircle, RotateCcw } from "lucide-react";
import { Parallax, Reveal } from "./primitives";
import { useLang, localizePriceText, type Lang } from "@/lib/i18n";

type Choice = { id: string; label: string; detail: string };
type Sector = Choice & { goals: string[] };
type Proposal = { id: string; label: string; detail: string; price: number; period: "once" | "month"; custom?: boolean };
const SECTORS: Sector[] = [
  { id: "restaurant", label: "Restaurant · café · bar", detail: "Restaurants, cafés, rooftops, bars et concepts food", goals: ["Augmenter les réservations", "Être trouvé localement", "Monter en gamme"] },
  { id: "hospitality", label: "Hôtel · villa · resort", detail: "Hôtels, resorts, villas, maisons d'hôtes et hospitality", goals: ["Augmenter les réservations", "Attirer une clientèle internationale", "Améliorer la visibilité"] },
  { id: "realestate", label: "Immobilier · location", detail: "Agences, promoteurs, biens premium et location", goals: ["Générer plus de demandes", "Valoriser les biens", "Attirer une clientèle premium"] },
  { id: "automotive", label: "Automobile · mobilité", detail: "Concessions, garages premium, location et mobilité", goals: ["Générer des demandes qualifiées", "Valoriser les véhicules", "Développer la visibilité locale"] },
  { id: "fashion", label: "Mode · accessoires", detail: "Mode, prêt-à-porter, maroquinerie et accessoires", goals: ["Renforcer l'image de marque", "Vendre davantage", "Développer une audience internationale"] },
  { id: "jewelry", label: "Joaillerie · horlogerie", detail: "Bijoux, montres, maisons et pièces d'exception", goals: ["Renforcer le positionnement premium", "Générer des demandes", "Créer une présence internationale"] },
  { id: "beauty", label: "Beauté · esthétique · spa", detail: "Instituts, spas, cliniques esthétiques et bien-être", goals: ["Générer des rendez-vous", "Être trouvé localement", "Professionnaliser l'image"] },
  { id: "health", label: "Santé · médical", detail: "Cliniques, cabinets, spécialistes et santé privée", goals: ["Générer des prises de rendez-vous", "Gagner en confiance", "Être visible sur Google"] },
  { id: "architecture", label: "Architecture · intérieur", detail: "Architectes, architecture intérieure et design d'espace", goals: ["Montrer les réalisations", "Attirer des projets premium", "Développer la visibilité"] },
  { id: "construction", label: "Construction · rénovation", detail: "Bâtiment, rénovation, artisans et entreprises techniques", goals: ["Générer des demandes", "Présenter le savoir-faire", "Être trouvé localement"] },
  { id: "legal", label: "Avocat · droit · expertise", detail: "Cabinets juridiques, droit des affaires et professions réglementées", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Être visible sur Google"] },
  { id: "finance", label: "Finance · patrimoine · assurance", detail: "Finance, gestion de patrimoine, assurance et conseil", goals: ["Gagner en confiance", "Générer des leads", "Structurer l'image de marque"] },
  { id: "commerce", label: "Commerce · e-commerce", detail: "Boutiques, marques, retail, catalogues et vente en ligne", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "tourism", label: "Voyage · tourisme · expériences", detail: "Agences, excursions, activités, loisirs et expériences", goals: ["Augmenter les réservations", "Être trouvé par les touristes", "Convertir davantage"] },
  { id: "agency", label: "Agence · studio · freelance", detail: "Créatifs, marketing, tech, conseil et production", goals: ["Présenter l'expertise", "Générer des leads", "Monter en gamme"] },
  { id: "other", label: "Autre activité", detail: "Votre activité ne figure pas ici ? XR Quote Studio s'adapte.", goals: ["Développer mon activité", "Professionnaliser mon image", "Construire une présence forte"] },
];
const SERVICES: Choice[] = [
  { id: "website", label: "Site web", detail: "Vitrine, Business, e-commerce ou réservation" }, { id: "branding", label: "Branding", detail: "Logo, identité, direction artistique et univers" }, { id: "seo", label: "SEO", detail: "Positionnement organique et acquisition Google" }, { id: "maps", label: "Google Maps", detail: "Fiche locale, visibilité et optimisation locale" }, { id: "ads", label: "Google Ads", detail: "Campagnes sponsorisées et acquisition payante" }, { id: "social", label: "Social Media", detail: "Stratégie, contenus et animation des réseaux" }, { id: "content", label: "Contenu · photo · vidéo", detail: "Direction de contenu, visuels et formats de campagne" }, { id: "conversion", label: "Conversion & parcours", detail: "UX, landing pages, CTA et optimisation commerciale" }, { id: "maintenance", label: "WebCare", detail: "Corrections, évolutions et suivi du site" }, { id: "robotics", label: "Robotique & IA", detail: "Robots de service, location, achat et intégration" },
];
const SITUATIONS: Choice[] = [
  { id: "none", label: "Pas encore de site", detail: "Créer un socle digital propre dès le départ" }, { id: "existing", label: "J'ai déjà un site", detail: "Le conserver et l'améliorer" }, { id: "redesign", label: "Mon site doit être refait", detail: "Design, structure, mobile ou conversion à revoir" }, { id: "outdated", label: "Il fonctionne mais il est daté", detail: "Moderniser sans repartir de zéro" }, { id: "invisible", label: "J'ai peu de visibilité", detail: "Le problème est surtout l'acquisition" }, { id: "selling", label: "Je vends / prends des réservations", detail: "Catalogue, paiement, réservation ou rendez-vous" }, { id: "international", label: "Je vise l'international", detail: "Langues, image premium et acquisition internationale" }, { id: "launch", label: "Je lance une nouvelle activité", detail: "Construire l'offre et la présence dès le départ" },
];
const BUDGETS: Choice[] = [
  { id: "under500", label: "Moins de 500 €", detail: "Un levier prioritaire" }, { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence solide" }, { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif complet" }, { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une stratégie structurée" }, { id: "5000_plus", label: "5 000 € +", detail: "Un projet premium sur mesure" },
];
const DISCOVERY: Choice[] = [
  { id: "google", label: "Google / Maps", detail: "Recherche, SEO ou visibilité locale" }, { id: "social", label: "Instagram / Facebook / TikTok", detail: "Réseaux sociaux et recommandations" }, { id: "referral", label: "Bouche-à-oreille", detail: "Recommandations et réseau" }, { id: "mixed", label: "Un peu de tout", detail: "Acquisition déjà diversifiée" },
];

const CHOICE_COPY: Record<string, Partial<Record<Lang, { label: string; detail: string }>>> = {
  restaurant: { en:{label:"Restaurant · café · bar",detail:"Restaurants, cafés, rooftops, bars and food concepts"},vi:{label:"Nhà hàng · quán cà phê · bar",detail:"Nhà hàng, quán cà phê, rooftop, bar và mô hình ẩm thực"},ar:{label:"مطعم · مقهى · بار",detail:"مطاعم ومقاهٍ وروفتوب وبارات ومشاريع طعام"},ru:{label:"Ресторан · кафе · бар",detail:"Рестораны, кафе, руфтопы, бары и гастропроекты"} },
  hospitality: { en:{label:"Hotel · villa · resort",detail:"Hotels, resorts, villas, guesthouses and hospitality"},vi:{label:"Khách sạn · villa · resort",detail:"Khách sạn, resort, villa, nhà nghỉ và dịch vụ lưu trú"},ar:{label:"فندق · فيلا · منتجع",detail:"فنادق ومنتجعات وفلل وبيوت ضيافة وخدمات ضيافة"},ru:{label:"Отель · вилла · курорт",detail:"Отели, курорты, виллы, гостевые дома и индустрия гостеприимства"} },
  realestate: { en:{label:"Real estate · rentals",detail:"Agencies, developers, premium properties and rentals"},vi:{label:"Bất động sản · cho thuê",detail:"Đại lý, chủ đầu tư, bất động sản cao cấp và cho thuê"},ar:{label:"العقارات · التأجير",detail:"وكالات ومطورون وعقارات مميزة وخدمات تأجير"},ru:{label:"Недвижимость · аренда",detail:"Агентства, застройщики, премиальные объекты и аренда"} },
  automotive: { en:{label:"Automotive · mobility",detail:"Dealerships, premium garages, rental and mobility"},vi:{label:"Ô tô · di chuyển",detail:"Đại lý xe, garage cao cấp, cho thuê và dịch vụ di chuyển"},ar:{label:"السيارات · التنقل",detail:"معارض سيارات وورش مميزة وتأجير وخدمات تنقل"},ru:{label:"Авто · мобильность",detail:"Дилеры, премиальные автосервисы, аренда и мобильность"} },
  fashion: { en:{label:"Fashion · accessories",detail:"Fashion, ready-to-wear, leather goods and accessories"},vi:{label:"Thời trang · phụ kiện",detail:"Thời trang, may mặc, đồ da và phụ kiện"},ar:{label:"الأزياء · الإكسسوارات",detail:"الأزياء والملابس الجاهزة والمنتجات الجلدية والإكسسوارات"},ru:{label:"Мода · аксессуары",detail:"Одежда, готовые коллекции, изделия из кожи и аксессуары"} },
  jewelry: { en:{label:"Jewellery · watches",detail:"Jewellery, watches, maisons and exceptional pieces"},vi:{label:"Trang sức · đồng hồ",detail:"Trang sức, đồng hồ, thương hiệu và sản phẩm đặc biệt"},ar:{label:"المجوهرات · الساعات",detail:"المجوهرات والساعات والعلامات الفاخرة والقطع الاستثنائية"},ru:{label:"Ювелирные изделия · часы",detail:"Украшения, часы, ювелирные дома и эксклюзивные изделия"} },
  beauty: { en:{label:"Beauty · aesthetics · spa",detail:"Salons, spas, aesthetic clinics and wellness"},vi:{label:"Làm đẹp · thẩm mỹ · spa",detail:"Salon, spa, phòng khám thẩm mỹ và chăm sóc sức khỏe"},ar:{label:"الجمال · التجميل · السبا",detail:"صالونات وسبا وعيادات تجميل وعافية"},ru:{label:"Красота · эстетика · спа",detail:"Салоны, спа, косметологические клиники и wellness"} },
  health: { en:{label:"Healthcare · medical",detail:"Clinics, practices, specialists and private healthcare"},vi:{label:"Y tế · chăm sóc sức khỏe",detail:"Phòng khám, cơ sở y tế, chuyên gia và dịch vụ tư nhân"},ar:{label:"الصحة · الطب",detail:"عيادات وممارسات طبية ومتخصصون ورعاية صحية خاصة"},ru:{label:"Здоровье · медицина",detail:"Клиники, кабинеты, специалисты и частная медицина"} },
  architecture: { en:{label:"Architecture · interiors",detail:"Architects, interior architecture and spatial design"},vi:{label:"Kiến trúc · nội thất",detail:"Kiến trúc sư, kiến trúc nội thất và thiết kế không gian"},ar:{label:"العمارة · التصميم الداخلي",detail:"المهندسون المعماريون والتصميم الداخلي وتصميم المساحات"},ru:{label:"Архитектура · интерьеры",detail:"Архитекторы, интерьерная архитектура и дизайн пространства"} },
  construction: { en:{label:"Construction · renovation",detail:"Building, renovation, craftspeople and technical firms"},vi:{label:"Xây dựng · cải tạo",detail:"Xây dựng, cải tạo, thợ thủ công và doanh nghiệp kỹ thuật"},ar:{label:"البناء · التجديد",detail:"البناء والتجديد والحرفيون والشركات التقنية"},ru:{label:"Строительство · ремонт",detail:"Строительство, ремонт, мастера и технические компании"} },
  legal: { en:{label:"Law · legal expertise",detail:"Law firms, business law and regulated professions"},vi:{label:"Luật · tư vấn pháp lý",detail:"Văn phòng luật, luật doanh nghiệp và ngành nghề có quy định"},ar:{label:"القانون · الاستشارات القانونية",detail:"مكاتب المحاماة وقانون الأعمال والمهن المنظمة"},ru:{label:"Право · юридические услуги",detail:"Юридические фирмы, бизнес-право и регулируемые профессии"} },
  finance: { en:{label:"Finance · wealth · insurance",detail:"Finance, wealth management, insurance and consulting"},vi:{label:"Tài chính · tài sản · bảo hiểm",detail:"Tài chính, quản lý tài sản, bảo hiểm và tư vấn"},ar:{label:"التمويل · الثروات · التأمين",detail:"التمويل وإدارة الثروات والتأمين والاستشارات"},ru:{label:"Финансы · капитал · страхование",detail:"Финансы, управление капиталом, страхование и консалтинг"} },
  commerce: { en:{label:"Retail · e-commerce",detail:"Shops, brands, retail, catalogues and online sales"},vi:{label:"Thương mại · thương mại điện tử",detail:"Cửa hàng, thương hiệu, bán lẻ, danh mục và bán hàng trực tuyến"},ar:{label:"التجارة · التجارة الإلكترونية",detail:"المتاجر والعلامات التجارية والبيع بالتجزئة والكتالوجات والبيع عبر الإنترنت"},ru:{label:"Торговля · e-commerce",detail:"Магазины, бренды, розница, каталоги и онлайн-продажи"} },
  tourism: { en:{label:"Travel · tourism · experiences",detail:"Agencies, excursions, activities, leisure and experiences"},vi:{label:"Du lịch · trải nghiệm",detail:"Đại lý, tour, hoạt động, giải trí và trải nghiệm"},ar:{label:"السفر · السياحة · التجارب",detail:"وكالات ورحلات وأنشطة وترفيه وتجارب"},ru:{label:"Путешествия · туризм · впечатления",detail:"Агентства, экскурсии, активности, отдых и впечатления"} },
  agency: { en:{label:"Agency · studio · freelance",detail:"Creative, marketing, tech, consulting and production"},vi:{label:"Agency · studio · freelancer",detail:"Sáng tạo, marketing, công nghệ, tư vấn và sản xuất"},ar:{label:"وكالة · استوديو · مستقل",detail:"الإبداع والتسويق والتقنية والاستشارات والإنتاج"},ru:{label:"Агентство · студия · фриланс",detail:"Креатив, маркетинг, технологии, консалтинг и продакшн"} },
  other: { en:{label:"Other business",detail:"Your activity isn't listed? XR Quote Studio adapts to you."},vi:{label:"Lĩnh vực khác",detail:"Chưa thấy lĩnh vực của bạn? XR Quote Studio sẽ điều chỉnh phù hợp."},ar:{label:"نشاط آخر",detail:"لم تجد نشاطك هنا؟ يتكيف XR Quote Studio مع احتياجاتك."},ru:{label:"Другая деятельность",detail:"Нет вашего направления в списке? XR Quote Studio адаптируется."} },
  website: { en:{label:"Website",detail:"Showcase, business, e-commerce or bookings"},vi:{label:"Website",detail:"Website giới thiệu, doanh nghiệp, thương mại điện tử hoặc đặt chỗ"},ar:{label:"موقع إلكتروني",detail:"موقع تعريفي أو تجاري أو متجر إلكتروني أو حجوزات"},ru:{label:"Сайт",detail:"Сайт-визитка, бизнес-сайт, интернет-магазин или бронирование"} },
  branding: { en:{label:"Branding",detail:"Logo, identity, art direction and brand universe"},vi:{label:"Thương hiệu",detail:"Logo, nhận diện, định hướng nghệ thuật và hình ảnh thương hiệu"},ar:{label:"الهوية التجارية",detail:"الشعار والهوية والتوجيه الفني وعالم العلامة التجارية"},ru:{label:"Брендинг",detail:"Логотип, айдентика, арт-дирекшн и образ бренда"} },
  seo: { en:{label:"SEO",detail:"Organic positioning and Google acquisition"},vi:{label:"SEO",detail:"Thứ hạng tự nhiên và thu hút khách từ Google"},ar:{label:"تحسين محركات البحث",detail:"الظهور العضوي واكتساب العملاء عبر Google"},ru:{label:"SEO",detail:"Органическое продвижение и привлечение клиентов из Google"} },
  maps: { en:{label:"Google Maps",detail:"Local profile, visibility and optimisation"},vi:{label:"Google Maps",detail:"Hồ sơ địa phương, hiển thị và tối ưu hóa"},ar:{label:"خرائط Google",detail:"الملف المحلي والظهور والتحسين"},ru:{label:"Google Maps",detail:"Локальная карточка, видимость и оптимизация"} },
  ads: { en:{label:"Google Ads",detail:"Paid campaigns and acquisition"},vi:{label:"Google Ads",detail:"Chiến dịch quảng cáo và thu hút khách hàng trả phí"},ar:{label:"إعلانات Google",detail:"الحملات المدفوعة واكتساب العملاء"},ru:{label:"Google Ads",detail:"Платные кампании и привлечение клиентов"} },
  social: { en:{label:"Social Media",detail:"Strategy, content and social channel management"},vi:{label:"Mạng xã hội",detail:"Chiến lược, nội dung và quản lý các kênh xã hội"},ar:{label:"وسائل التواصل الاجتماعي",detail:"الاستراتيجية والمحتوى وإدارة القنوات الاجتماعية"},ru:{label:"Социальные сети",detail:"Стратегия, контент и ведение социальных каналов"} },
  content: { en:{label:"Content · photo · video",detail:"Content direction, visuals and campaign formats"},vi:{label:"Nội dung · ảnh · video",detail:"Định hướng nội dung, hình ảnh và định dạng chiến dịch"},ar:{label:"المحتوى · الصور · الفيديو",detail:"توجيه المحتوى والمرئيات وصيغ الحملات"},ru:{label:"Контент · фото · видео",detail:"Контент-стратегия, визуалы и форматы кампаний"} },
  conversion: { en:{label:"Conversion & journey",detail:"UX, landing pages, calls to action and sales optimisation"},vi:{label:"Chuyển đổi & hành trình",detail:"UX, landing page, CTA và tối ưu bán hàng"},ar:{label:"التحويل ورحلة العميل",detail:"تجربة المستخدم وصفحات الهبوط والدعوات إلى الإجراء وتحسين المبيعات"},ru:{label:"Конверсия и путь клиента",detail:"UX, посадочные страницы, CTA и оптимизация продаж"} },
  maintenance: { en:{label:"WebCare",detail:"Fixes, updates and website monitoring"},vi:{label:"WebCare",detail:"Sửa lỗi, cập nhật và theo dõi website"},ar:{label:"WebCare",detail:"الإصلاحات والتحديثات ومراقبة الموقع"},ru:{label:"WebCare",detail:"Исправления, обновления и мониторинг сайта"} },
  robotics: { en:{label:"Robotics & AI",detail:"Service robots, leasing, purchase and integration"},vi:{label:"Robot & AI",detail:"Robot dịch vụ, thuê, mua và tích hợp"},ar:{label:"الروبوتات والذكاء الاصطناعي",detail:"روبوتات الخدمة والتأجير والشراء والتكامل"},ru:{label:"Робототехника и ИИ",detail:"Сервисные роботы, аренда, покупка и интеграция"} },
  none: { en:{label:"No website yet",detail:"Build a strong digital foundation from day one"},vi:{label:"Chưa có website",detail:"Xây dựng nền tảng số bài bản ngay từ đầu"},ar:{label:"لا أملك موقعًا بعد",detail:"إنشاء أساس رقمي متين منذ البداية"},ru:{label:"Сайта пока нет",detail:"Создать прочную цифровую основу с самого начала"} },
  existing: { en:{label:"I already have a website",detail:"Keep it and improve it"},vi:{label:"Đã có website",detail:"Giữ lại và cải thiện website hiện tại"},ar:{label:"لدي موقع بالفعل",detail:"الاحتفاظ به وتحسينه"},ru:{label:"Сайт уже есть",detail:"Сохранить его и улучшить"} },
  redesign: { en:{label:"My website needs a redesign",detail:"Review design, structure, mobile or conversion"},vi:{label:"Cần thiết kế lại website",detail:"Cải thiện thiết kế, cấu trúc, di động hoặc chuyển đổi"},ar:{label:"موقعي يحتاج إلى إعادة تصميم",detail:"مراجعة التصميم والبنية وتجربة الهاتف والتحويل"},ru:{label:"Сайту нужен редизайн",detail:"Обновить дизайн, структуру, мобильную версию или конверсию"} },
  outdated: { en:{label:"It works, but feels outdated",detail:"Modernise without starting from scratch"},vi:{label:"Website hoạt động nhưng lỗi thời",detail:"Hiện đại hóa mà không cần làm lại từ đầu"},ar:{label:"يعمل الموقع لكنه قديم",detail:"تحديثه دون البدء من الصفر"},ru:{label:"Сайт работает, но устарел",detail:"Обновить без полной разработки с нуля"} },
  invisible: { en:{label:"Low visibility",detail:"The main issue is customer acquisition"},vi:{label:"Ít người biết đến",detail:"Vấn đề chính là thu hút khách hàng"},ar:{label:"ظهور ضعيف",detail:"المشكلة الأساسية هي اكتساب العملاء"},ru:{label:"Низкая видимость",detail:"Главная задача — привлечение клиентов"} },
  selling: { en:{label:"I sell products or take bookings",detail:"Catalogue, payments, bookings or appointments"},vi:{label:"Bán hàng hoặc nhận đặt chỗ",detail:"Danh mục, thanh toán, đặt chỗ hoặc lịch hẹn"},ar:{label:"أبيع المنتجات أو أستقبل الحجوزات",detail:"كتالوج ودفع وحجوزات ومواعيد"},ru:{label:"Продажи или бронирования",detail:"Каталог, оплата, бронирование или запись"} },
  international: { en:{label:"I target international markets",detail:"Languages, premium image and international acquisition"},vi:{label:"Hướng đến thị trường quốc tế",detail:"Ngôn ngữ, hình ảnh cao cấp và thu hút khách quốc tế"},ar:{label:"أستهدف الأسواق الدولية",detail:"اللغات والصورة المتميزة واكتساب العملاء دوليًا"},ru:{label:"Ориентируюсь на международный рынок",detail:"Языки, премиальный образ и международное привлечение"} },
  launch: { en:{label:"I'm launching a new business",detail:"Build the offer and presence from the start"},vi:{label:"Ra mắt hoạt động mới",detail:"Xây dựng dịch vụ và sự hiện diện ngay từ đầu"},ar:{label:"أطلق نشاطًا جديدًا",detail:"بناء العرض والحضور منذ البداية"},ru:{label:"Запускаю новый бизнес",detail:"Сформировать предложение и присутствие с нуля"} },
  under500: { en:{label:"Under €500",detail:"One priority lever"},vi:{label:"Dưới 500 €",detail:"Tập trung vào một đòn bẩy ưu tiên"},ar:{label:"أقل من 500 €",detail:"رافعة واحدة ذات أولوية"},ru:{label:"Менее 500 €",detail:"Один приоритетный инструмент"} },
  "500_1000": { en:{label:"€500 – €1,000",detail:"A solid digital presence"},vi:{label:"500 – 1.000 €",detail:"Xây dựng sự hiện diện vững chắc"},ar:{label:"500 – 1,000 €",detail:"حضور رقمي متين"},ru:{label:"500 – 1 000 €",detail:"Надёжное цифровое присутствие"} },
  "1000_2500": { en:{label:"€1,000 – €2,500",detail:"A complete setup"},vi:{label:"1.000 – 2.500 €",detail:"Một hệ thống hoàn chỉnh"},ar:{label:"1,000 – 2,500 €",detail:"منظومة متكاملة"},ru:{label:"1 000 – 2 500 €",detail:"Комплексное решение"} },
  "2500_5000": { en:{label:"€2,500 – €5,000",detail:"A structured strategy"},vi:{label:"2.500 – 5.000 €",detail:"Chiến lược có cấu trúc"},ar:{label:"2,500 – 5,000 €",detail:"استراتيجية منظمة"},ru:{label:"2 500 – 5 000 €",detail:"Структурированная стратегия"} },
  "5000_plus": { en:{label:"€5,000+",detail:"A premium tailored project"},vi:{label:"Trên 5.000 €",detail:"Dự án cao cấp theo yêu cầu"},ar:{label:"أكثر من 5,000 €",detail:"مشروع متميز حسب الطلب"},ru:{label:"Более 5 000 €",detail:"Премиальный индивидуальный проект"} },
  google: { en:{label:"Google / Maps",detail:"Search, SEO or local visibility"},vi:{label:"Google / Maps",detail:"Tìm kiếm, SEO hoặc hiển thị địa phương"},ar:{label:"Google / الخرائط",detail:"البحث وتحسين الظهور أو الظهور المحلي"},ru:{label:"Google / Карты",detail:"Поиск, SEO или локальная видимость"} },
  referral: { en:{label:"Word of mouth",detail:"Recommendations and network"},vi:{label:"Truyền miệng",detail:"Giới thiệu và mạng lưới quan hệ"},ar:{label:"التوصيات الشفهية",detail:"التوصيات وشبكة العلاقات"},ru:{label:"Рекомендации",detail:"Советы клиентов и деловые связи"} },
  mixed: { en:{label:"A bit of everything",detail:"Acquisition is already diversified"},vi:{label:"Nhiều kênh khác nhau",detail:"Đã đa dạng hóa kênh thu hút khách"},ar:{label:"مزيج من القنوات",detail:"قنوات اكتساب العملاء متنوعة بالفعل"},ru:{label:"Понемногу из разных каналов",detail:"Каналы привлечения уже диверсифицированы"} },
  "goal:Augmenter les réservations": { en:{label:"Increase bookings",detail:"Priority tailored to your sector"},vi:{label:"Tăng đặt chỗ",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"زيادة الحجوزات",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Увеличить количество бронирований",detail:"Приоритет для вашей отрасли"} },
  "goal:Être trouvé localement": { en:{label:"Be found locally",detail:"Priority tailored to your sector"},vi:{label:"Được tìm thấy tại địa phương",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"سهولة العثور عليك محليًا",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Повысить локальную видимость",detail:"Приоритет для вашей отрасли"} },
  "goal:Monter en gamme": { en:{label:"Move upmarket",detail:"Priority tailored to your sector"},vi:{label:"Nâng tầm thương hiệu",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"الارتقاء بالفئة",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Выйти в более высокий сегмент",detail:"Приоритет для вашей отрасли"} },
  "goal:Attirer une clientèle internationale": { en:{label:"Attract international customers",detail:"Priority tailored to your sector"},vi:{label:"Thu hút khách quốc tế",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"جذب عملاء دوليين",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Привлекать международных клиентов",detail:"Приоритет для вашей отрасли"} },
  "goal:Améliorer la visibilité": { en:{label:"Improve visibility",detail:"Priority tailored to your sector"},vi:{label:"Cải thiện khả năng hiển thị",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"تحسين الظهور",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Улучшить видимость",detail:"Приоритет для вашей отрасли"} },
  "goal:Générer plus de demandes": { en:{label:"Generate more enquiries",detail:"Priority tailored to your sector"},vi:{label:"Tăng yêu cầu liên hệ",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"زيادة طلبات التواصل",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Получать больше заявок",detail:"Приоритет для вашей отрасли"} },
  "goal:Valoriser les biens": { en:{label:"Showcase properties",detail:"Priority tailored to your sector"},vi:{label:"Nâng cao giá trị bất động sản",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"إبراز قيمة العقارات",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Подчеркнуть ценность объектов",detail:"Приоритет для вашей отрасли"} },
  "goal:Attirer une clientèle premium": { en:{label:"Attract premium customers",detail:"Priority tailored to your sector"},vi:{label:"Thu hút khách hàng cao cấp",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"جذب عملاء مميزين",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Привлекать премиальных клиентов",detail:"Приоритет для вашей отрасли"} },
  "goal:Générer des demandes qualifiées": { en:{label:"Generate qualified enquiries",detail:"Priority tailored to your sector"},vi:{label:"Tạo yêu cầu chất lượng",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"الحصول على طلبات مؤهلة",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Получать целевые заявки",detail:"Приоритет для вашей отрасли"} },
  "goal:Valoriser les véhicules": { en:{label:"Showcase vehicles",detail:"Priority tailored to your sector"},vi:{label:"Làm nổi bật phương tiện",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"إبراز المركبات",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Подчеркнуть преимущества автомобилей",detail:"Приоритет для вашей отрасли"} },
  "goal:Développer la visibilité locale": { en:{label:"Grow local visibility",detail:"Priority tailored to your sector"},vi:{label:"Tăng độ nhận diện địa phương",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"زيادة الظهور المحلي",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Повысить локальную видимость",detail:"Приоритет для вашей отрасли"} },
  "goal:Renforcer l'image de marque": { en:{label:"Strengthen brand image",detail:"Priority tailored to your sector"},vi:{label:"Củng cố hình ảnh thương hiệu",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"تعزيز صورة العلامة التجارية",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Укрепить образ бренда",detail:"Приоритет для вашей отрасли"} },
  "goal:Vendre davantage": { en:{label:"Sell more",detail:"Priority tailored to your sector"},vi:{label:"Tăng doanh số",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"زيادة المبيعات",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Увеличить продажи",detail:"Приоритет для вашей отрасли"} },
  "goal:Développer une audience internationale": { en:{label:"Grow an international audience",detail:"Priority tailored to your sector"},vi:{label:"Phát triển khán giả quốc tế",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"توسيع الجمهور الدولي",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Расширить международную аудиторию",detail:"Приоритет для вашей отрасли"} },
  "goal:Renforcer le positionnement premium": { en:{label:"Strengthen premium positioning",detail:"Priority tailored to your sector"},vi:{label:"Củng cố định vị cao cấp",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"تعزيز التموضع المتميز",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Укрепить премиальное позиционирование",detail:"Приоритет для вашей отрасли"} },
  "goal:Générer des demandes": { en:{label:"Generate enquiries",detail:"Priority tailored to your sector"},vi:{label:"Tăng yêu cầu liên hệ",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"زيادة طلبات التواصل",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Получать заявки",detail:"Приоритет для вашей отрасли"} },
  "goal:Créer une présence internationale": { en:{label:"Build an international presence",detail:"Priority tailored to your sector"},vi:{label:"Xây dựng hiện diện quốc tế",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"بناء حضور دولي",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Создать международное присутствие",detail:"Приоритет для вашей отрасли"} },
  "goal:Générer des rendez-vous": { en:{label:"Generate appointments",detail:"Priority tailored to your sector"},vi:{label:"Tăng lịch hẹn",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"زيادة المواعيد",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Увеличить число записей",detail:"Приоритет для вашей отрасли"} },
  "goal:Professionnaliser l'image": { en:{label:"Professionalise the image",detail:"Priority tailored to your sector"},vi:{label:"Chuyên nghiệp hóa hình ảnh",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"إضفاء طابع احترافي على الصورة",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Сделать образ профессиональнее",detail:"Приоритет для вашей отрасли"} },
  "goal:Générer des prises de rendez-vous": { en:{label:"Generate appointment bookings",detail:"Priority tailored to your sector"},vi:{label:"Tăng lượt đặt lịch",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"زيادة حجوزات المواعيد",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Увеличить число записей на приём",detail:"Приоритет для вашей отрасли"} },
  "goal:Gagner en confiance": { en:{label:"Build trust",detail:"Priority tailored to your sector"},vi:{label:"Tạo dựng niềm tin",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"بناء الثقة",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Повысить доверие",detail:"Приоритет для вашей отрасли"} },
  "goal:Être visible sur Google": { en:{label:"Be visible on Google",detail:"Priority tailored to your sector"},vi:{label:"Hiển thị trên Google",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"الظهور على Google",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Быть заметнее в Google",detail:"Приоритет для вашей отрасли"} },
  "goal:Montrer les réalisations": { en:{label:"Showcase your work",detail:"Priority tailored to your sector"},vi:{label:"Trưng bày các dự án",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"عرض الأعمال المنجزة",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Показать выполненные проекты",detail:"Приоритет для вашей отрасли"} },
  "goal:Attirer des projets premium": { en:{label:"Attract premium projects",detail:"Priority tailored to your sector"},vi:{label:"Thu hút dự án cao cấp",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"جذب مشاريع متميزة",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Привлекать премиальные проекты",detail:"Приоритет для вашей отрасли"} },
  "goal:Présenter le savoir-faire": { en:{label:"Showcase expertise",detail:"Priority tailored to your sector"},vi:{label:"Giới thiệu chuyên môn",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"إبراز الخبرة",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Представить профессиональные навыки",detail:"Приоритет для вашей отрасли"} },
  "goal:Gagner en crédibilité": { en:{label:"Build credibility",detail:"Priority tailored to your sector"},vi:{label:"Tăng độ uy tín",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"تعزيز المصداقية",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Повысить доверие и авторитет",detail:"Приоритет для вашей отрасли"} },
  "goal:Obtenir des prospects qualifiés": { en:{label:"Acquire qualified leads",detail:"Priority tailored to your sector"},vi:{label:"Thu hút khách hàng tiềm năng chất lượng",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"الحصول على عملاء محتملين مؤهلين",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Получать качественные лиды",detail:"Приоритет для вашей отрасли"} },
  "goal:Structurer l'image de marque": { en:{label:"Structure the brand image",detail:"Priority tailored to your sector"},vi:{label:"Định hình hình ảnh thương hiệu",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"تنظيم صورة العلامة التجارية",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Систематизировать образ бренда",detail:"Приоритет для вашей отрасли"} },
  "goal:Améliorer la conversion": { en:{label:"Improve conversion",detail:"Priority tailored to your sector"},vi:{label:"Cải thiện chuyển đổi",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"تحسين التحويل",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Повысить конверсию",detail:"Приоритет для вашей отрасли"} },
  "goal:Développer la marque": { en:{label:"Grow the brand",detail:"Priority tailored to your sector"},vi:{label:"Phát triển thương hiệu",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"تطوير العلامة التجارية",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Развивать бренд",detail:"Приоритет для вашей отрасли"} },
  "goal:Être trouvé par les touristes": { en:{label:"Be found by tourists",detail:"Priority tailored to your sector"},vi:{label:"Được du khách tìm thấy",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"سهولة العثور عليك من قبل السياح",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Быть заметнее для туристов",detail:"Приоритет для вашей отрасли"} },
  "goal:Convertir davantage": { en:{label:"Convert more visitors",detail:"Priority tailored to your sector"},vi:{label:"Tăng tỷ lệ chuyển đổi",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"زيادة التحويلات",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Повысить конверсию посетителей",detail:"Приоритет для вашей отрасли"} },
  "goal:Présenter l'expertise": { en:{label:"Showcase expertise",detail:"Priority tailored to your sector"},vi:{label:"Giới thiệu chuyên môn",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"إبراز الخبرة",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Представить экспертизу",detail:"Приоритет для вашей отрасли"} },
  "goal:Développer mon activité": { en:{label:"Grow my business",detail:"Priority tailored to your sector"},vi:{label:"Phát triển hoạt động",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"تنمية نشاطي",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Развивать бизнес",detail:"Приоритет для вашей отрасли"} },
  "goal:Professionnaliser mon image": { en:{label:"Professionalise my image",detail:"Priority tailored to your sector"},vi:{label:"Chuyên nghiệp hóa hình ảnh",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"إضفاء طابع احترافي على صورتي",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Сделать свой образ профессиональнее",detail:"Приоритет для вашей отрасли"} },
  "goal:Construire une présence forte": { en:{label:"Build a strong presence",detail:"Priority tailored to your sector"},vi:{label:"Xây dựng sự hiện diện mạnh mẽ",detail:"Ưu tiên phù hợp với lĩnh vực của bạn"},ar:{label:"بناء حضور قوي",detail:"أولوية مناسبة لقطاعك"},ru:{label:"Создать сильное присутствие",detail:"Приоритет для вашей отрасли"} },
};
function localizeChoice(item: Choice, lang: Lang): Choice {
  const translated = CHOICE_COPY[item.id]?.[lang];
  return {
    ...item,
    label: localizePriceText(translated?.label ?? item.label, lang),
    detail: translated?.detail ?? item.detail,
  };
}
function localizeGoal(goal: string, lang: Lang): Choice {
  const translated = CHOICE_COPY[`goal:${goal}`]?.[lang];
  return { id: goal, label: translated?.label ?? goal, detail: translated?.detail ?? "Priority adapted to your sector" };
}

const PROPOSAL_COPY: Record<string, Partial<Record<Lang, { label: string; detail: string }>>> = {
  "website:Site Vitrine Pro": { en:{label:"Pro Showcase Website",detail:"Premium website up to 3 pages, responsive, contact and basic SEO"},vi:{label:"Website giới thiệu Pro",detail:"Website cao cấp tối đa 3 trang, responsive, liên hệ và SEO cơ bản"},ar:{label:"موقع تعريفي احترافي",detail:"موقع متميز حتى 3 صفحات، متجاوب، مع التواصل وSEO أساسي"},ru:{label:"Премиальный сайт-визитка",detail:"Премиальный сайт до 3 страниц, адаптивный дизайн, контакты и базовое SEO"} },
  "website:Site Business": { en:{label:"Business Website",detail:"Website up to 5 pages, blog, gallery, chat and advanced analytics"},vi:{label:"Website doanh nghiệp",detail:"Website tối đa 5 trang, blog, thư viện ảnh, chat và phân tích nâng cao"},ar:{label:"موقع أعمال",detail:"موقع حتى 5 صفحات مع مدونة ومعرض وصندوق محادثة وتحليلات متقدمة"},ru:{label:"Бизнес-сайт",detail:"Сайт до 5 страниц, блог, галерея, чат и расширенная аналитика"} },
  "website:E-commerce & Réservation": { en:{label:"E-commerce & Booking",detail:"Catalogue, secure payments, inventory management and booking journey"},vi:{label:"Thương mại điện tử & đặt chỗ",detail:"Danh mục, thanh toán an toàn, quản lý kho và quy trình đặt chỗ"},ar:{label:"التجارة الإلكترونية والحجوزات",detail:"كتالوج ودفع آمن وإدارة المخزون ومسار الحجز"},ru:{label:"Интернет-магазин и бронирование",detail:"Каталог, безопасная оплата, управление запасами и процесс бронирования"} },
  "branding:Logo Signature": { en:{label:"Signature Logo",detail:"Logo, essential variations and master files"},vi:{label:"Logo chữ ký",detail:"Logo, các phiên bản cần thiết và tệp gốc"},ar:{label:"شعار مميز",detail:"الشعار والنسخ الأساسية والملفات الأصلية"},ru:{label:"Фирменный логотип",detail:"Логотип, основные варианты и исходные файлы"} },
  "branding:Full Brand Suite": { en:{label:"Full Brand Suite",detail:"Extended brand system, art direction and brand book"},vi:{label:"Bộ nhận diện thương hiệu đầy đủ",detail:"Hệ thống thương hiệu mở rộng, định hướng nghệ thuật và Brand Book"},ar:{label:"حزمة هوية متكاملة",detail:"نظام علامة تجارية موسع وتوجيه فني ودليل العلامة"},ru:{label:"Полный комплект брендинга",detail:"Расширенная система бренда, арт-дирекшн и брендбук"} },
  "maps:Google Maps Top 3": { en:{label:"Google Maps Top 3",detail:"CUSTOM QUOTE · from €990 / year · based on positioning, area, competition and keywords"},vi:{label:"Google Maps Top 3",detail:"BÁO GIÁ RIÊNG · từ 990 € / năm · tùy định vị, khu vực, cạnh tranh và từ khóa"},ar:{label:"Google Maps Top 3",detail:"عرض سعر مخصص · ابتداءً من 990 € سنويًا · وفق التموضع والمنطقة والمنافسة والكلمات المفتاحية"},ru:{label:"Google Maps Top 3",detail:"Индивидуальная смета · от 990 € в год · зависит от позиционирования, региона, конкуренции и ключевых слов"} },
};
function localizeProposal(proposal: Proposal, lang: Lang): Proposal {
  const tier = PROPOSAL_COPY[`${proposal.id}:${proposal.label}`]?.[lang];
  if (tier) return { ...proposal, label: tier.label, detail: localizePriceText(tier.detail, lang) };
  const service = SERVICES.find((item) => item.id === proposal.id);
  if (!service) return { ...proposal, detail: localizePriceText(proposal.detail, lang) };
  const translated = localizeChoice(service, lang);
  return { ...proposal, label: translated.label, detail: localizePriceText(translated.detail, lang) };
}

const SERVICE_ORDER: Record<string, string[]> = { restaurant: ["website","maps","social","seo","branding","maintenance","robotics"], hospitality: ["website","maps","seo","social","branding","maintenance","robotics"], realestate: ["website","maps","branding","seo","social","maintenance","robotics"], automotive: ["website","maps","conversion","seo","content","maintenance","robotics"], fashion: ["website","branding","social","content","seo","maintenance","robotics"], jewelry: ["website","branding","content","seo","social","maintenance","robotics"], beauty: ["website","maps","social","seo","branding","maintenance","robotics"], health: ["website","maps","seo","branding","content","maintenance","robotics"], architecture: ["website","branding","content","seo","maps","maintenance","robotics"], construction: ["website","maps","seo","branding","content","maintenance","robotics"], legal: ["website","seo","branding","maps","content","maintenance","robotics"], finance: ["website","seo","branding","content","maps","maintenance","robotics"], commerce: ["website","social","seo","branding","conversion","maintenance","robotics"], tourism: ["website","maps","seo","social","content","maintenance","robotics"], agency: ["website","branding","conversion","seo","content","maintenance","robotics"], other: ["website","branding","seo","maps","social","maintenance","robotics"] };

const BASE_PRICES: Record<string, number> = { website: 499, branding: 179, seo: 299, maps: 990, ads: 299, social: 299, content: 399, conversion: 299, maintenance: 29, robotics: 499 };
// Keep recommendation rules defined before the configurator render so SSR bundles always include them.
const PROFILE_SERVICE_RULES: Record<string, string[]> = Object.fromEntries(
  Object.entries(SERVICE_ORDER).map(([sectorId, services]) => [sectorId, services.slice(0, 4)])
);

const WEBSITE_TIERS = {
  showcase: { price: 499, label: "Site Vitrine Pro", detail: "Site premium jusqu'à 3 pages, responsive, contact et SEO de base" },
  business: { price: 799, label: "Site Business", detail: "Site jusqu'à 5 pages, blog, galerie, chat et analytics avancés" },
  ecommerce: { price: 1499, label: "E-commerce & Réservation", detail: "Catalogue, paiement sécurisé, gestion des stocks et parcours de réservation" },
} as const;

const BRANDING_TIERS = {
  starter: { price: 179, label: "Logo Signature", detail: "Logo, déclinaisons essentielles et fichiers maîtres" },
  premium: { price: 349, label: "Full Brand Suite", detail: "Système de marque étendu, direction artistique et Brand Book" },
} as const;

export function QuoteConfiguratorCompact() {
  const { lang, price: localizedPrice, t } = useLang();
  const journeyRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); const [sectorId, setSectorId] = useState(""); const [showAllSectors, setShowAllSectors] = useState(false); const [goal, setGoal] = useState(""); const [situation, setSituation] = useState(""); const [budget, setBudget] = useState(""); const [discovery, setDiscovery] = useState(""); const [selectedServices, setSelectedServices] = useState<string[]>([]); const [client, setClient] = useState({ company: "", name: "", email: "", whatsapp: "", website: "" }); const [generated, setGenerated] = useState(false); const [sending, setSending] = useState(false); const [sendMessage, setSendMessage] = useState("");
  const [paying, setPaying] = useState(false); const [checkoutUrl, setCheckoutUrl] = useState("");
  const sector = SECTORS.find((x) => x.id === sectorId);
  const situationChoice = SITUATIONS.find((x) => x.id === situation);
  const budgetChoice = BUDGETS.find((x) => x.id === budget);
  const discoveryChoice = DISCOVERY.find((x) => x.id === discovery);
  const orderedServices = (SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other)
    .map((id) => SERVICES.find((x) => x.id === id))
    .filter(Boolean) as Choice[];

  const profileRecommendation = useMemo(() => {
    const base = PROFILE_SERVICE_RULES[sectorId] ?? PROFILE_SERVICE_RULES.other;
    const services = new Set<string>(base);

    // The budget changes the scope, not just the displayed price.
    if (budget === "under500") {
      services.clear();
      services.add(situation === "selling" ? "website" : base[0]);
    } else if (budget === "500_1000") {
      services.delete("social");
      services.delete("branding");
    } else if (budget === "1000_2500") {
      services.add("website");
      if (situation === "selling") services.add("maps");
    } else if (budget === "2500_5000" || budget === "5000_plus") {
      services.add("website");
      if (goal.toLowerCase().includes("premium") || sectorId === "realestate") services.add("branding");
      if (discovery !== "social") services.add("seo");
    }

    if (situation === "none" || situation === "redesign") services.add("website");
    if (situation === "selling") {
      services.add("website");
      services.add("seo");
    }
    if (discovery === "google") {
      services.add("seo");
      if (sectorId === "hospitality" || sectorId === "realestate") services.add("maps");
    }
    if (discovery === "social") services.add("social");
    if (goal.toLowerCase().includes("crédibilité") || goal.toLowerCase().includes("premium")) services.add("branding");

    const order = SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other;
    return order.filter((id) => services.has(id)).slice(0, budget === "under500" ? 1 : budget === "500_1000" ? 2 : budget === "1000_2500" ? 3 : 4);
  }, [sectorId, budget, situation, discovery, goal]);

  const proposals = useMemo<Proposal[]>(() => {
    return orderedServices.map((service) => {
      let price = BASE_PRICES[service.id];
      let label = service.label;
      let detail = service.detail;
      if (service.id === "maps") { price = 990; label = "Google Maps Top 3"; detail = "SUR MESURE · à partir de 990 € / an · selon positionnement, zone, concurrence et mots-clés"; }
      if (service.id === "website") {
        if (situation === "selling") {
          price = WEBSITE_TIERS.ecommerce.price; label = WEBSITE_TIERS.ecommerce.label; detail = WEBSITE_TIERS.ecommerce.detail;
        } else if (budget === "1000_2500" || budget === "2500_5000" || budget === "5000_plus" || situation === "redesign") {
          price = WEBSITE_TIERS.business.price; label = WEBSITE_TIERS.business.label; detail = WEBSITE_TIERS.business.detail;
        } else {
          price = WEBSITE_TIERS.showcase.price; label = WEBSITE_TIERS.showcase.label; detail = WEBSITE_TIERS.showcase.detail;
        }
      }
      if (service.id === "branding" && (budget === "2500_5000" || budget === "5000_plus" || sectorId === "realestate")) {
        price = BRANDING_TIERS.premium.price; label = BRANDING_TIERS.premium.label; detail = BRANDING_TIERS.premium.detail;
      }
      return { id: service.id, label, detail, price, period: service.id === "seo" || service.id === "social" || service.id === "maintenance" || service.id === "robotics" ? "month" : "once", custom: service.id === "maps" };
    });
  }, [orderedServices, situation, budget, sectorId]);

  const recommendedIds = profileRecommendation;
  const activeRecommended = recommendedIds.filter((id) => proposals.some((p) => p.id === id));
  useEffect(() => {
    if (step === 4 && selectedServices.length === 0 && activeRecommended.length) {
      setSelectedServices(activeRecommended);
    }
  }, [step, activeRecommended.join(",")]);
  const total = selectedServices.reduce((sum, id) => { const p = proposals.find((x) => x.id === id); return sum + (p?.custom ? 0 : (p?.price ?? 0)); }, 0);
  const monthly = selectedServices.reduce((sum, id) => { const p = proposals.find((x) => x.id === id); return sum + (p?.custom ? 0 : (p?.period === "month" ? p.price : 0)); }, 0);
  const once = total - monthly;

  const generatePdf = async () => {
    setSending(true);
    setSendMessage("");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210, M = 14, R = 196;
      const ink = [18, 22, 29] as const;
      const soft = [241, 244, 247] as const;
      const lineColor = [218, 223, 229] as const;
      const muted = [92, 100, 112] as const;
      const white = [255, 255, 255] as const;
      const blue = [32, 32, 32] as const;
      const issueDate = new Date();
      const validity = new Date(issueDate);
      validity.setDate(validity.getDate() + 15);
      const stamp = issueDate.toISOString().slice(0, 10).replace(/-/g, "");
      const quoteNumber = "XR-" + stamp + "-" + String(Math.floor(1000 + Math.random() * 9000));
      const date = (d: Date) => d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

      const section = (label: string, y: number) => {
        doc.setFillColor(...soft);
        doc.roundedRect(M, y - 4, W - M * 2, 8, 1.5, 1.5, "F");
        doc.setTextColor(...ink);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.text(label.toUpperCase(), M + 3, y + 1);
        return y + 12;
      };

      const infoRow = (label: string, value: string, y: number, x = M, maxWidth = 150) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.7);
        doc.setTextColor(...muted);
        doc.text(label, x, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...ink);
        const lines = doc.splitTextToSize(value || "—", maxWidth);
        doc.text(lines, x + 30, y);
        return y + Math.max(5, lines.length * 4.5);
      };

      doc.setFillColor(...ink);
      doc.rect(0, 0, W, 33, "F");
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("XRAGENCY", M, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(198, 203, 211);
      doc.text("STUDIO DIGITAL · STRATÉGIE · DESIGN · CROISSANCE", M, 21);
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("DEVIS", R - M, 13, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(198, 203, 211);
      doc.text(quoteNumber, R - M, 20, { align: "right" });
      doc.text(date(issueDate), R - M, 26, { align: "right" });

      let y = 44;
      y = section("Client", y);
      y = infoRow("Entreprise", client.company, y);
      y = infoRow("Contact", client.name, y);
      y = infoRow("E-mail", client.email, y);
      y = infoRow("WhatsApp", client.whatsapp, y);
      y = infoRow("Site", client.website || "—", y);
      y += 4;

      y = section("Projet", y);
      y = infoRow("Activité", sector?.label || "—", y);
      y = infoRow("Priorité", goal || "—", y);
      y = infoRow("Situation", situationChoice?.label || "—", y);
      y = infoRow("Budget", budgetChoice?.label || "—", y);
      y = infoRow("Acquisition", discoveryChoice?.label || "—", y);
      y += 5;

      y = section("Prestations sélectionnées", y);
      doc.setFillColor(...ink);
      doc.roundedRect(M, y - 4, W - M * 2, 8, 1.2, 1.2, "F");
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.text("PRESTATION", M + 3, y + 1);
      doc.text("MODE", 124, y + 1);
      doc.text("MONTANT", R - 3, y + 1, { align: "right" });
      y += 10;

      selectedServices.forEach((id) => {
        const p = proposals.find((x) => x.id === id);
        if (!p) return;
        const detail = p.id === "robotics"
          ? "Location robot de service dès 499 € / mois · achat selon modèle · événement dès 250 €."
          : p.detail;
        if (y > 255) {
          doc.addPage();
          y = 22;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.4);
        doc.setTextColor(...ink);
        doc.text(p.label, M + 3, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(5.9);
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(detail, 86).slice(0, 2), M + 3, y + 3.5);
        doc.setFontSize(6.4);
        doc.text(p.period === "month" ? "RÉCURRENT" : p.custom ? "SUR MESURE" : "PONCTUEL", 124, y);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.2);
        doc.setTextColor(...ink);
        doc.text(
          p.custom ? "Sur devis" : localizedPrice(p.price) + (p.period === "month" ? t({ fr: " / mois", en: " / month", vi: " / tháng", ar: " / شهر", ru: " / месяц" }) : ""),
          R - 3,
          y,
          { align: "right" }
        );
        y += 12;
        doc.setDrawColor(...lineColor);
        doc.line(M, y - 3, R, y - 3);
      });

      y += 3;
      if (y > 250) {
        doc.addPage();
        y = 22;
      }
      doc.setFillColor(...ink);
      doc.roundedRect(110, y - 4, 86, 28, 2.5, 2.5, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.7);
      doc.setTextColor(186, 192, 202);
      doc.text("TOTAL PONCTUEL", 114, y + 3);
      doc.text("TOTAL MENSUEL", 114, y + 12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.4);
      doc.setTextColor(...white);
      doc.text(localizedPrice(once), 192, y + 3, { align: "right" });
      doc.text(localizedPrice(monthly) + t({ fr: " / mois", en: " / month", vi: " / tháng", ar: " / شهر", ru: " / месяц" }), 192, y + 12, { align: "right" });
      y += 36;

      y = section("Cadre du devis", y);
      y = infoRow("Validité", "15 jours · jusqu’au " + date(validity), y);
      y = infoRow("Démarrage", "Après validation du devis et réception des éléments nécessaires au projet.", y);
      y = infoRow("Nature", "Pré-devis généré automatiquement à partir de votre configuration XR Quote Studio.", y, M, 150);
      y += 5;

      doc.setFillColor(247, 249, 252);
      doc.roundedRect(M, y - 3, W - M * 2, 29, 2.5, 2.5, "F");
      doc.setTextColor(...ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text("Validation client", M + 4, y + 5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.4);
      doc.setTextColor(...muted);
      doc.text("Ce document récapitule les prestations sélectionnées et leur modèle de facturation.", M + 4, y + 11);
      doc.text("Le périmètre définitif est confirmé avec XRAGENCY avant engagement.", M + 4, y + 16);
      doc.setDrawColor(...lineColor);
      doc.line(111, y + 8, 188, y + 8);
      doc.line(111, y + 21, 188, y + 21);
      doc.setFontSize(5.9);
      doc.text("Date / signature", 111, y + 6);
      doc.text("Nom / qualité", 111, y + 19);

      doc.setDrawColor(...lineColor);
      doc.line(M, 281, R, 281);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.3);
      doc.setTextColor(...ink);
      doc.text("KARMA SASU · XRAGENCY", M, 287);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.7);
      doc.setTextColor(...muted);
      doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · RCS Paris", M, 292);
      doc.text("78 Avenue des Champs-Élysées · Bureau 562 · 75008 Paris · France", M, 296);
      doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com", M, 300);
      doc.setTextColor(...blue);
      doc.setFont("helvetica", "bold");
      doc.text(quoteNumber, R, 300, { align: "right" });

      doc.save("XRAGENCY-Devis-" + quoteNumber + ".pdf");
      setGenerated(true);
      setSendMessage("Votre devis professionnel a été généré.");
    } catch (error) {
      setSendMessage(error instanceof Error ? error.message : "Impossible de générer le devis PDF.");
    } finally {
      setSending(false);
    }
  };

  const goToStep = (next: number) => {
    setStep(next);
    window.setTimeout(() => journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const choose = (setter: (value: string) => void, value: string, next: number) => {
    setter(value);
    goToStep(next);
  };
  const toggleService = (id: string) => setSelectedServices((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  useEffect(() => {
    if (step > 0) journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [step]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    const normalized = requested === "ecommerce" ? "website" : requested;
    if (normalized && SERVICES.some((x) => x.id === normalized)) {
      if (requested === "ecommerce") setSituation("selling");
      setSelectedServices((current) => current.includes(normalized) ? current : [normalized]);
      setStep(4);
    }
  }, []);

  const createCheckout = async () => {
    if (!client.email || !selectedServices.length || paying) return;
    setPaying(true); setSendMessage("");
    const currency = lang === "vi" ? "vnd" : lang === "ar" ? "aed" : lang === "fr" ? "eur" : "usd";
    try {
      const response = await fetch("/api/create-checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "checkout", sectorId, situation, budget, selectedServices, client, lang, currency }) });
      const data = await response.json() as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Impossible de préparer le règlement.");
      setCheckoutUrl(data.url); window.location.href = data.url;
    } catch (error) { setSendMessage(error instanceof Error ? error.message : "Impossible de préparer le règlement."); } finally { setPaying(false); }
  };

  const reset = () => { setStep(0); setSectorId(""); setGoal(""); setSituation(""); setBudget(""); setDiscovery(""); setSelectedServices([]); setClient({ company: "", name: "", email: "", whatsapp: "", website: "" }); setGenerated(false); setSendMessage(""); };
  const quoteDownloadLabel = sending ? t({fr:"Génération du PDF…",en:"Generating PDF…",vi:"Đang tạo PDF…",ar:"جارٍ إنشاء PDF…",ru:"Создание PDF…"}) : generated ? t({fr:"Télécharger à nouveau →",en:"Download again →",vi:"Tải lại →",ar:"تنزيل مرة أخرى ←",ru:"Скачать снова →"}) : t({fr:"Télécharger mon devis PDF →",en:"Download my PDF quote →",vi:"Tải báo giá PDF →",ar:"تنزيل عرض السعر PDF ←",ru:"Скачать смету PDF →"});
  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!client.company || !client.name || !client.email || !client.whatsapp || sending) return;
    void generatePdf();
  };

  const recommendation = useMemo(() => {
    if (!sector || !discoveryChoice) return "";
    const channel = discovery === "google" ? "Google et la visibilité locale" : discovery === "social" ? "les réseaux sociaux" : discovery === "referral" ? "la conversion du bouche-à-oreille" : "la complémentarité de vos canaux";
    const budgetText = budget === "under500" ? "un premier levier ciblé" : budget === "500_1000" ? "une présence solide sans disperser le budget" : budget === "1000_2500" ? "un dispositif cohérent qui couvre votre socle digital et votre acquisition" : "un dispositif plus complet, sans ajouter des prestations qui ne servent pas votre objectif";
    return `Pour ${sector.label.toLowerCase()}, XR Quote Studio recommande ${budgetText}, en donnant la priorité à ${activeRecommended.map((id) => SERVICES.find((x) => x.id === id)?.label).filter(Boolean).join(", ")}. Votre choix de ${channel} renforce cette recommandation.`;
  }, [sector, discoveryChoice, discovery, budget, activeRecommended]);
  const localizedRecommendation = useMemo(() => {
    if (!sector || !discoveryChoice) return "";
    if (lang === "fr") return recommendation;
    const business = localizeChoice(sector, lang).label;
    const services = activeRecommended.map((id) => {
      const item = SERVICES.find((service) => service.id === id);
      return item ? localizeChoice(item, lang).label : id;
    }).join(", ");
    const channels: Record<Lang, string> = {
      fr: "", en: discovery === "google" ? "Google and local visibility" : discovery === "social" ? "social media" : discovery === "referral" ? "word-of-mouth conversion" : "the combination of your channels",
      vi: discovery === "google" ? "Google và khả năng hiển thị địa phương" : discovery === "social" ? "mạng xã hội" : discovery === "referral" ? "chuyển đổi từ giới thiệu" : "sự kết hợp các kênh",
      ar: discovery === "google" ? "Google والظهور المحلي" : discovery === "social" ? "وسائل التواصل الاجتماعي" : discovery === "referral" ? "تحويل التوصيات الشفهية" : "تكامل قنواتك",
      ru: discovery === "google" ? "Google и локальная видимость" : discovery === "social" ? "социальные сети" : discovery === "referral" ? "конверсия рекомендаций" : "сочетание ваших каналов",
    };
    const budgets: Record<Lang, string> = {
      fr: "", en: budget === "under500" ? "one focused priority" : budget === "500_1000" ? "a solid presence without spreading the budget too thin" : budget === "1000_2500" ? "a coherent setup covering your digital foundations and acquisition" : "a more complete setup without unnecessary services",
      vi: budget === "under500" ? "một giải pháp ưu tiên tập trung" : budget === "500_1000" ? "hiện diện vững chắc mà không dàn trải ngân sách" : budget === "1000_2500" ? "hệ thống đồng bộ bao gồm nền tảng số và thu hút khách" : "hệ thống toàn diện hơn mà không thêm dịch vụ không cần thiết",
      ar: budget === "under500" ? "أداة واحدة ذات أولوية واضحة" : budget === "500_1000" ? "حضور قوي دون تشتيت الميزانية" : budget === "1000_2500" ? "منظومة متكاملة تغطي الأساس الرقمي واكتساب العملاء" : "منظومة أشمل دون خدمات غير ضرورية",
      ru: budget === "under500" ? "один приоритетный инструмент" : budget === "500_1000" ? "устойчивое присутствие без распыления бюджета" : budget === "1000_2500" ? "согласованная система цифровой базы и привлечения клиентов" : "более полная система без ненужных услуг",
    };
    const prefix: Record<Lang, string> = { fr: "", en: `For ${business}, XR Quote Studio recommends ${budgets[lang]}, prioritising ${services}. Your focus on ${channels[lang]} strengthens this recommendation.`, vi: `Với lĩnh vực ${business}, XR Quote Studio đề xuất ${budgets[lang]}, ưu tiên ${services}. Việc tập trung vào ${channels[lang]} giúp củng cố đề xuất này.`, ar: `لنشاط ${business}، يوصي XR Quote Studio بـ${budgets[lang]} مع إعطاء الأولوية لـ${services}. ويساعد تركيزك على ${channels[lang]} في تعزيز هذه التوصية.`, ru: `Для направления «${business}» XR Quote Studio рекомендует ${budgets[lang]}, уделяя приоритет ${services}. Фокус на ${channels[lang]} усиливает эту рекомендацию.` };
    return prefix[lang];
  }, [lang, sector, discoveryChoice, discovery, budget, activeRecommended, recommendation]);

  const titles = [t({fr:"Votre activité",en:"Your business",vi:"Hoạt động của bạn",ar:"نشاطك التجاري",ru:"Ваш бизнес"}),t({fr:"Votre priorité",en:"Your priority",vi:"Ưu tiên của bạn",ar:"أولويتك",ru:"Ваш приоритет"}),t({fr:"Votre situation aujourd’hui",en:"Your current situation",vi:"Tình hình hiện tại",ar:"وضعك الحالي",ru:"Текущая ситуация"}),t({fr:"L’investissement envisagé",en:"Your planned investment",vi:"Ngân sách dự kiến",ar:"الاستثمار المخطط",ru:"Планируемые инвестиции"}),t({fr:"Les prestations à activer",en:"Services to activate",vi:"Dịch vụ cần triển khai",ar:"الخدمات المطلوبة",ru:"Необходимые услуги"}),t({fr:"Comment vos clients vous trouvent",en:"How customers find you",vi:"Khách hàng tìm thấy bạn qua đâu",ar:"كيف يعثر عليك العملاء",ru:"Как клиенты вас находят"}),t({fr:"Votre recommandation",en:"Your recommendation",vi:"Đề xuất dành cho bạn",ar:"توصيتك",ru:"Рекомендация"}),t({fr:"Vos informations",en:"Your details",vi:"Thông tin của bạn",ar:"بياناتك",ru:"Ваши данные"})];
  const progress = ((step + 1) / 8) * 100;
  const card = (item: Choice, onClick: () => void, selected = false) => {
    const icons: Record<string, string> = {
      restaurant: "🍽️", hospitality: "🏨", realestate: "🏡", automotive: "🚘", fashion: "👜", jewelry: "💎", beauty: "✨", health: "🩺", architecture: "🏛️", construction: "🛠️", legal: "⚖️", finance: "📈", commerce: "🛍️", tourism: "✈️", agency: "🎨", other: "💡",
      website: "🖥️", branding: "🎨", seo: "🔎", maps: "📍", ads: "🚀", social: "💬", content: "🎬", conversion: "🧭", maintenance: "🛠️", robotics: "🤖",
      none: "🌱", existing: "🧩", redesign: "✨", outdated: "🕰️", invisible: "👀", selling: "🛒", international: "🌍", launch: "🚀",
      under500: "🌿", "500_1000": "🧱", "1000_2500": "🚀", "2500_5000": "💎", "5000_plus": "🏆",
      google: "🔍", referral: "🤝", mixed: "🌐",
    };
    const localizedItem = SECTORS.some((sector) => sector.goals.includes(item.id)) ? localizeGoal(item.id, lang) : localizeChoice(item, lang);
    return (
      <button
        key={item.id}
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={"choice-card group relative min-h-[132px] w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 sm:min-h-[148px] sm:p-5 " + (selected ? "is-active border-[var(--xr-ink)]/55 bg-[var(--xr-accent-soft)] text-[var(--xr-ink)] shadow-[var(--xr-shadow)]" : "border-[var(--xr-line)] bg-[var(--xr-surface-strong)] text-[var(--xr-ink)] hover:border-[var(--xr-ink)]/40")}
      >
        <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--xr-accent-soft)] blur-2xl transition-transform duration-500 group-hover:scale-150" />
        <div className="relative flex h-full flex-col justify-between gap-5">
          <div className="flex items-start justify-between gap-3">
            <span aria-hidden="true" className={"grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110 " + (selected ? "bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-[var(--xr-shadow)]" : "bg-[var(--xr-accent-soft)]")}>{icons[item.id] ?? "✦"}</span>
            <span className={"grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all " + (selected ? "border-[var(--xr-ink)] bg-[var(--xr-ink)] text-white" : "xr-line bg-[var(--xr-bg)] xr-muted-2 group-hover:border-[var(--xr-ink)]/50 group-hover:text-[var(--xr-ink)]")}>{selected ? <Check className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />}</span>
          </div>
          <div>
            <span className="block text-sm font-semibold leading-5 text-[var(--xr-ink)] sm:text-[15px]">{localizedItem.label}</span>
            <span className="mt-1.5 block text-[11px] leading-[1.55] xr-muted sm:text-xs">{localizedItem.detail}</span>
          </div>
          {selected && <span className="label-mono text-[7px] tracking-[.15em] text-[var(--xr-ink)]">✓ AJOUTÉ À VOTRE PROJET</span>}
        </div>
      </button>
    );
  };

  const totalLabel = once > 0 && monthly > 0
    ? localizedPrice(once) + " + " + localizedPrice(monthly) + t({ fr: " / mois", en: " / month", vi: " / tháng", ar: " / شهر", ru: " / месяц" })
    : once > 0
      ? localizedPrice(once)
      : monthly > 0
        ? localizedPrice(monthly) + t({ fr: " / mois", en: " / month", vi: " / tháng", ar: " / شهر", ru: " / месяц" })
        : t({ fr: "Sélection en cours", en: "Selection in progress", vi: "Đang lựa chọn", ar: "جارٍ الاختيار", ru: "Выбор продолжается" });

  const SystemStack = () => (
    <div className="relative overflow-hidden rounded-[1.15rem] border xr-line bg-[var(--xr-surface)] p-4 shadow-[var(--xr-shadow)] sm:p-5">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <span className="label-mono text-[7px] tracking-[.18em] xr-muted-2">ARCHITECTURE XR</span>
          <p className="mt-1 text-xs font-semibold text-[var(--xr-ink)]">{t({fr:"Votre dispositif digital",en:"Your digital setup",vi:"Hệ thống số của bạn",ar:"منظومتك الرقمية",ru:"Ваша цифровая система"})}</p>
        </div>
        <span className="rounded-full border xr-line bg-[var(--xr-bg)] px-2.5 py-1 label-mono text-[6px] tracking-[.16em] xr-muted-2">{selectedServices.length} BRIQUE{selectedServices.length > 1 ? "S" : ""}</span>
      </div>
      <div className="relative mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-4 sm:col-span-1">
          <span className="label-mono text-[6px] xr-muted-2">CORE</span>
          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border xr-line bg-[var(--xr-ink)] text-[var(--xr-bg)] font-black tracking-[-.08em]">XR</div>
            <div><p className="text-[10px] font-semibold text-[var(--xr-ink)]">XRAGENCY</p><p className="mt-1 text-[7px] xr-muted-2">Stratégie · Design · Croissance</p></div>
          </div>
        </div>
        <div className="relative sm:col-span-2">
          <div aria-hidden className="absolute left-0 top-1/2 hidden h-px w-6 bg-white/10 sm:block" />
          <div className="grid gap-2 sm:grid-cols-2">
            {(selectedServices.length ? selectedServices : ["website", "seo", "social", "branding"]).slice(0,4).map((id, index) => {
              const service = SERVICES.find((x) => x.id === id);
              return (
                <div key={id} className="group rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-3 transition hover:-translate-y-0.5 hover:border-[var(--xr-ink)]/18 hover:bg-[var(--xr-accent-soft)]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="label-mono text-[6px] xr-muted-2">0{index + 1}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--xr-ink)]/50 transition group-hover:scale-150" />
                  </div>
                  <p className="mt-2 text-[9px] font-semibold text-[var(--xr-ink)]">{service?.label ?? id}</p>
                  <p className="mt-1 text-[7px] leading-4 xr-muted-2">{service?.detail ?? "Brique sur mesure du dispositif."}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative mt-4 flex items-center justify-between border-t border-[var(--xr-line)] pt-3">
        <span className="label-mono text-[6px] tracking-[.14em] xr-muted-2">INVESTISSEMENT ESTIMÉ</span>
        <span className="text-[9px] font-semibold text-[var(--xr-ink)]">{totalLabel}</span>
      </div>
    </div>
  );

  return (
    <section id="quote" className="xr-section-elevated relative overflow-hidden border-y xr-line bg-[#f3efe7] py-14 sm:py-20 lg:py-28 dark:bg-[#0d0f12]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,var(--xr-accent-soft),transparent_26%),radial-gradient(circle_at_82%_78%,rgba(120,120,140,.08),transparent_24%)]"/>
      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.025}><Reveal><div className="grid gap-7 border-b xr-line pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div className="min-w-0">
            <span className="label-mono xr-accent text-[8px] tracking-[.22em] sm:tracking-[.28em]">XR QUOTE STUDIO · DEVIS SUR MESURE</span>
            <h2 className="display-serif mt-4 max-w-5xl break-words text-balance text-[clamp(2.35rem,5.2vw,5.6rem)] leading-[.98] tracking-[-.045em] sm:mt-5">{t({fr:"Construisons votre",en:"Let’s build your",vi:"Hãy cùng xây dựng",ar:"لنبنِ",ru:"Давайте создадим"})} <em className="not-italic opacity-55">{t({fr:"projet",en:"project",vi:"dự án",ar:"مشروعك",ru:"проект"})}</em>, {t({fr:"étape par étape.",en:"step by step.",vi:"từng bước một.",ar:"خطوة بخطوة.",ru:"шаг за шагом."})}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 xr-muted sm:text-base">{t({fr:"Répondez à quelques questions : votre conseiller vous aide à définir les bonnes priorités, à composer votre dispositif digital et à préparer une proposition cohérente avec votre budget.",en:"Answer a few questions. Your advisor will help set priorities, build the right digital mix and prepare a proposal that fits your budget.",vi:"Trả lời một vài câu hỏi để xác định ưu tiên, lựa chọn giải pháp số phù hợp và chuẩn bị đề xuất theo ngân sách của bạn.",ar:"أجب عن بضعة أسئلة لمساعدتك على تحديد الأولويات واختيار الحلول الرقمية المناسبة وإعداد عرض يتوافق مع ميزانيتك.",ru:"Ответьте на несколько вопросов: консультант поможет определить приоритеты, подобрать цифровые решения и подготовить предложение в рамках бюджета."})}</p>
          </div>
          <div className="relative overflow-hidden rounded-[1.15rem] border xr-line bg-[var(--xr-surface)] p-4 shadow-[var(--xr-shadow)] sm:p-5">
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[var(--xr-accent-soft)] blur-3xl" />
            <div className="relative flex items-center gap-3">
              <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-lg">
                <Bot className="h-6 w-6" />
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--xr-surface)] bg-[var(--xr-ink)]" /><span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full border border-[var(--xr-line)] bg-[var(--xr-surface-strong)] text-[8px] shadow-md">✦</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--xr-ink)]">Alexandre</p>
                <p className="mt-0.5 label-mono text-[7px] tracking-[.15em] xr-muted-2">{t({fr:"VOTRE CONSEILLER DIGITAL",en:"YOUR DIGITAL ADVISOR",vi:"CỐ VẤN KỸ THUẬT SỐ",ar:"مستشارك الرقمي",ru:"ВАШ ЦИФРОВОЙ КОНСУЛЬТАНТ"})}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-2.5 py-1 label-mono text-[6px] text-[var(--xr-ink)]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--xr-ink)]" /> {t({fr:"EN LIGNE",en:"ONLINE",vi:"TRỰC TUYẾN",ar:"متصل",ru:"В СЕТИ"})}</span>
            </div>
            <div aria-live="polite" className="relative mt-4 rounded-2xl rounded-tl-sm border xr-line bg-[var(--xr-surface-strong)] p-4">
              <div className="mb-2 flex items-center gap-2 label-mono text-[6px] tracking-[.16em] xr-muted-2"><MessageCircle className="h-3 w-3" /> {t({fr:"MESSAGE D’ALEXANDRE",en:"ALEXANDRE’S MESSAGE",vi:"TIN NHẮN TỪ ALEXANDRE",ar:"رسالة ألكسندر",ru:"СООБЩЕНИЕ АЛЕКСАНДРА"})}</div>
              <p className="text-[11px] leading-5 text-[var(--xr-ink)] sm:text-xs">{[
                t({fr:"Bonjour ! Je suis Alexandre. Je vais vous guider pour construire un projet adapté à votre activité.",en:"Hello! I’m Alexandre. I’ll guide you through building a project tailored to your business.",vi:"Xin chào! Tôi là Alexandre. Tôi sẽ hướng dẫn bạn xây dựng giải pháp phù hợp với doanh nghiệp.",ar:"مرحبًا! أنا ألكسندر، وسأرشدك لبناء مشروع يناسب نشاطك التجاري.",ru:"Здравствуйте! Я Александр. Я помогу вам создать проект с учётом особенностей вашего бизнеса."}),
                t({fr:"Quel résultat compte le plus pour vous ? Je m’en servirai pour prioriser les bonnes actions.",en:"Which outcome matters most to you? I’ll use it to prioritise the right actions.",vi:"Kết quả nào quan trọng nhất với bạn? Tôi sẽ dựa vào đó để ưu tiên hành động phù hợp.",ar:"ما النتيجة الأهم بالنسبة لك؟ سأستخدمها لتحديد الإجراءات ذات الأولوية.",ru:"Какой результат для вас важнее всего? Я учту это при выборе приоритетных действий."}),
                t({fr:"Je prends en compte votre situation actuelle pour éviter de vous proposer des solutions inutiles.",en:"I’ll consider your current situation to avoid suggesting unnecessary solutions.",vi:"Tôi sẽ xem xét tình hình hiện tại để tránh đề xuất giải pháp không cần thiết.",ar:"سآخذ وضعك الحالي في الاعتبار لتجنب اقتراح حلول غير ضرورية.",ru:"Я учту вашу текущую ситуацию, чтобы не предлагать ненужные решения."}),
                t({fr:"Parlons budget : je vais ajuster le périmètre à votre investissement envisagé.",en:"Let’s talk budget. I’ll adapt the scope to your planned investment.",vi:"Hãy nói về ngân sách: tôi sẽ điều chỉnh phạm vi theo mức đầu tư dự kiến.",ar:"لنتحدث عن الميزانية؛ سأضبط نطاق العمل وفق استثمارك المخطط.",ru:"Обсудим бюджет: я адаптирую объём работ под ваши инвестиции."}),
                t({fr:"Je prépare une combinaison de services cohérente. Vous gardez le contrôle de chaque choix.",en:"I’ll prepare a coherent mix of services. You stay in control of every choice.",vi:"Tôi sẽ đề xuất tổ hợp dịch vụ phù hợp. Bạn vẫn kiểm soát mọi lựa chọn.",ar:"سأعد مزيجًا متناسقًا من الخدمات، مع احتفاظك بالتحكم في كل اختيار.",ru:"Я подготовлю согласованный набор услуг, а вы сохраните контроль над каждым выбором."}),
                t({fr:"Dernière question sur votre acquisition : elle m’aide à identifier les leviers les plus pertinents.",en:"One last question about acquisition: it helps identify the most relevant channels.",vi:"Câu hỏi cuối về thu hút khách hàng giúp xác định kênh phù hợp nhất.",ar:"سؤال أخير حول اكتساب العملاء لمساعدتي في تحديد القنوات الأنسب.",ru:"Последний вопрос о привлечении клиентов поможет выбрать наиболее подходящие каналы."}),
                t({fr:"Je croise vos réponses pour vous présenter une recommandation personnalisée et transparente.",en:"I’ll combine your answers into a tailored, transparent recommendation.",vi:"Tôi sẽ tổng hợp câu trả lời để đưa ra đề xuất phù hợp và minh bạch.",ar:"سأجمع إجاباتك لتقديم توصية مخصصة وشفافة.",ru:"Я объединю ваши ответы и подготовлю персональную и прозрачную рекомендацию."}),
                t({fr:"Votre brief est prêt. Ajoutez vos coordonnées pour recevoir la proposition détaillée.",en:"Your brief is ready. Add your details to receive the full proposal.",vi:"Bản yêu cầu đã sẵn sàng. Thêm thông tin để nhận đề xuất chi tiết.",ar:"أصبح ملخص طلبك جاهزًا. أضف بياناتك لاستلام العرض المفصل.",ru:"Ваш бриф готов. Укажите данные, чтобы получить подробное предложение."})
              ][step]}</p>
              <div className="mt-3 flex items-center gap-1" aria-hidden="true"><span className="h-1 w-1 rounded-full bg-[var(--xr-ink)] animate-pulse" /><span className="h-1 w-1 rounded-full bg-[var(--xr-ink)]/70 animate-pulse [animation-delay:150ms]" /><span className="h-1 w-1 rounded-full bg-[var(--xr-ink)]/40 animate-pulse [animation-delay:300ms]" /><span className="ml-1 label-mono text-[6px] xr-muted-2">ACCOMPAGNEMENT PERSONNALISÉ</span></div>
            </div>
            <div className="relative mt-4 flex items-end justify-between gap-3 border-t xr-line pt-3">
              <div><span className="label-mono text-[6px] tracking-[.18em] xr-muted-2">{t({fr:"ESTIMATION EN DIRECT",en:"LIVE ESTIMATE",vi:"ƯỚC TÍNH TRỰC TIẾP",ar:"تقدير مباشر",ru:"ТЕКУЩАЯ ОЦЕНКА"})}</span><p className="mt-1 display-serif text-2xl text-[var(--xr-ink)] sm:text-3xl">{totalLabel}</p></div>
              <span className="shrink-0 rounded-full border xr-line px-3 py-1.5 label-mono text-[6px] xr-muted-2">{String(step+1).padStart(2,"0")} / 08 ÉTAPES</span>
            </div>
          </div>
        </div></Reveal></Parallax>
        <div className="mt-6 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2 rounded-xl border xr-line bg-[var(--xr-surface)] p-2 shadow-[var(--xr-shadow)]">
            {titles.map((title, index) => (
              <button
                key={title}
                type="button"
                onClick={() => index <= step && setStep(index)}
                className={"group flex min-w-[145px] items-center gap-3 rounded-xl px-3 py-3 text-left transition " + (index === step ? "bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-lg" : index < step ? "bg-[var(--xr-accent-soft)]" : "opacity-45")}
              >
                <span className={"grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[8px] font-semibold " + (index === step ? "border-white/15 bg-white/10" : "xr-line")}>
                  {index < step ? <Check className="h-3 w-3" /> : String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className={"label-mono block text-[5px] tracking-[.16em] " + (index === step ? "text-white/55" : "xr-muted-2")}>ÉTAPE {String(index + 1).padStart(2, "0")}</span>
                  <span className={"mt-1 block truncate text-[9px] font-semibold " + (index === step ? "text-white" : "text-[var(--xr-ink)]")}>{title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div ref={journeyRef} className="mt-8 grid gap-5 lg:grid-cols-[.25fr_1.75fr]">
          <Reveal><aside className="xr-panel rounded-[2rem] p-3 lg:sticky lg:top-28 lg:h-fit">
            <div className="px-3 pb-3 pt-2"><div className="flex items-center justify-between"><span className="label-mono text-[6px] xr-muted-2">{t({fr:"VOTRE PARCOURS",en:"YOUR JOURNEY",vi:"HÀNH TRÌNH CỦA BẠN",ar:"رحلتك",ru:"ВАШ ПУТЬ"})}</span><span className="label-mono text-[6px] xr-muted-2">{String(step+1).padStart(2,"0")} / 08</span></div><div className="mt-3 h-1 rounded-full bg-current opacity-10"><div className="h-full rounded-full bg-[var(--xr-accent)] transition-all duration-500" style={{width:progress+"%"}}/></div></div>
            <div className="hidden gap-1 lg:grid">{titles.map((title,index)=><div key={title} className={"rounded-xl px-3 py-3 "+(index===step?"bg-[var(--xr-accent-soft)]":"opacity-45")}><div className="flex items-center gap-2"><span className="label-mono text-[6px] xr-muted-2">{String(index+1).padStart(2,"0")}</span><span className="truncate text-[8px] font-semibold">{title}</span></div></div>)}</div>
            <div className="mt-2 rounded-xl border xr-line bg-[var(--xr-surface)] p-3"><span className="label-mono text-[6px] xr-muted-2">{t({fr:"SYSTÈME",en:"SYSTEM",vi:"HỆ THỐNG",ar:"النظام",ru:"СИСТЕМА"})}</span><p className="mt-1 text-[9px] font-semibold">{selectedServices.length} brique(s) active(s)</p><p className="mt-1 text-[7px] xr-muted">{totalLabel}</p></div>
          </aside></Reveal>
          <Reveal delay={70}><div className="xr-depth-card rounded-[1.15rem] border xr-line bg-[var(--xr-surface)] p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between gap-3 border-b xr-line pb-5"><div className="min-w-0"><span className="inline-flex items-center gap-2 rounded-full border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-[var(--xr-ink)]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--xr-ink)]"/>{step===7?"DERNIÈRE LIGNE DROITE":"ÉTAPE "+String(step+1).padStart(2,"0")+" / 08"}</span><h3 className="mt-3 max-w-3xl break-words text-balance text-2xl font-semibold leading-[1.12] tracking-[-.03em] sm:text-3xl">{titles[step]}</h3><p className="mt-2 text-xs leading-5 xr-muted sm:text-sm">{[
                t({fr:"On commence simplement : quel est votre univers ?",en:"Let’s start with your business area.",vi:"Hãy bắt đầu với lĩnh vực của bạn.",ar:"لنبدأ بتحديد مجال نشاطك.",ru:"Начнём со сферы вашего бизнеса."}),
                t({fr:"Qu’aimeriez-vous améliorer en premier ?",en:"What would you like to improve first?",vi:"Bạn muốn cải thiện điều gì trước tiên?",ar:"ما الذي ترغب في تحسينه أولًا؟",ru:"Что вы хотели бы улучшить в первую очередь?"}),
                t({fr:"Où en êtes-vous aujourd’hui ?",en:"Where do things stand today?",vi:"Tình hình hiện tại của bạn ra sao?",ar:"ما وضعك الحالي؟",ru:"Как обстоят дела сейчас?"}),
                t({fr:"On adapte la proposition à votre investissement.",en:"We’ll tailor the proposal to your investment.",vi:"Đề xuất sẽ phù hợp với ngân sách đầu tư của bạn.",ar:"سنكيّف العرض وفق ميزانيتك الاستثمارية.",ru:"Мы адаптируем предложение под ваши инвестиции."}),
                t({fr:"Composez votre équipe digitale à la carte.",en:"Build your digital team à la carte.",vi:"Tùy chọn đội ngũ dịch vụ số của bạn.",ar:"اختر مكونات فريقك الرقمي حسب الحاجة.",ru:"Соберите набор цифровых услуг под свои задачи."}),
                t({fr:"Comment les clients vous découvrent-ils ?",en:"How do customers discover you?",vi:"Khách hàng biết đến bạn bằng cách nào?",ar:"كيف يكتشفك العملاء؟",ru:"Как клиенты узнают о вас?"}),
                t({fr:"Voici une piste claire, avec les coûts détaillés.",en:"Here is a clear direction with itemised costs.",vi:"Đây là đề xuất rõ ràng cùng chi phí chi tiết.",ar:"إليك مسارًا واضحًا مع تفاصيل التكاليف.",ru:"Вот чёткая рекомендация с подробной разбивкой стоимости."}),
                t({fr:"Encore quelques coordonnées pour finaliser votre brief.",en:"A few contact details to complete your brief.",vi:"Thêm một vài thông tin liên hệ để hoàn tất yêu cầu.",ar:"بضعة بيانات اتصال لإكمال طلبك.",ru:"Осталось указать контактные данные, чтобы завершить бриф."})
              ][step]}</p></div>{step>0&&<button type="button" onClick={()=>goToStep(step-1)} className="shrink-0 rounded-full border xr-line px-4 py-2 text-xs font-semibold transition hover:bg-[var(--xr-accent-soft)]">← Retour</button>}</div>
            <div className="mt-7">
              {step===0&&<div className="space-y-4"><div className="rounded-[1.15rem] border xr-line bg-[var(--xr-surface-strong)] p-5"><span className="label-mono text-[6px] xr-accent">{t({fr:"01 · VOTRE ACTIVITÉ",en:"01 · YOUR BUSINESS",vi:"01 · HOẠT ĐỘNG CỦA BẠN",ar:"01 · نشاطك التجاري",ru:"01 · ВАШ БИЗНЕС"})}</span><p className="mt-2 text-sm xr-muted">{t({fr:"Choisissez votre univers. Les recommandations s’adaptent ensuite à votre objectif, situation et budget.",en:"Choose your business area. Recommendations adapt to your goals, situation and budget.",vi:"Chọn lĩnh vực của bạn. Đề xuất sẽ được điều chỉnh theo mục tiêu, tình hình và ngân sách.",ar:"اختر مجال نشاطك. ستتكيف التوصيات مع أهدافك ووضعك وميزانيتك.",ru:"Выберите сферу бизнеса. Рекомендации будут учитывать ваши цели, ситуацию и бюджет."})}</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{(showAllSectors?SECTORS:SECTORS.slice(0,6)).map((x,i)=><button key={x.id} type="button" aria-label={"Choisir "+x.label} onClick={()=>{setSectorId(x.id);goToStep(1)}} className="choice-card xr-depth-card group min-h-[140px] rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-4 text-left transition hover:border-[var(--xr-ink)]/50 hover:bg-[var(--xr-accent-soft)] sm:min-h-[155px] sm:p-5"><span className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--xr-accent-soft)] text-xl transition group-hover:scale-110">{({"restaurant":"🍽️","hospitality":"🏨","realestate":"🏡","automotive":"🚘","fashion":"👜","jewelry":"💎","beauty":"✨","health":"🩺","architecture":"🏛️","construction":"🛠️","legal":"⚖️","finance":"📈","commerce":"🛍️","tourism":"✈️","agency":"🎨","other":"💡"} as Record<string,string>)[x.id]||"✦"}</span><span className="label-mono text-[7px] xr-muted-2">{String(i+1).padStart(2,"0")}</span></span><span className="mt-4 block text-xs font-semibold leading-5 sm:text-sm">{localizeChoice(x,lang).label}</span><span className="mt-1.5 block text-[10px] leading-4 xr-muted">{localizeChoice(x,lang).detail}</span></button>)}</div><button type="button" onClick={()=>setShowAllSectors(v=>!v)} className="w-full rounded-full border xr-line py-3 label-mono text-[7px] xr-muted">{showAllSectors?t({fr:"Réduire les activités",en:"Show fewer sectors",vi:"Thu gọn lĩnh vực",ar:"عرض عدد أقل من القطاعات",ru:"Свернуть направления"}):t({fr:"Voir toutes les activités",en:"View all sectors",vi:"Xem tất cả lĩnh vực",ar:"عرض جميع القطاعات",ru:"Показать все направления"})}</button></div>}
              {step===1&&sector&&<div className="space-y-4"><div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-5"><span className="label-mono text-[6px] xr-muted-2">{t({fr:"ACTIVITÉ",en:"BUSINESS",vi:"LĨNH VỰC",ar:"النشاط",ru:"СФЕРА"})}</span><p className="mt-2 text-xl font-semibold">{localizeChoice(sector,lang).label}</p><p className="mt-1 text-[9px] leading-4 xr-muted">{localizeChoice(sector,lang).detail}</p></div><div className="grid gap-2 sm:grid-cols-3">{sector.goals.map(x=>card({id:x,label:x,detail:"Priorité adaptée à votre secteur"},()=>choose(setGoal,x,2)))}</div></div>}
              {step===2&&<div className="grid gap-2 sm:grid-cols-2">{SITUATIONS.map(x=>card(x,()=>choose(setSituation,x.id,3),x.id===situation))}</div>}
              {step===3&&<div className="grid gap-2 sm:grid-cols-3">{BUDGETS.map(x=>card(x,()=>{setBudget(x.id);setSelectedServices([]);window.setTimeout(()=>setStep(4),180)},x.id===budget))}</div>}
              {step===4&&<div className="space-y-4"><div className="rounded-2xl border xr-line bg-[var(--xr-accent-soft)] p-5"><span className="label-mono text-[6px] xr-accent">{t({fr:"SÉLECTION PRÉPARÉE",en:"PREPARED SELECTION",vi:"LỰA CHỌN ĐỀ XUẤT",ar:"اختيار مقترح",ru:"ПОДГОТОВЛЕННЫЙ ВЫБОР"})}</span><p className="mt-2 text-sm font-semibold">{t({fr:"Les leviers les plus cohérents apparaissent ici en premier.",en:"The most relevant levers appear here first.",vi:"Các giải pháp phù hợp nhất sẽ xuất hiện trước.",ar:"تظهر هنا أولًا الأدوات الأكثر ملاءمة.",ru:"Сначала показаны наиболее подходящие инструменты."})}</p><p className="mt-2 text-[9px] leading-4 xr-muted">{t({fr:"Gardez-les, retirez-les ou ajoutez d’autres expertises. Rien n’est imposé.",en:"Keep, remove or add services. Nothing is mandatory.",vi:"Giữ, bỏ hoặc thêm dịch vụ khác. Bạn hoàn toàn chủ động.",ar:"احتفظ بالخدمات أو احذفها أو أضف غيرها. لا شيء إلزامي.",ru:"Оставьте, удалите или добавьте услуги. Ничего не навязывается."})}</p></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{orderedServices.map(x=>card(x,()=>toggleService(x.id),selectedServices.includes(x.id)))}</div><button type="button" disabled={!selectedServices.length} onClick={()=>goToStep(5)} className="w-full rounded-full bg-[var(--xr-ink)] px-5 py-4 label-mono text-[8px] font-semibold text-[var(--xr-bg)] disabled:opacity-30">{t({fr:"Continuer →",en:"Continue →",vi:"Tiếp tục →",ar:"متابعة ←",ru:"Продолжить →"})}</button></div>}
              {step===5&&<div className="space-y-4"><div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-5"><span className="label-mono text-[6px] xr-muted-2">{t({fr:"ACQUISITION",en:"ACQUISITION",vi:"THU HÚT KHÁCH",ar:"اكتساب العملاء",ru:"ПРИВЛЕЧЕНИЕ"})}</span><p className="mt-2 text-lg font-semibold">{t({fr:"Comment vos clients vous trouvent-ils aujourd’hui ?",en:"How do customers find you today?",vi:"Khách hàng tìm thấy bạn qua đâu hôm nay?",ar:"كيف يعثر عليك العملاء اليوم؟",ru:"Как клиенты находят вас сегодня?"})}</p></div><div className="grid gap-2 sm:grid-cols-2">{DISCOVERY.map(x=>card(x,()=>choose(setDiscovery,x.id,6),x.id===discovery))}</div></div>}
              {step===6&&sector&&<div className="space-y-5"><div className="rounded-[1.15rem] border xr-line bg-[var(--xr-accent-soft)] p-6"><span className="label-mono text-[6px] xr-accent">{t({fr:"VOTRE RECOMMANDATION",en:"YOUR RECOMMENDATION",vi:"ĐỀ XUẤT DÀNH CHO BẠN",ar:"توصيتك",ru:"ВАША РЕКОМЕНДАЦИЯ"})}</span><p className="mt-3 max-w-3xl text-lg leading-7 sm:text-2xl">{localizedRecommendation}</p></div><div className="grid gap-2 sm:grid-cols-2">{selectedServices.map(id=>{const p=proposals.find(x=>x.id===id);if(!p)return null;const lp=localizeProposal(p,lang);return <div key={id} className="flex items-start justify-between gap-4 rounded-2xl border xr-line bg-[var(--xr-surface)] p-4"><div><p className="text-[10px] font-semibold">{lp.label}</p><p className="mt-1 text-[8px] leading-4 xr-muted">{lp.detail}</p></div><span className="shrink-0 text-[9px] font-semibold">{p.custom?t({fr:"Sur devis",en:"Custom quote",vi:"Báo giá riêng",ar:"عرض سعر مخصص",ru:"Индивидуальная смета"}):localizedPrice(p.price)+(p.period==="month"?t({fr:" / mois",en:" / month",vi:" / tháng",ar:" / شهر",ru:" / месяц"}):"")}</span></div>})}</div><div className="grid gap-2 sm:grid-cols-2"><div className="rounded-2xl border xr-line p-5"><span className="label-mono text-[6px] xr-muted-2">{t({fr:"PONCTUEL",en:"ONE-TIME",vi:"MỘT LẦN",ar:"دفعة واحدة",ru:"РАЗОВО"})}</span><p className="mt-1 text-3xl font-semibold">{localizedPrice(once)}</p></div><div className="rounded-2xl border xr-line p-5"><span className="label-mono text-[6px] xr-muted-2">{t({fr:"MENSUEL",en:"MONTHLY",vi:"HÀNG THÁNG",ar:"شهري",ru:"ЕЖЕМЕСЯЧНО"})}</span><p className="mt-1 text-3xl font-semibold">{localizedPrice(monthly)}<span className="text-sm xr-muted">{t({fr:" / mois",en:" / month",vi:" / tháng",ar:" / شهر",ru:" / месяц"})}</span></p></div></div><div className="grid gap-2 sm:grid-cols-2"><button type="button" onClick={()=>goToStep(7)} className="rounded-full bg-[var(--xr-ink)] px-5 py-4 label-mono text-[8px] font-semibold text-[var(--xr-bg)]">{t({fr:"Recevoir mon devis PDF →",en:"Get my PDF quote →",vi:"Nhận báo giá PDF →",ar:"استلام عرض السعر PDF ←",ru:"Получить смету PDF →"})}</button><a href={"https://wa.me/33767566783?text="+encodeURIComponent("Bonjour XR Agency, j'ai terminé mon diagnostic XR Quote Studio. Secteur : "+sector.label+". Budget : "+budgetChoice?.label+". Prestations : "+selectedServices.map(id=>proposals.find(p=>p.id===id)?.label).filter(Boolean).join(", ")+". Total : "+localizedPrice(once)+" + "+localizedPrice(monthly)+t({fr:" / mois",en:" / month",vi:" / tháng",ar:" / شهر",ru:" / месяц"})+".")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border xr-line px-5 py-4 label-mono text-[8px] xr-muted">{t({fr:"Continuer sur WhatsApp",en:"Continue on WhatsApp",vi:"Tiếp tục qua WhatsApp",ar:"المتابعة عبر WhatsApp",ru:"Продолжить в WhatsApp"})} <ArrowRight className="h-3.5 w-3.5"/></a></div></div>}
              {step===7&&<div className="space-y-4"><div className="rounded-2xl border xr-line bg-[var(--xr-accent-soft)] p-5"><span className="label-mono text-[6px] xr-accent">{t({fr:"FINALISATION",en:"FINAL DETAILS",vi:"HOÀN TẤT",ar:"الخطوات النهائية",ru:"ЗАВЕРШЕНИЕ"})}</span><p className="mt-2 text-lg font-semibold">{t({fr:"Votre devis professionnel est prêt.",en:"Your professional quote is ready.",vi:"Báo giá chuyên nghiệp của bạn đã sẵn sàng.",ar:"عرض السعر الاحترافي جاهز.",ru:"Ваше профессиональное предложение готово."})}</p><p className="mt-1 text-[9px] leading-4 xr-muted">{t({fr:"Renseignez vos coordonnées pour télécharger votre devis PDF complet ou valider votre commande en ligne.",en:"Enter your details to download the full PDF quote or confirm your order online.",vi:"Nhập thông tin để tải báo giá PDF đầy đủ hoặc xác nhận đơn hàng trực tuyến.",ar:"أدخل بياناتك لتنزيل عرض السعر الكامل بصيغة PDF أو تأكيد طلبك عبر الإنترنت.",ru:"Укажите данные, чтобы скачать полную смету в PDF или подтвердить заказ онлайн."})}</p></div><form onSubmit={handleQuoteSubmit} className="space-y-3"><div className="grid gap-3 sm:grid-cols-2"><input value={client.company} onChange={e=>setClient({...client,company:e.target.value})} placeholder={t({fr:"Entreprise / société *",en:"Company *",vi:"Tên công ty *",ar:"الشركة *",ru:"Компания *"})} autoComplete="organization" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none" required/><input value={client.name} onChange={e=>setClient({...client,name:e.target.value})} placeholder={t({fr:"Nom du représentant *",en:"Contact name *",vi:"Tên người đại diện *",ar:"اسم جهة الاتصال *",ru:"Имя контактного лица *"})} autoComplete="name" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none" required/><input value={client.email} onChange={e=>setClient({...client,email:e.target.value})} type="email" placeholder={t({fr:"E-mail professionnel *",en:"Business email *",vi:"Email công việc *",ar:"البريد الإلكتروني للعمل *",ru:"Рабочая электронная почта *"})} autoComplete="email" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none" required/><input value={client.whatsapp} onChange={e=>setClient({...client,whatsapp:e.target.value})} type="tel" placeholder={t({fr:"Téléphone / WhatsApp *",en:"Phone / WhatsApp *",vi:"Điện thoại / WhatsApp *",ar:"الهاتف / WhatsApp *",ru:"Телефон / WhatsApp *"})} autoComplete="tel" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none" required/></div><input value={client.website} onChange={e=>setClient({...client,website:e.target.value})} type="url" placeholder={t({fr:"Site web de l’entreprise (facultatif)",en:"Company website (optional)",vi:"Website công ty (không bắt buộc)",ar:"موقع الشركة (اختياري)",ru:"Сайт компании (необязательно)"})} autoComplete="url" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none"/><div className="grid gap-3 sm:grid-cols-2 pt-2"><button type="submit" disabled={!client.company||!client.name||!client.email||!client.whatsapp||sending} className="w-full rounded-full bg-[var(--xr-ink)] px-5 py-4 label-mono text-[8px] font-semibold text-[var(--xr-bg)] disabled:opacity-30">{quoteDownloadLabel}</button><button type="button" onClick={createCheckout} disabled={!client.company||!client.name||!client.email||!client.whatsapp||paying} className="w-full rounded-full border border-[var(--xr-ink)]/50 bg-[var(--xr-accent-soft)] px-5 py-4 label-mono text-[8px] font-bold text-[var(--xr-ink)] hover:bg-[var(--xr-ink)] hover:text-[var(--xr-bg)] transition disabled:opacity-30">{paying?"Préparation du règlement...":"Régler mon acompte en ligne (CB) →"}</button></div></form>{generated&&<div className="rounded-2xl border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] p-4 text-sm text-center">{t({fr:"Devis PDF généré avec succès ✓",en:"PDF quote generated successfully ✓",vi:"Đã tạo báo giá PDF thành công ✓",ar:"تم إنشاء عرض السعر PDF بنجاح ✓",ru:"Смета PDF успешно создана ✓"})}</div>}{sendMessage&&<div aria-live="polite" className="rounded-xl border xr-line bg-[var(--xr-surface)] p-3 text-center text-[9px] xr-muted">{sendMessage}</div>}<button type="button" onClick={reset} className="mx-auto flex items-center gap-2 label-mono text-[7px] xr-muted-2"><span>↺</span> Recommencer</button></div>}
            </div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}