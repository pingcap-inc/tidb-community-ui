import {SidebarRanking} from '@pingcap-inc/tidb-community-site-components'
import React from 'react'

const SidebarRankingPreview = (props) => {
  return (
    <SidebarRanking {...props}/>
  )
}

export default {
  title: 'site/asktug/sidebar/SidebarRanking',
  component: SidebarRankingPreview
}

const Template = (args) => <SidebarRankingPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
}

