import { RouteToConfig } from './site'
import {Badge, Menu} from 'antd'
import React from 'react'
import SiteLink from '../components/site-link/SiteLink'

export interface NavItem {
  key: string
  title: string
  config?: RouteToConfig
  children?: NavItem[]
  badge?: boolean
}

export function createMenuItem ({ key, title, config, children, badge }: NavItem): JSX.Element {
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
  } else if (children) {
    return (
      <Menu.SubMenu key={key} title={wrapped} popupOffset={[0, 20]}>
        {children.map(createMenuItem)}
      </Menu.SubMenu>
    )
  }

  return (
    <Menu.Item key={key}>{wrapped}</Menu.Item>
  )
}
