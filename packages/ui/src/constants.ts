import { stripUnit } from 'polished'

export const appClassName = 'tidb-community-ui'

export const enum SizeClasses {
  xl = 'xl',
  lg = 'lg',
  md = 'md',
}

export const responsiveWidths: Record<SizeClasses, string> = {
  [SizeClasses.xl]: '1344px',
  [SizeClasses.lg]: '1152px',
  [SizeClasses.md]: '960px',
}

export const breakPoints: Record<SizeClasses, string> = Object.entries(responsiveWidths).reduce((acc: any, [k, v]) => {
  acc[k] = `${stripUnit(v) as number + 64}px`
  return acc
}, {})
