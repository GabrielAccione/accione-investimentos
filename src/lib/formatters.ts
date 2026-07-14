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

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
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
