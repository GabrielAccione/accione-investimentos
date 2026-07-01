import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Instagram,
  Linkedin,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logoDark from "@/assets/logo.png";
import logoLight from "@/assets/logo-accione-dark.png";
import { useScrolled } from "@/hooks/useScrolled";
import { SITE_CONFIG } from "@/config/site";
import { useTheme } from "@/context/ThemeContext";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: SITE_CONFIG.socialLinks.instagram,
    icon: Instagram,
  },
  { label: "LinkedIn", href: SITE_CONFIG.socialLinks.linkedin, icon: Linkedin },
];

const PRIMARY_LINKS = [
  { label: "Início", to: "/" },
  { label: "Investimentos Financeiros", to: "/investimentos" },
  { label: "Empreendimentos Imobiliários", to: "/empreendimentos" },
  { label: "Indicadores", to: "/indicadores" },
  { label: "Sobre", to: "/sobre" },
  { label: "Blog", to: "/blog" },
  { label: "Contato", to: "/contato" },
];

const SIMULATOR_LINKS = [
  { label: "Aposentadoria", to: "/simuladores/aposentadoria" },
  { label: "Simulador de TIR", to: "/simuladores/tir" },
];

const ALL_MOBILE_LINKS = [...PRIMARY_LINKS, ...SIMULATOR_LINKS];

function DesktopNavLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "relative text-sm font-medium transition-colors duration-200 whitespace-nowrap",
          "after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-[var(--accent)] after:transition-all after:duration-300",
          isActive
            ? "text-[#041A2A] dark:text-white after:w-full"
            : "text-[#041A2A]/75 hover:text-[#041A2A] dark:text-white/70 dark:hover:text-white after:w-0 hover:after:w-full",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const scrolled = useScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const simulatorsActive = pathname.startsWith("/simuladores/");
  const { theme } = useTheme();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "border-b border-black/5 dark:border-white/10 bg-white/30 backdrop-blur-md shadow-lg shadow-black/5 dark:bg-slate-950/40 dark:shadow-black/20"
            : "bg-white/20 backdrop-blur-md dark:bg-transparent"
        }`}
      >
        <nav
          className={`section-container flex items-center justify-between gap-4 transition-all duration-500 h-12 w-auto object-contain ${
            scrolled ? "h-18" : "h-28"
          }`}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="shrink-0"
          >
            <Link to="/">
              <img
                src={theme === "dark" ? logoDark : logoLight}
                alt="Accione Investimentos"
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled ? "h-16" : "h-24"
                }`}
                style={
                  theme === "light" ? { mixBlendMode: "multiply" } : undefined
                }
              />
            </Link>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-6">
            {PRIMARY_LINKS.map((link) => (
              <DesktopNavLink key={link.to} to={link.to} label={link.label} />
            ))}

            {/* Simuladores dropdown */}
            <div className="group relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  simulatorsActive
                    ? "text-[#041A2A] dark:text-white"
                    : "text-[#041A2A]/75 hover:text-[#041A2A] dark:text-white/70 dark:hover:text-white"
                }`}
              >
                Simuladores
                <ChevronDown
                  size={15}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute right-0 top-full mt-3 w-56 -translate-y-2 rounded-2xl border border-black/5 bg-white/90 p-2 opacity-0 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/40">
                {SIMULATOR_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm transition-colors duration-200 ${
                        isActive
                          ? "bg-[var(--accent)]/12 text-[#041A2A] dark:text-white"
                          : "text-[#484949] hover:bg-black/5 hover:text-[#041A2A] dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Social icons + theme toggle + CTA desktop */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-1 text-[#9E9E9E] transition-colors duration-200 hover:text-[#A26547] dark:text-white/50"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href={SITE_CONFIG.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#20BD5C] hover:shadow-lg hover:shadow-[#25D366]/25 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {/* Mobile */}
          <button
            type="button"
            className="rounded-full border border-black/10 p-2 text-[#041A2A] transition-colors hover:border-black/20 dark:border-white/10 dark:text-white dark:hover:border-white/25 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="border-t border-black/5 bg-white/30 px-4 py-5 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/50 lg:hidden"
            >
              <div className="space-y-1">
                {ALL_MOBILE_LINKS.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.15 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-3 text-sm transition-colors duration-200 ${
                          isActive
                            ? "bg-[var(--accent)]/12 text-[#041A2A] dark:text-white"
                            : "text-[#041A2A]/80 hover:bg-black/5 hover:text-[#041A2A] dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ALL_MOBILE_LINKS.length * 0.04 + 0.05 }}
                className="mt-4 space-y-3"
              >
                <a
                  href={SITE_CONFIG.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[#20BD5C]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <div className="flex items-center justify-center gap-5">
                  {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-[#9E9E9E] transition-colors hover:text-[#A26547] dark:text-white/50"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Overlay escuro no mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
