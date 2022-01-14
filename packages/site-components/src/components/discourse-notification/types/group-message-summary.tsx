import React from 'react'
import { AsktugNotification, GroupData } from '../../../datasource/asktug'
import { getLink } from '../utils'
import { InboxOutlined } from '@ant-design/icons'

export default function renderGroupMessageSummary(notification: AsktugNotification<GroupData>) {
  const el = getLink(`/u/${notification.data.username}/messages/group/${encodeURIComponent(notification.data.group_name)}`, notification.data.group_name)

  return <span><InboxOutlined /> {notification.data.inbox_count} 条私信在{el}组的收件箱中</span>
}
