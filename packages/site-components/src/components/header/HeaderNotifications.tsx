import React from 'react'
import { Badge, List, Popover, Tabs } from 'antd'
import { Site } from '../../utils/site'
import { BellOutlined } from '@ant-design/icons';
import {
  markRead,
  useAsktugAllNotifications,
  useAsktugUnreadNotifications
} from '../../datasource/asktug'
import { getContainer } from '../../utils/popup-container'
import DiscourseNotification from '../discourse-notification'
import SiteLink from '../site-link/SiteLink'
import { useBlogNotifications, useBlogNotificationsSummary } from '../../datasource/blog'
import BlogNotification from '../blog-notification'
import LoadMore from './LoadMore'

const HeaderNotifications = () => {
  const asktugCount = useAsktugUnreadNotifications()
  const { data: blogNotificationsSummary } = useBlogNotificationsSummary()

  const blogCount = (blogNotificationsSummary?.unreadCount ?? 0)
  const unread = asktugCount + blogCount

  return (
    <Popover
      className="ti-site-header-button"
      overlayClassName="ti-site-header-button-popover-overlay"
      getPopupContainer={getContainer}
      placement='bottom'
      align={{offset: [0, 0]}}
      content={(
        <Tabs size="small" className="ti-site-header-tabs">
          <Tabs.TabPane key="asktug" tabKey="asktug" tab={<Badge dot={asktugCount > 0}><span>AskTUG</span></Badge>}>
            <AsktugNotifications
              footer={(
                <SiteLink site={Site.home} url="/notifications?from=asktug" newWindow={false}>
                  <LoadMore />
                </SiteLink>
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="blog" tabKey="blog" tab={<Badge dot={blogCount > 0}><span>专栏</span></Badge>}>
            <BlogNotifications
              footer={(
                <SiteLink site={Site.home} url="/notifications?from=blog" newWindow={false}>
                  <LoadMore />
                </SiteLink>
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      )}
    >
      <Badge dot={unread > 0}>
        <SiteLink site={Site.home} url="/notifications" newWindow={false}>
          <BellOutlined />
        </SiteLink>
      </Badge>
    </Popover>
  )
}

const wrap = (el: JSX.Element) => <List.Item>{el}</List.Item>

const AsktugNotifications = ({ max = 12, footer }: { max?: number, footer: React.ReactNode }) => {
  const { data: notifications, error, isValidating, mutate } = useAsktugAllNotifications(max)
  const markReadHandler = async (notificationId: number) => {
    await markRead(notificationId)
    await mutate()
  }
  if (error) {
    console.error(error)
    return <p>服务异常</p>
  }
  return (
    <List
      size="small"
      loading={isValidating}
      dataSource={notifications?.notifications ?? []}
      renderItem={(item) => <DiscourseNotification markRead={markReadHandler} notification={item} wrap={wrap} />}
      footer={footer}
      locale={{ emptyText: '暂无消息' }}
    />
  )
}

const BlogNotifications = ({ max = 12, footer }: { max?: number, footer: React.ReactNode }) => {
  const { data: notifications, error, isValidating, markRead } = useBlogNotifications(max)
  if (error) {
    console.error(error)
    return <p>服务异常</p>
  }

  return (
    <List
      size="small"
      loading={isValidating}
      dataSource={notifications}
      renderItem={(item) => <BlogNotification notification={item} markRead={markRead} wrap={wrap} />}
      footer={footer}
      locale={{ emptyText: '暂无消息' }}
    />
  )
}

export default HeaderNotifications
