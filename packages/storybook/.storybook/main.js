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
      })
    return config
  }
}
