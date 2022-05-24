import { atom } from 'recoil'

export const dateRangeState = atom<string[]>({
  key: '#dateRangeState',
  default: ['2022-04-14', '2022-04-20'],
})
