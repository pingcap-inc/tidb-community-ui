import { Fetcher } from 'swr'
import { createContext } from 'react'

type FetcherKey = [key: string, ...args: any[]]

export interface SiteComponentsContextProps {
  fetchers: {
    // fetcher for accounts.pingcap.cn/*
    accounts: Fetcher<any, FetcherKey>

    // fetcher for asktug.com/*
    asktug: Fetcher<any, FetcherKey>

    // fetcher for tidb.io/blog/*
    blog: Fetcher<any, FetcherKey>
  }
}

const SiteComponentsContext = createContext<SiteComponentsContextProps>({
  fetchers: {
    accounts: () => {
      throw new Error('fetchers.accounts not provided')
    },
    asktug: () => {
      throw new Error('fetchers.asktug not provided')
    },
    blog: () => {
      throw new Error('fetchers.blog not provided')
    }
  },
})

export default SiteComponentsContext
