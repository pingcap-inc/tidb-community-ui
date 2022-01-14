import { Fetcher } from 'swr'
import { stringify } from 'qs'

const ACCOUNTS_BASE = '/_/sso'

const processResponse = (res: Response) => {
  if (process.env.NODE_ENV !== 'production') {
    console.debug('fetch [%s %s] %s: %o', res.status, res.statusText, res.url, res)
  }
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
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
