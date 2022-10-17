import React from 'react'
import { Responsive } from '@pingcap-inc/tidb-community-ui'
import { sections } from './footer-data'
import FooterSection from './FooterSection'
import FooterIcons from './FooterIcons'
import { headerBreakpoints } from '../header/constants'
import Header from '../header'

export interface FooterProps {
  copyright: string
  icp: React.ReactNode
  icpUrl: string
  beianNode: React.ReactNode
  beianUrl: string
}

const Footer = ({ copyright, icp, icpUrl, beianNode, beianUrl }: FooterProps) => {
  return (
    <Responsive breakpoints={headerBreakpoints}>
      <footer className="ti-site-footer">
        <div className="ti-site-footer__container">
          <ul className="ti-site-footer-sections">
            {sections.map(section => (
              <FooterSection {...section} />
            ))}
          </ul>
          <FooterIcons />
        </div>
        <div className='ti-site-footer__divider'/>
        <div className='ti-site-footer__copyright'>
          <span>
            { copyright }
          </span>
          <a href={icpUrl} target='_blank' rel='noreferrer'>
            { icp }
          </a>
          <a href={beianUrl} target='_blank' rel='noreferrer'>
            { beianNode }
          </a>
        </div>
      </footer>
    </Responsive>
  )
}

Header.displayName = 'TiSiteFooter'

export default Footer
