import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import creditoPrivadoImage from '@/assets/Investimentos/credito-privado.png'
import { useSeo } from '@/hooks/useSeo'

const STEPS = [
  {
    num: '01',
    title: 'Empresa demanda recursos',
    desc: 'Empresas emitem títulos de dívida para financiar suas operações.',
  },
  {
    num: '02',
    title: 'Você investe',
    desc: 'Adquire o título tornando-se credor da empresa com condições definidas em contrato, com as garantias acordadas.',
  },
  {
    num: '03',
    title: 'Operação é monitorada',
    desc: 'Acompanhamos a evolução do negócio e você tem contato direto conosco caso tenha dúvidas.',
  },
  {
    num: '04',
    title: 'Operação é concluída',
    desc: 'Ao vencimento, o investidor recebe o valor investido acrescido da rentabilidade acordada.',
  },
]

const CARACTERISTICAS = [
  { label: 'Prazo típico', value: '12 a 48 meses' },
  { label: 'Rentabilidade', value: 'Taxa prefixada ou pós-fixada' },
  { label: 'Fluxo', value: 'Pagamentos periódicos ou no vencimento' },
  { label: 'Diversificação', value: 'Setores variados' },
  { label: 'Análise', value: 'Due diligence criteriosa' },
  { label: 'Gestão', value: 'Acompanhamento ativo' },
]

const DIFERENCIAIS = [
  'Due diligence rigorosa antes de cada operação ser validada.',
  'Fluxo de pagamentos previsível e definido em contrato desde o início.',
  'Diversificação com emissores/empresas de setores variados da economia real.',
  'Acompanhamento ativo com contato direto com o tomador/emissor.',
  'Rentabilidade superior às comumente encontradas no mercado tradicional.',
]

const FAQ = [
  {
    q: 'O que diferencia crédito privado de CDB?',
    a: 'No crédito privado você empresta diretamente para empresas, geralmente com rentabilidade superior ao CDB, em troca de menor liquidez e sem cobertura do FGC.',
  },
  {
    q: 'Qual o risco do crédito privado?',
    a: 'O principal risco é o de crédito — inadimplência do emissor. Por isso fazemos due diligence rigorosa antes de ofertar qualquer operação.',
  },
  {
    q: 'Qual o valor mínimo?',
    a: 'Entre em contato via WhatsApp para consultar as operações disponíveis e condições atuais.',
  },
  {
    q: 'Como acompanho meu investimento?',
    a: 'Nossos clientes contam com acompanhamento ativo e contato direto com o tomador/emissor.',
  },
]

export default function CreditoPrivadoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useSeo({
    title: 'Crédito Privado — Renda Fixa Corporativa',
    description:
      'Empreste diretamente para empresas com garantias definidas em contrato, due diligence rigorosa e acompanhamento ativo da operação até o vencimento.',
    path: '/investimentos/credito-privado',
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24">
        <img
          src={creditoPrivadoImage}
          alt="Crédito Privado"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 50%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041A2A] via-[#041A2A]/75 to-[#041A2A]/20" />
        <div className="section-container relative z-10 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Link
              to="/investimentos"
              className="inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ChevronLeft size={15} />
              Investimentos
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="section-tag">Renda Fixa Corporativa</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Crédito Privado
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Diversifique com renda fixa corporativa de alta qualidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="pt-20 pb-10 sm:pt-24 sm:pb-12">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Como funciona</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ num, title, desc }, i) => (
              <ScrollReveal key={num} delay={i * 0.1}>
                <div className="surface-card h-full p-6">
                  <p className="text-4xl font-bold text-[var(--accent)]/40">{num}</p>
                  <h3 className="mt-3 text-base font-semibold text-[var(--accent)]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="pt-10 pb-10 sm:pt-12 sm:pb-12">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Características</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CARACTERISTICAS.map(({ label, value }, i) => (
              <ScrollReveal key={label} delay={i * 0.07}>
                <div className="surface-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {label}
                  </p>
                  <p className="mt-2 text-base font-medium text-[var(--text-primary)]">{value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="pt-10 pb-10 sm:pt-12 sm:pb-12">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
            <div>
              <ScrollReveal>
                <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Por que Crédito Privado?</h2>
              </ScrollReveal>
              <ul className="mt-8 space-y-4">
                {DIFERENCIAIS.map((d, i) => (
                  <ScrollReveal key={i} delay={i * 0.07}>
                    <li className="flex items-start gap-3 text-base leading-relaxed text-[var(--text-secondary)]">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      {d}
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
            <ScrollReveal direction="left">
              <div className="mx-auto overflow-hidden h-56 w-56 rounded-[32px] border border-[var(--accent)]/20 shadow-lg">
                <img
                  src={creditoPrivadoImage}
                  alt="Edifícios corporativos"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-10 pb-20 sm:pt-12 sm:pb-24">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Perguntas frequentes</h2>
          </ScrollReveal>
          <div className="mt-10 max-w-3xl space-y-3">
            {FAQ.map(({ q, a }, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="surface-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-medium text-[var(--text-primary)]">{q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[var(--accent)] transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="border-t border-black/5 dark:border-white/5 px-5 pb-5 pt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {a}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="mt-10 max-w-3xl text-xs leading-relaxed text-[var(--text-muted)]">
              Investimento sujeito a riscos, inclusive de crédito do emissor.
              Não conta com garantia do Fundo Garantidor de Créditos (FGC).
              Prazo, taxa e garantias são definidos em cada operação, no momento
              da contratação. Rentabilidade passada não representa garantia de
              rentabilidade futura. Conteúdo informativo — não constitui
              recomendação de investimento.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="hero-gradient py-20 sm:py-24">
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Pronto para investir em Crédito Privado?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Fale com um especialista da Accione e entenda como estruturar sua alocação em crédito corporativo.
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppButton
                mensagem="Olá! Tenho interesse em Crédito Privado. Pode me enviar mais informações?"
                label="Quero investir em Crédito Privado"
                size="lg"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
