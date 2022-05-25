import styles from './loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.animationBox} ${styles.animation}`}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />
        <div className={`${styles.shape} ${styles.shape3}`} />
        <div className={`${styles.shape} ${styles.shape4}`} />
      </div>
    </div>
  )
}

export default Loader
