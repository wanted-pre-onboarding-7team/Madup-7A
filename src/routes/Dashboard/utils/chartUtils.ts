import dayjs from 'dayjs'

import { IDaily, IChart, IMenu } from 'types/trend'
import { getPlus, Num } from 'utils/num'

const getDays = ([startDate, stopDate]: string[]): string[] => {
  let currentDate = dayjs(startDate)
  const lastDate = dayjs(stopDate)
  const dateArray = []

  while (currentDate <= lastDate) {
    dateArray.push(dayjs(currentDate).format('YYYY-MM-DD'))
    currentDate = dayjs(currentDate).add(1, 'days')
  }

  return dateArray
}

const getDates = ([startDate, stopDate]: string[]): dayjs.Dayjs[] => {
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

const getChartData = (selectedDate: any[], rowChartData: IDaily[], target: string) => {
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

const getChangeText = (value: number, type: string) => {
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

const isMenu = (element: IMenu, value: string) => {
  if (element.value === value) return false

  return true
}

const sumChartY = (obj: IChart[]) => {
  if (obj.length === 0) return -9999

  const sum = obj
    .map((item) => {
      return item.y
    })
    .reduce((prev, cur) => getPlus(prev, cur), 0)

  return sum
}

export { getDays, getDates, getChartData, getChangeText, isMenu, sumChartY }
