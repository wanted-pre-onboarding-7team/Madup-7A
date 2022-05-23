import styles from './adsManage.module.scss'

interface IProps {
  data: {
    id: number
    title: string
    budget: string
    status: string
    startDate: string
    cost: string
    convValue: string
    roas: string
  }
}

const AdsCard = ({ data }: IProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.contentBox}>
        <div className={styles.contentTitle}>
          <p>{data.title}</p>
        </div>
        <ul className={styles.contentBody}>
          <li>
            <p>상태</p>
            <p>{data.status}</p>
          </li>
          <li>
            <p>광고 생성 일</p>
            <p>{data.startDate}</p>
          </li>
          <li>
            <p>일 희망 예산</p>
            <p>{data.budget}</p>
          </li>
          <li>
            <p>광고 수익률</p>
            <p>{data.budget}</p>
          </li>
          <li>
            <p>매출</p>
            <p>{data.convValue}</p>
          </li>
          <li>
            <p>광고 비용</p>
            <p>{data.cost}</p>
          </li>
        </ul>
        <button type='button' className={`${styles.buttonCommon} ${styles.updateButton}`}>
          수정하기
        </button>
      </div>
    </div>
  )
}

export default AdsCard
