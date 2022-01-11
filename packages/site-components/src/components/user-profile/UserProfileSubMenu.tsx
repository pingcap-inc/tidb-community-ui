import React from 'react'
import { MeData } from '../../datasource/accounts'
import { Avatar, Menu, Space } from 'antd'
import './style.less'
import { useUserProfileItems } from './hooks'

const UserProfileSubMenu = ({ me, ...props }: { me: MeData['data'] }) => {
  const items = useUserProfileItems(me)

  return (
    <Menu.SubMenu
      title={(
        <Space size={8}>
          <Avatar src={me.avatar_url} size={24} />
          <span>{me.username}</span>
        </Space>
      )}
      {...props}
    >
      {items}
    </Menu.SubMenu>
  )
}

export default UserProfileSubMenu
