import React from "react"
import {Space} from "antd";

import './Sidebar.less'
import SidebarProfile from "./SidebarProfile";
import SidebarBlog from "./SidebarBlog";
import SidebarEvent from "./SidebarEvent";
import SidebarRanking from "./SidebarRanking";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Sidebar: React.FC<IProps> = (props) => {
  return (
    <Space className={'asktug-sidebar'} direction={'vertical'} size={12}>
      <SidebarProfile count={{
        post: 756,
        like: 756,
        article: 34,
        exp: 65739,
      }} username={'ShawnYan'} />
      <SidebarBlog />
      <SidebarEvent />
      <SidebarRanking />
    </Space>
  )
}

export default Sidebar
