import React from 'react'
import { MeData } from '../../datasource/accounts'
import { Menu } from 'antd'
import './style.less'
import { useUserProfileItems } from './hooks'

const UserProfileSubMenu = ({ me, ...props }: { me: MeData['data'] }) => {
  const items = useUserProfileItems(me)

  return <Menu.SubMenu title={me.username} {...props}>{items}</Menu.SubMenu>
}

export default UserProfileSubMenu
