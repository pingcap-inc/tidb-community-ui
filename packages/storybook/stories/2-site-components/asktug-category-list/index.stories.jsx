import {CategoryList, SiteComponentsContext} from '@pingcap-inc/tidb-community-site-components'
import React from 'react'

const AsktugCategoryListPreview = ({}) => {
  return (
    <SiteComponentsContext.Provider value={{ fetchers: { accounts, asktug, blog } }}>
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

