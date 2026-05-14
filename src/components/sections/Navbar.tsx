import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useScrolled } from "@/hooks/useScrolled";

const PRIMARY_LINKS = [
  { label: "Início", to: "/" },
  { label: "Investimentos", to: "/investimentos" },
  { label: "Empreendimentos", to: "/empreendimentos" },
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
          "relative text-sm font-medium transition-colors duration-200",
          "after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-[var(--accent)] after:transition-all after:duration-300",
          isActive
            ? "text-white after:w-full"
            : "text-white/70 hover:text-white after:w-0 hover:after:w-full",
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "border-b border-white/10 bg-black/95 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          className={`section-container flex items-center justify-between gap-4 transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
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
                src={logo}
                alt="Accione Investimentos"
                className="h-20 w-auto object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden lg:flex lg:items-center lg:gap-5 xl:gap-7">
            {PRIMARY_LINKS.map((link) => (
              <DesktopNavLink key={link.to} to={link.to} label={link.label} />
            ))}

            {/* Simuladores dropdown */}
            <div className="group relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                  simulatorsActive
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Simuladores
                <ChevronDown
                  size={15}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute right-0 top-full mt-3 w-56 -translate-y-2 rounded-2xl border border-white/10 bg-[#0C2030] p-2 opacity-0 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {SIMULATOR_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm transition-colors duration-200 ${
                        isActive
                          ? "bg-[var(--accent)]/12 text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* CTA desktop */}
          <div className="hidden lg:block">
            <Link
              to="/contato"
              className="inline-block rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-[#8B5537] hover:shadow-lg hover:shadow-[#A26547]/25 active:scale-95"
            >
              Fale com um consultor
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="rounded-full border border-white/10 p-2 text-white transition-colors hover:border-white/25 lg:hidden"
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
              className="border-t border-white/10 bg-black/95 px-4 py-5 backdrop-blur-md lg:hidden"
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
                            ? "bg-[var(--accent)]/12 text-white"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
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
              >
                <Link
                  to="/contato"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 block rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-medium text-white transition-all hover:bg-[#8B5537]"
                >
                  Fale com um consultor
                </Link>
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
