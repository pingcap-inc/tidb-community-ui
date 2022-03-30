import React, { useCallback } from 'react';
import {
  BlogNotification as BlogNotificationType,
  NotificationType,
} from '../../datasource/blog';
import SiteLink from '../site-link';
import { Site } from '../../utils/site';
import {
  CommentOutlined,
  LikeOutlined,
  NotificationFilled, NotificationOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Space, Typography } from 'antd';
import classnames from 'classnames';

export interface BlogNotificationProps {
  notification: BlogNotificationType
  markRead?: (id: number) => void
  wrap?: (el: JSX.Element) => JSX.Element
}

const BlogNotification = ({ notification, markRead, wrap }: BlogNotificationProps) => {
  let el: JSX.Element | undefined = undefined
  switch (notification.type) {
    case NotificationType.COMMENT:
      el = (
        <span>
          <CommentOutlined />
          &nbsp;
          <b>{notification.actor.username}</b>
          &nbsp;
          在
          <SiteLink
            site={Site.home}
            url={`/blog/${notification.relatedPost.slug}`}
            newWindow={false}
          >
            {notification.relatedPost.title}
          </SiteLink>
          中评论了：{notification.relatedComment.content}
        </span>
      )
      break
    case NotificationType.FAVORITE:
      el = (
        <span>
          <StarOutlined />
          &nbsp;
          <b>{notification.actor.username}</b>
          &nbsp;
          收藏了
          <SiteLink
            site={Site.home}
            url={`/blog/posts/${notification.relatedPost.slug}`}
            newWindow={false}
          >
            {notification.relatedPost.title}
          </SiteLink>
        </span>
      )
      break
    case NotificationType.LIKE:
      el = (
        <span>
          <LikeOutlined />
          &nbsp;
          <b>{notification.actor.username}</b>
          &nbsp;
          点赞了
          {notification.relatedPost &&
          <SiteLink
            site={Site.home}
            url={`/blog/posts/${notification.relatedPost.slug}`}
            newWindow={false}
          >
            {notification.relatedPost.title}
          </SiteLink>
          }
        </span>
      )
      break
    case NotificationType.POST:
      el = (
        <span>
          <NotificationOutlined />
          &nbsp;
          <SiteLink
            site={Site.home}
            url={notification.target_url || ''}
            newWindow={false}
          >
            {notification.title}
          </SiteLink>
        </span>
      )
      break
  }

  const onClick = useCallback((event) => {
    if (!notification.haveRead) {
      markRead?.(notification.id)
    }
  }, [notification.haveRead, notification.id, markRead])

  if (el) {
    return React.cloneElement(wrap ? wrap(el) : el, {
      className: classnames('ti-blog-notification', { 'ti-blog-notification-read': notification.haveRead }),
      onClickCapture: onClick
    })
  }
  return (
    <Space direction="vertical">
      <Typography.Text type="danger">{notification.type}</Typography.Text>
      <pre>{JSON.stringify(notification, undefined, 2)}</pre>
    </Space>
  )
}

export default BlogNotification
