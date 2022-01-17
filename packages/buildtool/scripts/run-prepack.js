const path = require('path')
const fs = require('fs')
const consola = require('consola').withTag(path.basename(__filename, '.js'))

const working_dir = process.cwd()
const package_json_path = path.resolve(working_dir, 'package.json')
const package_json_old_path = path.resolve(working_dir, 'package.json.old')

const packageJson = JSON.parse(fs.readFileSync(package_json_path, { encoding: 'utf8' }))

if (packageJson.module) {
  consola.info('save old package.json to package.json.old')
  fs.copyFileSync(package_json_path, package_json_old_path)

  consola.info('rewrite package.json module: %s => %s', packageJson.module, 'dist/index.js')
  packageJson.module = 'dist/index.js'
  fs.writeFileSync(package_json_path, JSON.stringify(packageJson, undefined, 2), { encoding: 'utf8' })
}
