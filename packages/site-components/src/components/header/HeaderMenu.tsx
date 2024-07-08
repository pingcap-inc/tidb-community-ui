import React from 'react'
import { Menu, Space } from 'antd';
import { navItems } from './menu-items'
import { createMenuItem } from '../../utils/nav-item'
import { CaretDownFilled, LoadingOutlined, MenuOutlined } from '@ant-design/icons';
import { AntWrapper, Responsive, SwrData } from '@pingcap-inc/tidb-community-ui'
import { useMeData } from '../../datasource/accounts'
import { HeaderBreakpoint } from './constants'
import { UserProfileSubMenu } from '../user-profile'
import { getContainer } from '../../utils/popup-container'


const HeaderMenu = ({ style }: { style?: React.CSSProperties }): JSX.Element => {
  const meData = useMeData()

  return (
    <Menu
      className="ti-site-header-menu"
      style={style}
      mode="horizontal"
      getPopupContainer={getContainer}
      overflowedIndicator={
        <Space size={2}>其他<CaretDownFilled style={{fontSize: 8, color: '#A0A0A0', marginRight: -6}} /></Space>
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
