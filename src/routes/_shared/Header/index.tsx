import { AlarmIcon, ProfileIcon, SettingIcon } from 'assets/svgs'
import styles from './header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <AlarmIcon />
      <SettingIcon />
      <ProfileIcon />
      <span>원티드님</span>
    </div>
  )
}

export default Header
