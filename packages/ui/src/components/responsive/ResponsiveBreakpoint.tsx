import React, { PropsWithChildren, useCallback } from 'react'
import ResponsiveConditional from './ResponsiveConditional'

export type ResponsiveBreakpointProps<T extends string> = {
  [P in T]?: boolean
} & { not?: boolean }

function ResponsiveBreakpoint<T extends string = string> ({ children, not, ...breakpoints }: PropsWithChildren<ResponsiveBreakpointProps<T>>): JSX.Element {
  const when = useCallback(({ currentBreakpoint }) => {
    const is = (breakpoints as { [key: string]: boolean })[currentBreakpoint]
    return not ? !is : is
  }, [not, Object.keys(breakpoints).join(',')])
  return <ResponsiveConditional when={when}>{children}</ResponsiveConditional>
}


export default ResponsiveBreakpoint
