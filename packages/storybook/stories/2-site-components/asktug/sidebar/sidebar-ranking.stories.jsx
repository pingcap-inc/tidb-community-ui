import {SidebarRanking, SiteComponentsContext} from '@pingcap-inc/tidb-community-site-components'
import React, {useCallback} from 'react'
import {sleep} from "../../../../utils";
import mockData from "./accountsPointTop.json";

const SidebarRankingPreview = (props) => {
  const accounts = useCallback(async (key, ...params) => {
    console.log('accounts: ', {key}, {params})
    await sleep()
    return new Promise((resolve, reject) => {
      if (key === 'accounts.points.top') {
        resolve(mockData)
      } else {
        reject()
      }
    })
  }, [])
  return (
    <SiteComponentsContext.Provider value={{ fetchers: { accounts } }}>
      <SidebarRanking {...props}/>
    </SiteComponentsContext.Provider>
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

