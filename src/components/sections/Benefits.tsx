import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { BENEFITS } from '@/data/benefits'

export default function Benefits() {
  return (
    <section id="beneficios" className="bg-[var(--bg-primary)] py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Por que Accione"
          title="Uma assessoria desenhada para decisões patrimoniais menos superficiais."
          description="Selecionamos teses, traduzimos riscos e conduzimos a conversa com profundidade suficiente para o investidor entender o que está comprando."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="surface-card p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent)]">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-3xl font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {benefit.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
