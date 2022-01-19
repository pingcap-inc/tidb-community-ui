import { Env } from './env'

export enum Site {
  accounts,
  home,
  asktug,
  others,
}

export interface RouteToConfig {
  site: Site
  url: string
  newWindow: boolean
}

interface SiteConfig {
  baseUrl: Record<Env, string>
}

const siteConfig: Record<Site, SiteConfig> = {
  [Site.accounts]: {
    baseUrl: {
      [Env.prod]: 'https://accounts.pingcap.com',
      [Env.preview]: 'https://dev-accounts.pingcap.com',
      [Env.local]: 'https://dev-accounts.pingcap.com'
    },
  },
  [Site.home]: {
    baseUrl: {
      [Env.prod]: 'https://tidb.io',
      [Env.preview]: 'https://community-preview.tidb.io',
      [Env.local]: 'http://localhost:4000',
    },
  },
  [Site.asktug]: {
    baseUrl: {
      [Env.prod]: 'https://asktug.com',
      [Env.preview]: 'https://sso-test.asktug.com',
      [Env.local]: 'https://sso-test.asktug.com',
    },
  },
  [Site.others]: {
    baseUrl: {
      [Env.prod]: '',
      [Env.preview]: '',
      [Env.local]: '',
    },
  },
}

interface GetUrlResult {
  url: string
  canUseRouter: boolean
}

export function getUrl (site: Site, env: Env, config: RouteToConfig): GetUrlResult {
  if (site === config.site) {
    return {
      url: config.url,
      canUseRouter: !config.newWindow,
    }
  } else {
    return {
      url: siteConfig[config.site].baseUrl[env] + config.url,
      canUseRouter: false,
    }
  }
}
