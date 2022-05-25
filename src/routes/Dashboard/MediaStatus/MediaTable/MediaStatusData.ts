import CHANNEL_DATA from 'assets/data/channelData.json'
import { useRecoilValue } from 'recoil'

import { IMedia } from 'types/media'

const MediaStatusData = () => {
  const inclusionDate = CHANNEL_DATA

  const MediaTableData = () => {
    const sum: IMedia[] = Object.values(
      inclusionDate.reduce((acc: any, item) => {
        const { channel, click, convValue, cost, cpa, cpc, ctr, cvr, imp, roas } = item
        acc[channel] = acc[channel]
          ? {
              ...item,
              click: click + acc[channel].click,
              convValue: convValue + acc[channel].convValue,
              cost: cost + acc[channel].cost,
              cpa: cpa + acc[channel].cpa,
              cpc: cpc + acc[channel].cpc,
              ctr: ctr + acc[channel].ctr,
              cvr: cvr + acc[channel].cvr,
              imp: imp + acc[channel].imp,
              roas: roas + acc[channel].roas,
            }
          : item
        return acc
      }, [])
    )

    if (!sum) return null

    const total: IMedia = {
      channel: 'total',
      click: 0,
      convValue: 0,
      cost: 0,
      cpa: 0,
      cpc: 0,
      ctr: 0,
      cvr: 0,
      imp: 0,
      roas: 0,
      date: '',
    }

    sum.forEach((itemList) => {
      const { click, convValue, cost, cpa, cpc, ctr, cvr, imp, roas } = itemList as IMedia
      if (!total.channel) total.channel = 'total'

      total.click += click
      total.convValue += convValue
      total.cost += cost
      total.cpa += cpa
      total.cpc += cpc
      total.ctr += ctr
      total.cvr += cvr
      total.imp += imp
      total.roas += roas
    })

    return [...sum, total]
  }
}
export default MediaStatusData
