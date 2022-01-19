import React, { cloneElement, FC, HTMLAttributes, PropsWithChildren, useMemo } from 'react'
import { getUrl, RouteToConfig } from '../../utils/site'
import { getSiteComponentsConfig } from '../../app-config'

/**
 * should use {@link defineSiteComponentsConfig} first to define current site. For example:
 *
 * ```jsx
 * <SiteLink
 *   site={Site.asktug}
 *   url='/t/topic/12345'
 *   newWindow={false}
 * >
 *   Topic title
 * </SiteLink>
 * ```
 *
 * @param targetSite target site (e.g. `Site.asktug`)
 * @param targetUrl site url (e.g. '/t/topic/12345'), will auto joined with hostname if target site is not current site
 * @param newWindow should open in new window, will try to use site router if false
 * @param children link content
 * @param attrs html attrs added to outer el
 *
 */
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
      el = wrapRouteLink(undefined, url, children)
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
