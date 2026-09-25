import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en" | "vi" | "ar" | "ru";
export type L = Record<string, string>;

export const LANGS: { code: string; label: string; flag: string }[] = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "vi", label: "VI", flag: "🇻🇳" },
  { code: "ar", label: "AR", flag: "🇦🇪" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
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
  setLang: (l: string) => void;
  t: (value: L) => string;
  price: (eur: number) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("xr-lang") as string | null;
    if (stored && ["fr", "en", "vi", "ar", "ru"].includes(stored)) {
      setLangState(stored as Lang);
      return;
    }
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (nav === "vi") setLangState("vi");
    else if (nav === "ar") setLangState("ar" as Lang);
    else if (nav === "ru") setLangState("ru" as Lang);
    else if (nav !== "fr") setLangState("en");
  }, []);

  const setLang = useCallback((l: string) => {
    setLangState(l as Lang);
    window.localStorage.setItem("xr-lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (v: L | undefined) => {
        if (!v) return "";
        const value = (v as Record<string, string>)[lang];
        return value ?? v.en ?? v.fr ?? Object.values(v)[0] ?? "";
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
