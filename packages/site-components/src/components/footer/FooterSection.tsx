import React from 'react'
import { NavItem } from '../../utils/nav-item'
import { getSiteComponentsConfig } from '../../app-config'
import { getUrl } from '../../utils/site'

export interface FooterSectionProps {
  title: string
  items: Omit<NavItem, 'children'>[]
}

const FooterSection = ({ title, items }: FooterSectionProps) => {

  return (
    <li className="ti-site-footer-section">
      <h4 className="ti-site-footer-section__title">{title}</h4>
      <ul className="ti-site-footer-section__items">
        {items.map(createItem)}
      </ul>
    </li>
  )
}

const createItem = ({ key, title, config }: Omit<NavItem, 'children'>) => {
  let el: JSX.Element
  if (config) {
    const { site, env, wrapRouteLink } = getSiteComponentsConfig()
    const { url, canUseRouter } = getUrl(site, env, config)

    el = (
      <a
        href={url}
        target={config.newWindow ? '_blank' : undefined}
        rel={config.newWindow ? 'noreferrer' : undefined}
      >
        {title}
      </a>
    )

    if (canUseRouter && wrapRouteLink) {
      el = wrapRouteLink(undefined, url, el)
    }
  } else {
    el = <a href="javascript:void(0)">{title}</a>
  }
  return <li key={key} className="ti-site-footer-section__items__item">{el}</li>
}

export default FooterSection
