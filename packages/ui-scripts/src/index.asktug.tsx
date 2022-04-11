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
import React, {MouseEvent, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import fetchers from './fetchers'
import {footerProps} from "./footer.data";

console.debug('@pingcap-inc/tidb-community-asktug-theme %s', process.env.BUILD_REF)

defineSiteComponentsConfig({
    site: Site.asktug,
    env: process.env.NODE_ENV === 'production' ? Env.prod : Env.preview,
    wrapRouteLink: (key, url, node) => {
        const onClick = (event: MouseEvent) => {
            // routeTo(url)
            location.href = url
            event.preventDefault()
            event.stopPropagation()
            return false
        }

        if (React.isValidElement(node)) {
            return React.cloneElement(node, {
                key,
                onClick,
            })
        } else {
            return (
                <a href={url} key={key} onClick={onClick}>
                    {node}
                </a>
            )
        }
    },
})

const context = {
    fetchers,
}

const AsktugHeader = () => {
    const headerElem = document.getElementById('asktug-header')
    if (!headerElem) {
        return null
    }
    return ReactDOM.createPortal(<Header/>, headerElem)
}

const AsktugFooter = () => {
    const [key, setKey] = useState(0)

    useEffect(() => {
        const MutationObserver = window.MutationObserver || (window as any).WebkitMutationObserver

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if ((node as Element).id === footerId) {
                        setKey(key => key + 1)
                    }
                })
            })
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    const footerId = 'asktug-footer'
    const footerElem = document.getElementById(footerId)

    if (!footerElem) {
        return null
    }

    return ReactDOM.createPortal(<Footer { ...footerProps } />, footerElem)
}

const AsktugSite = () => {
    return (
        <SiteComponentsContext.Provider value={context}>
            <AsktugHeader/>
            <AsktugFooter/>
        </SiteComponentsContext.Provider>
    )
}

const container = document.createElement('div')
container.className = '__ti-site-holder'
document.body.append(container)

ReactDOM.render(<AsktugSite/>, container)
