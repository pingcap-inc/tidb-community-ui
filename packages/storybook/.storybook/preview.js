import '@pingcap-inc/tidb-community-ui/theme/index.less'
import '@pingcap-inc/tidb-community-ui/src/index.less'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
