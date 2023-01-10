import React from 'react'
import {CategoryList} from '@pingcap-inc/tidb-community-site-components'

const AsktugCategoryListPreview = ({}) => {
  return (
    <div style={{maxWidth: 640}}>
      <CategoryList />
    </div>
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

