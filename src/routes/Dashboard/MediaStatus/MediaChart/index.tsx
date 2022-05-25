import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { dateRangeState } from 'routes/Dashboard/states'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryLegend,
} from 'victory'
import CHART_STYLE from './chartStyls'
import { filterData } from '../MediaTable/cardUtils'
import { channelGroupBy, valueGroupBy } from '../MediaTable/groupBy'
import MediaChartData from './medaichartdata'

const MediaChart = () => {
  const date = useRecoilValue(dateRangeState)
  const filteredData = filterData(date)
  const channelGroup = channelGroupBy(filteredData, 'channel')

  const chart = useMemo(
    () => Object.keys(channelGroup).map((media) => valueGroupBy(channelGroup[media])),
    [channelGroup]
  )
  // console.log(chart)

  const { google, facebook, naver, kakao } = MediaChartData()
  const dataList = useMemo(() => {
    return [
      { id: 1, data: google },
      { id: 2, data: naver },
      { id: 3, data: facebook },
      { id: 4, data: kakao },
    ]
  }, [google, facebook, naver, kakao])

  const victoryBarList = useMemo(() => {
    return dataList?.map(({ id, data }) => {
      return (
        <VictoryBar
          key={`${id}-${data}`}
          data={data}
          {...CHART_STYLE.bar}
          labels={({ datum }) => `${datum.value}`}
          labelComponent={
            <VictoryTooltip
              style={{ fill: 'white', fontSize: 14, textAnchor: 'middle' }}
              flyoutStyle={{
                stroke: '#3a474e',
                fill: '#3a474e',
                margin: 10,
              }}
              flyoutWidth={120}
              flyoutHeight={40}
              dx={75}
              dy={75}
            />
          }
          cornerRadius={{ top: data === kakao ? 6 : 0 }}
        />
      )
    })
  }, [dataList, kakao])

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        height={400}
        width={800}
        domainPadding={{ x: 100, y: 30 }}
        minDomain={{ y: 0 }}
        maxDomain={{ y: 100 }}
      >
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${tick}%`}
          style={{
            axis: { stroke: 'transparent' },
            ticks: { size: 0, stroke: 'none' },
            tickLabels: { fontSize: 12, padding: 15, fill: '#94a2ad', fontWeight: 700 },
            grid: { stroke: '#94a2ad', strokeWidth: 0.2, strokeDasharray: 'none' },
          }}
        />
        <VictoryAxis
          tickFormat={['매출', '광고비', '노출 수', '클릭 수', '전환 수']}
          style={{
            grid: { stroke: 'none' },
            ticks: { size: 0, stroke: 'none' },
            tickLabels: { fontSize: 12, fill: '#94a2ad', fontWeight: 700 },
            axis: { stroke: '#94a2ad', strokeWidth: 0.2, strokeDasharray: 'none' },
          }}
        />
        <VictoryStack colorScale={['#AC8AF8', '#85DA47', '#4FADF7', '#F8D84A']}>{victoryBarList}</VictoryStack>
        <VictoryLegend
          x={500}
          y={380}
          orientation='horizontal'
          symbolSpacer={5}
          rowGutter={{ top: 10, bottom: 0 }}
          gutter={40}
          colorScale={['#4fadf7', '#85da47', '#ac8af8', '#f8d849']}
          style={{ title: { fontSize: 20 }, labels: { fill: '#94a2ad', fontWeight: 700 } }}
          data={[{ name: '페이스북' }, { name: '네이버' }, { name: '구글' }, { name: '카카오' }]}
        />
      </VictoryChart>
    </div>
  )
}

export default MediaChart
