import {SidebarCard} from '@pingcap-inc/tidb-community-site-components'
import React from 'react'

const SidebarCardPreview = (props) => {
  // const myProps = {header: {start: 'title', end: 'more'}, body: 'body'}
  return (
    <SidebarCard {...props}/>
  )
}

export default {
  title: 'site/asktug/sidebar/SidebarCard',
  component: SidebarCardPreview
}

const Template = (args) => <SidebarCardPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
  header: {start: 'title', end: 'more'}, body: 'body'
}

