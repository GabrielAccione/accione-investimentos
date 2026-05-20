import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const METRICAS = [
  { valor: '3x',     label: 'Acima da média de mercado' },
  { valor: 'R$10K+', label: 'Investimento mínimo acessível' },
  { valor: '3',      label: 'Empreendimentos em captação' },
  { valor: '100%',   label: 'Transparência nas operações' },
]

interface CounterCardProps {
  target: number
  prefix?: string
  suffix?: string
  label: string
  inView: boolean
}

function CounterCard({ target, prefix = '', suffix = '', label, inView }: CounterCardProps) {
  const count = useCountUp(target, 1800, inView)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left">
      <p className="text-2xl font-semibold text-white sm:text-3xl">
        {prefix}
        {count}
        <span className="text-[var(--accent)]">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
    </div>
  )
}

export default function Hero() {
  const [countersRef, countersInView] = useInView({ threshold: 0.25 })

  return (
    <section id="inicio" className="hero-gradient relative overflow-hidden pt-20">
      <div className="absolute left-[8%] top-28 h-56 w-56 rounded-full bg-[var(--accent)]/15 blur-3xl" />
      <div className="absolute right-[10%] top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="section-container relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="section-tag"
          >
            Santa Maria • Investimentos alternativos
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl"
          >
            Viabilizamos projetos de vida através da alocação inteligente dos seus recursos financeiros.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Somos uma empresa de investimentos multiestratégia. Nossa equipe identifica as melhores oportunidades considerando seu perfil e buscando os retornos mais competitivos do mercado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <WhatsAppButton
              mensagem="Olá! Vim pelo site da Accione e gostaria de conhecer as oportunidades disponíveis."
              label="Falar pelo WhatsApp"
              size="md"
            />
            <Link to="/investimentos" className="btn-ghost">
              Conhecer oportunidades
            </Link>
          </motion.div>
        </div>

        <motion.div
          ref={countersRef}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="surface-card p-6 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Leitura de cenário
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Acesso guiado a teses reais</h2>
            </div>
            <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] sm:flex">
              <ArrowRight size={24} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <CounterCard prefix="R$ " target={10} suffix="M+" label="em valores distribuídos" inView={countersInView} />
            <CounterCard target={5} suffix="+" label="anos de atuação" inView={countersInView} />
            <CounterCard target={100} suffix="+" label="operações estruturadas" inView={countersInView} />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)]">
            Trabalhamos com estrutura, explicação e acompanhamento. A proposta não é ampliar ruído de mercado, e sim dar repertório para decisões melhores.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="relative z-10 border-t border-white/10 bg-[#0C2030]"
      >
        <div className="section-container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {METRICAS.map((m, i) => (
              <div
                key={m.label}
                className={[
                  'px-6 py-2',
                  i % 2 !== 0 ? 'border-l border-[var(--accent)]/35' : '',
                  i === 2 ? 'lg:border-l lg:border-[var(--accent)]/35' : '',
                ].join(' ')}
              >
                <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                  {m.valor}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
