import React, {useEffect, useState} from "react"
import axios from "axios";

import './SidebarWeeklyTalent.less'
import SidebarCard from "./SidebarCard";
import SiteLink from "../../../site-link";
import {Site} from "../../../../utils/site";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

export interface IBlog {
  id: number // 929,
  slug: string // "eb3cb609",
  status: string // "PUBLISHED",
  origin: string // "ORIGINAL",
  title: string // "什么是分布式数据库？我不信，看完这篇你还不懂!",
  summary: string // "自从互联网进入了 web2.0 时代以来，数据库作为核心的底层基础设施软件也经历了蓬勃的发展期，从早期的单机关系型数据库到NoSQL 再到如今的 NewSQL，数据库领域不管是技术还是场景都发生...",
}

const getBlogs = async (): Promise<IBlog[]> => {
  const url = 'http://localhost:3300/blog/api/posts/recommend'
  const response = await axios.get(url)
  return response.data.content
}

const SidebarWeeklyTalent: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, ...rest} = props
  const [blogs, setBlogs] = useState<IBlog[]>([])
  useEffect(() => {
    getBlogs().then(setBlogs)
  }, [])
  return (
    <div className={'asktug-sidebar-event'}>
      <SidebarCard header={{start: '本周达人', end: (<SiteLink site={Site.asktug} newWindow url={'/x/ranking'}>更多 {'>'}</SiteLink>)}}>
        <ul>
          {blogs.map((value) => (
            <li key={value.id}>
              <SiteLink site={Site.home} newWindow url={`/event`}>{value.title}</SiteLink>
            </li>
          ))}
        </ul>
      </SidebarCard>
    </div>
  )
}

export default SidebarWeeklyTalent