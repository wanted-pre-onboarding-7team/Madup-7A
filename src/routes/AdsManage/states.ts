import { atom, selector } from 'recoil'

import AD_LIST_DATA from 'assets/data/adList.json'
import adDataSetting from './utils/adDataSetting'

const ADS_DATA = adDataSetting(AD_LIST_DATA.ads)

export const adDataList = atom({
  key: '#adDataList',
  default: ADS_DATA,
})

export const adStatusFilter = atom({
  key: '#adStatusFilter',
  default: '전체 광고',
})

export const filteredAdListState = selector({
  key: '#filteredAdListState',
  get: ({ get }) => {
    const adList = get(adDataList)
    const adStatus = get(adStatusFilter)

    if (adStatus === '전체 광고') {
      return adList
    }

    return adList.filter((item) => item.status === adStatus)
  },
})
