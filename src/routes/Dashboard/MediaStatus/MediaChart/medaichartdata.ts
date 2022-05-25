import { cloneDeep } from 'lodash'
import { useRecoilValue } from 'recoil'
import { filterData } from '../MediaTable/cardUtils'
import { dateRangeState } from 'routes/Dashboard/states'
import { channelGroupBy, getTotalRevenue, valueGroupBy } from '../MediaTable/groupBy'

const MediaChartData = () => {
  const date = useRecoilValue(dateRangeState)
  const filteredData = filterData(date)
  const inclusionDate = filteredData

  const dataStructure = [
    { value: 0, category: '매출', percent: 25 },
    { value: 0, category: '광고비', percent: 25 },
    { value: 0, category: '노출수', percent: 25 },
    { value: 0, category: '클릭수', percent: 25 },
    { value: 0, category: '전환수', percent: 25 },
  ]
  const channelGroup = channelGroupBy(filteredData, 'channel')
  const valueGroup = Object.keys(channelGroup).map((media) => valueGroupBy(channelGroup[media]))

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
      data[channel].find(({ category }) => category === '전환수')!.value += cvr
    })

    mediaNames.forEach((name) => {
      data[name].forEach((item, idx) => {
        // item.percent = (data[name][idx].value / totalData[idx].value) * 100
      })
    })

    return data
  }

  return getChartData()
}

export default MediaChartData
