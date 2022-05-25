import { atom, selector } from 'recoil'
import { IChart } from 'types/trend'

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
  default: '일간',
})

// export const firstChartDataState = atom<IChart[] | []>({
//   key: '#firstChartDataState',
//   default: [],
// })

// export const secondChartDataState = atom<IChart[] | []>({
//   key: '#secondChartDataState',
//   default: [],
// })

// export const totalChartDataState = selector({
//   key: '#totalChartDataState',
//   get: ({ get }) => {
//     const firstChartValue = get(firstChartDataState)
//     const secondChartValue = get(secondChartDataState)

//     return [firstChartValue, secondChartValue]
//   },
// })
