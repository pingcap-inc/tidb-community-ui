import React from 'react'
import { AsktugNotification } from '../../../datasource/asktug'
import { getLink } from '../utils'
import { CheckCircleOutlined } from '@ant-design/icons'

export default function renderPostApproved (notification: AsktugNotification) {
  const el = getLink(`/t/${notification.slug}/${notification.topic_id}`, '帖子')
  return <span><CheckCircleOutlined /> 你的{el}已审核通过</span>
}
