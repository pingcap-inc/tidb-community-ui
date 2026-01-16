import React from 'react'
import {SidebarProfile} from '@pingcap-inc/tidb-community-site-components'

const SidebarProfilePreview = (props) => {
  return <SidebarProfile {...props}/>
}

export default {
  title: 'site/asktug/sidebar/SidebarProfile',
  component: SidebarProfilePreview
}

const Template = (args) => <SidebarProfilePreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
  username: 'ShawnYan'
}

