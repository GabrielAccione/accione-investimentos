interface BcbPoint {
  data: string;
  valor: string;
}

interface InflationValue {
  mensal: number;
  acum12m: number;
  date: string;
}

const MONTH_NAMES = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function parseBcbValue(v: string): number {
  return parseFloat(v.replace(",", "."));
}

// Recebe a série mensal (últimos ~12 pontos) e devolve o valor do último mês,
// a variação acumulada em 12 meses (composição) e a data de referência.
function computeInflacao(raw: unknown): InflationValue | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const series = raw as BcbPoint[];
  const last = series[series.length - 1];
  const mensal = parseBcbValue(last.valor);

  const last12 = series.slice(-12);
  const fator = last12.reduce(
    (acc, p) => acc * (1 + parseBcbValue(p.valor) / 100),
    1,
  );
  const acum12m = (fator - 1) * 100;

  const [day, monthStr, year] = last.data.split("/");
  void day;
  const monthIndex = parseInt(monthStr, 10) - 1;

  return {
    mensal: parseFloat(mensal.toFixed(4)),
    acum12m: parseFloat(acum12m.toFixed(4)),
    date: `${MONTH_NAMES[monthIndex]}/${year}`,
  };
}

const sgs = (code: number, ultimos: number) =>
  `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${code}/dados/ultimos/${ultimos}?formato=json`;

function formatBcbDate(date: Date): string {
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = date.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// Selic (432) via "ultimos" vem pré-preenchida com datas futuras (o BCB projeta a
// meta vigente até a próxima reunião do Copom), o que impede alinhar com a data
// real do CDI. Consultar por intervalo de datas termina sempre no "hoje" do
// servidor e traz o histórico real.
const sgsRange = (code: number, dataInicial: string, dataFinal: string) =>
  `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${code}/dados?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`;

// Assinatura mínima da função serverless da Vercel (evita depender de @vercel/node).
interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): ApiResponse;
}

export default async function handler(_req: unknown, res: ApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300");

  try {
    const fetchJson = async (url: string): Promise<unknown> => {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status} em ${url}`);
      return r.json();
    };

    const today = new Date();
    const rangeStart = new Date(today);
    rangeStart.setUTCDate(rangeStart.getUTCDate() - 20);
    const dataInicial = formatBcbDate(rangeStart);
    const dataFinal = formatBcbDate(today);

    const [
      selic,
      cdi,
      ipcaRaw,
      ipca15Raw,
      igpmRaw,
      igpdiRaw,
      inccRaw,
      bitcoin,
      ibovespa,
    ] = await Promise.allSettled([
      fetchJson(sgsRange(432, dataInicial, dataFinal)), // Meta Selic — janela por data (evita "ultimos" pré-preenchida no futuro)
      fetchJson(sgsRange(4389, dataInicial, dataFinal)), // CDI — mesma janela, para alinhar datas com a Selic
      fetchJson(sgs(433, 12)), // IPCA mensal
      fetchJson(sgs(7478, 12)), // IPCA-15 mensal
      fetchJson(sgs(189, 12)), // IGP-M mensal
      fetchJson(sgs(190, 12)), // IGP-DI mensal
      fetchJson(sgs(7456, 12)), // INCC-M mensal (FGV, replicado pelo BCB SGS)
      fetchJson(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl&include_24hr_change=true",
      ),
      fetchJson(
        `https://brapi.dev/api/quote/%5EBVSP?token=${process.env.BRAPI_TOKEN}`,
      ),
    ]);

    const inflacao = (r: PromiseSettledResult<unknown>) =>
      r.status === "fulfilled" ? computeInflacao(r.value) : null;

    const warnIfRejected = (name: string, r: PromiseSettledResult<unknown>) => {
      if (r.status === "rejected") {
        console.warn(`Indicador "${name}" falhou ao buscar:`, r.reason);
      }
    };
    warnIfRejected("Selic (SGS 432)", selic);
    warnIfRejected("CDI (SGS 4389)", cdi);
    warnIfRejected("IPCA (SGS 433)", ipcaRaw);
    warnIfRejected("IPCA-15 (SGS 7478)", ipca15Raw);
    warnIfRejected("IGP-M (SGS 189)", igpmRaw);
    warnIfRejected("IGP-DI (SGS 190)", igpdiRaw);
    warnIfRejected("INCC-M (SGS 7456)", inccRaw);
    warnIfRejected("Bitcoin (CoinGecko)", bitcoin);
    warnIfRejected("Ibovespa (brapi)", ibovespa);

    return res.status(200).json({
      selic: selic.status === "fulfilled" ? selic.value : null,
      cdi: cdi.status === "fulfilled" ? cdi.value : null,
      ipca: inflacao(ipcaRaw),
      ipca15: inflacao(ipca15Raw),
      igpm: inflacao(igpmRaw),
      igpdi: inflacao(igpdiRaw),
      incc: inflacao(inccRaw),
      bitcoin: bitcoin.status === "fulfilled" ? bitcoin.value : null,
      ibovespa: ibovespa.status === "fulfilled" ? ibovespa.value : null,
    });
  } catch (error) {
    console.error("Erro na API Route indicators:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}
