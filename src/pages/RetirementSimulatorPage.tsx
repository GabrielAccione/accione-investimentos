import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import PageHero from '@/components/ui/PageHero'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { useTheme } from '@/context/ThemeContext'
import { calculateRetirementProjection } from '@/lib/financial'
import { formatCompactCurrency, formatCurrency, formatPercent } from '@/lib/formatters'

const DEFAULT_VALUES = {
  currentAge: 35,
  retirementAge: 60,
  monthlyContribution: 1500,
  annualRate: 12,
}

export default function RetirementSimulatorPage() {
  const { theme } = useTheme()
  const [currentAge, setCurrentAge] = useState(String(DEFAULT_VALUES.currentAge))
  const [retirementAge, setRetirementAge] = useState(String(DEFAULT_VALUES.retirementAge))
  const [monthlyContribution, setMonthlyContribution] = useState(
    String(DEFAULT_VALUES.monthlyContribution),
  )
  const [annualRate, setAnnualRate] = useState(String(DEFAULT_VALUES.annualRate))

  const parsedCurrentAge = Number(currentAge)
  const parsedRetirementAge = Number(retirementAge)
  const parsedMonthlyContribution = Number(monthlyContribution)
  const parsedAnnualRate = Number(annualRate)

  const validationError = (() => {
    if (parsedRetirementAge <= parsedCurrentAge)
      return 'A idade de aposentadoria deve ser maior que a idade atual.'
    if (parsedMonthlyContribution < 100)
      return 'O aporte mínimo é de R$ 100,00.'
    if (parsedAnnualRate < 1 || parsedAnnualRate > 50)
      return 'Informe uma taxa entre 1% e 50% ao ano.'
    return null
  })()

  const isValidScenario = parsedCurrentAge > 0 && !validationError
  const isDark = theme === 'dark'
  const chartGridStroke = isDark ? 'rgba(255,255,255,0.08)' : '#E5E5E5'
  const chartAxisStroke = isDark ? '#69727D' : '#484949'

  const projection = isValidScenario
    ? calculateRetirementProjection(
        parsedCurrentAge,
        parsedRetirementAge,
        parsedMonthlyContribution,
        parsedAnnualRate,
      )
    : null

  return (
    <>
      <PageHero
        eyebrow="Simulador de aposentadoria"
        title={
          <>
            Projete o patrimônio necessário para uma
            <span className="text-gradient"> renda passiva consistente.</span>
          </>
        }
        description="A simulação considera aportes mensais e rentabilidade anual esperada para estimar evolução patrimonial até a idade-alvo."
      />

      <section className="bg-[var(--bg-primary)] py-20 sm:py-24">
        <div className="section-container grid gap-8 xl:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="surface-card p-6 sm:p-8">
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs text-[#484949] dark:text-amber-200">
              <strong>Aviso importante:</strong> Os resultados apresentados são estimativas baseadas nos dados informados e em projeções matemáticas. Não constituem garantia de rentabilidade nem recomendação de investimento. Rentabilidade passada não garante resultados futuros.
            </div>
            <span className="mt-6 block section-tag">Entradas</span>
            <div className="mt-4 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  Idade atual
                </span>
                <input
                  type="number"
                  min={18}
                  value={currentAge}
                  onChange={(event) => setCurrentAge(event.target.value)}
                  className="input-base"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  Idade de aposentadoria
                </span>
                <input
                  type="number"
                  min={19}
                  value={retirementAge}
                  onChange={(event) => setRetirementAge(event.target.value)}
                  className="input-base"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  Aporte mensal (R$)
                </span>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={monthlyContribution}
                  onChange={(event) => setMonthlyContribution(event.target.value)}
                  className="input-base"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  Rentabilidade anual esperada (%)
                </span>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={annualRate}
                  onChange={(event) => setAnnualRate(event.target.value)}
                  className="input-base"
                />
              </label>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)]">
              A renda passiva estimada considera a mesma taxa anual informada, convertida para base mensal apenas como referência de planejamento.
            </p>
          </aside>

          <div className="space-y-6">
            {!isValidScenario || !projection ? (
              <div className="surface-card p-8 text-sm leading-relaxed text-[var(--text-secondary)]">
                {validationError ?? 'Preencha os campos para visualizar a projeção.'}
              </div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-3">
                  <article className="surface-card p-6">
                    <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      Patrimônio acumulado
                    </p>
                    <h2 className="mt-4 font-body text-[2.5rem] font-semibold tracking-normal tabular-nums text-[#A26547]">
                      {formatCurrency(projection.balance)}
                    </h2>
                  </article>

                  <article className="surface-card p-6">
                    <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      Renda passiva estimada
                    </p>
                    <h2 className="mt-4 font-body text-[2.5rem] font-semibold tracking-normal tabular-nums text-[#A26547]">
                      {formatCurrency(projection.monthlyIncome)}
                    </h2>
                  </article>

                  <article className="surface-card p-6">
                    <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      Horizonte
                    </p>
                    <h2 className="mt-4 font-body text-[2.5rem] font-semibold tracking-normal tabular-nums text-[#A26547]">
                      {projection.months / 12} anos
                    </h2>
                    <p className="mt-3 text-[0.8rem] text-[var(--text-muted)]">
                      Taxa usada: {formatPercent(parsedAnnualRate, '% a.a.')}
                    </p>
                  </article>
                </div>

                <div className="surface-card p-6 sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="section-tag">Evolução patrimonial</span>
                      <h2 className="mt-4 text-4xl font-semibold text-[#041A2A] dark:text-white">
                        Crescimento projetado ao longo do tempo
                      </h2>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Valor final: {formatCompactCurrency(projection.balance)}
                    </p>
                  </div>

                  <div className="mt-8 h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={projection.points}>
                        <defs>
                          <linearGradient id="retirementBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#A26547" stopOpacity={0.45} />
                            <stop offset="95%" stopColor="#A26547" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke={chartGridStroke} vertical={false} />
                        <XAxis dataKey="age" stroke={chartAxisStroke} tickLine={false} axisLine={false} />
                        <YAxis
                          stroke={chartAxisStroke}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value: number) => formatCompactCurrency(value)}
                        />
                        <Tooltip
                          formatter={(value) => [formatCurrency(Number(value ?? 0)), 'Patrimônio']}
                          labelFormatter={(label) => `Idade ${label}`}
                          contentStyle={{
                            backgroundColor: isDark ? '#0C2030' : '#FFFFFF',
                            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                            borderRadius: '16px',
                            color: isDark ? '#FFFFFF' : '#041A2A',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          stroke="#A26547"
                          fill="url(#retirementBalance)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="surface-card p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="section-tag">Próximo passo</span>
                      <h2 className="mt-4 text-3xl font-semibold text-[#041A2A] dark:text-white">
                        Transforme a simulação em um plano de alocação.
                      </h2>
                    </div>
                    <WhatsAppButton
                      mensagem="Olá! Fiz uma simulação de aposentadoria no site e gostaria de conversar sobre investimentos."
                      label="Falar pelo WhatsApp"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
