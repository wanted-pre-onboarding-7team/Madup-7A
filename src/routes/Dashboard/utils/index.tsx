import dayjs from 'dayjs'
import { IDaily, IChart } from 'types/trend'

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

const findTargetValue = (target: string, obj: IDaily) => {
  const targetObejct =
    {
      imp: obj.imp,
      click: obj.click,
      cost: obj.cost,
      conv: obj.conv,
      conValue: obj.convValue,
      ctr: obj.ctr,
      cvr: obj.cvr,
      cpc: obj.cpc,
      cpa: obj.cpa,
      roas: obj.roas,
    }[target] ?? 0

  // switch (target) {
  //   case 'imp':
  //     return obj.imp
  //   case 'click':
  //     return obj.click
  //   case 'cost':
  //     return obj.cost
  //   case 'conv':
  //     return obj.conv
  //   case 'convValue':
  //     return obj.convValue
  //   case 'ctr':
  //     return obj.ctr
  //   case 'cvr':
  //     return obj.cvr
  //   case 'cpc':
  //     return obj.cpc
  //   case 'cpa':
  //     return obj.cpa
  //   case 'roas':
  //     return obj.roas
  //   default:
  //     return 0
  // }

  return targetObejct
}

export const getChartData = (selectedDate: any[], rowChartData: IDaily[], target: string) => {
  const data: IChart[] = []
  selectedDate.forEach((date) => {
    rowChartData.some((obj) => {
      if (obj.date === date) {
        const value = findTargetValue(target, obj)
        data.push({ x: dayjs(date).format('YYYY-MM-DD'), y: value })
      }
      return obj.date === date
    })
  })
  return data
}
