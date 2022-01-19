import { Site } from '../../utils/site'
import React from 'react'
import SiteLink from '../site-link/SiteLink'

export function getLink (rawUrl: string, title: string): JSX.Element {
  return (
    <SiteLink site={Site.asktug} url={rawUrl} newWindow={false}>
      {title}
    </SiteLink>
  )
}
