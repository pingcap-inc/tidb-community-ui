import React, { cloneElement, useMemo } from 'react'
import { Badge, List, Popover } from 'antd'
import { getUrl, RouteToConfig, Site } from '../../utils/site'
import { getSiteComponentsConfig } from '../../app-config'
import { PrivateMessage, usePrivateMessages } from '../../datasource/asktug'
import { getContainer } from '../../utils/popup-container'
import { MailOutlined } from '@ant-design/icons'

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

const PrivateMessageLink = ({ privateMessage }: { privateMessage: PrivateMessage }) => {
  return useMemo(() => {
    const { site, env, wrapRouteLink } = getSiteComponentsConfig()
    const { url, canUseRouter } = getUrl(site, env, {
      site: Site.asktug,
      url: `/t/${privateMessage.slug}/${privateMessage.id}`,
      newWindow: false,
    })
    let el = (
      <span><b>{privateMessage.sender.join(', ')}</b>: {privateMessage.title}</span>
    )
    if (canUseRouter && wrapRouteLink) {
      el = wrapRouteLink(undefined, url, el)
    } else {
      el = <a href={url}>{el}</a>
    }
    return cloneElement(el, { className: 'ti-header-privateMessage' })
  }, [privateMessage])
}

const HeaderPrivateMessages = () => {
  const privateMessages = usePrivateMessages({ unread: 1 })
  const btn = useButton(<MailOutlined />, {
    site: Site.home,
    url: '/privateMessages',
    newWindow: false,
  })
  return (
    <Popover
      className="ti-site-header-button"
      overlayClassName="ti-site-header-button-popover-overlay"
      getPopupContainer={getContainer}
      content={(
        <List
          size="small"
          dataSource={privateMessages}
          renderItem={(item) => {
            return (
              <List.Item>
                    <PrivateMessageLink privateMessage={item} />
                  </List.Item>
            )
          }}
        />
      )}
    >
      <Badge dot={!!privateMessages.length}>
        {btn}
      </Badge>
    </Popover>
  )
}

export default HeaderPrivateMessages
