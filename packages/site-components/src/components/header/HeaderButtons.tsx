import React, { useMemo } from 'react'
import { Badge, Tooltip } from 'antd'
import { getUrl, RouteToConfig } from '../../utils/site'
import { getSiteComponentsConfig } from '../../app-config'
import { getContainer } from '../../utils/popup-container'

export interface HeaderButtonProps {
  key: string
  tooltip?: string
  icon: JSX.Element
  badge: boolean | number
  loading?: boolean
  to?: RouteToConfig
}


const renderHeaderButton = ({ key, tooltip, icon, badge, to }: HeaderButtonProps) => {
  const { site, env, wrapRouteLink } = getSiteComponentsConfig()

  let el: JSX.Element = icon

  if (to) {
    const { url, canUseRouter } = getUrl(site, env, to)
    if (canUseRouter && wrapRouteLink) {
      el = wrapRouteLink(key, url, el)
    } else {
      el = <a href={url}>{el}</a>
    }
  }
  if (typeof badge === 'number') {
    el = <Badge size="small" offset={[8, 0]} count={badge}>{el}</Badge>
  } else {
    el = <Badge dot={badge}>{el}</Badge>
  }

  if (tooltip) {
    el = <Tooltip getPopupContainer={getContainer} title={tooltip}>{el}</Tooltip>
  }
  if (key) {
    el = React.cloneElement(el, { key, className: 'ti-site-header-button' })
  }
  return el
}

const HeaderButtons = ({ buttons }: { buttons: HeaderButtonProps[] }) => {
  const buttonElms = useMemo(() => {
    return buttons.map(renderHeaderButton)
  }, [buttons])
  return <>{buttonElms}</>
}

export default HeaderButtons
