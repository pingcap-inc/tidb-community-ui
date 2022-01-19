import React from 'react'
import { Badge, List, Popover, Spin, Tabs } from 'antd'
import { Site } from '../../utils/site'
import { BellOutlined, LoadingOutlined } from '@ant-design/icons'
import { useAsktugNotifications } from '../../datasource/asktug'
import { getContainer } from '../../utils/popup-container'
import DiscourseNotification from '../discourse-notification'
import InfiniteScroll from 'react-infinite-scroll-component'
import SiteLink from '../site-link/SiteLink'

const loadingIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

const HeaderNotifications = () => {
  const { data: notifications, isEnd, loadMore, markRead } = useAsktugNotifications({})

  return (
    <Popover
      className="ti-site-header-button"
      overlayClassName="ti-site-header-button-popover-overlay"
      getPopupContainer={getContainer}
      content={(
        <Tabs size="small">
          <Tabs.TabPane tab="AskTUG">
            <div id="ti-header-asktug-notifications-scroll-target">
              <InfiniteScroll
                next={loadMore}
                hasMore={!isEnd}
                loader={<div style={{ padding: 8, textAlign: 'center' }}><Spin spinning indicator={loadingIcon} /></div>}
                dataLength={notifications?.length ?? 0}
                scrollableTarget="ti-header-asktug-notifications-scroll-target"
              >
                <List
                  size="small"
                  dataSource={notifications ?? []}
                  renderItem={(item) => <DiscourseNotification markRead={markRead} notification={item} wrap={el => <List.Item>{el}</List.Item>} />}
                />
              </InfiniteScroll>
            </div>
          </Tabs.TabPane>
        </Tabs>
      )}
    >
      <Badge dot={!!notifications?.reduce((unread, notification) => unread + (notification.read ? 0 : 1), 0)}>
        <SiteLink site={Site.home} url='/notifications' newWindow={false}>
          <BellOutlined />
        </SiteLink>
      </Badge>
    </Popover>
  )
}

export default HeaderNotifications
