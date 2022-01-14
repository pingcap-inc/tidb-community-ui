import React from 'react'
import { AsktugNotification, TopicData } from '../../../datasource/asktug'
import { getLink } from '../utils'

export default function renderTopicNotification (notification: AsktugNotification<TopicData>, prefix?: React.ReactNode, infix?: React.ReactNode, suffix?: React.ReactNode) {
  const el = getLink(`/t/${notification.slug}/${notification.topic_id}/${notification.post_number}`, notification.data.topic_title)

  return <span>{prefix} <b>{notification.data.display_username}</b> {infix} {el} {suffix}</span>
}
