import styles from './dashboard.module.scss'
import TotalAdsChart from './totalAdsChart'
import TREND_DATA from '../../assets/data/wanted_FE_trend-data-set.json'
import { IDaily } from 'types/trend'
import { getChartData, getDays } from './utils'
import BigNumber from 'bignumber.js'

const Dashboard = () => {
  const rowChartData: IDaily[] = TREND_DATA.report.daily
  const selectedDate = getDays(['2022-02-01', '2022-03-07'])
  const chartValue = getChartData(selectedDate, rowChartData, 'imp')
  const chartValue2 = getChartData(selectedDate, rowChartData, 'ctr')

  return (
    <div className={styles.container}>
      <section>
        <h1> 통합 광고 현황</h1>
        <div className={styles.adsContainer}>
          <TotalAdsChart />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
