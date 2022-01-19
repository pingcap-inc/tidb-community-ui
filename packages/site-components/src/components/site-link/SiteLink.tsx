import React, { cloneElement, FC, HTMLAttributes, PropsWithChildren, useMemo } from 'react'
import { getUrl, RouteToConfig } from '../../utils/site'
import { getSiteComponentsConfig } from '../../app-config'


const SiteLink: FC<PropsWithChildren<RouteToConfig> & HTMLAttributes<HTMLElement>> = ({ site: targetSite, url: targetUrl, newWindow, children, ...attrs }) => {
  return useMemo(() => {
    const { site, env, wrapRouteLink } = getSiteComponentsConfig()
    const { url, canUseRouter } = getUrl(site, env, {
      site: targetSite,
      url: targetUrl,
      newWindow
    })

    let el: JSX.Element
    if (canUseRouter && wrapRouteLink) {
      el = wrapRouteLink(undefined, url, <>{children}</>)
    } else {
      if (newWindow) {
        el = <a href={url} rel='noreferrer' target='_blank'>{children}</a>
      } else {
        el = <a href={url}>{children}</a>
      }
    }

    return cloneElement(el, attrs)
  }, [targetSite, targetUrl, newWindow])
}

SiteLink.displayName = 'TiSiteLink'

export default SiteLink
