import {
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryGroup,
  VictoryTooltip,
  VictoryLabel,
} from 'victory'
import dayjs from 'dayjs'

import { IChart } from 'types/trend'
import { ChangeText, getDays } from '../utils'
import { useRecoilValue } from 'recoil'
import { dateRangeState } from '../states'

interface prop {
  chartData: IChart[][]
  type: string[]
}
export const LineChart = ({ chartData, type }: prop) => {
  const data = chartData
  const datavalue = useRecoilValue(dateRangeState)
  const selectedDate = getDays(datavalue)

  // find maxima for normalizing data
  const maxima = data.map((dataset) => {
    if (dataset.length === 0) return 0
    return Math.max(...dataset.map((d) => d.y))
  })

  // const totalCount = useMemo(() => {
  //   return Math.max(...data.map((d) => d.length)) < 5 ? Math.max(...data.map((d) => d.length)) : 5
  // }, [data])
  const xOffsets = [50, 910]
  const tickPadding = [38, -60]
  const anchors = ['start', 'end']
  const colors = ['#4fadf7', '#85da47']

  const options = {
    width: 960,
    height: 360,
    padding: {
      bottom: 50,
      top: 10,
      left: 50,
      right: 50,
    },
  }

  return (
    <div>
      <VictoryChart theme={VictoryTheme.grayscale} domainPadding={{ x: 30 }} {...options} scale={{ x: 'time' }}>
        <VictoryAxis
          tickFormat={(x) => {
            return dayjs(x).format('MM월 DD일')
          }}
          tickCount={5}
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: '#94A2AD' },
          }}
          tickLabelComponent={<VictoryLabel dy={20} />}
        />
        {data.map((d, i) => {
          if (d.length === 0) {
            return null
          }
          return (
            <VictoryAxis
              dependentAxis
              key={xOffsets[i]}
              offsetX={xOffsets[i]}
              tickValues={[0.2, 0.4, 0.6, 0.8, 1, 1.2]}
              tickFormat={(t) => {
                return ChangeText(t * maxima[i], type[i])
              }}
              tickLabelComponent={<VictoryLabel dy={10} />}
              style={{
                axis: { stroke: 'transparent' },
                ticks: { padding: tickPadding[i] },
                tickLabels: { fill: '#94A2AD', textAnchor: anchors[i] },
                grid: {
                  fill: '#94a2ad',
                  stroke: '#94a2ad',
                  pointerEvents: 'painted',
                  strokeWidth: 0.2,
                },
              }}
            />
          )
        })}
        {data.map((d, i) => {
          if (d.length === 0) {
            return null
          }
          return (
            <VictoryGroup key={xOffsets[i]}>
              <VictoryLine
                data={d}
                y={(datum) => datum.y / maxima[i]}
                style={{ data: { stroke: colors[i], strokeWidth: 3 } }}
              />
              <VictoryScatter
                data={d}
                y={(datum) => datum.y / maxima[i]}
                style={{ data: { fill: 'transparent' } }}
                size={20}
                labels={({ datum }) => ChangeText(datum.y, type[i])}
                labelComponent={
                  <VictoryTooltip
                    style={{ fill: 'white', fontSize: 20, textAnchor: 'middle' }}
                    flyoutStyle={{
                      stroke: '#3a474e',
                      fill: '#3a474e',
                      margin: 10,
                    }}
                    flyoutWidth={150}
                    dx={60}
                    dy={60}
                  />
                }
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onMouseOver: () => {
                        return [
                          {
                            target: 'data',
                            mutation: () => {
                              return { size: 5, style: { fill: colors[i], stroke: '#ffffff', strokeWidth: 3 } }
                            },
                          },
                          {
                            target: 'labels',
                            mutation: () => ({ active: true }),
                          },
                        ]
                      },
                      onMouseOut: () => {
                        return [
                          {
                            target: 'data',
                            mutation: () => {},
                          },
                          {
                            target: 'labels',
                            mutation: () => ({ active: false }),
                          },
                        ]
                      },
                    },
                  },
                ]}
              />
            </VictoryGroup>
          )
        })}
      </VictoryChart>
    </div>
  )
}
