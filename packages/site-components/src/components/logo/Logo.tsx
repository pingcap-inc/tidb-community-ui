import React from 'react'
import { Site } from '../../utils/site'
import SiteLink from '../site-link/SiteLink'
import Logo from './logo.svg'


const TidbCommunityLogo = (): JSX.Element => {
  return (
    <SiteLink className='ti-site-logo' site={Site.home} url='/' newWindow={false}>
        <Logo />
    </SiteLink>
  )
}

export default TidbCommunityLogo
