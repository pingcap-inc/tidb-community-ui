import React, { useCallback } from 'react'
import { AsktugNotification, BadgeData, CustomData, GroupData, LikedConsolidatedData, NotificationType, TopicData } from '../../datasource/asktug'
import { Space, Typography } from 'antd'
import renderTopicNotification from './types/topic'
import Icon, { CommentOutlined, EditOutlined, LikeOutlined, LinkOutlined, MailOutlined } from '@ant-design/icons'
import renderGrantBadge from './types/badge'
import renderPostApproved from './types/post-approved'
import renderGroupMessageSummary from './types/group-message-summary'
import classnames from 'classnames'
import { LuxonDuration } from '@pingcap-inc/tidb-community-ui'
import MentionedSvg from './icons/mentioned.svg'
import QuoteSvg from './icons/quote.svg'
import renderCustom from './types/custom'
import renderLikedConsolidated from './types/liked-consolidated'
import {getLink} from "./utils";

export interface DiscourseNotificationProps {
  notification: AsktugNotification
  wrap?: (el: JSX.Element) => JSX.Element
  markRead?: (notificationId: number) => Promise<void>
}

interface IRender {
  el: JSX.Element
  url?: string
}

const DiscourseNotification = ({ notification, wrap, markRead }: DiscourseNotificationProps) => {
  let result: IRender | undefined = undefined

  switch (notification.notification_type) {
    case NotificationType.mentioned:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <Icon component={MentionedSvg}/>, '在', '提及了您')
      break
    case NotificationType.replied:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <CommentOutlined />, '回复了')
      break
    case NotificationType.quoted:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <Icon component={QuoteSvg}/>, '在', '引用了您的内容')
      break
    case NotificationType.edited:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <EditOutlined />, '编辑了')
      break
    case NotificationType.liked:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <LikeOutlined />, '喜欢了')
      break
    case NotificationType.private_message:
    case NotificationType.invited_to_private_message:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <MailOutlined />)
      break
    case NotificationType.invitee_accepted:
      break
    case NotificationType.posted:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <CommentOutlined />, '回复了')
      break
    case NotificationType.moved_post:
      break
    case NotificationType.linked:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <LinkOutlined />, '在', '链接了您的帖子')
      break
    case NotificationType.granted_badge:
      result = renderGrantBadge(notification as AsktugNotification<BadgeData>)
      break
    case NotificationType.invited_to_topic:
      break
    case NotificationType.custom:
      result = renderCustom(notification as AsktugNotification<CustomData>)
      break
    case NotificationType.group_mentioned:
      break
    case NotificationType.group_message_summary:
      result = renderGroupMessageSummary(notification as AsktugNotification<GroupData>)
      break
    case NotificationType.watching_first_post:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>, <LinkOutlined />, '首次发布了', '')
      break
    case NotificationType.topic_reminder:
      break
    case NotificationType.liked_consolidated:
      result = renderLikedConsolidated(notification as AsktugNotification<LikedConsolidatedData>)
      break
    case NotificationType.post_approved:
      result = renderPostApproved(notification)
      break
    case NotificationType.watching_category_or_tag:
      result = renderTopicNotification(notification as AsktugNotification<TopicData>)
      break
    default:
      console.warn('unsupported notifications: ', JSON.stringify(notification, undefined, 2))
  }

  let el, url = result?.url ?? '#'

  const onClick = useCallback((event) => {
    if (!notification.read) {
      markRead?.(notification.id)
    }
  }, [notification.read, notification.id, markRead])

  if (result?.el) {
    el = <span>{result?.el}&nbsp;&nbsp;<LuxonDuration className='ti-asktug-notification__time' from={notification.created_at} suffix='前'/></span>
    const element = React.cloneElement(wrap ? wrap(el) : el, {
      className: classnames('ti-asktug-notification', { 'ti-asktug-notification-read': notification.read }),
      onClickCapture: onClick
    })
    return getLink(url, element)
  }

  if (Object.keys(notification.data).length !== 0) {
    const node = (
      <Space direction="vertical">
        <Typography.Text type="danger" onClick={onClick}>{notification.notification_type} - ${NotificationType[notification.notification_type]}</Typography.Text>
        <pre>{JSON.stringify(notification, undefined, 2)}</pre>
      </Space>
    )

    return getLink(url, node)
  }

  console.warn('unknown notification type: ', notification)
  return null
}

DiscourseNotification.displayName = 'TiSiteDiscourseNotification'

export default DiscourseNotification
