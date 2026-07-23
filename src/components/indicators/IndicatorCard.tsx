import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { EconomicIndicator } from '@/types'

interface IndicatorCardProps {
  indicator: EconomicIndicator
}

function getVariationTone(value: number | null) {
  if (value === null || value === 0) return 'neutral'
  return value > 0 ? 'positive' : 'negative'
}

export default function IndicatorCard({ indicator }: IndicatorCardProps) {
  const Icon = indicator.icon
  const sign = getVariationTone(indicator.variation)
  // Variação de inflação (acumulado 12m) é sempre neutra: não usa verde/vermelho.
  const tone = indicator.neutralVariation ? 'neutral' : sign
  const toneClass =
    tone === 'positive'
      ? 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20'
      : tone === 'negative'
        ? 'text-rose-300 bg-rose-400/10 border-rose-400/20'
        : 'text-[#484949] bg-[#F7F7F7] border-[#E5E5E5] dark:text-slate-300 dark:bg-white/5 dark:border-white/10'

  const VariationIcon =
    sign === 'positive' ? ArrowUpRight : sign === 'negative' ? ArrowDownRight : ArrowRight

  const dateLabel = indicator.sourceDate
    ? indicator.isManual
      ? `Atualizado em ${indicator.sourceDate}`
      : indicator.value === null
        ? `Última leitura: ${indicator.sourceDate}`
        : indicator.sourceDate
    : null

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#E5E5E5] bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/45 hover:shadow-[0_8px_32px_rgba(162,101,71,0.10)] dark:border-white/10 dark:bg-[#0C2030]/70">
      {/* Cabeçalho: ícone + variação */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/12 text-[var(--accent)] transition-transform duration-300 group-hover:scale-105">
          <Icon size={20} />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold tabular-nums ${toneClass}`}
        >
          <VariationIcon size={13} />
          {indicator.variationLabel}
        </span>
      </div>

      {/* Nome + valor em destaque */}
      <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {indicator.label}
      </h3>
      <p className="mt-2 font-display text-3xl font-bold leading-none tabular-nums text-[var(--text-primary)]">
        {indicator.valueLabel}
      </p>
      {indicator.periodLabel ? (
        <p className="mt-1.5 text-xs text-[var(--text-muted)]">
          {indicator.periodLabel}
        </p>
      ) : null}

      {/* Descrição curta */}
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
        {indicator.description}
      </p>

      {/* Rodapé: fonte · data */}
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#E5E5E5] pt-4 dark:border-white/10">
        <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] whitespace-nowrap">
          {indicator.source}
        </span>
        {dateLabel ? (
          <span className="text-right text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] whitespace-nowrap">
            {dateLabel}
          </span>
        ) : null}
      </div>
    </div>
  )
}
