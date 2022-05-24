import { MouseEvent, useState, useRef } from 'react'
import { useClickAway } from 'react-use'
import { cx } from 'styles'
import styles from './dropdown.module.scss'

import { ArrowButton } from 'assets/svgs'

interface Props {
  list: Array<{
    id: string
    text: string
    value?: string
  }>
  size: 'large' | 'small'
  greenDot?: boolean
  blueDot?: boolean
  onClick: (item: string) => void
}

const Dropdown = ({ list, size, greenDot, blueDot, onClick }: Props) => {
  const [selected, setSeleted] = useState(list[0].text)
  const [isListOpen, setIsListOpen] = useState(false)
  const outsideRef = useRef<HTMLInputElement>(null)

  const isSelected = (item: string) => {
    if (item === selected) return true
    return false
  }

  const handleSelectedClick = () => {
    setIsListOpen((prev) => !prev)
  }

  const handleItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.title

    onClick(item)

    setSeleted(item)
    setIsListOpen(false)
  }

  useClickAway(outsideRef, () => {
    setIsListOpen(false)
  })

  const dropdownList = list.map((item) => (
    <li key={item.text} className={cx(styles.dropdownItem, { [styles.selectedItem]: isSelected(item.text) })}>
      <button type='button' title={item.text} onClick={handleItemClick}>
        {item.text}
      </button>
    </li>
  ))

  return (
    <div className={cx(styles.dropdown, styles[size])} ref={outsideRef}>
      <button type='button' className={styles.selected} onClick={handleSelectedClick}>
        {greenDot || blueDot ? (
          <div className={cx({ [styles.blueDot]: blueDot }, { [styles.greenDot]: greenDot })} />
        ) : (
          ''
        )}
        <input className={styles.text} value={selected} readOnly />
        <ArrowButton className={cx({ [styles.openMenu]: isListOpen })} />
      </button>
      {isListOpen && (
        <div className={styles.menuWrapper}>
          <ul className={styles.menuList}>{dropdownList}</ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
