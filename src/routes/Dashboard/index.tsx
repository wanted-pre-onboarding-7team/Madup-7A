import styles from './dashboard.module.scss'

import DataCard from './DataCard'
import DateInput from './DateInput'
import IntegratedAdsChart from './IntegratedAdsChart'
import MediaChart from './MediaStatus/MediaChart'
import MediaTable from './MediaStatus/MediaTable'

const DATA_CARD_TITLE = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출']

const Dashboard = () => {
  return (
    <>
      <div className={styles.title}>
        <h1>대시보드</h1>
        <DateInput />
      </div>
      <h2 className={styles.subTitle}>통합 광고 현황</h2>
      <section className={styles.totalAds}>
        <ul className={styles.dataCards}>
          {DATA_CARD_TITLE.map((title) => (
            <DataCard key={`data-card-${title}`} title={title} />
          ))}
        </ul>
        <IntegratedAdsChart />
      </section>
      <div className={styles.container}>
        <h2 className={styles.subTitle}>매체현황</h2>
        <MediaChart />
        <MediaTable />
      </div>
    </>
  )
}

export default Dashboard
