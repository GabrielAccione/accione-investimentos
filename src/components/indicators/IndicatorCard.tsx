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
  const tone = getVariationTone(indicator.variation)
  const toneClass =
    tone === 'positive'
      ? 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20'
      : tone === 'negative'
        ? 'text-rose-300 bg-rose-400/10 border-rose-400/20'
        : 'text-slate-300 bg-white/5 border-white/10'

  const VariationIcon =
    tone === 'positive' ? ArrowUpRight : tone === 'negative' ? ArrowDownRight : ArrowRight

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)]/45">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent)]">
          <Icon size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {indicator.label}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
                {indicator.description}
              </p>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-3xl font-semibold leading-none text-[var(--text-primary)]">{indicator.valueLabel}</p>
              {indicator.sourceDate ? (
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {indicator.isManual
                    ? `Atualizado manualmente em ${indicator.sourceDate}`
                    : indicator.value === null
                      ? `Dado desatualizado — última leitura: ${indicator.sourceDate}`
                      : indicator.sourceDate}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${toneClass}`}>
              <VariationIcon size={14} />
              {indicator.variationLabel}
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {indicator.source}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
