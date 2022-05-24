import TREND_DATA from '../../../assets/data/wanted_FE_trend-data-set.json'
import { IDaily } from 'types/trend'
import { getChartData, getDays } from '../utils'
import { LineChart } from './LineChart'
import Dropdown from 'components/Dropdown'

const TotalAdsChart = () => {
  const rowChartData: IDaily[] = TREND_DATA.report.daily
  const selectedDate = getDays(['2022-02-01', '2022-02-08'])
  const chartValue = getChartData(selectedDate, rowChartData, 'imp')
  const chartValue2 = getChartData(selectedDate, rowChartData, 'ctr')

  const LIST = ['전체 광고', '진행중', '중단됨']
  const DROPDOWN_STYLE = { padding: '12px 20px', width: '135px', height: '38px', fontSize: '14px' }
  const handleStatusClick = (item: string) => {
    console.log('test')
  }

  return (
    <div>
      <div>
        <Dropdown list={LIST} style={DROPDOWN_STYLE} onClick={handleStatusClick} />
        <Dropdown list={LIST} style={DROPDOWN_STYLE} onClick={handleStatusClick} />
      </div>
      <LineChart chartData={[chartValue, chartValue2]} />
    </div>
  )
}

export default TotalAdsChart
