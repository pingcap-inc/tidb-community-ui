import React from 'react'
import {Badge, List, Popover, Tabs} from 'antd'
import { Site } from '../../utils/site'
import {PrivateMessage, useArchiveMessages, usePrivateMessages, usePrivateMessagesUnread} from '../../datasource/asktug'
import { getContainer } from '../../utils/popup-container'
import { MailOutlined } from '@ant-design/icons'
import SiteLink from '../site-link/SiteLink'

const PrivateMessageLink = ({ privateMessage }: { privateMessage: PrivateMessage }) => {
  return (
    <SiteLink
      className="ti-header-privateMessage"
      site={Site.asktug}
      url={`/t/${privateMessage.slug}/${privateMessage.id}`}
      newWindow={false}
    >
      <b>{privateMessage.sender.join(', ')}</b>: {privateMessage.title}
    </SiteLink>
  )
}

const HeaderPrivateMessages = ({username}: {username: string}) => {
  const privateMessagesUnread = usePrivateMessagesUnread({username})
  const privateMessages = usePrivateMessages({username})
  const archiveMessages = useArchiveMessages({username})

  return (
    <Popover
      className="ti-site-header-button"
      overlayClassName="ti-site-header-button-popover-overlay"
      getPopupContainer={getContainer}
      placement='bottom'
      align={{offset: [0, 0]}}
      content={
          <Tabs size="small" className="ti-site-header-tabs">
              <Tabs.TabPane key="private" tabKey="private" tab={<Badge dot={privateMessagesUnread > 0}><span>论坛私信</span></Badge>}>
                  <List
                      size="small"
                      dataSource={privateMessages}
                      className="ti-site-header-private-messages-list"
                      locale={{ emptyText: '暂无消息' }}
                      renderItem={(privateMessage) => {
                          return (
                            <SiteLink
                              className="ti-header-privateMessage"
                              site={Site.asktug}
                              url={`/t/${privateMessage.slug}/${privateMessage.id}`}
                              newWindow={true}
                            >
                              <List.Item>
                                <b>{privateMessage.sender.join(', ')}</b>: {privateMessage.title}
                              </List.Item>
                            </SiteLink>
                          )
                      }}
                  />
              </Tabs.TabPane>
              <Tabs.TabPane key="archive" tabKey="archive" tab={'归档信息'}>
                  <List
                      size="small"
                      dataSource={archiveMessages}
                      className="ti-site-header-private-messages-list"
                      locale={{ emptyText: '暂无消息' }}
                      renderItem={(message) => {
                          return (
                            <SiteLink
                              className="ti-header-privateMessage"
                              site={Site.asktug}
                              url={`/t/${message.slug}/${message.id}`}
                              newWindow={true}
                            >
                              <List.Item>
                                <b>{message.sender.join(', ')}</b>: {message.title}
                              </List.Item>
                            </SiteLink>
                          )
                      }}
                  />
              </Tabs.TabPane>
          </Tabs>}
    >
      <Badge dot={privateMessagesUnread > 0}>
         <SiteLink site={Site.home} url="/private-messages" newWindow={false}>
          <MailOutlined />
        </SiteLink>
      </Badge>
    </Popover>
  )
}

export default HeaderPrivateMessages
