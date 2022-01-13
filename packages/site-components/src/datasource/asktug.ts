import { useContext } from 'react'
import SiteComponentsContext from '../context/site-components-context'
import useSWR from 'swr'

export enum NotificationType {
  mentioned = 1,
  replied = 2,
  quoted = 3,
  edited = 4,
  liked = 5,
  private_message = 6,
  invited_to_private_message = 7,
  invitee_accepted = 8,
  posted = 9,
  moved_post = 10,
  linked = 11,
  granted_badge = 12,
  invited_to_topic = 13,
  custom = 14,
  group_mentioned = 15,
  group_message_summary = 16,
  watching_first_post = 17,
  topic_reminder = 18,
  liked_consolidated = 19,
  post_approved = 20,
  code_review_commit_approved = 21
}

export interface AsktugNotification {
  id: number
  notification_type: NotificationType
  read: boolean
  created_at: '2021-08-23T07:11:25.000Z'
  post_number: number
  topic_id: number
  fancy_title: string
  slug: string
  data: {
    topic_title: string
    original_post_id: number
    original_post_type: number
    original_username: string
    revision_number: null | number
    display_username: string
  }
}

export interface Notifications {
  notifications: AsktugNotification[]
  total_rows_notifications: number
  seen_notification_id: number
  load_more_notifications: string
}

export interface GetNotificationParams {
  unread?: 1
}

export const useAsktugNotifications = (params: GetNotificationParams) => {
  const { fetchers: { asktug: fetcher } } = useContext(SiteComponentsContext)
  return useSWR<Notifications>(['asktug.getNotifications', JSON.stringify(params)], { fetcher })
}
