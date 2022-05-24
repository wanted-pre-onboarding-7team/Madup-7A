import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'
import styles from './corona.module.scss'

import CHART_STYLE from './chartStyle'
import CHANNEL_DATA from 'assets/data/channelData.json'
import { getMultiplyDivide } from 'utils/num'

interface Props {
  data?: string
}

const dataStructure = [
  { value: 0, category: '광고비' },
  { value: 0, category: '매출' },
  { value: 0, category: '노출수' },
  { value: 0, category: '클릭수' },
  { value: 0, category: '전환수' },
]

const getChart = () => {
  const data: Record<string, { value: number; category: string }[]> = {
    google: [...dataStructure],
    facebook: [...dataStructure],
    naver: [...dataStructure],
    kakao: [...dataStructure],
  }

  CHANNEL_DATA.forEach((d) => {
    data[d.channel].find((item) => item.category === '광고비')!.value += d.cost
    data[d.channel].find((item) => item.category === '매출')!.value += getMultiplyDivide(d.roas, d.cost, 100)
    data[d.channel].find((item) => item.category === '노출수')!.value += d.imp
    data[d.channel].find((item) => item.category === '클릭수')!.value += d.click
    data[d.channel].find((item) => item.category === '전환수')!.value += getMultiplyDivide(d.click, d.cvr, 100)
  })

  return data
}

const tickFormat = ['광고비', '매출', '노출수', '클릭수', '전환수']

const { google, facebook, naver, kakao } = getChart()

// const maxima = google.map((dataset) => Math.max(...dataset.map((d) => d.y)))

console.log(google)

const Chart = ({ data }: Props) => {
  return (
    <div>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis tickValues={tickFormat} tickFormat={tickFormat} />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `${100 / 5}%`}
        />
        <VictoryStack colorScale={['#F8D84A', '#AC8AF8', '#85DA47', '#4FADF7']}>
          <VictoryBar data={kakao} {...CHART_STYLE.bar} labelComponent={<VictoryTooltip />} />
          <VictoryBar data={google} {...CHART_STYLE.bar} labelComponent={<VictoryTooltip />} />
          <VictoryBar data={naver} {...CHART_STYLE.bar} labelComponent={<VictoryTooltip />} />
          <VictoryBar
            data={facebook}
            {...CHART_STYLE.bar}
            labelComponent={<VictoryTooltip />}
            cornerRadius={{ top: 6 }}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  )
}

export default Chart
