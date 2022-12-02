import {SidebarEvent, SiteComponentsContext} from '@pingcap-inc/tidb-community-site-components'
import React, {useCallback} from 'react'
import {sleep} from "../../../../utils";
import mockData from "./homeEvents.json";

const SidebarEventPreview = (props) => {
  const home = useCallback(async (key, ...params) => {
    console.log('accounts: ', {key}, {params})
    await sleep()
    return new Promise((resolve, reject) => {
      if (key === 'home.events') {
        resolve(mockData)
      } else {
        reject()
      }
    })
  }, [])
  return (
    <SiteComponentsContext.Provider value={{ fetchers: { home } }}>
      <SidebarEvent {...props}/>
    </SiteComponentsContext.Provider>
  )
}

export default {
  title: 'site/asktug/sidebar/SidebarEvent',
  component: SidebarEventPreview
}

const Template = (args) => <SidebarEventPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
}

