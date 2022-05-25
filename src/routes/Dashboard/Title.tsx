import styles from './dashboard.module.scss'
import DateInput from './DateInput'

const Title = () => {
  return (
    <div className={styles.title}>
      <h1>대시보드</h1>
      <DateInput />
    </div>
  )
}

export default Title
