import React from 'react'
import {SidebarEvent} from '@pingcap-inc/tidb-community-site-components'

const SidebarEventPreview = (props) => {
  return <SidebarEvent {...props}/>
}

export default {
  title: 'site/asktug/sidebar/SidebarEvent',
  component: SidebarEventPreview
}

const Template = (args) => <SidebarEventPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
}

