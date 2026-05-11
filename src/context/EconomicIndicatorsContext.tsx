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

interface CoinGeckoResponse {
  bitcoin: {
    brl: number
    brl_24h_change: number
  }
}

interface HGBrasilResponse {
  results: {
    stocks: {
      IBOVESPA: {
        points: number
        variation: number
      }
    }
  }
}

const EconomicIndicatorsContext = createContext<EconomicIndicatorsContextValue | null>(null)
const REFRESH_INTERVAL_MS = 10 * 60 * 1000

function parseBcbValue(value: string) {
  return Number.parseFloat(value.replace(',', '.'))
}

async function fetchBcbSeries(series: number) {
  const response = await fetch(
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${series}/dados/ultimos/2?formato=json`,
  )

  if (!response.ok) {
    throw new Error(`Falha ao carregar a série ${series}.`)
  }

  return (await response.json()) as BcbPoint[]
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
  const [selicSeries, cdiSeries, ipcaSeries, igpmSeries, bitcoinResponse, ibovespaResponse] =
    await Promise.all([
      fetchBcbSeries(1178),
      fetchBcbSeries(4389),
      fetchBcbSeries(433),
      fetchBcbSeries(189),
      fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl&include_24hr_change=true',
      ).then(async (response) => {
        if (!response.ok) {
          throw new Error('Falha ao carregar o Bitcoin.')
        }

        return (await response.json()) as CoinGeckoResponse
      }),
      fetch('https://api.hgbrasil.com/finance?format=json-cors&key=demo').then(async (response) => {
        if (!response.ok) {
          throw new Error('Falha ao carregar o Ibovespa.')
        }

        return (await response.json()) as HGBrasilResponse
      }),
    ])

  const ibovespaPoints = ibovespaResponse.results.stocks.IBOVESPA.points
  const ibovespaVariation = ibovespaResponse.results.stocks.IBOVESPA.variation

  return [
    buildIndicatorFromSeries({
      id: 'selic',
      label: 'Selic',
      description: 'Taxa básica de juros em base anual.',
      icon: Landmark,
      source: 'Banco Central do Brasil',
      series: selicSeries,
      valueFormatter: (value) => formatPercent(value, '% a.a.'),
    }),
    buildIndicatorFromSeries({
      id: 'cdi',
      label: 'CDI',
      description: 'Referência diária do mercado interbancário em base anual.',
      icon: PiggyBank,
      source: 'Banco Central do Brasil',
      series: cdiSeries,
      valueFormatter: (value) => formatPercent(value, '% a.a.'),
    }),
    buildIndicatorFromSeries({
      id: 'ipca',
      label: 'IPCA',
      description: 'Índice oficial de inflação do país.',
      icon: BadgePercent,
      source: 'Banco Central do Brasil',
      series: ipcaSeries,
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
      series: igpmSeries,
      valueFormatter: (value) => formatPercent(value, '% no mês'),
      variationFormatter: (value) =>
        value === 0 ? 'Sem mudança ante o período anterior' : formatSignedPoints(value),
    }),
    {
      id: 'bitcoin',
      label: 'Bitcoin',
      description: 'Preço à vista da principal criptomoeda em BRL.',
      value: bitcoinResponse.bitcoin.brl,
      valueLabel: formatCurrency(bitcoinResponse.bitcoin.brl),
      variation: bitcoinResponse.bitcoin.brl_24h_change,
      variationLabel: formatSignedPercent(bitcoinResponse.bitcoin.brl_24h_change),
      icon: Bitcoin,
      source: 'CoinGecko',
    },
    {
      id: 'ibovespa',
      label: 'Ibovespa',
      description: 'Principal índice de ações da B3.',
      value: ibovespaPoints,
      valueLabel: `${Math.round(ibovespaPoints).toLocaleString('pt-BR')} pts`,
      variation: ibovespaVariation,
      variationLabel: formatSignedPercent(ibovespaVariation),
      icon: LineChart,
      source: 'HG Brasil',
    },
    {
      id: 'cub',
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
