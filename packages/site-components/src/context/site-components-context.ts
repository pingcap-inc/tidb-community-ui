import { Fetcher } from 'swr'
import { createContext } from 'react'

export interface SiteComponentsContextProps {
  fetchers: {
    // fetcher for accounts.pingcap.com/*
    accounts: Fetcher<any>

    // fetcher for asktug.com/*
    asktug: Fetcher<any>
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
  },
})

export default SiteComponentsContext
