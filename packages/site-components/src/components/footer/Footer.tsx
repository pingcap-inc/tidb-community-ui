import React from 'react'
import { Responsive } from '@pingcap-inc/tidb-community-ui'
import { sections } from './footer-data'
import FooterSection from './FooterSection'
import FooterIcons from './FooterIcons'
import { headerBreakpoints } from '../header/constants'
import Logo from '../logo'
import Header from '../header'

const Footer = () => {
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
          {/*<div className='ti-site-footer-logo'>*/}
          {/*  <Logo />*/}
          {/*</div>*/}
        </div>
      </footer>
    </Responsive>
  )
}

Header.displayName = 'TiSiteFooter'

export default Footer
