import type { Lang } from "./i18n";

export type MultiText = Record<Lang, string>;

export type MapsPopulationId = "under_25k" | "25k_80k" | "80k_250k" | "250k_800k" | "over_800k";
export type MapsCompetitionId = "low" | "moderate" | "high" | "extreme";
export type MapsPresenceId =
  | "no_gbp"
  | "very_low_visibility"
  | "beyond_20"
  | "rank_11_20"
  | "rank_4_10"
  | "top_3_consolidate";
export type MapsKeywordVolumeId = "1_3" | "4_8" | "9_15" | "16_plus";
export type MapsGeoScopeId = "single_city" | "multi_districts" | "multi_cities";
export type MapsGoalId = "reach_top_3" | "improve_visibility" | "surpass_competitors" | "consolidate";

export interface MapsSectorProfile {
  id: string;
  coef: number;
  label: MultiText;
  suggestedKeywords: Record<Lang, string[]>;
}

export const MAPS_SECTORS: MapsSectorProfile[] = [
  {
    id: "locksmith",
    coef: 1.32,
    label: { fr: "Serrurier / Dépannage urgence", en: "Locksmith / Emergency Services", vi: "Thợ khóa / Sửa chữa khẩn cấp", ar: "صيانة أقفال / خدمات طوارئ", ru: "Мастер замков / Аварийная служба" },
    suggestedKeywords: {
      fr: ["serrurier urgence", "ouverture de porte", "changement serrure", "dépannage serrurier 24/7"],
      en: ["emergency locksmith", "door opening", "lock replacement", "24/7 locksmith near me"],
      vi: ["sửa khóa khẩn cấp", "mở khóa cửa", "thay ổ khóa", "thợ khóa 24/7"],
      ar: ["فتح أبواب طوارئ", "تصليح أقفال", "تبديل قفل", "فني مفاتيح قريب"],
      ru: ["вскрытие замков 24/7", "срочный замочный мастер", "замена дверного замка", "аварийное открытие"],
    },
  },
  {
    id: "plumber",
    coef: 1.28,
    label: { fr: "Plombier / Chauffagiste", en: "Plumber / Heating", vi: "Thợ sửa ống nước / Điều hòa", ar: "سباك / صيانة التدفئة", ru: "Сантехник / Отопление" },
    suggestedKeywords: {
      fr: ["plombier dépannage", "fuite d'eau urgence", "installation chauffe-eau", "débouchage canalisation"],
      en: ["emergency plumber", "water leak repair", "boiler installation", "drain unblocking"],
      vi: ["sửa ống nước khẩn cấp", "dò tìm rò rỉ", "lắp máy nước nóng", "thông tắc cống"],
      ar: ["سباك طوارئ", "إصلاح تسرب مياه", "تركيب سخان", "تسليك مجاري"],
      ru: ["срочный сантехник", "устранение протечки", "монтаж отопления", "прочистка труб"],
    },
  },
  {
    id: "dental",
    coef: 1.26,
    label: { fr: "Dentiste / Santé / Clinique", en: "Dentist / Medical Clinic", vi: "Nha khoa / Phòng khám", ar: "عيادة أسنان / طب خاص", ru: "Стоматология / Клиника" },
    suggestedKeywords: {
      fr: ["cabinet dentaire", "implant dentaire", "urgence dentaire", "orthodontiste"],
      en: ["dental clinic", "dental implants", "emergency dentist", "orthodontist"],
      vi: ["nha khoa uy tín", "cấy ghép implant", "nha khoa khẩn cấp", "niềng răng"],
      ar: ["عيادة أسنان", "زراعة أسنان", "طوارئ أسنان", "تقويم أسنان"],
      ru: ["стоматологическая клиника", "имплантация зубов", "срочный стоматолог", "ортодонт"],
    },
  },
  {
    id: "realestate",
    coef: 1.28,
    label: { fr: "Agence immobilière", en: "Real Estate Agency", vi: "Sàn bất động sản", ar: "وكالة عقارية", ru: "Агентство недвижимости" },
    suggestedKeywords: {
      fr: ["agence immobilière", "estimation bien immobilier", "achat appartement", "gestion locative"],
      en: ["real estate agency", "property valuation", "luxury apartments", "property management"],
      vi: ["môi giới bất động sản", "định giá nhà đất", "mua bán căn hộ", "quản lý cho thuê"],
      ar: ["وكالة عقارية", "تقييم عقار", "شراء شقق", "إدارة أملاك"],
      ru: ["агентство недвижимости", "оценка квартиры", "купить апартаменты", "управление арендой"],
    },
  },
  {
    id: "legal",
    coef: 1.22,
    label: { fr: "Avocat / Notaire / Conseil", en: "Lawyer / Notary / Advisory", vi: "Luật sư / Công chứng / Tư vấn", ar: "محامي / موثق / استشارات", ru: "Юрист / Нотариус / Консалтинг" },
    suggestedKeywords: {
      fr: ["cabinet d'avocat", "avocat droit du travail", "avocat affaires", "consultation juridique"],
      en: ["law firm", "employment lawyer", "corporate attorney", "legal consultation"],
      vi: ["văn phòng luật sư", "luật sư lao động", "luật sư doanh nghiệp", "tư vấn pháp lý"],
      ar: ["مكتب محاماة", "محامي شركات", "استشارة قانونية", "محامي قضايا"],
      ru: ["юридическая фирма", "адвокат по бизнесу", "трудовой юрист", "консультация юриста"],
    },
  },
  {
    id: "restaurant",
    coef: 1.06,
    label: { fr: "Restaurant / Bar / Gastronomie", en: "Restaurant / Bar / Dining", vi: "Nhà hàng / Quán ăn / Bar", ar: "مطعم / مقهى / ضيافة", ru: "Ресторан / Кафе / Бар" },
    suggestedKeywords: {
      fr: ["meilleur restaurant", "restaurant gastronomique", "dîner terrasse", "réserver une table"],
      en: ["best restaurant near me", "fine dining", "rooftop dinner", "brunch restaurant"],
      vi: ["nhà hàng ngon", "ẩm thực cao cấp", "nhà hàng sân thượng", "đặt bàn tối"],
      ar: ["أفضل مطعم قريب", "مطعم فاخر", "عشاء عائلي", "حجز طاولة"],
      ru: ["лучший ресторан рядом", "авторская кухня", "ужин на террасе", "бронирование столика"],
    },
  },
  {
    id: "hospitality",
    coef: 1.15,
    label: { fr: "Hôtel / Villa / Séjours", en: "Hotel / Boutique Stay", vi: "Khách sạn / Villa / Nghỉ dưỡng", ar: "فندق / فيلا / منتجع", ru: "Отель / Вилла / Курорт" },
    suggestedKeywords: {
      fr: ["hôtel charme", "boutique hôtel", "suite avec spa", "hébergement centre-ville"],
      en: ["boutique hotel", "luxury hotel stay", "hotel with spa", "city center hotel"],
      vi: ["khách sạn boutique", "khách sạn cao cấp", "khách sạn có spa", "lưu trú trung tâm"],
      ar: ["فندق بوتيك", "إقامة فاخرة", "فندق مع سبا", "فندق وسط المدينة"],
      ru: ["бутик-отель", "люксовый отель", "отель со спа", "отель в центре"],
    },
  },
  {
    id: "beauty",
    coef: 1.08,
    label: { fr: "Institut beauté / Spa / Coiffure", en: "Beauty Salon / Spa / Hair", vi: "Spa / Thẩm mỹ / Tóc", ar: "صالون تجميل / سبا", ru: "Салон красоты / Спа / Парикмахерская" },
    suggestedKeywords: {
      fr: ["institut de beauté", "spa massage", "soin visage", "salon de coiffure"],
      en: ["beauty salon", "luxury spa massage", "facial care", "hair studio"],
      vi: ["thẩm mỹ viện", "spa thư giãn", "chăm sóc da mặt", "salon tóc"],
      ar: ["مركز تجميل", "سبا ومساج", "العناية بالبشرة", "صالون شعر"],
      ru: ["салон красоты", "спа-массаж", "уход за лицом", "парикмахерская"],
    },
  },
  {
    id: "retail",
    coef: 1.0,
    label: { fr: "Boutique / Commerce local / Artisan", en: "Retail Store / Local Shop / Craftsman", vi: "Cửa hàng bán lẻ / Thủ công", ar: "متجر محلي / حرفة", ru: "Бутик / Локальный магазин / Мастер" },
    suggestedKeywords: {
      fr: ["boutique centre-ville", "artisan local", "atelier sur mesure", "magasin spécialisé"],
      en: ["local boutique", "artisan workshop", "specialty store", "showroom near me"],
      vi: ["cửa hàng uy tín", "xưởng thủ công", "shop chuyên biệt", "showroom gần đây"],
      ar: ["متجر متخصص", "ورشة حرفية", "محل قريب", "معرض محلي"],
      ru: ["локальный бутик", "мастерская", "специализированный магазин", "шоурум рядом"],
    },
  },
  {
    id: "other",
    coef: 1.08,
    label: { fr: "Autre secteur local", en: "Other local industry", vi: "Ngành nghề địa phương khác", ar: "قطاع محلي آخر", ru: "Другая локальная сфера" },
    suggestedKeywords: {
      fr: ["service local spécialisé", "entreprise recommandée", "devis intervention"],
      en: ["local specialist", "recommended service near me", "local expert"],
      vi: ["dịch vụ chuyên nghiệp", "đơn vị uy tín gần đây", "tư vấn báo giá"],
      ar: ["خدمة محلية متخصصة", "أفضل مزود خدمة", "طلب عرض سعر"],
      ru: ["локальный специалист", "лучший сервис рядом", "консультация и смета"],
    },
  },
];

export const MAPS_POPULATIONS: { id: MapsPopulationId; coef: number; label: MultiText; hint: MultiText }[] = [
  {
    id: "under_25k",
    coef: 0.85,
    label: { fr: "Moins de 25 000 habitants", en: "Under 25,000 inhabitants", vi: "Dưới 25.000 dân", ar: "أقل من 25,000 نسمة", ru: "Менее 25 000 жителей" },
    hint: { fr: "Petite commune ou bourg", en: "Small town or rural commune", vi: "Thị trấn nhỏ hoặc vùng ven", ar: "بلدة صغيرة", ru: "Небольшой город" },
  },
  {
    id: "25k_80k",
    coef: 1.0,
    label: { fr: "25 000 à 80 000 habitants", en: "25,000 to 80,000 inhabitants", vi: "25.000 – 80.000 dân", ar: "25,000 إلى 80,000 نسمة", ru: "25 000 – 80 000 жителей" },
    hint: { fr: "Ville moyenne / pôle local", en: "Medium town / regional hub", vi: "Thành phố vừa", ar: "مدينة متوسطة", ru: "Средний город" },
  },
  {
    id: "80k_250k",
    coef: 1.18,
    label: { fr: "80 000 à 250 000 habitants", en: "80,000 to 250,000 inhabitants", vi: "80.000 – 250.000 dân", ar: "80,000 إلى 250,000 نسمة", ru: "80 000 – 250 000 жителей" },
    hint: { fr: "Ex. Orléans, Tours, Annecy, Dijon", en: "Large regional city", vi: "Thành phố lớn cấp vùng", ar: "مدينة إقليمية كبيرة", ru: "Крупный региональный центр" },
  },
  {
    id: "250k_800k",
    coef: 1.4,
    label: { fr: "250 000 à 800 000 habitants", en: "250,000 to 800,000 inhabitants", vi: "250.000 – 800.000 dân", ar: "250,000 إلى 800,000 نسمة", ru: "250 000 – 800 000 жителей" },
    hint: { fr: "Ex. Bordeaux, Nice, Nantes, Toulouse", en: "Major metropolitan city", vi: "Đô thị lớn", ar: "حاضرة كبرى", ru: "Крупный мегаполис" },
  },
  {
    id: "over_800k",
    coef: 1.65,
    label: { fr: "+ 800 000 hab. / Métropole", en: "800,000+ / Capital Metro", vi: "Trên 800.000 dân / Thủ đô", ar: "+800,000 نسمة / عاصمة", ru: "Более 800 000 / Столица" },
    hint: { fr: "Ex. Paris, Lyon, Marseille, Londres, Dubaï", en: "High-density capital or metro area", vi: "Siêu đô thị / Thủ đô", ar: "عاصمة عالية الكثافة", ru: "Столица или агломерация" },
  },
];

export const MAPS_COMPETITION_LEVELS: { id: MapsCompetitionId; coef: number; label: MultiText; detail: MultiText }[] = [
  {
    id: "low",
    coef: 0.8,
    label: { fr: "Concurrence faible", en: "Low competition", vi: "Cạnh tranh thấp", ar: "منافسة منخفضة", ru: "Низкая конкуренция" },
    detail: { fr: "Peu d'acteurs actifs ou fiches peu travaillées sur la zone", en: "Few active players or weakly optimised profiles", vi: "Ít đối thủ tối ưu bài bản trong khu vực", ar: "عدد قليل من المنافسين النشطين", ru: "Мало активных профилей в зоне" },
  },
  {
    id: "moderate",
    coef: 1.05,
    label: { fr: "Concurrence modérée", en: "Moderate competition", vi: "Cạnh tranh vừa", ar: "منافسة متوسطة", ru: "Умеренная конкуренция" },
    detail: { fr: "Plusieurs fiches établies mais optimisations incomplètes", en: "Established competitors with room for improvement", vi: "Có đối thủ nhưng chưa tối ưu sâu", ar: "منافسون قائمون لكن بتحسينات محدودة", ru: "Несколько сильных карточек без глубокого SEO" },
  },
  {
    id: "high",
    coef: 1.4,
    label: { fr: "Concurrence élevée", en: "High competition", vi: "Cạnh tranh cao", ar: "منافسة قوية", ru: "Высокая конкуренция" },
    detail: { fr: "Acteurs structurés, nombreux avis et forte bataille sur les 3 premières places", en: "Structured rivals with strong review counts", vi: "Nhiều đối thủ mạnh tranh top 3", ar: "شركات نشطة ومراجعات كثيرة في الصدارة", ru: "Плотная борьба за первую тройку" },
  },
  {
    id: "extreme",
    coef: 1.85,
    label: { fr: "Très intense / Saturée", en: "Extreme / Saturated", vi: "Cực kỳ khốc liệt", ar: "منافسة شرسة للغاية", ru: "Критическая / Перенасыщенная" },
    detail: { fr: "Secteur hyper-disputé (ex. dépannage métropole, centre-ville saturé)", en: "Hyper-disputed metro emergency or dense center sector", vi: "Thị trường siêu cạnh tranh tại trung tâm lớn", ar: "قطاع شديد التنافسية في المدن الكبرى", ru: "Сверхконкурентная ниша крупного города" },
  },
];

export const MAPS_PRESENCE_STATES: { id: MapsPresenceId; coef: number; creationFee: number; label: MultiText; detail: MultiText }[] = [
  {
    id: "no_gbp",
    coef: 1.42,
    creationFee: 160,
    label: { fr: "Pas encore de fiche Google Business Profile", en: "No Google Business Profile yet", vi: "Chưa có hồ sơ Google Maps", ar: "لا يوجد ملف Google حتى الآن", ru: "Профиль Google ещё не создан" },
    detail: { fr: "Création complète, assistance vérification et amorçage initial requis", en: "Creation, verification support and initial authority setup needed", vi: "Cần tạo mới, xác minh và xây nền tảng ban đầu", ar: "يتطلب إنشاء الملف وتوثيقه وتأسيسه من الصفر", ru: "Требуется создание, верификация и первичный запуск" },
  },
  {
    id: "very_low_visibility",
    coef: 1.38,
    creationFee: 0,
    label: { fr: "Fiche existante, mais très peu visible", en: "Existing profile, very low visibility", vi: "Đã có hồ sơ nhưng rất ít hiển thị", ar: "ملف قائم لكن بظهور ضعيف جداً", ru: "Профиль есть, но почти не виден" },
    detail: { fr: "Fiche inactive, incomplète ou mal catégorisée", en: "Incomplete, dormant or mis-categorised listing", vi: "Hồ sơ thiếu thông tin hoặc chưa tối ưu danh mục", ar: "ملف غير مكتمل أو ضعيف التصنيف", ru: "Неполные категории и низкая активность" },
  },
  {
    id: "beyond_20",
    coef: 1.32,
    creationFee: 0,
    label: { fr: "Positionnement au-delà du Top 20", en: "Ranked beyond Top 20", vi: "Xếp hạng ngoài Top 20", ar: "الترتيب بعد المركز 20", ru: "Позиция за пределами Топ-20" },
    detail: { fr: "Forte remontée sémantique et signaux de notoriété à bâtir", en: "Substantial relevance and local prominence lift required", vi: "Cần đẩy mạnh tín hiệu địa phương và nội dung", ar: "يتطلب عمل هيكلة شاملة وإشارات ثقة محلية", ru: "Требуется серьёзный подъём релевантности" },
  },
  {
    id: "rank_11_20",
    coef: 1.15,
    creationFee: 0,
    label: { fr: "Positionnement entre la 11e et la 20e place", en: "Ranked 11th to 20th", vi: "Vị trí từ hạng 11 đến 20", ar: "بين المركز 11 و 20", ru: "Позиция с 11-го по 20-е место" },
    detail: { fr: "Deuxième page locale, travail structuré nécessaire pour entrer dans le Top 10", en: "Mid-pack visibility requiring structured optimisation", vi: "Nằm ở nhóm giữa, cần tối ưu có hệ thống", ar: "ظهور متوسط يتطلب تحسينات مدروسة للتقدم", ru: "Второй эшелон выдачи, нужен планомерный рост" },
  },
  {
    id: "rank_4_10",
    coef: 0.95,
    creationFee: 0,
    label: { fr: "Positionnement entre la 4e et la 10e place", en: "Ranked 4th to 10th", vi: "Vị trí từ hạng 4 đến 10", ar: "بين المركز 4 و 10", ru: "Позиция с 4-го по 10-е место" },
    detail: { fr: "Base saine proche du Top 3 : leviers de différenciation à activer", en: "Healthy base near Top 3 — targeted push to close the gap", vi: "Nền tảng tốt ngay sát Top 3", ar: "قاعدة جيدة وقريبة من المراكز الثلاثة الأولى", ru: "Хорошая база рядом с Топ-3" },
  },
  {
    id: "top_3_consolidate",
    coef: 0.78,
    creationFee: 0,
    label: { fr: "Déjà dans le Top 3, à consolider", en: "Already in Top 3, to consolidate", vi: "Đã ở Top 3, cần củng cố", ar: "بالفعل في أفضل 3 وللتثبيت", ru: "Уже в Топ-3, нужно закрепить" },
    detail: { fr: "Défense de position face aux concurrents émergents et requêtes annexes", en: "Protect rankings and expand secondary keyword coverage", vi: "Bảo vệ thứ hạng và mở rộng thêm từ khóa", ar: "حماية الصدارة والتوسع لكلمات إضافية", ru: "Защита позиций и охват смежных запросов" },
  },
];

export const MAPS_KEYWORD_VOLUMES: { id: MapsKeywordVolumeId; addEur: number; label: MultiText }[] = [
  { id: "1_3", addEur: 90, label: { fr: "Ciblage précis · 1 à 3 mots-clés", en: "Focused · 1 to 3 keywords", vi: "Trọng tâm · 1 – 3 từ khóa", ar: "تركيز محدد · 1 إلى 3 كلمات", ru: "Точечно · 1–3 запроса" } },
  { id: "4_8", addEur: 240, label: { fr: "Cœur de métier · 4 à 8 mots-clés", en: "Core strategy · 4 to 8 keywords", vi: "Chiến lược · 4 – 8 từ khóa", ar: "استراتيجية أساسية · 4 إلى 8 كلمات", ru: "Базовый охват · 4–8 запросов" } },
  { id: "9_15", addEur: 490, label: { fr: "Ambitieux · 9 à 15 mots-clés", en: "Ambitious · 9 to 15 keywords", vi: "Mở rộng · 9 – 15 từ khóa", ar: "طموحة · 9 إلى 15 كلمة", ru: "Амбициозно · 9–15 запросов" } },
  { id: "16_plus", addEur: 820, label: { fr: "Domination large · 16+ mots-clés", en: "Broad coverage · 16+ keywords", vi: "Phủ rộng · 16+ từ khóa", ar: "تغطية شاملة · 16+ كلمة", ru: "Широкий охват · 16+ запросов" } },
];

export const MAPS_GEO_SCOPES: { id: MapsGeoScopeId; coef: number; label: MultiText }[] = [
  { id: "single_city", coef: 1.0, label: { fr: "Une seule ville / zone ciblée", en: "Single city / main zone", vi: "Một thành phố / khu vực", ar: "مدينة واحدة", ru: "Один город / район" } },
  { id: "multi_districts", coef: 1.32, label: { fr: "Plusieurs quartiers d'une grande ville", en: "Multiple districts of a major city", vi: "Nhiều quận trong thành phố lớn", ar: "عدة أحياء في مدينة كبرى", ru: "Несколько районов мегаполиса" } },
  { id: "multi_cities", coef: 1.68, label: { fr: "Plusieurs villes / rayon départemental", en: "Multiple cities / regional area", vi: "Nhiều thành phố / khu vực liên tỉnh", ar: "عدة مدن / نطاق إقليمي", ru: "Несколько городов / область" } },
];

export const MAPS_GOALS: { id: MapsGoalId; coef: number; label: MultiText }[] = [
  { id: "reach_top_3", coef: 1.25, label: { fr: "Viser le Top 3 local", en: "Target Local Top 3", vi: "Hướng tới Top 3 địa phương", ar: "استهداف المراكز الثلاثة الأولى", ru: "Выход в локальный Топ-3" } },
  { id: "improve_visibility", coef: 1.0, label: { fr: "Améliorer la visibilité globale", en: "Improve overall local visibility", vi: "Tăng độ phủ hiển thị chung", ar: "تحسين الظهور العام على الخرائط", ru: "Повысить общую видимость" } },
  { id: "surpass_competitors", coef: 1.15, label: { fr: "Dépasser des concurrents directs", en: "Outperform specific competitors", vi: "Vượt mặt các đối thủ trực tiếp", ar: "تجاوز المنافسين المباشرين", ru: "Обойти прямых конкурентов" } },
  { id: "consolidate", coef: 0.85, label: { fr: "Consolider un positionnement acquis", en: "Consolidate an existing ranking", vi: "Củng cố thứ hạng hiện có", ar: "ترسيخ وتثبيت الترتيب القائم", ru: "Закрепить текущие позиции" } },
];

export interface MapsTop3Input {
  sectorId: string;
  city: string;
  postalCode?: string;
  district?: string;
  population: MapsPopulationId;
  competition: MapsCompetitionId;
  presence: MapsPresenceId;
  keywords: string[];
  keywordVolume: MapsKeywordVolumeId;
  geoScope: MapsGeoScopeId;
  goal: MapsGoalId;
}

export type MapsDifficultyLevel = "moderate" | "high" | "very_high" | "critical";

export interface MapsTop3Estimate {
  fromEur: number;
  maxEur: number;
  difficultyScore: number;
  difficultyLevel: MapsDifficultyLevel;
  difficultyLabel: MultiText;
  factors: MultiText[];
  deliverables: MultiText[];
  objectives: MultiText[];
  disclaimer: MultiText;
}

function roundToCommercialStep(val: number): number {
  if (val < 1000) return Math.round(val / 10) * 10;
  return Math.round(val / 50) * 50;
}

const URGENCY_OR_HIGH_INTENT_RE = /urgence|24\/?7|dépannage|implant|avocat|serrurier|plombier|fuite|luxe|prestige|emergency|luxury/i;

export function calculateMapsTop3Estimate(input: MapsTop3Input): MapsTop3Estimate {
  const sector = MAPS_SECTORS.find((s) => s.id === input.sectorId) ?? MAPS_SECTORS[MAPS_SECTORS.length - 1];
  const pop = MAPS_POPULATIONS.find((p) => p.id === input.population) ?? MAPS_POPULATIONS[1];
  const comp = MAPS_COMPETITION_LEVELS.find((c) => c.id === input.competition) ?? MAPS_COMPETITION_LEVELS[1];
  const pres = MAPS_PRESENCE_STATES.find((p) => p.id === input.presence) ?? MAPS_PRESENCE_STATES[2];
  const kwVol = MAPS_KEYWORD_VOLUMES.find((k) => k.id === input.keywordVolume) ?? MAPS_KEYWORD_VOLUMES[0];
  const geo = MAPS_GEO_SCOPES.find((g) => g.id === input.geoScope) ?? MAPS_GEO_SCOPES[0];
  const goal = MAPS_GOALS.find((g) => g.id === input.goal) ?? MAPS_GOALS[0];

  // Competition carries strong weight independently of population size (small cities can still be fierce)
  const metroSynergy = comp.id === "extreme" && pop.id === "over_800k" ? 0.25 : comp.id === "high" && pop.id === "over_800k" ? 0.12 : 0;
  const marketFactor = comp.coef * 0.68 + pop.coef * 0.32 + metroSynergy;

  // Keyword intent difficulty bonus
  const hasHighIntentKw = input.keywords.some((kw) => URGENCY_OR_HIGH_INTENT_RE.test(kw));
  const kwCompMult = (comp.id === "extreme" ? 1.65 : comp.id === "high" ? 1.38 : comp.id === "moderate" ? 1.12 : 0.88) * (hasHighIntentKw ? 1.08 : 1.0);

  const baseAudit = 280;
  const localSeoEffort = 320 * sector.coef * marketFactor * pres.coef * geo.coef * goal.coef;
  const keywordEffort = kwVol.addEur * kwCompMult;

  const rawFrom = baseAudit + pres.creationFee + localSeoEffort + keywordEffort;
  const fromEur = Math.max(550, roundToCommercialStep(rawFrom));
  const maxEur = roundToCommercialStep(fromEur * 1.3);

  // Normalized difficulty score 18..97 calibrated from baseline calm small town (~23) to saturated capital metro (~92+)
  const rawDiff =
    22 * comp.coef +
    12 * pop.coef +
    11 * sector.coef +
    12 * pres.coef +
    8 * geo.coef +
    (kwVol.id === "16_plus" ? 12 : kwVol.id === "9_15" ? 8 : kwVol.id === "4_8" ? 4 : 1);
  const difficultyScore = Math.max(18, Math.min(97, Math.round(((rawDiff - 42) / 66) * 100)));

  const difficultyLevel: MapsDifficultyLevel =
    difficultyScore >= 82 ? "critical" : difficultyScore >= 62 ? "very_high" : difficultyScore >= 42 ? "high" : "moderate";

  const difficultyLabelMap: Record<MapsDifficultyLevel, MultiText> = {
    moderate: { fr: "Difficulté modérée", en: "Moderate difficulty", vi: "Độ khó trung bình", ar: "صعوبة متوسطة", ru: "Умеренная сложность" },
    high: { fr: "Difficulté élevée", en: "High difficulty", vi: "Độ khó cao", ar: "صعوبة عالية", ru: "Высокая сложность" },
    very_high: { fr: "Très forte concurrence locale", en: "Very strong local competition", vi: "Cạnh tranh rất cao", ar: "منافسة محلية شديدة", ru: "Очень высокая конкуренция" },
    critical: { fr: "Marché ultra-concurrentiel", en: "Ultra-competitive metro market", vi: "Thị trường cực kỳ khốc liệt", ar: "سوق شديد التنافسية", ru: "Сверхконкурентный рынок" },
  };

  const cityDisplay = input.city.trim() || (input.population === "over_800k" ? "Métropole" : "Votre zone");

  const factors: MultiText[] = [
    {
      fr: `Marché ciblé (${cityDisplay}) : ${comp.label.fr.toLowerCase()} · ${pop.label.fr}`,
      en: `Target market (${cityDisplay}): ${comp.label.en.toLowerCase()} · ${pop.label.en}`,
      vi: `Thị trường (${cityDisplay}): ${comp.label.vi} · ${pop.label.vi}`,
      ar: `السوق المستهدف (${cityDisplay}): ${comp.label.ar} · ${pop.label.ar}`,
      ru: `Рынок (${cityDisplay}): ${comp.label.ru} · ${pop.label.ru}`,
    },
    {
      fr: `Point de départ : ${pres.label.fr}`,
      en: `Starting point: ${pres.label.en}`,
      vi: `Điểm xuất phát: ${pres.label.vi}`,
      ar: `نقطة البداية: ${pres.label.ar}`,
      ru: `Стартовая позиция: ${pres.label.ru}`,
    },
    {
      fr: `Périmètre : ${kwVol.label.fr} · ${geo.label.fr}`,
      en: `Scope: ${kwVol.label.en} · ${geo.label.en}`,
      vi: `Phạm vi: ${kwVol.label.vi} · ${geo.label.vi}`,
      ar: `النطاق: ${kwVol.label.ar} · ${geo.label.ar}`,
      ru: `Охват: ${kwVol.label.ru} · ${geo.label.ru}`,
    },
  ];

  const deliverables: MultiText[] = [
    ...(input.presence === "no_gbp"
      ? [{
          fr: "Création de la fiche Google Business Profile, structuration initiale et accompagnement à la validation",
          en: "Google Business Profile creation, initial architecture and verification guidance",
          vi: "Khởi tạo hồ sơ Google Business Profile và hỗ trợ xác minh",
          ar: "إنشاء ملف Google Business Profile وهيكلة البيانات ودعم التوثيق",
          ru: "Создание профиля Google Business Profile и сопровождение верификации",
        }]
      : []),
    {
      fr: "Audit concurrentiel des 5 leaders du Pack Local et écart sémantique sur votre zone",
      en: "Competitive audit of top 5 Local Pack leaders and semantic gap analysis",
      vi: "Phân tích 5 đối thủ dẫn đầu Local Pack và khoảng trống từ khóa",
      ar: "تدقيق تنافسي لأبرز 5 منافسين محليين وتحليل الفجوة الدلالية",
      ru: "Аудит топ-5 конкурентов в Local Pack и семантического разрыва",
    },
    {
      fr: "Restructuration complète (catégorie principale/secondaires, services, attributs, description SEO locale)",
      en: "Full profile engineering (primary/secondary categories, services, attributes, local SEO copy)",
      vi: "Tối ưu toàn diện danh mục chính/phụ, dịch vụ và mô tả chuẩn SEO",
      ar: "إعادة هيكلة شاملة للفئات والخدمات والوصف الدلالي المحلي",
      ru: "Полная перенастройка категорий, услуг и локального SEO-описания",
    },
    {
      fr: "Alignement de cohérence locale (citations NAP, signaux d'autorité, maillage vers votre site web)",
      en: "Local consistency plan (NAP citations, prominence signals, website local alignment)",
      vi: "Đồng bộ tín hiệu NAP địa phương và liên kết với website",
      ar: "توحيد إشارات المصداقية المحلية NAP والربط الدلالي بالموقع",
      ru: "План локального цитирования (NAP) и связка с сайтом",
    },
    {
      fr: "Plan d'action sur les requêtes ciblées et suivi régulier de progression de visibilité",
      en: "Targeted keyword execution plan and ongoing ranking & visibility tracking",
      vi: "Triển khai bộ từ khóa mục tiêu và theo dõi biến động thứ hạng",
      ar: "خطة عمل للكلمات المستهدفة ومتابعة مستمرة لتطور الترتيب",
      ru: "План работы по запросам и регулярный трекинг видимости",
    },
  ];

  const objectives: MultiText[] = [
    {
      fr: `Objectif de travail : ${goal.label.fr} sur les expressions retenues`,
      en: `Work objective: ${goal.label.en} across your priority keywords`,
      vi: `Mục tiêu: ${goal.label.vi} cho các từ khóa trọng tâm`,
      ar: `هدف العمل: ${goal.label.ar} للكلمات المستهدفة`,
      ru: `Рабочая цель: ${goal.label.ru} по ключевым запросам`,
    },
    {
      fr: "Augmenter les signaux de pertinence et proéminence locale (appels, itinéraires, clics site)",
      en: "Increase local relevance and prominence signals (calls, directions, website visits)",
      vi: "Gia tăng cuộc gọi, chỉ đường và lượt nhấp từ Google Maps",
      ar: "رفع إشارات الملاءمة والبروز المحلي لزيادة المكالمات وطلبات الاتجاهات",
      ru: "Увеличить локальную релевантность, звонки и переходы на сайт",
    },
  ];

  const disclaimer: MultiText = {
    fr: "Estimation indicative « À partir de » : le référencement local vise l'entrée et la progression vers le Top 3 sans jamais garantir contractuellement une position algorithmique Google. Périmètre définitif confirmé après diagnostic humain.",
    en: "Indicative \"From\" estimate: local SEO targets Top 3 progression without guaranteeing any fixed Google algorithmic rank. Final scope confirmed after manual review.",
    vi: "Báo giá ước tính tham khảo: SEO địa phương hướng tới Top 3 và không cam kết cứng thứ hạng thuật toán của Google.",
    ar: "تقدير إرشادي «ابتداءً من»: يستهدف السيو المحلي التقدم نحو أفضل 3 نتائج دون ضمان ترتيب خوارزمي ثابت من Google.",
    ru: "Ориентировочная оценка «От»: локальное SEO нацелено на выход в Топ-3 без алгоритмической гарантии позиции Google.",
  };

  return {
    fromEur,
    maxEur,
    difficultyScore,
    difficultyLevel,
    difficultyLabel: difficultyLabelMap[difficultyLevel],
    factors,
    deliverables,
    objectives,
    disclaimer,
  };
}

export interface MapsManagementTier {
  id: "essentiel" | "croissance" | "intensif";
  eurMonth: number;
  popular?: boolean;
  badge: MultiText;
  name: MultiText;
  summary: MultiText;
  postsPerMonth: number;
  photosPerMonth: number;
  reviewsPerMonth: number;
  optimizationCadence: MultiText;
  reportingLabel: MultiText;
  deliverables: MultiText[];
  limits: MultiText;
}

export const MAPS_MANAGEMENT_TIERS: MapsManagementTier[] = [
  {
    id: "essentiel",
    eurMonth: 99,
    badge: { fr: "ESSENTIEL · À DISTANCE", en: "ESSENTIAL · REMOTE", vi: "CƠ BẢN · TỪ XA", ar: "الأساسية · عن بُعد", ru: "БАЗОВЫЙ · УДАЛЁННО" },
    name: { fr: "Gestion Fiche Essentiel", en: "Essential Profile Management", vi: "Quản Lý Hồ Sơ Cơ Bản", ar: "إدارة الملف الأساسية", ru: "Базовое ведение профиля" },
    summary: {
      fr: "Maintenez une fiche Google Business Profile active, exacte et vivante chaque mois sans y consacrer votre temps.",
      en: "Keep an existing Google Business Profile accurate, active and clean every month remotely.",
      vi: "Duy trì hồ sơ Google Maps chính xác, hoạt động đều đặn mỗi tháng từ xa.",
      ar: "حافظ على ملف نشاطك محدثاً ونشطاً كل شهر دون عناء الإدارة.",
      ru: "Поддерживайте актуальность, чистоту и регулярную активность вашей карточки.",
    },
    postsPerMonth: 2,
    photosPerMonth: 4,
    reviewsPerMonth: 8,
    optimizationCadence: { fr: "Contrôle mensuel informations + révision trimestrielle catégories", en: "Monthly info check + quarterly category review", vi: "Kiểm tra hàng tháng + rà soát quý", ar: "مراجعة شهرية للبيانات وفصلية للفئات", ru: "Ежемесячная проверка + квартальный аудит" },
    reportingLabel: { fr: "Rapport synthétique mensuel (vues, appels, itinéraires)", en: "Monthly summary report (views, calls, directions)", vi: "Báo cáo tóm tắt hàng tháng", ar: "تقرير شهري مختصر للأداء", ru: "Ежемесячный краткий отчёт" },
    deliverables: [
      { fr: "Mise à jour régulière des horaires, attributs, liens et informations fiche", en: "Regular updates of opening hours, attributes, links and info", vi: "Cập nhật giờ mở cửa, thuộc tính và liên kết", ar: "تحديث الساعات والسمات والروابط باستمرار", ru: "Актуализация часов работы, атрибутов и ссылок" },
      { fr: "Rédaction & publication de 2 Google Posts par mois", en: "Copywriting & publishing of 2 Google Posts / month", vi: "Viết và đăng 2 Google Posts / tháng", ar: "كتابة ونشر 2 منشور Google شهرياً", ru: "2 публикации Google Posts в месяц" },
      { fr: "Organisation & publication de 4 photos/mois (fournies par vos soins ou ressources autorisées)", en: "Curation & upload of 4 photos/month (client-provided or licensed stock)", vi: "Sắp xếp & đăng 4 ảnh/tháng (từ khách hàng hoặc kho bản quyền)", ar: "تنظيم ونشر 4 صور شهرياً (من العميل أو مصادر مرخصة)", ru: "Оформление и загрузка 4 фото/мес (клиентских или лицензионных)" },
      { fr: "Réponses personnalisées jusqu'à 8 avis clients / mois", en: "Tailored replies to up to 8 customer reviews / month", vi: "Phản hồi tối đa 8 đánh giá khách hàng / tháng", ar: "ردود مخصصة حتى 8 تقييمات عملاء / شهرياً", ru: "Персонализированные ответы до 8 отзывов / мес" },
      { fr: "Rapport mensuel des performances disponibles (vues, clics, appels)", en: "Monthly visibility & actions report (views, clicks, calls)", vi: "Báo cáo hiệu suất hàng tháng", ar: "تقرير شهري لمؤشرات الظهور والمكالمات", ru: "Ежемесячный отчёт по показателям" },
    ],
    limits: {
      fr: "1 seule fiche existante vérifiée · Hors stratégie Top 3 multi-requêtes · Visuels fournis par le client ou ressources numériques autorisées (aucun déplacement ni tournage).",
      en: "1 existing verified profile · Excludes custom Top 3 acquisition campaigns · Visuals client-provided or licensed digital stock (zero on-site shoot or travel).",
      vi: "Áp dụng cho 1 hồ sơ sẵn có · Không bao gồm chiến dịch Top 3 · Không quay chụp tại chỗ.",
      ar: "ملف واحد موثق · لا تشمل حملات Top 3 المخصصة · بدون تصوير ميداني.",
      ru: "1 подтверждённый профиль · Без кампании вывода в Топ-3 · Без выездной съёмки.",
    },
  },
  {
    id: "croissance",
    eurMonth: 169,
    popular: true,
    badge: { fr: "CROISSANCE · RECOMMANDÉ", en: "GROWTH · RECOMMENDED", vi: "TĂNG TRƯỞNG · ĐỀ XUẤT", ar: "النمو · موصى به", ru: "РОСТ · РЕКОМЕНДУЕМ" },
    name: { fr: "Gestion Fiche Croissance", en: "Growth Profile Management", vi: "Quản Lý & Tăng Trưởng", ar: "إدارة النمو والسمعة", ru: "Ведение и развитие профиля" },
    summary: {
      fr: "Animation hebdomadaire, optimisation sémantique continue et pilotage actif de votre e-réputation locale à distance.",
      en: "Weekly profile animation, continuous local semantic updates and active reputation management remotely.",
      vi: "Vận hành hàng tuần, tối ưu ngữ nghĩa liên tục và quản trị danh tiếng tích cực.",
      ar: "تنشيط أسبوعي، تحسين دلالي مستمر، وإدارة نشطة لسمعتك المحلية.",
      ru: "Еженедельная активность, регулярная семантика и активная работа с репутацией.",
    },
    postsPerMonth: 4,
    photosPerMonth: 8,
    reviewsPerMonth: 25,
    optimizationCadence: { fr: "Veille hebdomadaire + optimisation sémantique mensuelle complète", en: "Weekly monitoring + full monthly semantic optimisation", vi: "Giám sát hàng tuần + tối ưu ngữ nghĩa hàng tháng", ar: "متابعة أسبوعية وتحسين دلالي شهري متكامل", ru: "Еженедельный мониторинг + ежемесячная оптимизация" },
    reportingLabel: { fr: "Rapport mensuel complet + bilan comparatif trimestriel", en: "Detailed monthly report + quarterly visibility review", vi: "Báo cáo chi tiết tháng + đánh giá quý", ar: "تقرير شهري مفصل ومراجعة فصلية", ru: "Подробный отчёт ежемесячно + квартальный разбор" },
    deliverables: [
      { fr: "Veille hebdomadaire + protection anti-suggestions tierces non souhaitées", en: "Weekly profile guard & validation against unwanted third-party edits", vi: "Bảo vệ hồ sơ hàng tuần trước chỉnh sửa từ bên ngoài", ar: "حماية أسبوعية للملف من التعديلات غير المصرح بها", ru: "Еженедельная защита профиля от сторонних правок" },
      { fr: "4 Google Posts SEO / mois (actualités, services phares, offres saisonnières)", en: "4 SEO Google Posts / month (news, key services, offers)", vi: "4 Google Posts chuẩn SEO / tháng", ar: "4 منشورات Google SEO شهرياً", ru: "4 SEO-поста Google в месяц" },
      { fr: "Retouche éditoriale & publication de 8 visuels / mois (fournis ou banque autorisée)", en: "Light editing & upload of 8 visuals / month (provided or licensed assets)", vi: "Biên tập nhẹ & đăng 8 hình ảnh / tháng", ar: "تنسيق ونشر 8 صور شهرياً من مصادر معتمدة", ru: "Подготовка и публикация 8 визуалов / мес" },
      { fr: "Réponses rédigées jusqu'à 25 avis / mois + kit numérique PDF/QR d'aide aux avis authentiques", en: "Tailored replies to up to 25 reviews / month + printable digital PDF/QR review kit", vi: "Phản hồi tới 25 đánh giá / tháng + bộ PDF/QR xin đánh giá", ar: "الرد على حتى 25 تقييماً + ملف PDF/QR رقمي لجمع المراجعات", ru: "Ответы до 25 отзывов / мес + цифровой PDF/QR-набор для отзывов" },
      { fr: "Optimisation mensuelle des services, descriptions sémantiques et FAQ fiche", en: "Monthly semantic updates on services, descriptions and profile Q&A", vi: "Tối ưu dịch vụ, mô tả và Q&A hàng tháng", ar: "تحسين شهري لقائمة الخدمات والأسئلة الشائعة", ru: "Ежемесячное обновление услуг, описаний и Q&A" },
    ],
    limits: {
      fr: "Kit avis livré uniquement au format numérique PDF prêt à imprimer (aucun support physique NFC ni déplacement sur site). Hors garantie de position Top 3.",
      en: "Review kit delivered as printable digital PDF only (no physical NFC plaques or on-site visits). No Top 3 algorithmic rank guarantee.",
      vi: "Bộ QR chỉ bàn giao bản PDF kỹ thuật số · Không giao bảng vật lý hay cam kết cứng Top 3.",
      ar: "ملف جمع التقييمات رقمي بصيغة PDF فقط بدون لوحات مادية أو ضمان ترتيب.",
      ru: "QR-комплект предоставляется в цифровом PDF без физической стойки и гарантии Топ-3.",
    },
  },
  {
    id: "intensif",
    eurMonth: 299,
    badge: { fr: "INTENSIF · DIRECTION LOCALE", en: "INTENSIVE · FULL CARE", vi: "CHUYÊN SÂU · TOÀN DIỆN", ar: "المكثفة · إدارة متكاملة", ru: "ИНТЕНСИВ · МАКСИМУМ" },
    name: { fr: "Gestion Fiche Intensif", en: "Intensive Local Direction", vi: "Quản Lý Chuyên Sâu", ar: "الإدارة المحلية المكثفة", ru: "Интенсивное сопровождение" },
    summary: {
      fr: "Pour les établissements à fort volume d'avis et d'offres nécessitant un rythme éditorial soutenu et un pilotage dédié.",
      en: "Designed for high-volume venues needing frequent Google Posts, rapid review replies and strategic follow-up.",
      vi: "Dành cho doanh nghiệp nhiều đánh giá cần tần suất cập nhật dày đặc.",
      ar: "مصممة للأنشطة ذات التفاعل العالي التي تتطلب وتيرة نشر ومتابعة مركزة.",
      ru: "Для компаний с высоким потоком отзывов и частыми обновлениями.",
    },
    postsPerMonth: 8,
    photosPerMonth: 16,
    reviewsPerMonth: 60,
    optimizationCadence: { fr: "Optimisation sémantique bimensuelle + synchronisation catalogue & offres", en: "Bi-weekly semantic updates + services/products catalogue sync", vi: "Tối ưu mỗi 2 tuần + đồng bộ danh mục sản phẩm/dịch vụ", ar: "تحسين دلالي كل أسبوعين ومزامنة كتالوج الخدمات", ru: "Оптимизация раз в 2 недели + ведение каталога услуг" },
    reportingLabel: { fr: "Rapport avancé mensuel + point visio 20 min avec chef de projet", en: "Advanced monthly report + 20-min video review call", vi: "Báo cáo chuyên sâu + họp video 20 phút hàng tháng", ar: "تقرير متقدم شهرياً + اجتماع فيديو 20 دقيقة", ru: "Расширенный отчёт + созвон 20 минут каждый месяц" },
    deliverables: [
      { fr: "8 Google Posts / mois (2 par semaine, temps forts commerciaux & saisonnalité)", en: "8 Google Posts / month (twice weekly editorial & promo cadence)", vi: "8 Google Posts / tháng (2 bài/tuần)", ar: "8 منشورات Google شهرياً (منشوران أسبوعياً)", ru: "8 постов Google в месяц (2 в неделю)" },
      { fr: "Organisation jusqu'à 16 visuels / mois (fournis ou ressources autorisées)", en: "Up to 16 curated visuals / month (client or licensed digital resources)", vi: "Sắp xếp & tối ưu tối đa 16 ảnh / tháng", ar: "تنسيق حتى 16 صورة شهرياً من مصادر معتمدة", ru: "До 16 подготовленных визуалов в месяц" },
      { fr: "Réponses sous 48h ouvrées jusqu'à 60 avis / mois + audit réputation", en: "48h business-day replies up to 60 reviews / month", vi: "Phản hồi trong 48h làm việc tới 60 đánh giá / tháng", ar: "الرد خلال 48 ساعة عمل حتى 60 تقييماً شهرياً", ru: "Ответы за 48ч (раб.) до 60 отзывов в месяц" },
      { fr: "Optimisation sémantique bimensuelle + structuration complète Produits / Services GBP", en: "Bi-weekly local semantics + full GBP Products/Services structuring", vi: "Cập nhật ngữ nghĩa 2 lần/tháng + cấu trúc Sản phẩm/Dịch vụ GBP", ar: "تحسين دلالي نصف شهري وهيكلة كاملة للمنتجات والخدمات", ru: "Би-еженедельная семантика + каталог товаров/услуг" },
      { fr: "Point visio mensuel 20 min & suivi des signaux disponibles sur la zone", en: "Monthly 20-min review call & local competitor signal watch", vi: "Họp 20 phút hàng tháng & theo dõi tín hiệu đối thủ", ar: "مكالمة متابعة 20 دقيقة شهرياً ومراقبة المنافسين", ru: "Ежемесячный 20-мин созвон и мониторинг зоны" },
    ],
    limits: {
      fr: "Prestation 100 % réalisée à distance par l'équipe XR Agency · 1 fiche (multi-fiches sur devis dégressif) · Hors tournages/shooting sur place et budget Google Ads.",
      en: "100% remote delivery · 1 listing (multi-location discounted quote available) · Excludes on-site shoots and paid ad spend.",
      vi: "Triển khai 100% từ xa · 1 hồ sơ · Không bao gồm quay chụp tại chỗ.",
      ar: "تنفيذ 100% عن بُعد · ملف واحد · لا تشمل التصوير الميداني أو الإعلانات الممولة.",
      ru: "100% удалённая работа · 1 карточка · Без выездной съёмки и рекламного бюджета.",
    },
  },
];
