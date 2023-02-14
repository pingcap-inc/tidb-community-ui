import LessPluginNpmImport from 'less-plugin-npm-import'
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import ts from "rollup-plugin-typescript2";
import svgr from '@svgr/rollup'
import json from '@rollup/plugin-json'
import { peerDependencies } from './package.json'
import { antd } from 'buildtool/plugins/rollup/antd'
import image from "@rollup/plugin-image";

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
    json(),
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
    ts(),
    image(),
  ]
})
