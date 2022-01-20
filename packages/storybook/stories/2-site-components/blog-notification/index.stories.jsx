import { BlogNotification } from '@pingcap-inc/tidb-community-site-components'
import { List } from 'antd'
import React from 'react'
import json from '../blog-notification.json'

export default {
  title: 'site/BlogNotification',
  component: BlogNotification
}

const Template = ({ notifications }) => (
  <List
    dataSource={notifications}
    renderItem={notification => <BlogNotification notification={notification} wrap={el => <List.Item>{el}</List.Item>} />}
  />
)

export const Preview = Template.bind({})

Preview.args = {
  notifications: json.content
}

