import {SidebarBlog} from '@pingcap-inc/tidb-community-site-components'
import React from 'react'

const SidebarBlogPreview = (props) => {
  return (
    <SidebarBlog {...props}/>
  )
}

export default {
  title: 'site/asktug/sidebar/SidebarBlog',
  component: SidebarBlogPreview
}

const Template = (args) => <SidebarBlogPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
}
