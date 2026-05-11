export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=300')

  try {
    const fetchJson = async (url: string) => {
      const r = await fetch(url)
      if (!r.ok) throw new Error(`HTTP ${r.status} em ${url}`)
      return r.json()
    }

    const [selic, cdi, ipca, igpm, bitcoin, ibovespa] = await Promise.allSettled([
      fetchJson('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/2?formato=json'),
      fetchJson('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/2?formato=json'),
      fetchJson('https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/2?formato=json'),
      fetchJson('https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados/ultimos/2?formato=json'),
      fetchJson('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl&include_24hr_change=true'),
      fetchJson('https://api.hgbrasil.com/finance?format=json-cors&key=demo'),
    ])

    return res.status(200).json({
      selic:    selic.status    === 'fulfilled' ? selic.value    : null,
      cdi:      cdi.status      === 'fulfilled' ? cdi.value      : null,
      ipca:     ipca.status     === 'fulfilled' ? ipca.value     : null,
      igpm:     igpm.status     === 'fulfilled' ? igpm.value     : null,
      bitcoin:  bitcoin.status  === 'fulfilled' ? bitcoin.value  : null,
      ibovespa: ibovespa.status === 'fulfilled' ? ibovespa.value : null,
    })
  } catch (error) {
    console.error('Erro na API Route:', error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    })
  }
}
