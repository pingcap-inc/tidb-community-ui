import React from "react"
import {Space} from "antd";

import './Sidebar.less'
import SidebarProfile from "./SidebarProfile";
import SidebarBlog from "./SidebarBlog";
import SidebarEvent from "./SidebarEvent";
import SidebarRanking from "./SidebarRanking";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string
}

const Sidebar: React.FC<IProps> = (props) => {
  return (
    <Space className={'asktug-sidebar'} direction={'vertical'} size={12}>
      <SidebarProfile username={props.username} />
      <SidebarBlog />
      <SidebarEvent />
      <SidebarRanking />
    </Space>
  )
}

export default Sidebar
