import TREND_DATA from '../../../assets/data/wanted_FE_trend-data-set.json'
import styles from './totalAdsChart.module.scss'
import { IDaily } from 'types/trend'
import { getChartData, getDays } from '../utils'
import { LineChart } from './LineChart'

import { useRecoilState, useRecoilValue } from 'recoil'
import { dateRangeState, firstFilterState, sencondFilterState, dateFilterState } from '../states'
import Dropdown from 'components/Dropdown'
import { CHART_MENU_LIST, DATE_MENU_LIST } from '../model'
import { useMemo } from 'react'

interface menu {
  text: string
  value: string
  id: string
}

const isText = (element: menu, value: string) => {
  if (element.value === value) return false
  return true
}

const TotalAdsChart = () => {
  const rowChartData: IDaily[] = TREND_DATA.report.daily
  const dateRange = useRecoilValue(dateRangeState)
  const selectedDate = getDays(dateRange)
  const [firstFilterValue, setFirstFilterValue] = useRecoilState(firstFilterState)
  const [secondFilterValue, setSecondFilterValue] = useRecoilState(sencondFilterState)
  const [dateFilterValue, setDateFilterValue] = useRecoilState(dateFilterState)

  const firstDropDownList = CHART_MENU_LIST.filter((value) => isText(value, secondFilterValue))
  const secondDropDownList = CHART_MENU_LIST.filter((value) => isText(value, firstFilterValue))

  const handleStatusClick = (item: string) => {
    setFirstFilterValue(item)
  }

  const handleStatusClickTwo = (item: string) => {
    setSecondFilterValue(item)
  }

  const handleDateClickEvnet = (item: string) => {
    setDateFilterValue(item)
  }

  const chartValue = useMemo(() => {
    return getChartData(selectedDate, rowChartData, firstFilterValue)
  }, [firstFilterValue, rowChartData, selectedDate])

  const chartValue2 = useMemo(() => {
    return getChartData(selectedDate, rowChartData, secondFilterValue)
  }, [rowChartData, secondFilterValue, selectedDate])

  const totalChartValue = useMemo(() => {
    return [chartValue, chartValue2]
  }, [chartValue, chartValue2])

  return (
    <div>
      <div className={styles.dropdownContainer}>
        <div className={styles.filterDropdown}>
          <div>
            <Dropdown
              list={firstDropDownList}
              blueDot
              onClick={handleStatusClick}
              size='small'
              initValue={firstFilterValue}
            />
          </div>
          <div>
            <Dropdown
              list={secondDropDownList}
              greenDot
              onClick={handleStatusClickTwo}
              size='small'
              initValue={secondFilterValue}
            />
          </div>
        </div>
        <div>
          <Dropdown list={DATE_MENU_LIST} onClick={handleDateClickEvnet} size='small' initValue={dateFilterValue} />
        </div>
      </div>
      <LineChart chartData={totalChartValue} type={[firstFilterValue, secondFilterValue]} dateType={dateFilterValue} />
    </div>
  )
}

export default TotalAdsChart
