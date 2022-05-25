import styles from './dashboard.module.scss'

import { ArrowIcon } from 'assets/svgs'

// ROAS = roas
// 광고비 = cost
// 노출 수 = imp
// 클릭 수 = click
// 전환수 = click * cvr / 100 (&& 소수점 첫째 자리에서 반올림)
// 매출액 = roas * cost /  100

// 범위 안의 날짜배열 만들기 => map을 해서 array.length만큼 날짜 빼기 (비교 날짜)
// 범위 내 각 데이터를 배열로 만들기
// reduce를 활용해 더한 값을 가져온다

const DataCard = () => {
  return (
    <li className={styles.dataCard}>
      <dl>
        <dt>ddd</dt>
        <dd>addd</dd>
      </dl>
      <div className={styles.comparison}>
        <ArrowIcon />
        <span>asdfasdf</span>
      </div>
    </li>
  )
}

export default DataCard
