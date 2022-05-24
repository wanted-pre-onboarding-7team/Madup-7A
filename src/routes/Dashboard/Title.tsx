import { ReactNode, useState } from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'

import styles from './dashboard.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.scss'

interface IContainerProp {
  children: ReactNode
}

interface ICustomHeaderProp {
  monthDate: Date
  decreaseMonth: () => void
  increaseMonth: () => void
}

const Title = () => {
  const [startDate, setStartDate] = useState(new Date('2022-04-13'))
  const [endDate, setEndDate] = useState(new Date('2022-04-20'))

  const handleChange = (date: [Date, Date]) => {
    const [start, end] = date

    setStartDate(start)
    setEndDate(end)
  }

  const calenderContainer = ({ children }: IContainerProp) => (
    <CalendarContainer>
      <div className={styles.calenderHeader}>날짜 범위를 선택해주세요</div>
      <div className={styles.calenderMain}>{children}</div>
    </CalendarContainer>
  )

  const calenderHeader = ({ monthDate, decreaseMonth, increaseMonth }: ICustomHeaderProp) => (
    <div className={styles.monthlyHeader}>
      <button type='button' aria-label='Previous Month' className={styles.prevButton} onClick={decreaseMonth}>
        <span>{'<'}</span>
      </button>
      <span>
        {monthDate.toLocaleString('ko', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button type='button' aria-label='Next Month' className={styles.nextButton} onClick={increaseMonth}>
        <span>{'>'}</span>
      </button>
    </div>
  )

  return (
    <div className={styles.title}>
      <h1>대시보드</h1>
      <div>
        <DatePicker
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={handleChange}
          minDate={new Date('2022-02-01')}
          maxDate={new Date('2022-04-20')}
          calendarContainer={calenderContainer}
          renderCustomHeader={calenderHeader}
          dateFormat='yyyy년 MM월 dd일'
          disabledKeyboardNavigation
          selectsRange
          locale={ko}
        />
      </div>
    </div>
  )
}

export default Title
