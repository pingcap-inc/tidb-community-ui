import React from 'react'
import { AsktugNotification, BadgeData, GroupData, NotificationType, TopicData } from '../../datasource/asktug'
import { Space, Typography } from 'antd'
import renderTopicNotification from './types/topic'
import { EditOutlined, LikeOutlined, MailOutlined } from '@ant-design/icons'
import renderGrantBadge from './types/badge'
import renderPostApproved from './types/post-approved'
import renderGroupMessageSummary from './types/group-message-summary'
import classnames from 'classnames'

const DiscourseNotification = ({ notification, wrap }: { notification: AsktugNotification, wrap?: (el: JSX.Element) => JSX.Element }) => {
  let el: JSX.Element | undefined = undefined

  switch (notification.notification_type) {
    case NotificationType.mentioned:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, null, '在', '提及了我')
      break
    case NotificationType.replied:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, null, '回复了')
      break
    case NotificationType.quoted:
      break
    case NotificationType.edited:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, null, <EditOutlined />)
      break
    case NotificationType.liked:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, null, <LikeOutlined />)
      break
    case NotificationType.private_message:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <MailOutlined />, '：')
      break
    case NotificationType.invited_to_private_message:
      break
    case NotificationType.invitee_accepted:
      break
    case NotificationType.posted:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, null, '发布了')
      break
    case NotificationType.moved_post:
      break
    case NotificationType.linked:
      break
    case NotificationType.granted_badge:
      el = renderGrantBadge(notification as AsktugNotification<BadgeData>)
      break
    case NotificationType.invited_to_topic:
      break
    case NotificationType.custom:
      break
    case NotificationType.group_mentioned:
      break
    case NotificationType.group_message_summary:
      el = renderGroupMessageSummary(notification as AsktugNotification<GroupData>)
      break
    case NotificationType.watching_first_post:
      break
    case NotificationType.topic_reminder:
      break
    case NotificationType.liked_consolidated:
      break
    case NotificationType.post_approved:
      el = renderPostApproved(notification)
      break
    case NotificationType.code_review_commit_approved:
      break
  }

  if (el) {
    return React.cloneElement(wrap ? wrap(el) : el, { className: classnames('ti-asktug-notification', { 'ti-asktug-notification-read': notification.read }) })
  }

  return (
    <Space direction="vertical">
      <Typography.Text type="danger">{notification.notification_type} - ${NotificationType[notification.notification_type]}</Typography.Text>
      <pre>{JSON.stringify(notification, undefined, 2)}</pre>
    </Space>
  )
}

export default DiscourseNotification
