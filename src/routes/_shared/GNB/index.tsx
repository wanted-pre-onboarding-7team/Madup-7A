import styles from './gnb.module.scss'

import { GuideIcon, Logo } from 'assets/svgs'
import Dropdown from 'components/Dropdown'
import Navigator from './Navigator'

const LIST = ['매드업', '서비스 추가하기']
const DROPDOWN_STYLE = { padding: '20px', height: '44px' }

const GNB = () => {
  return (
    <div className={styles.gnb}>
      <Logo className={styles.logo} />
      <div className={styles.underline} />
      <div className={styles.wrapper}>
        <span className={styles.title}>서비스</span>
        <Dropdown list={LIST} style={DROPDOWN_STYLE} />
      </div>
      <div className={styles.wrapper}>
        <span className={styles.title}>광고 센터</span>
        <Navigator />
      </div>
      <button type='button' className={styles.guide}>
        <GuideIcon />
        <div className={styles.guideDesc}>
          <span>레버 이용 가이드</span>
          <span>시작하기 전에 알아보기</span>
        </div>
      </button>
      <footer>
        <span>레버는 함께 만들어갑니다.</span>
        <span>이용약관</span>
      </footer>
    </div>
  )
}

export default GNB
