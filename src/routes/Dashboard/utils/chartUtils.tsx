import dayjs from 'dayjs'
import { IDaily, IChart, menu } from 'types/trend'
import BigNumber from 'bignumber.js'
import { getPlus } from 'utils/num'

const Num = (n: string | number, b?: number | undefined): BigNumber => {
  if (typeof n === 'string') {
    return new BigNumber(n.replace(/,/g, ''), b)
  }

  return new BigNumber(n, b)
}

export const getDays = ([startDate, stopDate]: string[]): string[] => {
  const dateArray = []
  let currentDate = dayjs(startDate)
  const lastDate = dayjs(stopDate)
  while (currentDate <= lastDate) {
    dateArray.push(dayjs(currentDate).format('YYYY-MM-DD'))
    currentDate = dayjs(currentDate).add(1, 'days')
  }
  return dateArray
}

export const getDates = ([startDate, stopDate]: string[]): dayjs.Dayjs[] => {
  const dateArray = []

  if (stopDate === undefined) return [dayjs(stopDate)]

  let currentDate = dayjs(startDate)
  const lastDate = dayjs(stopDate)
  while (currentDate <= lastDate) {
    dateArray.push(dayjs(currentDate))
    currentDate = dayjs(currentDate).add(1, 'days')
  }
  return dateArray
}

const findTargetValue = (target: string, obj: IDaily) => {
  const targetObejct =
    {
      imp: obj.imp,
      click: obj.click,
      cost: obj.cost,
      conv: obj.conv,
      convValue: obj.convValue,
      ctr: obj.ctr,
      cvr: obj.cvr,
      cpc: obj.cpc,
      cpa: obj.cpa,
      roas: obj.roas,
    }[target] ?? 0

  return targetObejct
}

export const getChartData = (selectedDate: any[], rowChartData: IDaily[], target: string) => {
  const data: IChart[] = []
  if (target === 'none') return []
  selectedDate.forEach((date) => {
    rowChartData.some((obj) => {
      if (obj.date === date) {
        const value = findTargetValue(target, obj)
        data.push({ x: dayjs(date), y: value })
      }
      return obj.date === date
    })
  })
  return data
}

export const ChangeText = (value: number, type: string) => {
  const countType = ['click', 'conv', 'imp']
  const monenyType = ['convValue', 'cost', 'cpc', 'cpa']
  let reulst = ''
  if (countType.includes(type)) {
    reulst = `${Math.round(value).toLocaleString()}번`
  }
  if (monenyType.includes(type)) {
    reulst = `${Math.round(value).toLocaleString()}원`
  }
  if (type === 'cvr') {
    reulst = `${value.toFixed(1)}%`
  }
  if (type === 'roas') {
    reulst = `${Math.round(value)}%`
  }
  if (type === 'ctr') {
    reulst = `${Num(value).multipliedBy(10).toNumber().toFixed(1)}%`
  }

  return reulst
}

export const isMenu = (element: menu, value: string) => {
  if (element.value === value) return false
  return true
}

export const ChartYsum = (obj: IChart[]) => {
  const sum = obj
    .map((item) => {
      return item.y
    })
    .reduce((prev, cur) => getPlus(prev, cur), 0)

  return sum
}
