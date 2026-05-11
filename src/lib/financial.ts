export interface RetirementProjectionPoint {
  age: number
  year: number
  balance: number
}

export interface RetirementProjectionResult {
  balance: number
  monthlyIncome: number
  months: number
  annualRate: number
  monthlyRate: number
  points: RetirementProjectionPoint[]
}

export interface CashFlowEntry {
  year: number
  amount: number
}

export function annualToMonthlyRate(annualRate: number) {
  return Math.pow(1 + annualRate / 100, 1 / 12) - 1
}

export function calculateRetirementProjection(
  currentAge: number,
  retirementAge: number,
  monthlyContribution: number,
  annualRate: number,
): RetirementProjectionResult {
  const years = Math.max(retirementAge - currentAge, 0)
  const months = years * 12
  const monthlyRate = annualToMonthlyRate(annualRate)

  let balance = 0
  const points: RetirementProjectionPoint[] = [{ age: currentAge, year: 0, balance: 0 }]

  for (let month = 1; month <= months; month += 1) {
    balance = balance * (1 + monthlyRate) + monthlyContribution

    if (month % 12 === 0 || month === months) {
      const currentYear = Math.ceil(month / 12)
      points.push({
        age: currentAge + currentYear,
        year: currentYear,
        balance,
      })
    }
  }

  return {
    balance,
    monthlyIncome: balance * monthlyRate,
    months,
    annualRate,
    monthlyRate,
    points,
  }
}

export function calculateNpv(ratePercent: number, initialInvestment: number, cashFlows: CashFlowEntry[]) {
  const rate = ratePercent / 100

  return cashFlows.reduce(
    (accumulator, cashFlow) => accumulator + cashFlow.amount / Math.pow(1 + rate, cashFlow.year),
    -initialInvestment,
  )
}

function calculateIrrNpv(rate: number, cashFlows: number[]) {
  return cashFlows.reduce((accumulator, cashFlow, index) => {
    return accumulator + cashFlow / Math.pow(1 + rate, index)
  }, 0)
}

export function calculateIrr(cashFlows: number[]) {
  let lowerBound = -0.9999
  let upperBound = 10
  let npvAtLower = calculateIrrNpv(lowerBound, cashFlows)
  let npvAtUpper = calculateIrrNpv(upperBound, cashFlows)

  if (npvAtLower === 0) return lowerBound * 100
  if (npvAtUpper === 0) return upperBound * 100

  let attempts = 0
  while (npvAtLower * npvAtUpper > 0 && attempts < 20) {
    upperBound *= 2
    npvAtUpper = calculateIrrNpv(upperBound, cashFlows)
    attempts += 1
  }

  if (npvAtLower * npvAtUpper > 0) return null

  for (let iteration = 0; iteration < 150; iteration += 1) {
    const midpoint = (lowerBound + upperBound) / 2
    const npvAtMidpoint = calculateIrrNpv(midpoint, cashFlows)

    if (Math.abs(npvAtMidpoint) < 0.000001) {
      return midpoint * 100
    }

    if (npvAtLower * npvAtMidpoint < 0) {
      upperBound = midpoint
      npvAtUpper = npvAtMidpoint
    } else {
      lowerBound = midpoint
      npvAtLower = npvAtMidpoint
    }
  }

  return ((lowerBound + upperBound) / 2) * 100
}

export function calculatePayback(initialInvestment: number, cashFlows: CashFlowEntry[]) {
  let accumulated = -initialInvestment
  let previousAccumulated = accumulated
  let previousYear = 0

  for (const cashFlow of cashFlows) {
    accumulated += cashFlow.amount

    if (accumulated >= 0) {
      const recoveredInYear = cashFlow.amount
      const remainingBeforeYear = Math.abs(previousAccumulated)
      const fractionOfYear = recoveredInYear === 0 ? 0 : remainingBeforeYear / recoveredInYear

      return previousYear + fractionOfYear
    }

    previousAccumulated = accumulated
    previousYear = cashFlow.year
  }

  return null
}
