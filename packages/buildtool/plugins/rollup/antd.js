const walk = require('acorn-walk')
const { paramCase } = require('param-case')
const fs = require('fs/promises')
const path = require('path')
const { performance } = require('perf_hooks')
const os = require('os')
const consola = require('consola').withTag('[antd-plugin]')

/**
 *
 * @return {import('rollup').Plugin}
 */
module.exports.antd = function antd ({ template }) {

  return {
    name: 'antd-plugin',
    async buildStart () {
      const tmp = await fs.mkdtemp(path.join(os.tmpdir(), '.tmp'))
      await fs.mkdir(path.join(tmp, 'antd-dynamic'), { recursive: true })
      this.cache.set('antd-dynamic-components', new Set())
      this.cache.set('antd-dynamic-tmp', tmp)
      this.cache.set('antd-dynamic-costs', 0)
      consola.info('create tmp path', tmp)
    },
    async transform (code, id) {
      const start = performance.now()

      if (!/\.[tj]sx?$/.test(id)) {
        return
      }
      const set = this.cache.get('antd-dynamic-components')
      const tmp = this.cache.get('antd-dynamic-tmp')

      const news = new Set()
      const exists = new Set()
      walk.simple(this.parse(code), {
        ImportDeclaration: (node) => {
          if (node.source.value === 'antd') {
            for (let specifier of node.specifiers) {
              if (specifier.type === 'ImportSpecifier') {
                const component = specifier.imported.name
                if (!set.has(component)) {
                  set.add(component)
                  news.add(component)
                }
                exists.add(component)
              }
            }
          } else if (node.source.value === '@ant-design/icons') {
            const component = 'Icon'
            if (!set.has(component)) {
              set.add(component)
              news.add(component)
            }
            exists.add(component)
          }
        }
      })
      let res
      if (exists.size > 0) {
        for (let component of news) {
          const p = path.join(tmp, `antd-dynamic/${component}.less`)
          await fs.writeFile(p, template(paramCase(component)), { encoding: 'utf8' })
        }
        const prefix = ([...exists]).map(component => `import 'antd-dynamic:${component}.less';\n`).join('')
        res = prefix + code
      } else {
        res = undefined
      }
      const end = performance.now()
      this.cache.set('antd-dynamic-costs', end - start + this.cache.get('antd-dynamic-costs'))
      return res
    },
    resolveId (id) {
      const tmp = this.cache.get('antd-dynamic-tmp')

      let matched
      if ((matched = /^antd-dynamic:(.+)\.less$/.exec(id))) {
        const [, component] = matched
        return path.join(tmp, 'antd-dynamic', `${component}.less`)
      }
    },
    async buildEnd (err) {
      const tmp = this.cache.get('antd-dynamic-tmp')
      if (!err) {
        const set = this.cache.get('antd-dynamic-components')
        consola.info('found usage of antd components [%s]', [...set].join(', '))
      }
      if (tmp) {
        await fs.rm(tmp, { recursive: true, force: true })
        consola.info('remove', tmp)
        consola.info('costs %ss', (this.cache.get('antd-dynamic-costs') / 1000).toFixed(1))
      }
    }
  }
}
