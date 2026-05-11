import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import logo from '@/assets/logo.jpg'
import { useScrolled } from '@/hooks/useScrolled'

const PRIMARY_LINKS = [
  { label: 'Início', to: '/' },
  { label: 'Investimentos', to: '/investimentos' },
  { label: 'Empreendimentos', to: '/empreendimentos' },
  { label: 'Indicadores', to: '/indicadores' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contato', to: '/contato' },
]

const SIMULATOR_LINKS = [
  { label: 'Aposentadoria', to: '/simuladores/aposentadoria' },
  { label: 'Simulador de TIR', to: '/simuladores/tir' },
]

function DesktopNavLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-[var(--text-secondary)] hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const scrolled = useScrolled(40)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const simulatorsActive = pathname.startsWith('/simuladores/')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-black/90 backdrop-blur-md' : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <nav className="section-container flex h-20 items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Accione Investimentos" className="h-11 w-auto rounded-sm" />
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-5 xl:gap-6">
          {PRIMARY_LINKS.map((link) => (
            <DesktopNavLink key={link.to} to={link.to} label={link.label} />
          ))}

          <div className="group relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1 text-sm transition-colors duration-200 ${
                simulatorsActive ? 'text-white' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Simuladores
              <ChevronDown size={16} />
            </button>

            <div className="invisible absolute right-0 top-full mt-3 w-56 rounded-2xl border border-white/10 bg-[#061a2a] p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {SIMULATOR_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-[var(--accent)]/12 text-white'
                        : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Link to="/contato" className="btn-accent text-sm">
            Fale com um consultor
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-[#061a2a] px-4 py-5 lg:hidden">
          <div className="section-container">
            <div className="space-y-2">
              {PRIMARY_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-[var(--accent)]/12 text-white'
                        : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {SIMULATOR_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-[var(--accent)]/12 text-white'
                        : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <Link
              to="/contato"
              onClick={() => setMobileOpen(false)}
              className="btn-accent mt-4 block text-center text-sm"
            >
              Fale com um consultor
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
