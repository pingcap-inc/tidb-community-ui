import { useContext } from 'react'
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
}

export interface BlogNotificationsParams {
  page: number
}

export function useBlogNotifications (params: BlogNotificationsParams): SWRResponse<SpringPage<BlogNotification>> {
  const { fetchers: { blog: fetcher } } = useContext(SiteComponentsContext)

  return useSWR(['blog.getNotifications', params], { fetcher })
}

export interface BlogNotificationsSummary {
  unreadCount: number
  newCount: number
}

export function useBlogNotificationsSummary (): SWRResponse<BlogNotificationsSummary> {
  const { fetchers: { blog: fetcher } } = useContext(SiteComponentsContext)

  return useSWR(['blog.getNotificationsSummary'], { fetcher })
}
