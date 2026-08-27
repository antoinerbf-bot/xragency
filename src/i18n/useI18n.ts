import { useState, useEffect, useCallback } from 'react'
import translations, { type Lang } from './translations'

const STORAGE_KEY = 'xr-lang'

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'fr'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'fr' || stored === 'en' || stored === 'vi') return stored
  const browserLang = navigator.language.slice(0, 2)
  if (browserLang === 'vi') return 'vi'
  if (browserLang === 'en') return 'en'
  return 'fr'
}

export function useI18n() {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
    document.documentElement.lang = newLang
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Helper to get a translated string from the translations object
  const t = useCallback(
    <T extends Record<Lang, string>>(obj: T): string => {
      return obj[lang] || obj.fr
    },
    [lang]
  )

  return { lang, setLang, t, translations }
}
