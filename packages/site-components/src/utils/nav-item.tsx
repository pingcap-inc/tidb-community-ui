import { RouteToConfig } from './site'
import {Badge, Menu, Space} from 'antd'
import React from 'react'
import SiteLink from '../components/site-link/SiteLink'
import {DownOutlined} from "@ant-design/icons";

export interface NavItem {
  key: string
  title: string
  config?: RouteToConfig
  children?: NavItem[]
  badge?: boolean
  level?: number
}

export function createMenuItem ({ key, title, config, children, badge, level }: NavItem): JSX.Element {
  const intLevel = level ?? 0
  let wrapped: React.ReactNode = title
  if (badge) {
    wrapped = <Badge dot>{title}</Badge>
  }
  if (config) {
    return (
      <Menu.Item key={key}>
        <SiteLink {...config}>
          {wrapped}
        </SiteLink>
      </Menu.Item>
    )
  } else if (children && children.length > 0) {
    return (
      <Menu.SubMenu key={key} title={<Space>{wrapped}{intLevel === 0 && <DownOutlined style={{color: '#A0A0A0'}} />}</Space>} popupOffset={[0, 20]}>
        {children.map((value) => createMenuItem({...value, level: intLevel + 1}))}
      </Menu.SubMenu>
    )
  }

  return (
    <Menu.Item key={key}>{wrapped}</Menu.Item>
  )
}
