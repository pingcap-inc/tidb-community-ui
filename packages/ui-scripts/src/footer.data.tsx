import React from 'react'
import { FooterProps } from '@pingcap-inc/tidb-community-site-components'

export const footerProps: FooterProps = {
  copyright: '©2022 TiDB Community.',
  icp: '京ICP备16046278号-4',
  icpUrl: 'https://beian.miit.gov.cn/',
  beianNode: (
    <span>
      <img src={'https://img1.tidb.net/images/beian.png'} alt="beian" />
      京公网安备 11010802035239 号
    </span>
  ),
  beianUrl: 'https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035239'
}
