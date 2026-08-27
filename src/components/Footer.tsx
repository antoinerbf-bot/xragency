import { useI18n } from '../i18n'

export default function Footer() {
  const { t, translations: tr } = useI18n()

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-mono text-sm font-semibold tracking-widest uppercase mb-4">XRAGENCY</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">KARMA SASU (XR Agency 2030)</p>
            <p className="text-xs text-muted-foreground">
              SASU — Share capital 100 €<br />
              SIREN 889 178 141<br />
              SIRET 889 178 141 00012<br />
              RCS Paris<br />
              VAT FR00 889 178 141
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">{t(tr.footer.address)}</p>
            <p className="text-sm text-muted-foreground">
              78 Avenue des Champs-Élysées<br />
              Bureau 562 — 75008 Paris
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              {t(tr.footer.pubDirector)}: M. Antoine Rebuffé
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t(tr.footer.hosting)}: Vercel Inc.<br />
              340 S Lemon Ave #4133, Walnut, CA 91789, USA
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">{t(tr.footer.followUs)}</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/xragency_" target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Instagram
              </a>
              <a href="https://linkedin.com/company/xragency" target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} XR Agency. {t(tr.footer.rights)}
          </p>
          <p className="text-xs text-muted-foreground">{t(tr.footer.gdpr)}</p>
          <a href="#top" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
            {t(tr.footer.top)}
          </a>
        </div>
      </div>
    </footer>
  )
}
