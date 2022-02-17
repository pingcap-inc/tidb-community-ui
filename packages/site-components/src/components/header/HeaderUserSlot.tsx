import React from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Skeleton } from 'antd'
import Space from './Space'
import { UserProfileDropdown } from '../user-profile'
import LoginButton from './LoginButton'
import { useMeData } from '../../datasource/accounts'
import { SwrData } from '@pingcap-inc/tidb-community-ui'
import { swrState } from '../../utils/swr'
import HeaderNotifications from './HeaderNotifications'
import HeaderPrivateMessages from './HeaderPrivateMessages'

const HeaderUserSlot = () => {
  const me = useMeData()

  return (
    <div style={{ maxWidth: 150, minWidth: 150 }}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={swrState(me)}
          classNames="fade"
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false)
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SwrData
              data={me}
              initializing={renderUserInitializing()}
              fallback={<LoginButton />}
            >
              {(me) => (
                <>
                  <HeaderNotifications />
                  <HeaderPrivateMessages username={me?.data.username} />
                  <Space size={30} />
                  <UserProfileDropdown me={me.data} />
                </>
              )}
            </SwrData>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

const renderUserInitializing = () => {
  return (
    <>
      <Skeleton.Button active size="small" />
      <Space size={24} />
      <Skeleton.Avatar active size={28} />
    </>
  )
}

export default HeaderUserSlot
