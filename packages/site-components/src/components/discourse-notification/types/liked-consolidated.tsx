import React from 'react'
import { AsktugNotification, LikedConsolidatedData } from '../../../datasource/asktug'
import { LikeOutlined } from '@ant-design/icons'

export default function renderLikedConsolidated (notification: AsktugNotification<LikedConsolidatedData>) {
  const el = <span><LikeOutlined /> <b>{notification.data.display_username}</b>给您送出了 {notification.data.count} 个赞</span>
  return {el}
}
