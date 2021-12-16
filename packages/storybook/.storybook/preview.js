if (process.env.NODE_ENV === 'production') {
  require('@pingcap-inc/tidb-community-ui/dist/antd.css')
  require('@pingcap-inc/tidb-community-ui/dist/index.css')
} else {
  require('@pingcap-inc/tidb-community-ui/theme/index.less')
  require('@pingcap-inc/tidb-community-ui/src/index.less')
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
