import React, {useEffect, useState} from "react"
import axios from "axios";
import dayjs from "dayjs";
import {Badge} from "antd";

import './SidebarEvent.less'
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
  //const url = 'http://localhost:3300/next-api/cms/tidbio-homepage-main-activities'
  //const response = await axios.get<IEvent[]>(url)
  //return response.data
  return []
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
      <SidebarCard header={{start: '活动日历', end: (<SiteLink site={Site.home} newWindow url={'/event'}>更多 {'>'}</SiteLink>)}}>
        <ul>
          {events.map((value) => {
            const dayObj = dayjs(value.date);
            const month = dayObj.format('MMM');
            const day = dayObj.format('D');
            return (
              <li key={value.id}>
                <SiteLink site={Site.home} newWindow url={`/event`}>
                  <div className={'asktug-sidebar-event-container'}>
                    <div className={'asktug-sidebar-event-container-calendar'}>
                      <div className={'asktug-sidebar-event-container-calendar-head'}>{month}</div>
                      <div className={'asktug-sidebar-event-container-calendar-body'}>
                        {day}
                        <CaretUpOutlined className="asktug-sidebar-event-container-calendar-body-arrow" />
                        <CaretUpOutlined className="asktug-sidebar-event-container-calendar-body-arrow-oppsite" />
                      </div>
                    </div>
                    <div className={'asktug-sidebar-event-container-content'}>
                      <h3>{value.title}</h3>
                      <div>
                        {/*{value.status && <Badge color={'#ee6d85'} text={value.status} />}*/}
                        {value.type && <Badge color={'#69c384'} text={value.type} />}
                      </div>
                    </div>
                  </div>
                </SiteLink>
              </li>
            )
          })}
        </ul>
      </SidebarCard>
    </div>
  )
}

export default SidebarEvent
