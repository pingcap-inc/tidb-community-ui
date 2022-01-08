import { getUrl, RouteToConfig } from './site'
import { getSiteComponentsConfig } from '../app-config'
import { Menu } from 'antd'
import React from 'react'

export interface NavItem {
  key: string
  title: string
  config?: RouteToConfig
  children?: NavItem[]
}


export function createMenuItem ({ key, title, config, children }: NavItem): JSX.Element {
  const { site, env, wrapRouteLink } = getSiteComponentsConfig()

  if (config) {
    const { url, canUseRouter } = getUrl(site, env, config)
    if (canUseRouter && wrapRouteLink) {
      return wrapRouteLink(key, url, (
        <Menu.Item>
          {title}
        </Menu.Item>
      ))
    } else {
      return (
        <Menu.Item key={key}>
          <a href={url} target={config.newWindow ? '_blank' : undefined} rel={config.newWindow ? 'noreferrer' : undefined}>
            {title}
          </a>
        </Menu.Item>
      )
    }
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
