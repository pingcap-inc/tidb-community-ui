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

    if (me.org) {
      items.push({
        key: 'my-org',
        title: '我的团队',
        config: {
          site: Site.home,
          url: `/orgs/${me.org.slug}/home`,
          newWindow: false,
        },
      })
    } else {
      items.splice(1, 0, {
        key: 'join-team',
        title: '团队认证',
        config: {
          site: Site.home,
          url: '/account/organization/new',
          newWindow: true
        },
      });
    }

    if (me.org_invitations?.length) {
      items.push({
        key: 'team-invitations',
        title: '团队邀请',
        config: {
          site: Site.home,
          url: '/account/organization/invitations',
          newWindow: false
        },
        badge: me.org_invitations.some((item) => item.valid),
      });
    }

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
