import BigNumber from 'bignumber.js'

import Chart from 'components/Chart'
import styles from './dashboard.module.scss'
import { getMultiplyDivide } from 'utils/num'

import CHANNEL_DATA from 'assets/data/channelData.json'

// const tickFormat = ['광고비', '매출', 'ROAS', '노출수', '클릭 수', '클릭률 (CTR)', '클릭당비용 (CPC)']

const dataStructure = [
  { value: 0, category: '광고비' },
  { value: 0, category: '매출' },
  { value: 0, category: 'ROAS' },
  { value: 0, category: '노출수' },
  { value: 0, category: '클릭수' },
  { value: 0, category: '클릭률 (CTR)' },
  { value: 0, category: '클릭당비용 (CPC)' },
  { value: 0, category: '전환수' },
]

const getJson = () => {
  const data: Record<string, { value: number; category: string }[]> = {
    google: [...dataStructure],
    facebook: [...dataStructure],
    naver: [...dataStructure],
    kakao: [...dataStructure],
  }

  CHANNEL_DATA.forEach((d) => {
    data[d.channel].find((item) => item.category === '광고비')!.value += d.cost
    data[d.channel].find((item) => item.category === '매출')!.value += getMultiplyDivide(d.roas, d.cost, 100)

    data[d.channel].find((item) => item.category === 'ROAS')!.value += d.roas
    data[d.channel].find((item) => item.category === '노출수')!.value += d.imp
    data[d.channel].find((item) => item.category === '클릭수')!.value += d.ctr
    data[d.channel].find((item) => item.category === '클릭률 (CTR)')!.value += d.ctr
    data[d.channel].find((item) => item.category === '클릭당비용 (CPC)')!.value += d.cpa
    data[d.channel].find((item) => item.category === '전환수')!.value += getMultiplyDivide(d.click, d.cvr, 100)
  })

  return data
}

const tickFormat = ['광고비', '매출', 'ROAS', '노출수', '클릭 수', '클릭률 (CTR)', '클릭당비용 (CPC)']

const { google, facebook, naver, kakao } = getJson()

const Dashboard = () => {
  return (
    <div className={styles.boardContainer}>
      <h3 className={styles.subTitle}>매체현황</h3>
      <div className={styles.container}>
        <Chart />
        CHANNEL_DATA
        <table>
          <thead>
            <tr>
              <th>광고비</th>
              <th>매출</th>
              <th>ROAS</th>
              <th>노출수</th>
              <th>클릭수</th>
              <th>클릭률 (CTR)</th>
              <th>클릭당비용 (CPC)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>페이스북</td>
              {facebook.map((item, idx) => (
                <td key={idx}>{item.value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
