import { RouteToConfig } from './site'
import { Menu } from 'antd'
import React from 'react'
import SiteLink from '../components/site-link/SiteLink'

export interface NavItem {
  key: string
  title: string
  config?: RouteToConfig
  children?: NavItem[]
}


export function createMenuItem ({ key, title, config, children }: NavItem): JSX.Element {
  if (config) {
    return (
      <Menu.Item key={key}>
        <SiteLink {...config}>
          {title}
        </SiteLink>
      </Menu.Item>
    )
  } else if (children) {
    return (
      <Menu.SubMenu key={key} title={title}>
        {children.map(createMenuItem)}
      </Menu.SubMenu>
    )
  }

  return (
    <Menu.Item key={key}>{title}</Menu.Item>
  )
}
