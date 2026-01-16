import React from "react"

import './SidebarCard.less'

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  header: {
    start: React.ReactNode
    end?: React.ReactNode
  }
}

const SidebarCard: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, header, ...rest} = props
  const body = children
  //console.log({props})
  return (
    <div className={'asktug-sidebar-card'}>
      <div className={'asktug-sidebar-card-header'}>
        <div className={'asktug-sidebar-card-header-start'}>
          {header.start}
        </div>
        {header.end && (
          <div className={'asktug-sidebar-card-header-end'}>
            {header.end}
          </div>
        )}
      </div>
      <div className={'asktug-sidebar-card-body'}>
        {body}
      </div>
    </div>
  )
}

export default SidebarCard
