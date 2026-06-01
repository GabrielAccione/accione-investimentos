import { useState, useMemo, useEffect } from 'react'
import PageHero from '@/components/ui/PageHero'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { unidades } from '@/data/syncFloriano'
import { formatCurrency, formatCurrencyWithCents } from '@/lib/formatters'

// Cronograma: mês 1 = outubro/2025, prazo total = 54 meses
const START_YEAR = 2025
const START_MONTH = 9 // 0-indexed (9 = outubro)
const TOTAL_MONTHS = 54
const REFORCO_MONTHS = new Set([6, 12, 18, 24, 30, 36, 42]) // 1-indexed
const MESES_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

type Mode = 'valor' | 'percentual'
type TipoLinha = 'Entrada' | 'Reforço' | 'Aporte mensal' | '—'

interface LinhaTabela {
  mes: number
  competencia: string
  tipo: TipoLinha
  valor: number
  isPast: boolean
}

function getCompetencia(mesIndex: number): string {
  const totalMonths = START_MONTH + mesIndex
  const month = totalMonths % 12
  const year = START_YEAR + Math.floor(totalMonths / 12)
  return `${MESES_PT[month]}/${year}`
}

function getCurrentMesIndex(): number {
  const now = new Date()
  const diff =
    (now.getFullYear() - START_YEAR) * 12 + (now.getMonth() - START_MONTH)
  return Math.max(0, diff)
}

const TIPO_STYLES: Record<TipoLinha, string> = {
  'Entrada':       'inline-flex rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]',
  'Reforço':       'inline-flex rounded-full bg-blue-400/10 px-2.5 py-0.5 text-xs font-medium text-blue-400',
  'Aporte mensal': 'inline-flex rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]',
  '—':             'text-xs text-[var(--text-muted)]',
}

const apartamentos = unidades.filter((u) => u.categoria === 'apartamento')
const boxes = unidades.filter((u) => u.categoria === 'box')

export default function SimuladorSyncFloriano() {
  const [selectedAdesao, setSelectedAdesao] = useState(unidades[0]?.adesao ?? '')
  const [mode, setMode] = useState<Mode>('valor')
  const [totalInput, setTotalInput] = useState('210000')
  const [reforcoInput, setReforcoInput] = useState('10000')

  const selectedUnidade = unidades.find((u) => u.adesao === selectedAdesao)
  const currentMesIndex = getCurrentMesIndex()

  // No modo percentual, o total é sempre o preço contratual da unidade
  useEffect(() => {
    if (mode === 'percentual' && selectedUnidade) {
      setTotalInput(String(Math.round(selectedUnidade.partSocietaria)))
    }
  }, [mode, selectedAdesao, selectedUnidade])

  const total = Math.max(0, Number(totalInput) || 0)
  const reforcoValor = Math.max(0, Number(reforcoInput) || 0)

  const { entrada, reforco, aporteMensal, negativo } = useMemo(() => {
    if (mode === 'valor') {
      const e = total * 0.1428
      const r = reforcoValor
      const restante = total - e - REFORCO_MONTHS.size * r
      return { entrada: e, reforco: r, aporteMensal: restante / 46, negativo: restante < 0 }
    } else {
      const e = total * 0.15
      const r = total * 0.05
      const am = (total * 0.5) / 46
      return { entrada: e, reforco: r, aporteMensal: am, negativo: false }
    }
  }, [mode, total, reforcoValor])

  const schedule = useMemo((): LinhaTabela[] =>
    Array.from({ length: TOTAL_MONTHS }, (_, i) => {
      const mesNum = i + 1
      const isPast = i < currentMesIndex

      let tipo: TipoLinha
      let valor: number

      if (isPast) {
        tipo = '—'
        valor = 0
      } else if (mesNum === 1) {
        tipo = 'Entrada'
        valor = entrada
      } else if (REFORCO_MONTHS.has(mesNum)) {
        tipo = 'Reforço'
        valor = reforco
      } else {
        tipo = 'Aporte mensal'
        valor = Math.max(0, aporteMensal)
      }

      return { mes: mesNum, competencia: getCompetencia(i), tipo, valor, isPast }
    }),
  [entrada, reforco, aporteMensal, currentMesIndex])

  const mesesRestantes = TOTAL_MONTHS - currentMesIndex

  return (
    <>
      <PageHero
        eyebrow="Simulador — Sync Floriano"
        title={
          <>
            Visualize o cronograma de aportes do
            <span className="text-gradient"> Sync Floriano.</span>
          </>
        }
        description="Selecione a unidade e o modo de cálculo para ver o fluxo de pagamentos ao longo dos 54 meses do projeto — outubro de 2025 a março de 2030."
      />

      <section className="bg-[var(--bg-primary)] py-20 sm:py-24">
        <div className="section-container grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">

          {/* ── Painel esquerdo ─────────────────────────────── */}
          <aside className="surface-card p-6 sm:p-8">

            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs text-[#484949] dark:text-amber-200">
              <strong>Aviso:</strong> Simulação baseada no cronograma contratual. Valores
              sujeitos a ajuste. Não constitui garantia de rentabilidade.
            </div>

            {/* Unidade */}
            <span className="mt-6 block section-tag">Unidade</span>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  Selecionar unidade
                </span>
                <select
                  value={selectedAdesao}
                  onChange={(e) => setSelectedAdesao(e.target.value)}
                  className="input-base"
                >
                  {apartamentos.length > 0 && (
                    <optgroup label="Apartamentos">
                      {apartamentos.map((u) => (
                        <option key={u.adesao} value={u.adesao}>
                          {u.adesao} — {u.tipo}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {boxes.length > 0 && (
                    <optgroup label="Boxes">
                      {boxes.map((u) => (
                        <option key={u.adesao} value={u.adesao}>
                          {u.adesao} — {u.tipo}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </label>

              {selectedUnidade && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white/5 px-2 py-2.5">
                    <p className="text-[0.65rem] uppercase tracking-wide text-[var(--text-muted)]">
                      Área total
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[#041A2A] dark:text-white">
                      {selectedUnidade.areaTotal.toFixed(2)} m²
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/5 px-2 py-2.5">
                    <p className="text-[0.65rem] uppercase tracking-wide text-[var(--text-muted)]">
                      Área priv.
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[#041A2A] dark:text-white">
                      {selectedUnidade.areaPrivativa.toFixed(2)} m²
                    </p>
                  </div>
                  <div className="rounded-lg bg-[var(--accent)]/10 px-2 py-2.5">
                    <p className="text-[0.65rem] uppercase tracking-wide text-[var(--accent)]">
                      Valor
                    </p>
                    <p className="mt-0.5 text-[0.7rem] font-semibold text-[var(--accent)]">
                      {formatCurrency(selectedUnidade.partSocietaria)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Configuração */}
            <span className="mt-7 block section-tag">Configuração</span>
            <div className="mt-4 space-y-5">

              {/* Modo */}
              <div>
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  Modo de simulação
                </span>
                <div className="flex overflow-hidden rounded-lg border border-[#484949]/30">
                  <button
                    type="button"
                    onClick={() => setMode('valor')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      mode === 'valor'
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-[var(--text-secondary)] hover:bg-white/5'
                    }`}
                  >
                    Valor (R$)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('percentual')}
                    className={`flex-1 border-l border-[#484949]/30 py-2 text-sm font-medium transition-colors ${
                      mode === 'percentual'
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-[var(--text-secondary)] hover:bg-white/5'
                    }`}
                  >
                    Percentual
                  </button>
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  {mode === 'valor'
                    ? 'Entrada 14,28% + reforços fixos + parcelas mensais.'
                    : 'Entrada 15% + reforços 5% + parcelas 1,087% — sobre o valor contratual.'}
                </p>
              </div>

              {/* Valor total */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  {mode === 'percentual' ? 'Valor contratual (R$)' : 'Valor total do investimento (R$)'}
                </span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={totalInput}
                  onChange={(e) => setTotalInput(e.target.value)}
                  readOnly={mode === 'percentual'}
                  className={`input-base ${mode === 'percentual' ? 'cursor-default opacity-70' : ''}`}
                />
                {mode === 'percentual' && (
                  <span className="mt-1 block text-xs text-[var(--text-muted)]">
                    Preenchido automaticamente pelo preço da unidade.
                  </span>
                )}
              </label>

              {/* Reforço — apenas modo valor */}
              {mode === 'valor' && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                    Valor dos reforços (R$)
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={reforcoInput}
                    onChange={(e) => setReforcoInput(e.target.value)}
                    className="input-base"
                  />
                  <span className="mt-1 block text-xs text-[var(--text-muted)]">
                    Nos meses 6, 12, 18, 24, 30, 36 e 42.
                  </span>
                </label>
              )}

              {negativo && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-xs text-red-400">
                  O valor dos reforços ultrapassa o total disponível. Reduza os reforços ou aumente o valor total.
                </div>
              )}
            </div>
          </aside>

          {/* ── Painel direito ──────────────────────────────── */}
          <div className="space-y-6">

            {/* Cards de resumo */}
            <div className="grid gap-5 md:grid-cols-3 [&>*]:min-w-0">
              <article className="surface-card p-6">
                <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Entrada (mês 1)
                </p>
                <h2 className="mt-4 font-body text-[1.1rem] sm:text-[1.3rem] xl:text-[1.45rem] font-semibold tabular-nums text-[#A26547] break-words leading-tight">
                  {total > 0 ? formatCurrencyWithCents(entrada) : '—'}
                </h2>
                <p className="mt-2 text-[0.75rem] text-[var(--text-muted)]">
                  {mode === 'valor' ? '14,28% do total' : '15,00% do total'}
                </p>
              </article>

              <article className="surface-card p-6">
                <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Reforços (×7)
                </p>
                <h2 className="mt-4 font-body text-[1.1rem] sm:text-[1.3rem] xl:text-[1.45rem] font-semibold tabular-nums text-[#A26547] break-words leading-tight">
                  {total > 0 ? formatCurrencyWithCents(reforco) : '—'}
                </h2>
                <p className="mt-2 text-[0.75rem] text-[var(--text-muted)]">
                  {mode === 'valor' ? 'Por reforço (configurável)' : '5,00% do total cada'}
                </p>
              </article>

              <article className="surface-card p-6">
                <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Aporte mensal
                </p>
                <h2 className="mt-4 font-body text-[1.1rem] sm:text-[1.3rem] xl:text-[1.45rem] font-semibold tabular-nums text-[#A26547] break-words leading-tight">
                  {total > 0 && !negativo ? formatCurrencyWithCents(Math.max(0, aporteMensal)) : '—'}
                </h2>
                <p className="mt-2 text-[0.75rem] text-[var(--text-muted)]">
                  46 parcelas mensais
                </p>
              </article>
            </div>

            {/* Tabela de cronograma */}
            <div className="surface-card overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
                <div>
                  <span className="section-tag">Cronograma completo</span>
                  <h2 className="mt-3 text-xl font-semibold text-[#041A2A] dark:text-white sm:text-2xl">
                    54 meses · out/2025 → mar/2030
                  </h2>
                </div>
                <span className="hidden rounded-full border border-[#484949]/20 px-3 py-1 text-xs text-[var(--text-muted)] sm:block">
                  {mesesRestantes} meses restantes
                </span>
              </div>

              <div className="mt-6 max-h-[540px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10 border-b border-[#484949]/20 bg-[var(--bg-secondary)]">
                    <tr>
                      <th className="w-14 py-3 pl-6 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                        Mês
                      </th>
                      <th className="py-3 pl-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                        Competência
                      </th>
                      <th className="py-3 pl-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                        Tipo
                      </th>
                      <th className="py-3 pl-4 pr-6 text-right text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#484949]/10">
                    {schedule.map((row) => (
                      <tr
                        key={row.mes}
                        className={
                          row.isPast
                            ? 'opacity-30'
                            : row.tipo === 'Entrada'
                              ? 'bg-[var(--accent)]/5'
                              : row.tipo === 'Reforço'
                                ? 'bg-blue-400/5'
                                : ''
                        }
                      >
                        <td className="py-3 pl-6 tabular-nums text-[var(--text-muted)]">
                          {row.mes}
                        </td>
                        <td className="py-3 pl-4 tabular-nums text-[var(--text-secondary)]">
                          {row.competencia}
                        </td>
                        <td className="py-3 pl-4">
                          <span className={TIPO_STYLES[row.tipo]}>{row.tipo}</span>
                        </td>
                        <td className="py-3 pl-4 pr-6 text-right tabular-nums font-medium text-[#041A2A] dark:text-white">
                          {row.isPast || row.valor <= 0
                            ? '—'
                            : formatCurrencyWithCents(row.valor)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Leitura + CTA */}
            <div className="surface-card p-6 sm:p-8">
              <span className="section-tag">Próximo passo</span>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                O cronograma acima reflete o modelo contratual do Sync Floriano: uma entrada no
                mês 1, sete reforços semestrais e aportes mensais distribuídos ao longo dos 54
                meses do projeto. Fale com nossa equipe para reservar sua unidade.
              </p>
              <WhatsAppButton
                mensagem={`Olá! Simulei o cronograma de aportes do Sync Floriano para a ${selectedAdesao} e gostaria de saber mais.`}
                label="Falar sobre o Sync Floriano"
                className="mt-6"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
