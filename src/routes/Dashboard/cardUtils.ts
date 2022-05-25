import dayjs from 'dayjs'

import TREND_DATE from 'assets/data/wanted_FE_trend-data-set.json'
import { IDaily } from 'types/trend.d'
import { getPlus, getRevenue, getConversion, getRoas } from 'utils/num'

const getDays = ([startDate, endDate]: string[]): string[] => {
  const dateArray = []
  let currentDate = dayjs(startDate)
  const lastDate = dayjs(endDate)
  while (currentDate <= lastDate) {
    dateArray.push(dayjs(currentDate).format('YYYY-MM-DD'))
    currentDate = dayjs(currentDate).add(1, 'days')
  }
  return dateArray
}

const filterData = (range: string[]) => {
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
    }[target] ?? 0

  return targetObejct
}

const addValue = (date: string[], title: string) => {
  // 데이터를 날짜에 맞는 데이터로 필터
  const filteredData = filterData(date)
  // 필요한 값에 대한 배열을 생성
  const dataArray = filteredData.map((datdd) => findTargetValue(title, datdd))
  // 값의 배열을 돌면서 합 [123, 333, 111, 2222]
  const totalValue = dataArray.reduce((prev, cur) => getPlus(prev, cur), 0)

  return totalValue
}

const getTotalRoas = (date: string[]) => {
  const totalRevenue = addValue(date, '매출')
  const totalCost = addValue(date, '광고비')

  return getRoas(totalRevenue, totalCost)
}

const getTotalValue = (date: string[], title: string) => {
  if (title === 'ROAS') return getTotalRoas(date)

  return addValue(date, title)
}

const getValueString = (value: number, title: string) => {
  if (title === 'ROAS') return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}%`
  if (title === '광고비') return `${(value / 10_000).toLocaleString('en-US', { maximumFractionDigits: 0 })}만 원`
  if (title === '노출수') return `${(value / 10_000).toLocaleString('en-US', { maximumFractionDigits: 0 })}만 회`
  if (title === '매출') return `${(value / 100_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })}억 원`

  return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}회`
}

export { getDays, getTotalValue, getValueString }
