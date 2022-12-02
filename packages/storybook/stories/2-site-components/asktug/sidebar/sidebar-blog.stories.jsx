import {SidebarBlog, SiteComponentsContext} from '@pingcap-inc/tidb-community-site-components'
import React, {useCallback} from 'react'
import mockData from "./blogRecommend.json";
import {sleep} from "../../../../utils";

const SidebarBlogPreview = (props) => {
  const blog = useCallback(async (key, ...params) => {
    console.log('blog: ', {key}, {params})
    await sleep()
    return new Promise((resolve, reject) => {
      if (key === 'blog.getRecommend') {
        resolve(mockData)
      } else {
        reject()
      }
    })
  }, [])
  return (
    <SiteComponentsContext.Provider value={{ fetchers: { blog } }}>
      <SidebarBlog {...props}/>
    </SiteComponentsContext.Provider>
  )
}

export default {
  title: 'site/asktug/sidebar/SidebarBlog',
  component: SidebarBlogPreview
}

const Template = (args) => <SidebarBlogPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
}

