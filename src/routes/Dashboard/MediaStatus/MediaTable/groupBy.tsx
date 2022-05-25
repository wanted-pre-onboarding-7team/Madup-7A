import { IMedia } from 'types/media'
import { getDividedBy, getRevenue } from 'utils/num'

export const channelGroupBy = (objectArray: IMedia[], property: keyof IMedia) => {
  return objectArray.reduce<Record<string, IMedia[]>>((acc, cur) => {
    const key = cur[property]
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
    date: '',
    imp: 0,
    click: 0,
    cost: 0,
    convValue: 0,
    ctr: 0,
    cvr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
  }

  const media2 = objectArray.reduce((acc, item) => {
    const { channel, click, cost, imp, roas } = item
    acc.cost += cost
    acc.click += click
    acc.imp += imp
    acc.roas += roas
    acc.channel = channel

    return acc
  }, media)

  media2.ctr = getDividedBy(media2.click, media2.imp)
  media2.cpc = getDividedBy(media2.cost, media2.click)
  media2.roas = getRevenue(media2.roas, media2.cost)

  return media2
}
