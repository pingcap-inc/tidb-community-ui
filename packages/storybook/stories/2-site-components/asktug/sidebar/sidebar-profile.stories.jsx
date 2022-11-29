import {SidebarProfile} from '@pingcap-inc/tidb-community-site-components'
import React from 'react'

const SidebarProfilePreview = (props) => {
  // const myProps = {header: {start: 'title', end: 'more'}, body: 'body'}
  return (
    <SidebarProfile {...props}/>
  )
}

export default {
  title: 'site/asktug/sidebar/SidebarProfile',
  component: SidebarProfilePreview
}

const Template = (args) => <SidebarProfilePreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
  count: {
    post: 756,
    like: 756,
    article: 34,
    exp: 65739,
  },
  username: 'ShawnYan'
}

