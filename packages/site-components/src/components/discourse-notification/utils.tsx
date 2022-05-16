import { Site } from '../../utils/site'
import React from 'react'
import SiteLink from '../site-link/SiteLink'

export function getLink (rawUrl: string, children: React.ReactNode): JSX.Element {
  return (
    <SiteLink site={Site.asktug} url={rawUrl} newWindow={true}>
      {children}
    </SiteLink>
  )
}
