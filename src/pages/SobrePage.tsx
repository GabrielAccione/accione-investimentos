import { Building2, Compass, Eye, Gem, Mail, MessageCircle } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import { SITE_CONFIG } from '@/config/site'
import gabrielImg from '@/assets/gabriel.jpg'

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
            Uma assessoria construída para tratar patrimônio com
            <span className="text-gradient"> seriedade e contexto.</span>
          </>
        }
        description="A Accione Investimentos nasceu em Santa Maria/RS com a proposta de aproximar investidores de oportunidades alternativas explicadas com clareza, diligência e proximidade."
      />

      {/* Founder — two-column: photo | content */}
      <section className="bg-[var(--bg-primary)] py-20 sm:py-24">
        <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Left — photo */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={gabrielImg}
              alt="Gabriel Rodrigues"
              className="h-[480px] w-full max-w-sm rounded-2xl object-cover object-top shadow-2xl shadow-black/40"
            />
          </div>

          {/* Right — content */}
          <div>
            <span className="section-tag">Fundador</span>
            <h2 className="mt-5 text-4xl font-semibold text-white">{SITE_CONFIG.founder.name}</h2>
            <p className="mt-1 text-sm font-medium text-[var(--accent)]">{SITE_CONFIG.founder.role}</p>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              <p>
                Somos uma empresa de investimentos multiestratégia. Nossa equipe é formada por especialistas dedicados a identificar as melhores oportunidades de investimento, levando em consideração seu perfil e buscando sempre as taxas e rendimentos mais competitivos do mercado.
              </p>
              <p>
                Estamos sempre em busca dos melhores resultados para nossos clientes. Por isso, nosso time especializado facilita o acesso a investimentos alternativos e oportunidades imobiliárias, oferecendo orientação esclarecedora e com total transparência.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-white"
              >
                <Mail size={15} />
                {SITE_CONFIG.email}
              </a>
              <a
                href={SITE_CONFIG.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-white"
              >
                <MessageCircle size={15} />
                {SITE_CONFIG.whatsappDisplay}
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Building2 size={20} className="text-[var(--accent)]" />
                <h3 className="mt-3 text-base font-semibold text-white">
                  Gestão Financeira de Empreendimentos Imobiliários
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  Investimentos em parceria com construtoras renomadas no modelo SPE, a preço de custo, com transparência e rentabilidade.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Gem size={20} className="text-[var(--accent)]" />
                <h3 className="mt-3 text-base font-semibold text-white">
                  Investimentos Alternativos de Qualidade
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  Obras de arte, royalties musicais, crédito privado e certificado de recebíveis, com retornos acima da média e orientação profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="bg-[var(--bg-primary)] pb-12 sm:pb-16">
        <div className="section-container">
          <article className="surface-card p-6 sm:p-8">
            <div className="flex items-center gap-3 text-[var(--accent)]">
              <Building2 size={20} />
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">Parceiro estratégico</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-white">{SITE_CONFIG.partner.name}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
              {SITE_CONFIG.partner.description}
            </p>
          </article>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--bg-secondary)] py-20 sm:py-24">
        <div className="section-container grid gap-5 md:grid-cols-3">
          {VALUE_CARDS.map((card) => {
            const Icon = card.icon

            return (
              <article key={card.title} className="surface-card p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent)]">
                  <Icon size={22} />
                </div>
                <h2 className="mt-5 text-3xl font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {card.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
