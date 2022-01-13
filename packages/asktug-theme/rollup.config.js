import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import externalGlobals from 'rollup-plugin-external-globals'
import { terser } from 'rollup-plugin-terser'
import ts from 'rollup-plugin-ts'
import { visualizer } from 'rollup-plugin-visualizer'
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss'
import LessPluginNpmImport from 'less-plugin-npm-import'

export default defineConfig({
  input: './src/index.tsx',
  external: [],
  output: {
    file: `dist/ti-site-asktug.${process.env.NODE_ENV}.js`,
    format: 'es'
  },
  plugins: [
    postcss({
      extract: `ti-site-asktug.${process.env.NODE_ENV}.css`,
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
    nodeResolve({
      jsnext: true,
      preferBuiltins: true,
      browser: true
    }),
    json(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true
    }),
    externalGlobals({
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      'react-transition-group': 'ReactTransitionGroup'
    }),
    visualizer(),
    terser({
      mangle: false,
    })
  ]
})
