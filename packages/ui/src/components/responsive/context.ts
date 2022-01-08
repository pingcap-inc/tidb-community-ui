import { Return } from 'react-cool-dimensions'
import { createContext } from 'react'

export interface ResponsiveContextProps extends Omit<Return<HTMLElement>, 'observe' | 'unobserve'> {
}

const ResponsiveContext = createContext<ResponsiveContextProps>({
  entry: undefined,
  width: 0,
  height: 0,
  currentBreakpoint: '',
})

export default ResponsiveContext
