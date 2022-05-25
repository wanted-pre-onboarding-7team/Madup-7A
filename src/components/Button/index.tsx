import { ReactNode } from 'react'
import cx from 'classnames'

import styles from './button.module.scss'

interface Props {
  children: ReactNode
  size: 'large' | 'small'
  primary?: boolean
  onClick?: () => void
}

const Button = ({ children, size, primary, onClick }: Props) => {
  return (
    <button type='button' className={cx(styles.button, styles[size], { [styles.primary]: primary })} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
