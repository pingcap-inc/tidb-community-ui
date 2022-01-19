// this must import before any components
import './index.less'
import { defineSiteComponentsConfig, Env, Footer, Header, Site, SiteComponentsContext } from '@pingcap-inc/tidb-community-site-components'
import React, { MouseEvent } from 'react'
import ReactDOM from 'react-dom'
import { routeTo } from './asktug-routing'
import fetchers from './fetchers'

console.debug('@pingcap-inc/tidb-community-asktug-theme %s', process.env.BUILD_REF)

defineSiteComponentsConfig({
  site: Site.asktug,
  env: process.env.NODE_ENV === 'production' ? Env.prod : Env.preview,
  wrapRouteLink: (key, url, elm) => {
    return React.cloneElement(elm, {
      key,
      onClick: (event: MouseEvent) => {
        routeTo(url)
        event.preventDefault()
        event.stopPropagation()
        return false
      },
    })
  },
})

const context = {
  fetchers,
}

const renderHeader = () => {
  const headerElem = document.getElementById('asktug-header')
  ReactDOM.render((
    <SiteComponentsContext.Provider value={context}>
      <Header />
    </SiteComponentsContext.Provider>
  ), headerElem)
}

const renderFooter = () => {
  const footerId = 'asktug-footer'

  const footerElem = document.getElementById(footerId)
  if (footerElem) {
    ReactDOM.render((
      <SiteComponentsContext.Provider value={context}>
        <Footer />
      </SiteComponentsContext.Provider>
    ), footerElem)
  }

  const MutationObserver = window.MutationObserver || (window as any).WebkitMutationObserver

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if ((node as Element).id === footerId) {
          const footerElem = document.getElementById(footerId)
          ReactDOM.render((
            <SiteComponentsContext.Provider value={context}>
              <Footer />
            </SiteComponentsContext.Provider>
          ), footerElem)
        }
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

renderHeader()
renderFooter()
