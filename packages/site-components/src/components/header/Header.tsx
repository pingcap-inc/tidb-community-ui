import React from 'react'
import TidbCommunityLogo from '../logo'
import HeaderMenu from './HeaderMenu'
import Search from '../search'
import Space from './Space'
import HeaderUserSlot from './HeaderUserSlot'
import { Responsive, SwrData } from '@pingcap-inc/tidb-community-ui'
import LoginButton from './LoginButton'
import { useMeData } from '../../datasource/accounts'
import { Skeleton } from 'antd'
import { HeaderBreakpoint, headerBreakpoints } from './constants'
import HeaderNotifications from './HeaderNotifications'
import HeaderPrivateMessages from './HeaderPrivateMessages'


const Header = (): JSX.Element => {
  const meData = useMeData()

  return (
    <Responsive breakpoints={headerBreakpoints}>
      <header className="ti-site-header">
        <div className="ti-site-header__container">
          <TidbCommunityLogo />
           <Space size="lg" />

          <Responsive.Breakpoint<HeaderBreakpoint> md lg xl>
            <Search style={{ flex: 1 }} />
            <Space size="sm" />
          </Responsive.Breakpoint>

          <Responsive.Breakpoint<HeaderBreakpoint> xxs>
            <div style={{ flex: 999 }} />
            <SwrData
              data={meData}
              initializing={<Skeleton.Button size="small" active />}
              fallback={<LoginButton className="ant-btn-xs" />}
            >
              <>
                <HeaderNotifications />
                <HeaderPrivateMessages />
              </>
            </SwrData>
          </Responsive.Breakpoint>

          <HeaderMenu style={{ flex: 2 }} />

          <Space size="sm" />

          <Responsive.Breakpoint<HeaderBreakpoint> not xxs>
            <HeaderUserSlot />
          </Responsive.Breakpoint>
        </div>
      </header>
    </Responsive>
  )
}

Header.displayName = 'TiSiteHeader'

export default Header
