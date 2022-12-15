import React from "react"
import {Space} from "antd";
import useSWR from "swr";

import './Sidebar.less'
import SidebarProfile from "./SidebarProfile";
import SidebarBlog from "./SidebarBlog";
import SidebarEvent from "./SidebarEvent";
import SidebarRanking from "./SidebarRanking";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Sidebar: React.FC<IProps> = (props) => {
  const {data, error, isValidating} = useSWR('/_/sso/api/asktug-me', async () => {
    const data = await fetch('/_/sso/api/asktug-me')
    return data.json()
  })
  if (error) console.error(error)
  return (
    <Space className={'asktug-sidebar'} direction={'vertical'} size={12}>
      {error == null && data?.data && (
        <SidebarProfile username={data.data.username} />
      )}
      <SidebarBlog />
      <SidebarEvent />
      <SidebarRanking username={data.data.username} />
    </Space>
  )
}

export default Sidebar
