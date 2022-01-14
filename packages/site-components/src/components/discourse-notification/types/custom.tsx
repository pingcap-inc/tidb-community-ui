import { AsktugNotification, CustomData, TopicData } from '../../../datasource/asktug'
import renderTopicNotification from './topic'


export default function renderCustom (notification: AsktugNotification<CustomData>) {
  switch (notification.data.message) {
    case 'solved.accepted_notification':
      return renderTopicNotification(notification, null, '标记', '已解决')
    default:
      return renderTopicNotification(notification, notification.data.message)
  }
}
