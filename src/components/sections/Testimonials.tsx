import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { TESTIMONIALS } from '@/data/testimonials'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % TESTIMONIALS.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  const testimonial = TESTIMONIALS[current]

  return (
    <section id="depoimentos" className="bg-[var(--bg-primary)] py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Quem investe com a Accione"
          title="Relação de longo prazo se constrói com clareza e execução."
          description="Alguns relatos que sintetizam a forma como a Accione conduz a experiência do investidor."
        />

        <div className="mt-12 mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3 }}
              className="surface-card p-8 sm:p-10"
            >
              <Quote size={34} className="text-[var(--accent)]/45" />
              <div className="mt-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} size={16} className="fill-[var(--accent)] text-[var(--accent)]" />
                ))}
              </div>
              <p className="mt-5 text-xl leading-relaxed text-[var(--text-secondary)] sm:text-2xl">
                “{testimonial.text}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/12 text-lg font-semibold text-[var(--accent)]">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Ver depoimento ${index + 1}`}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
