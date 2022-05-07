import React from 'react'
import { AsktugNotification, GroupData } from '../../../datasource/asktug'
import { InboxOutlined } from '@ant-design/icons'

export default function renderGroupMessageSummary(notification: AsktugNotification<GroupData>) {
  const url = `/u/${notification.data.username}/messages/group/${encodeURIComponent(notification.data.group_name)}`
  const el = <span><InboxOutlined /> {notification.data.inbox_count} 条私信在{notification.data.group_name}组的收件箱中</span>
  return {el, url}
}
