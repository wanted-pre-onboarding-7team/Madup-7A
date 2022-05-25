export interface IRootObject {
  count: number
  ads: IAd[]
}

export interface IAd {
  id: number
  adType: string
  title: string
  budget: number
  status: string
  startDate: string
  endDate: string | null
  report: IReport
}

export interface IReport {
  cost: number
  convValue: number
  roas: number
}
