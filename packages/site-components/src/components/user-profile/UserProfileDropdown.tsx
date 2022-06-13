import { DownOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Menu } from 'antd';
import React, { useMemo } from 'react';
import { MeData } from '../../datasource/accounts';
import { getContainer } from '../../utils/popup-container';
import { Site } from '../../utils/site';
import SiteLink from '../site-link';
import { useUserProfileItems } from './hooks';
import './style.less';

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
          <SiteLink url={`/u/${me.username}`} site={Site.home} newWindow>
            <Avatar src={me.avatar_url} size={28} />
          </SiteLink>
        </Badge>
        <DownOutlined />
      </div>
    </Dropdown>
  )
}

export default UserProfileDropdown
