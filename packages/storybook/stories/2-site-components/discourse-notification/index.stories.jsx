import { DiscourseNotification } from '@pingcap-inc/tidb-community-site-components'
import { List } from 'antd'
import React from 'react'
import json from '../asktug-notification.json'

export default {
  title: 'site/DiscourseNotification',
  component: DiscourseNotification
}

const Template = ({ notifications }) => (
  <List
    dataSource={notifications}
    renderItem={notification => <DiscourseNotification notification={notification} wrap={el => <List.Item>{el}</List.Item>} />}
  />
)

export const Preview = Template.bind({})

Preview.args = {
  notifications: json.notifications
}

