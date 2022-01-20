import { useCallback, useContext, useMemo, useRef } from 'react'
import SiteComponentsContext from '../context/site-components-context'
import useSWR, { SWRResponse } from 'swr'
import useSWRInfinite from 'swr/infinite'

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
  created_at: '2021-08-23T07:11:25.000Z'
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

const collectNotifications = (notificationsSet: Notifications[] | undefined): AsktugNotification[] => {
  return notificationsSet?.reduce((all: AsktugNotification[], notifications) => all.concat(notifications?.notifications || []), []) || []
}

export const useAsktugUnreadNotifications = (): number => {
  const { fetchers: { asktug: fetcher } } = useContext(SiteComponentsContext)

  const { data } = useSWR<Notifications>(['asktug.readNotification', { unread: 1 }], { fetcher })

  return data?.total_rows_notifications ?? 0
}

export const useAsktugNotifications = (params: GetNotificationParams = {}): Omit<SWRResponse<AsktugNotification[]>, 'mutate'> & { markRead: (notificationId: number) => Promise<void>, loadMore: () => void, reset: () => void, isEnd: boolean } => {
  const { fetchers: { asktug: fetcher } } = useContext(SiteComponentsContext)

  delete params.recent

  const { size, setSize, mutate, error, isValidating, data } = useSWRInfinite<Notifications>(index => ['asktug.getNotifications', JSON.stringify({ offset: index * 60, ...params })], fetcher)

  const notifications: AsktugNotification[] = collectNotifications(data)

  const markRead = useCallback(async (notificationId: number) => {
    try {
      await mutate(notificationsSet => {
        for (let notifications of notificationsSet ?? []) {
          const notification = notifications?.notifications.find(notification => notification.id === notificationId)
          if (notification) {
            notification.read = true
          }
        }
        return notificationsSet
      }, false)
      await fetcher('asktug.readNotification', notificationId)
    } catch (e) {
      console.error('failed to mark notification read', e)
    }
  }, [fetcher, mutate])

  const loadMore = useCallback(() => {
    setSize(size => size + 1).then()
  }, [setSize])

  const reset = useCallback(() => {
    setSize(1).then()
  }, [setSize])

  const isEnd = (() => {
    if (isValidating) {
      return false
    }
    return (data?.[size - 1]?.total_rows_notifications ?? 0) <= notifications.length
  })()

  return { data: notifications, isValidating, error, loadMore, reset, markRead, isEnd }
}

export const useAsktugPrivateMessages = (params: GetNotificationParams = {}) => {
  const { fetchers: { asktug: fetcher } } = useContext(SiteComponentsContext)
  return useSWR<PrivateMessages>(['asktug.getPrivateMessages', JSON.stringify(params)], { fetcher })
}

export interface PrivateMessage {
  sender: string[]
  title: string
  slug: string
  id: number
}

export const usePrivateMessages = (params: GetNotificationParams = {}): PrivateMessage[] => {
  const { data } = useAsktugPrivateMessages()
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
