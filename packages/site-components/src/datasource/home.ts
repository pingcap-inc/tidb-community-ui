import {useContext} from 'react'
import useSWR, {SWRResponse} from 'swr'
import SiteComponentsContext from '../context/site-components-context'

export interface IEvent {
  id: number // 40,
  title: string // "TiDB社区专栏第一届征文大赛",
  link: string // "https://tidb.net/blog/ab7959f4",
  location: string // "线上",
  type: string // "线上",
  date: string // "2022-05-31",
  intro: string // "全国",
  published_at: string // "2022-04-18T03:32:33.000Z",
  created_at: string // "2022-04-18T03:32:30.000Z",
  updated_at: string // "2022-04-18T03:32:33.000Z",
}

export function useHomeEvents (): SWRResponse<IEvent[]> {
  const { fetchers: { home: fetcher } } = useContext(SiteComponentsContext)
  return useSWR<IEvent[]>(['home.events'], { fetcher })
}
