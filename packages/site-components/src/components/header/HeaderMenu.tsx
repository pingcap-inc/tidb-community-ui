import React from 'react'
import { Menu } from 'antd'
import { navItems } from './menu-items'
import { createMenuItem } from '../../utils/nav-item'
import { LoadingOutlined, MenuOutlined } from '@ant-design/icons'
import { AntWrapper, Responsive, SwrData } from '@pingcap-inc/tidb-community-ui'
import { useMeData } from '../../datasource/accounts'
import { HeaderBreakpoint } from './constants'
import { UserProfileSubMenu } from '../user-profile'


const HeaderMenu = ({ style }: { style?: React.CSSProperties }): JSX.Element => {
  const meData = useMeData()

  return (
    <Menu
      className="ti-site-header-menu"
      style={style}
      mode="horizontal"
      overflowedIndicator={
        <MenuOutlined />
      }>
      <AntWrapper>
        {props => (
          <Responsive.Breakpoint<HeaderBreakpoint> xxs>
            <SwrData
              data={meData}
              initializing={<Menu.Item disabled {...props}><LoadingOutlined /></Menu.Item>}
              fallback={<Menu.Item disabled {...props}>未登录</Menu.Item>}
            >
              {(data) => <UserProfileSubMenu me={data.data} {...props} />}
            </SwrData>
            <Menu.Divider {...props} />
          </Responsive.Breakpoint>
        )}
      </AntWrapper>
      {navItems.map(createMenuItem)}
    </Menu>
  )
}

export default HeaderMenu
