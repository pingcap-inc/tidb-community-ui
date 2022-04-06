import React, {useMemo} from 'react'
import { MeData } from '../../datasource/accounts'
import {Avatar, Badge, Menu, Space} from 'antd'
import './style.less'
import { useUserProfileItems } from './hooks'

const UserProfileSubMenu = ({ me, ...props }: { me: MeData['data'] }) => {
  const items = useUserProfileItems(me)
  const showDot = useMemo(() => {
    return me?.org_invitations?.some((item) => item.valid) ?? false
  }, [me])

  return (
    <Menu.SubMenu
      title={(
        <Space size={8}>
          <Badge dot={showDot}>
            <Avatar src={me.avatar_url} size={24} />
          </Badge>
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
