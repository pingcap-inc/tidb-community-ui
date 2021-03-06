import React, {useMemo} from 'react'
import {createMenuItem, NavItem} from '../../utils/nav-item'
import {Site} from '../../utils/site'
import {MeData} from '../../datasource/accounts'
import {Menu} from 'antd'
import {logout} from '../../utils/account'

export const useUserProfileItems = (me?: MeData['data']) => {

  const items: JSX.Element[] = useMemo(() => {
    if (!me) {
      return []
    }
    const items: NavItem[] = []

    items.push({
      key: 'my-profile',
      title: '个人主页',
      config: {
        site: Site.home,
        url: `/u/${me.username}/answer`,
        newWindow: false,
      },
    }, {
      key: 'vip-center',
      title: '会员中心',
      config: {
        site: Site.home,
        url: '/member',
        newWindow: false,
      },
    })

    items.push({
      key: 'my-settings',
      title: '账号设置',
      config: {
        site: Site.home,
        url: '/my/settings',
        newWindow: false,
      },
    })

    return items.map(createMenuItem).concat(<Menu.Item key="logout" onClick={logout}>退出登录</Menu.Item>)
  }, [me, me?.org, me?.org_enroll, me?.org_invitations])

  return items
}
