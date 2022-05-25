import { atom } from 'recoil'

export const dateRangeState = atom<string[]>({
  key: '#dateRangeState',
  default: ['2022-04-14', '2022-04-20'],
})

export const firstFilterState = atom<string>({
  key: '#firstFilterState',
  default: 'click',
})
export const sencondFilterState = atom<string>({
  key: '#sencondFilterState',
  default: 'ctr',
})

export const dateFilterState = atom<string>({
  key: '#dateFilterState',
  default: 'day',
})
