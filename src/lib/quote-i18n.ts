import type { Lang } from "./i18n";

export type MultiLang = Record<Lang, string>;

export interface LocalizedChoice {
  id: string;
  label: MultiLang;
  detail: MultiLang;
}

export interface LocalizedSector extends LocalizedChoice {
  goals: MultiLang[];
}

export const SECTORS_DATA: LocalizedSector[] = [
  {
    id: "restaurant",
    label: { fr: "Restaurant · café · bar", en: "Restaurant · Café · Bar", vi: "Nhà hàng · Quán café · Bar", ar: "مطعم · مقهى · بار", ru: "Ресторан · кафе · бар" },
    detail: {
      fr: "Restaurants, cafés, rooftops, bars et concepts food",
      en: "Restaurants, cafés, rooftops, bars and food concepts",
      vi: "Nhà hàng, quán cà phê, rooftop, bar và mô hình ẩm thực",
      ar: "المطاعم والمقاهي والأماكن المطلة والبارات ومفاهيم الأغذية",
      ru: "Рестораны, кофейни, руфтопы, бары и гастрономические концепции"
    },
    goals: [
      { fr: "Augmenter les réservations", en: "Increase table bookings", vi: "Tăng lượng đặt bàn", ar: "زيادة الحجوزات", ru: "Увеличить число бронирований" },
      { fr: "Être trouvé localement", en: "Be found locally on Google", vi: "Dễ dàng tìm thấy tại địa phương", ar: "الظهور محليًا في نتائج البحث", ru: "Быть на первых позициях на картах" },
      { fr: "Monter en gamme", en: "Elevate brand positioning", vi: "Nâng tầm thương hiệu cao cấp", ar: "الارتقاء بمستوى العلامة", ru: "Повысить статус и чек заведения" },
    ]
  },
  {
    id: "hospitality",
    label: { fr: "Hôtel · villa · resort", en: "Hotel · Villa · Resort", vi: "Khách sạn · Villa · Resort", ar: "فندق · فيلا · منتجع", ru: "Отель · вилла · курорт" },
    detail: {
      fr: "Hôtels, resorts, villas, maisons d'hôtes et hospitality",
      en: "Hotels, resorts, luxury villas, guest houses and hospitality",
      vi: "Khách sạn, khu nghỉ dưỡng, biệt thự, homestay và lưu trú",
      ar: "الفنادق والمنتجعات والفلل الفاخرة ودور الضيافة",
      ru: "Отели, курорты, премиальные виллы и гостевые дома"
    },
    goals: [
      { fr: "Augmenter les réservations", en: "Drive direct bookings", vi: "Tăng đặt phòng trực tiếp", ar: "زيادة الحجوزات المباشرة", ru: "Увеличить прямые бронирования" },
      { fr: "Attirer une clientèle internationale", en: "Attract international clients", vi: "Thu hút khách quốc tế", ar: "استقطاب عملاء دوليين", ru: "Привлечь международных гостей" },
      { fr: "Améliorer la visibilité", en: "Enhance global visibility", vi: "Nâng cao độ nhận diện toàn cầu", ar: "تحسين الظهور الرقمي", ru: "Усилить узнаваемость бренда" },
    ]
  },
  {
    id: "realestate",
    label: { fr: "Immobilier · location", en: "Real Estate · Luxury Rental", vi: "Bất động sản · Cho thuê cao cấp", ar: "العقارات · الإيجار الفاخر", ru: "Недвижимость · аренда" },
    detail: {
      fr: "Agences, promoteurs, biens premium et location",
      en: "Agencies, developers, luxury properties and rentals",
      vi: "Sàn giao dịch, chủ đầu tư, bất động sản cao cấp và cho thuê",
      ar: "الوكالات والمطورون والعقارات الفاخرة والتأجير",
      ru: "Агентства, девелоперы, элитная недвижимость и аренда"
    },
    goals: [
      { fr: "Générer plus de demandes", en: "Generate qualified buyer leads", vi: "Thu hút thêm nhiều khách hàng tiềm năng", ar: "توليد المزيد من طلبات الشراء المؤهلة", ru: "Получать больше заявок от покупателей" },
      { fr: "Valoriser les biens", en: "Showcase prestigious assets", vi: "Tôn vinh giá trị bất động sản", ar: "إبراز قيمة العقارات الفاخرة", ru: "Подчеркнуть эксклюзивность объектов" },
      { fr: "Attirer une clientèle premium", en: "Attract high-net-worth clients", vi: "Tiếp cận tệp khách hàng thượng lưu", ar: "استقطاب عملاء ذوي ملاءة مالية عالية", ru: "Привлечь премиальную аудиторию" },
    ]
  },
  {
    id: "automotive",
    label: { fr: "Automobile · mobilité", en: "Automotive · Mobility", vi: "Ô tô · Phương tiện di chuyển", ar: "السيارات · النقل الفاخر", ru: "Автомобили · мобильность" },
    detail: {
      fr: "Concessions, garages premium, location et mobilité",
      en: "Dealerships, premium workshops, exotic rentals and mobility",
      vi: "Đại lý, garage cao cấp, cho thuê xe sang và phương tiện",
      ar: "المعارض والورش المتميزة وتأجير السيارات الفارهة",
      ru: "Автосалоны, детейлинг, аренда премиум-авто и тюнинг"
    },
    goals: [
      { fr: "Générer des demandes qualifiées", en: "Generate qualified test drives & inquiries", vi: "Thu thập yêu cầu lái thử và mua xe", ar: "توليد طلبات شراء واستفسارات مؤهلة", ru: "Получать квалифицированные лиды" },
      { fr: "Valoriser les véhicules", en: "Highlight vehicle inventory in HD", vi: "Trình diễn danh mục xe ấn tượng", ar: "إبراز أسطول السيارات بأعلى دقة", ru: "Эффектно презентовать автопарк" },
      { fr: "Développer la visibilité locale", en: "Dominate local search rankings", vi: "Phát triển độ nhận diện địa phương", ar: "تعزيز الظهور المحلي في منطقتك", ru: "Занять топ в локальном поиске" },
    ]
  },
  {
    id: "fashion",
    label: { fr: "Mode · accessoires", en: "Fashion · Accessories", vi: "Thời trang · Phụ kiện", ar: "الأزياء · الإكسسوارات", ru: "Мода · аксессуары" },
    detail: {
      fr: "Mode, prêt-à-porter, maroquinerie et accessoires",
      en: "Fashion, ready-to-wear, leather goods and accessories",
      vi: "Thời trang, may mặc cao cấp, đồ da và phụ kiện",
      ar: "الأزياء والملابس الجاهزة والمنتجات الجلدية والإكسسوارات",
      ru: "Мода, prêt-à-porter, кожаные изделия и аксессуары"
    },
    goals: [
      { fr: "Renforcer l'image de marque", en: "Strengthen high-fashion brand aura", vi: "Khẳng định bản sắc thương hiệu", ar: "تعزيز هيبة العلامة التجارية", ru: "Укрепить премиальный имидж бренда" },
      { fr: "Vendre davantage", en: "Boost e-commerce conversion rates", vi: "Gia tăng doanh số bán hàng online", ar: "زيادة مبيعات المتجر الإلكتروني", ru: "Увеличить онлайн-продажи" },
      { fr: "Développer une audience internationale", en: "Grow an engaged global audience", vi: "Mở rộng tệp khách hàng quốc tế", ar: "بناء قاعدة عملاء عالمية", ru: "Выйти на международную аудиторию" },
    ]
  },
  {
    id: "jewelry",
    label: { fr: "Joaillerie · horlogerie", en: "Jewelry · Timepieces", vi: "Trang sức · Đồng hồ cao cấp", ar: "المجوهرات · الساعات الفاخرة", ru: "Ювелирные изделия · часы" },
    detail: {
      fr: "Bijoux, montres, maisons et pièces d'exception",
      en: "Jewelry, luxury watches, ateliers and bespoke craftsmanship",
      vi: "Trang sức, đồng hồ xa xỉ, xưởng chế tác thủ công tinh hoa",
      ar: "المجوهرات والساعات الفاخرة ودور الصياغة الاستثنائية",
      ru: "Ювелирные дома, элитные часы и штучные шедевры"
    },
    goals: [
      { fr: "Renforcer le positionnement premium", en: "Elevate ultra-luxury positioning", vi: "Khẳng định vị thế xa xỉ đỉnh cao", ar: "ترسيخ المكانة الفاخرة والاستثنائية", ru: "Подчеркнуть статус высокой роскоши" },
      { fr: "Générer des demandes", en: "Generate private VIP consultation bookings", vi: "Tạo các buổi hẹn tư vấn riêng tư", ar: "توليد مواعيد استشارة خاصة لكبار الشخصيات", ru: "Привлечь VIP-запросы на консультации" },
      { fr: "Créer une présence internationale", en: "Establish a prestigious global presence", vi: "Xây dựng hiện diện toàn cầu đẳng cấp", ar: "بناء حضور دولي مرموق", ru: "Создать безупречный международный статус" },
    ]
  },
  {
    id: "beauty",
    label: { fr: "Beauté · esthétique · spa", en: "Beauty · Aesthetics · Spa", vi: "Làm đẹp · Thẩm mỹ · Spa", ar: "الجمال · التجميل · السبا", ru: "Красота · эстетика · спа" },
    detail: {
      fr: "Instituts, spas, cliniques esthétiques et bien-être",
      en: "Institutes, day spas, aesthetic clinics and wellness centers",
      vi: "Thẩm mỹ viện, spa, viện chăm sóc sức khỏe & sắc đẹp",
      ar: "المراكز والعيادات التجميلية ومنتجعات الاستجمام والعناية",
      ru: "Институты красоты, спа, косметологические клиники"
    },
    goals: [
      { fr: "Générer des rendez-vous", en: "Drive online appointment bookings", vi: "Thúc đẩy lịch hẹn trực tuyến", ar: "زيادة حجوزات المواعيد عبر الإنترنت", ru: "Увеличить запись на процедуры" },
      { fr: "Être trouvé localement", en: "Dominate Google Maps local search", vi: "Chiếm lĩnh top tìm kiếm địa phương", ar: "التصدر في خرائط Google محليًا", ru: "Занять топ-1 на картах района" },
      { fr: "Professionnaliser l'image", en: "Project clinical excellence and luxury feel", vi: "Chuyên nghiệp hóa hình ảnh thương hiệu", ar: "إضفاء طابع احترافي وفائق الفخامة", ru: "Создать образ премиального эксперта" },
    ]
  },
  {
    id: "health",
    label: { fr: "Santé · médical", en: "Healthcare · Medical", vi: "Y tế · Sức khỏe", ar: "الصحة · الطب الخاص", ru: "Здоровье · медицина" },
    detail: {
      fr: "Cliniques, cabinets, spécialistes et santé privée",
      en: "Clinics, private practices, specialists and healthcare",
      vi: "Phòng khám tư nhân, bác sĩ chuyên khoa và chăm sóc sức khỏe",
      ar: "العيادات الخاصة والمراكز التخصصية والخدمات الطبية",
      ru: "Клиники, частные медицинские центры, специалисты"
    },
    goals: [
      { fr: "Générer des prises de rendez-vous", en: "Facilitate patient appointment bookings", vi: "Đơn giản hóa việc đặt lịch khám", ar: "تسهيل حجز المواعيد للمرضى", ru: "Упростить запись пациентов" },
      { fr: "Gagner en confiance", en: "Build patient trust and medical credibility", vi: "Xây dựng niềm tin và uy tín y khoa", ar: "بناء ثقة المرضى والمصداقية المهنية", ru: "Завоевать доверие пациентов" },
      { fr: "Être visible sur Google", en: "Be ranked first for medical queries", vi: "Hiện diện nổi bật trên Google", ar: "الظهور الأول في عمليات البحث الطبية", ru: "Быть первым по ключевым симптомам" },
    ]
  },
  {
    id: "architecture",
    label: { fr: "Architecture · intérieur", en: "Architecture · Interior Design", vi: "Kiến trúc · Thiết kế nội thất", ar: "العمارة · التصميم الداخلي", ru: "Архитектура · интерьеры" },
    detail: {
      fr: "Architectes, architecture intérieure et design d'espace",
      en: "Architects, interior designers and spatial studios",
      vi: "Kiến trúc sư, studio nội thất và thiết kế không gian",
      ar: "المعماريون ومصممو الديكور الداخلي وهندسة الفضاءات",
      ru: "Архитектурные бюро, дизайнеры интерьера, студии"
    },
    goals: [
      { fr: "Montrer les réalisations", en: "Showcase portfolio in editorial quality", vi: "Trình diễn dự án chất lượng xuất bản", ar: "عرض سابقة الأعمال بأعلى جودة بصرية", ru: "Презентовать портфолио как в глянце" },
      { fr: "Attirer des projets premium", en: "Attract high-budget architectural projects", vi: "Thu hút dự án công trình ngân sách lớn", ar: "استقطاب مشاريع معمارية كبرى ومرموقة", ru: "Привлекать масштабные дорогие проекты" },
      { fr: "Développer la visibilité", en: "Expand editorial and industry acclaim", vi: "Gia tăng danh tiếng và nhận diện", ar: "توسيع الشهرة والحضور في القطاع", ru: "Укрепить имя в архитектурной среде" },
    ]
  },
  {
    id: "construction",
    label: { fr: "Construction · rénovation", en: "Construction · Renovation", vi: "Xây dựng · Cải tạo công trình", ar: "البناء · التجديد والمقاولات", ru: "Строительство · ремонт" },
    detail: {
      fr: "Bâtiment, rénovation, artisans et entreprises techniques",
      en: "Construction, premium renovation and technical contractors",
      vi: "Xây dựng, cải tạo cao cấp, nhà thầu kỹ thuật và thủ công",
      ar: "شركات المقاولات والبناء والترميم الفاخر والأعمال الفنية",
      ru: "Строительные компании, элитный ремонт, подрядчики"
    },
    goals: [
      { fr: "Générer des demandes", en: "Generate high-value renovation requests", vi: "Nhận yêu cầu báo giá công trình lớn", ar: "توليد طلبات مشاريع تجديد عالية القيمة", ru: "Получать заявки на крупные сметы" },
      { fr: "Présenter le savoir-faire", en: "Highlight technical mastery & certifications", vi: "Khẳng định tay nghề và năng lực kỹ thuật", ar: "إبراز المهارة الفنية والشهادات المعتمدة", ru: "Показать мастерство и гарантии" },
      { fr: "Être trouvé localement", en: "Rank #1 for regional contracting searches", vi: "Đứng đầu tìm kiếm nhà thầu trong khu vực", ar: "التصدر محلياً لخدمات المقاولات في منطقتك", ru: "Быть лидером в своём регионе" },
    ]
  },
  {
    id: "legal",
    label: { fr: "Avocat · droit · expertise", en: "Law Firm · Legal · Notary", vi: "Luật sư · Pháp lý · Công chứng", ar: "المحاماة · القانون · التوثيق", ru: "Юристы · право · нотариат" },
    detail: {
      fr: "Cabinets juridiques, droit des affaires et professions réglementées",
      en: "Law firms, corporate attorneys and regulated advisors",
      vi: "Văn phòng luật, luật sư doanh nghiệp và tư vấn pháp lý",
      ar: "مكاتب المحاماة والقانون التجاري والمهن النظامية",
      ru: "Юридические коллегии, корпоративное право, нотариусы"
    },
    goals: [
      { fr: "Gagner en crédibilité", en: "Establish unquestioned authority & stature", vi: "Khẳng định uy tín và vị thế vững chắc", ar: "ترسيخ المصداقية والهيبة المهنية", ru: "Подчеркнуть статус и надёжность" },
      { fr: "Obtenir des prospects qualifiés", en: "Attract corporate clients & complex cases", vi: "Tiếp cận khách hàng doanh nghiệp chất lượng", ar: "استقطاب قضايا نوعية وعملاء شركات", ru: "Получать целевых корпоративных клиентов" },
      { fr: "Être visible sur Google", en: "Rank prominently on targeted legal searches", vi: "Hiện diện nổi bật trong tìm kiếm pháp lý", ar: "الظهور الأول في مجالات الاختصاص القانوني", ru: "Занимать первые места по поиску юристов" },
    ]
  },
  {
    id: "finance",
    label: { fr: "Finance · patrimoine · assurance", en: "Finance · Wealth Management", vi: "Tài chính · Quản lý tài sản · Bảo hiểm", ar: "المالية · إدارة الثروات · التأمين", ru: "Финансы · консалтинг · активы" },
    detail: {
      fr: "Finance, gestion de patrimoine, assurance et conseil",
      en: "Wealth management, financial advisory, insurance and family offices",
      vi: "Quản lý gia sản, tư vấn tài chính, bảo hiểm và đầu tư",
      ar: "إدارة الثروات والاستشارات المالية والتأمين والمكاتب العائلية",
      ru: "Управление капиталом, финансовый консалтинг, страхование"
    },
    goals: [
      { fr: "Gagner en confiance", en: "Instill institutional-grade investor trust", vi: "Xây dựng niềm tin tài chính vững vàng", ar: "تعزيز الثقة والأمان الاستثماري المؤسسي", ru: "Сформировать максимальное доверие клиентов" },
      { fr: "Générer des leads", en: "Generate confidential private wealth inquiries", vi: "Thu hút nhà đầu tư tiềm năng", ar: "توليد استفسارات مستثمرين عالية الملاءة", ru: "Привлекать состоятельных инвесторов" },
      { fr: "Structurer l'image de marque", en: "Refine a sophisticated, timeless brand aura", vi: "Định vị thương hiệu tài chính đẳng cấp", ar: "صياغة هوية تجارية رصينة وفاخرة", ru: "Создать безупречный солидный бренд" },
    ]
  },
  {
    id: "commerce",
    label: { fr: "Commerce · e-commerce", en: "Retail · E-commerce", vi: "Bán lẻ · Thương mại điện tử", ar: "التجارة · المتاجر الإلكترونية", ru: "Торговля · e-commerce" },
    detail: {
      fr: "Boutiques, marques, retail, catalogues et vente en ligne",
      en: "Boutiques, direct-to-consumer brands and omnichannel retail",
      vi: "Cửa hàng, thương hiệu bán lẻ, catalogue và bán hàng trực tuyến",
      ar: "المتاجر والعلامات التجارية والبيع بالتجزئة والمتعدد القنوات",
      ru: "Бутики, бренды, ритейл, каталоги и онлайн-продажи"
    },
    goals: [
      { fr: "Vendre davantage", en: "Maximize average order value and checkout conversion", vi: "Tối ưu giá trị đơn hàng và tỷ lệ chuyển đổi", ar: "زيادة حجم المبيعات ومعدل إتمام الشراء", ru: "Увеличить средний чек и конверсию в покупку" },
      { fr: "Améliorer la conversion", en: "Frictionless mobile customer journey", vi: "Trải nghiệm mua hàng mượt mà trên mobile", ar: "تحسين تجربة العميل وإزالة نقاط الاحتكاك", ru: "Устранить трение при заказе на смартфонах" },
      { fr: "Développer la marque", en: "Build a devoted, loyal customer base", vi: "Xây dựng cộng đồng khách hàng trung thành", ar: "بناء ولاء العملاء وتوسيع انتشار العلامة", ru: "Сформировать преданную базу покупателей" },
    ]
  },
  {
    id: "tourism",
    label: { fr: "Voyage · tourisme · expériences", en: "Travel · Tourism · Experiences", vi: "Du lịch · Trải nghiệm khám phá", ar: "السياحة · السفر · التجارب الحصرية", ru: "Туризм · путешествия · впечатления" },
    detail: {
      fr: "Agences, excursions, activités, loisirs et expériences",
      en: "Travel agencies, luxury excursions, private tours and leisure",
      vi: "Công ty lữ hành, tour du lịch cao cấp và trải nghiệm độc đáo",
      ar: "وكالات السفر والجولات الفاخرة والأنشطة الترفيهية الحصرية",
      ru: "Турагентства, премиум-экскурсии, авторские туры"
    },
    goals: [
      { fr: "Augmenter les réservations", en: "Accelerate direct booking volume", vi: "Tăng tỷ lệ đặt tour trực tiếp", ar: "تسريع وتيرة الحجوزات المباشرة", ru: "Нарастить прямые бронирования туров" },
      { fr: "Être trouvé par les touristes", en: "Be discovered by affluent international travelers", vi: "Tiếp cận du khách quốc tế dễ dàng", ar: "الظهور الأول للسياح والمسافرين الدوليين", ru: "Быть первым в поиске для туристов" },
      { fr: "Convertir davantage", en: "Turn lookers into booked travelers with engaging visuals", vi: "Biến khách vãng lai thành khách đặt chỗ", ar: "تحويل متصفحي الموقع إلى حجوزات مؤكدة", ru: "Превращать просмотры в оплаченные брони" },
    ]
  },
  {
    id: "agency",
    label: { fr: "Agence · studio · freelance", en: "Agency · Studio · Freelance", vi: "Agency · Studio sáng tạo · Freelance", ar: "الوكالات · استوديوهات التصميم · المستقلون", ru: "Агентства · студии · эксперты" },
    detail: {
      fr: "Créatifs, marketing, tech, conseil et production",
      en: "Creative studios, marketing agencies, tech consultants and production",
      vi: "Studio sáng tạo, agency tiếp thị, công nghệ và sản xuất",
      ar: "الاستوديوهات الإبداعية ووكالات التسويق واستشارات التقنية",
      ru: "Креативные студии, маркетинг, разработка и продакшн"
    },
    goals: [
      { fr: "Présenter l'expertise", en: "Showcase case studies with prestige", vi: "Trình diễn năng lực và dự án xuất sắc", ar: "عرض دراسات الحالة والخبرات بأعلى احترافية", ru: "Презентовать кейсы на уровне мировых лидеров" },
      { fr: "Générer des leads", en: "Attract prestigious brand collaborations", vi: "Thu hút các hợp đồng thương hiệu lớn", ar: "استقطاب شراكات وعقود مع علامات تجارية رائدة", ru: "Привлекать крупных брендовых заказчиков" },
      { fr: "Monter en gamme", en: "Command significantly higher retainer fees", vi: "Nâng cao định giá dịch vụ và vị thế", ar: "رفع قيمة الخدمات ومستوى التعاقدات", ru: "Обосновать высокий чек за свои услуги" },
    ]
  },
  {
    id: "other",
    label: { fr: "Autre activité", en: "Other Business", vi: "Lĩnh vực khác", ar: "نشاط آخر", ru: "Другая сфера" },
    detail: {
      fr: "Votre activité ne figure pas ici ? XR Quote Studio s'adapte.",
      en: "Your specific business isn't listed? XR Quote Studio adapts.",
      vi: "Ngành nghề của bạn chưa có ở đây? XR Quote Studio tự điều chỉnh linh hoạt.",
      ar: "نشاطك غير مدرج هنا؟ يتكيف XR Quote Studio مع متطلباتك بدقة.",
      ru: "Вашей сферы нет в списке? XR Quote Studio подстроится под задачу."
    },
    goals: [
      { fr: "Développer mon activité", en: "Accelerate overall business growth", vi: "Phát triển quy mô kinh doanh", ar: "تسريع نمو وتوسع النشاط التجاري", ru: "Масштабировать бизнес" },
      { fr: "Professionnaliser mon image", en: "Modernize and professionalize brand perception", vi: "Chuyên nghiệp hóa hình ảnh thương hiệu", ar: "إضفاء مظهر احترافي ومميز على علامتك", ru: "Вывести имидж на профессиональный уровень" },
      { fr: "Construire une présence forte", en: "Build a dominant, authoritative online presence", vi: "Xây dựng sự hiện diện số vững mạnh", ar: "بناء حضور رقمي قوي ومؤثر", ru: "Создать мощное цифровое присутствие" },
    ]
  },
];

export const SERVICES_DATA: LocalizedChoice[] = [
  {
    id: "website",
    label: { fr: "Site web", en: "Website", vi: "Website", ar: "موقع إلكتروني", ru: "Веб-сайт" },
    detail: { fr: "Vitrine, Business, e-commerce ou réservation", en: "Showcase, Business, e-commerce or booking platform", vi: "Giới thiệu, Doanh nghiệp, thương mại điện tử hoặc đặt chỗ", ar: "تعريفي، أعمال، تجارة إلكترونية أو منصة حجز", ru: "Визитка, бизнес-сайт, e-commerce или модуль бронирования" }
  },
  {
    id: "branding",
    label: { fr: "Branding", en: "Branding", vi: "Bộ nhận diện", ar: "الهوية البصرية", ru: "Брендинг" },
    detail: { fr: "Logo, identité, direction artistique et univers", en: "Logo, identity, art direction and brand universe", vi: "Logo, bộ nhận diện, định hướng nghệ thuật và phong cách", ar: "شعار وهوية متكاملة وتوجيه فني وعالم العلامة", ru: "Логотип, айдентика, арт-дирекшн и брендбук" }
  },
  {
    id: "seo",
    label: { fr: "SEO", en: "SEO", vi: "SEO", ar: "تحسين محركات البحث SEO", ru: "SEO" },
    detail: { fr: "Positionnement organique et acquisition Google", en: "Organic rankings and sustained Google acquisition", vi: "Thứ hạng tự nhiên và lượng truy cập từ Google", ar: "تصدر النتائج المجانية والاستقطاب عبر Google", ru: "Органический трафик и вывод в топ Google" }
  },
  {
    id: "maps",
    label: { fr: "Google Maps", en: "Google Maps", vi: "Google Maps", ar: "خرائط Google Maps", ru: "Google Карты" },
    detail: { fr: "Fiche locale, visibilité et optimisation locale", en: "Local Pack top 3, local SEO and reputation setup", vi: "Tối ưu hồ sơ địa phương, vị trí top 3 và đánh giá", ar: "التواجد المحلي، الظهور في أفضل 3 وتحسين التقييمات", ru: "Топ-3 в Local Pack, карточка компании и отзывы" }
  },
  {
    id: "ads",
    label: { fr: "Google Ads", en: "Google Ads", vi: "Google Ads", ar: "إعلانات Google Ads", ru: "Google Реклама" },
    detail: { fr: "Campagnes sponsorisées et acquisition payante", en: "High-ROI sponsored search and paid acquisition", vi: "Chiến dịch quảng cáo tìm kiếm trả phí chuyển đổi cao", ar: "حملات إعلانية ممولة واستقطاب مباشر عالي العائد", ru: "Контекстная реклама и платный целевой трафик" }
  },
  {
    id: "social",
    label: { fr: "Social Media", en: "Social Media", vi: "Mạng xã hội", ar: "شبكات التواصل الاجتماعي", ru: "SMM" },
    detail: { fr: "Stratégie, contenus et animation des réseaux", en: "Strategy, high-end content and community growth", vi: "Chiến lược, nội dung cao cấp và quản lý mạng xã hội", ar: "استراتيجية وصناعة محتوى فاخر وإدارة المنصات", ru: "Стратегия, премиальный контент и ведение сетей" }
  },
  {
    id: "content",
    label: { fr: "Contenu · photo · vidéo", en: "Content · Photo · Video", vi: "Nội dung · Chụp ảnh · Video", ar: "المحتوى · التصوير · الفيديو", ru: "Контент · фото · видео" },
    detail: { fr: "Direction de contenu, visuels et formats de campagne", en: "Art direction, cinematic visuals and campaign production", vi: "Chỉ đạo nội dung, hình ảnh điện ảnh và video chiến dịch", ar: "إدارة المحتوى وإنتاج لقطات سينمائية وفيديوهات ترويجية", ru: "Арт-дирекшн, фотосессии и рекламные видеоролики" }
  },
  {
    id: "conversion",
    label: { fr: "Conversion & parcours", en: "Conversion & UX", vi: "Chuyển đổi & Trải nghiệm", ar: "التحويل وتجربة المستخدم", ru: "Конверсия и UX" },
    detail: { fr: "UX, landing pages, CTA et optimisation commerciale", en: "UX auditing, high-converting landing pages and CRO", vi: "Kiểm toán UX, trang đích chuyển đổi và tối ưu bán hàng", ar: "تدقيق التجربة وصفحات الهبوط وتحسين مسار الشراء", ru: "UX-аудит, продающие посадочные страницы и CRO" }
  },
  {
    id: "maintenance",
    label: { fr: "WebCare", en: "WebCare", vi: "WebCare", ar: "خدمة WebCare", ru: "WebCare" },
    detail: { fr: "Corrections, évolutions et suivi du site", en: "Continuous updates, security, speed and technical care", vi: "Cập nhật liên tục, bảo mật, tốc độ và hỗ trợ kỹ thuật", ar: "تحديثات دورية وحماية وأداء فائق ودعم فني", ru: "Обновления, безопасность, скорость и поддержка сайта" }
  },
  {
    id: "robotics",
    label: { fr: "Robotique & IA", en: "Robotics & AI", vi: "Robot & AI", ar: "الروبوتات والذكاء الاصطناعي", ru: "Робототехника и ИИ" },
    detail: { fr: "Robots de service, location, achat et intégration", en: "Service robots, rental, acquisition and software setup", vi: "Robot dịch vụ, thuê, mua và tích hợp phần mềm thông minh", ar: "روبوتات الخدمة، إيجار وشراء وبرمجة متكاملة", ru: "Сервисные роботы, аренда, покупка и интеграция" }
  },
];

export const SITUATIONS_DATA: LocalizedChoice[] = [
  {
    id: "none",
    label: { fr: "Pas encore de site", en: "No website yet", vi: "Chưa có website", ar: "لا يوجد موقع حتى الآن", ru: "Сайта пока нет" },
    detail: { fr: "Créer un socle digital propre dès le départ", en: "Build a pristine digital foundation from day one", vi: "Xây dựng nền tảng số chuẩn chỉnh ngay từ đầu", ar: "بناء أساس رقمي متين واحترافي منذ البداية", ru: "Создать правильную цифровую базу с нуля" }
  },
  {
    id: "existing",
    label: { fr: "J'ai déjà un site", en: "I already have a website", vi: "Đã có website", ar: "لدي موقع حالياً", ru: "Уже есть сайт" },
    detail: { fr: "Le conserver et l'améliorer", en: "Retain current site and upgrade performance & design", vi: "Giữ nguyên và nâng cấp hiệu năng cùng giao diện", ar: "الاحتفاظ به وتطوير أدائه وتصميمه", ru: "Сохранить его и качественно улучшить" }
  },
  {
    id: "redesign",
    label: { fr: "Mon site doit être refait", en: "My site needs a full redesign", vi: "Website cần làm lại toàn bộ", ar: "الموقع يحتاج إلى إعادة تصميم كاملة", ru: "Требуется полный редизайн" },
    detail: { fr: "Design, structure, mobile ou conversion à revoir", en: "Design, architecture, mobile responsiveness or conversion overhaul", vi: "Cần cải tổ giao diện, cấu trúc, mobile hoặc chuyển đổi", ar: "تحديث التصميم والبنية والتوافق مع الجوال والتحويل", ru: "Устарели дизайн, структура, мобильная версия или конверсия" }
  },
  {
    id: "outdated",
    label: { fr: "Il fonctionne mais il est daté", en: "It works, but feels outdated", vi: "Vẫn hoạt động nhưng đã cũ kỹ", ar: "يعمل بشكل جيد لكنه قديم الطراز", ru: "Работает, но морально устарел" },
    detail: { fr: "Moderniser sans repartir de zéro", en: "Modernize visually and technically without starting over", vi: "Hiện đại hóa mà không cần làm lại từ đầu", ar: "تحديث المظهر والتقنيات دون البدء من الصفر", ru: "Осовременить без необходимости начинать с нуля" }
  },
  {
    id: "invisible",
    label: { fr: "J'ai peu de visibilité", en: "I have very low visibility", vi: "Rất ít người biết đến", ar: "الظهور ضعيف جداً على الإنترنت", ru: "Мало посетителей и видимости" },
    detail: { fr: "Le problème est surtout l'acquisition", en: "The main bottleneck is search ranking & traffic acquisition", vi: "Khó khăn chính là tiếp cận và thu hút khách hàng", ar: "العائق الأكبر يكمن في استقطاب الزوار والترتيب في البحث", ru: "Основная проблема — привлечение целевого трафика" }
  },
  {
    id: "selling",
    label: { fr: "Je vends / prends des réservations", en: "I sell products / take bookings", vi: "Tôi bán hàng / nhận đặt lịch", ar: "أبيع منتجات أو أستقبل حجوزات", ru: "Продажи / приём бронирований" },
    detail: { fr: "Catalogue, paiement, réservation ou rendez-vous", en: "Catalog, secure checkout, booking flow or appointments", vi: "Danh mục sản phẩm, thanh toán trực tuyến hoặc lịch hẹn", ar: "كتالوج إلكتروني ودفع آمن وحجز مواعيد", ru: "Каталог товаров, оплата картой или модуль записи" }
  },
  {
    id: "international",
    label: { fr: "Je vise l'international", en: "I am targeting international clients", vi: "Mục tiêu vươn ra quốc tế", ar: "أستهدف أسواقاً وعملاء دوليين", ru: "Выход на зарубежные рынки" },
    detail: { fr: "Langues, image premium et acquisition internationale", en: "Multilingual setup, luxury international aura and global SEO", vi: "Đa ngôn ngữ, hình ảnh chuẩn quốc tế và SEO toàn cầu", ar: "موقع متعدد اللغات ومظهر فاخر واستقطاب عالمي", ru: "Мультиязычность, международный статус и глобальное SEO" }
  },
  {
    id: "launch",
    label: { fr: "Je lance une nouvelle activité", en: "Launching a brand new venture", vi: "Khởi động dự án / kinh doanh mới", ar: "أطلق نشاطاً تجارياً جديداً", ru: "Запуск нового бизнеса" },
    detail: { fr: "Construire l'offre et la présence dès le départ", en: "Shape the offer, branding and market footprint from inception", vi: "Định hình sản phẩm, thương hiệu và hiện diện ngay từ đầu", ar: "بناء العرض والهوية والظهور الرقمي من الصفر", ru: "Сформировать позиционирование и запуск с первых дней" }
  },
];

export const BUDGETS_DATA: LocalizedChoice[] = [
  {
    id: "under500",
    label: { fr: "Moins de 500 €", en: "Under €500", vi: "Dưới 500 €", ar: "أقل من 500 €", ru: "До 500 €" },
    detail: { fr: "Un levier prioritaire ciblé", en: "One focused, high-impact priority lever", vi: "Một đòn bẩy trọng tâm hiệu quả cao", ar: "أداة تركيز ذات تأثير فوري", ru: "Один точечный ключевой инструмент" }
  },
  {
    id: "500_1000",
    label: { fr: "500 – 1 000 €", en: "€500 – €1,000", vi: "500 – 1.000 €", ar: "500 – 1,000 €", ru: "500 – 1 000 €" },
    detail: { fr: "Une présence solide et soignée", en: "A robust, polished digital presence", vi: "Sự hiện diện số vững chắc và chỉn chu", ar: "حضور رقمي متين وأنيق", ru: "Уверенное и качественное присутствие" }
  },
  {
    id: "1000_2500",
    label: { fr: "1 000 – 2 500 €", en: "€1,000 – €2,500", vi: "1.000 – 2.500 €", ar: "1,000 – 2,500 €", ru: "1 000 – 2 500 €" },
    detail: { fr: "Un dispositif complet & performant", en: "A comprehensive, high-performance ecosystem", vi: "Hệ sinh thái số hoàn chỉnh và hiệu suất cao", ar: "منظومة رقمية شاملة وعالية الأداء", ru: "Комплексная эффективная система" }
  },
  {
    id: "2500_5000",
    label: { fr: "2 500 – 5 000 €", en: "€2,500 – €5,000", vi: "2.500 – 5.000 €", ar: "2,500 – 5,000 €", ru: "2 500 – 5 000 €" },
    detail: { fr: "Une stratégie structurée et ambitieuse", en: "A structured, ambitious multi-channel strategy", vi: "Chiến lược đa kênh bài bản và bứt phá", ar: "استراتيجية متعددة القنوات طموحة ومدروسة", ru: "Масштабная стратегическая система" }
  },
  {
    id: "5000_plus",
    label: { fr: "5 000 € +", en: "€5,000 +", vi: "Trên 5.000 €", ar: "أكثر من 5,000 €", ru: "От 5 000 €" },
    detail: { fr: "Un projet premium sur mesure sans compromis", en: "An uncompromising, bespoke luxury project", vi: "Dự án thiết kế riêng cao cấp không giới hạn", ar: "مشروع فاخر ومخصص بالكامل دون أي تنازلات", ru: "Индивидуальный премиальный проект без компромиссов" }
  },
];

export const DISCOVERY_DATA: LocalizedChoice[] = [
  {
    id: "google",
    label: { fr: "Google / Maps", en: "Google / Maps", vi: "Google / Maps", ar: "Google / خرائط Maps", ru: "Google / Карты" },
    detail: { fr: "Recherche, SEO ou visibilité locale", en: "Organic search, Local SEO and Google Maps", vi: "Tìm kiếm tự nhiên, SEO địa phương và Google Maps", ar: "البحث العضوي، SEO المحلي وخرائط Google", ru: "Органический поиск, локальное SEO и карты" }
  },
  {
    id: "social",
    label: { fr: "Instagram / Facebook / TikTok", en: "Instagram / Facebook / TikTok", vi: "Instagram / Facebook / TikTok", ar: "إنستغرام / فيسبوك / تيك توك", ru: "Instagram / Facebook / TikTok" },
    detail: { fr: "Réseaux sociaux et recommandations", en: "Social media visual feeds, influencers & recommendations", vi: "Kênh mạng xã hội, hình ảnh và đề xuất", ar: "شبكات التواصل والتوصيات والمحتوى المرئي", ru: "Социальные сети, визуальный контент и рекомендации" }
  },
  {
    id: "referral",
    label: { fr: "Bouche-à-oreille", en: "Word of Mouth", vi: "Truyền miệng", ar: "التوصيات الشفهية", ru: "Сарафанное радио" },
    detail: { fr: "Recommandations et réseau direct", en: "Client referrals, personal network and reputation", vi: "Giới thiệu từ khách quen và mối quan hệ trực tiếp", ar: "توصيات العملاء والمعارف والشبكة المباشرة", ru: "Рекомендации клиентов и деловые связи" }
  },
  {
    id: "mixed",
    label: { fr: "Un peu de tout", en: "Multi-channel mix", vi: "Kết hợp nhiều kênh", ar: "مزيج متنوع", ru: "Все каналы понемногу" },
    detail: { fr: "Acquisition déjà diversifiée", en: "Diversified existing acquisition channels", vi: "Các nguồn tiếp cận đã được đa dạng hóa", ar: "قنوات استقطاب متنوعة وقائمة بالفعل", ru: "Диверсифицированные источники клиентов" }
  },
];

export const ALEXANDRE_MESSAGES: Record<number, MultiLang> = {
  0: {
    fr: "Bonjour ! Je suis Alexandre. Je vais vous guider pour construire un projet adapté à votre activité.",
    en: "Hello! I am Alexandre. I will guide you to build a project tailored to your business.",
    vi: "Xin chào! Tôi là Alexandre. Tôi sẽ hướng dẫn bạn xây dựng giải pháp phù hợp nhất với ngành nghề của bạn.",
    ar: "مرحبًا! أنا ألكسندر. سأرشدك لبناء مشروع يناسب نشاطك بدقة.",
    ru: "Здравствуйте! Я Александр. Я помогу вам сформировать проект, точно адаптированный под ваш бизнес."
  },
  1: {
    fr: "Quel résultat compte le plus pour vous ? Je m’en servirai pour prioriser les bonnes actions.",
    en: "Which result matters most to you? I will use this to prioritize the right actions.",
    vi: "Mục tiêu nào quan trọng nhất với bạn? Tôi sẽ dựa vào đó để ưu tiên các giải pháp phù hợp.",
    ar: "ما هي النتيجة الأهم بالنسبة لك؟ سأعتمد عليها لترتيب أولويات العمل.",
    ru: "Какой результат для вас важнее всего? Я использую это для расстановки приоритетов."
  },
  2: {
    fr: "Je prends en compte votre situation actuelle pour éviter de vous proposer des solutions inutiles.",
    en: "I take into account your current situation to avoid proposing unnecessary solutions.",
    vi: "Tôi xem xét tình trạng hiện tại để tránh đề xuất những giải pháp không cần thiết.",
    ar: "آخذ وضعك الحالي في الحسبان لتجنب اقتراح حلول لا تحتاج إليها.",
    ru: "Я учитываю вашу текущую ситуацию, чтобы исключить лишние и ненужные решения."
  },
  3: {
    fr: "Parlons budget : je vais ajuster le périmètre à votre investissement envisagé.",
    en: "Let's talk budget: I will tailor the project scope to your planned investment.",
    vi: "Về ngân sách: tôi sẽ điều chỉnh phạm vi dự án tương ứng với mức đầu tư dự kiến.",
    ar: "لنتحدث عن الميزانية: سأقوم بضبط نطاق العمل ليناسب استثمارك المرصود.",
    ru: "Поговорим о бюджете: я адаптирую объём работ под запланированные инвестиции."
  },
  4: {
    fr: "Je prépare une combinaison de services cohérente. Vous gardez le contrôle de chaque choix.",
    en: "I prepare a coherent combination of services. You remain in full control of every choice.",
    vi: "Tôi kết hợp các dịch vụ liền mạch với nhau. Bạn hoàn toàn làm chủ mọi lựa chọn.",
    ar: "أقوم بإعداد مزيج متناسق من الخدمات مع إبقاء التحكم الكامل بيدك في كل اختيار.",
    ru: "Я формирую сбалансированный комплекс услуг. Вы сохраняете полный контроль над каждым выбором."
  },
  5: {
    fr: "Dernière question sur votre acquisition : elle m’aide à identifier les leviers les plus pertinents.",
    en: "One last question about customer acquisition: this helps identify the most effective levers.",
    vi: "Câu hỏi cuối về cách thu hút khách hàng: giúp xác định đòn bẩy hiệu quả nhất.",
    ar: "سؤال أخير حول استقطاب العملاء: يساعدني في تحديد أقوى القنوات فاعلية.",
    ru: "Последний вопрос об источниках клиентов: это поможет выявить самые действенные рычаги."
  },
  6: {
    fr: "Je croise vos réponses pour vous présenter une recommandation personnalisée et transparente.",
    en: "I analyze your answers to provide a transparent, customized recommendation.",
    vi: "Tôi tổng hợp các câu trả lời để đưa ra khuyến nghị minh bạch và phù hợp nhất.",
    ar: "أقوم بمطابقة إجاباتك لأقدم لك توصية شفافة ومخصصة تمامًا.",
    ru: "Я объединяю ваши ответы, чтобы представить прозрачную персональную рекомендацию."
  },
  7: {
    fr: "Votre brief est prêt. Ajoutez vos coordonnées pour recevoir la proposition détaillée.",
    en: "Your project brief is ready. Add your details to receive the comprehensive proposal.",
    vi: "Bản tóm tắt dự án đã sẵn sàng. Hãy điền thông tin để nhận bản đề xuất chi tiết.",
    ar: "ملف مشروعك جاهز. أضف بيانات الاتصال لاستلام المقترح المفصل.",
    ru: "Ваш бриф готов. Укажите контакты, чтобы получить подробное коммерческое предложение."
  }
};

export const STEP_TITLES: Record<number, MultiLang> = {
  0: { fr: "Votre activité", en: "Your industry", vi: "Lĩnh vực hoạt động", ar: "مجال نشاطك", ru: "Ваша сфера деятельности" },
  1: { fr: "Votre priorité", en: "Your priority", vi: "Ưu tiên hàng đầu", ar: "أولويتك الرئيسية", ru: "Ваш приоритет" },
  2: { fr: "Votre situation aujourd'hui", en: "Your current situation", vi: "Tình trạng hiện tại", ar: "وضعك الحالي", ru: "Текущая ситуация" },
  3: { fr: "L'investissement envisagé", en: "Planned investment", vi: "Ngân sách dự kiến", ar: "الاستثمار المتوقع", ru: "Планируемые инвестиции" },
  4: { fr: "Les prestations à activer", en: "Services to activate", vi: "Dịch vụ cần triển khai", ar: "الخدمات المراد تفعيلها", ru: "Услуги для подключения" },
  5: { fr: "Comment vos clients vous trouvent", en: "How customers find you", vi: "Cách khách hàng biết đến bạn", ar: "كيف يجدك عملاؤك", ru: "Как вас находят клиенты" },
  6: { fr: "Votre recommandation", en: "Your recommendation", vi: "Đề xuất dành riêng cho bạn", ar: "توصيتك المخصصة", ru: "Ваша рекомендация" },
  7: { fr: "Vos informations", en: "Your information", vi: "Thông tin liên hệ", ar: "معلوماتك", ru: "Ваши контактные данные" },
};

export const STEP_SUBTITLES: Record<number, MultiLang> = {
  0: { fr: "On commence simplement : quel est votre univers ?", en: "Let's start simply: what is your business field?", vi: "Bắt đầu đơn giản: lĩnh vực của bạn là gì?", ar: "نبدأ ببساطة: ما هو مجال عملك؟", ru: "Начнём с простого: в какой сфере вы работаете?" },
  1: { fr: "Qu’aimeriez-vous améliorer en premier ?", en: "What would you like to improve first?", vi: "Bạn muốn cải thiện điều gì đầu tiên?", ar: "ما الذي ترغب في تحسينه أولاً؟", ru: "Что вы хотите улучшить в первую очередь?" },
  2: { fr: "Où en êtes-vous aujourd’hui ?", en: "Where do you stand today?", vi: "Hiện trạng của bạn ra sao?", ar: "أين تقف اليوم؟", ru: "Какова ваша ситуация на сегодняшний день?" },
  3: { fr: "On adapte la proposition à votre investissement.", en: "We adjust the proposal to your investment.", vi: "Chúng tôi điều chỉnh đề xuất theo mức đầu tư của bạn.", ar: "نوفّق المقترح مع استثمارك المستهدف.", ru: "Мы адаптируем предложение под ваши инвестиции." },
  4: { fr: "Composez votre équipe digitale à la carte.", en: "Build your digital team à la carte.", vi: "Tùy chọn dịch vụ kỹ thuật số theo nhu cầu.", ar: "شكّل فريقك الرقمي حسب رغبتك.", ru: "Соберите индивидуальный цифровой стек." },
  5: { fr: "Comment les clients vous découvrent-ils ?", en: "How do clients discover you today?", vi: "Khách hàng hiện tìm thấy bạn qua đâu?", ar: "كيف يكتشفك العملاء اليوم؟", ru: "Как клиенты узнают о вас сейчас?" },
  6: { fr: "Voici une piste claire, avec les coûts détaillés.", en: "Here is a clear path with detailed costs.", vi: "Đây là lộ trình rõ ràng cùng chi phí chi tiết.", ar: "إليك مساراً واضحاً مع تفاصيل التكاليف.", ru: "Вот понятный план с детализацией стоимости." },
  7: { fr: "Encore quelques coordonnées pour finaliser votre brief.", en: "A few contact details to finalize your brief.", vi: "Thêm vài thông tin để hoàn tất bản brief.", ar: "بعض التفاصيل الإضافية لإتمام ملفك.", ru: "Ещё пара контактов для завершения брифа." },
};

export const QUOTE_UI = {
  kicker: {
    fr: "XR QUOTE STUDIO · DEVIS SUR MESURE",
    en: "XR QUOTE STUDIO · TAILORED QUOTE",
    vi: "XR QUOTE STUDIO · BÁO GIÁ RIÊNG",
    ar: "XR QUOTE STUDIO · عرض سعر مخصص",
    ru: "XR QUOTE STUDIO · ИНДИВИДУАЛЬНАЯ СМЕТА"
  },
  title1: {
    fr: "Construisons votre",
    en: "Let's build your",
    vi: "Cùng xây dựng",
    ar: "لنبنِ",
    ru: "Построим ваш"
  },
  titleAccent: {
    fr: "projet",
    en: "project",
    vi: "dự án",
    ar: "مشروعك",
    ru: "проект"
  },
  title2: {
    fr: ", étape par étape.",
    en: ", step by step.",
    vi: ", từng bước một.",
    ar: "، خطوة بخطوة.",
    ru: " шаг за шагом."
  },
  lead: {
    fr: "Répondez à quelques questions : votre conseiller vous aide à définir les bonnes priorités, à composer votre dispositif digital et à préparer une proposition cohérente avec votre budget.",
    en: "Answer a few questions: your advisor helps you define the right priorities, build your digital setup, and prepare a proposal aligned with your budget.",
    vi: "Trả lời vài câu hỏi: cố vấn sẽ giúp bạn xác định ưu tiên, thiết lập hệ thống số và chuẩn bị phương án phù hợp với ngân sách.",
    ar: "أجب عن بعض الأسئلة: يساعدك مستشارك في تحديد الأولويات الصحيحة وبناء منظومتك الرقمية وإعداد مقترح يتماشى مع ميزانيتك.",
    ru: "Ответьте на несколько вопросов: ваш консультант поможет расставить приоритеты, собрать цифровой комплекс и подготовить смету под ваш бюджет."
  },
  advisorTitle: {
    fr: "VOTRE CONSEILLER DIGITAL",
    en: "YOUR DIGITAL ADVISOR",
    vi: "CỐ VẤN KỸ THUẬT SỐ",
    ar: "مستشارك الرقمي",
    ru: "ВАШ ЦИФРОВОЙ КОНСУЛЬТАНТ"
  },
  advisorRole: {
    fr: "Directeur Conseil & Associé XR · Paris",
    en: "Advisory Director & XR Partner · Paris",
    vi: "Giám đốc Tư vấn & Đối tác XR · Paris",
    ar: "المدير الاستشاري وشريك XR · باريس",
    ru: "Управляющий партнёр и директор XR · Париж"
  },
  advisorLiveBadge: {
    fr: "PARIS · EN DIRECT",
    en: "PARIS · LIVE",
    vi: "PARIS · TRỰC TUYẾN",
    ar: "باريس · بث مباشر",
    ru: "ПАРИЖ · В ЭФИРЕ"
  },
  typingState: {
    fr: "Alexandre analyse vos choix…",
    en: "Alexandre is analyzing your choices…",
    vi: "Alexandre đang phân tích lựa chọn của bạn…",
    ar: "ألكسندر يحلل اختياراتك…",
    ru: "Александр анализирует ваши ответы…"
  },
  online: {
    fr: "EN LIGNE",
    en: "ONLINE",
    vi: "TRỰC TUYẾN",
    ar: "متصل الآن",
    ru: "ОНЛАЙН"
  },
  alexMsg: {
    fr: "MESSAGE D’ALEXANDRE",
    en: "MESSAGE FROM ALEXANDRE",
    vi: "TIN NHẮN TỪ ALEXANDRE",
    ar: "رسالة من ألكسندر",
    ru: "СООБЩЕНИЕ ОТ АЛЕКСАНДРА"
  },
  personalizedSupport: {
    fr: "ACCOMPAGNEMENT PERSONNALISÉ",
    en: "PERSONALIZED GUIDANCE",
    vi: "ĐỒNG HÀNH RIÊNG",
    ar: "مرافقة مخصصة",
    ru: "ПЕРСОНАЛЬНОЕ СОПРОВОЖДЕНИЕ"
  },
  liveEstimate: {
    fr: "ESTIMATION EN DIRECT",
    en: "LIVE ESTIMATE",
    vi: "ƯỚC TÍNH TRỰC TIẾP",
    ar: "تقدير مباشر",
    ru: "ОЦЕНКА В РЕАЛЬНОМ ВРЕМЕНИ"
  },
  stepCount: {
    fr: "ÉTAPES",
    en: "STEPS",
    vi: "BƯỚC",
    ar: "خطوات",
    ru: "ЭТАПОВ"
  },
  stepWord: {
    fr: "ÉTAPE",
    en: "STEP",
    vi: "BƯỚC",
    ar: "الخطوة",
    ru: "ЭТАП"
  },
  lastStretch: {
    fr: "DERNIÈRE LIGNE DROITE",
    en: "FINAL STEP",
    vi: "BƯỚC CUỐI CÙNG",
    ar: "المرحلة النهائية",
    ru: "ФИНАЛЬНЫЙ ЭТАП"
  },
  back: {
    fr: "← Retour",
    en: "← Back",
    vi: "← Quay lại",
    ar: "← رجوع",
    ru: "← Назад"
  },
  continue: {
    fr: "Continuer →",
    en: "Continue →",
    vi: "Tiếp tục →",
    ar: "متابعة →",
    ru: "Продолжить →"
  },
  yourJourney: {
    fr: "VOTRE PARCOURS",
    en: "YOUR JOURNEY",
    vi: "HÀNH TRÌNH",
    ar: "مسارك",
    ru: "ВАШ МАРШРУТ"
  },
  system: {
    fr: "SYSTÈME",
    en: "SYSTEM",
    vi: "HỆ THỐNG",
    ar: "المنظومة",
    ru: "СИСТЕМА"
  },
  activeBricks: {
    fr: "brique(s) active(s)",
    en: "active module(s)",
    vi: "mô-đun đang chọn",
    ar: "وحدة نشطة",
    ru: "активных модуля"
  },
  addedToProject: {
    fr: "✓ AJOUTÉ À VOTRE PROJET",
    en: "✓ ADDED TO YOUR PROJECT",
    vi: "✓ ĐÃ THÊM VÀO DỰ ÁN",
    ar: "✓ أُضيف إلى مشروعك",
    ru: "✓ ДОБАВЛЕНО В ПРОЕКТ"
  },
  oneOff: {
    fr: "PONCTUEL",
    en: "ONE-TIME",
    vi: "MỘT LẦN",
    ar: "دفعة واحدة",
    ru: "ЕДИНОВРЕМЕННО"
  },
  monthly: {
    fr: "MENSUEL",
    en: "MONTHLY",
    vi: "HẰNG THÁNG",
    ar: "شهريًا",
    ru: "ЕЖЕМЕСЯЧНО"
  },
  perMonth: {
    fr: " / mois",
    en: " / month",
    vi: " / tháng",
    ar: " / شهر",
    ru: " / месяц"
  },
  onQuote: {
    fr: "Sur devis",
    en: "Custom quote",
    vi: "Báo giá riêng",
    ar: "حسب المقترح",
    ru: "По запросу"
  },
  calculating: {
    fr: "Sélection en cours",
    en: "Selection in progress",
    vi: "Đang chọn",
    ar: "جارٍ الاختيار",
    ru: "Идёт выбор"
  },
  getQuotePdf: {
    fr: "Recevoir mon devis PDF →",
    en: "Get my PDF quote →",
    vi: "Nhận báo giá PDF →",
    ar: "الحصول على عرض السعر PDF →",
    ru: "Получить смету в PDF →"
  },
  continueWhatsApp: {
    fr: "Continuer sur WhatsApp",
    en: "Continue on WhatsApp",
    vi: "Tiếp tục qua WhatsApp",
    ar: "المتابعة عبر واتساب",
    ru: "Продолжить в WhatsApp"
  },
  restart: {
    fr: "Recommencer",
    en: "Restart",
    vi: "Làm lại",
    ar: "إعادة البدء",
    ru: "Начать сначала"
  },
  generatingPdf: {
    fr: "Génération du PDF…",
    en: "Generating PDF…",
    vi: "Đang tạo PDF…",
    ar: "جارٍ إنشاء PDF…",
    ru: "Создание PDF…"
  },
  downloadAgain: {
    fr: "Télécharger à nouveau →",
    en: "Download again →",
    vi: "Tải lại →",
    ar: "تنزيل مجددًا →",
    ru: "Скачать снова →"
  },
  downloadPdf: {
    fr: "Télécharger mon devis PDF →",
    en: "Download my PDF quote →",
    vi: "Tải báo giá PDF →",
    ar: "تنزيل عرض السعر PDF →",
    ru: "Скачать смету в PDF →"
  },
  payDeposit: {
    fr: "Régler mon acompte en ligne (CB) →",
    en: "Pay deposit online (Card) →",
    vi: "Thanh toán đặt cọc online (Thẻ) →",
    ar: "دفع العربون عبر الإنترنت (بطاقة) →",
    ru: "Внести аванс онлайн (картой) →"
  },
  preparingPayment: {
    fr: "Préparation du règlement...",
    en: "Preparing checkout...",
    vi: "Đang chuẩn bị thanh toán...",
    ar: "جارٍ تجهيز الدفع...",
    ru: "Подготовка оплаты..."
  },
  pdfSuccess: {
    fr: "Devis PDF généré avec succès ✓",
    en: "PDF quote generated successfully ✓",
    vi: "Đã tạo báo giá PDF thành công ✓",
    ar: "تم إنشاء عرض السعر PDF بنجاح ✓",
    ru: "Смета в PDF успешно сформирована ✓"
  },
  pdfGeneratedSuccess: {
    fr: "Votre devis professionnel a été généré avec succès.",
    en: "Your bespoke PDF quote has been successfully generated.",
    vi: "Báo giá chuyên nghiệp của bạn đã được tạo thành công.",
    ar: "تم إنشاء عرض السعر الاحترافي الخاص بك بنجاح.",
    ru: "Ваша профессиональная смета успешно сформирована."
  },
  pdfError: {
    fr: "Impossible de générer le devis PDF pour l'instant.",
    en: "Unable to generate the PDF quote at this time.",
    vi: "Hiện chưa thể tạo báo giá PDF.",
    ar: "تعذر إنشاء عرض السعر بصيغة PDF في الوقت الحالي.",
    ru: "Не удалось сформировать смету в PDF в данный момент."
  },
  paymentError: {
    fr: "Impossible de préparer le règlement.",
    en: "Unable to prepare the payment checkout.",
    vi: "Không thể chuẩn bị thanh toán trực tuyến.",
    ar: "تعذر تجهيز بوابة الدفع.",
    ru: "Не удалось подготовить оплату."
  },
  priceFrom: {
    fr: "Dès",
    en: "From",
    vi: "Từ",
    ar: "من",
    ru: "От"
  },
  perYear: {
    fr: " / an",
    en: " / year",
    vi: " / năm",
    ar: " / سنة",
    ru: " / год"
  },
  seeAllSectors: {
    fr: "Voir toutes les activités",
    en: "See all industries",
    vi: "Xem tất cả lĩnh vực",
    ar: "عرض جميع القطاعات",
    ru: "Показать все сферы"
  },
  collapseSectors: {
    fr: "Réduire les activités",
    en: "Show fewer industries",
    vi: "Thu gọn",
    ar: "تقليص القطاعات",
    ru: "Свернуть список"
  },
  activityBadge: {
    fr: "01 · VOTRE ACTIVITÉ",
    en: "01 · YOUR INDUSTRY",
    vi: "01 · LĨNH VỰC HOẠT ĐỘNG",
    ar: "01 · مجال نشاطك",
    ru: "01 · ВАША СФЕРА"
  },
  activityIntro: {
    fr: "Choisissez votre univers. Les recommandations s'adaptent ensuite à votre objectif, situation et budget.",
    en: "Choose your field. Recommendations automatically adapt to your goals, situation, and budget.",
    vi: "Chọn lĩnh vực của bạn. Các gợi ý sẽ tự động thích ứng với mục tiêu, hiện trạng và ngân sách.",
    ar: "اختر مجالك. تتكيف التوصيات تلقائياً مع أهدافك ووضعك الحالي وميزانيتك.",
    ru: "Выберите сферу. Рекомендации автоматически подстроятся под ваши цели, ситуацию и бюджет."
  },
  preparedSelection: {
    fr: "SÉLECTION PRÉPARÉE",
    en: "CURATED SELECTION",
    vi: "LỰA CHỌN ĐƯỢC ĐỀ XUẤT",
    ar: "مجموعة مختارة ومجهزة",
    ru: "ПОДОБРАННЫЙ СТЕК"
  },
  preparedTitle: {
    fr: "Les leviers les plus cohérents apparaissent ici en premier.",
    en: "The most relevant levers appear here first.",
    vi: "Các đòn bẩy phù hợp nhất sẽ xuất hiện đầu tiên tại đây.",
    ar: "تظهر الخدمات الأكثر صلة وأهمية هنا أولاً.",
    ru: "Самые эффективные инструменты представлены первыми."
  },
  preparedDetail: {
    fr: "Gardez-les, retirez-les ou ajoutez d'autres expertises. Rien n'est imposé.",
    en: "Keep them, remove them, or add other specialties. You are in full control.",
    vi: "Giữ lại, bỏ bớt hoặc thêm các chuyên môn khác. Bạn hoàn toàn tự do lựa chọn.",
    ar: "احتفظ بها، أو احذفها، أو أضف خدمات أخرى. لك كامل حرية الاختيار.",
    ru: "Оставьте их, удалите или добавьте другие услуги. Полная свобода выбора."
  },
  acquisitionBadge: {
    fr: "ACQUISITION",
    en: "ACQUISITION",
    vi: "TIẾP CẬN KHÁCH HÀNG",
    ar: "استقطاب العملاء",
    ru: "ИСТОЧНИКИ КЛИЕНТОВ"
  },
  acquisitionTitle: {
    fr: "Comment vos clients vous trouvent-ils aujourd'hui ?",
    en: "How do your clients find you today?",
    vi: "Khách hàng hiện tìm thấy bạn như thế nào?",
    ar: "كيف يجدك عملاؤك اليوم؟",
    ru: "Как клиенты находят вас сегодня?"
  },
  recommendationBadge: {
    fr: "VOTRE RECOMMANDATION",
    en: "YOUR RECOMMENDATION",
    vi: "ĐỀ XUẤT CỦA BẠN",
    ar: "توصيتك المخصصة",
    ru: "ВАША РЕКОМЕНДАЦИЯ"
  },
  finalizationBadge: {
    fr: "FINALISATION",
    en: "FINALIZATION",
    vi: "HOÀN TẤT",
    ar: "المرحلة النهائية",
    ru: "ФИНАЛИЗАЦИЯ"
  },
  finalizationTitle: {
    fr: "Votre devis professionnel est prêt.",
    en: "Your professional quote is ready.",
    vi: "Báo giá chuyên nghiệp của bạn đã sẵn sàng.",
    ar: "عرض السعر الاحترافي الخاص بك جاهز.",
    ru: "Ваша профессиональная смета готова."
  },
  finalizationDetail: {
    fr: "Renseignez vos coordonnées pour télécharger votre devis PDF complet ou valider votre commande en ligne.",
    en: "Fill in your details to download your full PDF quote or confirm your order online.",
    vi: "Điền thông tin để tải báo giá PDF chi tiết hoặc xác nhận đơn hàng trực tuyến.",
    ar: "أدخل بياناتك لتنزيل عرض السعر بصيغة PDF بالكامل أو تأكيد طلبك عبر الإنترنت.",
    ru: "Укажите данные, чтобы скачать полную смету в PDF или подтвердить заказ онлайн."
  },
  formCompany: {
    fr: "Entreprise / société *",
    en: "Company / business name *",
    vi: "Tên công ty / doanh nghiệp *",
    ar: "اسم الشركة / المؤسسة *",
    ru: "Название компании *"
  },
  formName: {
    fr: "Nom du représentant *",
    en: "Full name *",
    vi: "Họ và tên người đại diện *",
    ar: "اسم المسؤول *",
    ru: "Имя контактного лица *"
  },
  formEmail: {
    fr: "E-mail professionnel *",
    en: "Professional email *",
    vi: "Email công việc *",
    ar: "البريد الإلكتروني للعمل *",
    ru: "Рабочий email *"
  },
  formPhone: {
    fr: "Téléphone / WhatsApp *",
    en: "Phone / WhatsApp *",
    vi: "Số điện thoại / WhatsApp *",
    ar: "الهاتف / واتساب *",
    ru: "Телефон / WhatsApp *"
  },
  formWebsite: {
    fr: "Site web de l'entreprise (facultatif)",
    en: "Company website (optional)",
    vi: "Website hiện tại (không bắt buộc)",
    ar: "موقع الشركة (اختياري)",
    ru: "Сайт компании (необязательно)"
  },
  archTitle: {
    fr: "ARCHITECTURE XR",
    en: "XR ARCHITECTURE",
    vi: "KIẾN TRÚC XR",
    ar: "بنية XR الرقمية",
    ru: "АРХИТЕКТУРА XR"
  },
  archSub: {
    fr: "Votre dispositif digital",
    en: "Your digital system",
    vi: "Hệ thống số của bạn",
    ar: "منظومتك الرقمية",
    ru: "Ваш цифровой комплекс"
  },
  archTagline: {
    fr: "Stratégie · Design · Croissance",
    en: "Strategy · Design · Growth",
    vi: "Chiến lược · Thiết kế · Tăng trưởng",
    ar: "استراتيجية · تصميم · نمو",
    ru: "Стратегия · Дизайн · Рост"
  },
  estimatedInvestment: {
    fr: "INVESTISSEMENT ESTIMÉ",
    en: "ESTIMATED INVESTMENT",
    vi: "MỨC ĐẦU TƯ ƯỚC TÍNH",
    ar: "الاستثمار التقديري",
    ru: "ОЦЕНКА ИНВЕСТИЦИЙ"
  }
};
