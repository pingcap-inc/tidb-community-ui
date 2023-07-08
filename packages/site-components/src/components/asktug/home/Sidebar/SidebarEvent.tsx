import React from "react"
import dayjs from "dayjs";
import {Badge, Divider, Space} from "antd";

import './SidebarEvent.less'
import IconSvg from './event-icon.svg'
import SidebarCard from "./SidebarCard";
import SiteLink from "../../../site-link";
import {Site} from "../../../../utils/site";
//import {CaretUpOutlined} from "@ant-design/icons";
import {useHomeEvents} from "../../../../datasource/home";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

const SidebarEvent: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, ...rest} = props
  const {data, error, isValidating} = useHomeEvents()
  const events = data ?? []

  return (
    <div className={'asktug-sidebar-event'}>
      <SidebarCard header={{start: (<>活动日历 <IconSvg /></>), end: (<SiteLink site={Site.home} newWindow url={'/event'}>更多 {'>'}</SiteLink>)}}>
        <Space direction={'vertical'} size={16} split={<Divider style={{margin: 0}} />}>
          {events.slice(0, 2).map((value) => {
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
