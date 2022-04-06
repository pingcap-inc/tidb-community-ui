import React, {useMemo} from 'react'
import { MeData } from '../../datasource/accounts'
import {Avatar, Badge, Dropdown, Menu} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './style.less'
import { useUserProfileItems } from './hooks'
import { getContainer } from '../../utils/popup-container'

const UserProfileDropdown = ({ me }: { me: MeData['data'] }) => {
  const items = useUserProfileItems(me)
  const showDot = useMemo(() => {
    return me?.org_invitations?.some((item) => item.valid) ?? false
  }, [me])

  return (
    <Dropdown
      className="ti-site-user-profile"
      placement="bottomRight"
      align={{offset: [0, 22]}}
      getPopupContainer={getContainer}
      overlay={
        <Menu>{items}</Menu>
      }>
      <div className="ti-site-user-profile__trigger">
        <Badge dot={showDot}>
          <Avatar src={me.avatar_url} size={28} />
        </Badge>
        <DownOutlined />
      </div>
    </Dropdown>
  )
}

export default UserProfileDropdown
