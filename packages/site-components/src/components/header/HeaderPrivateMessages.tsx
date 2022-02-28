import React from 'react'
import { Badge, List, Popover } from 'antd'
import { Site } from '../../utils/site'
import { PrivateMessage, usePrivateMessages } from '../../datasource/asktug'
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
  const privateMessages = usePrivateMessages({username})

  return (
    <Popover
      className="ti-site-header-button"
      overlayClassName="ti-site-header-button-popover-overlay"
      getPopupContainer={getContainer}
      content={(
        <List
          size="small"
          dataSource={privateMessages}
          className="ti-site-header-private-messages-list"
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
         <SiteLink site={Site.home} url="/private-messages" newWindow={false}>
          <MailOutlined />
        </SiteLink>
      </Badge>
    </Popover>
  )
}

export default HeaderPrivateMessages
