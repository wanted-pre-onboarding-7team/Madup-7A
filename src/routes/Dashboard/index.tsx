import styles from './dashboard.module.scss'
import TotalAdsChart from './TotalAdsChart'

import Title from './Title'
import DataCard from './DataCard'

const DATA_TITLES = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출']

const Dashboard = () => {
  return (
    <>
      <Title />
      <h2 className={styles.subTitle}>통합 광고 현황</h2>
      <div className={styles.container}>
        <ul className={styles.dataCards}>
          {DATA_TITLES.map((title) => (
            <DataCard key={title} title={title} />
          ))}
        </ul>
        <TotalAdsChart />
      </div>
    </>
  )
}

export default Dashboard
