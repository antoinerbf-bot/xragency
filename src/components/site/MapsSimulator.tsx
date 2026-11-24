import { useState, useMemo, useRef, useEffect } from "react";
import {
  MapPinned,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Award,
  BarChart3,
  Gauge,
  Utensils,
  Hotel,
  Stethoscope,
  Scale,
  Home,
  Hammer,
  Briefcase,
  Globe,
  Navigation,
  Phone,
  ArrowRight,
  Plus,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";
import { useOptionalFunnel } from "@/lib/funnel";

const MAPS_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "Restaurant / Bar": "Restaurant / Bar",
    "Hôtel / Spa": "Hotel / Spa",
    "Santé / Médecin": "Healthcare / Doctor",
    "Avocat / Notaire": "Lawyer / Notary",
    Immobilier: "Real Estate",
    "Artisan / BTP": "Trades / Construction",
    "Beauté / Bien-être": "Beauty / Wellness",
    "Autre commerce": "Other Business",
    "Petite ville": "Small Town",
    "Ville moyenne": "Mid-sized City",
    "Grande ville": "Major City",
    Métropole: "Metropolis",
    "< 50 000 hab.": "< 50,000 inhab.",
    "50 000 – 150 000": "50,000 – 150,000",
    "150 000 – 500 000": "150,000 – 500,000",
    "500 000+": "500,000+",
    "1 à 3": "1 to 3",
    "4 à 6": "4 to 6",
    "7 à 10": "7 to 10",
    "mots-clés principaux": "main keywords",
    "Absent de Maps": "Not on Maps",
    "Fiche non créée ou invisible": "Listing not created or invisible",
    "Hors Top 20": "Outside Top 20",
    "Très peu visible": "Very low visibility",
    "Position 4 – 10": "Position 4 – 10",
    "Visible mais pas dans le Pack": "Visible but outside the Local Pack",
    "SIMULATION EN DIRECT": "LIVE SIMULATION",
    "RECHERCHE CIBLE": "TARGET SEARCH",
    "POSITION ACTUELLE": "CURRENT POSITION",
    "VISIBILITÉ À CONSTRUIRE": "VISIBILITY TO BUILD",
    "SIGNAL À RENFORCER": "SIGNAL TO STRENGTHEN",
    "POSITIONNEMENT À DÉVELOPPER": "POSITIONING TO IMPROVE",
    "Configurateur de projet": "Project Configurator",
    "Estimez votre investissement Google Maps": "Estimate your Google Maps investment",
    "Votre secteur d'activité": "Your industry",
    "Taille de votre ville": "City size",
    "Nombre de mots-clés principaux": "Number of main keywords",
    "Votre positionnement actuel sur Google Maps": "Your current Google Maps ranking",
    "Budget indicatif · à partir de 999 € / an": "Indicative budget · from €999 / year",
    "/ an": "/ year",
    "Estimation indicative · tarif exact après audit personnalisé":
      "Indicative estimate · exact price after personalized audit",
    "Objectif Top 3 · étude locale sur mesure": "Top 3 Target · tailored local study",
    "Lancer la simulation": "Run the simulation",
    "Audit initial offert": "Initial audit included",
    "Périmètre contractuel clair": "Clear contractual scope",
    "Rapport mensuel inclus": "Monthly report included",
    "Sans engagement minimum": "No minimum commitment",
    "Méthodologie exclusive": "Exclusive methodology",
    "Le processus en 7 phases": "The 7-Phase Process",
    "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.":
      "A structured, transparent and measurable approach to enhance your local visibility.",
    "à partir de 999 € / an · objectif Top 3 sans garantie de position":
      "From €999 / year · Top 3 objective without position guarantee",
    "Analyse Initiale": "Initial Analysis",
    "Diagnostic de présence": "Presence Diagnostic",
    "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.":
      "Complete technical audit of your current listing, review history, NAP data consistency and potential penalties.",
    "Audit Concurrentiel": "Competitor Audit",
    "Décryptage du TOP 3": "Top 3 Breakdown",
    "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.":
      "In-depth analysis of the 3 competitors currently occupying the Local Pack: review volume, keywords and authority.",
    "Stratégie Ciblée": "Targeted Strategy",
    "Mots-clés & Zones": "Keywords & Areas",
    "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.":
      "Rigorous selection of high-converting search queries and mapping of priority geographical radiuses.",
    "Optimisation GBP": "GBP Optimization",
    "Restructuration Pro": "Pro Restructuring",
    "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.":
      "Optimization of primary/secondary categories, geotagged HD visuals, key attributes and service catalog.",
    "Autorité Locale": "Local Authority",
    "Signaux & Citations NAP": "NAP Signals & Citations",
    "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.":
      "Deployment of consistent local citations (Name, Address, Phone) and reinforcement of territorial authority.",
    "Pilotage Actif": "Active Management",
    "Veille & Ajustements": "Monitoring & Tuning",
    "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.":
      "Regular strategic updates, geotagged posts publication and conversion-optimized review responses.",
    "Résultats & ROI": "Results & ROI",
    "Mesure transparente": "Transparent Tracking",
    "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.":
      "Weekly ranking dashboard, phone call tracking and direction request metrics.",
    "TOP 3 PACK LOCAL · PROJECTION XR AGENCY": "TOP 3 LOCAL PACK · XR AGENCY PROJECTION",
    "Votre Établissement": "Your Business",
    "Simulation illustrative · avis fictifs":
      "Illustrative sample listing · fictional rating and reviews",
    "Exemple de données · résultats variables selon le marché":
      "Illustrative data · outcomes vary by market",
    "Ouvert · Ferme à 23h30": "Open · Closes 11:30 PM",
    "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée":
      "Local excellence · Exceptional setting, flawless service and certified reputation",
    "Site web": "Website",
    Itinéraire: "Directions",
    Appeler: "Call",
    "Concurrent B (Fiche standard)": "Competitor B (Standard listing)",
    "4.1 ★★★★☆ (34 avis) · Fiche non optimisée": "4.1 ★★★★☆ (34 reviews) · Unoptimized listing",
    "Concurrent C (Peu visible)": "Competitor C (Low visibility)",
    "3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs":
      "3.8 ★★★☆☆ (12 reviews) · Missing catalog and attributes",
    "Ouvert actuellement": "Open now",
    "Note 4,5★ et +": "Rated 4.5★+",
    "Visite virtuelle": "Virtual tour",
    "Trafic fluide": "Clear traffic",
    "Calculateur de Rentabilité & ROI Local": "Local Profitability & ROI Calculator",
    "Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :":
      "Direct Top 3 Google Maps impact on your revenue:",
    "Recherches locales / mois": "Local searches / mo",
    "Trafic capté par le Top 3": "Traffic captured by Top 3",
    "Nouveaux clients estimés": "Estimated new clients",
    "CA additionnel estimé": "Estimated added revenue",
    "Réserver mon secteur avant mes concurrents": "Claim my sector before competitors",
    "La rentabilité dépend de vos marges, de la demande et des résultats obtenus.":
      "Payback depends on your margins, demand and actual results.",
  },
  vi: {
    "Restaurant / Bar": "Nhà hàng / Bar",
    "Hôtel / Spa": "Khách sạn / Spa",
    "Santé / Médecin": "Y tế / Bác sĩ",
    "Avocat / Notaire": "Luật sư / Công chứng viên",
    Immobilier: "Bất động sản",
    "Artisan / BTP": "Thợ thủ công / Xây dựng",
    "Beauté / Bien-être": "Làm đẹp / Sức khỏe",
    "Autre commerce": "Doanh nghiệp khác",
    "Petite ville": "Thành phố nhỏ",
    "Ville moyenne": "Thành phố vừa",
    "Grande ville": "Thành phố lớn",
    Métropole: "Đô thị lớn",
    "< 50 000 hab.": "< 50.000 dân",
    "50 000 – 150 000": "50.000 – 150.000",
    "150 000 – 500 000": "150.000 – 500.000",
    "500 000+": "500.000+",
    "1 à 3": "1 đến 3",
    "4 à 6": "4 đến 6",
    "7 à 10": "7 đến 10",
    "mots-clés principaux": "từ khóa chính",
    "Absent de Maps": "Chưa có trên Maps",
    "Fiche non créée ou invisible": "Chưa tạo hồ sơ hoặc không hiển thị",
    "Hors Top 20": "Ngoài Top 20",
    "Très peu visible": "Khả năng hiển thị rất thấp",
    "Position 4 – 10": "Vị trí 4 – 10",
    "Visible mais pas dans le Pack": "Có hiển thị nhưng ngoài Local Pack",
    "SIMULATION EN DIRECT": "MÔ PHỎNG TRỰC TIẾP",
    "RECHERCHE CIBLE": "TÌM KIẾM MỤC TIÊU",
    "POSITION ACTUELLE": "VỊ TRÍ HIỆN TẠI",
    "VISIBILITÉ À CONSTRUIRE": "CẦN XÂY DỰNG HIỂN THỊ",
    "SIGNAL À RENFORCER": "CẦN TĂNG CƯỜNG TÍN HIỆU",
    "POSITIONNEMENT À DÉVELOPPER": "CẦN CẢI THIỆN THỨ HẠNG",
    "Configurateur de projet": "Cấu hình dự án",
    "Estimez votre investissement Google Maps": "Ước tính ngân sách Google Maps",
    "Votre secteur d'activité": "Lĩnh vực hoạt động",
    "Taille de votre ville": "Quy mô thành phố",
    "Nombre de mots-clés principaux": "Số lượng từ khóa chính",
    "Votre positionnement actuel sur Google Maps": "Thứ hạng Google Maps hiện tại",
    "Budget indicatif · à partir de 999 € / an": "Ngân sách tham khảo · từ 999 € / năm",
    "/ an": "/ năm",
    "Estimation indicative · tarif exact après audit personnalisé":
      "Ước tính tham khảo · giá chính xác sau kiểm toán cá nhân hóa",
    "Objectif Top 3 · étude locale sur mesure":
      "Mục tiêu Top 3 · nghiên cứu địa phương theo yêu cầu",
    "Lancer la simulation": "Chạy mô phỏng",
    "Audit initial offert": "Miễn phí kiểm toán ban đầu",
    "Périmètre contractuel clair": "Phạm vi hợp đồng rõ ràng",
    "Rapport mensuel inclus": "Bao gồm báo cáo hằng tháng",
    "Sans engagement minimum": "Không cam kết thời hạn tối thiểu",
    "Méthodologie exclusive": "Phương pháp độc quyền",
    "Le processus en 7 phases": "Quy trình 7 giai đoạn",
    "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.":
      "Phương pháp tiếp cận có cấu trúc, minh bạch và đo lường được để nâng cao khả năng hiển thị địa phương của bạn.",
    "à partir de 999 € / an · objectif Top 3 sans garantie de position":
      "Từ 999 € / năm · Mục tiêu Top 3 không cam kết vị trí cố định",
    "Analyse Initiale": "Phân tích ban đầu",
    "Diagnostic de présence": "Chẩn đoán hiện diện",
    "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.":
      "Kiểm toán kỹ thuật toàn diện hồ sơ hiện tại, lịch sử đánh giá, tính nhất quán dữ liệu và các hình phạt tiềm ẩn.",
    "Audit Concurrentiel": "Kiểm toán đối thủ",
    "Décryptage du TOP 3": "Phân tích TOP 3",
    "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.":
      "Phân tích chuyên sâu 3 đối thủ đang chiếm giữ Local Pack: lượng đánh giá, từ khóa và độ uy tín.",
    "Stratégie Ciblée": "Chiến lược mục tiêu",
    "Mots-clés & Zones": "Từ khóa & Khu vực",
    "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.":
      "Lựa chọn kỹ lưỡng các truy vấn có tỷ lệ chuyển đổi cao và lập bản đồ bán kính địa lý ưu tiên.",
    "Optimisation GBP": "Tối ưu hóa GBP",
    "Restructuration Pro": "Tái cấu trúc chuyên nghiệp",
    "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.":
      "Tối ưu danh mục chính/phụ, gắn tọa độ hình ảnh HD, thuộc tính cốt lõi và danh mục dịch vụ.",
    "Autorité Locale": "Uy tín địa phương",
    "Signaux & Citations NAP": "Tín hiệu & Trích dẫn NAP",
    "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.":
      "Triển khai trích dẫn địa phương đồng bộ (Tên, Địa chỉ, Số điện thoại) và tăng cường vị thế khu vực.",
    "Pilotage Actif": "Quản trị chủ động",
    "Veille & Ajustements": "Theo dõi & Điều chỉnh",
    "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.":
      "Cập nhật chiến lược định kỳ, xuất bản bài đăng cục bộ và phản hồi đánh giá khách hàng tối ưu.",
    "Résultats & ROI": "Kết quả & ROI",
    "Mesure transparente": "Đo lường minh bạch",
    "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.":
      "Bảng điều khiển theo dõi thứ hạng hằng tuần, số cuộc gọi đến và yêu cầu chỉ đường.",
    "TOP 3 PACK LOCAL · PROJECTION XR AGENCY": "TOP 3 LOCAL PACK · DỰ BÁO XR AGENCY",
    "Votre Établissement": "Doanh nghiệp của bạn",
    "Simulation illustrative · avis fictifs": "Ví dụ minh họa · điểm đánh giá và nhận xét giả lập",
    "Exemple de données · résultats variables selon le marché":
      "Dữ liệu minh họa · kết quả thay đổi theo thị trường",
    "Ouvert · Ferme à 23h30": "Đang mở cửa · Đóng cửa lúc 23:30",
    "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée":
      "Uy tín hàng đầu · Không gian đẳng cấp, dịch vụ hoàn hảo và danh tiếng chứng thực",
    "Site web": "Website",
    Itinéraire: "Chỉ đường",
    Appeler: "Gọi điện",
    "Concurrent B (Fiche standard)": "Đối thủ B (Hồ sơ tiêu chuẩn)",
    "4.1 ★★★★☆ (34 avis) · Fiche non optimisée": "4.1 ★★★★☆ (34 đánh giá) · Chưa tối ưu",
    "Concurrent C (Peu visible)": "Đối thủ C (Hiển thị kém)",
    "3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs":
      "3.8 ★★★☆☆ (12 đánh giá) · Thiếu danh mục và thuộc tính",
    "Ouvert actuellement": "Đang mở cửa",
    "Note 4,5★ et +": "Đánh giá 4.5★+",
    "Visite virtuelle": "Tham quan ảo",
    "Trafic fluide": "Giao thông thông suốt",
    "Calculateur de Rentabilité & ROI Local": "Công cụ tính Lợi nhuận & ROI địa phương",
    "Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :":
      "Tác động trực tiếp của Top 3 Google Maps lên doanh thu của bạn:",
    "Recherches locales / mois": "Lượt tìm kiếm địa phương / tháng",
    "Trafic capté par le Top 3": "Lưu lượng Top 3 nắm giữ",
    "Nouveaux clients estimés": "Khách hàng mới ước tính",
    "CA additionnel estimé": "Doanh thu bổ sung ước tính",
    "Réserver mon secteur avant mes concurrents": "Đặt chỗ khu vực của tôi trước đối thủ",
    "La rentabilité dépend de vos marges, de la demande et des résultats obtenus.":
      "Thời gian hoàn vốn phụ thuộc biên lợi nhuận, nhu cầu và kết quả thực tế.",
  },
  ru: {
    "Restaurant / Bar": "Ресторан / бар",
    "Hôtel / Spa": "Отель / спа",
    "Santé / Médecin": "Медицина / врач",
    "Avocat / Notaire": "Юрист / нотариус",
    Immobilier: "Недвижимость",
    "Artisan / BTP": "Мастер / строительство",
    "Beauté / Bien-être": "Красота / wellness",
    "Autre commerce": "Другой бизнес",
    "Petite ville": "Небольшой город",
    "Ville moyenne": "Средний город",
    "Grande ville": "Крупный город",
    Métropole: "Мегаполис",
    "< 50 000 hab.": "< 50 000 жит.",
    "50 000 – 150 000": "50 000 – 150 000",
    "150 000 – 500 000": "150 000 – 500 000",
    "500 000+": "500 000+",
    "1 à 3": "1–3",
    "4 à 6": "4–6",
    "7 à 10": "7–10",
    "mots-clés principaux": "основных ключевых слов",
    "Absent de Maps": "Нет на Maps",
    "Fiche non créée ou invisible": "Профиль не создан или не виден",
    "Hors Top 20": "За пределами топ-20",
    "Très peu visible": "Очень низкая видимость",
    "Position 4 – 10": "Позиция 4–10",
    "Visible mais pas dans le Pack": "Видимость есть, но не в Local Pack",
    "SIMULATION EN DIRECT": "ИНТЕРАКТИВНАЯ СИМУЛЯЦИЯ",
    "RECHERCHE CIBLE": "ЦЕЛЕВОЙ ПОИСК",
    "POSITION ACTUELLE": "ТЕКУЩАЯ ПОЗИЦИЯ",
    "VISIBILITÉ À CONSTRUIRE": "ВИДИМОСТЬ НУЖНО СОЗДАТЬ",
    "SIGNAL À RENFORCER": "СИГНАЛ НУЖНО УСИЛИТЬ",
    "POSITIONNEMENT À DÉVELOPPER": "ПОЗИЦИЮ НУЖНО УЛУЧШИТЬ",
    "Configurateur de projet": "Конфигуратор проекта",
    "Estimez votre investissement Google Maps": "Оцените инвестиции в Google Maps",
    "Votre secteur d'activité": "Ваша сфера деятельности",
    "Taille de votre ville": "Размер города",
    "Nombre de mots-clés principaux": "Количество основных ключевых слов",
    "Votre positionnement actuel sur Google Maps": "Ваше текущее положение в Google Maps",
    "Budget indicatif · à partir de 999 € / an": "Ориентировочный бюджет · от 999 € в год",
    "/ an": "/ год",
    "Estimation indicative · tarif exact après audit personnalisé":
      "Предварительная оценка · точная цена после персонального аудита",
    "Objectif Top 3 · étude locale sur mesure":
      "Цель — топ-3 · индивидуальное локальное исследование",
    "Lancer la simulation": "Запустить симуляцию",
    "Audit initial offert": "Первичный аудит включён",
    "Périmètre contractuel clair": "Чёткий объём договора",
    "Rapport mensuel inclus": "Ежемесячный отчёт включён",
    "Sans engagement minimum": "Без минимального срока обязательств",
    "Méthodologie exclusive": "Эксклюзивная методология",
    "Le processus en 7 phases": "Процесс из 7 этапов",
    "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.":
      "Структурированный, прозрачный и измеримый подход для усиления вашей локальной видимости.",
    "à partir de 999 € / an · objectif Top 3 sans garantie de position":
      "От 999 € в год · Цель — топ-3 без гарантии точной позиции",
    "Analyse Initiale": "Начальный анализ",
    "Diagnostic de présence": "Диагностика присутствия",
    "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.":
      "Полный технический аудит текущего профиля, истории отзывов, согласованности данных и возможных санкций.",
    "Audit Concurrentiel": "Анализ конкурентов",
    "Décryptage du TOP 3": "Разбор топ-3",
    "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.":
      "Детальный анализ 3 лидеров в Local Pack: объём отзывов, ключевые слова и авторитет профиля.",
    "Stratégie Ciblée": "Целевая стратегия",
    "Mots-clés & Zones": "Ключи и зоны",
    "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.":
      "Тщательный отбор конверсионных запросов и картирование приоритетных географических зон.",
    "Optimisation GBP": "Оптимизация GBP",
    "Restructuration Pro": "Про-реструктуризация",
    "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.":
      "Оптимизация категорий, геотегирование HD-фото, ключевые атрибуты и каталог услуг.",
    "Autorité Locale": "Локальный авторитет",
    "Signaux & Citations NAP": "Сигналы и NAP-цитирования",
    "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.":
      "Размещение единых локальных упоминаний (Имя, Адрес, Телефон) и усиление территориального доверия.",
    "Pilotage Actif": "Активное управление",
    "Veille & Ajustements": "Мониторинг и правки",
    "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.":
      "Регулярные стратегические обновления, публикации с геолокацией и оптимизированные ответы на отзывы.",
    "Résultats & ROI": "Результаты и ROI",
    "Mesure transparente": "Прозрачная отчётность",
    "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.":
      "Еженедельный дашборд отслеживания позиций, звонков и запросов маршрута.",
    "TOP 3 PACK LOCAL · PROJECTION XR AGENCY": "ТОП-3 LOCAL PACK · ПРОГНОЗ XR AGENCY",
    "Votre Établissement": "Ваша компания",
    "Simulation illustrative · avis fictifs": "Иллюстративный пример · условный рейтинг и отзывы",
    "Exemple de données · résultats variables selon le marché":
      "Иллюстративные данные · результат зависит от рынка",
    "Ouvert · Ferme à 23h30": "Открыто · Закрывается в 23:30",
    "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée":
      "Локальный лидер · Премиальный сервис, безупречное качество и подтверждённая репутация",
    "Site web": "Сайт",
    Itinéraire: "Маршрут",
    Appeler: "Позвонить",
    "Concurrent B (Fiche standard)": "Конкурент B (Обычный профиль)",
    "4.1 ★★★★☆ (34 avis) · Fiche non optimisée": "4.1 ★★★★☆ (34 отзыва) · Профиль не оптимизирован",
    "Concurrent C (Peu visible)": "Конкурент C (Низкая видимость)",
    "3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs":
      "3.8 ★★★☆☆ (12 отзывов) · Нет каталога и атрибутов",
    "Ouvert actuellement": "Открыто сейчас",
    "Note 4,5★ et +": "Оценка 4.5★+",
    "Visite virtuelle": "3D-тур",
    "Trafic fluide": "Дорога свободна",
    "Calculateur de Rentabilité & ROI Local": "Калькулятор окупаемости и локального ROI",
    "Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :":
      "Прямое влияние топ-3 Google Maps на вашу прибыль:",
    "Recherches locales / mois": "Локальных поисков / мес",
    "Trafic capté par le Top 3": "Трафик, забираемый топ-3",
    "Nouveaux clients estimés": "Оценка новых клиентов",
    "CA additionnel estimé": "Ориентировочная доп. выручка",
    "Réserver mon secteur avant mes concurrents": "Занять нишу раньше конкурентов",
    "La rentabilité dépend de vos marges, de la demande et des résultats obtenus.":
      "Окупаемость зависит от маржи, спроса и фактических результатов.",
  },
  ar: {
    "Restaurant / Bar": "مطعم / بار",
    "Hôtel / Spa": "فندق / سبا",
    "Santé / Médecin": "الصحة / طبيب",
    "Avocat / Notaire": "محامٍ / موثق",
    Immobilier: "العقارات",
    "Artisan / BTP": "حرفي / إنشاءات",
    "Beauté / Bien-être": "الجمال / العافية",
    "Autre commerce": "نشاط تجاري آخر",
    "Petite ville": "مدينة صغيرة",
    "Ville moyenne": "مدينة متوسطة",
    "Grande ville": "مدينة كبيرة",
    Métropole: "منطقة حضرية كبرى",
    "< 50 000 hab.": "< 50,000 نسمة",
    "50 000 – 150 000": "50,000 – 150,000",
    "150 000 – 500 000": "150,000 – 500,000",
    "500 000+": "+500,000",
    "1 à 3": "1 إلى 3",
    "4 à 6": "4 إلى 6",
    "7 à 10": "7 إلى 10",
    "mots-clés principaux": "كلمات مفتاحية رئيسية",
    "Absent de Maps": "غير موجود على Maps",
    "Fiche non créée ou invisible": "الملف غير منشأ أو غير ظاهر",
    "Hors Top 20": "خارج أفضل 20",
    "Très peu visible": "ظهور محدود جدًا",
    "Position 4 – 10": "الترتيب 4–10",
    "Visible mais pas dans le Pack": "ظاهر ولكن خارج الحزمة المحلية",
    "SIMULATION EN DIRECT": "محاكاة مباشرة",
    "RECHERCHE CIBLE": "البحث المستهدف",
    "POSITION ACTUELLE": "الترتيب الحالي",
    "VISIBILITÉ À CONSTRUIRE": "يلزم بناء الظهور",
    "SIGNAL À RENFORCER": "يلزم تعزيز الإشارات",
    "POSITIONNEMENT À DÉVELOPPER": "يلزم تحسين الترتيب",
    "Configurateur de projet": "مُهيّئ المشروع",
    "Estimez votre investissement Google Maps": "قدّر استثمارك في Google Maps",
    "Votre secteur d'activité": "مجال نشاطك",
    "Taille de votre ville": "حجم مدينتك",
    "Nombre de mots-clés principaux": "عدد الكلمات المفتاحية الرئيسية",
    "Votre positionnement actuel sur Google Maps": "ترتيبك الحالي على Google Maps",
    "Budget indicatif · à partir de 999 € / an": "ميزانية تقديرية · ابتداءً من 999 € سنويًا",
    "/ an": "/ سنويًا",
    "Estimation indicative · tarif exact après audit personnalisé":
      "تقدير أولي · السعر الدقيق بعد التدقيق المخصص",
    "Objectif Top 3 · étude locale sur mesure": "هدف أفضل 3 · دراسة محلية مخصصة",
    "Lancer la simulation": "ابدأ المحاكاة",
    "Audit initial offert": "التدقيق الأولي مشمول",
    "Périmètre contractuel clair": "نطاق تعاقدي واضح",
    "Rapport mensuel inclus": "تقرير شهري مشمول",
    "Sans engagement minimum": "دون حد أدنى للالتزام",
    "Méthodologie exclusive": "منهجية حصرية",
    "Le processus en 7 phases": "العملية في 7 مراحل",
    "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.":
      "نهج منظم وشفاف وقابل للقياس لتعزيز ظهورك المحلي.",
    "à partir de 999 € / an · objectif Top 3 sans garantie de position":
      "ابتداءً من 999 € سنويًا · هدف الوصول لأفضل 3 دون ضمان ترتيب محدد",
    "Analyse Initiale": "التحليل الأولي",
    "Diagnostic de présence": "تشخيص الحضور",
    "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.":
      "تدقيق تقني شامل لملفك الحالي، وسجل التقييمات، وتناسق البيانات، وأي عقوبات محتملة.",
    "Audit Concurrentiel": "تدقيق المنافسين",
    "Décryptage du TOP 3": "تحليل أفضل 3",
    "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.":
      "تحليل دقيق لأبرز 3 منافسين يتصدرون الحزمة المحلية: حجم التقييمات، والكلمات المفتاحية، والسمعة.",
    "Stratégie Ciblée": "استراتيجية مستهدفة",
    "Mots-clés & Zones": "الكلمات والمناطق",
    "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.":
      "اختيار مدروس للعبارات ذات معدل التحويل العالي وتحديد النطاقات الجغرافية ذات الأولوية.",
    "Optimisation GBP": "تحسين ملف GBP",
    "Restructuration Pro": "إعادة هيكلة احترافية",
    "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.":
      "تحسين الفئات الأساسية والفرعية، ووضع الإحداثيات لصور HD، والسمات الرئيسية وكتالوج الخدمات.",
    "Autorité Locale": "السلطة المحلية",
    "Signaux & Citations NAP": "إشارات واقتباسات NAP",
    "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.":
      "نشر اقتباسات محلية متطابقة (الاسم، العنوان، الهاتف) وتعزيز الموثوقية في نطاقك الجغرافي.",
    "Pilotage Actif": "إدارة ومتابعة نشطة",
    "Veille & Ajustements": "رصد وتحديثات مستمرة",
    "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.":
      "تحديثات استراتيجية دورية، نشر منشورات جغرافية، وردود مُحسَّنة على تقييمات العملاء.",
    "Résultats & ROI": "النتائج وعائد الاستثمار",
    "Mesure transparente": "قياس شفاف",
    "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.":
      "لوحة تحكم أسبوعية لتتبع الترتيب، وعدد المكالمات الهاتفية، وطلبات الاتجاهات.",
    "TOP 3 PACK LOCAL · PROJECTION XR AGENCY": "أفضل 3 بالحزمة المحلية · توقعات XR AGENCY",
    "Votre Établissement": "منشأتك",
    "Simulation illustrative · avis fictifs": "مثال توضيحي · تقييمات ومراجعات افتراضية",
    "Exemple de données · résultats variables selon le marché":
      "بيانات توضيحية · تختلف النتائج حسب السوق",
    "Ouvert · Ferme à 23h30": "مفتوح · يغلق عند الساعة 23:30",
    "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée":
      "ريادة محلية · موقع استثنائي، خدمة رفيعة المستوى وسمعة معتمدة",
    "Site web": "الموقع الإلكتروني",
    Itinéraire: "الاتجاهات",
    Appeler: "اتصال",
    "Concurrent B (Fiche standard)": "المنافس ب (ملف قياسي)",
    "4.1 ★★★★☆ (34 avis) · Fiche non optimisée": "4.1 ★★★★☆ (34 تقييم) · ملف غير محسّن",
    "Concurrent C (Peu visible)": "المنافس ج (ظهور ضعيف)",
    "3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs":
      "3.8 ★★★☆☆ (12 تقييم) · يفتقر للكتالوج والميزات",
    "Ouvert actuellement": "مفتوح حالياً",
    "Note 4,5★ et +": "تقييم 4.5★ فما فوق",
    "Visite virtuelle": "جولة افتراضية",
    "Trafic fluide": "حركة مرور سلسة",
    "Calculateur de Rentabilité & ROI Local": "حاسبة العائد والربحية المحلية",
    "Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :":
      "الأثر المباشر لبلوغ أفضل 3 على إيراداتك:",
    "Recherches locales / mois": "عمليات البحث المحلية / شهر",
    "Trafic capté par le Top 3": "حركة المرور المكتسبة من أفضل 3",
    "Nouveaux clients estimés": "العملاء الجدد المتوقعون",
    "CA additionnel estimé": "الإيراد الإضافي المتوقع",
    "Réserver mon secteur avant mes concurrents": "احجز قطاعك قبل منافسيك",
    "La rentabilité dépend de vos marges, de la demande et des résultats obtenus.":
      "تعتمد فترة استرداد الاستثمار على هامش الربح والطلب والنتائج الفعلية.",
  },
};
function translateMaps(value: string, lang: string) {
  return MAPS_TRANSLATIONS[lang]?.[value] ?? value;
}

/* ── Sector options (editorial icons, zero generic emoji) ── */
const SECTORS: { id: string; Icon: LucideIcon; label: string }[] = [
  { id: "resto", Icon: Utensils, label: "Restaurant / Bar" },
  { id: "hotel", Icon: Hotel, label: "Hôtel / Spa" },
  { id: "sante", Icon: Stethoscope, label: "Santé / Médecin" },
  { id: "juridique", Icon: Scale, label: "Avocat / Notaire" },
  { id: "immo", Icon: Home, label: "Immobilier" },
  { id: "artisan", Icon: Hammer, label: "Artisan / BTP" },
  { id: "beaute", Icon: Sparkles, label: "Beauté / Bien-être" },
  { id: "autre", Icon: Briefcase, label: "Autre commerce" },
];

const MAPS_UI: Record<
  Lang,
  {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    subtitle: string;
    disclaimerBadge: string;
    simBadge: string;
    sampleCardBadge: string;
    keywordsLabel: string;
    keywordsPlaceholder: string;
    hasListingLabel: string;
    hasListingYes: string;
    hasListingNo: string;
    roiBadge: string;
    offer1Badge: string;
    offer1Note: string;
    offer1NoOnline: string;
    offer1Cta: string;
    offer2Badge: string;
    offer2Title: string;
    offer2Sub: string;
    offer2Desc: string;
    offer2Cta: string;
    modalEyebrow: string;
    modalTitle: string;
    modalSuccessTitle: string;
    modalSuccessBody: string;
    modalClose: string;
    modalCompany: string;
    modalName: string;
    modalPhone: string;
    modalEmail: string;
    modalSubmit: string;
    modalSending: string;
    modalFootnote: string;
    trust1: string;
    trust2: string;
    trust3: string;
    trust4: string;
  }
> = {
  fr: {
    eyebrow: "GOOGLE MAPS & VISIBILITÉ LOCALE",
    headingLead: "Construisons votre visibilité sur Google Maps,",
    headingAccent: "sur mesure.",
    subtitle:
      "À partir de 999 € / an, selon votre marché et le périmètre défini après audit. L’objectif de la prestation est d’améliorer votre visibilité locale ; aucune position Google ne peut être garantie. Gestion annuelle de fiche disponible à 500 € / an.",
    disclaimerBadge:
      "Simulation pédagogique à titre illustratif · périmètre et objectif définis après audit, sans garantie de position",
    simBadge: "SIMULATION PÉDAGOGIQUE",
    sampleCardBadge: "EXEMPLE ILLUSTRATIF",
    keywordsLabel: "Recherches locales et zone ciblées",
    keywordsPlaceholder: "Ex : Restaurant Paris 8e, Hôtel Bordeaux, Agence immobilière Lyon...",
    hasListingLabel: "Avez-vous déjà une fiche Google Business Profile ?",
    hasListingYes: "Oui, fiche existante",
    hasListingNo: "Non, à créer",
    roiBadge: "PROJECTION ILLUSTRATIVE",
    offer1Badge: "OFFRE 1 · STRATÉGIE DE VISIBILITÉ LOCALE",
    offer1Note: "Estimation selon votre ville, concurrence & mots-clés · dès 999 € / an",
    offer1NoOnline:
      "Aucun paiement direct en ligne : tarif exact confirmé sur devis après étude de votre zone et de vos mots-clés.",
    offer1Cta: "Demander mon audit local",
    offer2Badge: "OFFRE 2 · GESTION ANNUELLE DE FICHE",
    offer2Title: "Gestion Annuelle Fiche Google Maps",
    offer2Sub: "/ an (forfait annuel unique)",
    offer2Desc:
      "Sans prélèvement mensuel : gestion complète de votre fiche Google Business Profile pendant 12 mois (photos, réponses aux avis, horaires et actualités).",
    offer2Cta: "Choisir la Gestion Annuelle (500 €/an)",
    modalEyebrow: "XR AGENCY · AUDIT VISIBILITÉ LOCALE",
    modalTitle: "Demander mon audit Google Maps",
    modalSuccessTitle: "Demande d'audit transmise",
    modalSuccessBody:
      "Votre demande a bien été transmise à notre équipe. Nous revenons vers vous dans les meilleurs délais avec une analyse adaptée à votre zone.",
    modalClose: "Fermer",
    modalCompany: "Nom de votre établissement / Société *",
    modalName: "Votre Nom / Prénom",
    modalPhone: "Téléphone / WhatsApp *",
    modalEmail: "Email (optionnel)",
    modalSubmit: "Envoyer ma demande d'audit local",
    modalSending: "Transmission en cours...",
    modalFootnote: "Étude sans engagement · Réponse personnalisée par l'équipe XR Agency.",
    trust1: "Audit préalable par notre équipe",
    trust2: "Suivi clair selon le périmètre convenu",
    trust3: "Conditions confirmées sur devis",
    trust4: "Sans abonnement mensuel imposé",
  },
  en: {
    eyebrow: "GOOGLE MAPS & LOCAL VISIBILITY",
    headingLead: "Build your local Google Maps visibility,",
    headingAccent: "tailor-made.",
    subtitle:
      "From €999 / year depending on your local market and scope confirmed after audit. Our goal is to strengthen local visibility; no Google ranking position can be guaranteed. Annual profile management available at €500 / year.",
    disclaimerBadge:
      "Illustrative pedagogical simulation · scope and local goals defined after audit, with no guaranteed ranking",
    simBadge: "ILLUSTRATIVE SIMULATION",
    sampleCardBadge: "SAMPLE LISTING",
    keywordsLabel: "Target local searches and area",
    keywordsPlaceholder: "e.g., Restaurant Paris 8, Boutique Hotel Bordeaux, Real Estate Lyon...",
    hasListingLabel: "Do you already have a Google Business Profile?",
    hasListingYes: "Yes, existing profile",
    hasListingNo: "No, needs setup",
    roiBadge: "ILLUSTRATIVE MODEL",
    offer1Badge: "OFFER 1 · LOCAL VISIBILITY STRATEGY",
    offer1Note: "Indicative estimate by city size, competition & keywords · from €999 / year",
    offer1NoOnline:
      "No direct online checkout: final pricing is confirmed by quote after reviewing your area and keywords.",
    offer1Cta: "Request my local audit",
    offer2Badge: "OFFER 2 · ANNUAL LISTING MANAGEMENT",
    offer2Title: "Annual Google Business Profile Management",
    offer2Sub: "/ year (single annual fee)",
    offer2Desc:
      "No monthly billing: 12 months of active Google Business Profile management (photos, review responses, hours, updates and posts).",
    offer2Cta: "Choose Annual Management (€500/yr)",
    modalEyebrow: "XR AGENCY · LOCAL VISIBILITY AUDIT",
    modalTitle: "Request my Google Maps audit",
    modalSuccessTitle: "Audit request received",
    modalSuccessBody:
      "Your simulation has been shared with our team. We will get back to you promptly with a tailored local analysis.",
    modalClose: "Close",
    modalCompany: "Business / Company name *",
    modalName: "Your Full Name",
    modalPhone: "Phone / WhatsApp *",
    modalEmail: "Email (optional)",
    modalSubmit: "Send my local audit request",
    modalSending: "Sending...",
    modalFootnote: "No commitment · Personalised review by the XR Agency team.",
    trust1: "Pre-project audit by our team",
    trust2: "Clear tracking aligned with agreed scope",
    trust3: "Terms confirmed on written quote",
    trust4: "No forced monthly subscription",
  },
  vi: {
    eyebrow: "GOOGLE MAPS & HIỂN THỊ ĐỊA PHƯƠNG",
    headingLead: "Xây dựng hiển thị Google Maps,",
    headingAccent: "may đo theo thị trường.",
    subtitle:
      "Từ 999 € / năm tùy theo thị trường địa phương và phạm vi xác nhận sau kiểm toán. Không cam kết vị trí cố định trên Google. Gói quản trị hồ sơ thường niên: 500 € / năm.",
    disclaimerBadge:
      "Mô phỏng minh họa · phạm vi và mục tiêu xác nhận sau kiểm toán, không cam kết thứ hạng cố định",
    simBadge: "MÔ PHỎNG MINH HỌA",
    sampleCardBadge: "HỒ SƠ MẪU",
    keywordsLabel: "Từ khóa địa phương và khu vực mục tiêu",
    keywordsPlaceholder: "VD: Nhà hàng Quận 1, Khách sạn Đà Nẵng...",
    hasListingLabel: "Bạn đã có hồ sơ Google Business Profile chưa?",
    hasListingYes: "Đã có hồ sơ",
    hasListingNo: "Chưa, cần tạo mới",
    roiBadge: "MÔ HÌNH MINH HỌA",
    offer1Badge: "GÓI 1 · CHIẾN LƯỢC HIỂN THỊ ĐỊA PHƯƠNG",
    offer1Note: "Ước tính tham khảo theo quy mô thành phố và từ khóa · từ 999 € / năm",
    offer1NoOnline: "Không thanh toán trực tuyến tự động: báo giá chính xác xác nhận sau khi đánh giá khu vực.",
    offer1Cta: "Yêu cầu kiểm toán địa phương",
    offer2Badge: "GÓI 2 · QUẢN TRỊ HỒ SƠ THƯỜNG NIÊN",
    offer2Title: "Quản trị Hồ sơ Google Maps hằng năm",
    offer2Sub: "/ năm (trọn gói 12 tháng)",
    offer2Desc:
      "Không trừ tiền hằng tháng: quản trị toàn diện hồ sơ Google Maps trong 12 tháng (hình ảnh, phản hồi đánh giá, giờ mở cửa, bài đăng).",
    offer2Cta: "Chọn gói Quản trị năm (500 €/năm)",
    modalEyebrow: "XR AGENCY · KIỂM TOÁN ĐỊA PHƯƠNG",
    modalTitle: "Yêu cầu kiểm toán Google Maps",
    modalSuccessTitle: "Đã tiếp nhận yêu cầu",
    modalSuccessBody:
      "Thông tin mô phỏng đã được chuyển đến đội ngũ XR Agency. Chúng tôi sẽ phản hồi sớm với phân tích phù hợp cho khu vực của bạn.",
    modalClose: "Đóng",
    modalCompany: "Tên doanh nghiệp / Cơ sở *",
    modalName: "Họ và tên",
    modalPhone: "Điện thoại / WhatsApp *",
    modalEmail: "Email (không bắt buộc)",
    modalSubmit: "Gửi yêu cầu kiểm toán",
    modalSending: "Đang gửi...",
    modalFootnote: "Không ràng buộc · Phản hồi cá nhân hóa từ đội ngũ XR Agency.",
    trust1: "Đánh giá ban đầu bởi đội ngũ",
    trust2: "Theo dõi minh bạch theo phạm vi",
    trust3: "Điều khoản rõ ràng trong báo giá",
    trust4: "Không bắt buộc gói tháng",
  },
  ar: {
    eyebrow: "خرائط GOOGLE والحضور المحلي",
    headingLead: "نعزز حضورك على خرائط Google،",
    headingAccent: "بمقاس نشاطك.",
    subtitle:
      "ابتداءً من 999 € سنويًا حسب السوق ونطاق العمل المحدد بعد التدقيق. الهدف هو تقوية الظهور المحلي دون ضمان أي ترتيب محدد على Google. الإدارة السنوية متاحة مقابل 500 € سنويًا.",
    disclaimerBadge:
      "محاكاة توضيحية تعليمية · يتم تحديد النطاق والأهداف بعد التدقيق دون ضمان ترتيب محدد",
    simBadge: "محاكاة توضيحية",
    sampleCardBadge: "بطاقة توضيحية",
    keywordsLabel: "عمليات البحث المحلية والمنطقة المستهدفة",
    keywordsPlaceholder: "مثال: مطعم باريس، فندق دبي...",
    hasListingLabel: "هل لديك ملف Google Business Profile بالفعل؟",
    hasListingYes: "نعم، ملف قائم",
    hasListingNo: "لا، يحتاج إنشاء",
    roiBadge: "نموذج توضيحي",
    offer1Badge: "العرض 1 · استراتيجية الظهور المحلي",
    offer1Note: "تقدير أولي حسب حجم المدينة والمنافسة والكلمات · ابتداءً من 999 € سنويًا",
    offer1NoOnline: "بدون دفع فوري عبر الإنترنت: يتم تأكيد السعر النهائي في عرض رسمي بعد دراسة منطقتك.",
    offer1Cta: "طلب التدقيق المحلي",
    offer2Badge: "العرض 2 · الإدارة السنوية للملف",
    offer2Title: "الإدارة السنوية لملف خرائط Google",
    offer2Sub: "/ سنويًا (باقة سنوية موحدة)",
    offer2Desc:
      "بدون خصم شهري: إدارة كاملة لملفك على خرائط Google لمدة 12 شهرًا (الصور، الرد على التقييمات، ساعات العمل والتحديثات).",
    offer2Cta: "اختيار الإدارة السنوية (500 €/سنة)",
    modalEyebrow: "XR AGENCY · تدقيق الظهور المحلي",
    modalTitle: "طلب تدقيق خرائط Google",
    modalSuccessTitle: "تم إرسال طلب التدقيق",
    modalSuccessBody:
      "وصلت محاكاتك إلى فريقنا بنجاح. سنتواصل معك في أقرب وقت بتحليل مخصص لمنطقتك.",
    modalClose: "إغلاق",
    modalCompany: "اسم المؤسسة / الشركة *",
    modalName: "الاسم الكامل",
    modalPhone: "الهاتف / واتساب *",
    modalEmail: "البريد الإلكتروني (اختياري)",
    modalSubmit: "إرسال طلب التدقيق المحلي",
    modalSending: "جارٍ الإرسال...",
    modalFootnote: "دراسة دون التزام · مراجعة مخصصة من فريق XR Agency.",
    trust1: "تدقيق أولي من فريقنا",
    trust2: "متابعة واضحة ضمن النطاق المتفق عليه",
    trust3: "تأكيد الشروط في العرض الرسمي",
    trust4: "بدون اشتراك شهري إلزامي",
  },
  ru: {
    eyebrow: "GOOGLE MAPS И ЛОКАЛЬНАЯ ВИДИМОСТЬ",
    headingLead: "Выстраиваем видимость в Google Maps,",
    headingAccent: "индивидуально.",
    subtitle:
      "От 999 € в год в зависимости от рынка и объёма работ после аудита. Цель — усиление локальной видимости без гарантий конкретных позиций Google. Годовое ведение карточки — 500 € в год.",
    disclaimerBadge:
      "Иллюстративная симуляция · объём и цели определяются после аудита, без гарантии конкретной позиции",
    simBadge: "ИЛЛЮСТРАТИВНАЯ СИМУЛЯЦИЯ",
    sampleCardBadge: "ПРИМЕР КАРТОЧКИ",
    keywordsLabel: "Целевые локальные запросы и район",
    keywordsPlaceholder: "Напр.: Ресторан Париж, Отель Лион, Недвижимость Марбелья...",
    hasListingLabel: "У вас уже есть профиль Google Business Profile?",
    hasListingYes: "Да, профиль есть",
    hasListingNo: "Нет, нужно создать",
    roiBadge: "ОРИЕНТИРОВОЧНАЯ МОДЕЛЬ",
    offer1Badge: "ПРЕДЛОЖЕНИЕ 1 · ЛОКАЛЬНАЯ СТРАТЕГИЯ",
    offer1Note: "Предварительная оценка по городу, конкуренции и запросам · от 999 € / год",
    offer1NoOnline: "Без автоматической онлайн-оплаты: финальная стоимость подтверждается в смете после аудита.",
    offer1Cta: "Запросить локальный аудит",
    offer2Badge: "ПРЕДЛОЖЕНИЕ 2 · ГОДОВОЕ ВЕДЕНИЕ ПРОФИЛЯ",
    offer2Title: "Годовое ведение карточки Google Maps",
    offer2Sub: "/ год (единый годовой тариф)",
    offer2Desc:
      "Без ежемесячных списаний: 12 месяцев ведения профиля Google Business Profile (фото, ответы на отзывы, расписание и новости).",
    offer2Cta: "Выбрать годовое ведение (500 €/год)",
    modalEyebrow: "XR AGENCY · ЛОКАЛЬНЫЙ АУДИТ",
    modalTitle: "Запросить аудит Google Maps",
    modalSuccessTitle: "Запрос на аудит отправлен",
    modalSuccessBody:
      "Ваши параметры переданы команде XR Agency. Мы свяжемся с вами в ближайшее время с анализом по вашему региону.",
    modalClose: "Закрыть",
    modalCompany: "Название компании / заведения *",
    modalName: "Ваше имя",
    modalPhone: "Телефон / WhatsApp *",
    modalEmail: "Email (необязательно)",
    modalSubmit: "Отправить запрос на аудит",
    modalSending: "Отправка...",
    modalFootnote: "Без обязательств · Персональный разбор от команды XR Agency.",
    trust1: "Предварительный аудит команды",
    trust2: "Прозрачная отчётность по объёму",
    trust3: "Условия фиксируются в предложении",
    trust4: "Без навязанной ежемесячной подписки",
  },
};

/* ── City size options ── */
const CITY_SIZES = [
  { id: "small", label: "Petite ville", sub: "0 – 10 000 hab.", multiplier: 1.0 },
  { id: "medium", label: "Ville moyenne", sub: "10 000 – 50 000 hab.", multiplier: 1.35 },
  { id: "large", label: "Grande ville", sub: "50 000 – 250 000 hab.", multiplier: 1.85 },
  { id: "metro", label: "Métropole", sub: "250 000+ hab. (ex: Paris)", multiplier: 2.65 },
];

/* ── Keywords volume options ── */
const KEYWORD_RANGES = [
  { id: "k1", label: "1 à 3", sub: "mots-clés stratégiques", factor: 1.0 },
  { id: "k2", label: "4 à 6", sub: "mots-clés stratégiques", factor: 1.35 },
  { id: "k3", label: "7 à 10", sub: "mots-clés haute concurrence", factor: 1.75 },
];

/* ── Current ranking options ── */
const CURRENT_RANKS = [
  { id: "4to10", label: "1re Page (Pos. 4–10)", sub: "Visible mais hors Top 3", penalty: 1.0 },
  { id: "below20", label: "2e à 4e Page", sub: "Peu visible sur la zone", penalty: 1.25 },
  { id: "absent", label: "Absent / Pas de fiche", sub: "Tout est à construire", penalty: 1.45 },
];

/* ── 7-Phase methodology ── */
const PHASES = [
  {
    num: "01",
    name: "Analyse Initiale",
    title: "Diagnostic de présence",
    desc: "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.",
  },
  {
    num: "02",
    name: "Audit Concurrentiel",
    title: "Décryptage du TOP 3",
    desc: "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.",
  },
  {
    num: "03",
    name: "Stratégie Ciblée",
    title: "Mots-clés & Zones",
    desc: "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.",
  },
  {
    num: "04",
    name: "Optimisation GBP",
    title: "Restructuration Pro",
    desc: "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.",
  },
  {
    num: "05",
    name: "Autorité Locale",
    title: "Signaux & Citations NAP",
    desc: "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.",
  },
  {
    num: "06",
    name: "Pilotage Actif",
    title: "Veille & Ajustements",
    desc: "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.",
  },
  {
    num: "07",
    name: "Résultats & ROI",
    title: "Mesure transparente",
    desc: "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.",
  },
];

/* ── Animated price counter ── */
function useAnimatedPrice(target: number, duration = 500) {
  const [val, setVal] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    prevRef.current = target;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return val;
}

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

/* ── Selector Button ── */
function SelectorBtn({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-center text-xs transition-all duration-200",
        selected
          ? "border-[#171613] bg-[#171613] text-[#F7F4EE] shadow-sm"
          : "border-[#171613]/12 bg-[#FAF8F4] text-[#45413A] hover:border-[#9E7F5A] hover:bg-white hover:text-[#171613]",
        className,
      )}
    >
      {children}
    </button>
  );
}

const SECTOR_SUGGESTIONS: Record<string, string[]> = {
  resto: ["Restaurant gastronomique", "Terrasse & cocktail", "Meilleur brunch", "Table d'exception"],
  hotel: ["Hôtel boutique 4★", "Spa & bien-être", "Chambre avec vue", "Séjour de charme"],
  sante: ["Cabinet médical", "Chirurgien dentiste", "Clinique esthétique", "Prise de rdv rapide"],
  juridique: ["Cabinet d'avocats affaires", "Étude notariale", "Droit des sociétés", "Conseil fiscal"],
  immo: ["Agence immobilière prestige", "Estimation immobilière", "Achat appartement luxe", "Gestion locative"],
  btp: ["Rénovation haut de gamme", "Architecte d'intérieur", "Entreprise générale", "Dépannage urgent"],
  beaute: ["Salon de coiffure prestige", "Institut de beauté", "Massage & spa", "Soins du visage"],
  autre: ["Boutique concept store", "Commerce de proximité", "Service premium", "Showroom"],
};

export function MapsSimulator() {
  const { lang } = useLang();
  const safeLang: Lang = lang in MAPS_UI ? (lang as Lang) : "fr";
  const ui = MAPS_UI[safeLang];
  const isRtl = safeLang === "ar";
  const tx = (value: string) => translateMaps(value, lang);

  const funnel = useOptionalFunnel();

  const [sector, setSector] = useState(SECTORS[0].id);
  const [citySize, setCitySize] = useState(CITY_SIZES[0].id);
  const [keywords, setKeywords] = useState(KEYWORD_RANGES[0].id);
  const [rank, setRank] = useState(CURRENT_RANKS[0].id);
  const [keywordList, setKeywordList] = useState<string[]>([
    "Restaurant gastronomique Paris",
    "Terrasse & cocktail",
  ]);
  const [newKeywordInput, setNewKeywordInput] = useState("");
  const [hasListing, setHasListing] = useState<"yes" | "no">("yes");
  const customKeywords = keywordList.join(", ");

  const handleAddKeyword = (kw: string) => {
    const trimmed = kw.trim();
    if (!trimmed || keywordList.includes(trimmed)) return;
    if (keywordList.length >= 8) return;
    setKeywordList((prev) => [...prev, trimmed]);
    setNewKeywordInput("");
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywordList((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!funnel?.sector) return;
    const map: Record<string, string> = {
      restaurant: "resto",
      hospitality: "hotel",
      health: "sante",
      realestate: "immo",
      beauty: "beaute",
      services: "juridique",
      commerce: "autre",
    };
    const target = map[funnel.sector];
    if (target && target !== sector) {
      setSector(target);
    }
  }, [funnel?.sector, sector]);

  /* ── Dynamic price calculation (Base 999 € / an) ── */
  const { priceMin, priceMax, competitionInfo } = useMemo(() => {
    const base = 999;
    const sizeMul = CITY_SIZES.find((c) => c.id === citySize)?.multiplier ?? 1;

    // Count of keywords factor
    const kwCount = Math.max(keywordList.length, 1);
    const kwCountFactor = kwCount === 1 ? 1.0 : kwCount <= 2 ? 1.15 : kwCount <= 4 ? 1.35 : kwCount <= 6 ? 1.6 : 1.95;

    // Text analysis for hyper-competitive terms
    const textAll = keywordList.join(" ").toLowerCase();
    const hasUltraCompetitive = /paris|dubai|lyon|bordeaux|urgence|luxe|prestige|avocat|chirurgien/.test(textAll);
    const kwDifficultyFactor = hasUltraCompetitive ? 1.2 : 1.0;

    const rankPenalty = CURRENT_RANKS.find((r) => r.id === rank)?.penalty ?? 1;
    const noListingBonus = hasListing === "no" ? 1.15 : 1.0;

    const raw = base * sizeMul * kwCountFactor * kwDifficultyFactor * rankPenalty * noListingBonus;
    const minVal = raw <= 1050 ? 999 : Math.round(raw / 50) * 50;

    // Calculate Competition Score & Level
    let compScore = (sizeMul - 1) * 2 + (kwCountFactor - 1) * 2.5 + (rankPenalty - 1) * 1.5;
    if (hasUltraCompetitive) compScore += 1.5;

    let compLevel = "Modérée";
    let compColor = "text-emerald-700 bg-emerald-50 border-emerald-300";
    let compProgress = 40;
    let compDesc = "Pack Local accessible rapidement avec un travail régulier de signaux et d'avis.";

    if (compScore > 2.8) {
      compLevel = "Ultra-Élevée (Top 3 disputé)";
      compColor = "text-amber-800 bg-amber-50 border-amber-300";
      compProgress = 90;
      compDesc = "Zone hyper-concurrentielle : autorité forte requise, netlinking local et stratégie multi-points.";
    } else if (compScore > 1.4) {
      compLevel = "Compétition Active";
      compColor = "text-blue-800 bg-blue-50 border-blue-200";
      compProgress = 68;
      compDesc = "Zone disputée : optimisation complète GBP, photos géolocalisées et réponses aux avis.";
    }

    return {
      priceMin: minVal,
      priceMax: Math.round((raw * 1.4) / 50) * 50,
      competitionInfo: {
        level: compLevel,
        color: compColor,
        progress: compProgress,
        desc: compDesc,
        count: kwCount,
      },
    };
  }, [citySize, keywordList, rank, hasListing]);

  const animMin = useAnimatedPrice(priceMin);
  const animMax = useAnimatedPrice(priceMax);

  const [showAuditModal, setShowAuditModal] = useState(false);
  const [leadCompany, setLeadCompany] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadCompany.trim() || !leadPhone.trim()) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: leadContact.trim() || leadCompany.trim(),
          company: leadCompany.trim(),
          phone: leadPhone.trim(),
          email:
            leadEmail.trim() ||
            `contact@${leadCompany.toLowerCase().replace(/[^a-z0-9]/g, "") || "client"}.fr`,
          need: `Stratégie Google Maps · 1 an (${animMin} € - ${animMax} € / an)`,
          message: `Simulation Google Maps :\n• Établissement : ${leadCompany}\n• Contact : ${leadContact || "Non précisé"}\n• Mots-clés : ${customKeywords || "Standards"}\n• Secteur : ${sectorLabel}\n• Ville : ${cityLabel}\n• Position actuelle : ${rankLabel}\n• Estimation affichée : ${animMin} € à ${animMax} € / an.\n• Téléphone : ${leadPhone}`,
        }),
      });
      setSubmitSuccess(true);
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSector = SECTORS.find((s) => s.id === sector);
  const sectorLabel = tx(selectedSector?.label ?? "");
  const cityLabel = tx(CITY_SIZES.find((c) => c.id === citySize)?.label ?? "");
  const kwLabel = `${keywordList.length} ${keywordList.length > 1 ? "mots-clés" : "mot-clé"} (${keywordList.slice(0, 2).join(", ")}${keywordList.length > 2 ? "..." : ""})`;
  const rankLabel = tx(CURRENT_RANKS.find((r) => r.id === rank)?.label ?? "");

  const roiMetrics = useMemo(() => {
    const cityData: Record<string, { searches: number; example: Record<string, string> }> = {
      small: {
        searches: 2400,
        example: { fr: "Cannes", en: "Oxford", vi: "Đà Lạt", ar: "عجمان", ru: "Сочи" },
      },
      medium: {
        searches: 5200,
        example: { fr: "Bordeaux", en: "Bristol", vi: "Đà Nẵng", ar: "الشارقة", ru: "Казань" },
      },
      large: {
        searches: 11400,
        example: {
          fr: "Lyon",
          en: "Manchester",
          vi: "Hà Nội",
          ar: "أبوظبي",
          ru: "Санкт-Петербург",
        },
      },
      metro: {
        searches: 24800,
        example: {
          fr: "Paris 8e",
          en: "London Mayfair",
          vi: "TP. Hồ Chí Minh",
          ar: "دبي",
          ru: "Москва",
        },
      },
    };

    const kwFactor = Math.max(1, keywordList.length * 0.45);
    const baseSearches = Math.round((cityData[citySize]?.searches ?? 5000) * kwFactor);
    const top3Captured = Math.round(baseSearches * 0.38); // 38% CTR Local Pack
    const newClients = Math.max(16, Math.round(top3Captured * 0.045));
    const avgBasket =
      sector === "juridique"
        ? 450
        : sector === "hotel"
          ? 280
          : sector === "immo"
            ? 850
            : sector === "resto"
              ? 75
              : sector === "sante"
                ? 120
                : 95;
    const addedRevenueMonth = Math.round(newClients * avgBasket);
    const cityName =
      cityData[citySize]?.example[lang as keyof typeof cityData.small.example] ??
      cityData[citySize]?.example.fr;

    return {
      baseSearches,
      top3Captured,
      newClients,
      addedRevenueMonth,
      cityName,
    };
  }, [citySize, keywords, sector, lang]);

  const waPrefill = encodeURIComponent(
    (
      {
        fr:
          `Bonjour XR Agency, je souhaite une étude Google Maps Top 3 sur mesure.\n\n` +
          `• Secteur : ${sectorLabel}\n` +
          `• Taille de ville : ${cityLabel}\n` +
          `• Mots-clés : ${kwLabel}\n` +
          `• Position actuelle : ${rankLabel}\n\n` +
          `Référence de départ : à partir de 999 € / an · devis sur mesure\n\n` +
          `Pouvons-nous lancer l'audit personnalisé ?`,
        en:
          `Hello XR Agency, I would like a tailored Google Maps Top 3 study.\n\n` +
          `• Industry: ${sectorLabel}\n` +
          `• City size: ${cityLabel}\n` +
          `• Keywords: ${kwLabel}\n` +
          `• Current ranking: ${rankLabel}\n\n` +
          `Starting benchmark: from €999 / year · tailored quote\n\n` +
          `Can we start the personalised audit?`,
        vi:
          `Xin chào XR Agency, tôi muốn được tư vấn gói Google Maps Top 3 theo yêu cầu.\n\n` +
          `• Lĩnh vực: ${sectorLabel}\n` +
          `• Quy mô thành phố: ${cityLabel}\n` +
          `• Từ khóa: ${kwLabel}\n` +
          `• Thứ hạng hiện tại: ${rankLabel}\n\n` +
          `Mức tham khảo: từ 999 € / năm · báo giá theo yêu cầu\n\n` +
          `Chúng ta có thể bắt đầu kiểm toán cá nhân hóa không?`,
        ar:
          `مرحبًا XR Agency، أود الحصول على دراسة مخصصة لبلوغ أفضل 3 مراتب على Google Maps.\n\n` +
          `• مجال النشاط: ${sectorLabel}\n` +
          `• حجم المدينة: ${cityLabel}\n` +
          `• الكلمات المفتاحية: ${kwLabel}\n` +
          `• الترتيب الحالي: ${rankLabel}\n\n` +
          `المرجع المبدئي: ابتداءً من 999 € سنويًا · عرض مخصص\n\n` +
          `هل يمكننا بدء التدقيق المخصص؟`,
        ru:
          `Здравствуйте, XR Agency! Хочу заказать индивидуальный расчёт по выводу в топ-3 Google Maps.\n\n` +
          `• Сфера: ${sectorLabel}\n` +
          `• Размер города: ${cityLabel}\n` +
          `• Ключевые слова: ${kwLabel}\n` +
          `• Текущая позиция: ${rankLabel}\n\n` +
          `Базовый ориентир: от 999 € в год · индивидуальный расчёт\n\n` +
          `Можем ли мы запустить персональный аудит?`,
      } as const
    )[lang as "fr" | "en" | "vi" | "ar" | "ru"] ??
      `Bonjour XR Agency, je souhaite une étude Google Maps Top 3 sur mesure.`,
  );

  return (
    <section
      id="maps"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative border-y border-[#171613]/10 bg-[#F7F4EE] py-16 text-[#171613] sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        {/* ── Section Header (Editorial Ivory / Charcoal / Bronze) ── */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-7 bg-[#9E7F5A]" aria-hidden />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7D6445]">
              {ui.eyebrow}
            </span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-[#171613] sm:text-5xl">
            {ui.headingLead}{" "}
            <span className="italic font-normal text-[#9E7F5A]">{ui.headingAccent}</span>
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#57534B] sm:text-base">
            {ui.subtitle}
          </p>

          {/* ── Clear Pedagogical Disclaimer Badge ── */}
          <Reveal delay={60}>
            <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-[#171613]/12 bg-white px-4 py-2.5 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#171613]/10 bg-[#FAF8F4]">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-label="Google" role="img">
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.23a4.47 4.47 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.55c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.74 9.74 0 0 0 12 21.55Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.53 13.64A5.84 5.84 0 0 1 6.23 12c0-.57.1-1.12.3-1.64V7.84H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.16l3.25-2.52Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.33c1.43 0 2.7.49 3.71 1.45l2.78-2.78C16.84 3.42 14.63 2.45 12 2.45a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52c.77-2.31 2.93-4.03 5.47-4.03Z"
                  />
                </svg>
              </span>
              <p className="text-xs font-medium leading-snug text-[#171613] sm:text-sm">
                {ui.disclaimerBadge}
              </p>
              <Award className="h-4.5 w-4.5 shrink-0 text-[#9E7F5A]" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={40}>
          <div className="overflow-hidden rounded-3xl border border-[#171613]/12 bg-white text-[#171613] shadow-[0_20px_50px_rgba(23,22,19,0.06)]">
            {/* Google Search Mockup Bar */}
            <div className="flex flex-col gap-3 border-b border-[#171613]/10 bg-[#FAF8F4] px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#171613]/10 bg-white shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Google" role="img">
                    <path
                      fill="#4285F4"
                      d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.23a4.47 4.47 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.55c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.74 9.74 0 0 0 12 21.55Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.53 13.64A5.84 5.84 0 0 1 6.23 12c0-.57.1-1.12.3-1.64V7.84H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.16l3.25-2.52Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.33c1.43 0 2.7.49 3.71 1.45l2.78-2.78C16.84 3.42 14.63 2.45 12 2.45a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52c.77-2.31 2.93-4.03 5.47-4.03Z"
                    />
                  </svg>
                </span>
                <div className="flex flex-1 items-center justify-between gap-2 rounded-full border border-[#171613]/12 bg-white px-4 py-2 text-xs text-[#171613]">
                  <span className="truncate font-medium">
                    {tx(selectedSector?.label ?? "")} · {roiMetrics.cityName}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7D6445]">
                    {ui.simBadge}
                  </span>
                </div>
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#9E7F5A]/30 bg-[#9E7F5A]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#6C5438]">
                  {tx("Ouvert actuellement")}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#171613]/10 bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#57534B]">
                  {tx("Note 4,5★ et +")}
                </span>
                <span className="hidden items-center gap-1 rounded-full border border-[#171613]/10 bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#57534B] sm:inline-flex">
                  {tx("Visite virtuelle")}
                </span>
                <span className="ms-auto font-mono text-[10px] text-[#57534B]">
                  {roiMetrics.baseSearches.toLocaleString()} {tx("Recherches locales / mois")}
                </span>
              </div>
            </div>

            {/* Main Stage: Left SERP Local 3-Pack + Right Vector Map */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.22fr_.78fr]">
              {/* Left Column: Local Pack Listings */}
              <div className="flex flex-col divide-y divide-[#171613]/10 p-4 sm:p-6">
                {/* #1 Illustrative Sample Listing */}
                <div className="relative rounded-2xl border border-[#9E7F5A]/45 bg-[#FAF8F4] p-4 shadow-sm sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171613] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
                      {tx("TOP 3 PACK LOCAL · PROJECTION XR AGENCY")}
                    </span>
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7D6445]">
                      {ui.sampleCardBadge}
                    </span>
                  </div>

                  <h4 className="mt-3 text-base font-semibold text-[#171613]">
                    {tx("Votre Établissement")} —{" "}
                    <span className="font-normal text-[#57534B]">
                      {tx(selectedSector?.label ?? "")}
                    </span>
                  </h4>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-[#9E7F5A]">4.9 ★</span>
                    <span className="text-[#57534B]">
                      ({tx("Simulation illustrative · avis fictifs")})
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs text-[#57534B]">
                    {tx(selectedSector?.label ?? "")} · {roiMetrics.cityName} ·{" "}
                    <span className="font-semibold text-[#1E563B]">
                      {tx("Ouvert · Ferme à 23h30")}
                    </span>
                  </p>

                  <p className="mt-2.5 border-s-2 border-[#9E7F5A]/50 ps-3 text-xs italic leading-relaxed text-[#57534B]">
                    &ldquo;
                    {tx(
                      "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée",
                    )}
                    &rdquo;
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#171613] px-3.5 py-1.5 text-[11px] font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823]"
                    >
                      <Globe className="h-3.5 w-3.5 text-white" />
                      {tx("Site web")}
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#171613]/15 bg-white px-3.5 py-1.5 text-[11px] font-medium text-[#171613] transition hover:border-[#9E7F5A]"
                    >
                      <Navigation className="h-3.5 w-3.5 text-[#7D6445]" />
                      {tx("Itinéraire")}
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#171613]/15 bg-white px-3.5 py-1.5 text-[11px] font-medium text-[#171613] transition hover:border-[#9E7F5A]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#7D6445]" />
                      {tx("Appeler")}
                    </a>
                  </div>

                  <div className="mt-3 rounded-xl border border-[#9E7F5A]/25 bg-[#F4EFE6] px-3 py-2">
                    <span className="text-[11px] font-medium text-[#6C5438]">
                      {tx("Exemple de données · résultats variables selon le marché")}
                    </span>
                  </div>
                </div>

                {/* #2 Competitor Card */}
                <div className="px-2 py-3.5 opacity-80">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#EEE9E0] text-[10px] font-bold text-[#57534B]">
                        2
                      </span>
                      <h5 className="text-xs font-semibold text-[#171613]">
                        {tx("Concurrent B (Fiche standard)")}
                      </h5>
                    </div>
                    <span className="text-[11px] font-medium text-[#9E7F5A]">4.1 ★ (34)</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#57534B]">
                    {tx("4.1 ★★★★☆ (34 avis) · Fiche non optimisée")}
                  </p>
                </div>

                {/* #3 Competitor Card */}
                <div className="px-2 py-3.5 opacity-65">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#EEE9E0] text-[10px] font-bold text-[#57534B]">
                        3
                      </span>
                      <h5 className="text-xs font-semibold text-[#171613]">
                        {tx("Concurrent C (Peu visible)")}
                      </h5>
                    </div>
                    <span className="text-[11px] font-medium text-[#9E7F5A]">3.8 ★ (12)</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#57534B]">
                    {tx("3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs")}
                  </p>
                </div>
              </div>

              {/* Right Column: Refined Dark Charcoal Editorial Vector Map */}
              <div className="relative min-h-[320px] overflow-hidden border-t border-[#171613]/10 bg-[#171613] text-[#F7F4EE] lg:border-s lg:border-t-0">
                <svg
                  viewBox="0 0 600 480"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full opacity-80"
                  aria-hidden
                >
                  <rect width="600" height="480" fill="#171613" />
                  <path
                    d="M-20 220 C140 180 260 270 420 240 S560 190 620 210"
                    fill="none"
                    stroke="#24221D"
                    strokeWidth="48"
                    strokeLinecap="round"
                  />
                  <rect x="40" y="40" width="120" height="90" rx="16" fill="#201E19" />
                  <rect x="420" y="60" width="140" height="110" rx="20" fill="#201E19" />
                  <rect x="280" y="320" width="160" height="100" rx="20" fill="#201E19" />
                  <path
                    d="M0 80 H600 M0 160 H600 M0 300 H600 M0 380 H600"
                    stroke="#2B2822"
                    strokeWidth="6"
                  />
                  <path
                    d="M100 0 V480 M220 0 V480 M360 0 V480 M480 0 V480"
                    stroke="#2B2822"
                    strokeWidth="6"
                  />
                  <path d="M-20 120 Q300 110 620 140" stroke="#3A352D" strokeWidth="12" />
                  <path d="M260 -20 Q280 240 310 500" stroke="#3A352D" strokeWidth="12" />
                  <path
                    d="M80 400 L220 400 L220 260 L360 260 L360 180"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                  />
                </svg>

                {/* Pin #1 */}
                <div className="absolute left-[60%] top-[38%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute h-16 w-16 rounded-full bg-emerald-500/20" />
                    <span className="absolute h-11 w-11 rounded-full bg-emerald-500/35" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#F7F4EE] bg-emerald-600 text-xs font-bold text-white shadow-lg">
                        #1
                      </div>
                      <div className="-mt-1 h-2 w-2 rotate-45 bg-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Pin #2 */}
                <div className="absolute left-[37%] top-[55%] -translate-x-1/2 -translate-y-1/2 opacity-80">
                  <div className="grid h-7 w-7 place-items-center rounded-full border border-[#F7F4EE]/40 bg-[#2C2924] text-[10px] font-semibold text-[#F7F4EE]">
                    #2
                  </div>
                </div>

                {/* Pin #3 */}
                <div className="absolute left-[78%] top-[68%] -translate-x-1/2 -translate-y-1/2 opacity-60">
                  <div className="grid h-6 w-6 place-items-center rounded-full border border-[#F7F4EE]/25 bg-[#23201B] text-[9px] font-semibold text-[#F7F4EE]/80">
                    #3
                  </div>
                </div>

                {/* Floating GPS Navigation chip */}
                <div className="absolute start-3 top-3 rounded-xl border border-[#F7F4EE]/15 bg-[#171613]/85 px-3 py-1.5 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <MapPinned className="h-3.5 w-3.5 text-white" />
                    <span className="font-mono text-[10px] font-medium text-[#F7F4EE]">
                      2,4 km · 6 min ({tx("Trafic fluide")})
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-[#F7F4EE]/12 bg-[#171613]/88 px-3 py-2 text-xs backdrop-blur-md">
                  <span className="font-mono text-[9px] tracking-wider text-[#F7F4EE]/75">
                    {rank === "absent"
                      ? tx("VISIBILITÉ À CONSTRUIRE")
                      : rank === "below20"
                        ? tx("SIGNAL À RENFORCER")
                        : tx("POSITIONNEMENT À DÉVELOPPER")}
                  </span>
                  <span className="font-mono text-[9px] font-semibold text-emerald-400">
                    {ui.simBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Intelligent Configurator ── */}
        <Reveal delay={60}>
          <div className="overflow-hidden rounded-3xl border border-[#171613]/12 bg-white shadow-[0_20px_50px_rgba(23,22,19,0.06)]">
            {/* Configurator header */}
            <div className="border-b border-[#171613]/10 bg-[#FAF8F4] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171613] text-white">
                  <Gauge className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7D6445]">
                    {tx("Configurateur de projet")}
                  </p>
                  <p className="mt-0.5 font-serif text-xl font-medium text-[#171613]">
                    {tx("Estimez votre investissement Google Maps")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              {/* Step 0 — Fiche Google Maps Existante */}
              <div className="rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <label className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#171613]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#171613] text-[10px] font-bold text-white">
                        0
                      </span>
                      {ui.hasListingLabel}
                    </label>
                    <p className="text-[11px] text-[#666] mt-0.5">
                      Si vous n'avez pas encore de fiche, la création et la validation sont intégralement incluses.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:w-64 shrink-0">
                    <SelectorBtn
                      selected={hasListing === "yes"}
                      onClick={() => setHasListing("yes")}
                    >
                      <span className="text-xs font-semibold">{ui.hasListingYes}</span>
                    </SelectorBtn>
                    <SelectorBtn
                      selected={hasListing === "no"}
                      onClick={() => {
                        setHasListing("no");
                        setRank("absent");
                      }}
                    >
                      <span className="text-xs font-semibold">{ui.hasListingNo}</span>
                    </SelectorBtn>
                  </div>
                </div>
              </div>

              {/* Step 1 — Sector */}
              <div>
                <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#57534B]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#171613] text-[10px] font-bold text-[#F7F4EE]">
                    1
                  </span>
                  {tx("Votre secteur d'activité")}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {SECTORS.map((s) => {
                    const Icon = s.Icon;
                    return (
                      <SelectorBtn
                        key={s.id}
                        selected={sector === s.id}
                        onClick={() => setSector(s.id)}
                      >
                        <Icon className="h-4.5 w-4.5 opacity-85" />
                        <span className="text-xs font-medium leading-tight">{tx(s.label)}</span>
                      </SelectorBtn>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 — City Size */}
              <div>
                <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#57534B]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#171613] text-[10px] font-bold text-[#F7F4EE]">
                    2
                  </span>
                  {tx("Taille de votre ville")}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CITY_SIZES.map((c) => (
                    <SelectorBtn
                      key={c.id}
                      selected={citySize === c.id}
                      onClick={() => setCitySize(c.id)}
                    >
                      <Building2 className="h-4 w-4 opacity-80" />
                      <span className="text-xs font-semibold">{tx(c.label)}</span>
                      <span className="text-[10px] opacity-75">{tx(c.sub)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 3 — Mots-clés Stratégiques & Diagnostic Concurrence */}
              <div className="rounded-2xl border border-[#9E7F5A]/25 bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE4] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#7D6445]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#171613] text-[10px] font-bold text-white">
                      3
                    </span>
                    Vos Mots-clés Stratégiques Ciblés ({keywordList.length}/8)
                  </p>

                  {/* Real-time competition badge */}
                  <div className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs", competitionInfo.color)}>
                    <Zap className="h-3.5 w-3.5 text-amber-600" />
                    <span>Concurrence : {competitionInfo.level}</span>
                  </div>
                </div>

                {/* Active Keyword Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {keywordList.map((kw, i) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#171613]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#171613] shadow-xs transition hover:border-red-300"
                    >
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(i)}
                        className="rounded-full p-0.5 text-[#888] hover:bg-red-50 hover:text-red-600 transition"
                        aria-label={`Supprimer ${kw}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {keywordList.length === 0 && (
                    <span className="text-xs italic text-[#777]">
                      Aucun mot-clé sélectionné. Cliquez sur une suggestion ci-dessous ou ajoutez le vôtre.
                    </span>
                  )}
                </div>

                {/* Input to add custom keywords */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddKeyword(newKeywordInput);
                  }}
                  className="mt-3 flex gap-2"
                >
                  <input
                    type="text"
                    value={newKeywordInput}
                    onChange={(e) => setNewKeywordInput(e.target.value)}
                    placeholder="Tapez un mot-clé précis (ex: Restaurant terrasse Paris 8e, Traiteur bio...)"
                    className="flex-1 rounded-xl border border-[#171613]/15 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-[#171613] placeholder:text-[#888] focus:border-[#9E7F5A] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!newKeywordInput.trim()}
                    className="inline-flex items-center gap-1 rounded-xl bg-[#171613] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2C2924] disabled:opacity-40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Ajouter</span>
                  </button>
                </form>

                {/* Quick 1-Click Suggestions for the chosen sector */}
                <div className="mt-3.5 pt-3 border-t border-[#171613]/10">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#8C7352]">
                    Suggestions 1-clic recommandées pour votre secteur :
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(SECTOR_SUGGESTIONS[sector] ?? SECTOR_SUGGESTIONS.resto).map((sug) => {
                      const already = keywordList.includes(sug);
                      return (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => handleAddKeyword(sug)}
                          disabled={already}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition",
                            already
                              ? "border-emerald-300 bg-emerald-50 text-emerald-800 opacity-60 cursor-default"
                              : "border-[#171613]/15 bg-white/80 text-[#3C3831] hover:border-[#9E7F5A] hover:bg-white"
                          )}
                        >
                          {!already && <Plus className="h-3 w-3 text-[#9E7F5A]" />}
                          <span>{sug}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Competition Progress Bar & Guidance */}
                <div className="mt-3.5 rounded-xl bg-white/70 p-3 border border-[#171613]/8">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#171613]">
                    <span>Indice d'intensité concurrentielle :</span>
                    <span className="font-mono">{competitionInfo.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E5DFD5]">
                    <div
                      className={cn("h-full transition-all duration-500 rounded-full", competitionInfo.progress > 75 ? "bg-amber-600" : competitionInfo.progress > 50 ? "bg-blue-600" : "bg-emerald-600")}
                      style={{ width: `${competitionInfo.progress}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#555] leading-relaxed">
                    {competitionInfo.desc}
                  </p>
                </div>
              </div>

              {/* Step 4 — Current Ranking */}
              <div>
                <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#57534B]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#171613] text-[10px] font-bold text-[#F7F4EE]">
                    4
                  </span>
                  {tx("Votre positionnement actuel sur Google Maps")}
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {CURRENT_RANKS.map((r) => (
                    <SelectorBtn key={r.id} selected={rank === r.id} onClick={() => setRank(r.id)}>
                      <MapPinned className="h-4 w-4 opacity-80" />
                      <span className="text-xs font-semibold leading-tight">{tx(r.label)}</span>
                      <span className="text-[10px] leading-tight opacity-75">{tx(r.sub)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* ── Illustrative Local Visibility & ROI Model ── */}
              <div className="rounded-2xl border border-[#171613]/12 bg-[#FAF8F4] p-5 sm:p-6">
                <div className="flex flex-col gap-3 border-b border-[#171613]/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="inline-flex items-center rounded-full border border-[#9E7F5A]/30 bg-[#9E7F5A]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6C5438]">
                      {tx("Calculateur de Rentabilité & ROI Local")}
                    </span>
                    <h4 className="mt-2 font-serif text-lg font-medium text-[#171613]">
                      {tx("Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :")}
                    </h4>
                  </div>
                  <span className="w-fit rounded-full border border-[#171613]/12 bg-white px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#57534B]">
                    {roiMetrics.cityName} · {ui.roiBadge}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-[#171613]/10 bg-white p-3.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#57534B]">
                      {tx("Recherches locales / mois")}
                    </span>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-[#171613]">
                      {roiMetrics.baseSearches.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#171613]/10 bg-white p-3.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#57534B]">
                      {tx("Trafic capté par le Top 3")}
                    </span>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-[#7D6445]">
                      +{roiMetrics.top3Captured.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#171613]/10 bg-white p-3.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#57534B]">
                      {tx("Nouveaux clients estimés")}
                    </span>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-[#171613]">
                      +{roiMetrics.newClients} / m
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#9E7F5A]/35 bg-[#171613] p-3.5 text-[#F7F4EE]">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/80">
                      {tx("CA additionnel estimé")}
                    </span>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-[#F7F4EE]">
                      +{formatEur(roiMetrics.addedRevenueMonth)} / m
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#57534B]">
                  {tx("La rentabilité dépend de vos marges, de la demande et des résultats obtenus.")}
                </p>
              </div>

              {/* ── Dynamic Price Result (Offre 1 & Offre 2) ── */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
                <div className="flex flex-col justify-between rounded-2xl border border-[#9E7F5A]/35 bg-[#171613] p-5 text-[#F7F4EE] sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="mb-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                        {ui.offer1Badge}
                      </span>
                      <p className="text-xs text-[#F7F4EE]/70">
                        {ui.offer1Note} ({customKeywords || "Local"})
                      </p>
                      <div className="mt-2 flex flex-wrap items-baseline gap-2">
                        <span
                          key={animMin}
                          className="font-serif text-3xl font-medium text-[#F7F4EE] sm:text-4xl"
                        >
                          {formatEur(animMin)}
                        </span>
                        <span className="font-serif text-xl text-white/50">–</span>
                        <span
                          key={animMax}
                          className="font-serif text-3xl font-medium text-[#F7F4EE] sm:text-4xl"
                        >
                          {formatEur(animMax)}
                        </span>
                        <span className="font-mono text-xs text-[#F7F4EE]/70">{tx("/ an")}</span>
                      </div>
                      <p className="mt-2 max-w-md text-xs leading-relaxed text-[#F7F4EE]/70">
                        {ui.offer1NoOnline}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2.5 sm:items-end">
                      <div className="flex items-center gap-2 rounded-xl border border-[#F7F4EE]/15 bg-[#F7F4EE]/5 px-3 py-2">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="font-mono text-[10px] font-medium text-[#F7F4EE]/90">
                          {tx("Objectif Top 3 · étude locale sur mesure")}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAuditModal(true);
                            setSubmitSuccess(false);
                          }}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#12110E] transition hover:bg-[#F3F2EE] shadow-md"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          {ui.offer1Cta}
                        </button>
                        <a
                          href={`${CONTACT.whatsapp}?text=${waPrefill}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F7F4EE]/25 bg-transparent px-5 py-2.5 text-xs font-semibold text-[#F7F4EE] transition hover:border-white hover:text-white"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Trust signals */}
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-[#F7F4EE]/12 pt-4">
                    {[ui.trust1, ui.trust2, ui.trust3, ui.trust4].map((text) => (
                      <div key={text} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span className="text-[11px] text-[#F7F4EE]/75">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offre 2 : Gestion Annuelle de Fiche Google Maps — 500 € / an */}
                <div className="flex flex-col justify-between rounded-2xl border border-[#171613]/12 bg-[#FAF8F4] p-5 sm:p-6">
                  <div>
                    <span className="inline-flex items-center rounded-full border border-[#9E7F5A]/30 bg-[#9E7F5A]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6C5438]">
                      {ui.offer2Badge}
                    </span>
                    <h4 className="mt-3 font-serif text-xl font-medium text-[#171613]">
                      {ui.offer2Title}
                    </h4>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl font-semibold text-[#171613]">
                        500 €
                      </span>
                      <span className="font-mono text-xs text-[#57534B]">{ui.offer2Sub}</span>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#57534B]">
                      {ui.offer2Desc}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-[#171613]/10 pt-4">
                    <a
                      href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                        `Bonjour XR Agency, je souhaite souscrire au forfait Gestion Annuelle Fiche Google Maps à 500 € / an (avis, photos, mises à jour pendant 12 mois).`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#171613] bg-transparent px-4 py-2.5 text-xs font-semibold text-[#171613] transition hover:bg-[#171613] hover:text-[#F7F4EE]"
                    >
                      {ui.offer2Cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 7-Phase Methodology ── */}
        <Reveal delay={80}>
          <div>
            <div className="mb-6 text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7D6445]">
                {tx("Méthodologie exclusive")}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-medium text-[#171613] sm:text-3xl">
                {tx("Le processus en 7 phases")}
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-[#57534B]">
                {tx(
                  "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.",
                )}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PHASES.map((ph) => (
                <div
                  key={ph.num}
                  className="xr-editorial-card rounded-2xl border border-[#171613]/10 bg-white p-4"
                >
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9E7F5A]">
                    {ph.num} · {tx(ph.name)}
                  </span>
                  <p className="mt-1.5 text-sm font-semibold text-[#171613]">{tx(ph.title)}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#57534B]">
                    {tx(ph.desc)}
                  </p>
                </div>
              ))}

              {/* 8th Balancing CTA Card */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/20 bg-[#171613] p-4 text-[#F7F4EE] shadow-md">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
                    08 · VOTRE ÉTABLISSEMENT
                  </span>
                  <p className="mt-1.5 text-sm font-semibold text-white">Démarrez votre accompagnement</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#F7F4EE]/75">
                    Un directeur de projet analyse votre secteur et vous transmet les actions prioritaires.
                  </p>
                </div>
                <div className="mt-3">
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#12110E] transition hover:bg-[#F3F2EE] shadow-md"
                  >
                    <span>Lancer mon audit local</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── MODALE DEMANDE D'AUDIT LOCAL (CAPTURE CRM) ── */}
        {showAuditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171613]/80 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#171613] p-6 text-[#F7F4EE] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#F7F4EE]/12 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
                    {ui.modalEyebrow}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-medium text-[#F7F4EE]">
                    {ui.modalTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAuditModal(false)}
                  aria-label={ui.modalClose}
                  className="rounded-full border border-[#F7F4EE]/20 px-3 py-1 text-xs text-[#F7F4EE]/75 hover:border-white hover:text-[#F7F4EE]"
                >
                  ✕
                </button>
              </div>

              {submitSuccess ? (
                <div className="space-y-4 py-8 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-emerald-400/40 bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="font-serif text-2xl font-medium text-[#F7F4EE]">
                    {ui.modalSuccessTitle}
                  </h4>
                  <p className="mx-auto max-w-sm text-xs leading-relaxed text-[#F7F4EE]/75">
                    {ui.modalSuccessBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAuditModal(false)}
                    className="mt-2 rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#12110E] transition hover:bg-[#F3F2EE]"
                  >
                    {ui.modalClose}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAuditSubmit} className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-[#F7F4EE]/12 bg-[#23201B] p-3.5 text-xs">
                    <div className="flex flex-wrap justify-between gap-2 text-[11px] text-[#F7F4EE]/70">
                      <span>
                        <strong className="text-[#F7F4EE]">{customKeywords || "Local"}</strong>
                      </span>
                      <span>
                        <strong className="text-[#F7F4EE]">{cityLabel}</strong>
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap justify-between gap-2 text-[11px] text-[#F7F4EE]/70">
                      <span>
                        <strong className="text-white">
                          {animMin} € – {animMax} € {tx("/ an")}
                        </strong>
                      </span>
                      <span className="text-[#F7F4EE]/80">{sectorLabel}</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#F7F4EE]/85">
                      {ui.modalCompany}
                    </label>
                    <input
                      type="text"
                      required
                      value={leadCompany}
                      onChange={(e) => setLeadCompany(e.target.value)}
                      placeholder="Ex: Restaurant Le Bistrot"
                      className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] px-3.5 py-2.5 text-xs text-[#F7F4EE] placeholder:text-[#F7F4EE]/40 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#F7F4EE]/85">
                        {ui.modalName}
                      </label>
                      <input
                        type="text"
                        value={leadContact}
                        onChange={(e) => setLeadContact(e.target.value)}
                        placeholder="Ex: Camille Martin"
                        className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] px-3.5 py-2.5 text-xs text-[#F7F4EE] placeholder:text-[#F7F4EE]/40 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#F7F4EE]/85">
                        {ui.modalPhone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] px-3.5 py-2.5 text-xs text-[#F7F4EE] placeholder:text-[#F7F4EE]/40 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#F7F4EE]/85">
                      {ui.modalEmail}
                    </label>
                    <input
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="contact@entreprise.com"
                      className="w-full rounded-xl border border-[#F7F4EE]/15 bg-[#23201B] px-3.5 py-2.5 text-xs text-[#F7F4EE] placeholder:text-[#F7F4EE]/40 focus:border-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-xs font-semibold text-[#12110E] shadow-lg transition hover:bg-[#F3F2EE] disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    {isSubmitting ? ui.modalSending : ui.modalSubmit}
                  </button>
                  <p className="text-center text-[11px] text-[#F7F4EE]/60">{ui.modalFootnote}</p>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
