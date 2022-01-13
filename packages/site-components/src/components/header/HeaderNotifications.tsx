import React, { useMemo } from 'react'
import { Badge, List, Popover, Tabs } from 'antd'
import { getUrl, RouteToConfig, Site } from '../../utils/site'
import { getSiteComponentsConfig } from '../../app-config'
import { BellOutlined } from '@ant-design/icons'
import { useAsktugNotifications } from '../../datasource/asktug'
import { getContainer } from '../../utils/popup-container'
import DiscourseNotification from '../discourse-notification'

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

const HeaderNotifications = () => {
  const notifications = useAsktugNotifications({ recent: 1, limit: 10, silent: 1 })
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
              renderItem={(item) => <DiscourseNotification notification={item} wrap={el => <List.Item>{el}</List.Item>} />}
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
