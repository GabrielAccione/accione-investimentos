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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300");

  try {
    const fetchJson = async (url: string): Promise<unknown> => {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status} em ${url}`);
      return r.json();
    };

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
      fetchJson(sgs(432, 2)), // Meta Selic
      fetchJson(sgs(4389, 2)), // CDI
      fetchJson(sgs(433, 12)), // IPCA mensal
      fetchJson(sgs(7478, 12)), // IPCA-15 mensal
      fetchJson(sgs(189, 12)), // IGP-M mensal
      fetchJson(sgs(190, 12)), // IGP-DI mensal
      fetchJson(sgs(192, 12)), // INCC mensal
      fetchJson(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl&include_24hr_change=true",
      ),
      fetchJson(
        `https://brapi.dev/api/quote/%5EBVSP?token=${process.env.BRAPI_TOKEN}`,
      ),
    ]);

    const inflacao = (r: PromiseSettledResult<unknown>) =>
      r.status === "fulfilled" ? computeInflacao(r.value) : null;

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
