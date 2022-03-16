import { useCallback, useContext } from 'react'
import SiteComponentsContext from '../context/site-components-context'
import useSWR, { SWRResponse } from 'swr'

export enum NotificationType {
  POST = 'POST',
  COMMENT = 'COMMENT',
  LIKE = 'LIKE',
  FAVORITE = 'FAVORITE'
}

export interface SpringPage<T> {
  content: T[]
  page: {
    number: number
    size: number
    totalElements: number
    totalPages: number
  }
}

export interface BlogUser {
  id: number
  username: string
  name: string
  avatarURL: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
}

export interface BlogComment {
  id: string
  content: string
  replyComment: string
  commenter: BlogUser
}

export interface BlogNotification {
  id: number
  type: NotificationType
  title: string
  haveRead: boolean
  target_url: string
  recipient: BlogUser
  actor: BlogUser
  relatedPost: BlogPost
  relatedComment: BlogComment
  createdAt: string
}

export interface BlogNotificationsParams {
  page: number
  size: number
  haveRead: boolean
  sort: string
}

export const useBlogNotifications = (max: number = 12): SWRResponse<BlogNotification[]> & { markRead: (notificationId: number) => Promise<void> } => {
  const { fetchers: { blog: fetcher } } = useContext(SiteComponentsContext)

  const combinedFetcher = useCallback(async (max) => {
    const params: BlogNotificationsParams = { page: 1, size: max, haveRead: false, sort: "desc" }
    const unread: BlogNotification[] = (await fetcher('blog.getNotifications', params)).content
    if (unread.length >= max) {
      return unread.slice(0, max)
    } else {
      const restSize = max - unread.length
      params.haveRead = true
      params.size = restSize
      const read: BlogNotification[] = (await fetcher('blog.getNotifications', params)).content
      return unread.concat(read.filter(n => n.haveRead).slice(0, restSize))
    }
  }, ['blog', fetcher])

  const notifications = useSWR<BlogNotification[]>([max, 'blog'], { fetcher: combinedFetcher })

  const { mutate } = notifications

  const markRead = useCallback(async (notificationId: number) => {
    fetcher('blog.readNotification', notificationId)
    await mutate(notifications => {
      if (!notifications) {
        return
      }
      const i = notifications.findIndex(notification => notification.id === notificationId && !notification.haveRead)
      if (i < 0) {
        // no change
        return notifications
      }

      // create a new array
      notifications = [...notifications]

      // find the marking notification
      const [theNotification] = notifications.splice(i, 1)
      theNotification.haveRead = true

      // find the first which was read and created less than the notification
      const ui = notifications.findIndex(notification => notification.haveRead && notification.createdAt < theNotification.createdAt)
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

export interface BlogNotificationsSummary {
  unreadCount: number
  newCount: number
}

export function useBlogNotificationsSummary (): SWRResponse<BlogNotificationsSummary> {
  const { fetchers: { blog: fetcher } } = useContext(SiteComponentsContext)

  return useSWR(['blog.getNotificationsSummary'], { fetcher })
}
