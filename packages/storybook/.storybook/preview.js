import '@pingcap-inc/tidb-community-ui/theme/index.less'
import '@pingcap-inc/tidb-community-ui/src/index.less'
import { defineSiteComponentsConfig, Env, Site } from '@pingcap-inc/tidb-community-site-components'

if (module.hot) {
  module.hot.accept();
}

defineSiteComponentsConfig({
  site: Site.others,
  env: Env.local
})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
