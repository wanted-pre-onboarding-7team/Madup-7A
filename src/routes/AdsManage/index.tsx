import styles from './adsManage.module.scss'

import { useRecoilValue } from 'recoil'
import { filteredTodoListState } from 'state/adList'

import AdsCard from './AdsCard'
import Dropdown from 'components/Dropdown'

const LIST = ['전체 광고', '진행중', '중단됨']
const DROPDOWN_STYLE = { padding: '12px 20px', width: '135px', height: '38px', fontSize: '14px' }

const AdsManage = () => {
  const AD_DATA_LIST = useRecoilValue(filteredTodoListState)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>광고관리</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.cardsHeader}>
          <div className={styles.dropdownBox}>
            <Dropdown list={LIST} style={DROPDOWN_STYLE} />
          </div>
          <button type='button' className={`${styles.buttonCommon} ${styles.createButton}`}>
            광고 만들기
          </button>
        </div>
        <div className={styles.cardsWrapper}>
          {AD_DATA_LIST.map((data) => (
            <AdsCard key={`ad-data-${data.id}`} data={data} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdsManage
