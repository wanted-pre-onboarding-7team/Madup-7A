import { atom, selector } from 'recoil'
import CHANNEL_DATA from 'assets/data/channelData.json'
import { IMedia } from 'types/media'

const category = ['광고비', '매출', 'ROAS', '노출수', '클릭 수', '클릭률 (CTR)', '클릭당비용 (CPC)']
// const mediaList = ['google', 'facebook', 'naver', 'kakao']

export const mediaState = atom<IMedia[]>({
  key: '#mediaState',
  default: [],
})

export const mediaChannel = atom<string>({
  key: '#mediaChannel',
  default: '',
})

// 채널별로 데이터만 가져올지 아니면 여기에서 계산까지 다 때려서 가져올지 고민해보자
export const filteredMediaState = selector({
  key: '#filteredMediaState',
  get: ({ get }) => {
    const media = get(mediaState)
    const channel = get(mediaChannel)

    return media.filter((item) => item.channel === channel)
  },
})
