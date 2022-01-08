import useSWR from 'swr'
import { useContext } from 'react'
import SiteComponentsContext from '../context/site-components-context'
import { SWRResponse } from 'swr/dist/types'

export type CommonHeaderData = {
  notifications: number | boolean
  privateMessages: number | boolean
}

export const useCommonHeaderData = (): SWRResponse<CommonHeaderData, void> => {
  const { fetchers: { home } } = useContext(SiteComponentsContext)
  return useSWR<CommonHeaderData>(['common.headerData'], { fetcher: home })
}
