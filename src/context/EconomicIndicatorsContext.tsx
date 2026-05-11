import {
  Activity,
  BadgePercent,
  Bitcoin,
  Building2,
  Landmark,
  LineChart,
  PiggyBank,
} from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { SITE_CONFIG } from '@/config/site'
import { formatCurrency, formatDateLabel, formatPercent, formatSignedPercent, formatSignedPoints } from '@/lib/formatters'
import type { EconomicIndicator } from '@/types'

interface EconomicIndicatorsContextValue {
  indicators: EconomicIndicator[]
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
  refreshIndicators: () => Promise<void>
}

interface BcbPoint {
  data: string
  valor: string
}



const EconomicIndicatorsContext = createContext<EconomicIndicatorsContextValue | null>(null)
const REFRESH_INTERVAL_MS = 10 * 60 * 1000

function parseBcbValue(value: string) {
  return Number.parseFloat(value.replace(',', '.'))
}

function buildIndicatorFromSeries(options: {
  id: EconomicIndicator['id']
  label: string
  description: string
  icon: EconomicIndicator['icon']
  source: string
  series: BcbPoint[]
  valueFormatter?: (value: number) => string
  variationFormatter?: (value: number) => string
}) {
  const [previousPoint, latestPoint] = options.series
  const latestValue = parseBcbValue(latestPoint.valor)
  const previousValue = previousPoint ? parseBcbValue(previousPoint.valor) : latestValue
  const variation = latestValue - previousValue

  return {
    id: options.id,
    label: options.label,
    description: options.description,
    value: latestValue,
    valueLabel: options.valueFormatter?.(latestValue) ?? formatPercent(latestValue),
    variation,
    variationLabel:
      options.variationFormatter?.(variation) ??
      (variation === 0 ? 'Sem variação recente' : formatSignedPoints(variation)),
    icon: options.icon,
    source: options.source,
    sourceDate: formatDateLabel(latestPoint.data),
  } satisfies EconomicIndicator
}

async function loadIndicators() {
  console.log('Iniciando loadIndicators...')

  const response = await fetch('/api/indicators')
  console.log('Status da resposta:', response.status)

  if (!response.ok) {
    throw new Error('Falha ao carregar os indicadores.')
  }

  const data = await response.json()
  console.log('DATA DA API:', JSON.stringify(data, null, 2))

  if (!data.selic || !data.cdi || !data.ipca || !data.igpm) {
    throw new Error('Dados incompletos retornados pela API.')
  }

  return [
    buildIndicatorFromSeries({
      id: 'selic',
      label: 'Selic',
      description: 'Taxa básica de juros em base anual.',
      icon: Landmark,
      source: 'Banco Central do Brasil',
      series: data.selic,
      valueFormatter: (value) => formatPercent(value, '% a.a.'),
    }),
    buildIndicatorFromSeries({
      id: 'cdi',
      label: 'CDI',
      description: 'Referência diária do mercado interbancário em base anual.',
      icon: PiggyBank,
      source: 'Banco Central do Brasil',
      series: data.cdi,
      valueFormatter: (value) => formatPercent(value, '% a.a.'),
    }),
    buildIndicatorFromSeries({
      id: 'ipca',
      label: 'IPCA',
      description: 'Índice oficial de inflação do país.',
      icon: BadgePercent,
      source: 'Banco Central do Brasil',
      series: data.ipca,
      valueFormatter: (value) => formatPercent(value, '% no mês'),
      variationFormatter: (value) =>
        value === 0 ? 'Sem mudança ante o período anterior' : formatSignedPoints(value),
    }),
    buildIndicatorFromSeries({
      id: 'igpm',
      label: 'IGP-M',
      description: 'Índice amplamente usado em contratos e reajustes.',
      icon: Activity,
      source: 'Banco Central do Brasil',
      series: data.igpm,
      valueFormatter: (value) => formatPercent(value, '% no mês'),
      variationFormatter: (value) =>
        value === 0 ? 'Sem mudança ante o período anterior' : formatSignedPoints(value),
    }),
    {
      id: 'bitcoin' as const,
      label: 'Bitcoin',
      description: 'Preço à vista da principal criptomoeda em BRL.',
      value: data.bitcoin?.bitcoin?.brl ?? 0,
      valueLabel: formatCurrency(data.bitcoin?.bitcoin?.brl ?? 0),
      variation: data.bitcoin?.bitcoin?.brl_24h_change ?? 0,
      variationLabel: formatSignedPercent(data.bitcoin?.bitcoin?.brl_24h_change ?? 0),
      icon: Bitcoin,
      source: 'CoinGecko',
    },
    {
      id: 'ibovespa' as const,
      label: 'Ibovespa',
      description: 'Principal índice de ações da B3.',
      value: data.ibovespa?.results?.stocks?.IBOVESPA?.points ?? 0,
      valueLabel: `${Math.round(data.ibovespa?.results?.stocks?.IBOVESPA?.points ?? 0).toLocaleString('pt-BR')} pts`,
      variation: data.ibovespa?.results?.stocks?.IBOVESPA?.variation ?? 0,
      variationLabel: formatSignedPercent(data.ibovespa?.results?.stocks?.IBOVESPA?.variation ?? 0),
      icon: LineChart,
      source: 'HG Brasil',
    },
    {
      id: 'cub' as const,
      label: 'CUB R16N',
      description: 'Indicador configurado manualmente até a definição do fluxo oficial.',
      value: SITE_CONFIG.manualIndicators.cubR16n.value,
      valueLabel: SITE_CONFIG.manualIndicators.cubR16n.valueLabel,
      variation: SITE_CONFIG.manualIndicators.cubR16n.variation,
      variationLabel:
        SITE_CONFIG.manualIndicators.cubR16n.variation === null
          ? 'Sem variação cadastrada'
          : formatSignedPercent(SITE_CONFIG.manualIndicators.cubR16n.variation),
      icon: Building2,
      source: 'Configuração local',
      sourceDate: SITE_CONFIG.manualIndicators.cubR16n.updatedAt,
      isManual: true,
    },
  ] satisfies EconomicIndicator[]
}

export function EconomicIndicatorsProvider({ children }: { children: ReactNode }) {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const refreshIndicators = useCallback(async () => {
    try {
      setError(null)
      const nextIndicators = await loadIndicators()
      setIndicators(nextIndicators)
      setLastUpdated(new Date().toLocaleString('pt-BR'))
    } catch (caughtError) {
      console.error('ERRO COMPLETO:', caughtError)
      console.error('STACK:', caughtError instanceof Error ? caughtError.stack : 'sem stack')
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível atualizar os indicadores agora.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshIndicators()

    const interval = window.setInterval(() => {
      void refreshIndicators()
    }, REFRESH_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [refreshIndicators])

  const value = useMemo(
    () => ({
      indicators,
      isLoading,
      error,
      lastUpdated,
      refreshIndicators,
    }),
    [error, indicators, isLoading, lastUpdated, refreshIndicators],
  )

  return (
    <EconomicIndicatorsContext.Provider value={value}>
      {children}
    </EconomicIndicatorsContext.Provider>
  )
}

export function useEconomicIndicators() {
  const context = useContext(EconomicIndicatorsContext)

  if (!context) {
    throw new Error('useEconomicIndicators deve ser usado dentro de EconomicIndicatorsProvider.')
  }

  return context
}
