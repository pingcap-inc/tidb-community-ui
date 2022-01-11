import React from 'react'
import { icons } from './footer-data'

// TODO: use static path instead of icon component
const FooterIcons = () => {
  return (
    <ul className='ti-site-footer-icons'>
      {icons.map(({ Icon, href, alt }) => (
        <li className='ti-site-footer-icons__icon' key={alt}>
          <a href={href} target="_blank" rel="noreferrer">
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default FooterIcons
