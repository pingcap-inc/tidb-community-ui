import LessPluginNpmImport from 'less-plugin-npm-import'
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import ts from 'rollup-plugin-ts'
import svgr from '@svgr/rollup'
import { peerDependencies } from './package.json'
import { antd } from 'buildtool/plugins/rollup/antd'

export default defineConfig({
  input: './index.ts',
  external: [
    ...Object.keys(peerDependencies || {})
  ],
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [
    svgr(),
    postcss({
      to: 'index.css',
      extract: true,
      autoModules: true,
      inject: false,
      use: {
        less: {
          javascriptEnabled: true,
          plugins: [
            new LessPluginNpmImport({ prefix: '~' })
          ]
        }
      }
    }),
    ts()
  ]
})
