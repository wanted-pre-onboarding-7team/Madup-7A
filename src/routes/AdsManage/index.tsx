import AdsCard from './AdsCard'
import styles from './adsManage.module.scss'

const AdsManage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>광고관리</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.cardsHeader}>
          <div className={styles.dropdown}>드롭다운</div>
          <button type='button' className={styles.createButton}>
            광고 만들기
          </button>
        </div>
        <div className={styles.cardsWrapper}>
          <AdsCard />
        </div>
      </div>
    </div>
  )
}

export default AdsManage
