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
      [Env.prod]: 'https://pingkai.cn/accounts',
      [Env.preview]: 'https://community.pingkai.cn/accounts',
      [Env.local]: 'https://community.pingkai.cn/accounts'
    },
  },
  [Site.home]: {
    baseUrl: {
      [Env.prod]: 'https://pingkai.cn/tidbcommunity',
      [Env.preview]: 'https://community.pingkai.cn/tidbcommunity',
      [Env.local]: 'http://localhost:4000',
    },
  },
  [Site.asktug]: {
    baseUrl: {
      [Env.prod]: 'https://pingkai.cn/tidbcommunity/forum',
      [Env.preview]: 'https://community.pingkai.cn/tidbcommunity/forum',
      [Env.local]: 'https://community.pingkai.cn/tidbcommunity/forum',
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
  if (site === Site.asktug) {
    return {
      url: `/tidbcommunity/forum${config.url}`,
      canUseRouter: !config.newWindow,
    }
  }
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
