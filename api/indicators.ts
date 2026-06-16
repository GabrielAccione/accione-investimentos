interface AccumValue {
  value: number;
  date: string;
}

function extractIbgeAccum(raw: unknown): AccumValue | null {
  try {
    const result = (
      raw as { resultados: { series: { serie: Record<string, string> }[] }[] }[]
    )[0];
    const serie = result.resultados[0].series[0].serie;
    const entries = Object.entries(serie).filter(
      ([, v]) => v !== null && v !== "",
    );
    if (entries.length === 0) return null;
    const [lastPeriod, lastValue] = entries[entries.length - 1];
    const year = lastPeriod.slice(0, 4);
    const month = parseInt(lastPeriod.slice(4, 6), 10);
    const monthNames = [
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
    return {
      value: parseFloat(parseFloat(lastValue).toFixed(4)),
      date: `${monthNames[month - 1]}/${year}`,
    };
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300");

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const dateFrom = `01/01/${year}`;
    const dateTo = `31/12/${year}`;

    const ibbgePeriods = Array.from(
      { length: month },
      (_, i) => `${year}${String(i + 1).padStart(2, "0")}`,
    ).join("|");

    const fetchJson = async (url: string): Promise<unknown> => {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status} em ${url}`);
      return r.json();
    };

    const [selic, cdi, igpmRaw, inccRaw, ipcaRaw, bitcoin, ibovespa] =
      await Promise.allSettled([
        fetchJson(
          "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/2?formato=json",
        ),
        fetchJson(
          "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/2?formato=json",
        ),
        fetchJson(
          "https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados/ultimos/2?formato=json",
        ),
        fetchJson(
          "https://api.bcb.gov.br/dados/serie/bcdata.sgs.192/dados/ultimos/2?formato=json",
        ),
        fetchJson(
          `https://servicodados.ibge.gov.br/api/v3/agregados/6691/periodos/${ibbgePeriods}/variaveis/6693?localidades=N1[all]`,
        ),
        fetchJson(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl&include_24hr_change=true",
        ),
        fetchJson(
          `https://brapi.dev/api/quote/%5EBVSP?token=${process.env.BRAPI_TOKEN}`,
        ),
      ]);

    console.log(
      "[indicators] selic:",
      selic.status,
      selic.status === "fulfilled" ? JSON.stringify(selic.value) : selic.reason,
    );
    console.log(
      "[indicators] cdi:",
      cdi.status,
      cdi.status === "fulfilled" ? JSON.stringify(cdi.value) : cdi.reason,
    );
    console.log(
      "[indicators] igpm raw:",
      igpmRaw.status,
      igpmRaw.status === "fulfilled"
        ? JSON.stringify(igpmRaw.value)
        : igpmRaw.reason,
    );
    console.log(
      "[indicators] incc raw:",
      inccRaw.status,
      inccRaw.status === "fulfilled"
        ? JSON.stringify(inccRaw.value)
        : inccRaw.reason,
    );
    console.log(
      "[indicators] ipca ibge raw:",
      ipcaRaw.status,
      ipcaRaw.status === "fulfilled"
        ? JSON.stringify(ipcaRaw.value)
        : ipcaRaw.reason,
    );
    console.log(
      "[indicators] bitcoin:",
      bitcoin.status,
      bitcoin.status === "fulfilled"
        ? JSON.stringify(bitcoin.value)
        : bitcoin.reason,
    );
    console.log(
      "[indicators] ibovespa:",
      ibovespa.status,
      ibovespa.status === "fulfilled"
        ? JSON.stringify(ibovespa.value)
        : ibovespa.reason,
    );

    const igpm_acum = igpmRaw.status === "fulfilled" ? igpmRaw.value : null;
    const incc_acum = inccRaw.status === "fulfilled" ? inccRaw.value : null;
    const ipca_acum =
      ipcaRaw.status === "fulfilled" ? extractIbgeAccum(ipcaRaw.value) : null;

    console.log("[indicators] igpm_acum computed:", JSON.stringify(igpm_acum));
    console.log("[indicators] incc_acum computed:", JSON.stringify(incc_acum));
    console.log("[indicators] ipca_acum computed:", JSON.stringify(ipca_acum));

    return res.status(200).json({
      selic: selic.status === "fulfilled" ? selic.value : null,
      cdi: cdi.status === "fulfilled" ? cdi.value : null,
      ipca_acum,
      igpm_acum,
      incc_acum,
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
