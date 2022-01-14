import { getSiteComponentsConfig } from '../app-config'
import { getUrl, Site } from './site'

export function login () {
  const { site, env } = getSiteComponentsConfig()
  getUrl(site, env, {
    site: Site.accounts,
    url: `/login?redirect_to=${encodeURIComponent(location.href)}`,
    newWindow: false,
  })
}

export function logout () {
  const { site, env } = getSiteComponentsConfig()
  getUrl(site, env, {
    site: Site.accounts,
    url: `/logout?redirect_to=${encodeURIComponent(location.href)}`,
    newWindow: false,
  })
}
