import React, { useMemo } from 'react'
import { getSiteComponentsConfig } from '../../app-config'
import { getUrl, Site } from '../../utils/site'


const TidbCommunityLogo = (): JSX.Element => {
  const { url, canUseRouter } = useMemo(() => {
    const { site, env } = getSiteComponentsConfig()
    return getUrl(site, env, { site: Site.home, url: '/', newWindow: false })
  }, [])

  return useMemo(() => {
    const { wrapRouteLink } = getSiteComponentsConfig()
    const el = (
      <a className="ti-site-logo" href={url}>
        <img src="https://tidb.io/images/tidb-logo.svg" alt="TiDB Community Logo" />
        <span className="ti-site-logo__main">
          TiDB
        </span>
        <span className="ti-site-logo__splitter">
          |
        </span>
        <span className="ti-site-logo__sub">
          COMMUNITY
        </span>
      </a>
    )
    if (canUseRouter && wrapRouteLink) {
      return wrapRouteLink(undefined, url, el)
    } else {
      return el
    }
  }, [canUseRouter, url])


}

export default TidbCommunityLogo
