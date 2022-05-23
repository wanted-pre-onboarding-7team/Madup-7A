import { NavLink } from 'react-router-dom'
import { cx } from 'styles'
import styles from './gnb.module.scss'

import { DashBoardIcon, GraphIcon } from 'assets/svgs'

const Navigator = () => {
  return (
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
  )
}

export default Navigator
