import { ReactNode, useState } from 'react'
import { useRecoilState } from 'recoil'
import dayjs from 'dayjs'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'

import { dateRangeState } from '../states'

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

const DateInput = () => {
  const [startDate, setStartDate] = useState(new Date('2022-04-14'))
  const [endDate, setEndDate] = useState(new Date('2022-04-20'))
  const [, setDateRange] = useRecoilState(dateRangeState)

  const handleChange = (dates: [Date, Date]) => {
    const [start, end] = dates
    const dateString = dates.map((date) => dayjs(date).format('YYYY-MM-DD'))

    setStartDate(start)
    setEndDate(end)
    setDateRange(dateString)
  }

  const calenderContainer = ({ children }: IContainerProp) => (
    <CalendarContainer>
      <div className='calender-header'>날짜 범위를 선택해주세요</div>
      <div className='calender-main'>{children}</div>
    </CalendarContainer>
  )

  const calenderHeader = ({ monthDate, decreaseMonth, increaseMonth }: ICustomHeaderProp) => (
    <div className='monthly-header'>
      <button type='button' aria-label='Previous Month' className='prev' onClick={decreaseMonth}>
        <span>{'<'}</span>
      </button>
      <span>
        {monthDate.toLocaleString('ko', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button type='button' aria-label='Next Month' className='next' onClick={increaseMonth}>
        <span>{'>'}</span>
      </button>
    </div>
  )

  return (
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
  )
}

export default DateInput
