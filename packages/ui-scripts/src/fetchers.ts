import {Fetcher} from 'swr'
import {stringify} from 'qs'

let ACCOUNTS_BASE = '/_/sso'
let BLOG_BASE = '/_/blog'
let ASKTUG_BASE = ''
let HOME_BASE = 'https://tidb.net'

declare global {
  interface Window {
    __tidb_community_ui_url_base?: string
  }
}

export const getPreviewUrlBase = (): string | undefined => {
  if (typeof window === 'undefined') {
    if (typeof process !== 'undefined') {
      return process.env.TIDB_COMMUNITY_UI_URL_BASE
    }
  } else {
    return window.__tidb_community_ui_url_base
  }
}

export const setFetcherUrlBase = (base: string) => {
  base = getPreviewUrlBase() ?? base
  ACCOUNTS_BASE = base + '/_/sso'
  BLOG_BASE = base + '/_/blog'
  ASKTUG_BASE = base + '/_/_asktug'
}

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

const meUrl = (() => {
  if (typeof window === 'undefined') {
    return '/api/me'
  }
  if (/asktug/.test(window.location.hostname) && !/search/.test(window.location.hostname)) {
    return '/api/asktug-me'
  } else {
    return '/api/me'
  }
})()

const accounts: Fetcher = (key: string) => {
  switch (key) {
    case 'me':
      return fetch(`${ACCOUNTS_BASE}${meUrl}`, { credentials: 'include' }).then(processResponse)
    case 'accounts.points.me':
      return fetch(`${ACCOUNTS_BASE}/api/points/me`, { credentials: 'include' }).then(processResponse)
    case 'accounts.points.top':
      return fetch(`${ACCOUNTS_BASE}/api/points/top`, { credentials: 'include' }).then(processResponse)
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

const asktug: Fetcher = (key: string, params: any) => {
  if (typeof params === 'string') {
    params = tryJson(params)
  }
  switch (key) {
    case 'asktug.getNotifications':
      return fetch(`${ASKTUG_BASE}/notifications?${stringify(params)}`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'asktug.readNotification':
      return fetch(`${ASKTUG_BASE}/notifications/mark-read?${stringify({ id: params, ...getAsktugCsrf() })}`, { method: 'put', headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'asktug.getArchiveMessages':
      // @ts-ignore
      return fetch(`${ASKTUG_BASE}/topics/private-messages-group/${params.username}/%E6%89%80%E6%9C%89%E4%BA%BA/archive.json`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'asktug.getPrivateMessages':
      // @ts-ignore
      return fetch(`${ASKTUG_BASE}/topics/private-messages/${params.username}`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'asktug.getPrivateMessagesUnread':
      // @ts-ignore
      return fetch(`${ASKTUG_BASE}/topics/private-messages-unread/${params.username}`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'asktug.getPrivateMessagesSent':
      // @ts-ignore
      return fetch(`${ASKTUG_BASE}/topics/private-messages-sent/${params.username}`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'asktug.site':
      // @ts-ignore
      return fetch(`${ASKTUG_BASE}/site.json`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'asktug.badges':
      // @ts-ignore
      return fetch(`${ASKTUG_BASE}/badges.json`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'asktug.user.summary':
      // @ts-ignore
      return fetch(`${ASKTUG_BASE}/u/${params.username}/summary`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    default:
      throw new Error('not implemented')
  }
}

const blog: Fetcher = (key: string, params: any) => {
  if (typeof params === 'string') {
    params = tryJson(params)
  }
  switch (key) {
    case 'blog.getNotifications':
      return fetch(`${BLOG_BASE}/api/notifications?${stringify(params)}`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'blog.getNotificationsSummary':
      return fetch(`${BLOG_BASE}/api/notifications/summary`, { headers: { accept: 'application/json' }, credentials: 'include' }).then(processResponse)
    case 'blog.readNotification':
      return fetch(`${BLOG_BASE}/api/notifications/${params}/read`, { method: 'PATCH', credentials: 'include' })
    case 'blog.getRecommend':
      return fetch(`${BLOG_BASE}/api/posts/recommend`, {})
    case 'blog.users.posts':
      return fetch(`${BLOG_BASE}/blog/api/users/username/${params.username}/posts`, {})
    default:
      throw new Error('not implemented')
  }
}

const home: Fetcher = (key: string, params: any) => {
  if (typeof params === 'string') {
    params = tryJson(params)
  }
  switch (key) {
    case 'home.events':
      return fetch(`${HOME_BASE}/next-api/cms/tidbio-homepage-main-activities`, {})
    default:
      throw new Error('not implemented')
  }
}

const getAsktugCsrf = () => {
  const param = (document.querySelector('meta[name=csrf-param]') as HTMLMetaElement)?.content
  const token = (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content

  return (param && token) ? {
    [param]: token,
  } : {}
}

export default {
  accounts, asktug, blog, home
}
