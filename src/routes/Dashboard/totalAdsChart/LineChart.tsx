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
import { ScalePropType } from 'victory-core'
import dayjs from 'dayjs'
import { useRecoilValue } from 'recoil'
import { totalChartDataState } from '../states'
import { IChart } from 'types/trend'
import { useEffect } from 'react'

interface prop {
  chartData: IChart[][]
}
export const LineChart = ({ chartData }: prop) => {
  const data = chartData
  // find maxima for normalizing data
  const maxima = data.map((dataset) => Math.max(...dataset.map((d) => d.y)))
  const xOffsets = [50, 910]
  const tickPadding = [35, -60]
  const anchors = ['start', 'end']
  const colors = ['#4fadf7', '#85da47']

  // x 값이 2개인 경우 직접 값을 넘겨준다

  const options = {
    width: 960,
    height: 360,
    padding: {
      bottom: 50,
      top: 10,
    },
    scale: { x: 'time' as ScalePropType },
  }

  return (
    <div>
      <VictoryChart theme={VictoryTheme.grayscale} domainPadding={{ x: 100, y: [20, 20] }} {...options}>
        <VictoryAxis
          // tickValues={[dayjs('2022-02-01'), dayjs('2022-02-02')]}
          tickCount={5}
          tickFormat={(x) => {
            return dayjs(x).format('MM월 DD일')
          }}
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: '#94A2AD' },
          }}
          animate={{
            onLoad: { duration: 800 },
            easing: 'expInOut',
          }}
        />
        {data.map((_d, i) => (
          <VictoryAxis
            dependentAxis
            key={xOffsets[i]}
            offsetX={xOffsets[i]}
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
            tickValues={[0.2, 0.4, 0.6, 0.8, 1, 1.2]}
            tickFormat={(t) => t * maxima[i]}
          />
        ))}
        {data.map((d, i) => (
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
              size={5}
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <VictoryTooltip
                  style={{ fill: 'white', fontSize: 20, textAnchor: 'middle' }}
                  flyoutStyle={{
                    stroke: '#3a474e',
                    fill: '#3a474e',
                    margin: 10,
                  }}
                  flyoutWidth={100}
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
        ))}
      </VictoryChart>
    </div>
  )
}