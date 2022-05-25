import { atom, selector } from 'recoil'

import adListJson from 'assets/data/adList.json'
import adDataSetting from 'routes/AdsManage/utils/adDataSetting'

const ADS_DATA = adDataSetting(adListJson.ads)

export const adDataList = atom({
  key: 'adDataList',
  default: ADS_DATA,
})

export const adStatusFilter = atom({
  key: 'adStatusFilter',
  default: '전체 광고',
})

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const adList = get(adDataList)
    const adStatus = get(adStatusFilter)

    if (adStatus === '전체 광고') {
      return adList
    }

    return adList.filter((item) => item.status === adStatus)
  },
})
