import styles from './adCard.module.scss'

import Button from 'components/Button'

interface Props {
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

const AdCard = ({ data }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.contentBox}>
        <div className={styles.contentTitle}>
          <p>{data.title}</p>
        </div>
        <dl className={styles.contentBody}>
          <div>
            <dt>상태</dt>
            <dd>{data.status}</dd>
          </div>
          <div>
            <dt>광고 생성 일</dt>
            <dd>{data.startDate}</dd>
          </div>
          <div>
            <dt>일 희망 예산</dt>
            <dd>{data.budget}</dd>
          </div>
          <div>
            <dt>광고 수익률</dt>
            <dd>{data.budget}</dd>
          </div>
          <div>
            <dt>매출</dt>
            <dd>{data.convValue}</dd>
          </div>
          <div>
            <dt>광고 비용</dt>
            <dd>{data.cost}</dd>
          </div>
        </dl>
      </div>
      <Button size='small'>수정하기</Button>
    </div>
  )
}

export default AdCard
