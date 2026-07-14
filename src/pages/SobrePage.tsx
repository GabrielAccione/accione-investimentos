import { Building2, Compass, Eye, Gem, Mail, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { SITE_CONFIG } from '@/config/site'
import gabrielImg from '@/assets/gabriel.jpg'
import zaconImg from '@/assets/marcazacon.png'

const VALUE_CARDS = [
  {
    title: 'Missão',
    description:
      'Dar acesso a investimentos alternativos com leitura clara de estrutura, risco e aderência patrimonial.',
    icon: Compass,
  },
  {
    title: 'Visão',
    description:
      'Ser referência regional em assessoria para investidores que buscam profundidade antes de decidir.',
    icon: Eye,
  },
  {
    title: 'Valores',
    description:
      'Clareza, diligência, proximidade e compromisso com decisões patrimoniais menos superficiais.',
    icon: Gem,
  },
]

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre a Accione"
        title={
          <>
            Investimentos para quem prefere contexto, estrutura e tese
            <span className="text-gradient"> antes da promessa.</span>
          </>
        }
        description="A Accione nasceu para trazer a investidores oportunidades criadas a partir da leitura qualificada dos cenários econômicos, com ênfase em resultados acima da média, qualitativa e quantitativamente."
      />

      {/* Founder — two-column: photo | content */}
      <section className="py-20 sm:py-24">
        <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Left — photo */}
          <ScrollReveal direction="right" className="flex justify-center lg:justify-start">
            <img
              src={gabrielImg}
              alt="Gabriel Rodrigues"
              className="h-[480px] w-full max-w-sm rounded-2xl object-cover object-top shadow-2xl shadow-black/40"
            />
          </ScrollReveal>

          {/* Right — content */}
          <ScrollReveal direction="left" delay={0.1}>
            <span className="section-tag">Fundador</span>
            <h2 className="mt-5 text-4xl font-semibold text-[#041A2A] dark:text-white">{SITE_CONFIG.founder.name}</h2>
            <p className="mt-1 text-sm font-medium text-[var(--accent)]">{SITE_CONFIG.founder.role}</p>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              <p>
                Atuamos em Santa Maria/RS e região, com foco em empreendimentos imobiliários e operações de investimentos financeiros desenhados para ampliar o repertório patrimonial, sem cair em soluções genéricas.
              </p>
              <p>
                A lógica da casa é simples: entender o cenário, criar teses de forma criteriosa e construir oportunidades objetivas para investidores alocarem seus recursos.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[#A26547]"
              >
                <Mail size={15} />
                {SITE_CONFIG.email}
              </a>
              <a
                href={SITE_CONFIG.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[#A26547]"
              >
                <MessageCircle size={15} />
                {SITE_CONFIG.whatsappDisplay}
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 dark:border-white/10 dark:bg-[#0C2030]">
                <Building2 size={20} className="text-[var(--accent)]" />
                <h3 className="mt-3 text-base font-semibold text-[#041A2A] dark:text-white">
                  Gestão Financeira de Empreendimentos Imobiliários
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  Investimentos em parceria com construtoras renomadas no modelo SPE, a preço de custo, com transparência e rentabilidade.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 dark:border-white/10 dark:bg-[#0C2030]">
                <Gem size={20} className="text-[var(--accent)]" />
                <h3 className="mt-3 text-base font-semibold text-[#041A2A] dark:text-white">
                  Investimentos Alternativos de Qualidade
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  Obras de arte, royalties musicais, crédito privado e certificado de recebíveis, com retornos acima da média e orientação profissional.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Partner */}
      <section className="pb-12 sm:pb-16">
        <div className="section-container">
          <ScrollReveal direction="up">
            <article className="surface-card p-6 sm:p-8">
              <div className="flex items-center gap-3 text-[var(--accent)]">
                <Building2 size={20} />
                <span className="text-sm font-semibold uppercase tracking-[0.16em]">Parceiro estratégico</span>
              </div>
              <div className="mt-5 inline-flex rounded-lg bg-white p-3">
                <img
                  src={zaconImg}
                  alt={SITE_CONFIG.partner.name}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
                {SITE_CONFIG.partner.description}
              </p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24">
        <div className="section-container grid gap-5 md:grid-cols-3">
          {VALUE_CARDS.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="surface-card p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent)]">
                  <Icon size={22} />
                </div>
                <h2 className="mt-5 text-3xl font-semibold text-[#041A2A] dark:text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {card.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </section>
    </>
  )
}
