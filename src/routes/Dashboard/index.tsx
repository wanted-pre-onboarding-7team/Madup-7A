import styles from './dashboard.module.scss'
import TotalAdsChart from './totalAdsChart'

import Title from './Title'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <section>
        <Title />
        <div className={styles.adsContainer}>
          <TotalAdsChart />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
