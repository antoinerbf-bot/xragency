import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en" | "vi" | "es" | "pt" | "zh" | "ja" | "ko" | "ar";
export type L = Partial<Record<Lang, string>> & { fr: string; en: string; vi: string };

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "vi", label: "VI", flag: "🇻🇳" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "pt", label: "PT", flag: "🇵🇹" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ar", label: "AR", flag: "🇦🇪" },
];

/**
 * All prices are stored once in EUR (source of truth).
 * EN = +20% vs EU price, then converted to USD (rate ~1.08).
 * VI = -20% vs EU price, then converted to VND (rate ~27 500).
 */
export const EUR_TO_USD = 1.1460;
export const EUR_TO_VND = 29875;
export const EUR_TO_HKD = 9.0080;
export const EUR_TO_JPY = 180.94;
export const EUR_TO_KRW = 1591.11;
export const EUR_TO_AED = 4.2132;

/**
 * Added-locale FX snapshot: 18 September 2026.
 * FR/EN/VI pricing rules are intentionally preserved exactly as already defined.
 */
export function formatPrice(eur: number, lang: Lang): string {
  if (lang === "en") {
    const usd = Math.round(eur * 1.2 * 1.08);
    return `${usd.toLocaleString("en-US")}`;
  }
  if (lang === "vi") {
    const vnd = Math.round((eur * 0.8 * 27500) / 1000) * 1000;
    return `${vnd.toLocaleString("vi-VN")} ₫`;
  }
  if (lang === "zh") {
    const hkd = Math.round(eur * EUR_TO_HKD);
    return `HK${hkd.toLocaleString("zh-HK")}`;
  }
  if (lang === "ja") {
    const jpy = Math.round(eur * EUR_TO_JPY / 100) * 100;
    return `¥${jpy.toLocaleString("ja-JP")}`;
  }
  if (lang === "ko") {
    const krw = Math.round(eur * EUR_TO_KRW / 1000) * 1000;
    return `₩${krw.toLocaleString("ko-KR")}`;
  }
  if (lang === "ar") {
    const aed = Math.round(eur * EUR_TO_AED);
    return `${aed.toLocaleString("ar-AE")} د.إ`;
  }
  return `${Math.round(eur).toLocaleString(lang === "es" ? "es-ES" : lang === "pt" ? "pt-PT" : "fr-FR")} €`;
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (value: L) => string;
  price: (eur: number) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("xr-lang") as Lang | null;
    if (stored && ["fr", "en", "vi", "es", "pt", "zh", "ja", "ko", "ar"].includes(stored)) {
      setLangState(stored);
      return;
    }
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (nav === "vi") setLangState("vi");
    else if (nav === "fr") setLangState("fr");
    else if (["es", "pt", "zh", "ja", "ko", "ar"].includes(nav)) setLangState(nav as Lang);
    else setLangState("en");
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("xr-lang", l);
    document.documentElement.lang = l;
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (v: L | undefined) => {
        if (!v) return "";
        return v[lang] ?? v.en ?? v.fr ?? v.vi ?? Object.values(v)[0] ?? "";
      },
      price: (eur: number) => formatPrice(eur, lang),
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
