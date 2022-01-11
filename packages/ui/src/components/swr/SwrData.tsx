import { KeyedMutator, SWRResponse } from 'swr'


export interface SwrDataProps<Data, Error> {
  data: SWRResponse<Data>
  initializing?: JSX.Element | (() => JSX.Element)
  fallback?: JSX.Element | ((error: Error | undefined, mutate: KeyedMutator<Data>) => JSX.Element)
  children?: JSX.Element | ((data: Data, validating: boolean, mutate: KeyedMutator<Data>) => JSX.Element)
}

export default function SwrData<Data, Error> (props: SwrDataProps<Data, Error>): JSX.Element | null {
  const {
    data: { data, error, isValidating, mutate },
    initializing: renderInitializing,
    fallback: renderFallback,
    children,
  } = props

  if (data) {
    return renderFunctionOrElement(children, [data, isValidating, mutate])
  } else if (isValidating) {
    return renderFunctionOrElement(renderInitializing, [])
  } else {
    return renderFunctionOrElement(renderFallback, [error, mutate])
  }
}


function renderFunctionOrElement (data: any, args: any[]): JSX.Element | null {
  if (data) {
    let el: JSX.Element | null
    if (typeof data === 'function') {
      el = data(...args)
    } else {
      el = data
    }
    return el
  } else {
    return null
  }
}
