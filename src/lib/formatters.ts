const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const currencyWithCentsFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const decimalFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const compactCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  notation: 'compact',
  maximumFractionDigits: 1,
})



export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatCurrencyWithCents(value: number) {
  return currencyWithCentsFormatter.format(value)
}

export function formatCompactCurrency(value: number) {
  return compactCurrencyFormatter.format(value)
}

export function formatPercent(value: number, suffix = '%') {
  return `${percentFormatter.format(value)}${suffix}`
}

export function formatSignedPercent(value: number) {
  const signal = value > 0 ? '+' : ''
  return `${signal}${percentFormatter.format(value)}%`
}

export function formatSignedPoints(value: number) {
  const signal = value > 0 ? '+' : ''
  return `${signal}${decimalFormatter.format(value)} p.p.`
}

export function formatNumber(value: number) {
  return decimalFormatter.format(value)
}

export function formatDateLabel(value: string) {
  return value
}

/** Formata uma data "YYYY-MM-DD" em pt-BR sem o bug de fuso horário:
    `new Date("YYYY-MM-DD")` é interpretado como UTC, então em fusos atrás
    de UTC (Brasil) `toLocaleDateString` mostra o dia anterior. Aqui a data
    é montada com os componentes locais, sem passar pelo parser UTC. */
export function formatIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR')
}
