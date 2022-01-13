import { Fetcher } from 'swr'
import {stringify} from 'qs'

const ACCOUNTS_BASE = '/_/sso'

const accounts: Fetcher = (key: string) => {
  switch (key) {
    case 'me':
      return fetch(`${ACCOUNTS_BASE}/api/me`).then(res => res.json())
    default:
      throw new Error('not implemented')
  }
}

const asktug: Fetcher = (key: string, params) => {
  console.log(key, params)
  if (typeof params === 'string') {
    params = JSON.parse(params)
  }
  switch (key) {
    case 'asktug.getNotifications':
      return fetch(`/notifications?${stringify(params)}`, { headers: { accept: 'application/json'}}).then(res => res.json())
  }
}

export default {
  accounts, asktug
}
