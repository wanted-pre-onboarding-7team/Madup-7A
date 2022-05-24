import styles from './adsManage.module.scss'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { filteredTodoListState, adStatusFilter } from 'state/adList'

import AdsCard from './AdsCard'
import Dropdown from 'components/Dropdown'

const LIST = [
  {
    id: '1',
    text: '전체 광고',
  },
  {
    id: '2',
    text: '진행중',
  },
  {
    id: '3',
    text: '중단됨',
  },
]

const AdsManage = () => {
  const AD_DATA_LIST = useRecoilValue(filteredTodoListState)
  const setAdStatus = useSetRecoilState(adStatusFilter)

  const handleStatusClick = (item: string) => {
    if (item === '전체 광고' || item === '진행중' || item === '중단됨') {
      setAdStatus(item)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>광고관리</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.cardsHeader}>
          <div className={styles.dropdownBox}>
            <Dropdown list={LIST} size='small' onClick={handleStatusClick} />
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
