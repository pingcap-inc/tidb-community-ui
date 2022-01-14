import { getSiteComponentsConfig } from '../app-config'
import { getUrl, Site } from './site'

export function login () {
  const { site, env } = getSiteComponentsConfig()
  const { url } = getUrl(site, env, {
    site: Site.accounts,
    url: `/login?redirect_to=${encodeURIComponent(location.href)}`,
    newWindow: false,
  })

  location.href = url
}

export function logout () {
  const { site, env } = getSiteComponentsConfig()
  const { url } = getUrl(site, env, {
    site: Site.accounts,
    url: `/logout?redirect_to=${encodeURIComponent(location.href)}`,
    newWindow: false,
  })

  location.href = url
}
