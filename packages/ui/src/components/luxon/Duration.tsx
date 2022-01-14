import React, { HTMLAttributes, useMemo } from 'react'
import { DateTime, Duration, Interval } from 'luxon'
import { LuxonDateTimeFormatProps, useLuxonDateTime } from './hooks'

export interface LuxonDurationProps {
  format?: LuxonDateTimeFormatProps
  from?: DateTime | Date | string | number
  to?: DateTime | Date | string | number
}

const units: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'] = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']

const useLuxonDuration = ({ from = DateTime.now(), to = DateTime.now(), format }: LuxonDurationProps) => {
  const start = useLuxonDateTime(from, format)
  const end = useLuxonDateTime(to, format)

  return useMemo(() => {
    const duration = Interval.fromDateTimes(start, end).toDuration(units)
    for (const unit of units) {
      if (duration[unit] > 0) {
        return Duration.fromObject({ [unit]: duration[unit] }).toHuman({ maximumFractionDigits: 0 })
      }
    }
    return ''
  }, [from, to])
}

const LuxonDuration = ({ from = DateTime.now(), to = DateTime.now(), format, ...attributes }: LuxonDurationProps & HTMLAttributes<HTMLSpanElement> = {}) => {
  const str = useLuxonDuration({ from, to, format })

  return <span {...attributes}>{str}</span>
}

export default LuxonDuration
