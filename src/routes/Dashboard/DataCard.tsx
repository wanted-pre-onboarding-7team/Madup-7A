import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import { cx } from 'styles'
import styles from './dashboard.module.scss'

import { ArrowIcon } from 'assets/svgs'
import { getMinus } from 'utils/num'

import { dateRangeState } from './states'
import { getValueString, getDays, getTotalValue } from './cardUtils'

interface Props {
  title: string
}

const DataCard = ({ title }: Props) => {
  const date = useRecoilValue(dateRangeState)

  const dateRange = getDays(date)
  const previousDateRange = dateRange.map((day) => dayjs(day).subtract(dateRange.length, 'days').format('YYYY-MM-DD'))

  const currentValue = getTotalValue(dateRange, title)
  const previousValue = getTotalValue(previousDateRange, title)
  const comparison = getMinus(currentValue, previousValue)

  const valueString = getValueString(currentValue, title)
  const comparisonString = getValueString(comparison, title)

  return (
    <li className={styles.dataCard}>
      <dl>
        <dt>{title}</dt>
        <dd>{valueString}</dd>
      </dl>
      <div className={styles.comparison}>
        {comparison && <ArrowIcon className={cx({ [styles.increased]: comparison > 0 })} />}
        <span>{comparisonString}</span>
      </div>
    </li>
  )
}

export default DataCard
