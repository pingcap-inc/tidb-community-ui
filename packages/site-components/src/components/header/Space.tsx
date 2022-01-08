import React, { PropsWithChildren, useContext } from 'react'
import { headerBreakpoints } from './constants'
import { Responsive } from '@pingcap-inc/tidb-community-ui'

const sizes = {
  lg: (width: number) => width > headerBreakpoints.md ? 64 : 24,
  sm: (width: number) => width > headerBreakpoints.md ? 24 : 8,
}

const Space = ({ size, children }: PropsWithChildren<{ size: number | 'lg' | 'sm' }>): JSX.Element => {
  const { width } = useContext(Responsive.Context)
  if (typeof size === 'string') {
    size = sizes[size](width)
  }
  return <div style={{ maxWidth: size, minWidth: size }}>{children}</div>
}

export default Space
