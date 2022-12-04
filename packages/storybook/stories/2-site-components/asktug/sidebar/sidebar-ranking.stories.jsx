import React from 'react'
import {SidebarRanking} from '@pingcap-inc/tidb-community-site-components'

const SidebarRankingPreview = (props) => {
  return <SidebarRanking {...props}/>
}

export default {
  title: 'site/asktug/sidebar/SidebarRanking',
  component: SidebarRankingPreview
}

const Template = (args) => <SidebarRankingPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
}

