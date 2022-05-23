import { NavLink } from 'react-router-dom'
import { cx } from 'styles'
import styles from './gnb.module.scss'

import { DashBoardIcon, GraphIcon, Logo, GuideIcon, ArrowButton } from 'assets/svgs'

const GNB = () => {
  return (
    <div className={styles.gnb}>
      <Logo className={styles.logo} />
      <span className={styles.title}>서비스</span>
      <div className={styles.dropdown}>
        <div className={styles.categoryWarpper}>
          <div className={styles.textContainer}>
            <input className={styles.text} value='매드업' readOnly />
            <button type='button'>
              <ArrowButton />
            </button>
          </div>
        </div>
        <div>
          <ul>
            <li>매드업</li>
            <li>서비스 추가하기</li>
          </ul>
        </div>
      </div>
      <span className={styles.title}>광고 센터</span>
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink to='' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              <DashBoardIcon className={styles.navIcon} />
              대시보드
            </NavLink>
          </li>
          <li>
            <NavLink to='ads/manage' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              <GraphIcon className={styles.navIcon} />
              광고관리
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.gnbGuide}>
        <div className={styles.guideContainer}>
          <GuideIcon />
          <div className={styles.guideText}>
            <h1>레버 이용 가이드</h1>
            <div className={styles.guideSubtext}>시작하기 전에 알아보기</div>
          </div>
        </div>
      </div>
      <div className={styles.gnbFooter}>
        <div>레버는 함께 만들어갑니다.</div>
        <div className={styles.underlineText}>이용약관</div>
      </div>
    </div>
  )
}

export default GNB
