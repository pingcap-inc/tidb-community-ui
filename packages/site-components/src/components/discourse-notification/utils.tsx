import { getSiteComponentsConfig } from '../../app-config'
import { getUrl, Site } from '../../utils/site'
import React from 'react'

export function getLink (rawUrl: string, title: string): JSX.Element {
  const { site, env, wrapRouteLink } = getSiteComponentsConfig()
  const { url, canUseRouter } = getUrl(site, env, {
    site: Site.asktug,
    url: rawUrl,
    newWindow: false,
  })

  let el = <a href={url}>{title}</a>

  if (canUseRouter && wrapRouteLink) {
    el = wrapRouteLink(undefined, url, el)
  }

  return el
}
