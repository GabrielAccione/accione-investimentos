import { motion } from 'framer-motion'
import { EMPREENDIMENTOS } from '@/data/empreendimentos'
import EmpreendimentoCard from '@/components/ui/EmpreendimentoCard'

export default function Empreendimentos() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient min-h-[50vh] flex items-center relative overflow-hidden pt-16">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--accent)] opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[var(--accent-alt)] opacity-5 blur-2xl pointer-events-none" />

        <div className="section-container text-center py-20 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-4"
          >
            Oportunidades de investimento
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold text-[#041A2A] dark:text-white leading-tight max-w-3xl mx-auto"
          >
            Nossos{' '}
            <span className="text-gradient">Empreendimentos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Invista em imóveis a preço de custo através do modelo SPE — seguro,
            rentável e gerido profissionalmente.
          </motion.p>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
      </section>

      {/* Cards */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EMPREENDIMENTOS.map((item, index) => (
              <EmpreendimentoCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
