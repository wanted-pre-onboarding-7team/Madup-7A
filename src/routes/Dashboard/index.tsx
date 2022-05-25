import styles from './dashboard.module.scss'
import MediaTable from './MediaStatus/MediaTable'

import Title from './Title'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Title />

      <MediaTable />
    </div>
  )
}

export default Dashboard
