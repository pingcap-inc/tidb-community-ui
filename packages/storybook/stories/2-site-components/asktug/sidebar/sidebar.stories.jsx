import React from 'react'
import {Sidebar} from '@pingcap-inc/tidb-community-site-components'

const SidebarPreview = (props) => {
  return (
    <Sidebar {...props}/>
  )
}

export default {
  title: 'site/asktug/sidebar/Sidebar',
  component: SidebarPreview
}

const Template = (args) => <SidebarPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
  username: 'cw1997',
}

