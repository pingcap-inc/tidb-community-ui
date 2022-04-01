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
        </div>
        <div className='ti-site-footer__divider'/>
        <div className='ti-site-footer__copyright'>
          <span>
            ©2021 TiDB Community.
          </span>
          <a href='https://beian.miit.gov.cn/' target='_blank' rel='noreferrer'>
            京ICP备16046278号-4
          </a>
          <a href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035239' target='_blank' rel='noreferrer'>
            京公网安备11010802035239号
          </a>
        </div>
      </footer>
    </Responsive>
  )
}

Header.displayName = 'TiSiteFooter'

export default Footer
