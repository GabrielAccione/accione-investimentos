import { Link } from 'react-router-dom'
import { Instagram, Linkedin, MessageCircleMore } from 'lucide-react'
import logo from '@/assets/logo.jpg'
import { SITE_CONFIG } from '@/config/site'

const FOOTER_LINKS = [
  { label: 'Início', to: '/' },
  { label: 'Investimentos', to: '/investimentos' },
  { label: 'Empreendimentos', to: '/empreendimentos' },
  { label: 'Indicadores', to: '/indicadores' },
  { label: 'Aposentadoria', to: '/simuladores/aposentadoria' },
  { label: 'TIR', to: '/simuladores/tir' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contato', to: '/contato' },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-footer)] pt-16 pb-8">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]">
          <div>
            <img src={logo} alt="Accione Investimentos" className="h-11 w-auto rounded-sm" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              A Accione Investimentos aproxima investidores de oportunidades alternativas com diligência, clareza e conversa patrimonial mais profunda.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                aria-label="Instagram da Accione Investimentos"
                className="text-[var(--text-muted)] transition-colors hover:text-white"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.linkedin}
                aria-label="LinkedIn da Accione Investimentos"
                className="text-[var(--text-muted)] transition-colors hover:text-white"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={SITE_CONFIG.whatsappHref}
                aria-label="WhatsApp da Accione Investimentos"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-muted)] transition-colors hover:text-white"
              >
                <MessageCircleMore size={18} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Navegação
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-[var(--text-muted)] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Contato
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
              <p>{SITE_CONFIG.email}</p>
              <p>{SITE_CONFIG.phone}</p>
              <p>{SITE_CONFIG.address}</p>
              <p>WhatsApp: {SITE_CONFIG.whatsappDisplay}</p>
            </div>
          </div>
        </div>

        <div className="section-divider mt-10" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Accione Investimentos. Todos os direitos reservados.</span>
          <span>Conteúdo informativo. Avaliação individual deve considerar perfil, prazo e risco.</span>
        </div>
      </div>
    </footer>
  )
}
