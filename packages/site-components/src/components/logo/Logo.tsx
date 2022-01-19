import React, { useMemo } from 'react'
import { getSiteComponentsConfig } from '../../app-config'
import { getUrl, Site } from '../../utils/site'
import SiteLink from '../site-link/SiteLink'


const TidbCommunityLogo = (): JSX.Element => {
  return (
    <SiteLink className='ti-site-logo' site={Site.home} url='/' newWindow={false}>
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
    </SiteLink>
  )
}

export default TidbCommunityLogo
