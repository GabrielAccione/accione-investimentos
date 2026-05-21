import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { STEPS } from '@/data/howItWorks'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-[var(--bg-primary)] py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Como funciona"
          title="Um processo consultivo simples no fluxo, mas sério na profundidade."
          description="A jornada com a Accione foi desenhada para reduzir ruído, esclarecer tese e manter acompanhamento depois da alocação."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="surface-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-semibold text-[var(--accent)]">{step.number}</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent)]">
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className="mt-5 text-3xl font-semibold text-[#041A2A] dark:text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
