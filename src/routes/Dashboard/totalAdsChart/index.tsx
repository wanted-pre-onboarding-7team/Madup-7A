import TREND_DATA from '../../../assets/data/wanted_FE_trend-data-set.json'
import styles from './totalAdsChart.module.scss'
import { IDaily } from 'types/trend'
import { ChartYsum, getChartData, getDays, isMenu } from '../utils/chartUtils'
import { LineChart } from './LineChart'

import { useRecoilState, useRecoilValue } from 'recoil'
import { dateRangeState, firstFilterState, sencondFilterState, dateFilterState } from '../states'
import Dropdown from 'components/Dropdown'
import { CHART_MENU_LIST, DATE_MENU_LIST } from '../model'
import { useMemo } from 'react'

const TotalAdsChart = () => {
  const rowChartData: IDaily[] = TREND_DATA.report.daily
  const dateRange = useRecoilValue(dateRangeState)
  const selectedDate = getDays(dateRange)
  const [firstFilterValue, setFirstFilterValue] = useRecoilState(firstFilterState)
  const [secondFilterValue, setSecondFilterValue] = useRecoilState(sencondFilterState)
  const [dateFilterValue, setDateFilterValue] = useRecoilState(dateFilterState)

  const firstDropDownList = CHART_MENU_LIST.filter((value) => isMenu(value, secondFilterValue))
  const secondDropDownList = CHART_MENU_LIST.filter((value) => isMenu(value, firstFilterValue))

  const chartValue = useMemo(() => {
    return getChartData(selectedDate, rowChartData, firstFilterValue)
  }, [firstFilterValue, rowChartData, selectedDate])

  const chartValue2 = useMemo(() => {
    return getChartData(selectedDate, rowChartData, secondFilterValue)
  }, [rowChartData, secondFilterValue, selectedDate])

  const totalChartValue = useMemo(() => {
    if (dateFilterValue === 'week') {
      const previousDateRange = selectedDate.map((day) =>
        dayjs(day).subtract(selectedDate.length, 'days').format('YYYY-MM-DD')
      )
      const totalRange = [previousDateRange[previousDateRange.length - 1], selectedDate[selectedDate.length - 1]]

      const PrechartValue = ChartYsum(getChartData(previousDateRange, rowChartData, firstFilterValue))

      const PrechartValue2 = ChartYsum(getChartData(previousDateRange, rowChartData, secondFilterValue))
      const result =
        PrechartValue !== -9999
          ? [
              { x: dayjs(totalRange[0]), y: PrechartValue },
              { x: dayjs(totalRange[1]), y: ChartYsum(chartValue) },
            ]
          : []

      const resultTwo =
        PrechartValue2 !== -9999
          ? [
              { x: dayjs(totalRange[0]), y: PrechartValue },
              { x: dayjs(totalRange[1]), y: ChartYsum(chartValue) },
            ]
          : []

      return [result, resultTwo]
    }

    return [chartValue, chartValue2]
  }, [chartValue, chartValue2, dateFilterValue, firstFilterValue, rowChartData, secondFilterValue, selectedDate])

  return (
    <div>
      <div className={styles.dropdownContainer}>
        <div className={styles.filterDropdown}>
          <div>
            <Dropdown list={firstDropDownList} blueDot onClick={setFirstFilterValue} size='small' />
          </div>
          <div>
            <Dropdown list={secondDropDownList} greenDot onClick={setSecondFilterValue} size='small' />
          </div>
        </div>
        <div>
          <Dropdown list={DATE_MENU_LIST} onClick={setDateFilterValue} size='small' />
        </div>
      </div>
      <LineChart chartData={totalChartValue} type={[firstFilterValue, secondFilterValue]} dateType={dateFilterValue} />
    </div>
  )
}

export default TotalAdsChart
