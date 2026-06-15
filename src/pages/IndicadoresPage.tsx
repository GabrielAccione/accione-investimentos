import { Link } from 'react-router-dom'
import EconomicIndicatorsSection from '@/components/sections/EconomicIndicatorsSection'
import PageHero from '@/components/ui/PageHero'

const CONTEXT_CARDS = [
  {
    title: 'Juros',
    description:
      'Selic e CDI ajudam a calibrar expectativa de retorno mínimo para operações de renda e crédito.',
  },
  {
    title: 'Inflação',
    description:
      'IPCA e IGP-M são referências para preservar poder de compra e comparar teses indexadas.',
  },
  {
    title: 'Mercado',
    description:
      'Bitcoin e Ibovespa ajudam a compor leitura de apetite a risco no mercado financeiro.',
  },
]

export default function IndicadoresPage() {
  return (
    <>
      <PageHero
        eyebrow="Indicadores econômicos"
        title={
          <>
            Um painel direto para acompanhar o
            <span className="text-gradient"> contexto macro.</span>
          </>
        }
        description="Acompanhamos juros, inflação, mercado e construção civil em um só lugar, com atualização periódica para apoiar conversas e análises."
        actions={
          <Link to="/simuladores/tir" className="btn-accent">
            Usar no simulador de TIR
          </Link>
        }
      />

      <section className="py-14">
        <div className="section-container grid gap-4 md:grid-cols-3">
          {CONTEXT_CARDS.map((card) => (
            <article key={card.title} className="surface-card p-6">
              <h2 className="text-3xl font-semibold text-[#041A2A] dark:text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <EconomicIndicatorsSection showPageLink={false} />
    </>
  )
}
