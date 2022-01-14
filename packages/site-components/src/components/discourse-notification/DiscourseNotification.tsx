import React from 'react'
import { AsktugNotification, BadgeData, GroupData, NotificationType, TopicData } from '../../datasource/asktug'
import { Space, Typography } from 'antd'
import renderTopicNotification from './types/topic'
import Icon, { CommentOutlined, EditOutlined, LikeOutlined, LinkOutlined, MailOutlined, SendOutlined } from '@ant-design/icons'
import renderGrantBadge from './types/badge'
import renderPostApproved from './types/post-approved'
import renderGroupMessageSummary from './types/group-message-summary'
import classnames from 'classnames'
import { LuxonDuration } from '@pingcap-inc/tidb-community-ui'
import MentionedSvg from './icons/mentioned.svg'
import QuoteSvg from './icons/quote.svg'

const DiscourseNotification = ({ notification, wrap }: { notification: AsktugNotification, wrap?: (el: JSX.Element) => JSX.Element }) => {
  let el: JSX.Element | undefined = undefined

  switch (notification.notification_type) {
    case NotificationType.mentioned:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <Icon component={MentionedSvg}/>, '在', '提及了您')
      break
    case NotificationType.replied:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <CommentOutlined />, '回复了')
      break
    case NotificationType.quoted:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <Icon component={QuoteSvg}/>, '在', '引用了您的内容')
      break
    case NotificationType.edited:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <EditOutlined />, '编辑了')
      break
    case NotificationType.liked:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <LikeOutlined />, '喜欢了')
      break
    case NotificationType.private_message:
    case NotificationType.invited_to_private_message:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <MailOutlined />, '：')
      break
    case NotificationType.invitee_accepted:
      break
    case NotificationType.posted:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <SendOutlined />)
      break
    case NotificationType.moved_post:
      break
    case NotificationType.linked:
      el = renderTopicNotification(notification as AsktugNotification<TopicData>, <LinkOutlined />, '在', '链接了您的帖子')
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
    el = <span>{el}&nbsp;-&nbsp;<LuxonDuration from={notification.created_at} />前</span>
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
