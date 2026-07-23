import { Building2, Compass, Gem, Mail, MessageCircle, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { SITE_CONFIG } from '@/config/site'
import gabrielImg from '@/assets/gabriel-2.jpg'
import zaconImg from '@/assets/marcazacon.png'

const VALUE_CARDS = [
  {
    title: 'Quem somos',
    description: (
      <div className="space-y-3">
        <p>
          A Accione Investimentos é uma empresa <strong>multiestratégia</strong> que entrega a investidores oportunidades financeiras e imobiliárias criteriosamente selecionadas. Atuamos de forma personalizada, considerando o perfil e os objetivos de cada cliente, com foco em <strong>rentabilidade, segurança e eficiência na alocação de recursos</strong>.
        </p>
        <p>
          Nossa atuação é pautada pela <strong>transparência, análise estratégica e orientação clara</strong>, viabilizando investimentos que contribuem para o crescimento patrimonial e a geração de renda.
        </p>
      </div>
    ),
    icon: Users,
  },
  {
    title: 'Missão',
    description: (
      <p>
        Oferecer oportunidades de <strong>investimentos financeiros e imobiliários inteligentes</strong>, conectando pessoas a negócios criteriosamente selecionados, com foco na <strong>geração de patrimônio, renda e resultados consistentes</strong>, sempre pautados pela transparência e pela excelência na gestão.
      </p>
    ),
    icon: Compass,
  },
  {
    title: 'Valores',
    description: (
      <ul className="space-y-3.5 text-left">
        <li className="text-sm leading-relaxed text-[var(--text-secondary)]">
          <strong className="text-[var(--accent)] font-semibold">Inovação</strong> · buscar continuamente novas estratégias, produtos e soluções que ampliem o potencial dos investimentos e acompanhem a evolução do mercado.
        </li>
        <li className="text-sm leading-relaxed text-[var(--text-secondary)]">
          <strong className="text-[var(--accent)] font-semibold">Transparência</strong> · atuar com clareza, ética e comunicação objetiva, fortalecendo relações de confiança e credibilidade em todas as interações.
        </li>
        <li className="text-sm leading-relaxed text-[var(--text-secondary)]">
          <strong className="text-[var(--accent)] font-semibold">Compromisso</strong> · priorizar o melhor retorno aliado à segurança, à qualidade da experiência do cliente e ao sucesso de todos os envolvidos, promovendo relações genuinamente ganha-ganha.
        </li>
        <li className="text-sm leading-relaxed text-[var(--text-secondary)]">
          <strong className="text-[var(--accent)] font-semibold">Gestão responsável</strong> · conduzir cada decisão com ética, responsabilidade e senso de pertencimento, atuando com visão estratégica e foco na sustentabilidade do negócio, no respeito ao cliente e ao mercado.
        </li>
      </ul>
    ),
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
          <ScrollReveal direction="right" className="flex justify-center lg:justify-end">
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
                  Empreendimentos Imobiliários Diferenciados
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  Idealização de negócios com empreendimentos imobiliários, com estrutura, gestão profissional e acompanhamento de ponta a ponta.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 dark:border-white/10 dark:bg-[#0C2030]">
                <Gem size={20} className="text-[var(--accent)]" />
                <h3 className="mt-3 text-base font-semibold text-[#041A2A] dark:text-white">
                  Investimentos Financeiros de Qualidade
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  Dois blocos centrais da atuação da Accione (CPR-F e Crédito Privado), com racional claro de retorno, risco e acompanhamento.
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
                <div className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {card.description}
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>
    </>
  )
}
