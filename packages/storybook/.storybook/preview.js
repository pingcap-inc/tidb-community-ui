if (process.env.NODE_ENV === 'production') {
  require('@pingcap-inc/tidb-community-ui/dist/antd.css')
} else {
  require('@pingcap-inc/tidb-community-ui/theme/index.less')
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
