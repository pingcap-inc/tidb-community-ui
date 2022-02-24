import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import svgr from '@svgr/rollup'
import { antd } from 'buildtool/plugins/rollup/antd'
import LessPluginNpmImport from 'less-plugin-npm-import'
import postcssMinify from 'postcss-minify'
import postcssWrapSelector from 'postcss-wrap-selector'
import { defineConfig } from 'rollup'
import externalGlobals from 'rollup-plugin-external-globals'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import ts from 'rollup-plugin-ts'
import { visualizer } from 'rollup-plugin-visualizer'

const src = `index.${process.env.target}.tsx`

export default defineConfig({
  input: `./src/${src}`,
  external: [],
  output: {
    file: `dist/ti-site-${process.env.target}.${process.env.NODE_ENV}.js`,
    format: 'es'
  },
  plugins: [
    ts(),
    nodeResolve({
      jsnext: true,
      preferBuiltins: true,
      browser: true
    }),
    json(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUILD_REF': JSON.stringify(process.env.BUILD_REF),
      preventAssignment: true
    }),
    antd({
      template: component => `
          @use postcss-wrap-selector(selector = '.ti-site-${process.env.target}');
          @import "~@pingcap-inc/tidb-community-ui/theme/index-commons.less";
          @import "~antd/lib/${component}/style";
          @import "~@pingcap-inc/tidb-community-ui/theme/index-overrides.less";
        `
    }),
    svgr({
      include: ['**/*.svg', '../**/*.svg']
    }),
    postcss({
      extract: `ti-site-${process.env.target}.${process.env.NODE_ENV}.css`,
      inject: false,
      use: {
        less: {
          javascriptEnabled: true,
          plugins: [
            new LessPluginNpmImport({ prefix: '~' })
          ]
        }
      },
      plugins: [
        postcssWrapSelector({ selector: `.ti-site-${process.env.target}` })
      ].concat(process.env.NODE_ENV === 'production' ? [postcssMinify()] : [])
    }),
    externalGlobals({
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      'react-transition-group': 'ReactTransitionGroup'
    }),
    visualizer(),
    terser({
      mangle: false
    })
  ]
})
