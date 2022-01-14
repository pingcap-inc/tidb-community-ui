import { DateTime } from 'luxon'
import { useMemo } from 'react'

export type AnyDateTime = Date | DateTime | string | number

export interface LuxonDateTimeFormatProps {
  format?: string
  unit?: 'second' | 'millisecond'
}

export const useLuxonDateTime = (dt: AnyDateTime, format?: LuxonDateTimeFormatProps): DateTime => {
  return useMemo(() => {
    if (DateTime.isDateTime(dt)) {
      return dt
    } else if (dt instanceof Date) {
      return DateTime.fromJSDate(dt)
    } else if (typeof dt === 'string') {
      if (!format?.format) {
        return DateTime.fromISO(dt)
      } else {
        return DateTime.fromFormat(dt, format.format)
      }
    } else {
      if (format?.unit === 'second') {
        return DateTime.fromMillis(dt * 1000)
      } else {
        return DateTime.fromMillis(dt)
      }
    }
  }, [dt, format])
}
