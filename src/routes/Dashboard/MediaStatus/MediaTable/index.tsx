import styles from './mediaTable.module.scss'

import CHANNEL_DATA from 'assets/data/channelData.json'

import { channelGroupBy, getTotalRevenue, valueGroupBy } from './groupBy'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { dateRangeState } from 'routes/Dashboard/states'
import { getDays, getTotalValue, getValueString } from 'routes/Dashboard/MediaStatus/MediaTable/cardUtils'
import { getRoas } from 'utils/num'

const dataStructure = [
  { foot: '광고비', head: '광고비' },
  { foot: '매출', head: '매출' },
  { foot: 'ROAS', head: 'ROAS' },
  { foot: '노출수', head: '노출수' },
  { foot: '클릭수', head: '클릭수' },
  { foot: '클릭률', head: '클릭률 (CTR)' },
  { foot: '클릭당비용', head: '클릭당비용 (CPC)' },
]

const filterData = (range: string[]) => {
  const filteredData = CHANNEL_DATA.filter(
    (item) =>
      new Date(item.date).getTime() >= new Date(range[0]).getTime() &&
      new Date(item.date).getTime() <= new Date(range[1]).getTime()
  )

  return filteredData
}

const MediaTable = () => {
  const date = useRecoilValue(dateRangeState)

  const dateRange = getDays(date)

  const filteredData = filterData(date)
  const channelGroup = channelGroupBy(filteredData, 'channel')

  const tableTitle = useMemo(() => {
    return dataStructure.map(({ head }) => (
      <th key={head} className={styles.tableHead}>
        {head}
      </th>
    ))
  }, [])

  const tableBody = useMemo(
    () =>
      Object.keys(channelGroup).map((media) => {
        return valueGroupBy(channelGroup[media])
      }),
    [channelGroup]
  )

  const tableFooter = useMemo(() => {
    return dataStructure.map(({ foot }) => (
      <td key={`foot-${foot}`}>{getValueString(getTotalValue(dateRange, foot), foot)}</td>
    ))
  }, [dateRange])

  // todo: any 타입지정해야함
  const channel: any = { facebook: '페이스북', naver: '네이버', google: '구글', kakao: '카카오' }

  return (
    <>
      <h3 className={styles.subTitle}>매체현황</h3>
      <div className={styles.boardContainer}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{null}</th>
                {tableTitle}
              </tr>
            </thead>
            <tbody>
              {tableBody.map((item, idx) => {
                const revenue = getTotalRevenue(channelGroup, item.channel)
                const roas = getRoas(revenue, item.cost)
                const key = `key-${idx}`
                return (
                  <tr key={key}>
                    <td>{channel[item.channel]}</td>
                    <td>{`${item.cost.toLocaleString()}원`}</td>
                    <td>{`${revenue.toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}원`}</td>
                    <td>{`${roas.toLocaleString('en-US', { maximumFractionDigits: 0 })}%`}</td>
                    <td>{item.imp.toLocaleString()}</td>
                    <td>{item.click.toLocaleString()}</td>
                    <td>{`${item.ctr.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`}</td>
                    <td>{`${item.cpc.toLocaleString('en-US', { maximumFractionDigits: 0 })}원`}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className={styles.tableFoot}>
              <tr>
                <td>총계</td>
                {tableFooter}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

export default MediaTable
