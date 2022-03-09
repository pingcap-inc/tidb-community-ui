import {Site} from '../../utils/site'
import {NavItem} from '../../utils/nav-item'

export const navItems: NavItem[] = [
    {
        key: 'doc',
        title: '文档',
        config: {
            site: Site.others,
            url: 'https://docs.pingcap.com/zh/tidb/stable',
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
        title: '专栏',
        config: {
            site: Site.home,
            url: '/blog',
            newWindow: false,
        },
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
        key: 'courses',
        title: '课程',
        children: [
            {
                key: 'video-courses',
                title: '视频课程',
                config: {
                    site: Site.others,
                    url: 'https://learn.pingcap.com/learner/course',
                    newWindow: true,
                },
            },
            {
                key: 'cert',
                title: '考试认证',
                config: {
                    site: Site.others,
                    url: 'https://learn.pingcap.com/learner/certification-center',
                    newWindow: true,
                },
            },
        ],
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
                key: 'internals',
                title: '开发者论坛',
                config: {
                    site: Site.others,
                    url: 'https://internals.tidb.io',
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
                key: 'talent-plan',
                title: 'Talent Plan',
                config: {
                    site: Site.home,
                    url: '/talent-plan',
                    newWindow: false
                }
            }
        ]
    },
    {
        key: 'discover',
        title: '发现',
        children: [
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
                key: 'asktug-ranking',
                title: '问答之星',
                config: {
                    site: Site.asktug,
                    url: '/x/ranking',
                    newWindow: false
                }
            },
            {
                key: 'jobs',
                title: '工作机会',
                config: {
                    site: Site.others,
                    url: 'https://tidb-jobs.pingcap.com/',
                    newWindow: true
                }
            },
            {
                key: 'principal',
                title: '社区准则',
                config: {
                    site: Site.others,
                    url: 'https://github.com/pingcap/community/blob/master/CODE_OF_CONDUCT.md',
                    newWindow: true
                }
            }
        ]
    }
]
