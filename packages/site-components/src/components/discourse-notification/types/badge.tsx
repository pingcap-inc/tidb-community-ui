import React from 'react'
import { AsktugNotification, BadgeData } from '../../../datasource/asktug'
import { SafetyOutlined } from '@ant-design/icons'

export default function renderGrantBadge (notification: AsktugNotification<BadgeData>) {
  const url = `/badges/${notification.data.badge_id}/${notification.data.badge_slug}?username=${encodeURIComponent(notification.data.username)}`
  const el = <span><SafetyOutlined /> 您被授予徽章 「{notification.data.badge_name}」</span>
  return {el, url}
}
