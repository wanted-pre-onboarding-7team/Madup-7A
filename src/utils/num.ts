import BigNumber from 'bignumber.js'

const Num = (n: string | number, b?: number | undefined): BigNumber => {
  if (typeof n === 'string') {
    return new BigNumber(n.replace(/,/g, ''), b)
  }

  return new BigNumber(n, b)
}

const getPlus = (a: number, b: number) => {
  return Num(a).plus(b).toNumber()
}

const getMinus = (a: number, b: number) => {
  return Num(a).minus(b).toNumber()
}

const getMultipliedBy = (a: number, b: number) => {
  return Num(a).multipliedBy(b).toNumber()
}

const getDividedBy = (a: number, b: number) => {
  if (!b) return a

  return Num(a).dividedBy(b).toNumber()
}

const getAbsoluteValue = (a: number) => {
  return Num(a).abs().toNumber()
}

const getRevenue = (roas: number, cost: number): number => {
  return getDividedBy(getMultipliedBy(roas, cost), 100)
}

const getConversion = (click: number, cvr: number): number => {
  return getDividedBy(getMultipliedBy(click, cvr), 100)
}

const getRoas = (revenue: number, cost: number) => {
  return getMultipliedBy(getDividedBy(revenue, cost), 100)
}

export { Num, getPlus, getMinus, getMultipliedBy, getDividedBy, getAbsoluteValue, getRevenue, getConversion, getRoas }
