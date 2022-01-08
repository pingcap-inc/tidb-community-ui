import React, { FC, useContext } from 'react'
import ResponsiveContext, { ResponsiveContextProps } from './context'

export interface ResponsiveConditionalProps {
  when: (context: ResponsiveContextProps) => boolean
}

const ResponsiveConditional: FC<ResponsiveConditionalProps> = ({ when, children }) => {
  const context = useContext(ResponsiveContext)
  if (children && when(context)) {
    return <>{children}</>
  } else {
    return null
  }
}

ResponsiveConditional.displayName = 'Responsive.Conditional'

export default ResponsiveConditional
