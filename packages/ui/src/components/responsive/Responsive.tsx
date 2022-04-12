import React from 'react'
import useDimensions from 'react-cool-dimensions'
import ResponsiveContext from './context'
import ResponsiveConditional from './ResponsiveConditional'
import ResponsiveBreakpoint from './ResponsiveBreakpoint'
import classNames from 'classnames'

export interface ResponsiveProps {
  children: JSX.Element
  breakpoints?: Record<string, number>
  defaultBreakpoint?: string
}

type ResponsiveComponent = React.FC<ResponsiveProps> & {
  Conditional: typeof ResponsiveConditional
  Breakpoint: typeof ResponsiveBreakpoint
  Context: typeof ResponsiveContext
}

const Responsive: ResponsiveComponent = ({ breakpoints, defaultBreakpoint, children }: ResponsiveProps) => {
  const { observe, unobserve, ...props } = useDimensions({ breakpoints })

  const { currentBreakpoint = defaultBreakpoint } = props

  const className = classNames(children.props.className, currentBreakpoint ? `ti-responsive-${currentBreakpoint}` : undefined)

  let host: JSX.Element
  const originRef: React.Ref<any> = ((children as any).ref)
  if (originRef) {
    const ref = (el: any) => {
      if (typeof originRef === 'function') {
        originRef(el)
      } else {
        (originRef as React.MutableRefObject<any>).current = el
      }
      observe(el)
    }
    host = React.cloneElement(children, { ref, className })
  } else {
    host = React.cloneElement(children, { ref: observe, className })
  }

  return (
    <ResponsiveContext.Provider value={{ ...props, width: props.width || (typeof 'window' === 'undefined' ? 0 : window.innerWidth) }}>
      {host}
    </ResponsiveContext.Provider>
  )
}

Responsive.displayName = 'Responsive'

Responsive.Conditional = ResponsiveConditional
Responsive.Breakpoint = ResponsiveBreakpoint
Responsive.Context = ResponsiveContext

export default Responsive
