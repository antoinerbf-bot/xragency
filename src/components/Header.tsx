import { useState } from 'react'
import { useI18n, LANGUAGES, type Lang } from '../i18n'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t, translations: tr } = useI18n()

  const navLinks = [
    { label: tr.header.services, href: '#services' },
    { label: tr.header.pricing, href: '#pricing' },
    { label: tr.header.work, href: '#work' },
    { label: tr.header.intelligence, href: '#intelligence' },
    { label: tr.header.faq, href: '#faq' },
    { label: tr.header.bookCall, href: '#contact' },
  ]

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-mono text-sm font-semibold tracking-widest uppercase">
          XRAGENCY
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t(link.label)}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-1 ml-4 pl-4 border-l border-border">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Lang)}
                className={`px-2 py-1 rounded text-xs font-mono transition-all duration-200 ${
                  lang === l.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title={l.label}
              >
                {l.flag}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <div className="flex gap-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Lang)}
                className={`px-1.5 py-1 rounded text-[10px] transition-all ${
                  lang === l.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {l.flag}
              </button>
            ))}
          </div>
          <button
            className="text-sm font-medium"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? t(tr.header.close) : t(tr.header.menu)}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border/50 bg-background px-5 py-4 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.label)}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
