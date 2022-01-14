import { Fetcher } from 'swr'
import { stringify } from 'qs'

const ACCOUNTS_BASE = '/_/sso'

const processResponse = (res: Response) => {
  if (res.status >= 400) {
    return Promise.reject(res)
  } else {
    return res.json()
  }
}

const accounts: Fetcher = (key: string) => {
  switch (key) {
    case 'me':
      return fetch(`${ACCOUNTS_BASE}/api/me`).then(processResponse)
    default:
      throw new Error('not implemented')
  }
}

const asktug: Fetcher = (key: string, params) => {
  if (typeof params === 'string') {
    params = JSON.parse(params)
  }
  switch (key) {
    case 'asktug.getNotifications':
      return fetch(`/notifications?${stringify(params)}`, { headers: { accept: 'application/json' } }).then(processResponse)
    default:
      throw new Error('not implemented')
  }
}

export default {
  accounts, asktug
}
