import { useRecoilValue } from 'recoil'
import { cloneDeep } from 'lodash'

import { dateRangeState } from '../../states'
import { filterChannelData, channelGroupBy, getTotalRevenue } from '../../utils/tableUtils'
import { getConversion, getDividedBy } from 'utils/num'

const MediaChartData = () => {
  const date = useRecoilValue(dateRangeState)
  const filteredData = filterChannelData(date)
  const inclusionDate = filteredData

  const dataStructure = [
    { value: 0, category: '매출', percent: 0 },
    { value: 0, category: '광고비', percent: 0 },
    { value: 0, category: '노출수', percent: 0 },
    { value: 0, category: '클릭수', percent: 0 },
    { value: 0, category: '전환수', percent: 0 },
  ]
  const channelGroup = channelGroupBy(date, 'channel')

  const totalGoogle = cloneDeep(dataStructure)
  const totalFacebook = cloneDeep(dataStructure)
  const totalNaver = cloneDeep(dataStructure)
  const totalKakao = cloneDeep(dataStructure)

  const getChartData = () => {
    const data: Record<string, { value: number; category: string }[]> = {
      google: [...totalGoogle],
      facebook: [...totalFacebook],
      naver: [...totalNaver],
      kakao: [...totalKakao],
    }

    const mediaNames = ['google', 'facebook', 'naver', 'kakao']

    mediaNames.forEach((name) => {
      data[name] = cloneDeep(dataStructure)
    })

    const totalData = cloneDeep(dataStructure)

    inclusionDate.forEach(({ channel, cost, imp, click, cvr }) => {
      data[channel].find(({ category }) => category === '매출')!.value = getTotalRevenue(channelGroup, channel)
      data[channel].find(({ category }) => category === '광고비')!.value += cost
      data[channel].find(({ category }) => category === '노출수')!.value += imp
      data[channel].find(({ category }) => category === '클릭수')!.value += click
      data[channel].find(({ category }) => category === '전환수')!.value += getConversion(click, cvr)
    })

    mediaNames.forEach((name) => {
      totalData.forEach((datas) => {
        datas.value += data[name].find((item) => item.category === datas.category)!.value
      })
    })

    mediaNames.forEach((name) => {
      data[name].forEach((item, idx) => {
        Object.assign(item, { percent: getDividedBy(data[name][idx].value, totalData[idx].value) * 100 })
      })
    })

    return data
  }

  return getChartData()
}

export default MediaChartData
