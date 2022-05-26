import CHANNEL_DATA from 'assets/data/channelData.json'
import { IMedia } from 'types/media'
import { getDividedBy, getPlus, getRevenue } from 'utils/num'

const filterChannelData = (range: string[]) => {
  const filteredData = CHANNEL_DATA.filter(
    (item) =>
      new Date(item.date).getTime() >= new Date(range[0]).getTime() &&
      new Date(item.date).getTime() <= new Date(range[1]).getTime()
  )

  return filteredData
}

const findChannel = (channel: string) => {
  const targetChannel = {
    facebook: '페이스북',
    naver: '네이버',
    google: '구글',
    kakao: '카카오',
  }[channel]

  return targetChannel
}

const channelGroupBy = (date: string[], property: keyof IMedia) => {
  const filteredData = filterChannelData(date)
  return filteredData.reduce<Record<string, IMedia[]>>((acc, cur) => {
    const key = cur[property]

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(cur)

    return acc
  }, {})
}

const valueGroupBy = (objectArray: IMedia[]) => {
  const media = {
    channel: '',
    imp: 0,
    click: 0,
    cost: 0,
    ctr: 0,
    cvr: 0,
    cpc: 0,
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

  return media2
}

const getTotalRevenue = (filterdArray: Record<string, IMedia[]>, property: string) => {
  const revenueArray = filterdArray[property].map((data) => getRevenue(data.roas, data.cost))
  const totalValue = revenueArray.reduce((prev, cur) => getPlus(prev, cur), 0)

  return totalValue
}

export { filterChannelData, findChannel, channelGroupBy, valueGroupBy, getTotalRevenue }
