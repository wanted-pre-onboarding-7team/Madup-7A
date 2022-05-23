import { MouseEvent, useState } from 'react'
import { cx } from 'styles'
import styles from './dropdown.module.scss'

import { ArrowButton } from 'assets/svgs'

interface Props {
  list: Array<string>
  style: {
    padding: string
    height: string
  }
}

const Dropdown = ({ list, style }: Props) => {
  const [selected, setSeleted] = useState(list[0])
  const [isListOpen, setIsListOpen] = useState(false)

  const isSelected = (item: string) => {
    if (item === selected) return true

    return false
  }

  const handleSelectedClick = () => {
    setIsListOpen((prev) => !prev)
  }

  const handleItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.title

    setSeleted(item)
    setIsListOpen(false)
  }

  const dropdownList = list.map((item) => (
    <li
      key={item}
      className={cx({ [styles.selectedItem]: isSelected(item) })}
      style={{ height: style.height, lineHeight: style.height }}
    >
      <button type='button' title={item} onClick={handleItemClick}>
        {item}
      </button>
    </li>
  ))

  return (
    <div className={styles.dropdown}>
      <button
        type='button'
        className={styles.selected}
        onClick={handleSelectedClick}
        style={{ padding: style.padding }}
      >
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
