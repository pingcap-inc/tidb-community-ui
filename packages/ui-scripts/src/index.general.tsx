// this must import before any components
import './index.less'
import {
    defineSiteComponentsConfig,
    Env,
    Footer,
    Header,
    Site,
    SiteComponentsContext
} from '@pingcap-inc/tidb-community-site-components'
import React from 'react'
import ReactDOM from 'react-dom'
import fetchers from './fetchers'

defineSiteComponentsConfig({
    site: Site.asktug,
    env: process.env.NODE_ENV === 'production' ? Env.prod : Env.preview,
})

const context = { fetchers }

const GeneralHeader = () => {
    const headerElem = document.getElementById('general-header')
    if (!headerElem) return null
    return ReactDOM.createPortal(<Header/>, headerElem)
}

const GeneralFooter = () => {
    const footerId = 'general-footer'
    const footerElem = document.getElementById(footerId)
    if (!footerElem) return null
    return ReactDOM.createPortal(<Footer/>, footerElem)
}

const SiteComponent = () => {
    return (
        <SiteComponentsContext.Provider value={context}>
            <GeneralHeader/>
            <GeneralFooter/>
        </SiteComponentsContext.Provider>
    )
}

const container = document.createElement('div')
container.className = '__ti-site-holder'
document.body.append(container)

ReactDOM.render(<SiteComponent/>, container)