import { Footer } from '@pingcap-inc/tidb-community-site-components'
import React from 'react'

export default {
  title: 'site/Footer',
  component: Footer
}

const Template = (args) => <Footer {...args} />

export const Preview = Template.bind({})

Preview.args = {
  copyright: '©2021 TiDB Community.',
  icp: '京ICP备16046278号-4',
  icpUrl: 'https://beian.miit.gov.cn/',
  number: '京公网安备11010802035239号',
  numberUrl: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035239'
}

