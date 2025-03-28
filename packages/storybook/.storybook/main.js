const path = require('path')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config, { configType }) => {
    const root = path.resolve(__dirname, '../..')
    const svgRule = config.module.rules.find((rule) => 'test.svg'.match(rule.test));
    svgRule.exclude = [root];

    config.resolve.alias['@pingcap-inc/tidb-community-site-components$'] = path.resolve(__dirname, '../node_modules/@pingcap-inc/tidb-community-site-components/index.ts')
    config.resolve.alias['@pingcap-inc/tidb-community-ui$'] = path.resolve(__dirname, '../node_modules/@pingcap-inc/tidb-community-ui/index.ts')
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: configType === 'DEVELOPMENT'
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: configType === 'DEVELOPMENT',
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }]
      }, {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      include: [root]
    }, {
      test: /\.png$/,
      use: [{
        loader: "url-loader",
        options: {
          mimetype: "image/png",
        }
      }],
    })
    return config
  }
}
