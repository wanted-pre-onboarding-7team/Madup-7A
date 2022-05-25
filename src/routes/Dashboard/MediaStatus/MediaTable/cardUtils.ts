import dayjs from 'dayjs'

import CHANNEL_DATA from 'assets/data/channelData.json'
import { IMedia } from 'types/media'

import { getPlus, getRevenue, getRoas, getDividedBy } from 'utils/num'

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
  const filteredData = CHANNEL_DATA.filter(
    (item) =>
      new Date(item.date).getTime() >= new Date(range[0]).getTime() &&
      new Date(item.date).getTime() <= new Date(range[1]).getTime()
  )
  return filteredData
}

const findTargetValue = (target: string, obj: IMedia) => {
  const targetObejct =
    {
      광고비: obj.cost,
      매출: getRevenue(obj.roas, obj.cost),
      ROAS: obj.roas,
      노출수: obj.imp,
      클릭수: obj.click,
      클릭률: getDividedBy(obj.click, obj.imp),
      클릭당비용: getDividedBy(obj.cost, obj.click),
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

const getValueString = (value: number, title: string) => {
  if (title === 'ROAS') return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}%`
  if (title === '노출수') return value.toLocaleString()
  if (title === '클릭수') return value.toLocaleString()
  if (title === '클릭률') return `${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
  if (title === '클릭당비용') return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}원`

  return `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}원`
}

export { getDays, getTotalValue, getValueString, filterData, findTargetValue }
