import React from 'react'
import { AsktugNotification, BadgeData } from '../../../datasource/asktug'
import { getLink } from '../utils'

export default function renderGrantBadge (notification: AsktugNotification<BadgeData>) {
  const el = getLink(`/badges/${notification.data.badge_id}/${notification.data.badge_slug}?username=${encodeURIComponent(notification.data.username)}`, notification.data.badge_name)

  return <span>您被授予徽章 「{el}」</span>
}
