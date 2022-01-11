import { FooterSectionProps } from './FooterSection'
import { Site } from '../../utils/site'
import Facebook from './icons/facebook.svg'
import Github from './icons/github.svg'
import Linkedin from './icons/linkedin.svg'
import Slack from './icons/slack.svg'
import Twitter from './icons/twitter.svg'
import Youtube from './icons/youtube.svg'
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
          url: 'https://internals.tidb.io',
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
      {
        key: 'cooperation',
        title: '社区合作',
        config: {
          site: Site.home,
          url: '/contact-us/cooperation',
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
          url: 'https://docs.pingcap.com/zh/tidb/stable',
          newWindow: true,
        },
      },
      {
        key: 'blogs',
        title: '专栏',
        config: {
          site: Site.home,
          url: '/blogs',
          newWindow: true,
        },
      },
      {
        key: 'video lectures',
        title: '视频课程',
        config: {
          site: Site.others,
          url: 'https://learn.pingcap.com/learner/course',
          newWindow: true,
        },
      },
      {
        key: 'certificates',
        title: '考试认证',
        config: {
          site: Site.others,
          url: 'https://learn.pingcap.com/learner/certification-center',
          newWindow: true,
        },
      },
      {
        key: 'cases',
        title: '典型案例',
        config: {
          site: Site.others,
          url: 'https://pingcap.com/case/',
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
        key: 'jobs',
        title: '工作机会',
        config: {
          site: Site.others,
          url: 'https://tidb-jobs.pingcap.com',
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
        key: 'business support',
        title: '商业支持',
        config: {
          site: Site.others,
          url: 'https://pingcap.com/zh/contact',
          newWindow: true,
        },
      },
    ],
  },
]

export const icons: IconData[] = [
  {
    Icon: Facebook,
    href: '/',
    alt: 'facebook'
  },
  {
    Icon: Github,
    href: '/',
    alt: 'github'
  },
  {
    Icon: Linkedin,
    href: '/',
    alt: 'linkedin'
  },
  {
    Icon: Slack,
    href: '/',
    alt: 'slack'
  },
  {
    Icon: Twitter,
    href: '/',
    alt: 'twitter'
  },
  {
    Icon: Youtube,
    href: '/',
    alt: 'youtube'
  }
]
