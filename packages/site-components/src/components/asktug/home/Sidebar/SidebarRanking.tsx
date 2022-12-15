import React from "react"

import './SidebarRanking.less'
import SidebarCard from "./SidebarCard";
import SiteLink from "../../../site-link";
import {Site} from "../../../../utils/site";
import {usePointMe, usePointTop} from "../../../../datasource/accounts";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  username?: string
}

const SidebarRanking: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, username, ...rest} = props
  const {data: dataPointTop, error: errorPointTop, isValidating: isValidatingPointTop} = usePointTop()
  const {data: dataPointMe, error: errorPointMe, isValidating: isValidatingPointMe} = usePointMe()
  const list = dataPointTop?.data ?? []
  return (
    <div className={'asktug-sidebar-ranking'}>
      <SidebarCard header={{start: '本周达人', end: (<SiteLink site={Site.asktug} newWindow url={'/x/ranking'}>更多 {'>'}</SiteLink>)}}>
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>昵称</th>
              <th>经验值</th>
            </tr>
          </thead>
          <tbody>
            {list.slice(0, 10).map((value) => (
              <tr key={value.user.username}>
                <td style={{color: value.ranking === 1 ? '#FFB800' : value.ranking === 2 ? '#969696' : value.ranking === 3 ? '#B7B004' : '#2C2C2C'}}>{value.ranking}</td>
                <td style={{color: username === value.user.username ? '#FF5C00' : undefined}}> <SiteLink site={Site.asktug} newWindow url={`/u/${value.user.username}`}>{value.user.username}</SiteLink></td>
                <td style={{color: username === value.user.username ? '#FF5C00' : undefined}}>{value.exps}</td>
              </tr>
            ))}
            {username && dataPointMe?.data && dataPointMe.data.current_rank >= 10 && (
              <tr>
                <td style={{color: '#FF5C00'}}>{dataPointMe.data.current_rank}</td>
                <td style={{color: '#FF5C00'}}><SiteLink site={Site.asktug} newWindow url={`/u/${username}`}>{username}</SiteLink></td>
                <td style={{color: '#FF5C00'}}>{dataPointMe.data.current_exps}</td>
              </tr>
            )}
          </tbody>
        </table>
      </SidebarCard>
    </div>
  )
}

export default SidebarRanking
