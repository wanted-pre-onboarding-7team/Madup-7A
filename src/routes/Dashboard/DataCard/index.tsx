import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import { cx } from 'styles'
import styles from './dataCard.module.scss'

import { ArrowIcon } from 'assets/svgs'
import { getMinus } from 'utils/num'

import { getDays } from '../utils/chartUtils'
import { dateRangeState } from '../states'
import { getCardValueString, getTotalValue } from '../utils/cardUtils'

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

  const valueString = getCardValueString(currentValue, title)
  const comparisonString = getCardValueString(comparison, title)

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
