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

const tryJson = (data: string): object | string => {
  const trimmedData = data.trim()
  try {
    const json = JSON.parse(trimmedData)
    if (typeof json === 'object') {
      return json
    } else {
      return data
    }
  } catch (e) {
    return data
  }
}

const asktug: Fetcher = (key: string, params) => {
  if (typeof params === 'string') {
    params = tryJson(params)
  }
  switch (key) {
    case 'asktug.getNotifications':
      return fetch(`/notifications?${stringify(params)}`, { headers: { accept: 'application/json' } }).then(processResponse)
    case 'asktug.readNotification':
      return fetch(`/notifications/mark-read`, { method: 'put', headers: { accept: 'application/json' }, body: JSON.stringify({ id: params }) }).then(processResponse)
    default:
      throw new Error('not implemented')
  }
}

export default {
  accounts, asktug
}
