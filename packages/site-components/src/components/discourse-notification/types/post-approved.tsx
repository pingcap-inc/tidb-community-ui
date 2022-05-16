import React from 'react'
import { AsktugNotification } from '../../../datasource/asktug'
import { CheckCircleOutlined } from '@ant-design/icons'

export default function renderPostApproved (notification: AsktugNotification) {
  const url = `/t/${notification.slug}/${notification.topic_id}`
  const el = <span><CheckCircleOutlined /> 你的{'帖子'}已审核通过</span>
  return {el, url}
}
