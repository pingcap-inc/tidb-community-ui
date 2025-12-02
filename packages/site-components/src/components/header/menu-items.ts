import {Site} from '../../utils/site'
import {NavItem} from '../../utils/nav-item'

export const navItems: NavItem[] = [
  {
    key: 'official-site',
    title: '官网',
    config: {
      site: Site.others,
      url: 'https://pingkai.cn/',
      newWindow: false,
    }
  },
  {
    key: 'business-consulting',
    title: '商业咨询',
    config: {
      site: Site.home,
      url: '/support',
      newWindow: true,
    }
  },
  {
    key: 'doc',
    title: '文档',
    config: {
      site: Site.others,
      url: 'https://pingkai.cn/docs/tidb/stable/',
      newWindow: true,
    },
  },
  {
    key: 'asktug',
    title: '论坛',
    config: {
      site: Site.asktug,
      url: '/',
      newWindow: false,
    },
  },
  {
    key: 'blog',
    title: '博客',
    config: {
      site: Site.home,
      url: '/blog',
      newWindow: false,
    },
  },
  {
    key: 'courses',
    title: '课程',
    children: [
      {
        key: 'video-courses',
        title: '视频课程',
        config: {
          site: Site.others,
          url: 'https://learn.pingcap.cn/learner/course',
          newWindow: true,
        },
      },
      {
        key: 'cert',
        title: '考试认证',
        config: {
          site: Site.others,
          url: 'https://learn.pingcap.cn/learner/certification-center',
          newWindow: true,
        },
      },
      {
        key: 'talent-plan',
        title: 'Talent Plan',
        config: {
          site: Site.home,
          url: '/talent-plan',
          newWindow: false
        }
      }
    ],
  },
  {
    key: 'events',
    title: '活动',
    config: {
      site: Site.home,
      url: '/events',
      newWindow: false,
    },
  },
  {
    key: 'asktug-ranking',
    title: '排行榜',
    config: {
      site: Site.asktug,
      url: '/x/ranking',
      newWindow: false
    }
  },
  {
    key: 'tug',
    title: 'TiDB User Group',
    config: {
      site: Site.home,
      url: '/tug',
      newWindow: false
    }
  },
  {
    key: 'regional-meetup',
    title: 'TiDB 地区组织活动',
    config: {
      site: Site.home,
      url: '/regional-meetup',
      newWindow: false
    }
  },
  {
    key: 'developers',
    title: '贡献者专区',
    children: [
      {
        key: 'contribute',
        title: '如何贡献代码',
        config: {
          site: Site.others,
          url: 'https://pingcap.github.io/tidb-dev-guide',
          newWindow: true
        }
      },
      {
        key: 'incubator',
        title: '孵化器项目',
        config: {
          site: Site.others,
          url: 'https://github.com/pingcap/community/tree/master/incubator',
          newWindow: true
        }
      },
      {
        key: 'books',
        title: '电子书',
        config: {
          site: Site.home,
          url: '/book',
          newWindow: false
        }
      },
    ]
  },
  {
    key: 'principal',
    title: '社区准则',
    config: {
      site: Site.others,
      url: 'https://github.com/pingcap/community/blob/master/CODE_OF_CONDUCT.md',
      newWindow: true
    }
  },
]
