import { FooterSectionProps } from './FooterSection'
import { Site } from '../../utils/site'
import Github from './icons/github.svg'
import Email from './icons/email.svg'
import MailingList from './icons/mailing-list.svg'
import BiliBili from './icons/bilibili.svg'
import { FC } from 'react'

interface SectionData extends FooterSectionProps {
  key: string
}

interface IconData {
  Icon: FC
  href: string
  alt: string
}

export const sections: SectionData[] = [
  {
    key: 's1',
    title: '互助与交流',
    items: [
      {
        key: 'activities',
        title: '活动',
        config: {
          site: Site.home,
          url: '/events',
          newWindow: true,
        },
      },
      {
        key: 'asktug',
        title: '问答论坛',
        config: {
          site: Site.asktug,
          url: '/',
          newWindow: true,
        },
      },
      {
        key: 'developers',
        title: '开发者论坛',
        config: {
          site: Site.others,
          url: 'https://internals.tidb.io',
          newWindow: true,
        },
      },
      {
        key: 'tikv community',
        title: 'TiKV 社区',
        config: {
          site: Site.others,
          url: 'https://tikv.org',
          newWindow: true,
        },
      },
      {
        key: 'chaos mesh community',
        title: 'Chaos Mesh 社区',
        config: {
          site: Site.others,
          url: 'https://chaos-mesh.org/',
          newWindow: true,
        },
      },
    ],
  },
  {
    key: 's2',
    title: '学习与应用',
    items: [
      {
        key: 'docs',
        title: '文档',
        config: {
          site: Site.others,
          url: 'https://docs.pingcap.com/zh',
          newWindow: true,
        },
      },
      {
        key: 'blogs',
        title: '专栏',
        config: {
          site: Site.home,
          url: '/blog',
          newWindow: true,
        },
      },
      {
        key: 'video lectures',
        title: '视频课程',
        config: {
          site: Site.others,
          url: 'https://learn.pingcap.cn/learner/course',
          newWindow: true,
        },
      },
      {
        key: 'certificates',
        title: '考试认证',
        config: {
          site: Site.others,
          url: 'https://learn.pingcap.cn/learner/certification-center',
          newWindow: true,
        },
      },
      {
        key: 'cases',
        title: '典型案例',
        config: {
          site: Site.others,
          url: 'https://www.pingcap.cn/case',
          newWindow: true,
        },
      },
      {
        key: 'guides',
        title: '开发者指南',
        config: {
          site: Site.others,
          url: 'https://pingcap.github.io/tidb-dev-guide',
          newWindow: true,
        },
      },
    ],
  },
  {
    key: 's3',
    title: '发现社区',
    items: [
      {
        key: 'tug',
        title: 'TiDB User Group',
        config: {
          site: Site.home,
          url: '/tug',
          newWindow: true,
        },
      },
      {
        key: 'asktug ranking',
        title: '问答之星',
        config: {
          site: Site.asktug,
          url: '/x/ranking',
          newWindow: true,
        },
      },
      {
        key: 'code of conduct',
        title: '社区准则',
        config: {
          site: Site.others,
          url: 'https://github.com/pingcap/community/blob/master/CODE_OF_CONDUCT.md?from=from_parent_mindnote',
          newWindow: true,
        },
      },
      {
        key: 'contact us',
        title: '联系我们',
        config: {
          site: Site.home,
          url: '/support',
          newWindow: true,
        },
      },
      {
        key: 'books',
        title: '电子书',
        config: {
          site: Site.home,
          url: '/book',
          newWindow: false
        }
      }
    ],
  },
]

export const icons: IconData[] = [
  {
    Icon: Email,
    href: 'mailto:user-zh@tidb.io',
    alt: 'email'
  },
  {
    Icon: Github,
    href: 'https://github.com/pingcap/community',
    alt: 'github'
  },
  {
    Icon: BiliBili,
    href: 'https://space.bilibili.com/584479667',
    alt: 'linkedin'
  },
  {
    Icon: MailingList,
    href: 'https://lists.tidb.io/g/main',
    alt: 'Mailing List',
  },
]
