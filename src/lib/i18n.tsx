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
export const EUR_TO_USD = 1.08;
export const EUR_TO_VND = 27500;

export function formatPrice(eur: number, lang: Lang): string {
  if (lang === "en") {
    const usd = Math.round(eur * 1.2 * EUR_TO_USD);
    return `$${usd.toLocaleString("en-US")}`;
  }
  if (lang === "vi") {
    const vnd = Math.round((eur * 0.8 * EUR_TO_VND) / 1000) * 1000;
    return `${vnd.toLocaleString("vi-VN")} ₫`;
  }
  return `${Math.round(eur).toLocaleString("fr-FR")} €`;
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
