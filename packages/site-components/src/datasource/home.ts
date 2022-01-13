import { useAsktugNotifications } from './asktug'

export type CommonHeaderData = {
  notifications: number | boolean
  privateMessages: number | boolean
}

/**
 * @deprecated
 */
export const useCommonHeaderData = (): CommonHeaderData => {
  const { data: asktugNotifications } = useAsktugNotifications({ unread: 1 })
  return {
    notifications: !!(asktugNotifications?.total_rows_notifications ?? 0),
    privateMessages: false,
  }
}
