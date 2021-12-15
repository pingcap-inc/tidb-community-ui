import ts from "rollup-plugin-ts";
import { defineConfig } from 'rollup'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import del from 'rollup-plugin-delete'

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
        less: { javascriptEnabled: true }
      }
    })
  ]
}, {
  input: './index.ts',
  external: 'antd',
  output: [{
    file: 'dist/index.esm.js',
    format: 'esm'
  }, {
    file: 'dist/index.commonjs.js',
    format: 'commonjs'
  }],
  plugins: [
    postcss({
      extract: false,
      autoModules: true,
      inject: false,
    }),
    ts(),
    copy({
      targets: [
        { src: 'theme/colors-export.module.less.d.ts', dest: 'dist/theme/' }
      ]
    })
  ]
}])
