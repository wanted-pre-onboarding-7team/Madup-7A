import TREND_DATE from 'assets/data/wanted_FE_trend-data-set.json'
import { IDaily } from 'types/trend.d'
import { getPlus, getRevenue, getConversion, getRoas, getDividedBy } from 'utils/num'

const filterTrendData = (range: string[]) => {
  const filteredData = TREND_DATE.report.daily.filter((data) => range.includes(data.date))

  return filteredData
}

const findTargetValue = (target: string, obj: IDaily) => {
  const targetObejct =
    {
      ROAS: obj.roas,
      광고비: obj.cost,
      노출수: obj.imp,
      클릭수: obj.click,
      전환수: getConversion(obj.click, obj.cvr),
      매출: getRevenue(obj.roas, obj.cost),
      클릭률: getDividedBy(obj.click, obj.imp),
      클릭당비용: getDividedBy(obj.cost, obj.click),
    }[target] ?? 0

  return targetObejct
}

const addValue = (date: string[], title: string) => {
  const filteredData = filterTrendData(date)
  const dataArray = filteredData.map((data) => findTargetValue(title, data))
  const totalValue = dataArray.reduce((prev, cur) => getPlus(prev, cur), 0)

  return totalValue
}

const getTotalRoas = (date: string[]) => {
  const totalRevenue = addValue(date, '매출')
  const totalCost = addValue(date, '광고비')

  return getRoas(totalRevenue, totalCost)
}

const getTotalCpc = (date: string[]) => {
  const totalCost = addValue(date, '광고비')
  const totalClick = addValue(date, '클릭수')

  return getDividedBy(totalCost, totalClick)
}

const getTotalValue = (date: string[], title: string) => {
  if (title === 'ROAS') return getTotalRoas(date)
  if (title === '클릭당비용') return getTotalCpc(date)

  return addValue(date, title)
}

const getCardValueString = (value: number, title: string) => {
  if (title === 'ROAS') return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}%`
  if (title === '광고비') return `${(value / 10_000).toLocaleString('en-US', { maximumFractionDigits: 0 })}만 원`
  if (title === '노출수') return `${(value / 10_000).toLocaleString('en-US', { maximumFractionDigits: 0 })}만 회`
  if (title === '매출') return `${(value / 100_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })}억 원`

  return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}회`
}

const getTableValueString = (value: number, title: string) => {
  if (title === 'ROAS') return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}%`
  if (title === '노출수') return value.toLocaleString()
  if (title === '클릭수') return value.toLocaleString()
  if (title === '클릭률') return `${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
  if (title === '클릭당비용') return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}원`

  return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}원`
}

export { getTotalValue, getCardValueString, getTableValueString }
