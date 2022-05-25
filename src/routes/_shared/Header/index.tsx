import { AlarmIcon, ProfileIcon, SettingIcon } from 'assets/svgs'
import styles from './header.module.scss'

const Header = () => {
  return (
    <ul className={styles.header}>
      <li className={styles.alarmIcon}>
        <AlarmIcon />
        <sup />
      </li>
      <li>
        <SettingIcon />
      </li>
      <li>
        <ProfileIcon />
      </li>
      <li>원티드님</li>
    </ul>
  )
}

export default Header
