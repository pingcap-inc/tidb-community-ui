import React, { HTMLAttributes, useMemo } from 'react'
import { DateTime, Duration, Interval } from 'luxon'
import { LuxonDateTimeFormatProps, useLuxonDateTime } from './hooks'

export interface LuxonDurationProps {
  format?: LuxonDateTimeFormatProps
  from?: DateTime | Date | string | number
  to?: DateTime | Date | string | number
  prefix?: string
  suffix?: string
}

const units: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'] = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']

const useLuxonDuration = ({ from = DateTime.now(), to = DateTime.now(), format, prefix = '', suffix = '' }: LuxonDurationProps) => {
  const start = useLuxonDateTime(from, format)
  const end = useLuxonDateTime(to, format)

  return useMemo(() => {
    const duration = Interval.fromDateTimes(start, end).toDuration(units)
    for (const unit of units) {
      if (duration[unit] > 0) {
        return prefix + Duration.fromObject({ [unit]: duration[unit] }).toHuman({ maximumFractionDigits: 0 }) + suffix
      }
    }
    return ''
  }, [from, to])
}

const LuxonDuration = ({ from, to, format, prefix, suffix, ...attributes }: LuxonDurationProps & HTMLAttributes<HTMLSpanElement> = {}) => {
  const str = useLuxonDuration({ from, to, prefix, suffix, format })

  return <span {...attributes}>{str}</span>
}

export default LuxonDuration
