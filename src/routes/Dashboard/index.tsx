import styles from './dashboard.module.scss'
import { TotalAdsChart } from './totalAdsChart'
import CHANNEL_DATA from '../../assets/data/wanted_FE_trend-data-set.json'

const Dashboard = () => {
  console.log('CHANNEL_DATA:', CHANNEL_DATA)
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
