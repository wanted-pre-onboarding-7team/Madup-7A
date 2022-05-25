import { IMedia } from 'types/media'
import { getDividedBy, getPlus, getRevenue } from 'utils/num'

export const channelGroupBy = (objectArray: IMedia[], property: keyof IMedia) => {
  return objectArray.reduce<Record<string, IMedia[]>>((acc, cur) => {
    const key = cur[property]
    if (!key) return acc

    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(cur)
    return acc
  }, {})
}

export const valueGroupBy = (objectArray: IMedia[]) => {
  const media = {
    channel: '',
    imp: 0,
    click: 0,
    cost: 0,
    convValue: 0,
    ctr: 0,
    cvr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
    revenue: 0,
  }

  const media2 = objectArray.reduce((acc, item) => {
    const { channel, click, cost, imp, roas } = item
    acc.cost += cost
    acc.click += click
    acc.imp += imp
    acc.roas += roas
    acc.channel = channel
    // acc.revenue += getRevenue(roas, cost)

    return acc
  }, media)

  media2.ctr = getDividedBy(media2.click, media2.imp)
  media2.cpc = getDividedBy(media2.cost, media2.click)
  // media2.roas = getRoas(media2.revenue, media2.cost)

  return media2
}

export const getTotalRevenue = (filterdArray: Record<string, IMedia[]>, property: string) => {
  const revenueArray = filterdArray[property].map((data) => getRevenue(data.roas, data.cost))
  const totalValue = revenueArray.reduce((prev, cur) => getPlus(prev, cur), 0)

  return totalValue
}
