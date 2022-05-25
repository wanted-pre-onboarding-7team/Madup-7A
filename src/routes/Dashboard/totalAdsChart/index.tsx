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

const TotalAdsChart = () => {
  const rowChartData: IDaily[] = TREND_DATA.report.daily
  const datavalue = useRecoilValue(dateRangeState)
  const selectedDate = getDays(datavalue)
  const [firstFilterValue, setFirstFilterValue] = useRecoilState(firstFilterState)
  const [secondFilterValue, setSecondFilterValue] = useRecoilState(sencondFilterState)
  const [dateFilterValue, setDateFilterValue] = useRecoilState(dateFilterState)

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
            <Dropdown list={CHART_MENU_LIST} blueDot onClick={handleStatusClick} size='small' />
          </div>
          <div>
            <Dropdown list={CHART_MENU_LIST} greenDot onClick={handleStatusClickTwo} size='small' />
          </div>
        </div>
        <div>
          <Dropdown list={DATE_MENU_LIST} onClick={handleDateClickEvnet} size='small' />
        </div>
      </div>
      <LineChart chartData={totalChartValue} type={[firstFilterValue, secondFilterValue]} />
    </div>
  )
}

export default TotalAdsChart
