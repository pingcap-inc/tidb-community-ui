import { Site } from './utils/site'
import { Env } from './utils/env'
import React from 'react'

let appConfig: AppConfig

export interface AppConfig {
  site: Site
  env: Env
  wrapRouteLink?: (key: string | undefined, url: string, node: React.ReactNode) => JSX.Element
}

export function defineSiteComponentsConfig (config: AppConfig) {
  appConfig = config
}

// TODO: is it possible to use context?
export function getSiteComponentsConfig () {
  if (!appConfig) {
    throw new Error('call defineSiteComponentsConfig first to config "@pingcap-inc/tidb-community-site-components"')
  }
  return appConfig
}
