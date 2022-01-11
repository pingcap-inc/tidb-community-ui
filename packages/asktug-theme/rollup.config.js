import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-ts'
import { terser } from "rollup-plugin-terser";

export default defineConfig({
  input: './index.ts',
  external: [],
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [
    ts(),
    terser()
  ]
})
