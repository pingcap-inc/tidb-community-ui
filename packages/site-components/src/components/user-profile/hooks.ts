import { useMemo } from 'react'
import { createMenuItem, NavItem } from '../../utils/nav-item'
import { Site } from '../../utils/site'
import { MeData } from '../../datasource/accounts'

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
        url: '/profile',
        newWindow: false,
      },
    }, {
      key: 'vip-center',
      title: '会员中心',
      config: {
        site: Site.home,
        url: '/vip-center',
        newWindow: false,
      },
    })

    if (me.org) {
      items.push({
        key: 'my-org',
        title: '我的团队',
        config: {
          site: Site.home,
          url: `/orgs/${me.org.slug}`,
          newWindow: false,
        },
      })
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

    items.push({
      key: 'logout',
      title: '退出登录',
      config: {
        site: Site.accounts,
        url: '/logout',
        newWindow: false,
      },
    })

    return items.map(createMenuItem)
  }, [me, me?.org, me?.org_enroll, me?.org_invitations])

  return items
}
