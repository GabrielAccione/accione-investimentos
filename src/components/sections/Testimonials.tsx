import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { TESTIMONIALS } from '@/data/testimonials'

const TOTAL = TESTIMONIALS.length

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="surface-card flex h-full flex-col p-6">
      <Quote size={28} className="shrink-0 text-[var(--accent)]/45" />
      <div className="mt-3 flex gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={13} className="fill-[var(--accent)] text-[var(--accent)]" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
        "{t.text}"
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/12 text-sm font-semibold text-[var(--accent)]">
          {t.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
          <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [start, setStart] = useState(0)

  const next = useCallback(() => setStart((s) => (s + 1) % TOTAL), [])
  const prev = useCallback(() => setStart((s) => (s - 1 + TOTAL) % TOTAL), [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  const desktop = [0, 1, 2].map((i) => TESTIMONIALS[(start + i) % TOTAL])
  const mobile = TESTIMONIALS[start]

  return (
    <section id="depoimentos" className="bg-[var(--bg-primary)] py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Quem investe com a Accione"
          title="Relação de longo prazo se constrói com clareza e execução."
          description="Alguns relatos que sintetizam a forma como a Accione conduz a experiência do investidor."
        />

        <div className="relative mt-12">
          {/* Desktop: 3 cards */}
          <div className="hidden overflow-hidden md:grid md:grid-cols-3 md:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {desktop.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -80, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <TestimonialCard t={t} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile: 1 card */}
          <div className="md:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobile.id}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <TestimonialCard t={mobile} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1.5">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir para depoimento ${i + 1}`}
                  onClick={() => setStart(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === start ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próximo"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
