import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animate } from 'animejs'
import { MapPin, ArrowRight } from 'lucide-react'
import { EMPREENDIMENTOS, type EmpreendimentoData } from '@/data/empreendimentos'

function StatusBadge({ status, label }: { status: EmpreendimentoData['status']; label: string }) {
  const color =
    status === 'em-captacao'
      ? 'bg-[#25D366]'
      : 'bg-[#69727D]'
  return (
    <span className={`${color} text-white text-xs font-medium px-3 py-1 rounded-full`}>
      {label}
    </span>
  )
}

function EmpreendimentoCard({ item, index }: { item: EmpreendimentoData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleEnter() {
    animate(cardRef.current!, {
      translateY: -8,
      scale: 1.015,
      duration: 260,
      ease: 'outQuad',
    })
  }

  function handleLeave() {
    animate(cardRef.current!, {
      translateY: 0,
      scale: 1,
      duration: 300,
      ease: 'outQuad',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="rounded-xl border border-[#484949]/20 hover:border-[#A26547]/40 bg-[var(--bg-secondary)] overflow-hidden h-full flex flex-col transition-colors duration-300 hover:shadow-[0_8px_40px_rgba(162,101,71,0.10)]"
      >
        {/* Cover image */}
        <div className="relative overflow-hidden">
          <img
            src={item.coverImage}
            alt={item.name}
            className="w-full h-52 object-cover"
          />
          <div className="absolute top-3 left-3">
            <StatusBadge status={item.status} label={item.statusLabel} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-xl font-bold text-[#041A2A] dark:text-white mb-2">{item.name}</h3>

          <div className="flex items-start gap-1.5 text-[var(--text-muted)] text-sm mb-3">
            <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <span>{item.location}</span>
          </div>

          <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-5">
            {item.shortDescription}
          </p>

          <Link
            to={`/empreendimentos/${item.slug}`}
            className="btn-accent text-sm py-2.5 px-5 flex items-center justify-center gap-2 group"
          >
            Conhecer empreendimento
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

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
      <section className="py-20 bg-[var(--bg-primary)]">
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
