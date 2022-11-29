import React, {useEffect, useState} from "react"
import {Button, Col, Row, Space, Tooltip} from "antd";
import {GiftOutlined} from "@ant-design/icons";
import axios from "axios";

import './SidebarProfile.less'
import SidebarCard from "./SidebarCard";
import SiteLink from "../../../site-link";
import {Site} from "../../../../utils/site";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  count: {
    post: number
    like: number
    article: number
    exp: number
  }
  username: string
}

export interface IBadge {
  id: number // 116,
  name: string // "PCTP - DBA",
  description: string // "PCTP - DBA（PingCAP Certified TiDB Administration Professional）",
  grant_count: number // 519,
  allow_title: false,
  multiple_grant: false,
  icon: string // "fa-certificate",
  image_url: string // "/uploads/default/original/4X/c/7/2/c7295e250f66569b17c3166312ff33c07c6bcce7.png",
  listable: true,
  enabled: true,
  badge_grouping_id: number // 30013,
  system: false,
  slug: string // "-",
  manually_grantable: true,
  badge_type_id: number // 1
}

export interface IUser {
  badges: IBadge[]
  user: {
    id: number // 116,
    name: string // "PCTP - DBA",
    badge_count: number // 26
  }
}

export interface IBadges {
  badges: IBadge[]
}

const getUser = async (username: string): Promise<IUser> => {
  //const url = 'https://asktug.com/site.json'
  const url = `http://localhost:3100/u/${username}.json`
  const response = await axios.get(url)
  return  response.data
}

const getBadges = async (): Promise<IBadges> => {
  const url = 'http://localhost:3100/badges.json'
  const response = await axios.get(url)
  return response.data
}

const SidebarProfile: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, count, username, ...rest} = props
  //console.log({props})
  const [user, setUser] = useState<IUser>()
  const [badges, setBadges] = useState<IBadges>()
  useEffect(() => {
    getUser(username).then(setUser)
    getBadges().then(setBadges)
  }, [])
  return (
    <div className={'asktug-sidebar-profile'}>
      <SidebarCard header={{start: '我的社区旅程'}}>

        <Row className={'asktug-sidebar-profile-count'} gutter={16}>
          <Col span={6}>
            <div className={'asktug-sidebar-profile-count-item'}>
              <div className={'asktug-sidebar-profile-count-item-value'}>{count.post}</div>
              <div className={'asktug-sidebar-profile-count-item-key'}>帖子</div>
            </div>
          </Col>
          <Col span={6}>
            <div className={'asktug-sidebar-profile-count-item'}>
              <div className={'asktug-sidebar-profile-count-item-value'}>{count.like}</div>
              <div className={'asktug-sidebar-profile-count-item-key'}>获赞</div>
            </div>
          </Col>
          <Col span={6}>
            <div className={'asktug-sidebar-profile-count-item'}>
              <div className={'asktug-sidebar-profile-count-item-value'}>{count.article}</div>
              <div className={'asktug-sidebar-profile-count-item-key'}>文章</div>
            </div>
          </Col>
          <Col span={6}>
            <div className={'asktug-sidebar-profile-count-item'}>
              <div className={'asktug-sidebar-profile-count-item-value'}>{count.exp}</div>
              <div className={'asktug-sidebar-profile-count-item-key'}>经验值</div>
            </div>
          </Col>
        </Row>

        <div className={'asktug-sidebar-profile-divider'} />

        <div className={'asktug-sidebar-profile-badges'}>
          <Space className={'asktug-sidebar-profile-badges-list'}>
            {user?.badges.slice(0, 5).map((value) => (
              <div key={value.id} className={'asktug-sidebar-profile-badges-list-item'}>
                <Tooltip title={value.description}>
                  <img src={`https://asktug.com/${value.image_url}`} alt={value.name} />
                </Tooltip>
              </div>
            ))}
          </Space>
          <div className={'asktug-sidebar-profile-badges-count'}>
            <span style={{color: '#000'}}>{user?.user.badge_count ?? 'N/A'}</span><span style={{color: '#BFBFBF'}}>{' / '}{badges?.badges.length ?? 'N/A'}</span>
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
