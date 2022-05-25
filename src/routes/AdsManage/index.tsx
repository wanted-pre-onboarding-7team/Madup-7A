import { useRecoilState, useRecoilValue } from 'recoil'
import styles from './adsManage.module.scss'

import { filteredAdListState, adStatusFilter } from './states'

import AdCard from './AdCard'
import Dropdown from 'components/Dropdown'
import Button from 'components/Button'

const LIST = [
  {
    id: '1',
    text: '전체 광고',
    value: '전체 광고',
  },
  {
    id: '2',
    text: '진행중',
    value: '진행중',
  },
  {
    id: '3',
    text: '중단됨',
    value: '중단됨',
  },
]

const AdsManage = () => {
  const adList = useRecoilValue(filteredAdListState)
  const [adStatus, setAdStatus] = useRecoilState(adStatusFilter)

  const handleStatusClick = (item: string) => {
    if (item === '전체 광고' || item === '진행중' || item === '중단됨') {
      setAdStatus(item)
    }
  }

  return (
    <>
      <h1 className={styles.title}>광고관리</h1>
      <section className={styles.cardsContainer}>
        <div className={styles.cardsHeader}>
          <div className={styles.dropdownBox}>
            <Dropdown list={LIST} size='small' onClick={handleStatusClick} initValue={adStatus} />
          </div>
          <Button size='large' primary>
            광고 만들기
          </Button>
        </div>
        <div className={styles.cardsWrapper}>
          {adList.map((data) => (
            <AdCard key={`ad-data-${data.id}`} data={data} />
          ))}
        </div>
      </section>
    </>
  )
}

export default AdsManage
