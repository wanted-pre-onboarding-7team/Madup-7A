import TREND_DATA from '../../../assets/data/wanted_FE_trend-data-set.json'
import { IDaily } from 'types/trend'
import { getChartData, getDays } from '../utils'
import { LineChart } from './LineChart'

import { useRecoilState, useRecoilValue } from 'recoil'
import { dateRangeState, firstFilterState } from '../states'
import Dropdown from 'components/Dropdown'
import { CHART_MENU_LIST } from '../model'
import { useMemo, useState } from 'react'
import { useMount } from 'react-use'

const DROPDOWN_STYLE = { fontSize: '14px' }

const TotalAdsChart = () => {
  const rowChartData: IDaily[] = TREND_DATA.report.daily
  const datavalue = useRecoilValue(dateRangeState)
  const selectedDate = getDays(datavalue)
  const [firstFilterValue, setFirstFilterValue] = useRecoilState(firstFilterState)
  const [secondFilterValue, setSecondFilterValue] = useState('imp')

  const handleStatusClick = (item: string) => {
    setFirstFilterValue(item)
  }

  const handleStatusClickTwo = (item: string) => {
    setSecondFilterValue(item)
  }

  const chartValue = useMemo(() => {
    return getChartData(selectedDate, rowChartData, firstFilterValue)
  }, [firstFilterValue, rowChartData, selectedDate])
  const chartValue2 = getChartData(selectedDate, rowChartData, secondFilterValue)

  const totalChartValue = useMemo(() => {
    return [chartValue, chartValue2]
  }, [chartValue, chartValue2])

  return (
    <div>
      <div>
        <Dropdown list={CHART_MENU_LIST} style={DROPDOWN_STYLE} onClick={handleStatusClick} size='small' />
        <Dropdown list={CHART_MENU_LIST} style={DROPDOWN_STYLE} onClick={handleStatusClickTwo} size='small' />
      </div>
      <LineChart chartData={totalChartValue} />
    </div>
  )
}

export default TotalAdsChart
