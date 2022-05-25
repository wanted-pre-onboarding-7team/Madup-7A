import BigNumber from 'bignumber.js'

import Chart from 'components/Chart'
import styles from './mediaTable.module.scss'
import { getMultiplyDivide } from 'utils/num'

import CHANNEL_DATA from 'assets/data/channelData.json'
import { IMedia } from 'types/media'

import { keyGroupBy, channelGroupBy } from './groupBy'
import { useMemo } from 'react'
// const tickFormat = ['광고비', '매출', 'ROAS', '노출수', '클릭 수', '클릭률 (CTR)', '클릭당비용 (CPC)']

const dataStructure = [
  { category: '광고비' },
  { category: '매출' },
  { category: 'ROAS' },
  { category: '노출수' },
  { category: '클릭수' },
  { category: '클릭률 (CTR)' },
  { category: '클릭당비용 (CPC)' },
]

const channelGroup = channelGroupBy(CHANNEL_DATA, 'channel')
// console.log(channelGroup.kakao)

// const resultCost = channelGroup.kakao.reduce((r, a) => {
//   return r + a.cost
// }, 0)

const filterData = (range: string[]) => {
  const filteredData = CHANNEL_DATA.filter((data) => range.includes(data.date))

  return filteredData
}

const MediaTable = () => {
  const tableTitle = useMemo(() => {
    return dataStructure.map(({ category }) => (
      <th key={category} className={styles.tableHead}>
        {category}
      </th>
    ))
  }, [])

  const tableBody = useMemo(() => {
    return channelGroup.kakao.map((itemList) => {
      const { channel, click, cost, cpc, ctr, imp, roas } = itemList as IMedia

      return click
    })
  }, [channelGroup])

  console.log(tableBody)

  //   const tableFooter = useMemo(() => {

  //   },[])

  return (
    <div className={styles.boardContainer}>
      <h3 className={styles.subTitle}>매체현황</h3>
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>{null}</th>
              {tableTitle}
            </tr>
          </thead>
          <tbody />
          <tfoot>
            <tr>
              <td>총계</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default MediaTable
