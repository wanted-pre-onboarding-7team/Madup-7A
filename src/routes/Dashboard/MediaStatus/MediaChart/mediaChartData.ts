import { useRecoilValue } from 'recoil'
import { cloneDeep } from 'lodash'

import { dateRangeState } from '../../states'
import { channelGroupBy, getTotalRevenue, valueGroupBy } from '../../utils/tableUtils'
import { getPlus, getRevenue } from 'utils/num'

const dataStructure = [
  { value: 0, category: '매출', percent: 0 },
  { value: 0, category: '광고비', percent: 0 },
  { value: 0, category: '노출수', percent: 0 },
  { value: 0, category: '클릭수', percent: 0 },
  { value: 0, category: '전환수', percent: 0 },
]

const MediaChartData = () => {
  const date = useRecoilValue(dateRangeState)

  const channelGroup = channelGroupBy(date, 'channel')
  const valueGroup = Object.keys(channelGroup).map((media) => valueGroupBy(channelGroup[media]))

  console.log(valueGroup)

  const totalRevenue = () => {
    const arr = valueGroup.map((value) => getRevenue(value.roas, value.cost))
    const totalValue = arr.reduce((prev, cur) => getPlus(prev, cur), 0)

    return totalValue
  }

  const totalGoogle = cloneDeep(dataStructure)
  const totalFacebook = cloneDeep(dataStructure)
  const totalNaver = cloneDeep(dataStructure)
  const totalKakao = cloneDeep(dataStructure)

  console.log(totalGoogle)

  const getChartData = () => {
    const mediaNames = ['google', 'facebook', 'naver', 'kakao']
    const data: Record<string, { value: number; category: string }[]> = {
      google: [...totalGoogle],
      facebook: [...totalFacebook],
      naver: [...totalNaver],
      kakao: [...totalKakao],
    }

    console.log(data)

    return data
  }

  return getChartData()
}

export default MediaChartData

//ROAS: obj.roas,
//광고비: obj.cost,
//노출수: obj.imp,
//클릭수: obj.click,
//전환수: getConversion(obj.click, obj.cvr),
//매출: getRevenue(obj.roas, obj.cost),
//클릭률: getDividedBy(obj.click, obj.imp),
//클릭당비용: getDividedBy(obj.cost, obj.click),
