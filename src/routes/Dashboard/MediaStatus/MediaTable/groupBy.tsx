import { IMedia } from 'types/media'

interface Props {
  value: number
  category: string
}

type Channel = 'google' | 'facebook' | 'naver' | 'kakao'

// interface ChannelList {
//   [key: Channel]: IMedia[]
// }

interface ChannelList {
  [key: string]: IMedia[]
}

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

export const keyGroupBy = (objectArray: ChannelList[], property: keyof IMedia) => {
  return objectArray.reduce<Record<string, string>>((acc, cur) => {
    console.log(acc)
    return acc
  }, {})
}
