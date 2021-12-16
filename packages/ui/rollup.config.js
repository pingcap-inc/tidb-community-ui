import ts from "rollup-plugin-ts";
import { defineConfig } from 'rollup'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import del from 'rollup-plugin-delete'
import LessPluginNpmImport from 'less-plugin-npm-import';

export default defineConfig([{
  input: './theme/index.less',
  output: {
    dir: 'dist'
  },
  plugins: [
    del({
      targets: 'dist/*',
    }),
    del({
      targets: 'dist/index.js',
      hook: 'closeBundle'
    }),
    postcss({
      extract: 'antd.css',
      use: {
        less: {
          javascriptEnabled: true,
          plugins: [
            new LessPluginNpmImport({ prefix: '~' })
          ]
        }
      }
    })
  ]
}, {
  input: './index.ts',
  external: 'antd',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [
    postcss({
      to: 'index.css',
      extract: true,
      autoModules: true,
      inject: false,
    }),
    ts(),
    copy({
      targets: [
        { src: 'theme/colors-export.module.less.d.ts', dest: 'dist/theme/' },
      ],
      hook: 'buildEnd',
    })
  ]
}])
