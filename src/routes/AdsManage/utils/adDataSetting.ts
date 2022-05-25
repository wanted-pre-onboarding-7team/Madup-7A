import { IAd } from 'types/adList'
import dayjs from 'dayjs'

const titleSetting = (adType: string, startDate: string) => {
  if (adType === 'web') {
    const webTitle = `웹광고_${dayjs(startDate).format('YYYYMMDDHHmmss')}`
    return webTitle
  }
  const appTitle = `앱광고_${dayjs(startDate).format('YYYYMMDDHHmmss')}`
  return appTitle
}

const statusSetting = (status: string) => {
  if (status === 'active') {
    const activeStatus = '진행중'
    return activeStatus
  }
  const endedStatus = '중단됨'
  return endedStatus
}

const dateSetting = (status: string, startDate: string, endDate: string | null) => {
  if (status === 'active') {
    const activeData = dayjs(startDate).format('YYYY-MM-DD')
    return activeData
  }

  const endedDate = `${dayjs(startDate).format('YYYY-MM-DD')}(${dayjs(endDate).format('YYYY-MM-DD')})`
  return endedDate
}

const budgetSetting = (budget: number) => {
  if (budget > 100000) {
    if (budget % 10000 === 0) {
      const tenThousandUnits = `${Math.floor(budget / 10000)}만 `
      return tenThousandUnits
    }
    const tenThousandUnits = `${Math.floor(budget / 10000)}만 ${Math.floor((budget % 10000) / 1000)}천원`
    return tenThousandUnits
  }

  const thousandUnits = `${Math.floor(budget / 1000)}천원`
  return thousandUnits
}

const convAndCostSetting = (number: number) => {
  const tenThousandAndComma = `${Math.floor(number / 10000).toLocaleString('ko-kr')}만원`
  return tenThousandAndComma
}

const roasSetting = (roas: number) => {
  const percentage = `${roas}%`
  return percentage
}

const adDataSetting = (adData: IAd[]) => {
  const items = [...adData]

  const settingData = items.map(
    ({ id, adType, budget, status, startDate, endDate, report: { cost, convValue, roas } }) => ({
      id,
      title: titleSetting(adType, startDate),
      status: statusSetting(status),
      startDate: dateSetting(status, startDate, endDate),
      budget: budgetSetting(budget),
      roas: roasSetting(roas),
      convValue: convAndCostSetting(convValue),
      cost: convAndCostSetting(cost),
    })
  )
  return settingData
}

export default adDataSetting
