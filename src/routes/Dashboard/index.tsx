import styles from './dashboard.module.scss'

import MediaTable from './MediaStatus/MediaTable'
import TotalAdsChart from './IntegratedAdsChart'
import DataCard from './DataCard'
import DateInput from './DateInput'

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
        <TotalAdsChart />
      </section>
      <h2 className={styles.subTitle}>매체현황</h2>
      <section className={styles.mediaStatus}>
        <MediaTable />
      </section>
    </>
  )
}

export default Dashboard
