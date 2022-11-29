import {SidebarWeeklyTalent} from '@pingcap-inc/tidb-community-site-components'
import React from 'react'

const SidebarWeeklyTalentPreview = (props) => {
  return (
    <SidebarWeeklyTalent {...props}/>
  )
}

export default {
  title: 'site/asktug/sidebar/SidebarWeeklyTalent',
  component: SidebarWeeklyTalentPreview
}

const Template = (args) => <SidebarWeeklyTalentPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
}

