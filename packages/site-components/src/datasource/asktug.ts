import { useCallback, useContext, useMemo, useRef } from 'react'
import SiteComponentsContext from '../context/site-components-context'
import useSWR, { SWRResponse } from 'swr'

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

export interface AsktugNotification<Data extends AsktugNotificationData = AsktugNotificationData> {
  id: number
  notification_type: NotificationType
  read: boolean
  created_at: string
  post_number: number
  topic_id?: number
  fancy_title?: string
  slug?: string
  data: Data
}

export interface AsktugNotificationData {
}

export interface TopicBasicData extends AsktugNotificationData {
  topic_title: string
  display_username: string
}

export interface TopicData extends TopicBasicData {
  original_post_id: number
  original_post_type: number
  original_username: string
  revision_number: null | number
}

export interface BadgeData extends AsktugNotificationData {
  badge_id: number,
  badge_name: string,
  badge_slug: string,
  badge_title: string,
  username: string
}

export interface GroupData extends AsktugNotificationData {
  group_id: number
  group_name: string
  inbox_count: number
  username: string
}

export interface CustomData extends TopicBasicData {
  message: string
}

export interface LikedConsolidatedData extends AsktugNotificationData {
  username: string
  display_username: string
  count: number
}

export interface Notifications {
  notifications: AsktugNotification[]
  total_rows_notifications: number
  seen_notification_id: number
  load_more_notifications: string
}

export interface GetNotificationParams {
  unread?: 1
  limit?: number
  recent?: 1
  silent?: 1
}

export interface GetPrivateMessagesParams {
  username: string;
  unread?: 1;
  recent?: 1;
}

export interface AsktugPrivateMessage {
  id: number
  slug: string
  fancy_title: string
  posters: {
    user_id: number
  }[]
}

export interface AsktugUser {
  id: number
  username: string
  is_verified: boolean
}

export interface PrivateMessages {
  users: AsktugUser[]
  topic_list: {
    per_page: number
    topics: AsktugPrivateMessage[]
  }
}

export interface GetPrivateMessagesParams {
  unread?: 1
}

export const useAsktugUnreadNotifications = (): number => {
  const { fetchers: { asktug: fetcher } } = useContext(SiteComponentsContext)

  const { data } = useSWR<Notifications>(['asktug.getNotifications', { unread: 1, recent: 1, limit: 1 }], { fetcher })

  return data?.notifications.length ?? 0
}

export const useAsktugNotifications = (max: number = 12): SWRResponse<AsktugNotification[]> & { markRead: (notificationId: number) => Promise<void> } => {
  const { fetchers: { asktug: fetcher } } = useContext(SiteComponentsContext)

  const combinedFetcher = useCallback(async (max) => {
    const params: GetNotificationParams = { recent: 1, limit: max }
    params.unread = 1
    const unread: AsktugNotification[] = (await fetcher('asktug.getNotifications', params)).notifications
    if (unread.length >= max) {
      return unread.slice(0, max)
    } else {
      params.unread = undefined
      const read: AsktugNotification[] = (await fetcher('asktug.getNotifications', params)).notifications
      return unread.concat(read.filter(n => n.read).slice(0, max - unread.length))
    }
  }, ['asktug', fetcher])

  const notifications = useSWR<AsktugNotification[]>([max, 'asktug'], { fetcher: combinedFetcher })

  const { mutate } = notifications

  const markRead = useCallback(async (notificationId: number) => {
    fetcher('asktug.readNotification', notificationId)
    await mutate(notifications => {
      if (!notifications) {
        return
      }
      const i = notifications.findIndex(notification => notification.id === notificationId && !notification.read)
      if (i < 0) {
        // no change
        return notifications
      }

      // create a new array
      notifications = [...notifications]

      // find the marking notification
      const [theNotification] = notifications.splice(i, 1)
      theNotification.read = true

      // find the first which was read and created less than the notification
      const ui = notifications.findIndex(notification => notification.read && notification.created_at < theNotification.created_at)
      if (ui === -1) {
        // the notification is oldest, add to tail
        notifications.push(theNotification)
      } else {
        // insert the notification to proper position
        notifications.splice(ui, 0, theNotification)
      }

      return notifications
    }, { revalidate: false })
  }, [fetcher, mutate])

  return { ...notifications, markRead }
}



export const useAsktugPrivateMessages = (params: GetPrivateMessagesParams, extra: string = '') => {
  const { fetchers: { asktug: fetcher } } = useContext(SiteComponentsContext)
  params.recent = 1
  return useSWR<PrivateMessages>([`asktug.getPrivateMessages${extra}`, JSON.stringify(params)], { fetcher })
}

export interface PrivateMessage {
  sender: string[]
  title: string
  slug: string
  id: number
}

export const usePrivateMessages = (params: GetPrivateMessagesParams): PrivateMessage[] => {
  const { data } = useAsktugPrivateMessages(params)
  const mappedUsers = useRef<Map<number, AsktugUser>>()

  return useMemo(() => {
    if (!mappedUsers.current) {
      mappedUsers.current = new Map()
    }

    for (const user of data?.users ?? []) {
      mappedUsers.current!.set(user.id, user)
    }

    return data?.topic_list.topics.map(topic => {
      return {
        sender: topic.posters.map(poster => mappedUsers.current!.get(poster.user_id)?.username ?? 'unknown'),
        title: topic.fancy_title,
        slug: topic.slug,
        id: topic.id
      }
    }) ?? []
  }, [data])
}

export const usePrivateMessagesUnread = (params: GetPrivateMessagesParams): number => {
  const { data } = useAsktugPrivateMessages(params, 'Unread')

  return useMemo(() => {
    return data?.topic_list?.topics?.length ?? 0
  }, [data])
}
