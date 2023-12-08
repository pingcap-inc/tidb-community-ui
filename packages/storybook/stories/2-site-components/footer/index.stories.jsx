import { Footer } from '@pingcap-inc/tidb-community-site-components'
import React from 'react'

export default {
  title: 'site/Footer',
  component: Footer
}

const Template = (args) => <Footer {...args} />

export const Preview = Template.bind({})

Preview.args = {
  copyright: `©${new Date().getFullYear()} TiDB Community.`,
  icp: '京ICP备20022552号-6',
  icpUrl: 'https://beian.miit.gov.cn/',
  number: '京公网安备11010802043620号',
  numberUrl: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035239'
}

