import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description: string
  actions?: ReactNode
}

export default function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-24">
      <div className="absolute left-[12%] top-24 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="absolute bottom-10 right-[10%] h-56 w-56 rounded-full bg-white/5 blur-3xl" />

      <div className="section-container relative z-10 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl"
        >
          <span className="section-tag">{eyebrow}</span>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {description}
          </p>
          {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
        </motion.div>
      </div>
    </section>
  )
}
