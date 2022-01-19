import React from 'react'
import { NavItem } from '../../utils/nav-item'
import SiteLink from '../site-link/SiteLink'

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
    el = <SiteLink {...config}>{title}</SiteLink>
  } else {
    el = <a href="javascript:void(0)">{title}</a>
  }
  return <li key={key} className="ti-site-footer-section__items__item">{el}</li>
}

export default FooterSection
