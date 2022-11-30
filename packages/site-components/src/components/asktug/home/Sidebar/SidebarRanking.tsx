import React, {useEffect, useState} from "react"
import axios from "axios";

import './SidebarRanking.less'
//import icon from './ranking-icon.png'
import SidebarCard from "./SidebarCard";
import SiteLink from "../../../site-link";
import {Site} from "../../../../utils/site";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

export interface ITopItem {
  ranking: number // 1,
  user: {
    username: string // "h5n1",
    avatar_url: string // "https://asktug.com/user_avatar/asktug.com/h5n1/50/154936_2.png"
  },
  exps: number // 41333
}

export interface ITop {
  limit: number // 50,
  period: string // "all"
  data: ITopItem[]
}

const getData = async (): Promise<ITop> => {
  const url = 'http://localhost:3300/api/points/top'
  const response = await axios.get<ITop>(url)
  console.log('response.data', response.data)
  return response.data
}

const SidebarRanking: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, ...rest} = props
  const [data, setData] = useState<ITopItem[]>([])
  useEffect(() => {
    getData().then((value) => setData(value.data))
  }, [])
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
            {data.slice(0, 10).map((value) => (
              <tr key={value.user.username}>
                <td style={{color: value.ranking === 1 ? '#FFB800' : value.ranking === 2 ? '#969696' : value.ranking === 3 ? '#B7B004' : '#2C2C2C'}}>{value.ranking}</td>
                <td> <SiteLink site={Site.asktug} newWindow url={`/u/${value.user.username}`}>{value.user.username}</SiteLink></td>
                <td>{value.exps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SidebarCard>
    </div>
  )
}

export default SidebarRanking
