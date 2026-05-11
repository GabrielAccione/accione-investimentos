import { Building2, Compass, Eye, Gem } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import { SITE_CONFIG } from '@/config/site'

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

      <section className="bg-[var(--bg-primary)] py-20 sm:py-24">
        <div className="section-container grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_420px]">
          <article className="surface-card p-6 sm:p-8">
            <span className="section-tag">História</span>
            <h2 className="mt-5 text-4xl font-semibold text-white">
              A Accione foi desenhada para ampliar repertório de alocação.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              <p>
                Em vez de repetir uma oferta genérica, a Accione estrutura conversas sobre investimentos alternativos com foco em entendimento de tese, proteção jurídica, prazo e disciplina de acompanhamento.
              </p>
              <p>
                Isso significa trabalhar com menos ruído e mais contexto. A proposta é dar ao investidor acesso a oportunidades reais, mas também um processo consultivo que o ajude a decidir melhor.
              </p>
              <p>
                O resultado é uma operação mais coerente com o perfil de quem busca preservar patrimônio, diversificar com intenção e enxergar retorno sem dissociá-lo do risco.
              </p>
            </div>
          </article>

          <aside className="space-y-5">
            <article className="surface-card p-6 sm:p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)]/15 text-3xl font-semibold text-[var(--accent)]">
                G
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-white">{SITE_CONFIG.founder.name}</h2>
              <p className="mt-1 text-sm text-[var(--accent)]">{SITE_CONFIG.founder.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {SITE_CONFIG.founder.bio}
              </p>
            </article>

            <article className="surface-card p-6 sm:p-8">
              <div className="flex items-center gap-3 text-[var(--accent)]">
                <Building2 size={20} />
                <span className="text-sm font-semibold uppercase tracking-[0.16em]">Parceiro</span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-white">{SITE_CONFIG.partner.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {SITE_CONFIG.partner.description}
              </p>
            </article>
          </aside>
        </div>
      </section>

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
