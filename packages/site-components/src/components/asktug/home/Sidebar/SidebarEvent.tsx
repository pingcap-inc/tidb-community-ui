import React, {useEffect, useState} from "react"
import dayjs from "dayjs";
import {Badge, Divider, Space} from "antd";
import axios from "axios";

import './SidebarEvent.less'
import IconSvg from './event-icon.svg'
import SidebarCard from "./SidebarCard";
import SiteLink from "../../../site-link";
import {Site} from "../../../../utils/site";
import {CaretUpOutlined} from "@ant-design/icons";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

export interface IEvent {
  id: number // 40,
  title: string // "TiDB社区专栏第一届征文大赛",
  link: string // "https://tidb.net/blog/ab7959f4",
  location: string // "线上",
  type: string // "线上",
  date: string // "2022-05-31",
  intro: string // "全国",
  published_at: string // "2022-04-18T03:32:33.000Z",
  created_at: string // "2022-04-18T03:32:30.000Z",
  updated_at: string // "2022-04-18T03:32:33.000Z",
}

const getEvents = async () => {
  const url = 'http://localhost:3000/next-api/cms/tidbio-homepage-main-activities'
  let response
  try {
    response = await axios.get<IEvent[]>(url)
  } catch (e) {
    console.error('getEvents', e)
    return []
  }
  return response?.data ?? []
  //return []
}

const SidebarEvent: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, ...rest} = props
  const [events, setEvents] = useState<IEvent[]>([])
  useEffect(() => {
    getEvents().then(setEvents)
  }, [])

  return (
    <div className={'asktug-sidebar-event'}>
      <SidebarCard header={{start: (<>活动日历 <IconSvg /></>), end: (<SiteLink site={Site.home} newWindow url={'/event'}>更多 {'>'}</SiteLink>)}}>
        <Space direction={'vertical'} size={16} split={<Divider style={{margin: 0}} />}>
          {events.map((value) => {
            const dayObj = dayjs(value.date);
            const month = dayObj.format('MMM');
            const day = dayObj.format('D');
            return (
              <SiteLink key={value.id} site={Site.home} newWindow url={`/event`}>
                <div className={'asktug-sidebar-event-container'}>
                  <div className={'asktug-sidebar-event-container-calendar'}>
                    <div className={'asktug-sidebar-event-container-calendar-month'}>{month}</div>
                    <div className={'asktug-sidebar-event-container-calendar-day'}>
                      {day}
                      {/*<CaretUpOutlined className="asktug-sidebar-event-container-calendar-body-arrow" />*/}
                      {/*<CaretUpOutlined className="asktug-sidebar-event-container-calendar-body-arrow-oppsite" />*/}
                    </div>
                  </div>
                  <div className={'asktug-sidebar-event-container-content'}>
                    <h3 className={'asktug-sidebar-event-container-content-title'}>{value.title}</h3>
                    <div className={'asktug-sidebar-event-container-content-metadata'}>
                      {value.status && <Badge color={'#ee6d85'} text={value.status} />}
                      {value.type && <Badge color={'#69c384'} text={value.type} />}
                    </div>
                  </div>
                </div>
              </SiteLink>
            )
          })}
        </Space>
      </SidebarCard>
    </div>
  )
}

export default SidebarEvent
