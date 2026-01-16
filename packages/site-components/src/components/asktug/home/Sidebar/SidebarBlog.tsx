import React from "react"

import './SidebarBlog.less'
import IconSvg from './blog-icon.svg'
import SidebarCard from "./SidebarCard";
import SiteLink from "../../../site-link";
import {Site} from "../../../../utils/site";
import {useBlogRecommend} from "../../../../datasource/blog";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

const SidebarBlog: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, ...rest} = props
  const {data, error, isValidating} = useBlogRecommend()
  const blogs = data?.content ?? []
  console.log({data})
  return (
    <div className={'asktug-sidebar-blog'}>
      <SidebarCard header={{start: (<>精选专栏 <IconSvg /></>), end: (<SiteLink site={Site.home} newWindow url={'/blog'}>更多 {'>'}</SiteLink>)}}>
        <ul>
          {blogs.slice(0, 10).map((value) => (
            <li key={value.id}>
              <SiteLink site={Site.home} newWindow url={`/blog/${value.slug}`}>{value.title}</SiteLink>
            </li>
          ))}
        </ul>
      </SidebarCard>
    </div>
  )
}

export default SidebarBlog
