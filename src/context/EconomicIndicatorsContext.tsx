import {
  Activity,
  BadgePercent,
  BarChart3,
  Bitcoin,
  Gauge,
  Landmark,
  LineChart,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  formatCurrency,
  formatDateLabel,
  formatPercent,
  formatSignedPercent,
  formatSignedPoints,
} from "@/lib/formatters";
import type { EconomicIndicator } from "@/types";

interface EconomicIndicatorsContextValue {
  indicators: EconomicIndicator[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refreshIndicators: () => Promise<void>;
}

interface BcbPoint {
  data: string;
  valor: string;
}

interface InflationData {
  mensal: number;
  acum12m: number;
  date: string;
}

const EconomicIndicatorsContext =
  createContext<EconomicIndicatorsContextValue | null>(null);
const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

function parseBcbValue(value: string) {
  return Number.parseFloat(value.replace(",", "."));
}

function parseBcbDate(value: string): number {
  const [day, month, year] = value.split("/").map(Number);
  return year * 10000 + month * 100 + day;
}

function buildRateIndicator(options: {
  id: EconomicIndicator["id"];
  label: string;
  description: string;
  icon: EconomicIndicator["icon"];
  source: string;
  point: BcbPoint;
  previousPoint: BcbPoint;
}) {
  const latestValue = parseBcbValue(options.point.valor);
  const previousValue = parseBcbValue(options.previousPoint.valor);
  const variation = latestValue - previousValue;

  return {
    id: options.id,
    label: options.label,
    description: options.description,
    value: latestValue,
    valueLabel: formatPercent(latestValue, "% a.a."),
    variation,
    variationLabel:
      variation === 0
        ? "Sem variação recente"
        : formatSignedPoints(variation),
    icon: options.icon,
    source: options.source,
    sourceDate: formatDateLabel(options.point.data),
  } satisfies EconomicIndicator;
}

/**
 * Selic (meta, prospectiva) e CDI (diário, realizado com ~1 dia de defasagem)
 * são séries distintas do SGS. Pegar o último ponto de cada uma isoladamente
 * pode comparar dias diferentes e fazer o CDI aparecer acima da Selic sem ser
 * o caso. O CDI define a data de referência comum (é a série que só existe
 * depois de realizada); a Selic usa a meta vigente naquela mesma data.
 */
function buildSelicCdiIndicators(selicSeries: BcbPoint[], cdiSeries: BcbPoint[]) {
  const byDateAsc = (a: BcbPoint, b: BcbPoint) =>
    parseBcbDate(a.data) - parseBcbDate(b.data);

  const sortedCdi = [...cdiSeries].sort(byDateAsc);
  const cdiLatest = sortedCdi[sortedCdi.length - 1];
  const cdiPrevious = sortedCdi[sortedCdi.length - 2] ?? cdiLatest;

  const sortedSelic = [...selicSeries].sort(byDateAsc);
  const targetDateKey = parseBcbDate(cdiLatest.data);
  const selicUpToTarget = sortedSelic.filter(
    (point) => parseBcbDate(point.data) <= targetDateKey,
  );
  const selicLatest = selicUpToTarget[selicUpToTarget.length - 1] ?? sortedSelic[0];
  const selicLatestIndex = sortedSelic.indexOf(selicLatest);
  const selicPrevious = sortedSelic[selicLatestIndex - 1] ?? selicLatest;

  return {
    selic: buildRateIndicator({
      id: "selic",
      label: "Selic",
      description: "Taxa básica de juros em base anual.",
      icon: Landmark,
      source: "BCB",
      point: selicLatest,
      previousPoint: selicPrevious,
    }),
    cdi: buildRateIndicator({
      id: "cdi",
      label: "CDI",
      description: "Referência diária do mercado interbancário em base anual.",
      icon: PiggyBank,
      source: "B3",
      point: cdiLatest,
      previousPoint: cdiPrevious,
    }),
  };
}

function buildInflationIndicator(options: {
  id: EconomicIndicator["id"];
  label: string;
  description: string;
  icon: EconomicIndicator["icon"];
  source: string;
  data: InflationData | null;
}) {
  if (!options.data) {
    console.warn(`Indicador "${options.label}" indisponível: sem dado retornado pela API.`);
    return {
      id: options.id,
      label: options.label,
      description: options.description,
      value: null,
      valueLabel: "—",
      variation: null,
      variationLabel: "Indisponível",
      icon: options.icon,
      source: options.source,
    } satisfies EconomicIndicator;
  }

  return {
    id: options.id,
    label: options.label,
    description: options.description,
    value: options.data.mensal,
    valueLabel: formatPercent(options.data.mensal, "%"),
    periodLabel: "no último mês",
    variation: options.data.acum12m,
    variationLabel: `${formatSignedPercent(options.data.acum12m)} nos últimos 12 meses`,
    neutralVariation: true,
    icon: options.icon,
    source: options.source,
    sourceDate: options.data.date,
  } satisfies EconomicIndicator;
}

async function loadIndicators() {
  const response = await fetch("/api/indicators");

  if (!response.ok) {
    throw new Error("Falha ao carregar os indicadores.");
  }

  const data = await response.json();

  if (!data.selic || !data.cdi) {
    throw new Error("Dados incompletos retornados pela API.");
  }

  // Cotações de mercado: quando a fonte externa falha, exibimos "indisponível"
  // em vez de zero — mostrar R$ 0,00 como se fosse preço real induziria a erro.
  const bitcoinPrice: number | null = data.bitcoin?.bitcoin?.brl ?? null;
  const bitcoinChange: number | null =
    data.bitcoin?.bitcoin?.brl_24h_change ?? null;
  const ibovespaPoints: number | null =
    data.ibovespa?.results?.[0]?.regularMarketPrice ?? null;
  const ibovespaChange: number | null =
    data.ibovespa?.results?.[0]?.regularMarketChangePercent ?? null;

  const { selic, cdi } = buildSelicCdiIndicators(data.selic, data.cdi);

  return [
    selic,
    cdi,
    buildInflationIndicator({
      id: "ipca",
      label: "IPCA",
      description: "Índice oficial de inflação do país.",
      icon: BadgePercent,
      source: "IBGE",
      data: data.ipca,
    }),
    buildInflationIndicator({
      id: "ipca15",
      label: "IPCA-15",
      description: "Prévia mensal da inflação oficial (IPCA).",
      icon: Gauge,
      source: "IBGE",
      data: data.ipca15,
    }),
    buildInflationIndicator({
      id: "igpm",
      label: "IGP-M",
      description: "Índice amplamente usado em contratos e reajustes.",
      icon: Activity,
      source: "FGV",
      data: data.igpm,
    }),
    buildInflationIndicator({
      id: "igpdi",
      label: "IGP-DI",
      description: "Índice geral de preços — disponibilidade interna.",
      icon: BarChart3,
      source: "FGV",
      data: data.igpdi,
    }),
    buildInflationIndicator({
      id: "incc",
      label: "INCC-M",
      description: "Índice de custos da construção civil — INCC-Mercado.",
      icon: TrendingUp,
      source: "FGV",
      data: data.incc,
    }),
    {
      id: "bitcoin" as const,
      label: "Bitcoin",
      description: "Preço à vista da principal criptomoeda em BRL.",
      value: bitcoinPrice,
      valueLabel: bitcoinPrice !== null ? formatCurrency(bitcoinPrice) : "—",
      variation: bitcoinChange,
      variationLabel:
        bitcoinChange !== null
          ? formatSignedPercent(bitcoinChange)
          : "Indisponível",
      icon: Bitcoin,
      source: "CoinGecko",
    },
    {
      id: "ibovespa" as const,
      label: "Ibovespa",
      description: "Principal índice de ações da B3.",
      value: ibovespaPoints,
      valueLabel:
        ibovespaPoints !== null
          ? `${Math.round(ibovespaPoints).toLocaleString("pt-BR")} pts`
          : "—",
      variation: ibovespaChange,
      variationLabel:
        ibovespaChange !== null
          ? formatSignedPercent(ibovespaChange)
          : "Indisponível",
      icon: LineChart,
      source: "B3",
    },
  ] satisfies EconomicIndicator[];
}

export function EconomicIndicatorsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const refreshIndicators = useCallback(async () => {
    try {
      setError(null);
      const nextIndicators = await loadIndicators();
      setIndicators(nextIndicators);
      setLastUpdated(new Date().toLocaleString("pt-BR"));
    } catch (caughtError) {
      console.error("ERRO COMPLETO:", caughtError);
      console.error(
        "STACK:",
        caughtError instanceof Error ? caughtError.stack : "sem stack",
      );
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível atualizar os indicadores agora.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshIndicators();

    const interval = window.setInterval(() => {
      void refreshIndicators();
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [refreshIndicators]);

  const value = useMemo(
    () => ({
      indicators,
      isLoading,
      error,
      lastUpdated,
      refreshIndicators,
    }),
    [error, indicators, isLoading, lastUpdated, refreshIndicators],
  );

  return (
    <EconomicIndicatorsContext.Provider value={value}>
      {children}
    </EconomicIndicatorsContext.Provider>
  );
}

export function useEconomicIndicators() {
  const context = useContext(EconomicIndicatorsContext);

  if (!context) {
    throw new Error(
      "useEconomicIndicators deve ser usado dentro de EconomicIndicatorsProvider.",
    );
  }

  return context;
}
