import styles from './dashboard.module.scss'

import Title from './Title'
import DataCard from './DataCard'

const Dashboard = () => {
  return (
    <>
      <Title />
      <h2 className={styles.subTitle}>통합 광고 현황</h2>
      <div className={styles.container}>
        <ul className={styles.dataCards}>
          <DataCard />
          <DataCard />
          <DataCard />
          <DataCard />
          <DataCard />
          <DataCard />
        </ul>
      </div>
    </>
  )
}

export default Dashboard
