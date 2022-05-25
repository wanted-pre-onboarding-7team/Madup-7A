import dayjs from 'dayjs'

export interface IDaily {
  imp: number
  click: number
  cost: number
  conv: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
  date: string
}

export interface IChart {
  x: dayjs.Dayjs
  y: number
}
