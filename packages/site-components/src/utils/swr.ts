import { SWRResponse } from 'swr/dist/types'

export enum SwrState {
  initializing = 'initializing',
  ok = 'ok',
  error = 'error',
  noData = 'noData'
}

export function swrState (resp: SWRResponse): SwrState {
  if (resp.data) {
    return SwrState.ok
  } else if (resp.isValidating) {
    return SwrState.initializing
  } else if (resp.error) {
    return SwrState.error
  } else {
    return SwrState.noData
  }
}
