import { ReactNode, useState } from 'react'
import { useRecoilState } from 'recoil'
import dayjs from 'dayjs'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import { cx } from 'styles'
import { ko } from 'date-fns/esm/locale'

import { dateRangeState } from '../states'

import './datepicker.scss'
import { ArrowButton } from 'assets/svgs'

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
  const [isOpen, setIsOpen] = useState(false)
  const [dateRange, setDateRange] = useRecoilState(dateRangeState)

  const getDateString = (date: Date | string) => {
    if (!date) return ''

    return dayjs(date).format('YYYY년 MM월 DD일')
  }

  const handleChange = (dates: [Date, Date]) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  const handleOpenClick = () => {
    setStartDate(new Date(dateRange[0]))
    setEndDate(new Date(dateRange[1]))
    setIsOpen((prev) => !prev)
  }

  const handleApplyClick = () => {
    const dates = [startDate, endDate]
    const dateString = dates.map((date) => dayjs(date).format('YYYY-MM-DD'))

    setDateRange(dateString)
    setIsOpen(false)
  }

  const calendarContainer = ({ children }: IContainerProp) => (
    <CalendarContainer className='calendar'>
      <div className='calendar-header'>
        {getDateString(startDate)} ~ {getDateString(endDate)}
      </div>
      <div className='calendar-main'>{children}</div>
      <div className='calendar-footer'>
        <button type='button' onClick={handleOpenClick}>
          닫기
        </button>
        <button type='button' className='apply' onClick={handleApplyClick}>
          적용
        </button>
      </div>
    </CalendarContainer>
  )

  const calendarHeader = ({ monthDate, decreaseMonth, increaseMonth }: ICustomHeaderProp) => (
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
    <>
      <button type='button' className='date-button' onClick={handleOpenClick}>
        {getDateString(dateRange[0])} ~ {getDateString(dateRange[1])}
        <ArrowButton className={cx('date-arrow', { open: isOpen })} />
      </button>
      {isOpen && (
        <DatePicker
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={handleChange}
          minDate={new Date('2022-02-01')}
          maxDate={new Date('2022-04-20')}
          calendarContainer={calendarContainer}
          renderCustomHeader={calendarHeader}
          shouldCloseOnSelect={false}
          disabledKeyboardNavigation
          selectsRange
          inline
          locale={ko}
        />
      )}
    </>
  )
}

export default DateInput
