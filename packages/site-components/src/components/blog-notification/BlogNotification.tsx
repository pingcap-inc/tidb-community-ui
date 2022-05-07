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
  let url: string = '#'
  switch (notification.type) {
    case NotificationType.COMMENT:
      url = `/blog/${notification.relatedPost.slug}`
      el = (
        <span>
          <CommentOutlined />
          &nbsp;
          <b>{notification.actor.username}</b>
          &nbsp;
          在
          {notification.relatedPost.title}
          中评论了：{notification.relatedComment.content}
        </span>
      )
      break
    case NotificationType.FAVORITE:
      url = `/blog/${notification.relatedPost.slug}`
      el = (
        <span>
          <StarOutlined />
          &nbsp;
          <b>{notification.actor.username}</b>
          &nbsp;
          收藏了
          {notification.relatedPost.title}
        </span>
      )
      break
    case NotificationType.LIKE:
      url = `/blog/${notification.relatedPost.slug}`
      el = (
        <span>
          <LikeOutlined />
          &nbsp;
          <b>{notification.actor.username}</b>
          &nbsp;
          点赞了
          {notification.relatedPost && (<>{notification.relatedPost.title}</>)}
        </span>
      )
      break
    case NotificationType.POST:
      url = notification.target_url ?? ''
      el = (
        <span>
          <NotificationOutlined />
          &nbsp;
          {notification.title}
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
    const element = React.cloneElement(wrap ? wrap(el) : el, {
      className: classnames('ti-blog-notification', { 'ti-blog-notification-read': notification.haveRead }),
      onClickCapture: onClick
    })
    return (
      <SiteLink
        site={Site.home}
        url={url}
        newWindow={true}
      >
        {element}
      </SiteLink>
    )
  }
  return (
    <SiteLink
      site={Site.home}
      url={url}
      newWindow={true}
    >
      <Space direction="vertical">
        <Typography.Text type="danger">{notification.type}</Typography.Text>
        <pre>{JSON.stringify(notification, undefined, 2)}</pre>
      </Space>
    </SiteLink>
  )
}

export default BlogNotification
