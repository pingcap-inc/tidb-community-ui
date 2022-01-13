import React, { cloneElement, useMemo } from 'react'
import { Badge, List, Popover, Tabs } from 'antd'
import { getUrl, RouteToConfig, Site } from '../../utils/site'
import { getSiteComponentsConfig } from '../../app-config'
import { BellOutlined } from '@ant-design/icons'
import { AsktugNotification, useAsktugNotifications } from '../../datasource/asktug'
import { getContainer } from '../../utils/popup-container'

const useButton = (icon: JSX.Element, config: RouteToConfig) => {
  return useMemo(() => {
    const { site, env, wrapRouteLink } = getSiteComponentsConfig()
    const { url, canUseRouter } = getUrl(site, env, config)
    let el = icon
    if (canUseRouter && wrapRouteLink) {
      el = wrapRouteLink(undefined, url, el)
    } else {
      el = <a href={url}>{el}</a>
    }
    return el
  }, [])
}

const NotificationLink = ({ notification }: { notification: AsktugNotification }) => {
  return useMemo(() => {
    const { site, env, wrapRouteLink } = getSiteComponentsConfig()
    const { url, canUseRouter } = getUrl(site, env, {
      site: Site.asktug,
      url: `/t/${notification.slug}/${notification.topic_id}`,
      newWindow: false
    })
    let el = (
      <span><b>{notification.data.display_username}</b>: {notification.fancy_title}</span>
    )
    if (canUseRouter && wrapRouteLink) {
      el = wrapRouteLink(undefined, url, el)
    } else {
      el = <a href={url}>{el}</a>
    }
    return cloneElement(el, { className: 'ti-header-notification' })
  }, [notification])
}

const HeaderNotifications = () => {
  const notifications = useAsktugNotifications({ unread: 1 })
  const btn = useButton(<BellOutlined />, {
    site: Site.home,
    url: '/notifications',
    newWindow: false,
  })
  return (
    <Popover
      className='ti-site-header-button'
      overlayClassName='ti-site-header-button-popover-overlay'
      getPopupContainer={getContainer}
      content={(
        <Tabs size='small'>
          <Tabs.TabPane tab='AskTUG'>
            <List
              size='small'
              dataSource={notifications.data?.notifications ?? []}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <NotificationLink notification={item}/>
                  </List.Item>
                )
              }}
            />
          </Tabs.TabPane>
        </Tabs>
      )}
    >
      <Badge dot={!!notifications.data?.total_rows_notifications}>
        {btn}
      </Badge>
    </Popover>
  )
}

export default HeaderNotifications
