import styles from './adsManage.module.scss'

const AdsCard = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.contentBox}>
        <div className={styles.contentTitle}>
          <p>제목이 들어갑니다</p>
        </div>
        <ul className={styles.contentBody}>
          <li>
            <p>상태</p>
            <p>진행중</p>
          </li>
          <li>
            <p>광고 생성 일</p>
            <p>2021-06-04</p>
          </li>
          <li>
            <p>일 희망 예산</p>
            <p>40만원</p>
          </li>
          <li>
            <p>광고 수익률</p>
            <p>694%</p>
          </li>
          <li>
            <p>매출</p>
            <p>26,071만원</p>
          </li>
          <li>
            <p>광고 비용</p>
            <p>3,759만원</p>
          </li>
        </ul>
        <button type='button' className={styles.updateButton}>
          수정하기
        </button>
      </div>
    </div>
  )
}

export default AdsCard
