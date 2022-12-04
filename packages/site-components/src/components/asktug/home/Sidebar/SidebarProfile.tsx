import React, {useEffect, useState} from "react"
import {Button, Col, Row, Space, Tooltip} from "antd";
import {GiftOutlined} from "@ant-design/icons";

import './SidebarProfile.less'
import SidebarCard from "./SidebarCard";
import SiteLink from "../../../site-link";
import {Site} from "../../../../utils/site";
import {useAsktugBadges, useAsktugUserSummary} from "../../../../datasource/asktug";
import {useBlogUsersPosts} from "../../../../datasource/blog";
import {usePointMe} from "../../../../datasource/accounts";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string
}

const SidebarProfile: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, username, ...rest} = props
  //console.log({props})
  const {data: dataPointMe, error: errorPointMe} = usePointMe()
  const {data: dataBadges, error: errorBadges} = useAsktugBadges()
  const {data: dataUserSummary, error: errorUserSummary} = useAsktugUserSummary(props.username)
  const {data: dataBlogUsersPosts, error: errorBlogUsersPosts} = useBlogUsersPosts(props.username)
  console.log({dataPointMe, dataBadges, dataUserSummary, dataBlogUsersPosts})
  console.error({errorPointMe, errorBadges, errorUserSummary, errorBlogUsersPosts})
  return (
    <div className={'asktug-sidebar-profile'}>
      <SidebarCard header={{start: '我的社区旅程'}}>

        <Row className={'asktug-sidebar-profile-count'} gutter={16}>
          <Col span={6}>
            <div className={'asktug-sidebar-profile-count-item'}>
              <div className={'asktug-sidebar-profile-count-item-value'}>{dataUserSummary?.user_summary.post_count ?? 'N/A'}</div>
              <div className={'asktug-sidebar-profile-count-item-key'}>帖子</div>
            </div>
          </Col>
          <Col span={6}>
            <div className={'asktug-sidebar-profile-count-item'}>
              <div className={'asktug-sidebar-profile-count-item-value'}>{dataUserSummary?.user_summary.likes_received ?? 'N/A'}</div>
              <div className={'asktug-sidebar-profile-count-item-key'}>获赞</div>
            </div>
          </Col>
          <Col span={6}>
            <div className={'asktug-sidebar-profile-count-item'}>
              <div className={'asktug-sidebar-profile-count-item-value'}>{dataBlogUsersPosts?.page.totalElements ?? 'N/A'}</div>
              <div className={'asktug-sidebar-profile-count-item-key'}>文章</div>
            </div>
          </Col>
          <Col span={6}>
            <div className={'asktug-sidebar-profile-count-item'}>
              <div className={'asktug-sidebar-profile-count-item-value'}>{dataPointMe?.data.current_exps ?? 'N/A'}</div>
              <div className={'asktug-sidebar-profile-count-item-key'}>经验值</div>
            </div>
          </Col>
        </Row>

        <div className={'asktug-sidebar-profile-divider'} />

        <div className={'asktug-sidebar-profile-badges'}>
          <Space className={'asktug-sidebar-profile-badges-list'}>
            {(dataUserSummary?.badges ?? []).slice(0, 5).map((value: any) => (
              <div key={value.id} className={'asktug-sidebar-profile-badges-list-item'}>
                <Tooltip title={value.description}>
                  <img src={`https://asktug.com/${value.image_url}`} alt={value.name} />
                </Tooltip>
              </div>
            ))}
          </Space>
          <div className={'asktug-sidebar-profile-badges-count'}>
            <span style={{color: '#000'}}>{dataUserSummary?.badges.length ?? 'N/A'}</span><span style={{color: '#BFBFBF'}}>{' / '}{dataBadges?.badges?.length ?? 'N/A'}</span>
          </div>
        </div>

        <Row className={'asktug-sidebar-profile-action'} gutter={16}>
          <Col span={12}>
            <SiteLink site={Site.asktug} newWindow url={`/u/${username}`}>
              <Button block ghost type={'primary'} size={'small'}>个人主页</Button>
            </SiteLink>
          </Col>
          <Col span={12}>
            <SiteLink site={Site.home} newWindow url={`/member`}>
              <Button block ghost type={'primary'} size={'small'} icon={<GiftOutlined />}>会员中心</Button>
            </SiteLink>
          </Col>
        </Row>
      </SidebarCard>
    </div>
  )
}

export default SidebarProfile
