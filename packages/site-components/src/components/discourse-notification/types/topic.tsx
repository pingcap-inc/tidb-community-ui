import React from 'react'
import { AsktugNotification, TopicBasicData } from '../../../datasource/asktug'

export default function renderTopicNotification (notification: AsktugNotification<TopicBasicData>, prefix?: React.ReactNode, infix?: React.ReactNode, suffix?: React.ReactNode) {
  const url = `/t/${notification.slug}/${notification.topic_id}/${notification.post_number}`
  const el = <span>{prefix} <b>{notification.data.display_username}</b> {infix} {notification.data.topic_title} {suffix}</span>
  return {el, url}
}
