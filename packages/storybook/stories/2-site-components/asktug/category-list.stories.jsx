import {CategoryList, SiteComponentsContext} from '@pingcap-inc/tidb-community-site-components'
import React, {useCallback} from 'react'
import mockData from './site.json'
import {sleep} from "../../../utils";

const AsktugCategoryListPreview = ({}) => {
  const asktug = useCallback(async (key, ...params) => {
    console.log('asktug: ', {key}, {params})
    await sleep()
    return new Promise((resolve, reject) => {
      if (key === 'asktug.site') {
        resolve(mockData)
      } else {
        reject()
      }
    })
  }, [])
  return (
    <SiteComponentsContext.Provider value={{ fetchers: { asktug } }}>
      <CategoryList />
    </SiteComponentsContext.Provider>
  )
}

export default {
  title: 'site/asktug/CategoryList',
  component: AsktugCategoryListPreview
}

const Template = (args) => <AsktugCategoryListPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
}

