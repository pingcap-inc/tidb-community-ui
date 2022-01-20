import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Badge, List, Popover, Spin, Tabs } from 'antd'
import { Site } from '../../utils/site'
import { BellOutlined, LoadingOutlined } from '@ant-design/icons'
import { useAsktugNotifications, useAsktugUnreadNotifications } from '../../datasource/asktug'
import { getContainer } from '../../utils/popup-container'
import DiscourseNotification from '../discourse-notification'
import InfiniteScroll from 'react-infinite-scroll-component'
import SiteLink from '../site-link/SiteLink'
import { BlogNotification as BlogNotificationType, useBlogNotifications, useBlogNotificationsSummary } from '../../datasource/blog'
import BlogNotification from '../blog-notification'

const loadingIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

const HeaderNotifications = () => {
  const asktugCount = useAsktugUnreadNotifications()
  const { data: blogNotificationsSummary } = useBlogNotificationsSummary()

  const unread = asktugCount + (blogNotificationsSummary?.unreadCount ?? 0)

  return (
    <Popover
      className="ti-site-header-button"
      overlayClassName="ti-site-header-button-popover-overlay"
      getPopupContainer={getContainer}
      content={(
        <Tabs size="small">
          <Tabs.TabPane key="asktug" tab="AskTUG">
            <AsktugNotifications />
          </Tabs.TabPane>
          <Tabs.TabPane key="blog" tab="专栏">
            <BlogNotifications />
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

const loading = <div style={{ padding: 8, textAlign: 'center' }}><Spin spinning indicator={loadingIcon} /></div>
const wrap = (el: JSX.Element) => <List.Item>{el}</List.Item>

const AsktugNotifications = () => {
  const { data: notifications, isEnd, loadMore, markRead } = useAsktugNotifications({})

  return (
    <div id="ti-header-asktug-notifications-scroll-target">
      <InfiniteScroll
        next={loadMore}
        hasMore={!isEnd}
        loader={loading}
        dataLength={notifications?.length ?? 0}
        scrollableTarget="ti-header-asktug-notifications-scroll-target"
      >
        <List
          size="small"
          dataSource={notifications ?? []}
          renderItem={(item) => <DiscourseNotification markRead={markRead} notification={item} wrap={wrap} />}
        />
      </InfiniteScroll>
    </div>
  )
}

const BlogNotifications = () => {
  const [page, setPage] = useState(1)
  const { data, mutate, error, isValidating } = useBlogNotifications({ page })
  const [notifications, setNotifications] = useState<BlogNotificationType[]>([])
  const markRead = useCallback((id: number) => {
    setNotifications(notifications => notifications.map(notification => {
      if (notification.id === id) {
        notification.haveRead = true
      }
      return notification
    }))
  }, [setNotifications])

  useEffect(() => {
    if (data && !error && !isValidating) {
      if (data.page.number === page) {
        setNotifications(notifications => notifications.concat(data.content))
      }
    }
  }, [page, data, error, isValidating])

  const isEnd = useMemo(() => {
    if (data && !isValidating && !error) {
      return data.page.totalPages >= page
    } else {
      return false
    }
  }, [page, data, isValidating, error])

  const loadMore = useCallback(() => {
    if (!isValidating) {
      if (error) {
        console.log(error)
        mutate().then()
      }
      if (!isEnd) {
        setPage(page => page + 1)
      }
    }
  }, [page, mutate, isEnd, error, isValidating])


  return (
    <div id="ti-header-asktug-notifications-scroll-target">
      <InfiniteScroll
        next={loadMore}
        hasMore={!isEnd}
        loader={loading}
        dataLength={notifications.length}
      >
        <List
          size="small"
          dataSource={notifications}
          renderItem={(item) => <BlogNotification notification={item} markRead={markRead} wrap={wrap} />}
        />
      </InfiniteScroll>
    </div>
  )
}

export default HeaderNotifications
