import React from 'react'
import { MeData } from '../../datasource/accounts'
import { Avatar, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './style.less'
import { useUserProfileItems } from './hooks'
import { getContainer } from '../../utils/popup-container'

const UserProfileDropdown = ({ me }: { me: MeData['data'] }) => {
  const items = useUserProfileItems(me)

  return (
    <Dropdown
      className="ti-site-user-profile"
      placement="bottomRight"
      getPopupContainer={getContainer}
      overlay={
        <Menu>{items}</Menu>
      }>
      <div className="ti-site-user-profile__trigger">
        <Avatar src={me.avatar_url} size={28} />
        <DownOutlined />
      </div>
    </Dropdown>
  )
}

export default UserProfileDropdown
