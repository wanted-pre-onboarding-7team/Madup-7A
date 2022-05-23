import { MouseEvent, useState, useRef, useEffect } from 'react'
import { cx } from 'styles'
import styles from './dropdown.module.scss'

import { useSetRecoilState } from 'recoil'
import { adStatusFilter } from 'state/adList'

import { ArrowButton } from 'assets/svgs'

interface Props {
  list: Array<string>
  style: {
    padding: string
    height: string
    fontSize: string
  }
}

const Dropdown = ({ list, style }: Props) => {
  const [selected, setSeleted] = useState(list[0])
  const [isListOpen, setIsListOpen] = useState(false)
  const outsideRef = useRef<HTMLDivElement>(null)

  const setAdStatus = useSetRecoilState(adStatusFilter)

  const isSelected = (item: string) => {
    if (item === selected) return true

    return false
  }

  const handleSelectedClick = () => {
    setIsListOpen((prev) => !prev)
  }

  const handleItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.title

    if (item === '전체 광고' || item === '진행중' || item === '중단됨') {
      setAdStatus(item)
    }

    setSeleted(item)
    setIsListOpen(false)
  }

  function handleClickOutside(e: any) {
    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
      setIsListOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [outsideRef])

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
    <div className={styles.dropdown} ref={outsideRef}>
      <button
        type='button'
        className={styles.selected}
        onClick={handleSelectedClick}
        style={{ padding: style.padding }}
      >
        <input className={styles.text} value={selected} readOnly style={{ fontSize: style.fontSize }} />
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
